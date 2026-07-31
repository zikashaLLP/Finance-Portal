import { Users, Phone, Mail, MapPin, CreditCard, X, Star, Briefcase, Hash, FileText, Calendar, StickyNote, Globe, Image } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { type Client } from "../data/mockClients";

interface Props { open: boolean; onClose: () => void; client: Client | null; }

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

export function ClientViewModal({ open, onClose, client }: Props) {
  if (!client) return null;
  const isActive = client.status === "Active";
  const initials = client.name.split(" ").slice(0, 2).map((w) => w[0]).join("").toUpperCase();
  const fullAddress = [client.street_address, client.city, client.state, client.country, client.pincode].filter(Boolean).join(", ");
  const creditFmt = "₹" + client.credit_limit.toLocaleString("en-IN");

  return (
    <Dialog open={open} onOpenChange={(v) => { if (!v) onClose(); }}>
      <DialogContent className="p-0 gap-0 !rounded-[15px] overflow-hidden border-0 shadow-2xl [&>button]:hidden sm:max-w-[580px]">
        {/* Header */}
        <div className="bg-emerald-50 px-6 pt-5 pb-4">
          <DialogHeader>
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-3">
                {client.photo_url ? (
                  <img src={client.photo_url} alt={client.name}
                    className="h-10 w-10 rounded-full object-cover border border-border shrink-0" />
                ) : (
                  <div className="h-10 w-10 rounded-full bg-emerald-600 flex items-center justify-center shrink-0 text-sm font-bold text-white">
                    {initials}
                  </div>
                )}
                <div>
                  <DialogTitle className="text-[15px] font-semibold leading-tight text-foreground">{client.name}</DialogTitle>
                  <div className="flex items-center gap-2 mt-1 flex-wrap">
                    <span className="text-[11px] font-mono text-muted-foreground">{client.client_code}</span>
                    {client.is_premium_client && (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-semibold bg-amber-100 text-amber-700 border border-amber-200">
                        <Star className="h-2.5 w-2.5" /> Premium
                      </span>
                    )}
                    <span className={cn(
                      "inline-flex items-center px-2 py-0.5 rounded-md text-[11px] font-semibold",
                      isActive ? "bg-emerald-100 text-emerald-700 border border-emerald-200" : "bg-red-50 text-red-600 border border-red-200"
                    )}>{client.status}</span>
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
        <div className="px-6 py-5 space-y-4 max-h-[65vh] overflow-y-auto">
          <Section title="Contact" />
          <div className="grid grid-cols-2 gap-4">
            <Field icon={Phone} label="Phone"  value={client.phone} />
            <Field icon={Mail}  label="Email"  value={client.email} />
          </div>

          <Section title="Personal" />
          <div className="grid grid-cols-2 gap-4">
            <Field icon={Calendar} label="Date of Birth"    value={fmtDate(client.birth_date)} />
            <Field icon={Calendar} label="Anniversary"      value={fmtDate(client.anniversary_date)} />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Field icon={Users}    label="Spouse Name"      value={client.spouse_name} />
            <Field icon={Calendar} label="Spouse Birthday"  value={fmtDate(client.spouse_birth_date)} />
          </div>

          <Section title="Professional" />
          <div className="grid grid-cols-2 gap-4">
            <Field icon={Briefcase} label="Occupation" value={client.occupation} />
            <Field icon={Users}     label="Company"    value={client.company} />
          </div>

          <Section title="Identity" />
          <div className="grid grid-cols-2 gap-4">
            <Field icon={Hash}     label="GST No" value={client.gst_no} />
            <Field icon={FileText} label="PAN No" value={client.pan_no} />
          </div>

          <Section title="Address" />
          <Field icon={MapPin} label="Full Address" value={fullAddress} />

          <Section title="Financial" />
          <Field icon={CreditCard} label="Credit Limit" value={creditFmt} />

          {client.notes && (
            <>
              <Section title="Notes" />
              <Field icon={StickyNote} label="Internal Notes" value={client.notes} />
            </>
          )}

          <Section title="Record Info" />
          <div className="grid grid-cols-2 gap-4">
            <Field icon={Calendar} label="Created"  value={fmtDate(client.created_at)} />
            <Field icon={Calendar} label="Updated"  value={fmtDate(client.updated_at)} />
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
