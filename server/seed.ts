import 'dotenv/config';
import { getDb } from './db.js';

const db = getDb();

console.log('Seeding database...');

// Site Settings
const settings = [
  ['brand_name', 'LE PILATES STUDIO'],
  ['phone', '02-2345-6789'],
  ['email', 'info@lepilates.com'],
  ['contact_email', 'contact@lepilates.com'],
  ['address', '台北市信義區忠孝東路五段 123 號 8 樓'],
  ['hours_weekday', '週一至週五 09:00 - 21:00'],
  ['hours_weekend', '週六至週日 10:00 - 18:00'],
  ['line_url', '#'],
  ['footer_text', '我們致力於提供最精緻的 PILATES 體驗，讓每一位來到這裡的您，都能在呼吸中遇見更美好的自己。'],
];

const insertSetting = db.prepare('INSERT OR REPLACE INTO site_settings (key, value) VALUES (?, ?)');
for (const [key, value] of settings) {
  insertSetting.run(key, value);
}
console.log(`  ✓ site_settings: ${settings.length} rows`);

// Hero
db.prepare('INSERT OR REPLACE INTO hero (id, headline, subtext, cta_text, image_url) VALUES (1, ?, ?, ?, ?)').run(
  '優雅流動\n重塑身心之美',
  '在 LE PILATES STUDIO，我們不僅訓練肌肉，更在精緻的空間中，帶領您找回身體的覺察與平衡。',
  '立即預約體驗',
  '/uploads/hero.jpg'
);
console.log('  ✓ hero: 1 row');

// Coaches
const coaches = [
  { name: 'Sarah Lin', title: '首席教育總監', specialty: '脊椎側彎矯正、孕產 PILATES', certifications: 'PMA® Certified Teacher, STOTT PILATES® Full Certification', photo_url: '/uploads/coach-sarah.jpg', sort_order: 1 },
  { name: 'David Chen', title: '資深教練', specialty: '運動表現提升、筋膜放鬆', certifications: 'Polestar Pilates Comprehensive, NASM-CPT', photo_url: '/uploads/coach-david.jpg', sort_order: 2 },
  { name: 'Mia Wang', title: '專業授課老師', specialty: '核心穩定、體態雕塑', certifications: 'BASI Pilates Comprehensive, Yoga Alliance RYT-200', photo_url: '/uploads/coach-mia.jpg', sort_order: 3 },
  { name: 'Jason Hsu', title: '專業授課老師', specialty: '器械 PILATES、運動按摩', certifications: 'Balanced Body Reformer, ACE-CPT', photo_url: '/uploads/coach-jason.jpg', sort_order: 4 },
];

const insertCoach = db.prepare('INSERT INTO coaches (name, title, specialty, certifications, photo_url, sort_order) VALUES (@name, @title, @specialty, @certifications, @photo_url, @sort_order)');
// Clear existing
db.prepare('DELETE FROM coaches').run();
for (const c of coaches) insertCoach.run(c);
console.log(`  ✓ coaches: ${coaches.length} rows`);

// Courses
const courses = [
  { title: '器械 PILATES', subtitle: 'Pilates Reformer', description: '使用專業器械提供阻力與輔助，精準鍛鍊深層肌群。', photo_url: '/uploads/course-1.jpg', sort_order: 1 },
  { title: '空中瑜珈', subtitle: 'Aerial Yoga', description: '利用掛布在地心引力中延展，釋放脊椎壓力，訓練核心穩定。', photo_url: '/uploads/course-2.jpg', sort_order: 2 },
  { title: 'TRX 懸吊訓練', subtitle: 'TRX Training', description: '透過自身體重與懸吊繩，挑戰平衡與全身性肌耐力。', photo_url: '/uploads/course-3.jpg', sort_order: 3 },
];

const insertCourse = db.prepare('INSERT INTO courses (title, subtitle, description, photo_url, sort_order) VALUES (@title, @subtitle, @description, @photo_url, @sort_order)');
db.prepare('DELETE FROM courses').run();
for (const c of courses) insertCourse.run(c);
console.log(`  ✓ courses: ${courses.length} rows`);

// Testimonials
const testimonials = [
  { quote: '持續練習 3 個月後，我的體態明顯變得挺拔，核心力量也大幅提升。', before_photo_url: '/uploads/before-1.jpg', after_photo_url: '/uploads/after-1.jpg', sort_order: 1 },
  { quote: '產後恢復課程讓我重新找回自信，身體線條變得更緊實了。', before_photo_url: '/uploads/before-2.jpg', after_photo_url: '/uploads/after-2.jpg', sort_order: 2 },
  { quote: '長期久坐的腰痠問題，在練習 2 個月後明顯改善，太感謝教練了！', before_photo_url: '/uploads/before-3.jpg', after_photo_url: '/uploads/after-3.jpg', sort_order: 3 },
];

const insertTestimonial = db.prepare('INSERT INTO testimonials (quote, before_photo_url, after_photo_url, sort_order) VALUES (@quote, @before_photo_url, @after_photo_url, @sort_order)');
db.prepare('DELETE FROM testimonials').run();
for (const t of testimonials) insertTestimonial.run(t);
console.log(`  ✓ testimonials: ${testimonials.length} rows`);

// Venue Photos
const venuePhotos = [
  { label: '陽光器械教室', subtitle: 'Main Studio', photo_url: '/uploads/venue-main.jpg', grid_size: '2x2', sort_order: 1 },
  { label: '精品休息區', subtitle: 'Lounge', photo_url: '/uploads/venue-lounge.jpg', grid_size: '2x1', sort_order: 2 },
  { label: '私人更衣間', subtitle: 'Locker Room', photo_url: '/uploads/venue-locker.jpg', grid_size: '1x1', sort_order: 3 },
  { label: '細節美學', subtitle: 'Details', photo_url: '/uploads/venue-detail.jpg', grid_size: '1x1', sort_order: 4 },
];

const insertVenue = db.prepare('INSERT INTO venue_photos (label, subtitle, photo_url, grid_size, sort_order) VALUES (@label, @subtitle, @photo_url, @grid_size, @sort_order)');
db.prepare('DELETE FROM venue_photos').run();
for (const v of venuePhotos) insertVenue.run(v);
console.log(`  ✓ venue_photos: ${venuePhotos.length} rows`);

console.log('\nSeed complete!');
