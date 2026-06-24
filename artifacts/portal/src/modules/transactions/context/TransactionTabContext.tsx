import { createContext, useContext, useState, ReactNode } from "react";

interface TransactionTabContextValue {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const TransactionTabContext = createContext<TransactionTabContextValue | null>(null);

export function TransactionTabProvider({ children }: { children: ReactNode }) {
  const [activeTab, setActiveTab] = useState("daily");
  return (
    <TransactionTabContext.Provider value={{ activeTab, setActiveTab }}>
      {children}
    </TransactionTabContext.Provider>
  );
}

export function useTransactionTab() {
  return useContext(TransactionTabContext);
}
