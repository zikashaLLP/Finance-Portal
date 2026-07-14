import { useState } from "react";
import {
  ShoppingBag, Plus, Search, RefreshCw,
  Eye, Edit, Trash2, ChevronDown,
} from "lucide-react";
import { cn } from "@/lib/utils";
import AnimatedMetricCard from "@/shared/components/AnimatedMetricCard";
import Pagination from "@/shared/components/Pagination";

/* ── DATA ── */
type ItemType = "Loose Diamond" | "Gold Jewellery" | "Diamond Jewellery" | "Pure Gold";

type Purchase = {
  id: string;
  lotNo: string;
  date: string;
  seller: string;
  itemType: ItemType;
  itemName: string;
  goldWeight: string | null;
  totalAmount: number;
};

const PURCHASES: Purchase[] = [
  { id:"p1",  lotNo:"CVD-AUTO-569", date:"13/7/2026", seller:"ANJALI LABTECH LIMITED",   itemType:"Loose Diamond",     itemName:"Loose Diamond", goldWeight:null,      totalAmount:32619.72  },
  { id:"p2",  lotNo:"CVD-AUTO-565", date:"10/7/2026", seller:"Sunny DTC",                itemType:"Loose Diamond",     itemName:"Loose Diamond", goldWeight:null,      totalAmount:1512.00   },
  { id:"p3",  lotNo:"CVD-AUTO-564", date:"10/7/2026", seller:"Sunny DTC",                itemType:"Loose Diamond",     itemName:"Loose Diamond", goldWeight:null,      totalAmount:57.60     },
  { id:"p4",  lotNo:"CVD-AUTO-563", date:"10/7/2026", seller:"Sunny DTC",                itemType:"Loose Diamond",     itemName:"Loose Diamond", goldWeight:null,      totalAmount:907.20    },
  { id:"p5",  lotNo:"CVD-AUTO-562", date:"10/7/2026", seller:"Sunny DTC",                itemType:"Loose Diamond",     itemName:"Loose Diamond", goldWeight:null,      totalAmount:6854.40   },
  { id:"p6",  lotNo:"solitaire-AUTO-560", date:"4/7/2026", seller:"Chintan",             itemType:"Loose Diamond",     itemName:"Loose Diamond", goldWeight:null,      totalAmount:96171.00  },
  { id:"p7",  lotNo:"3D-AUTO-558",  date:"1/7/2026",  seller:"YUVRAJ BHAI",              itemType:"Loose Diamond",     itemName:"Loose Diamond", goldWeight:null,      totalAmount:41900.00  },
  { id:"p8",  lotNo:"GJ-AUTO-545",  date:"25/6/2026", seller:"RAMESH JEWELLERS",         itemType:"Gold Jewellery",    itemName:"CHAIN 22K",     goldWeight:"12.50g",  totalAmount:78500.00  },
  { id:"p9",  lotNo:"GJ-AUTO-544",  date:"25/6/2026", seller:"MARUTI EXPORT",            itemType:"Gold Jewellery",    itemName:"PENDANT SET",   goldWeight:"8.20g",   totalAmount:51200.00  },
  { id:"p10", lotNo:"DJ-AUTO-532",  date:"20/6/2026", seller:"ANJALI LABTECH LIMITED",   itemType:"Diamond Jewellery", itemName:"RING SET",      goldWeight:"5.10g",   totalAmount:125000.00 },
  { id:"p11", lotNo:"PG-AUTO-520",  date:"15/6/2026", seller:"VIKRAM PAGHARIYA",         itemType:"Pure Gold",         itemName:"24K Bar",       goldWeight:"100.00g", totalAmount:631000.00 },
  { id:"p12", lotNo:"CVD-AUTO-515", date:"12/6/2026", seller:"Sunny DTC",                itemType:"Loose Diamond",     itemName:"Loose Diamond", goldWeight:null,      totalAmount:4280.00   },
];

const PAGE_SIZE = 8;
const ITEM_TYPES = ["All Types", "Loose Diamond", "Gold Jewellery", "Diamond Jewellery", "Pure Gold"];

