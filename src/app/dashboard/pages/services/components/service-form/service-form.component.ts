import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ServicePageService } from '../../services/service.service';
import { ServicePage, ProcessItem, CapabilityItem, BenefitItem, WhyChooseUsItem, FAQItem, AboutPillarItem, IndustryItem, CriticalCardItem, ServiceCategory } from '../../services/service.model';
import { environment } from '../../../../../../environments/environment';

@Component({
    selector: 'app-service-form',
    templateUrl: './service-form.component.html',
    styleUrls: ['./service-form.component.scss']
})
export class ServiceFormComponent implements OnInit {
    serviceForm!: FormGroup;
    isEditMode = false;
    serviceId: number | null = null;
    loading = false;
    submitting = false;
    error = '';
    activeTab: string = 'basic';

    // Image previews
    heroIconPreview: string | null = null;
    heroImagePreview: string | null = null;
    overviewImagePreview: string | null = null;
    aboutSectionImagePreview: string | null = null;
    industriesImagePreview: string | null = null;

    // Selected files for upload
    selectedHeroIcon: File | null = null;
    selectedHeroImage: File | null = null;
    selectedOverviewImage: File | null = null;
    selectedAboutSectionImage: File | null = null;
    selectedIndustriesImage: File | null = null;

    // Character limits
    readonly TITLE_MAX_LENGTH = 200;
    readonly SHORT_DESC_MAX_LENGTH = 500;
    readonly META_TITLE_MAX_LENGTH = 200;
    readonly META_DESC_MAX_LENGTH = 500;
    readonly META_KEYWORDS_MAX_LENGTH = 500;

    // Icons
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

