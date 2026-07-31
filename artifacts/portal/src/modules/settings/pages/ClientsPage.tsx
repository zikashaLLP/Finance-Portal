import { useState } from "react";
import { Users } from "lucide-react";
import { SettingsTable, type ColumnDef } from "../components/SettingsTable";
import { ClientModal } from "../components/ClientModal";
import { ClientViewModal } from "../components/ClientViewModal";
import { mockClients, type Client } from "../data/mockClients";
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

export default function ClientsPage() {
  const [data, setData]       = useState<Client[]>(mockClients);
  const [open, setOpen]       = useState(false);
  const [editing, setEditing] = useState<Client | null>(null);
  const [viewing, setViewing] = useState<Client | null>(null);

  const cols: ColumnDef<Client>[] = [
    { key: "client_code", label: "Code", render: (r) => <span className="font-mono text-xs text-muted-foreground">{r.client_code}</span> },
    { key: "name", label: "Name", render: (r) => (
      <div className="flex items-center gap-2">
        <div className="h-7 w-7 rounded-full bg-emerald-600 flex items-center justify-center text-[10px] font-bold text-white shrink-0">
          {r.name.charAt(0)}
        </div>
        <div>
          <p className="font-medium text-foreground leading-tight">{r.name}</p>
          {r.is_premium_client && <span className="text-[10px] font-semibold text-amber-600">★ Premium</span>}
        </div>
      </div>
    )},
    { key: "phone", label: "Phone", render: (r) => <span className="text-muted-foreground">{r.phone || "—"}</span> },
    { key: "email", label: "Email", render: (r) => <span className="text-muted-foreground text-xs">{r.email || "—"}</span> },
    { key: "city",  label: "City",  render: (r) => <span className="text-muted-foreground">{r.city || "—"}</span> },
    { key: "status", label: "Status", render: (r) => <StatusBadge status={r.status} /> },
  ];

  type FormData = Omit<Client, "id" | "created_at" | "updated_at">;
  function handleSave(form: FormData) {
    const now = new Date().toISOString();
    if (editing) {
      setData((prev) => prev.map((c) => c.id === editing.id
        ? { ...form, id: editing.id, created_at: editing.created_at, updated_at: now }
        : c));
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
          searchKeys={["name", "client_code", "phone", "city", "email"]}
          addLabel="Add Client"
          onAdd={() => { setEditing(null); setOpen(true); }}
          onEdit={(r) => { setEditing(r); setOpen(true); }}
          onDelete={(id) => setData((prev) => prev.filter((c) => c.id !== id))}
          onView={(r) => setViewing(r)}
        />
        <ClientModal
          open={open}
          onClose={() => { setOpen(false); setEditing(null); }}
          onSave={handleSave}
          initial={editing}
        />
        <ClientViewModal
          open={viewing !== null}
          onClose={() => setViewing(null)}
          client={viewing}
        />
      </div>
    </div>
  );
}