const fmtINR = (n: number) =>
  "₹" + new Intl.NumberFormat("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(n);

const TYPE_COLORS: Record<ItemType, string> = {
  "Loose Diamond":     "bg-blue-100 text-blue-700",
  "Gold Jewellery":    "bg-amber-100 text-amber-700",
  "Diamond Jewellery": "bg-purple-100 text-purple-700",
  "Pure Gold":         "bg-yellow-100 text-yellow-700",
};

const totalSpend   = PURCHASES.reduce((s, p) => s + p.totalAmount, 0);
const diamondCount = PURCHASES.filter(p => p.itemType === "Loose Diamond" || p.itemType === "Diamond Jewellery").length;
const goldCount    = PURCHASES.filter(p => p.itemType === "Gold Jewellery" || p.itemType === "Pure Gold").length;

export default function PurchaseManagement() {
  const [search,   setSearch]   = useState("");
  const [typeFilter, setType]   = useState("All Types");
  const [page,     setPage]     = useState(1);

  const filtered = PURCHASES.filter(p => {
    const q = search.toLowerCase();
    const matchQ = !q || p.seller.toLowerCase().includes(q) || p.lotNo.toLowerCase().includes(q) || p.itemName.toLowerCase().includes(q);
    const matchT = typeFilter === "All Types" || p.itemType === typeFilter;
    return matchQ && matchT;
  });

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const safePage   = Math.min(page, totalPages);
  const paged      = filtered.slice((safePage - 1) * PAGE_SIZE, safePage * PAGE_SIZE);

  function handleSearch(q: string) { setSearch(q); setPage(1); }
  function handleType(t: string)   { setType(t);   setPage(1); }

  return (
    <div className="w-full flex flex-col h-full">

      {/* HEADER */}
      <div className="px-8 pt-6 pb-5 border-b border-border shrink-0 flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <ShoppingBag className="h-5 w-5 text-muted-foreground" />
            <h1 className="text-2xl font-semibold text-foreground tracking-tight">Purchase Management</h1>
          </div>
          <p className="text-sm text-muted-foreground">Track and manage all jewellery and diamond purchases</p>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground pointer-events-none" />
            <input
              type="text"
              placeholder="Search by vendor, lot, item, weight"
              value={search}
              onChange={e => handleSearch(e.target.value)}
              className="h-9 pl-9 pr-4 rounded-lg border border-border bg-background text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-foreground/20 transition-colors w-60"
            />
          </div>
          {/* Type filter */}
          <div className="relative">
            <select
              value={typeFilter}
              onChange={e => handleType(e.target.value)}
              className="h-9 pl-3 pr-8 rounded-lg border border-border bg-background text-sm text-foreground appearance-none focus:outline-none cursor-pointer"
            >
              {ITEM_TYPES.map(t => <option key={t}>{t}</option>)}
            </select>
            <ChevronDown className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
          </div>
          <button className="flex items-center gap-1.5 h-9 px-3 rounded-lg border border-border text-sm font-medium text-foreground hover:bg-sidebar-accent transition-colors">
            <RefreshCw className="h-3.5 w-3.5" />
            Sync Gold Ledgers
          </button>
          <button className="flex items-center gap-1.5 h-9 px-4 rounded-lg bg-foreground text-background text-sm font-medium hover:bg-foreground/90 transition-colors">
            <Plus className="h-3.5 w-3.5" />
            Record Purchase
          </button>
        </div>
      </div>

      {/* BODY */}
      <div className="flex-1 overflow-y-auto no-scrollbar p-8 space-y-5">

        {/* METRIC STRIP */}
        <div className="grid grid-cols-4 gap-4">
          {[
            { label:"Total Purchases", value: String(PURCHASES.length), sub:"All records"          },
            { label:"Total Spend",     value: fmtINR(totalSpend),       sub:"Gross purchase value" },
            { label:"Diamond Orders",  value: String(diamondCount),     sub:"Diamond items"        },
            { label:"Gold Orders",     value: String(goldCount),        sub:"Gold & jewellery"     },
          ].map(({ label, value, sub }, i) => (
            <AnimatedMetricCard key={label} label={label} value={value} sub={sub} index={i} />
          ))}
        </div>

        {/* TABLE */}
        <div className="bg-card border border-border rounded-xl overflow-hidden">
          <div className="px-6 py-4 border-b border-border flex items-center justify-between">
            <span className="text-sm font-semibold text-foreground">Purchase Records ({filtered.length})</span>
            <span className="text-xs text-muted-foreground">Page {safePage} of {totalPages}</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-muted/30">
                  {["Lot Number","Date","Seller","Item Type","Item Name","Gold Weight","Total Amount","Actions"].map(h => (
                    <th key={h} className="text-left px-5 py-3.5 text-[11px] font-semibold text-muted-foreground uppercase tracking-wider whitespace-nowrap">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {paged.map(p => (
                  <tr key={p.id} className="hover:bg-muted/20 transition-colors">
                    <td className="px-5 py-3.5">
                      <span className="text-xs font-semibold text-foreground tabular-nums">{p.lotNo}</span>
                    </td>
                    <td className="px-5 py-3.5">
                      <span className="text-xs text-muted-foreground whitespace-nowrap">{p.date}</span>
                    </td>
                    <td className="px-5 py-3.5">
                      <span className="text-sm font-medium text-foreground">{p.seller}</span>
                    </td>
                    <td className="px-5 py-3.5">
                      <span className={cn("inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold", TYPE_COLORS[p.itemType])}>
                        {p.itemType}
                      </span>
                    </td>
                    <td className="px-5 py-3.5">
                      <span className="text-xs text-foreground">{p.itemName}</span>
                    </td>
                    <td className="px-5 py-3.5">
                      <span className="text-xs text-muted-foreground tabular-nums">{p.goldWeight ?? "—"}</span>
                    </td>
                    <td className="px-5 py-3.5">
                      <span className="text-sm font-semibold text-foreground tabular-nums">{fmtINR(p.totalAmount)}</span>
                    </td>
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-1">
                        <button className="flex items-center gap-1 h-7 px-2.5 rounded border border-border text-[10px] font-medium text-foreground hover:bg-sidebar-accent transition-colors whitespace-nowrap">
                          <Eye className="h-3 w-3" /> View Details
                        </button>
                        <button className="h-7 w-7 rounded border border-border flex items-center justify-center text-muted-foreground hover:bg-sidebar-accent hover:text-foreground transition-colors">
                          <Edit className="h-3.5 w-3.5" />
                        </button>
                        <button className="h-7 w-7 rounded border border-border flex items-center justify-center text-red-400 hover:bg-red-50 hover:border-red-200 transition-colors">
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {paged.length === 0 && (
                  <tr>
                    <td colSpan={8} className="px-6 py-10 text-center text-sm text-muted-foreground">
                      No purchases match the search.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <Pagination
            page={safePage}
            totalPages={totalPages}
            onPageChange={setPage}
            totalItems={filtered.length}
            pageSize={PAGE_SIZE}
            itemLabel="records"
          />
        </div>

      </div>
    </div>
  );
}
