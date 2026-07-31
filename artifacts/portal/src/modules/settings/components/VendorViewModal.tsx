import { Truck, Phone, Mail, MapPin, Hash, X, FileText, Calendar, Globe } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { type Vendor } from "../data/mockVendors";

interface Props { open: boolean; onClose: () => void; vendor: Vendor | null; }

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

function Section({ title }: { title: string }) {
  return <p className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider pt-1 pb-0.5 border-b border-border">{title}</p>;
}

function fmtDate(s: string) {
  if (!s) return "—";
  try { return new Date(s).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" }); }
  catch { return s; }
}

export function VendorViewModal({ open, onClose, vendor }: Props) {
  if (!vendor) return null;
  const isActive = vendor.status === "Active";
  const initials = vendor.name.split(" ").slice(0, 2).map((w) => w[0]).join("").toUpperCase();
  const fullAddress = [vendor.address, vendor.city, vendor.state, vendor.country, vendor.pincode].filter(Boolean).join(", ");

  return (
    <Dialog open={open} onOpenChange={(v) => { if (!v) onClose(); }}>
      <DialogContent className="p-0 gap-0 !rounded-[15px] overflow-hidden border-0 shadow-2xl [&>button]:hidden sm:max-w-[520px]">
        {/* Header */}
        <div className="bg-blue-50 px-6 pt-5 pb-4">
          <DialogHeader>
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-3">
                {vendor.vendor_logo_url ? (
                  <img src={vendor.vendor_logo_url} alt={vendor.name}
                    className="h-10 w-10 rounded-lg object-cover border border-border shrink-0" />
                ) : (
                  <div className="h-9 w-9 rounded-full bg-blue-600 flex items-center justify-center shrink-0 text-[13px] font-bold text-white">
                    {initials}
                  </div>
                )}
                <div>
                  <DialogTitle className="text-[15px] font-semibold leading-tight text-foreground">{vendor.name}</DialogTitle>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-[11px] font-mono text-muted-foreground">{vendor.vendor_code}</span>
                    <span className={cn(
                      "inline-flex items-center px-2 py-0.5 rounded-md text-[11px] font-semibold",
                      isActive ? "bg-emerald-100 text-emerald-700 border border-emerald-200" : "bg-red-50 text-red-600 border border-red-200"
                    )}>{vendor.status}</span>
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
        <div className="px-6 py-5 space-y-4 max-h-[60vh] overflow-y-auto">
          <Section title="Contact" />
          <div className="grid grid-cols-2 gap-4">
            <Field icon={Phone} label="Phone" value={vendor.phone} />
            <Field icon={Mail}  label="Email" value={vendor.email} />
          </div>

          <Section title="Identity" />
          <div className="grid grid-cols-2 gap-4">
            <Field icon={Hash}     label="GST No" value={vendor.gst_no} />
            <Field icon={FileText} label="PAN No" value={vendor.pan_no} />
          </div>

          <Section title="Address" />
          <Field icon={MapPin} label="Full Address" value={fullAddress} />

          <Section title="Record Info" />
          <div className="grid grid-cols-2 gap-4">
            <Field icon={Calendar} label="Created" value={fmtDate(vendor.created_at)} />
            <Field icon={Calendar} label="Updated" value={fmtDate(vendor.updated_at)} />
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
