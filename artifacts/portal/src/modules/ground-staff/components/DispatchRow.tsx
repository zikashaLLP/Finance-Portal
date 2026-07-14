import { MapPin, User, ArrowRight, Pencil, Trash2 } from "lucide-react";
import { cn } from "../../../lib/utils";
import type { Dispatch } from "../data/mockGroundStaff";

interface DispatchRowProps {
  dispatch: Dispatch;
  onEdit: (d: Dispatch) => void;
  onDelete: (id: string) => void;
}

const statusConfig = {
  dispatched: { label: "Dispatched", cls: "bg-amber-100 text-amber-700 border-amber-200" },
  delivered:  { label: "Delivered",  cls: "bg-green-100 text-green-700 border-green-200" },
  returned:   { label: "Returned",   cls: "bg-rose-100 text-rose-700 border-rose-200"   },
};

function formatTimestamp(iso: string) {
  const d = new Date(iso);
  return d.toLocaleString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
}

export default function DispatchRow({ dispatch, onEdit, onDelete }: DispatchRowProps) {
  const { label, cls } = statusConfig[dispatch.status];

  return (
    <div className="bg-white rounded-xl border border-border px-5 py-4 flex items-start gap-4 hover:shadow-sm transition-shadow">
      {/* Left: main content */}
      <div className="flex-1 min-w-0">
        {/* Row 1: Staff name + badge */}
        <div className="flex items-center gap-2 mb-1">
          <span className="text-sm font-semibold text-foreground">{dispatch.staffName}</span>
          <span className={cn("text-[11px] font-medium px-2 py-0.5 rounded-full border", cls)}>
            {label}
          </span>
          <span className="text-[11px] text-muted-foreground ml-auto">{formatTimestamp(dispatch.createdAt)}</span>
        </div>

        {/* Row 2: Item description */}
        <p className="text-sm text-muted-foreground mb-2.5 leading-snug">{dispatch.itemDescription}</p>

        {/* Row 3: From → To */}
        <div className="flex items-center gap-1.5 text-[12px] text-foreground/70 mb-1.5">
          <MapPin className="h-3.5 w-3.5 text-indigo-400 shrink-0" />
          <span className="truncate max-w-[160px]">{dispatch.fromLocation}</span>
          <ArrowRight className="h-3 w-3 text-muted-foreground shrink-0" />
          <MapPin className="h-3.5 w-3.5 text-rose-400 shrink-0" />
          <span className="truncate max-w-[160px]">{dispatch.toLocation}</span>
        </div>

        {/* Row 4: Recipient */}
        <div className="flex items-center gap-1.5 text-[12px] text-foreground/60">
          <User className="h-3.5 w-3.5 shrink-0" />
          <span>{dispatch.recipientName}</span>
        </div>
      </div>

      {/* Right: action buttons */}
      <div className="flex items-center gap-1.5 shrink-0 mt-0.5">
        <button
          onClick={() => onEdit(dispatch)}
          className="h-8 w-8 rounded-lg flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-zinc-100 transition-colors"
          title="Edit"
        >
          <Pencil className="h-3.5 w-3.5" />
        </button>
        <button
          onClick={() => onDelete(dispatch.id)}
          className="h-8 w-8 rounded-lg flex items-center justify-center text-muted-foreground hover:text-rose-600 hover:bg-rose-50 transition-colors"
          title="Delete"
        >
          <Trash2 className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  );
}
