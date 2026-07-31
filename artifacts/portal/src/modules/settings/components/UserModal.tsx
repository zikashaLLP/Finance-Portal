import { useState, useEffect } from "react";
import { UserPlus, Eye, EyeOff } from "lucide-react";
import { AppModal } from "@/shared/components/AppModal";
import { type User, type UserStatus, type Role } from "../data/mockTeamSettings";
import { type Branch } from "../data/mockBranches";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const INPUT_CLS =
  "w-full h-9 px-3 rounded-lg border border-border bg-background text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-foreground/10 focus:border-foreground/30 transition";
const LABEL_CLS = "block text-xs font-medium text-muted-foreground mb-1";
const SECTION_CLS = "text-[11px] font-semibold text-muted-foreground uppercase tracking-wider pt-1 pb-0.5 border-b border-border";

type FormData = Omit<User, "id" | "last_login" | "created_at" | "updated_at">;

const EMPTY: FormData = {
  username: "", password: "", full_name: "", email: "", phone: "",
  role_id: "", branch_id: "", status: "Active",
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
  const [showPwd, setShowPwd] = useState(false);

  useEffect(() => {
    if (open) {
      setShowPwd(false);
      setForm(initial ? {
        username: initial.username, password: initial.password,
        full_name: initial.full_name, email: initial.email, phone: initial.phone,
        role_id: initial.role_id, branch_id: initial.branch_id, status: initial.status,
      } : { ...EMPTY });
    }
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
      open={open} onClose={onClose} maxWidth="sm:max-w-[560px]"
      headerBg="bg-indigo-50"
      icon={<div className="h-9 w-9 rounded-full bg-indigo-600 flex items-center justify-center shrink-0"><UserPlus className="h-4 w-4 text-white" /></div>}
      title={isEdit ? "Edit User" : "Add User"}
      subtitle={isEdit ? `Editing ${initial?.full_name}` : "Create a new user account"}
      primaryLabel={isEdit ? "Save Changes" : "Add User"}
      onPrimary={handleSave}
    >
      <div className="px-6 pt-4 pb-5 space-y-4 max-h-[65vh] overflow-y-auto">

        {/* Account */}
        <p className={SECTION_CLS}>Account</p>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className={LABEL_CLS}>Username <span className="text-red-500">*</span></label>
            <input className={INPUT_CLS} placeholder="Login username" value={form.username}
              onChange={(e) => set("username", e.target.value)} />
          </div>
          <div>
            <label className={LABEL_CLS}>Password {!isEdit && <span className="text-red-500">*</span>}</label>
            <div className="relative">
              <input
                className={INPUT_CLS + " pr-9"}
                type={showPwd ? "text" : "password"}
                placeholder={isEdit ? "Leave blank to keep current" : "Set password"}
                value={form.password}
                onChange={(e) => set("password", e.target.value)}
              />
              <button type="button" onClick={() => setShowPwd((v) => !v)}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors">
                {showPwd ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>
        </div>

        {/* Personal */}
        <p className={SECTION_CLS}>Personal Info</p>
        <div>
          <label className={LABEL_CLS}>Full Name <span className="text-red-500">*</span></label>
          <input className={INPUT_CLS} placeholder="Full name" value={form.full_name}
            onChange={(e) => set("full_name", e.target.value)} />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className={LABEL_CLS}>Email</label>
            <input className={INPUT_CLS} type="email" placeholder="Email address" value={form.email}
              onChange={(e) => set("email", e.target.value)} />
          </div>
          <div>
            <label className={LABEL_CLS}>Phone</label>
            <input className={INPUT_CLS} type="tel" placeholder="Phone number" value={form.phone}
              onChange={(e) => set("phone", e.target.value)} />
          </div>
        </div>

        {/* Access */}
        <p className={SECTION_CLS}>Access</p>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className={LABEL_CLS}>Role <span className="text-red-500">*</span></label>
            <Select value={form.role_id} onValueChange={(v) => set("role_id", v)}>
              <SelectTrigger className="h-9 rounded-lg border-border text-sm"><SelectValue placeholder="Select role" /></SelectTrigger>
              <SelectContent>
                {roles.map((r) => <SelectItem key={r.id} value={r.id}>{r.role_name}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>
          <div>
            <label className={LABEL_CLS}>Branch</label>
            <Select value={form.branch_id} onValueChange={(v) => set("branch_id", v)}>
              <SelectTrigger className="h-9 rounded-lg border-border text-sm"><SelectValue placeholder="Select branch" /></SelectTrigger>
              <SelectContent>
                {branches.map((b) => <SelectItem key={b.id} value={b.id}>{b.name}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>
        </div>
        <div>
          <label className={LABEL_CLS}>Status</label>
          <Select value={form.status} onValueChange={(v) => set("status", v as UserStatus)}>
            <SelectTrigger className="h-9 rounded-lg border-border text-sm"><SelectValue /></SelectTrigger>
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
