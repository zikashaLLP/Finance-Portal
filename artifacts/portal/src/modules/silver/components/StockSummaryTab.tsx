import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Layers, Gem } from "lucide-react";
import Pagination from "@/shared/components/Pagination";
import AnimatedMetricCard from "@/shared/components/AnimatedMetricCard";
import { mockSilverTransactions, SilverTransaction } from "../data/mockSilver";

const fmt = (n: number) =>
  new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(n);

const fmtW = (n: number) => `${n.toFixed(2)} g`;

const TYPE_BADGE: Record<string, string> = {
  "Pure Silver":    "bg-slate-100 text-slate-700 border border-slate-200",
  "Silver Jewelry": "bg-violet-50 text-violet-700 border border-violet-200",
};

const CAT_BADGE: Record<string, string> = {
  Purchase: "bg-emerald-50 text-emerald-700 border border-emerald-200",
  Sale:     "bg-red-50 text-red-600 border border-red-200",
};

const PAYMENT_BADGE: Record<string, string> = {
  Cash:            "bg-amber-50 text-amber-700",
  "Bank Transfer": "bg-blue-50 text-blue-700",
  UPI:             "bg-purple-50 text-purple-700",
  Cheque:          "bg-zinc-100 text-zinc-700",
};

function TransactionHistoryTable({ rows }: { rows: SilverTransaction[] }) {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const totalPages = Math.max(1, Math.ceil(rows.length / pageSize));
  const paged = rows.slice((page - 1) * pageSize, page * pageSize);

  return (
    <div>
      <div className="bg-card border border-border rounded-2xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/30">
                {["Date", "Type", "Category", "Weight", "Purity", "Rate (₹/g)", "Amount", "Payment", "Vendor", "Description"].map((h) => (
                  <th key={h} className="px-5 py-3.5 text-left text-[11px] font-semibold text-muted-foreground uppercase tracking-wider whitespace-nowrap">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {paged.length === 0 ? (
                <tr>
                  <td colSpan={10} className="px-4 py-8 text-center text-muted-foreground text-sm">
                    No transactions found
                  </td>
                </tr>
              ) : (
                paged.map((row, i) => (
                  <tr
                    key={row.id}
                    className={`border-b border-border last:border-0 hover:bg-muted/20 transition-colors ${i % 2 === 0 ? "" : "bg-muted/10"}`}
                  >
                    <td className="px-5 py-3.5 whitespace-nowrap text-muted-foreground">{row.date}</td>
                    <td className="px-5 py-3.5 whitespace-nowrap">
                      <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${TYPE_BADGE[row.type]}`}>{row.type}</span>
                    </td>
                    <td className="px-5 py-3.5 whitespace-nowrap">
                      <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${CAT_BADGE[row.category]}`}>{row.category}</span>
                    </td>
                    <td className="px-5 py-3.5 whitespace-nowrap tabular-nums font-medium">{fmtW(row.weight)}</td>
                    <td className="px-5 py-3.5 whitespace-nowrap">
                      <span className="text-xs font-semibold bg-zinc-100 text-zinc-700 px-2 py-0.5 rounded">{row.purity}</span>
                    </td>
                    <td className="px-5 py-3.5 whitespace-nowrap tabular-nums text-muted-foreground">₹{row.rate.toLocaleString("en-IN")}</td>
                    <td className="px-5 py-3.5 whitespace-nowrap tabular-nums font-semibold text-foreground">{fmt(row.amount)}</td>
                    <td className="px-5 py-3.5 whitespace-nowrap">
                      <span className={`text-xs font-medium px-2 py-0.5 rounded ${PAYMENT_BADGE[row.paymentMode]}`}>{row.paymentMode}</span>
                    </td>
                    <td className="px-5 py-3.5 font-medium text-foreground whitespace-nowrap max-w-[140px] truncate">{row.vendor}</td>
                    <td className="px-5 py-3.5 text-muted-foreground max-w-[180px] truncate">{row.description}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      <Pagination page={page} totalPages={totalPages} onPageChange={setPage} totalItems={rows.length} pageSize={pageSize} onPageSizeChange={(s) => { setPageSize(s); setPage(1); }} itemLabel="transactions" />
    </div>
  );
}

export default function StockSummaryTab() {
  const { purePurchases, pureSales, pureStock, jewelryPurchases, jewelrySales, jewelryStock } = useMemo(() => {
    let purePurchases = 0, pureSales = 0;
    let jewelryPurchases = 0, jewelrySales = 0;

    for (const tx of mockSilverTransactions) {
      if (tx.type === "Pure Silver") {
        if (tx.category === "Purchase") purePurchases += tx.weight;
        else pureSales += tx.weight;
      } else {
        if (tx.category === "Purchase") jewelryPurchases += tx.weight;
        else jewelrySales += tx.weight;
      }
    }

    return {
      purePurchases,
      pureSales,
      pureStock: purePurchases - pureSales,
      jewelryPurchases,
      jewelrySales,
      jewelryStock: jewelryPurchases - jewelrySales,
    };
  }, []);

  return (
    <div className="space-y-6">
      {/* Metric cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <AnimatedMetricCard
          label="Pure Silver Stock"
          value={fmtW(pureStock)}
          sub={`↑ ${fmtW(purePurchases)} purchased · ↓ ${fmtW(pureSales)} sold`}
          icon={Gem}
          iconCls="text-slate-500"
          index={0}
        />
        <AnimatedMetricCard
          label="Silver Jewelry Stock"
          value={fmtW(jewelryStock)}
          sub={`↑ ${fmtW(jewelryPurchases)} purchased · ↓ ${fmtW(jewelrySales)} sold`}
          icon={Layers}
          iconCls="text-violet-500"
          index={1}
        />
      </div>

      {/* Transaction history */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.2, ease: "easeOut" }}
      >
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-sm font-semibold text-foreground">Transaction History</h2>
          <span className="text-xs text-muted-foreground">{mockSilverTransactions.length} entries</span>
        </div>
        <TransactionHistoryTable rows={mockSilverTransactions} />
      </motion.div>
    </div>
  );
}
