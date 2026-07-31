import { useState } from "react";
import {
  ShoppingCart, Plus, Search, FileText, Download,
  Edit, Share2, Trash2,
} from "lucide-react";
import { cn } from "@/lib/utils";
import AnimatedMetricCard from "@/shared/components/AnimatedMetricCard";
import Pagination from "@/shared/components/Pagination";

type Sale = {
  id: string;
  billNo: string;
  date: string;
  customer: string;
  totalAmount: number;
  payment: number;
};

const SALES: Sale[] = [
  { id:"s1",  billNo:"D01/07/18",       date:"7/12/2026", customer:"HETAL DI",                          totalAmount:18540,     payment:0 },
  { id:"s2",  billNo:"D01/07/23",       date:"7/12/2026", customer:"Mahak Mam",                         totalAmount:44863.71,  payment:0 },
  { id:"s3",  billNo:"D01/07/21",       date:"7/11/2026", customer:"JIGNESH BHAI C/O DARSHANA DIDI",    totalAmount:141364.41, payment:0 },
  { id:"s4",  billNo:"D01/07/20",       date:"7/11/2026", customer:"SUSHMA GUPTA BNI",                  totalAmount:24780.77,  payment:0 },
  { id:"s5",  billNo:"SJ099/2026-27",   date:"7/11/2026", customer:"JIGNESH BHAI C/O DARSHANA DIDI",    totalAmount:24682.92,  payment:0 },
  { id:"s6",  billNo:"D01/07/19",       date:"7/10/2026", customer:"VARSHA TESSI",                      totalAmount:52100.00,  payment:0 },
  { id:"s7",  billNo:"D01/07/17",       date:"7/10/2026", customer:"RAMESH SHAH",                       totalAmount:33200.00,  payment:0 },
  { id:"s8",  billNo:"D01/07/16",       date:"7/9/2026",  customer:"PRIYA MEHTA",                       totalAmount:87500.00,  payment:0 },
  { id:"s9",  billNo:"D01/07/15",       date:"7/9/2026",  customer:"ANKIT C/F BHAVESH BHAI",            totalAmount:210000.00, payment:0 },
  { id:"s10", billNo:"D01/07/14",       date:"7/8/2026",  customer:"DEEPA MAM",                         totalAmount:16400.00,  payment:0 },
  { id:"s11", billNo:"SJ097/2026-27",   date:"7/8/2026",  customer:"BISMI (BHAVESH)",                   totalAmount:44250.00,  payment:0 },
  { id:"s12", billNo:"D01/07/13",       date:"7/7/2026",  customer:"HEENA KHATRI",                      totalAmount:28900.00,  payment:0 },
];


