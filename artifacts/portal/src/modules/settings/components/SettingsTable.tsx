import { useState, useMemo } from "react";
import { Search, Plus, Pencil, Trash2, Eye } from "lucide-react";
import { cn } from "@/lib/utils";
import Pagination from "@/shared/components/Pagination";

export interface ColumnDef<T> {
  key: string;
  label: string;
  render?: (row: T) => React.ReactNode;
}

interface SettingsTableProps<T extends { id: string }> {
  data: T[];
  columns: ColumnDef<T>[];
  searchKeys: (keyof T)[];
  addLabel: string;
  onAdd: () => void;
  onEdit: (row: T) => void;
  onDelete: (id: string) => void;
  onView?: (row: T) => void;
  emptyMessage?: string;
}

export function SettingsTable<T extends { id: string }>({
  data,
  columns,
  searchKeys,
  addLabel,
  onAdd,
  onEdit,
  onDelete,
  onView,
  emptyMessage = "No records found.",
}: SettingsTableProps<T>) {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const filtered = useMemo(() => {
    if (!search.trim()) return data;
    const q = search.toLowerCase();
    return data.filter((row) =>
      searchKeys.some((k) => String(row[k] ?? "").toLowerCase().includes(q))
    );
  }, [data, search, searchKeys]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const safePage = Math.min(page, totalPages);
  const paginated = filtered.slice((safePage - 1) * pageSize, safePage * pageSize);

  function handleSearch(v: string) {
    setSearch(v);
    setPage(1);
  }

  return (
    <div className="bg-card border border-border rounded-2xl shadow-sm overflow-hidden">
      {/* Toolbar */}
      <div className="px-5 py-3.5 border-b border-border flex items-center justify-between gap-3 bg-background">
        <div className="relative flex-1 max-w-xs">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground pointer-events-none" />
          <input
            type="text"
            placeholder="Search..."
            value={search}
            onChange={(e) => handleSearch(e.target.value)}
            className="w-full h-9 pl-8.5 pr-3 rounded-lg border border-border bg-muted/30 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-foreground/10 focus:border-foreground/30 transition"
          />
        </div>
        <button
          onClick={onAdd}
          className="flex items-center gap-1.5 h-9 px-4 rounded-xl text-sm font-semibold bg-foreground text-background hover:bg-foreground/90 transition-colors shrink-0 shadow-sm"
        >
          <Plus className="h-3.5 w-3.5" />
          {addLabel}
        </button>
      </div>

      {/* Table */}
      {paginated.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 px-6 text-center">
          <p className="text-sm text-muted-foreground">{emptyMessage}</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/30">
                <th className="px-5 py-3.5 text-left text-[11px] font-semibold text-muted-foreground uppercase tracking-wider whitespace-nowrap w-12">
                  Sr.
                </th>
                {columns.map((col) => (
                  <th
                    key={col.key}
                    className="px-5 py-3.5 text-left text-[11px] font-semibold text-muted-foreground uppercase tracking-wider whitespace-nowrap"
                  >
                    {col.label}
                  </th>
                ))}
                <th className="px-5 py-3.5 text-right text-[11px] font-semibold text-muted-foreground uppercase tracking-wider whitespace-nowrap">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {paginated.map((row, i) => (
                <tr
                  key={row.id}
                  className={cn(
                    "border-b border-border last:border-0 hover:bg-muted/20 transition-colors",
                    i % 2 !== 0 && "bg-muted/10"
                  )}
                >
                  <td className="px-5 py-3.5 text-xs text-muted-foreground tabular-nums w-12">
                    {(safePage - 1) * pageSize + i + 1}
                  </td>
                  {columns.map((col) => (
                    <td key={col.key} className="px-5 py-3.5">
                      {col.render
                        ? col.render(row)
                        : <span className="text-foreground">{String((row as Record<string, unknown>)[col.key] ?? "—")}</span>
                      }
                    </td>
                  ))}
                  <td className="px-5 py-3.5">
                    <div className="flex items-center justify-end gap-1.5">
                      {onView && (
                        <button
                          onClick={() => onView(row)}
                          className="h-7 w-7 rounded-lg border border-border flex items-center justify-center text-muted-foreground hover:text-blue-600 hover:border-blue-200 hover:bg-blue-50 transition-colors"
                          title="View"
                        >
                          <Eye className="h-3.5 w-3.5" />
                        </button>
                      )}
                      <button
                        onClick={() => onEdit(row)}
                        className="h-7 w-7 rounded-lg border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted/40 transition-colors"
                        title="Edit"
                      >
                        <Pencil className="h-3.5 w-3.5" />
                      </button>
                      <button
                        onClick={() => onDelete(row.id)}
                        className="h-7 w-7 rounded-lg border border-border flex items-center justify-center text-muted-foreground hover:text-red-600 hover:border-red-200 hover:bg-red-50 transition-colors"
                        title="Delete"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Pagination */}
      <Pagination
        page={safePage}
        totalPages={totalPages}
        onPageChange={setPage}
        totalItems={filtered.length}
        onPageSizeChange={(s) => { setPageSize(s); setPage(1); }}
        pageSize={pageSize}
      />
    </div>
  );
}
