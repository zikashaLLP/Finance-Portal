import { Badge } from "@/components/ui/badge";

interface TransactionBadgeProps {
  type: "income" | "expense";
}

export default function TransactionBadge({ type }: TransactionBadgeProps) {
  return (
    <Badge 
      variant="outline" 
      className={`font-medium px-2 py-0.5 capitalize border-transparent ${
        type === "income" 
          ? "bg-emerald-100/80 text-emerald-700 hover:bg-emerald-100/80" 
          : "bg-red-100/80 text-red-700 hover:bg-red-100/80"
      }`}
      data-testid={`badge-${type}`}
    >
      {type}
    </Badge>
  );
}
