import { useState } from "react";
import {
  Users, Plus, Search, SlidersHorizontal,
  Edit, Trash2, Crown,
} from "lucide-react";
import { cn } from "@/lib/utils";
import AnimatedMetricCard from "@/shared/components/AnimatedMetricCard";
import Pagination from "@/shared/components/Pagination";

/* ── MOCK DATA ── */
type Client = {
  id: number;
  name: string;
  phone?: string;
  email?: string;
  address?: string;
  city?: string;
  registrationDate: string;
  isVip?: boolean;
};

const CLIENTS: Client[] = [
  { id:823, name:"ANITA C/O VARSHA TESSI",            registrationDate:"8/7/2026",  isVip:true  },
  { id:822, name:"VAIBHAV BHAI",                       registrationDate:"7/7/2026"               },
  { id:821, name:"SUSHUL GUPTA C/O BHAVESH BHAI",     registrationDate:"7/7/2026"               },
  { id:820, name:"KARAN SIR C/O BHAVESH BHAI",        registrationDate:"6/7/2026"               },
  { id:819, name:"HETAL DI II",                        registrationDate:"3/7/2026"               },
  { id:818, name:"JIGNESH BHAI C/O DARSHANA DIDI",    registrationDate:"2/7/2026",  isVip:true  },
  { id:817, name:"SUSHMA GUPTA BNI",                  registrationDate:"1/7/2026"               },
  { id:816, name:"MAHAK MAM",                         registrationDate:"30/6/2026"              },
  { id:815, name:"DEEPA MAM",                         registrationDate:"28/6/2026"              },
  { id:814, name:"RAMESH SHAH",                       registrationDate:"25/6/2026"              },
  { id:813, name:"PRIYA MEHTA",                       registrationDate:"22/6/2026", isVip:true  },
  { id:812, name:"ROHAN PANSARE",                     registrationDate:"20/6/2026"              },
  { id:811, name:"HEENA KHATRI",                      registrationDate:"18/6/2026"              },
  { id:810, name:"BISMI (BHAVESH)",                   registrationDate:"15/6/2026"              },
  { id:809, name:"TEJAL SOMAIYA",                     registrationDate:"12/6/2026"              },
  { id:808, name:"DHEERAJ M",                         registrationDate:"10/6/2026", isVip:true  },
  { id:807, name:"VARSHA TESSI",                      registrationDate:"8/6/2026"               },
  { id:806, name:"BASKAR",                            registrationDate:"5/6/2026"               },
  { id:805, name:"ANKIT C/F BHAVESH BHAI",            registrationDate:"2/6/2026"               },
  { id:804, name:"BHASKAR KANERI CNEXTKRAFT",         registrationDate:"28/5/2026"              },
];

const PAGE_SIZE = 10;

/* ── AVATAR ── */
function Avatar({ name, isVip }: { name: string; isVip?: boolean }) {
  const initials = name.split(" ").slice(0, 2).map(w => w[0]).join("").toUpperCase();
  return (
    <div className="relative h-9 w-9 rounded-full bg-muted flex items-center justify-center shrink-0">
      <span className="text-xs font-bold text-foreground/60">{initials}</span>
      {isVip && (
        <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-amber-100 flex items-center justify-center">
          <Crown className="h-2.5 w-2.5 text-amber-600" />
        </span>
      )}
    </div>
  );
}

