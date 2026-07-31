import { useState, useEffect } from "react";
import { Gem } from "lucide-react";
import { AppModal } from "@/shared/components/AppModal";
import { type DiamondQualityItem, type DiamondQualityType } from "../data/mockGeneralMasters";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";

const INPUT_CLS =
  "w-full h-9 px-3 rounded-lg border border-border bg-background text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-foreground/10 focus:border-foreground/30 transition";
const LABEL_CLS = "block text-xs font-medium text-muted-foreground mb-1";

type FormData = Omit<DiamondQualityItem, "id" | "created_at" | "updated_at">;

const EMPTY: FormData = {
  quality_name: "",
  description:  "",
  type:         "Parcel",
  status:       "Active",
};

interface DiamondQualityModalProps {
  open:     boolean;
  onClose:  () => void;
  onSave:   (data: FormData) => void;
  initial?: DiamondQualityItem | null;
}

export function DiamondQualityModal({ open, onClose, onSave, initial }: DiamondQualityModalProps) {
  const [form, setForm] = useState<FormData>(EMPTY);

  useEffect(() => {
    if (open) {
      setForm(initial
        ? { quality_name: initial.quality_name, description: initial.description, type: initial.type, status: initial.status }
        : { ...EMPTY });
    }
  }, [open, initial]);

  function set<K extends keyof FormData>(key: K, value: FormData[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  function handleSave() {
    if (!form.quality_name.trim()) return;
    onSave(form);
  }

  const isEdit = !!initial;

  return (
    <AppModal
      open={open}
      onClose={onClose}
      maxWidth="sm:max-w-[500px]"
      headerBg="bg-sky-50"
      icon={
        <div className="h-9 w-9 rounded-full bg-sky-600 flex items-center justify-center shrink-0">
          <Gem className="h-4 w-4 text-white" />
        </div>
      }
      title={isEdit ? "Edit Diamond Quality" : "Add Diamond Quality"}
      subtitle={isEdit ? `Editing ${initial?.quality_name}` : "Define a new diamond quality grade"}
      primaryLabel={isEdit ? "Save Changes" : "Add Quality"}
      onPrimary={handleSave}
    >
      <div className="px-6 pt-4 pb-5 space-y-4">

        {/* Quality Name + Type */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className={LABEL_CLS}>Quality Name <span className="text-red-500">*</span></label>
            <input
              className={INPUT_CLS}
              placeholder="e.g. VVS1, SI2, 1D, CVD"
              value={form.quality_name}
              onChange={(e) => set("quality_name", e.target.value)}
              autoFocus
            />
          </div>
          <div>
            <label className={LABEL_CLS}>Type <span className="text-red-500">*</span></label>
            <Select value={form.type} onValueChange={(v) => set("type", v as DiamondQualityType)}>
              <SelectTrigger className="h-9 rounded-lg border-border text-sm">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Parcel">Parcel</SelectItem>
                <SelectItem value="Solitaire">Solitaire</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Description */}
        <div>
          <label className={LABEL_CLS}>Description</label>
          <textarea
            className="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-foreground/10 focus:border-foreground/30 transition resize-none"
            rows={3}
            placeholder="Describe this diamond quality grade…"
            value={form.description}
            onChange={(e) => set("description", e.target.value)}
          />
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
              <SelectItem value="Deactive">Deactive</SelectItem>
            </SelectContent>
          </Select>
        </div>

      </div>
    </AppModal>
  );
}
