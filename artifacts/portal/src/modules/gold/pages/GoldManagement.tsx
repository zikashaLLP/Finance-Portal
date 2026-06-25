import { useState } from "react";
import { Bell } from "lucide-react";

type Tab = "pure" | "old";

export default function GoldManagement() {
  const [tab, setTab] = useState<Tab>("pure");

  return (
    <div className="w-full flex flex-col h-full">
      {/* Header */}
      <div className="px-8 pt-6 pb-5 border-b border-border flex items-center justify-between shrink-0">
        {/* Title */}
        <div>
          <h1 className="text-2xl font-semibold text-foreground tracking-tight mb-0.5">
            Gold Management
          </h1>
          <p className="text-sm text-muted-foreground">
            Track gold stock, rates &amp; transactions
          </p>
        </div>

        {/* Tabs — centred between title and bell */}
        <div className="flex items-center gap-1">
          <button
            onClick={() => setTab("pure")}
            className={`px-5 py-2 text-sm font-medium rounded-lg transition-colors ${
              tab === "pure"
                ? "bg-foreground text-background"
                : "text-muted-foreground hover:text-foreground hover:bg-muted"
            }`}
          >
            Pure Gold
          </button>
          <button
            onClick={() => setTab("old")}
            className={`px-5 py-2 text-sm font-medium rounded-lg transition-colors ${
              tab === "old"
                ? "bg-foreground text-background"
                : "text-muted-foreground hover:text-foreground hover:bg-muted"
            }`}
          >
            Old Gold
          </button>
        </div>

        {/* Bell */}
        <div className="flex items-center gap-2 shrink-0">
          <button className="relative h-9 w-9 flex items-center justify-center rounded-full border border-border bg-background text-muted-foreground hover:text-foreground transition-colors shadow-sm">
            <Bell className="h-4 w-4" />
            <span className="absolute top-2 right-2.5 flex h-2 w-2 rounded-full bg-red-500 ring-2 ring-background" />
          </button>
        </div>
      </div>

      {/* Tab content */}
      <div className="flex-1 p-8">
        {tab === "pure" && (
          <div className="h-64 flex items-center justify-center rounded-2xl border border-dashed border-border text-muted-foreground text-sm">
            Pure Gold content coming soon
          </div>
        )}
        {tab === "old" && (
          <div className="h-64 flex items-center justify-center rounded-2xl border border-dashed border-border text-muted-foreground text-sm">
            Old Gold content coming soon
          </div>
        )}
      </div>
    </div>
  );
}
