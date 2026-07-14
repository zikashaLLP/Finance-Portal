import { useState, useMemo } from "react";
import {
  Download, Upload, FileSpreadsheet, Link2, RefreshCw,
  Search, X, Plus, Eye, Pencil, Trash2, Package,
  CheckCircle2, TrendingDown, Gem, Layers, AlertCircle,
  ChevronRight, RotateCcw, History, Copy, ShieldAlert,
} from "lucide-react";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import Pagination from "@/shared/components/Pagination";
import {
  GOLD_STOCK, DIAMOND_STOCK,
  type StockItem, type StockStatus, type StockSource,
} from "../data/mockStock";

/* ═══════════════════════════════════════════════
   HELPERS
═══════════════════════════════════════════════ */
const fmtAmt = (n: number) =>
  new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(n);

const SOURCE_META: Record<StockSource, { label: string; cls: string }> = {
  purchased:    { label: "Purchased",     cls: "bg-sky-50 text-sky-700 border-sky-200"       },
  karigar:      { label: "Karigar",       cls: "bg-violet-50 text-violet-700 border-violet-200" },
  opening_stock:{ label: "Opening Stock", cls: "bg-amber-50 text-amber-700 border-amber-200"  },
};

const STATUS_META: Record<StockStatus, { label: string; cls: string; dot: string }> = {
  available: { label: "Available", cls: "bg-emerald-50 text-emerald-700 border-emerald-200", dot: "bg-emerald-500" },
  sold:      { label: "Sold",      cls: "bg-muted text-muted-foreground border-border",       dot: "bg-muted-foreground/50" },
};

type SubTab = "items" | "tallying" | "duplicates" | "history" | "deletion" | "restore";
const SUB_TABS: { key: SubTab; label: string; count?: number; icon: React.ElementType }[] = [
  { key: "items",     label: "Stock Items",     count: 1276, icon: Package      },
  { key: "tallying",  label: "Stock Tallying",  icon: Layers                    },
  { key: "duplicates",label: "Duplicates",      count: 0,    icon: Copy         },
  { key: "history",   label: "Import History",  icon: History                   },
  { key: "deletion",  label: "Deletion Audit",  count: 1592, icon: ShieldAlert  },
  { key: "restore",   label: "Restore Items",   icon: RotateCcw                 },
];

type JewTab = "gold" | "diamond";

