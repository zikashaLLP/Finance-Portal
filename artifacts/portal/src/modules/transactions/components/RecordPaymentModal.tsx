import { useState } from "react";
import { format } from "date-fns";
import { CalendarIcon, X, ArrowUpRight, ArrowDownLeft } from "lucide-react";
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
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";

const PAYMENT_MODES = ["Cash", "HDFC Bank", "SBI Account", "UPI", "Cheque", "NEFT / RTGS"];

const CATEGORY_OPTIONS = [
  { value: "expense", label: "Expense" },
  { value: "karigar", label: "Karigar" },
  { value: "vendor", label: "Vendor" },
  { value: "client", label: "Client" },
];

const CATEGORY_ITEMS: Record<string, string[]> = {
  expense: ["Shop Electricity", "Staff Salary", "Packaging Material", "Security Services", "Maintenance"],
  karigar: ["Ali Hassan", "Ramesh Kumar", "Suresh Patel", "Dinesh Sonar", "Vijay Goldsmith"],
  vendor: ["Malabar Bullion", "Supreme Packaging", "Tanishq Wholesale", "Rajasthan Gems", "Delhi Metals"],
  client: ["Rahul Sharma", "Sunita Verma", "Priya Desai", "Karan Patel", "Meera Reddy", "Amit Kumar"],
};

type PaymentTab = "made" | "received";

interface RecordPaymentModalProps {
  open: boolean;
  onClose: () => void;
}

