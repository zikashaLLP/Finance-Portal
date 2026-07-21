import { useState, useEffect } from "react";
import { Hammer } from "lucide-react";
import { AppModal } from "@/shared/components/AppModal";
import {
  type KarigarProfile,
  type LabourType,
  type KarigarStatus,
  LABOUR_TYPES,
} from "../data/mockKarigarProfiles";
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

type FormData = Omit<KarigarProfile, "id">;

const EMPTY: FormData = {
  karigar_code: "",
  name: "",
  phone: "",
  address: "",
  labour_type: "Per Gram",
  status: "Active",
};

interface KarigarProfileModalProps {
  open: boolean;
  onClose: () => void;
  onSave: (data: FormData) => void;
  initial?: KarigarProfile | null;
}

export function KarigarProfileModal({ open, onClose, onSave, initial }: KarigarProfileModalProps) {
  const [form, setForm] = useState<FormData>(EMPTY);

  useEffect(() => {
    if (open) setForm(initial ? { ...initial } : { ...EMPTY });
  }, [open, initial]);

  function set(key: keyof FormData, value: string) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  function handleSave() {
    if (!form.name.trim() || !form.karigar_code.trim()) return;
    onSave(form);
  }

  const isEdit = !!initial;

  return (
    <AppModal
      open={open}
      onClose={onClose}
      maxWidth="sm:max-w-[500px]"
      headerBg="bg-amber-50"
      icon={
        <div className="h-9 w-9 rounded-full bg-amber-600 flex items-center justify-center shrink-0">
          <Hammer className="h-4 w-4 text-white" />
        </div>
      }
      title={isEdit ? "Edit Karigar Profile" : "Add Karigar Profile"}
      subtitle={isEdit ? `Editing ${initial?.name}` : "Create a karigar profile record"}
      primaryLabel={isEdit ? "Save Changes" : "Add Karigar"}
      onPrimary={handleSave}
    >
      <div className="px-6 pt-4 pb-5 space-y-4">
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className={LABEL_CLS}>Karigar Code <span className="text-red-500">*</span></label>
            <input className={INPUT_CLS} placeholder="e.g. KG001" value={form.karigar_code}
              onChange={(e) => set("karigar_code", e.target.value)} />
          </div>
          <div>
            <label className={LABEL_CLS}>Full Name <span className="text-red-500">*</span></label>
            <input className={INPUT_CLS} placeholder="Karigar full name" value={form.name}
              onChange={(e) => set("name", e.target.value)} />
          </div>
        </div>
        <div>
          <label className={LABEL_CLS}>Phone</label>
          <input className={INPUT_CLS} type="tel" placeholder="Phone number" value={form.phone}
            onChange={(e) => set("phone", e.target.value)} />
        </div>
        <div>
          <label className={LABEL_CLS}>Address</label>
          <input className={INPUT_CLS} placeholder="Full address" value={form.address}
            onChange={(e) => set("address", e.target.value)} />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className={LABEL_CLS}>Labour Type</label>
            <Select value={form.labour_type} onValueChange={(v) => set("labour_type", v as LabourType)}>
              <SelectTrigger className="h-9 rounded-lg border-border text-sm">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {LABOUR_TYPES.map((t) => (
                  <SelectItem key={t} value={t}>{t}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <label className={LABEL_CLS}>Status</label>
            <Select value={form.status} onValueChange={(v) => set("status", v as KarigarStatus)}>
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
      </div>
    </AppModal>
  );
}