/* ── MAIN ── */
export default function ClientManagement() {
  const [search, setSearch] = useState("");
  const [page,   setPage]   = useState(1);

  const filtered = CLIENTS.filter(c => {
    const q = search.toLowerCase();
    return !q || c.name.toLowerCase().includes(q) || String(c.id).includes(q);
  });

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const safePage   = Math.min(page, totalPages);
  const paged      = filtered.slice((safePage - 1) * PAGE_SIZE, safePage * PAGE_SIZE);

  function handleSearch(q: string) { setSearch(q); setPage(1); }

  const vipCount = CLIENTS.filter(c => c.isVip).length;

  return (
    <div className="w-full flex flex-col h-full">

      {/* HEADER */}
      <div className="px-8 pt-6 pb-5 border-b border-border shrink-0 flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Users className="h-5 w-5 text-muted-foreground" />
            <h1 className="text-2xl font-semibold text-foreground tracking-tight">Client Management</h1>
          </div>
          <p className="text-sm text-muted-foreground">Manage your clients and their contact information</p>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground pointer-events-none" />
            <input
              type="text"
              placeholder="Search clients by name, phone, email, code..."
              value={search}
              onChange={e => handleSearch(e.target.value)}
              className="h-9 pl-9 pr-4 rounded-lg border border-border bg-background text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-foreground/20 transition-colors w-72"
            />
          </div>
          <button className="flex items-center gap-1.5 h-9 px-3 rounded-lg border border-border text-sm font-medium text-foreground hover:bg-sidebar-accent transition-colors">
            <SlidersHorizontal className="h-3.5 w-3.5" />
            Filter
          </button>
          <button className="flex items-center gap-1.5 h-9 px-4 rounded-lg bg-foreground text-background text-sm font-medium hover:bg-foreground/90 transition-colors">
            <Plus className="h-3.5 w-3.5" />
            Add Client
          </button>
        </div>
      </div>

      {/* BODY */}
      <div className="flex-1 overflow-y-auto no-scrollbar p-8 space-y-5">

        {/* METRIC STRIP */}
        <div className="grid grid-cols-3 gap-4">
          {[
            { label:"Total Clients",      value: String(CLIENTS.length), sub:"Registered"         },
            { label:"VIP Clients",        value: String(vipCount),       sub:"Priority accounts"  },
            { label:"Recent (30 days)",   value: "20",                   sub:"New registrations"  },
          ].map(({ label, value, sub }, i) => (
            <AnimatedMetricCard key={label} label={label} value={value} sub={sub} index={i} />
          ))}
        </div>

        {/* TABLE */}
        <div className="bg-card border border-border rounded-xl overflow-hidden">
          <div className="px-6 py-4 border-b border-border flex items-center justify-between">
            <span className="text-sm font-semibold text-foreground">Registered Clients ({filtered.length})</span>
            <span className="text-xs text-muted-foreground">Page {safePage} of {totalPages}</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-muted/30">
                  {["Client","Contact Details","Personal Info","Address","Registration Date","Actions"].map(h => (
                    <th key={h} className="text-left px-5 py-3.5 text-[11px] font-semibold text-muted-foreground uppercase tracking-wider whitespace-nowrap">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {paged.map(client => (
                  <tr key={client.id} className="hover:bg-muted/20 transition-colors group">

                    {/* Client */}
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-3">
                        <Avatar name={client.name} isVip={client.isVip} />
                        <div>
                          <p className="text-sm font-semibold text-foreground leading-tight">{client.name}</p>
                          <p className="text-[11px] text-muted-foreground">ID: {client.id}</p>
                        </div>
                      </div>
                    </td>

                    {/* Contact */}
                    <td className="px-5 py-3.5">
                      <span className="text-xs text-muted-foreground">—</span>
                    </td>

                    {/* Personal Info */}
                    <td className="px-5 py-3.5">
                      <span className="text-xs text-muted-foreground">—</span>
                    </td>

                    {/* Address */}
                    <td className="px-5 py-3.5">
                      <span className="text-xs text-muted-foreground">—</span>
                    </td>

                    {/* Registration Date */}
                    <td className="px-5 py-3.5">
                      <span className="text-xs text-foreground font-medium tabular-nums whitespace-nowrap">
                        {client.registrationDate}
                      </span>
                    </td>

                    {/* Actions */}
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-1">
                        <button
                          title="VIP / Crown"
                          className="h-7 w-7 rounded flex items-center justify-center border border-border text-amber-500 hover:bg-amber-50 hover:border-amber-200 transition-colors"
                        >
                          <Crown className="h-3.5 w-3.5" />
                        </button>
                        <button
                          title="Edit"
                          className="h-7 w-7 rounded flex items-center justify-center border border-border text-muted-foreground hover:bg-sidebar-accent hover:text-foreground transition-colors"
                        >
                          <Edit className="h-3.5 w-3.5" />
                        </button>
                        <button
                          title="Delete"
                          className="h-7 w-7 rounded flex items-center justify-center border border-border text-red-400 hover:bg-red-50 hover:border-red-200 transition-colors"
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
                      No clients match the search.
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
            itemLabel="clients"
          />
        </div>

      </div>
    </div>
  );
}
