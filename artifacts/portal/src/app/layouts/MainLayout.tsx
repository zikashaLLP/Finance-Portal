import { useState } from "react";
import { ReactNode } from "react";
import Sidebar from "../../shared/components/Sidebar";
import Topbar from "../../shared/components/Topbar";
import { cn } from "@/lib/utils";

interface MainLayoutProps {
  children: ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
  const [isSidebarPinned,  setIsSidebarPinned]  = useState(true);
  const [forceCollapsed,   setForceCollapsed]    = useState(false);

  // "pinned" = user chose to keep it open; "forceCollapsed" = user explicitly locked it closed
  const isExpanded = !forceCollapsed && isSidebarPinned;

  function handleSidebarToggle() {
    if (isExpanded) {
      setForceCollapsed(true);
      setIsSidebarPinned(false);
    } else {
      setForceCollapsed(false);
      setIsSidebarPinned(true);
    }
  }

  return (
    <div className="flex h-screen w-full overflow-hidden bg-background p-4 gap-4">
      {/* Wrapper reserves layout space; sidebar itself is absolute inside it */}
      <div
        className={cn(
          "relative flex-shrink-0 transition-all duration-300 ease-in-out",
          isExpanded ? "w-[220px]" : "w-[56px]",
        )}
      >
        <Sidebar
          isPinned={isSidebarPinned}
          forceCollapsed={forceCollapsed}
          onPinnedChange={setIsSidebarPinned}
        />
      </div>

      <div className="flex-1 flex flex-col min-w-0 bg-card rounded-[20px] shadow-[0_2px_10px_rgba(0,0,0,0.02)] border border-border overflow-hidden">
        <Topbar isExpanded={isExpanded} onToggle={handleSidebarToggle} />
        <main className="flex-1 overflow-y-auto no-scrollbar relative">
          {children}
        </main>
      </div>
    </div>
  );
}
