// export interface Product {
//   id: number;
//   title: string;
//   slug: string;
//   shortDescription?: string;
//   description: string;
//   icon?: string;
//   featuredImage?: string;
//   gallery?: string[];
//   features?: Feature[];
//   metaTitle?: string;
//   metaDescription?: string;
//   metaKeywords?: string;
//   order: number;
//   isPublished: boolean;
//   publishedAt?: Date;
//   views: number;
//   createdBy: number;
//   updatedBy?: number;
//   createdAt: Date;
//   updatedAt: Date;
//   creator?: {
//     id: number;
//     name: string;
//     email: string;
//     avatar?: string;
//   };
// }

// export interface Feature {
//   name: string;
//   description?: string;
//   icon?: string;
// }

// // This matches your actual API response structure
// export interface ProductResponse {
//   success: boolean;
//   status_code: number;
//   message: string;
//   result?: Product | Product[];  // Your API uses 'result', not 'data'
//   data?: Product | Product[];     // Keep for backward compatibility
//   pagination?: {
//     total: number;
//     page: number;
//     limit: number;
//     pages: number;
//   };
//   time?: number;
//   ex?: string;
// }

// export interface ProductFilters {
//   page?: number;
//   limit?: number;
//   search?: string;
//   status?: 'published' | 'draft' | '';
//   sortBy?: string;
//   sortOrder?: 'ASC' | 'DESC';
// }

export interface ProductCategory {
  id: number;
  name: string;
  nameAr?: string;
  slug: string;
  order: number;
  isActive: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ProductCategoryResponse {
  success: boolean;
  status_code: number;
  message: string;
  result?: ProductCategory | ProductCategory[];
}

export interface HowItWorkItem {
  icon: string;
  title: string;
  titleAr?: string;
  description: string;
  descriptionAr?: string;
}

export interface BenefitItem {
  icon: string;
  title: string;
  titleAr?: string;
  description: string;
  descriptionAr?: string;
}

export interface VisionItem {
  icon: string;
  text: string;
  textAr?: string;
}

export interface FAQItem {
  question: string;
  questionAr?: string;
  answer: string;
  answerAr?: string;
}

export interface KeyFeatureItem {
  icon: string;
  text: string;
}

export interface Product {
  id: number;
  title: string;
  titleAr?: string;
  slug: string;
  shortDescription?: string;
  shortDescriptionAr?: string;
  metaDescription?: string;
  metaDescriptionAr?: string;
  categoryId?: number;
  category?: ProductCategory;
  cardIcon?: string;

  // Hero Section
  heroTitle?: string;
  heroTitleAr?: string;
  heroSubtitle?: string;
  heroSubtitleAr?: string;
  heroDescription?: string;
  heroDescriptionAr?: string;
  heroIcon?: string;
  heroImageAlt?: string;
  heroImageAltAr?: string;

  // About Section
  aboutTitle?: string;
  aboutTitleAr?: string;
  aboutContent?: string;
  aboutContentAr?: string;
  aboutImage?: string;
  aboutImageAlt?: string;
  aboutImageAltAr?: string;

  // How It Works Section
  howItWorks?: HowItWorkItem[];

  // Key Features Section
  keyFeaturesTitle?: string;
  keyFeaturesTitleAr?: string;
  keyFeaturesImages?: string[];
  keyFeaturesImageAlt?: string;
  keyFeaturesImageAltAr?: string;
  keyFeaturesList?: (string | KeyFeatureItem)[];
  keyFeaturesListAr?: (string | KeyFeatureItem)[];

  // Benefits Section
  benefits?: BenefitItem[];

  // Vision Section
  visionTitle?: string;
  visionTitleAr?: string;
  visionSubtitle?: string;
  visionSubtitleAr?: string;
  visionItems?: VisionItem[];

  // Why Sharp Section
  whySharpTitle?: string;
  whySharpTitleAr?: string;
  whySharpContent?: string;
  whySharpContentAr?: string;
  whySharpImage?: string;
  whySharpImageAlt?: string;
  whySharpImageAltAr?: string;

  // CTA Section
  ctaTitle?: string;
  ctaTitleAr?: string;
  ctaDescription?: string;
  ctaDescriptionAr?: string;
  ctaButton1Text?: string;
  ctaButton1TextAr?: string;
  ctaButton1Link?: string;
  ctaButton2Text?: string;
  ctaButton2TextAr?: string;
  ctaButton2Link?: string;

  // FAQ Section
  faqs?: FAQItem[];

  // SEO Fields
  metaTitle?: string;
  metaTitleAr?: string;
  metaKeywords?: string;
  metaKeywordsAr?: string;

  // Gallery
  gallery?: string[];
  galleryAlt?: string;
  galleryAltAr?: string;

  // Status
  order: number;
  isPublished: boolean;
  publishedAt?: Date;
  views: number;

  // Audit fields
  createdBy: number;
  updatedBy?: number;
  createdAt: Date;
  updatedAt: Date;
  creator?: {
    id: number;
    name: string;
    email: string;
    avatar?: string;
  };
}

export interface ProductResponse {
  success: boolean;
  status_code: number;
  message: string;
  result?: Product | Product[];
  data?: Product | Product[];
  pagination?: {
    total: number;
    page: number;
    limit: number;
    pages: number;
  };
  time?: number;
  ex?: string;
}

export interface ProductFilters {
  page?: number;
  limit?: number;
  search?: string;
  status?: 'published' | 'draft' | '';
  sortBy?: string;
  sortOrder?: 'ASC' | 'DESC';
}