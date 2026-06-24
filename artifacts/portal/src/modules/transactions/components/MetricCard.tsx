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
      className="bg-card border border-border rounded-[18px] p-6 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden"
      data-testid={`metric-card-${title.toLowerCase().replace(/\s+/g, "-")}`}
    >
      <div className="flex justify-between items-start mb-4 relative z-10">
        <div className={`p-2.5 rounded-full flex items-center justify-center`} style={{ backgroundColor: iconBgColor, color: iconColor }}>
          {icon}
        </div>
      </div>
      <div className="relative z-10">
        <p className="text-[13px] font-medium text-muted-foreground mb-1">{title}</p>
        <h3 className="text-[28px] font-semibold text-foreground tracking-tight mb-2">{value}</h3>
        <div className="flex items-center text-xs font-medium" style={{ color: iconColor }}>
          <span className="bg-background/80 px-2 py-0.5 rounded-full">{delta}</span>
        </div>
      </div>
    </motion.div>
  );
}
