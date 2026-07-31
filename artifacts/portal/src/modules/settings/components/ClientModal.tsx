import { useState, useEffect } from "react";
import { Users } from "lucide-react";
import { AppModal } from "@/shared/components/AppModal";
import { type Client, type ClientStatus } from "../data/mockClients";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const INPUT_CLS =
  "w-full h-9 px-3 rounded-lg border border-border bg-background text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-foreground/10 focus:border-foreground/30 transition";
const TEXTAREA_CLS =
  "w-full px-3 py-2 rounded-lg border border-border bg-background text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-foreground/10 focus:border-foreground/30 transition resize-none";
const LABEL_CLS = "block text-xs font-medium text-muted-foreground mb-1";
const SECTION_CLS = "text-[11px] font-semibold text-muted-foreground uppercase tracking-wider pt-1 pb-0.5 border-b border-border";

type FormData = Omit<Client, "id" | "created_at" | "updated_at">;

const EMPTY: FormData = {
  client_code: "", name: "", phone: "", email: "",
  birth_date: "", anniversary_date: "", spouse_name: "", spouse_birth_date: "",
  occupation: "", company: "",
  gst_no: "", pan_no: "",
  street_address: "", city: "", state: "", country: "India", pincode: "",
  photo_url: "", notes: "",
  credit_limit: 0, is_premium_client: false, status: "Active",
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
    if (open) setForm(initial ? {
      client_code: initial.client_code, name: initial.name, phone: initial.phone,
      email: initial.email, birth_date: initial.birth_date, anniversary_date: initial.anniversary_date,
      spouse_name: initial.spouse_name, spouse_birth_date: initial.spouse_birth_date,
      occupation: initial.occupation, company: initial.company,
      gst_no: initial.gst_no, pan_no: initial.pan_no,
      street_address: initial.street_address, city: initial.city, state: initial.state,
      country: initial.country, pincode: initial.pincode,
      photo_url: initial.photo_url, notes: initial.notes,
      credit_limit: initial.credit_limit, is_premium_client: initial.is_premium_client,
      status: initial.status,
    } : { ...EMPTY });
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
      open={open} onClose={onClose} maxWidth="sm:max-w-[660px]"
      headerBg="bg-emerald-50"
      icon={<div className="h-9 w-9 rounded-full bg-emerald-600 flex items-center justify-center shrink-0"><Users className="h-4 w-4 text-white" /></div>}
      title={isEdit ? "Edit Client" : "Add Client"}
      subtitle={isEdit ? `Editing ${initial?.name}` : "Create a new client profile"}
      primaryLabel={isEdit ? "Save Changes" : "Add Client"}
      onPrimary={handleSave}
    >
      <div className="px-6 pt-4 pb-5 space-y-4 max-h-[65vh] overflow-y-auto">

        {/* Basic */}
        <p className={SECTION_CLS}>Basic Info</p>
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
            <label className={LABEL_CLS}>Status</label>
            <Select value={form.status} onValueChange={(v) => set("status", v as ClientStatus)}>
              <SelectTrigger className="h-9 rounded-lg border-border text-sm"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="Active">Active</SelectItem>
                <SelectItem value="Deactive">Deactive</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-end pb-1">
            <label className="flex items-center gap-2 cursor-pointer select-none">
              <input type="checkbox" checked={form.is_premium_client}
                onChange={(e) => set("is_premium_client", e.target.checked)}
                className="h-4 w-4 rounded border-border accent-foreground" />
              <span className="text-sm text-foreground">Premium Client</span>
            </label>
          </div>
        </div>

        {/* Personal */}
        <p className={SECTION_CLS}>Personal Details</p>
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
            <label className={LABEL_CLS}>Spouse Date of Birth</label>
            <input className={INPUT_CLS} type="date" value={form.spouse_birth_date}
              onChange={(e) => set("spouse_birth_date", e.target.value)} />
          </div>
        </div>

        {/* Professional */}
        <p className={SECTION_CLS}>Professional</p>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className={LABEL_CLS}>Occupation</label>
            <input className={INPUT_CLS} placeholder="Occupation" value={form.occupation}
              onChange={(e) => set("occupation", e.target.value)} />
          </div>
          <div>
            <label className={LABEL_CLS}>Company</label>
            <input className={INPUT_CLS} placeholder="Company name" value={form.company}
              onChange={(e) => set("company", e.target.value)} />
          </div>
        </div>

        {/* Identity */}
        <p className={SECTION_CLS}>Identity</p>
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

        {/* Address */}
        <p className={SECTION_CLS}>Address</p>
        <div>
          <label className={LABEL_CLS}>Street Address</label>
          <input className={INPUT_CLS} placeholder="Street / Building / Area" value={form.street_address}
            onChange={(e) => set("street_address", e.target.value)} />
        </div>
        <div className="grid grid-cols-2 gap-3">
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
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className={LABEL_CLS}>Country</label>
            <input className={INPUT_CLS} placeholder="Country" value={form.country}
              onChange={(e) => set("country", e.target.value)} />
          </div>
          <div>
            <label className={LABEL_CLS}>Pincode</label>
            <input className={INPUT_CLS} placeholder="Pincode" value={form.pincode}
              onChange={(e) => set("pincode", e.target.value)} />
          </div>
        </div>

        {/* Financial */}
        <p className={SECTION_CLS}>Financial</p>
        <div>
          <label className={LABEL_CLS}>Credit Limit (₹)</label>
          <input className={INPUT_CLS} type="number" min="0" placeholder="0" value={form.credit_limit || ""}
            onChange={(e) => set("credit_limit", Number(e.target.value))} />
        </div>

        {/* Other */}
        <p className={SECTION_CLS}>Other</p>
        <div>
          <label className={LABEL_CLS}>Photo URL</label>
          <input className={INPUT_CLS} type="url" placeholder="https://…" value={form.photo_url}
            onChange={(e) => set("photo_url", e.target.value)} />
        </div>
        <div>
          <label className={LABEL_CLS}>Notes</label>
          <textarea className={TEXTAREA_CLS} rows={3} placeholder="Internal notes about this client…"
            value={form.notes} onChange={(e) => set("notes", e.target.value)} />
        </div>

      </div>
    </AppModal>
  );
}
