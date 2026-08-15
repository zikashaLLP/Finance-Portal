import { useEffect, useMemo, useState } from "react";
import { X } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { mockClients } from "../../settings/data/mockClients";
import { mockDiamondQualities } from "../../settings/data/mockGeneralMasters";

export type DiamondOrderType = "Loose Diamond" | "Solitaire";

export interface DiamondOrderFormValues {
  clientId: string;
  clientName: string;
  diamondType: DiamondOrderType;
  quality: string;
  weightCt: number;
  perCaratRate: number;
  orderDate: string;
  targetDelivery: string | null;
  status: "pending" | "confirmed" | "in-progress" | "ready" | "delivered" | "completed";
  specialInstructions: string;
  estimatedPrice: number;
}

interface DiamondOrderModalProps {
  open: boolean;
  onClose: () => void;
  onSave: (order: DiamondOrderFormValues) => void;
}

type FormState = {
  clientId: string;
  diamondType: DiamondOrderType;
  quality: string;
  weightCt: string;
  perCaratRate: string;
  orderDate: string;
  targetDelivery: string;
  status: DiamondOrderFormValues["status"];
  specialInstructions: string;
};

const NONE_VALUE = "__none__";
const INPUT_CLASS =
  "w-full h-9 px-3 rounded-lg border border-border bg-background text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-foreground/10 focus:border-foreground/30 transition";
const LABEL_CLASS = "block text-[12px] font-medium text-foreground mb-1.5";

function numberValue(value: string) {
  const parsed = Number.parseFloat(value);
  return Number.isFinite(parsed) ? parsed : 0;
}

