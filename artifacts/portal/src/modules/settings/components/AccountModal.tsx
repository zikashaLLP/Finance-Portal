import { useState, useEffect } from "react";
import { Landmark } from "lucide-react";
import { AppModal } from "@/shared/components/AppModal";
import { type Account, type AccountType, type AccountStatus } from "../data/mockAccounts";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const INPUT_CLS =
  "w-full h-9 px-3 rounded-lg border border-border bg-background text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-foreground/10 focus:border-foreground/30 transition";
const LABEL_CLS = "block text-xs font-medium text-muted-foreground mb-1";
const SECTION_CLS = "space-y-3 rounded-xl border border-border bg-muted/20 px-4 py-3.5";
const SECTION_TITLE_CLS = "text-[11px] font-semibold text-muted-foreground uppercase tracking-wider mb-3";

type FormData = Omit<Account, "id" | "created_at" | "updated_at">;

const EMPTY: FormData = {
  account_name: "",
  type: "Cash",
  opening_balance: 0,
  current_balance: 0,
  bank_name: "",
  ifsc_code: "",
  account_number: "",
  status: "Active",
};

interface AccountModalProps {
  open: boolean;
  onClose: () => void;
  onSave: (data: FormData) => void;
  initial?: Account | null;
}

export function AccountModal({ open, onClose, onSave, initial }: AccountModalProps) {
  const [form, setForm] = useState<FormData>(EMPTY);

  useEffect(() => {
    if (open) {
      setForm(
        initial
          ? {
              account_name:    initial.account_name,
              type:            initial.type,
              opening_balance: initial.opening_balance,
              current_balance: initial.current_balance,
              bank_name:       initial.bank_name    ?? "",
              ifsc_code:       initial.ifsc_code    ?? "",
              account_number:  initial.account_number ?? "",
              status:          initial.status,
            }
          : { ...EMPTY }
      );
    }
  }, [open, initial]);

  function set<K extends keyof FormData>(key: K, value: FormData[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  function handleTypeChange(value: AccountType) {
    setForm((prev) => ({
      ...prev,
      type: value,
      // clear bank fields when switching to Cash
      ...(value === "Cash" ? { bank_name: "", ifsc_code: "", account_number: "" } : {}),
    }));
  }

  function handleSave() {
    if (!form.account_name.trim()) return;
    if (form.type === "Bank Account" && (!form.bank_name?.trim() || !form.account_number?.trim())) return;
    onSave(form);
  }

  const isEdit   = !!initial;
  const isBank   = form.type === "Bank Account";

  return (
    <AppModal
      open={open}
      onClose={onClose}
      maxWidth="sm:max-w-[580px]"
      headerBg="bg-violet-50"
      icon={
        <div className="h-9 w-9 rounded-full bg-violet-600 flex items-center justify-center shrink-0">
          <Landmark className="h-4 w-4 text-white" />
        </div>
      }
      title={isEdit ? "Edit Account" : "Add Account"}
      subtitle={isEdit ? `Editing ${initial?.account_name}` : "Set up a cash or bank account"}
      primaryLabel={isEdit ? "Save Changes" : "Add Account"}
      onPrimary={handleSave}
    >
      <div className="px-6 pt-4 pb-5 space-y-4">

        {/* Basic Info */}
        <div className={SECTION_CLS}>
          <p className={SECTION_TITLE_CLS}>Account Info</p>
          <div className="grid grid-cols-2 gap-3">
            <div className="col-span-2">
              <label className={LABEL_CLS}>Account Name <span className="text-red-500">*</span></label>
              <input
                className={INPUT_CLS}
                placeholder="e.g. Main Cash Counter"
                value={form.account_name}
                onChange={(e) => set("account_name", e.target.value)}
              />
            </div>
            <div>
              <label className={LABEL_CLS}>Account Type <span className="text-red-500">*</span></label>
              <Select value={form.type} onValueChange={(v) => handleTypeChange(v as AccountType)}>
                <SelectTrigger className="h-9 rounded-lg border-border text-sm">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Cash">Cash</SelectItem>
                  <SelectItem value="Bank Account">Bank Account</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className={LABEL_CLS}>Status</label>
              <Select value={form.status} onValueChange={(v) => set("status", v as AccountStatus)}>
                <SelectTrigger className="h-9 rounded-lg border-border text-sm">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Active">Active</SelectItem>
                  <SelectItem value="Deactive">Deactive</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Bank Details — shown only when type = Bank Account */}
        {isBank && (
          <div className={SECTION_CLS}>
            <p className={SECTION_TITLE_CLS}>Bank Details</p>
            <div className="grid grid-cols-2 gap-3">
              <div className="col-span-2">
                <label className={LABEL_CLS}>Bank Name <span className="text-red-500">*</span></label>
                <input
                  className={INPUT_CLS}
                  placeholder="e.g. HDFC Bank"
                  value={form.bank_name}
                  onChange={(e) => set("bank_name", e.target.value)}
                />
              </div>
              <div>
                <label className={LABEL_CLS}>Account Number <span className="text-red-500">*</span></label>
                <input
                  className={INPUT_CLS}
                  placeholder="e.g. 50100123456789"
                  value={form.account_number}
                  onChange={(e) => set("account_number", e.target.value)}
                />
              </div>
              <div>
                <label className={LABEL_CLS}>IFSC Code</label>
                <input
                  className={INPUT_CLS}
                  placeholder="e.g. HDFC0001234"
                  value={form.ifsc_code}
                  onChange={(e) => set("ifsc_code", e.target.value.toUpperCase())}
                />
              </div>
            </div>
          </div>
        )}

        {/* Balances */}
        <div className={SECTION_CLS}>
          <p className={SECTION_TITLE_CLS}>Balance</p>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className={LABEL_CLS}>Opening Balance (₹)</label>
              <input
                className={INPUT_CLS}
                type="number"
                min="0"
                placeholder="0.00"
                value={form.opening_balance === 0 ? "" : form.opening_balance}
                onChange={(e) => set("opening_balance", parseFloat(e.target.value) || 0)}
              />
            </div>
            <div>
              <label className={LABEL_CLS}>Current Balance (₹)</label>
              <input
                className={INPUT_CLS}
                type="number"
                min="0"
                placeholder="0.00"
                value={form.current_balance === 0 ? "" : form.current_balance}
                onChange={(e) => set("current_balance", parseFloat(e.target.value) || 0)}
              />
            </div>
          </div>
          <p className="text-[11px] text-muted-foreground mt-2">
            Opening balance is the amount at account creation. Current balance reflects all transactions.
          </p>
        </div>

      </div>
    </AppModal>
  );
}
