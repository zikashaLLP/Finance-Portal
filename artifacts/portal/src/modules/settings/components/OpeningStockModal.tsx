import { useState, useEffect } from "react";
import { X, Lock } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

const INPUT_CLS =
  "w-full h-10 px-3 rounded-lg border border-border bg-background text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-foreground/10 focus:border-foreground/30 transition";
const LABEL_CLS = "block text-sm font-medium text-foreground mb-1.5";

export type OpeningKind = "gold" | "diamond";

export interface OpeningStockForm {
  stock: number;
  notes: string;
}

interface OpeningStockModalProps {
  open:       boolean;
  onClose:    () => void;
  onSave:     (form: OpeningStockForm) => void;
  kind:       OpeningKind;
  entityName: string;   // e.g. "Pure Gold" or "VVS1"
  badgeLabel: string;   // e.g. "Pure" or "Solitaire"
  badgeCls:   string;   // tailwind classes for badge
}

export function OpeningStockModal({
  open, onClose, onSave, kind, entityName, badgeLabel, badgeCls,
}: OpeningStockModalProps) {
  const [stock, setStock] = useState("");
  const [notes, setNotes] = useState("");

  useEffect(() => {
    if (open) { setStock(""); setNotes(""); }
  }, [open]);

  const unit       = kind === "gold" ? "g" : "ct";
  const unitLabel  = kind === "gold" ? "Grams (g)" : "Carats (ct)";
  const accentCls  = kind === "gold"
    ? "bg-yellow-600"
    : "bg-sky-600";
  const headerBg   = kind === "gold" ? "bg-yellow-50" : "bg-sky-50";

  function handleSave() {
    const v = parseFloat(stock);
    if (isNaN(v) || v < 0) return;
    onSave({ stock: v, notes: notes.trim() });
  }

  return (
    <Dialog open={open} onOpenChange={(v) => { if (!v) onClose(); }}>
      <DialogContent className="p-0 gap-0 !rounded-[16px] overflow-hidden border-0 shadow-2xl [&>button]:hidden sm:max-w-[460px]">

        {/* Header */}
        <DialogHeader className={`${headerBg} px-6 pt-5 pb-4 border-b border-border`}>
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-start gap-3">
              <div className={`h-9 w-9 rounded-full ${accentCls} flex items-center justify-center shrink-0 text-white text-base mt-0.5`}>
                {kind === "gold" ? "🔶" : "💎"}
              </div>
              <div>
                <DialogTitle className="text-[15px] font-semibold text-foreground leading-tight">
                  Set Opening Stock
                </DialogTitle>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-sm font-medium text-foreground">{entityName}</span>
                  <span className={`inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-semibold border ${badgeCls}`}>
                    {badgeLabel}
                  </span>
                </div>
              </div>
            </div>
            <button onClick={onClose} className="h-7 w-7 rounded-full flex items-center justify-center text-muted-foreground hover:bg-black/10 transition-colors mt-0.5 shrink-0">
              <X className="h-4 w-4" />
            </button>
          </div>
        </DialogHeader>

        {/* Body */}
        <div className="px-6 py-5 space-y-4">

          {/* Warning */}
          <div className="flex items-start gap-2.5 px-3 py-2.5 rounded-lg bg-amber-50 border border-amber-200">
            <Lock className="h-4 w-4 text-amber-600 shrink-0 mt-0.5" />
            <p className="text-xs text-amber-700 leading-relaxed">
              Opening stock can only be set <strong>once</strong> and cannot be edited afterwards.
              Ensure the value is accurate before saving.
            </p>
          </div>

          {/* Stock input */}
          <div>
            <label className={LABEL_CLS}>
              Opening Stock ({unitLabel}) <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <input
                className={INPUT_CLS + " pr-10"}
                type="number"
                min="0"
                step={kind === "gold" ? "0.001" : "0.0001"}
                placeholder={kind === "gold" ? "e.g. 500.000" : "e.g. 25.5000"}
                value={stock}
                onChange={(e) => setStock(e.target.value)}
                autoFocus
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-semibold text-muted-foreground pointer-events-none">
                {unit}
              </span>
            </div>
          </div>

          {/* Notes */}
          <div>
            <label className={LABEL_CLS}>Notes <span className="text-muted-foreground font-normal text-sm">(Optional)</span></label>
            <textarea
              className="w-full px-3 py-2.5 rounded-lg border border-border bg-background text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-foreground/10 transition resize-none"
              rows={3}
              placeholder="e.g. Carried forward from previous financial year…"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-border flex items-center justify-end gap-2.5 bg-background">
          <button
            onClick={onClose}
            className="h-9 px-5 rounded-[10px] text-sm font-medium border border-border text-foreground hover:bg-muted/40 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={stock === "" || isNaN(parseFloat(stock)) || parseFloat(stock) < 0}
            className="h-9 px-6 rounded-[10px] text-sm font-semibold bg-foreground text-background hover:bg-foreground/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Save Opening Stock
          </button>
        </div>

      </DialogContent>
    </Dialog>
  );
}
