import type { SiteSettings, Hero, Coach, Course, Testimonial, VenuePhoto } from './types';

export const mockSettings: SiteSettings = {
  brand_name: 'LE PILATES STUDIO',
  phone: '02-2345-6789',
  email: 'info@lepilates.com',
  contact_email: 'contact@lepilates.com',
  address: '台北市信義區忠孝東路五段 123 號 8 樓',
  hours_weekday: '週一至週五 09:00 - 21:00',
  hours_weekend: '週六至週日 10:00 - 18:00',
  line_url: '#',
  footer_text: '我們致力於提供最精緻的 PILATES 體驗，讓每一位來到這裡的您，都能在呼吸中遇見更美好的自己。',
};

export const mockHero: Hero = {
  id: 1,
  headline: '優雅流動\n重塑身心之美',
  subtext: '在 LE PILATES STUDIO，我們不僅訓練肌肉，更在精緻的空間中，帶領您找回身體的覺察與平衡。',
  cta_text: '立即預約體驗',
  image_url: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=800&h=1000&fit=crop',
};

export const mockCoaches: Coach[] = [
  { id: 1, name: 'Sarah Lin', title: '首席教育總監', specialty: '脊椎側彎矯正、孕產 PILATES', certifications: 'PMA® Certified Teacher, STOTT PILATES® Full Certification', photo_url: 'https://images.unsplash.com/photo-1594381898411-846e7d193883?w=600&h=800&fit=crop', sort_order: 1, is_active: 1 },
  { id: 2, name: 'David Chen', title: '資深教練', specialty: '運動表現提升、筋膜放鬆', certifications: 'Polestar Pilates Comprehensive, NASM-CPT', photo_url: 'https://images.unsplash.com/photo-1567013127542-490d483e18e4?w=600&h=800&fit=crop', sort_order: 2, is_active: 1 },
  { id: 3, name: 'Mia Wang', title: '專業授課老師', specialty: '核心穩定、體態雕塑', certifications: 'BASI Pilates Comprehensive, Yoga Alliance RYT-200', photo_url: 'https://images.unsplash.com/photo-1518310952931-b1de897abd40?w=600&h=800&fit=crop', sort_order: 3, is_active: 1 },
  { id: 4, name: 'Jason Hsu', title: '專業授課老師', specialty: '器械 PILATES、運動按摩', certifications: 'Balanced Body Reformer, ACE-CPT', photo_url: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=600&h=800&fit=crop', sort_order: 4, is_active: 1 },
];

export const mockCourses: Course[] = [
  { id: 1, title: '器械 PILATES', subtitle: 'Pilates Reformer', description: '使用專業器械提供阻力與輔助，精準鍛鍊深層肌群。', photo_url: 'https://images.unsplash.com/photo-1623874514711-0f321325f318?w=600&h=800&fit=crop', sort_order: 1, is_active: 1 },
  { id: 2, title: '空中瑜珈', subtitle: 'Aerial Yoga', description: '利用掛布在地心引力中延展，釋放脊椎壓力，訓練核心穩定。', photo_url: 'https://images.unsplash.com/photo-1599901860904-17e6ed7083a0?w=600&h=800&fit=crop', sort_order: 2, is_active: 1 },
  { id: 3, title: 'TRX 懸吊訓練', subtitle: 'TRX Training', description: '透過自身體重與懸吊繩，挑戰平衡與全身性肌耐力。', photo_url: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=600&h=800&fit=crop', sort_order: 3, is_active: 1 },
];

export const mockTestimonials: Testimonial[] = [
  { id: 1, quote: '持續練習 3 個月後，我的體態明顯變得挺拔，核心力量也大幅提升。', before_photo_url: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400&h=533&fit=crop', after_photo_url: 'https://images.unsplash.com/photo-1518310952931-b1de897abd40?w=400&h=533&fit=crop', sort_order: 1, is_active: 1 },
  { id: 2, quote: '產後恢復課程讓我重新找回自信，身體線條變得更緊實了。', before_photo_url: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=400&h=533&fit=crop', after_photo_url: 'https://images.unsplash.com/photo-1594381898411-846e7d193883?w=400&h=533&fit=crop', sort_order: 2, is_active: 1 },
  { id: 3, quote: '長期久坐的腰痠問題，在練習 2 個月後明顯改善，太感謝教練了！', before_photo_url: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=533&fit=crop', after_photo_url: 'https://images.unsplash.com/photo-1574680096145-d05b474e2155?w=400&h=533&fit=crop', sort_order: 3, is_active: 1 },
];

export const mockVenuePhotos: VenuePhoto[] = [
  { id: 1, label: '陽光器械教室', subtitle: 'Main Studio', photo_url: 'https://images.unsplash.com/photo-1540497077202-7c8a3999166f?w=800&h=800&fit=crop', grid_size: '2x2', sort_order: 1, is_active: 1 },
  { id: 2, label: '精品休息區', subtitle: 'Lounge', photo_url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=400&fit=crop', grid_size: '2x1', sort_order: 2, is_active: 1 },
  { id: 3, label: '私人更衣間', subtitle: 'Locker Room', photo_url: 'https://images.unsplash.com/photo-1631679706909-1844bbd07221?w=400&h=400&fit=crop', grid_size: '1x1', sort_order: 3, is_active: 1 },
  { id: 4, label: '細節美學', subtitle: 'Details', photo_url: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=400&h=400&fit=crop', grid_size: '1x1', sort_order: 4, is_active: 1 },
];

// Map API endpoint to mock data
const mockMap: Record<string, unknown> = {
  '/settings': mockSettings,
  '/hero': mockHero,
  '/coaches': mockCoaches,
  '/courses': mockCourses,
  '/testimonials': mockTestimonials,
  '/venue-photos': mockVenuePhotos,
};

export function getMockData<T>(url: string): T | null {
  return (mockMap[url] as T) ?? null;
}
