import { useState, useMemo } from "react";
import {
  FileSpreadsheet, Eye, ClipboardList, Plus, Diamond,
  PackageCheck, Search, Filter, MoreHorizontal, X,
  Layers, IndianRupee, Package, CheckCircle2, Clock,
} from "lucide-react";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { mockKarigars } from "../data/mockKarigar";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle,
} from "@/components/ui/dialog";

/* ═══════════════════════════════════════════════
   TYPES & MOCK DATA
═══════════════════════════════════════════════ */
type LotStatus = "pending" | "in_progress" | "completed" | "dispatched";
type JewType   = "Gold Jewellery" | "Silver Jewellery" | "Diamond Jewellery";

interface LotOrder {
  id: string;
  lotNumber: string;
  karigar: string;
  client: string;
  jewelleryType: JewType;
  description: string;
  pieces: number;
  totalGoldWeight: number;
  totalDiamond: number;
  totalCost: number;
  status: LotStatus;
  createdDate: string;
  dueDate: string;
}

const LOTS: LotOrder[] = [
  { id:"l1",  lotNumber:"LOT-2026-001", karigar:"DILIP BHAI SURAT",     client:"Divya Reddy",         jewelleryType:"Diamond Jewellery", description:"Nose pin assortment — CVD diamonds 2,3,4ct",  pieces:12, totalGoldWeight:8.400,  totalDiamond:3.600, totalCost:245000, status:"completed",   createdDate:"01/07/2026", dueDate:"14/07/2026" },
  { id:"l2",  lotNumber:"LOT-2026-002", karigar:"HIRANMAY DADA",         client:"Mahak Mam",            jewelleryType:"Gold Jewellery",    description:"Pendant set — oval + cushion designs",        pieces:8,  totalGoldWeight:12.500, totalDiamond:0,     totalCost:180000, status:"in_progress", createdDate:"02/07/2026", dueDate:"18/07/2026" },
  { id:"l3",  lotNumber:"LOT-2026-003", karigar:"DILIP BHAI SURAT",     client:"SJ STOCK",             jewelleryType:"Gold Jewellery",    description:"Nath lot — plain gold 22K",                   pieces:20, totalGoldWeight:5.000,  totalDiamond:0,     totalCost:95000,  status:"completed",   createdDate:"03/07/2026", dueDate:"14/07/2026" },
  { id:"l4",  lotNumber:"LOT-2026-004", karigar:"AMRESH DADA",           client:"Meena Shah",           jewelleryType:"Diamond Jewellery", description:"Ring collection — solitaire & pavé",          pieces:6,  totalGoldWeight:14.200, totalDiamond:2.400, totalCost:380000, status:"in_progress", createdDate:"04/07/2026", dueDate:"20/07/2026" },
  { id:"l5",  lotNumber:"LOT-2026-005", karigar:"NITIN KARIGAR UNIQUE", client:"Custom Client",         jewelleryType:"Gold Jewellery",    description:"Earrings batch — long drop designs",          pieces:15, totalGoldWeight:18.600, totalDiamond:0,     totalCost:210000, status:"pending",     createdDate:"05/07/2026", dueDate:"22/07/2026" },
  { id:"l6",  lotNumber:"LOT-2026-006", karigar:"HIRANMAY DADA",         client:"TANMAY SIR",           jewelleryType:"Diamond Jewellery", description:"Bracelet lot — tennis style CVD",             pieces:4,  totalGoldWeight:22.000, totalDiamond:8.000, totalCost:560000, status:"pending",     createdDate:"06/07/2026", dueDate:"25/07/2026" },
  { id:"l7",  lotNumber:"LOT-2026-007", karigar:"BHAGIRATH DADA",        client:"SUSHMA GUPTA",         jewelleryType:"Gold Jewellery",    description:"Chain + pendant combo set — 22K",             pieces:10, totalGoldWeight:35.000, totalDiamond:0,     totalCost:420000, status:"dispatched",  createdDate:"28/06/2026", dueDate:"10/07/2026" },
  { id:"l8",  lotNumber:"LOT-2026-008", karigar:"DILIP BHAI SURAT",     client:"DARSHANA DIDI",        jewelleryType:"Diamond Jewellery", description:"Bracelet — 7g gold with Natural diamonds",    pieces:2,  totalGoldWeight:14.002, totalDiamond:1.200, totalCost:620000, status:"dispatched",  createdDate:"25/06/2026", dueDate:"11/07/2026" },
  { id:"l9",  lotNumber:"LOT-2026-009", karigar:"HIRANMAY DADA",         client:"VAIBHAV BHAI",         jewelleryType:"Gold Jewellery",    description:"Ring lot — fancy cut 22K yellow gold",        pieces:18, totalGoldWeight:45.000, totalDiamond:0,     totalCost:540000, status:"in_progress", createdDate:"07/07/2026", dueDate:"21/07/2026" },
  { id:"l10", lotNumber:"LOT-2026-010", karigar:"AMRESH DADA",           client:"MADHAVI DIDI",         jewelleryType:"Gold Jewellery",    description:"Tanmaniya set — traditional 22K",             pieces:5,  totalGoldWeight:10.000, totalDiamond:0,     totalCost:120000, status:"pending",     createdDate:"08/07/2026", dueDate:"24/07/2026" },
];

