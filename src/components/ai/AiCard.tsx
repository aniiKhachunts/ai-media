import React from "react";
import {motion} from "framer-motion";
import type {AiTool} from "../../data/aiTools";
import {useNavigate} from "react-router-dom";
import {FiEdit2, FiTrash2} from "react-icons/fi";
import {useT} from "../../i18n/LanguageContext";

interface AiCardProps {
    tool: AiTool;
    onEdit?: (tool: AiTool) => void;
    onDelete?: (tool: AiTool) => void;
}

const AiCard: React.FC<AiCardProps> = ({tool, onEdit, onDelete}) => {
    const navigate = useNavigate();
    const t = useT();

    const handleCardClick = () => navigate(`/tool/${tool.id}`);

    const categoryLabel = t(`categories.${tool.category}`);
    let pricingLabel = tool.pricing;
    if (tool.pricing === "free") pricingLabel = t("filters.pricingFree");
    else if (tool.pricing === "paid") pricingLabel = t("filters.pricingPaid");
    else if (tool.pricing === "contact")
        pricingLabel = t("filters.pricingContact");

    return (
        <motion.article
            layout
            whileHover={{y: -6, scale: 1.015}}
            transition={{type: "spring", stiffness: 260, damping: 22}}
            className="group grid cursor-pointer grid-rows-[auto,1fr,auto] gap-4 rounded-3xl border border-[var(--color-border-soft)] bg-[var(--color-surface-grid-card)] p-4 shadow-[0_10px_30px_rgba(0,0,0,0.25)] hover:border-[var(--color-primary)] hover:shadow-[0_22px_50px_rgba(0,0,0,0.35)] sm:p-5"
            onClick={handleCardClick}
        >
            <div className="flex items-start justify-between gap-3 text-[11px]">
                <div className="flex max-w-[65%] flex-col gap-1">
          <span
              className="inline-flex w-fit rounded-full bg-[var(--color-chip-bg)] px-3 py-0.5 text-[9px] uppercase tracking-[0.16em] text-[var(--color-text-soft)]">
            {categoryLabel}
          </span>

                    <span
                        className="inline-flex w-fit rounded-full border border-[var(--color-border-soft)] bg-[var(--color-surface-grid-soft)] px-3 py-0.5 text-[10px] font-semibold text-[var(--color-text-main)]">
            {pricingLabel}
          </span>

                    {tool.featured && (
                        <span
                            className="inline-flex w-fit rounded-full bg-[var(--color-accent-soft)] px-2.5 py-0.5 text-[9px] font-semibold uppercase tracking-[0.14em] text-[var(--color-accent-1)]">
              {t("detail.featured")}
            </span>
                    )}
                </div>

                <div className="flex items-start gap-1.5">
                    {onEdit && (
                        <button
                            type="button"
                            onClick={(e) => {
                                e.stopPropagation();
                                onEdit(tool);
                            }}
                            className="flex h-7 w-7 cursor-pointer items-center justify-center rounded-full border border-[var(--color-border-soft)] bg-[var(--color-chip-bg)] text-[var(--color-text-main)] hover:border-[var(--color-primary)]"
                        >
                            <FiEdit2 className="h-3.5 w-3.5"/>
                        </button>
                    )}

                    {onDelete && (
                        <button
                            type="button"
                            onClick={(e) => {
                                e.stopPropagation();
                                onDelete(tool);
                            }}
                            className="flex h-7 w-7 cursor-pointer items-center justify-center rounded-full bg-red-500/80 text-white hover:brightness-110"
                        >
                            <FiTrash2 className="h-3.5 w-3.5"/>
                        </button>
                    )}
                </div>
            </div>

            <div className="space-y-1.5">
                <h3 className="text-sm font-semibold leading-snug text-[var(--color-text-main)] group-hover:text-[var(--color-primary)]">
                    {tool.name}
                </h3>

                <p className="text-xs leading-snug text-[var(--color-text-soft)]">
                    {tool.shortDescription}
                </p>
            </div>

            <div className="flex items-center justify-between gap-3">
                <div className="flex flex-wrap gap-1.5">
                    {tool.tags.map((tag) => (
                        <span
                            key={tag}
                            className="rounded-full bg-[var(--color-chip-bg)] px-2.5 py-0.5 text-[10px] text-[var(--color-text-main)] whitespace-nowrap"
                        >
              #{tag}
            </span>
                    ))}
                </div>

                <a
                    href={tool.url}
                    target="_blank"
                    rel="noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="text-[11px] font-semibold text-[var(--color-primary)] underline-offset-2 group-hover:underline"
                >
                    {t("toolCard.goTo")}
                </a>
            </div>
        </motion.article>
    );
};

export default AiCard;
