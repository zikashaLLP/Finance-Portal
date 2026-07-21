import { useState, useEffect } from "react";
import { Building2 } from "lucide-react";
import { AppModal } from "@/shared/components/AppModal";
import { type Branch, type BranchStatus } from "../data/mockBranches";
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

type FormData = Omit<Branch, "id">;

const EMPTY: FormData = {
  name: "",
  code: "",
  phone: "",
  email: "",
  address: "",
  city: "",
  state: "",
  country: "India",
  pincode: "",
  status: "Active",
};

interface BranchModalProps {
  open: boolean;
  onClose: () => void;
  onSave: (data: FormData) => void;
  initial?: Branch | null;
}

export function BranchModal({ open, onClose, onSave, initial }: BranchModalProps) {
  const [form, setForm] = useState<FormData>(EMPTY);

  useEffect(() => {
    if (open) setForm(initial ? { ...initial } : { ...EMPTY });
  }, [open, initial]);

  function set(key: keyof FormData, value: string) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  function handleSave() {
    if (!form.name.trim() || !form.code.trim()) return;
    onSave(form);
  }

  const isEdit = !!initial;

  return (
    <AppModal
      open={open}
      onClose={onClose}
      maxWidth="sm:max-w-[560px]"
      headerBg="bg-blue-50"
      icon={
        <div className="h-9 w-9 rounded-full bg-blue-600 flex items-center justify-center shrink-0">
          <Building2 className="h-4 w-4 text-white" />
        </div>
      }
      title={isEdit ? "Edit Branch" : "Add Branch"}
      subtitle={isEdit ? `Editing ${initial?.name}` : "Create a new branch location"}
      primaryLabel={isEdit ? "Save Changes" : "Add Branch"}
      onPrimary={handleSave}
    >
      <div className="px-6 pt-4 pb-5 space-y-4">
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className={LABEL_CLS}>Branch Name <span className="text-red-500">*</span></label>
            <input className={INPUT_CLS} placeholder="e.g. Main Showroom" value={form.name}
              onChange={(e) => set("name", e.target.value)} />
          </div>
          <div>
            <label className={LABEL_CLS}>Branch Code <span className="text-red-500">*</span></label>
            <input className={INPUT_CLS} placeholder="e.g. BR001" value={form.code}
              onChange={(e) => set("code", e.target.value)} />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className={LABEL_CLS}>Phone</label>
            <input className={INPUT_CLS} placeholder="Phone number" type="tel" value={form.phone}
              onChange={(e) => set("phone", e.target.value)} />
          </div>
          <div>
            <label className={LABEL_CLS}>Email</label>
            <input className={INPUT_CLS} placeholder="branch@example.com" type="email" value={form.email}
              onChange={(e) => set("email", e.target.value)} />
          </div>
        </div>
        <div>
          <label className={LABEL_CLS}>Address</label>
          <input className={INPUT_CLS} placeholder="Street / Building" value={form.address}
            onChange={(e) => set("address", e.target.value)} />
        </div>
        <div className="grid grid-cols-3 gap-3">
          <div>
            <label className={LABEL_CLS}>City</label>
            <input className={INPUT_CLS} placeholder="City" value={form.city}
              onChange={(e) => set("city", e.target.value)} />
          </div>
          <div>
            <label className={LABEL_CLS}>State</label>
            <input className={INPUT_CLS} placeholder="State" value={form.state}
              onChange={(e) => set("state", e.target.value)} />
          </div>
          <div>
            <label className={LABEL_CLS}>Pincode</label>
            <input className={INPUT_CLS} placeholder="Pincode" value={form.pincode}
              onChange={(e) => set("pincode", e.target.value)} />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className={LABEL_CLS}>Country</label>
            <input className={INPUT_CLS} placeholder="Country" value={form.country}
              onChange={(e) => set("country", e.target.value)} />
          </div>
          <div>
            <label className={LABEL_CLS}>Status</label>
            <Select value={form.status} onValueChange={(v) => set("status", v as BranchStatus)}>
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
