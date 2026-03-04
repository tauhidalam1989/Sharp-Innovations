import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../products/product.service';
import { Product, HowItWorkItem, BenefitItem, VisionItem, FAQItem, ProductCategory } from '../../products/product.model';
import { environment } from '../../../../../../environments/environment';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss']
})
export class ProductFormComponent implements OnInit {
  productForm!: FormGroup;
  isEditMode = false;
  productId: number | null = null;
  loading = false;
  submitting = false;
  error = '';

  // Add this property - controls which tab is active
  activeTab: string = 'basic'; // Default to 'basic' tab

  // Image previews
  heroIconPreview: string | null = null;
  aboutImagePreview: string | null = null;
  whySharpImagePreview: string | null = null;
  keyFeaturesImagePreviews: string[] = [];
  galleryPreviews: string[] = [];

  // Selected files for upload
  selectedHeroIcon: File | null = null;
  selectedAboutImage: File | null = null;
  selectedWhySharpImage: File | null = null;
  selectedKeyFeaturesImages: File[] = [];
  selectedGallery: File[] = [];

  // Character limits
  readonly TITLE_MAX_LENGTH = 200;
  readonly SHORT_DESC_MAX_LENGTH = 500;
  readonly META_TITLE_MAX_LENGTH = 200;
  readonly META_DESC_MAX_LENGTH = 500;
  readonly META_KEYWORDS_MAX_LENGTH = 500;

  // Available icons for dropdowns
  availableIcons = [
    { class: 'fas fa-cog', name: 'Settings / Cog' },
    { class: 'fas fa-database', name: 'Database' },
    { class: 'fas fa-shield-alt', name: 'Security' },
    { class: 'fas fa-chart-line', name: 'Analytics' },
    { class: 'fas fa-mobile-alt', name: 'Mobile App' },
    { class: 'fas fa-globe', name: 'Web / Globe' },
    { class: 'fas fa-cloud', name: 'Cloud' },
    { class: 'fas fa-robot', name: 'AI / Robot' },
    { class: 'fas fa-cogs', name: 'Gears' },
    { class: 'fas fa-server', name: 'Server' },
    { class: 'fas fa-code', name: 'Code' },
    { class: 'fas fa-laptop-code', name: 'Laptop Code' },
    { class: 'fas fa-search', name: 'Search / SEO' },
    { class: 'fas fa-bullhorn', name: 'Marketing' },
    { class: 'fas fa-users', name: 'Users / Team' },
    { class: 'fas fa-chart-pie', name: 'Pie Chart' },
    { class: 'fas fa-lightbulb', name: 'Idea' },
    { class: 'fas fa-lock', name: 'Lock' },
    { class: 'fas fa-check-circle', name: 'Checkmark' },
    { class: 'fas fa-tachometer-alt', name: 'Dashboard / Speed' },
    { class: 'fas fa-brain', name: 'Brain / AI' },
    { class: 'fas fa-network-wired', name: 'Network' },
    { class: 'fas fa-microchip', name: 'Hardware / Chip' },
    { class: 'fas fa-sync', name: 'Sync / Refresh' },
    { class: 'fas fa-project-diagram', name: 'Project / Diagram' },
    { class: 'fas fa-city', name: 'City' },
    { class: 'fas fa-car', name: 'Car / Vehicle' },
    { class: 'fas fa-camera', name: 'Camera' },
    { class: 'fas fa-video', name: 'Video' }
  ];

  existingCategories: ProductCategory[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private productProduct: ProductService
  ) {
    this.activeTab = 'basic';
    console.log('ProductFormComponent constructor - activeTab:', this.activeTab);
  }

  ngOnInit(): void {
    console.log('ngOnInit - activeTab before initialization:', this.activeTab);
    this.initializeForm();
    this.fetchCategories();
    this.checkEditMode();
    console.log('ngOnInit - activeTab after initialization:', this.activeTab);
  }

  fetchCategories(): void {
    this.productProduct.getCategories().subscribe({
      next: (response) => {
        if (response?.success && response.result) {
          this.existingCategories = Array.isArray(response.result) ? response.result : [response.result];
        }
      },
      error: (err) => console.error('Error fetching categories', err)
    });
  }

  // Add method to change tabs with logging
  setActiveTab(tab: string): void {
    console.log('Setting active tab from', this.activeTab, 'to', tab);
    this.activeTab = tab;
  }

