import { useState, useEffect } from "react";
import { Users } from "lucide-react";
import { AppModal } from "@/shared/components/AppModal";
import { type Client, type ClientStatus } from "../data/mockClients";
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

type FormData = Omit<Client, "id">;

const EMPTY: FormData = {
  client_code: "",
  name: "",
  phone: "",
  email: "",
  birth_date: "",
  anniversary_date: "",
  spouse_name: "",
  occupation: "",
  company: "",
  gst_no: "",
  pan_no: "",
  address: "",
  city: "",
  state: "",
  pincode: "",
  credit_limit: 0,
  is_premium_client: false,
  status: "Active",
};

interface ClientModalProps {
  open: boolean;
  onClose: () => void;
  onSave: (data: FormData) => void;
  initial?: Client | null;
}

export function ClientModal({ open, onClose, onSave, initial }: ClientModalProps) {
  const [form, setForm] = useState<FormData>(EMPTY);

  useEffect(() => {
    if (open) setForm(initial ? { ...initial } : { ...EMPTY });
  }, [open, initial]);

  function set(key: keyof FormData, value: string | number | boolean) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  function handleSave() {
    if (!form.name.trim() || !form.client_code.trim()) return;
    onSave(form);
  }

  const isEdit = !!initial;

  return (
    <AppModal
      open={open}
      onClose={onClose}
      maxWidth="sm:max-w-[620px]"
      headerBg="bg-emerald-50"
      icon={
        <div className="h-9 w-9 rounded-full bg-emerald-600 flex items-center justify-center shrink-0">
          <Users className="h-4 w-4 text-white" />
        </div>
      }
      title={isEdit ? "Edit Client" : "Add Client"}
      subtitle={isEdit ? `Editing ${initial?.name}` : "Create a new client profile"}
      primaryLabel={isEdit ? "Save Changes" : "Add Client"}
      onPrimary={handleSave}
    >
      <div className="px-6 pt-4 pb-5 space-y-4 max-h-[60vh] overflow-y-auto">
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className={LABEL_CLS}>Client Code <span className="text-red-500">*</span></label>
            <input className={INPUT_CLS} placeholder="e.g. CL001" value={form.client_code}
              onChange={(e) => set("client_code", e.target.value)} />
          </div>
          <div>
            <label className={LABEL_CLS}>Full Name <span className="text-red-500">*</span></label>
            <input className={INPUT_CLS} placeholder="Client full name" value={form.name}
              onChange={(e) => set("name", e.target.value)} />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className={LABEL_CLS}>Phone</label>
            <input className={INPUT_CLS} type="tel" placeholder="Phone number" value={form.phone}
              onChange={(e) => set("phone", e.target.value)} />
          </div>
          <div>
            <label className={LABEL_CLS}>Email</label>
            <input className={INPUT_CLS} type="email" placeholder="Email address" value={form.email}
              onChange={(e) => set("email", e.target.value)} />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className={LABEL_CLS}>Date of Birth</label>
            <input className={INPUT_CLS} type="date" value={form.birth_date}
              onChange={(e) => set("birth_date", e.target.value)} />
          </div>
          <div>
            <label className={LABEL_CLS}>Anniversary Date</label>
            <input className={INPUT_CLS} type="date" value={form.anniversary_date}
              onChange={(e) => set("anniversary_date", e.target.value)} />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className={LABEL_CLS}>Spouse Name</label>
            <input className={INPUT_CLS} placeholder="Spouse full name" value={form.spouse_name}
              onChange={(e) => set("spouse_name", e.target.value)} />
          </div>
          <div>
            <label className={LABEL_CLS}>Occupation</label>
            <input className={INPUT_CLS} placeholder="Occupation" value={form.occupation}
              onChange={(e) => set("occupation", e.target.value)} />
          </div>
        </div>
        <div>
          <label className={LABEL_CLS}>Company</label>
          <input className={INPUT_CLS} placeholder="Company name" value={form.company}
            onChange={(e) => set("company", e.target.value)} />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className={LABEL_CLS}>GST No.</label>
            <input className={INPUT_CLS} placeholder="GST number" value={form.gst_no}
              onChange={(e) => set("gst_no", e.target.value)} />
          </div>
          <div>
            <label className={LABEL_CLS}>PAN No.</label>
            <input className={INPUT_CLS} placeholder="PAN number" value={form.pan_no}
              onChange={(e) => set("pan_no", e.target.value)} />
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
            <label className={LABEL_CLS}>Credit Limit (₹)</label>
            <input className={INPUT_CLS} type="number" placeholder="0" value={form.credit_limit || ""}
              onChange={(e) => set("credit_limit", Number(e.target.value))} />
          </div>
          <div>
            <label className={LABEL_CLS}>Status</label>
            <Select value={form.status} onValueChange={(v) => set("status", v as ClientStatus)}>
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
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="is_premium"
            checked={form.is_premium_client}
            onChange={(e) => set("is_premium_client", e.target.checked)}
            className="h-4 w-4 rounded border-border accent-foreground"
          />
          <label htmlFor="is_premium" className="text-sm text-foreground cursor-pointer select-none">
            Mark as Premium Client
          </label>
        </div>
      </div>
    </AppModal>
  );
}
