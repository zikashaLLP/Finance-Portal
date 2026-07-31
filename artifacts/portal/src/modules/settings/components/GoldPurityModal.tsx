import { useState, useEffect } from "react";
import { Gem } from "lucide-react";
import { AppModal } from "@/shared/components/AppModal";
import { type GoldPurityItem } from "../data/mockGeneralMasters";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const INPUT_CLS =
  "w-full h-9 px-3 rounded-lg border border-border bg-background text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-foreground/10 focus:border-foreground/30 transition";
const LABEL_CLS = "block text-xs font-medium text-muted-foreground mb-1";

type FormData = Omit<GoldPurityItem, "id" | "created_at" | "updated_at">;

const EMPTY: FormData = {
  karat: "",
  purity: 0,
  rate_per_gram: 0,
  description: "",
  status: "Active",
};

interface GoldPurityModalProps {
  open: boolean;
  onClose: () => void;
  onSave: (data: FormData) => void;
  initial?: GoldPurityItem | null;
}

export function GoldPurityModal({ open, onClose, onSave, initial }: GoldPurityModalProps) {
  const [form, setForm] = useState<FormData>(EMPTY);

  useEffect(() => {
    if (open) {
      setForm(initial
        ? { karat: initial.karat, purity: initial.purity, rate_per_gram: initial.rate_per_gram, description: initial.description, status: initial.status }
        : { ...EMPTY }
      );
    }
  }, [open, initial]);

  function set<K extends keyof FormData>(key: K, value: FormData[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  function handleSave() {
    if (!form.karat.trim() || form.purity <= 0) return;
    onSave(form);
  }

  const isEdit = !!initial;

  return (
    <AppModal
      open={open}
      onClose={onClose}
      maxWidth="sm:max-w-[480px]"
      headerBg="bg-yellow-50"
      icon={
        <div className="h-9 w-9 rounded-full bg-yellow-500 flex items-center justify-center shrink-0">
          <Gem className="h-4 w-4 text-white" />
        </div>
      }
      title={isEdit ? "Edit Gold Purity" : "Add Gold Purity"}
      subtitle={isEdit ? `Editing ${initial?.karat}` : "Define a new gold purity standard"}
      primaryLabel={isEdit ? "Save Changes" : "Add Purity"}
      onPrimary={handleSave}
    >
      <div className="px-6 pt-4 pb-5 space-y-4">
        <div className="grid grid-cols-2 gap-3">
          {/* Karat */}
          <div>
            <label className={LABEL_CLS}>Karat <span className="text-red-500">*</span></label>
            <input
              className={INPUT_CLS}
              placeholder="e.g. 22K"
              value={form.karat}
              onChange={(e) => set("karat", e.target.value)}
            />
          </div>
          {/* Purity % */}
          <div>
            <label className={LABEL_CLS}>Purity (%) <span className="text-red-500">*</span></label>
            <div className="relative">
              <input
                className={INPUT_CLS + " pr-8"}
                type="number"
                min={0}
                max={100}
                step={0.1}
                placeholder="e.g. 91.6"
                value={form.purity === 0 ? "" : form.purity}
                onChange={(e) => set("purity", parseFloat(e.target.value) || 0)}
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-muted-foreground pointer-events-none">%</span>
            </div>
          </div>
        </div>

        {/* Rate per gram */}
        <div>
          <label className={LABEL_CLS}>Rate per Gram (₹) — Today's Rate</label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground pointer-events-none">₹</span>
            <input
              className={INPUT_CLS + " pl-7"}
              type="number"
              min={0}
              step={1}
              placeholder="e.g. 6670"
              value={form.rate_per_gram === 0 ? "" : form.rate_per_gram}
              onChange={(e) => set("rate_per_gram", parseFloat(e.target.value) || 0)}
            />
          </div>
        </div>

        {/* Description */}
        <div>
          <label className={LABEL_CLS}>Description</label>
          <input
            className={INPUT_CLS}
            placeholder="Brief description"
            value={form.description}
            onChange={(e) => set("description", e.target.value)}
          />
        </div>

        {/* Status */}
        <div>
          <label className={LABEL_CLS}>Status</label>
          <Select value={form.status} onValueChange={(v) => set("status", v as "Active" | "Inactive")}>
            <SelectTrigger className="h-9 rounded-lg border-border text-sm">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Active">Active</SelectItem>
              <SelectItem value="Inactive">Inactive</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </AppModal>
  );
}
