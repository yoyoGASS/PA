export interface SiteSettings {
  brand_name: string;
  phone: string;
  email: string;
  contact_email: string;
  address: string;
  hours_weekday: string;
  hours_weekend: string;
  line_url: string;
  footer_text: string;
  [key: string]: string;
}

export interface Hero {
  id: number;
  headline: string;
  subtext: string;
  cta_text: string;
  image_url: string;
}

export interface Coach {
  id: number;
  name: string;
  title: string;
  specialty: string;
  certifications: string;
  photo_url: string;
  sort_order: number;
  is_active: number;
}

export interface Course {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  photo_url: string;
  sort_order: number;
  is_active: number;
}

export interface Testimonial {
  id: number;
  quote: string;
  before_photo_url: string;
  after_photo_url: string;
  sort_order: number;
  is_active: number;
}

export interface VenuePhoto {
  id: number;
  label: string;
  subtitle: string;
  photo_url: string;
  grid_size: string;
  sort_order: number;
  is_active: number;
}

export interface Booking {
  id: number;
  name: string;
  phone: string;
  email: string;
  line_id: string;
  status: string;
  created_at: string;
}
