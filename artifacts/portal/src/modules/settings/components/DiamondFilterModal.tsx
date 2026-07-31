import { useState, useEffect } from "react";
import { Diamond } from "lucide-react";
import { AppModal } from "@/shared/components/AppModal";
import { type DiamondFilterItem, DIAMOND_FILTER_TYPES } from "../data/mockGeneralMasters";
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

type FormData = Omit<DiamondFilterItem, "id" | "created_at" | "updated_at">;

const EMPTY: FormData = {
  filter_type: "Shape",
  filter_name: "",
  filter_value: "",
};

interface DiamondFilterModalProps {
  open: boolean;
  onClose: () => void;
  onSave: (data: FormData) => void;
  initial?: DiamondFilterItem | null;
}

export function DiamondFilterModal({ open, onClose, onSave, initial }: DiamondFilterModalProps) {
  const [form, setForm] = useState<FormData>(EMPTY);

  useEffect(() => {
    if (open) {
      setForm(initial
        ? { filter_type: initial.filter_type, filter_name: initial.filter_name, filter_value: initial.filter_value }
        : { ...EMPTY }
      );
    }
  }, [open, initial]);

  function set<K extends keyof FormData>(key: K, value: FormData[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  function handleSave() {
    if (!form.filter_name.trim() || !form.filter_type) return;
    onSave(form);
  }

  const isEdit = !!initial;

  return (
    <AppModal
      open={open}
      onClose={onClose}
      maxWidth="sm:max-w-[460px]"
      headerBg="bg-cyan-50"
      icon={
        <div className="h-9 w-9 rounded-full bg-cyan-600 flex items-center justify-center shrink-0">
          <Diamond className="h-4 w-4 text-white" />
        </div>
      }
      title={isEdit ? "Edit Diamond Filter" : "Add Diamond Filter"}
      subtitle={isEdit ? `Editing ${initial?.filter_name}` : "Define a new diamond filter"}
      primaryLabel={isEdit ? "Save Changes" : "Add Filter"}
      onPrimary={handleSave}
    >
      <div className="px-6 pt-4 pb-5 space-y-4">
        {/* Filter Type */}
        <div>
          <label className={LABEL_CLS}>Filter Type <span className="text-red-500">*</span></label>
          <Select value={form.filter_type} onValueChange={(v) => set("filter_type", v)}>
            <SelectTrigger className="h-9 rounded-lg border-border text-sm">
              <SelectValue placeholder="Select type" />
            </SelectTrigger>
            <SelectContent>
              {DIAMOND_FILTER_TYPES.map((t) => (
                <SelectItem key={t} value={t}>{t}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {/* Filter Name */}
          <div>
            <label className={LABEL_CLS}>Filter Name <span className="text-red-500">*</span></label>
            <input
              className={INPUT_CLS}
              placeholder="e.g. Round Brilliant"
              value={form.filter_name}
              onChange={(e) => set("filter_name", e.target.value)}
            />
          </div>
          {/* Filter Value */}
          <div>
            <label className={LABEL_CLS}>Filter Value</label>
            <input
              className={INPUT_CLS}
              placeholder="e.g. RB"
              value={form.filter_value}
              onChange={(e) => set("filter_value", e.target.value)}
            />
          </div>
        </div>
      </div>
    </AppModal>
  );
}
