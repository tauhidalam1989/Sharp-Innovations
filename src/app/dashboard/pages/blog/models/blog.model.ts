export interface Blog {
  id: number;
  title: string;
  slug: string;
  titleAr?: string;
  excerpt?: string;
  excerptAr?: string;
  content: string;
  contentAr?: string;
  featuredImage?: string;
  featuredImageAlt?: string;
  featuredImageAltAr?: string;
  gallery?: string[];
  galleryAlt?: string;
  galleryAltAr?: string;
  categories?: string[];
  categoriesAr?: string[];
  tags?: string[];
  tagsAr?: string[];
  metaTitle?: string;
  metaTitleAr?: string;
  metaDescription?: string;
  metaDescriptionAr?: string;
  metaKeywords?: string;
  metaKeywordsAr?: string;
  isPublished: boolean;
  publishedAt?: Date;
  views: number;
  likes: number;
  shares: number;
  readingTime?: number;
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

export interface BlogResponse {
  success: boolean;
  message: string;
  result: Blog | Blog[];
  pagination?: {
    total: number;
    page: number;
    limit: number;
    pages: number;
  };
}

export interface BlogFilters {
  page?: number;
  limit?: number;
  search?: string;
  category?: string;
  tag?: string;
  status?: 'published' | 'draft' | '';
  sortBy?: string;
  sortOrder?: 'ASC' | 'DESC';
}

export interface BlogStats {
  total: number;
  published: number;
  draft: number;
  totalViews: number;
  totalLikes: number;
}

export interface BlogArchive {
  year: number;
  month: number;
  count: number;
}