import { useState } from "react";
import { cn } from "@/lib/utils";
import { SettingsTable, type ColumnDef } from "../components/SettingsTable";
import { RoleModal } from "../components/RoleModal";
import { UserModal } from "../components/UserModal";
import { RoleViewModal } from "../components/RoleViewModal";
import { UserViewModal } from "../components/UserViewModal";
import { mockRoles, mockUsers, type Role, type User } from "../data/mockTeamSettings";
import { mockBranches } from "../data/mockBranches";

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

const ROLE_COLORS: Record<string, string> = {
  Admin:    "bg-purple-50 text-purple-700 border border-purple-200",
  Accounts: "bg-blue-50 text-blue-700 border border-blue-200",
  Sales:    "bg-emerald-50 text-emerald-700 border border-emerald-200",
  Staff:    "bg-amber-50 text-amber-700 border border-amber-200",
};

type TeamSubTab = "roles" | "users";

const TEAM_SUB_TABS: { id: TeamSubTab; label: string }[] = [
  { id: "roles", label: "Roles" },
  { id: "users", label: "Users" },
];

export default function TeamPage() {
  const [sub, setSub]                 = useState<TeamSubTab>("roles");
  const [roles, setRoles]             = useState<Role[]>(mockRoles);
  const [users, setUsers]             = useState<User[]>(mockUsers);
  const [branches]                    = useState(mockBranches);
  const [roleOpen, setRoleOpen]       = useState(false);
  const [editingRole, setEditingRole] = useState<Role | null>(null);
  const [viewingRole, setViewingRole] = useState<Role | null>(null);
  const [userOpen, setUserOpen]       = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [viewingUser, setViewingUser] = useState<User | null>(null);

  function fmtDate(s: string) {
    if (!s) return "—";
    return new Date(s).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });
  }

  const roleCols: ColumnDef<Role>[] = [
    { key: "role_name", label: "Role Name", render: (r) => (
      <span className={cn(
        "inline-flex items-center px-2.5 py-0.5 rounded-md text-[11px] font-semibold",
        ROLE_COLORS[r.role_name] ?? "bg-muted text-foreground border border-border"
      )}>
        {r.role_name}
      </span>
    )},
    { key: "description", label: "Description", render: (r) => (
      <span className="text-muted-foreground text-xs">{r.description || "—"}</span>
    )},
    { key: "created_at", label: "Created", render: (r) => (
      <span className="text-muted-foreground text-xs">{fmtDate(r.created_at)}</span>
    )},
    { key: "updated_at", label: "Updated", render: (r) => (
      <span className="text-muted-foreground text-xs">{fmtDate(r.updated_at)}</span>
    )},
  ];

  const userCols: ColumnDef<User>[] = [
    { key: "full_name", label: "Name", render: (r) => (
      <div className="flex items-center gap-2">
        <div className="h-7 w-7 rounded-full bg-indigo-600 flex items-center justify-center text-[10px] font-bold text-white shrink-0">
          {r.full_name.charAt(0)}
        </div>
        <div>
          <p className="font-medium text-foreground leading-tight">{r.full_name}</p>
          <p className="text-[11px] text-muted-foreground font-mono">@{r.username}</p>
        </div>
      </div>
    )},
    { key: "phone", label: "Phone", render: (r) => (
      <span className="text-muted-foreground">{r.phone || "—"}</span>
    )},
    { key: "email", label: "Email", render: (r) => (
      <span className="text-muted-foreground text-xs">{r.email || "—"}</span>
    )},
    { key: "role_id", label: "Role", render: (r) => {
      const role = roles.find((ro) => ro.id === r.role_id);
      const name = role?.role_name ?? "—";
      return (
        <span className={cn(
          "inline-flex items-center px-2 py-0.5 rounded-md text-[11px] font-semibold",
          ROLE_COLORS[name] ?? "bg-muted text-foreground border border-border"
        )}>
          {name}
        </span>
      );
    }},
    { key: "branch_id", label: "Branch", render: (r) => {
      const branch = branches.find((b) => b.id === r.branch_id);
      return <span className="text-muted-foreground text-xs">{branch?.name ?? (r.branch_id || "—")}</span>;
    }},
    { key: "status", label: "Status", render: (r) => <StatusBadge status={r.status} /> },
  ];

  type RoleFormData = Omit<Role, "id" | "created_at" | "updated_at">;
  function handleRoleSave(form: RoleFormData) {
    const now = new Date().toISOString();
    if (editingRole) {
      setRoles((prev) => prev.map((r) => r.id === editingRole.id
        ? { ...form, id: editingRole.id, created_at: editingRole.created_at, updated_at: now }
        : r));
    } else {
      setRoles((prev) => [...prev, { ...form, id: crypto.randomUUID(), created_at: now, updated_at: now }]);
    }
    setRoleOpen(false); setEditingRole(null);
  }

  type UserFormData = Omit<User, "id" | "last_login" | "created_at" | "updated_at">;
  function handleUserSave(form: UserFormData) {
    const now = new Date().toISOString();
    if (editingUser) {
      setUsers((prev) => prev.map((u) => u.id === editingUser.id
        ? { ...form, id: editingUser.id, last_login: editingUser.last_login, created_at: editingUser.created_at, updated_at: now }
        : u));
    } else {
      setUsers((prev) => [...prev, { ...form, id: crypto.randomUUID(), last_login: "", created_at: now, updated_at: now }]);
    }
    setUserOpen(false); setEditingUser(null);
  }

  return (
    <div className="w-full">
      {/* Sub-tabs */}
      <div className="bg-white border-b border-border px-6 py-5">
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
              searchKeys={["role_name", "description"]}
              addLabel="Add Role"
              onAdd={() => { setEditingRole(null); setRoleOpen(true); }}
              onEdit={(r) => { setEditingRole(r); setRoleOpen(true); }}
              onDelete={(id) => setRoles((prev) => prev.filter((r) => r.id !== id))}
              onView={(r) => setViewingRole(r)}
            />
            <RoleModal
              open={roleOpen}
              onClose={() => { setRoleOpen(false); setEditingRole(null); }}
              onSave={handleRoleSave}
              initial={editingRole}
            />
            <RoleViewModal
              open={viewingRole !== null}
              onClose={() => setViewingRole(null)}
              role={viewingRole}
            />
          </>
        )}

        {sub === "users" && (
          <>
            <SettingsTable
              data={users}
              columns={userCols}
              searchKeys={["full_name", "username", "email", "phone"]}
              addLabel="Add User"
              onAdd={() => { setEditingUser(null); setUserOpen(true); }}
              onEdit={(r) => { setEditingUser(r); setUserOpen(true); }}
              onDelete={(id) => setUsers((prev) => prev.filter((u) => u.id !== id))}
              onView={(r) => setViewingUser(r)}
            />
            <UserModal
              open={userOpen}
              onClose={() => { setUserOpen(false); setEditingUser(null); }}
              onSave={handleUserSave}
              initial={editingUser}
              roles={roles}
              branches={branches}
            />
            <UserViewModal
              open={viewingUser !== null}
              onClose={() => setViewingUser(null)}
              user={viewingUser}
              roles={roles}
              branches={branches}
            />
          </>
        )}
      </div>
    </div>
  );
}
