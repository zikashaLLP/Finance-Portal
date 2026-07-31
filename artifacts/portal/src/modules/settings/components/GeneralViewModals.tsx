/**
 * View modals for Jewellery Settings sub-tables:
 * CategoryViewModal, JewelleryTypeViewModal, GoldPurityViewModal, DiamondFilterViewModal
 */
import { X } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import {
  type JewelleryCategory,
  type JewelleryTypeItem,
  type GoldPurityItem,
  type DiamondFilterItem,
} from "../data/mockGeneralMasters";

// ── Shared primitives ──────────────────────────────────────────────────────────
function ModalShell({
  open, onClose, headerBg, iconBg, icon, title, subtitle, badge, children,
}: {
  open: boolean; onClose: () => void;
  headerBg: string; iconBg: string; icon: string;
  title: string; subtitle?: string;
  badge?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <Dialog open={open} onOpenChange={(v) => { if (!v) onClose(); }}>
      <DialogContent className="p-0 gap-0 !rounded-[15px] overflow-hidden border-0 shadow-2xl [&>button]:hidden sm:max-w-[480px]">
        <div className={`${headerBg} px-6 pt-5 pb-4`}>
          <DialogHeader>
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className={`h-9 w-9 rounded-full ${iconBg} flex items-center justify-center shrink-0 text-lg`}>
                  {icon}
                </div>
                <div>
                  <DialogTitle className="text-[15px] font-semibold leading-tight text-foreground">{title}</DialogTitle>
                  {(subtitle || badge) && (
                    <div className="flex items-center gap-2 mt-1">
                      {subtitle && <span className="text-[11px] font-mono text-muted-foreground">{subtitle}</span>}
                      {badge}
                    </div>
                  )}
                </div>
              </div>
              <button onClick={onClose} className="h-7 w-7 rounded-full flex items-center justify-center text-muted-foreground hover:bg-black/10 transition-colors mt-0.5 shrink-0">
                <X className="h-4 w-4" />
              </button>
            </div>
          </DialogHeader>
        </div>
        <div className="px-6 py-5 space-y-4">{children}</div>
        <div className="px-6 py-4 border-t border-border flex justify-end bg-background">
          <button onClick={onClose} className="h-9 px-5 rounded-[10px] text-sm font-medium bg-foreground text-background hover:bg-foreground/90 transition-colors">
            Close
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

function Row({ label, value, mono }: { label: string; value: string; mono?: boolean }) {
  return (
    <div>
      <p className="text-[11px] font-medium text-muted-foreground uppercase tracking-wide mb-0.5">{label}</p>
      <p className={cn("text-sm text-foreground font-medium break-words", mono && "font-mono text-xs")}>{value || "—"}</p>
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  return (
    <span className={cn(
      "inline-flex items-center px-2 py-0.5 rounded-md text-[11px] font-semibold",
      status === "Active"
        ? "bg-emerald-100 text-emerald-700 border border-emerald-200"
        : "bg-muted text-muted-foreground border border-border",
    )}>{status}</span>
  );
}

function fmtDate(s: string) {
  return new Date(s).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });
}

// ── Category View Modal ────────────────────────────────────────────────────────
export function CategoryViewModal({ open, onClose, item }: { open: boolean; onClose: () => void; item: JewelleryCategory | null }) {
  if (!item) return null;
  return (
    <ModalShell open={open} onClose={onClose} headerBg="bg-violet-50" iconBg="bg-violet-600"
      icon="💎" title={item.name} subtitle={item.code} badge={<StatusBadge status={item.status} />}>
      <Row label="Description" value={item.description} />
      <div className="border-t border-border" />
      <div className="grid grid-cols-2 gap-4">
        <Row label="Created" value={fmtDate(item.created_at)} />
        <Row label="Updated" value={fmtDate(item.updated_at)} />
      </div>
    </ModalShell>
  );
}

// ── Jewellery Type View Modal ──────────────────────────────────────────────────
export function JewelleryTypeViewModal({
  open, onClose, item, categoryName,
}: { open: boolean; onClose: () => void; item: JewelleryTypeItem | null; categoryName: string }) {
  if (!item) return null;
  return (
    <ModalShell open={open} onClose={onClose} headerBg="bg-violet-50" iconBg="bg-violet-600"
      icon="📿" title={item.name} subtitle={item.code} badge={<StatusBadge status={item.status} />}>
      <Row label="Category" value={categoryName} />
      <Row label="Description" value={item.description} />
      <div className="border-t border-border" />
      <div className="grid grid-cols-2 gap-4">
        <Row label="Created" value={fmtDate(item.created_at)} />
        <Row label="Updated" value={fmtDate(item.updated_at)} />
      </div>
    </ModalShell>
  );
}

// ── Gold Purity View Modal ─────────────────────────────────────────────────────
export function GoldPurityViewModal({ open, onClose, item }: { open: boolean; onClose: () => void; item: GoldPurityItem | null }) {
  if (!item) return null;
  const rate = "₹" + item.rate_per_gram.toLocaleString("en-IN") + " / g";
  return (
    <ModalShell open={open} onClose={onClose} headerBg="bg-yellow-50" iconBg="bg-yellow-500"
      icon="🥇" title={item.karat} badge={<StatusBadge status={item.status} />}>
      <div className="grid grid-cols-2 gap-4">
        <Row label="Purity" value={item.purity.toFixed(1) + "%"} />
        <Row label="Rate / gram" value={rate} />
      </div>
      <div className="border-t border-border" />
      <Row label="Description" value={item.description} />
      <div className="border-t border-border" />
      <div className="grid grid-cols-2 gap-4">
        <Row label="Created" value={fmtDate(item.created_at)} />
        <Row label="Updated" value={fmtDate(item.updated_at)} />
      </div>
    </ModalShell>
  );
}

// ── Diamond Filter View Modal ──────────────────────────────────────────────────
const FILTER_TYPE_COLORS: Record<string, string> = {
  Shape:   "bg-cyan-100 text-cyan-700 border border-cyan-200",
  Color:   "bg-violet-100 text-violet-700 border border-violet-200",
  Clarity: "bg-blue-100 text-blue-700 border border-blue-200",
  Cut:     "bg-fuchsia-100 text-fuchsia-700 border border-fuchsia-200",
};

export function DiamondFilterViewModal({ open, onClose, item }: { open: boolean; onClose: () => void; item: DiamondFilterItem | null }) {
  if (!item) return null;
  const typeCls = FILTER_TYPE_COLORS[item.filter_type] ?? "bg-muted text-muted-foreground border border-border";
  const typeBadge = (
    <span className={`inline-flex items-center px-2 py-0.5 rounded-md text-[11px] font-semibold ${typeCls}`}>
      {item.filter_type}
    </span>
  );
  return (
    <ModalShell open={open} onClose={onClose} headerBg="bg-cyan-50" iconBg="bg-cyan-600"
      icon="💠" title={item.filter_name} badge={typeBadge}>
      <Row label="Filter Value" value={item.filter_value} mono />
      <div className="border-t border-border" />
      <div className="grid grid-cols-2 gap-4">
        <Row label="Created" value={fmtDate(item.created_at)} />
        <Row label="Updated" value={fmtDate(item.updated_at)} />
      </div>
    </ModalShell>
  );
}
