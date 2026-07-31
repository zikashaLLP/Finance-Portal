import { useState } from "react";
import { Hammer } from "lucide-react";
import { SettingsTable, type ColumnDef } from "../components/SettingsTable";
import { KarigarProfileModal } from "../components/KarigarProfileModal";
import { KarigarViewModal } from "../components/KarigarViewModal";
import { mockKarigarProfiles, type KarigarProfile } from "../data/mockKarigarProfiles";
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

export default function KarigarPage() {
  const [data, setData]       = useState<KarigarProfile[]>(mockKarigarProfiles);
  const [open, setOpen]       = useState(false);
  const [editing, setEditing] = useState<KarigarProfile | null>(null);
  const [viewing, setViewing] = useState<KarigarProfile | null>(null);

  const cols: ColumnDef<KarigarProfile>[] = [
    { key: "karigar_code", label: "Code",  render: (r) => <span className="font-mono text-xs text-muted-foreground">{r.karigar_code}</span> },
    { key: "name",         label: "Name",  render: (r) => (
      <div className="flex items-center gap-2">
        <div className="h-7 w-7 rounded-full bg-amber-600 flex items-center justify-center text-[10px] font-bold text-white shrink-0">
          {r.name.charAt(0)}
        </div>
        <span className="font-medium text-foreground">{r.name}</span>
      </div>
    )},
    { key: "phone",       label: "Phone",       render: (r) => <span className="text-muted-foreground">{r.phone || "—"}</span> },
    { key: "labour_type", label: "Labour Type", render: (r) => (
      <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[11px] font-medium bg-amber-50 text-amber-700 border border-amber-200">
        {r.labour_type}
      </span>
    )},
    { key: "status", label: "Status", render: (r) => <StatusBadge status={r.status} /> },
  ];

  type FormData = Omit<KarigarProfile, "id" | "created_at" | "updated_at">;
  function handleSave(form: FormData) {
    const now = new Date().toISOString();
    if (editing) {
      setData((prev) => prev.map((k) => k.id === editing.id
        ? { ...form, id: editing.id, created_at: editing.created_at, updated_at: now }
        : k));
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
          searchKeys={["name", "karigar_code", "phone"]}
          addLabel="Add Karigar"
          onAdd={() => { setEditing(null); setOpen(true); }}
          onEdit={(r) => { setEditing(r); setOpen(true); }}
          onDelete={(id) => setData((prev) => prev.filter((k) => k.id !== id))}
          onView={(r) => setViewing(r)}
        />
        <KarigarProfileModal
          open={open}
          onClose={() => { setOpen(false); setEditing(null); }}
          onSave={handleSave}
          initial={editing}
        />
        <KarigarViewModal
          open={viewing !== null}
          onClose={() => setViewing(null)}
          karigar={viewing}
        />
      </div>
    </div>
  );
}
