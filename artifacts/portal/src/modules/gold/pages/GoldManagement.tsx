import { Bell } from "lucide-react";

export default function GoldManagement() {
  return (
    <div className="w-full flex flex-col">
      <div className="px-8 pt-6 pb-6 border-b border-border flex items-start justify-between shrink-0">
        <div>
          <h1 className="text-2xl font-semibold text-foreground tracking-tight mb-0.5">
            Gold Management
          </h1>
          <p className="text-sm text-muted-foreground">
            Track gold stock, rates &amp; transactions
          </p>
        </div>
        <div className="flex items-center gap-2 mt-1 shrink-0">
          <button
            className="relative h-9 w-9 flex items-center justify-center rounded-full border border-border bg-background text-muted-foreground hover:text-foreground transition-colors shadow-sm"
          >
            <Bell className="h-4 w-4" />
            <span className="absolute top-2 right-2.5 flex h-2 w-2 rounded-full bg-red-500 ring-2 ring-background" />
          </button>
        </div>
      </div>

      <div className="flex-1 p-8">
        <div className="h-64 flex items-center justify-center rounded-2xl border border-dashed border-border text-muted-foreground text-sm">
          Page content coming soon
        </div>
      </div>
    </div>
  );
}
