import { useState, useEffect } from "react";
import { Label } from "../../../components/ui/label";
import { Input } from "../../../components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../components/ui/select";
import { Scale } from "lucide-react";
import { AppModal } from "../../../shared/components/AppModal";

export interface GoldOpeningBalance {
  goldType: string;
  weight: string;
  purity: string;
  rate: string;
  amount: string;
  description: string;
}

const EMPTY: GoldOpeningBalance = {
  goldType: "",
  weight: "",
  purity: "",
  rate: "",
  amount: "",
  description: "",
};

const GOLD_TYPES = ["Pure Gold", "Old Gold", "Gold Coins"];
const PURITIES = ["999", "995", "916", "75", "58.3"];

interface Props {
  open: boolean;
  onClose: () => void;
  onSave: (data: GoldOpeningBalance) => void;
}

export function GoldOpeningBalanceModal({ open, onClose, onSave }: Props) {
  const [form, setForm] = useState<GoldOpeningBalance>(EMPTY);

  useEffect(() => {
    if (open) setForm(EMPTY);
  }, [open]);

  function set(key: keyof GoldOpeningBalance, value: string) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  function handleSave() {
    onSave(form);
    onClose();
  }

  const icon = (
    <div className="h-10 w-10 rounded-xl flex items-center justify-center shrink-0 bg-amber-100 text-amber-600">
      <Scale className="h-5 w-5" />
    </div>
  );

  return (
    <AppModal
      open={open}
      onClose={onClose}
      headerBg="bg-amber-50"
      icon={icon}
      title="Opening Balance"
      subtitle="Set the starting gold stock for each type"
      primaryLabel="Save Balance"
      onPrimary={handleSave}
    >
      <div className="px-6 pt-4 pb-5 space-y-4 bg-background">

        {/* Row 1: Gold Type + Purity */}
        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-1.5">
            <Label className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">
              Gold Type <span className="text-red-500">*</span>
            </Label>
            <Select value={form.goldType} onValueChange={(v) => set("goldType", v)}>
              <SelectTrigger className="h-10 rounded-[10px] bg-muted/50 border-border focus:ring-1 text-sm">
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent className="rounded-xl">
                {GOLD_TYPES.map((t) => (
                  <SelectItem key={t} value={t}>{t}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-1.5">
            <Label className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">
              Purity (%) <span className="text-red-500">*</span>
            </Label>
            <Select value={form.purity} onValueChange={(v) => set("purity", v)}>
              <SelectTrigger className="h-10 rounded-[10px] bg-muted/50 border-border focus:ring-1 text-sm">
                <SelectValue placeholder="Select purity" />
              </SelectTrigger>
              <SelectContent className="rounded-xl">
                {PURITIES.map((p) => (
                  <SelectItem key={p} value={p}>{p}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Row 2: Weight */}
        <div className="space-y-1.5">
          <Label className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">
            Weight (Gms) <span className="text-red-500">*</span>
          </Label>
          <div className="relative">
            <Input
              type="number"
              min={0}
              step={0.001}
              value={form.weight}
              onChange={(e) => set("weight", e.target.value)}
              placeholder="0.000"
              className="h-10 rounded-[10px] bg-muted/50 border-border text-sm font-semibold pr-12 focus-visible:ring-1 focus-visible:ring-foreground/20"
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[11px] font-medium text-muted-foreground select-none">
              g
            </span>
          </div>
        </div>

        {/* Row 3: Rate + Amount (both optional) */}
        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-1.5">
            <Label className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">
              Rate{" "}
              <span className="text-muted-foreground normal-case tracking-normal font-normal">(₹/Gms, optional)</span>
            </Label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm font-semibold select-none">₹</span>
              <Input
                type="number"
                min={0}
                step={1}
                value={form.rate}
                onChange={(e) => set("rate", e.target.value)}
                placeholder="0"
                className="pl-7 h-10 rounded-[10px] bg-muted/50 border-border text-sm font-semibold focus-visible:ring-1 focus-visible:ring-foreground/20"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <Label className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">
              Amount{" "}
              <span className="text-muted-foreground normal-case tracking-normal font-normal">(₹, optional)</span>
            </Label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm font-semibold select-none">₹</span>
              <Input
                type="number"
                min={0}
                step={1}
                value={form.amount}
                onChange={(e) => set("amount", e.target.value)}
                placeholder="0"
                className="pl-7 h-10 rounded-[10px] bg-muted/50 border-border text-sm font-semibold focus-visible:ring-1 focus-visible:ring-foreground/20"
              />
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
