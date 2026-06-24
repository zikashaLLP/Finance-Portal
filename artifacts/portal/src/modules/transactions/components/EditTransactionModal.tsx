import { useState, useEffect } from "react";
import { X } from "lucide-react";
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
  onClose: () => void;
  onSave: (updated: Transaction) => void;
}

export default function EditTransactionModal({
  transaction,
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

  if (!transaction) return null;

  const handleSave = () => {
    onSave({
      ...transaction,
      amount: Number(amount) || transaction.amount,
      description,
      account,
      entity,
    });
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/20 backdrop-blur-[2px]" />

      {/* Modal card */}
      <div className="relative z-10 bg-card rounded-2xl shadow-2xl border border-border w-full max-w-md mx-4 overflow-hidden">

        {/* Header */}
        <div className="px-7 pt-7 pb-5 border-b border-border flex items-start justify-between">
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-foreground leading-tight">
              Edit{" "}
              <span className="text-muted-foreground font-normal">Transaction</span>
            </h2>
            <p className="text-sm text-muted-foreground mt-1">
              Update the transaction details below.
            </p>
          </div>
          <button
            onClick={onClose}
            className="h-8 w-8 rounded-full flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted/60 transition-colors mt-0.5"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Body */}
        <div className="px-7 py-6 space-y-5">

          {/* Amount */}
          <div className="space-y-1.5">
            <Label className="text-sm font-medium text-foreground">
              Amount <span className="text-red-500">*</span>
            </Label>
            <div className="relative">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground text-sm font-medium">₹</span>
              <Input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="pl-7 h-10 rounded-xl border-border bg-background text-sm focus-visible:ring-1 focus-visible:ring-foreground"
                placeholder="0"
              />
            </div>
          </div>

          {/* Description */}
          <div className="space-y-1.5">
            <Label className="text-sm font-medium text-foreground">
              Description <span className="text-red-500">*</span>
            </Label>
            <Input
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="h-10 rounded-xl border-border bg-background text-sm focus-visible:ring-1 focus-visible:ring-foreground"
              placeholder="Enter description"
            />
          </div>

          {/* Account */}
          <div className="space-y-1.5">
            <Label className="text-sm font-medium text-foreground">
              Account <span className="text-red-500">*</span>
            </Label>
            <Select value={account} onValueChange={setAccount}>
              <SelectTrigger className="h-10 rounded-xl border-border bg-background text-sm focus:ring-1 focus:ring-foreground w-full">
                <SelectValue placeholder="Select account" />
              </SelectTrigger>
              <SelectContent className="rounded-xl">
                {ACCOUNTS.map((a) => (
                  <SelectItem key={a} value={a} className="text-sm">
                    <div className="flex items-center gap-2">
                      <div className={`h-1.5 w-1.5 rounded-full ${a === "Cash" ? "bg-amber-400" : "bg-blue-500"}`} />
                      {a}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Entity */}
          <div className="space-y-1.5">
            <Label className="text-sm font-medium text-foreground">
              Entity <span className="text-red-500">*</span>
            </Label>
            <Select value={entity} onValueChange={setEntity}>
              <SelectTrigger className="h-10 rounded-xl border-border bg-background text-sm focus:ring-1 focus:ring-foreground w-full">
                <SelectValue placeholder="Select entity" />
              </SelectTrigger>
              <SelectContent className="rounded-xl">
                {ENTITIES.map((e) => (
                  <SelectItem key={e} value={e} className="text-sm">
                    {e}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

        </div>

        {/* Footer */}
        <div className="px-7 py-5 border-t border-border flex items-center justify-end gap-3">
          <Button
            variant="outline"
            onClick={onClose}
            className="rounded-xl h-10 px-5 border-border text-sm font-medium"
          >
            Cancel
          </Button>
          <Button
            onClick={handleSave}
            className="rounded-xl h-10 px-6 bg-foreground text-background hover:bg-foreground/90 text-sm font-medium"
          >
            Save Changes
          </Button>
        </div>
      </div>
    </div>
  );
}
