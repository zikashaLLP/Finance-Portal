import { useState } from "react";
import { ChevronDown, ChevronUp, Landmark, Wallet } from "lucide-react";
import { cn } from "@/lib/utils";
import { type Account } from "../data/mockAccounts";

const fmt = (n: number) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(n);

interface AccountCardProps {
  account: Account;
  defaultExpanded?: boolean;
}

export default function AccountCard({ account, defaultExpanded = false }: AccountCardProps) {
  const [expanded, setExpanded] = useState(defaultExpanded);

  const Icon = account.type === "cash" ? Wallet : Landmark;

  const iconBg =
    account.id === "hdfc"
      ? "bg-blue-50"
      : account.id === "sbi"
      ? "bg-indigo-50"
      : "bg-amber-50";

  const iconColor =
    account.id === "hdfc"
      ? "text-blue-600"
      : account.id === "sbi"
      ? "text-indigo-600"
      : "text-amber-600";

  return (
    <div className="bg-white border border-border rounded-2xl shadow-[0_1px_4px_rgba(0,0,0,0.04)] overflow-hidden">
      {/* Card header — always visible */}
      <button
        onClick={() => setExpanded((v) => !v)}
        className="w-full flex items-center justify-between px-6 py-4 hover:bg-muted/20 transition-colors"
      >
        <div className="flex items-center gap-4">
          <div className={cn("h-10 w-10 rounded-xl flex items-center justify-center shrink-0", iconBg)}>
            <Icon className={cn("h-5 w-5", iconColor)} />
          </div>
          <div className="text-left">
            <p className="text-sm font-semibold text-foreground leading-none mb-0.5">{account.name}</p>
            {account.accountNumber && (
              <p className="text-xs text-muted-foreground">{account.bank} · {account.accountNumber}</p>
            )}
            {account.type === "cash" && (
              <p className="text-xs text-muted-foreground">Physical cash on hand</p>
            )}
          </div>
        </div>

        <div className="flex items-center gap-4 shrink-0">
          <div className="text-right">
            <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider mb-0.5">Current Balance</p>
            <p className="text-lg font-bold text-foreground tabular-nums">{fmt(account.currentBalance)}</p>
          </div>
          <div className="h-7 w-7 flex items-center justify-center rounded-lg bg-muted/50 text-muted-foreground">
            {expanded
              ? <ChevronUp className="h-4 w-4" />
              : <ChevronDown className="h-4 w-4" />
            }
          </div>
        </div>
      </button>

      {/* Expandable transaction history */}
      {expanded && (
        <div className="border-t border-border">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-muted/30">
                  {["Date", "Description", "Debit", "Credit", "Balance"].map((h) => (
                    <th
                      key={h}
                      className={cn(
                        "px-5 py-3 text-[10px] font-semibold text-muted-foreground uppercase tracking-wider whitespace-nowrap",
                        h === "Debit" || h === "Credit" || h === "Balance" ? "text-right" : "text-left",
                      )}
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {account.transactions.map((tx, i) => (
                  <tr
                    key={tx.id}
                    className={cn(
                      "border-t border-border/50 hover:bg-muted/10 transition-colors",
                      i % 2 !== 0 && "bg-muted/5",
                    )}
                  >
                    <td className="px-5 py-3 text-muted-foreground whitespace-nowrap text-[13px]">
                      {new Date(tx.date).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" })}
                    </td>
                    <td className="px-5 py-3 text-foreground max-w-[260px] truncate">{tx.description}</td>
                    <td className="px-5 py-3 text-right whitespace-nowrap tabular-nums font-medium text-red-600">
                      {tx.debit != null ? fmt(tx.debit) : "—"}
                    </td>
                    <td className="px-5 py-3 text-right whitespace-nowrap tabular-nums font-medium text-emerald-600">
                      {tx.credit != null ? fmt(tx.credit) : "—"}
                    </td>
                    <td className="px-5 py-3 text-right whitespace-nowrap tabular-nums font-semibold text-foreground">
                      {fmt(tx.balance)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
