import { useState } from "react";
import { Truck } from "lucide-react";
import { SettingsTable, type ColumnDef } from "../components/SettingsTable";
import { VendorModal } from "../components/VendorModal";
import { VendorViewModal } from "../components/VendorViewModal";
import { mockVendors, type Vendor } from "../data/mockVendors";
import { cn } from "@/lib/utils";

function StatusBadge({ status }: { status: string }) {
  const isActive = status === "Active";
  return (
    <span className={cn(
      "inline-flex items-center px-2 py-0.5 rounded-md text-[11px] font-semibold",
      isActive
        ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
        : "bg-red-50 text-red-600 border border-red-200"
    )}>
      {status}
    </span>
  );
}

export default function VendorsPage() {
  const [data, setData]       = useState<Vendor[]>(mockVendors);
  const [open, setOpen]       = useState(false);
  const [editing, setEditing] = useState<Vendor | null>(null);
  const [viewing, setViewing] = useState<Vendor | null>(null);

  const cols: ColumnDef<Vendor>[] = [
    { key: "vendor_code", label: "Code",   render: (r) => <span className="font-mono text-xs text-muted-foreground">{r.vendor_code}</span> },
    { key: "name",        label: "Name",   render: (r) => (
      <div className="flex items-center gap-2">
        <div className="h-7 w-7 rounded-full bg-blue-600 flex items-center justify-center text-[10px] font-bold text-white shrink-0">
          {r.name.charAt(0)}
        </div>
        <span className="font-medium text-foreground">{r.name}</span>
      </div>
    )},
    { key: "phone",  label: "Phone",  render: (r) => <span className="text-muted-foreground">{r.phone || "—"}</span> },
    { key: "email",  label: "Email",  render: (r) => <span className="text-muted-foreground text-xs">{r.email || "—"}</span> },
    { key: "city",   label: "City",   render: (r) => <span className="text-muted-foreground">{r.city || "—"}</span> },
    { key: "status", label: "Status", render: (r) => <StatusBadge status={r.status} /> },
  ];

  type FormData = Omit<Vendor, "id" | "created_at" | "updated_at">;
  function handleSave(form: FormData) {
    const now = new Date().toISOString();
    if (editing) {
      setData((prev) => prev.map((v) => v.id === editing.id
        ? { ...form, id: editing.id, created_at: editing.created_at, updated_at: now }
        : v));
    } else {
      setData((prev) => [...prev, { ...form, id: crypto.randomUUID(), created_at: now, updated_at: now }]);
    }
    setOpen(false); setEditing(null);
  }

  return (
    <div className="w-full">
      <div className="px-6 py-6">
        <SettingsTable
          data={data}
          columns={cols}
          searchKeys={["name", "vendor_code", "phone", "city"]}
          addLabel="Add Vendor"
          onAdd={() => { setEditing(null); setOpen(true); }}
          onEdit={(r) => { setEditing(r); setOpen(true); }}
          onDelete={(id) => setData((prev) => prev.filter((v) => v.id !== id))}
          onView={(r) => setViewing(r)}
        />
        <VendorModal
          open={open}
          onClose={() => { setOpen(false); setEditing(null); }}
          onSave={handleSave}
          initial={editing}
        />
        <VendorViewModal
          open={viewing !== null}
          onClose={() => setViewing(null)}
          vendor={viewing}
        />
      </div>
    </div>
  );
}
