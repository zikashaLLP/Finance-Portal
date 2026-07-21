import { useState } from "react";
import { Settings, Building2, Users, Truck, Hammer, Tag, UserCog } from "lucide-react";
import { cn } from "@/lib/utils";

import { SettingsTable, type ColumnDef } from "../components/SettingsTable";
import { BranchModal } from "../components/BranchModal";
import { ClientModal } from "../components/ClientModal";
import { VendorModal } from "../components/VendorModal";
import { KarigarProfileModal } from "../components/KarigarProfileModal";
import { GeneralMasterModal } from "../components/GeneralMasterModal";
import { RoleModal } from "../components/RoleModal";
import { UserModal } from "../components/UserModal";

import { mockBranches, type Branch } from "../data/mockBranches";
import { mockClients, type Client } from "../data/mockClients";
import { mockVendors, type Vendor } from "../data/mockVendors";
import { mockKarigarProfiles, type KarigarProfile } from "../data/mockKarigarProfiles";
import {
  mockJewelleryCategories,
  mockJewelleryTypes,
  mockGoldPurity,
  mockDiamondFilters,
  type GeneralMasterItem,
} from "../data/mockGeneralMasters";
import { mockRoles, mockUsers, type Role, type User } from "../data/mockTeamSettings";

/* ── Status badge ── */
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

/* ── Top-level tab definitions ── */
type TopTab = "branches" | "clients" | "vendors" | "karigar" | "general" | "team";
type GeneralSubTab = "categories" | "types" | "purity" | "diamond";
type TeamSubTab = "roles" | "users";

const TOP_TABS: { id: TopTab; label: string; icon: React.ElementType }[] = [
  { id: "branches", label: "Branch Management",  icon: Building2 },
  { id: "clients",  label: "Client Management",  icon: Users     },
  { id: "vendors",  label: "Vendor Management",  icon: Truck     },
  { id: "karigar",  label: "Karigar Profiles",   icon: Hammer    },
  { id: "general",  label: "General Management", icon: Tag       },
  { id: "team",     label: "Team Management",    icon: UserCog   },
];

/* ────────────────────────────────────────────────────────────── */
/* Branch tab                                                      */
/* ────────────────────────────────────────────────────────────── */
function BranchTab() {
  const [data, setData]       = useState<Branch[]>(mockBranches);
  const [open, setOpen]       = useState(false);
  const [editing, setEditing] = useState<Branch | null>(null);

  const cols: ColumnDef<Branch>[] = [
    { key: "code",    label: "Code",    render: (r) => <span className="font-mono text-xs text-muted-foreground">{r.code}</span> },
    { key: "name",    label: "Name",    render: (r) => <span className="font-medium text-foreground">{r.name}</span> },
    { key: "phone",   label: "Phone",   render: (r) => <span className="text-muted-foreground">{r.phone || "—"}</span> },
    { key: "email",   label: "Email",   render: (r) => <span className="text-muted-foreground">{r.email || "—"}</span> },
    { key: "city",    label: "City",    render: (r) => <span className="text-muted-foreground">{r.city}</span> },
    { key: "state",   label: "State",   render: (r) => <span className="text-muted-foreground">{r.state}</span> },
    { key: "status",  label: "Status",  render: (r) => <StatusBadge status={r.status} /> },
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
    <>
      <SettingsTable
        data={data}
        columns={cols}
        searchKeys={["name", "code", "city", "email"]}
        addLabel="Add Branch"
        onAdd={() => { setEditing(null); setOpen(true); }}
        onEdit={(r) => { setEditing(r); setOpen(true); }}
        onDelete={(id) => setData((prev) => prev.filter((b) => b.id !== id))}
      />
      <BranchModal open={open} onClose={() => { setOpen(false); setEditing(null); }} onSave={handleSave} initial={editing} />
    </>
  );
}

