export type Lang = "en" | "ru";

type NestedDict = { [key: string]: string | NestedDict };

const en: NestedDict = {
    nav: {
        logoSubtitle: "Curated AI ecosystem",
        aiCatalog: "AI Catalog",
        useCases: "Use Cases",
        reviews: "Reviews",
        contact: "Contact"
    },
    hero: {
        badge: "AI-CATALOG",
        title: "Newly added & curated AI tools",
        subtitle:
            "Explore AI tools with a clean card layout: name, description, categories, tags and pricing at a glance.",
        ctaAdd: "Add AI tool",
        found: "Found",
        tool: "tool",
        tools: "tools",
        loading: "Loading tools…",
        noToolsMatch: "No tools match your filters yet."
    },
    filters: {
        searchPlaceholder: "Search by name, tags, description…",
        pricingLabel: "Pricing",
        featuredOnly: "Featured only",
        pricingAny: "Any",
        pricingFree: "Free",
        pricingPaid: "Paid",
        pricingContact: "Contact for pricing"
    },
    categories: {
        all: "All",
        "writing-editing": "Writing & Editing",
        "image-generation-editing": "Image Generation & Editing",
        "image-analysis": "Image Analysis",
        "music-audio": "Music & Audio",
        "voice-generation-conversion": "Voice Generation & Conversion",
        "art-creative-design": "Art & Creative Design",
        "social-media": "Social Media",
        "ai-detection-anti-detection": "AI Detection & Anti-Detection",
        "coding-development": "Coding & Development",
        "video-animation": "Video & Animation",
        "daily-life": "Daily Life",
        "legal-finance": "Legal & Finance",
        "business-management": "Business Management",
        "marketing-advertising": "Marketing & Advertising",
        "health-wellness": "Health & Wellness",
        "business-research": "Business Research",
        "education-translation": "Education & Translation",
        "chatbots-virtual-companions": "Chatbots & Virtual Companions",
        "interior-architectural-design": "Interior & Architectural Design"
    },
    addModal: {
        titleCreate: "Add a new AI tool",
        titleEdit: "Edit AI tool",
        toolName: "Tool name",
        websiteUrl: "Website URL",
        shortDescription: "Short description",
        shortDescriptionPlaceholder:
            "Describe what this AI does in 1–2 short sentences.",
        mainCategory: "Main category",
        pricingModel: "Pricing model",
        language: "Language",
        tags: "Tags",
        namePlaceholder: "e.g. ChatGPT, Midjourney…",
        urlPlaceholder: "https://…",
        languagePlaceholder: "e.g. English, Multilingual, RU/UA only",
        tagsPlaceholder: "video, agent, marketing, outreach…",
        cancel: "Cancel",
        saveCreate: "Save tool",
        saveEdit: "Save changes"
    },
    detail: {
        breadcrumbRoot: "AI Catalog",
        notFoundTitle: "Tool not found",
        notFoundText:
            "We couldn’t find this AI tool. It may have been removed or the link is wrong.",
        notFoundBack: "← Back",
        loading: "Loading…",
        openTool: "Open tool",
        category: "Category",
        pricing: "Pricing",
        tags: "Tags",
        featured: "Featured"
    },
    footer: {
        madeBy: "Made by Ani",
        rights: "All rights reserved"
    },
    deleteModal: {
        title: "Delete this tool?",
        description:
            "This tool will be removed from your catalog. You can’t undo this action."
    },
    actionBtn: {
        delete: "Delete",
        cancel: "Cancel"
    },
    toolCard: {
        goTo: "Go to →"
    },
    lang: {
        en: "EN",
        ru: "RU"
    }
};

