import { useState, useEffect, useMemo } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { X, Lock } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { type OldGoldItem } from "../data/mockOldGold";

// ── mock client list (aligned with settings/clients) ──────────────────────────
const CLIENTS = [
  "Ramesh Jewellers",
  "Priya Sharma",
  "Suresh Kumar",
  "Meena Exports",
  "Kavita Gems",
  "Walk-in Customer",
];

const INPUT_CLS =
  "w-full h-10 px-3 rounded-lg border border-border bg-background text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-foreground/10 focus:border-foreground/30 transition";
const LABEL_CLS = "block text-sm font-medium text-foreground mb-1.5";
const READONLY_CLS =
  "w-full h-10 px-3 rounded-lg border border-border bg-muted/40 text-sm text-muted-foreground tabular-nums";

type LedgerValueType = "purchase_price" | "pure_gold_weight";

interface FormState {
  description: string;
  grossWeight: string;
  netWeight: string;
  purity: string;
  purchasePrice: string;
  ledgerValue: LedgerValueType;
  client: string;
  notes: string;
}

const EMPTY: FormState = {
  description: "",
  grossWeight: "0.000",
  netWeight: "0.000",
  purity: "",
  purchasePrice: "0.00",
  ledgerValue: "purchase_price",
  client: "",
  notes: "",
};

interface AddOldGoldModalProps {
  open: boolean;
  onClose: () => void;
  onSave: (item: Omit<OldGoldItem, "id">) => void;
  nextLotNumber: string;
}

