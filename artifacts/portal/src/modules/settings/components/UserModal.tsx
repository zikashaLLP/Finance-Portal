import { useState, useEffect } from "react";
import { UserPlus } from "lucide-react";
import { AppModal } from "@/shared/components/AppModal";
import { type User, type Role } from "../data/mockTeamSettings";
import { type Branch } from "../data/mockBranches";
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

type FormData = Omit<User, "id">;

const EMPTY: FormData = {
  full_name: "",
  username: "",
  email: "",
  role_id: "",
  branch_id: "",
  status: "Active",
};

interface UserModalProps {
  open: boolean;
  onClose: () => void;
  onSave: (data: FormData) => void;
  initial?: User | null;
  roles: Role[];
  branches: Branch[];
}

export function UserModal({ open, onClose, onSave, initial, roles, branches }: UserModalProps) {
  const [form, setForm] = useState<FormData>(EMPTY);

  useEffect(() => {
    if (open) setForm(initial ? { ...initial } : { ...EMPTY });
  }, [open, initial]);

  function set(key: keyof FormData, value: string) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  function handleSave() {
    if (!form.full_name.trim() || !form.username.trim() || !form.role_id) return;
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
          <UserPlus className="h-4 w-4 text-white" />
        </div>
      }
      title={isEdit ? "Edit User" : "Add User"}
      subtitle={isEdit ? `Editing ${initial?.full_name}` : "Create a new user account"}
      primaryLabel={isEdit ? "Save Changes" : "Add User"}
      onPrimary={handleSave}
    >
      <div className="px-6 pt-4 pb-5 space-y-4">
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className={LABEL_CLS}>Full Name <span className="text-red-500">*</span></label>
            <input className={INPUT_CLS} placeholder="Full name" value={form.full_name}
              onChange={(e) => set("full_name", e.target.value)} />
          </div>
          <div>
            <label className={LABEL_CLS}>Username <span className="text-red-500">*</span></label>
            <input className={INPUT_CLS} placeholder="Login username" value={form.username}
              onChange={(e) => set("username", e.target.value)} />
          </div>
        </div>
        <div>
          <label className={LABEL_CLS}>Email</label>
          <input className={INPUT_CLS} type="email" placeholder="Email address" value={form.email}
            onChange={(e) => set("email", e.target.value)} />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className={LABEL_CLS}>Role <span className="text-red-500">*</span></label>
            <Select value={form.role_id} onValueChange={(v) => set("role_id", v)}>
              <SelectTrigger className="h-9 rounded-lg border-border text-sm">
                <SelectValue placeholder="Select role" />
              </SelectTrigger>
              <SelectContent>
                {roles.map((r) => (
                  <SelectItem key={r.id} value={r.id}>{r.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <label className={LABEL_CLS}>Branch</label>
            <Select value={form.branch_id} onValueChange={(v) => set("branch_id", v)}>
              <SelectTrigger className="h-9 rounded-lg border-border text-sm">
                <SelectValue placeholder="Select branch" />
              </SelectTrigger>
              <SelectContent>
                {branches.map((b) => (
                  <SelectItem key={b.id} value={b.id}>{b.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
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
