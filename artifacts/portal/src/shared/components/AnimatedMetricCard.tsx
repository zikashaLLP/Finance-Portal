import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface AnimatedMetricCardProps {
  label: string;
  value: string;
  sub?: string;
  index?: number;
  accent?: boolean;
  className?: string;
}

export default function AnimatedMetricCard({
  label,
  value,
  sub,
  index = 0,
  accent = false,
  className,
}: AnimatedMetricCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.07 }}
      className={cn(
        "bg-card border border-border rounded-xl px-5 py-4 hover:shadow-sm transition-shadow",
        className,
      )}
    >
      <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider mb-1">
        {label}
      </p>
      <p
        className={cn(
          "text-2xl font-bold tabular-nums leading-none mb-0.5",
          accent ? "text-emerald-600" : "text-foreground",
        )}
      >
        {value}
      </p>
      {sub && <p className="text-[11px] text-muted-foreground">{sub}</p>}
    </motion.div>
  );
}
