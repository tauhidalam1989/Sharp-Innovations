export interface ServiceCategory {
    id: number;
    name: string;
    nameAr?: string;
    slug: string;
    order: number;
    isActive: boolean;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface ServiceCategoryResponse {
    success: boolean;
    status_code: number;
    message: string;
    result?: ServiceCategory | ServiceCategory[];
}

export interface ServiceFilters {
    page?: number;
    limit?: number;
    search?: string;
    status?: string;
    sortBy?: string;
    sortOrder?: 'ASC' | 'DESC';
}

export interface ProcessItem {
    title: string;
    titleAr?: string;
    description: string;
    descriptionAr?: string;
    icon?: string;
}

export interface CapabilityItem {
    title: string;
    titleAr?: string;
    description?: string;
    descriptionAr?: string;
    icon?: string;
}

export interface BenefitItem {
    title: string;
    titleAr?: string;
    description: string;
    descriptionAr?: string;
    icon?: string;
}

export interface WhyChooseUsItem {
    title: string;
    titleAr?: string;
    description?: string;
    descriptionAr?: string;
    iconType?: 'file' | 'fa';
    iconPath?: string;
    iconFA?: string;
}

export interface FAQItem {
    question: string;
    questionAr?: string;
    answer: string;
    answerAr?: string;
}

export interface AboutPillarItem {
    title: string;
    titleAr?: string;
    iconType?: 'file' | 'fa';
    iconPath?: string;
    iconFA?: string;
}

export interface IndustryItem {
    title: string;
    titleAr?: string;
    iconType?: 'file' | 'fa';
    iconPath?: string;
    iconFA?: string;
}

export interface CriticalCardItem {
    title: string;
    titleAr?: string;
    iconType?: 'file' | 'fa';
    iconPath?: string;
    iconFA?: string;
}

export interface ServicePage {
    id: number;
    slug: string;
    categoryId?: number;
    category?: ServiceCategory;

    // Hero Section
    heroTitle: string;
    heroTitleAr?: string;
    heroTagline?: string;
    heroTaglineAr?: string;
    heroIntroduction?: string;
    heroIntroductionAr?: string;
    heroImage?: string;
    heroIcon?: string;
    cardIcon?: string;
    primaryCtaText?: string;
    primaryCtaTextAr?: string;
    primaryCtaLink?: string;
    secondaryCtaText?: string;
    secondaryCtaTextAr?: string;
    secondaryCtaLink?: string;

    // Dynamic Section Titles & Descriptions
    overviewSectionTitle?: string;
    overviewSectionTitleAr?: string;
    processSectionTitle?: string;
    processSectionTitleAr?: string;
    capabilitiesSectionTitle?: string;
    capabilitiesSectionTitleAr?: string;
    benefitsSectionTitle?: string;
    benefitsSectionTitleAr?: string;

    whyChooseUsSectionTitle?: string;
    whyChooseUsSectionTitleAr?: string;
    whyChooseUsDescription?: string;
    whyChooseUsDescriptionAr?: string;
    whyChooseUsBottomNote?: string;
    whyChooseUsBottomNoteAr?: string;

    aboutSectionTitle?: string;
    aboutSectionTitleAr?: string;
    aboutSectionDescription?: string;
    aboutSectionDescriptionAr?: string;
    aboutSectionImage?: string;
    aboutSectionImageAlt?: string;
    aboutSectionImageAltAr?: string;
    aboutSectionBottomNote?: string;
    aboutSectionBottomNoteAr?: string;
    industriesSectionBottomNote?: string;
    industriesSectionBottomNoteAr?: string;

    industriesSectionTitle?: string;
    industriesSectionTitleAr?: string;
    industriesSectionDescription?: string;
    industriesSectionDescriptionAr?: string;
    industriesImage?: string;
    industriesImageAlt?: string;
    industriesImageAltAr?: string;

    criticalSectionTitle?: string;
    criticalSectionTitleAr?: string;
    criticalSectionDescription?: string;
    criticalSectionDescriptionAr?: string;
    criticalSectionButtonText?: string;
    criticalSectionButtonTextAr?: string;
    criticalSectionButtonLink?: string;
    criticalRightTitle?: string;
    criticalRightTitleAr?: string;

    // JSON Arrays (Dynamic Sections)
    process?: ProcessItem[];
    capabilities?: CapabilityItem[];
    benefits?: BenefitItem[];
    whyChooseUs?: WhyChooseUsItem[];
    faqs?: FAQItem[];
    aboutPillars?: AboutPillarItem[];
    industries?: IndustryItem[];
    criticalCards?: CriticalCardItem[];

    // Overview Section (legacy)
    overviewWhatIsIt?: string;
    overviewWhatIsItAr?: string;
    overviewWhoIsItFor?: string;
    overviewWhoIsItForAr?: string;
    overviewProblemsSolved?: string;
    overviewProblemsSolvedAr?: string;
    overviewImage?: string;

    // Benefits Section Enhancements
    benefitsShortDescription?: string;
    benefitsShortDescriptionAr?: string;
    benefitsButtonText?: string;
    benefitsButtonTextAr?: string;
    benefitsButtonLink?: string;

    // Why Choose Us Section Enhancements (legacy fields)
    whyChooseUsShortDescription?: string;
    whyChooseUsShortDescriptionAr?: string;

    // Call To Action (Final Section)
    ctaMessage?: string;
    ctaMessageAr?: string;
    ctaPrimaryText?: string;
    ctaPrimaryTextAr?: string;
    ctaPrimaryLink?: string;
    ctaSecondaryText?: string;
    ctaSecondaryTextAr?: string;
    ctaSecondaryLink?: string;

    // SEO
    metaTitle?: string;
    metaTitleAr?: string;
    metaDescription?: string;
    metaDescriptionAr?: string;
    metaKeywords?: string;
    metaKeywordsAr?: string;

    // Status
    order?: number;
    isPublished?: boolean;
    publishedAt?: Date;
    views?: number;
    createdBy?: number;
    updatedBy?: number;
    createdAt?: string;
    updatedAt?: string;

    creator?: {
        id: number;
        name: string;
        email: string;
        avatar?: string;
    };
}

export interface ServiceResponse {
    success: boolean;
    message: string;
    data?: ServicePage | ServicePage[];
    result?: ServicePage | ServicePage[] | any;
}
