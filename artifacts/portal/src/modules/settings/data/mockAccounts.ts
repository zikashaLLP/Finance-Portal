export type AccountType   = "Cash" | "Bank Account";
export type AccountStatus = "Active" | "Deactive";

export interface Account {
  id: string;
  account_name: string;
  type: AccountType;
  opening_balance: number;
  current_balance: number;
  // Bank-only fields
  bank_name?: string;
  ifsc_code?: string;
  account_number?: string;
  status: AccountStatus;
  created_at: string;
  updated_at: string;
}

export const mockAccounts: Account[] = [
  {
    id: "acc1",
    account_name: "Main Cash Counter",
    type: "Cash",
    opening_balance: 50000,
    current_balance: 72400,
    status: "Active",
    created_at: "2024-01-01T09:00:00Z",
    updated_at: "2024-07-15T11:20:00Z",
  },
  {
    id: "acc2",
    account_name: "HDFC Current Account",
    type: "Bank Account",
    opening_balance: 200000,
    current_balance: 485300,
    bank_name: "HDFC Bank",
    ifsc_code: "HDFC0001234",
    account_number: "50100123456789",
    status: "Active",
    created_at: "2024-01-05T10:00:00Z",
    updated_at: "2024-07-20T14:30:00Z",
  },
  {
    id: "acc3",
    account_name: "SBI Savings",
    type: "Bank Account",
    opening_balance: 100000,
    current_balance: 138750,
    bank_name: "State Bank of India",
    ifsc_code: "SBIN0005678",
    account_number: "32109876543210",
    status: "Active",
    created_at: "2024-02-01T09:30:00Z",
    updated_at: "2024-07-18T10:00:00Z",
  },
  {
    id: "acc4",
    account_name: "Petty Cash",
    type: "Cash",
    opening_balance: 10000,
    current_balance: 4250,
    status: "Active",
    created_at: "2024-03-01T09:00:00Z",
    updated_at: "2024-07-10T16:00:00Z",
  },
  {
    id: "acc5",
    account_name: "ICICI Business Account",
    type: "Bank Account",
    opening_balance: 500000,
    current_balance: 0,
    bank_name: "ICICI Bank",
    ifsc_code: "ICIC0009012",
    account_number: "001205012345",
    status: "Deactive",
    created_at: "2023-06-01T09:00:00Z",
    updated_at: "2024-01-12T09:00:00Z",
  },
];