  initializeForm(): void {
    console.log('Initializing form');
    this.productForm = this.formBuilder.group({
      // Basic Info
      title: ['', [Validators.required, Validators.maxLength(this.TITLE_MAX_LENGTH)]],
      titleAr: ['', [Validators.maxLength(this.TITLE_MAX_LENGTH)]],
      slug: ['', [Validators.required, Validators.pattern(/^[a-z0-9-]+$/)]],
      categoryId: [null],
      cardIcon: ['fas fa-cog'], // Default icon
      shortDescription: ['', [Validators.maxLength(this.SHORT_DESC_MAX_LENGTH)]],
      shortDescriptionAr: ['', [Validators.maxLength(this.SHORT_DESC_MAX_LENGTH)]],
      metaDescription: ['', [Validators.maxLength(this.META_DESC_MAX_LENGTH)]],
      metaDescriptionAr: ['', [Validators.maxLength(this.META_DESC_MAX_LENGTH)]],

      // Hero Section
      heroTitle: [''],
      heroTitleAr: [''],
      heroSubtitle: [''],
      heroSubtitleAr: [''],
      heroDescription: [''],
      heroDescriptionAr: [''],
      heroIcon: [''],
      heroPrimaryCtaText: [''],
      heroPrimaryCtaTextAr: [''],
      heroPrimaryCtaLink: [''],
      heroSecondaryCtaText: [''],
      heroSecondaryCtaTextAr: [''],
      heroSecondaryCtaLink: [''],
      heroImageAlt: [''],
      heroImageAltAr: [''],

      // About Section
      aboutTitle: [''],
      aboutTitleAr: [''],
      aboutContent: [''],
      aboutContentAr: [''],
      aboutImage: [''],
      aboutImageAlt: [''],
      aboutImageAltAr: [''],

      // How It Works Section
      howItWorks: this.formBuilder.array([]),

      // Key Features Section
      keyFeaturesTitle: [''],
      keyFeaturesTitleAr: [''],
      keyFeaturesImages: this.formBuilder.array([]),
      keyFeaturesImageAlt: [''],
      keyFeaturesImageAltAr: [''],
      keyFeaturesList: this.formBuilder.array([]),
      keyFeaturesListAr: this.formBuilder.array([]),

      // Benefits Section
      benefits: this.formBuilder.array([]),

      // Vision Section
      visionTitle: [''],
      visionTitleAr: [''],
      visionSubtitle: [''],
      visionSubtitleAr: [''],
      visionItems: this.formBuilder.array([]),

      // Why Sharp Section
      whySharpTitle: [''],
      whySharpTitleAr: [''],
      whySharpContent: [''],
      whySharpContentAr: [''],
      whySharpImage: [''],
      whySharpImageAlt: [''],
      whySharpImageAltAr: [''],

      // CTA Section
      ctaTitle: [''],
      ctaTitleAr: [''],
      ctaDescription: [''],
      ctaDescriptionAr: [''],
      ctaButton1Text: [''],
      ctaButton1TextAr: [''],
      ctaButton1Link: [''],
      ctaButton2Text: [''],
      ctaButton2TextAr: [''],
      ctaButton2Link: [''],

      // FAQ Section
      faqs: this.formBuilder.array([]),

      // SEO Fields
      metaTitle: ['', [Validators.maxLength(this.META_TITLE_MAX_LENGTH)]],
      metaTitleAr: ['', [Validators.maxLength(this.META_TITLE_MAX_LENGTH)]],
      metaKeywords: ['', [Validators.maxLength(this.META_KEYWORDS_MAX_LENGTH)]],
      metaKeywordsAr: ['', [Validators.maxLength(this.META_KEYWORDS_MAX_LENGTH)]],

      // Gallery
      gallery: this.formBuilder.array([]),
      galleryAlt: [''],
      galleryAltAr: [''],

      // Status
      order: [0, [Validators.required, Validators.min(0)]],
      isPublished: [false]
    });

    // Add one empty item by default for each array
    this.addHowItWorkItem();
    this.addKeyFeaturesListItem();
    this.addKeyFeaturesListItemAr();
    this.addBenefitItem();
    this.addVisionItem();
    this.addFAQItem();

    console.log('Form initialized');
  }

  // How It Works FormArray
  get howItWorks(): FormArray {
    return this.productForm.get('howItWorks') as FormArray;
  }

