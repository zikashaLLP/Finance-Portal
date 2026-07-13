import { useState } from "react";
import { ChevronDown, Phone } from "lucide-react";
import { cn } from "@/lib/utils";
import type { LedgerParty } from "../data/mockLedger";

const fmtAmt = (n: number) =>
  new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(n);

const fmtG = (g: number) => (g > 0 ? `${g.toFixed(2)}g` : "—");

const TAG_STYLES: Record<string, string> = {
  supplier: "bg-blue-50 text-blue-700 border border-blue-200",
  client:   "bg-emerald-50 text-emerald-700 border border-emerald-200",
  karigar:  "bg-violet-50 text-violet-700 border border-violet-200",
  goldsmith:"bg-amber-50 text-amber-700 border border-amber-200",
};

interface Props {
  party: LedgerParty;
}

export default function PartyCard({ party }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <div className="bg-white rounded-2xl border border-border shadow-[0_1px_4px_rgba(0,0,0,0.04)] overflow-hidden">
      {/* ── Collapsed header (always visible) ── */}
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-full text-left px-5 py-4 flex items-center gap-4 hover:bg-zinc-50/60 transition-colors"
      >
        {/* Avatar */}
        <div className="h-10 w-10 rounded-xl bg-zinc-100 flex items-center justify-center shrink-0 text-sm font-semibold text-zinc-600">
          {party.name.charAt(0).toUpperCase()}
        </div>

        {/* Name + tags */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap mb-1">
            <span className="font-semibold text-[15px] text-foreground truncate">{party.name}</span>
            {party.tags.map((t) => (
              <span key={t} className={cn("text-[11px] font-medium px-2 py-0.5 rounded-full capitalize", TAG_STYLES[t])}>
                {t}
              </span>
            ))}
          </div>
          <div className="flex items-center gap-1 text-[12px] text-muted-foreground">
            <Phone className="h-3 w-3" />
            {party.phone}
            <span className="mx-1.5 text-border">·</span>
            <span>{party.transactionCount} transactions</span>
          </div>
        </div>

        {/* Balance chip */}
        <div className="shrink-0 text-right mr-2">
          {party.balanceAmount > 0 && (
            <div className="inline-flex flex-col items-end bg-amber-50 border border-amber-200 rounded-xl px-3 py-1.5">
              <span className="text-[10px] font-medium text-amber-600 uppercase tracking-wide leading-none mb-0.5">Balance</span>
              <span className="text-sm font-bold text-amber-700">{fmtAmt(party.balanceAmount)}</span>
              {party.balanceGrams > 0 && (
                <span className="text-[11px] text-amber-600">{fmtG(party.balanceGrams)}</span>
              )}
            </div>
          )}
          {party.balanceAmount === 0 && party.balanceGrams > 0 && (
            <div className="inline-flex flex-col items-end bg-amber-50 border border-amber-200 rounded-xl px-3 py-1.5">
              <span className="text-[10px] font-medium text-amber-600 uppercase tracking-wide leading-none mb-0.5">Balance</span>
              <span className="text-sm font-bold text-amber-700">{fmtG(party.balanceGrams)}</span>
            </div>
          )}
        </div>

        {/* Chevron */}
        <ChevronDown className={cn("h-4 w-4 text-muted-foreground shrink-0 transition-transform duration-200", open && "rotate-180")} />
      </button>

      {/* ── Expanded content ── */}
      <div className={cn("overflow-hidden transition-all duration-300 ease-in-out", open ? "max-h-[800px]" : "max-h-0")}>
        <div className="border-t border-border">
          {/* Two-column transaction grid */}
          <div className="grid grid-cols-2 divide-x divide-border">
            {/* ── LEFT: PURCHASE ── */}
            <div>
              <div className="bg-emerald-50 px-4 py-2 border-b border-emerald-100">
                <span className="text-[11px] font-bold text-emerald-700 uppercase tracking-wider">Purchase</span>
              </div>
              <div className="divide-y divide-border/60">
                {party.purchaseEntries.map((entry) => (
                  <div key={entry.id} className="px-4 py-2.5 flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <div className="text-[11px] text-muted-foreground mb-0.5">{entry.date}</div>
                      <div className="text-[13px] text-foreground leading-snug">{entry.description}</div>
                    </div>
                    <div className="text-right shrink-0">
                      {entry.grams > 0 && (
                        <div className="text-[11px] text-emerald-700 font-medium">{fmtG(entry.grams)}</div>
                      )}
                      <div className="text-[13px] font-semibold text-foreground">{fmtAmt(entry.amount)}</div>
                    </div>
                  </div>
                ))}
              </div>
              {/* Column total */}
              <div className="bg-emerald-50/70 px-4 py-2 border-t border-emerald-100 flex items-center justify-between">
                <span className="text-[11px] font-semibold text-emerald-700 uppercase tracking-wide">Purchase / To Give</span>
                <div className="text-right">
                  {party.purchaseTotal.grams > 0 && (
                    <div className="text-[11px] text-emerald-700 font-medium">{fmtG(party.purchaseTotal.grams)}</div>
                  )}
                  <div className="text-[13px] font-bold text-emerald-800">{fmtAmt(party.purchaseTotal.amount)}</div>
                </div>
              </div>
            </div>

            {/* ── RIGHT: TO GIVE / PAID ── */}
            <div>
              <div className="bg-red-50 px-4 py-2 border-b border-red-100">
                <span className="text-[11px] font-bold text-red-600 uppercase tracking-wider">Purchase to Give</span>
              </div>
              <div className="divide-y divide-border/60">
                {party.toGiveEntries.map((entry) => (
                  <div key={entry.id} className="px-4 py-2.5 flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <div className="text-[11px] text-muted-foreground mb-0.5">{entry.date}</div>
                      <div className="text-[13px] text-foreground leading-snug">{entry.description}</div>
                    </div>
                    <div className="text-right shrink-0">
                      {entry.grams > 0 && (
                        <div className="text-[11px] text-red-600 font-medium">{fmtG(entry.grams)}</div>
                      )}
                      <div className="text-[13px] font-semibold text-foreground">{fmtAmt(entry.amount)}</div>
                    </div>
                  </div>
                ))}
              </div>
              {/* Column total */}
              <div className="bg-red-50/70 px-4 py-2 border-t border-red-100 flex items-center justify-between">
                <span className="text-[11px] font-semibold text-red-600 uppercase tracking-wide">Paid / To Receive</span>
                <div className="text-right">
                  {party.toGiveTotal.grams > 0 && (
                    <div className="text-[11px] text-red-600 font-medium">{fmtG(party.toGiveTotal.grams)}</div>
                  )}
                  <div className="text-[13px] font-bold text-red-700">{fmtAmt(party.toGiveTotal.amount)}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
