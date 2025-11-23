import React from "react";
import {CATEGORY_OPTIONS, PRICING_OPTIONS} from "../../data/aiCategories";
import type {AiCategory, PricingModel} from "../../data/aiTools";
import {useT} from "../../i18n/LanguageContext";

export interface AiFilterState {
    search: string;
    category: AiCategory | "all";
    pricing: PricingModel | "all";
    featuredOnly: boolean;
}

interface AiFiltersProps {
    value: AiFilterState;
    onChange: (next: AiFilterState) => void;
}

const categoryOptions: { label: string; value: AiFilterState["category"] }[] = [
    {label: "categories.all", value: "all"},
    ...CATEGORY_OPTIONS.map((cat) => ({
        label: cat.label,
        value: cat.value
    }))
];

const pricingOptions: { label: string; value: AiFilterState["pricing"] }[] = [
    {label: "filters.pricingAny", value: "all"},
    ...PRICING_OPTIONS.map((p) => ({
        label: p.label,
        value: p.value
    }))
];

const AiFilters: React.FC<AiFiltersProps> = ({value, onChange}) => {
    const t = useT();

    const set = <K extends keyof AiFilterState>(key: K, val: AiFilterState[K]) =>
        onChange({...value, [key]: val});

    return (
        <div
            className="space-y-4 rounded-2xl border border-[var(--color-border-soft)] bg-[var(--color-surface-grid-soft)] p-4">
            <div className="flex flex-wrap gap-2">
                {categoryOptions.map((cat) => {
                    const active = value.category === cat.value;
                    return (
                        <button
                            key={cat.value}
                            type="button"
                            onClick={() => set("category", cat.value)}
                            className={[
                                "cursor-pointer rounded-full px-3 py-1 text-xs font-medium transition border",
                                active
                                    ? "border-transparent bg-[var(--color-primary)] text-white shadow-sm"
                                    : "border-[var(--color-border-soft)] bg-[var(--color-surface-grid-card)] text-[var(--color-text-main)] hover:bg-[var(--color-chip-bg)]"
                            ].join(" ")}
                        >
                            {t(cat.label)}
                        </button>
                    );
                })}
            </div>

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex-1">
                    <input
                        type="text"
                        placeholder={t("filters.searchPlaceholder")}
                        value={value.search}
                        onChange={(e) => set("search", e.target.value)}
                        className="w-full rounded-xl border border-[var(--color-border-soft)] bg-[var(--color-surface-grid-card)] px-3 py-2 text-sm text-[var(--color-text-main)] outline-none placeholder:text-[var(--color-text-soft)] focus:border-[var(--color-primary)]"
                    />
                </div>

                <div className="flex flex-wrap items-center gap-3">
                    <select
                        className="min-w-[150px] rounded-xl border border-[var(--color-border-soft)] bg-[var(--color-surface-grid-card)] px-3 py-2 text-xs text-[var(--color-text-main)] outline-none focus:border-[var(--color-primary)]"
                        value={value.pricing}
                        onChange={(e) =>
                            set("pricing", e.target.value as AiFilterState["pricing"])
                        }
                    >
                        {pricingOptions.map((option) => (
                            <option key={option.value} value={option.value}>
                                {t("filters.pricingLabel")}: {t(option.label)}
                            </option>
                        ))}
                    </select>

                    <label className="flex cursor-pointer items-center gap-2 text-xs text-[var(--color-text-main)]">
                        <input
                            type="checkbox"
                            checked={value.featuredOnly}
                            onChange={(e) => set("featuredOnly", e.target.checked)}
                            className="h-4 w-4 rounded border border-[var(--color-border-soft)] bg-[var(--color-surface-grid-card)]"
                        />
                        {t("filters.featuredOnly")}
                    </label>
                </div>
            </div>
        </div>
    );
};

export default AiFilters;
