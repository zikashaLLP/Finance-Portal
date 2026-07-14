import { useState } from "react";
import {
  Truck, Plus, Search, Edit, Trash2,
  ChevronLeft, ChevronRight, FileText,
} from "lucide-react";
import { cn } from "@/lib/utils";

/* ── DATA ── */
type Vendor = {
  id: number;
  name: string;
  phone?: string;
  email?: string;
  address?: string;
  registrationDate: string;
  category?: string;
};

const VENDORS: Vendor[] = [
  { id:269, name:"VIKRAM PAGHARIYA (SILVER PURCHASE)", registrationDate:"14/7/2026", category:"Silver"    },
  { id:268, name:"ANJALI LABTECH LIMITED",             registrationDate:"13/7/2026", category:"Diamond"   },
  { id:267, name:"SHOP PURCHASE EXPENSES",             registrationDate:"29/6/2026"                       },
  { id:266, name:"mitesh bhai",                        registrationDate:"29/6/2026"                       },
  { id:265, name:"MARUTI EXPORT",                      registrationDate:"24/6/2026", category:"Gold"      },
  { id:264, name:"Sunny DTC",                          registrationDate:"20/6/2026", category:"Diamond"   },
  { id:263, name:"YUVRAJ BHAI",                        registrationDate:"15/6/2026", category:"Diamond"   },
  { id:262, name:"Chintan",                            registrationDate:"12/6/2026", category:"Diamond"   },
  { id:261, name:"RAMESH JEWELLERS",                   registrationDate:"10/6/2026", category:"Gold"      },
  { id:260, name:"NATIONAL SILVER CO.",                registrationDate:"5/6/2026",  category:"Silver"    },
  { id:259, name:"BHAVESH GOLD WORKS",                 registrationDate:"1/6/2026",  category:"Gold"      },
  { id:258, name:"DTC NEW (ARPIT SIR)",                registrationDate:"28/5/2026", category:"Diamond"   },
];

const PAGE_SIZE = 8;

/* ── VENDOR ICON ── */
function VendorIcon({ name }: { name: string }) {
  const initials = name.split(" ").slice(0, 2).map(w => w[0]).join("").toUpperCase();
  return (
    <div className="h-9 w-9 rounded-lg bg-muted flex items-center justify-center shrink-0">
      <span className="text-xs font-bold text-foreground/50">{initials}</span>
    </div>
  );
}

const CAT_COLORS: Record<string, string> = {
  Diamond: "bg-blue-100 text-blue-700",
  Gold:    "bg-amber-100 text-amber-700",
  Silver:  "bg-slate-100 text-slate-600",
};

