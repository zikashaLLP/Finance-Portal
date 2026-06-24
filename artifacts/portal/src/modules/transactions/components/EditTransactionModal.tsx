import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
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
import { ArrowDownLeft, ArrowUpRight, X } from "lucide-react";
import { Transaction } from "../data/mockTransactions";

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

  return (
    <Dialog open={open} onOpenChange={(v) => { if (!v) onClose(); }}>
      <DialogContent className="sm:max-w-[460px] p-0 gap-0 !rounded-[15px] overflow-hidden border-0 shadow-2xl [&>button]:hidden">

        {/* Coloured header band */}
        <div className={`px-6 pt-5 pb-4 ${isIncome ? "bg-emerald-50" : "bg-red-50"}`}>
          <DialogHeader>
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-3">
                {/* Icon circle */}
                <div className={`h-10 w-10 rounded-xl flex items-center justify-center shrink-0 ${isIncome ? "bg-emerald-100 text-emerald-600" : "bg-red-100 text-red-500"}`}>
                  {isIncome
                    ? <ArrowDownLeft className="h-5 w-5" />
                    : <ArrowUpRight className="h-5 w-5" />
                  }
                </div>
                <div>
                  <DialogTitle className="text-[15px] font-semibold leading-tight text-foreground">
                    Edit Transaction
                  </DialogTitle>
                  <div className="flex items-center gap-2 mt-1">
                    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold tracking-wide uppercase ${isIncome ? "bg-emerald-100 text-emerald-700" : "bg-red-100 text-red-600"}`}>
                      {transaction?.type ?? "—"}
                    </span>
                    <span className="text-[11px] text-muted-foreground font-mono">{transaction?.id ?? "—"}</span>
                  </div>
                </div>
              </div>
              {/* Close button */}
              <button
                onClick={onClose}
                className="h-7 w-7 rounded-full flex items-center justify-center text-muted-foreground hover:bg-black/10 transition-colors mt-0.5"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </DialogHeader>
        </div>

        {/* Body */}
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

        {/* Footer */}
        <div className="px-6 py-4 border-t border-border flex items-center justify-end gap-2.5 bg-background">
          <Button
            variant="outline"
            onClick={onClose}
            className="h-9 px-5 rounded-[10px] text-sm font-medium border-border"
          >
            Cancel
          </Button>
          <Button
            onClick={handleSave}
            className="h-9 px-5 rounded-[10px] text-sm font-medium bg-foreground text-background hover:bg-foreground/90"
          >
            Save Changes
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
