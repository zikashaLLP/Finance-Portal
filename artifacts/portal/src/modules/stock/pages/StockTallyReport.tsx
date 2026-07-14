import { useState } from "react";
import { ClipboardList, History, RotateCcw, CheckCircle, Send } from "lucide-react";
import { cn } from "@/lib/utils";

/* ── DATA ── */
type TallyItem = { name: string; count: number };
type Verdict   = "yes" | "no" | null;

const GOLD_ITEMS: TallyItem[] = [
  { name:"Chain",         count:126 },
  { name:"Earring",       count:126 },
  { name:"Pendant",       count:112 },
  { name:"Ring",          count:107 },
  { name:"Bracelet",      count:38  },
  { name:"Necklace",      count:20  },
  { name:"Ring",          count:9   },
  { name:"Gold jewelry",  count:8   },
  { name:"Kadli",         count:4   },
  { name:"Tanmaniya",     count:4   },
  { name:"Other Items",   count:3   },
  { name:"Nosepin",       count:3   },
  { name:"Earrings",      count:2   },
  { name:"Mangalsutra",   count:1   },
  { name:"Ring",          count:1   },
];

const DIAMOND_ITEMS: TallyItem[] = [
  { name:"Earrings",       count:68 },
  { name:"Ring",           count:59 },
  { name:"Pendant",        count:56 },
  { name:"Diamond Jewelry",count:43 },
  { name:"Necklace",       count:12 },
  { name:"Tanmaniya",      count:12 },
  { name:"Bracelet",       count:9  },
  { name:"Bangles",        count:8  },
  { name:"Chain Pendant",  count:7  },
  { name:"Nosepin",        count:7  },
  { name:"Nath",           count:4  },
  { name:"Chain + Pendant",count:3  },
  { name:"Necklace Set",   count:2  },
  { name:"Diamond jewelry",count:2  },
  { name:"Nath",           count:1  },
  { name:"WATCH",          count:1  },
];

const todayStr = new Date().toISOString().split("T")[0];

type VerdictMap = Record<string, Verdict>;

function makeKey(section: string, idx: number) { return `${section}-${idx}`; }

/* ── ITEM ROW ── */
function TallyRow({ label, count, id, verdict, onVerdict }: {
  label: string; count: number; id: string;
  verdict: Verdict; onVerdict: (id: string, v: Verdict) => void;
}) {
  return (
    <div className={cn(
      "flex items-center justify-between px-4 py-3 border-b border-border last:border-0 transition-colors",
      verdict === "yes" ? "bg-emerald-50/50" : verdict === "no" ? "bg-red-50/40" : "hover:bg-muted/20",
    )}>
      <div>
        <p className="text-xs text-muted-foreground mb-0.5">{label}</p>
        <p className="text-base font-bold text-foreground tabular-nums">{count} pieces</p>
      </div>
      <div className="flex items-center gap-1.5">
        <button
          onClick={() => onVerdict(id, verdict === "yes" ? null : "yes")}
          className={cn(
            "flex items-center gap-1 px-3 py-1 rounded-md text-xs font-semibold border transition-all",
            verdict === "yes"
              ? "bg-emerald-600 text-white border-emerald-600"
              : "border-border text-muted-foreground hover:border-emerald-500 hover:text-emerald-600",
          )}
        >
          ✓ Yes
        </button>
        <button
          onClick={() => onVerdict(id, verdict === "no" ? null : "no")}
          className={cn(
            "flex items-center gap-1 px-3 py-1 rounded-md text-xs font-semibold border transition-all",
            verdict === "no"
              ? "bg-red-500 text-white border-red-500"
              : "border-border text-muted-foreground hover:border-red-400 hover:text-red-500",
          )}
        >
          ✕ No
        </button>
      </div>
    </div>
  );
}

/* ── SECTION ── */
function TallySection({ title, badge, items, color, verdicts, onVerdict, prefix }: {
  title: string; badge: string; items: TallyItem[];
  color: string; verdicts: VerdictMap;
  onVerdict: (id: string, v: Verdict) => void; prefix: string;
}) {
  return (
    <div className="bg-card border border-border rounded-xl overflow-hidden flex flex-col">
      <div className="px-5 py-4 border-b border-border flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-base font-bold text-foreground">{title}</span>
        </div>
        <span className={cn("text-sm font-bold tabular-nums", color)}>{badge}</span>
      </div>
      <div className="flex-1 overflow-y-auto no-scrollbar">
        {items.map((item, idx) => {
          const id = makeKey(prefix, idx);
          return (
            <TallyRow
              key={id} id={id} label={item.name} count={item.count}
              verdict={verdicts[id] ?? null} onVerdict={onVerdict}
            />
          );
        })}
      </div>
    </div>
  );
}

