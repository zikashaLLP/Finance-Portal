import { useEffect, useMemo, useState } from "react";
import { Calculator, LockKeyhole, X } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { mockClients } from "../../settings/data/mockClients";
import {
  mockDiamondQualities,
  mockGoldPurity,
  mockGoldTypes,
  mockJewelleryCategories,
  mockJewelleryTypes,
} from "../../settings/data/mockGeneralMasters";
import { DIAMOND_STOCK, GOLD_STOCK } from "../../stock/data/mockStock";

export type SaleType = "Loose Diamonds" | "Gold Jewellery" | "Diamond Jewellery" | "Repairing Bill";

export interface SaleFormValues {
  billNo: string;
  customerId: string;
  customerName: string;
  saleType: SaleType;
  stockItem: string;
  goldType: string;
  goldPurity: string;
  jewelleryType: string;
  diamondQuality: string;
  diamondCarats: number;
  goldWeight: number;
  salePrice: number;
  paymentReceived: number;
  gstPercentage: number;
  gstAmount: number;
  paymentMode: string;
  comment: string;
}

interface SaleModalProps {
  open: boolean;
  onClose: () => void;
  onSave: (sale: SaleFormValues) => void;
}

type FormState = {
  billNo: string;
  customerId: string;
  saleType: SaleType;
  stockItem: string;
  goldType: string;
  goldPurity: string;
  jewelleryType: string;
  diamondQuality: string;
  diamondCarats: string;
  goldWeight: string;
  salePrice: string;
  paymentReceived: string;
  gstPercentage: string;
  paymentMode: string;
  comment: string;
};

const EMPTY_FORM: FormState = {
  billNo: "",
  customerId: "",
  saleType: "Gold Jewellery",
  stockItem: "",
  goldType: "",
  goldPurity: "",
  jewelleryType: "",
  diamondQuality: "",
  diamondCarats: "",
  goldWeight: "",
  salePrice: "0",
  paymentReceived: "0",
  gstPercentage: "3",
  paymentMode: "Cash",
  comment: "",
};

const INPUT_CLASS =
  "w-full h-9 px-3 rounded-lg border border-border bg-background text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-foreground/10 focus:border-foreground/30 transition";
const LABEL_CLASS = "block text-[12px] font-medium text-foreground mb-1.5";
const READONLY_CLASS = "w-full h-9 px-3 rounded-lg border border-border bg-muted/45 text-sm text-muted-foreground tabular-nums";
const NONE_VALUE = "__none__";

const activeClients = mockClients.filter((client) => client.status === "Active");
const activeGoldTypes = mockGoldTypes.filter((item) => item.status === "Active");
const activeGoldPurity = mockGoldPurity.filter((item) => item.status === "Active");
const activeDiamondQualities = mockDiamondQualities.filter((item) => item.status === "Active");

function num(value: string) {
  const parsed = Number.parseFloat(value);
  return Number.isFinite(parsed) ? parsed : 0;
}

function Field({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) {
  return (
    <div>
      <label className={LABEL_CLASS}>{label}</label>
      {children}
      {error ? <p className="text-[11px] text-red-600 mt-1">{error}</p> : null}
    </div>
  );
}

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-2 pt-1">
      <span className="h-px flex-1 bg-border" />
      <h3 className="text-[10px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">{children}</h3>
      <span className="h-px flex-1 bg-border" />
    </div>
  );
}