/* ────────────────────────────────────────────────────────────── */
/* Client tab                                                      */
/* ────────────────────────────────────────────────────────────── */
function ClientTab() {
  const [data, setData]       = useState<Client[]>(mockClients);
  const [open, setOpen]       = useState(false);
  const [editing, setEditing] = useState<Client | null>(null);

  const cols: ColumnDef<Client>[] = [
    { key: "client_code",       label: "Code",    render: (r) => <span className="font-mono text-xs text-muted-foreground">{r.client_code}</span> },
    { key: "name",              label: "Name",    render: (r) => (
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
    { key: "status",            label: "Status",  render: (r) => <StatusBadge status={r.status} /> },
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
    <>
      <SettingsTable
        data={data}
        columns={cols}
        searchKeys={["name", "client_code", "phone", "city", "email"]}
        addLabel="Add Client"
        onAdd={() => { setEditing(null); setOpen(true); }}
        onEdit={(r) => { setEditing(r); setOpen(true); }}
        onDelete={(id) => setData((prev) => prev.filter((c) => c.id !== id))}
      />
      <ClientModal open={open} onClose={() => { setOpen(false); setEditing(null); }} onSave={handleSave} initial={editing} />
    </>
  );
}

/* ────────────────────────────────────────────────────────────── */
/* Vendor tab                                                      */
/* ────────────────────────────────────────────────────────────── */
function VendorTab() {
  const [data, setData]       = useState<Vendor[]>(mockVendors);
  const [open, setOpen]       = useState(false);
  const [editing, setEditing] = useState<Vendor | null>(null);

  const cols: ColumnDef<Vendor>[] = [
    { key: "vendor_code", label: "Code",   render: (r) => <span className="font-mono text-xs text-muted-foreground">{r.vendor_code}</span> },
    { key: "name",        label: "Name",   render: (r) => <span className="font-medium text-foreground">{r.name}</span> },
    { key: "phone",       label: "Phone",  render: (r) => <span className="text-muted-foreground">{r.phone || "—"}</span> },
    { key: "email",       label: "Email",  render: (r) => <span className="text-muted-foreground">{r.email || "—"}</span> },
    { key: "city",        label: "City",   render: (r) => <span className="text-muted-foreground">{r.city}</span> },
    { key: "gst_no",      label: "GST No", render: (r) => <span className="font-mono text-xs text-muted-foreground">{r.gst_no || "—"}</span> },
    { key: "status",      label: "Status", render: (r) => <StatusBadge status={r.status} /> },
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
    <>
      <SettingsTable
        data={data}
        columns={cols}
        searchKeys={["name", "vendor_code", "phone", "city"]}
        addLabel="Add Vendor"
        onAdd={() => { setEditing(null); setOpen(true); }}
        onEdit={(r) => { setEditing(r); setOpen(true); }}
        onDelete={(id) => setData((prev) => prev.filter((v) => v.id !== id))}
      />
      <VendorModal open={open} onClose={() => { setOpen(false); setEditing(null); }} onSave={handleSave} initial={editing} />
    </>
  );
}

/* ────────────────────────────────────────────────────────────── */
/* Karigar Profiles tab                                            */
/* ────────────────────────────────────────────────────────────── */
function KarigarProfileTab() {
  const [data, setData]       = useState<KarigarProfile[]>(mockKarigarProfiles);
  const [open, setOpen]       = useState(false);
  const [editing, setEditing] = useState<KarigarProfile | null>(null);

  const cols: ColumnDef<KarigarProfile>[] = [
    { key: "karigar_code", label: "Code",         render: (r) => <span className="font-mono text-xs text-muted-foreground">{r.karigar_code}</span> },
    { key: "name",         label: "Name",         render: (r) => <span className="font-medium text-foreground">{r.name}</span> },
    { key: "phone",        label: "Phone",        render: (r) => <span className="text-muted-foreground">{r.phone || "—"}</span> },
    { key: "labour_type",  label: "Labour Type",  render: (r) => (
      <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[11px] font-medium bg-muted text-foreground border border-border">
        {r.labour_type}
      </span>
    )},
    { key: "address",      label: "Address",      render: (r) => <span className="text-muted-foreground text-xs max-w-[200px] truncate block">{r.address || "—"}</span> },
    { key: "status",       label: "Status",       render: (r) => <StatusBadge status={r.status} /> },
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
    <>
      <SettingsTable
        data={data}
        columns={cols}
        searchKeys={["name", "karigar_code", "phone"]}
        addLabel="Add Karigar"
        onAdd={() => { setEditing(null); setOpen(true); }}
        onEdit={(r) => { setEditing(r); setOpen(true); }}
        onDelete={(id) => setData((prev) => prev.filter((k) => k.id !== id))}
      />
      <KarigarProfileModal open={open} onClose={() => { setOpen(false); setEditing(null); }} onSave={handleSave} initial={editing} />
    </>
  );
}

/* ────────────────────────────────────────────────────────────── */
/* General Master mini-table (shared for each sub-tab)            */
/* ────────────────────────────────────────────────────────────── */
interface GeneralSubTableProps {
  initialData: GeneralMasterItem[];
  entityLabel: string;
  headerBg?: string;
  iconBg?: string;
}

function GeneralSubTable({ initialData, entityLabel, headerBg, iconBg }: GeneralSubTableProps) {
  const [data, setData]       = useState<GeneralMasterItem[]>(initialData);
  const [open, setOpen]       = useState(false);
  const [editing, setEditing] = useState<GeneralMasterItem | null>(null);

  const cols: ColumnDef<GeneralMasterItem>[] = [
    { key: "code",        label: "Code",        render: (r) => <span className="font-mono text-xs text-muted-foreground">{r.code || "—"}</span> },
    { key: "name",        label: "Name",        render: (r) => <span className="font-medium text-foreground">{r.name}</span> },
    { key: "description", label: "Description", render: (r) => <span className="text-muted-foreground text-xs">{r.description || "—"}</span> },
    { key: "status",      label: "Status",      render: (r) => <StatusBadge status={r.status} /> },
  ];

  function handleSave(form: Omit<GeneralMasterItem, "id">) {
    if (editing) {
      setData((prev) => prev.map((g) => g.id === editing.id ? { ...form, id: editing.id } : g));
    } else {
      setData((prev) => [...prev, { ...form, id: crypto.randomUUID() }]);
    }
    setOpen(false); setEditing(null);
  }

  return (
    <>
      <SettingsTable
        data={data}
        columns={cols}
        searchKeys={["name", "code"]}
        addLabel={`Add ${entityLabel}`}
        onAdd={() => { setEditing(null); setOpen(true); }}
        onEdit={(r) => { setEditing(r); setOpen(true); }}
        onDelete={(id) => setData((prev) => prev.filter((g) => g.id !== id))}
      />
      <GeneralMasterModal
        open={open}
        onClose={() => { setOpen(false); setEditing(null); }}
        onSave={handleSave}
        initial={editing}
        entityLabel={entityLabel}
        headerBg={headerBg}
        iconBg={iconBg}
      />
    </>
  );
}

/* ────────────────────────────────────────────────────────────── */
/* General Management tab (sub-tabs)                              */
/* ────────────────────────────────────────────────────────────── */
const GENERAL_SUB_TABS: { id: GeneralSubTab; label: string }[] = [
  { id: "categories", label: "Jewellery Categories" },
  { id: "types",      label: "Jewellery Types"      },
  { id: "purity",     label: "Gold Purity"          },
  { id: "diamond",    label: "Diamond Filters"      },
];

function GeneralManagementTab() {
  const [sub, setSub] = useState<GeneralSubTab>("categories");

  return (
    <div>
      {/* Sub-tabs */}
      <div className="flex items-center gap-1 mb-5 border-b border-border pb-0">
        {GENERAL_SUB_TABS.map((t) => (
          <button
            key={t.id}
            onClick={() => setSub(t.id)}
            className={cn(
              "px-4 py-2.5 text-sm font-medium transition-colors border-b-2 -mb-px",
              sub === t.id
                ? "border-foreground text-foreground"
                : "border-transparent text-muted-foreground hover:text-foreground"
            )}
          >
            {t.label}
          </button>
        ))}
      </div>

      {sub === "categories" && (
        <GeneralSubTable
          initialData={mockJewelleryCategories}
          entityLabel="Category"
          headerBg="bg-violet-50"
          iconBg="bg-violet-600"
        />
      )}
      {sub === "types" && (
        <GeneralSubTable
          initialData={mockJewelleryTypes}
          entityLabel="Jewellery Type"
          headerBg="bg-fuchsia-50"
          iconBg="bg-fuchsia-600"
        />
      )}
      {sub === "purity" && (
        <GeneralSubTable
          initialData={mockGoldPurity}
          entityLabel="Gold Purity"
          headerBg="bg-yellow-50"
          iconBg="bg-yellow-600"
        />
      )}
      {sub === "diamond" && (
        <GeneralSubTable
          initialData={mockDiamondFilters}
          entityLabel="Diamond Filter"
          headerBg="bg-cyan-50"
          iconBg="bg-cyan-600"
        />
      )}
    </div>
  );
}

/* ────────────────────────────────────────────────────────────── */
/* Team Management tab (sub-tabs: Roles + Users)                  */
/* ────────────────────────────────────────────────────────────── */
const TEAM_SUB_TABS: { id: TeamSubTab; label: string }[] = [
  { id: "roles", label: "Roles" },
  { id: "users", label: "Users" },
];

function TeamManagementTab() {
  const [sub, setSub]              = useState<TeamSubTab>("roles");
  const [roles, setRoles]          = useState<Role[]>(mockRoles);
  const [users, setUsers]          = useState<User[]>(mockUsers);
  const [branches]                 = useState(mockBranches);

  const [roleOpen, setRoleOpen]    = useState(false);
  const [editingRole, setEditingRole] = useState<Role | null>(null);
  const [userOpen, setUserOpen]    = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);

  const roleCols: ColumnDef<Role>[] = [
    { key: "name",        label: "Role Name",    render: (r) => <span className="font-medium text-foreground">{r.name}</span> },
    { key: "description", label: "Description",  render: (r) => <span className="text-muted-foreground text-xs">{r.description}</span> },
    { key: "permissions", label: "Permissions",  render: (r) => <span className="text-muted-foreground text-xs">{r.permissions}</span> },
    { key: "status",      label: "Status",       render: (r) => <StatusBadge status={r.status} /> },
  ];

  const userCols: ColumnDef<User>[] = [
    { key: "full_name", label: "Name",     render: (r) => (
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
    { key: "email",     label: "Email",    render: (r) => <span className="text-muted-foreground">{r.email || "—"}</span> },
    { key: "role_id",   label: "Role",     render: (r) => {
      const role = roles.find((ro) => ro.id === r.role_id);
      return <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[11px] font-medium bg-muted text-foreground border border-border">{role?.name ?? r.role_id}</span>;
    }},
    { key: "branch_id", label: "Branch",   render: (r) => {
      const branch = branches.find((b) => b.id === r.branch_id);
      return <span className="text-muted-foreground text-xs">{branch?.name ?? (r.branch_id || "—")}</span>;
    }},
    { key: "status",    label: "Status",   render: (r) => <StatusBadge status={r.status} /> },
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
    <div>
      {/* Sub-tabs */}
      <div className="flex items-center gap-1 mb-5 border-b border-border pb-0">
        {TEAM_SUB_TABS.map((t) => (
          <button
            key={t.id}
            onClick={() => setSub(t.id)}
            className={cn(
              "px-4 py-2.5 text-sm font-medium transition-colors border-b-2 -mb-px",
              sub === t.id
                ? "border-foreground text-foreground"
                : "border-transparent text-muted-foreground hover:text-foreground"
            )}
          >
            {t.label}
          </button>
        ))}
      </div>

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
  );
}

/* ────────────────────────────────────────────────────────────── */
/* Main Settings Page                                             */
/* ────────────────────────────────────────────────────────────── */
export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<TopTab>("branches");
  const active = TOP_TABS.find((t) => t.id === activeTab)!;

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Page header */}
      <div className="bg-background border-b border-border px-6 py-5">
        <div className="flex items-center gap-3 mb-5">
          <div className="h-10 w-10 rounded-xl bg-foreground flex items-center justify-center shrink-0">
            <Settings className="h-5 w-5 text-background" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-foreground tracking-tight leading-tight">Settings</h1>
            <p className="text-sm text-muted-foreground mt-0.5">Manage master data, profiles, and system configuration</p>
          </div>
        </div>

        {/* Tab navigation */}
        <div className="flex items-end gap-0 overflow-x-auto no-scrollbar">
          {TOP_TABS.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  "flex items-center gap-2 px-4 py-2.5 text-sm font-medium transition-colors border-b-2 -mb-px shrink-0",
                  isActive
                    ? "border-foreground text-foreground"
                    : "border-transparent text-muted-foreground hover:text-foreground hover:border-border"
                )}
              >
                <Icon className="h-3.5 w-3.5" />
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Tab content */}
      <div className="px-6 py-6">
        {/* Section header */}
        <div className="flex items-center gap-2 mb-4">
          <active.icon className="h-4 w-4 text-muted-foreground" />
          <h2 className="text-sm font-semibold text-foreground">{active.label}</h2>
        </div>

        {activeTab === "branches" && <BranchTab />}
        {activeTab === "clients"  && <ClientTab />}
        {activeTab === "vendors"  && <VendorTab />}
        {activeTab === "karigar"  && <KarigarProfileTab />}
        {activeTab === "general"  && <GeneralManagementTab />}
        {activeTab === "team"     && <TeamManagementTab />}
      </div>
    </div>
  );
}
