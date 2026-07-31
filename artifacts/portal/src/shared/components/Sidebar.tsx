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
  ChevronDown,
  LogOut,
  Settings,
  BarChart2,
  LayoutDashboard,
  Wallet,
  Building2,
  Users,
  Truck,
  Tag,
  UserCog,
} from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

type NavItem = { name: string; icon: React.ElementType; path: string };

type SettingsSubItem = { name: string; icon: React.ElementType; path: string };

const SETTINGS_SUB_ITEMS: SettingsSubItem[] = [
  { name: "Branch Management",   icon: Building2, path: "/settings/branches" },
  { name: "Team Management",    icon: UserCog,   path: "/settings/team"     },
  { name: "Karigar Management", icon: Hammer,    path: "/settings/karigar"  },
  { name: "Jwellery Settings",  icon: Tag,       path: "/settings/general"  },
];

const NAV_ITEMS: NavItem[] = [
  { name: "Dashboard",           icon: LayoutDashboard, path: "/dashboard" },
  { name: "Gold Management",     icon: Gem,             path: "/gold"      },
  { name: "Silver Management",   icon: Medal,           path: "/silver"    },
  { name: "Diamond Management",  icon: Diamond,         path: "/diamond"   },
  { name: "Stock Management",    icon: Package,         path: "/stock"     },
  { name: "Purchase",            icon: ShoppingBag,     path: "/purchase"  },
  { name: "Sales",               icon: ShoppingCart,    path: "/sales"     },
  { name: "Karigar",             icon: Hammer,          path: "/karigar"   },
  { name: "Reports",             icon: BarChart2,       path: "/reports"   },
  { name: "Accounts",            icon: Wallet,          path: "/accounts"  },
  { name: "Client Management",   icon: Users,           path: "/settings/clients"  },
  { name: "Vendor Management",   icon: Truck,           path: "/settings/vendors"  },
];

interface SidebarProps {
  isPinned: boolean;
  forceCollapsed: boolean;
  onPinnedChange: (pinned: boolean) => void;
}

export default function Sidebar({ isPinned, forceCollapsed, onPinnedChange }: SidebarProps) {
  const [location]  = useLocation();
  const [isHovered, setIsHovered] = useState(false);

  const isInSettings = location.startsWith("/settings");
  const [settingsOpen, setSettingsOpen] = useState(isInSettings);

  const isExpanded = !forceCollapsed && (isPinned || isHovered);

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
      {/* Logo */}
      <div className="h-16 flex items-center px-3 shrink-0">
        <div className="h-8 w-8 bg-foreground rounded-lg flex items-center justify-center shrink-0">
          <Hexagon className="h-5 w-5 text-background fill-background" />
        </div>
        <div className={cn(
          "flex items-center min-w-0 overflow-hidden transition-all duration-300",
          isExpanded ? "opacity-100 max-w-[160px] ml-2" : "opacity-0 max-w-0 ml-0",
        )}>
          <span className="font-semibold text-[15px] tracking-tight whitespace-nowrap text-foreground">
            Accounting Portal
          </span>
        </div>
      </div>

      {/* Scrollable nav */}
      <div
        ref={navScrollRef}
        className="flex-1 overflow-y-auto sidebar-scrollbar px-2 py-2"
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

          {/* Settings expandable group */}
          <div>
            {/* Settings group header */}
            <button
              onClick={() => setSettingsOpen((v) => !v)}
              data-testid="nav-settings"
              className={cn(
                "w-full flex items-center px-3 py-2 rounded-lg transition-colors",
                isExpanded ? "justify-start" : "justify-center",
                isInSettings
                  ? "bg-sidebar-accent text-sidebar-accent-foreground font-medium"
                  : "text-sidebar-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground",
              )}
            >
              <Settings className={cn("h-4 w-4 shrink-0", isInSettings && "stroke-[2.5px]")} />
              <span className={labelCls}>Settings</span>
              {isExpanded && (
                <span className="ml-auto shrink-0">
                  {settingsOpen
                    ? <ChevronDown className="h-3 w-3 text-muted-foreground" />
                    : <ChevronRight className="h-3 w-3 text-muted-foreground" />
                  }
                </span>
              )}
            </button>

            {/* Sub-items */}
            {settingsOpen && isExpanded && (
              <div className="mt-0.5 space-y-0.5 pl-3">
                {SETTINGS_SUB_ITEMS.map((sub) => {
                  const isSubActive = location === sub.path || location.startsWith(sub.path + "/");
                  const SubIcon = sub.icon;
                  return (
                    <Link key={sub.path} href={sub.path} className="block w-full">
                      <div
                        data-testid={`nav-${sub.name.toLowerCase().replace(/\s+/g, "-")}`}
                        className={cn(
                          "flex items-center gap-2 px-3 py-1.5 rounded-lg transition-colors text-[13px]",
                          isSubActive
                            ? "bg-sidebar-accent text-sidebar-accent-foreground font-medium"
                            : "text-muted-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground",
                        )}
                      >
                        <SubIcon className={cn("h-3.5 w-3.5 shrink-0", isSubActive && "stroke-[2.5px]")} />
                        <span className="whitespace-nowrap overflow-hidden">{sub.name}</span>
                      </div>
                    </Link>
                  );
                })}
              </div>
            )}
          </div>
        </nav>
      </div>

      {/* Footer */}
      <div className="pb-2 shrink-0 border-t border-border pt-2 px-2 space-y-0.5">
        {/* User row — navigates to /profile */}
        <Link href="/profile" className="block w-full">
          <div className={cn(
            "flex items-center px-3 py-2 rounded-lg transition-colors cursor-pointer",
            location.startsWith("/profile")
              ? "bg-sidebar-accent text-sidebar-accent-foreground"
              : "hover:bg-sidebar-accent/50",
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
        </Link>

        {/* Logout row */}
        <button
          className={cn(
            "w-full flex items-center px-3 py-2 rounded-lg transition-colors",
            "text-red-500 hover:bg-red-50 hover:text-red-600",
            isExpanded ? "justify-start" : "justify-center",
          )}
        >
          <LogOut className="h-4 w-4 shrink-0" />
          <span className={cn(
            "text-sm whitespace-nowrap overflow-hidden transition-all duration-300",
            isExpanded ? "opacity-100 max-w-[160px] ml-3" : "opacity-0 max-w-0 ml-0",
          )}>
            Logout
          </span>
          {isExpanded && <ChevronRight className="h-4 w-4 ml-auto shrink-0 opacity-60" />}
        </button>
      </div>
    </aside>
  );
}
