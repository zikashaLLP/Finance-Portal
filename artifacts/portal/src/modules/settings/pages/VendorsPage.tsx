import { useState } from "react";
import { Truck } from "lucide-react";
import { SettingsTable, type ColumnDef } from "../components/SettingsTable";
import { VendorModal } from "../components/VendorModal";
import { mockVendors, type Vendor } from "../data/mockVendors";
import { cn } from "@/lib/utils";

function StatusBadge({ status }: { status: string }) {
  const isActive = status === "Active";
  return (
    <span
      className={cn(
        "inline-flex items-center px-2 py-0.5 rounded-md text-[11px] font-semibold",
        isActive
          ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
          : "bg-muted text-muted-foreground border border-border"
      )}
    >
      {status}
    </span>
  );
}

export default function VendorsPage() {
  const [data, setData]       = useState<Vendor[]>(mockVendors);
  const [open, setOpen]       = useState(false);
  const [editing, setEditing] = useState<Vendor | null>(null);

  const cols: ColumnDef<Vendor>[] = [
    { key: "vendor_code", label: "Code",    render: (r) => <span className="font-mono text-xs text-muted-foreground">{r.vendor_code}</span> },
    { key: "name",        label: "Name",    render: (r) => <span className="font-medium text-foreground">{r.name}</span> },
    { key: "phone",       label: "Phone",   render: (r) => <span className="text-muted-foreground">{r.phone || "—"}</span> },
    { key: "email",       label: "Email",   render: (r) => <span className="text-muted-foreground">{r.email || "—"}</span> },
    { key: "city",        label: "City",    render: (r) => <span className="text-muted-foreground">{r.city}</span> },
    { key: "gst_no",      label: "GST No",  render: (r) => <span className="font-mono text-xs text-muted-foreground">{r.gst_no || "—"}</span> },
    { key: "status",      label: "Status",  render: (r) => <StatusBadge status={r.status} /> },
  ];

  function handleSave(form: Omit<Vendor, "id">) {
    if (editing) {
      setData((prev) => prev.map((v) => v.id === editing.id ? { ...form, id: editing.id } : v));
    } else {
      setData((prev) => [...prev, { ...form, id: crypto.randomUUID() }]);
    }
    setOpen(false); setEditing(null);
  }

  return (
    <div className="min-h-screen bg-muted/30">
      <div className="bg-background border-b border-border px-6 py-5">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-orange-600 flex items-center justify-center shrink-0">
            <Truck className="h-5 w-5 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-foreground tracking-tight leading-tight">Vendor Management</h1>
            <p className="text-sm text-muted-foreground mt-0.5">Manage supplier and vendor profiles</p>
          </div>
        </div>
      </div>
      <div className="px-6 py-6">
        <SettingsTable
          data={data}
          columns={cols}
          searchKeys={["name", "vendor_code", "phone", "city"]}
          addLabel="Add Vendor"
          onAdd={() => { setEditing(null); setOpen(true); }}
          onEdit={(r) => { setEditing(r); setOpen(true); }}
          onDelete={(id) => setData((prev) => prev.filter((v) => v.id !== id))}
        />
        <VendorModal
          open={open}
          onClose={() => { setOpen(false); setEditing(null); }}
          onSave={handleSave}
          initial={editing}
        />
      </div>
    </div>
  );
}
