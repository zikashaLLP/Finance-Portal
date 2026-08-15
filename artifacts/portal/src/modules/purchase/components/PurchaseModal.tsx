import { useEffect, useMemo, useState } from "react";
import { Calculator, ImagePlus, LockKeyhole, X } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  mockDiamondQualities,
  mockGoldPurity,
  mockGoldTypes,
  mockJewelleryCategories,
  mockJewelleryTypes,
} from "../../settings/data/mockGeneralMasters";
import { mockClients } from "../../settings/data/mockClients";
import { mockVendors } from "../../settings/data/mockVendors";

export type PurchaseSource = "Vendor" | "Client";
export type PurchaseItemType =
  | "Loose Diamond"
  | "Gold Jewellery"
  | "Diamond Jewellery"
  | "Pure Gold"
  | "Old Gold"
  | "Gold Coins";

export interface PurchaseFormValues {
  source: PurchaseSource;
  sellerId: string;
  sellerName: string;
  lotNumber: string;
  itemType: PurchaseItemType;
  itemName: string;
  grossWeight: number;
  diamondCarats: number;
  netWeight: number;
  diamondQuality: string;
  diamondRate: number;
  goldPurity: string;
  labourPerGram: number;
  labourCharges: number;
  extraCharges: number;
  comment: string;
  totalAmount: number;
  paymentMode: string;
  notes: string;
  imageFile: File | null;
}

interface PurchaseModalProps {
  open: boolean;
  onClose: () => void;
  onSave: (purchase: PurchaseFormValues) => void;
}

type FormState = {
  source: PurchaseSource;
  sellerId: string;
  lotNumber: string;
  itemType: PurchaseItemType | "";
  itemName: string;
  grossWeight: string;
  diamondCarats: string;
  diamondQuality: string;
  diamondRate: string;
  goldPurity: string;
  labourPerGram: string;
  extraCharges: string;
  comment: string;
  totalAmount: string;
  paymentMode: string;
  notes: string;
  imageFile: File | null;
};

const EMPTY_FORM: FormState = {
  source: "Vendor",
  sellerId: "",
  lotNumber: "",
  itemType: "",
  itemName: "",
  grossWeight: "",
  diamondCarats: "",
  diamondQuality: "",
  diamondRate: "",
  goldPurity: "",
  labourPerGram: "",
  extraCharges: "0",
  comment: "",
  totalAmount: "",
  paymentMode: "",
  notes: "",
  imageFile: null,
};

const INPUT_CLASS =
  "w-full h-9 px-3 rounded-lg border border-border bg-background text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-foreground/10 focus:border-foreground/30 transition";
const LABEL_CLASS = "block text-[12px] font-medium text-foreground mb-1.5";
const READONLY_CLASS =
  "w-full h-9 px-3 rounded-lg border border-border bg-muted/45 text-sm text-muted-foreground tabular-nums";
const ERROR_CLASS = "text-[11px] text-red-600 mt-1";
const NONE_VALUE = "__none__";

const activeCategories = mockJewelleryCategories.filter((category) => category.status === "Active");
const activeJewelleryTypes = mockJewelleryTypes.filter((item) => item.status === "Active");
const activeGoldPurity = mockGoldPurity.filter((item) => item.status === "Active");
const activeGoldTypes = mockGoldTypes.filter((item) => item.status === "Active");
const activeDiamondQualities = mockDiamondQualities.filter((item) => item.status === "Active");

function numberValue(value: string) {
  const parsed = Number.parseFloat(value);
  return Number.isFinite(parsed) ? parsed : 0;
}

function Field({
  label,
  error,
  children,
  hint,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
  hint?: string;
}) {
  return (
    <div>
      <label className={LABEL_CLASS}>{label}</label>
      {children}
      {hint && !error ? <p className="text-[10px] text-muted-foreground mt-1">{hint}</p> : null}
      {error ? <p className={ERROR_CLASS}>{error}</p> : null}
    </div>
  );
}

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-2 pt-1">
      <span className="h-px flex-1 bg-border" />
      <h3 className="text-[10px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
        {children}
      </h3>
      <span className="h-px flex-1 bg-border" />
    </div>
  );
}

