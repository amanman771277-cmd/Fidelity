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

test('SECTOR_LOGOS and MAIN_LOGO_URL export exact Cloudinary URLs and render in generateSingleFileHtml', async () => {
  const { SECTOR_LOGOS, HERO_BANNER_URL, MAIN_LOGO_URL } = await import('./portfolio.ts');
  assert.equal(SECTOR_LOGOS.architects, 'https://res.cloudinary.com/du5fpqadb/image/upload/v1794822406/d4ix1jiotomsxokxmhmq.jpg');
  assert.equal(SECTOR_LOGOS.branding, 'https://res.cloudinary.com/du5fpqadb/image/upload/v1794125990/jqvhcx8zmninjsnpcg6h.jpg');
  assert.equal(SECTOR_LOGOS.furniture, 'https://res.cloudinary.com/du5fpqadb/image/upload/v1794126024/ck8jeuupxf7yrmseigvc.jpg');
  assert.equal(HERO_BANNER_URL, 'https://res.cloudinary.com/du5fpqadb/image/upload/v1794126950/dvd9lq9xzmefjopiyufp.jpg');
  assert.equal(MAIN_LOGO_URL, 'https://res.cloudinary.com/du5fpqadb/image/upload/v1794823734/ydihcua1jxejcfxcoah3.png');

  const html = generateSingleFileHtml(INITIAL_PROJECTS);
  assert.ok(html.includes('d4ix1jiotomsxokxmhmq.jpg'));
  assert.ok(html.includes('jqvhcx8zmninjsnpcg6h.jpg'));
  assert.ok(html.includes('ck8jeuupxf7yrmseigvc.jpg'));
  assert.ok(html.includes('dvd9lq9xzmefjopiyufp.jpg'));
  assert.ok(html.includes('ydihcua1jxejcfxcoah3.png'));
  assert.ok(html.includes('rounded-full object-cover border border-gold-500/40'));
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

test('generateSingleFileHtml includes onSnapshot real-time sync on collection posts without config clutter', () => {
  const html = generateSingleFileHtml(INITIAL_PROJECTS);
  assert.ok(html.includes("onSnapshot("));
  assert.ok(html.includes("FIRESTORE_COLLECTION_NAME = 'posts'"));
  assert.equal(html.includes("cfgApiKey"), false);
  assert.equal(html.includes("tabBtnFirebase"), false);
});

test('generateSingleFileHtml bundles Cloudinary imageUrl with postData and does not persist posts to localStorage', () => {
  const html = generateSingleFileHtml(INITIAL_PROJECTS);
  // Guarantee no localStorage used for posts
  assert.equal(html.includes("localStorage.setItem('fidelity_posts_v3'"), false);
  assert.equal(html.includes('fidelity_posts_v3'), false);
  // Bundles imageUrl and text in postData
  assert.ok(html.includes('await firestoreDb.collection(FIRESTORE_COLLECTION_NAME).add(newPost)'));
});

test('generateSingleFileHtml includes loading="lazy" for performance optimization', () => {
  const html = generateSingleFileHtml(INITIAL_PROJECTS);
  assert.ok(html.includes('loading="lazy"'));
});

test('generateSingleFileHtml includes animated skeleton loading states for perceived performance while waiting for Firebase sync', () => {
  const html = generateSingleFileHtml(INITIAL_PROJECTS);
  assert.ok(html.includes('animate-pulse'));
  assert.ok(html.includes('renderPortfolioSkeletons'));
  assert.ok(html.includes('portfolioGrid'));
  assert.ok(html.includes('Skeleton Loading Cards'));
});

test('generateSingleFileHtml renders uniform 16:9 hero banner with object-cover and no sm:object-contain side gaps', () => {
  const html = generateSingleFileHtml(INITIAL_PROJECTS);
  assert.ok(html.includes('alt="Fidelity Business Group Corporate Banner"'));
  assert.ok(html.includes('aspect-video'));
  assert.ok(html.includes('w-full h-full object-cover object-center block'));
  assert.equal(html.includes('sm:object-contain'), false);
});

test('generateSingleFileHtml includes multi-image hero slider with arrows, dots, autoplay, and seamless infinite loop', () => {
  const html = generateSingleFileHtml(INITIAL_PROJECTS);
  assert.ok(html.includes('id="heroSliderTrack"'));
  assert.ok(html.includes('id="heroPrevBtn"'));
  assert.ok(html.includes('id="heroNextBtn"'));
  assert.ok(html.includes('id="heroDotsContainer"'));
  assert.ok(html.includes('function nextHeroSlide()'));
  assert.ok(html.includes('function prevHeroSlide()'));
  assert.ok(html.includes('function goToHeroSlide(idx)'));
  assert.ok(html.includes('function startHeroSliderAutoplay()'));
  assert.ok(html.includes('function snapHeroTrackIfOnClone()'));
  assert.ok(html.includes('currentHeroTrackIndex'));
  assert.ok(html.includes('w-8 h-8 rounded-full bg-black/30'));
  assert.ok(html.includes('backdrop-blur-md'));
  assert.ok(html.includes('h-1.5 w-4 rounded-full'));
});

test('generateSingleFileHtml includes Admin Panel Banner Management for up to 4 Cloudinary URLs synced with Firestore settings', () => {
  const html = generateSingleFileHtml(INITIAL_PROJECTS);
  assert.ok(html.includes('id="tabBtnBanners"'));
  assert.ok(html.includes('id="tabContentBanners"'));
  assert.ok(html.includes('id="heroBannerUrl0"'));
  assert.ok(html.includes('id="heroBannerUrl1"'));
  assert.ok(html.includes('id="heroBannerUrl2"'));
  assert.ok(html.includes('id="heroBannerUrl3"'));
  assert.ok(html.includes('handleSaveHeroBanners'));
  assert.ok(html.includes("HERO_BANNERS_COLLECTION = 'settings'"));
  assert.ok(html.includes("HERO_BANNERS_DOC_ID = 'hero_banners'"));
  // Ensure clean config without Firebase setup clutter
  assert.equal(html.includes('cfgApiKey'), false);
  assert.equal(html.includes('tabBtnFirebase'), false);
});

test('I18N contains Hero Banners translations for both Amharic and English', () => {
  assert.ok(I18N.am.admin.tabBanners.includes('ባነሮች'));
  assert.ok(I18N.en.admin.tabBanners.includes('Hero Banners'));
  assert.ok(I18N.am.admin.saveBannersBtn.includes('ባነሮችን'));
  assert.ok(I18N.en.admin.saveBannersBtn.includes('Save Hero Banners'));
});

test('generateSingleFileHtml includes IntersectionObserver scroll fade-in classes for Sectors cards', () => {
  const html = generateSingleFileHtml(INITIAL_PROJECTS);
  assert.ok(html.includes('sector-reveal-card'));
  assert.ok(html.includes('initSectorsScrollReveal'));
  assert.ok(html.includes('IntersectionObserver'));
  assert.ok(html.includes('opacity-0 translate-y-6 transition-all duration-700 ease-out'));
});

test('normalizePostImages and getProjectImages deduplicate, preserve fallback, and cap at 4 images', async () => {
  const { normalizePostImages, getProjectImages } = await import('./portfolio.ts');
  const deduped = normalizePostImages(['https://a.jpg', ' ', 'https://a.jpg', 'https://b.jpg', 'https://c.jpg', 'https://d.jpg', 'https://e.jpg']);
  assert.deepEqual(deduped, ['https://a.jpg', 'https://b.jpg', 'https://c.jpg', 'https://d.jpg']);

  const fallbackImgs = getProjectImages({ imageUrl: 'https://cover.jpg' });
  assert.deepEqual(fallbackImgs, ['https://cover.jpg']);

  const multiImgs = getProjectImages({
    imageUrl: 'https://cover.jpg',
    images: ['https://1.jpg', 'https://2.jpg', 'https://3.jpg']
  });
  assert.deepEqual(multiImgs, ['https://1.jpg', 'https://2.jpg', 'https://3.jpg']);
});

test('generateSingleFileHtml supports 4-slot post image uploads and interactive post card slider', () => {
  const html = generateSingleFileHtml(INITIAL_PROJECTS);
  // 4 upload slots in Add/Edit Post form
  assert.ok(html.includes('id="postImageUrl"'));
  assert.ok(html.includes('id="postImageUrl1"'));
  assert.ok(html.includes('id="postImageUrl2"'));
  assert.ok(html.includes('id="postImageUrl3"'));
  assert.ok(html.includes('id="adminFileInput"'));
  assert.ok(html.includes('id="adminFileInput1"'));
  assert.ok(html.includes('id="adminFileInput2"'));
  assert.ok(html.includes('id="adminFileInput3"'));
  // Saves images array in Firestore postData
  assert.ok(html.includes('images: collectedImages'));
  // Interactive post card slider with arrows, dots, and touch swipe
  assert.ok(html.includes('function slidePostCard('));
  assert.ok(html.includes('function goToPostSlide('));
  assert.ok(html.includes('handlePostTouchStart'));
  assert.ok(html.includes('handlePostTouchEnd'));
  assert.ok(html.includes('postSliderTrack-'));
  assert.ok(html.includes('postSliderDots-'));
});

test('generateSingleFileHtml includes post detail modal slider with touch-action: pan-y and smooth touch handlers', () => {
  const html = generateSingleFileHtml(INITIAL_PROJECTS);
  assert.ok(html.includes('id="postDetailModal"'));
  assert.ok(html.includes('id="postModalViewport"'));
  assert.ok(html.includes('id="postModalSliderTrack"'));
  assert.ok(html.includes('touch-action: pan-y;'));
  assert.ok(html.includes('overscroll-behavior-x: contain;'));
  assert.ok(html.includes('touch-pan-y'));
  assert.ok(html.includes('overscroll-x-contain'));
  assert.ok(html.includes('function handleModalTouchStart('));
  assert.ok(html.includes('function handleModalTouchMove('));
  assert.ok(html.includes('function handleModalTouchEnd('));
  assert.ok(html.includes('function handlePostTouchMove('));
  assert.ok(html.includes('ontouchcancel='));
});

