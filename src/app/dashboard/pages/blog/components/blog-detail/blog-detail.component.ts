// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-blog-detail',
//   templateUrl: './blog-detail.component.html',
//   styleUrls: ['./blog-detail.component.scss']
// })
// export class BlogDetailComponent {

// }


import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BlogService } from '../../services/blog.service';
import { Blog } from '../../models/blog.model';
import { environment } from '../../../../../../environments/environment';

@Component({
  selector: 'app-blog-detail',
  templateUrl: './blog-detail.component.html',
  styleUrls: ['./blog-detail.component.scss']
})
export class BlogDetailComponent implements OnInit {
  blog: Blog | null = null;
  loading = false;
  error = '';
  blogId: number | null = null;
  relatedPosts: Blog[] = [];
  currentGalleryIndex = 0;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private blogService: BlogService
  ) { }



  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.blogId = +params['id'];
        this.loadBlogData(this.blogId);
      }
    });
  }

  loadBlogData(id: number): void {
    this.loading = true;
    this.blogService.getBlogById(id).subscribe({
      next: (response) => {
        if (response.success) {
          this.blog = response.result as Blog;
          this.loadRelatedPosts();
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
        },
        error: (error) => console.error('Error liking post:', error)
      });
    }
  }

  sharePost(): void {
    if (this.blog) {
      this.blogService.shareBlog(this.blog.id).subscribe({
        next: (response) => {
          if (response.success) {
            this.blog!.shares++;
            // Copy URL to clipboard
            const url = window.location.href;
            navigator.clipboard.writeText(url).then(() => {
              alert('Link copied to clipboard!');
            });
          }
        },
        error: (error) => console.error('Error sharing post:', error)
      });
    }
  }

  editPost(): void {
    if (this.blog) {
      this.router.navigate(['/blog/edit', this.blog.id]);
    }
  }

  deletePost(): void {
    if (this.blog) {
      // Temporarily skipping native confirm to see if browser was blocking it
      this.blogService.deleteBlog(this.blog.id).subscribe({
        next: (response) => {
          if (response.success) {
            console.log('Successfully deleted blog ' + this.blog!.id);
            this.router.navigate(['/blog']);
          } else {
            console.error('Failed to delete blog: ' + response.message);
          }
        },
        error: (error) => {
          console.error('Error deleting blog:', error);
          this.error = 'Failed to delete blog post';
        }
      });
    }
  }

  togglePublish(): void {
    if (!this.blog) return;

    const action = this.blog.isPublished ? 'unpublish' : 'publish';
    const request = this.blog.isPublished
      ? this.blogService.unpublishBlog(this.blog.id)
      : this.blogService.publishBlog(this.blog.id);

    request.subscribe({
      next: (response) => {
        if (response.success) {
          this.blog!.isPublished = !this.blog!.isPublished;
        }
      },
      error: (error) => {
        console.error(`Error ${action}ing blog:`, error);
        this.error = `Failed to ${action} blog post`;
      }
    });
  }

  goBack(): void {
    this.router.navigate(['/blog']);
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
    if (minutes < 60) {
      return `${minutes} min read`;
    }
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return `${hours} hr ${remainingMinutes > 0 ? remainingMinutes + ' min' : ''} read`;
  }

  formatDate(date: Date | undefined): string {
    if (!date) return '';
    return new Date(date).toLocaleDateString('en-US', {
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