/* ── MAIN ── */
export default function StockTallyReport() {
  const [date,     setDate]     = useState(todayStr);
  const [verdicts, setVerdicts] = useState<VerdictMap>({});
  const [notes,    setNotes]    = useState("");
  const [submitted, setSubmitted] = useState(false);

  const total   = GOLD_ITEMS.length + DIAMOND_ITEMS.length;
  const verified = Object.values(verdicts).filter(Boolean).length;

  function onVerdict(id: string, v: Verdict) {
    setVerdicts(prev => ({ ...prev, [id]: v }));
    setSubmitted(false);
  }

  function resetAll() {
    setVerdicts({});
    setNotes("");
    setSubmitted(false);
  }

  return (
    <div className="w-full flex flex-col h-full">

      {/* HEADER */}
      <div className="px-8 pt-6 pb-5 border-b border-border shrink-0 flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <ClipboardList className="h-5 w-5 text-muted-foreground" />
            <h1 className="text-2xl font-semibold text-foreground tracking-tight">Stock Tally Report</h1>
          </div>
          <p className="text-sm text-muted-foreground">Verify daily stock counts by category</p>
        </div>
        <div className="flex items-center gap-2">
          <input
            type="date" value={date}
            onChange={e => setDate(e.target.value)}
            className="h-9 px-3 rounded-lg border border-border bg-background text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-foreground/20 transition-colors"
          />
          <button className="flex items-center gap-1.5 h-9 px-4 rounded-lg border border-border text-sm font-medium text-foreground hover:bg-sidebar-accent transition-colors">
            <History className="h-3.5 w-3.5" />
            View History
          </button>
        </div>
      </div>

      {/* BODY */}
      <div className="flex-1 overflow-hidden p-8 flex flex-col gap-5 min-h-0">

        {/* TWO-COLUMN TALLY */}
        <div className="flex-1 grid grid-cols-2 gap-5 min-h-0 overflow-hidden">
          <TallySection
            title="Gold Jewelry" badge={`${GOLD_ITEMS.reduce((s,i)=>s+i.count,0)} items`}
            items={GOLD_ITEMS} color="text-amber-600"
            prefix="gold" verdicts={verdicts} onVerdict={onVerdict}
          />
          <TallySection
            title="Diamond Jewelry" badge={`${DIAMOND_ITEMS.reduce((s,i)=>s+i.count,0)} items`}
            items={DIAMOND_ITEMS} color="text-blue-600"
            prefix="diamond" verdicts={verdicts} onVerdict={onVerdict}
          />
        </div>

        {/* FOOTER */}
        <div className="bg-card border border-border rounded-xl p-5 shrink-0 space-y-4">
          {/* Progress */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 flex-1">
              <p className="text-xs text-muted-foreground whitespace-nowrap">
                Tally Progress: <span className="font-semibold text-foreground">{verified} of {total}</span> categories verified
              </p>
              <div className="flex-1 h-1.5 bg-muted rounded-full overflow-hidden">
                <div
                  className="h-full bg-foreground rounded-full transition-all"
                  style={{ width: `${total > 0 ? (verified / total) * 100 : 0}%` }}
                />
              </div>
              <p className="text-xs font-semibold text-foreground whitespace-nowrap">
                {total > 0 ? Math.round((verified / total) * 100) : 0}%
              </p>
            </div>
            <button
              onClick={resetAll}
              className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors ml-4"
            >
              <RotateCcw className="h-3 w-3" /> Reset All
            </button>
          </div>

          {/* Notes */}
          <div>
            <label className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider mb-1.5 block">
              Notes (optional)
            </label>
            <textarea
              rows={2}
              value={notes}
              onChange={e => setNotes(e.target.value)}
              placeholder="Add notes about today's tally..."
              className="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm text-foreground placeholder:text-muted-foreground resize-none focus:outline-none focus:ring-1 focus:ring-foreground/20 transition-colors"
            />
          </div>

          {/* Submit */}
          <div className="flex justify-end">
            {submitted
              ? <div className="flex items-center gap-2 text-emerald-600 text-sm font-semibold">
                  <CheckCircle className="h-4 w-4" /> Daily report submitted!
                </div>
              : <button
                  onClick={() => setSubmitted(true)}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-foreground text-background text-sm font-semibold hover:bg-foreground/90 transition-colors"
                >
                  <Send className="h-4 w-4" />
                  Submit Daily Report
                </button>
            }
          </div>
        </div>

      </div>
    </div>
  );
}
