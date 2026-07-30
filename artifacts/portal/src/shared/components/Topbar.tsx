import { useLocation } from "wouter";
import NotificationBell from "./NotificationBell";

const ROUTE_META: { match: (p: string) => boolean; title: string; subtitle: string }[] = [
  { match: (p) => p.startsWith("/dashboard"),         title: "Dashboard",          subtitle: "Overview"                        },
  { match: (p) => p.startsWith("/gold"),              title: "Gold Management",    subtitle: "Gold inventory & purity"         },
  { match: (p) => p.startsWith("/silver"),            title: "Silver Management",  subtitle: "Silver stock & transactions"     },
  { match: (p) => p.startsWith("/diamond"),           title: "Diamond Management", subtitle: "Quality tracking & orders"       },
  { match: (p) => p.startsWith("/stock"),             title: "Stock Management",   subtitle: "Inventory & stock levels"        },
  { match: (p) => p.startsWith("/purchase"),          title: "Purchase",           subtitle: "Purchase orders & suppliers"     },
  { match: (p) => p.startsWith("/sales"),             title: "Sales",              subtitle: "Sales orders & clients"          },
  { match: (p) => p.startsWith("/karigar"),           title: "Karigar",            subtitle: "Karigar work & assignments"      },
  { match: (p) => p.startsWith("/reports"),           title: "Reports",            subtitle: "Business analytics & reports"    },
  { match: (p) => p.startsWith("/accounts"),          title: "Accounts",           subtitle: "Accounting & ledger"             },
  { match: (p) => p.startsWith("/transactions"),      title: "Transactions",       subtitle: "Payment records"                 },
  { match: (p) => p.startsWith("/profile"),           title: "My Profile",         subtitle: "Account details & settings"      },
  { match: (p) => p.startsWith("/settings/clients"),  title: "Client Management",  subtitle: "Manage client accounts"          },
  { match: (p) => p.startsWith("/settings/vendors"),  title: "Vendor Management",  subtitle: "Manage vendor accounts"          },
  { match: (p) => p.startsWith("/settings/branches"), title: "Branch Management",  subtitle: "Manage store branches"           },
  { match: (p) => p.startsWith("/settings/karigar"),  title: "Karigar Settings",   subtitle: "Karigar types & rates"           },
  { match: (p) => p.startsWith("/settings/general"),  title: "General Settings",   subtitle: "App preferences & configuration" },
  { match: (p) => p.startsWith("/settings/team"),     title: "Team Management",    subtitle: "Roles, users & permissions"      },
  { match: (p) => p.startsWith("/settings"),          title: "Settings",           subtitle: "App configuration"               },
  { match: (p) => p.startsWith("/finance"),           title: "Finance Planning",   subtitle: "Financial overview"              },
  { match: (p) => p.startsWith("/ledger"),            title: "Ledger",             subtitle: "Balance & entries"               },
  { match: (p) => p.startsWith("/approvals"),         title: "Approvals",          subtitle: "Pending approvals"               },
  { match: (p) => p.startsWith("/ground-staff"),      title: "Ground Staff",       subtitle: "Staff tracking"                  },
];

function getPageMeta(location: string) {
  const match = ROUTE_META.find((r) => r.match(location));
  return match ?? { title: "Portal", subtitle: "Jewellery Management System" };
}

export default function Topbar() {
  const [location] = useLocation();
  const { title, subtitle } = getPageMeta(location);

  return (
    <header
      className="h-16 bg-transparent border-b border-border flex items-center justify-between px-6 shrink-0"
      data-testid="topbar"
    >
      <div>
        <h1 className="text-xl font-semibold text-foreground tracking-tight leading-tight">{title}</h1>
        <p className="text-xs text-muted-foreground mt-0.5">{subtitle}</p>
      </div>

      <div className="flex items-center gap-3">
        <NotificationBell />
      </div>
    </header>
  );
}
