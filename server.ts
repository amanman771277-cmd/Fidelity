import express from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const CLOUDINARY_CLOUD_NAME = 'du5fpqadb';
const CLOUDINARY_UPLOAD_PRESET = 'Fidelity';
const CLOUDINARY_UPLOAD_URL = `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`;

async function startServer() {
  const app = express();
  const PORT = Number(process.env.PORT) || 3000;

  // Body parser with 50MB limit to handle high-res images
  app.use(express.json({ limit: '50mb' }));
  app.use(express.urlencoded({ extended: true, limit: '50mb' }));

  // Server-side Cloudinary Proxy Endpoint
  // Solves client-side adblocker blocks (net::ERR_BLOCKED_BY_CLIENT) and browser CORS restrictions
  app.post('/api/cloudinary-upload', async (req, res) => {
    try {
      const { file, upload_preset } = req.body;

      if (!file) {
        res.status(400).json({ error: { message: 'No image file or dataUrl provided' } });
        return;
      }

      const preset = upload_preset || CLOUDINARY_UPLOAD_PRESET;

      // Forward directly to Cloudinary from the server environment
      const cloudinaryResponse = await fetch(CLOUDINARY_UPLOAD_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          file: file,
          upload_preset: preset
        })
      });

      const data = await cloudinaryResponse.json();

      if (!cloudinaryResponse.ok) {
        console.warn('Cloudinary server proxy received error:', data);
        res.status(cloudinaryResponse.status).json(data);
        return;
      }

      res.json(data);
    } catch (err: any) {
      console.error('Server proxy error uploading to Cloudinary:', err);
      res.status(500).json({
        error: { message: err?.message || 'Server proxy failed to upload to Cloudinary' }
      });
    }
  });

  // Health check endpoint
  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', time: Date.now() });
  });

  // Dev vs Production Vite mounting
  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  } else {
    // Mount Vite middlewares in development
    const vite = await createViteServer({
      server: {
        middlewareMode: true,
        hmr: process.env.DISABLE_HMR !== 'true'
      },
      appType: 'spa'
    });
    app.use(vite.middlewares);
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Fidelity Business Group server running on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Fatal error starting server:', err);
  process.exit(1);
});
