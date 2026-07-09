import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ArrowDownLeft, ArrowUpRight } from "lucide-react";
import { Transaction } from "../data/mockTransactions";
import { AppModal } from "@/shared/components/AppModal";

const ACCOUNTS = ["Cash", "HDFC Bank", "SBI Account"];

const ENTITIES = [
  "Rahul Sharma",
  "Ali Hassan",
  "Sunita Verma",
  "Malabar Bullion",
  "BESCOM",
  "Priya Desai",
  "Multiple",
  "Karan Patel",
  "Supreme Packaging",
  "Amit Kumar",
  "SafeGuard Co.",
  "Meera Reddy",
];

interface EditTransactionModalProps {
  transaction: Transaction | null;
  open: boolean;
  onClose: () => void;
  onSave: (updated: Transaction) => void;
}

export default function EditTransactionModal({
  transaction,
  open,
  onClose,
  onSave,
}: EditTransactionModalProps) {
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [account, setAccount] = useState("");
  const [entity, setEntity] = useState("");

  useEffect(() => {
    if (transaction) {
      setAmount(transaction.amount.toString());
      setDescription(transaction.description);
      setAccount(transaction.account);
      setEntity(transaction.entity);
    }
  }, [transaction]);

  const handleSave = () => {
    if (!transaction) return;
    onSave({
      ...transaction,
      amount: Number(amount) || transaction.amount,
      description,
      account,
      entity,
    });
    onClose();
  };

  const isIncome = transaction?.type === "income";

  const icon = (
    <div className={`h-10 w-10 rounded-xl flex items-center justify-center shrink-0 ${isIncome ? "bg-emerald-100 text-emerald-600" : "bg-red-100 text-red-500"}`}>
      {isIncome ? <ArrowDownLeft className="h-5 w-5" /> : <ArrowUpRight className="h-5 w-5" />}
    </div>
  );

  const subtitle = (
    <div className="flex items-center gap-2">
      <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold tracking-wide uppercase ${isIncome ? "bg-emerald-100 text-emerald-700" : "bg-red-100 text-red-600"}`}>
        {transaction?.type ?? "—"}
      </span>
      <span className="text-[11px] text-muted-foreground font-mono">{transaction?.id ?? "—"}</span>
    </div>
  );

  return (
    <AppModal
      open={open}
      onClose={onClose}
      headerBg={isIncome ? "bg-emerald-50" : "bg-red-50"}
      icon={icon}
      title="Edit Transaction"
      subtitle={subtitle}
      primaryLabel="Save Changes"
      onPrimary={handleSave}
    >
      <div className="px-6 pt-4 pb-5 space-y-4 bg-background">
        {/* Amount */}
        <div className="space-y-1.5">
          <Label className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">
            Amount <span className="text-red-500">*</span>
          </Label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm font-semibold select-none">₹</span>
            <Input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="pl-7 h-10 rounded-[10px] bg-muted/50 border-border text-foreground font-semibold focus-visible:ring-1 focus-visible:ring-foreground/20"
              placeholder="0"
            />
          </div>
        </div>

        {/* Description */}
        <div className="space-y-1.5">
          <Label className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">
            Description <span className="text-red-500">*</span>
          </Label>
          <Input
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="h-10 rounded-[10px] bg-muted/50 border-border focus-visible:ring-1 focus-visible:ring-foreground/20"
            placeholder="e.g. Gold Sale - Bangle Set"
          />
        </div>

        {/* Two-column: Account + Entity */}
        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-1.5">
            <Label className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">
              Account <span className="text-red-500">*</span>
            </Label>
            <Select value={account} onValueChange={setAccount}>
              <SelectTrigger className="h-10 rounded-[10px] bg-muted/50 border-border focus:ring-1 text-sm">
                <SelectValue placeholder="Select account" />
              </SelectTrigger>
              <SelectContent className="rounded-xl">
                {ACCOUNTS.map((a) => (
                  <SelectItem key={a} value={a}>{a}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-1.5">
            <Label className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">
              Entity <span className="text-red-500">*</span>
            </Label>
            <Select value={entity} onValueChange={setEntity}>
              <SelectTrigger className="h-10 rounded-[10px] bg-muted/50 border-border focus:ring-1 text-sm">
                <SelectValue placeholder="Select entity" />
              </SelectTrigger>
              <SelectContent className="rounded-xl">
                {ENTITIES.map((e) => (
                  <SelectItem key={e} value={e}>{e}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
    </AppModal>
  );
}
