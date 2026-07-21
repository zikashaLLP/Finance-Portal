import { useState } from "react";
import { Diamond, ArrowRight, CheckCircle2, Clock, Plus } from "lucide-react";

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
  type PipelineJob,
  type PipelineStatus,
} from "../data/mockPipeline";

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
   JOB CARD
══════════════════════════════════════════════ */
const DAY_BADGE_CLS = (days: number) => {
  if (days <= 3)  return "bg-emerald-50 text-emerald-700 border-emerald-200";
  if (days <= 7)  return "bg-amber-50 text-amber-700 border-amber-200";
  return "bg-red-50 text-red-600 border-red-200";
};

function JobCard({ job, onIssueDiamonds, onComplete }: {
  job: PipelineJob;
  onIssueDiamonds?: (job: PipelineJob) => void;
  onComplete?: (job: PipelineJob) => void;
}) {
  return (
    <div className="bg-card border border-border rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between gap-2 mb-3">
        <span className="font-mono text-[11px] font-semibold text-muted-foreground">#{job.order_no}</span>
        <span className={cn(
          "inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold border shrink-0",
          DAY_BADGE_CLS(job.days_old)
        )}>
          <Clock className="h-2.5 w-2.5" />
          {job.days_old}d
        </span>
      </div>

      <div className="mb-2">
        <div className="flex items-center gap-2 mb-1">
          <div className="h-6 w-6 rounded-md bg-foreground flex items-center justify-center text-[10px] font-bold text-background shrink-0">
            {job.karigar_name.charAt(0)}
          </div>
          <span className="text-xs font-semibold text-foreground leading-tight truncate">{job.karigar_name}</span>
        </div>
        <p className="text-xs text-muted-foreground leading-snug line-clamp-2">{job.item_description}</p>
      </div>

      <div className="flex items-center gap-2 mb-3">
        <span className="inline-flex items-center px-2 py-0.5 rounded bg-muted text-[10px] font-semibold text-foreground border border-border">
          {job.weight.toFixed(3)}g
        </span>
        <span className="inline-flex items-center px-2 py-0.5 rounded bg-muted text-[10px] font-medium text-muted-foreground border border-border">
          {job.purity}
        </span>
        {job.diamond_issued !== undefined && job.diamond_issued > 0 && (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-blue-50 text-[10px] font-semibold text-blue-700 border border-blue-200">
            <Diamond className="h-2.5 w-2.5" />
            {job.diamond_issued.toFixed(3)}ct
          </span>
        )}
      </div>

      {onIssueDiamonds && (
        <button
          onClick={() => onIssueDiamonds(job)}
          className="w-full flex items-center justify-center gap-1.5 h-8 rounded-lg border border-blue-200 bg-blue-50 text-blue-700 text-xs font-semibold hover:bg-blue-100 transition-colors"
        >
          <Diamond className="h-3 w-3" /> Issue Diamonds
        </button>
      )}

      {onComplete && (
        <button
          onClick={() => onComplete(job)}
          className="w-full flex items-center justify-center gap-1.5 h-8 rounded-lg border border-emerald-200 bg-emerald-50 text-emerald-700 text-xs font-semibold hover:bg-emerald-100 transition-colors"
        >
          <CheckCircle2 className="h-3 w-3" /> Mark Complete
        </button>
      )}
    </div>
  );
}

/* ══════════════════════════════════════════════
   KANBAN COLUMN
══════════════════════════════════════════════ */
const COLUMN_META: Record<PipelineStatus, { label: string; dot: string; headerCls: string; count_cls: string }> = {
  Pending: {
    label: "Pending",
    dot: "bg-amber-400",
    headerCls: "border-amber-200 bg-amber-50",
    count_cls: "bg-amber-100 text-amber-700",
  },
  Issue: {
    label: "Issue Diamonds",
    dot: "bg-blue-400",
    headerCls: "border-blue-200 bg-blue-50",
    count_cls: "bg-blue-100 text-blue-700",
  },
  Processing: {
    label: "Processing",
    dot: "bg-violet-400",
    headerCls: "border-violet-200 bg-violet-50",
    count_cls: "bg-violet-100 text-violet-700",
  },
  Receive: {
    label: "Receive Jewellery",
    dot: "bg-emerald-400",
    headerCls: "border-emerald-200 bg-emerald-50",
    count_cls: "bg-emerald-100 text-emerald-700",
  },
};

