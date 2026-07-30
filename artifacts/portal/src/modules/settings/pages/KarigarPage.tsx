import { useState } from "react";
import { Hammer } from "lucide-react";
import { SettingsTable, type ColumnDef } from "../components/SettingsTable";
import { KarigarProfileModal } from "../components/KarigarProfileModal";
import { mockKarigarProfiles, type KarigarProfile } from "../data/mockKarigarProfiles";
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

export default function KarigarPage() {
  const [data, setData]       = useState<KarigarProfile[]>(mockKarigarProfiles);
  const [open, setOpen]       = useState(false);
  const [editing, setEditing] = useState<KarigarProfile | null>(null);

  const cols: ColumnDef<KarigarProfile>[] = [
    { key: "karigar_code", label: "Code",        render: (r) => <span className="font-mono text-xs text-muted-foreground">{r.karigar_code}</span> },
    { key: "name",         label: "Name",        render: (r) => <span className="font-medium text-foreground">{r.name}</span> },
    { key: "phone",        label: "Phone",       render: (r) => <span className="text-muted-foreground">{r.phone || "—"}</span> },
    { key: "labour_type",  label: "Labour Type", render: (r) => (
      <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[11px] font-medium bg-muted text-foreground border border-border">
        {r.labour_type}
      </span>
    )},
    { key: "address", label: "Address", render: (r) => <span className="text-muted-foreground text-xs max-w-[200px] truncate block">{r.address || "—"}</span> },
    { key: "status",  label: "Status",  render: (r) => <StatusBadge status={r.status} /> },
  ];

  function handleSave(form: Omit<KarigarProfile, "id">) {
    if (editing) {
      setData((prev) => prev.map((k) => k.id === editing.id ? { ...form, id: editing.id } : k));
    } else {
      setData((prev) => [...prev, { ...form, id: crypto.randomUUID() }]);
    }
    setOpen(false); setEditing(null);
  }

  return (
    <div className="w-full">
      <div className="px-6 py-6">
        <SettingsTable
          data={data}
          columns={cols}
          searchKeys={["name", "karigar_code", "phone"]}
          addLabel="Add Karigar"
          onAdd={() => { setEditing(null); setOpen(true); }}
          onEdit={(r) => { setEditing(r); setOpen(true); }}
          onDelete={(id) => setData((prev) => prev.filter((k) => k.id !== id))}
        />
        <KarigarProfileModal
          open={open}
          onClose={() => { setOpen(false); setEditing(null); }}
          onSave={handleSave}
          initial={editing}
        />
      </div>
    </div>
  );
}
