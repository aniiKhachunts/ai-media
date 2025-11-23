import React, {useEffect, useState} from "react";
import {CATEGORY_OPTIONS, PRICING_OPTIONS} from "../../../data/aiCategories";
import type {AiCategory, PricingModel} from "../../../data/aiTools";
import {useT} from "../../../i18n/LanguageContext";

type ToolModalMode = "create" | "edit";

export type ToolFormValues = {
    name: string;
    url: string;
    shortDescription: string;
    category: AiCategory;
    pricing: PricingModel;
    tags: string[];
    language: string;
    featured: boolean;
};

interface ToolModalProps {
    open: boolean;
    mode: ToolModalMode;
    initial?: Partial<ToolFormValues>;
    onClose: () => void;
    onSubmit: (values: ToolFormValues) => void;
    saving?: boolean;
}

const ToolModal: React.FC<ToolModalProps> = ({
                                                 open,
                                                 mode,
                                                 initial,
                                                 onClose,
                                                 onSubmit,
                                                 saving = false
                                             }) => {
    const t = useT();

    const [name, setName] = useState("");
    const [url, setUrl] = useState("");
    const [shortDescription, setShortDescription] = useState("");
    const [category, setCategory] = useState<AiCategory>(
        CATEGORY_OPTIONS[0]?.value ?? "writing-editing"
    );
    const [pricing, setPricing] = useState<PricingModel>(
        PRICING_OPTIONS[0]?.value ?? "free"
    );
    const [tagsInput, setTagsInput] = useState("");
    const [language, setLanguage] = useState("English");
    const [featured, setFeatured] = useState(false);

    useEffect(() => {
        if (!initial) return;
        if (initial.name) setName(initial.name);
        if (initial.url) setUrl(initial.url);
        if (initial.shortDescription) setShortDescription(initial.shortDescription);
        if (initial.category) setCategory(initial.category);
        if (initial.pricing) setPricing(initial.pricing);
        if (initial.tags) setTagsInput(initial.tags.join(", "));
        if (initial.language) setLanguage(initial.language);
        if (typeof initial.featured === "boolean") setFeatured(initial.featured);
    }, [initial]);

    if (!open) return null;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const tags = tagsInput
            .split(",")
            .map((t) => t.trim())
            .filter(Boolean);

        const values: ToolFormValues = {
            name: name.trim(),
            url: url.trim(),
            shortDescription: shortDescription.trim(),
            category,
            pricing,
            tags,
            language: language.trim() || "English",
            featured
        };

        onSubmit(values);
    };

    const disabled = saving || !name.trim() || !url.trim();

    const title =
        mode === "create" ? t("addModal.titleCreate") : t("addModal.titleEdit");
    const saveLabel =
        mode === "create" ? t("addModal.saveCreate") : t("addModal.saveEdit");

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
            onClick={onClose}
        >
            <div
                className="w-full max-w-xl rounded-3xl border border-[var(--color-border-soft)] bg-[var(--color-surface-grid)] px-5 py-6 shadow-[0_24px_55px_rgba(0,0,0,0.75)] sm:px-7 sm:py-7"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="flex items-start justify-between gap-4">
                    <div>
                        <div
                            className="inline-flex items-center gap-2 rounded-full bg-[var(--color-chip-bg)] px-2.5 py-1">
                            <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-primary)]"/>
                            <span
                                className="cursor-pointer text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--color-text-muted)]">
                {title}
              </span>
                        </div>
                    </div>

                    <button
                        type="button"
                        onClick={onClose}
                        className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full border border-[var(--color-border-soft)] bg-[var(--color-chip-bg)] text-xs text-[var(--color-text-soft)] hover:text-[var(--color-text-main)]"
                    >
                        ✕
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="mt-5 space-y-4 text-xs">
                    <div className="grid gap-3 sm:grid-cols-2">
                        <div className="space-y-1">
                            <label
                                className="block text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--color-text-muted)]">
                                {t("addModal.toolName")}
                            </label>
                            <input
                                className="w-full rounded-xl border border-[var(--color-border-soft)] bg-[var(--color-bg-card)] px-3 py-2 text-xs text-[var(--color-text-main)] outline-none focus:border-[var(--color-primary)]"
                                placeholder={t("addModal.namePlaceholder")}
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                            />
                        </div>

                        <div className="space-y-1">
                            <label
                                className="block text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--color-text-muted)]">
                                {t("addModal.websiteUrl")}
                            </label>
                            <input
                                type="url"
                                className="w-full rounded-xl border border-[var(--color-border-soft)] bg-[var(--color-bg-card)] px-3 py-2 text-xs text-[var(--color-text-main)] outline-none focus:border-[var(--color-primary)]"
                                placeholder={t("addModal.urlPlaceholder")}
                                value={url}
                                onChange={(e) => setUrl(e.target.value)}
                                required
                            />
                        </div>
                    </div>

                    <div className="space-y-1">
                        <label
                            className="block text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--color-text-muted)]">
                            {t("addModal.shortDescription")}
                        </label>
                        <textarea
                            className="min-h-[72px] w-full resize-none rounded-xl border border-[var(--color-border-soft)] bg-[var(--color-bg-card)] px-3 py-2 text-xs text-[var(--color-text-main)] outline-none focus:border-[var(--color-primary)]"
                            placeholder={t("addModal.shortDescriptionPlaceholder")}
                            value={shortDescription}
                            onChange={(e) => setShortDescription(e.target.value)}
                            maxLength={280}
                            required
                        />
                        <div className="text-[10px] text-[var(--color-text-muted)]">
                            {shortDescription.length}/280
                        </div>
                    </div>

                    <div className="grid gap-3 sm:grid-cols-2">
                        <div className="space-y-1">
                            <label
                                className="block text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--color-text-muted)]">
                                {t("addModal.mainCategory")}
                            </label>
                            <select
                                className="w-full rounded-xl border border-[var(--color-border-soft)] bg-[var(--color-bg-card)] px-3 py-2 text-xs text-[var(--color-text-main)] outline-none focus:border-[var(--color-primary)]"
                                value={category}
                                onChange={(e) => setCategory(e.target.value as AiCategory)}
                            >
                                {CATEGORY_OPTIONS.map((cat: any) => (
                                    <option key={cat.value} value={cat.value}>
                                        {t(cat.label)}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="space-y-1">
                            <label
                                className="block text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--color-text-muted)]">
                                {t("addModal.pricingModel")}
                            </label>
                            <select
                                className="w-full rounded-xl border border-[var(--color-border-soft)] bg-[var(--color-bg-card)] px-3 py-2 text-xs text-[var(--color-text-main)] outline-none focus:border-[var(--color-primary)]"
                                value={pricing}
                                onChange={(e) => setPricing(e.target.value as PricingModel)}
                            >
                                {PRICING_OPTIONS.map((option: any) => (
                                    <option key={option.value} value={option.value}>
                                        {t(option.label)}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div className="grid gap-3 sm:grid-cols-2">
                        <div className="space-y-1">
                            <label
                                className="block text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--color-text-muted)]">
                                {t("addModal.language")}
                            </label>
                            <input
                                className="w-full rounded-xl border border-[var(--color-border-soft)] bg-[var(--color-bg-card)] px-3 py-2 text-xs text-[var(--color-text-main)] outline-none focus:border-[var(--color-primary)]"
                                placeholder={t("addModal.languagePlaceholder")}
                                value={language}
                                onChange={(e) => setLanguage(e.target.value)}
                            />
                        </div>

                        <div className="space-y-1">
                            <label
                                className="block text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--color-text-muted)]">
                                {t("addModal.tags")}
                            </label>
                            <input
                                className="w-full rounded-xl border border-[var(--color-border-soft)] bg-[var(--color-bg-card)] px-3 py-2 text-xs text-[var(--color-text-main)] outline-none focus:border-[var(--color-primary)]"
                                placeholder={t("addModal.tagsPlaceholder")}
                                value={tagsInput}
                                onChange={(e) => setTagsInput(e.target.value)}
                            />
                        </div>
                    </div>

                    <label className="mt-1 flex items-center gap-2 text-[11px] text-[var(--color-text-main)]">
                        <input
                            type="checkbox"
                            checked={featured}
                            onChange={(e) => setFeatured(e.target.checked)}
                            className="h-4 w-4 rounded border border-[var(--color-border-soft)] bg-[var(--color-bg-card)]"
                        />
                        {t("detail.featured")}
                    </label>

                    <div className="mt-5 flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-between">
                        <button
                            type="button"
                            onClick={onClose}
                            className="inline-flex cursor-pointer items-center justify-center rounded-full border border-[var(--color-border-soft)] bg-[var(--color-chip-bg)] px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--color-text-soft)] hover:text-[var(--color-text-main)]"
                        >
                            {t("addModal.cancel")}
                        </button>

                        <button
                            type="submit"
                            disabled={disabled}
                            className={`inline-flex items-center gap-2 rounded-full px-5 py-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-white shadow-[0_0_18px_rgba(204,101,255,0.6)] ${
                                disabled
                                    ? "bg-[var(--color-border-soft)]"
                                    : "bg-[var(--color-primary)] hover:brightness-110"
                            }`}
                        >
                            <span className="h-1.5 w-1.5 rounded-full bg-white"/>
                            {saving ? "…" : saveLabel}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ToolModal;