const fmtINR = (n: number) =>
  "₹" + new Intl.NumberFormat("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(n);

const totalRevenue = SALES.reduce((s, r) => s + r.totalAmount, 0);
const totalPending = SALES.reduce((s, r) => s + (r.totalAmount - r.payment), 0);

export default function SalesManagement() {
  const [search, setSearch] = useState("");
  const [page,   setPage]   = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const filtered = SALES.filter(s => {
    const q = search.toLowerCase();
    return !q || s.customer.toLowerCase().includes(q) || s.billNo.toLowerCase().includes(q);
  });

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const safePage   = Math.min(page, totalPages);
  const paged      = filtered.slice((safePage - 1) * pageSize, safePage * pageSize);

  function handleSearch(q: string) { setSearch(q); setPage(1); }

  return (
    <div className="w-full flex flex-col h-full">

      {/* HEADER */}
      <div className="px-8 pt-6 pb-0 border-b border-border shrink-0">
        <div className="flex items-center justify-end pb-5">
          <div className="flex items-center gap-2 shrink-0">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground pointer-events-none" />
                <input
                  type="text"
                  placeholder="Search bills (name, amount, weight)"
                  value={search}
                  onChange={e => handleSearch(e.target.value)}
                  className="h-9 pl-9 pr-4 rounded-lg border border-border bg-background text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-foreground/20 transition-colors w-64"
                />
              </div>
              <button className="flex items-center gap-1.5 h-9 px-4 rounded-lg bg-foreground text-background text-sm font-medium hover:bg-foreground/90 transition-colors">
                <Plus className="h-3.5 w-3.5" />
                New Sale
              </button>
            </div>
        </div>

      </div>

      {/* BODY */}
      <div className="flex-1 overflow-y-auto no-scrollbar p-8 space-y-5">

          <div className="grid grid-cols-3 gap-4">
            {[
              { label:"Total Bills",   value: String(SALES.length),    sub:"All records"       },
              { label:"Total Revenue", value: fmtINR(totalRevenue),    sub:"Gross sales value" },
              { label:"Pending",       value: fmtINR(totalPending),    sub:"Unpaid amount"     },
            ].map(({ label, value, sub }, i) => (
              <AnimatedMetricCard key={label} label={label} value={value} sub={sub} index={i} />
            ))}
          </div>

          <div className="bg-card border border-border rounded-xl overflow-hidden">
            <div className="px-6 py-4 border-b border-border flex items-center justify-between">
              <span className="text-sm font-semibold text-foreground">Sales Records ({filtered.length})</span>
              <span className="text-xs text-muted-foreground">Page {safePage} of {totalPages}</span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border bg-muted/30">
                    {["Bill Number", "Date", "Customer", "Total Amount", "Payment", "Actions"].map(h => (
                      <th key={h} className="text-left px-5 py-3.5 text-[11px] font-semibold text-muted-foreground uppercase tracking-wider whitespace-nowrap">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {paged.map(sale => {
                    const pending = sale.totalAmount - sale.payment;
                    return (
                      <tr key={sale.id} className="hover:bg-muted/20 transition-colors">
                        <td className="px-5 py-3.5">
                          <span className="text-sm font-semibold text-foreground tabular-nums">{sale.billNo}</span>
                        </td>
                        <td className="px-5 py-3.5">
                          <span className="text-xs text-muted-foreground whitespace-nowrap">{sale.date}</span>
                        </td>
                        <td className="px-5 py-3.5">
                          <span className="text-sm text-foreground font-medium">{sale.customer}</span>
                        </td>
                        <td className="px-5 py-3.5">
                          <span className="text-sm font-semibold text-foreground tabular-nums">{fmtINR(sale.totalAmount)}</span>
                        </td>
                        <td className="px-5 py-3.5">
                          <div>
                            <span className={cn(
                              "text-xs font-semibold tabular-nums",
                              pending > 0 ? "text-red-500" : "text-emerald-600",
                            )}>
                              {fmtINR(sale.payment)}
                            </span>
                            {pending > 0 && (
                              <p className="text-[10px] text-red-400 mt-0.5">Pending: {fmtINR(pending)}</p>
                            )}
                          </div>
                        </td>
                        <td className="px-5 py-3.5">
                          <div className="flex items-center gap-1">
                            {[
                              { icon: FileText, title:"View Bill"    },
                              { icon: Download, title:"Download"     },
                              { icon: Edit,     title:"Edit"         },
                              { icon: Share2,   title:"Share"        },
                              { icon: Trash2,   title:"Delete", red:true },
                            ].map(({ icon: Icon, title, red }) => (
                              <button
                                key={title}
                                title={title}
                                className={cn(
                                  "h-7 w-7 rounded flex items-center justify-center border border-border transition-colors",
                                  red
                                    ? "text-red-400 hover:bg-red-50 hover:border-red-200"
                                    : "text-muted-foreground hover:bg-sidebar-accent hover:text-foreground",
                                )}
                              >
                                <Icon className="h-3.5 w-3.5" />
                              </button>
                            ))}
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                  {paged.length === 0 && (
                    <tr>
                      <td colSpan={6} className="px-6 py-10 text-center text-sm text-muted-foreground">
                        No sales records match the search.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            <Pagination
              page={safePage}
              totalPages={totalPages}
              onPageChange={setPage}
              totalItems={filtered.length}
              pageSize={pageSize}
              onPageSizeChange={(s) => { setPageSize(s); setPage(1); }}
              itemLabel="records"
            />
          </div>

      </div>
    </div>
  );
}
