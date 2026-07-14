import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface AnimatedMetricCardProps {
  label: string;
  value: string;
  sub?: string;
  index?: number;
  accent?: boolean;
  className?: string;
  icon?: React.ElementType;
  iconCls?: string;
  valueColor?: string;
  onClick?: () => void;
  selected?: boolean;
}

export default function AnimatedMetricCard({
  label,
  value,
  sub,
  index = 0,
  accent = false,
  className,
  icon: Icon,
  iconCls,
  valueColor,
  onClick,
  selected = false,
}: AnimatedMetricCardProps) {
  const Tag = onClick ? motion.button : motion.div;

  return (
    <Tag
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.07 }}
      onClick={onClick}
      className={cn(
        "bg-card border rounded-xl px-5 py-4 hover:shadow-sm transition-shadow flex items-center justify-between text-left",
        selected
          ? "border-foreground/30 ring-1 ring-foreground/10"
          : "border-border",
        onClick && "cursor-pointer",
        className,
      )}
    >
      <div>
        <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider mb-1">
          {label}
        </p>
        <p
          className={cn(
            "text-2xl font-bold tabular-nums leading-none mb-0.5",
            valueColor ?? (accent ? "text-emerald-600" : "text-foreground"),
          )}
        >
          {value}
        </p>
        {sub && <p className="text-[11px] text-muted-foreground">{sub}</p>}
      </div>
      {Icon && (
        <div className="h-10 w-10 rounded-xl bg-muted flex items-center justify-center shrink-0">
          <Icon className={cn("h-5 w-5", iconCls ?? "text-muted-foreground/60")} />
        </div>
      )}
    </Tag>
  );
}
