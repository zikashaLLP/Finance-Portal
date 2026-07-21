export interface Role {
  id: string;
  name: string;
  description: string;
  permissions: string;
  status: "Active" | "Inactive";
}

export interface User {
  id: string;
  full_name: string;
  username: string;
  email: string;
  role_id: string;
  branch_id: string;
  status: "Active" | "Inactive";
}

export const mockRoles: Role[] = [
  {
    id: "r1",
    name: "Owner",
    description: "Full system access",
    permissions: "All Modules",
    status: "Active",
  },
  {
    id: "r2",
    name: "Accounts Team",
    description: "Finance and bookkeeping access",
    permissions: "Transactions, Gold, Reports",
    status: "Active",
  },
  {
    id: "r3",
    name: "Karigar Team",
    description: "Workshop and craft management",
    permissions: "Karigar, Stock",
    status: "Active",
  },
  {
    id: "r4",
    name: "Sales Team",
    description: "Sales and customer management",
    permissions: "Sales, Clients, Purchase",
    status: "Active",
  },
  {
    id: "r5",
    name: "Viewer",
    description: "Read-only access to reports",
    permissions: "Reports only",
    status: "Inactive",
  },
];

export const mockUsers: User[] = [
  {
    id: "u1",
    full_name: "Admin User",
    username: "admin",
    email: "admin@portaljewels.com",
    role_id: "r1",
    branch_id: "b1",
    status: "Active",
  },
  {
    id: "u2",
    full_name: "Kavita Joshi",
    username: "kavita.joshi",
    email: "kavita@portaljewels.com",
    role_id: "r2",
    branch_id: "b1",
    status: "Active",
  },
  {
    id: "u3",
    full_name: "Ramesh Verma",
    username: "ramesh.v",
    email: "ramesh@portaljewels.com",
    role_id: "r3",
    branch_id: "b2",
    status: "Active",
  },
  {
    id: "u4",
    full_name: "Sonia Kapoor",
    username: "sonia.k",
    email: "sonia@portaljewels.com",
    role_id: "r4",
    branch_id: "b1",
    status: "Active",
  },
  {
    id: "u5",
    full_name: "Deepak Nair",
    username: "deepak.nair",
    email: "",
    role_id: "r2",
    branch_id: "b3",
    status: "Inactive",
  },
];
