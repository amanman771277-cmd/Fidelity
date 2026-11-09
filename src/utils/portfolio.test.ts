import test from 'node:test';
import assert from 'node:assert/strict';
import {
  filterProjects,
  validateAdminPassword,
  isCloudinaryUrl,
  formatCloudinaryUrl,
  generateSingleFileHtml,
  INITIAL_PROJECTS
} from './portfolio.ts';
import { I18N } from './i18n.ts';

test('validateAdminPassword checks default and custom passwords correctly', () => {
  assert.equal(validateAdminPassword('admin123'), true);
  assert.equal(validateAdminPassword('  admin123  '), true);
  assert.equal(validateAdminPassword('wrongPassword'), false);
  assert.equal(validateAdminPassword(''), false);
});

test('I18N contains full translations for Amharic and English', () => {
  assert.ok(I18N.am.motto.includes('ከሃሳብ ወደ ታላቅ ንግድ ግዛት'));
  assert.equal(I18N.am.brandName, 'ፊዴሊቲ');
  assert.equal(I18N.am.admin.triggerBtn, 'አድሚን ፓናል (v3.0)');
  assert.equal(I18N.en.admin.triggerBtn, 'Admin Panel (v3.0)');
  assert.ok(I18N.am.sectors.architects.name.includes('አርክቴክቶች'));
  assert.ok(I18N.am.sectors.branding.name.includes('ብራንዲንግ'));
  assert.ok(I18N.am.sectors.furniture.name.includes('ፈርኒቸር'));
});

test('filterProjects filters by sector correctly', () => {
  const allProjects = filterProjects(INITIAL_PROJECTS, 'all');
  assert.equal(allProjects.length, INITIAL_PROJECTS.length);

  const architects = filterProjects(INITIAL_PROJECTS, 'architects');
  assert.ok(architects.length > 0);
  assert.ok(architects.every(p => p.sector === 'architects'));
});

test('filterProjects matches Amharic titles and search terms', () => {
  const amharicResults = filterProjects(INITIAL_PROJECTS, 'all', 'ማማ');
  assert.ok(amharicResults.length >= 1);
  assert.ok(amharicResults.some(p => p.titleAm?.includes('ማማ')));
});

test('isCloudinaryUrl detects Cloudinary domains accurately', () => {
  assert.equal(isCloudinaryUrl('https://res.cloudinary.com/demo/image/upload/sample.jpg'), true);
  assert.equal(isCloudinaryUrl('https://images.unsplash.com/photo-123'), false);
});

test('generateSingleFileHtml includes hamburger menu button, default Amharic, and Telegram handle', () => {
  const html = generateSingleFileHtml(INITIAL_PROJECTS);
  assert.ok(html.includes('hamburgerBtn'));
  assert.ok(html.includes('hamburgerDropdown'));
  assert.ok(html.includes('lang="am"'));
  assert.ok(html.includes('ከሃሳብ ወደ ታላቅ ንግድ ግዛት'));
  assert.ok(html.includes('አድሚን ፓናል (v3.0)'));
  assert.ok(html.includes('https://t.me/amanman777'));
});

test('generateSingleFileHtml includes hardcoded Cloudinary direct upload and Firestore posts collection', () => {
  const html = generateSingleFileHtml(INITIAL_PROJECTS);
  assert.ok(html.includes('du5fpqadb'));
  assert.ok(html.includes('Fidelity'));
  assert.ok(html.includes('https://api.cloudinary.com/v1_1/du5fpqadb/image/upload'));
  assert.ok(html.includes("FIRESTORE_COLLECTION_NAME = 'posts'"));
  assert.ok(html.includes('adminFileInput'));
  assert.ok(html.includes('uploadProgressBar'));
});

test('Cloudinary constants are correctly defined with proxy fallback', async () => {
  const { CLOUDINARY_CLOUD_NAME, CLOUDINARY_UPLOAD_PRESET, CLOUDINARY_UPLOAD_URL, PROXY_UPLOAD_URL } = await import('./cloudinary.ts');
  assert.equal(CLOUDINARY_CLOUD_NAME, 'du5fpqadb');
  assert.equal(CLOUDINARY_UPLOAD_PRESET, 'Fidelity');
  assert.equal(CLOUDINARY_UPLOAD_URL, 'https://api.cloudinary.com/v1_1/du5fpqadb/image/upload');
  assert.equal(PROXY_UPLOAD_URL, '/api/cloudinary-upload');
});

