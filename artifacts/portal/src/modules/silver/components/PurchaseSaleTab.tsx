import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Medal } from "lucide-react";
import { AppModal } from "@/shared/components/AppModal";
import Pagination from "@/shared/components/Pagination";
import { mockSilverTransactions, SilverTransaction, SilverType, SilverCategory, PaymentMode } from "../data/mockSilver";

const PAGE_SIZE = 10;

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

interface FormState {
  type: SilverType;
  category: SilverCategory;
  weight: string;
  purity: string;
  rate: string;
  paymentMode: PaymentMode;
  vendor: string;
  description: string;
}

const EMPTY_FORM: FormState = {
  type: "Pure Silver",
  category: "Purchase",
  weight: "",
  purity: "999",
  rate: "",
  paymentMode: "Bank Transfer",
  vendor: "",
  description: "",
};

function TransactionHistoryTable({ rows }: { rows: SilverTransaction[] }) {
  const [page, setPage] = useState(1);
  const totalPages = Math.max(1, Math.ceil(rows.length / PAGE_SIZE));
  const paged = rows.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

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

      <Pagination page={page} totalPages={totalPages} onPageChange={setPage} totalItems={rows.length} pageSize={PAGE_SIZE} itemLabel="transactions" />
    </div>
  );
}

interface PurchaseSaleTabProps {
  modalOpen: boolean;
  onModalClose: () => void;
}

export default function PurchaseSaleTab({ modalOpen, onModalClose }: PurchaseSaleTabProps) {
  const [form, setForm] = useState<FormState>(EMPTY_FORM);
  const [transactions, setTransactions] = useState<SilverTransaction[]>(mockSilverTransactions);

  const computedAmount = useMemo(() => {
    const w = parseFloat(form.weight);
    const r = parseFloat(form.rate);
    if (!isNaN(w) && !isNaN(r) && w > 0 && r > 0) return w * r;
    return null;
  }, [form.weight, form.rate]);

  function handleAdd() {
    const w = parseFloat(form.weight);
    const r = parseFloat(form.rate);
    if (isNaN(w) || isNaN(r) || w <= 0 || r <= 0 || !form.vendor.trim()) return;

    const newTx: SilverTransaction = {
      id: `st-${Date.now()}`,
      date: new Date().toISOString().slice(0, 10),
      type: form.type,
      category: form.category,
      weight: w,
      purity: form.purity,
      rate: r,
      amount: w * r,
      paymentMode: form.paymentMode,
      vendor: form.vendor.trim(),
      description: form.description.trim(),
    };

    setTransactions((prev) => [newTx, ...prev]);
    setForm(EMPTY_FORM);
    onModalClose();
  }

  function handleClose() {
    setForm(EMPTY_FORM);
    onModalClose();
  }

  const inputCls = "w-full h-9 px-3 text-sm border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-ring/40 transition-shadow";
  const selectCls = `${inputCls} cursor-pointer`;
  const labelCls = "block text-xs font-medium text-muted-foreground mb-1.5";

  return (
    <>
      {/* New Transaction Modal */}
      <AppModal
        open={modalOpen}
        onClose={handleClose}
        maxWidth="sm:max-w-[680px]"
        headerBg="bg-slate-50"
        icon={
          <div className="h-8 w-8 rounded-lg bg-slate-100 flex items-center justify-center">
            <Medal className="h-4 w-4 text-slate-600" />
          </div>
        }
        title="New Silver Transaction"
        subtitle="Fill in the details below to record a purchase or sale"
        primaryLabel="Save Transaction"
        onPrimary={handleAdd}
        onClose={handleClose}
      >
        <div className="px-6 pt-4 pb-5">
          <div className="grid grid-cols-2 gap-4">
            {/* Type */}
            <div>
              <label className={labelCls}>Type</label>
              <select
                className={selectCls}
                value={form.type}
                onChange={(e) => setForm((f) => ({ ...f, type: e.target.value as SilverType }))}
              >
                <option>Pure Silver</option>
                <option>Silver Jewelry</option>
              </select>
            </div>

            {/* Category */}
            <div>
              <label className={labelCls}>Category</label>
              <select
                className={selectCls}
                value={form.category}
                onChange={(e) => setForm((f) => ({ ...f, category: e.target.value as SilverCategory }))}
              >
                <option>Purchase</option>
                <option>Sale</option>
              </select>
            </div>

            {/* Weight */}
            <div>
              <label className={labelCls}>Weight (g)</label>
              <input
                type="number"
                min="0"
                step="0.01"
                placeholder="0.00"
                className={inputCls}
                value={form.weight}
                onChange={(e) => setForm((f) => ({ ...f, weight: e.target.value }))}
              />
            </div>

            {/* Purity */}
            <div>
              <label className={labelCls}>Purity</label>
              <select
                className={selectCls}
                value={form.purity}
                onChange={(e) => setForm((f) => ({ ...f, purity: e.target.value }))}
              >
                <option value="999">999 (Fine Silver)</option>
                <option value="925">925 (Sterling)</option>
                <option value="900">900</option>
                <option value="800">800</option>
              </select>
            </div>

            {/* Rate */}
            <div>
              <label className={labelCls}>Rate (₹/gram)</label>
              <input
                type="number"
                min="0"
                step="0.01"
                placeholder="0.00"
                className={inputCls}
                value={form.rate}
                onChange={(e) => setForm((f) => ({ ...f, rate: e.target.value }))}
              />
            </div>

            {/* Amount (auto-calculated) */}
            <div>
              <label className={labelCls}>Amount (₹)</label>
              <div className="h-9 px-3 flex items-center bg-muted/40 border border-border rounded-lg text-sm tabular-nums text-foreground font-medium">
                {computedAmount !== null
                  ? new Intl.NumberFormat("en-IN").format(computedAmount)
                  : <span className="text-muted-foreground">Auto-calculated</span>}
              </div>
            </div>

            {/* Payment Mode */}
            <div>
              <label className={labelCls}>Payment Mode</label>
              <select
                className={selectCls}
                value={form.paymentMode}
                onChange={(e) => setForm((f) => ({ ...f, paymentMode: e.target.value as PaymentMode }))}
              >
                <option>Bank Transfer</option>
                <option>Cash</option>
                <option>UPI</option>
                <option>Cheque</option>
              </select>
            </div>

            {/* Vendor */}
            <div>
              <label className={labelCls}>Purchase From / Vendor</label>
              <input
                type="text"
                placeholder="Vendor or customer name"
                className={inputCls}
                value={form.vendor}
                onChange={(e) => setForm((f) => ({ ...f, vendor: e.target.value }))}
              />
            </div>

            {/* Description — full width */}
            <div className="col-span-2">
              <label className={labelCls}>Description</label>
              <input
                type="text"
                placeholder="Optional note…"
                className={inputCls}
                value={form.description}
                onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
              />
            </div>
          </div>
        </div>
      </AppModal>

      {/* Transaction history */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      >
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-sm font-semibold text-foreground">Transaction History</h2>
          <span className="text-xs text-muted-foreground">{transactions.length} entries</span>
        </div>
        <TransactionHistoryTable rows={transactions} />
      </motion.div>
    </>
  );
}
