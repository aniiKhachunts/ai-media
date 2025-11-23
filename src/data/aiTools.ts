export type AiCategory =
    | "writing-editing"
    | "image-generation-editing"
    | "image-analysis"
    | "music-audio"
    | "voice-generation-conversion"
    | "art-creative-design"
    | "social-media"
    | "ai-detection-anti-detection"
    | "coding-development"
    | "video-animation"
    | "daily-life"
    | "legal-finance"
    | "business-management"
    | "marketing-advertising"
    | "health-wellness"
    | "business-research"
    | "education-translation"
    | "chatbots-virtual-companions"
    | "interior-architectural-design";

export type PricingModel =
    | "free"
    | "freemium"
    | "paid"
    | "free-trial"
    | "contact"
    | "opensource";

export interface AiTool {
    id: string;
    name: string;
    shortDescription: string;
    url: string;
    category: AiCategory;
    pricing: PricingModel | string;
    tags: string[];
    featured: boolean;
    language: string;
}

export const aiToolsMock: AiTool[] = [];
