import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
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

const ACCOUNT_OPTIONS = ["Cash", "HDFC Bank", "SBI Account"];

const ENTITY_OPTIONS = [
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
    const parsedAmount = parseFloat(amount.replace(/,/g, ""));
    if (isNaN(parsedAmount) || parsedAmount <= 0) return;
    onSave({ ...transaction, amount: parsedAmount, description, account, entity });
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={(v) => { if (!v) onClose(); }}>
      <DialogContent className="sm:max-w-[480px] rounded-2xl p-0 overflow-hidden">
        <DialogHeader className="px-6 pt-6 pb-4 border-b border-border">
          <DialogTitle className="text-base font-semibold text-foreground">
            Edit Transaction
          </DialogTitle>
        </DialogHeader>

        <div className="px-6 py-5 space-y-5">
          {/* Amount */}
          <div className="space-y-1.5">
            <Label className="text-sm font-medium text-foreground">Amount (₹)</Label>
            <Input
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="0"
              className="h-10 rounded-lg border-border bg-background text-foreground"
              type="number"
              min={0}
            />
          </div>

          {/* Description */}
          <div className="space-y-1.5">
            <Label className="text-sm font-medium text-foreground">Description</Label>
            <Input
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter description"
              className="h-10 rounded-lg border-border bg-background text-foreground"
            />
          </div>

          {/* Entity */}
          <div className="space-y-1.5">
            <Label className="text-sm font-medium text-foreground">Entity</Label>
            <Select value={entity} onValueChange={setEntity}>
              <SelectTrigger className="h-10 rounded-lg border-border bg-background text-foreground w-full">
                <SelectValue placeholder="Select entity" />
              </SelectTrigger>
              <SelectContent>
                {ENTITY_OPTIONS.map((e) => (
                  <SelectItem key={e} value={e}>{e}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Account */}
          <div className="space-y-1.5">
            <Label className="text-sm font-medium text-foreground">Account</Label>
            <Select value={account} onValueChange={setAccount}>
              <SelectTrigger className="h-10 rounded-lg border-border bg-background text-foreground w-full">
                <SelectValue placeholder="Select account" />
              </SelectTrigger>
              <SelectContent>
                {ACCOUNT_OPTIONS.map((a) => (
                  <SelectItem key={a} value={a}>{a}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <DialogFooter className="px-6 pb-6 pt-2 flex gap-2 justify-end">
          <Button
            variant="outline"
            onClick={onClose}
            className="rounded-lg border-border text-foreground hover:bg-muted/50"
          >
            Cancel
          </Button>
          <Button
            onClick={handleSave}
            className="rounded-lg bg-foreground text-background hover:bg-foreground/90"
          >
            Save Changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
