import { ShieldCheck, X, Calendar, FileText } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { type Role } from "../data/mockTeamSettings";

interface Props { open: boolean; onClose: () => void; role: Role | null; }

function Field({ icon: Icon, label, value }: { icon: React.ElementType; label: string; value: string }) {
  return (
    <div className="flex items-start gap-3">
      <div className="h-8 w-8 rounded-lg bg-muted flex items-center justify-center shrink-0 mt-0.5">
        <Icon className="h-3.5 w-3.5 text-muted-foreground" />
      </div>
      <div className="min-w-0">
        <p className="text-[11px] font-medium text-muted-foreground uppercase tracking-wide">{label}</p>
        <p className="text-sm text-foreground font-medium mt-0.5 break-words">{value || "—"}</p>
      </div>
    </div>
  );
}

function fmtDate(s: string) {
  if (!s) return "—";
  try { return new Date(s).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" }); }
  catch { return s; }
}

export function RoleViewModal({ open, onClose, role }: Props) {
  if (!role) return null;

  return (
    <Dialog open={open} onOpenChange={(v) => { if (!v) onClose(); }}>
      <DialogContent className="p-0 gap-0 !rounded-[15px] overflow-hidden border-0 shadow-2xl [&>button]:hidden sm:max-w-[440px]">
        {/* Header */}
        <div className="bg-purple-50 px-6 pt-5 pb-4">
          <DialogHeader>
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="h-9 w-9 rounded-full bg-purple-600 flex items-center justify-center shrink-0">
                  <ShieldCheck className="h-4 w-4 text-white" />
                </div>
                <div>
                  <DialogTitle className="text-[15px] font-semibold leading-tight text-foreground">{role.role_name}</DialogTitle>
                  <p className="text-[11px] text-muted-foreground mt-0.5">Role</p>
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
          <Field icon={FileText} label="Description" value={role.description} />
          <div className="border-t border-border" />
          <div className="grid grid-cols-2 gap-4">
            <Field icon={Calendar} label="Created" value={fmtDate(role.created_at)} />
            <Field icon={Calendar} label="Updated" value={fmtDate(role.updated_at)} />
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