export function AddOldGoldModal({ open, onClose, onSave, nextLotNumber }: AddOldGoldModalProps) {
  const [form, setForm] = useState<FormState>(EMPTY);

  useEffect(() => {
    if (open) setForm({ ...EMPTY });
  }, [open]);

  function set(key: keyof FormState, value: string) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  // Auto-calculate pure gold: netWeight × (purity / 1000)
  const pureGold = useMemo(() => {
    const nw = parseFloat(form.netWeight) || 0;
    const pu = parseFloat(form.purity)    || 0;
    if (nw <= 0 || pu <= 0) return 0;
    return nw * (pu / 1000);
  }, [form.netWeight, form.purity]);

  const purchasePrice = parseFloat(form.purchasePrice) || 0;

  const ledgerOptions = [
    { value: "purchase_price",    label: `Use Purchase Price (₹${purchasePrice.toFixed(2)})` },
    { value: "pure_gold_weight",  label: `Use Pure Gold Weight (${pureGold.toFixed(3)} g)` },
  ];

  function handleSave() {
    if (!form.description.trim()) return;
    const gw = parseFloat(form.grossWeight) || 0;
    const nw = parseFloat(form.netWeight)   || 0;

    // Derive karat label from numeric purity
    const pu = parseFloat(form.purity) || 0;
    let karatLabel = form.purity.trim();
    if (pu >= 990)      karatLabel = "24K";
    else if (pu >= 900) karatLabel = "22K";
    else if (pu >= 750) karatLabel = "18K";
    else if (pu >= 580) karatLabel = "14K";

    onSave({
      lotNumber:     nextLotNumber,
      description:   form.description.trim(),
      grossWeight:   gw,
      netWeight:     nw,
      purity:        karatLabel || form.purity,
      pureGold,
      purchasePrice: purchasePrice,
      client:        form.client || undefined,
      notes:         form.notes.trim() || undefined,
      status:        "In Box",
      receivedDate:  new Date().toISOString().split("T")[0],
    });
  }

  return (
    <Dialog open={open} onOpenChange={(v) => { if (!v) onClose(); }}>
      <DialogContent className="p-0 gap-0 !rounded-[16px] overflow-hidden border-0 shadow-2xl [&>button]:hidden sm:max-w-[600px]">

        {/* Header */}
        <DialogHeader className="px-6 pt-5 pb-4 border-b border-border">
          <div className="flex items-start justify-between gap-3">
            <div>
              <DialogTitle className="text-[16px] font-semibold text-foreground leading-tight">
                Add Old Gold to Box
              </DialogTitle>
              <p className="text-sm text-muted-foreground mt-0.5">
                Record old gold jewelry received from clients with approximate measurements
              </p>
            </div>
            <button
              onClick={onClose}
              className="h-7 w-7 rounded-full flex items-center justify-center text-muted-foreground hover:bg-muted/60 transition-colors mt-0.5 shrink-0"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </DialogHeader>

        {/* Body */}
        <div className="px-6 py-5 space-y-4 max-h-[70vh] overflow-y-auto">

          {/* Description */}
          <div>
            <label className={LABEL_CLS}>Description</label>
            <input
              className={INPUT_CLS}
              placeholder="e.g., Gold chain from client"
              value={form.description}
              onChange={(e) => set("description", e.target.value)}
              autoFocus
            />
          </div>

          {/* Weights */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={LABEL_CLS}>Gross Weight (g)</label>
              <input
                className={INPUT_CLS}
                type="number"
                min="0"
                step="0.001"
                placeholder="0.000"
                value={form.grossWeight}
                onChange={(e) => set("grossWeight", e.target.value)}
              />
            </div>
            <div>
              <label className={LABEL_CLS}>Approx Net Weight (g)</label>
              <input
                className={INPUT_CLS}
                type="number"
                min="0"
                step="0.001"
                placeholder="0.000"
                value={form.netWeight}
                onChange={(e) => set("netWeight", e.target.value)}
              />
            </div>
          </div>

          {/* Purity + Pure Gold (auto) */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={LABEL_CLS}>Approx Purity (Manual Entry)</label>
              <input
                className={INPUT_CLS}
                placeholder="e.g., 916, 750, 999"
                value={form.purity}
                onChange={(e) => set("purity", e.target.value)}
              />
            </div>
            <div>
              <label className={LABEL_CLS}>
                Pure Gold Weight (g)
                <span className="text-[11px] text-muted-foreground font-normal ml-1">
                  — Auto Calculated (Net Weight × Purity %)
                </span>
              </label>
              <div className="relative">
                <input
                  readOnly
                  className={READONLY_CLS}
                  value={pureGold.toFixed(3)}
                />
                <Lock className="absolute right-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground pointer-events-none" />
              </div>
            </div>
          </div>

          {/* Purchase Price */}
          <div>
            <label className={LABEL_CLS}>Purchase Price (₹)</label>
            <input
              className={INPUT_CLS}
              type="number"
              min="0"
              step="0.01"
              placeholder="0.00"
              value={form.purchasePrice}
              onChange={(e) => set("purchasePrice", e.target.value)}
            />
          </div>

          {/* Ledger Value */}
          <div>
            <label className={LABEL_CLS}>Value to Record in Client Ledger</label>
            <Select
              value={form.ledgerValue}
              onValueChange={(v) => set("ledgerValue", v as LedgerValueType)}
            >
              <SelectTrigger className="h-10 rounded-lg border-border text-sm">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {ledgerOptions.map((o) => (
                  <SelectItem key={o.value} value={o.value}>{o.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <p className="text-[11px] text-muted-foreground mt-1.5">
              Choose whether to record the purchase price or pure gold weight in the client's ledger as the transaction value.
            </p>
          </div>

          {/* Client */}
          <div>
            <label className={LABEL_CLS}>Client <span className="text-muted-foreground font-normal">(Optional)</span></label>
            <Select
              value={form.client || "__none__"}
              onValueChange={(v) => set("client", v === "__none__" ? "" : v)}
            >
              <SelectTrigger className="h-10 rounded-lg border-border text-sm">
                <SelectValue placeholder="Select client" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="__none__">Select client</SelectItem>
                {CLIENTS.map((c) => (
                  <SelectItem key={c} value={c}>{c}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Notes */}
          <div>
            <label className={LABEL_CLS}>Notes <span className="text-muted-foreground font-normal">(Optional)</span></label>
            <textarea
              className="w-full px-3 py-2.5 rounded-lg border border-border bg-background text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-foreground/10 focus:border-foreground/30 transition resize-none"
              rows={3}
              placeholder="Additional notes..."
              value={form.notes}
              onChange={(e) => set("notes", e.target.value)}
            />
          </div>

        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-border flex items-center justify-between bg-background">
          <span className="text-[11px] text-muted-foreground font-mono">Lot: {nextLotNumber}</span>
          <div className="flex items-center gap-2.5">
            <button
              onClick={onClose}
              className="h-9 px-5 rounded-[10px] text-sm font-medium border border-border text-foreground hover:bg-muted/40 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              disabled={!form.description.trim()}
              className="h-9 px-6 rounded-[10px] text-sm font-semibold bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Add to Box
            </button>
          </div>
        </div>

      </DialogContent>
    </Dialog>
  );
}
