export interface Role {
  id: string;
  role_name: string;
  description: string;
  created_at: string;
  updated_at: string;
}

export type UserStatus = "Active" | "Deactive";

export interface User {
  id: string;
  username: string;
  password: string;
  full_name: string;
  email: string;
  phone: string;
  role_id: string;
  branch_id: string;
  status: UserStatus;
  last_login: string;
  created_at: string;
  updated_at: string;
}

export const mockRoles: Role[] = [
  {
    id: "r1",
    role_name: "Admin",
    description: "Full system access — manage users, settings, and all modules",
    created_at: "2022-01-01T09:00:00Z",
    updated_at: "2024-05-10T11:00:00Z",
  },
  {
    id: "r2",
    role_name: "Accounts",
    description: "Finance and bookkeeping — transactions, gold rates, ledger, reports",
    created_at: "2022-01-01T09:00:00Z",
    updated_at: "2024-03-15T10:00:00Z",
  },
  {
    id: "r3",
    role_name: "Sales",
    description: "Sales and client management — sales orders, clients, purchase",
    created_at: "2022-01-01T09:00:00Z",
    updated_at: "2024-04-20T09:00:00Z",
  },
  {
    id: "r4",
    role_name: "Staff",
    description: "General staff access — karigar, stock, basic operations",
    created_at: "2022-01-01T09:00:00Z",
    updated_at: "2024-06-01T08:00:00Z",
  },
];

export const mockUsers: User[] = [
  {
    id: "u1",
    username: "admin",
    password: "admin@123",
    full_name: "Admin User",
    email: "admin@portaljewels.com",
    phone: "9800000001",
    role_id: "r1",
    branch_id: "b1",
    status: "Active",
    last_login: "2026-07-31T09:00:00Z",
    created_at: "2022-01-01T09:00:00Z",
    updated_at: "2026-07-31T09:00:00Z",
  },
  {
    id: "u2",
    username: "kavita.joshi",
    password: "kavita@123",
    full_name: "Kavita Joshi",
    email: "kavita@portaljewels.com",
    phone: "9811111111",
    role_id: "r2",
    branch_id: "b1",
    status: "Active",
    last_login: "2026-07-30T14:30:00Z",
    created_at: "2022-03-10T10:00:00Z",
    updated_at: "2026-07-30T14:30:00Z",
  },
  {
    id: "u3",
    username: "sonia.k",
    password: "sonia@123",
    full_name: "Sonia Kapoor",
    email: "sonia@portaljewels.com",
    phone: "9822222222",
    role_id: "r3",
    branch_id: "b1",
    status: "Active",
    last_login: "2026-07-29T11:00:00Z",
    created_at: "2022-05-15T09:00:00Z",
    updated_at: "2026-07-29T11:00:00Z",
  },
  {
    id: "u4",
    username: "ramesh.v",
    password: "ramesh@123",
    full_name: "Ramesh Verma",
    email: "ramesh@portaljewels.com",
    phone: "9833333333",
    role_id: "r4",
    branch_id: "b2",
    status: "Active",
    last_login: "2026-07-28T16:00:00Z",
    created_at: "2023-01-20T08:00:00Z",
    updated_at: "2026-07-28T16:00:00Z",
  },
  {
    id: "u5",
    username: "deepak.nair",
    password: "deepak@123",
    full_name: "Deepak Nair",
    email: "",
    phone: "9844444444",
    role_id: "r2",
    branch_id: "b3",
    status: "Deactive",
    last_login: "2025-11-10T09:00:00Z",
    created_at: "2023-06-01T11:00:00Z",
    updated_at: "2025-11-10T09:00:00Z",
  },
];
