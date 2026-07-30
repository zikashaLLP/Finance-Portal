import { useState } from "react";
import { Building2 } from "lucide-react";
import { SettingsTable, type ColumnDef } from "../components/SettingsTable";
import { BranchModal } from "../components/BranchModal";
import { mockBranches, type Branch } from "../data/mockBranches";
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

export default function BranchesPage() {
  const [data, setData]       = useState<Branch[]>(mockBranches);
  const [open, setOpen]       = useState(false);
  const [editing, setEditing] = useState<Branch | null>(null);

  const cols: ColumnDef<Branch>[] = [
    { key: "code",   label: "Code",   render: (r) => <span className="font-mono text-xs text-muted-foreground">{r.code}</span> },
    { key: "name",   label: "Name",   render: (r) => <span className="font-medium text-foreground">{r.name}</span> },
    { key: "phone",  label: "Phone",  render: (r) => <span className="text-muted-foreground">{r.phone || "—"}</span> },
    { key: "email",  label: "Email",  render: (r) => <span className="text-muted-foreground">{r.email || "—"}</span> },
    { key: "city",   label: "City",   render: (r) => <span className="text-muted-foreground">{r.city}</span> },
    { key: "state",  label: "State",  render: (r) => <span className="text-muted-foreground">{r.state}</span> },
    { key: "status", label: "Status", render: (r) => <StatusBadge status={r.status} /> },
  ];

  function handleSave(form: Omit<Branch, "id">) {
    if (editing) {
      setData((prev) => prev.map((b) => b.id === editing.id ? { ...form, id: editing.id } : b));
    } else {
      setData((prev) => [...prev, { ...form, id: crypto.randomUUID() }]);
    }
    setOpen(false); setEditing(null);
  }

  return (
    <div className="min-h-screen bg-muted/30">
      <div className="bg-background border-b border-border px-6 py-5">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-blue-600 flex items-center justify-center shrink-0">
            <Building2 className="h-5 w-5 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-foreground tracking-tight leading-tight">Branch Management</h1>
            <p className="text-sm text-muted-foreground mt-0.5">Manage store branches and locations</p>
          </div>
        </div>
      </div>
      <div className="px-6 py-6">
        <SettingsTable
          data={data}
          columns={cols}
          searchKeys={["name", "code", "city", "email"]}
          addLabel="Add Branch"
          onAdd={() => { setEditing(null); setOpen(true); }}
          onEdit={(r) => { setEditing(r); setOpen(true); }}
          onDelete={(id) => setData((prev) => prev.filter((b) => b.id !== id))}
        />
        <BranchModal
          open={open}
          onClose={() => { setOpen(false); setEditing(null); }}
          onSave={handleSave}
          initial={editing}
        />
      </div>
    </div>
  );
}
