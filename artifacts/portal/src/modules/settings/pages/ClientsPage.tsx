import { useState } from "react";
import { Users } from "lucide-react";
import { SettingsTable, type ColumnDef } from "../components/SettingsTable";
import { ClientModal } from "../components/ClientModal";
import { mockClients, type Client } from "../data/mockClients";
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

export default function ClientsPage() {
  const [data, setData]       = useState<Client[]>(mockClients);
  const [open, setOpen]       = useState(false);
  const [editing, setEditing] = useState<Client | null>(null);

  const cols: ColumnDef<Client>[] = [
    { key: "client_code", label: "Code", render: (r) => <span className="font-mono text-xs text-muted-foreground">{r.client_code}</span> },
    { key: "name", label: "Name", render: (r) => (
      <div className="flex items-center gap-2">
        <div className="h-7 w-7 rounded-lg bg-foreground flex items-center justify-center text-[10px] font-bold text-background shrink-0">
          {r.name.charAt(0)}
        </div>
        <span className="font-medium text-foreground">{r.name}</span>
      </div>
    )},
    { key: "phone",             label: "Phone",   render: (r) => <span className="text-muted-foreground">{r.phone || "—"}</span> },
    { key: "city",              label: "City",    render: (r) => <span className="text-muted-foreground">{r.city}</span> },
    { key: "credit_limit",      label: "Credit",  render: (r) => <span className="text-muted-foreground tabular-nums">₹{r.credit_limit.toLocaleString("en-IN")}</span> },
    { key: "is_premium_client", label: "Premium", render: (r) => r.is_premium_client
        ? <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[11px] font-semibold bg-amber-50 text-amber-700 border border-amber-200">Premium</span>
        : <span className="text-muted-foreground text-xs">—</span>
    },
    { key: "status", label: "Status", render: (r) => <StatusBadge status={r.status} /> },
  ];

  function handleSave(form: Omit<Client, "id">) {
    if (editing) {
      setData((prev) => prev.map((c) => c.id === editing.id ? { ...form, id: editing.id } : c));
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
          searchKeys={["name", "client_code", "phone", "city", "email"]}
          addLabel="Add Client"
          onAdd={() => { setEditing(null); setOpen(true); }}
          onEdit={(r) => { setEditing(r); setOpen(true); }}
          onDelete={(id) => setData((prev) => prev.filter((c) => c.id !== id))}
        />
        <ClientModal
          open={open}
          onClose={() => { setOpen(false); setEditing(null); }}
          onSave={handleSave}
          initial={editing}
        />
      </div>
    </div>
  );
}
