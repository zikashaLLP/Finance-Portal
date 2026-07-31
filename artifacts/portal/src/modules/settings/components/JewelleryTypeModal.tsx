import { useState, useEffect } from "react";
import { Tag } from "lucide-react";
import { AppModal } from "@/shared/components/AppModal";
import { type JewelleryTypeItem, type JewelleryCategory } from "../data/mockGeneralMasters";
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

type FormData = Omit<JewelleryTypeItem, "id">;

const EMPTY = (firstCategoryId: string): FormData => ({
  name: "",
  code: "",
  category_id: firstCategoryId,
  description: "",
  status: "Active",
});

interface JewelleryTypeModalProps {
  open: boolean;
  onClose: () => void;
  onSave: (data: FormData) => void;
  initial?: JewelleryTypeItem | null;
  categories: JewelleryCategory[];
}

export function JewelleryTypeModal({
  open,
  onClose,
  onSave,
  initial,
  categories,
}: JewelleryTypeModalProps) {
  const firstCatId = categories[0]?.id ?? "";
  const [form, setForm] = useState<FormData>(EMPTY(firstCatId));

  useEffect(() => {
    if (open) setForm(initial ? { ...initial } : EMPTY(firstCatId));
  }, [open, initial, firstCatId]);

  function set<K extends keyof FormData>(key: K, value: FormData[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  function handleSave() {
    if (!form.name.trim() || !form.category_id) return;
    onSave(form);
  }

  const isEdit = !!initial;

  return (
    <AppModal
      open={open}
      onClose={onClose}
      maxWidth="sm:max-w-[480px]"
      headerBg="bg-fuchsia-50"
      icon={
        <div className="h-9 w-9 rounded-full bg-fuchsia-600 flex items-center justify-center shrink-0">
          <Tag className="h-4 w-4 text-white" />
        </div>
      }
      title={isEdit ? "Edit Jewellery Type" : "Add Jewellery Type"}
      subtitle={isEdit ? `Editing ${initial?.name}` : "Create a new jewellery type"}
      primaryLabel={isEdit ? "Save Changes" : "Add Type"}
      onPrimary={handleSave}
    >
      <div className="px-6 pt-4 pb-5 space-y-4">
        {/* Category */}
        <div>
          <label className={LABEL_CLS}>Category <span className="text-red-500">*</span></label>
          <Select
            value={form.category_id}
            onValueChange={(v) => set("category_id", v)}
          >
            <SelectTrigger className="h-9 rounded-lg border-border text-sm">
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((c) => (
                <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className={LABEL_CLS}>Type Name <span className="text-red-500">*</span></label>
            <input
              className={INPUT_CLS}
              placeholder="e.g. Necklace"
              value={form.name}
              onChange={(e) => set("name", e.target.value)}
            />
          </div>
          <div>
            <label className={LABEL_CLS}>Code</label>
            <input
              className={INPUT_CLS}
              placeholder="e.g. NEC"
              value={form.code}
              onChange={(e) => set("code", e.target.value)}
            />
          </div>
        </div>

        <div>
          <label className={LABEL_CLS}>Description</label>
          <input
            className={INPUT_CLS}
            placeholder="Brief description"
            value={form.description}
            onChange={(e) => set("description", e.target.value)}
          />
        </div>

        <div>
          <label className={LABEL_CLS}>Status</label>
          <Select
            value={form.status}
            onValueChange={(v) => set("status", v as "Active" | "Inactive")}
          >
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
