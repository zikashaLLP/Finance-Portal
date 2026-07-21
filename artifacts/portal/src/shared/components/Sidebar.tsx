import { useState, useRef, useLayoutEffect } from "react";
import { Link, useLocation } from "wouter";
import {
  Gem,
  Hammer,
  Package,
  ShoppingCart,
  ShoppingBag,
  Diamond,
  Medal,
  Hexagon,
  ChevronRight,
  LifeBuoy,
  Settings,
  PanelLeftClose,
  PanelLeftOpen,
  BarChart2,
  LayoutDashboard,
  Wallet,
} from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

type NavItem = { name: string; icon: React.ElementType; path: string };

const NAV_ITEMS: NavItem[] = [
  { name: "Dashboard",        icon: LayoutDashboard, path: "/dashboard"  },
  { name: "Gold Management",  icon: Gem,             path: "/gold"       },
  { name: "Silver Management",icon: Medal,           path: "/silver"     },
  { name: "Diamond Quality",  icon: Diamond,         path: "/diamond"    },
  { name: "Stock Management", icon: Package,         path: "/stock"      },
  { name: "Purchase",         icon: ShoppingBag,     path: "/purchase"   },
  { name: "Sales",            icon: ShoppingCart,    path: "/sales"      },
  { name: "Karigar",          icon: Hammer,          path: "/karigar"    },
  { name: "Reports",          icon: BarChart2,       path: "/reports"    },
  { name: "Accounts",         icon: Wallet,          path: "/accounts"   },
  { name: "Settings",         icon: Settings,        path: "/settings"   },
];

interface SidebarProps {
  isPinned: boolean;
  onPinnedChange: (pinned: boolean) => void;
}

export default function Sidebar({ isPinned, onPinnedChange }: SidebarProps) {
  const [location]  = useLocation();
  const [isHovered, setIsHovered] = useState(false);

  const isExpanded = isPinned || isHovered;

  const navScrollRef   = useRef<HTMLDivElement>(null);
  const savedScrollRef = useRef(0);

  useLayoutEffect(() => {
    if (navScrollRef.current) {
      navScrollRef.current.scrollTop = savedScrollRef.current;
    }
  }, [location]);

  const labelCls = cn(
    "text-sm whitespace-nowrap overflow-hidden transition-all duration-300",
    isExpanded ? "opacity-100 max-w-[160px] ml-3" : "opacity-0 max-w-0 ml-0",
  );

  return (
    <aside
      className={cn(
        "absolute inset-y-0 left-0 z-50 flex flex-col",
        "transition-all duration-300 ease-in-out overflow-hidden",
        isExpanded ? "w-[220px] bg-background" : "w-[56px] bg-background",
        isExpanded && !isPinned && "shadow-[4px_0_24px_rgba(0,0,0,0.07)]",
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Logo + toggle */}
      <div className="h-16 flex items-center px-3 justify-between shrink-0">
        <div className="flex items-center gap-2 text-foreground min-w-0">
          <div className="h-8 w-8 bg-foreground rounded-lg flex items-center justify-center shrink-0">
            <Hexagon className="h-5 w-5 text-background fill-background" />
          </div>
          <span className={cn(
            "font-semibold text-lg tracking-tight whitespace-nowrap overflow-hidden transition-all duration-300",
            isExpanded ? "opacity-100 max-w-[120px]" : "opacity-0 max-w-0",
          )}>
            Portal
          </span>
        </div>

        <button
          onClick={() => onPinnedChange(!isPinned)}
          className={cn(
            "shrink-0 h-6 w-6 flex items-center justify-center rounded-md",
            "text-muted-foreground hover:text-foreground hover:bg-sidebar-accent/50",
            "transition-all duration-200",
            isExpanded ? "opacity-100 ml-1" : "opacity-0 pointer-events-none",
          )}
          title={isPinned ? "Collapse sidebar" : "Pin sidebar open"}
        >
          {isPinned
            ? <PanelLeftClose className="h-3.5 w-3.5" />
            : <PanelLeftOpen  className="h-3.5 w-3.5" />
          }
        </button>
      </div>

      {/* Scrollable nav */}
      <div
        ref={navScrollRef}
        className="flex-1 overflow-y-auto no-scrollbar px-2 py-2"
        onScroll={(e) => {
          savedScrollRef.current = (e.target as HTMLDivElement).scrollTop;
        }}
      >
        <nav className="space-y-0.5">
          {NAV_ITEMS.map((item) => {
            const isActive = location.startsWith(item.path);
            const Icon = item.icon;
            return (
              <Link key={item.name} href={item.path} className="block w-full">
                <div
                  data-testid={`nav-${item.name.toLowerCase().replace(/\s+/g, "-")}`}
                  className={cn(
                    "flex items-center px-3 py-2 rounded-lg transition-colors",
                    isExpanded ? "justify-start" : "justify-center",
                    isActive
                      ? "bg-sidebar-accent text-sidebar-accent-foreground font-medium"
                      : "text-sidebar-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground",
                  )}
                >
                  <Icon className={cn("h-4 w-4 shrink-0", isActive && "stroke-[2.5px]")} />
                  <span className={labelCls}>{item.name}</span>
                  {isExpanded && isActive && (
                    <ChevronRight className="h-3 w-3 text-muted-foreground ml-auto shrink-0" />
                  )}
                </div>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Footer */}
      <div className="pb-1 shrink-0 border-t border-border pt-2">
        <div className={cn(
          "flex items-center px-3 py-2 rounded-lg text-sidebar-foreground",
          "hover:bg-sidebar-accent/50 transition-colors cursor-pointer mb-2",
          isExpanded ? "justify-start" : "justify-center",
        )}>
          <LifeBuoy className="h-4 w-4 shrink-0" />
          <span className={labelCls}>Help Center</span>
        </div>

        <div className={cn(
          "flex items-center px-3 py-2 rounded-lg hover:bg-sidebar-accent/50 transition-colors cursor-pointer",
          isExpanded ? "justify-start" : "justify-center",
        )}>
          <Avatar className="h-7 w-7 bg-blue-100 text-blue-700 shrink-0">
            <AvatarFallback className="bg-transparent text-[10px] font-semibold">AU</AvatarFallback>
          </Avatar>
          <div className={cn(
            "flex flex-col overflow-hidden transition-all duration-300",
            isExpanded ? "opacity-100 max-w-[120px] ml-3" : "opacity-0 max-w-0 ml-0",
          )}>
            <span className="text-sm font-medium text-foreground leading-none mb-1 whitespace-nowrap">Admin User</span>
            <span className="text-[11px] text-muted-foreground leading-none whitespace-nowrap">admin@portal.com</span>
          </div>
          {isExpanded && <ChevronRight className="h-4 w-4 text-muted-foreground ml-auto shrink-0" />}
        </div>
      </div>
    </aside>
  );
}
