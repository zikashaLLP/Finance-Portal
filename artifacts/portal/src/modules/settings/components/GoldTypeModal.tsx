import { useState, useEffect } from "react";
import { FlameKindling, Check } from "lucide-react";
import { AppModal } from "@/shared/components/AppModal";
import {
  type GoldTypeItem,
  type GoldPurityItem,
  type GoldPurityType,
} from "../data/mockGeneralMasters";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

const INPUT_CLS =
  "w-full h-9 px-3 rounded-lg border border-border bg-background text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-foreground/10 focus:border-foreground/30 transition";
const LABEL_CLS = "block text-xs font-medium text-muted-foreground mb-1";

type FormData = Omit<GoldTypeItem, "id" | "created_at" | "updated_at">;

const EMPTY: FormData = {
  type_name:       "",
  purity_type:     "Pure",
  gold_purity_ids: [],
  status:          "Active",
};

interface GoldTypeModalProps {
  open:           boolean;
  onClose:        () => void;
  onSave:         (data: FormData) => void;
  initial?:       GoldTypeItem | null;
  purityOptions:  GoldPurityItem[];   // live list from GoldPuritySubTable
}

export function GoldTypeModal({ open, onClose, onSave, initial, purityOptions }: GoldTypeModalProps) {
  const [form, setForm] = useState<FormData>(EMPTY);

  useEffect(() => {
    if (open) {
      setForm(initial
        ? {
            type_name:       initial.type_name,
            purity_type:     initial.purity_type,
            gold_purity_ids: [...initial.gold_purity_ids],
            status:          initial.status,
          }
        : { ...EMPTY }
      );
    }
  }, [open, initial]);

  function set<K extends keyof FormData>(key: K, value: FormData[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  function togglePurity(id: string) {
    setForm((prev) => ({
      ...prev,
      gold_purity_ids: prev.gold_purity_ids.includes(id)
        ? prev.gold_purity_ids.filter((p) => p !== id)
        : [...prev.gold_purity_ids, id],
    }));
  }

  function handleSave() {
    if (!form.type_name.trim() || form.gold_purity_ids.length === 0) return;
    onSave(form);
  }

  const isEdit = !!initial;

  return (
    <AppModal
      open={open}
      onClose={onClose}
      maxWidth="sm:max-w-[520px]"
      headerBg="bg-yellow-50"
      icon={
        <div className="h-9 w-9 rounded-full bg-yellow-500 flex items-center justify-center shrink-0">
          <FlameKindling className="h-4 w-4 text-white" />
        </div>
      }
      title={isEdit ? "Edit Gold Type" : "Add Gold Type"}
      subtitle={isEdit ? `Editing ${initial?.type_name}` : "Define a new gold type with assigned purities"}
      primaryLabel={isEdit ? "Save Changes" : "Add Gold Type"}
      onPrimary={handleSave}
    >
      <div className="px-6 pt-4 pb-5 space-y-4">

        {/* Type Name + Purity Type */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className={LABEL_CLS}>Type Name <span className="text-red-500">*</span></label>
            <input
              className={INPUT_CLS}
              placeholder="e.g. Pure Gold, Hallmark Gold"
              value={form.type_name}
              onChange={(e) => set("type_name", e.target.value)}
              autoFocus
            />
          </div>
          <div>
            <label className={LABEL_CLS}>Purity Type <span className="text-red-500">*</span></label>
            <Select value={form.purity_type} onValueChange={(v) => set("purity_type", v as GoldPurityType)}>
              <SelectTrigger className="h-9 rounded-lg border-border text-sm">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Pure">Pure</SelectItem>
                <SelectItem value="Mixed">Mixed</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Gold Purity multi-select */}
        <div>
          <label className={LABEL_CLS}>
            Assign Gold Purity <span className="text-red-500">*</span>
            <span className="text-muted-foreground font-normal ml-1">(select one or more)</span>
          </label>
          {purityOptions.length === 0 ? (
            <p className="text-xs text-muted-foreground italic py-2">No purity records found. Add purity grades first.</p>
          ) : (
            <div className="grid grid-cols-2 gap-2 mt-1">
              {purityOptions.map((p) => {
                const selected = form.gold_purity_ids.includes(p.id);
                return (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => togglePurity(p.id)}
                    className={cn(
                      "flex items-center gap-2.5 px-3 py-2.5 rounded-lg border text-left transition-all",
                      selected
                        ? "border-yellow-400 bg-yellow-50 shadow-sm"
                        : "border-border bg-background hover:border-yellow-200 hover:bg-yellow-50/40",
                    )}
                  >
                    <div className={cn(
                      "h-4 w-4 rounded border flex items-center justify-center shrink-0 transition-colors",
                      selected ? "bg-yellow-500 border-yellow-500" : "border-border bg-background",
                    )}>
                      {selected && <Check className="h-2.5 w-2.5 text-white" strokeWidth={3} />}
                    </div>
                    <div className="min-w-0">
                      <span className="block text-xs font-semibold text-foreground">{p.karat}</span>
                      <span className="block text-[10px] text-muted-foreground">{p.purity.toFixed(1)}%</span>
                    </div>
                  </button>
                );
              })}
            </div>
          )}
          {form.gold_purity_ids.length > 0 && (
            <p className="text-[11px] text-muted-foreground mt-1.5">
              {form.gold_purity_ids.length} purity grade{form.gold_purity_ids.length > 1 ? "s" : ""} selected
            </p>
          )}
        </div>

        {/* Status */}
        <div>
          <label className={LABEL_CLS}>Status</label>
          <Select value={form.status} onValueChange={(v) => set("status", v as FormData["status"])}>
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