export default function RecordPaymentModal({ open, onClose }: RecordPaymentModalProps) {
  const [tab, setTab] = useState<PaymentTab>("made");
  const [category, setCategory] = useState("");
  const [partyName, setPartyName] = useState("");
  const [amount, setAmount] = useState("");
  const [paymentMode, setPaymentMode] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState<Date>(new Date());
  const [calendarOpen, setCalendarOpen] = useState(false);

  const handleTabChange = (t: PaymentTab) => {
    setTab(t);
    setCategory("");
    setPartyName("");
  };

  const handleCategoryChange = (val: string) => {
    setCategory(val);
    setPartyName("");
  };

  const handleReset = () => {
    setTab("made");
    setCategory("");
    setPartyName("");
    setAmount("");
    setPaymentMode("");
    setDescription("");
    setDate(new Date());
    setCalendarOpen(false);
  };

  const handleClose = () => {
    handleReset();
    onClose();
  };

  const isMade = tab === "made";

  return (
    <Dialog open={open} onOpenChange={(v) => { if (!v) handleClose(); }}>
      <DialogContent className="sm:max-w-[500px] p-0 gap-0 !rounded-[15px] overflow-hidden border-0 shadow-2xl [&>button]:hidden">

        {/* Header */}
        <div className={`px-6 pt-5 pb-4 border-b border-border ${isMade ? "bg-red-50" : "bg-emerald-50"}`}>
          <DialogHeader>
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className={`h-10 w-10 rounded-xl flex items-center justify-center shrink-0 ${isMade ? "bg-red-100 text-red-500" : "bg-emerald-100 text-emerald-600"}`}>
                  {isMade ? <ArrowUpRight className="h-5 w-5" /> : <ArrowDownLeft className="h-5 w-5" />}
                </div>
                <div>
                  <DialogTitle className="text-[15px] font-semibold leading-tight text-foreground">
                    Record Payment
                  </DialogTitle>
                  <p className="text-[11px] text-muted-foreground mt-0.5">
                    {isMade ? "Record an outgoing payment" : "Record an incoming payment"}
                  </p>
                </div>
              </div>
              <button
                onClick={handleClose}
                className="h-7 w-7 rounded-full flex items-center justify-center text-muted-foreground hover:bg-black/10 transition-colors mt-0.5"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </DialogHeader>
        </div>

        {/* Tab toggle */}
        <div className="px-6 pt-4">
          <div className="flex gap-1 p-1 bg-muted rounded-[10px]">
            {(["made", "received"] as PaymentTab[]).map((t) => (
              <button
                key={t}
                onClick={() => handleTabChange(t)}
                className={`flex-1 h-8 rounded-[8px] text-sm font-medium transition-all duration-200 ${
                  tab === t
                    ? "bg-background text-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {t === "made" ? "Payment Made" : "Payment Received"}
              </button>
            ))}
          </div>
        </div>

        {/* Form body */}
        <div className="px-6 pt-4 pb-5 space-y-4 bg-background">

          {/* Row 1: Payment To/From + Party Name */}
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <Label className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">
                {isMade ? "Payment To" : "Payment From"} <span className="text-red-500">*</span>
              </Label>
              <Select value={category} onValueChange={handleCategoryChange}>
                <SelectTrigger className="h-10 rounded-[10px] bg-muted/50 border-border text-sm focus:ring-1">
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent className="rounded-xl">
                  {CATEGORY_OPTIONS.map((opt) => (
                    <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-1.5">
              <Label className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">
                {category ? CATEGORY_OPTIONS.find(c => c.value === category)?.label : "Name"} <span className="text-red-500">*</span>
              </Label>
              <Select value={partyName} onValueChange={setPartyName} disabled={!category}>
                <SelectTrigger className="h-10 rounded-[10px] bg-muted/50 border-border text-sm focus:ring-1 disabled:opacity-50">
                  <SelectValue placeholder={category ? "Select name" : "Select type first"} />
                </SelectTrigger>
                <SelectContent className="rounded-xl">
                  {(CATEGORY_ITEMS[category] ?? []).map((name) => (
                    <SelectItem key={name} value={name}>{name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Row 2: Amount + Payment Mode */}
          <div className="grid grid-cols-2 gap-3">
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
                  className="pl-7 h-10 rounded-[10px] bg-muted/50 border-border font-semibold focus-visible:ring-1 focus-visible:ring-foreground/20"
                  placeholder="0"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <Label className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">
                Payment Mode <span className="text-red-500">*</span>
              </Label>
              <Select value={paymentMode} onValueChange={setPaymentMode}>
                <SelectTrigger className="h-10 rounded-[10px] bg-muted/50 border-border text-sm focus:ring-1">
                  <SelectValue placeholder="Select mode" />
                </SelectTrigger>
                <SelectContent className="rounded-xl">
                  {PAYMENT_MODES.map((m) => (
                    <SelectItem key={m} value={m}>{m}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Row 3: Description */}
          <div className="space-y-1.5">
            <Label className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">
              Description
            </Label>
            <Input
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="h-10 rounded-[10px] bg-muted/50 border-border focus-visible:ring-1 focus-visible:ring-foreground/20"
              placeholder="Optional note about this payment"
            />
          </div>

          {/* Row 4: Transaction Date */}
          <div className="space-y-1.5">
            <Label className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">
              Transaction Date <span className="text-red-500">*</span>
            </Label>
            <Popover open={calendarOpen} onOpenChange={setCalendarOpen}>
              <PopoverTrigger asChild>
                <button className="w-full flex items-center gap-2.5 h-10 px-3 rounded-[10px] bg-muted/50 border border-border text-sm font-medium text-foreground hover:bg-muted/70 transition-colors focus:outline-none focus:ring-1 focus:ring-foreground/20">
                  <CalendarIcon className="h-4 w-4 text-muted-foreground shrink-0" />
                  {format(date, "dd MMM yyyy")}
                </button>
              </PopoverTrigger>
              <PopoverContent
                className="w-[608px] p-0 rounded-xl border border-border shadow-xl z-[200]"
                align="start"
                sideOffset={6}
              >
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={(d) => { if (d) { setDate(d); setCalendarOpen(false); } }}
                  className="rounded-xl"
                  style={{ "--cell-size": "80px" } as React.CSSProperties}
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-border flex items-center justify-between bg-background">
          <button
            onClick={handleReset}
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            Clear all
          </button>
          <div className="flex items-center gap-2.5">
            <Button
              variant="outline"
              onClick={handleClose}
              className="h-9 px-5 rounded-[10px] text-sm font-medium border-border"
            >
              Cancel
            </Button>
            <Button
              className={`h-9 px-5 rounded-[10px] text-sm font-medium text-background ${isMade ? "bg-red-500 hover:bg-red-600" : "bg-emerald-600 hover:bg-emerald-700"}`}
            >
              {isMade ? "Record Payment" : "Record Receipt"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
