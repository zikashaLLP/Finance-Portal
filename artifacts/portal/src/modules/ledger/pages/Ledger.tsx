import { useState, useMemo } from "react";
import { Search, Wallet, ArrowDownLeft, ArrowUpRight, Bell } from "lucide-react";
import { cn } from "@/lib/utils";
import AnimatedMetricCard from "@/shared/components/AnimatedMetricCard";
import Pagination from "@/shared/components/Pagination";
import PartyCard from "../components/PartyCard";
import { getFilteredParties, getSummary, type LedgerFilter } from "../data/mockLedger";

type Tab = "all" | "supplier" | "client" | "karigar";

const TABS: { key: Tab; label: string }[] = [
  { key: "all",      label: "All Parties" },
  { key: "supplier", label: "Suppliers"   },
  { key: "client",   label: "Clients"     },
  { key: "karigar",  label: "Karigar"     },
];

const PAGE_SIZE = 5;

const fmtAmt = (n: number) =>
  new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(n);

const fmtG = (g: number) => (g > 0 ? `${g.toFixed(2)} g` : "—");

export default function Ledger() {
  const [tab, setTab]       = useState<Tab>("all");
  const [search, setSearch] = useState("");
  const [page, setPage]     = useState(1);

  const filtered = useMemo(() => {
    const byTab = getFilteredParties(tab as LedgerFilter);
    if (!search.trim()) return byTab;
    const q = search.toLowerCase();
    return byTab.filter((p) => p.name.toLowerCase().includes(q) || p.phone.includes(q));
  }, [tab, search]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const paginated  = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const summary = useMemo(() => getSummary(filtered), [filtered]);

  function handleTabChange(t: Tab) {
    setTab(t);
    setPage(1);
    setSearch("");
  }

  return (
    <div className="w-full flex flex-col h-full">
      {/* ── Header ── */}
      <div className="px-8 pt-6 pb-5 border-b border-border flex items-center justify-between shrink-0">
        <div>
          <h1 className="text-2xl font-semibold text-foreground tracking-tight mb-0.5">Ledger</h1>
          <p className="text-sm text-muted-foreground">Party-wise balances, purchases &amp; settlements</p>
        </div>

        {/* Segmented tab control — mirrors Gold Management */}
        <div className="flex items-center gap-1 bg-zinc-200 rounded-xl p-1">
          {TABS.map((t) => (
            <button
              key={t.key}
              onClick={() => handleTabChange(t.key)}
              className={cn(
                "px-5 py-1.5 text-sm font-medium rounded-lg transition-all duration-200",
                tab === t.key
                  ? "bg-white text-foreground shadow-sm"
                  : "text-zinc-500 hover:text-foreground",
              )}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2.5 shrink-0">
          <button className="relative h-9 w-9 flex items-center justify-center rounded-full border border-border bg-background text-muted-foreground hover:text-foreground transition-colors shadow-sm">
            <Bell className="h-4 w-4" />
            <span className="absolute top-2 right-2.5 flex h-2 w-2 rounded-full bg-red-500 ring-2 ring-background" />
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto no-scrollbar px-8 py-6 space-y-6">

        {/* ── Summary metric cards ── */}
        <div className="grid grid-cols-3 gap-4">
          <AnimatedMetricCard label="Cash to Give"      value={fmtAmt(summary.cashToGive)}              sub="Outstanding cash"                     icon={Wallet}       iconCls="text-amber-600"   index={0} />
          <AnimatedMetricCard label="Purchase / To Give" value={fmtAmt(summary.purchaseToGiveAmount)}  sub={fmtG(summary.purchaseToGiveGrams)}    icon={ArrowDownLeft} iconCls="text-emerald-600" index={1} />
          <AnimatedMetricCard label="Paid / To Receive"  value={fmtAmt(summary.paidToReceiveAmount)}   sub={fmtG(summary.paidToReceiveGrams)}     icon={ArrowUpRight}  iconCls="text-red-500"     index={2} />
        </div>

        {/* ── Search ── */}
        <div className="relative">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search party name or phone…"
            value={search}
            onChange={(e) => { setSearch(e.target.value); setPage(1); }}
            className="w-full h-10 pl-10 pr-4 rounded-xl border border-border bg-white text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-foreground/10 transition"
          />
        </div>

        {/* ── Party count ── */}
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            {filtered.length === 0
              ? "No parties found"
              : `${filtered.length} ${filtered.length === 1 ? "party" : "parties"}`
            }
          </p>
        </div>

        {/* ── Party cards ── */}
        {paginated.length === 0 ? (
          <div className="h-48 flex items-center justify-center rounded-2xl border border-dashed border-border text-muted-foreground text-sm">
            No parties match your search.
          </div>
        ) : (
          <div className="space-y-3">
            {paginated.map((party) => (
              <PartyCard key={party.id} party={party} />
            ))}
          </div>
        )}

        <Pagination page={page} totalPages={totalPages} onPageChange={setPage} totalItems={filtered.length} pageSize={PAGE_SIZE} itemLabel="parties" />

      </div>
    </div>
  );
}
