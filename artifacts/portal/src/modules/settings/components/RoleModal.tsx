import { useState, useEffect } from "react";
import { Shield } from "lucide-react";
import { AppModal } from "@/shared/components/AppModal";
import { type Role } from "../data/mockTeamSettings";
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

type FormData = Omit<Role, "id">;

const EMPTY: FormData = {
  name: "",
  description: "",
  permissions: "",
  status: "Active",
};

interface RoleModalProps {
  open: boolean;
  onClose: () => void;
  onSave: (data: FormData) => void;
  initial?: Role | null;
}

export function RoleModal({ open, onClose, onSave, initial }: RoleModalProps) {
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
      headerBg="bg-purple-50"
      icon={
        <div className="h-9 w-9 rounded-full bg-purple-600 flex items-center justify-center shrink-0">
          <Shield className="h-4 w-4 text-white" />
        </div>
      }
      title={isEdit ? "Edit Role" : "Add Role"}
      subtitle={isEdit ? `Editing ${initial?.name}` : "Create a new access role"}
      primaryLabel={isEdit ? "Save Changes" : "Add Role"}
      onPrimary={handleSave}
    >
      <div className="px-6 pt-4 pb-5 space-y-4">
        <div>
          <label className={LABEL_CLS}>Role Name <span className="text-red-500">*</span></label>
          <input className={INPUT_CLS} placeholder="e.g. Accounts Team" value={form.name}
            onChange={(e) => set("name", e.target.value)} />
        </div>
        <div>
          <label className={LABEL_CLS}>Description</label>
          <input className={INPUT_CLS} placeholder="Brief description of this role" value={form.description}
            onChange={(e) => set("description", e.target.value)} />
        </div>
        <div>
          <label className={LABEL_CLS}>Permissions (modules)</label>
          <input className={INPUT_CLS} placeholder="e.g. Transactions, Gold, Reports" value={form.permissions}
            onChange={(e) => set("permissions", e.target.value)} />
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