  addHowItWorkItem(): void {
    const itemForm = this.formBuilder.group({
      icon: ['', Validators.required],
      title: ['', Validators.required],
      titleAr: [''],
      description: ['', Validators.required],
      descriptionAr: ['']
    });
    this.howItWorks.push(itemForm);
  }

  removeHowItWorkItem(index: number): void {
    this.howItWorks.removeAt(index);
  }

  // Key Features List FormArray
  get keyFeaturesList(): FormArray {
    return this.productForm.get('keyFeaturesList') as FormArray;
  }

  addKeyFeaturesListItem(): void {
    const itemForm = this.formBuilder.group({
      icon: ['fas fa-check-circle'],
      text: ['', Validators.required]
    });
    this.keyFeaturesList.push(itemForm);
  }

  removeKeyFeaturesListItem(index: number): void {
    this.keyFeaturesList.removeAt(index);
  }

  // Key Features List Ar FormArray
  get keyFeaturesListAr(): FormArray {
    return this.productForm.get('keyFeaturesListAr') as FormArray;
  }

  addKeyFeaturesListItemAr(): void {
    const itemForm = this.formBuilder.group({
      icon: [''],
      text: ['']
    });
    this.keyFeaturesListAr.push(itemForm);
  }

  removeKeyFeaturesListItemAr(index: number): void {
    this.keyFeaturesListAr.removeAt(index);
  }

  // Key Features Images FormArray
  get keyFeaturesImages(): FormArray {
    return this.productForm.get('keyFeaturesImages') as FormArray;
  }

  // Benefits FormArray
  get benefits(): FormArray {
    return this.productForm.get('benefits') as FormArray;
  }

  addBenefitItem(): void {
    const benefitForm = this.formBuilder.group({
      icon: ['', Validators.required],
      title: ['', Validators.required],
      titleAr: [''],
      description: ['', Validators.required],
      descriptionAr: ['']
    });
    this.benefits.push(benefitForm);
  }

  removeBenefitItem(index: number): void {
    this.benefits.removeAt(index);
  }

  // Vision Items FormArray
  get visionItems(): FormArray {
    return this.productForm.get('visionItems') as FormArray;
  }

  addVisionItem(): void {
    const visionForm = this.formBuilder.group({
      icon: ['', Validators.required],
      text: ['', Validators.required],
      textAr: ['']
    });
    this.visionItems.push(visionForm);
  }

  removeVisionItem(index: number): void {
    this.visionItems.removeAt(index);
  }

  // FAQs FormArray
  get faqs(): FormArray {
    return this.productForm.get('faqs') as FormArray;
  }

  addFAQItem(): void {
    const faqForm = this.formBuilder.group({
      question: ['', Validators.required],
      questionAr: [''],
      answer: ['', Validators.required],
      answerAr: ['']
    });
    this.faqs.push(faqForm);
  }

  removeFAQItem(index: number): void {
    this.faqs.removeAt(index);
  }