export default function PurchaseModal({ open, onClose, onSave }: PurchaseModalProps) {
  const [form, setForm] = useState<FormState>({ ...EMPTY_FORM });
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    setForm({ ...EMPTY_FORM });
    setErrors({});
  }, [open]);

  const isDiamondInventory =
    form.itemType === "Loose Diamond" || form.itemType === "Diamond Jewellery";
  const isGoldInventory =
    form.itemType === "Gold Jewellery"
    || form.itemType === "Diamond Jewellery"
    || form.itemType === "Pure Gold"
    || form.itemType === "Old Gold"
    || form.itemType === "Gold Coins";

  const netWeight = useMemo(() => {
    const gross = numberValue(form.grossWeight);
    const diamondWeight = numberValue(form.diamondCarats) * 0.2;
    return Math.max(0, gross - diamondWeight);
  }, [form.grossWeight, form.diamondCarats]);

  const labourCharges = useMemo(
    () => netWeight * numberValue(form.labourPerGram),
    [netWeight, form.labourPerGram],
  );

  const sellerOptions = form.source === "Vendor"
    ? mockVendors.filter((vendor) => vendor.status === "Active")
    : mockClients.filter((client) => client.status === "Active");

  const itemNameSuggestions = useMemo(() => {
    if (form.itemType === "Loose Diamond") return ["Loose Diamond"];
    if (form.itemType === "Pure Gold" || form.itemType === "Old Gold" || form.itemType === "Gold Coins") {
      return activeGoldTypes.map((item) => item.type_name);
    }
    const category = activeCategories.find((item) => item.name === form.itemType);
    return category
      ? activeJewelleryTypes
          .filter((item) => item.category_id === category.id)
          .map((item) => item.name)
      : [];
  }, [form.itemType]);

  function setField<K extends keyof FormState>(field: K, value: FormState[K]) {
    setForm((current) => ({ ...current, [field]: value }));
    setErrors((current) => {
      if (!current[field]) return current;
      const next = { ...current };
      delete next[field];
      return next;
    });
  }

  function handleSourceChange(value: PurchaseSource) {
    setForm((current) => ({ ...current, source: value, sellerId: "" }));
    setErrors((current) => {
      const next = { ...current };
      delete next.sellerId;
      return next;
    });
  }

  function handleItemTypeChange(value: PurchaseItemType) {
    const nextSuggestion = value === "Loose Diamond"
      ? "Loose Diamond"
      : value === "Pure Gold"
        ? activeGoldTypes[0]?.type_name ?? ""
        : "";
    setForm((current) => ({ ...current, itemType: value, itemName: nextSuggestion }));
    setErrors((current) => {
      const next = { ...current };
      delete next.itemType;
      delete next.itemName;
      return next;
    });
  }

  function validate() {
    const nextErrors: Record<string, string> = {};
    if (!form.sellerId) nextErrors.sellerId = `Select a ${form.source.toLowerCase()}.`;
    if (!form.lotNumber.trim()) nextErrors.lotNumber = "Lot number is required.";
    if (!form.itemType) nextErrors.itemType = "Select an item type.";
    if (!form.itemName.trim()) nextErrors.itemName = "Enter an item name.";
    if (numberValue(form.grossWeight) <= 0) nextErrors.grossWeight = "Enter a gross weight greater than zero.";
    if (isDiamondInventory && numberValue(form.diamondCarats) < 0) {
      nextErrors.diamondCarats = "Diamond carats cannot be negative.";
    }
    if (isDiamondInventory && !form.diamondQuality) nextErrors.diamondQuality = "Select diamond quality.";
    if (isDiamondInventory && numberValue(form.diamondRate) <= 0) {
      nextErrors.diamondRate = "Enter a diamond rate greater than zero.";
    }
    if (isGoldInventory && form.itemType !== "Diamond Jewellery" && !form.goldPurity) {
      nextErrors.goldPurity = "Select gold purity.";
    }
    if (numberValue(form.labourPerGram) < 0) nextErrors.labourPerGram = "Labour rate cannot be negative.";
    if (numberValue(form.extraCharges) < 0) nextErrors.extraCharges = "Extra charges cannot be negative.";
    if (numberValue(form.totalAmount) <= 0) nextErrors.totalAmount = "Enter a total amount greater than zero.";
    if (!form.paymentMode) nextErrors.paymentMode = "Select a payment mode.";
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  }

  function handleSave() {
    if (!validate()) return;
    const seller = sellerOptions.find((option) => option.id === form.sellerId);
    onSave({
      source: form.source,
      sellerId: form.sellerId,
      sellerName: seller?.name ?? "",
      lotNumber: form.lotNumber.trim(),
      itemType: form.itemType as PurchaseItemType,
      itemName: form.itemName.trim(),
      grossWeight: numberValue(form.grossWeight),
      diamondCarats: numberValue(form.diamondCarats),
      netWeight,
      diamondQuality: form.diamondQuality,
      diamondRate: numberValue(form.diamondRate),
      goldPurity: form.goldPurity,
      labourPerGram: numberValue(form.labourPerGram),
      labourCharges,
      extraCharges: numberValue(form.extraCharges),
      comment: form.comment.trim(),
      totalAmount: numberValue(form.totalAmount),
      paymentMode: form.paymentMode,
      notes: form.notes.trim(),
      imageFile: form.imageFile,
    });
    onClose();
  }

  return (
    <Dialog open={open} onOpenChange={(value) => { if (!value) onClose(); }}>
      <DialogContent className="p-0 gap-0 !rounded-[16px] overflow-hidden border-0 shadow-2xl [&>button]:hidden sm:max-w-[760px]">
        <DialogHeader className="px-6 pt-5 pb-4 border-b border-border bg-background">
          <div className="flex items-start justify-between gap-3">
            <div>
              <DialogTitle className="text-[16px] font-semibold leading-tight text-foreground">
                Record New Purchase
              </DialogTitle>
              <p className="mt-1 text-xs text-muted-foreground">
                Add a supplier or client purchase to your inventory ledger.
              </p>
            </div>
            <button
              type="button"
              onClick={onClose}
              data-testid="button-close-purchase-modal"
              aria-label="Close purchase modal"
              className="h-7 w-7 shrink-0 rounded-full flex items-center justify-center text-muted-foreground hover:bg-muted/60 hover:text-foreground transition-colors"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </DialogHeader>

        <div className="max-h-[72dvh] overflow-y-auto px-6 py-5 space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <Field label="Purchase Source" error={errors.source}>
              <Select value={form.source} onValueChange={(value) => handleSourceChange(value as PurchaseSource)}>
                <SelectTrigger className="h-9 rounded-lg border-border text-sm" data-testid="select-purchase-source">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Vendor">Vendor</SelectItem>
                  <SelectItem value="Client">Client</SelectItem>
                </SelectContent>
              </Select>
            </Field>
            <Field label={`${form.source} Name`} error={errors.sellerId}>
              <Select value={form.sellerId || NONE_VALUE} onValueChange={(value) => setField("sellerId", value === NONE_VALUE ? "" : value)}>
                <SelectTrigger className="h-9 rounded-lg border-border text-sm" data-testid="select-purchase-seller">
                  <SelectValue placeholder={`Select ${form.source.toLowerCase()}`} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value={NONE_VALUE}>Select {form.source.toLowerCase()}</SelectItem>
                  {sellerOptions.map((seller) => (
                    <SelectItem key={seller.id} value={seller.id}>{seller.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </Field>
            <Field label="Lot Number" error={errors.lotNumber}>
              <input
                className={INPUT_CLASS}
                value={form.lotNumber}
                onChange={(event) => setField("lotNumber", event.target.value)}
                placeholder="e.g. GJ-AUTO-571"
                data-testid="input-purchase-lot-number"
              />
            </Field>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Field label="Item Type" error={errors.itemType}>
              <Select value={form.itemType || NONE_VALUE} onValueChange={(value) => {
                if (value !== NONE_VALUE) handleItemTypeChange(value as PurchaseItemType);
              }}>
                <SelectTrigger className="h-9 rounded-lg border-border text-sm" data-testid="select-purchase-item-type">
                  <SelectValue placeholder="Select item type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value={NONE_VALUE}>Select item type</SelectItem>
                  <SelectItem value="Loose Diamond">Loose Diamond</SelectItem>
                  {activeCategories.map((category) => (
                    <SelectItem key={category.id} value={category.name}>{category.name}</SelectItem>
                  ))}
                  <SelectItem value="Pure Gold">Pure Gold</SelectItem>
                  <SelectItem value="Old Gold">Old Gold</SelectItem>
                  <SelectItem value="Gold Coins">Gold Coins</SelectItem>
                </SelectContent>
              </Select>
            </Field>
            <Field label="Item Name" error={errors.itemName} hint="Use a master suggestion or enter a custom description.">
              <input
                className={INPUT_CLASS}
                list="purchase-item-name-suggestions"
                value={form.itemName}
                onChange={(event) => setField("itemName", event.target.value)}
                placeholder="e.g. CHAIN 22K"
                data-testid="input-purchase-item-name"
              />
              <datalist id="purchase-item-name-suggestions">
                {itemNameSuggestions.map((name) => <option key={name} value={name} />)}
              </datalist>
            </Field>
          </div>

          <SectionHeading>Inventory measurements</SectionHeading>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <Field label="Gross Weight (g)" error={errors.grossWeight}>
              <input
                className={INPUT_CLASS}
                type="number"
                min="0"
                step="0.001"
                value={form.grossWeight}
                onChange={(event) => setField("grossWeight", event.target.value)}
                placeholder="0.000"
                data-testid="input-purchase-gross-weight"
              />
            </Field>
            <Field label="Diamond Carats (ct)" error={errors.diamondCarats} hint={isDiamondInventory ? "1 ct is deducted as 0.2 g from net weight." : "Optional for gold-only purchases."}>
              <input
                className={INPUT_CLASS}
                type="number"
                min="0"
                step="0.01"
                value={form.diamondCarats}
                onChange={(event) => setField("diamondCarats", event.target.value)}
                placeholder="0.00"
                disabled={!isDiamondInventory}
                data-testid="input-purchase-diamond-carats"
              />
            </Field>
            <Field label="Net Weight (g)" hint="Auto: gross weight minus diamond weight.">
              <div className="relative">
                <input readOnly className={READONLY_CLASS} value={netWeight.toFixed(3)} data-testid="text-purchase-net-weight" />
                <LockKeyhole className="absolute right-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground pointer-events-none" />
              </div>
            </Field>
          </div>

          {isDiamondInventory ? (
            <div className="rounded-xl border border-border bg-muted/20 p-4 space-y-3">
              <div className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-sky-500" />
                <h3 className="text-xs font-semibold text-foreground">Diamond inventory</h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <Field label="Diamond Quality" error={errors.diamondQuality}>
                  <Select value={form.diamondQuality || NONE_VALUE} onValueChange={(value) => setField("diamondQuality", value === NONE_VALUE ? "" : value)}>
                    <SelectTrigger className="h-9 rounded-lg border-border text-sm bg-background" data-testid="select-purchase-diamond-quality">
                      <SelectValue placeholder="Select quality" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value={NONE_VALUE}>Select quality</SelectItem>
                      {activeDiamondQualities.map((quality) => (
                        <SelectItem key={quality.id} value={quality.quality_name}>{quality.quality_name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </Field>
                <Field label="Diamond Rate (₹ / ct)" error={errors.diamondRate}>
                  <input
                    className={INPUT_CLASS}
                    type="number"
                    min="0"
                    step="0.01"
                    value={form.diamondRate}
                    onChange={(event) => setField("diamondRate", event.target.value)}
                    placeholder="0.00"
                    data-testid="input-purchase-diamond-rate"
                  />
                </Field>
              </div>
            </div>
          ) : null}

          {isGoldInventory ? (
            <div className="rounded-xl border border-border bg-muted/20 p-4 space-y-3">
              <div className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-amber-500" />
                <h3 className="text-xs font-semibold text-foreground">Gold inventory</h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <Field label={`Gold Purity${form.itemType === "Diamond Jewellery" ? " (Optional)" : ""}`} error={errors.goldPurity}>
                  <Select value={form.goldPurity || NONE_VALUE} onValueChange={(value) => setField("goldPurity", value === NONE_VALUE ? "" : value)}>
                    <SelectTrigger className="h-9 rounded-lg border-border text-sm bg-background" data-testid="select-purchase-gold-purity">
                      <SelectValue placeholder="Select purity" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value={NONE_VALUE}>Select purity</SelectItem>
                      {activeGoldPurity.map((purity) => (
                        <SelectItem key={purity.id} value={purity.karat}>
                          {purity.karat} · {purity.purity}%
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </Field>
                <Field label="Labour / Gram (₹)" error={errors.labourPerGram}>
                  <input
                    className={INPUT_CLASS}
                    type="number"
                    min="0"
                    step="0.01"
                    value={form.labourPerGram}
                    onChange={(event) => setField("labourPerGram", event.target.value)}
                    placeholder="0.00"
                    data-testid="input-purchase-labour-rate"
                  />
                </Field>
                <Field label="Labour Charge (₹)" hint="Auto: net weight × labour / gram.">
                  <div className="relative">
                    <input readOnly className={READONLY_CLASS} value={labourCharges.toFixed(2)} data-testid="text-purchase-labour-charge" />
                    <Calculator className="absolute right-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground pointer-events-none" />
                  </div>
                </Field>
              </div>
            </div>
          ) : null}

          <SectionHeading>Commercial details</SectionHeading>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <Field label="Extra Charges (₹)" error={errors.extraCharges}>
              <input
                className={INPUT_CLASS}
                type="number"
                min="0"
                step="0.01"
                value={form.extraCharges}
                onChange={(event) => setField("extraCharges", event.target.value)}
                placeholder="0.00"
                data-testid="input-purchase-extra-charges"
              />
            </Field>
            <Field label="Total Amount (₹)" error={errors.totalAmount}>
              <input
                className={`${INPUT_CLASS} font-semibold`}
                type="number"
                min="0"
                step="0.01"
                value={form.totalAmount}
                onChange={(event) => setField("totalAmount", event.target.value)}
                placeholder="0.00"
                data-testid="input-purchase-total-amount"
              />
            </Field>
            <Field label="Payment Mode" error={errors.paymentMode}>
              <Select value={form.paymentMode || NONE_VALUE} onValueChange={(value) => setField("paymentMode", value === NONE_VALUE ? "" : value)}>
                <SelectTrigger className="h-9 rounded-lg border-border text-sm" data-testid="select-purchase-payment-mode">
                  <SelectValue placeholder="Select payment mode" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value={NONE_VALUE}>Select payment mode</SelectItem>
                  <SelectItem value="Cash">Cash</SelectItem>
                  <SelectItem value="Bank Transfer">Bank Transfer</SelectItem>
                  <SelectItem value="UPI">UPI</SelectItem>
                  <SelectItem value="Credit">Credit</SelectItem>
                  <SelectItem value="Cheque">Cheque</SelectItem>
                </SelectContent>
              </Select>
            </Field>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Field label="Comment">
              <textarea
                className="w-full min-h-[72px] resize-none rounded-lg border border-border bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-foreground/10 focus:border-foreground/30 transition"
                value={form.comment}
                onChange={(event) => setField("comment", event.target.value)}
                placeholder="Short note about this purchase"
                data-testid="textarea-purchase-comment"
              />
            </Field>
            <Field label="Notes">
              <textarea
                className="w-full min-h-[72px] resize-none rounded-lg border border-border bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-foreground/10 focus:border-foreground/30 transition"
                value={form.notes}
                onChange={(event) => setField("notes", event.target.value)}
                placeholder="Internal notes for the ledger"
                data-testid="textarea-purchase-notes"
              />
            </Field>
          </div>

          <div>
            <label
              htmlFor="purchase-image"
              className="inline-flex h-9 items-center gap-2 rounded-lg border border-dashed border-border px-3 text-xs font-medium text-muted-foreground hover:border-foreground/40 hover:text-foreground cursor-pointer transition-colors"
            >
              <ImagePlus className="h-3.5 w-3.5" />
              {form.imageFile ? form.imageFile.name : "Attach purchase image"}
            </label>
            <input
              id="purchase-image"
              type="file"
              accept="image/*"
              className="sr-only"
              onChange={(event) => setField("imageFile", event.target.files?.[0] ?? null)}
              data-testid="input-purchase-image"
            />
            <p className="mt-1 text-[10px] text-muted-foreground">Optional. JPG, PNG or WEBP.</p>
          </div>
        </div>

        <div className="flex items-center justify-end gap-2 border-t border-border bg-background px-6 py-4">
          <button
            type="button"
            onClick={onClose}
            data-testid="button-cancel-purchase"
            className="h-9 rounded-[10px] border border-border px-5 text-sm font-medium text-foreground hover:bg-muted/40 transition-colors"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSave}
            data-testid="button-record-purchase"
            className="h-9 rounded-[10px] bg-foreground px-5 text-sm font-semibold text-background hover:bg-foreground/90 transition-colors"
          >
            Record Purchase
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}