const ru: NestedDict = {
    nav: {
        logoSubtitle: "Кураторская AI-экосистема",
        aiCatalog: "AI-каталог",
        useCases: "Кейсы",
        reviews: "Отзывы",
        contact: "Контакты"
    },
    hero: {
        badge: "AI-КАТАЛОГ",
        title: "Новые и отобранные AI-инструменты",
        subtitle:
            "Ищите AI-инструменты по задачам, категориям и цене: всё главное сразу на одной карточке.",
        ctaAdd: "Добавить AI-инструмент",
        found: "Найдено",
        tool: "инструмент",
        tools: "инструментов",
        loading: "Загружаем инструменты…",
        noToolsMatch: "По текущим фильтрам ничего не найдено."
    },
    filters: {
        searchPlaceholder: "Поиск по названию, тегам, описанию…",
        pricingLabel: "Цена",
        featuredOnly: "Только избранные",
        pricingAny: "Любая",
        pricingFree: "Бесплатно",
        pricingPaid: "Платно",
        pricingContact: "По запросу"
    },
    categories: {
        all: "Все",
        "writing-editing": "Тексты и редактура",
        "image-generation-editing": "Генерация и обработка изображений",
        "image-analysis": "Анализ изображений",
        "music-audio": "Музыка и аудио",
        "voice-generation-conversion": "Голос: генерация и конвертация",
        "art-creative-design": "Иллюстрации и креативный дизайн",
        "social-media": "Соцсети",
        "ai-detection-anti-detection": "AI-детекция и анти-детекция",
        "coding-development": "Код и разработка",
        "video-animation": "Видео и анимация",
        "daily-life": "Повседневные задачи",
        "legal-finance": "Юридическое и финансы",
        "business-management": "Бизнес-менеджмент",
        "marketing-advertising": "Маркетинг и реклама",
        "health-wellness": "Здоровье и well-being",
        "business-research": "Бизнес-исследования",
        "education-translation": "Образование и переводы",
        "chatbots-virtual-companions": "Чат-боты и виртуальные компаньоны",
        "interior-architectural-design": "Интерьеры и архитектура"
    },
    addModal: {
        titleCreate: "Добавить новый AI-инструмент",
        titleEdit: "Редактировать AI-инструмент",
        toolName: "Название",
        websiteUrl: "Сайт",
        shortDescription: "Краткое описание",
        shortDescriptionPlaceholder:
            "Опишите, что делает инструмент, в 1–2 коротких предложениях.",
        mainCategory: "Основная категория",
        pricingModel: "Модель ценообразования",
        language: "Язык",
        tags: "Теги",
        namePlaceholder: "например, ChatGPT, Midjourney…",
        urlPlaceholder: "https://…",
        languagePlaceholder: "например, English, Multilingual, RU/UA only",
        tagsPlaceholder: "video, агент, маркетинг, outreach…",
        cancel: "Отмена",
        saveCreate: "Сохранить",
        saveEdit: "Сохранить изменения"
    },
    detail: {
        breadcrumbRoot: "AI-каталог",
        notFoundTitle: "Инструмент не найден",
        notFoundText:
            "Мы не нашли этот AI-инструмент. Возможно, ссылка некорректна или запись удалена.",
        notFoundBack: "← Назад",
        loading: "Загрузка…",
        openTool: "Открыть инструмент",
        category: "Категория",
        pricing: "Цена",
        tags: "Теги",
        featured: "Избранное"
    },
    footer: {
        madeBy: "Сделано Ани",
        rights: "Все права защищены"
    },
    deleteModal: {
        title: "Удалить инструмент?",
        description:
            "Инструмент будет удалён из каталога. Это действие нельзя отменить."
    },
    actionBtn: {
        delete: "Удалить",
        cancel: "Отмена"
    },
    toolCard: {
        goTo: "Перейти →"
    },
    lang: {
        en: "EN",
        ru: "RU"
    }
};

export const translations: Record<Lang, NestedDict> = {
    en,
    ru
};

export function translate(lang: Lang, key: string): string {
    const dict = translations[lang];
    const parts = key.split(".");
    let current: string | NestedDict | undefined = dict;

    for (const part of parts) {
        if (current && typeof current === "object" && part in current) {
            current = current[part] as NestedDict | string;
        } else {
            return key;
        }
    }

    return typeof current === "string" ? current : key;
}
