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

  return (
    <Dialog open={open} onOpenChange={(v) => { if (!v) onClose(); }}>
      <DialogContent className="sm:max-w-[480px] p-0 gap-0 !rounded-3xl overflow-hidden">
        {/* Header */}
        <DialogHeader className="px-6 py-5 border-b border-border">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-lg bg-muted flex items-center justify-center text-muted-foreground">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M11.333 2a1.333 1.333 0 0 1 1.886 1.886L4.886 12.22 2 13l.78-2.887L11.333 2Z" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <div>
              <DialogTitle className="text-base font-semibold leading-tight">
                Edit Transaction
              </DialogTitle>
              <p className="text-xs text-muted-foreground mt-0.5">
                ID: {transaction?.id ?? "—"}
              </p>
            </div>
          </div>
        </DialogHeader>

        {/* Body */}
        <div className="px-6 py-3 space-y-5">
          {/* Amount */}
          <div className="space-y-1.5">
            <Label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
              Amount <span className="text-red-500">*</span>
            </Label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm font-medium">₹</span>
              <Input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="pl-7 h-10 rounded-lg bg-muted/40 border-border focus-visible:ring-1"
                placeholder="0"
              />
            </div>
          </div>

          {/* Description */}
          <div className="space-y-1.5">
            <Label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
              Description <span className="text-red-500">*</span>
            </Label>
            <Input
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="h-10 rounded-lg bg-muted/40 border-border focus-visible:ring-1"
              placeholder="e.g. Gold Sale - Bangle Set"
            />
          </div>

          {/* Two-column: Account + Entity */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                Account <span className="text-red-500">*</span>
              </Label>
              <Select value={account} onValueChange={setAccount}>
                <SelectTrigger className="h-10 rounded-lg bg-muted/40 border-border focus:ring-1 text-sm">
                  <SelectValue placeholder="Select account" />
                </SelectTrigger>
                <SelectContent>
                  {ACCOUNTS.map((a) => (
                    <SelectItem key={a} value={a}>{a}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-1.5">
              <Label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                Entity <span className="text-red-500">*</span>
              </Label>
              <Select value={entity} onValueChange={setEntity}>
                <SelectTrigger className="h-10 rounded-lg bg-muted/40 border-border focus:ring-1 text-sm">
                  <SelectValue placeholder="Select entity" />
                </SelectTrigger>
                <SelectContent>
                  {ENTITIES.map((e) => (
                    <SelectItem key={e} value={e}>{e}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-border flex items-center justify-end gap-3">
          <Button
            variant="outline"
            onClick={onClose}
            className="h-9 px-5 rounded-lg text-sm font-medium"
          >
            Cancel
          </Button>
          <Button
            onClick={handleSave}
            className="h-9 px-5 rounded-lg text-sm font-medium bg-foreground text-background hover:bg-foreground/90"
          >
            Save Changes
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
