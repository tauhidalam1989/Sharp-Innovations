import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BlogService } from '../../../../../dashboard/pages/blog/services/blog.service';
import { Blog } from '../../../../../dashboard/pages/blog/models/blog.model';
import { environment } from '../../../../../../environments/environment';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { LanguageService } from '../../../../shared/services/language.service';

@Component({
  selector: 'app-blog-detail',
  templateUrl: './blog-detail.component.html',
  styleUrls: ['./blog-detail.component.scss']
})
export class BlogDetailComponent implements OnInit {
  blog: Blog | null = null;
  loading = false;
  error = '';
  relatedPosts: Blog[] = [];
  currentGalleryIndex = 0;
  currentLang: 'en' | 'ar' = 'en';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private blogService: BlogService,
    private languageService: LanguageService,
    private translate: TranslateService
  ) {
    this.currentLang = this.languageService.getLanguage() as 'en' | 'ar';
  }

  ngOnInit(): void {
    this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
      this.currentLang = event.lang as 'en' | 'ar';
    });

    this.route.params.subscribe(params => {
      const identifier = params['id'];
      if (identifier) {
        this.loadBlogData(identifier);
      }
    });
  }

  loadBlogData(identifier: string): void {
    this.loading = true;

    // Check if identifier is numeric (ID) or a string (Slug)
    const isNumeric = !isNaN(Number(identifier));
    const request = isNumeric
      ? this.blogService.getBlogById(Number(identifier))
      : this.blogService.getBlogBySlug(identifier);

    request.subscribe({
      next: (response) => {
        if (response.success) {
          this.blog = response.result as Blog;
          this.loadRelatedPosts();
        } else {
          this.error = 'Failed to load blog post';
        }
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading blog:', error);
        this.error = 'Failed to load blog post';
        this.loading = false;
      }
    });
  }

  loadRelatedPosts(): void {
    if (this.blog && this.blog.tags && this.blog.tags.length > 0) {
      this.blogService.getRelatedPosts(this.blog.id, 3).subscribe({
        next: (response) => {
          if (response.success) {
            this.relatedPosts = response.result as Blog[];
          }
        },
        error: (error) => console.error('Error loading related posts:', error)
      });
    }
  }

  likePost(): void {
    if (this.blog) {
      this.blogService.likeBlog(this.blog.id).subscribe({
        next: (response) => {
          if (response.success) {
            this.blog!.likes++;
          }
        }
      });
    }
  }

  sharePost(): void {
    if (this.blog) {
      this.blogService.shareBlog(this.blog.id).subscribe({
        next: (response) => {
          if (response.success) {
            this.blog!.shares++;
            const url = window.location.href;
            navigator.clipboard.writeText(url).then(() => {
              alert('Link copied to clipboard!');
            });
          }
        }
      });
    }
  }

  goBack(): void {
    this.router.navigate(['/blogs']);
  }

  toggleLanguage(lang: 'en' | 'ar'): void {
    this.currentLang = lang;
  }

  nextGalleryImage(): void {
    if (this.blog?.gallery && this.currentGalleryIndex < this.blog.gallery.length - 1) {
      this.currentGalleryIndex++;
    }
  }

  prevGalleryImage(): void {
    if (this.currentGalleryIndex > 0) {
      this.currentGalleryIndex--;
    }
  }

  getReadingTimeText(): string {
    if (!this.blog?.readingTime) return '';
    const minutes = this.blog.readingTime;
    if (minutes < 60) return `${minutes} min read`;
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return `${hours} hr ${remainingMinutes > 0 ? remainingMinutes + ' min' : ''} read`;
  }

  formatDate(date: Date | undefined): string {
    if (!date) return '';
    return new Date(date).toLocaleDateString(this.currentLang === 'ar' ? 'ar-SA' : 'en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }

  shareOnFacebook(): void {
    if (this.blog) {
      const url = encodeURIComponent(window.location.href);
      const title = encodeURIComponent(this.blog.title);
      window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}&quote=${title}`, '_blank', 'width=600,height=400');
    }
  }

  shareOnTwitter(): void {
    if (this.blog) {
      const url = encodeURIComponent(window.location.href);
      const text = encodeURIComponent(this.blog.title);
      window.open(`https://twitter.com/intent/tweet?url=${url}&text=${text}`, '_blank', 'width=600,height=400');
    }
  }

  shareOnLinkedIn(): void {
    if (this.blog) {
      const url = encodeURIComponent(window.location.href);
      const title = encodeURIComponent(this.blog.title);
      window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${url}&title=${title}`, '_blank', 'width=600,height=400');
    }
  }

  getImageUrl(path: string | undefined): string {
    if (!path) return '';
    if (path.startsWith('http')) return path;
    const baseUrl = environment.apiUrl.replace('/v1', '');
    const separator = path.startsWith('/') ? '' : '/';
    return `${baseUrl}${separator}${path}`;
  }
}
