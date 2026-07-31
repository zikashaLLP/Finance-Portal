import { Building2, Phone, Mail, MapPin, Hash, Globe } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";
import { type Branch } from "../data/mockBranches";

interface BranchViewModalProps {
  open: boolean;
  onClose: () => void;
  branch: Branch | null;
}

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

export function BranchViewModal({ open, onClose, branch }: BranchViewModalProps) {
  if (!branch) return null;

  const isActive = branch.status === "Active";
  const fullAddress = [branch.address, branch.city, branch.state, branch.pincode, branch.country]
    .filter(Boolean).join(", ");

  return (
    <Dialog open={open} onOpenChange={(v) => { if (!v) onClose(); }}>
      <DialogContent className="p-0 gap-0 !rounded-[15px] overflow-hidden border-0 shadow-2xl [&>button]:hidden sm:max-w-[520px]">
        {/* Header */}
        <div className="bg-blue-50 px-6 pt-5 pb-4">
          <DialogHeader>
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="h-9 w-9 rounded-full bg-blue-600 flex items-center justify-center shrink-0">
                  <Building2 className="h-4 w-4 text-white" />
                </div>
                <div>
                  <DialogTitle className="text-[15px] font-semibold leading-tight text-foreground">
                    {branch.name}
                  </DialogTitle>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-[11px] font-mono text-muted-foreground">{branch.code}</span>
                    <span className={cn(
                      "inline-flex items-center px-2 py-0.5 rounded-md text-[11px] font-semibold",
                      isActive
                        ? "bg-emerald-100 text-emerald-700 border border-emerald-200"
                        : "bg-muted text-muted-foreground border border-border"
                    )}>
                      {branch.status}
                    </span>
                  </div>
                </div>
              </div>
              <button
                onClick={onClose}
                className="h-7 w-7 rounded-full flex items-center justify-center text-muted-foreground hover:bg-black/10 transition-colors mt-0.5 shrink-0"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </DialogHeader>
        </div>

        {/* Body */}
        <div className="px-6 py-5 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <Field icon={Phone}   label="Phone"   value={branch.phone} />
            <Field icon={Mail}    label="Email"   value={branch.email} />
          </div>
          <div className="border-t border-border" />
          <Field icon={MapPin}  label="Address" value={fullAddress} />
          <div className="grid grid-cols-2 gap-4">
            <Field icon={Globe}  label="Country" value={branch.country} />
            <Field icon={Hash}   label="Pincode" value={branch.pincode} />
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-border flex justify-end bg-background">
          <button
            onClick={onClose}
            className="h-9 px-5 rounded-[10px] text-sm font-medium bg-foreground text-background hover:bg-foreground/90 transition-colors"
          >
            Close
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
