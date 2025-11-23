import React, {useEffect, useMemo, useState} from "react";
import type {AiCategory, AiTool, PricingModel} from "../../data/aiTools";
import AiFilters, {type AiFilterState} from "./AiFilters";
import AiCard from "./AiCard";
import ToolModal, {type ToolFormValues} from "./ToolModal/ToolModal.tsx";
import type {NewAiToolPayload} from "../../data/aiCategories";
import DeleteConfirmModal from "../common/DeleteToolModal";
import {useT} from "../../i18n/LanguageContext";

const API_BASE = import.meta.env.VITE_API_BASE ?? "http://localhost:4000";

const defaultFilter: AiFilterState = {
    search: "",
    category: "all",
    pricing: "all",
    featuredOnly: false
};

const AiGrid: React.FC = () => {
    const t = useT();

    const [filter, setFilter] = useState<AiFilterState>(defaultFilter);
    const [tools, setTools] = useState<AiTool[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const [createOpen, setCreateOpen] = useState(false);
    const [editTool, setEditTool] = useState<AiTool | null>(null);
    const [editOpen, setEditOpen] = useState(false);

    const [saving, setSaving] = useState(false);
    const [deleteTool, setDeleteTool] = useState<AiTool | null>(null);
    const [deleteOpen, setDeleteOpen] = useState(false);
    const [deleting, setDeleting] = useState(false);

    const loadTools = async (currentFilter: AiFilterState) => {
        try {
            setLoading(true);
            setError(null);

            const params = new URLSearchParams();

            if (currentFilter.search.trim()) {
                params.set("q", currentFilter.search.trim());
            }
            if (currentFilter.category !== "all") {
                params.set("category", currentFilter.category);
            }
            if (currentFilter.pricing !== "all") {
                params.set("pricing", currentFilter.pricing);
            }
            if (currentFilter.featuredOnly) {
                params.set("featuredOnly", "true");
            }

            const query = params.toString();
            const url = query
                ? `${API_BASE}/api/tools?${query}`
                : `${API_BASE}/api/tools`;

            const res = await fetch(url);
            if (!res.ok) {
                throw new Error(`Failed to load tools: ${res.status}`);
            }
            const data = (await res.json()) as AiTool[];
            setTools(data);
        } catch {
            setError("Failed to load tools. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        void loadTools(filter);
    }, [filter]);

    const foundCount = useMemo(() => tools.length, [tools]);

    const handleCreateSubmit = async (values: ToolFormValues) => {
        try {
            setSaving(true);

            const payload: NewAiToolPayload = {
                name: values.name,
                url: values.url,
                shortDescription: values.shortDescription,
                mainCategory: values.category as AiCategory,
                pricing: values.pricing as PricingModel,
                tags: values.tags,
                language: values.language,
                isFeatured: values.featured
            };

            const res = await fetch(`${API_BASE}/api/tools`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(payload)
            });
            if (!res.ok) {
                throw new Error(`Failed to create tool: ${res.status}`);
            }
            const created = (await res.json()) as AiTool;
            setTools((prev) => [created, ...prev]);
            setCreateOpen(false);
        } catch {
            setError("Failed to add tool. Please try again.");
        } finally {
            setSaving(false);
        }
    };

    const handleEditSubmit = async (values: ToolFormValues) => {
        if (!editTool) return;
        try {
            setSaving(true);

            const payload = {
                name: values.name,
                url: values.url,
                shortDescription: values.shortDescription,
                category: values.category,
                pricing: values.pricing,
                tags: values.tags,
                featured: values.featured
            };

            const res = await fetch(`${API_BASE}/api/tools/${editTool.id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(payload)
            });
            if (!res.ok) {
                throw new Error(`Failed to update tool: ${res.status}`);
            }
            const updated = (await res.json()) as AiTool;
            setTools((prev) => prev.map((t) => (t.id === updated.id ? updated : t)));
            setEditOpen(false);
            setEditTool(null);
        } catch {
            setError("Failed to update tool. Please try again.");
        } finally {
            setSaving(false);
        }
    };

    const handleDeleteConfirm = async () => {
        if (!deleteTool) return;
        try {
            setDeleting(true);
            const res = await fetch(`${API_BASE}/api/tools/${deleteTool.id}`, {
                method: "DELETE"
            });
            if (!res.ok && res.status !== 204) {
                throw new Error(`Failed to delete tool: ${res.status}`);
            }
            setTools((prev) => prev.filter((t) => t.id !== deleteTool.id));
            setDeleteOpen(false);
            setDeleteTool(null);
        } catch {
            setError("Failed to delete tool. Please try again.");
            setDeleting(false);
        }
    };

    return (
        <section
            id="tools"
            className="rounded-3xl border border-[var(--color-border-soft)] bg-[var(--color-surface-grid)] p-5 text-[var(--color-text-main)] shadow-[0_24px_60px_rgba(0,0,0,0.45)] sm:p-6 lg:p-7"
        >
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                <div className="max-w-xl space-y-2">
                    <h2 className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[var(--color-primary)]">
                        {t("hero.badge")}
                    </h2>
                    <h3 className="text-lg font-semibold text-[var(--color-text-main)] sm:text-xl">
                        {t("hero.title")}
                    </h3>
                    <p className="text-xs text-[var(--color-text-muted)] sm:text-sm">
                        {t("hero.subtitle")}
                    </p>
                </div>

                <div className="flex items-center gap-3 text-xs text-[var(--color-text-muted)]">
          <span>
            {t("hero.found")}{" "}
              <span className="font-semibold text-[var(--color-primary)]">
              {foundCount}
            </span>{" "}
              {foundCount === 1 ? t("hero.tool") : t("hero.tools")}
          </span>
                    <button
                        type="button"
                        onClick={() => setCreateOpen(true)}
                        className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-[var(--color-border-soft)] bg-[var(--color-chip-bg)] px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--color-text-main)] hover:border-[var(--color-primary)]"
                    >
                        <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-primary)]"/>
                        {t("hero.ctaAdd")}
                    </button>
                </div>
            </div>

            <div className="mt-6">
                <AiFilters value={filter} onChange={setFilter}/>
            </div>

            {error && (
                <div className="mt-4 rounded-2xl border border-red-500/40 bg-red-500/10 px-3 py-2 text-xs text-red-200">
                    {error}
                </div>
            )}

            <div className="mt-7 grid gap-4 sm:gap-5 md:grid-cols-3 xl:grid-cols-4">
                {loading && tools.length === 0 && (
                    <div className="col-span-full text-xs text-[var(--color-text-soft)]">
                        {t("hero.loading")}
                    </div>
                )}

                {!loading && tools.length === 0 && !error && (
                    <div className="col-span-full text-xs text-[var(--color-text-soft)]">
                        {t("hero.noToolsMatch")}
                    </div>
                )}

                {tools.map((tool) => (
                    <AiCard
                        key={tool.id}
                        tool={tool}
                        onEdit={(tTool) => {
                            setEditTool(tTool);
                            setEditOpen(true);
                        }}
                        onDelete={(tTool) => {
                            setDeleteTool(tTool);
                            setDeleteOpen(true);
                        }}
                    />
                ))}
            </div>

            <ToolModal
                open={createOpen}
                mode="create"
                onClose={() => {
                    if (!saving) setCreateOpen(false);
                }}
                onSubmit={handleCreateSubmit}
                saving={saving}
            />

            {editTool && (
                <ToolModal
                    open={editOpen}
                    mode="edit"
                    initial={{
                        name: editTool.name,
                        url: editTool.url,
                        shortDescription: editTool.shortDescription,
                        category: editTool.category,
                        pricing: editTool.pricing,
                        tags: editTool.tags,
                        language: editTool.language ?? "English",
                        featured: Boolean(editTool.featured)
                    }}
                    onClose={() => {
                        if (!saving) {
                            setEditOpen(false);
                            setEditTool(null);
                        }
                    }}
                    onSubmit={handleEditSubmit}
                    saving={saving}
                />
            )}

            <DeleteConfirmModal
                open={deleteOpen}
                title={t("deleteModal.title")}
                description={t("deleteModal.description")}
                confirmLabel={t("actionBtn.delete")}
                loading={deleting}
                onCancel={() => {
                    if (!deleting) {
                        setDeleteOpen(false);
                        setDeleteTool(null);
                    }
                }}
                onConfirm={handleDeleteConfirm}
            />
        </section>
    );
};

export default AiGrid;
