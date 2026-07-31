import { UserIcon, X, Mail, AtSign, Building2, ShieldCheck, Phone, Clock, Calendar, KeyRound } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { type User, type Role } from "../data/mockTeamSettings";
import { type Branch } from "../data/mockBranches";

interface Props { open: boolean; onClose: () => void; user: User | null; roles: Role[]; branches: Branch[]; }

function Field({ icon: Icon, label, value, mono }: { icon: React.ElementType; label: string; value: string; mono?: boolean }) {
  return (
    <div className="flex items-start gap-3">
      <div className="h-8 w-8 rounded-lg bg-muted flex items-center justify-center shrink-0 mt-0.5">
        <Icon className="h-3.5 w-3.5 text-muted-foreground" />
      </div>
      <div className="min-w-0">
        <p className="text-[11px] font-medium text-muted-foreground uppercase tracking-wide">{label}</p>
        <p className={cn("text-sm text-foreground font-medium mt-0.5 break-words", mono && "font-mono text-xs tracking-widest")}>{value || "—"}</p>
      </div>
    </div>
  );
}

function Section({ title }: { title: string }) {
  return <p className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider pt-1 pb-0.5 border-b border-border">{title}</p>;
}

function fmtDate(s: string) {
  if (!s) return "—";
  try {
    return new Date(s).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" });
  } catch { return s; }
}

export function UserViewModal({ open, onClose, user, roles, branches }: Props) {
  if (!user) return null;
  const isActive = user.status === "Active";
  const roleName   = roles.find((r) => r.id === user.role_id)?.role_name  ?? user.role_id;
  const branchName = branches.find((b) => b.id === user.branch_id)?.name  ?? (user.branch_id || "—");
  const initials   = user.full_name.split(" ").slice(0, 2).map((w) => w[0]).join("").toUpperCase();

  // Role colour mapping
  const roleColors: Record<string, string> = {
    Admin:    "bg-purple-100 text-purple-700 border border-purple-200",
    Accounts: "bg-blue-100 text-blue-700 border border-blue-200",
    Sales:    "bg-emerald-100 text-emerald-700 border border-emerald-200",
    Staff:    "bg-amber-100 text-amber-700 border border-amber-200",
  };
  const roleCls = roleColors[roleName] ?? "bg-muted text-foreground border border-border";

  return (
    <Dialog open={open} onOpenChange={(v) => { if (!v) onClose(); }}>
      <DialogContent className="p-0 gap-0 !rounded-[15px] overflow-hidden border-0 shadow-2xl [&>button]:hidden sm:max-w-[480px]">
        {/* Header */}
        <div className="bg-indigo-50 px-6 pt-5 pb-4">
          <DialogHeader>
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-indigo-600 flex items-center justify-center shrink-0 text-sm font-bold text-white">
                  {initials}
                </div>
                <div>
                  <DialogTitle className="text-[15px] font-semibold leading-tight text-foreground">{user.full_name}</DialogTitle>
                  <div className="flex items-center gap-2 mt-1 flex-wrap">
                    <span className="text-[11px] font-mono text-muted-foreground">@{user.username}</span>
                    <span className={cn("inline-flex items-center px-2 py-0.5 rounded-md text-[11px] font-semibold", roleCls)}>
                      {roleName}
                    </span>
                    <span className={cn(
                      "inline-flex items-center px-2 py-0.5 rounded-md text-[11px] font-semibold",
                      isActive ? "bg-emerald-100 text-emerald-700 border border-emerald-200" : "bg-red-50 text-red-600 border border-red-200"
                    )}>{user.status}</span>
                  </div>
                </div>
              </div>
              <button onClick={onClose} className="h-7 w-7 rounded-full flex items-center justify-center text-muted-foreground hover:bg-black/10 transition-colors mt-0.5 shrink-0">
                <X className="h-4 w-4" />
              </button>
            </div>
          </DialogHeader>
        </div>

        {/* Body */}
        <div className="px-6 py-5 space-y-4">
          <Section title="Contact" />
          <div className="grid grid-cols-2 gap-4">
            <Field icon={Mail}  label="Email" value={user.email} />
            <Field icon={Phone} label="Phone" value={user.phone} />
          </div>

          <Section title="Account" />
          <div className="grid grid-cols-2 gap-4">
            <Field icon={AtSign}   label="Username" value={user.username} />
            <Field icon={KeyRound} label="Password" value="••••••••" mono />
          </div>

          <Section title="Access" />
          <div className="grid grid-cols-2 gap-4">
            <Field icon={ShieldCheck} label="Role"   value={roleName} />
            <Field icon={Building2}   label="Branch" value={branchName} />
          </div>

          <Section title="Activity" />
          <div className="grid grid-cols-2 gap-4">
            <Field icon={Clock}    label="Last Login" value={fmtDate(user.last_login)} />
            <Field icon={Calendar} label="Created"    value={fmtDate(user.created_at)} />
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-border flex justify-end bg-background">
          <button onClick={onClose} className="h-9 px-5 rounded-[10px] text-sm font-medium bg-foreground text-background hover:bg-foreground/90 transition-colors">
            Close
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
