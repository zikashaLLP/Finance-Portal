import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Banknote, Building2, CreditCard } from "lucide-react";
import { AppModal } from "@/shared/components/AppModal";

export interface OpeningBalances {
  cash: number;
  hdfc: number;
  sbi: number;
}

interface OpeningBalanceModalProps {
  open: boolean;
  onClose: () => void;
  balances: OpeningBalances;
  onSave: (balances: OpeningBalances) => void;
}

const ACCOUNTS = [
  {
    key: "cash" as const,
    label: "Cash",
    subtitle: "Physical cash in hand",
    icon: Banknote,
    color: "text-amber-600",
    bg: "bg-amber-50",
    dot: "bg-amber-400",
    border: "border-amber-300",
  },
  {
    key: "hdfc" as const,
    label: "HDFC Bank",
    subtitle: "HDFC current / savings account",
    icon: Building2,
    color: "text-blue-600",
    bg: "bg-blue-50",
    dot: "bg-blue-500",
    border: "border-blue-300",
  },
  {
    key: "sbi" as const,
    label: "SBI Account",
    subtitle: "State Bank of India account",
    icon: CreditCard,
    color: "text-violet-600",
    bg: "bg-violet-50",
    dot: "bg-violet-500",
    border: "border-violet-300",
  },
];

export default function OpeningBalanceModal({
  open,
  onClose,
  balances,
  onSave,
}: OpeningBalanceModalProps) {
  const [values, setValues] = useState<Record<string, string>>({
    cash: "",
    hdfc: "",
    sbi: "",
  });

  useEffect(() => {
    if (open) {
      setValues({
        cash: balances.cash > 0 ? balances.cash.toString() : "",
        hdfc: balances.hdfc > 0 ? balances.hdfc.toString() : "",
        sbi: balances.sbi > 0 ? balances.sbi.toString() : "",
      });
    }
  }, [open, balances]);

  const total =
    (Number(values.cash) || 0) +
    (Number(values.hdfc) || 0) +
    (Number(values.sbi) || 0);

  const fmt = (n: number) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(n);

  const handleSave = () => {
    onSave({
      cash: Number(values.cash) || 0,
      hdfc: Number(values.hdfc) || 0,
      sbi: Number(values.sbi) || 0,
    });
    onClose();
  };

  const icon = (
    <div className="h-10 w-10 rounded-xl bg-foreground flex items-center justify-center shrink-0">
      <Banknote className="h-5 w-5 text-background" />
    </div>
  );

  return (
    <AppModal
      open={open}
      onClose={onClose}
      headerBg="bg-muted/40"
      icon={icon}
      title="Set Opening Balance"
      subtitle="Enter the starting balance for each account"
      primaryLabel="Save Balances"
      onPrimary={handleSave}
    >
      {/* Account rows */}
      <div className="px-6 pt-4 pb-2 bg-background space-y-3">
        {ACCOUNTS.map(({ key, label, subtitle, icon: Icon, color, bg, dot, border }) => (
          <div
            key={key}
            className={`flex items-center gap-4 p-3.5 rounded-[10px] border ${border} bg-muted/30`}
          >
            <div className={`h-9 w-9 rounded-lg ${bg} ${color} flex items-center justify-center shrink-0`}>
              <Icon className="h-4 w-4" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1.5">
                <div className={`h-1.5 w-1.5 rounded-full ${dot}`} />
                <span className="text-sm font-medium text-foreground">{label}</span>
              </div>
              <p className="text-[11px] text-muted-foreground mt-0.5">{subtitle}</p>
            </div>
            <div className="relative w-36 shrink-0">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm font-semibold select-none">₹</span>
              <Input
                type="number"
                value={values[key]}
                onChange={(e) => setValues((prev) => ({ ...prev, [key]: e.target.value }))}
                className="pl-7 h-9 rounded-[8px] bg-white border border-border shadow-sm text-foreground font-semibold text-sm focus-visible:ring-1 focus-visible:ring-foreground/30"
                placeholder="0"
              />
            </div>
          </div>
        ))}
      </div>

      {/* Total row */}
      <div className="mx-6 mt-3 mb-4 flex items-center justify-between px-4 py-3 rounded-[10px] bg-foreground text-background">
        <span className="text-sm font-medium opacity-80">Total Opening Balance</span>
        <span className="text-base font-bold">{fmt(total)}</span>
      </div>
    </AppModal>
  );
}
