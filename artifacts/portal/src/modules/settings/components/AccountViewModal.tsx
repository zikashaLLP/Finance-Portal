import { Landmark, CreditCard, Hash, Building2, IndianRupee, Calendar } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";
import { type Account } from "../data/mockAccounts";

interface AccountViewModalProps {
  open: boolean;
  onClose: () => void;
  account: Account | null;
}

function Field({ icon: Icon, label, value }: { icon: React.ElementType; label: string; value: string }) {
  return (
    <div className="flex items-start gap-3">
      <div className="h-8 w-8 rounded-lg bg-muted flex items-center justify-center shrink-0 mt-0.5">
        <Icon className="h-3.5 w-3.5 text-muted-foreground" />
      </div>
      <div className="min-w-0">
        <p className="text-[11px] font-medium text-muted-foreground uppercase tracking-wide">{label}</p>
        <p className="text-sm text-foreground font-medium mt-0.5 break-all">{value || "—"}</p>
      </div>
    </div>
  );
}

function AmountField({ label, value, highlight }: { label: string; value: number; highlight?: boolean }) {
  return (
    <div className={cn(
      "rounded-xl border px-4 py-3 flex flex-col gap-1",
      highlight ? "bg-violet-50 border-violet-200" : "bg-muted/30 border-border"
    )}>
      <p className="text-[11px] font-medium text-muted-foreground uppercase tracking-wide">{label}</p>
      <p className={cn(
        "text-lg font-bold tabular-nums",
        highlight ? "text-violet-700" : "text-foreground"
      )}>
        ₹{value.toLocaleString("en-IN", { minimumFractionDigits: 2 })}
      </p>
    </div>
  );
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });
}

export function AccountViewModal({ open, onClose, account }: AccountViewModalProps) {
  if (!account) return null;

  const isActive = account.status === "Active";
  const isBank   = account.type === "Bank Account";

  return (
    <Dialog open={open} onOpenChange={(v) => { if (!v) onClose(); }}>
      <DialogContent className="p-0 gap-0 !rounded-[15px] overflow-hidden border-0 shadow-2xl [&>button]:hidden sm:max-w-[520px]">
        {/* Header */}
        <div className="bg-violet-50 px-6 pt-5 pb-4">
          <DialogHeader>
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="h-9 w-9 rounded-full bg-violet-600 flex items-center justify-center shrink-0">
                  <Landmark className="h-4 w-4 text-white" />
                </div>
                <div>
                  <DialogTitle className="text-[15px] font-semibold leading-tight text-foreground">
                    {account.account_name}
                  </DialogTitle>
                  <div className="flex items-center gap-2 mt-1">
                    <span className={cn(
                      "inline-flex items-center px-2 py-0.5 rounded-md text-[11px] font-semibold",
                      "bg-violet-100 text-violet-700 border border-violet-200"
                    )}>
                      {account.type}
                    </span>
                    <span className={cn(
                      "inline-flex items-center px-2 py-0.5 rounded-md text-[11px] font-semibold",
                      isActive
                        ? "bg-emerald-100 text-emerald-700 border border-emerald-200"
                        : "bg-red-50 text-red-600 border border-red-200"
                    )}>
                      {account.status}
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
        <div className="px-6 py-5 space-y-5">

          {/* Balances */}
          <div className="grid grid-cols-2 gap-3">
            <AmountField label="Opening Balance" value={account.opening_balance} />
            <AmountField label="Current Balance" value={account.current_balance} highlight />
          </div>

          {/* Bank Details */}
          {isBank && (
            <>
              <div className="border-t border-border" />
              <div>
                <p className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider mb-3">Bank Details</p>
                <div className="space-y-3">
                  <Field icon={Building2}   label="Bank Name"       value={account.bank_name      ?? "—"} />
                  <div className="grid grid-cols-2 gap-3">
                    <Field icon={CreditCard}  label="Account Number"  value={account.account_number ?? "—"} />
                    <Field icon={Hash}        label="IFSC Code"        value={account.ifsc_code      ?? "—"} />
                  </div>
                </div>
              </div>
            </>
          )}

          {/* Timestamps */}
          <div className="border-t border-border" />
          <div className="grid grid-cols-2 gap-3">
            <Field icon={Calendar} label="Created"      value={formatDate(account.created_at)} />
            <Field icon={IndianRupee} label="Last Updated" value={formatDate(account.updated_at)} />
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
