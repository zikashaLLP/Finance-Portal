import { useState } from "react";
import { Users, Plus, Search } from "lucide-react";
import { cn } from "@/lib/utils";

/* ── MOCK DATA ── */
type Group = {
  id: number;
  name: string;
  totalCards: number;
  assigned: number;
  active: number;
  tag?: string;
  status: "active" | "closed";
};

const GROUPS: Group[] = [
  { id:20, name:"Group 20", totalCards:75, assigned:10, active:10, status:"active"                },
  { id:19, name:"Group 19", totalCards:75, assigned:12, active:11, tag:"Diamond",  status:"active" },
  { id:18, name:"Group 18", totalCards:75, assigned:12, active:11, tag:"GRP -18",  status:"active" },
  { id:17, name:"Group 17", totalCards:75, assigned:7,  active:7,  status:"active"                },
  { id:16, name:"Group 16", totalCards:75, assigned:6,  active:6,  tag:"DIAMOND",  status:"active" },
  { id:15, name:"Group 15", totalCards:75, assigned:5,  active:5,  tag:"DIAMOND",  status:"active" },
  { id:14, name:"Group 14", totalCards:75, assigned:8,  active:8,  status:"active"                },
  { id:13, name:"Group 13", totalCards:75, assigned:21, active:20, tag:"Diamond",  status:"active" },
  { id:12, name:"Group 12", totalCards:75, assigned:15, active:14, status:"active"                },
  { id:11, name:"Group 11", totalCards:75, assigned:18, active:17, tag:"DIAMOND",  status:"active" },
  { id:10, name:"Group 10", totalCards:75, assigned:30, active:28, tag:"DIAMOND",  status:"active" },
  { id:9,  name:"Group 9",  totalCards:75, assigned:40, active:38, status:"active"                },
  { id:8,  name:"Group 8",  totalCards:75, assigned:50, active:48, tag:"Diamond",  status:"active" },
  { id:7,  name:"Group 7",  totalCards:75, assigned:60, active:57, status:"active"                },
  { id:6,  name:"Group 6",  totalCards:75, assigned:68, active:65, tag:"DIAMOND",  status:"active" },
  { id:5,  name:"Group 5",  totalCards:75, assigned:70, active:68, status:"active"                },
  { id:4,  name:"Group 4",  totalCards:75, assigned:73, active:70, tag:"Diamond",  status:"active" },
  { id:3,  name:"Group 3",  totalCards:75, assigned:75, active:72, status:"active"                },
  { id:2,  name:"Group 2",  totalCards:75, assigned:75, active:73, tag:"DIAMOND",  status:"active" },
  { id:1,  name:"Group 1",  totalCards:75, assigned:75, active:75, status:"closed"                },
];

export default function GroupManagement() {
  const [search, setSearch] = useState("");

  const filtered = GROUPS.filter(g =>
    !search || g.name.toLowerCase().includes(search.toLowerCase())
  );

  const activeCount = GROUPS.filter(g => g.status === "active").length;

  return (
    <div className="w-full flex flex-col h-full">

      {/* HEADER */}
      <div className="px-8 pt-6 pb-5 border-b border-border shrink-0 flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Users className="h-5 w-5 text-muted-foreground" />
            <h1 className="text-2xl font-semibold text-foreground tracking-tight">Diamond Harvest Plan Groups</h1>
          </div>
          <p className="text-sm text-muted-foreground">
            Manage groups and card assignments (75 cards per group)
          </p>
        </div>
        <button className="flex items-center gap-1.5 h-9 px-4 rounded-lg bg-foreground text-background text-sm font-medium hover:bg-foreground/90 transition-colors">
          <Plus className="h-3.5 w-3.5" />
          Create Group
        </button>
      </div>

      {/* BODY */}
      <div className="flex-1 overflow-y-auto no-scrollbar p-8 space-y-5">

        {/* SEARCH + SUMMARY */}
        <div className="flex items-center gap-4">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground pointer-events-none" />
            <input
              type="text"
              placeholder="Search groups..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full h-9 pl-10 pr-3 rounded-lg border border-border bg-card text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-foreground/20 transition-colors"
            />
          </div>
          <p className="text-sm text-muted-foreground shrink-0">
            {activeCount} active groups · {GROUPS.length} total
          </p>
        </div>

        {/* GROUP CARDS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map(group => {
            const available = group.totalCards - group.assigned;
            const fillPct   = Math.round((group.assigned / group.totalCards) * 100);
            return (
              <div
                key={group.id}
                className="bg-card border border-border rounded-xl p-5 hover:shadow-sm hover:border-foreground/15 transition-all duration-200 cursor-pointer"
              >
                {/* Card header */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <div className="h-7 w-7 rounded-lg bg-muted flex items-center justify-center">
                      <Users className="h-3.5 w-3.5 text-foreground/60" />
                    </div>
                    <span className="text-sm font-bold text-foreground">{group.name}</span>
                  </div>
                  <span className={cn(
                    "inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wide",
                    group.status === "active"
                      ? "bg-emerald-100 text-emerald-700"
                      : "bg-muted text-muted-foreground",
                  )}>
                    <span className={cn("h-1.5 w-1.5 rounded-full", group.status === "active" ? "bg-emerald-500" : "bg-muted-foreground/50")} />
                    {group.status}
                  </span>
                </div>

                {/* Stats */}
                <div className="space-y-2">
                  {[
                    { label:"Total Cards", value: group.totalCards, cls:"text-foreground/70"  },
                    { label:"Assigned",    value: group.assigned,   cls:"text-foreground font-semibold" },
                    { label:"Active",      value: group.active,     cls:"text-emerald-600 font-semibold" },
                    { label:"Available",   value: available,        cls:"text-foreground font-semibold" },
                  ].map(({ label, value, cls }) => (
                    <div key={label} className="flex items-center justify-between">
                      <span className="text-xs text-muted-foreground">{label}:</span>
                      <span className={cn("text-xs tabular-nums", cls)}>{value}</span>
                    </div>
                  ))}
                </div>

                {/* Fill bar */}
                <div className="mt-4">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[10px] text-muted-foreground">Capacity</span>
                    <span className="text-[10px] font-semibold text-foreground">{fillPct}%</span>
                  </div>
                  <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                    <div
                      className="h-full bg-foreground rounded-full transition-all"
                      style={{ width: `${fillPct}%` }}
                    />
                  </div>
                </div>

                {/* Tag */}
                {group.tag && (
                  <p className="mt-3 text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">
                    {group.tag}
                  </p>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
}
