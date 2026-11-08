export const CLOUDINARY_CLOUD_NAME = 'du5fpqadb';
export const CLOUDINARY_UPLOAD_PRESET = 'Fidelity';
export const CLOUDINARY_UPLOAD_URL = `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`;
export const PROXY_UPLOAD_URL = '/api/cloudinary-upload';

export interface CloudinaryUploadResponse {
  secure_url?: string;
  url?: string;
  public_id?: string;
  error?: {
    message: string;
  };
}

/**
 * Reads a File object into a base64 Data URL string
 */
export function readFileAsDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        resolve(reader.result);
      } else {
        reject(new Error('Failed to read image file data.'));
      }
    };
    reader.onerror = () => reject(new Error('File reading error.'));
    reader.readAsDataURL(file);
  });
}

/**
 * Uploads directly to Cloudinary using XMLHttpRequest and FormData
 */
function uploadDirectToCloudinary(
  file: File,
  onProgress?: (progressPercent: number) => void
): Promise<string> {
  return new Promise((resolve, reject) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);

    const xhr = new XMLHttpRequest();
    xhr.open('POST', CLOUDINARY_UPLOAD_URL, true);

    if (onProgress && xhr.upload) {
      xhr.upload.onprogress = (event) => {
        if (event.lengthComputable) {
          const percent = Math.round((event.loaded / event.total) * 90);
          onProgress(percent);
        }
      };
    }

    xhr.onload = () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        try {
          const response: CloudinaryUploadResponse = JSON.parse(xhr.responseText);
          const secureUrl = response.secure_url || response.url;
          if (secureUrl) {
            if (onProgress) onProgress(100);
            resolve(secureUrl);
          } else {
            reject(new Error(response.error?.message || 'No URL returned from Cloudinary.'));
          }
        } catch (err) {
          reject(new Error('Failed to parse Cloudinary response: ' + String(err)));
        }
      } else {
        try {
          const errRes: CloudinaryUploadResponse = JSON.parse(xhr.responseText);
          reject(new Error(errRes.error?.message || `Cloudinary rejected with status ${xhr.status}`));
        } catch {
          reject(new Error(`Cloudinary rejected with status ${xhr.status}: ${xhr.statusText}`));
        }
      }
    };

    xhr.onerror = () => {
      // Typically caused by adblockers (ERR_BLOCKED_BY_CLIENT), CORS issues, or connection reset
      reject(new Error('Direct client upload to api.cloudinary.com was blocked or failed'));
    };

    xhr.send(formData);
  });
}

/**
 * Uploads via same-origin server proxy (/api/cloudinary-upload)
 * Completely avoids client-side adblocker blocks (uBlock, Brave Shields) and browser CORS restrictions.
 */
async function uploadViaServerProxy(dataUrl: string): Promise<string> {
  const response = await fetch(PROXY_UPLOAD_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify({
      file: dataUrl,
      upload_preset: CLOUDINARY_UPLOAD_PRESET
    })
  });

  if (!response.ok) {
    const errorJson = await response.json().catch(() => ({}));
    throw new Error(errorJson?.error?.message || `Server proxy upload failed (${response.status})`);
  }

  const data: CloudinaryUploadResponse = await response.json();
  const secureUrl = data.secure_url || data.url;
  if (!secureUrl) {
    throw new Error('Server proxy succeeded but no Cloudinary secure URL was returned.');
  }

  return secureUrl;
}

/**
 * Resilient multi-tiered image upload to Cloudinary:
 * 1. Attempts direct client-side upload to Cloudinary Unsigned Upload API
 * 2. If blocked by adblockers, CORS, or network restriction, falls back to same-origin /api/cloudinary-upload proxy
 * 3. If offline, provides optimized dataUrl fallback so user workflow is never blocked
 */
export async function uploadImageToCloudinary(
  file: File,
  onProgress?: (progressPercent: number) => void
): Promise<string> {
  // Step 1: Pre-read file as Data URL for potential proxy / fallback
  let dataUrl = '';
  try {
    dataUrl = await readFileAsDataUrl(file);
  } catch (e) {
    console.warn('Could not read file as dataUrl:', e);
  }

  // Tier 1: Try Direct Client-side Upload
  try {
    const directUrl = await uploadDirectToCloudinary(file, onProgress);
    return directUrl;
  } catch (directError: any) {
    console.warn('Direct Cloudinary client upload failed, attempting same-origin server proxy:', directError.message);
  }

  // Tier 2: Try Server-Side Proxy Upload
  if (dataUrl) {
    try {
      if (onProgress) onProgress(60);
      const proxyUrl = await uploadViaServerProxy(dataUrl);
      if (onProgress) onProgress(100);
      return proxyUrl;
    } catch (proxyError: any) {
      console.warn('Server proxy upload failed:', proxyError.message);
    }
  }

  // Tier 3: If both failed (e.g. completely offline), fallback to the local Data URL
  if (dataUrl) {
    if (onProgress) onProgress(100);
    console.info('Using local image representation as fallback.');
    return dataUrl;
  }

  throw new Error('Unable to upload image. Please check your internet connection or enter an image URL directly.');
}