/* ═══════════════════════════════════════════════
   ADD ITEM MODAL
═══════════════════════════════════════════════ */
function AddItemModal({ open, onClose, category, onAdd }: {
  open: boolean; onClose: () => void;
  category: JewTab;
  onAdd: (item: Omit<StockItem, "id">) => void;
}) {
  const [stockId, setStockId]     = useState("");
  const [name, setName]           = useState("");
  const [goldWt, setGoldWt]       = useState("");
  const [diamondWt, setDiamondWt] = useState("");
  const [karat, setKarat]         = useState("18K");
  const [source, setSource]       = useState<StockSource>("purchased");
  const [value, setValue]         = useState("");
  const [comment, setComment]     = useState("");

  const inputCls = "w-full h-10 px-3 rounded-lg border border-border bg-background text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-foreground/20";

  function reset() {
    setStockId(""); setName(""); setGoldWt(""); setDiamondWt("");
    setKarat("18K"); setSource("purchased"); setValue(""); setComment("");
  }

  function handleAdd() {
    if (!name) return;
    onAdd({
      stockId: stockId || `${category === "gold" ? "GJ" : "DJ"}${Date.now()}`,
      category: category === "gold" ? "Gold Jewellery" : "Diamond Jewellery",
      itemName: name.toUpperCase(),
      goldWeight: parseFloat(goldWt) || 0,
      diamondWeight: parseFloat(diamondWt) || 0,
      karat, source,
      value: parseFloat(value) || 0,
      status: "available",
      comment,
    });
    reset(); onClose();
  }

  const catLabel = category === "gold" ? "Gold" : "Diamond";

  return (
    <Dialog open={open} onOpenChange={(v) => { if (!v) { reset(); onClose(); } }}>
      <DialogContent className="max-w-lg rounded-2xl p-0 gap-0">
        <DialogHeader className="px-6 pt-5 pb-4 border-b border-border">
          <DialogTitle className="text-[15px] font-semibold">Add {catLabel} Jewellery Item</DialogTitle>
          <p className="text-[11px] text-muted-foreground mt-0.5">Register a new stock item</p>
        </DialogHeader>
        <div className="px-6 pt-4 pb-5 space-y-3.5 max-h-[70vh] overflow-y-auto no-scrollbar">
          <div className="grid grid-cols-2 gap-3.5">
            <div>
              <label className="block text-xs font-medium text-muted-foreground mb-1.5">Stock ID</label>
              <input type="text" placeholder="Auto-generated" value={stockId} onChange={(e) => setStockId(e.target.value)} className={inputCls} />
            </div>
            <div>
              <label className="block text-xs font-medium text-muted-foreground mb-1.5">Karat</label>
              <Select value={karat} onValueChange={setKarat}>
                <SelectTrigger className="h-10 rounded-lg border-border text-sm"><SelectValue /></SelectTrigger>
                <SelectContent>{["14K","18K","20K","22K","24K"].map((k) => <SelectItem key={k} value={k}>{k}</SelectItem>)}</SelectContent>
              </Select>
            </div>
          </div>
          <div>
            <label className="block text-xs font-medium text-muted-foreground mb-1.5">Item Name <span className="text-red-500">*</span></label>
            <input type="text" placeholder="Enter item name / description" value={name} onChange={(e) => setName(e.target.value)} className={inputCls} />
          </div>
          <div className="grid grid-cols-2 gap-3.5">
            <div>
              <label className="block text-xs font-medium text-muted-foreground mb-1.5">Gold Weight (g)</label>
              <input type="number" placeholder="0.000" value={goldWt} onChange={(e) => setGoldWt(e.target.value)} className={inputCls} />
            </div>
            <div>
              <label className="block text-xs font-medium text-muted-foreground mb-1.5">Diamond Weight (ct)</label>
              <input type="number" placeholder="0.000" value={diamondWt} onChange={(e) => setDiamondWt(e.target.value)} className={inputCls} />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3.5">
            <div>
              <label className="block text-xs font-medium text-muted-foreground mb-1.5">Source</label>
              <Select value={source} onValueChange={(v) => setSource(v as StockSource)}>
                <SelectTrigger className="h-10 rounded-lg border-border text-sm"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="purchased">Purchased</SelectItem>
                  <SelectItem value="karigar">Karigar</SelectItem>
                  <SelectItem value="opening_stock">Opening Stock</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="block text-xs font-medium text-muted-foreground mb-1.5">Value (₹)</label>
              <input type="number" placeholder="0" value={value} onChange={(e) => setValue(e.target.value)} className={inputCls} />
            </div>
          </div>
          <div>
            <label className="block text-xs font-medium text-muted-foreground mb-1.5">Comment</label>
            <input type="text" placeholder="Optional note" value={comment} onChange={(e) => setComment(e.target.value)} className={inputCls} />
          </div>
        </div>
        <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-border">
          <button onClick={() => { reset(); onClose(); }} className="h-9 px-4 rounded-lg text-sm font-medium border border-border hover:bg-muted/40 transition-colors">Cancel</button>
          <button onClick={handleAdd} disabled={!name}
            className={cn("h-9 px-5 rounded-lg text-sm font-medium transition-colors",
              name ? "bg-foreground text-background hover:bg-foreground/90" : "bg-foreground/30 text-background/60 cursor-not-allowed")}>
            Add Item
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

/* ═══════════════════════════════════════════════
   VIEW ITEM MODAL
═══════════════════════════════════════════════ */
function ViewItemModal({ item, onClose }: { item: StockItem | null; onClose: () => void }) {
  if (!item) return null;
  const sm = STATUS_META[item.status];
  const src = SOURCE_META[item.source];
  const Row = ({ label, value }: { label: string; value: string }) => (
    <div className="flex items-start justify-between py-2.5 border-b border-border last:border-0">
      <span className="text-xs text-muted-foreground w-36 shrink-0">{label}</span>
      <span className="text-xs font-medium text-foreground text-right">{value}</span>
    </div>
  );
  return (
    <Dialog open={!!item} onOpenChange={(v) => { if (!v) onClose(); }}>
      <DialogContent className="max-w-sm rounded-2xl p-0 gap-0">
        <DialogHeader className="px-6 pt-5 pb-4 border-b border-border">
          <div className="flex items-center justify-between">
            <DialogTitle className="text-[15px] font-semibold">{item.stockId}</DialogTitle>
            <span className={cn("inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold border", sm.cls)}>
              <span className={cn("h-1.5 w-1.5 rounded-full", sm.dot)} />{sm.label}
            </span>
          </div>
        </DialogHeader>
        <div className="px-6 py-4">
          <Row label="Item Name"     value={item.itemName} />
          <Row label="Category"      value={item.category} />
          <Row label="Gold Weight"   value={`${item.goldWeight.toFixed(3)}g${item.karat ? ` • ${item.karat}` : ""}`} />
          <Row label="Diamond"       value={item.diamondWeight > 0 ? `${item.diamondWeight.toFixed(3)}ct` : "—"} />
          <Row label="Source"        value={src.label} />
          <Row label="Value"         value={item.value > 0 ? fmtAmt(item.value) : "₹0"} />
          {item.comment && <Row label="Comment" value={item.comment} />}
        </div>
        <div className="px-6 pb-5">
          <button onClick={onClose} className="w-full h-9 rounded-lg bg-foreground text-background text-sm font-medium hover:bg-foreground/90 transition-colors">Close</button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

/* ═══════════════════════════════════════════════
   STOCK TABLE
═══════════════════════════════════════════════ */
function StockTable({ items, onView, onDelete }: {
  items: StockItem[];
  onView: (item: StockItem) => void;
  onDelete: (id: string) => void;
}) {
  const PAGE_SIZE = 12;
  const [page, setPage] = useState(1);
  const total = Math.max(1, Math.ceil(items.length / PAGE_SIZE));
  const slice = items.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const ImagePlaceholder = ({ item }: { item: StockItem }) => (
    <div className="h-10 w-10 rounded-xl bg-muted border border-border flex items-center justify-center shrink-0">
      {item.category === "Diamond Jewellery"
        ? <Gem className="h-4.5 w-4.5 text-muted-foreground/50" />
        : <Package className="h-4.5 w-4.5 text-muted-foreground/50" />}
    </div>
  );

  return (
    <div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border bg-muted/30">
              {["Image","Stock ID","Item Name","Specifications","Source / Lot","Value","Status","Comment","Actions"].map((h) => (
                <th key={h} className="px-5 py-3.5 text-left text-[11px] font-semibold text-muted-foreground uppercase tracking-wider whitespace-nowrap">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {slice.map((item, i) => {
              const sm  = STATUS_META[item.status];
              const src = SOURCE_META[item.source];
              return (
                <tr key={item.id} className={cn(
                  "border-b border-border last:border-0 hover:bg-muted/20 transition-colors group",
                  i % 2 !== 0 && "bg-muted/[0.04]",
                )}>
                  <td className="px-5 py-3.5">
                    <ImagePlaceholder item={item} />
                  </td>
                  <td className="px-5 py-3.5">
                    <span className="font-mono text-xs font-bold text-foreground">{item.stockId}</span>
                  </td>
                  <td className="px-5 py-3.5 max-w-[180px]">
                    <span className="text-xs font-medium text-foreground leading-snug line-clamp-2">{item.itemName}</span>
                  </td>
                  <td className="px-5 py-3.5">
                    <p className="text-xs text-muted-foreground leading-relaxed whitespace-nowrap">
                      {item.goldWeight.toFixed(3)}g gold{item.karat && ` (${item.karat})`}
                      {item.diamondWeight > 0 && (
                        <><br /><span className="text-foreground/70">{item.diamondWeight.toFixed(3)}ct diamond</span></>
                      )}
                    </p>
                  </td>
                  <td className="px-5 py-3.5">
                    <span className={cn("inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-semibold border", src.cls)}>
                      {src.label}
                    </span>
                  </td>
                  <td className="px-5 py-3.5 tabular-nums text-xs font-semibold text-foreground">
                    {item.value > 0 ? fmtAmt(item.value) : <span className="text-muted-foreground/50">₹0</span>}
                  </td>
                  <td className="px-5 py-3.5">
                    <span className={cn("inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold border", sm.cls)}>
                      <span className={cn("h-1.5 w-1.5 rounded-full shrink-0", sm.dot)} />{sm.label}
                    </span>
                  </td>
                  <td className="px-5 py-3.5 text-xs text-muted-foreground">
                    {item.comment || <span className="text-muted-foreground/30">—</span>}
                  </td>
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button onClick={() => onView(item)} title="View"
                        className="h-7 px-2.5 rounded-lg text-[11px] font-medium border border-border text-foreground hover:bg-muted/40 transition-colors">
                        View
                      </button>
                      <button title="Edit"
                        className="h-7 w-7 flex items-center justify-center rounded-lg border border-border text-muted-foreground hover:text-foreground hover:bg-muted/40 transition-colors">
                        <Pencil className="h-3 w-3" />
                      </button>
                      <button onClick={() => onDelete(item.id)} title="Delete"
                        className="h-7 w-7 flex items-center justify-center rounded-lg border border-red-200 text-red-400 hover:text-red-600 hover:bg-red-50 transition-colors">
                        <Trash2 className="h-3 w-3" />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
            {slice.length === 0 && (
              <tr>
                <td colSpan={9} className="px-4 py-14 text-center">
                  <div className="flex flex-col items-center gap-3">
                    <div className="h-12 w-12 rounded-2xl bg-muted flex items-center justify-center">
                      <Package className="h-6 w-6 text-muted-foreground/40" />
                    </div>
                    <p className="text-sm font-medium text-foreground">No items found</p>
                    <p className="text-xs text-muted-foreground/60">Try adjusting your search or filters</p>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <Pagination page={page} totalPages={total} onPageChange={setPage} totalItems={items.length} pageSize={PAGE_SIZE} itemLabel="items" />
    </div>
  );
}

/* ═══════════════════════════════════════════════
   PLACEHOLDER TAB
═══════════════════════════════════════════════ */
function PlaceholderTab({ icon: Icon, label }: { icon: React.ElementType; label: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-20 gap-3">
      <div className="h-14 w-14 rounded-2xl bg-muted flex items-center justify-center">
        <Icon className="h-7 w-7 text-muted-foreground/30" />
      </div>
      <p className="text-sm font-medium text-foreground">{label}</p>
      <p className="text-xs text-muted-foreground/60">Coming soon</p>
    </div>
  );
}

/* ═══════════════════════════════════════════════
   MAIN PAGE
═══════════════════════════════════════════════ */
export default function StockManagement() {
  const [goldStock, setGoldStock]       = useState<StockItem[]>(GOLD_STOCK);
  const [diamondStock, setDiamondStock] = useState<StockItem[]>(DIAMOND_STOCK);

  const [subTab, setSubTab]     = useState<SubTab>("items");
  const [jewTab, setJewTab]     = useState<JewTab>("gold");

  const [search, setSearch]           = useState("");
  const [categoryFilter, setCategory] = useState("all");
  const [sourceFilter, setSource]     = useState("all");
  const [statusFilter, setStatus]     = useState("all");

  const [showImportBanner, setShowImportBanner]   = useState(true);
  const [showOpeningMode, setShowOpeningMode]     = useState(true);

  const [showAddModal, setShowAddModal] = useState(false);
  const [viewItem, setViewItem]         = useState<StockItem | null>(null);

  const allStock = [...goldStock, ...diamondStock];
  const inStock  = allStock.filter((i) => i.status === "available").length;
  const sold     = allStock.filter((i) => i.status === "sold").length;

  const activeStock = jewTab === "gold" ? goldStock : diamondStock;

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return activeStock.filter((item) => {
      const matchSearch = !q
        || item.stockId.toLowerCase().includes(q)
        || item.itemName.toLowerCase().includes(q)
        || item.goldWeight.toString().includes(q);
      const matchSource = sourceFilter === "all" || item.source === sourceFilter;
      const matchStatus = statusFilter === "all" || item.status === statusFilter;
      return matchSearch && matchSource && matchStatus;
    });
  }, [activeStock, search, sourceFilter, statusFilter]);

  function handleDelete(id: string) {
    if (jewTab === "gold") setGoldStock((p) => p.filter((i) => i.id !== id));
    else setDiamondStock((p) => p.filter((i) => i.id !== id));
  }

  function handleAdd(item: Omit<StockItem, "id">) {
    const newItem = { ...item, id: crypto.randomUUID() };
    if (jewTab === "gold") setGoldStock((p) => [newItem, ...p]);
    else setDiamondStock((p) => [newItem, ...p]);
  }

  const btnOutline = "flex items-center gap-1.5 h-9 px-4 rounded-xl text-sm font-medium border border-border hover:bg-muted/40 transition-colors whitespace-nowrap";
  const btnBlack   = "flex items-center gap-1.5 h-9 px-4 rounded-xl bg-foreground text-background text-sm font-medium hover:bg-foreground/90 transition-colors whitespace-nowrap";

  return (
    <div className="w-full flex flex-col h-full">

      {/* ── HEADER ── */}
      <div className="px-8 pt-6 pb-5 border-b border-border shrink-0">
        <div className="flex items-start justify-between gap-6 flex-wrap">
          <div>
            <h1 className="text-2xl font-semibold text-foreground tracking-tight mb-0.5">Stock Management</h1>
            <p className="text-sm text-muted-foreground">View and manage Gold Jewellery and Diamond Jewellery stock items</p>
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            <button className={btnOutline}><Download className="h-3.5 w-3.5" /> Download Template</button>
            <button className={btnOutline}><Upload className="h-3.5 w-3.5" /> Import Excel</button>
            <button className={btnOutline}><FileSpreadsheet className="h-3.5 w-3.5" /> Export Excel</button>
            <button className={btnOutline}><Link2 className="h-3.5 w-3.5" /> Image URL Generator</button>
          </div>
        </div>
      </div>

      {/* ── SCROLLABLE BODY ── */}
      <div className="flex-1 overflow-y-auto no-scrollbar">

        <div className="p-8 space-y-5">

          {/* ── IMPORT STATUS BANNER ── */}
          {showImportBanner && (
            <div className="bg-card border border-border rounded-2xl shadow-sm p-4 flex items-start gap-4">
              <div className="h-9 w-9 rounded-xl bg-emerald-100 flex items-center justify-center shrink-0">
                <CheckCircle2 className="h-5 w-5 text-emerald-600" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-0.5">
                  <p className="text-sm font-semibold text-foreground">Latest Import Status</p>
                  <span className="inline-flex items-center px-2 py-0.5 rounded-md bg-emerald-100 text-[10px] font-bold text-emerald-700">✓</span>
                </div>
                <p className="text-xs text-muted-foreground">Successfully imported: 116 items (81 chains, 9 pendant sets, 26 other items)</p>
                <p className="text-[11px] text-muted-foreground/60 mt-0.5">Import completed at 9:37:37 PM</p>
              </div>
              {/* Counters */}
              <div className="flex items-center gap-3 shrink-0">
                <div className="text-center px-4 py-2 rounded-xl bg-muted border border-border">
                  <p className="text-[10px] text-muted-foreground uppercase tracking-wider mb-0.5">In Stock</p>
                  <p className="text-xl font-bold text-foreground tabular-nums">{inStock}</p>
                </div>
                <div className="text-center px-4 py-2 rounded-xl bg-muted border border-border">
                  <p className="text-[10px] text-muted-foreground uppercase tracking-wider mb-0.5">Sold</p>
                  <p className="text-xl font-bold text-foreground tabular-nums">{sold}</p>
                </div>
                <div className="text-center px-4 py-2 rounded-xl bg-muted border border-border">
                  <p className="text-[10px] text-muted-foreground uppercase tracking-wider mb-0.5">Gold Jewellery</p>
                  <p className="text-xl font-bold text-foreground tabular-nums">{goldStock.length}</p>
                </div>
                <div className="text-center px-4 py-2 rounded-xl bg-muted border border-border">
                  <p className="text-[10px] text-muted-foreground uppercase tracking-wider mb-0.5">Diamond Jewellery</p>
                  <p className="text-xl font-bold text-foreground tabular-nums">{diamondStock.length}</p>
                </div>
              </div>
              <div className="flex flex-col gap-2 shrink-0">
                <button className="h-8 px-3 rounded-lg text-xs font-medium bg-foreground text-background hover:bg-foreground/90 transition-colors whitespace-nowrap">
                  View All Items
                </button>
                <button className="h-8 px-3 rounded-lg text-xs font-medium border border-border hover:bg-muted/40 transition-colors flex items-center gap-1.5 whitespace-nowrap">
                  <RefreshCw className="h-3 w-3" /> Refresh Data
                </button>
              </div>
              <button onClick={() => setShowImportBanner(false)} className="h-6 w-6 flex items-center justify-center rounded-md text-muted-foreground hover:text-foreground hover:bg-muted/40 transition-colors shrink-0">
                <X className="h-3.5 w-3.5" />
              </button>
            </div>
          )}

          {/* ── OPENING STOCK MODE BANNER ── */}
          {showOpeningMode && (
            <div className="flex items-start gap-3 px-4 py-3 rounded-xl border border-amber-200 bg-amber-50">
              <AlertCircle className="h-4 w-4 text-amber-600 mt-0.5 shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="text-xs font-semibold text-amber-800 mb-0.5">Opening Stock Mode</p>
                <p className="text-[11px] text-amber-700 leading-relaxed">
                  Opening Stock Mode is active. You can enter your existing stock IDs to maintain inventory continuity.
                  This mode allows manual stock ID entry for items you already have.
                </p>
              </div>
              <button onClick={() => setShowOpeningMode(false)}
                className="h-8 px-3 rounded-lg text-[11px] font-semibold bg-amber-700 text-white hover:bg-amber-800 transition-colors shrink-0 whitespace-nowrap">
                Disable Opening Stock
              </button>
            </div>
          )}

          {/* ── METRIC CARDS ── */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { label:"Total Stock",  value: allStock.length,  icon: Layers,       accent:"text-foreground"  },
              { label:"In Stock",     value: inStock,           icon: CheckCircle2, accent:"text-emerald-700" },
              { label:"Sold",         value: sold,              icon: TrendingDown, accent:"text-muted-foreground" },
              { label:"Diamond Items",value: diamondStock.length,icon: Gem,         accent:"text-violet-700"  },
            ].map(({ label, value, icon: Icon, accent }) => (
              <div key={label} className="bg-card border border-border rounded-2xl shadow-sm p-5 flex items-center justify-between hover:shadow-md hover:border-foreground/15 transition-all duration-200">
                <div>
                  <p className="text-xs font-medium text-muted-foreground mb-1.5 uppercase tracking-wider">{label}</p>
                  <p className={cn("text-2xl font-bold tabular-nums", accent)}>{value}</p>
                </div>
                <div className="h-11 w-11 rounded-xl bg-muted flex items-center justify-center shrink-0">
                  <Icon className="h-5 w-5 text-foreground/60" />
                </div>
              </div>
            ))}
          </div>

          {/* ── SEARCH & FILTERS ── */}
          <div className="bg-card border border-border rounded-2xl shadow-sm p-4 space-y-3">
            <div className="relative">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground/60" />
              <input type="text" placeholder="Search by Stock ID, Name, Category, Gold Weight, Diamond Weight…"
                value={search} onChange={(e) => setSearch(e.target.value)}
                className="w-full h-10 pl-10 pr-10 rounded-xl border border-border bg-background text-sm placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-foreground/20" />
              {search && (
                <button onClick={() => setSearch("")} className="absolute right-3 top-1/2 -translate-y-1/2">
                  <X className="h-3.5 w-3.5 text-muted-foreground" />
                </button>
              )}
            </div>
            <div className="flex items-center gap-3 flex-wrap">
              <div className="flex items-center gap-2 min-w-0">
                <span className="text-xs text-muted-foreground whitespace-nowrap">Filter by Category:</span>
                <Select value={categoryFilter} onValueChange={setCategory}>
                  <SelectTrigger className="h-8 w-40 rounded-lg border-border text-xs"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    <SelectItem value="gold">Gold Jewellery</SelectItem>
                    <SelectItem value="diamond">Diamond Jewellery</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-muted-foreground whitespace-nowrap">Filter by Source:</span>
                <Select value={sourceFilter} onValueChange={setSource}>
                  <SelectTrigger className="h-8 w-40 rounded-lg border-border text-xs"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Sources</SelectItem>
                    <SelectItem value="purchased">Purchased</SelectItem>
                    <SelectItem value="karigar">Karigar</SelectItem>
                    <SelectItem value="opening_stock">Opening Stock</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-muted-foreground whitespace-nowrap">Filter by Status:</span>
                <Select value={statusFilter} onValueChange={setStatus}>
                  <SelectTrigger className="h-8 w-36 rounded-lg border-border text-xs"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="available">Available</SelectItem>
                    <SelectItem value="sold">Sold</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              {(search || sourceFilter !== "all" || statusFilter !== "all") && (
                <button onClick={() => { setSearch(""); setSource("all"); setStatus("all"); }}
                  className="flex items-center gap-1 h-8 px-3 rounded-lg text-xs text-muted-foreground border border-border hover:bg-muted/40 transition-colors">
                  <X className="h-3 w-3" /> Clear filters
                </button>
              )}
            </div>
          </div>

          {/* ── SUB-TAB BAR ── */}
          <div className="bg-card border border-border rounded-2xl shadow-sm overflow-hidden">
            {/* Tab bar */}
            <div className="flex items-center border-b border-border overflow-x-auto no-scrollbar">
              {SUB_TABS.map((t) => (
                <button key={t.key} onClick={() => setSubTab(t.key)}
                  className={cn(
                    "flex items-center gap-1.5 px-5 py-3 text-sm font-medium border-b-2 -mb-px transition-colors whitespace-nowrap",
                    subTab === t.key
                      ? "border-foreground text-foreground"
                      : "border-transparent text-muted-foreground hover:text-foreground",
                  )}>
                  <t.icon className="h-3.5 w-3.5" />
                  {t.label}
                  {t.count !== undefined && (
                    <span className={cn(
                      "inline-flex items-center px-1.5 py-0.5 rounded-md text-[10px] font-bold",
                      subTab === t.key ? "bg-foreground text-background" : "bg-muted text-muted-foreground",
                    )}>{t.count}</span>
                  )}
                </button>
              ))}
            </div>

            {/* ── STOCK ITEMS TAB ── */}
            {subTab === "items" && (
              <div>
                {/* Gold / Diamond inner tabs */}
                <div className="flex items-center border-b border-border px-5 gap-1 bg-muted/20">
                  {(["gold","diamond"] as JewTab[]).map((jt) => (
                    <button key={jt} onClick={() => { setJewTab(jt); setSearch(""); }}
                      className={cn(
                        "px-5 py-2.5 text-sm font-medium border-b-2 -mb-px transition-colors whitespace-nowrap flex items-center gap-1.5",
                        jewTab === jt ? "border-foreground text-foreground" : "border-transparent text-muted-foreground hover:text-foreground",
                      )}>
                      {jt === "gold" ? <Package className="h-3.5 w-3.5" /> : <Gem className="h-3.5 w-3.5" />}
                      {jt === "gold" ? "Gold Jewelry" : "Diamond Jewelry"}
                    </button>
                  ))}
                </div>

                {/* Section header */}
                <div className="flex items-center justify-between px-5 py-4 border-b border-border">
                  <div>
                    <div className="flex items-center gap-2">
                      {jewTab === "gold" ? <Package className="h-4 w-4 text-muted-foreground" /> : <Gem className="h-4 w-4 text-muted-foreground" />}
                      <h3 className="text-sm font-semibold text-foreground">
                        {jewTab === "gold" ? "Gold Jewelry Stock" : "Diamond Jewelry Stock"}
                      </h3>
                      <span className="inline-flex items-center px-2 py-0.5 rounded-md bg-muted text-[11px] font-medium text-muted-foreground border border-border">
                        {filtered.length}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-0.5 ml-6">
                      Manage your {jewTab === "gold" ? "gold" : "diamond"} jewellery inventory
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button className={btnOutline + " h-8 text-xs px-3"}>
                      <ChevronRight className="h-3 w-3" /> Select
                    </button>
                    <button onClick={() => setShowAddModal(true)} className={btnBlack + " h-8 text-xs px-3"}>
                      <Plus className="h-3 w-3" /> Add {jewTab === "gold" ? "Gold" : "Diamond"} Jewelry
                    </button>
                  </div>
                </div>

                <StockTable items={filtered} onView={setViewItem} onDelete={handleDelete} />
              </div>
            )}

            {subTab === "tallying"  && <PlaceholderTab icon={Layers}    label="Stock Tallying"   />}
            {subTab === "duplicates"&& <PlaceholderTab icon={Copy}      label="Duplicates"        />}
            {subTab === "history"   && <PlaceholderTab icon={History}   label="Import History"   />}
            {subTab === "deletion"  && <PlaceholderTab icon={ShieldAlert}label="Deletion Audit"  />}
            {subTab === "restore"   && <PlaceholderTab icon={RotateCcw} label="Restore Items"    />}
          </div>

        </div>
      </div>

      {/* ── MODALS ── */}
      <AddItemModal
        open={showAddModal} onClose={() => setShowAddModal(false)}
        category={jewTab} onAdd={handleAdd}
      />
      <ViewItemModal item={viewItem} onClose={() => setViewItem(null)} />
    </div>
  );
}
