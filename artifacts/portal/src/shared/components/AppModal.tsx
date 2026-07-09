import * as React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../../components/ui/dialog";
import { Button } from "../../components/ui/button";
import { X } from "lucide-react";
import { cn } from "../../lib/utils";

interface AppModalProps {
  open: boolean;
  onClose: () => void;
  /** Max-width override, e.g. "sm:max-w-[520px]". Default: "sm:max-w-[460px]" */
  maxWidth?: string;
  /** Tailwind bg class for the coloured header band, e.g. "bg-emerald-50" */
  headerBg?: string;
  /** Pre-styled icon node (the caller controls bg/colour of the circle) */
  icon: React.ReactNode;
  title: string;
  /** Optional subtitle row — plain string or any ReactNode (badges, mono IDs, etc.) */
  subtitle?: React.ReactNode;
  /** Body content — caller controls padding */
  children: React.ReactNode;
  cancelLabel?: string;
  primaryLabel: string;
  onPrimary: () => void;
}

export function AppModal({
  open,
  onClose,
  maxWidth = "sm:max-w-[460px]",
  headerBg = "bg-muted/40",
  icon,
  title,
  subtitle,
  children,
  cancelLabel = "Cancel",
  primaryLabel,
  onPrimary,
}: AppModalProps) {
  return (
    <Dialog open={open} onOpenChange={(v) => { if (!v) onClose(); }}>
      <DialogContent
        className={cn(
          "p-0 gap-0 !rounded-[15px] overflow-hidden border-0 shadow-2xl [&>button]:hidden",
          maxWidth,
        )}
      >
        {/* Header band */}
        <div className={cn("px-6 pt-5 pb-4", headerBg)}>
          <DialogHeader>
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-3">
                {icon}
                <div>
                  <DialogTitle className="text-[15px] font-semibold leading-tight text-foreground">
                    {title}
                  </DialogTitle>
                  {subtitle && (
                    <div className="mt-1">
                      {typeof subtitle === "string" ? (
                        <p className="text-[11px] text-muted-foreground">{subtitle}</p>
                      ) : (
                        subtitle
                      )}
                    </div>
                  )}
                </div>
              </div>
              <button
                onClick={onClose}
                className="h-7 w-7 rounded-full flex items-center justify-center text-muted-foreground hover:bg-black/10 transition-colors mt-0.5 shrink-0"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </DialogHeader>
        </div>

        {/* Body */}
        {children}

        {/* Footer */}
        <div className="px-6 py-4 border-t border-border flex items-center justify-end gap-2.5 bg-background">
          <Button
            variant="outline"
            onClick={onClose}
            className="h-9 px-5 rounded-[10px] text-sm font-medium border-border"
          >
            {cancelLabel}
          </Button>
          <Button
            onClick={onPrimary}
            className="h-9 px-5 rounded-[10px] text-sm font-medium bg-foreground text-background hover:bg-foreground/90"
          >
            {primaryLabel}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
