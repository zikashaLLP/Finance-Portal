import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../../../components/ui/dialog";
import { Label } from "../../../components/ui/label";
import { Input } from "../../../components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../components/ui/select";
import { Button } from "../../../components/ui/button";
import { Gem, Coins, CircleDot, X } from "lucide-react";
import { GoldTransaction, GoldType, GoldCategory } from "../data/mockPureGold";

interface Props {
  transaction: GoldTransaction | null;
  open: boolean;
  onClose: () => void;
  onSave: (updated: GoldTransaction) => void;
}

const TYPES: GoldType[] = ["Pure Gold", "Old Gold", "Coins"];
const CATEGORIES: GoldCategory[] = ["Purchase", "Sale"];

const CAT_THEME: Record<GoldCategory, { bg: string; iconBg: string; iconColor: string; badgeBg: string; badgeText: string }> = {
  Purchase: {
    bg: "bg-emerald-50",
    iconBg: "bg-emerald-100",
    iconColor: "text-emerald-600",
    badgeBg: "bg-emerald-100",
    badgeText: "text-emerald-700",
  },
  Sale: {
    bg: "bg-red-50",
    iconBg: "bg-red-100",
    iconColor: "text-red-500",
    badgeBg: "bg-red-100",
    badgeText: "text-red-600",
  },
};

const TYPE_ICON: Record<GoldType, React.ReactNode> = {
  "Pure Gold": <Gem className="h-5 w-5" />,
  "Old Gold":  <CircleDot className="h-5 w-5" />,
  "Coins":     <Coins className="h-5 w-5" />,
};

