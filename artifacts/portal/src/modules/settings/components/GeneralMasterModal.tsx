import { useState, useEffect } from "react";
import { Tag } from "lucide-react";
import { AppModal } from "@/shared/components/AppModal";
import { type GeneralMasterItem } from "../data/mockGeneralMasters";
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

type FormData = Omit<GeneralMasterItem, "id">;

const EMPTY: FormData = {
  name: "",
  code: "",
  description: "",
  status: "Active",
};

interface GeneralMasterModalProps {
  open: boolean;
  onClose: () => void;
  onSave: (data: FormData) => void;
  initial?: GeneralMasterItem | null;
  entityLabel: string;
  headerBg?: string;
  iconBg?: string;
}

export function GeneralMasterModal({
  open,
  onClose,
  onSave,
  initial,
  entityLabel,
  headerBg = "bg-violet-50",
  iconBg = "bg-violet-600",
}: GeneralMasterModalProps) {
  const [form, setForm] = useState<FormData>(EMPTY);

  useEffect(() => {
    if (open) setForm(initial ? { ...initial } : { ...EMPTY });
  }, [open, initial]);

  function set(key: keyof FormData, value: string) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  function handleSave() {
    if (!form.name.trim()) return;
    onSave(form);
  }

  const isEdit = !!initial;

  return (
    <AppModal
      open={open}
      onClose={onClose}
      maxWidth="sm:max-w-[460px]"
      headerBg={headerBg}
      icon={
        <div className={`h-9 w-9 rounded-full ${iconBg} flex items-center justify-center shrink-0`}>
          <Tag className="h-4 w-4 text-white" />
        </div>
      }
      title={isEdit ? `Edit ${entityLabel}` : `Add ${entityLabel}`}
      subtitle={isEdit ? `Editing ${initial?.name}` : `Create a new ${entityLabel.toLowerCase()}`}
      primaryLabel={isEdit ? "Save Changes" : `Add ${entityLabel}`}
      onPrimary={handleSave}
    >
      <div className="px-6 pt-4 pb-5 space-y-4">
        <div>
          <label className={LABEL_CLS}>Name <span className="text-red-500">*</span></label>
          <input className={INPUT_CLS} placeholder={`${entityLabel} name`} value={form.name}
            onChange={(e) => set("name", e.target.value)} />
        </div>
        <div>
          <label className={LABEL_CLS}>Code</label>
          <input className={INPUT_CLS} placeholder="Short code (e.g. NEC)" value={form.code}
            onChange={(e) => set("code", e.target.value)} />
        </div>
        <div>
          <label className={LABEL_CLS}>Description</label>
          <input className={INPUT_CLS} placeholder="Brief description" value={form.description}
            onChange={(e) => set("description", e.target.value)} />
        </div>
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