export default function VendorManagement() {
  const [search, setSearch] = useState("");
  const [page,   setPage]   = useState(1);

  const filtered = VENDORS.filter(v => {
    const q = search.toLowerCase();
    return !q || v.name.toLowerCase().includes(q) || String(v.id).includes(q);
  });

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const safePage   = Math.min(page, totalPages);
  const paged      = filtered.slice((safePage - 1) * PAGE_SIZE, safePage * PAGE_SIZE);

  function handleSearch(q: string) { setSearch(q); setPage(1); }

  const diamondVendors = VENDORS.filter(v => v.category === "Diamond").length;
  const goldVendors    = VENDORS.filter(v => v.category === "Gold").length;

  return (
    <div className="w-full flex flex-col h-full">

      {/* HEADER */}
      <div className="px-8 pt-6 pb-5 border-b border-border shrink-0 flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Truck className="h-5 w-5 text-muted-foreground" />
            <h1 className="text-2xl font-semibold text-foreground tracking-tight">Vendor Management</h1>
          </div>
          <p className="text-sm text-muted-foreground">Manage your suppliers and vendor information</p>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground pointer-events-none" />
            <input
              type="text"
              placeholder="Search by name, phone, email, or address..."
              value={search}
              onChange={e => handleSearch(e.target.value)}
              className="h-9 pl-9 pr-4 rounded-lg border border-border bg-background text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-foreground/20 transition-colors w-72"
            />
          </div>
          <button className="flex items-center gap-1.5 h-9 px-4 rounded-lg bg-foreground text-background text-sm font-medium hover:bg-foreground/90 transition-colors">
            <Plus className="h-3.5 w-3.5" />
            Add Vendor
          </button>
        </div>
      </div>

      {/* BODY */}
      <div className="flex-1 overflow-y-auto no-scrollbar p-8 space-y-5">

        {/* METRIC STRIP */}
        <div className="grid grid-cols-3 gap-4">
          {[
            { label:"Total Vendors",    value: String(VENDORS.length), sub:"Registered suppliers"  },
            { label:"Diamond Vendors",  value: String(diamondVendors), sub:"Diamond category"      },
            { label:"Gold Vendors",     value: String(goldVendors),    sub:"Gold category"         },
          ].map(({ label, value, sub }) => (
            <div key={label} className="bg-card border border-border rounded-xl px-5 py-4 hover:shadow-sm transition-all">
              <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider mb-1">{label}</p>
              <p className="text-2xl font-bold text-foreground tabular-nums leading-none mb-0.5">{value}</p>
              <p className="text-[11px] text-muted-foreground">{sub}</p>
            </div>
          ))}
        </div>

        {/* TABLE */}
        <div className="bg-card border border-border rounded-xl overflow-hidden">
          <div className="px-6 py-4 border-b border-border flex items-center justify-between">
            <span className="text-sm font-semibold text-foreground">Registered Vendors ({filtered.length})</span>
            <span className="text-xs text-muted-foreground">Page {safePage} of {totalPages}</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-muted/30">
                  {["Vendor","Category","Contact Details","Address","Registration Date","Actions"].map(h => (
                    <th key={h} className="text-left px-5 py-3 text-[10px] font-semibold text-muted-foreground uppercase tracking-wider whitespace-nowrap">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {paged.map(vendor => (
                  <tr key={vendor.id} className="hover:bg-muted/20 transition-colors group">

                    {/* Vendor */}
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-3">
                        <VendorIcon name={vendor.name} />
                        <div>
                          <p className="text-sm font-semibold text-foreground leading-tight">{vendor.name}</p>
                          <p className="text-[11px] text-muted-foreground">ID: {vendor.id}</p>
                        </div>
                      </div>
                    </td>

                    {/* Category */}
                    <td className="px-5 py-3.5">
                      {vendor.category
                        ? <span className={cn("inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold", CAT_COLORS[vendor.category] ?? "bg-muted text-muted-foreground")}>
                            {vendor.category}
                          </span>
                        : <span className="text-xs text-muted-foreground">—</span>
                      }
                    </td>

                    {/* Contact */}
                    <td className="px-5 py-3.5">
                      <span className="text-xs text-muted-foreground">—</span>
                    </td>

                    {/* Address */}
                    <td className="px-5 py-3.5">
                      <span className="text-xs text-muted-foreground">—</span>
                    </td>

                    {/* Registration */}
                    <td className="px-5 py-3.5">
                      <span className="text-xs text-foreground font-medium tabular-nums whitespace-nowrap">
                        {vendor.registrationDate}
                      </span>
                    </td>

                    {/* Actions */}
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-1">
                        <button
                          title="View Purchases"
                          className="h-7 w-7 rounded border border-border flex items-center justify-center text-muted-foreground hover:bg-sidebar-accent hover:text-foreground transition-colors"
                        >
                          <FileText className="h-3.5 w-3.5" />
                        </button>
                        <button
                          title="Edit"
                          className="h-7 w-7 rounded border border-border flex items-center justify-center text-muted-foreground hover:bg-sidebar-accent hover:text-foreground transition-colors"
                        >
                          <Edit className="h-3.5 w-3.5" />
                        </button>
                        <button
                          title="Delete"
                          className="h-7 w-7 rounded border border-border flex items-center justify-center text-red-400 hover:bg-red-50 hover:border-red-200 transition-colors"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {paged.length === 0 && (
                  <tr>
                    <td colSpan={6} className="px-6 py-10 text-center text-sm text-muted-foreground">
                      No vendors match the search.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* PAGINATION */}
          <div className="px-6 py-3.5 border-t border-border flex items-center justify-between bg-muted/10">
            <p className="text-xs text-muted-foreground">
              Showing {filtered.length === 0 ? 0 : (safePage - 1) * PAGE_SIZE + 1}–{Math.min(safePage * PAGE_SIZE, filtered.length)} of {filtered.length} vendors
            </p>
            <div className="flex items-center gap-1">
              <button
                onClick={() => setPage(p => Math.max(1, p - 1))}
                disabled={safePage === 1}
                className="h-7 w-7 rounded-md border border-border flex items-center justify-center text-muted-foreground hover:bg-sidebar-accent disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
              >
                <ChevronLeft className="h-3.5 w-3.5" />
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(n => (
                <button
                  key={n}
                  onClick={() => setPage(n)}
                  className={cn(
                    "h-7 w-7 rounded-md text-xs font-medium transition-colors",
                    n === safePage ? "bg-foreground text-background" : "border border-border text-muted-foreground hover:bg-sidebar-accent",
                  )}
                >
                  {n}
                </button>
              ))}
              <button
                onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                disabled={safePage === totalPages}
                className="h-7 w-7 rounded-md border border-border flex items-center justify-center text-muted-foreground hover:bg-sidebar-accent disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
              >
                <ChevronRight className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
