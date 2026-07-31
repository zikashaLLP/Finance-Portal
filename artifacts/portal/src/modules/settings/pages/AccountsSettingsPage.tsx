import { useState } from "react";
import { Landmark, Banknote } from "lucide-react";
import { SettingsTable, type ColumnDef } from "../components/SettingsTable";
import { AccountModal } from "../components/AccountModal";
import { AccountViewModal } from "../components/AccountViewModal";
import { mockAccounts, type Account } from "../data/mockAccounts";
import { cn } from "@/lib/utils";

function TypeBadge({ type }: { type: Account["type"] }) {
  const isBank = type === "Bank Account";
  return (
    <span className={cn(
      "inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-semibold",
      isBank
        ? "bg-violet-50 text-violet-700 border border-violet-200"
        : "bg-amber-50 text-amber-700 border border-amber-200"
    )}>
      {isBank ? <Landmark className="h-3 w-3" /> : <Banknote className="h-3 w-3" />}
      {type}
    </span>
  );
}

function StatusBadge({ status }: { status: Account["status"] }) {
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

function BalanceCell({ value }: { value: number }) {
  return (
    <span className="font-mono text-sm font-medium text-foreground tabular-nums">
      ₹{value.toLocaleString("en-IN", { minimumFractionDigits: 2 })}
    </span>
  );
}

export default function AccountsSettingsPage() {
  const [data, setData]       = useState<Account[]>(mockAccounts);
  const [open, setOpen]       = useState(false);
  const [editing, setEditing] = useState<Account | null>(null);
  const [viewing, setViewing] = useState<Account | null>(null);

  const cols: ColumnDef<Account>[] = [
    {
      key: "account_name",
      label: "Account Name",
      render: (r) => (
        <div className="flex items-center gap-2">
          <div className={cn(
            "h-7 w-7 rounded-lg flex items-center justify-center shrink-0",
            r.type === "Bank Account" ? "bg-violet-100" : "bg-amber-100"
          )}>
            {r.type === "Bank Account"
              ? <Landmark className="h-3.5 w-3.5 text-violet-600" />
              : <Banknote  className="h-3.5 w-3.5 text-amber-600"  />
            }
          </div>
          <div>
            <p className="font-medium text-foreground text-sm leading-tight">{r.account_name}</p>
            {r.type === "Bank Account" && r.bank_name && (
              <p className="text-[11px] text-muted-foreground">{r.bank_name}</p>
            )}
          </div>
        </div>
      ),
    },
    { key: "type",            label: "Type",             render: (r) => <TypeBadge type={r.type} /> },
    { key: "account_number",  label: "Account No.",      render: (r) => <span className="font-mono text-xs text-muted-foreground">{r.account_number || "—"}</span> },
    { key: "opening_balance", label: "Opening Balance",  render: (r) => <BalanceCell value={r.opening_balance} /> },
    { key: "current_balance", label: "Current Balance",  render: (r) => <BalanceCell value={r.current_balance} /> },
    { key: "status",          label: "Status",           render: (r) => <StatusBadge status={r.status} /> },
  ];

  function handleSave(form: Omit<Account, "id" | "created_at" | "updated_at">) {
    const now = new Date().toISOString();
    if (editing) {
      setData((prev) =>
        prev.map((a) =>
          a.id === editing.id
            ? { ...form, id: editing.id, created_at: editing.created_at, updated_at: now }
            : a
        )
      );
    } else {
      setData((prev) => [
        ...prev,
        { ...form, id: crypto.randomUUID(), created_at: now, updated_at: now },
      ]);
    }
    setOpen(false);
    setEditing(null);
  }

  return (
    <div className="w-full">
      <div className="px-6 py-6">
        <SettingsTable
          data={data}
          columns={cols}
          searchKeys={["account_name", "bank_name", "account_number", "ifsc_code"]}
          addLabel="Add Account"
          onAdd={() => { setEditing(null); setOpen(true); }}
          onEdit={(r) => { setEditing(r); setOpen(true); }}
          onDelete={(id) => setData((prev) => prev.filter((a) => a.id !== id))}
          onView={(r) => setViewing(r)}
        />

        <AccountModal
          open={open}
          onClose={() => { setOpen(false); setEditing(null); }}
          onSave={handleSave}
          initial={editing}
        />

        <AccountViewModal
          open={!!viewing}
          onClose={() => setViewing(null)}
          account={viewing}
        />
      </div>
    </div>
  );
}
