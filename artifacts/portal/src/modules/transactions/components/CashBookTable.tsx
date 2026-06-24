import { useState } from "react";
import { format, parseISO } from "date-fns";
import { Search, Calendar as CalendarIcon, Download, Pencil, Trash2, SlidersHorizontal } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
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
  const itemsPerPage = 8;

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

  return (
    <div className="bg-card border border-border rounded-xl shadow-sm flex flex-col overflow-hidden" data-testid="cashbook-table">
      {/* Filters Bar */}
      <div className="p-4 border-b border-border flex flex-col sm:flex-row gap-3 items-center justify-between bg-card/50">
        <div className="flex items-center gap-2 w-full sm:w-auto flex-1">
          <div className="relative w-full sm:w-64 max-w-sm">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search descriptions, entities..."
              className="pl-9 h-9 w-full bg-background"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
              data-testid="input-table-search"
            />
          </div>
          
          <Button variant="outline" size="sm" className="h-9 px-3 text-muted-foreground hidden sm:flex" data-testid="btn-date-filter">
            <CalendarIcon className="h-4 w-4 mr-2" />
            Date Range
          </Button>
          
          <Select 
            value={typeFilter} 
            onValueChange={(v) => {
              setTypeFilter(v);
              setCurrentPage(1);
            }}
          >
            <SelectTrigger className="h-9 w-[130px] bg-background" data-testid="select-type-filter">
              <SlidersHorizontal className="h-4 w-4 mr-2 text-muted-foreground" />
              <SelectValue placeholder="All Types" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="income">Income Only</SelectItem>
              <SelectItem value="expense">Expense Only</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <Button variant="outline" size="sm" className="h-9 w-full sm:w-auto" data-testid="btn-export">
          <Download className="h-4 w-4 mr-2" />
          Export
        </Button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead className="text-xs text-muted-foreground uppercase bg-secondary/30 border-b border-border">
            <tr>
              <th className="px-6 py-3 font-medium">Date & Time</th>
              <th className="px-6 py-3 font-medium">Type</th>
              <th className="px-6 py-3 font-medium">Description</th>
              <th className="px-6 py-3 font-medium">Entity</th>
              <th className="px-6 py-3 font-medium text-right">Amount</th>
              <th className="px-6 py-3 font-medium">Account</th>
              <th className="px-6 py-3 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {paginatedTransactions.length > 0 ? (
              paginatedTransactions.map((tx) => (
                <tr key={tx.id} className="hover:bg-muted/50 transition-colors group" data-testid={`row-${tx.id}`}>
                  <td className="px-6 py-4 whitespace-nowrap text-foreground font-medium">
                    {format(parseISO(tx.dateTime), "dd MMM yyyy, hh:mm a")}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <TransactionBadge type={tx.type} />
                  </td>
                  <td className="px-6 py-4 text-foreground max-w-[200px] truncate" title={tx.description}>
                    {tx.description}
                  </td>
                  <td className="px-6 py-4 text-muted-foreground">
                    {tx.entity}
                  </td>
                  <td className={`px-6 py-4 whitespace-nowrap text-right font-semibold ${tx.type === 'income' ? 'text-emerald-600' : 'text-red-600'}`}>
                    {formatCurrency(tx.amount, tx.type)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-muted-foreground">
                    {tx.account}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right">
                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-blue-600 hover:text-blue-700 hover:bg-blue-50" data-testid={`btn-edit-${tx.id}`}>
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-red-600 hover:text-red-700 hover:bg-red-50" data-testid={`btn-delete-${tx.id}`}>
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

      {/* Pagination */}
      <div className="p-4 border-t border-border flex items-center justify-between bg-card/50">
        <div className="text-sm text-muted-foreground">
          Showing <span className="font-medium text-foreground">{(currentPage - 1) * itemsPerPage + 1}</span> to <span className="font-medium text-foreground">{Math.min(currentPage * itemsPerPage, filteredTransactions.length)}</span> of <span className="font-medium text-foreground">{filteredTransactions.length}</span> entries
        </div>
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            data-testid="btn-prev-page"
          >
            Previous
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages || totalPages === 0}
            data-testid="btn-next-page"
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
