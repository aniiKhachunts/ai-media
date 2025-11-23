import React from "react";
import {useT} from "../../i18n/LanguageContext";

interface DeleteConfirmModalProps {
    open: boolean;
    title: string;
    description: string;
    confirmLabel: string;
    loading?: boolean;
    onCancel: () => void;
    onConfirm: () => void;
}

const DeleteConfirmModal: React.FC<DeleteConfirmModalProps> = ({
                                                                   open,
                                                                   title,
                                                                   description,
                                                                   confirmLabel,
                                                                   loading = false,
                                                                   onCancel,
                                                                   onConfirm
                                                               }) => {
    const t = useT();

    if (!open) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
            <div
                className="w-full max-w-sm rounded-3xl border border-[var(--color-border-soft)] bg-[var(--color-surface-grid)] p-5 shadow-[0_24px_55px_rgba(0,0,0,0.75)] sm:p-6">
                <h2 className="text-sm font-semibold text-[var(--color-text-main)]">
                    {title}
                </h2>
                <p className="mt-2 text-xs text-[var(--color-text-soft)]">
                    {description}
                </p>

                <div className="mt-4 flex justify-end gap-2">
                    <button
                        type="button"
                        onClick={onCancel}
                        disabled={loading}
                        className="rounded-full border border-[var(--color-border-soft)] bg-[var(--color-chip-bg)] px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--color-text-main)] disabled:opacity-60"
                    >
                        {t("actionBtn.cancel")}
                    </button>
                    <button
                        type="button"
                        onClick={onConfirm}
                        disabled={loading}
                        className="rounded-full bg-red-500 px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-white hover:brightness-110 disabled:opacity-60"
                    >
                        {loading ? "…" : confirmLabel}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DeleteConfirmModal;
