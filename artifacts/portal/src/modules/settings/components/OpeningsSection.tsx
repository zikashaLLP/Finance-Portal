/**
 * OpeningsSection — nested "Gold Opening Stock" / "Diamond Opening Stock" tables
 * inside the Jewellery Settings → Openings tab.
 */
import { useState } from "react";
import { Lock, CheckCircle2, Clock, Package, Gem } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  mockGoldOpenings,
  mockDiamondOpenings,
  mockGoldTypes,
  mockDiamondQualities,
  type GoldOpeningItem,
  type DiamondOpeningItem,
} from "../data/mockGeneralMasters";
import { OpeningStockModal, type OpeningStockForm } from "./OpeningStockModal";

// ── Helpers ───────────────────────────────────────────────────────────────────
function fmtGrams(g: number) { return g.toFixed(3) + " g"; }
function fmtCt(ct: number)   { return ct.toFixed(4) + " ct"; }
function fmtDate(s: string)  {
  return new Date(s).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });
}

// ── Summary bar ───────────────────────────────────────────────────────────────
function SummaryBar({ setCount, total, totalStock, unit, accent }: {
  setCount: number; total: number; totalStock: string; unit: string; accent: string;
}) {
  return (
    <div className="grid grid-cols-3 gap-3 mb-5">
      {[
        { label: "Total Entries",    value: String(total),        icon: <Package className="h-4 w-4" />,      bg: "bg-muted/40",       text: "text-foreground" },
        { label: "Opening Set",      value: String(setCount),     icon: <CheckCircle2 className="h-4 w-4" />, bg: `${accent}/10`,      text: accent.replace("/10","").replace("bg-","text-") },
        { label: `Total Stock (${unit})`, value: totalStock, icon: <Gem className="h-4 w-4" />,         bg: "bg-emerald-50",     text: "text-emerald-700" },
      ].map((c) => (
        <div key={c.label} className="bg-card border border-border rounded-xl p-3.5 flex items-center gap-3">
          <div className={`h-8 w-8 rounded-lg ${c.bg} flex items-center justify-center shrink-0 ${c.text}`}>
            {c.icon}
          </div>
          <div>
            <p className="text-[11px] text-muted-foreground font-medium">{c.label}</p>
            <p className="text-lg font-semibold text-foreground tabular-nums">{c.value}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

// ── Gold Opening table ─────────────────────────────────────────────────────────
function GoldOpeningTable() {
  const [rows, setRows]           = useState<GoldOpeningItem[]>(mockGoldOpenings);
  const [modalOpen, setModalOpen] = useState(false);
  const [target, setTarget]       = useState<GoldOpeningItem | null>(null);

  function openModal(row: GoldOpeningItem) { setTarget(row); setModalOpen(true); }
  function closeModal() { setModalOpen(false); setTarget(null); }

  function handleSave(form: OpeningStockForm) {
    if (!target) return;
    const today = new Date().toISOString().split("T")[0];
    setRows((prev) => prev.map((r) =>
      r.id === target.id
        ? { ...r, opening_stock_g: form.stock, opening_set: true, set_date: today, notes: form.notes }
        : r
    ));
    closeModal();
  }

  const goldType   = (id: string) => mockGoldTypes.find((g) => g.id === id);
  const setCount   = rows.filter((r) => r.opening_set).length;
  const totalStock = rows.reduce((s, r) => s + (r.opening_set ? r.opening_stock_g : 0), 0);

  return (
    <>
      <SummaryBar
        setCount={setCount}
        total={rows.length}
        totalStock={fmtGrams(totalStock)}
        unit="g"
        accent="bg-yellow-500"
      />

      <div className="bg-card border border-border rounded-2xl shadow-sm overflow-hidden">
        {/* Table header */}
        <div className="grid grid-cols-[2fr_1fr_1.5fr_1.5fr_1fr_auto] items-center gap-4 px-4 py-3 border-b border-border bg-muted/40">
          {["Gold Type", "Purity Type", "Opening Stock", "Set Date", "Status", "Action"].map((h) => (
            <span key={h} className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">{h}</span>
          ))}
        </div>

        {rows.map((row, i) => {
          const gt = goldType(row.gold_type_id);
          if (!gt) return null;
          const isPure = gt.purity_type === "Pure";

          return (
            <div
              key={row.id}
              className={cn(
                "grid grid-cols-[2fr_1fr_1.5fr_1.5fr_1fr_auto] items-center gap-4 px-4 py-3.5 border-b border-border last:border-0 hover:bg-muted/20 transition-colors",
                i % 2 !== 0 && "bg-muted/10",
              )}
            >
              {/* Gold Type */}
              <div>
                <p className="text-sm font-semibold text-foreground">{gt.type_name}</p>
                <p className="text-[11px] text-muted-foreground">
                  {gt.gold_purity_ids.length} purity grade{gt.gold_purity_ids.length > 1 ? "s" : ""}
                </p>
              </div>

              {/* Purity Type badge */}
              <span className={cn(
                "inline-flex items-center px-2 py-0.5 rounded-md text-[11px] font-semibold border w-fit",
                isPure
                  ? "bg-amber-50 text-amber-700 border-amber-200"
                  : "bg-slate-100 text-slate-600 border-slate-200",
              )}>
                {gt.purity_type}
              </span>

              {/* Opening Stock */}
              {row.opening_set ? (
                <div className="flex items-center gap-1.5">
                  <Lock className="h-3 w-3 text-muted-foreground shrink-0" />
                  <span className="font-mono text-sm font-semibold text-foreground tabular-nums">
                    {fmtGrams(row.opening_stock_g)}
                  </span>
                </div>
              ) : (
                <span className="text-sm text-muted-foreground">—</span>
              )}

              {/* Set Date */}
              {row.opening_set && row.set_date ? (
                <span className="text-xs text-muted-foreground">{fmtDate(row.set_date)}</span>
              ) : (
                <span className="text-xs text-muted-foreground">—</span>
              )}

              {/* Status */}
              {row.opening_set ? (
                <span className="inline-flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-700 border border-emerald-200 w-fit">
                  <CheckCircle2 className="h-3 w-3" /> Set
                </span>
              ) : (
                <span className="inline-flex items-center gap-1 text-[11px] font-medium px-2 py-0.5 rounded-md bg-orange-50 text-orange-600 border border-orange-200 w-fit">
                  <Clock className="h-3 w-3" /> Pending
                </span>
              )}

              {/* Action */}
              {!row.opening_set ? (
                <button
                  onClick={() => openModal(row)}
                  className="h-7 px-3 rounded-lg border border-yellow-300 bg-yellow-50 text-xs font-semibold text-yellow-800 hover:bg-yellow-100 hover:border-yellow-400 transition-colors whitespace-nowrap"
                >
                  Set Stock
                </button>
              ) : (
                <span className="h-7 w-7 flex items-center justify-center text-muted-foreground/40">
                  <Lock className="h-3.5 w-3.5" />
                </span>
              )}
            </div>
          );
        })}
      </div>

      {/* Modal */}
      {target && (() => {
        const gt = goldType(target.gold_type_id)!;
        return (
          <OpeningStockModal
            open={modalOpen}
            onClose={closeModal}
            onSave={handleSave}
            kind="gold"
            entityName={gt.type_name}
            badgeLabel={gt.purity_type}
            badgeCls={gt.purity_type === "Pure"
              ? "bg-amber-50 text-amber-700 border-amber-200"
              : "bg-slate-100 text-slate-600 border-slate-200"
            }
          />
        );
      })()}
    </>
  );
}

// ── Diamond Opening table ──────────────────────────────────────────────────────
function DiamondOpeningTable() {
  const [rows, setRows]           = useState<DiamondOpeningItem[]>(mockDiamondOpenings);
  const [modalOpen, setModalOpen] = useState(false);
  const [target, setTarget]       = useState<DiamondOpeningItem | null>(null);

  function openModal(row: DiamondOpeningItem) { setTarget(row); setModalOpen(true); }
  function closeModal() { setModalOpen(false); setTarget(null); }

  function handleSave(form: OpeningStockForm) {
    if (!target) return;
    const today = new Date().toISOString().split("T")[0];
    setRows((prev) => prev.map((r) =>
      r.id === target.id
        ? { ...r, opening_stock_ct: form.stock, opening_set: true, set_date: today, notes: form.notes }
        : r
    ));
    closeModal();
  }

  const quality    = (id: string) => mockDiamondQualities.find((q) => q.id === id);
  const setCount   = rows.filter((r) => r.opening_set).length;
  const totalStock = rows.reduce((s, r) => s + (r.opening_set ? r.opening_stock_ct : 0), 0);

  const typeCls = (type: string) =>
    type === "Solitaire"
      ? "bg-violet-50 text-violet-700 border-violet-200"
      : "bg-amber-50 text-amber-700 border-amber-200";

  return (
    <>
      <SummaryBar
        setCount={setCount}
        total={rows.length}
        totalStock={fmtCt(totalStock)}
        unit="ct"
        accent="bg-sky-500"
      />

      <div className="bg-card border border-border rounded-2xl shadow-sm overflow-hidden">
        {/* Table header */}
        <div className="grid grid-cols-[1.5fr_1fr_1fr_1.5fr_1.5fr_1fr_auto] items-center gap-4 px-4 py-3 border-b border-border bg-muted/40">
          {["Quality", "Type", "Description", "Opening Stock", "Set Date", "Status", "Action"].map((h) => (
            <span key={h} className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">{h}</span>
          ))}
        </div>

        {rows.map((row, i) => {
          const q = quality(row.quality_id);
          if (!q) return null;

          return (
            <div
              key={row.id}
              className={cn(
                "grid grid-cols-[1.5fr_1fr_1fr_1.5fr_1.5fr_1fr_auto] items-center gap-4 px-4 py-3.5 border-b border-border last:border-0 hover:bg-muted/20 transition-colors",
                i % 2 !== 0 && "bg-muted/10",
              )}
            >
              {/* Quality name */}
              <span className="font-mono text-sm font-bold text-foreground">{q.quality_name}</span>

              {/* Type badge */}
              <span className={`inline-flex items-center px-2 py-0.5 rounded-md text-[11px] font-semibold border w-fit ${typeCls(q.type)}`}>
                {q.type}
              </span>

              {/* Description */}
              <span className="text-xs text-muted-foreground truncate">{q.description || "—"}</span>

              {/* Opening Stock */}
              {row.opening_set ? (
                <div className="flex items-center gap-1.5">
                  <Lock className="h-3 w-3 text-muted-foreground shrink-0" />
                  <span className="font-mono text-sm font-semibold text-foreground tabular-nums">
                    {fmtCt(row.opening_stock_ct)}
                  </span>
                </div>
              ) : (
                <span className="text-sm text-muted-foreground">—</span>
              )}

              {/* Set Date */}
              {row.opening_set && row.set_date ? (
                <span className="text-xs text-muted-foreground">{fmtDate(row.set_date)}</span>
              ) : (
                <span className="text-xs text-muted-foreground">—</span>
              )}

              {/* Status */}
              {row.opening_set ? (
                <span className="inline-flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-700 border border-emerald-200 w-fit">
                  <CheckCircle2 className="h-3 w-3" /> Set
                </span>
              ) : (
                <span className="inline-flex items-center gap-1 text-[11px] font-medium px-2 py-0.5 rounded-md bg-orange-50 text-orange-600 border border-orange-200 w-fit">
                  <Clock className="h-3 w-3" /> Pending
                </span>
              )}

              {/* Action */}
              {!row.opening_set ? (
                <button
                  onClick={() => openModal(row)}
                  className="h-7 px-3 rounded-lg border border-sky-200 bg-sky-50 text-xs font-semibold text-sky-800 hover:bg-sky-100 hover:border-sky-300 transition-colors whitespace-nowrap"
                >
                  Set Stock
                </button>
              ) : (
                <span className="h-7 w-7 flex items-center justify-center text-muted-foreground/40">
                  <Lock className="h-3.5 w-3.5" />
                </span>
              )}
            </div>
          );
        })}
      </div>

      {/* Modal */}
      {target && (() => {
        const q = quality(target.quality_id)!;
        return (
          <OpeningStockModal
            open={modalOpen}
            onClose={closeModal}
            onSave={handleSave}
            kind="diamond"
            entityName={q.quality_name}
            badgeLabel={q.type}
            badgeCls={typeCls(q.type)}
          />
        );
      })()}
    </>
  );
}

// ── Main export ───────────────────────────────────────────────────────────────
type OpeningInnerTab = "gold" | "diamond";

export function OpeningsSection() {
  const [inner, setInner] = useState<OpeningInnerTab>("gold");

  const TABS: { id: OpeningInnerTab; label: string }[] = [
    { id: "gold",    label: "Gold Opening Stock"    },
    { id: "diamond", label: "Diamond Opening Stock" },
  ];

  return (
    <div className="space-y-5">
      {/* Inner tab bar */}
      <div className="flex items-center gap-1 border-b border-border">
        {TABS.map((t) => (
          <button
            key={t.id}
            onClick={() => setInner(t.id)}
            className={cn(
              "px-4 py-2 text-sm font-medium border-b-2 -mb-px transition-colors whitespace-nowrap",
              inner === t.id
                ? t.id === "gold"
                    ? "border-yellow-500 text-yellow-700"
                    : "border-sky-500 text-sky-700"
                : "border-transparent text-muted-foreground hover:text-foreground",
            )}
          >
            {t.label}
          </button>
        ))}
      </div>

      {inner === "gold"    && <GoldOpeningTable    />}
      {inner === "diamond" && <DiamondOpeningTable />}
    </div>
  );
}
