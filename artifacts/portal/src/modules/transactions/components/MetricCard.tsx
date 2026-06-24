import { motion } from "framer-motion";
import { ReactNode } from "react";

interface MetricCardProps {
  title: string;
  value: string;
  delta: string;
  icon: ReactNode;
  iconBgColor: string;
  iconColor: string;
  index: number;
}

export default function MetricCard({ title, value, delta, icon, iconBgColor, iconColor, index }: MetricCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1, ease: "easeOut" }}
      className="bg-card border border-border rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow"
      data-testid={`metric-card-${title.toLowerCase().replace(/\s+/g, "-")}`}
    >
      <div className="flex justify-between items-start mb-2">
        <div>
          <p className="text-sm font-medium text-muted-foreground mb-1">{title}</p>
          <h3 className="text-2xl font-bold text-foreground tracking-tight">{value}</h3>
        </div>
        <div className={`p-2 rounded-full flex items-center justify-center`} style={{ backgroundColor: iconBgColor, color: iconColor }}>
          {icon}
        </div>
      </div>
      <div className="mt-4 text-xs font-medium" style={{ color: iconColor }}>
        {delta}
      </div>
    </motion.div>
  );
}
