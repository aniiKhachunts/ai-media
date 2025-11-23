import type {AiCategory, PricingModel} from "./aiTools";

export interface CategoryOption {
    label: string;
    value: AiCategory;
}

export interface PricingOption {
    label: string;
    value: PricingModel;
}

export const CATEGORY_OPTIONS: CategoryOption[] = [
    {label: "categories.writing-editing", value: "writing-editing"},
    {label: "categories.image-generation-editing", value: "image-generation-editing"},
    {label: "categories.image-analysis", value: "image-analysis"},
    {label: "categories.music-audio", value: "music-audio"},
    {label: "categories.voice-generation-conversion", value: "voice-generation-conversion"},
    {label: "categories.art-creative-design", value: "art-creative-design"},
    {label: "categories.social-media", value: "social-media"},
    {label: "categories.ai-detection-anti-detection", value: "ai-detection-anti-detection"},
    {label: "categories.coding-development", value: "coding-development"},
    {label: "categories.video-animation", value: "video-animation"},
    {label: "categories.daily-life", value: "daily-life"},
    {label: "categories.legal-finance", value: "legal-finance"},
    {label: "categories.business-management", value: "business-management"},
    {label: "categories.marketing-advertising", value: "marketing-advertising"},
    {label: "categories.health-wellness", value: "health-wellness"},
    {label: "categories.business-research", value: "business-research"},
    {label: "categories.education-translation", value: "education-translation"},
    {label: "categories.chatbots-virtual-companions", value: "chatbots-virtual-companions"},
    {label: "categories.interior-architectural-design", value: "interior-architectural-design"},
];

export const PRICING_OPTIONS: PricingOption[] = [
    {label: "filters.pricingFree", value: "free"},
    {label: "filters.pricingFreemium", value: "freemium"},
    {label: "filters.pricingPaid", value: "paid"},
    {label: "filters.freeTrial", value: "free-trial"},
    {label: "filters.pricingContactEnterprise", value: "contact"},
    {label: "filters.pricingOpenSource", value: "opensource"},
];

export interface NewAiToolPayload {
    name: string;
    url: string;
    shortDescription: string;
    mainCategory: AiCategory;
    pricing: PricingModel;
    tags: string[];
    language: string;
    isFeatured: boolean;
}
