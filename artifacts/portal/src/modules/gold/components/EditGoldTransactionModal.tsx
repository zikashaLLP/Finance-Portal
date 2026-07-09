import { useEffect, useState } from "react";
import { Label } from "../../../components/ui/label";
import { Input } from "../../../components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../components/ui/select";
import { Gem, Coins, CircleDot } from "lucide-react";
import { GoldTransaction, GoldType, GoldCategory } from "../data/mockPureGold";
import { AppModal } from "../../../shared/components/AppModal";

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

  const iconNode = (
    <div className={`h-10 w-10 rounded-xl flex items-center justify-center shrink-0 ${theme.iconBg} ${theme.iconColor}`}>
      {icon}
    </div>
  );

  const subtitle = (
    <div className="flex items-center gap-2">
      <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold tracking-wide uppercase ${theme.badgeBg} ${theme.badgeText}`}>
        {form.category}
      </span>
      <span className="text-[11px] text-muted-foreground font-mono">{form.id}</span>
    </div>
  );

  return (
    <AppModal
      open={open}
      onClose={onClose}
      maxWidth="sm:max-w-[480px]"
      headerBg={theme.bg}
      icon={iconNode}
      title="Edit Gold Transaction"
      subtitle={subtitle}
      primaryLabel="Save Changes"
      onPrimary={handleSave}
    >
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
    </AppModal>
  );
}
