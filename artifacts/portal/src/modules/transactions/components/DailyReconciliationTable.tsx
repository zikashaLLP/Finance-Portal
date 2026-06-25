import { useState } from "react";
import { format, parseISO } from "date-fns";
import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { mockDailyReconciliation, type DailyReconciliation } from "../data/mockDailyReconciliation";

const fmt = (n: number) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(n);

function AmountCell({ value, type }: { value: number; type?: "in" | "out" | "neutral" }) {
  if (value === 0) return <span className="text-muted-foreground/50">—</span>;
  const color =
    type === "in" ? "text-emerald-600" :
    type === "out" ? "text-red-500" :
    "text-foreground";
  return <span className={`font-medium ${color}`}>{fmt(value)}</span>;
}

function BalanceCell({ value }: { value: number }) {
  return <span className="font-semibold text-foreground">{fmt(value)}</span>;
}

export default function DailyReconciliationTable() {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(8);

  const totalPages = Math.max(1, Math.ceil(mockDailyReconciliation.length / itemsPerPage));
  const paginated = mockDailyReconciliation.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="bg-card border border-border rounded-2xl shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead>
            {/* Group header row */}
            <tr className="text-xs font-semibold border-b border-border">
              <th
                className="px-5 py-3 text-muted-foreground font-medium whitespace-nowrap text-left"
                rowSpan={2}
              />
              <th
                colSpan={4}
                className="px-5 py-2.5 text-center text-amber-700 bg-amber-50/60 border-x border-amber-100 tracking-wide uppercase text-[10px]"
              >
                Cash
              </th>
              <th
                colSpan={4}
                className="px-5 py-2.5 text-center text-blue-700 bg-blue-50/60 border-x border-blue-100 tracking-wide uppercase text-[10px]"
              >
                Bank
              </th>
              <th
                className="px-5 py-2.5 text-center text-muted-foreground font-medium whitespace-nowrap text-[10px] uppercase tracking-wide"
                rowSpan={2}
              >
                Txns
              </th>
            </tr>
            {/* Sub-header row */}
            <tr className="text-[11px] text-muted-foreground border-b border-border bg-muted/20">
              <th className="px-5 py-2.5 font-medium whitespace-nowrap text-left w-[110px] border-l border-amber-100">Opening</th>
              <th className="px-5 py-2.5 font-medium whitespace-nowrap text-right w-[110px]">Cash In</th>
              <th className="px-5 py-2.5 font-medium whitespace-nowrap text-right w-[110px]">Cash Out</th>
              <th className="px-5 py-2.5 font-medium whitespace-nowrap text-right w-[110px] border-r border-amber-100">Closing</th>
              <th className="px-5 py-2.5 font-medium whitespace-nowrap text-left w-[110px] border-l border-blue-100">Opening</th>
              <th className="px-5 py-2.5 font-medium whitespace-nowrap text-right w-[110px]">Bank In</th>
              <th className="px-5 py-2.5 font-medium whitespace-nowrap text-right w-[110px]">Bank Out</th>
              <th className="px-5 py-2.5 font-medium whitespace-nowrap text-right w-[110px] border-r border-blue-100">Closing</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {paginated.map((row: DailyReconciliation) => (
              <tr key={row.date} className="hover:bg-muted/25 transition-colors group">
                {/* Date */}
                <td className="px-5 py-4 whitespace-nowrap">
                  <div className="font-semibold text-foreground text-sm">
                    {format(parseISO(row.date), "dd MMM")}
                  </div>
                  <div className="text-[11px] text-muted-foreground mt-0.5">
                    {format(parseISO(row.date), "EEE")}
                  </div>
                </td>

                {/* Cash columns */}
                <td className="px-5 py-4 whitespace-nowrap text-left border-l border-amber-100/70 bg-amber-50/20 group-hover:bg-amber-50/30">
                  <BalanceCell value={row.openingCash} />
                </td>
                <td className="px-5 py-4 whitespace-nowrap text-right bg-amber-50/20 group-hover:bg-amber-50/30">
                  <AmountCell value={row.cashIn} type="in" />
                </td>
                <td className="px-5 py-4 whitespace-nowrap text-right bg-amber-50/20 group-hover:bg-amber-50/30">
                  <AmountCell value={row.cashOut} type="out" />
                </td>
                <td className="px-5 py-4 whitespace-nowrap text-right border-r border-amber-100/70 bg-amber-50/20 group-hover:bg-amber-50/30">
                  <BalanceCell value={row.closingCash} />
                </td>

                {/* Bank columns */}
                <td className="px-5 py-4 whitespace-nowrap text-left border-l border-blue-100/70 bg-blue-50/20 group-hover:bg-blue-50/30">
                  <BalanceCell value={row.openingBank} />
                </td>
                <td className="px-5 py-4 whitespace-nowrap text-right bg-blue-50/20 group-hover:bg-blue-50/30">
                  <AmountCell value={row.bankIn} type="in" />
                </td>
                <td className="px-5 py-4 whitespace-nowrap text-right bg-blue-50/20 group-hover:bg-blue-50/30">
                  <AmountCell value={row.bankOut} type="out" />
                </td>
                <td className="px-5 py-4 whitespace-nowrap text-right border-r border-blue-100/70 bg-blue-50/20 group-hover:bg-blue-50/30">
                  <BalanceCell value={row.closingBank} />
                </td>

                {/* Transaction count */}
                <td className="px-5 py-4 whitespace-nowrap text-center">
                  <span className="inline-flex items-center justify-center h-6 min-w-6 px-2 rounded-full bg-muted text-muted-foreground text-xs font-semibold">
                    {row.txCount}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="p-4 border-t border-border flex items-center justify-between bg-card">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <span>Show</span>
          <Select
            value={itemsPerPage.toString()}
            onValueChange={(v) => { setItemsPerPage(Number(v)); setCurrentPage(1); }}
          >
            <SelectTrigger className="h-8 w-[70px] bg-background border-border rounded-lg text-xs">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="8">8</SelectItem>
              <SelectItem value="20">20</SelectItem>
              <SelectItem value="50">50</SelectItem>
            </SelectContent>
          </Select>
          <span>per page</span>
        </div>

        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 rounded-lg text-muted-foreground hover:text-foreground"
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>

          {Array.from({ length: totalPages }).map((_, i) => {
            if (totalPages > 5 && i > 2 && i < totalPages - 1) {
              if (i === 3) return <div key="ellipsis" className="px-2 text-muted-foreground"><MoreHorizontal className="h-4 w-4" /></div>;
              return null;
            }
            const page = i + 1;
            const isActive = currentPage === page;
            return (
              <Button
                key={page}
                variant={isActive ? "default" : "ghost"}
                size="sm"
                className={`h-8 w-8 p-0 rounded-lg ${isActive ? "bg-foreground text-background" : "text-muted-foreground hover:text-foreground hover:bg-muted/50"}`}
                onClick={() => setCurrentPage(page)}
              >
                {page}
              </Button>
            );
          })}

          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 rounded-lg text-muted-foreground hover:text-foreground"
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages || totalPages === 0}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
