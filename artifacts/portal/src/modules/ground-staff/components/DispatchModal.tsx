import { useEffect, useState } from "react";
import { Truck } from "lucide-react";
import { AppModal } from "../../../shared/components/AppModal";
import type { Dispatch, DispatchStatus, ItemType } from "../data/mockGroundStaff";

interface DispatchModalProps {
  open: boolean;
  onClose: () => void;
  onSave: (data: Omit<Dispatch, "id" | "createdAt" | "status"> & { status?: DispatchStatus }) => void;
  initial?: Dispatch | null;
}

const ITEM_TYPES: ItemType[] = ["Jewelry", "Gold", "Silver", "Other"];

const empty = {
  staffName: "",
  itemType: "Jewelry" as ItemType,
  itemDescription: "",
  fromLocation: "",
  toLocation: "",
  recipientName: "",
  notes: "",
};

export default function DispatchModal({ open, onClose, onSave, initial }: DispatchModalProps) {
  const [form, setForm] = useState(empty);

  useEffect(() => {
    if (open) {
      setForm(initial ? {
        staffName: initial.staffName,
        itemType: initial.itemType,
        itemDescription: initial.itemDescription,
        fromLocation: initial.fromLocation,
        toLocation: initial.toLocation,
        recipientName: initial.recipientName,
        notes: initial.notes,
      } : empty);
    }
  }, [open, initial]);

  function field(key: keyof typeof empty) {
    return (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
      setForm((f) => ({ ...f, [key]: e.target.value }));
  }

  function handleSave() {
    if (!form.staffName.trim() || !form.itemDescription.trim() || !form.fromLocation.trim() || !form.toLocation.trim() || !form.recipientName.trim()) return;
    onSave({ ...form, status: initial?.status });
  }

  const inputCls = "w-full h-9 px-3 rounded-lg border border-border bg-background text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-foreground/20 transition";
  const labelCls = "block text-xs font-medium text-muted-foreground mb-1";
  const textareaCls = "w-full px-3 py-2 rounded-lg border border-border bg-background text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-foreground/20 transition resize-none";

  return (
    <AppModal
      open={open}
      onClose={onClose}
      maxWidth="sm:max-w-[520px]"
      headerBg="bg-indigo-50"
      icon={
        <div className="h-9 w-9 rounded-xl bg-indigo-100 flex items-center justify-center shrink-0">
          <Truck className="h-4.5 w-4.5 text-indigo-600 h-[18px] w-[18px]" />
        </div>
      }
      title={initial ? "Edit Dispatch" : "New Dispatch"}
      subtitle={initial ? `Editing record for ${initial.staffName}` : "Create a new delivery or dispatch record"}
      primaryLabel={initial ? "Save Changes" : "Dispatch"}
      onPrimary={handleSave}
    >
      <div className="px-6 pt-4 pb-5 space-y-3.5">
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className={labelCls}>Staff Name *</label>
            <input
              className={inputCls}
              placeholder="e.g. Ramesh Verma"
              value={form.staffName}
              onChange={field("staffName")}
            />
          </div>
          <div>
            <label className={labelCls}>Item Type *</label>
            <select
              className={inputCls}
              value={form.itemType}
              onChange={field("itemType")}
            >
              {ITEM_TYPES.map((t) => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label className={labelCls}>Item Description *</label>
          <textarea
            className={textareaCls}
            rows={2}
            placeholder="Describe the items being dispatched…"
            value={form.itemDescription}
            onChange={field("itemDescription")}
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className={labelCls}>From Location *</label>
            <input
              className={inputCls}
              placeholder="e.g. Main Store, Zaveri Bazaar"
              value={form.fromLocation}
              onChange={field("fromLocation")}
            />
          </div>
          <div>
            <label className={labelCls}>To Location *</label>
            <input
              className={inputCls}
              placeholder="e.g. Client Residence, Juhu"
              value={form.toLocation}
              onChange={field("toLocation")}
            />
          </div>
        </div>

        <div>
          <label className={labelCls}>Recipient Name *</label>
          <input
            className={inputCls}
            placeholder="e.g. Mrs. Anjali Shah"
            value={form.recipientName}
            onChange={field("recipientName")}
          />
        </div>

        <div>
          <label className={labelCls}>Notes</label>
          <textarea
            className={textareaCls}
            rows={2}
            placeholder="Any special instructions or notes…"
            value={form.notes}
            onChange={field("notes")}
          />
        </div>
      </div>
    </AppModal>
  );
}
