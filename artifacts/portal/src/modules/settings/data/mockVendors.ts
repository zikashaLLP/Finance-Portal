export type VendorStatus = "Active" | "Inactive";

export interface Vendor {
  id: string;
  vendor_code: string;
  name: string;
  phone: string;
  email: string;
  gst_no: string;
  pan_no: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  status: VendorStatus;
}

export const mockVendors: Vendor[] = [
  {
    id: "v1",
    vendor_code: "VN001",
    name: "Gold Bullion Suppliers",
    phone: "9901234567",
    email: "sales@goldbullion.com",
    gst_no: "27AABCG1234A1Z5",
    pan_no: "AABCG1234A",
    address: "14, Zaveri Bazar",
    city: "Mumbai",
    state: "Maharashtra",
    pincode: "400002",
    status: "Active",
  },
  {
    id: "v2",
    vendor_code: "VN002",
    name: "Diamond Palace Imports",
    phone: "9902345678",
    email: "info@diamondpalace.com",
    gst_no: "24AAABP5678B1Z1",
    pan_no: "AAABP5678B",
    address: "8, Surat Diamond Bourse",
    city: "Surat",
    state: "Gujarat",
    pincode: "395010",
    status: "Active",
  },
  {
    id: "v3",
    vendor_code: "VN003",
    name: "Precious Metals Co.",
    phone: "9903456789",
    email: "contact@preciousmetals.in",
    gst_no: "29AAABP9012C1Z3",
    pan_no: "AAABP9012C",
    address: "99, Industrial Area",
    city: "Bangalore",
    state: "Karnataka",
    pincode: "560058",
    status: "Active",
  },
  {
    id: "v4",
    vendor_code: "VN004",
    name: "Silver Craft Exports",
    phone: "9904567890",
    email: "",
    gst_no: "",
    pan_no: "BBBSC3456D",
    address: "22, Rajpur Road",
    city: "Jaipur",
    state: "Rajasthan",
    pincode: "302001",
    status: "Inactive",
  },
];
