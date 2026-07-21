export type BranchStatus = "Active" | "Inactive";

export interface Branch {
  id: string;
  name: string;
  code: string;
  phone: string;
  email: string;
  address: string;
  city: string;
  state: string;
  country: string;
  pincode: string;
  status: BranchStatus;
}

export const mockBranches: Branch[] = [
  {
    id: "b1",
    name: "Main Showroom",
    code: "BR001",
    phone: "9876543210",
    email: "main@portaljewels.com",
    address: "12, MG Road",
    city: "Mumbai",
    state: "Maharashtra",
    country: "India",
    pincode: "400001",
    status: "Active",
  },
  {
    id: "b2",
    name: "Andheri Branch",
    code: "BR002",
    phone: "9876543211",
    email: "andheri@portaljewels.com",
    address: "45, Andheri West",
    city: "Mumbai",
    state: "Maharashtra",
    country: "India",
    pincode: "400058",
    status: "Active",
  },
  {
    id: "b3",
    name: "Pune Outlet",
    code: "BR003",
    phone: "9876543212",
    email: "pune@portaljewels.com",
    address: "7, FC Road",
    city: "Pune",
    state: "Maharashtra",
    country: "India",
    pincode: "411004",
    status: "Inactive",
  },
  {
    id: "b4",
    name: "Surat Showroom",
    code: "BR004",
    phone: "9876543213",
    email: "surat@portaljewels.com",
    address: "22, Ring Road",
    city: "Surat",
    state: "Gujarat",
    country: "India",
    pincode: "395001",
    status: "Active",
  },
];