    existingCategories: ServiceCategory[] = [];

    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private servicePageService: ServicePageService
    ) { }

    ngOnInit(): void {
        this.initializeForm();
        this.fetchCategories();
        this.checkEditMode();
    }

    fetchCategories(): void {
        this.servicePageService.getCategories().subscribe({
            next: (response: any) => {
                const result = response.result || response.data;
                if (result) {
                    this.existingCategories = Array.isArray(result) ? result : [result];
                }
            },
            error: (err) => console.error('Error fetching categories', err)
        });
    }

    setActiveTab(tab: string): void {
        this.activeTab = tab;
    }

    initializeForm(): void {
        this.serviceForm = this.formBuilder.group({
            // Basic 
            slug: ['', [Validators.required, Validators.pattern(/^[a-z0-9-]+$/)]],
            categoryId: [null],
            order: [0, [Validators.required, Validators.min(0)]],
            isPublished: [false],

            // Hero Section
            heroTitle: ['', [Validators.required, Validators.maxLength(this.TITLE_MAX_LENGTH)]],
            heroTitleAr: ['', [Validators.maxLength(this.TITLE_MAX_LENGTH)]],
            heroTagline: ['', [Validators.maxLength(this.SHORT_DESC_MAX_LENGTH)]],
            heroTaglineAr: ['', [Validators.maxLength(this.SHORT_DESC_MAX_LENGTH)]],
            heroIntroduction: [''],
            heroIntroductionAr: [''],
            heroImage: [''],
            heroIcon: [''],
            primaryCtaText: [''],
            primaryCtaTextAr: [''],
            primaryCtaLink: [''],
            secondaryCtaText: [''],
            secondaryCtaTextAr: [''],
            secondaryCtaLink: [''],

            // Custom About this Service Section
            aboutSectionTitle: [''],
            aboutSectionTitleAr: [''],
            aboutSectionDescription: [''],
            aboutSectionDescriptionAr: [''],
            aboutSectionImage: [''],
            aboutSectionImageAlt: [''], aboutSectionImageAltAr: [''],
            aboutSectionBottomNote: [''], aboutSectionBottomNoteAr: [''],
            aboutPillars: this.formBuilder.array([]),

            // Capabilities (Our Application Security Solution)
            capabilitiesSectionTitle: [''],
            capabilitiesSectionTitleAr: [''],
            capabilities: this.formBuilder.array([]),

            // Industries We Support
            industriesSectionTitle: [''],
            industriesSectionTitleAr: [''],
            industriesSectionDescription: [''],
            industriesSectionDescriptionAr: [''],
            industriesImage: [''],
            industriesImageAlt: [''],
            industriesImageAltAr: [''],
            industriesSectionBottomNote: [''], industriesSectionBottomNoteAr: [''],
            industries: this.formBuilder.array([]),

            // Critical Section (Why Application Security is Critical...)
            criticalSectionTitle: [''],
            criticalSectionTitleAr: [''],
            criticalSectionDescription: [''],
            criticalSectionDescriptionAr: [''],
            criticalSectionButtonText: [''],
            criticalSectionButtonTextAr: [''],
            criticalSectionButtonLink: [''],
            criticalRightTitle: [''],
            criticalRightTitleAr: [''],
            criticalCards: this.formBuilder.array([]),

            // Why Choose Us
            whyChooseUsSectionTitle: [''],
            whyChooseUsSectionTitleAr: [''],
            whyChooseUsDescription: [''], whyChooseUsDescriptionAr: [''],
            whyChooseUsBottomNote: [''], whyChooseUsBottomNoteAr: [''],
            whyChooseUs: this.formBuilder.array([]),

            // Legacy / Shared sections
            overviewSectionTitle: [''],
            overviewSectionTitleAr: [''],
            processSectionTitle: [''],
            processSectionTitleAr: [''],
            process: this.formBuilder.array([]),

            benefitsSectionTitle: [''],
            benefitsSectionTitleAr: [''],
            benefitsShortDescription: [''],
            benefitsShortDescriptionAr: [''],
            benefitsButtonText: [''],
            benefitsButtonTextAr: [''],
            benefitsButtonLink: [''],
            benefits: this.formBuilder.array([]),

            faqs: this.formBuilder.array([]),

            // Call To Action (Final)
            ctaMessage: [''],
            ctaMessageAr: [''],
            ctaPrimaryText: [''],
            ctaPrimaryTextAr: [''],
            ctaPrimaryLink: [''],
            ctaSecondaryText: [''],
            ctaSecondaryTextAr: [''],
            ctaSecondaryLink: [''],

            // SEO
            metaTitle: ['', [Validators.maxLength(this.META_TITLE_MAX_LENGTH)]],
            metaTitleAr: ['', [Validators.maxLength(this.META_TITLE_MAX_LENGTH)]],
            metaDescription: ['', [Validators.maxLength(this.META_DESC_MAX_LENGTH)]],
            metaDescriptionAr: ['', [Validators.maxLength(this.META_DESC_MAX_LENGTH)]],
            metaKeywords: ['', [Validators.maxLength(this.META_KEYWORDS_MAX_LENGTH)]],
            metaKeywordsAr: ['', [Validators.maxLength(this.META_KEYWORDS_MAX_LENGTH)]],

            // Legacy / Extra
            overviewWhatIsIt: [''],
            overviewWhatIsItAr: [''],
            overviewWhoIsItFor: [''],
            overviewWhoIsItForAr: [''],
            overviewProblemsSolved: [''],
            overviewProblemsSolvedAr: [''],
            overviewImage: [''],
            whyChooseUsShortDescription: [''],
            whyChooseUsShortDescriptionAr: [''],
        });

        // Add initial rows - Removed to prevent form from being invalid on start due to empty required fields
        // Users will add rows explicitly if needed.
        // this.addProcessItem();
        // this.addCapabilityItem();
        // this.addBenefitItem();
        // this.addWhyChooseUsItem();
        // this.addFAQItem();
        // this.addAboutPillarItem();
        // this.addIndustryItem();
        // this.addCriticalCardItem();
    }

    // FormArray Getters & Add Methods
    get process(): FormArray { return this.serviceForm.get('process') as FormArray; }
    addProcessItem(): void {
        this.process.push(this.formBuilder.group({
            title: ['', Validators.required], titleAr: [''],
            description: ['', Validators.required], descriptionAr: [''], icon: ['fas fa-cog']
        }));
    }
    removeProcessItem(i: number): void { this.process.removeAt(i); }

    get capabilities(): FormArray { return this.serviceForm.get('capabilities') as FormArray; }
    addCapabilityItem(): void {
        this.capabilities.push(this.formBuilder.group({
            title: ['', Validators.required], titleAr: [''],
            description: [''], descriptionAr: [''], icon: ['fas fa-check-circle']
        }));
    }
    removeCapabilityItem(i: number): void { this.capabilities.removeAt(i); }

    get benefits(): FormArray { return this.serviceForm.get('benefits') as FormArray; }
    addBenefitItem(): void {
        this.benefits.push(this.formBuilder.group({
            title: ['', Validators.required], titleAr: [''],
            description: ['', Validators.required], descriptionAr: [''], icon: ['fas fa-star']
        }));
    }
    removeBenefitItem(i: number): void { this.benefits.removeAt(i); }

    get whyChooseUs(): FormArray { return this.serviceForm.get('whyChooseUs') as FormArray; }
    addWhyChooseUsItem(): void {
        this.whyChooseUs.push(this.formBuilder.group({
            title: ['', Validators.required], titleAr: [''],
            description: [''], descriptionAr: [''],
            iconType: ['fa'], iconFA: ['fas fa-check'], iconPath: ['']
        }));
    }
    removeWhyChooseUsItem(i: number): void { this.whyChooseUs.removeAt(i); }

    get faqs(): FormArray { return this.serviceForm.get('faqs') as FormArray; }
    addFAQItem(): void {
        this.faqs.push(this.formBuilder.group({
            question: ['', Validators.required], questionAr: [''],
            answer: ['', Validators.required], answerAr: ['']
        }));
    }
    removeFAQItem(i: number): void { this.faqs.removeAt(i); }

    get aboutPillars(): FormArray { return this.serviceForm.get('aboutPillars') as FormArray; }
    addAboutPillarItem(): void {
        this.aboutPillars.push(this.formBuilder.group({
            title: ['', Validators.required], titleAr: [''],
            iconType: ['fa'], iconFA: ['fas fa-check-circle'], iconPath: ['']
        }));
    }
    removeAboutPillarItem(i: number): void { this.aboutPillars.removeAt(i); }

    get industries(): FormArray { return this.serviceForm.get('industries') as FormArray; }
    addIndustryItem(): void {
        this.industries.push(this.formBuilder.group({
            title: ['', Validators.required], titleAr: [''],
            iconType: ['fa'], iconFA: ['fas fa-building'], iconPath: ['']
        }));
    }
    removeIndustryItem(i: number): void { this.industries.removeAt(i); }

    get criticalCards(): FormArray { return this.serviceForm.get('criticalCards') as FormArray; }
    addCriticalCardItem(): void {
        this.criticalCards.push(this.formBuilder.group({
            title: ['', Validators.required], titleAr: [''],
            iconType: ['fa'], iconFA: ['fas fa-shield-alt'], iconPath: ['']
        }));
    }
    removeCriticalCardItem(i: number): void { this.criticalCards.removeAt(i); }

    // Helpers
    checkEditMode(): void {
        this.route.params.subscribe(params => {
            if (params['id']) {
                this.isEditMode = true;
                this.serviceId = +params['id'];
                this.loadServiceData(this.serviceId);
            }
        });
    }

    loadServiceData(id: number): void {
        this.loading = true;
        this.servicePageService.getServiceById(id).subscribe({
            next: (res: any) => {
                const data = res.data || res.result;
                if (data) {
                    const s = this.parseJsonFields(data);
                    this.patchFormValues(s);
                }
                this.loading = false;
            },
            error: () => {
                this.error = 'Failed to load service data';
                this.loading = false;
            }
        });
    }

    patchFormValues(s: any): void {
        if (!s) return;

        // Clear Arrays
        const arrays = [this.process, this.capabilities, this.benefits, this.whyChooseUs, this.faqs, this.aboutPillars, this.industries, this.criticalCards];
        arrays.forEach(a => { while (a.length) a.removeAt(0); });

        // Repopulate Arrays
        if (s.process?.length) s.process.forEach((it: any) => this.process.push(this.formBuilder.group({ title: [it.title || ''], titleAr: [it.titleAr || ''], description: [it.description || ''], descriptionAr: [it.descriptionAr || ''], icon: [it.icon || ''] })));
        if (s.capabilities?.length) s.capabilities.forEach((it: any) => this.capabilities.push(this.formBuilder.group({ title: [it.title || ''], titleAr: [it.titleAr || ''], description: [it.description || ''], descriptionAr: [it.descriptionAr || ''], icon: [it.icon || ''] })));
        if (s.benefits?.length) s.benefits.forEach((it: any) => this.benefits.push(this.formBuilder.group({ title: [it.title || ''], titleAr: [it.titleAr || ''], description: [it.description || ''], descriptionAr: [it.descriptionAr || ''], icon: [it.icon || ''] })));
        if (s.whyChooseUs?.length) s.whyChooseUs.forEach((it: any) => this.whyChooseUs.push(this.formBuilder.group({ title: [it.title || ''], titleAr: [it.titleAr || ''], description: [it.description || ''], descriptionAr: [it.descriptionAr || ''], iconType: [it.iconType || 'fa'], iconFA: [it.iconFA || ''], iconPath: [it.iconPath || ''] })));
        if (s.faqs?.length) s.faqs.forEach((it: any) => this.faqs.push(this.formBuilder.group({ question: [it.question || ''], questionAr: [it.questionAr || ''], answer: [it.answer || ''], answerAr: [it.answerAr || ''] })));
        if (s.aboutPillars?.length) s.aboutPillars.forEach((it: any) => this.aboutPillars.push(this.formBuilder.group({ title: [it.title || ''], titleAr: [it.titleAr || ''], iconType: [it.iconType || 'fa'], iconFA: [it.iconFA || ''], iconPath: [it.iconPath || ''] })));
        if (s.industries?.length) s.industries.forEach((it: any) => this.industries.push(this.formBuilder.group({ title: [it.title || ''], titleAr: [it.titleAr || ''], iconType: [it.iconType || 'fa'], iconFA: [it.iconFA || ''], iconPath: [it.iconPath || ''] })));
        if (s.criticalCards?.length) s.criticalCards.forEach((it: any) => this.criticalCards.push(this.formBuilder.group({ title: [it.title || ''], titleAr: [it.titleAr || ''], iconType: [it.iconType || 'fa'], iconFA: [it.iconFA || ''], iconPath: [it.iconPath || ''] })));

        // Image Previews
        if (s.heroIcon) this.heroIconPreview = this.getImageUrl(s.heroIcon);
        if (s.heroImage) this.heroImagePreview = this.getImageUrl(s.heroImage);
        if (s.overviewImage) this.overviewImagePreview = this.getImageUrl(s.overviewImage);
        if (s.aboutSectionImage) this.aboutSectionImagePreview = this.getImageUrl(s.aboutSectionImage);
        if (s.industriesImage) this.industriesImagePreview = this.getImageUrl(s.industriesImage);

        // Form Patch
        this.serviceForm.patchValue({
            slug: s.slug || '', categoryId: s.categoryId || null, order: s.order || 0, isPublished: s.isPublished || false,
            heroTitle: s.heroTitle || '', heroTitleAr: s.heroTitleAr || '', heroTagline: s.heroTagline || '', heroTaglineAr: s.heroTaglineAr || '',
            heroIntroduction: s.heroIntroduction || '', heroIntroductionAr: s.heroIntroductionAr || '', heroIcon: s.heroIcon || '', heroImage: s.heroImage || '',
            primaryCtaText: s.primaryCtaText || '', primaryCtaTextAr: s.primaryCtaTextAr || '', primaryCtaLink: s.primaryCtaLink || '',
            secondaryCtaText: s.secondaryCtaText || '', secondaryCtaTextAr: s.secondaryCtaTextAr || '', secondaryCtaLink: s.secondaryCtaLink || '',

            aboutSectionTitle: s.aboutSectionTitle || '', aboutSectionTitleAr: s.aboutSectionTitleAr || '',
            aboutSectionDescription: s.aboutSectionDescription || '', aboutSectionDescriptionAr: s.aboutSectionDescriptionAr || '',
            aboutSectionImage: s.aboutSectionImage || '', aboutSectionImageAlt: s.aboutSectionImageAlt || '', aboutSectionImageAltAr: s.aboutSectionImageAltAr || '',
            aboutSectionBottomNote: s.aboutSectionBottomNote || '',
            aboutSectionBottomNoteAr: s.aboutSectionBottomNoteAr || '',

            capabilitiesSectionTitle: s.capabilitiesSectionTitle || '', capabilitiesSectionTitleAr: s.capabilitiesSectionTitleAr || '',

            industriesSectionTitle: s.industriesSectionTitle || '', industriesSectionTitleAr: s.industriesSectionTitleAr || '',
            industriesSectionDescription: s.industriesSectionDescription || '', industriesSectionDescriptionAr: s.industriesSectionDescriptionAr || '',
            industriesImage: s.industriesImage || '', industriesImageAlt: s.industriesImageAlt || '', industriesImageAltAr: s.industriesImageAltAr || '',
            industriesSectionBottomNote: s.industriesSectionBottomNote || '', industriesSectionBottomNoteAr: s.industriesSectionBottomNoteAr || '',

            criticalSectionTitle: s.criticalSectionTitle || '', criticalSectionTitleAr: s.criticalSectionTitleAr || '',
            criticalSectionDescription: s.criticalSectionDescription || '', criticalSectionDescriptionAr: s.criticalSectionDescriptionAr || '',
            criticalSectionButtonText: s.criticalSectionButtonText || '', criticalSectionButtonTextAr: s.criticalSectionButtonTextAr || '',
            criticalSectionButtonLink: s.criticalSectionButtonLink || '', criticalRightTitle: s.criticalRightTitle || '', criticalRightTitleAr: s.criticalRightTitleAr || '',

            whyChooseUsSectionTitle: s.whyChooseUsSectionTitle || '', whyChooseUsSectionTitleAr: s.whyChooseUsSectionTitleAr || '',
            whyChooseUsDescription: s.whyChooseUsDescription || '', whyChooseUsDescriptionAr: s.whyChooseUsDescriptionAr || '',
            whyChooseUsBottomNote: s.whyChooseUsBottomNote || '', whyChooseUsBottomNoteAr: s.whyChooseUsBottomNoteAr || '',

            overviewSectionTitle: s.overviewSectionTitle || '', overviewSectionTitleAr: s.overviewSectionTitleAr || '',
            processSectionTitle: s.processSectionTitle || '', processSectionTitleAr: s.processSectionTitleAr || '',

            benefitsSectionTitle: s.benefitsSectionTitle || '', benefitsSectionTitleAr: s.benefitsSectionTitleAr || '',
            benefitsShortDescription: s.benefitsShortDescription || '', benefitsShortDescriptionAr: s.benefitsShortDescriptionAr || '',
            benefitsButtonText: s.benefitsButtonText || '', benefitsButtonTextAr: s.benefitsButtonTextAr || '', benefitsButtonLink: s.benefitsButtonLink || '',

            ctaMessage: s.ctaMessage || '', ctaMessageAr: s.ctaMessageAr || '',
            ctaPrimaryText: s.ctaPrimaryText || '', ctaPrimaryTextAr: s.ctaPrimaryTextAr || '', ctaPrimaryLink: s.ctaPrimaryLink || '',
            ctaSecondaryText: s.ctaSecondaryText || '', ctaSecondaryTextAr: s.ctaSecondaryTextAr || '', ctaSecondaryLink: s.ctaSecondaryLink || '',

            metaTitle: s.metaTitle || '', metaTitleAr: s.metaTitleAr || '', metaDescription: s.metaDescription || '', metaDescriptionAr: s.metaDescriptionAr || '',
            metaKeywords: s.metaKeywords || '', metaKeywordsAr: s.metaKeywordsAr || '',

            overviewWhatIsIt: s.overviewWhatIsIt || '', overviewWhatIsItAr: s.overviewWhatIsItAr || '', overviewWhoIsItFor: s.overviewWhoIsItFor || '', overviewWhoIsItForAr: s.overviewWhoIsItForAr || '',
            overviewProblemsSolved: s.overviewProblemsSolved || '', overviewProblemsSolvedAr: s.overviewProblemsSolvedAr || '', overviewImage: s.overviewImage || '',
            whyChooseUsShortDescription: s.whyChooseUsShortDescription || '', whyChooseUsShortDescriptionAr: s.whyChooseUsShortDescriptionAr || ''
        });
    }

    private parseJsonFields(s: any): any {
        if (!s) return s;
        ['process', 'capabilities', 'benefits', 'whyChooseUs', 'faqs', 'aboutPillars', 'industries', 'criticalCards'].forEach(f => {
            if (s[f] && typeof s[f] === 'string') { try { s[f] = JSON.parse(s[f]); } catch { s[f] = []; } }
        });
        return s;
    }

    private getImageUrl(p: string): string {
        if (!p) return '';
        if (p.startsWith('http')) return p;
        return `${environment.apiUrl.replace('/v1', '')}${p.startsWith('/') ? '' : '/'}${p}`;
    }

    generateSlug(): void {
        const t = this.serviceForm.get('heroTitle')?.value;
        if (t && !this.isEditMode) this.serviceForm.get('slug')?.setValue(t.toLowerCase().replace(/[^a-z0-9\s-]/g, '').replace(/\s+/g, '-').replace(/-+/g, '-').substring(0, 200));
    }

    // File Handlers
    onFileSelected(event: any, type: string): void {
        const file = event.target.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = (e: any) => {
            if (type === 'heroIcon') { this.selectedHeroIcon = file; this.heroIconPreview = e.target.result; }
            if (type === 'heroImage') { this.selectedHeroImage = file; this.heroImagePreview = e.target.result; }
            if (type === 'overviewImage') { this.selectedOverviewImage = file; this.overviewImagePreview = e.target.result; }
            if (type === 'aboutSectionImage') { this.selectedAboutSectionImage = file; this.aboutSectionImagePreview = e.target.result; }
            if (type === 'industriesImage') { this.selectedIndustriesImage = file; this.industriesImagePreview = e.target.result; }
        };
        reader.readAsDataURL(file);
    }

    removeImage(type: string): void {
        if (type === 'heroIcon') { this.selectedHeroIcon = null; this.heroIconPreview = null; this.serviceForm.get('heroIcon')?.setValue(''); }
        if (type === 'heroImage') { this.selectedHeroImage = null; this.heroImagePreview = null; this.serviceForm.get('heroImage')?.setValue(''); }
        if (type === 'overviewImage') { this.selectedOverviewImage = null; this.overviewImagePreview = null; this.serviceForm.get('overviewImage')?.setValue(''); }
        if (type === 'aboutSectionImage') { this.selectedAboutSectionImage = null; this.aboutSectionImagePreview = null; this.serviceForm.get('aboutSectionImage')?.setValue(''); }
        if (type === 'industriesImage') { this.selectedIndustriesImage = null; this.industriesImagePreview = null; this.serviceForm.get('industriesImage')?.setValue(''); }
    }

    onSubmit(): void {
        if (this.serviceForm.invalid) { this.markFormGroupTouched(this.serviceForm); this.error = 'Please fill all required fields correctly.'; return; }
        this.submitting = true; this.error = '';
        const fd = new FormData();
        const fv = this.serviceForm.value;

        // Normal Fields
        const arrays = ['process', 'capabilities', 'benefits', 'whyChooseUs', 'faqs', 'aboutPillars', 'industries', 'criticalCards'];
        const files = ['heroImage', 'overviewImage', 'aboutSectionImage', 'industriesImage', 'heroIcon'];
        Object.keys(fv).forEach(k => {
            if (arrays.includes(k) || files.includes(k)) return;
            if (fv[k] !== null && fv[k] !== undefined && fv[k] !== '') fd.append(k, fv[k].toString());
        });

        // JSON Arrays
        arrays.forEach(a => { if (fv[a]?.length >= 0) fd.append(a, JSON.stringify(fv[a].filter((it: any) => it && Object.values(it).some(v => v !== null && v !== undefined && v !== '')))); });

        // Retain existing images
        if (!this.selectedHeroImage && fv.heroImage) fd.append('heroImage', fv.heroImage);
        if (!this.selectedOverviewImage && fv.overviewImage) fd.append('overviewImage', fv.overviewImage);
        if (!this.selectedAboutSectionImage && fv.aboutSectionImage) fd.append('aboutSectionImage', fv.aboutSectionImage);
        if (!this.selectedIndustriesImage && fv.industriesImage) fd.append('industriesImage', fv.industriesImage);
        if (!this.selectedHeroIcon && fv.heroIcon) fd.append('heroIcon', fv.heroIcon);

        // Upload new files
        if (this.selectedHeroIcon) fd.append('heroIcon', this.selectedHeroIcon, this.selectedHeroIcon.name);
        if (this.selectedHeroImage) fd.append('heroImage', this.selectedHeroImage, this.selectedHeroImage.name);
        if (this.selectedOverviewImage) fd.append('overviewImage', this.selectedOverviewImage, this.selectedOverviewImage.name);
        if (this.selectedAboutSectionImage) fd.append('aboutSectionImage', this.selectedAboutSectionImage, this.selectedAboutSectionImage.name);
        if (this.selectedIndustriesImage) fd.append('industriesImage', this.selectedIndustriesImage, this.selectedIndustriesImage.name);

        const obs = (this.isEditMode && this.serviceId) ? this.servicePageService.updateService(this.serviceId, fd) : this.servicePageService.createService(fd);
        obs.subscribe({
            next: (res: any) => { if (res?.success) this.router.navigate(['/dashboard/services']); this.submitting = false; },
            error: (err) => { this.error = err.error?.message || 'Failed to submit service'; this.submitting = false; }
        });
    }

    private markFormGroupTouched(fg: FormGroup | FormArray) {
        Object.values(fg.controls).forEach(c => {
            c.markAsTouched();
            if ((c as any).controls) this.markFormGroupTouched(c as FormGroup | FormArray);
        });
    }

    goBack(): void {
        this.router.navigate([this.isEditMode && this.serviceId ? '/dashboard/services/detail/' + this.serviceId : '/dashboard/services']);
    }
}
