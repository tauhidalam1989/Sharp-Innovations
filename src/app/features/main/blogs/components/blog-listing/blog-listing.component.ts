import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { Router } from '@angular/router';
import { BlogService } from '../../../../../dashboard/pages/blog/services/blog.service';
import { Blog, BlogFilters } from '../../../../../dashboard/pages/blog/models/blog.model';
import { environment } from '../../../../../../environments/environment';

import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { LanguageService } from '../../../../shared/services/language.service';
import { SeoService } from '../../../../shared/services/seo.service';
import { isPlatformBrowser, isPlatformServer } from '@angular/common';

@Component({
  selector: 'app-blog-listing',
  templateUrl: './blog-listing.component.html',
  styleUrls: ['./blog-listing.component.scss']
})
export class BlogListingComponent implements OnInit {
  blogs: Blog[] = [];
  loading = false;
  totalItems = 0;
  currentPage = 1;
  pageSize = 12; // 12 is a good grid size (3x4 or 4x3)
  searchTerm = '';
  categoryFilter = '';
  tagFilter = '';
  currentLang: 'en' | 'ar' = 'en';

  categories: string[] = [];
  tags: string[] = [];
  categoriesAr: string[] = [];
  tagsAr: string[] = [];
  private isBrowser: boolean;
  private isServer: boolean;

  constructor(
    private blogService: BlogService,
    private router: Router,
    private translate: TranslateService,
    private languageService: LanguageService,
    private seoService: SeoService,
    @Inject(PLATFORM_ID) platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
    this.isServer = isPlatformServer(platformId);
    this.currentLang = this.languageService.getLanguage() as 'en' | 'ar';
    // Set meta tags synchronously for SSR
    this.seoService.setServerSideMetaTags('BLOGS');
  }

  ngOnInit(): void {
    this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
      this.currentLang = event.lang as 'en' | 'ar';
    });

    // Set translated meta tags (browser-only to avoid overwriting SSR defaults with raw keys)
    if (this.isBrowser) {
      this.translate.get(['SEO.BLOGS.TITLE', 'SEO.BLOGS.DESCRIPTION', 'SEO.BLOGS.KEYWORDS']).subscribe(translations => {
        this.seoService.updateMetaTags({
          title: translations['SEO.BLOGS.TITLE'],
          description: translations['SEO.BLOGS.DESCRIPTION'],
          keywords: translations['SEO.BLOGS.KEYWORDS'],
          url: 'https://sharpinvotech.com/blogs',
          page: 'BLOGS'
        });
      });
    }

    this.loadBlogs();
    this.loadMetadata();
  }

  loadBlogs(): void {
    this.loading = true;

    const filters: BlogFilters = {
      page: this.currentPage,
      limit: this.pageSize,
      status: 'published', // Critical: only show published blogs
      sortBy: 'createdAt',
      sortOrder: 'DESC'
    };

    if (this.searchTerm) {
      filters.search = this.searchTerm;
    }

    if (this.categoryFilter) {
      filters.category = this.categoryFilter;
    }

    if (this.tagFilter) {
      filters.tag = this.tagFilter;
    }

    this.blogService.getBlogs(filters).subscribe({
      next: (response) => {
        if (response.success) {
          this.blogs = response.result as Blog[];
          this.totalItems = response.pagination?.total || 0;
          if (this.isServer) {
            console.log(`[SSR-BlogListing] Loaded ${this.blogs.length} blogs. Lang: ${this.currentLang}`);
          }
        }
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading blogs:', error);
        this.loading = false;
      }
    });
  }

  loadMetadata(): void {
    // We only need categories and tags from published blogs
    this.blogService.getBlogs({ limit: 100, status: 'published' }).subscribe({
      next: (response) => {
        if (response.success) {
          const allBlogs = response.result as Blog[];
          const categorySet = new Set<string>();
          const tagSet = new Set<string>();
          const categorySetAr = new Set<string>();
          const tagSetAr = new Set<string>();

          allBlogs.forEach(blog => {
            blog.categories?.forEach(cat => categorySet.add(cat));
            blog.tags?.forEach(tag => tagSet.add(tag));
            blog.categoriesAr?.forEach(cat => categorySetAr.add(cat));
            blog.tagsAr?.forEach(tag => tagSetAr.add(tag));
          });

          this.categories = Array.from(categorySet);
          this.tags = Array.from(tagSet);
          this.categoriesAr = Array.from(categorySetAr);
          this.tagsAr = Array.from(tagSetAr);
        }
      }
    });
  }

  onSearch(): void {
    this.currentPage = 1;
    this.loadBlogs();
  }

  onFilterChange(): void {
    this.currentPage = 1;
    this.loadBlogs();
  }

  onPageChange(page: number): void {
    this.currentPage = page;
    this.loadBlogs();
  }

  viewBlog(slug: string | undefined, id: number): void {
    // Prefer slug if available, otherwise fallback to id
    const identifier = slug || id;
    this.router.navigate([`/blogs/${identifier}`]);
  }

  clearFilters(): void {
    this.searchTerm = '';
    this.categoryFilter = '';
    this.tagFilter = '';
    this.onFilterChange();
  }

  getTagLength(blog: Blog): number {
    return (this.currentLang === 'ar' ? blog.tagsAr?.length : blog.tags?.length) || 0;
  }

  hasTags(blog: Blog): boolean {
    if (this.currentLang === 'ar') {
      return !!(blog.tagsAr && blog.tagsAr.length > 0);
    }
    return !!(blog.tags && blog.tags.length > 0);
  }

  getReadingTimeText(minutes: number): string {
    if (!minutes) return '';
    return `${minutes} min read`;
  }

  getImageUrl(path: string | undefined): string {
    if (!path) return '';
    if (path.startsWith('http')) return path;
    const baseUrl = environment.apiUrl.replace('/v1', '');
    const separator = path.startsWith('/') ? '' : '/';
    return `${baseUrl}${separator}${path}`;
  }
}
