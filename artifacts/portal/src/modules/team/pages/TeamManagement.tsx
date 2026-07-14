import { useState } from "react";
import { Users, Plus, UserX } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  mockTeamMembers,
  ROLES,
  ROLE_META,
  type TeamMember,
  type TeamRole,
} from "../data/mockTeam";

/* ── ADD MEMBER MODAL ── */
interface AddMemberModalProps {
  open: boolean;
  onClose: () => void;
  onAdd: (member: Omit<TeamMember, "id" | "joinedAt">) => void;
}

function AddMemberModal({ open, onClose, onAdd }: AddMemberModalProps) {
  const [fullName, setFullName]   = useState("");
  const [username, setUsername]   = useState("");
  const [password, setPassword]   = useState("");
  const [role, setRole]           = useState<TeamRole | "">("");
  const [email, setEmail]         = useState("");
  const [phone, setPhone]         = useState("");

  function handleCreate() {
    if (!fullName.trim() || !username.trim() || !password.trim() || !role) return;
    onAdd({ fullName: fullName.trim(), username: username.trim(), role: role as TeamRole, email: email.trim() || undefined, phone: phone.trim() || undefined });
    setFullName(""); setUsername(""); setPassword(""); setRole(""); setEmail(""); setPhone("");
    onClose();
  }

  function handleClose() {
    setFullName(""); setUsername(""); setPassword(""); setRole(""); setEmail(""); setPhone("");
    onClose();
  }

  const canSubmit = fullName.trim() && username.trim() && password.trim() && role;

  return (
    <Dialog open={open} onOpenChange={(v) => { if (!v) handleClose(); }}>
      <DialogContent className="p-0 gap-0 !rounded-[15px] overflow-hidden border-0 shadow-2xl [&>button]:hidden sm:max-w-[480px]">
        {/* Header */}
        <div className="px-6 pt-5 pb-4 bg-violet-50">
          <DialogHeader>
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="h-9 w-9 rounded-full flex items-center justify-center shrink-0" style={{ background: "#7C3AED" }}>
                  <Plus className="h-4 w-4 text-white" />
                </div>
                <div>
                  <DialogTitle className="text-[15px] font-semibold leading-tight text-foreground">
                    Add Team Member
                  </DialogTitle>
                  <p className="text-[11px] text-muted-foreground mt-0.5">
                    Create a new team member login account
                  </p>
                </div>
              </div>
              <button
                onClick={handleClose}
                className="h-7 w-7 rounded-full flex items-center justify-center text-muted-foreground hover:bg-black/10 transition-colors mt-0.5 shrink-0 text-lg leading-none"
              >
                ×
              </button>
            </div>
          </DialogHeader>
        </div>

        {/* Body */}
        <div className="px-6 pt-5 pb-2 space-y-4">
          {/* Full Name */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-1.5">
              Full Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              placeholder="Enter full name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full h-10 px-3 rounded-lg border border-border bg-background text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-violet-500/20 focus:border-violet-400 transition"
            />
          </div>

          {/* Username */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-1.5">
              Username <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              placeholder="Enter username (for login)"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full h-10 px-3 rounded-lg border border-border bg-background text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-violet-500/20 focus:border-violet-400 transition"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-1.5">
              Password <span className="text-red-500">*</span>
            </label>
            <input
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full h-10 px-3 rounded-lg border border-border bg-background text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-violet-500/20 focus:border-violet-400 transition"
            />
          </div>

          {/* Team Role */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-1.5">
              Team Role <span className="text-red-500">*</span>
            </label>
            <Select value={role} onValueChange={(v) => setRole(v as TeamRole)}>
              <SelectTrigger className="h-10 rounded-lg border-border text-sm focus:ring-violet-500/20 focus:border-violet-400">
                <SelectValue placeholder="Select team role" />
              </SelectTrigger>
              <SelectContent>
                {ROLES.map((r) => (
                  <SelectItem key={r} value={r}>{r}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-1.5">
              Email <span className="text-muted-foreground font-normal">(Optional)</span>
            </label>
            <input
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full h-10 px-3 rounded-lg border border-border bg-background text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-violet-500/20 focus:border-violet-400 transition"
            />
          </div>

          {/* Phone */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-1.5">
              Phone <span className="text-muted-foreground font-normal">(Optional)</span>
            </label>
            <input
              type="tel"
              placeholder="Enter phone number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full h-10 px-3 rounded-lg border border-border bg-background text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-violet-500/20 focus:border-violet-400 transition"
            />
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-border flex items-center justify-end gap-2.5 bg-background mt-3">
          <button
            onClick={handleClose}
            className="h-9 px-5 rounded-[10px] text-sm font-medium border border-border hover:bg-muted/40 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleCreate}
            disabled={!canSubmit}
            className={cn(
              "h-9 px-5 rounded-[10px] text-sm font-medium text-white transition-colors",
              canSubmit
                ? "bg-violet-600 hover:bg-violet-700"
                : "bg-violet-300 cursor-not-allowed",
            )}
          >
            Create Member
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

/* ── ROLE AVATAR ── */
function RoleAvatar({ role, size = "md" }: { role: TeamRole; size?: "md" | "lg" }) {
  const meta = ROLE_META[role];
  const dim  = size === "lg" ? "h-14 w-14 text-xl" : "h-11 w-11 text-base";
  return (
    <div
      className={cn("rounded-full flex items-center justify-center font-bold shrink-0", dim)}
      style={{ background: meta.bg, color: meta.color }}
    >
      {meta.initials}
    </div>
  );
}

/* ── METRIC CARD ── */
function RoleCard({ role, count }: { role: TeamRole; count: number }) {
  return (
    <div className="bg-card border border-border rounded-2xl shadow-sm p-5 flex items-center justify-between gap-4">
      <div>
        <p className="text-xs text-muted-foreground font-medium mb-1">{role}</p>
        <p className="text-3xl font-bold text-foreground tabular-nums">{count}</p>
      </div>
      <RoleAvatar role={role} />
    </div>
  );
}

/* ── MAIN PAGE ── */
export default function TeamManagement() {
  const [members, setMembers] = useState<TeamMember[]>(mockTeamMembers);
  const [showAdd, setShowAdd] = useState(false);

  function handleAdd(data: Omit<TeamMember, "id" | "joinedAt">) {
    setMembers((prev) => [
      ...prev,
      { ...data, id: crypto.randomUUID(), joinedAt: new Date().toISOString() },
    ]);
  }

  const countByRole = (role: TeamRole) => members.filter((m) => m.role === role).length;

  return (
    <div className="min-h-screen bg-muted/30 px-6 py-6">
      {/* Page header */}
      <div className="flex items-start justify-between gap-4 mb-6">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-full flex items-center justify-center shrink-0" style={{ background: "#EDE9FE" }}>
            <Users className="h-5 w-5" style={{ color: "#7C3AED" }} />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-foreground tracking-tight leading-tight">Team Management</h1>
            <p className="text-sm text-muted-foreground mt-0.5">Manage your team members and their access permissions</p>
          </div>
        </div>
        <button
          onClick={() => setShowAdd(true)}
          className="flex items-center gap-2 h-10 px-5 rounded-xl text-sm font-semibold text-white bg-violet-600 hover:bg-violet-700 transition-colors shrink-0 shadow-sm"
        >
          <Plus className="h-4 w-4" />
          Add Team Member
        </button>
      </div>

      {/* Role metric cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {ROLES.map((role) => (
          <RoleCard key={role} role={role} count={countByRole(role)} />
        ))}
      </div>

      {/* Member list or empty state */}
      <div className="bg-card border border-border rounded-2xl shadow-sm overflow-hidden">
        {members.length === 0 ? (
          /* Empty state */
          <div className="flex flex-col items-center justify-center py-20 px-6 text-center">
            <div className="h-16 w-16 rounded-full bg-muted flex items-center justify-center mb-4">
              <UserX className="h-8 w-8 text-muted-foreground/50" />
            </div>
            <p className="text-sm text-muted-foreground">
              No team members yet. Add your first team member to get started.
            </p>
          </div>
        ) : (
          /* Members table */
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-muted/40">
                  {["Member", "Username", "Role", "Email", "Phone", "Joined"].map((h) => (
                    <th key={h} className="px-5 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider whitespace-nowrap">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {members.map((m, i) => {
                  const meta = ROLE_META[m.role];
                  return (
                    <tr key={m.id} className={cn("border-b border-border last:border-0 hover:bg-muted/20 transition-colors", i % 2 !== 0 && "bg-muted/10")}>
                      <td className="px-5 py-3">
                        <div className="flex items-center gap-2.5">
                          <div
                            className="h-8 w-8 rounded-full flex items-center justify-center text-xs font-bold shrink-0"
                            style={{ background: meta.bg, color: meta.color }}
                          >
                            {m.fullName.charAt(0).toUpperCase()}
                          </div>
                          <span className="font-medium text-foreground">{m.fullName}</span>
                        </div>
                      </td>
                      <td className="px-5 py-3 font-mono text-xs text-muted-foreground">{m.username}</td>
                      <td className="px-5 py-3">
                        <span
                          className="inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-semibold border"
                          style={{ background: meta.bg, color: meta.color, borderColor: meta.color + "33" }}
                        >
                          {m.role}
                        </span>
                      </td>
                      <td className="px-5 py-3 text-muted-foreground">{m.email || <span className="italic text-muted-foreground/50">—</span>}</td>
                      <td className="px-5 py-3 text-muted-foreground">{m.phone || <span className="italic text-muted-foreground/50">—</span>}</td>
                      <td className="px-5 py-3 text-muted-foreground whitespace-nowrap">
                        {new Date(m.joinedAt).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" })}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <AddMemberModal open={showAdd} onClose={() => setShowAdd(false)} onAdd={handleAdd} />
    </div>
  );
}
