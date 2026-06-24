import { useState } from "react";
import { format, parseISO } from "date-fns";
import { Search, Download, Pencil, Trash2, SlidersHorizontal, Plus, List, LayoutGrid, ChevronLeft, ChevronRight, MoreHorizontal, ChevronUp, ChevronDown } from "lucide-react";
import { Input } from "@/components/ui/input";
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
  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState<string>("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [viewMode, setViewMode] = useState<"list" | "grid">("list");
  const [itemsPerPage, setItemsPerPage] = useState(8);

  // Filter transactions
  const filteredTransactions = transactions.filter((tx) => {
    const matchesSearch = 
      tx.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tx.entity.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tx.account.toLowerCase().includes(searchTerm.toLowerCase());
      
    const matchesType = typeFilter === "all" || tx.type === typeFilter;
    
    return matchesSearch && matchesType;
  });

  // Pagination
  const totalPages = Math.ceil(filteredTransactions.length / itemsPerPage);
  const paginatedTransactions = filteredTransactions.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const formatCurrency = (amount: number, type: "income" | "expense") => {
    const formatted = new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
    
    return type === "income" ? `+${formatted}` : `-${formatted}`;
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .substring(0, 2)
      .toUpperCase();
  };

  return (
    <div className="flex flex-col gap-4" data-testid="cashbook-table">
      {/* Toolbar Bar */}
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
        <div className="flex items-center gap-2 bg-background border border-border p-1 rounded-lg">
          <button 
            onClick={() => setViewMode("list")}
            className={`p-1.5 rounded-md transition-colors ${viewMode === "list" ? "bg-card shadow-sm text-foreground" : "text-muted-foreground hover:text-foreground"}`}
          >
            <List className="h-4 w-4" />
          </button>
          <button 
            onClick={() => setViewMode("grid")}
            className={`p-1.5 rounded-md transition-colors ${viewMode === "grid" ? "bg-card shadow-sm text-foreground" : "text-muted-foreground hover:text-foreground"}`}
          >
            <LayoutGrid className="h-4 w-4" />
          </button>
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search..."
              className="pl-9 h-9 w-full bg-background border-border rounded-lg"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
              data-testid="input-table-search"
            />
          </div>
          
          <Select 
            value={typeFilter} 
            onValueChange={(v) => {
              setTypeFilter(v);
              setCurrentPage(1);
            }}
          >
            <SelectTrigger className="h-9 w-[110px] bg-background border-border rounded-lg" data-testid="select-type-filter">
              <SlidersHorizontal className="h-3.5 w-3.5 mr-2 text-muted-foreground" />
              <SelectValue placeholder="Filter" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="income">Income Only</SelectItem>
              <SelectItem value="expense">Expense Only</SelectItem>
            </SelectContent>
          </Select>
          
          <Button variant="outline" size="sm" className="h-9 px-4 bg-background border-border rounded-lg text-foreground hover:bg-muted/50" data-testid="btn-export">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>

          <Button size="sm" className="h-9 px-4 bg-foreground text-background hover:bg-foreground/90 rounded-lg shadow-sm" data-testid="btn-add-transaction">
            <Plus className="h-4 w-4 mr-2" />
            Add Transaction
          </Button>
        </div>
      </div>

      {/* Grid view */}
      {viewMode === "grid" ? (
        <div className="flex flex-col gap-4">
          {paginatedTransactions.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4" data-testid="cashbook-grid">
              {paginatedTransactions.map((tx) => (
                <div
                  key={tx.id}
                  className="bg-card border border-border rounded-2xl shadow-sm p-5 flex flex-col gap-4 hover:shadow-md transition-shadow group"
                  data-testid={`card-${tx.id}`}
                >
                  <div className="flex items-start justify-between">
                    <TransactionBadge type={tx.type} />
                    <span className={`font-semibold ${tx.type === "income" ? "text-emerald-600" : "text-red-600"}`}>
                      {formatCurrency(tx.amount, tx.type)}
                    </span>
                  </div>
                  <div>
                    <p className="font-medium text-foreground mb-1 truncate" title={tx.description}>{tx.description}</p>
                    <p className="text-xs text-muted-foreground">{format(parseISO(tx.dateTime), "dd MMM, hh:mm a")}</p>
                  </div>
                  <div className="flex items-center gap-3 pt-3 border-t border-border">
                    <Avatar className="h-7 w-7 rounded-full bg-blue-50 text-blue-700 border border-blue-100">
                      <AvatarFallback className="text-[10px] font-semibold bg-transparent">{getInitials(tx.entity)}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-foreground truncate">{tx.entity}</p>
                      <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                        <div className={`h-1.5 w-1.5 rounded-full ${tx.account === "Cash" ? "bg-amber-400" : "bg-blue-500"}`} />
                        {tx.account}
                      </div>
                    </div>
                    <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-foreground hover:bg-muted/50 rounded-full" data-testid={`btn-edit-card-${tx.id}`}>
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-red-600 hover:bg-red-50 rounded-full" data-testid={`btn-delete-card-${tx.id}`}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-card border border-border rounded-2xl shadow-sm px-6 py-12 text-center text-muted-foreground">
              No transactions found matching your filters.
            </div>
          )}
        </div>
      ) : (
      /* Table view */
      <div className="bg-card border border-border rounded-2xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-muted-foreground bg-transparent border-b border-border">
              <tr>
                <th className="px-6 py-4 font-medium whitespace-nowrap">
                  <div className="flex items-center gap-1.5 cursor-pointer hover:text-foreground">
                    Date & Time
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
                    <td className="px-6 py-4 whitespace-nowrap text-right font-semibold text-foreground">
                      {formatCurrency(tx.amount, tx.type)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <div className={`h-1.5 w-1.5 rounded-full ${tx.account === "Cash" ? "bg-amber-400" : "bg-blue-500"}`} />
                        {tx.account}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right">
                      <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
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
                    No transactions found matching your filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      )}

      {/* Pagination */}
      <div className="bg-card border border-border rounded-2xl shadow-sm overflow-hidden">
        <div className="p-4 flex items-center justify-between bg-card">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span>Show</span>
            <Select value={itemsPerPage.toString()} onValueChange={(v) => { setItemsPerPage(Number(v)); setCurrentPage(1); }}>
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
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
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
              onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages || totalPages === 0}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