const STATUS_META: Record<LotStatus, { label: string; cls: string; dot: string }> = {
  pending:     { label:"Pending",     cls:"bg-amber-50 text-amber-700 border-amber-200",   dot:"bg-amber-500"   },
  in_progress: { label:"In Progress", cls:"bg-blue-50 text-blue-700 border-blue-200",      dot:"bg-blue-500"    },
  completed:   { label:"Completed",   cls:"bg-emerald-50 text-emerald-700 border-emerald-200", dot:"bg-emerald-500" },
  dispatched:  { label:"Dispatched",  cls:"bg-purple-50 text-purple-700 border-purple-200",dot:"bg-purple-500"  },
};

const fmtAmt = (n: number) =>
  new Intl.NumberFormat("en-IN", { style:"currency", currency:"INR", maximumFractionDigits:0 }).format(n);

/* ═══════════════════════════════════════════════
   CREATE ORDER MODAL
═══════════════════════════════════════════════ */
function CreateLotModal({ open, onClose, onAdd }: {
  open: boolean; onClose: () => void;
  onAdd: (lot: Omit<LotOrder, "id">) => void;
}) {
  const [karigar, setKarigar]     = useState("");
  const [client, setClient]       = useState("");
  const [jewType, setJewType]     = useState<JewType>("Gold Jewellery");
  const [desc, setDesc]           = useState("");
  const [pieces, setPieces]       = useState("");
  const [goldWt, setGoldWt]       = useState("");
  const [diamond, setDiamond]     = useState("");
  const [cost, setCost]           = useState("");
  const [dueDate, setDueDate]     = useState("");

  const inputCls = "w-full h-10 px-3 rounded-lg border border-border bg-background text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-foreground/20";

  function reset() {
    setKarigar(""); setClient(""); setJewType("Gold Jewellery");
    setDesc(""); setPieces(""); setGoldWt(""); setDiamond(""); setCost(""); setDueDate("");
  }

  function handleAdd() {
    if (!karigar || !client || !desc || !pieces) return;
    const today = new Date().toLocaleDateString("en-IN", { day:"2-digit", month:"2-digit", year:"numeric" }).replace(/\//g, "/");
    onAdd({
      lotNumber: `LOT-2026-${String(Math.floor(Math.random() * 900) + 100)}`,
      karigar, client, jewelleryType: jewType, description: desc,
      pieces: parseInt(pieces) || 0,
      totalGoldWeight: parseFloat(goldWt) || 0,
      totalDiamond: parseFloat(diamond) || 0,
      totalCost: parseFloat(cost) || 0,
      status: "pending",
      createdDate: today,
      dueDate: dueDate || today,
    });
    reset(); onClose();
  }

  const selectCls = "h-10 rounded-lg border-border text-sm";
  const canAdd = karigar && client && desc && pieces;

  return (
    <Dialog open={open} onOpenChange={(v) => { if (!v) { reset(); onClose(); } }}>
      <DialogContent className="max-w-2xl rounded-2xl p-0 gap-0">
        <DialogHeader className="px-6 pt-5 pb-4 border-b border-border">
          <DialogTitle className="text-[15px] font-semibold text-foreground">Create Lot Order</DialogTitle>
          <p className="text-[11px] text-muted-foreground mt-0.5">Create a new bulk manufacturing lot</p>
        </DialogHeader>
        <div className="px-6 pt-4 pb-5 space-y-4 max-h-[70vh] overflow-y-auto no-scrollbar">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-muted-foreground mb-1.5">Karigar <span className="text-red-500">*</span></label>
              <Select value={karigar} onValueChange={setKarigar}>
                <SelectTrigger className={selectCls}><SelectValue placeholder="Select karigar" /></SelectTrigger>
                <SelectContent>{mockKarigars.map((k) => <SelectItem key={k.id} value={k.name}>{k.name}</SelectItem>)}</SelectContent>
              </Select>
            </div>
            <div>
              <label className="block text-xs font-medium text-muted-foreground mb-1.5">Client <span className="text-red-500">*</span></label>
              <input type="text" placeholder="Client name" value={client} onChange={(e) => setClient(e.target.value)} className={inputCls} />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-muted-foreground mb-1.5">Jewellery Type</label>
              <Select value={jewType} onValueChange={(v) => setJewType(v as JewType)}>
                <SelectTrigger className={selectCls}><SelectValue /></SelectTrigger>
                <SelectContent>
                  {(["Gold Jewellery","Silver Jewellery","Diamond Jewellery"] as JewType[]).map((j) => <SelectItem key={j} value={j}>{j}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="block text-xs font-medium text-muted-foreground mb-1.5">Pieces <span className="text-red-500">*</span></label>
              <input type="number" placeholder="e.g. 10" value={pieces} onChange={(e) => setPieces(e.target.value)} className={inputCls} />
            </div>
          </div>
          <div>
            <label className="block text-xs font-medium text-muted-foreground mb-1.5">Description <span className="text-red-500">*</span></label>
            <input type="text" placeholder="Describe the lot (item types, design details)" value={desc} onChange={(e) => setDesc(e.target.value)} className={inputCls} />
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-medium text-muted-foreground mb-1.5">Total Gold Weight (g)</label>
              <input type="number" placeholder="0.000" value={goldWt} onChange={(e) => setGoldWt(e.target.value)} className={inputCls} />
            </div>
            <div>
              <label className="block text-xs font-medium text-muted-foreground mb-1.5">Total Diamond (ct)</label>
              <input type="number" placeholder="0.000" value={diamond} onChange={(e) => setDiamond(e.target.value)} className={inputCls} />
            </div>
            <div>
              <label className="block text-xs font-medium text-muted-foreground mb-1.5">Total Cost (₹)</label>
              <input type="number" placeholder="0" value={cost} onChange={(e) => setCost(e.target.value)} className={inputCls} />
            </div>
          </div>
          <div>
            <label className="block text-xs font-medium text-muted-foreground mb-1.5">Due Date</label>
            <input type="text" placeholder="DD/MM/YYYY" value={dueDate} onChange={(e) => setDueDate(e.target.value)} className={inputCls} />
          </div>
        </div>
        <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-border">
          <button onClick={() => { reset(); onClose(); }} className="h-9 px-4 rounded-lg text-sm font-medium border border-border hover:bg-muted/40 transition-colors">Cancel</button>
          <button onClick={handleAdd} disabled={!canAdd}
            className={cn("h-9 px-5 rounded-lg text-sm font-medium transition-colors",
              canAdd ? "bg-foreground text-background hover:bg-foreground/90" : "bg-foreground/30 text-background/60 cursor-not-allowed")}>
            Create Lot
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

/* ═══════════════════════════════════════════════
   LOT DETAIL DRAWER
═══════════════════════════════════════════════ */
function LotDetailModal({ lot, onClose }: { lot: LotOrder | null; onClose: () => void }) {
  if (!lot) return null;
  const sm = STATUS_META[lot.status];
  const Row = ({ label, value }: { label: string; value: string }) => (
    <div className="flex items-start justify-between py-2.5 border-b border-border last:border-0">
      <span className="text-xs text-muted-foreground w-40 shrink-0">{label}</span>
      <span className="text-xs font-medium text-foreground text-right">{value}</span>
    </div>
  );
  return (
    <Dialog open={!!lot} onOpenChange={(v) => { if (!v) onClose(); }}>
      <DialogContent className="max-w-md rounded-2xl p-0 gap-0">
        <DialogHeader className="px-6 pt-5 pb-4 border-b border-border">
          <div className="flex items-center justify-between">
            <DialogTitle className="text-[15px] font-semibold text-foreground">{lot.lotNumber}</DialogTitle>
            <span className={cn("inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold border", sm.cls)}>
              <span className={cn("h-1.5 w-1.5 rounded-full shrink-0", sm.dot)} /> {sm.label}
            </span>
          </div>
        </DialogHeader>
        <div className="px-6 py-4">
          <Row label="Karigar"          value={lot.karigar} />
          <Row label="Client"           value={lot.client} />
          <Row label="Jewellery Type"   value={lot.jewelleryType} />
          <Row label="Description"      value={lot.description} />
          <Row label="Pieces"           value={String(lot.pieces)} />
          <Row label="Total Gold"       value={`${lot.totalGoldWeight.toFixed(3)}g`} />
          <Row label="Total Diamond"    value={lot.totalDiamond > 0 ? `${lot.totalDiamond.toFixed(3)}ct` : "—"} />
          <Row label="Total Cost"       value={fmtAmt(lot.totalCost)} />
          <Row label="Created"          value={lot.createdDate} />
          <Row label="Due Date"         value={lot.dueDate} />
        </div>
        <div className="px-6 pb-5">
          <button onClick={onClose} className="w-full h-9 rounded-lg bg-foreground text-background text-sm font-medium hover:bg-foreground/90 transition-colors">
            Close
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

/* ═══════════════════════════════════════════════
   ISSUE DIAMONDS MODAL
═══════════════════════════════════════════════ */
function IssueDiamondsModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [lotNumber, setLotNumber]   = useState("");
  const [karigar, setKarigar]       = useState("");
  const [quality, setQuality]       = useState("CVD");
  const [weight, setWeight]         = useState("");
  const [comment, setComment]       = useState("");
  const inputCls = "w-full h-10 px-3 rounded-lg border border-border bg-background text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-foreground/20";

  function reset() { setLotNumber(""); setKarigar(""); setQuality("CVD"); setWeight(""); setComment(""); }

  return (
    <Dialog open={open} onOpenChange={(v) => { if (!v) { reset(); onClose(); } }}>
      <DialogContent className="max-w-md rounded-2xl p-0 gap-0">
        <DialogHeader className="px-6 pt-5 pb-4 border-b border-border">
          <DialogTitle className="text-[15px] font-semibold text-foreground">Issue Diamonds</DialogTitle>
          <p className="text-[11px] text-muted-foreground mt-0.5">Issue loose diamonds against a lot</p>
        </DialogHeader>
        <div className="px-6 pt-4 pb-5 space-y-4">
          <div>
            <label className="block text-xs font-medium text-muted-foreground mb-1.5">Lot Number</label>
            <input type="text" placeholder="e.g. LOT-2026-001" value={lotNumber} onChange={(e) => setLotNumber(e.target.value)} className={inputCls} />
          </div>
          <div>
            <label className="block text-xs font-medium text-muted-foreground mb-1.5">Karigar</label>
            <Select value={karigar} onValueChange={setKarigar}>
              <SelectTrigger className="h-10 rounded-lg border-border text-sm"><SelectValue placeholder="Select karigar" /></SelectTrigger>
              <SelectContent>{mockKarigars.map((k) => <SelectItem key={k.id} value={k.name}>{k.name}</SelectItem>)}</SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-muted-foreground mb-1.5">Quality</label>
              <Select value={quality} onValueChange={setQuality}>
                <SelectTrigger className="h-10 rounded-lg border-border text-sm"><SelectValue /></SelectTrigger>
                <SelectContent>{["CVD","2D","3D","Natural"].map((q) => <SelectItem key={q} value={q}>{q}</SelectItem>)}</SelectContent>
              </Select>
            </div>
            <div>
              <label className="block text-xs font-medium text-muted-foreground mb-1.5">Weight (ct)</label>
              <input type="number" placeholder="0.000" value={weight} onChange={(e) => setWeight(e.target.value)} className={inputCls} />
            </div>
          </div>
          <div>
            <label className="block text-xs font-medium text-muted-foreground mb-1.5">Comment</label>
            <input type="text" placeholder="Optional note" value={comment} onChange={(e) => setComment(e.target.value)} className={inputCls} />
          </div>
        </div>
        <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-border">
          <button onClick={() => { reset(); onClose(); }} className="h-9 px-4 rounded-lg text-sm font-medium border border-border hover:bg-muted/40 transition-colors">Cancel</button>
          <button onClick={() => { reset(); onClose(); }} className="h-9 px-5 rounded-lg bg-foreground text-background text-sm font-medium hover:bg-foreground/90 transition-colors">
            Issue Diamonds
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

/* ═══════════════════════════════════════════════
   PROCESS RECEIPT MODAL
═══════════════════════════════════════════════ */
function ProcessReceiptModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [lotNumber, setLotNumber] = useState("");
  const [karigar, setKarigar]     = useState("");
  const [grossWt, setGrossWt]     = useState("");
  const [netWt, setNetWt]         = useState("");
  const [labour, setLabour]       = useState("");
  const inputCls = "w-full h-10 px-3 rounded-lg border border-border bg-background text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-foreground/20";
  function reset() { setLotNumber(""); setKarigar(""); setGrossWt(""); setNetWt(""); setLabour(""); }

  return (
    <Dialog open={open} onOpenChange={(v) => { if (!v) { reset(); onClose(); } }}>
      <DialogContent className="max-w-md rounded-2xl p-0 gap-0">
        <DialogHeader className="px-6 pt-5 pb-4 border-b border-border">
          <DialogTitle className="text-[15px] font-semibold text-foreground">Process Receipt</DialogTitle>
          <p className="text-[11px] text-muted-foreground mt-0.5">Record completed jewellery receipt from karigar</p>
        </DialogHeader>
        <div className="px-6 pt-4 pb-5 space-y-4">
          <div>
            <label className="block text-xs font-medium text-muted-foreground mb-1.5">Lot Number</label>
            <input type="text" placeholder="e.g. LOT-2026-001" value={lotNumber} onChange={(e) => setLotNumber(e.target.value)} className={inputCls} />
          </div>
          <div>
            <label className="block text-xs font-medium text-muted-foreground mb-1.5">Karigar</label>
            <Select value={karigar} onValueChange={setKarigar}>
              <SelectTrigger className="h-10 rounded-lg border-border text-sm"><SelectValue placeholder="Select karigar" /></SelectTrigger>
              <SelectContent>{mockKarigars.map((k) => <SelectItem key={k.id} value={k.name}>{k.name}</SelectItem>)}</SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-muted-foreground mb-1.5">Gross Weight (g)</label>
              <input type="number" placeholder="0.000" value={grossWt} onChange={(e) => setGrossWt(e.target.value)} className={inputCls} />
            </div>
            <div>
              <label className="block text-xs font-medium text-muted-foreground mb-1.5">Net Weight (g)</label>
              <input type="number" placeholder="0.000" value={netWt} onChange={(e) => setNetWt(e.target.value)} className={inputCls} />
            </div>
          </div>
          <div>
            <label className="block text-xs font-medium text-muted-foreground mb-1.5">Labour Charges (₹)</label>
            <input type="number" placeholder="0" value={labour} onChange={(e) => setLabour(e.target.value)} className={inputCls} />
          </div>
        </div>
        <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-border">
          <button onClick={() => { reset(); onClose(); }} className="h-9 px-4 rounded-lg text-sm font-medium border border-border hover:bg-muted/40 transition-colors">Cancel</button>
          <button onClick={() => { reset(); onClose(); }} className="h-9 px-5 rounded-lg bg-foreground text-background text-sm font-medium hover:bg-foreground/90 transition-colors">
            Process Receipt
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

/* ═══════════════════════════════════════════════
   ORDER FORM MODAL
═══════════════════════════════════════════════ */
function OrderFormModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  return (
    <Dialog open={open} onOpenChange={(v) => { if (!v) onClose(); }}>
      <DialogContent className="max-w-2xl rounded-2xl p-0 gap-0">
        <DialogHeader className="px-6 pt-5 pb-4 border-b border-border">
          <DialogTitle className="text-[15px] font-semibold text-foreground">Manufacturing Order Form</DialogTitle>
          <p className="text-[11px] text-muted-foreground mt-0.5">Printable lot manufacturing order form</p>
        </DialogHeader>
        <div className="px-6 py-8 text-center">
          <div className="h-14 w-14 rounded-2xl bg-muted flex items-center justify-center mx-auto mb-4">
            <ClipboardList className="h-7 w-7 text-muted-foreground/50" />
          </div>
          <p className="text-sm font-medium text-foreground mb-1">Order Form Preview</p>
          <p className="text-xs text-muted-foreground">Select a lot to generate a printable order form</p>
        </div>
        <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-border">
          <button onClick={onClose} className="h-9 px-4 rounded-lg text-sm font-medium border border-border hover:bg-muted/40 transition-colors">Close</button>
          <button className="h-9 px-5 rounded-lg bg-foreground text-background text-sm font-medium hover:bg-foreground/90 transition-colors">Print Form</button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

/* ═══════════════════════════════════════════════
   MAIN PAGE
═══════════════════════════════════════════════ */
export default function BulkManagement() {
  const [lots, setLots]           = useState<LotOrder[]>(LOTS);
  const [search, setSearch]       = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [karigarFilter, setKarigarFilter] = useState("all");

  const [showCreate, setShowCreate]   = useState(false);
  const [showIssue, setShowIssue]     = useState(false);
  const [showReceipt, setShowReceipt] = useState(false);
  const [showForm, setShowForm]       = useState(false);
  const [viewLot, setViewLot]         = useState<LotOrder | null>(null);

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return lots.filter((l) => {
      const matchSearch = !q || l.lotNumber.toLowerCase().includes(q)
        || l.karigar.toLowerCase().includes(q) || l.client.toLowerCase().includes(q)
        || l.description.toLowerCase().includes(q);
      const matchStatus = statusFilter === "all" || l.status === statusFilter;
      const matchKarigar = karigarFilter === "all" || l.karigar === karigarFilter;
      return matchSearch && matchStatus && matchKarigar;
    });
  }, [lots, search, statusFilter, karigarFilter]);

  const totalPieces = lots.reduce((s, l) => s + l.pieces, 0);
  const totalCost   = lots.reduce((s, l) => s + l.totalCost, 0);
  const completed   = lots.filter((l) => l.status === "completed" || l.status === "dispatched").length;

  function handleAdd(lot: Omit<LotOrder, "id">) {
    setLots((prev) => [{ ...lot, id: crypto.randomUUID() }, ...prev]);
  }

  const btnOutline = "flex items-center gap-1.5 h-9 px-4 rounded-xl text-sm font-medium border border-border hover:bg-muted/40 transition-colors whitespace-nowrap";
  const btnBlack   = "flex items-center gap-1.5 h-9 px-4 rounded-xl bg-foreground text-background text-sm font-medium hover:bg-foreground/90 transition-colors whitespace-nowrap";

  return (
    <div className="w-full flex flex-col h-full">

      {/* ── Header ── */}
      <div className="px-8 pt-6 pb-5 border-b border-border shrink-0">
        <div className="flex items-start justify-between gap-6">
          <div>
            <h1 className="text-2xl font-semibold text-foreground tracking-tight mb-0.5">Bulk Manufacturing System</h1>
            <p className="text-sm text-muted-foreground">Manage lot-based jewellery manufacturing</p>
          </div>
          <div className="flex items-center gap-2 flex-wrap justify-end">
            <button className={btnOutline}>
              <FileSpreadsheet className="h-3.5 w-3.5" /> Export to Excel
            </button>
            <button className={btnOutline} onClick={() => {}}>
              <Eye className="h-3.5 w-3.5" /> View Orders
            </button>
            <button className={btnOutline} onClick={() => setShowForm(true)}>
              <ClipboardList className="h-3.5 w-3.5" /> Order Form
            </button>
            <button className={btnBlack} onClick={() => setShowCreate(true)}>
              <Plus className="h-3.5 w-3.5" /> Create Order
            </button>
            <button className={btnOutline} onClick={() => setShowIssue(true)}>
              <Diamond className="h-3.5 w-3.5" /> Issue Diamonds
            </button>
            <button className={btnOutline} onClick={() => setShowReceipt(true)}>
              <PackageCheck className="h-3.5 w-3.5" /> Process Receipt
            </button>
          </div>
        </div>
      </div>

      {/* ── Scrollable body ── */}
      <div className="flex-1 overflow-y-auto no-scrollbar p-8 space-y-6">

        {/* METRIC CARDS */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-card border border-border rounded-2xl shadow-sm p-5 flex items-center justify-between hover:shadow-md transition-all duration-200">
            <div>
              <p className="text-xs font-medium text-muted-foreground mb-1.5 uppercase tracking-wider">Total Lots</p>
              <p className="text-2xl font-bold text-foreground tabular-nums">{lots.length}</p>
            </div>
            <div className="h-11 w-11 rounded-xl bg-muted flex items-center justify-center">
              <Layers className="h-5 w-5 text-foreground/60" />
            </div>
          </div>
          <div className="bg-card border border-border rounded-2xl shadow-sm p-5 flex items-center justify-between hover:shadow-md transition-all duration-200">
            <div>
              <p className="text-xs font-medium text-muted-foreground mb-1.5 uppercase tracking-wider">Total Pieces</p>
              <p className="text-2xl font-bold text-foreground tabular-nums">{totalPieces}</p>
            </div>
            <div className="h-11 w-11 rounded-xl bg-muted flex items-center justify-center">
              <Package className="h-5 w-5 text-foreground/60" />
            </div>
          </div>
          <div className="bg-card border border-border rounded-2xl shadow-sm p-5 flex items-center justify-between hover:shadow-md transition-all duration-200">
            <div>
              <p className="text-xs font-medium text-muted-foreground mb-1.5 uppercase tracking-wider">Completed</p>
              <p className="text-2xl font-bold text-emerald-700 tabular-nums">{completed}</p>
            </div>
            <div className="h-11 w-11 rounded-xl bg-muted flex items-center justify-center">
              <CheckCircle2 className="h-5 w-5 text-emerald-600" />
            </div>
          </div>
          <div className="bg-card border border-border rounded-2xl shadow-sm p-5 flex items-center justify-between hover:shadow-md transition-all duration-200">
            <div>
              <p className="text-xs font-medium text-muted-foreground mb-1.5 uppercase tracking-wider">Total Value</p>
              <p className="text-2xl font-bold text-foreground tabular-nums">{fmtAmt(totalCost)}</p>
            </div>
            <div className="h-11 w-11 rounded-xl bg-muted flex items-center justify-center">
              <IndianRupee className="h-5 w-5 text-foreground/60" />
            </div>
          </div>
        </div>

        {/* MANUFACTURING ORDERS TABLE */}
        <div className="bg-card border border-border rounded-2xl shadow-sm overflow-hidden">
          {/* Table header bar */}
          <div className="px-6 py-4 border-b border-border flex items-center justify-between gap-4 flex-wrap">
            <div className="flex items-center gap-2">
              <Layers className="h-4 w-4 text-muted-foreground" />
              <h3 className="text-sm font-semibold text-foreground">Manufacturing Orders</h3>
              <span className="inline-flex items-center px-2 py-0.5 rounded-md bg-muted text-[11px] font-medium text-muted-foreground border border-border">
                {filtered.length}
              </span>
            </div>
            <div className="flex items-center gap-2 flex-wrap">
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground/60" />
                <input type="text" placeholder="Search lots, karigars, clients…" value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="h-9 pl-9 pr-3 w-64 rounded-xl border border-border bg-background text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-foreground/20" />
                {search && <button onClick={() => setSearch("")} className="absolute right-2.5 top-1/2 -translate-y-1/2"><X className="h-3 w-3 text-muted-foreground" /></button>}
              </div>
              {/* Status filter */}
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="h-9 w-36 rounded-xl border-border text-sm">
                  <Filter className="h-3.5 w-3.5 mr-1.5 text-muted-foreground" /><SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="in_progress">In Progress</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="dispatched">Dispatched</SelectItem>
                </SelectContent>
              </Select>
              {/* Karigar filter */}
              <Select value={karigarFilter} onValueChange={setKarigarFilter}>
                <SelectTrigger className="h-9 w-44 rounded-xl border-border text-sm"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Karigars</SelectItem>
                  {mockKarigars.map((k) => <SelectItem key={k.id} value={k.name}>{k.name}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-muted/40">
                  {["Lot Number","Karigar","Client","Description","Pieces","Total Cost","Status","Actions"].map((h) => (
                    <th key={h} className="px-4 py-3 text-left text-[11px] font-semibold text-muted-foreground uppercase tracking-wider whitespace-nowrap">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map((lot, i) => {
                  const sm = STATUS_META[lot.status];
                  return (
                    <tr key={lot.id} className={cn(
                      "border-b border-border last:border-0 hover:bg-muted/20 transition-colors group",
                      i % 2 !== 0 && "bg-muted/[0.04]",
                    )}>
                      {/* Lot Number */}
                      <td className="px-4 py-3.5">
                        <span className="font-mono text-xs font-bold text-foreground">{lot.lotNumber}</span>
                        <p className="text-[10px] text-muted-foreground mt-0.5">{lot.jewelleryType}</p>
                      </td>
                      {/* Karigar */}
                      <td className="px-4 py-3.5">
                        <div className="flex items-center gap-2">
                          <div className="h-6 w-6 rounded-md bg-foreground flex items-center justify-center text-[10px] font-bold text-background shrink-0">
                            {lot.karigar.charAt(0)}
                          </div>
                          <span className="text-xs font-medium text-foreground leading-tight max-w-[110px] line-clamp-2">{lot.karigar}</span>
                        </div>
                      </td>
                      {/* Client */}
                      <td className="px-4 py-3.5 text-xs text-muted-foreground max-w-[100px]">
                        <span className="line-clamp-1">{lot.client}</span>
                      </td>
                      {/* Description */}
                      <td className="px-4 py-3.5 text-xs text-muted-foreground max-w-[180px]">
                        <span className="line-clamp-2 leading-relaxed">{lot.description}</span>
                      </td>
                      {/* Pieces */}
                      <td className="px-4 py-3.5">
                        <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-muted border border-border text-xs font-semibold text-foreground">
                          <Package className="h-3 w-3 text-muted-foreground" /> {lot.pieces}
                        </div>
                      </td>
                      {/* Cost */}
                      <td className="px-4 py-3.5 tabular-nums text-xs font-bold text-foreground">
                        {fmtAmt(lot.totalCost)}
                        {lot.totalDiamond > 0 && (
                          <p className="text-[10px] text-muted-foreground mt-0.5 font-normal">{lot.totalDiamond.toFixed(2)}ct dia</p>
                        )}
                      </td>
                      {/* Status */}
                      <td className="px-4 py-3.5">
                        <span className={cn("inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold border", sm.cls)}>
                          <span className={cn("h-1.5 w-1.5 rounded-full shrink-0", sm.dot)} />
                          {sm.label}
                        </span>
                      </td>
                      {/* Actions */}
                      <td className="px-4 py-3.5">
                        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button onClick={() => setViewLot(lot)}
                            className="h-7 w-7 flex items-center justify-center rounded-lg border border-border text-muted-foreground hover:text-foreground hover:bg-muted/40 transition-colors" title="View">
                            <Eye className="h-3.5 w-3.5" />
                          </button>
                          <button className="h-7 w-7 flex items-center justify-center rounded-lg border border-border text-muted-foreground hover:text-foreground hover:bg-muted/40 transition-colors" title="More">
                            <MoreHorizontal className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
                {filtered.length === 0 && (
                  <tr>
                    <td colSpan={8} className="px-4 py-14 text-center">
                      <div className="flex flex-col items-center gap-3">
                        <div className="h-12 w-12 rounded-2xl bg-muted flex items-center justify-center">
                          <Layers className="h-6 w-6 text-muted-foreground/40" />
                        </div>
                        <p className="text-sm font-medium text-foreground">No lots found</p>
                        <p className="text-xs text-muted-foreground/60">Try adjusting your search or filters</p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between px-6 py-3.5 border-t border-border bg-muted/20">
            <p className="text-xs text-muted-foreground">
              Showing {filtered.length} of {lots.length} lots
            </p>
            <div className="flex items-center gap-4 text-xs text-muted-foreground">
              <span>
                <span className="font-semibold text-foreground">{filtered.reduce((s, l) => s + l.pieces, 0)}</span> pieces
              </span>
              <span>
                Total: <span className="font-semibold text-foreground">{fmtAmt(filtered.reduce((s, l) => s + l.totalCost, 0))}</span>
              </span>
            </div>
          </div>
        </div>

      </div>

      {/* ── Modals ── */}
      <CreateLotModal  open={showCreate}  onClose={() => setShowCreate(false)}  onAdd={handleAdd} />
      <IssueDiamondsModal open={showIssue} onClose={() => setShowIssue(false)} />
      <ProcessReceiptModal open={showReceipt} onClose={() => setShowReceipt(false)} />
      <OrderFormModal  open={showForm}   onClose={() => setShowForm(false)} />
      <LotDetailModal  lot={viewLot}     onClose={() => setViewLot(null)} />
    </div>
  );
}
