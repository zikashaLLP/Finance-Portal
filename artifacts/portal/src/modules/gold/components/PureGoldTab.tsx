import { useState } from "react";
import { motion } from "framer-motion";
import { Gem, Coins, CircleDot, Pencil, Trash2 } from "lucide-react";
import {
  mockGoldTransactions,
  mockGoldDailyBalance,
  GoldTransaction,
  GoldDailyBalance,
} from "../data/mockPureGold";

type SubTab = "transactions" | "daily";

const fmt = (n: number) =>
  new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(n);

const fmtW = (n: number) => `${n.toFixed(2)} g`;

const TYPE_BADGE: Record<string, string> = {
  "Pure Gold": "bg-amber-50 text-amber-700 border border-amber-200",
  "Old Gold":  "bg-orange-50 text-orange-700 border border-orange-200",
  "Coins":     "bg-yellow-50 text-yellow-700 border border-yellow-200",
};

const CAT_BADGE: Record<string, string> = {
  Purchase: "bg-emerald-50 text-emerald-700 border border-emerald-200",
  Sale:     "bg-red-50 text-red-600 border border-red-200",
};

function MetricCard({
  title, value, sub, icon, accent, index,
}: {
  title: string; value: string; sub: string;
  icon: React.ReactNode; accent: string; index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: index * 0.08, ease: "easeOut" }}
      className="bg-card border border-border rounded-[18px] p-6 shadow-sm hover:shadow-md transition-shadow"
    >
      <div className="mb-4">
        <div className={`p-2.5 rounded-full inline-flex items-center justify-center`} style={{ backgroundColor: accent + "20", color: accent }}>
          {icon}
        </div>
      </div>
      <p className="text-[13px] font-medium text-muted-foreground mb-1">{title}</p>
      <h3 className="text-[28px] font-semibold text-foreground tracking-tight mb-1">{value}</h3>
      <span className="text-xs font-medium px-2 py-0.5 rounded-full" style={{ backgroundColor: accent + "15", color: accent }}>{sub}</span>
    </motion.div>
  );
}