export default function DiamondOrderModal({ open, onClose, onSave }: DiamondOrderModalProps) {
  const [form, setForm] = useState<FormState>({
    clientId: "",
    diamondType: "Loose Diamond",
    quality: "",
    weightCt: "",
    perCaratRate: "",
    orderDate: new Date().toISOString().slice(0, 10),
    targetDelivery: "",
    status: "pending",
    specialInstructions: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (open) {
      setForm({
        clientId: "",
        diamondType: "Loose Diamond",
        quality: "",
        weightCt: "",
        perCaratRate: "",
        orderDate: new Date().toISOString().slice(0, 10),
        targetDelivery: "",
        status: "pending",
        specialInstructions: "",
      });
      setErrors({});
    }
  }, [open]);

  const activeQualities = useMemo(() => {
    const qualityType = form.diamondType === "Solitaire" ? "Solitaire" : "Parcel";
    return mockDiamondQualities.filter((quality) => quality.status === "Active" && quality.type === qualityType);
  }, [form.diamondType]);
  const estimatedPrice = numberValue(form.weightCt) * numberValue(form.perCaratRate);

  function setField<K extends keyof FormState>(field: K, value: FormState[K]) {
    setForm((current) => ({ ...current, [field]: value }));
    setErrors((current) => {
      if (!current[field]) return current;
      const next = { ...current };
      delete next[field];
      return next;
    });
  }

  function changeType(value: DiamondOrderType) {
    setForm((current) => ({ ...current, diamondType: value, quality: "" }));
    setErrors((current) => {
      const next = { ...current };
      delete next.quality;
      return next;
    });
  }

  function save() {
    const next: Record<string, string> = {};
    if (!form.clientId) next.clientId = "Select a client.";
    if (!form.quality) next.quality = "Select a quality.";
    if (numberValue(form.weightCt) <= 0) next.weightCt = "Enter diamond weight.";
    if (numberValue(form.perCaratRate) <= 0) next.perCaratRate = "Enter the per-carat rate.";
    if (!form.orderDate) next.orderDate = "Select an order date.";
    setErrors(next);
    if (Object.keys(next).length > 0) return;

    const client = mockClients.find((item) => item.id === form.clientId);
    onSave({
      clientId: form.clientId,
      clientName: client?.name ?? "",
      diamondType: form.diamondType,
      quality: form.quality,
      weightCt: numberValue(form.weightCt),
      perCaratRate: numberValue(form.perCaratRate),
      orderDate: form.orderDate,
      targetDelivery: form.targetDelivery || null,
      status: form.status,
      specialInstructions: form.specialInstructions.trim(),
      estimatedPrice,
    });
    onClose();
  }

  return (
    <Dialog open={open} onOpenChange={(value) => { if (!value) onClose(); }}>
      <DialogContent className="p-0 gap-0 !rounded-[16px] overflow-hidden border-0 shadow-2xl [&>button]:hidden sm:max-w-[560px]">
        <DialogHeader className="px-6 pt-5 pb-4 border-b border-border bg-background">
          <div className="flex items-start justify-between gap-3">
            <div>
              <DialogTitle className="text-[16px] font-semibold leading-tight text-foreground">Create New Diamond Order</DialogTitle>
              <p className="mt-1 text-xs text-muted-foreground">Fill in the details for the new diamond order.</p>
            </div>
            <button type="button" onClick={onClose} aria-label="Close order modal" className="h-7 w-7 shrink-0 rounded-full flex items-center justify-center text-muted-foreground hover:bg-muted/60 hover:text-foreground transition-colors">
              <X className="h-4 w-4" />
            </button>
          </div>
        </DialogHeader>

        <div className="max-h-[72dvh] overflow-y-auto px-6 py-5 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className={LABEL_CLASS}>Client</label>
              <Select value={form.clientId || NONE_VALUE} onValueChange={(value) => setField("clientId", value === NONE_VALUE ? "" : value)}>
                <SelectTrigger className="h-9 rounded-lg border-border text-sm"><SelectValue placeholder="Select client" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value={NONE_VALUE}>Select client</SelectItem>
                  {mockClients.filter((client) => client.status === "Active").map((client) => <SelectItem key={client.id} value={client.id}>{client.name}</SelectItem>)}
                </SelectContent>
              </Select>
              {errors.clientId && <p className="text-[11px] text-red-600 mt-1">{errors.clientId}</p>}
            </div>
            <div>
              <label className={LABEL_CLASS}>Diamond Type</label>
              <Select value={form.diamondType} onValueChange={(value) => changeType(value as DiamondOrderType)}>
                <SelectTrigger className="h-9 rounded-lg border-border text-sm"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="Loose Diamond">Loose Diamond</SelectItem>
                  <SelectItem value="Solitaire">Solitaire</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <label className={LABEL_CLASS}>Quality</label>
            <Select value={form.quality || NONE_VALUE} onValueChange={(value) => setField("quality", value === NONE_VALUE ? "" : value)}>
              <SelectTrigger className="h-9 rounded-lg border-border text-sm"><SelectValue placeholder="Select quality" /></SelectTrigger>
              <SelectContent>
                <SelectItem value={NONE_VALUE}>Select quality</SelectItem>
                {activeQualities.map((quality) => <SelectItem key={quality.id} value={quality.quality_name}>{quality.quality_name} · {quality.description}</SelectItem>)}
              </SelectContent>
            </Select>
            {errors.quality && <p className="text-[11px] text-red-600 mt-1">{errors.quality}</p>}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className={LABEL_CLASS}>Diamond Weight (carats)</label>
              <input className={INPUT_CLASS} type="number" min="0" step="0.001" value={form.weightCt} onChange={(event) => setField("weightCt", event.target.value)} placeholder="0.000" />
              {errors.weightCt && <p className="text-[11px] text-red-600 mt-1">{errors.weightCt}</p>}
            </div>
            <div>
              <label className={LABEL_CLASS}>Per-Carat Rate (₹)</label>
              <input className={INPUT_CLASS} type="number" min="0" step="0.01" value={form.perCaratRate} onChange={(event) => setField("perCaratRate", event.target.value)} placeholder="0.00" />
              {errors.perCaratRate && <p className="text-[11px] text-red-600 mt-1">{errors.perCaratRate}</p>}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className={LABEL_CLASS}>Order Date</label>
              <input className={INPUT_CLASS} type="date" value={form.orderDate} onChange={(event) => setField("orderDate", event.target.value)} />
              {errors.orderDate && <p className="text-[11px] text-red-600 mt-1">{errors.orderDate}</p>}
            </div>
            <div>
              <label className={LABEL_CLASS}>Target Delivery Date</label>
              <input className={INPUT_CLASS} type="date" value={form.targetDelivery} onChange={(event) => setField("targetDelivery", event.target.value)} />
            </div>
          </div>

          <div>
            <label className={LABEL_CLASS}>Status</label>
            <Select value={form.status} onValueChange={(value) => setField("status", value as FormState["status"])}>
              <SelectTrigger className="h-9 rounded-lg border-border text-sm"><SelectValue /></SelectTrigger>
              <SelectContent>
                {[
                  ["pending", "Pending"],
                  ["confirmed", "Confirmed"],
                  ["in-progress", "In Progress"],
                  ["ready", "Ready"],
                ].map(([value, label]) => <SelectItem key={value} value={value}>{label}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className={LABEL_CLASS}>Estimated Price (Auto-calculated)</label>
            <input readOnly className={`${INPUT_CLASS} bg-muted/45 text-muted-foreground tabular-nums`} value={`₹${estimatedPrice.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`} />
          </div>

          <div>
            <label className={LABEL_CLASS}>Special Instructions</label>
            <textarea className="w-full min-h-[74px] resize-none rounded-lg border border-border bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-foreground/10 focus:border-foreground/30 transition" value={form.specialInstructions} onChange={(event) => setField("specialInstructions", event.target.value)} placeholder="Any special requirements or notes..." />
          </div>
        </div>

        <div className="flex items-center justify-end gap-2 border-t border-border bg-background px-6 py-4">
          <button type="button" onClick={onClose} className="h-9 rounded-[10px] border border-border px-5 text-sm font-medium text-foreground hover:bg-muted/40 transition-colors">Cancel</button>
          <button type="button" onClick={save} className="h-9 rounded-[10px] bg-foreground px-5 text-sm font-semibold text-background hover:bg-foreground/90 transition-colors">Create Order</button>
        </div>
      </DialogContent>
    </Dialog>
  );
}