function KanbanColumn({ status, jobs, onIssueDiamonds, onComplete }: {
  status: PipelineStatus;
  jobs: PipelineJob[];
  onIssueDiamonds?: (job: PipelineJob) => void;
  onComplete?: (job: PipelineJob) => void;
}) {
  const meta = COLUMN_META[status];
  return (
    <div className="flex flex-col min-w-[260px] flex-1">
      <div className={cn("flex items-center justify-between px-3.5 py-2.5 rounded-xl border mb-3", meta.headerCls)}>
        <div className="flex items-center gap-2">
          <span className={cn("h-2 w-2 rounded-full shrink-0", meta.dot)} />
          <span className="text-xs font-semibold text-foreground">{meta.label}</span>
        </div>
        <span className={cn("text-[11px] font-bold px-2 py-0.5 rounded-full", meta.count_cls)}>
          {jobs.length}
        </span>
      </div>

      <div className="flex flex-col gap-3 flex-1">
        {jobs.length === 0 ? (
          <div className="flex-1 flex items-center justify-center border-2 border-dashed border-border rounded-xl py-10">
            <p className="text-xs text-muted-foreground">No jobs</p>
          </div>
        ) : jobs.map((job) => (
          <JobCard
            key={job.id}
            job={job}
            onIssueDiamonds={status === "Issue" ? onIssueDiamonds : undefined}
            onComplete={status === "Receive" ? onComplete : undefined}
          />
        ))}
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════
   WORKFLOW TAB  (kanban)
══════════════════════════════════════════════ */
const PIPELINE_STATUSES: PipelineStatus[] = ["Pending", "Issue", "Processing", "Receive"];

function WorkflowTab() {
  const [jobs, setJobs]                 = useState<PipelineJob[]>(mockPipelineJobs);
  const [issueTarget, setIssueTarget]   = useState<PipelineJob | null>(null);
  const [completeTarget, setCompleteTarget] = useState<PipelineJob | null>(null);
  const [completedIds, setCompletedIds] = useState<Set<string>>(new Set());

  function handleIssueDiamonds(jobId: string, weight: number) {
    setJobs((prev) =>
      prev.map((j) =>
        j.id === jobId
          ? { ...j, status: "Processing" as PipelineStatus, diamond_issued: weight }
          : j
      )
    );
    setIssueTarget(null);
  }

  function handleComplete(jobId: string) {
    setCompletedIds((prev) => new Set(prev).add(jobId));
    setJobs((prev) => prev.filter((j) => j.id !== jobId));
    setCompleteTarget(null);
  }

  const byStatus = (s: PipelineStatus) => jobs.filter((j) => j.status === s);

  const totalJobs  = jobs.length + completedIds.size;
  const doneCount  = completedIds.size;
  const overdueCount = jobs.filter((j) => j.days_old > 7).length;

  return (
    <div className="flex flex-col gap-6 h-full">
      {/* Summary strip */}
      <div className="grid grid-cols-4 gap-3 shrink-0">
        {[
          { label: "Active Jobs",      value: jobs.length,    cls: "text-foreground" },
          { label: "Completed Today",  value: doneCount,      cls: "text-emerald-600" },
          { label: "Overdue (>7d)",    value: overdueCount,   cls: overdueCount > 0 ? "text-red-600" : "text-foreground" },
          { label: "Total This Month", value: totalJobs,      cls: "text-foreground" },
        ].map((m) => (
          <div key={m.label} className="bg-card border border-border rounded-xl px-4 py-3 shadow-sm">
            <p className="text-[11px] text-muted-foreground mb-1">{m.label}</p>
            <p className={cn("text-2xl font-bold tabular-nums", m.cls)}>{m.value}</p>
          </div>
        ))}
      </div>

      {/* Kanban board */}
      <div className="flex gap-4 overflow-x-auto no-scrollbar flex-1 min-h-0 pb-2">
        {PIPELINE_STATUSES.map((status, idx) => (
          <div key={status} className="flex items-start gap-4 flex-1 min-w-[260px]">
            <KanbanColumn
              status={status}
              jobs={byStatus(status)}
              onIssueDiamonds={(j) => setIssueTarget(j)}
              onComplete={(j) => setCompleteTarget(j)}
            />
            {idx < PIPELINE_STATUSES.length - 1 && (
              <div className="flex items-start pt-[54px] shrink-0">
                <ArrowRight className="h-4 w-4 text-muted-foreground/40" />
              </div>
            )}
          </div>
        ))}
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
        <div className="flex items-start justify-between mb-5">
          <div>
            <h1 className="text-2xl font-semibold text-foreground tracking-tight mb-0.5">Karigar</h1>
            <p className="text-sm text-muted-foreground">Job pipeline, diamond returns and bulk management</p>
          </div>
          {tab === "workflow" && (
            <button className="flex items-center gap-2 h-10 px-5 rounded-xl bg-foreground text-background text-sm font-semibold hover:bg-foreground/90 transition-colors shadow-sm shrink-0">
              <Plus className="h-4 w-4" /> New Job
            </button>
          )}
        </div>

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
