import { useState } from "react";
import { Users, Plus, Search, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import AnimatedMetricCard from "@/shared/components/AnimatedMetricCard";

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
  { id:20, name:"Group 20", totalCards:75, assigned:10, active:10, status:"active"               },
  { id:19, name:"Group 19", totalCards:75, assigned:12, active:11, tag:"Diamond", status:"active" },
  { id:18, name:"Group 18", totalCards:75, assigned:12, active:11, tag:"GRP-18",  status:"active" },
  { id:17, name:"Group 17", totalCards:75, assigned:7,  active:7,  status:"active"               },
  { id:16, name:"Group 16", totalCards:75, assigned:6,  active:6,  tag:"Diamond", status:"active" },
  { id:15, name:"Group 15", totalCards:75, assigned:5,  active:5,  tag:"Diamond", status:"active" },
  { id:14, name:"Group 14", totalCards:75, assigned:8,  active:8,  status:"active"               },
  { id:13, name:"Group 13", totalCards:75, assigned:21, active:20, tag:"Diamond", status:"active" },
  { id:12, name:"Group 12", totalCards:75, assigned:15, active:14, status:"active"               },
  { id:11, name:"Group 11", totalCards:75, assigned:18, active:17, tag:"Diamond", status:"active" },
  { id:10, name:"Group 10", totalCards:75, assigned:30, active:28, tag:"Diamond", status:"active" },
  { id:9,  name:"Group 9",  totalCards:75, assigned:40, active:38, status:"active"               },
  { id:8,  name:"Group 8",  totalCards:75, assigned:50, active:48, tag:"Diamond", status:"active" },
  { id:7,  name:"Group 7",  totalCards:75, assigned:60, active:57, status:"active"               },
  { id:6,  name:"Group 6",  totalCards:75, assigned:68, active:65, tag:"Diamond", status:"active" },
  { id:5,  name:"Group 5",  totalCards:75, assigned:70, active:68, status:"active"               },
  { id:4,  name:"Group 4",  totalCards:75, assigned:73, active:70, tag:"Diamond", status:"active" },
  { id:3,  name:"Group 3",  totalCards:75, assigned:75, active:72, status:"active"               },
  { id:2,  name:"Group 2",  totalCards:75, assigned:75, active:73, tag:"Diamond", status:"active" },
  { id:1,  name:"Group 1",  totalCards:75, assigned:75, active:75, status:"closed"               },
];