test('generateSingleFileHtml includes Admin Edit and Update post features', () => {
  const html = generateSingleFileHtml(INITIAL_PROJECTS);
  // Edit button in post list
  assert.ok(html.includes('handleStartEditPost'));
  assert.ok(html.includes('አስተካክል (Edit)'));
  // Dual-language input fields
  assert.ok(html.includes('id="postTitleAm"'));
  assert.ok(html.includes('id="postTitleEn"'));
  assert.ok(html.includes('id="postDescAm"'));
  assert.ok(html.includes('id="postDescEn"'));
  // Update post flow and banner
  assert.ok(html.includes('handleCreateOrUpdatePost'));
  assert.ok(html.includes('adminEditingBanner'));
  assert.ok(html.includes('cancelEditPost'));
  assert.ok(html.includes("ሥራውን አዘምን (Update Post) → (Firestore 'posts')"));
});

test('generateSingleFileHtml and card components do not render Cloudinary CDN overlay badge', () => {
  const html = generateSingleFileHtml(INITIAL_PROJECTS);
  // Ensure the badge overlay is completely removed
  assert.equal(html.includes('Cloudinary CDN</span>'), false);
  assert.equal(html.includes('>Cloudinary CDN<'), false);
});

test('I18N contains dual-language Admin Edit and Update translations', () => {
  assert.equal(I18N.am.admin.editPost, 'አስተካክል');
  assert.equal(I18N.en.admin.editPost, 'Edit');
  assert.ok(I18N.am.admin.updatePostBtn.includes('አዘምን'));
  assert.ok(I18N.en.admin.updatePostBtn.includes('Update Post'));
  assert.ok(I18N.am.admin.cancelEdit.includes('ማስተካከል አቁም'));
});

test('generateSingleFileHtml and UI do not include HTML download buttons or export sections', () => {
  const html = generateSingleFileHtml(INITIAL_PROJECTS);
  assert.equal(html.includes('downloadHtmlBtn'), false);
  assert.equal(html.includes('tabExport'), false);
  assert.equal(html.includes('fidelity-business-group-single-file.html'), false);
});

test('SECTOR_LOGOS exports exact Cloudinary URLs and renders in generateSingleFileHtml', async () => {
  const { SECTOR_LOGOS, HERO_BANNER_URL } = await import('./portfolio.ts');
  assert.equal(SECTOR_LOGOS.architects, 'https://res.cloudinary.com/du5fpqadb/image/upload/v1794125946/ymxnstgo7wsjqgj6ypbn.jpg');
  assert.equal(SECTOR_LOGOS.branding, 'https://res.cloudinary.com/du5fpqadb/image/upload/v1794125990/jqvhcx8zmninjsnpcg6h.jpg');
  assert.equal(SECTOR_LOGOS.furniture, 'https://res.cloudinary.com/du5fpqadb/image/upload/v1794126024/ck8jeuupxf7yrmseigvc.jpg');
  assert.equal(HERO_BANNER_URL, 'https://res.cloudinary.com/du5fpqadb/image/upload/v1794126950/dvd9lq9xzmefjopiyufp.jpg');

  const html = generateSingleFileHtml(INITIAL_PROJECTS);
  assert.ok(html.includes('ymxnstgo7wsjqgj6ypbn.jpg'));
  assert.ok(html.includes('jqvhcx8zmninjsnpcg6h.jpg'));
  assert.ok(html.includes('ck8jeuupxf7yrmseigvc.jpg'));
  assert.ok(html.includes('dvd9lq9xzmefjopiyufp.jpg'));
});

test('generateSingleFileHtml includes physical address in footer and contact section', () => {
  const html = generateSingleFileHtml(INITIAL_PROJECTS);
  assert.ok(html.includes('ወላይታ ሶዶ, ግሪንላንድ ሰፈር'));
  assert.ok(html.includes('Wolaita Sodo, Greenland'));
});

test('generateSingleFileHtml hamburger menu does not contain admin button (bottom admin button only)', () => {
  const html = generateSingleFileHtml(INITIAL_PROJECTS);
  const hamburgerMenuPart = html.substring(html.indexOf('id="hamburgerDropdown"'), html.indexOf('</header>'));
  assert.equal(hamburgerMenuPart.includes('openAdminPasswordModal'), false);
  assert.equal(hamburgerMenuPart.includes('ui-menuAdminBtn'), false);
  // Bottom footer retains admin button
  const footerPart = html.substring(html.indexOf('<footer'), html.indexOf('</footer>'));
  assert.ok(footerPart.includes('openAdminPasswordModal'));
  assert.ok(footerPart.includes('v3.0'));
});

test('generateSingleFileHtml includes onSnapshot real-time sync and public Firestore rules guidance', () => {
  const html = generateSingleFileHtml(INITIAL_PROJECTS);
  assert.ok(html.includes("firestoreDb.collection(FIRESTORE_COLLECTION_NAME).orderBy('createdAt', 'desc').onSnapshot"));
  assert.ok(html.includes("allow read: if true;"));
  assert.ok(html.includes("allow create, update, delete: if true;"));
});