function TransactionsTable({ rows }: { rows: GoldTransaction[] }) {
  return (
    <div className="bg-card border border-border rounded-2xl shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border bg-muted/40">
              {["Date", "Type", "Category", "Name", "Weight", "Purity", "Rate (₹/g)", "Amount", "Description", "Actions"].map((h) => (
                <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider whitespace-nowrap">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => (
              <tr
                key={row.id}
                className={`border-b border-border last:border-0 hover:bg-muted/20 transition-colors ${i % 2 === 0 ? "" : "bg-muted/10"}`}
              >
                <td className="px-4 py-3 whitespace-nowrap text-muted-foreground">{row.date}</td>
                <td className="px-4 py-3 whitespace-nowrap">
                  <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${TYPE_BADGE[row.type]}`}>{row.type}</span>
                </td>
                <td className="px-4 py-3 whitespace-nowrap">
                  <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${CAT_BADGE[row.category]}`}>{row.category}</span>
                </td>
                <td className="px-4 py-3 font-medium text-foreground whitespace-nowrap">{row.name}</td>
                <td className="px-4 py-3 whitespace-nowrap tabular-nums">{fmtW(row.weight)}</td>
                <td className="px-4 py-3 whitespace-nowrap">
                  <span className="text-xs font-semibold bg-zinc-100 text-zinc-700 px-2 py-0.5 rounded">{row.purity}</span>
                </td>
                <td className="px-4 py-3 whitespace-nowrap tabular-nums text-muted-foreground">₹{row.rate.toLocaleString("en-IN")}</td>
                <td className="px-4 py-3 whitespace-nowrap tabular-nums font-semibold text-foreground">{fmt(row.amount)}</td>
                <td className="px-4 py-3 text-muted-foreground max-w-[180px] truncate">{row.description}</td>
                <td className="px-4 py-3 whitespace-nowrap">
                  <div className="flex items-center gap-1.5">
                    <button className="h-7 w-7 flex items-center justify-center rounded-md border border-border text-muted-foreground hover:text-foreground hover:bg-muted transition-colors">
                      <Pencil className="h-3.5 w-3.5" />
                    </button>
                    <button className="h-7 w-7 flex items-center justify-center rounded-md border border-red-200 text-red-400 hover:text-red-600 hover:bg-red-50 transition-colors">
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function DailyBalanceTable({ rows }: { rows: GoldDailyBalance[] }) {
  return (
    <div className="bg-card border border-border rounded-2xl shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border bg-muted/40">
              {["Date", "Type", "Opening Weight", "Purchases", "Sales", "Issues", "Closing Weight"].map((h) => (
                <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider whitespace-nowrap">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => (
              <tr
                key={row.id}
                className={`border-b border-border last:border-0 hover:bg-muted/20 transition-colors ${i % 2 === 0 ? "" : "bg-muted/10"}`}
              >
                <td className="px-4 py-3 whitespace-nowrap text-muted-foreground">{row.date}</td>
                <td className="px-4 py-3 whitespace-nowrap">
                  <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${TYPE_BADGE[row.type]}`}>{row.type}</span>
                </td>
                <td className="px-4 py-3 whitespace-nowrap tabular-nums font-medium text-foreground">{fmtW(row.openingWeight)}</td>
                <td className="px-4 py-3 whitespace-nowrap tabular-nums text-emerald-600 font-medium">
                  {row.purchases > 0 ? `+${fmtW(row.purchases)}` : "—"}
                </td>
                <td className="px-4 py-3 whitespace-nowrap tabular-nums text-red-500 font-medium">
                  {row.sales > 0 ? `-${fmtW(row.sales)}` : "—"}
                </td>
                <td className="px-4 py-3 whitespace-nowrap tabular-nums text-orange-500 font-medium">
                  {row.issues > 0 ? `-${fmtW(row.issues)}` : "—"}
                </td>
                <td className="px-4 py-3 whitespace-nowrap tabular-nums font-semibold text-foreground">{fmtW(row.closingWeight)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default function PureGoldTab() {
  const [subTab, setSubTab] = useState<SubTab>("transactions");

  const pureStock = mockGoldDailyBalance.find((r) => r.date === "2026-06-25" && r.type === "Pure Gold");
  const oldStock  = mockGoldDailyBalance.find((r) => r.date === "2026-06-25" && r.type === "Old Gold");
  const coinStock = mockGoldDailyBalance.find((r) => r.date === "2026-06-25" && r.type === "Coins");

  const metrics = [
    {
      title: "Pure Gold Stock",
      value: fmtW(pureStock?.closingWeight ?? 0),
      sub: "24K refined",
      icon: <Gem className="h-4 w-4" />,
      accent: "#D97706",
    },
    {
      title: "Old Gold Stock",
      value: fmtW(oldStock?.closingWeight ?? 0),
      sub: "Mixed purity",
      icon: <CircleDot className="h-4 w-4" />,
      accent: "#EA580C",
    },
    {
      title: "Gold Coins",
      value: fmtW(coinStock?.closingWeight ?? 0),
      sub: "24K minted",
      icon: <Coins className="h-4 w-4" />,
      accent: "#CA8A04",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {metrics.map((m, i) => (
          <MetricCard key={m.title} {...m} index={i} />
        ))}
      </div>

      {/* Sub-tab bar */}
      <div className="flex items-center gap-0 border-b border-border">
        {(["transactions", "daily"] as SubTab[]).map((t) => (
          <button
            key={t}
            onClick={() => setSubTab(t)}
            className={`px-5 py-2.5 text-sm font-medium border-b-2 -mb-px transition-colors ${
              subTab === t
                ? "border-foreground text-foreground"
                : "border-transparent text-muted-foreground hover:text-foreground"
            }`}
          >
            {t === "transactions" ? "Transactions" : "Daily Balance"}
          </button>
        ))}
      </div>

      {/* Table */}
      {subTab === "transactions" && <TransactionsTable rows={mockGoldTransactions} />}
      {subTab === "daily"        && <DailyBalanceTable rows={mockGoldDailyBalance} />}
    </div>
  );
}