export default function GroupManagement() {
  const [search, setSearch] = useState("");

  const filtered = GROUPS.filter(g =>
    !search || g.name.toLowerCase().includes(search.toLowerCase())
  );

  const activeCount  = GROUPS.filter(g => g.status === "active").length;
  const totalAssigned = GROUPS.reduce((s, g) => s + g.assigned, 0);
  const totalActive   = GROUPS.reduce((s, g) => s + g.active, 0);
  const totalAvail    = GROUPS.reduce((s, g) => s + (g.totalCards - g.assigned), 0);

  return (
    <div className="w-full flex flex-col h-full">

      {/* HEADER */}
      <div className="px-8 pt-6 pb-5 border-b border-border shrink-0 flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Users className="h-5 w-5 text-muted-foreground" />
            <h1 className="text-2xl font-semibold text-foreground tracking-tight">Diamond Harvest Plan Groups</h1>
          </div>
          <p className="text-sm text-muted-foreground">Manage groups and card assignments (75 cards per group)</p>
        </div>
        <button className="flex items-center gap-1.5 h-9 px-4 rounded-lg bg-foreground text-background text-sm font-medium hover:bg-foreground/90 transition-colors">
          <Plus className="h-3.5 w-3.5" />
          Create Group
        </button>
      </div>

      {/* BODY */}
      <div className="flex-1 overflow-y-auto no-scrollbar p-8 space-y-5">

        {/* SUMMARY METRIC STRIP */}
        <div className="grid grid-cols-4 gap-4">
          {[
            { label: "Total Groups",     value: GROUPS.length,  sub: `${activeCount} active`          },
            { label: "Total Assigned",   value: totalAssigned,  sub: "across all groups"               },
            { label: "Total Active",     value: totalActive,    sub: "currently running", em: true     },
            { label: "Total Available",  value: totalAvail,     sub: "slots open"                      },
          ].map(({ label, value, sub, em }, i) => (
            <AnimatedMetricCard
              key={label}
              label={label}
              value={String(value)}
              sub={sub}
              index={i}
              accent={em}
            />
          ))}
        </div>

        {/* SEARCH */}
        <div className="flex items-center gap-3">
          <div className="relative flex-1 max-w-xs">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground pointer-events-none" />
            <input
              type="text"
              placeholder="Search groups..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full h-9 pl-9 pr-3 rounded-lg border border-border bg-card text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-foreground/20 transition-colors"
            />
          </div>
          <span className="text-xs text-muted-foreground">{filtered.length} groups</span>
        </div>

        {/* TABLE */}
        <div className="bg-card border border-border rounded-xl overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/30">
                <th className="text-left px-5 py-3.5 text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">Group</th>
                <th className="text-left px-5 py-3.5 text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">Status</th>
                <th className="text-left px-5 py-3.5 text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">Type</th>
                <th className="text-right px-5 py-3.5 text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">Assigned</th>
                <th className="text-right px-5 py-3.5 text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">Active</th>
                <th className="text-right px-5 py-3.5 text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">Available</th>
                <th className="px-5 py-3.5 text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">Capacity</th>
                <th className="px-3 py-3.5" />
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filtered.map(group => {
                const available = group.totalCards - group.assigned;
                const pct       = Math.round((group.assigned / group.totalCards) * 100);
                const isFull    = available === 0;
                return (
                  <tr key={group.id} className="hover:bg-muted/20 transition-colors group cursor-pointer">

                    {/* Group name */}
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="h-8 w-8 rounded-lg bg-muted flex items-center justify-center shrink-0">
                          <Users className="h-3.5 w-3.5 text-foreground/50" />
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-foreground">{group.name}</p>
                          <p className="text-[10px] text-muted-foreground">75 cards total</p>
                        </div>
                      </div>
                    </td>

                    {/* Status */}
                    <td className="px-6 py-4">
                      <span className={cn(
                        "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-semibold uppercase tracking-wide",
                        group.status === "active" ? "bg-emerald-100 text-emerald-700" : "bg-muted text-muted-foreground",
                      )}>
                        <span className={cn("h-1.5 w-1.5 rounded-full", group.status === "active" ? "bg-emerald-500" : "bg-muted-foreground/40")} />
                        {group.status}
                      </span>
                    </td>

                    {/* Type tag */}
                    <td className="px-6 py-4">
                      {group.tag
                        ? <span className="text-[10px] font-semibold text-muted-foreground/70 uppercase tracking-wider bg-muted px-2 py-0.5 rounded">
                            {group.tag}
                          </span>
                        : <span className="text-muted-foreground text-xs">—</span>
                      }
                    </td>

                    {/* Assigned */}
                    <td className="px-6 py-4 text-right">
                      <span className="text-sm font-semibold text-foreground tabular-nums">{group.assigned}</span>
                    </td>

                    {/* Active */}
                    <td className="px-6 py-4 text-right">
                      <span className="text-sm font-semibold text-emerald-600 tabular-nums">{group.active}</span>
                    </td>

                    {/* Available */}
                    <td className="px-6 py-4 text-right">
                      <span className={cn(
                        "text-sm font-semibold tabular-nums",
                        isFull ? "text-red-500" : "text-foreground",
                      )}>
                        {available}
                      </span>
                    </td>

                    {/* Capacity bar */}
                    <td className="px-6 py-4 min-w-[140px]">
                      <div className="flex items-center gap-2">
                        <div className="flex-1 h-1.5 bg-muted rounded-full overflow-hidden">
                          <div
                            className={cn(
                              "h-full rounded-full transition-all",
                              isFull ? "bg-red-400" : pct >= 80 ? "bg-amber-400" : "bg-foreground/50",
                            )}
                            style={{ width: `${pct}%` }}
                          />
                        </div>
                        <span className="text-[11px] font-semibold text-muted-foreground tabular-nums w-8 text-right shrink-0">
                          {pct}%
                        </span>
                      </div>
                    </td>

                    {/* Arrow */}
                    <td className="px-3 py-4">
                      <ChevronRight className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                    </td>
                  </tr>
                );
              })}

              {filtered.length === 0 && (
                <tr>
                  <td colSpan={8} className="px-6 py-10 text-center text-sm text-muted-foreground">
                    No groups found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>

          {/* TABLE FOOTER */}
          <div className="px-6 py-3 border-t border-border bg-muted/10 flex items-center justify-between">
            <p className="text-xs text-muted-foreground">{filtered.length} of {GROUPS.length} groups</p>
            <div className="flex items-center gap-4 text-xs text-muted-foreground">
              <span>Total slots: {GROUPS.length * 75}</span>
              <span>·</span>
              <span>Assigned: {totalAssigned}</span>
              <span>·</span>
              <span>Available: {totalAvail}</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
