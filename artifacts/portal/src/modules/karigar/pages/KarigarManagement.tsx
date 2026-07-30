import { useState, useMemo } from "react";
import { Diamond, CheckCircle2, Clock, Plus, Search, ChevronRight, SlidersHorizontal } from "lucide-react";

import BulkManagement from "./BulkManagement";
import DiamondReturnWorkflow from "../../diamond/pages/DiamondReturnWorkflow";
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
  mockPipelineJobs,
  mockCompletedJobs,
  type PipelineJob,
  type PipelineStatus,
} from "../data/mockPipeline";

type WorkflowStage = PipelineStatus | "Completed";

/* ══════════════════════════════════════════════
   ISSUE DIAMONDS MODAL
══════════════════════════════════════════════ */
function IssueDiamondsModal({ job, onClose, onConfirm }: {
  job: PipelineJob | null;
  onClose: () => void;
  onConfirm: (jobId: string, weight: number) => void;
}) {
  const [quality, setQuality] = useState("CVD");
  const [weight, setWeight]   = useState("0.000");
  const [comment, setComment] = useState("");

  const inputCls = "w-full h-10 px-3 rounded-lg border border-border bg-background text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-foreground/10 transition";

  function handleConfirm() {
    if (!job) return;
    onConfirm(job.id, parseFloat(weight) || 0);
    setQuality("CVD"); setWeight("0.000"); setComment("");
  }

  function handleClose() {
    setQuality("CVD"); setWeight("0.000"); setComment("");
    onClose();
  }

  if (!job) return null;

  return (
    <Dialog open={!!job} onOpenChange={(v) => { if (!v) handleClose(); }}>
      <DialogContent className="p-0 gap-0 !rounded-[15px] overflow-hidden border-0 shadow-2xl [&>button]:hidden sm:max-w-[420px]">
        <div className="px-6 pt-5 pb-4 bg-muted/40">
          <DialogHeader>
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="h-9 w-9 rounded-full bg-foreground flex items-center justify-center shrink-0">
                  <Diamond className="h-4 w-4 text-background" />
                </div>
                <div>
                  <DialogTitle className="text-[15px] font-semibold text-foreground">Issue Diamonds</DialogTitle>
                  <p className="text-[11px] text-muted-foreground mt-0.5">Order #{job.order_no} — {job.karigar_name}</p>
                </div>
              </div>
              <button onClick={handleClose} className="h-7 w-7 rounded-full flex items-center justify-center text-muted-foreground hover:bg-black/10 transition-colors text-lg leading-none shrink-0">×</button>
            </div>
          </DialogHeader>
        </div>
        <div className="px-6 pt-5 pb-2 space-y-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-1.5">Item</label>
            <p className="text-sm text-muted-foreground">{job.item_description}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-1.5">Diamond Quality</label>
            <Select value={quality} onValueChange={setQuality}>
              <SelectTrigger className="h-10 rounded-lg border-border text-sm"><SelectValue /></SelectTrigger>
              <SelectContent>{["CVD","1D","2D","3D","Natural"].map((q) => <SelectItem key={q} value={q}>{q}</SelectItem>)}</SelectContent>
            </Select>
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-1.5">Weight (carats) <span className="text-red-500">*</span></label>
            <input type="number" step="0.001" value={weight} onChange={(e) => setWeight(e.target.value)} className={inputCls} />
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-1.5">Note <span className="text-muted-foreground font-normal">(Optional)</span></label>
            <input type="text" placeholder="Optional note" value={comment} onChange={(e) => setComment(e.target.value)} className={inputCls} />
          </div>
        </div>
        <div className="px-6 py-4 border-t border-border flex items-center justify-end gap-2.5 bg-background mt-3">
          <button onClick={handleClose} className="h-9 px-5 rounded-[10px] text-sm font-medium border border-border hover:bg-muted/40 transition-colors">Cancel</button>
          <button onClick={handleConfirm} className="h-9 px-5 rounded-[10px] text-sm font-medium bg-foreground text-background hover:bg-foreground/90 transition-colors">
            Issue Diamonds
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

/* ══════════════════════════════════════════════
   COMPLETE JOB MODAL
══════════════════════════════════════════════ */
function CompleteJobModal({ job, onClose, onConfirm }: {
  job: PipelineJob | null;
  onClose: () => void;
  onConfirm: (jobId: string) => void;
}) {
  if (!job) return null;

  return (
    <Dialog open={!!job} onOpenChange={(v) => { if (!v) onClose(); }}>
      <DialogContent className="p-0 gap-0 !rounded-[15px] overflow-hidden border-0 shadow-2xl [&>button]:hidden sm:max-w-[400px]">
        <div className="px-6 pt-5 pb-4 bg-muted/40">
          <DialogHeader>
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="h-9 w-9 rounded-full bg-emerald-600 flex items-center justify-center shrink-0">
                  <CheckCircle2 className="h-4 w-4 text-white" />
                </div>
                <div>
                  <DialogTitle className="text-[15px] font-semibold text-foreground">Mark Job Complete</DialogTitle>
                  <p className="text-[11px] text-muted-foreground mt-0.5">Order #{job.order_no}</p>
                </div>
              </div>
              <button onClick={onClose} className="h-7 w-7 rounded-full flex items-center justify-center text-muted-foreground hover:bg-black/10 transition-colors text-lg leading-none shrink-0">×</button>
            </div>
          </DialogHeader>
        </div>
        <div className="px-6 pt-5 pb-5">
          <p className="text-sm text-foreground font-medium mb-1">{job.item_description}</p>
          <p className="text-xs text-muted-foreground mb-4">{job.karigar_name} · {job.weight.toFixed(3)}g · {job.purity}</p>
          <p className="text-sm text-muted-foreground">Confirm that the completed jewellery has been received from the karigar and the job can be marked as done.</p>
        </div>
        <div className="px-6 py-4 border-t border-border flex items-center justify-end gap-2.5 bg-background">
          <button onClick={onClose} className="h-9 px-5 rounded-[10px] text-sm font-medium border border-border hover:bg-muted/40 transition-colors">Cancel</button>
          <button onClick={() => onConfirm(job.id)} className="h-9 px-5 rounded-[10px] text-sm font-medium bg-emerald-600 text-white hover:bg-emerald-700 transition-colors">
            Confirm Receipt
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

/* ══════════════════════════════════════════════
   STAGE CONFIG
══════════════════════════════════════════════ */
const STAGE_META: Record<PipelineStatus, {
  label: string;
  dot: string;
  badgeCls: string;
  actionLabel: string;
  actionCls: string;
}> = {
  Pending: {
    label: "Pending",
    dot: "bg-amber-400",
    badgeCls: "bg-amber-50 text-amber-700 border-amber-200",
    actionLabel: "Issue Diamonds",
    actionCls: "border-blue-200 bg-blue-50 text-blue-700 hover:bg-blue-100",
  },
  Issue: {
    label: "Issue Diamonds",
    dot: "bg-blue-400",
    badgeCls: "bg-blue-50 text-blue-700 border-blue-200",
    actionLabel: "Start Processing",
    actionCls: "border-violet-200 bg-violet-50 text-violet-700 hover:bg-violet-100",
  },
  Processing: {
    label: "Processing",
    dot: "bg-violet-400",
    badgeCls: "bg-violet-50 text-violet-700 border-violet-200",
    actionLabel: "Ready to Receive",
    actionCls: "border-emerald-200 bg-emerald-50 text-emerald-700 hover:bg-emerald-100",
  },
  Receive: {
    label: "Receive Jewellery",
    dot: "bg-emerald-400",
    badgeCls: "bg-emerald-50 text-emerald-700 border-emerald-200",
    actionLabel: "Mark Complete",
    actionCls: "border-emerald-200 bg-emerald-600 text-white hover:bg-emerald-700",
  },
  Completed: {
    label: "Completed",
    dot: "bg-emerald-600",
    badgeCls: "bg-emerald-50 text-emerald-700 border-emerald-200",
    actionLabel: "",
    actionCls: "",
  },
};

const PIPELINE_STATUSES: WorkflowStage[] = ["Pending", "Issue", "Processing", "Receive", "Completed"];

const NEXT_STATUS: Record<PipelineStatus, PipelineStatus | "done"> = {
  Pending:    "Issue",
  Issue:      "Processing",
  Processing: "Receive",
  Receive:    "done",
};

const DAY_BADGE_CLS = (days: number) => {
  if (days <= 3) return "bg-emerald-50 text-emerald-700 border-emerald-200";
  if (days <= 7) return "bg-amber-50 text-amber-700 border-amber-200";
  return "bg-red-50 text-red-600 border-red-200";
};

/* ══════════════════════════════════════════════
   WORKFLOW TAB  (stage tabs + table)
══════════════════════════════════════════════ */
function WorkflowTab() {
  const [jobs, setJobs]                     = useState<PipelineJob[]>(mockPipelineJobs);
  const [stage, setStage]                   = useState<WorkflowStage>("Pending");
  const [issueTarget, setIssueTarget]       = useState<PipelineJob | null>(null);
  const [completeTarget, setCompleteTarget] = useState<PipelineJob | null>(null);
  const [completedJobs, setCompletedJobs]   = useState<PipelineJob[]>(mockCompletedJobs);

  /* filters */
  const [search,       setSearch]       = useState("");
  const [filterKarigar, setFilterKarigar] = useState("all");
  const [filterPurity,  setFilterPurity]  = useState("all");

  const allKarigars = useMemo(() => [...new Set([...jobs, ...completedJobs].map((j) => j.karigar_name))].sort(), [jobs, completedJobs]);
  const allPurities = useMemo(() => [...new Set([...jobs, ...completedJobs].map((j) => j.purity))].sort(), [jobs, completedJobs]);

  const stageJobs = useMemo(() => {
    const pool = stage === "Completed" ? completedJobs : jobs.filter((j) => j.status === stage);
    return pool.filter((j) => {
      const q = search.toLowerCase();
      if (q && !j.karigar_name.toLowerCase().includes(q) && !j.order_no.includes(q) && !j.item_description.toLowerCase().includes(q)) return false;
      if (filterKarigar !== "all" && j.karigar_name !== filterKarigar) return false;
      if (filterPurity  !== "all" && j.purity  !== filterPurity)  return false;
      return true;
    });
  }, [jobs, completedJobs, stage, search, filterKarigar, filterPurity]);

  const countByStage = (s: WorkflowStage) =>
    s === "Completed" ? completedJobs.length : jobs.filter((j) => j.status === s).length;

  /* handlers */
  function handleIssueDiamonds(jobId: string, weight: number) {
    setJobs((prev) => prev.map((j) =>
      j.id === jobId ? { ...j, status: "Processing" as PipelineStatus, diamond_issued: weight } : j
    ));
    setIssueTarget(null);
  }

  function handleComplete(jobId: string) {
    const job = jobs.find((j) => j.id === jobId);
    if (job) setCompletedJobs((prev) => [job, ...prev]);
    setJobs((prev) => prev.filter((j) => j.id !== jobId));
    setCompleteTarget(null);
  }

  function handleAction(job: PipelineJob) {
    const next = NEXT_STATUS[job.status];
    if (next === "done") { setCompleteTarget(job); return; }
    if (job.status === "Pending") {
      /* Pending → Issue: just move, no modal */
      setJobs((prev) => prev.map((j) => j.id === job.id ? { ...j, status: "Issue" } : j));
      return;
    }
    if (job.status === "Issue") { setIssueTarget(job); return; }
    if (job.status === "Processing") {
      setJobs((prev) => prev.map((j) => j.id === job.id ? { ...j, status: "Receive" } : j));
    }
  }

  const totalJobs    = jobs.length + completedJobs.length;
  const doneCount    = completedJobs.length;
  const overdueCount = jobs.filter((j) => j.days_old > 7).length;

  const SELECT_CLS = "h-9 pl-3 pr-8 rounded-lg border border-border bg-background text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-foreground/20 appearance-none";

  return (
    <div className="flex flex-col gap-5 h-full">

      {/* ── Summary strip ── */}
      <div className="grid grid-cols-4 gap-3 shrink-0">
        {[
          { label: "Active Jobs",      value: jobs.length,  cls: "text-foreground" },
          { label: "Completed Today",  value: doneCount,    cls: "text-emerald-600" },
          { label: "Overdue (>7d)",    value: overdueCount, cls: overdueCount > 0 ? "text-red-600" : "text-foreground" },
          { label: "Total This Month", value: totalJobs,    cls: "text-foreground" },
        ].map((m) => (
          <div key={m.label} className="bg-card border border-border rounded-xl px-4 py-3 shadow-sm">
            <p className="text-[11px] text-muted-foreground mb-1">{m.label}</p>
            <p className={cn("text-2xl font-bold tabular-nums", m.cls)}>{m.value}</p>
          </div>
        ))}
      </div>

      {/* ── Stage tabs ── */}
      <div className="bg-card border border-border rounded-xl overflow-hidden flex flex-col flex-1 min-h-0">

        {/* Tab bar */}
        <div className="flex items-center border-b border-border overflow-x-auto no-scrollbar shrink-0">
          {PIPELINE_STATUSES.map((s) => {
            const meta    = STAGE_META[s];
            const isActive = s === stage;
            const count   = countByStage(s);
            return (
              <button
                key={s}
                onClick={() => setStage(s)}
                className={cn(
                  "flex items-center gap-2 px-5 py-3.5 text-sm font-medium border-b-2 -mb-px transition-colors whitespace-nowrap shrink-0",
                  isActive
                    ? "border-foreground text-foreground"
                    : "border-transparent text-muted-foreground hover:text-foreground",
                )}
              >
                <span className={cn("h-2 w-2 rounded-full shrink-0", meta.dot)} />
                {meta.label}
                <span className={cn(
                  "inline-flex items-center justify-center min-w-[20px] h-5 px-1.5 rounded-full text-[10px] font-bold border",
                  isActive ? meta.badgeCls : "bg-muted/60 text-muted-foreground border-border",
                )}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Filters row */}
        <div className="flex items-center gap-3 px-5 py-3.5 border-b border-border shrink-0 bg-muted/20">
          <SlidersHorizontal className="h-4 w-4 text-muted-foreground shrink-0" />
          {/* Search */}
          <div className="relative flex-1 max-w-xs">
            <Search className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search order, karigar or item…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full h-9 pl-8 pr-3 rounded-lg border border-border bg-background text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-foreground/20"
            />
          </div>
          {/* Karigar filter */}
          <div className="relative">
            <select value={filterKarigar} onChange={(e) => setFilterKarigar(e.target.value)} className={SELECT_CLS}>
              <option value="all">All Karigars</option>
              {allKarigars.map((k) => <option key={k} value={k}>{k}</option>)}
            </select>
            <ChevronRight className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground rotate-90" />
          </div>
          {/* Purity filter */}
          <div className="relative">
            <select value={filterPurity} onChange={(e) => setFilterPurity(e.target.value)} className={SELECT_CLS}>
              <option value="all">All Purities</option>
              {allPurities.map((p) => <option key={p} value={p}>{p}</option>)}
            </select>
            <ChevronRight className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground rotate-90" />
          </div>
          {(search || filterKarigar !== "all" || filterPurity !== "all") && (
            <button
              onClick={() => { setSearch(""); setFilterKarigar("all"); setFilterPurity("all"); }}
              className="text-xs text-muted-foreground hover:text-foreground transition-colors underline underline-offset-2"
            >
              Clear
            </button>
          )}
          <span className="ml-auto text-[11px] text-muted-foreground tabular-nums">
            {stageJobs.length} job{stageJobs.length !== 1 ? "s" : ""}
          </span>
        </div>

        {/* Jobs table */}
        <div className="flex-1 overflow-y-auto no-scrollbar">
          {stageJobs.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-48 gap-2">
              <p className="text-sm text-muted-foreground">No jobs in this stage</p>
              {(search || filterKarigar !== "all" || filterPurity !== "all") && (
                <p className="text-xs text-muted-foreground">Try adjusting your filters</p>
              )}
            </div>
          ) : (
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-muted/30">
                  <th className="px-5 py-3.5 text-left text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">Order</th>
                  <th className="px-5 py-3.5 text-left text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">Karigar</th>
                  <th className="px-5 py-3.5 text-left text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">Item</th>
                  <th className="px-5 py-3.5 text-right text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">Weight</th>
                  <th className="px-5 py-3.5 text-center text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">Purity</th>
                  {stage !== "Pending" && (
                    <th className="px-5 py-3.5 text-right text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">Diamonds</th>
                  )}
                  <th className="px-5 py-3.5 text-center text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">Age</th>
                  {stage !== "Completed" && (
                    <th className="px-5 py-3.5 text-center text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">Action</th>
                  )}
                  {stage === "Completed" && (
                    <th className="px-5 py-3.5 text-center text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">Status</th>
                  )}
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {stageJobs.map((job) => {
                  const meta = STAGE_META[stage];
                  return (
                    <tr key={job.id} className="hover:bg-muted/20 transition-colors">
                      <td className="px-5 py-3.5">
                        <span className="font-mono text-xs font-semibold text-foreground">#{job.order_no}</span>
                      </td>
                      <td className="px-5 py-3.5">
                        <div className="flex items-center gap-2">
                          <div className="h-6 w-6 rounded-md bg-foreground flex items-center justify-center text-[10px] font-bold text-background shrink-0">
                            {job.karigar_name.charAt(0)}
                          </div>
                          <span className="text-xs font-medium text-foreground truncate max-w-[140px]">{job.karigar_name}</span>
                        </div>
                      </td>
                      <td className="px-5 py-3.5">
                        <span className="text-xs text-muted-foreground line-clamp-1 max-w-[200px]">{job.item_description}</span>
                      </td>
                      <td className="px-5 py-3.5 text-right">
                        <span className="text-xs font-semibold text-foreground tabular-nums">{job.weight.toFixed(3)}g</span>
                      </td>
                      <td className="px-5 py-3.5 text-center">
                        <span className="inline-flex items-center px-2 py-0.5 rounded bg-muted text-[10px] font-semibold text-foreground border border-border">
                          {job.purity}
                        </span>
                      </td>
                      {stage !== "Pending" && (
                        <td className="px-5 py-3.5 text-right">
                          {job.diamond_issued && job.diamond_issued > 0 ? (
                            <span className="inline-flex items-center gap-1 text-xs font-semibold text-blue-700 tabular-nums">
                              <Diamond className="h-3 w-3" />{job.diamond_issued.toFixed(3)}ct
                            </span>
                          ) : (
                            <span className="text-xs text-muted-foreground">—</span>
                          )}
                        </td>
                      )}
                      <td className="px-5 py-3.5 text-center">
                        <span className={cn(
                          "inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold border",
                          DAY_BADGE_CLS(job.days_old),
                        )}>
                          <Clock className="h-2.5 w-2.5" />{job.days_old}d
                        </span>
                      </td>
                      <td className="px-5 py-3.5 text-center">
                        {stage === "Completed" ? (
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-emerald-50 border border-emerald-200 text-[11px] font-semibold text-emerald-700">
                            <CheckCircle2 className="h-3 w-3" /> Done
                          </span>
                        ) : (
                          <button
                            onClick={() => handleAction(job)}
                            className={cn(
                              "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-[11px] font-semibold transition-colors whitespace-nowrap",
                              meta.actionCls,
                            )}
                          >
                            {stage === "Receive" ? (
                              <CheckCircle2 className="h-3 w-3" />
                            ) : (
                              <ChevronRight className="h-3 w-3" />
                            )}
                            {meta.actionLabel}
                          </button>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>

      <IssueDiamondsModal
        job={issueTarget}
        onClose={() => setIssueTarget(null)}
        onConfirm={handleIssueDiamonds}
      />
      <CompleteJobModal
        job={completeTarget}
        onClose={() => setCompleteTarget(null)}
        onConfirm={handleComplete}
      />
    </div>
  );
}

/* ══════════════════════════════════════════════
   MAIN PAGE
══════════════════════════════════════════════ */
type MainTab = "workflow" | "diamond-returns" | "bulk";

const TABS: { key: MainTab; label: string }[] = [
  { key: "workflow",        label: "Workflow"        },
  { key: "diamond-returns", label: "Diamond Returns" },
  { key: "bulk",            label: "Bulk Management" },
];

export default function KarigarManagement() {
  const [tab, setTab] = useState<MainTab>("workflow");

  return (
    <div className="w-full flex flex-col h-full">
      {/* Page header */}
      <div className="px-8 pt-6 pb-0 border-b border-border shrink-0">
        {tab === "workflow" && (
          <div className="flex items-center justify-end mb-3">
            <button className="flex items-center gap-2 h-10 px-5 rounded-xl bg-foreground text-background text-sm font-semibold hover:bg-foreground/90 transition-colors shadow-sm">
              <Plus className="h-4 w-4" /> New Job
            </button>
          </div>
        )}

        <div className="flex items-center gap-0 overflow-x-auto no-scrollbar">
          {TABS.map((t) => (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              className={cn(
                "px-5 py-3 text-sm font-medium border-b-2 -mb-px transition-colors whitespace-nowrap",
                tab === t.key
                  ? "border-foreground text-foreground"
                  : "border-transparent text-muted-foreground hover:text-foreground",
              )}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {/* Tab content */}
      {tab === "workflow" && (
        <div className="flex-1 overflow-y-auto no-scrollbar p-8 min-h-0">
          <WorkflowTab />
        </div>
      )}

      {tab === "diamond-returns" && (
        <div className="flex-1 min-h-0">
          <DiamondReturnWorkflow />
        </div>
      )}

      {tab === "bulk" && (
        <div className="flex-1 min-h-0">
          <BulkManagement />
        </div>
      )}
    </div>
  );
}