  // Gallery FormArray
  get gallery(): FormArray {
    return this.productForm.get('gallery') as FormArray;
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
        this.productId = +params['id'];
        this.loadProductData(this.productId);
      }
    });
  }

  loadProductData(id: number): void {
    this.loading = true;
    this.error = '';

    this.productProduct.getProductById(id).subscribe({
      next: (response) => {
        console.log('Load product response:', response);

        if (response?.success) {
          const productData = response.result || response.data;

          if (productData) {
            this.patchFormValues(productData);
          } else {
            this.error = 'Product data is empty';
          }
        } else {
          this.error = response?.message || 'Failed to load product data';
        }

        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading product:', error);
        this.error = error.error?.message || error.message || 'Failed to load product data';
        this.loading = false;
      }
    });
  }

  patchFormValues(product: any): void {
    console.log('Patching form with product:', product);

    if (!product) {
      console.error('Product data is undefined');
      return;
    }

    // Clear existing arrays
    this.clearFormArray(this.howItWorks);
    this.clearFormArray(this.keyFeaturesList);
    this.clearFormArray(this.keyFeaturesListAr);
    this.clearFormArray(this.keyFeaturesImages);
    this.clearFormArray(this.benefits);
    this.clearFormArray(this.visionItems);
    this.clearFormArray(this.faqs);
    this.clearFormArray(this.gallery);

    // Add How It Works items
    if (product.howItWorks && Array.isArray(product.howItWorks)) {
      product.howItWorks.forEach((item: any) => {
        const itemForm = this.formBuilder.group({
          icon: [item.icon || ''],
          title: [item.title || ''],
          titleAr: [item.titleAr || ''],
          description: [item.description || ''],
          descriptionAr: [item.descriptionAr || '']
        });
        this.howItWorks.push(itemForm);
      });
    } else {
      this.addHowItWorkItem();
    }

    // Add Key Features List items
    if (product.keyFeaturesList && Array.isArray(product.keyFeaturesList)) {
      product.keyFeaturesList.forEach((item: any) => {
        if (typeof item === 'string') {
          const itemForm = this.formBuilder.group({
            icon: ['fas fa-check-circle'],
            text: [item]
          });
          this.keyFeaturesList.push(itemForm);
        } else {
          const itemForm = this.formBuilder.group({
            icon: [item.icon || 'fas fa-check-circle'],
            text: [item.text || '']
          });
          this.keyFeaturesList.push(itemForm);
        }
      });
    } else {
      this.addKeyFeaturesListItem();
    }

    if (product.keyFeaturesListAr && Array.isArray(product.keyFeaturesListAr)) {
      product.keyFeaturesListAr.forEach((item: any) => {
        if (typeof item === 'string') {
          const itemForm = this.formBuilder.group({
            icon: [''],
            text: [item]
          });
          this.keyFeaturesListAr.push(itemForm);
        } else {
          const itemForm = this.formBuilder.group({
            icon: [item.icon || ''],
            text: [item.text || '']
          });
          this.keyFeaturesListAr.push(itemForm);
        }
      });
    } else {
      this.addKeyFeaturesListItemAr();
    }

    // Add Benefits items
    if (product.benefits && Array.isArray(product.benefits)) {
      product.benefits.forEach((item: any) => {
        const benefitForm = this.formBuilder.group({
          icon: [item.icon || ''],
          title: [item.title || ''],
          titleAr: [item.titleAr || ''],
          description: [item.description || ''],
          descriptionAr: [item.descriptionAr || '']
        });
        this.benefits.push(benefitForm);
      });
    } else {
      this.addBenefitItem();
    }

    // Add Vision items
    if (product.visionItems && Array.isArray(product.visionItems)) {
      product.visionItems.forEach((item: any) => {
        const visionForm = this.formBuilder.group({
          icon: [item.icon || ''],
          text: [item.text || ''],
          textAr: [item.textAr || '']
        });
        this.visionItems.push(visionForm);
      });
    } else {
      this.addVisionItem();
    }

    // Add FAQ items
    if (product.faqs && Array.isArray(product.faqs)) {
      product.faqs.forEach((item: any) => {
        const faqForm = this.formBuilder.group({
          question: [item.question || ''],
          questionAr: [item.questionAr || ''],
          answer: [item.answer || ''],
          answerAr: [item.answerAr || '']
        });
        this.faqs.push(faqForm);
      });
    } else {
      this.addFAQItem();
    }

    // Add gallery images
    if (product.gallery && Array.isArray(product.gallery)) {
      product.gallery.forEach((img: string) => {
        this.gallery.push(this.formBuilder.control(img));
        this.galleryPreviews.push(this.getImageUrl(img));
      });
    }

    // Set image previews
    if (product.heroIcon) {
      // Only set image preview if it's a file path, not a FontAwesome class
      const isFilePath = product.heroIcon.includes('/') || product.heroIcon.includes('.');
      if (isFilePath) {
        this.heroIconPreview = this.getImageUrl(product.heroIcon);
      }
    }
    if (product.aboutImage) {
      this.aboutImagePreview = this.getImageUrl(product.aboutImage);
    }
    if (product.whySharpImage) {
      this.whySharpImagePreview = this.getImageUrl(product.whySharpImage);
    }
    if (product.keyFeaturesImages && Array.isArray(product.keyFeaturesImages)) {
      this.keyFeaturesImagePreviews = product.keyFeaturesImages.map((img: string) => this.getImageUrl(img));
      product.keyFeaturesImages.forEach((img: string) => {
        this.keyFeaturesImages.push(this.formBuilder.control(img));
      });
    }

    // Set alt tag values
    this.productForm.patchValue({
      keyFeaturesImageAlt: product.keyFeaturesImageAlt || '',
      keyFeaturesImageAltAr: product.keyFeaturesImageAltAr || '',
      galleryAlt: product.galleryAlt || '',
      galleryAltAr: product.galleryAltAr || ''
    });

    // Patch form values
    this.productForm.patchValue({
      title: product.title || '',
      titleAr: product.titleAr || '',
      slug: product.slug || '',
      categoryId: product.categoryId || null,
      cardIcon: product.cardIcon || 'fas fa-cog',
      shortDescription: product.shortDescription || '',
      shortDescriptionAr: product.shortDescriptionAr || '',
      metaDescription: product.metaDescription || '',
      metaDescriptionAr: product.metaDescriptionAr || '',
      heroTitle: product.heroTitle || '',
      heroTitleAr: product.heroTitleAr || '',
      heroSubtitle: product.heroSubtitle || '',
      heroSubtitleAr: product.heroSubtitleAr || '',
      heroDescription: product.heroDescription || '',
      heroDescriptionAr: product.heroDescriptionAr || '',
      heroIcon: product.heroIcon || '',
      aboutTitle: product.aboutTitle || '',
      aboutTitleAr: product.aboutTitleAr || '',
      aboutContent: product.aboutContent || '',
      aboutContentAr: product.aboutContentAr || '',
      aboutImage: product.aboutImage || '',
      keyFeaturesTitle: product.keyFeaturesTitle || '',
      keyFeaturesTitleAr: product.keyFeaturesTitleAr || '',
      visionTitle: product.visionTitle || '',
      visionTitleAr: product.visionTitleAr || '',
      visionSubtitle: product.visionSubtitle || '',
      visionSubtitleAr: product.visionSubtitleAr || '',
      whySharpTitle: product.whySharpTitle || '',
      whySharpTitleAr: product.whySharpTitleAr || '',
      whySharpContent: product.whySharpContent || '',
      whySharpContentAr: product.whySharpContentAr || '',
      heroPrimaryCtaText: product.heroPrimaryCtaText || '',
      heroPrimaryCtaTextAr: product.heroPrimaryCtaTextAr || '',
      heroPrimaryCtaLink: product.heroPrimaryCtaLink || '',
      heroSecondaryCtaText: product.heroSecondaryCtaText || '',
      heroSecondaryCtaTextAr: product.heroSecondaryCtaTextAr || '',
      heroSecondaryCtaLink: product.heroSecondaryCtaLink || '',
      whySharpImage: product.whySharpImage || '',
      aboutImageAlt: product.aboutImageAlt || '',
      aboutImageAltAr: product.aboutImageAltAr || '',
      whySharpImageAlt: product.whySharpImageAlt || '',
      whySharpImageAltAr: product.whySharpImageAltAr || '',
      ctaTitle: product.ctaTitle || '',
      ctaTitleAr: product.ctaTitleAr || '',
      ctaDescription: product.ctaDescription || '',
      ctaDescriptionAr: product.ctaDescriptionAr || '',
      ctaButton1Text: product.ctaButton1Text || '',
      ctaButton1TextAr: product.ctaButton1TextAr || '',
      ctaButton1Link: product.ctaButton1Link || '',
      ctaButton2Text: product.ctaButton2Text || '',
      ctaButton2TextAr: product.ctaButton2TextAr || '',
      ctaButton2Link: product.ctaButton2Link || '',
      metaTitle: product.metaTitle || '',
      metaTitleAr: product.metaTitleAr || '',
      metaKeywords: product.metaKeywords || '',
      metaKeywordsAr: product.metaKeywordsAr || '',
      order: product.order || 0,
      isPublished: product.isPublished || false
    });
  }

  clearFormArray(formArray: FormArray): void {
    while (formArray.length) {
      formArray.removeAt(0);
    }
  }

  private getImageUrl(path: string | null): string {
    if (!path) return '';
    if (path.startsWith('http')) return path;
    const baseUrl = environment.apiUrl.replace('/v1', '');
    const separator = path.startsWith('/') ? '' : '/';
    return `${baseUrl}${separator}${path}`;
  }

  generateSlug(): void {
    const title = this.productForm.get('title')?.value;
    if (title && !this.isEditMode) {
      const slug = title
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .substring(0, 200);
      this.productForm.get('slug')?.setValue(slug);
    }
  }

  // File upload handlers
  onHeroIconSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.selectedHeroIcon = file;
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.heroIconPreview = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }

  onAboutImageSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.selectedAboutImage = file;
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.aboutImagePreview = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }

  onWhySharpImageSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.selectedWhySharpImage = file;
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.whySharpImagePreview = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }

  onKeyFeaturesImagesSelected(event: any): void {
    const files = event.target.files;
    if (files && files.length) {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        this.selectedKeyFeaturesImages.push(file);

        const reader = new FileReader();
        reader.onload = (e: any) => {
          this.keyFeaturesImagePreviews.push(e.target.result);
        };
        reader.readAsDataURL(file);
      }
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

  removeHeroIcon(): void {
    this.heroIconPreview = null;
    this.selectedHeroIcon = null;
    this.productForm.get('heroIcon')?.setValue('');
    const fileInput = document.getElementById('heroIcon') as HTMLInputElement;
    if (fileInput) fileInput.value = '';
  }

  removeAboutImage(): void {
    this.aboutImagePreview = null;
    this.selectedAboutImage = null;
    this.productForm.get('aboutImage')?.setValue('');
    const fileInput = document.getElementById('aboutImage') as HTMLInputElement;
    if (fileInput) fileInput.value = '';
  }

  removeWhySharpImage(): void {
    this.whySharpImagePreview = null;
    this.selectedWhySharpImage = null;
    this.productForm.get('whySharpImage')?.setValue('');
    const fileInput = document.getElementById('whySharpImage') as HTMLInputElement;
    if (fileInput) fileInput.value = '';
  }

  removeKeyFeaturesImage(index: number): void {
    this.keyFeaturesImagePreviews.splice(index, 1);
    if (index < this.keyFeaturesImages.length) {
      this.keyFeaturesImages.removeAt(index);
    } else {
      const newIndex = index - this.keyFeaturesImages.length;
      if (this.selectedKeyFeaturesImages && this.selectedKeyFeaturesImages[newIndex]) {
        this.selectedKeyFeaturesImages.splice(newIndex, 1);
      }
    }
  }

  onSubmit(): void {
    if (this.productForm.invalid) {
      this.markFormGroupTouched(this.productForm);
      const errors: string[] = [];
      if (this.title?.errors?.['maxlength']) {
        errors.push(`Title exceeds ${this.TITLE_MAX_LENGTH} characters`);
      }
      if (errors.length > 0) {
        this.error = errors.join('. ');
      }
      return;
    }

    this.submitting = true;
    this.error = '';

    const formData = new FormData();
    const formValue = this.productForm.value;

    // Append basic fields
    const textFields = [
      'title', 'titleAr', 'slug', 'cardIcon', 'shortDescription', 'shortDescriptionAr', 'metaDescription', 'metaDescriptionAr',
      'heroTitle', 'heroTitleAr', 'heroSubtitle', 'heroSubtitleAr', 'heroDescription', 'heroDescriptionAr',
      'heroPrimaryCtaText', 'heroPrimaryCtaTextAr', 'heroPrimaryCtaLink', 'heroSecondaryCtaText', 'heroSecondaryCtaTextAr', 'heroSecondaryCtaLink',
      'heroImageAlt', 'heroImageAltAr',
      'aboutTitle', 'aboutTitleAr', 'aboutContent', 'aboutContentAr', 'aboutImageAlt', 'aboutImageAltAr',
      'keyFeaturesTitle', 'keyFeaturesTitleAr', 'keyFeaturesImageAlt', 'keyFeaturesImageAltAr',
      'visionTitle', 'visionTitleAr', 'visionSubtitle', 'visionSubtitleAr',
      'whySharpTitle', 'whySharpTitleAr', 'whySharpContent', 'whySharpContentAr', 'whySharpImageAlt', 'whySharpImageAltAr',
      'ctaTitle', 'ctaTitleAr', 'ctaDescription', 'ctaDescriptionAr', 'ctaButton1Text', 'ctaButton1TextAr', 'ctaButton1Link', 'ctaButton2Text', 'ctaButton2TextAr', 'ctaButton2Link',
      'metaTitle', 'metaTitleAr', 'metaKeywords', 'metaKeywordsAr', 'galleryAlt', 'galleryAltAr'
    ];

    textFields.forEach(field => {
      if (formValue[field]?.trim()) {
        formData.append(field, formValue[field]);
      }
    });

    if (formValue.categoryId) {
      formData.append('categoryId', formValue.categoryId.toString());
    }

    // Append order and isPublished
    formData.append('order', formValue.order.toString());
    formData.append('isPublished', formValue.isPublished.toString());

    // Append array fields as JSON
    const arrayFields = [
      'howItWorks', 'keyFeaturesList', 'keyFeaturesListAr', 'benefits', 'visionItems', 'faqs'
    ];

    arrayFields.forEach(field => {
      if (formValue[field]?.length >= 0) {
        const validItems = formValue[field].filter((item: any) => {
          if (field === 'keyFeaturesList' || field === 'keyFeaturesListAr') {
            return item && (item.text?.trim() || item.icon?.trim());
          }
          return item && Object.values(item).some(val => val?.toString().trim());
        });
        formData.append(field, JSON.stringify(validItems));
      }
    });

    // Also send the existing galleries as JSON strings explicitly, so the backend can merge them, but only on edit.
    if (this.isEditMode) {
      formData.append('existingGallery', JSON.stringify(this.gallery.value || []));
      formData.append('existingKeyFeaturesImages', JSON.stringify(this.keyFeaturesImages.value || []));
    }

    // Send original string paths for single images if not uploading new ones
    if (!this.selectedHeroIcon && formValue.heroIcon !== null) {
      formData.append('heroIcon', formValue.heroIcon);
    }
    if (!this.selectedAboutImage && formValue.aboutImage !== null) {
      formData.append('aboutImage', formValue.aboutImage);
    }
    if (!this.selectedWhySharpImage && formValue.whySharpImage !== null) {
      formData.append('whySharpImage', formValue.whySharpImage);
    }

    // Append image files
    if (this.selectedHeroIcon) {
      formData.append('heroIcon', this.selectedHeroIcon, this.selectedHeroIcon.name);
    }
    if (this.selectedAboutImage) {
      formData.append('aboutImage', this.selectedAboutImage, this.selectedAboutImage.name);
    }
    if (this.selectedWhySharpImage) {
      formData.append('whySharpImage', this.selectedWhySharpImage, this.selectedWhySharpImage.name);
    }
    if (this.selectedKeyFeaturesImages?.length) {
      this.selectedKeyFeaturesImages.forEach(file => {
        formData.append('keyFeaturesImages', file, file.name);
      });
    }
    if (this.selectedGallery?.length) {
      this.selectedGallery.forEach(file => {
        formData.append('gallery', file, file.name);
      });
    }

    if (this.isEditMode && this.productId) {
      this.productProduct.updateProduct(this.productId, formData).subscribe({
        next: (response) => {
          console.log('Update response:', response);
          if (response?.success) {
            this.router.navigate(['/dashboard/products', this.productId]);
          }
          this.submitting = false;
        },
        error: (error) => {
          console.error('Error updating product:', error);
          this.error = error.error?.message || error.message || 'Failed to update product';
          this.submitting = false;
        }
      });
    } else {
      this.productProduct.createProduct(formData).subscribe({
        next: (response) => {
          console.log('Create response:', response);
          if (response?.success) {
            const productData = response.result || response.data;
            let newProductId: number | undefined;

            if (productData) {
              if (Array.isArray(productData)) {
                newProductId = (productData[0] as any)?.id;
              } else {
                newProductId = (productData as any)?.id;
              }
            }

            if (newProductId) {
              this.router.navigate(['/dashboard/products', newProductId]);
            } else {
              console.error('Could not extract product ID from response:', productData);
              this.router.navigate(['/dashboard/products']);
            }
          }
          this.submitting = false;
        },
        error: (error) => {
          console.error('Error creating product:', error);
          this.error = error.error?.message || error.message || 'Failed to create product';
          this.submitting = false;
        }
      });
    }
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
    if (this.isEditMode && this.productId) {
      this.router.navigate(['/dashboard/products', this.productId]);
    } else {
      this.router.navigate(['/dashboard/products']);
    }
  }

  // Convenience getters
  get title() { return this.productForm.get('title'); }
  get slug() { return this.productForm.get('slug'); }
  get description() { return this.productForm.get('description'); }
  get order() { return this.productForm.get('order'); }
  get metaTitle() { return this.productForm.get('metaTitle'); }
  get metaDescription() { return this.productForm.get('metaDescription'); }
}
