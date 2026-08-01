import { useState } from "react";
import PureGoldTab from "../components/PureGoldTab";
import OldGoldTab from "../components/OldGoldTab";
import GoldCoinsTab from "../components/GoldCoinsTab";

type Tab = "pure" | "old" | "coins";

const TABS: { id: Tab; label: string }[] = [
  { id: "pure",  label: "Pure Gold"  },
  { id: "old",   label: "Old Gold"   },
  { id: "coins", label: "Gold Coins" },
];

export default function GoldManagement() {
  const [tab, setTab] = useState<Tab>("pure");

  return (
    <div className="w-full flex flex-col h-full">
      {/* Header */}
      <div className="px-6 py-3 border-b border-border flex items-center shrink-0">
        {/* Tabs — segmented control */}
        <div className="flex items-center gap-1 bg-zinc-200 rounded-xl p-1">
          {TABS.map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`px-5 py-1.5 text-sm font-medium rounded-lg transition-all duration-200 ${
                tab === t.id
                  ? "bg-white text-foreground shadow-sm"
                  : "text-zinc-500 hover:text-foreground"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {/* Tab content */}
      <div className="flex-1 overflow-y-auto no-scrollbar p-8">
        {tab === "pure"  && <PureGoldTab />}
        {tab === "old"   && <OldGoldTab />}
        {tab === "coins" && <GoldCoinsTab />}
      </div>
    </div>
  );
}
