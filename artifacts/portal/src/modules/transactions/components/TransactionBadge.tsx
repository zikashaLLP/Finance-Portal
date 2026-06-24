import { Badge } from "@/components/ui/badge";

interface TransactionBadgeProps {
  type: "income" | "expense";
}

export default function TransactionBadge({ type }: TransactionBadgeProps) {
  return (
    <Badge 
      variant="outline" 
      className={`font-medium px-2.5 py-0.5 capitalize border-transparent rounded-full ${
        type === "income" 
          ? "bg-emerald-50 text-emerald-600 hover:bg-emerald-50" 
          : "bg-rose-50 text-rose-600 hover:bg-rose-50"
      }`}
      data-testid={`badge-${type}`}
    >
      {type}
    </Badge>
  );
}
