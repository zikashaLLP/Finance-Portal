import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
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
import { GoldTransaction, GoldType, GoldCategory } from "../data/mockPureGold";

interface Props {
  transaction: GoldTransaction | null;
  open: boolean;
  onClose: () => void;
  onSave: (updated: GoldTransaction) => void;
}

const TYPES: GoldType[] = ["Pure Gold", "Old Gold", "Coins"];
const CATEGORIES: GoldCategory[] = ["Purchase", "Sale"];

export function EditGoldTransactionModal({ transaction, open, onClose, onSave }: Props) {
  const [form, setForm] = useState<GoldTransaction | null>(null);

  useEffect(() => {
    if (transaction) setForm({ ...transaction });
  }, [transaction]);

  if (!form) return null;

  const amount = parseFloat((form.weight * form.rate).toFixed(2));

  function handleChange<K extends keyof GoldTransaction>(key: K, value: GoldTransaction[K]) {
    setForm((prev) => prev ? { ...prev, [key]: value } : prev);
  }

  function handleSave() {
    if (!form) return;
    onSave({ ...form, amount });
    onClose();
  }

  return (
    <Dialog open={open} onOpenChange={(v) => { if (!v) onClose(); }}>
      <DialogContent className="sm:max-w-[520px] rounded-2xl p-0 overflow-hidden gap-0">
        <DialogHeader className="px-6 pt-6 pb-4 border-b border-border">
          <DialogTitle className="text-base font-semibold">Edit Gold Transaction</DialogTitle>
        </DialogHeader>

        <div className="px-6 py-5 space-y-4 max-h-[70vh] overflow-y-auto">
          {/* Row 1: Date + Type */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label className="text-xs font-medium text-muted-foreground">Date</Label>
              <Input
                type="date"
                value={form.date}
                onChange={(e) => handleChange("date", e.target.value)}
                className="h-9 text-sm"
              />
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs font-medium text-muted-foreground">Type</Label>
              <Select value={form.type} onValueChange={(v) => handleChange("type", v as GoldType)}>
                <SelectTrigger className="h-9 text-sm">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {TYPES.map((t) => (
                    <SelectItem key={t} value={t}>{t}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Row 2: Category + Name */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label className="text-xs font-medium text-muted-foreground">Category</Label>
              <Select value={form.category} onValueChange={(v) => handleChange("category", v as GoldCategory)}>
                <SelectTrigger className="h-9 text-sm">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {CATEGORIES.map((c) => (
                    <SelectItem key={c} value={c}>{c}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs font-medium text-muted-foreground">Name</Label>
              <Input
                value={form.name}
                onChange={(e) => handleChange("name", e.target.value)}
                placeholder="Party / customer name"
                className="h-9 text-sm"
              />
            </div>
          </div>

          {/* Row 3: Weight + Purity */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label className="text-xs font-medium text-muted-foreground">Weight (g)</Label>
              <Input
                type="number"
                min={0}
                step={0.01}
                value={form.weight}
                onChange={(e) => handleChange("weight", parseFloat(e.target.value) || 0)}
                className="h-9 text-sm"
              />
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs font-medium text-muted-foreground">Purity</Label>
              <Input
                value={form.purity}
                onChange={(e) => handleChange("purity", e.target.value)}
                placeholder="e.g. 24K, 22K"
                className="h-9 text-sm"
              />
            </div>
          </div>

          {/* Row 4: Rate + Amount (computed) */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label className="text-xs font-medium text-muted-foreground">Rate (₹/g)</Label>
              <Input
                type="number"
                min={0}
                step={1}
                value={form.rate}
                onChange={(e) => handleChange("rate", parseFloat(e.target.value) || 0)}
                className="h-9 text-sm"
              />
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs font-medium text-muted-foreground">Amount (₹)</Label>
              <div className="h-9 flex items-center px-3 rounded-md border border-border bg-muted/40 text-sm font-semibold text-foreground tabular-nums">
                {new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(amount)}
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="space-y-1.5">
            <Label className="text-xs font-medium text-muted-foreground">Description</Label>
            <Input
              value={form.description}
              onChange={(e) => handleChange("description", e.target.value)}
              placeholder="Optional note"
              className="h-9 text-sm"
            />
          </div>
        </div>

        <DialogFooter className="px-6 py-4 border-t border-border flex items-center justify-end gap-2">
          <Button variant="outline" size="sm" onClick={onClose} className="h-9 px-4">
            Cancel
          </Button>
          <Button size="sm" onClick={handleSave} className="h-9 px-5 bg-foreground text-background hover:bg-foreground/90">
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