export default function SaleModal({ open, onClose, onSave }: SaleModalProps) {
  const [form, setForm] = useState<FormState>({ ...EMPTY_FORM });
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (open) {
      setForm({ ...EMPTY_FORM });
      setErrors({});
    }
  }, [open]);

  const isGoldSale = form.saleType === "Gold Jewellery";
  const isDiamondSale = form.saleType === "Diamond Jewellery" || form.saleType === "Loose Diamonds";
  const isInventorySale = isGoldSale || form.saleType === "Diamond Jewellery";
  const gstAmount = useMemo(() => num(form.salePrice) * num(form.gstPercentage) / 100, [form.salePrice, form.gstPercentage]);
  const stockOptions = isGoldSale ? GOLD_STOCK.filter((item) => item.status === "available") : DIAMOND_STOCK.filter((item) => item.status === "available");

  const goldCategoryId = mockJewelleryCategories.find((category) => category.name === "Gold Jewellery")?.id;
  const diamondCategoryId = mockJewelleryCategories.find((category) => category.name === "Diamond Jewellery")?.id;
  const jewelleryTypes = mockJewelleryTypes.filter((item) => (
    item.status === "Active" && item.category_id === (isGoldSale ? goldCategoryId : diamondCategoryId)
  ));

  function setField<K extends keyof FormState>(field: K, value: FormState[K]) {
    setForm((current) => ({ ...current, [field]: value }));
    setErrors((current) => {
      if (!current[field]) return current;
      const next = { ...current };
      delete next[field];
      return next;
    });
  }

  function changeType(value: SaleType) {
    setForm((current) => ({
      ...current,
      saleType: value,
      stockItem: "",
      goldType: "",
      goldPurity: "",
      jewelleryType: "",
      diamondQuality: "",
      diamondCarats: "",
      goldWeight: "",
    }));
    setErrors({});
  }

  function validate() {
    const next: Record<string, string> = {};
    if (!form.billNo.trim()) next.billNo = "Bill number is required.";
    if (!form.saleType) next.saleType = "Select a sale type.";
    if (isInventorySale && !form.stockItem) next.stockItem = "Select an available stock item.";
    if (isGoldSale && !form.goldType) next.goldType = "Select a gold type.";
    if (isGoldSale && !form.goldPurity) next.goldPurity = "Select gold purity.";
    if (isDiamondSale && !form.diamondQuality) next.diamondQuality = "Select diamond quality.";
    if (form.saleType === "Loose Diamonds" && num(form.diamondCarats) <= 0) next.diamondCarats = "Enter diamond weight.";
    if (num(form.salePrice) <= 0) next.salePrice = "Enter a sale price greater than zero.";
    if (num(form.paymentReceived) < 0) next.paymentReceived = "Payment cannot be negative.";
    if (!form.paymentMode) next.paymentMode = "Select a payment mode.";
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  function handleSave() {
    if (!validate()) return;
    const customer = activeClients.find((client) => client.id === form.customerId);
    onSave({
      billNo: form.billNo.trim(),
      customerId: form.customerId,
      customerName: customer?.name ?? "Walk-in Customer",
      saleType: form.saleType,
      stockItem: form.stockItem,
      goldType: form.goldType,
      goldPurity: form.goldPurity,
      jewelleryType: form.jewelleryType,
      diamondQuality: form.diamondQuality,
      diamondCarats: num(form.diamondCarats),
      goldWeight: num(form.goldWeight),
      salePrice: num(form.salePrice),
      paymentReceived: num(form.paymentReceived),
      gstPercentage: num(form.gstPercentage),
      gstAmount,
      paymentMode: form.paymentMode,
      comment: form.comment.trim(),
    });
    onClose();
  }

  return (
    <Dialog open={open} onOpenChange={(value) => { if (!value) onClose(); }}>
      <DialogContent className="p-0 gap-0 !rounded-[16px] overflow-hidden border-0 shadow-2xl [&>button]:hidden sm:max-w-[680px]">
        <DialogHeader className="px-6 pt-5 pb-4 border-b border-border bg-background">
          <div className="flex items-start justify-between gap-3">
            <div>
              <DialogTitle className="text-[16px] font-semibold leading-tight text-foreground">Create New Sale</DialogTitle>
              <p className="mt-1 text-xs text-muted-foreground">Create a stock-based sale with the configured jewellery specifications.</p>
            </div>
            <button type="button" onClick={onClose} aria-label="Close sale modal" className="h-7 w-7 shrink-0 rounded-full flex items-center justify-center text-muted-foreground hover:bg-muted/60 hover:text-foreground transition-colors">
              <X className="h-4 w-4" />
            </button>
          </div>
        </DialogHeader>

        <div className="max-h-[72dvh] overflow-y-auto px-6 py-5 space-y-5">
          <div className="rounded-xl border border-sky-200 bg-sky-50 px-4 py-3">
            <p className="text-xs font-semibold text-sky-800">Stock-based sales only</p>
            <p className="mt-1 text-[11px] leading-relaxed text-sky-700">Gold and diamond jewellery sales must use an available stock item with its configured specifications.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Field label="Bill Number" error={errors.billNo}>
              <input className={INPUT_CLASS} value={form.billNo} onChange={(event) => setField("billNo", event.target.value)} placeholder="Enter bill number" />
            </Field>
            <Field label="Customer">
              <Select value={form.customerId || NONE_VALUE} onValueChange={(value) => setField("customerId", value === NONE_VALUE ? "" : value)}>
                <SelectTrigger className="h-9 rounded-lg border-border text-sm"><SelectValue placeholder="Select customer" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value={NONE_VALUE}>Walk-in Customer</SelectItem>
                  {activeClients.map((client) => <SelectItem key={client.id} value={client.id}>{client.name}</SelectItem>)}
                </SelectContent>
              </Select>
            </Field>
          </div>

          <Field label="Sale Type" error={errors.saleType}>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {(["Loose Diamonds", "Gold Jewellery", "Diamond Jewellery", "Repairing Bill"] as SaleType[]).map((type) => (
                <button
                  key={type}
                  type="button"
                  onClick={() => changeType(type)}
                  className={`rounded-lg border px-3 py-2 text-xs font-medium text-left transition-colors ${
                    form.saleType === type ? "border-foreground bg-foreground text-background" : "border-border text-muted-foreground hover:bg-muted/40"
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </Field>

          {isInventorySale ? (
            <Field label={`${form.saleType} Stock Item`} error={errors.stockItem}>
              <Select value={form.stockItem || NONE_VALUE} onValueChange={(value) => setField("stockItem", value === NONE_VALUE ? "" : value)}>
                <SelectTrigger className="h-9 rounded-lg border-border text-sm"><SelectValue placeholder="Search available stock item" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value={NONE_VALUE}>Select stock item</SelectItem>
                  {stockOptions.map((item) => (
                    <SelectItem key={item.id} value={item.stockId}>{item.stockId} · {item.itemName}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </Field>
          ) : form.saleType === "Loose Diamonds" ? (
            <Field label="Diamond Stock / Description">
              <input className={INPUT_CLASS} value={form.stockItem} onChange={(event) => setField("stockItem", event.target.value)} placeholder="Search by tag ID, quality, or description" />
            </Field>
          ) : (
            <Field label="Repair Description">
              <input className={INPUT_CLASS} value={form.comment} onChange={(event) => setField("comment", event.target.value)} placeholder="Describe the repair service" />
            </Field>
          )}

          {(isGoldSale || form.saleType === "Diamond Jewellery") && (
            <div className="rounded-xl border border-amber-200 bg-amber-50/40 p-4 space-y-3">
              <SectionHeading>Gold specifications</SectionHeading>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <Field label="Gold Type" error={errors.goldType}>
                  <Select value={form.goldType || NONE_VALUE} onValueChange={(value) => setField("goldType", value === NONE_VALUE ? "" : value)}>
                    <SelectTrigger className="h-9 rounded-lg border-border text-sm bg-background"><SelectValue placeholder="Select type" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value={NONE_VALUE}>Select type</SelectItem>
                      {activeGoldTypes.map((item) => <SelectItem key={item.id} value={item.type_name}>{item.type_name}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </Field>
                <Field label="Gold Purity" error={errors.goldPurity}>
                  <Select value={form.goldPurity || NONE_VALUE} onValueChange={(value) => setField("goldPurity", value === NONE_VALUE ? "" : value)}>
                    <SelectTrigger className="h-9 rounded-lg border-border text-sm bg-background"><SelectValue placeholder="Select purity" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value={NONE_VALUE}>Select purity</SelectItem>
                      {activeGoldPurity.map((item) => <SelectItem key={item.id} value={item.karat}>{item.karat} · {item.purity}%</SelectItem>)}
                    </SelectContent>
                  </Select>
                </Field>
                <Field label="Jewellery Type">
                  <Select value={form.jewelleryType || NONE_VALUE} onValueChange={(value) => setField("jewelleryType", value === NONE_VALUE ? "" : value)}>
                    <SelectTrigger className="h-9 rounded-lg border-border text-sm bg-background"><SelectValue placeholder="Select type" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value={NONE_VALUE}>Select jewellery type</SelectItem>
                      {jewelleryTypes.map((item) => <SelectItem key={item.id} value={item.name}>{item.name}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </Field>
              </div>
            </div>
          )}

          {form.saleType === "Diamond Jewellery" && (
            <div className="rounded-xl border border-sky-200 bg-sky-50/40 p-4 space-y-3">
              <SectionHeading>Diamond specifications</SectionHeading>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <Field label="Diamond Quality" error={errors.diamondQuality}>
                  <Select value={form.diamondQuality || NONE_VALUE} onValueChange={(value) => setField("diamondQuality", value === NONE_VALUE ? "" : value)}>
                    <SelectTrigger className="h-9 rounded-lg border-border text-sm bg-background"><SelectValue placeholder="Select quality" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value={NONE_VALUE}>Select quality</SelectItem>
                      {activeDiamondQualities.map((item) => <SelectItem key={item.id} value={item.quality_name}>{item.quality_name} · {item.type}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </Field>
                <Field label="Diamond Weight (ct)" error={errors.diamondCarats}>
                  <input className={INPUT_CLASS} type="number" min="0" step="0.001" value={form.diamondCarats} onChange={(event) => setField("diamondCarats", event.target.value)} placeholder="0.000" />
                </Field>
                <Field label="Gold Weight (g)">
                  <input className={INPUT_CLASS} type="number" min="0" step="0.001" value={form.goldWeight} onChange={(event) => setField("goldWeight", event.target.value)} placeholder="0.000" />
                </Field>
              </div>
            </div>
          )}

          {form.saleType === "Loose Diamonds" && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Field label="Diamond Quality" error={errors.diamondQuality}>
                <Select value={form.diamondQuality || NONE_VALUE} onValueChange={(value) => setField("diamondQuality", value === NONE_VALUE ? "" : value)}>
                  <SelectTrigger className="h-9 rounded-lg border-border text-sm"><SelectValue placeholder="Select quality" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value={NONE_VALUE}>Select quality</SelectItem>
                    {activeDiamondQualities.map((item) => <SelectItem key={item.id} value={item.quality_name}>{item.quality_name} · {item.type}</SelectItem>)}
                  </SelectContent>
                </Select>
              </Field>
              <Field label="Diamond Weight (ct)" error={errors.diamondCarats}>
                <input className={INPUT_CLASS} type="number" min="0" step="0.001" value={form.diamondCarats} onChange={(event) => setField("diamondCarats", event.target.value)} placeholder="0.000" />
              </Field>
            </div>
          )}

          <SectionHeading>Billing and payment</SectionHeading>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Field label="Sale Price (₹)" error={errors.salePrice}>
              <input className={`${INPUT_CLASS} font-semibold`} type="number" min="0" step="0.01" value={form.salePrice} onChange={(event) => setField("salePrice", event.target.value)} />
            </Field>
            <Field label="Payment Received (₹)" error={errors.paymentReceived}>
              <input className={INPUT_CLASS} type="number" min="0" step="0.01" value={form.paymentReceived} onChange={(event) => setField("paymentReceived", event.target.value)} />
            </Field>
            <Field label="GST Percentage">
              <Select value={form.gstPercentage} onValueChange={(value) => setField("gstPercentage", value)}>
                <SelectTrigger className="h-9 rounded-lg border-border text-sm"><SelectValue /></SelectTrigger>
                <SelectContent>
                  {["0", "3", "5", "18"].map((rate) => <SelectItem key={rate} value={rate}>{rate}%{rate === "3" ? " (Gold/Diamond Jewellery)" : ""}</SelectItem>)}
                </SelectContent>
              </Select>
            </Field>
            <Field label="GST Amount (Auto-calculated)">
              <div className="relative">
                <input readOnly className={READONLY_CLASS} value={gstAmount.toFixed(2)} />
                <Calculator className="absolute right-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground pointer-events-none" />
              </div>
            </Field>
            <Field label="Payment Mode" error={errors.paymentMode}>
              <Select value={form.paymentMode || NONE_VALUE} onValueChange={(value) => setField("paymentMode", value === NONE_VALUE ? "" : value)}>
                <SelectTrigger className="h-9 rounded-lg border-border text-sm"><SelectValue placeholder="Select payment mode" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value={NONE_VALUE}>Select payment mode</SelectItem>
                  {["Cash", "Bank Transfer", "UPI", "Credit", "Cheque"].map((mode) => <SelectItem key={mode} value={mode}>{mode}</SelectItem>)}
                </SelectContent>
              </Select>
            </Field>
            <Field label="Comment / Notes">
              <input className={INPUT_CLASS} value={form.comment} onChange={(event) => setField("comment", event.target.value)} placeholder="Optional notes about the sale" />
            </Field>
          </div>
        </div>

        <div className="flex items-center justify-end gap-2 border-t border-border bg-background px-6 py-4">
          <button type="button" onClick={onClose} className="h-9 rounded-[10px] border border-border px-5 text-sm font-medium text-foreground hover:bg-muted/40 transition-colors">Cancel</button>
          <button type="button" onClick={handleSave} className="h-9 rounded-[10px] bg-foreground px-5 text-sm font-semibold text-background hover:bg-foreground/90 transition-colors">Create Sale</button>
        </div>
      </DialogContent>
    </Dialog>
  );
}