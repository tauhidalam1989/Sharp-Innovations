// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-blog-list',
//   templateUrl: './blog-list.component.html',
//   styleUrls: ['./blog-list.component.scss']
// })
// export class BlogListComponent {

// }


import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BlogService } from '../../services/blog.service';
import { Blog, BlogFilters } from '../../models/blog.model';
import { environment } from '../../../../../../environments/environment';

@Component({
  selector: 'app-blog-list',
  templateUrl: './blog-list.component.html',
  styleUrls: ['./blog-list.component.scss']
})
export class BlogListComponent implements OnInit {
  blogs: Blog[] = [];
  loading = false;
  totalItems = 0;
  currentPage = 1;
  pageSize = 10;
  searchTerm = '';
  categoryFilter = '';
  tagFilter = '';
  statusFilter: 'all' | 'published' | 'draft' = 'all';
  sortBy = 'createdAt';
  sortOrder: 'ASC' | 'DESC' = 'DESC';

  categories: string[] = [];
  tags: string[] = [];

  constructor(
    private blogService: BlogService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loadBlogs();
    this.loadMetadata();
  }

  loadBlogs(): void {
    this.loading = true;

    const filters: BlogFilters = {
      page: this.currentPage,
      limit: this.pageSize,
      sortBy: this.sortBy,
      sortOrder: this.sortOrder
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

    if (this.statusFilter !== 'all') {
      filters.status = this.statusFilter;
    }

    this.blogService.getBlogs(filters).subscribe({
      next: (response) => {
        if (response.success) {
          this.blogs = response.result as Blog[];
          this.totalItems = response.pagination?.total || 0;
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
    // Extract unique categories and tags from blogs
    // This could also come from a separate API endpoint
    this.blogService.getBlogs({ limit: 100 }).subscribe({
      next: (response) => {
        if (response.success) {
          const allBlogs = response.result as Blog[];
          const categorySet = new Set<string>();
          const tagSet = new Set<string>();

          allBlogs.forEach(blog => {
            blog.categories?.forEach(cat => categorySet.add(cat));
            blog.tags?.forEach(tag => tagSet.add(tag));
          });

          this.categories = Array.from(categorySet);
          this.tags = Array.from(tagSet);
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

  onSortChange(column: string): void {
    if (this.sortBy === column) {
      this.sortOrder = this.sortOrder === 'ASC' ? 'DESC' : 'ASC';
    } else {
      this.sortBy = column;
      this.sortOrder = 'DESC';
    }
    this.loadBlogs();
  }

  onPageChange(page: number): void {
    this.currentPage = page;
    this.loadBlogs();
  }

  createNew(): void {
    this.router.navigate(['/blog/new']);
  }

  editBlog(id: number): void {
    this.router.navigate([`/blog/edit/${id}`]);
  }

  viewBlog(id: number): void {
    this.router.navigate([`/blog/${id}`]);
  }

  deleteBlog(id: number): void {
    // Temporarily skipping native confirm to see if browser was blocking it
    this.blogService.deleteBlog(id).subscribe({
      next: (response) => {
        if (response.success) {
          console.log('Successfully deleted blog ' + id);
          this.loadBlogs();
        } else {
          console.error('Failed to delete blog: ' + response.message);
        }
      },
      error: (error) => {
        console.error('Error deleting blog:', error);
      }
    });
  }

  togglePublish(blog: Blog): void {
    const action = blog.isPublished ? 'unpublish' : 'publish';
    if (confirm(`Are you sure you want to ${action} this blog post?`)) {
      const request = blog.isPublished
        ? this.blogService.unpublishBlog(blog.id)
        : this.blogService.publishBlog(blog.id);

      request.subscribe({
        next: (response) => {
          if (response.success) {
            blog.isPublished = !blog.isPublished;
          }
        },
        error: (error) => {
          console.error(`Error ${action}ing blog:`, error);
        }
      });
    }
  }

  getSortIcon(column: string): string {
    if (this.sortBy !== column) {
      return 'fa-sort';
    }
    return this.sortOrder === 'ASC' ? 'fa-sort-up' : 'fa-sort-down';
  }

  getReadingTimeText(minutes: number): string {
    if (!minutes) return '';
    return `${minutes} min read`;
  }

  clearFilters(): void {
    this.searchTerm = '';
    this.categoryFilter = '';
    this.tagFilter = '';
    this.statusFilter = 'all';
    this.onFilterChange();
  }

  // Add these methods to your component
  getTagLength(blog: Blog): number {
    return blog.tags ? blog.tags.length : 0;
  }

  getCategoryLength(blog: Blog): number {
    return blog.categories?.length || 0;
  }

  hasTags(blog: Blog): boolean {
    return !!(blog.tags && blog.tags.length > 0);
  }

  hasCategories(blog: Blog): boolean {
    return !!blog.categories && blog.categories.length > 0;
  }

  getImageUrl(path: string | undefined): string {
    if (!path) return '';
    if (path.startsWith('http')) return path;
    const baseUrl = environment.apiUrl.replace('/v1', '');
    const separator = path.startsWith('/') ? '' : '/';
    return `${baseUrl}${separator}${path}`;
  }
}