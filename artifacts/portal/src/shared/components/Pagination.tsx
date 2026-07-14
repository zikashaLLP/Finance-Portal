import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface PaginationProps {
  page: number;
  totalPages: number;
  onPageChange: (p: number) => void;
  totalItems?: number;
  pageSize?: number;
  itemLabel?: string;
}

export default function Pagination({
  page,
  totalPages,
  onPageChange,
  totalItems,
  pageSize,
  itemLabel = "records",
}: PaginationProps) {
  const safePage = Math.min(page, totalPages);

  const showingText =
    totalItems !== undefined && pageSize !== undefined
      ? `Showing ${totalItems === 0 ? 0 : (safePage - 1) * pageSize + 1}–${Math.min(safePage * pageSize, totalItems)} of ${totalItems} ${itemLabel}`
      : null;

  return (
    <div className="px-6 py-3.5 border-t border-border flex items-center justify-between bg-muted/10">
      {showingText ? (
        <p className="text-xs text-muted-foreground">{showingText}</p>
      ) : (
        <span />
      )}

      <div className="flex items-center gap-1">
        <button
          onClick={() => onPageChange(Math.max(1, safePage - 1))}
          disabled={safePage === 1}
          className="h-7 w-7 rounded-md border border-border flex items-center justify-center text-muted-foreground hover:bg-sidebar-accent disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
        >
          <ChevronLeft className="h-3.5 w-3.5" />
        </button>

        {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
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
        ))}

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
