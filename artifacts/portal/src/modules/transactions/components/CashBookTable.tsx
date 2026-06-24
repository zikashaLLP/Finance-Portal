import { useState } from "react";
import { format, parseISO } from "date-fns";
import { Pencil, Trash2, ChevronLeft, ChevronRight, MoreHorizontal, ChevronUp, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Transaction } from "../data/mockTransactions";
import TransactionBadge from "./TransactionBadge";

interface CashBookTableProps {
  transactions: Transaction[];
}

export default function CashBookTable({ transactions }: CashBookTableProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(8);

  const totalPages = Math.ceil(transactions.length / itemsPerPage);
  const paginatedTransactions = transactions.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const formatCurrency = (amount: number, type: "income" | "expense") => {
    const formatted = new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(amount);
    return type === "income" ? `+${formatted}` : `-${formatted}`;
  };

  const getInitials = (name: string) =>
    name.split(" ").map((n) => n[0]).join("").substring(0, 2).toUpperCase();

  return (
    <div className="flex flex-col gap-4" data-testid="cashbook-table">

      {/* Table */}
      <div className="bg-card border border-border rounded-2xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-muted-foreground bg-transparent border-b border-border">
              <tr>
                <th className="px-6 py-4 font-medium whitespace-nowrap">
                  <div className="flex items-center gap-1.5 cursor-pointer hover:text-foreground">
                    Date &amp; Time
                    <div className="flex flex-col -space-y-1 opacity-50">
                      <ChevronUp className="h-3 w-3" />
                      <ChevronDown className="h-3 w-3" />
                    </div>
                  </div>
                </th>
                <th className="px-6 py-4 font-medium">Type</th>
                <th className="px-6 py-4 font-medium">Description</th>
                <th className="px-6 py-4 font-medium">Entity</th>
                <th className="px-6 py-4 font-medium text-right">Amount</th>
                <th className="px-6 py-4 font-medium">Account</th>
                <th className="px-6 py-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {paginatedTransactions.length > 0 ? (
                paginatedTransactions.map((tx) => (
                  <tr key={tx.id} className="hover:bg-muted/30 transition-colors group" data-testid={`row-${tx.id}`}>
                    <td className="px-6 py-4 whitespace-nowrap text-muted-foreground">
                      {format(parseISO(tx.dateTime), "dd MMM, hh:mm a")}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <TransactionBadge type={tx.type} />
                    </td>
                    <td className="px-6 py-4 text-foreground font-medium max-w-[200px] truncate" title={tx.description}>
                      {tx.description}
                    </td>
                    <td className="px-6 py-4 text-muted-foreground whitespace-nowrap">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-7 w-7 rounded-full bg-blue-50 text-blue-700 border border-blue-100">
                          <AvatarFallback className="text-[10px] font-semibold bg-transparent">{getInitials(tx.entity)}</AvatarFallback>
                        </Avatar>
                        <span className="font-medium text-foreground">{tx.entity}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right font-semibold">
                      <span className={tx.type === "income" ? "text-emerald-600" : "text-red-600"}>
                        {formatCurrency(tx.amount, tx.type)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <div className={`h-1.5 w-1.5 rounded-full ${tx.account === "Cash" ? "bg-amber-400" : "bg-blue-500"}`} />
                        {tx.account}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right">
                      <div className="flex items-center justify-end gap-1">
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-foreground hover:bg-muted/50 rounded-full" data-testid={`btn-edit-${tx.id}`}>
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-red-600 hover:bg-red-50 rounded-full" data-testid={`btn-delete-${tx.id}`}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="px-6 py-12 text-center text-muted-foreground">
                    No transactions found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="p-4 border-t border-border flex items-center justify-between bg-card">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span>Show</span>
            <Select value={itemsPerPage.toString()} onValueChange={(v) => { setItemsPerPage(Number(v)); setCurrentPage(1); }}>
              <SelectTrigger className="h-8 w-[70px] bg-background border-border rounded-lg text-xs" data-testid="select-per-page">
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
              data-testid="btn-prev-page"
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
                  data-testid={`btn-page-${page}`}
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
              data-testid="btn-next-page"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
