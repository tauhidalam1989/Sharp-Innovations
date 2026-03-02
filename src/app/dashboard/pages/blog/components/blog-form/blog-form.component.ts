// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-blog-form',
//   templateUrl: './blog-form.component.html',
//   styleUrls: ['./blog-form.component.scss']
// })
// export class BlogFormComponent {

// }


import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BlogService } from '../../services/blog.service';
import { Blog } from '../../models/blog.model';
import { environment } from '../../../../../../environments/environment';

@Component({
  selector: 'app-blog-form',
  templateUrl: './blog-form.component.html',
  styleUrls: ['./blog-form.component.scss']
})
export class BlogFormComponent implements OnInit {
  blogForm!: FormGroup;
  isEditMode = false;
  blogId: number | null = null;
  loading = false;
  submitting = false;
  error = '';
  featuredImagePreview: string | null = null;
  galleryPreviews: string[] = [];
  selectedFeaturedImage: File | null = null;
  selectedGallery: File[] = [];

  quillConfig = {
    toolbar: [
      ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
      ['blockquote', 'code-block'],
      [{ 'header': 1 }, { 'header': 2 }],               // custom button values
      [{ 'list': 'ordered' }, { 'list': 'bullet' }],
      [{ 'script': 'sub' }, { 'script': 'super' }],      // superscript/subscript
      [{ 'indent': '-1' }, { 'indent': '+1' }],          // outdent/indent
      [{ 'direction': 'rtl' }],                         // text direction
      [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
      [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
      [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
      [{ 'font': [] }],
      [{ 'align': [] }],
      ['clean'],                                         // remove formatting button
      ['link', 'image', 'video']                         // link and image, video
    ]
  };

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private blogService: BlogService
  ) { }

  ngOnInit(): void {
    this.initializeForm();
    this.checkEditMode();
  }

  initializeForm(): void {
    this.blogForm = this.formBuilder.group({
      title: ['', [Validators.required, Validators.maxLength(200)]],
      titleAr: ['', [Validators.maxLength(200)]],
      slug: ['', [Validators.required, Validators.pattern(/^[a-z0-9-]+$/)]],
      excerpt: ['', Validators.maxLength(500)],
      excerptAr: ['', Validators.maxLength(500)],
      content: ['', Validators.required],
      contentAr: [''],
      featuredImage: [''],
      featuredImageAlt: [''],
      featuredImageAltAr: [''],
      gallery: this.formBuilder.array([]),
      categories: this.formBuilder.array([]),
      categoriesAr: this.formBuilder.array([]),
      tags: this.formBuilder.array([]),
      tagsAr: this.formBuilder.array([]),
      metaTitle: ['', Validators.maxLength(200)],
      metaTitleAr: ['', Validators.maxLength(200)],
      metaDescription: ['', Validators.maxLength(500)],
      metaDescriptionAr: ['', Validators.maxLength(500)],
      metaKeywords: ['', Validators.maxLength(500)],
      metaKeywordsAr: ['', Validators.maxLength(500)],
      galleryAlt: [''],
      galleryAltAr: [''],
      isPublished: [false]
    });

    // Add one empty category and tag by default
    this.addCategory();
    this.addCategoryAr();
    this.addTag();
    this.addTagAr();
  }

  // Categories FormArray
  get categories(): FormArray {
    return this.blogForm.get('categories') as FormArray;
  }

  addCategory(): void {
    this.categories.push(this.formBuilder.control(''));
  }

  removeCategory(index: number): void {
    this.categories.removeAt(index);
  }

  // Categories Ar FormArray
  get categoriesAr(): FormArray {
    return this.blogForm.get('categoriesAr') as FormArray;
  }

  addCategoryAr(): void {
    this.categoriesAr.push(this.formBuilder.control(''));
  }

  removeCategoryAr(index: number): void {
    this.categoriesAr.removeAt(index);
  }

  // Tags FormArray
  get tags(): FormArray {
    return this.blogForm.get('tags') as FormArray;
  }

  addTag(): void {
    this.tags.push(this.formBuilder.control(''));
  }

  removeTag(index: number): void {
    this.tags.removeAt(index);
  }

  // Tags Ar FormArray
  get tagsAr(): FormArray {
    return this.blogForm.get('tagsAr') as FormArray;
  }

  addTagAr(): void {
    this.tagsAr.push(this.formBuilder.control(''));
  }

  removeTagAr(index: number): void {
    this.tagsAr.removeAt(index);
  }

  // Gallery FormArray
  get gallery(): FormArray {
    return this.blogForm.get('gallery') as FormArray;
  }

  addGalleryImage(url: string = ''): void {
    this.gallery.push(this.formBuilder.control(url));
  }

  removeGalleryImage(index: number): void {
    this.galleryPreviews.splice(index, 1);
    if (index < this.gallery.length) {
      this.gallery.removeAt(index);
    } else {
      const newIndex = index - this.gallery.length;
      if (this.selectedGallery && this.selectedGallery[newIndex]) {
        this.selectedGallery.splice(newIndex, 1);
      }
    }
  }

  checkEditMode(): void {
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.isEditMode = true;
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
          this.patchFormValues(response.result as Blog);
        }
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading blog:', error);
        this.error = 'Failed to load blog data';
        this.loading = false;
      }
    });
  }

  patchFormValues(blog: Blog): void {
    // Clear existing arrays
    while (this.categories.length) {
      this.categories.removeAt(0);
    }
    while (this.categoriesAr.length) {
      this.categoriesAr.removeAt(0);
    }
    while (this.tags.length) {
      this.tags.removeAt(0);
    }
    while (this.tagsAr.length) {
      this.tagsAr.removeAt(0);
    }
    while (this.gallery.length) {
      this.gallery.removeAt(0);
    }

    // Add categories
    if (blog.categories && blog.categories.length) {
      blog.categories.forEach(cat => {
        this.categories.push(this.formBuilder.control(cat));
      });
    } else {
      this.addCategory();
    }

    // Add categories Ar
    if (blog.categoriesAr && blog.categoriesAr.length) {
      blog.categoriesAr.forEach(cat => {
        this.categoriesAr.push(this.formBuilder.control(cat));
      });
    } else {
      this.addCategoryAr();
    }

    // Add tags
    if (blog.tags && blog.tags.length) {
      blog.tags.forEach(tag => {
        this.tags.push(this.formBuilder.control(tag));
      });
    } else {
      this.addTag();
    }

    // Add tags Ar
    if (blog.tagsAr && blog.tagsAr.length) {
      blog.tagsAr.forEach(tag => {
        this.tagsAr.push(this.formBuilder.control(tag));
      });
    } else {
      this.addTagAr();
    }

    // Add gallery images
    if (blog.gallery && blog.gallery.length) {
      blog.gallery.forEach(img => {
        this.gallery.push(this.formBuilder.control(img));
        this.galleryPreviews.push(this.getImageUrl(img));
      });
    }

    // Set featured image preview
    if (blog.featuredImage) {
      this.featuredImagePreview = this.getImageUrl(blog.featuredImage);
    }

    // Patch form values
    this.blogForm.patchValue({
      title: blog.title,
      titleAr: blog.titleAr || '',
      slug: blog.slug,
      excerpt: blog.excerpt || '',
      excerptAr: blog.excerptAr || '',
      content: blog.content,
      contentAr: blog.contentAr || '',
      featuredImage: blog.featuredImage || '',
      featuredImageAlt: blog.featuredImageAlt || '',
      featuredImageAltAr: blog.featuredImageAltAr || '',
      metaTitle: blog.metaTitle || '',
      metaTitleAr: blog.metaTitleAr || '',
      metaDescription: blog.metaDescription || '',
      metaDescriptionAr: blog.metaDescriptionAr || '',
      metaKeywords: blog.metaKeywords || '',
      metaKeywordsAr: blog.metaKeywordsAr || '',
      galleryAlt: blog.galleryAlt || '',
      galleryAltAr: blog.galleryAltAr || '',
      isPublished: blog.isPublished
    });
  }

  private getImageUrl(path: string | null): string {
    if (!path) return '';
    if (path.startsWith('http')) return path;
    const baseUrl = environment.apiUrl.replace('/v1', '');
    const separator = path.startsWith('/') ? '' : '/';
    return `${baseUrl}${separator}${path}`;
  }

  generateSlug(): void {
    const title = this.blogForm.get('title')?.value;
    if (title && !this.isEditMode) {
      const slug = title
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-');
      this.blogForm.get('slug')?.setValue(slug);
    }
  }

  onFeaturedImageSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.selectedFeaturedImage = file;
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.featuredImagePreview = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }

  onGalleryImagesSelected(event: any): void {
    const files = event.target.files;
    if (files && files.length) {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        this.selectedGallery.push(file);

        const reader = new FileReader();
        reader.onload = (e: any) => {
          this.galleryPreviews.push(e.target.result);
        };
        reader.readAsDataURL(file);
      }
    }
  }

  removeFeaturedImage(): void {
    this.featuredImagePreview = null;
    this.selectedFeaturedImage = null;
    this.blogForm.get('featuredImage')?.setValue('');
    const fileInput = document.getElementById('featuredImage') as HTMLInputElement;
    if (fileInput) fileInput.value = '';
  }

  onSubmit(): void {
    if (this.blogForm.invalid) {
      this.markFormGroupTouched(this.blogForm);
      return;
    }

    this.submitting = true;
    this.error = '';

    const formValue = this.blogForm.value;
    const hasNewFiles = !!this.selectedFeaturedImage || this.selectedGallery.length > 0;

    let payload: any;

    if (hasNewFiles || !this.isEditMode) {
      // Must use FormData for new creations or if new files are selected
      payload = this.prepareFormData();
    } else {
      // Use JSON if purely updating text/existing data
      payload = {
        title: formValue.title,
        titleAr: formValue.titleAr,
        slug: formValue.slug,
        excerpt: formValue.excerpt,
        excerptAr: formValue.excerptAr,
        content: formValue.content,
        contentAr: formValue.contentAr,
        metaTitle: formValue.metaTitle,
        metaTitleAr: formValue.metaTitleAr,
        metaDescription: formValue.metaDescription,
        metaDescriptionAr: formValue.metaDescriptionAr,
        featuredImageAlt: formValue.featuredImageAlt,
        featuredImageAltAr: formValue.featuredImageAltAr,
        metaKeywords: formValue.metaKeywords,
        metaKeywordsAr: formValue.metaKeywordsAr,
        categories: formValue.categories,
        categoriesAr: formValue.categoriesAr,
        tags: formValue.tags,
        tagsAr: formValue.tagsAr,
        galleryAlt: formValue.galleryAlt,
        galleryAltAr: formValue.galleryAltAr,
        isPublished: formValue.isPublished,
        featuredImage: formValue.featuredImage,
        gallery: this.blogForm.get('gallery')?.value || []
      };
    }

    if (this.isEditMode && this.blogId) {
      // Update existing blog
      this.blogService.updateBlog(this.blogId, payload).subscribe({
        next: (response) => {
          if (response.success) {
            this.router.navigate(['/blog', this.blogId]);
          }
          this.submitting = false;
        },
        error: (error) => {
          console.error('Error updating blog:', error);
          this.error = error.error?.message || 'Failed to update blog';
          this.submitting = false;
        }
      });
    } else {
      // Create new blog
      this.blogService.createBlog(payload).subscribe({
        next: (response) => {
          if (response.success) {
            const newBlog = response.result as Blog;
            if (newBlog && newBlog.id) {
              this.router.navigate(['/blog', newBlog.id]);
            } else {
              this.router.navigate(['/blog']);
            }
          }
          this.submitting = false;
        },
        error: (error) => {
          console.error('Error creating blog:', error);
          this.error = error.error?.message || 'Failed to create blog';
          this.submitting = false;
        }
      });
    }
  }

  prepareFormData(): FormData {
    const formData = new FormData();
    const formValue = this.blogForm.value;

    // Append text fields
    const textFields = [
      'title', 'slug', 'excerpt', 'content', 'titleAr', 'excerptAr', 'contentAr', 'featuredImageAlt', 'featuredImageAltAr', 'metaTitle', 'metaDescription', 'metaKeywords',
      'metaTitleAr', 'metaDescriptionAr', 'metaKeywordsAr', 'galleryAlt', 'galleryAltAr'
    ];

    textFields.forEach(field => {
      if (formValue[field]?.trim()) {
        formData.append(field, formValue[field]);
      }
    });

    formData.append('isPublished', formValue.isPublished.toString());

    // Filter out empty categories and tags
    const categories = formValue.categories.filter((cat: string) => cat && cat.trim() !== '');
    const categoriesAr = formValue.categoriesAr.filter((cat: string) => cat && cat.trim() !== '');
    const tags = formValue.tags.filter((tag: string) => tag && tag.trim() !== '');
    const tagsAr = formValue.tagsAr.filter((tag: string) => tag && tag.trim() !== '');

    if (categories.length) {
      categories.forEach((cat: string, index: number) => formData.append(`categories[${index}]`, cat));
    }
    if (categoriesAr.length) {
      categoriesAr.forEach((cat: string, index: number) => formData.append(`categoriesAr[${index}]`, cat));
    }
    if (tags.length) {
      tags.forEach((tag: string, index: number) => formData.append(`tags[${index}]`, tag));
    }
    if (tagsAr.length) {
      tagsAr.forEach((tag: string, index: number) => formData.append(`tagsAr[${index}]`, tag));
    }

    // Also send the existing gallery as JSON strings explicitly, so the backend can merge them.
    const existingGallery = this.gallery.value.filter((img: string) => img && img.trim() !== '');
    if (existingGallery.length) {
      formData.append('existingGallery', JSON.stringify(existingGallery));
    }

    // Append image files
    if (this.selectedFeaturedImage) {
      formData.append('featuredImage', this.selectedFeaturedImage, this.selectedFeaturedImage.name);
    } else if (formValue.featuredImage !== null && formValue.featuredImage !== '') {
      formData.append('featuredImage', formValue.featuredImage);
    }

    if (this.selectedGallery?.length) {
      this.selectedGallery.forEach(file => {
        formData.append('gallery', file, file.name);
      });
    }

    return formData;
  }

  markFormGroupTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();
      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      }
    });
  }

  onCancel(): void {
    if (this.isEditMode && this.blogId) {
      this.router.navigate(['/blog', this.blogId]);
    } else {
      this.router.navigate(['/blog']);
    }
  }

  // Convenience getters
  get title() { return this.blogForm.get('title'); }
  get slug() { return this.blogForm.get('slug'); }
  get content() { return this.blogForm.get('content'); }
  get titleAr() { return this.blogForm.get('titleAr'); }
  get contentAr() { return this.blogForm.get('contentAr'); }
  get metaTitle() { return this.blogForm.get('metaTitle'); }
  get metaTitleAr() { return this.blogForm.get('metaTitleAr'); }
  get metaDescription() { return this.blogForm.get('metaDescription'); }
  get metaDescriptionAr() { return this.blogForm.get('metaDescriptionAr'); }
}