import { useState, useMemo } from "react";
import { Plus, Filter, Eye, Pencil, Trash2, Search, Printer, Diamond, ChevronDown } from "lucide-react";
import SharedPagination from "@/shared/components/Pagination";
import { cn } from "@/lib/utils";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  mockKarigars,
  mockOrders,
  mockDiamondRecords,
  type Karigar,
  type KarigarOrder,
  type DiamondRecord,
} from "../data/mockKarigar";

type MainTab = "karigars" | "pending" | "executed" | "diamonds" | "issue" | "receive";

const PAGE_SIZE = 10;

const fmtW  = (n: number) => `${n.toFixed(3)}g`;
const fmtCt = (n: number) => `${n.toFixed(3)}ct`;

/* ══════════════════════════════════════════════
   ADD KARIGAR MODAL
══════════════════════════════════════════════ */
function AddKarigarModal({ open, onClose, onAdd }: {
  open: boolean;
  onClose: () => void;
  onAdd: (k: Omit<Karigar, "id">) => void;
}) {
  const [name, setName]       = useState("");
  const [phone, setPhone]     = useState("");
  const [address, setAddress] = useState("");

  function handleAdd() {
    if (!name.trim()) return;
    onAdd({ name: name.trim(), phone: phone.trim() || "-", address: address.trim() || "-" });
    setName(""); setPhone(""); setAddress("");
    onClose();
  }
  function handleClose() { setName(""); setPhone(""); setAddress(""); onClose(); }

  const inputCls = "w-full h-10 px-3 rounded-lg border border-border bg-background text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-foreground/10 focus:border-foreground/30 transition";

  return (
    <Dialog open={open} onOpenChange={(v) => { if (!v) handleClose(); }}>
      <DialogContent className="p-0 gap-0 !rounded-[15px] overflow-hidden border-0 shadow-2xl [&>button]:hidden sm:max-w-[420px]">
        <div className="px-6 pt-5 pb-4 bg-muted/40">
          <DialogHeader>
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="h-9 w-9 rounded-full bg-foreground flex items-center justify-center shrink-0">
                  <Plus className="h-4 w-4 text-background" />
                </div>
                <div>
                  <DialogTitle className="text-[15px] font-semibold text-foreground">Add Karigar</DialogTitle>
                  <p className="text-[11px] text-muted-foreground mt-0.5">Register a new karigar in the system</p>
                </div>
              </div>
              <button onClick={handleClose} className="h-7 w-7 rounded-full flex items-center justify-center text-muted-foreground hover:bg-black/10 transition-colors text-lg leading-none shrink-0">×</button>
            </div>
          </DialogHeader>
        </div>
        <div className="px-6 pt-5 pb-2 space-y-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-1.5">Name <span className="text-red-500">*</span></label>
            <input type="text" placeholder="Enter karigar name" value={name} onChange={(e) => setName(e.target.value)} className={inputCls} />
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-1.5">Phone</label>
            <input type="tel" placeholder="Enter phone number" value={phone} onChange={(e) => setPhone(e.target.value)} className={inputCls} />
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-1.5">Address</label>
            <input type="text" placeholder="Enter address" value={address} onChange={(e) => setAddress(e.target.value)} className={inputCls} />
          </div>
        </div>
        <div className="px-6 py-4 border-t border-border flex items-center justify-end gap-2.5 bg-background mt-3">
          <button onClick={handleClose} className="h-9 px-5 rounded-[10px] text-sm font-medium border border-border hover:bg-muted/40 transition-colors">Cancel</button>
          <button onClick={handleAdd} disabled={!name.trim()} className={cn("h-9 px-5 rounded-[10px] text-sm font-medium transition-colors", name.trim() ? "bg-foreground text-background hover:bg-foreground/90" : "bg-foreground/30 text-background/60 cursor-not-allowed")}>Add Karigar</button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

/* ══════════════════════════════════════════════
   CREATE ORDER MODAL
══════════════════════════════════════════════ */
function CreateOrderModal({ open, onClose, karigars }: {
  open: boolean;
  onClose: () => void;
  karigars: Karigar[];
}) {
  const inputCls = "w-full h-10 px-3 rounded-lg border border-border bg-background text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-foreground/10 focus:border-foreground/30 transition";

  const [karigarId, setKarigarId]       = useState("");
  const [client, setClient]             = useState("");
  const [customClient, setCustomClient] = useState("");
  const [jewType, setJewType]           = useState("Gold Jewellery");
  const [itemType, setItemType]         = useState("");
  const [itemName, setItemName]         = useState("");
  const [goldWeight, setGoldWeight]     = useState("0.000");
  const [karat, setKarat]               = useState("");
  const [color, setColor]               = useState("");
  const [labour, setLabour]             = useState("0.00");
  const [budget, setBudget]             = useState("0.00");
  const [description, setDescription]   = useState("");

  function handleClose() {
    setKarigarId(""); setClient(""); setCustomClient(""); setJewType("Gold Jewellery");
    setItemType(""); setItemName(""); setGoldWeight("0.000"); setKarat(""); setColor("");
    setLabour("0.00"); setBudget("0.00"); setDescription("");
    onClose();
  }

  const labourNum = parseFloat(labour) || 0;
  const weightNum = parseFloat(goldWeight) || 0;
  const computed  = (labourNum * weightNum).toFixed(2);

  return (
    <Dialog open={open} onOpenChange={(v) => { if (!v) handleClose(); }}>
      <DialogContent className="p-0 gap-0 !rounded-[15px] overflow-hidden border-0 shadow-2xl [&>button]:hidden sm:max-w-[580px] max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="px-6 pt-5 pb-4 bg-muted/40 shrink-0">
          <DialogHeader>
            <div className="flex items-start justify-between">
              <div>
                <DialogTitle className="text-[16px] font-semibold text-foreground">Create New Karigar Order</DialogTitle>
                <p className="text-[11px] text-muted-foreground mt-0.5">Order number will be auto-generated by the system</p>
              </div>
              <button onClick={handleClose} className="h-7 w-7 rounded-full flex items-center justify-center text-muted-foreground hover:bg-black/10 transition-colors text-lg leading-none shrink-0 mt-0.5">×</button>
            </div>
          </DialogHeader>
        </div>

        {/* Scrollable body */}
        <div className="overflow-y-auto flex-1 px-6 py-5 space-y-4">
          {/* Karigar */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-1.5">Karigar <span className="text-red-500">*</span></label>
            <Select value={karigarId} onValueChange={setKarigarId}>
              <SelectTrigger className="h-10 rounded-lg border-border text-sm"><SelectValue placeholder="Select karigar" /></SelectTrigger>
              <SelectContent>{karigars.map((k) => <SelectItem key={k.id} value={k.id}>{k.name}</SelectItem>)}</SelectContent>
            </Select>
          </div>

          {/* Client */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-1.5">Client <span className="text-muted-foreground font-normal">(Optional)</span></label>
            <Select value={client || "custom"} onValueChange={setClient}>
              <SelectTrigger className="h-10 rounded-lg border-border text-sm"><SelectValue placeholder="Custom Client" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="custom">Custom Client</SelectItem>
                <SelectItem value="sj-stock">SJ STOCK</SelectItem>
                <SelectItem value="divya-reddy">Divya Reddy</SelectItem>
                <SelectItem value="meena-shah">Meena Shah</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Custom client name */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-1.5">Custom Client Name</label>
            <input type="text" placeholder="Enter client name" value={customClient} onChange={(e) => setCustomClient(e.target.value)} className={inputCls} />
          </div>

          {/* Jewellery type */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-1.5">Jewellery Type <span className="text-red-500">*</span></label>
            <Select value={jewType} onValueChange={setJewType}>
              <SelectTrigger className="h-10 rounded-lg border-border text-sm"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="Gold Jewellery">Gold Jewellery</SelectItem>
                <SelectItem value="Silver Jewellery">Silver Jewellery</SelectItem>
                <SelectItem value="Diamond Jewellery">Diamond Jewellery</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Item type + name */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">Item Type <span className="text-red-500">*</span></label>
              <Select value={itemType} onValueChange={setItemType}>
                <SelectTrigger className="h-10 rounded-lg border-border text-sm"><SelectValue placeholder="Select item type" /></SelectTrigger>
                <SelectContent>
                  {["Ring","Pendant","Bangle","Earrings","Necklace","Necklace_set","Bracelet","Chain","Mangalsutra","Other"].map((t) => <SelectItem key={t} value={t}>{t}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">Item Name <span className="text-red-500">*</span></label>
              <input type="text" placeholder="Enter item name" value={itemName} onChange={(e) => setItemName(e.target.value)} className={inputCls} />
            </div>
          </div>

          {/* Gold weight */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-1.5">Gold Weight (grams) <span className="text-red-500">*</span></label>
            <input type="number" step="0.001" value={goldWeight} onChange={(e) => setGoldWeight(e.target.value)} className={inputCls} />
          </div>

          {/* Karat + color */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">Gold Karat <span className="text-red-500">*</span></label>
              <Select value={karat} onValueChange={setKarat}>
                <SelectTrigger className="h-10 rounded-lg border-border text-sm"><SelectValue placeholder="Select karat" /></SelectTrigger>
                <SelectContent>{["14K","18K","20K","22K","24K"].map((k) => <SelectItem key={k} value={k}>{k}</SelectItem>)}</SelectContent>
              </Select>
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">Gold Color</label>
              <Select value={color} onValueChange={setColor}>
                <SelectTrigger className="h-10 rounded-lg border-border text-sm"><SelectValue placeholder="Select color" /></SelectTrigger>
                <SelectContent>{["Yellow","White","Rose"].map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}</SelectContent>
              </Select>
            </div>
          </div>

          {/* Labour + budget */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">Labour Per Gram (₹) <span className="text-red-500">*</span></label>
              <input type="number" step="0.01" value={labour} onChange={(e) => setLabour(e.target.value)} className={inputCls} />
              <p className="mt-1 text-[11px] text-muted-foreground">Labour charges: ₹{labour} × {goldWeight}g = ₹{computed}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">Total Budget (₹) <span className="text-red-500">*</span></label>
              <input type="number" step="0.01" value={budget} onChange={(e) => setBudget(e.target.value)} className={inputCls} />
            </div>
          </div>

          {/* Image upload area */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-1.5">Upload Images <span className="text-muted-foreground font-normal">(up to 3 images)</span></label>
            <div className="border-2 border-dashed border-border rounded-xl p-8 flex flex-col items-center gap-2 text-center hover:border-foreground/30 transition-colors cursor-pointer bg-muted/20">
              <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center">
                <Plus className="h-5 w-5 text-muted-foreground" />
              </div>
              <p className="text-sm text-muted-foreground">Click to upload or drag and drop</p>
              <p className="text-[11px] text-muted-foreground/60">PNG, JPG, WEBP up to 5MB (max 3 images)</p>
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-1.5">Description</label>
            <textarea
              placeholder="Enter order description..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              className="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-foreground/10 focus:border-foreground/30 transition resize-none"
            />
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-border flex items-center justify-end gap-2.5 bg-background shrink-0">
          <button onClick={handleClose} className="h-9 px-5 rounded-[10px] text-sm font-medium border border-border hover:bg-muted/40 transition-colors">Cancel</button>
          <button onClick={handleClose} className="h-9 px-5 rounded-[10px] text-sm font-medium bg-foreground text-background hover:bg-foreground/90 transition-colors">Create Order</button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

/* ══════════════════════════════════════════════
   PAGINATION
══════════════════════════════════════════════ */

/* ══════════════════════════════════════════════
   TAB: KARIGARS
══════════════════════════════════════════════ */
function KarigarsTab({ karigars, onAddClick }: { karigars: Karigar[]; onAddClick: () => void }) {
  return (
    <div className="space-y-4">
      {/* Sub-header */}
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-foreground">Karigars</h2>
        <div className="flex items-center gap-2">
          <button onClick={onAddClick}
            className="flex items-center gap-2 h-9 px-4 rounded-lg bg-foreground text-background text-sm font-medium hover:bg-foreground/90 transition-colors">
            <Plus className="h-3.5 w-3.5" /> Add Karigar
          </button>
          <button className="flex items-center gap-2 h-9 px-4 rounded-lg border border-border text-sm font-medium hover:bg-muted/40 transition-colors">
            <Filter className="h-3.5 w-3.5" /> Filter
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="bg-card border border-border rounded-2xl shadow-sm overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border bg-muted/30">
              {["Name", "Phone", "Address", "Actions"].map((h) => (
                <th key={h} className="px-5 py-3.5 text-left text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {karigars.map((k, i) => (
              <tr key={k.id} className={cn("border-b border-border last:border-0 hover:bg-muted/20 transition-colors", i % 2 !== 0 && "bg-muted/10")}>
                <td className="px-5 py-3.5">
                  <div className="flex items-center gap-2.5">
                    <div className="h-8 w-8 rounded-lg bg-foreground flex items-center justify-center text-xs font-bold text-background shrink-0">
                      {k.name.charAt(0)}
                    </div>
                    <span className="font-medium text-foreground">{k.name}</span>
                  </div>
                </td>
                <td className="px-5 py-3.5 text-muted-foreground">{k.phone}</td>
                <td className="px-5 py-3.5 text-muted-foreground">{k.address}</td>
                <td className="px-5 py-3.5">
                  <div className="flex items-center gap-1.5">
                    <button className="h-8 px-3 rounded-lg border border-border text-xs font-medium text-foreground hover:bg-muted/40 transition-colors flex items-center gap-1.5">
                      <Eye className="h-3 w-3" /> View Balance
                    </button>
                    <button className="h-8 w-8 flex items-center justify-center rounded-lg border border-border text-muted-foreground hover:text-foreground hover:bg-muted/40 transition-colors">
                      <Pencil className="h-3.5 w-3.5" />
                    </button>
                    <button className="h-8 w-8 flex items-center justify-center rounded-lg border border-red-200 text-red-400 hover:text-red-600 hover:bg-red-50 transition-colors">
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════
   TAB: PENDING ORDERS
══════════════════════════════════════════════ */
function PendingOrdersTab({ orders }: { orders: KarigarOrder[] }) {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const pending = orders.filter((o) => o.status === "PENDING");
  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return q ? pending.filter((o) =>
      o.orderNumber.toLowerCase().includes(q) ||
      o.karigarName.toLowerCase().includes(q) ||
      o.itemName.toLowerCase().includes(q)
    ) : pending;
  }, [search, pending]);
  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const rows = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-foreground">Pending Orders <span className="text-muted-foreground font-normal text-base">({filtered.length})</span></h2>
          <p className="text-xs text-muted-foreground mt-0.5">Compact view for efficient order management. Click order number to view full details</p>
        </div>
        <div className="relative w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
          <input type="text" placeholder="Search order, karigar, client, item…" value={search}
            onChange={(e) => { setSearch(e.target.value); setPage(1); }}
            className="w-full h-9 pl-9 pr-3 rounded-lg border border-border bg-card text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-foreground/10 transition" />
        </div>
      </div>

      <div className="bg-card border border-border rounded-2xl shadow-sm overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border bg-muted/30">
              {["Order #", "Karigar", "Item", "Gold (g)", "Diamond", "Status", "Actions"].map((h) => (
                <th key={h} className="px-4 py-3.5 text-left text-[11px] font-semibold text-muted-foreground uppercase tracking-wider whitespace-nowrap">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.length === 0 ? (
              <tr><td colSpan={7} className="px-4 py-10 text-center text-sm text-muted-foreground">No pending orders match your search.</td></tr>
            ) : rows.map((o, i) => (
              <tr key={o.id} className={cn("border-b border-border last:border-0 hover:bg-muted/20 transition-colors", i % 2 !== 0 && "bg-muted/10")}>
                <td className="px-4 py-3.5 font-mono text-xs font-semibold text-foreground">{o.orderNumber}</td>
                <td className="px-4 py-3.5 text-foreground">{o.karigarName}</td>
                <td className="px-4 py-3.5 text-muted-foreground max-w-[180px] truncate">{o.itemName}</td>
                <td className="px-4 py-3.5 tabular-nums text-muted-foreground">{fmtW(o.goldWeight)}</td>
                <td className="px-4 py-3.5 tabular-nums text-muted-foreground">{o.diamond > 0 ? fmtCt(o.diamond) : "0ct"}</td>
                <td className="px-4 py-3.5">
                  <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-semibold bg-amber-50 text-amber-700 border border-amber-200">PENDING</span>
                </td>
                <td className="px-4 py-3.5">
                  <div className="flex items-center gap-1">
                    <button className="h-7 w-7 flex items-center justify-center rounded-md border border-border text-muted-foreground hover:text-foreground hover:bg-muted/40 transition-colors"><Printer className="h-3.5 w-3.5" /></button>
                    <button className="h-7 w-7 flex items-center justify-center rounded-md border border-border text-muted-foreground hover:text-foreground hover:bg-muted/40 transition-colors"><Pencil className="h-3.5 w-3.5" /></button>
                    <button className="h-7 w-7 flex items-center justify-center rounded-md border border-red-200 text-red-400 hover:text-red-600 hover:bg-red-50 transition-colors"><Trash2 className="h-3.5 w-3.5" /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <SharedPagination page={page} totalPages={totalPages} onPageChange={setPage} totalItems={filtered.length} pageSize={PAGE_SIZE} itemLabel="orders" />
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════
   TAB: EXECUTED ORDERS
══════════════════════════════════════════════ */
function ExecutedOrdersTab({ orders }: { orders: KarigarOrder[] }) {
  const [karigarFilter, setKarigarFilter] = useState("all");
  const [clientFilter, setClientFilter]   = useState("all");
  const [billingFilter, setBillingFilter] = useState("all");
  const [page, setPage] = useState(1);

  const executed = orders.filter((o) => o.status === "COMPLETED");
  const filtered = useMemo(() => {
    return executed.filter((o) => {
      if (karigarFilter !== "all" && o.karigarName !== karigarFilter) return false;
      if (clientFilter !== "all" && o.client !== clientFilter) return false;
      if (billingFilter !== "all" && o.billingStatus !== billingFilter) return false;
      return true;
    });
  }, [executed, karigarFilter, clientFilter, billingFilter]);

  const uniqueKarigars = [...new Set(executed.map((o) => o.karigarName))];
  const uniqueClients  = [...new Set(executed.map((o) => o.client))];
  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const rows = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const billingBadge: Record<string, string> = {
    "PENDING BILL": "bg-amber-50 text-amber-700 border-amber-200",
    "BILLED":       "bg-blue-50 text-blue-700 border-blue-200",
    "PAID":         "bg-emerald-50 text-emerald-700 border-emerald-200",
  };

  const selectCls = "h-9 rounded-lg border-border text-sm bg-card";

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-lg font-semibold text-foreground">Executed Orders <span className="text-muted-foreground font-normal text-base">({filtered.length})</span></h2>
      </div>

      {/* Filter bar */}
      <div className="flex items-center gap-2 flex-wrap">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <span>Date:</span>
          <input type="date" className="h-9 px-3 rounded-lg border border-border bg-card text-sm focus:outline-none focus:ring-2 focus:ring-foreground/10" />
          <span>to</span>
          <input type="date" className="h-9 px-3 rounded-lg border border-border bg-card text-sm focus:outline-none focus:ring-2 focus:ring-foreground/10" />
        </div>
        <Select value={karigarFilter} onValueChange={(v) => { setKarigarFilter(v); setPage(1); }}>
          <SelectTrigger className={selectCls}><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Karigars</SelectItem>
            {uniqueKarigars.map((k) => <SelectItem key={k} value={k}>{k}</SelectItem>)}
          </SelectContent>
        </Select>
        <Select value={clientFilter} onValueChange={(v) => { setClientFilter(v); setPage(1); }}>
          <SelectTrigger className={selectCls}><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Clients</SelectItem>
            {uniqueClients.map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}
          </SelectContent>
        </Select>
        <Select value={billingFilter} onValueChange={(v) => { setBillingFilter(v); setPage(1); }}>
          <SelectTrigger className={selectCls}><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="PENDING BILL">Pending Bill</SelectItem>
            <SelectItem value="BILLED">Billed</SelectItem>
            <SelectItem value="PAID">Paid</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="bg-card border border-border rounded-2xl shadow-sm overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border bg-muted/30">
              {["Order #", "Karigar", "Client", "Item Type", "Billing Status", "Completion Date", "Actions"].map((h) => (
                <th key={h} className="px-4 py-3.5 text-left text-[11px] font-semibold text-muted-foreground uppercase tracking-wider whitespace-nowrap">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.length === 0 ? (
              <tr><td colSpan={7} className="px-4 py-10 text-center text-sm text-muted-foreground">No executed orders match your filters.</td></tr>
            ) : rows.map((o, i) => (
              <tr key={o.id} className={cn("border-b border-border last:border-0 hover:bg-muted/20 transition-colors", i % 2 !== 0 && "bg-muted/10")}>
                <td className="px-4 py-3.5 font-mono text-xs font-semibold text-foreground">{o.orderNumber}</td>
                <td className="px-4 py-3.5 text-foreground">{o.karigarName}</td>
                <td className="px-4 py-3.5 text-muted-foreground">{o.client}</td>
                <td className="px-4 py-3.5 text-muted-foreground">{o.itemType}</td>
                <td className="px-4 py-3.5">
                  <span className={cn("inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-semibold border", billingBadge[o.billingStatus] ?? "bg-muted text-muted-foreground border-border")}>
                    {o.billingStatus}
                  </span>
                </td>
                <td className="px-4 py-3.5 text-muted-foreground whitespace-nowrap">{o.completionDate}</td>
                <td className="px-4 py-3.5">
                  <div className="flex items-center gap-1">
                    <button className="h-7 w-7 flex items-center justify-center rounded-md border border-border text-muted-foreground hover:text-foreground hover:bg-muted/40 transition-colors"><Eye className="h-3.5 w-3.5" /></button>
                    <button className="h-7 w-7 flex items-center justify-center rounded-md border border-border text-muted-foreground hover:text-foreground hover:bg-muted/40 transition-colors"><Pencil className="h-3.5 w-3.5" /></button>
                    <button className="h-7 w-7 flex items-center justify-center rounded-md border border-red-200 text-red-400 hover:text-red-600 hover:bg-red-50 transition-colors"><Trash2 className="h-3.5 w-3.5" /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <SharedPagination page={page} totalPages={totalPages} onPageChange={setPage} totalItems={filtered.length} pageSize={PAGE_SIZE} itemLabel="orders" />
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════
   TAB: PENDING DIAMONDS
══════════════════════════════════════════════ */
function PendingDiamondsTab({ records }: { records: DiamondRecord[] }) {
  const totalIssued   = records.reduce((s, r) => s + r.issueWeight, 0);
  const totalReceived = records.reduce((s, r) => s + r.receivedWeight, 0);
  const totalBalance  = records.reduce((s, r) => s + r.balanceWeight, 0);

  const statusCls: Record<string, string> = {
    "COMPLETED":     "bg-emerald-50 text-emerald-700 border-emerald-200",
    "OVER RECEIVED": "bg-red-50 text-red-600 border-red-200",
    "PENDING":       "bg-amber-50 text-amber-700 border-amber-200",
  };

  return (
    <div className="space-y-6">
      {/* Metric cards */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: "Total Issued Weight",   value: fmtCt(totalIssued),   accent: "text-foreground" },
          { label: "Total Received Weight", value: fmtCt(totalReceived), accent: "text-emerald-600" },
          { label: "Total Balance Weight",  value: fmtCt(totalBalance),  accent: totalBalance < 0 ? "text-red-600" : "text-amber-700" },
        ].map((m) => (
          <div key={m.label} className="bg-card border border-border rounded-2xl shadow-sm p-5">
            <p className="text-xs font-medium text-muted-foreground mb-2">{m.label}</p>
            <p className={cn("text-3xl font-bold tabular-nums", m.accent)}>{m.value}</p>
          </div>
        ))}
      </div>

      {/* Table */}
      <div>
        <div className="mb-3">
          <h2 className="text-base font-semibold text-foreground">Diamond Balance Tracking <span className="text-muted-foreground font-normal">({records.length})</span></h2>
          <p className="text-xs text-muted-foreground mt-0.5">Track diamonds issued vs received for each karigar and order. Balance shows remaining diamonds with karigars.</p>
        </div>
        <div className="bg-card border border-border rounded-2xl shadow-sm overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/30">
                {["Karigar", "Order #", "Client", "Quality", "Issue Weight", "Received Weight", "Balance Weight", "Issue Date", "Status"].map((h) => (
                  <th key={h} className="px-5 py-3.5 text-left text-[11px] font-semibold text-muted-foreground uppercase tracking-wider whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {records.map((r, i) => (
                <tr key={r.id} className={cn("border-b border-border last:border-0 hover:bg-muted/20 transition-colors", i % 2 !== 0 && "bg-muted/10")}>
                  <td className="px-5 py-3.5 font-medium text-foreground">{r.karigarName}</td>
                  <td className="px-5 py-3.5 font-mono text-xs text-foreground">{r.orderNumber}</td>
                  <td className="px-5 py-3.5 text-muted-foreground max-w-[120px] truncate">{r.client}</td>
                  <td className="px-5 py-3.5">
                    <span className="text-xs font-semibold bg-zinc-100 text-zinc-700 px-2 py-0.5 rounded">{r.quality}</span>
                  </td>
                  <td className="px-5 py-3.5 tabular-nums text-foreground">{fmtCt(r.issueWeight)}</td>
                  <td className="px-5 py-3.5 tabular-nums text-emerald-700">{fmtCt(r.receivedWeight)}</td>
                  <td className={cn("px-5 py-3.5 tabular-nums font-semibold", r.balanceWeight < 0 ? "text-red-600" : "text-amber-700")}>{fmtCt(r.balanceWeight)}</td>
                  <td className="px-5 py-3.5 text-muted-foreground whitespace-nowrap">{r.issueDate}</td>
                  <td className="px-5 py-3.5">
                    <span className={cn("inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-semibold border", statusCls[r.status] ?? "bg-muted text-foreground border-border")}>
                      {r.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════
   TAB: DIAMOND ISSUE  (placeholder)
══════════════════════════════════════════════ */
function DiamondIssueTab() {
  return (
    <div className="bg-card border border-border rounded-2xl shadow-sm p-16 flex flex-col items-center justify-center text-center">
      <div className="h-14 w-14 rounded-2xl bg-muted flex items-center justify-center mb-4">
        <Diamond className="h-7 w-7 text-muted-foreground/50" />
      </div>
      <p className="text-sm font-medium text-foreground mb-1">Diamond Issue</p>
      <p className="text-xs text-muted-foreground">Issue diamonds to karigars against orders.</p>
      <p className="text-xs text-muted-foreground/60 mt-1">Coming soon</p>
    </div>
  );
}

/* ══════════════════════════════════════════════
   TAB: RECEIVE JEWELLERY
══════════════════════════════════════════════ */
function ReceiveJewelleryTab({ karigars }: { karigars: Karigar[] }) {
  const inputCls = "w-full h-10 px-3 rounded-lg border border-border bg-background text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-foreground/10 focus:border-foreground/30 transition";

  return (
    <div className="max-w-3xl">
      <div className="mb-5">
        <h2 className="text-xl font-semibold text-foreground">Receive Completed Jewellery</h2>
        <div className="mt-2 p-3 rounded-xl bg-muted/60 border border-border text-xs text-muted-foreground space-y-0.5">
          <p><span className="font-semibold text-foreground">Net Weight</span> = Gross Weight − (Diamond + Solitaire + Color Stone weights converted to grams)</p>
          <p><span className="font-semibold text-foreground">Pure Gold (999)</span> = Net Weight × (Purity% + Wastage%) / 100</p>
          <p>Note: 1 carat = 0.2 grams | Either Wastage% OR Labour per Gram (or both) must be provided</p>
        </div>
      </div>

      <div className="bg-card border border-border rounded-2xl shadow-sm p-6 space-y-5">
        {/* Karigar + Order */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-1.5">Karigar <span className="text-red-500">*</span></label>
            <Select>
              <SelectTrigger className="h-10 rounded-lg border-border text-sm"><SelectValue placeholder="Select karigar" /></SelectTrigger>
              <SelectContent>{karigars.map((k) => <SelectItem key={k.id} value={k.id}>{k.name}</SelectItem>)}</SelectContent>
            </Select>
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-1.5">Order Number <span className="text-red-500">*</span></label>
            <Select>
              <SelectTrigger className="h-10 rounded-lg border-border text-sm"><SelectValue placeholder="Select karigar first" /></SelectTrigger>
              <SelectContent><SelectItem value="-" disabled>Select karigar first</SelectItem></SelectContent>
            </Select>
          </div>
        </div>

        {/* Jewellery type + category */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-1.5">Jewelry Type <span className="text-red-500">*</span></label>
          <Select>
            <SelectTrigger className="h-10 rounded-lg border-border text-sm"><SelectValue placeholder="Select jewelry type" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="gold">Gold Jewellery</SelectItem>
              <SelectItem value="silver">Silver Jewellery</SelectItem>
              <SelectItem value="diamond">Diamond Jewellery</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground mb-1.5">Jewelry Category <span className="text-red-500">*</span></label>
          <Select>
            <SelectTrigger className="h-10 rounded-lg border-border text-sm"><SelectValue placeholder="Select jewelry category (e.g., Necklace, Ring, Earrings)" /></SelectTrigger>
            <SelectContent>
              {["Necklace","Ring","Earrings","Bangle","Bracelet","Chain","Pendant","Mangalsutra","Other"].map((c) => (
                <SelectItem key={c} value={c.toLowerCase()}>{c}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <p className="mt-1 text-[11px] text-muted-foreground">Auto-filled from order. Change if needed for stock categorization.</p>
        </div>

        {/* Weights */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-1.5">Gross Weight (grams) <span className="text-red-500">*</span></label>
            <input type="number" step="0.001" placeholder="Enter gross weight" className={inputCls} />
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-1.5">Color Stone Weight (carats)</label>
            <input type="number" step="0.001" placeholder="Enter color stone weight" className={inputCls} />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-1.5">Net Weight (grams)</label>
            <input type="text" readOnly value="0.000g" className={cn(inputCls, "bg-muted/40 text-muted-foreground")} />
            <p className="mt-1 text-[11px] text-muted-foreground">Gross − Stones</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-1.5 text-amber-700 font-semibold">Pure Gold Weight (999)</label>
            <input type="text" readOnly value="0.000g" className={cn(inputCls, "bg-amber-50 border-amber-200 text-amber-700 font-semibold")} />
            <p className="mt-1 text-[11px] text-muted-foreground">Net × (Purity + Wastage) / 100</p>
          </div>
        </div>

        {/* Purity + wastage */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-1.5">Gold Purity (%) <span className="text-red-500">*</span></label>
            <input type="number" defaultValue={92} className={inputCls} />
            <p className="mt-1 text-[11px] text-muted-foreground">Auto-filled based on karat. You can manually adjust.</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-1.5">Wastage/Labour (%)</label>
            <input type="number" placeholder="Optional − Enter wastage %" className={inputCls} />
            <p className="mt-1 text-[11px] text-muted-foreground">Optional − Provide either wastage % OR labour per gram (or both)</p>
          </div>
        </div>

        {/* Karat + tag + description */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-1.5">Gold Karat <span className="text-red-500">*</span></label>
          <Select>
            <SelectTrigger className="h-10 rounded-lg border-border text-sm"><SelectValue placeholder="Select karat" /></SelectTrigger>
            <SelectContent>{["14K","18K","20K","22K","24K"].map((k) => <SelectItem key={k} value={k}>{k}</SelectItem>)}</SelectContent>
          </Select>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-1.5">Tag Number <span className="text-muted-foreground font-normal">(Optional)</span></label>
            <input type="text" placeholder="Enter tag number" className={inputCls} />
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-1.5">Description <span className="text-muted-foreground font-normal">(Optional)</span></label>
            <input type="text" placeholder="Enter item description" className={inputCls} />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground mb-1.5">Labour per Gram (₹)</label>
          <input type="number" step="0.01" placeholder="Optional − Enter labour per gram" className={inputCls} />
          <p className="mt-1 text-[11px] text-muted-foreground">Optional − Provide either wastage % OR labour per gram (or both)</p>
        </div>

        {/* Image upload */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-1.5">Upload Images <span className="text-muted-foreground font-normal">(Optional)</span></label>
          <p className="text-xs text-muted-foreground mb-2">Upload jewelry photos</p>
          <div className="border-2 border-dashed border-border rounded-xl p-10 flex flex-col items-center gap-2 text-center hover:border-foreground/30 transition-colors cursor-pointer bg-muted/20">
            <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center">
              <Plus className="h-5 w-5 text-muted-foreground" />
            </div>
            <p className="text-sm text-muted-foreground">Click to upload or drag and drop</p>
            <p className="text-[11px] text-muted-foreground/60">PNG, JPG, WEBP up to 5MB (max 10 images)</p>
          </div>
        </div>

        {/* Submit */}
        <div className="pt-2 flex justify-end">
          <button className="flex items-center gap-2 h-10 px-6 rounded-xl bg-foreground text-background text-sm font-semibold hover:bg-foreground/90 transition-colors">
            Receive Jewellery
          </button>
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════
   MAIN PAGE
══════════════════════════════════════════════ */
const TABS: { key: MainTab; label: string; icon?: React.ReactNode }[] = [
  { key: "karigars", label: "Karigars" },
  { key: "pending",  label: "Pending Orders" },
  { key: "executed", label: "Executed Orders" },
  { key: "diamonds", label: "Pending Diamonds" },
  { key: "issue",    label: "Diamond Issue" },
  { key: "receive",  label: "Receive Jewellery" },
];

export default function KarigarManagement() {
  const [tab, setTab]               = useState<MainTab>("karigars");
  const [karigars, setKarigars]     = useState<Karigar[]>(mockKarigars);
  const [showAddKarigar, setShowAddKarigar] = useState(false);
  const [showCreateOrder, setShowCreateOrder] = useState(false);

  function handleAddKarigar(data: Omit<Karigar, "id">) {
    setKarigars((prev) => [...prev, { ...data, id: crypto.randomUUID() }]);
  }

  return (
    <div className="w-full flex flex-col h-full">
      {/* ── Page header ── */}
      <div className="px-8 pt-6 pb-0 border-b border-border shrink-0">
        <div className="flex items-start justify-between mb-5">
          <div>
            <h1 className="text-2xl font-semibold text-foreground tracking-tight mb-0.5">Karigar Management</h1>
            <p className="text-sm text-muted-foreground">Complete karigar workflow with order management and material tracking</p>
          </div>
          <button
            onClick={() => setShowCreateOrder(true)}
            className="flex items-center gap-2 h-10 px-5 rounded-xl bg-foreground text-background text-sm font-semibold hover:bg-foreground/90 transition-colors shadow-sm shrink-0"
          >
            <Plus className="h-4 w-4" /> Create Order
          </button>
        </div>

        {/* Tab bar */}
        <div className="flex items-center gap-0 overflow-x-auto no-scrollbar">
          {TABS.map((t) => (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              className={cn(
                "flex items-center gap-1.5 px-5 py-3 text-sm font-medium border-b-2 -mb-px transition-colors whitespace-nowrap",
                tab === t.key
                  ? "border-foreground text-foreground"
                  : "border-transparent text-muted-foreground hover:text-foreground",
              )}
            >
              {t.label}
            </button>
          ))}
          {/* Create Order as a tab action */}
          <button
            onClick={() => setShowCreateOrder(true)}
            className="flex items-center gap-1.5 px-5 py-3 text-sm font-medium border-b-2 border-transparent text-muted-foreground hover:text-foreground transition-colors whitespace-nowrap -mb-px"
          >
            <Plus className="h-3.5 w-3.5" /> Create Order
          </button>
        </div>
      </div>

      {/* ── Tab content ── */}
      <div className="flex-1 overflow-y-auto no-scrollbar p-8">
        {tab === "karigars" && <KarigarsTab karigars={karigars} onAddClick={() => setShowAddKarigar(true)} />}
        {tab === "pending"  && <PendingOrdersTab orders={mockOrders} />}
        {tab === "executed" && <ExecutedOrdersTab orders={mockOrders} />}
        {tab === "diamonds" && <PendingDiamondsTab records={mockDiamondRecords} />}
        {tab === "issue"    && <DiamondIssueTab />}
        {tab === "receive"  && <ReceiveJewelleryTab karigars={karigars} />}
      </div>

      <AddKarigarModal open={showAddKarigar} onClose={() => setShowAddKarigar(false)} onAdd={handleAddKarigar} />
      <CreateOrderModal open={showCreateOrder} onClose={() => setShowCreateOrder(false)} karigars={karigars} />
    </div>
  );
}
