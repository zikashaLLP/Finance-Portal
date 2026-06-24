import { ReactNode } from "react";
import Sidebar from "../../shared/components/Sidebar";
import Topbar from "../../shared/components/Topbar";

interface MainLayoutProps {
  children: ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="flex h-screen w-full overflow-hidden bg-background p-4 gap-4">
      <div className="flex-shrink-0">
        <Sidebar />
      </div>
      <div className="flex-1 flex flex-col min-w-0 bg-card rounded-[20px] shadow-[0_2px_10px_rgba(0,0,0,0.02)] border border-border overflow-hidden">
        <Topbar />
        <main className="flex-1 overflow-y-auto no-scrollbar relative">
          {children}
        </main>
      </div>
    </div>
  );
}
