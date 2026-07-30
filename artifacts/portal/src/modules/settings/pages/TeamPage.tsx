import { useState } from "react";
import { UserCog } from "lucide-react";
import { cn } from "@/lib/utils";
import { SettingsTable, type ColumnDef } from "../components/SettingsTable";
import { RoleModal } from "../components/RoleModal";
import { UserModal } from "../components/UserModal";
import { mockRoles, mockUsers, type Role, type User } from "../data/mockTeamSettings";
import { mockBranches } from "../data/mockBranches";

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

type TeamSubTab = "roles" | "users";

const TEAM_SUB_TABS: { id: TeamSubTab; label: string }[] = [
  { id: "roles", label: "Roles" },
  { id: "users", label: "Users" },
];

export default function TeamPage() {
  const [sub, setSub]                     = useState<TeamSubTab>("roles");
  const [roles, setRoles]                 = useState<Role[]>(mockRoles);
  const [users, setUsers]                 = useState<User[]>(mockUsers);
  const [branches]                        = useState(mockBranches);
  const [roleOpen, setRoleOpen]           = useState(false);
  const [editingRole, setEditingRole]     = useState<Role | null>(null);
  const [userOpen, setUserOpen]           = useState(false);
  const [editingUser, setEditingUser]     = useState<User | null>(null);

  const roleCols: ColumnDef<Role>[] = [
    { key: "name",        label: "Role Name",   render: (r) => <span className="font-medium text-foreground">{r.name}</span> },
    { key: "description", label: "Description", render: (r) => <span className="text-muted-foreground text-xs">{r.description}</span> },
    { key: "permissions", label: "Permissions", render: (r) => <span className="text-muted-foreground text-xs">{r.permissions}</span> },
    { key: "status",      label: "Status",      render: (r) => <StatusBadge status={r.status} /> },
  ];

  const userCols: ColumnDef<User>[] = [
    { key: "full_name", label: "Name", render: (r) => (
      <div className="flex items-center gap-2">
        <div className="h-7 w-7 rounded-lg bg-foreground flex items-center justify-center text-[10px] font-bold text-background shrink-0">
          {r.full_name.charAt(0)}
        </div>
        <div>
          <p className="font-medium text-foreground leading-tight">{r.full_name}</p>
          <p className="text-[11px] text-muted-foreground font-mono">{r.username}</p>
        </div>
      </div>
    )},
    { key: "email",     label: "Email",  render: (r) => <span className="text-muted-foreground">{r.email || "—"}</span> },
    { key: "role_id",   label: "Role",   render: (r) => {
      const role = roles.find((ro) => ro.id === r.role_id);
      return <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[11px] font-medium bg-muted text-foreground border border-border">{role?.name ?? r.role_id}</span>;
    }},
    { key: "branch_id", label: "Branch", render: (r) => {
      const branch = branches.find((b) => b.id === r.branch_id);
      return <span className="text-muted-foreground text-xs">{branch?.name ?? (r.branch_id || "—")}</span>;
    }},
    { key: "status", label: "Status", render: (r) => <StatusBadge status={r.status} /> },
  ];

  function handleRoleSave(form: Omit<Role, "id">) {
    if (editingRole) {
      setRoles((prev) => prev.map((r) => r.id === editingRole.id ? { ...form, id: editingRole.id } : r));
    } else {
      setRoles((prev) => [...prev, { ...form, id: crypto.randomUUID() }]);
    }
    setRoleOpen(false); setEditingRole(null);
  }

  function handleUserSave(form: Omit<User, "id">) {
    if (editingUser) {
      setUsers((prev) => prev.map((u) => u.id === editingUser.id ? { ...form, id: editingUser.id } : u));
    } else {
      setUsers((prev) => [...prev, { ...form, id: crypto.randomUUID() }]);
    }
    setUserOpen(false); setEditingUser(null);
  }

  return (
    <div className="w-full">
      <div className="bg-background border-b border-border px-6 py-5">
        {/* Sub-tabs */}
        <div className="flex items-end gap-0 overflow-x-auto no-scrollbar">
          {TEAM_SUB_TABS.map((t) => (
            <button
              key={t.id}
              onClick={() => setSub(t.id)}
              className={cn(
                "px-4 py-2.5 text-sm font-medium transition-colors border-b-2 -mb-px shrink-0",
                sub === t.id
                  ? "border-foreground text-foreground"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              )}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      <div className="px-6 py-6">
        {sub === "roles" && (
          <>
            <SettingsTable
              data={roles}
              columns={roleCols}
              searchKeys={["name", "description"]}
              addLabel="Add Role"
              onAdd={() => { setEditingRole(null); setRoleOpen(true); }}
              onEdit={(r) => { setEditingRole(r); setRoleOpen(true); }}
              onDelete={(id) => setRoles((prev) => prev.filter((r) => r.id !== id))}
            />
            <RoleModal
              open={roleOpen}
              onClose={() => { setRoleOpen(false); setEditingRole(null); }}
              onSave={handleRoleSave}
              initial={editingRole}
            />
          </>
        )}

        {sub === "users" && (
          <>
            <SettingsTable
              data={users}
              columns={userCols}
              searchKeys={["full_name", "username", "email"]}
              addLabel="Add User"
              onAdd={() => { setEditingUser(null); setUserOpen(true); }}
              onEdit={(r) => { setEditingUser(r); setUserOpen(true); }}
              onDelete={(id) => setUsers((prev) => prev.filter((u) => u.id !== id))}
            />
            <UserModal
              open={userOpen}
              onClose={() => { setUserOpen(false); setEditingUser(null); }}
              onSave={handleUserSave}
              initial={editingUser}
              roles={roles}
              branches={branches}
            />
          </>
        )}
      </div>
    </div>
  );
}
