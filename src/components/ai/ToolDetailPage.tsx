import React, {useEffect, useMemo, useState} from "react";
import {Link, useNavigate, useParams} from "react-router-dom";
import type {AiCategory, AiTool, PricingModel} from "../../data/aiTools";
import ToolModal, {type ToolFormValues} from "./ToolModal/ToolModal.tsx";
import DeleteConfirmModal from "../common/DeleteToolModal";
import {FiEdit2, FiTrash2} from "react-icons/fi";
import {useT} from "../../i18n/LanguageContext";

const API_BASE = import.meta.env.VITE_API_BASE ?? "http://localhost:4000";

type DetailState = {
    tool: AiTool | null;
    loading: boolean;
    error: string | null;
    notFound: boolean;
};

const ToolDetailPage: React.FC = () => {
    const {id} = useParams<{ id: string }>();
    const navigate = useNavigate();
    const t = useT();

    const [{tool, loading, error, notFound}, setState] =
        useState<DetailState>({
            tool: null,
            loading: true,
            error: null,
            notFound: false
        });

    const [editOpen, setEditOpen] = useState(false);
    const [saving, setSaving] = useState(false);
    const [deleteOpen, setDeleteOpen] = useState(false);
    const [deleting, setDeleting] = useState(false);

    useEffect(() => {
        if (!id) return;

        let cancelled = false;

        const loadTool = async () => {
            try {
                setState({
                    tool: null,
                    loading: true,
                    error: null,
                    notFound: false
                });

                const res = await fetch(`${API_BASE}/api/tools/${id}`);

                if (res.status === 404) {
                    if (!cancelled) {
                        setState({
                            tool: null,
                            loading: false,
                            error: null,
                            notFound: true
                        });
                    }
                    return;
                }

                if (!res.ok) {
                    throw new Error(`Failed to load tool: ${res.status}`);
                }

                const data = (await res.json()) as AiTool;

                if (!cancelled) {
                    setState({
                        tool: data,
                        loading: false,
                        error: null,
                        notFound: false
                    });
                }
            } catch {
                if (!cancelled) {
                    setState({
                        tool: null,
                        loading: false,
                        error: t("detail.loading"),
                        notFound: false
                    });
                }
            }
        };

        void loadTool();

        return () => {
            cancelled = true;
        };
    }, [id, t]);

    const prettyCategory = useMemo(
        () => (tool ? t(`categories.${tool.category}`) : ""),
        [tool, t]
    );

    const prettyPricing = useMemo(() => {
        if (!tool) return "";
        if (tool.pricing === "free") return t("filters.pricingFree");
        if (tool.pricing === "paid") return t("filters.pricingPaid");
        if (tool.pricing === "contact") return t("filters.pricingContact");
        return tool.pricing;
    }, [tool, t]);

    const handleUpdate = async (values: ToolFormValues) => {
        if (!id || !tool) return;
        try {
            setSaving(true);
            const payload = {
                name: values.name,
                url: values.url,
                shortDescription: values.shortDescription,
                category: values.category as AiCategory,
                pricing: values.pricing as PricingModel,
                tags: values.tags,
                featured: values.featured
            };

            const res = await fetch(`${API_BASE}/api/tools/${id}`, {
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
            setState({
                tool: updated,
                loading: false,
                error: null,
                notFound: false
            });
            setEditOpen(false);
        } catch {
            setState((prev) => ({
                ...prev,
                error: "Failed to update tool. Please try again."
            }));
        } finally {
            setSaving(false);
        }
    };

    const handleDeleteConfirm = async () => {
        if (!id || !tool) return;
        try {
            setDeleting(true);
            const res = await fetch(`${API_BASE}/api/tools/${id}`, {
                method: "DELETE"
            });
            if (!res.ok && res.status !== 204) {
                throw new Error(`Failed to delete tool: ${res.status}`);
            }
            navigate("/");
        } catch {
            setState((prev) => ({
                ...prev,
                error: "Failed to delete tool. Please try again."
            }));
            setDeleting(false);
        }
    };

    if (loading) {
        return (
            <section className="mx-auto max-w-4xl px-4 pt-16 lg:px-0 lg:pt-20">
                <div
                    className="rounded-3xl border border-[var(--color-border-soft)] bg-[var(--color-surface-grid)] p-6">
                    <p className="text-sm text-[var(--color-text-soft)]">
                        {t("detail.loading")}
                    </p>
                </div>
            </section>
        );
    }

    if (notFound || !tool) {
        return (
            <section className="mx-auto max-w-4xl px-4 pt-16 lg:px-0 lg:pt-20">
                <div
                    className="rounded-3xl border border-[var(--color-border-soft)] bg-[var(--color-surface-grid)] p-6">
                    <div className="flex items-center justify-between gap-4">
                        <h1 className="text-xl font-semibold text-[var(--color-text-main)]">
                            {t("detail.notFoundTitle")}
                        </h1>
                        <Link
                            to="/"
                            className="inline-flex rounded-full bg-[var(--color-primary)] px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-white"
                        >
                            {t("detail.notFoundBack")}
                        </Link>
                    </div>
                    <p className="mt-3 text-xs text-[var(--color-text-soft)]">
                        {t("detail.notFoundText")}
                    </p>
                </div>
            </section>
        );
    }

    return (
        <section className="mx-auto max-w-5xl px-4 pt-14 pb-16 lg:px-0 lg:pt-18">
            <div className="mb-4 flex items-center justify-between gap-3 text-[11px] text-[var(--color-text-soft)]">
                <div>
                    <Link to="/" className="hover:text-[var(--color-text-main)]">
                        {t("detail.breadcrumbRoot")}
                    </Link>{" "}
                    /{" "}
                    <span className="text-[var(--color-text-main)]">{tool.name}</span>
                </div>
                <div className="flex gap-2">
                    <button
                        type="button"
                        onClick={() => setEditOpen(true)}
                        className="flex cursor-pointer items-center justify-center rounded-full border border-[var(--color-border-soft)] bg-[var(--color-chip-bg)] px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--color-text-main)]"
                    >
                        <FiEdit2 className="h-3.5 w-3.5"/>
                    </button>
                    <button
                        type="button"
                        onClick={() => setDeleteOpen(true)}
                        className="flex cursor-pointer items-center justify-center rounded-full bg-red-500 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-white hover:brightness-110"
                    >
                        <FiTrash2 className="h-3.5 w-3.5"/>
                    </button>
                </div>
            </div>

            {error && (
                <div className="mb-4 rounded-2xl border border-red-500/40 bg-red-500/10 px-3 py-2 text-xs text-red-200">
                    {error}
                </div>
            )}

            <div
                className="rounded-3xl border border-[var(--color-border-soft)] bg-[var(--color-surface-grid)] p-6 shadow-[0_24px_60px_rgba(0,0,0,0.45)] sm:p-7 lg:p-8">
                <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
                    <div className="flex-1 space-y-4">
                        <div className="flex flex-wrap items-center gap-2">
              <span
                  className="inline-flex items-center gap-1 rounded-full bg-[var(--color-chip-bg)] px-2.5 py-1 text-[10px] uppercase tracking-[0.16em] text-[var(--color-text-soft)]">
                {prettyCategory}
              </span>
                            <span
                                className="inline-flex items-center gap-1 rounded-full bg-[var(--color-chip-bg)] px-2.5 py-1 text-[10px] uppercase tracking-[0.16em] text-[var(--color-text-soft)]">
                {prettyPricing}
              </span>
                            {tool.featured && (
                                <span
                                    className="inline-flex items-center gap-1 rounded-full bg-[var(--color-accent-soft)] px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-[var(--color-accent-1)]">
                  {t("detail.featured")}
                </span>
                            )}
                        </div>

                        <h1 className="text-2xl font-semibold leading-tight text-[var(--color-text-main)] sm:text-3xl">
                            {tool.name}
                        </h1>

                        <p className="text-sm leading-relaxed text-[var(--color-text-soft)]">
                            {tool.shortDescription}
                        </p>
                    </div>

                    <div className="w-full max-w-xs space-y-3 lg:w-64">
                        <a
                            href={tool.url}
                            target="_blank"
                            rel="noreferrer"
                            className="flex w-full items-center justify-center gap-2 rounded-2xl bg-[var(--color-primary)] px-4 py-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-white shadow-[0_0_18px_rgba(184,108,255,0.7)] transition hover:brightness-110"
                        >
                            <span className="h-1.5 w-1.5 rounded-full bg-white"/>
                            {t("detail.openTool")}
                        </a>

                        <div
                            className="rounded-2xl border border-[var(--color-border-soft)] bg-[var(--color-surface-grid-soft)] p-3.5 text-xs text-[var(--color-text-soft)]">
                            <dl className="space-y-2">
                                <div className="flex justify-between gap-3">
                                    <dt className="text-[11px] uppercase tracking-[0.14em]">
                                        {t("detail.category")}
                                    </dt>
                                    <dd className="text-right text-[var(--color-text-main)]">
                                        {prettyCategory}
                                    </dd>
                                </div>
                                <div className="flex justify-between gap-3">
                                    <dt className="text-[11px] uppercase tracking-[0.14em]">
                                        {t("detail.pricing")}
                                    </dt>
                                    <dd className="text-right text-[var(--color-text-main)]">
                                        {prettyPricing}
                                    </dd>
                                </div>
                            </dl>
                        </div>

                        {tool.tags.length > 0 && (
                            <div
                                className="rounded-2xl border border-[var(--color-border-soft)] bg-[var(--color-surface-grid-soft)] p-3.5 text-xs">
                                <div
                                    className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--color-text-muted)]">
                                    {t("detail.tags")}
                                </div>
                                <div className="mt-2 flex flex-wrap gap-1.5">
                                    {tool.tags.map((tag) => (
                                        <span
                                            key={tag}
                                            className="rounded-full bg-[var(--color-chip-bg)] px-2.5 py-0.5 text-[10px] text-[var(--color-text-main)]"
                                        >
                      #{tag}
                    </span>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <ToolModal
                open={editOpen}
                mode="edit"
                initial={{
                    name: tool.name,
                    url: tool.url,
                    shortDescription: tool.shortDescription,
                    category: tool.category,
                    pricing: tool.pricing as PricingModel,
                    tags: tool.tags,
                    language: tool.language ?? "English",
                    featured: Boolean(tool.featured)
                }}
                onClose={() => {
                    if (!saving) setEditOpen(false);
                }}
                onSubmit={handleUpdate}
                saving={saving}
            />

            <DeleteConfirmModal
                open={deleteOpen}
                title={t("deleteModal.title")}
                description={t("deleteModal.description")}
                confirmLabel={t("actionBtn.delete")}
                loading={deleting}
                onCancel={() => {
                    if (!deleting) setDeleteOpen(false);
                }}
                onConfirm={handleDeleteConfirm}
            />
        </section>
    );
};

export default ToolDetailPage;
