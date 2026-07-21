import { useState, useEffect } from "react";
import { Truck } from "lucide-react";
import { AppModal } from "@/shared/components/AppModal";
import { type Vendor, type VendorStatus } from "../data/mockVendors";
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

type FormData = Omit<Vendor, "id">;

const EMPTY: FormData = {
  vendor_code: "",
  name: "",
  phone: "",
  email: "",
  gst_no: "",
  pan_no: "",
  address: "",
  city: "",
  state: "",
  pincode: "",
  status: "Active",
};

interface VendorModalProps {
  open: boolean;
  onClose: () => void;
  onSave: (data: FormData) => void;
  initial?: Vendor | null;
}

export function VendorModal({ open, onClose, onSave, initial }: VendorModalProps) {
  const [form, setForm] = useState<FormData>(EMPTY);

  useEffect(() => {
    if (open) setForm(initial ? { ...initial } : { ...EMPTY });
  }, [open, initial]);

  function set(key: keyof FormData, value: string) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  function handleSave() {
    if (!form.name.trim() || !form.vendor_code.trim()) return;
    onSave(form);
  }

  const isEdit = !!initial;

  return (
    <AppModal
      open={open}
      onClose={onClose}
      maxWidth="sm:max-w-[560px]"
      headerBg="bg-orange-50"
      icon={
        <div className="h-9 w-9 rounded-full bg-orange-600 flex items-center justify-center shrink-0">
          <Truck className="h-4 w-4 text-white" />
        </div>
      }
      title={isEdit ? "Edit Vendor" : "Add Vendor"}
      subtitle={isEdit ? `Editing ${initial?.name}` : "Create a new vendor profile"}
      primaryLabel={isEdit ? "Save Changes" : "Add Vendor"}
      onPrimary={handleSave}
    >
      <div className="px-6 pt-4 pb-5 space-y-4">
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className={LABEL_CLS}>Vendor Code <span className="text-red-500">*</span></label>
            <input className={INPUT_CLS} placeholder="e.g. VN001" value={form.vendor_code}
              onChange={(e) => set("vendor_code", e.target.value)} />
          </div>
          <div>
            <label className={LABEL_CLS}>Vendor Name <span className="text-red-500">*</span></label>
            <input className={INPUT_CLS} placeholder="Business / supplier name" value={form.name}
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
        <div>
          <label className={LABEL_CLS}>Status</label>
          <Select value={form.status} onValueChange={(v) => set("status", v as VendorStatus)}>
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
