import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

const DEFAULT_PAGE_SIZE_OPTIONS = [10, 20, 50, 100];

interface PaginationProps {
  page: number;
  totalPages: number;
  onPageChange: (p: number) => void;
  totalItems?: number;
  pageSize?: number;
  onPageSizeChange?: (size: number) => void;
  pageSizeOptions?: number[];
  itemLabel?: string;
}

export default function Pagination({
  page,
  totalPages,
  onPageChange,
  totalItems,
  pageSize,
  onPageSizeChange,
  pageSizeOptions = DEFAULT_PAGE_SIZE_OPTIONS,
  itemLabel = "records",
}: PaginationProps) {
  const safePage = Math.min(page, Math.max(1, totalPages));

  const showingText =
    totalItems !== undefined && pageSize !== undefined
      ? `Showing ${totalItems === 0 ? 0 : (safePage - 1) * pageSize + 1}–${Math.min(safePage * pageSize, totalItems)} of ${totalItems} ${itemLabel}`
      : null;

  // Smart page button rendering: first 2, window around current, last 2
  const pageButtons: (number | "…")[] = [];
  if (totalPages <= 7) {
    for (let i = 1; i <= totalPages; i++) pageButtons.push(i);
  } else {
    const add = (n: number) => { if (!pageButtons.includes(n)) pageButtons.push(n); };
    [1, 2].forEach(add);
    if (safePage - 2 > 3) pageButtons.push("…");
    for (let i = Math.max(3, safePage - 1); i <= Math.min(totalPages - 2, safePage + 1); i++) add(i);
    if (safePage + 2 < totalPages - 2) pageButtons.push("…");
    [totalPages - 1, totalPages].forEach(add);
  }

  return (
    <div className="px-5 py-3 border-t border-border flex flex-wrap items-center justify-between gap-3 bg-muted/10">
      {/* Left: rows-per-page selector + showing text */}
      <div className="flex items-center gap-3 flex-wrap">
        {onPageSizeChange && pageSize !== undefined && (
          <div className="flex items-center gap-1.5">
            <span className="text-xs text-muted-foreground whitespace-nowrap">Rows per page:</span>
            <select
              value={pageSize}
              onChange={(e) => { onPageSizeChange(Number(e.target.value)); onPageChange(1); }}
              className="h-7 pl-2 pr-6 rounded-md border border-border bg-background text-xs text-foreground focus:outline-none focus:ring-1 focus:ring-foreground/20 cursor-pointer appearance-none"
              style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='6'%3E%3Cpath d='M0 0l5 6 5-6z' fill='%23999'/%3E%3C/svg%3E")`, backgroundRepeat: "no-repeat", backgroundPosition: "right 6px center" }}
            >
              {pageSizeOptions.map((opt) => (
                <option key={opt} value={opt}>{opt}</option>
              ))}
            </select>
          </div>
        )}
        {showingText && (
          <p className="text-xs text-muted-foreground">{showingText}</p>
        )}
      </div>

      {/* Right: page navigation */}
      <div className="flex items-center gap-1">
        <button
          onClick={() => onPageChange(Math.max(1, safePage - 1))}
          disabled={safePage === 1}
          className="h-7 w-7 rounded-md border border-border flex items-center justify-center text-muted-foreground hover:bg-sidebar-accent disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
        >
          <ChevronLeft className="h-3.5 w-3.5" />
        </button>

        {pageButtons.map((n, idx) =>
          n === "…" ? (
            <span key={`ellipsis-${idx}`} className="h-7 w-5 flex items-center justify-center text-xs text-muted-foreground">…</span>
          ) : (
            <button
              key={n}
              onClick={() => onPageChange(n)}
              className={cn(
                "h-7 w-7 rounded-md text-xs font-medium transition-colors",
                n === safePage
                  ? "bg-foreground text-background"
                  : "border border-border text-muted-foreground hover:bg-sidebar-accent",
              )}
            >
              {n}
            </button>
          )
        )}

        <button
          onClick={() => onPageChange(Math.min(totalPages, safePage + 1))}
          disabled={safePage === totalPages}
          className="h-7 w-7 rounded-md border border-border flex items-center justify-center text-muted-foreground hover:bg-sidebar-accent disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
        >
          <ChevronRight className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  );
}
