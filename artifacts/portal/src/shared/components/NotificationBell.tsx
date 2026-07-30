import { Bell } from "lucide-react";

interface NotificationBellProps {
  count?: number; // 0 = no badge, default shows red dot
}

export default function NotificationBell({ count = 1 }: NotificationBellProps) {
  return (
    <button
      className="relative h-9 w-9 flex items-center justify-center rounded-full border border-border bg-background text-muted-foreground hover:text-foreground transition-colors shadow-sm shrink-0"
      data-testid="btn-notifications"
      title="Notifications"
    >
      <Bell className="h-4 w-4" />
      {count > 0 && (
        <span className="absolute top-2 right-2.5 flex h-2 w-2 rounded-full bg-red-500 ring-2 ring-background" />
      )}
    </button>
  );
}
