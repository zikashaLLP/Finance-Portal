import { useState, useEffect } from "react";
import { Shield } from "lucide-react";
import { AppModal } from "@/shared/components/AppModal";
import { type Role } from "../data/mockTeamSettings";

const INPUT_CLS =
  "w-full h-9 px-3 rounded-lg border border-border bg-background text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-foreground/10 focus:border-foreground/30 transition";
const TEXTAREA_CLS =
  "w-full px-3 py-2 rounded-lg border border-border bg-background text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-foreground/10 focus:border-foreground/30 transition resize-none";
const LABEL_CLS = "block text-xs font-medium text-muted-foreground mb-1";

type FormData = Omit<Role, "id" | "created_at" | "updated_at">;

const EMPTY: FormData = { role_name: "", description: "" };

interface RoleModalProps {
  open: boolean;
  onClose: () => void;
  onSave: (data: FormData) => void;
  initial?: Role | null;
}

export function RoleModal({ open, onClose, onSave, initial }: RoleModalProps) {
  const [form, setForm] = useState<FormData>(EMPTY);

  useEffect(() => {
    if (open) setForm(initial ? { role_name: initial.role_name, description: initial.description } : { ...EMPTY });
  }, [open, initial]);

  function set(key: keyof FormData, value: string) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  function handleSave() {
    if (!form.role_name.trim()) return;
    onSave(form);
  }

  const isEdit = !!initial;

  return (
    <AppModal
      open={open} onClose={onClose} maxWidth="sm:max-w-[460px]"
      headerBg="bg-purple-50"
      icon={<div className="h-9 w-9 rounded-full bg-purple-600 flex items-center justify-center shrink-0"><Shield className="h-4 w-4 text-white" /></div>}
      title={isEdit ? "Edit Role" : "Add Role"}
      subtitle={isEdit ? `Editing ${initial?.role_name}` : "Create a new access role"}
      primaryLabel={isEdit ? "Save Changes" : "Add Role"}
      onPrimary={handleSave}
    >
      <div className="px-6 pt-4 pb-5 space-y-4">
        <div>
          <label className={LABEL_CLS}>Role Name <span className="text-red-500">*</span></label>
          <input className={INPUT_CLS} placeholder="e.g. Admin, Sales, Accounts…" value={form.role_name}
            onChange={(e) => set("role_name", e.target.value)} />
        </div>
        <div>
          <label className={LABEL_CLS}>Description</label>
          <textarea className={TEXTAREA_CLS} rows={3} placeholder="Brief description of what this role can access…"
            value={form.description} onChange={(e) => set("description", e.target.value)} />
        </div>
      </div>
    </AppModal>
  );
}