export function EditGoldTransactionModal({ transaction, open, onClose, onSave }: Props) {
  const [form, setForm] = useState<GoldTransaction | null>(null);

  useEffect(() => {
    if (transaction) setForm({ ...transaction });
  }, [transaction]);

  if (!form) return null;

  const theme = CAT_THEME[form.category];
  const icon  = TYPE_ICON[form.type];
  const amount = parseFloat((form.weight * form.rate).toFixed(2));

  function set<K extends keyof GoldTransaction>(key: K, value: GoldTransaction[K]) {
    setForm((prev) => prev ? { ...prev, [key]: value } : prev);
  }

  function handleSave() {
    if (!form) return;
    onSave({ ...form, amount });
    onClose();
  }

  return (
    <Dialog open={open} onOpenChange={(v) => { if (!v) onClose(); }}>
      <DialogContent className="sm:max-w-[480px] p-0 gap-0 !rounded-[15px] overflow-hidden border-0 shadow-2xl [&>button]:hidden">

        {/* Coloured header band */}
        <div className={`px-6 pt-5 pb-4 ${theme.bg}`}>
          <DialogHeader>
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-3">
                {/* Icon circle */}
                <div className={`h-10 w-10 rounded-xl flex items-center justify-center shrink-0 ${theme.iconBg} ${theme.iconColor}`}>
                  {icon}
                </div>
                <div>
                  <DialogTitle className="text-[15px] font-semibold leading-tight text-foreground">
                    Edit Gold Transaction
                  </DialogTitle>
                  <div className="flex items-center gap-2 mt-1">
                    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold tracking-wide uppercase ${theme.badgeBg} ${theme.badgeText}`}>
                      {form.category}
                    </span>
                    <span className="text-[11px] text-muted-foreground font-mono">{form.id}</span>
                  </div>
                </div>
              </div>
              {/* Close button */}
              <button
                onClick={onClose}
                className="h-7 w-7 rounded-full flex items-center justify-center text-muted-foreground hover:bg-black/10 transition-colors mt-0.5"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </DialogHeader>
        </div>

        {/* Body */}
        <div className="px-6 pt-4 pb-5 space-y-4 bg-background">

          {/* Row 1: Date + Type */}
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <Label className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">
                Date <span className="text-red-500">*</span>
              </Label>
              <Input
                type="date"
                value={form.date}
                onChange={(e) => set("date", e.target.value)}
                className="h-10 rounded-[10px] bg-muted/50 border-border text-sm focus-visible:ring-1 focus-visible:ring-foreground/20"
              />
            </div>
            <div className="space-y-1.5">
              <Label className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">
                Type <span className="text-red-500">*</span>
              </Label>
              <Select value={form.type} onValueChange={(v) => set("type", v as GoldType)}>
                <SelectTrigger className="h-10 rounded-[10px] bg-muted/50 border-border focus:ring-1 text-sm">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="rounded-xl">
                  {TYPES.map((t) => <SelectItem key={t} value={t}>{t}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Row 2: Category + Name */}
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <Label className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">
                Category <span className="text-red-500">*</span>
              </Label>
              <Select value={form.category} onValueChange={(v) => set("category", v as GoldCategory)}>
                <SelectTrigger className="h-10 rounded-[10px] bg-muted/50 border-border focus:ring-1 text-sm">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="rounded-xl">
                  {CATEGORIES.map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5">
              <Label className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">
                Name <span className="text-red-500">*</span>
              </Label>
              <Input
                value={form.name}
                onChange={(e) => set("name", e.target.value)}
                placeholder="Party / customer name"
                className="h-10 rounded-[10px] bg-muted/50 border-border text-sm focus-visible:ring-1 focus-visible:ring-foreground/20"
              />
            </div>
          </div>

          {/* Row 3: Weight + Purity */}
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <Label className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">
                Weight (g) <span className="text-red-500">*</span>
              </Label>
              <Input
                type="number"
                min={0}
                step={0.01}
                value={form.weight}
                onChange={(e) => set("weight", parseFloat(e.target.value) || 0)}
                className="h-10 rounded-[10px] bg-muted/50 border-border text-sm font-semibold focus-visible:ring-1 focus-visible:ring-foreground/20"
              />
            </div>
            <div className="space-y-1.5">
              <Label className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">
                Purity
              </Label>
              <Input
                value={form.purity}
                onChange={(e) => set("purity", e.target.value)}
                placeholder="e.g. 24K, 22K"
                className="h-10 rounded-[10px] bg-muted/50 border-border text-sm focus-visible:ring-1 focus-visible:ring-foreground/20"
              />
            </div>
          </div>

          {/* Row 4: Rate + Amount (auto-computed) */}
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <Label className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">
                Rate (₹/g) <span className="text-red-500">*</span>
              </Label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm font-semibold select-none">₹</span>
                <Input
                  type="number"
                  min={0}
                  step={1}
                  value={form.rate}
                  onChange={(e) => set("rate", parseFloat(e.target.value) || 0)}
                  className="pl-7 h-10 rounded-[10px] bg-muted/50 border-border text-sm font-semibold focus-visible:ring-1 focus-visible:ring-foreground/20"
                />
              </div>
            </div>
            <div className="space-y-1.5">
              <Label className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">
                Amount
              </Label>
              <div className="h-10 flex items-center px-3 rounded-[10px] border border-border bg-muted/30 text-sm font-semibold text-foreground tabular-nums">
                {new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(amount)}
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="space-y-1.5">
            <Label className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">
              Description
            </Label>
            <Input
              value={form.description}
              onChange={(e) => set("description", e.target.value)}
              placeholder="Optional note"
              className="h-10 rounded-[10px] bg-muted/50 border-border text-sm focus-visible:ring-1 focus-visible:ring-foreground/20"
            />
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-border flex items-center justify-end gap-2.5 bg-background">
          <Button
            variant="outline"
            onClick={onClose}
            className="h-9 px-5 rounded-[10px] text-sm font-medium border-border"
          >
            Cancel
          </Button>
          <Button
            onClick={handleSave}
            className="h-9 px-5 rounded-[10px] text-sm font-medium bg-foreground text-background hover:bg-foreground/90"
          >
            Save Changes
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
