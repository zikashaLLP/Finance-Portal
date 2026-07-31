export type ClientStatus = "Active" | "Deactive";

export interface Client {
  id: string;
  client_code: string;
  name: string;
  phone: string;
  email: string;
  birth_date: string;
  anniversary_date: string;
  spouse_name: string;
  spouse_birth_date: string;
  occupation: string;
  company: string;
  gst_no: string;
  pan_no: string;
  street_address: string;
  city: string;
  state: string;
  country: string;
  pincode: string;
  photo_url: string;
  notes: string;
  credit_limit: number;
  is_premium_client: boolean;
  status: ClientStatus;
  created_at: string;
  updated_at: string;
}

export const mockClients: Client[] = [
  {
    id: "c1",
    client_code: "CL001",
    name: "Rajesh Sharma",
    phone: "9812345678",
    email: "rajesh@gmail.com",
    birth_date: "1980-05-15",
    anniversary_date: "2005-11-20",
    spouse_name: "Priya Sharma",
    spouse_birth_date: "1983-03-10",
    occupation: "Businessman",
    company: "Sharma Enterprises",
    gst_no: "27AABCS1234A1Z5",
    pan_no: "AABCS1234A",
    street_address: "101, Park View Apt",
    city: "Mumbai",
    state: "Maharashtra",
    country: "India",
    pincode: "400076",
    photo_url: "",
    notes: "VIP client. Prefers gold jewellery.",
    credit_limit: 500000,
    is_premium_client: true,
    status: "Active",
    created_at: "2023-01-10T09:00:00Z",
    updated_at: "2024-06-15T11:30:00Z",
  },
  {
    id: "c2",
    client_code: "CL002",
    name: "Anjali Mehta",
    phone: "9823456789",
    email: "anjali.mehta@yahoo.com",
    birth_date: "1985-09-22",
    anniversary_date: "2010-02-14",
    spouse_name: "Vikram Mehta",
    spouse_birth_date: "1982-07-04",
    occupation: "Doctor",
    company: "Apollo Clinic",
    gst_no: "",
    pan_no: "BBBCM4567B",
    street_address: "32, Shanti Nagar",
    city: "Pune",
    state: "Maharashtra",
    country: "India",
    pincode: "411007",
    photo_url: "",
    notes: "",
    credit_limit: 200000,
    is_premium_client: false,
    status: "Active",
    created_at: "2023-03-18T10:00:00Z",
    updated_at: "2024-04-20T14:00:00Z",
  },
  {
    id: "c3",
    client_code: "CL003",
    name: "Suresh Patel",
    phone: "9834567890",
    email: "suresh.patel@gmail.com",
    birth_date: "1975-12-01",
    anniversary_date: "2000-04-25",
    spouse_name: "Rekha Patel",
    spouse_birth_date: "1978-08-18",
    occupation: "Trader",
    company: "Patel Gold Traders",
    gst_no: "24AAACS9876B1Z2",
    pan_no: "AAACS9876B",
    street_address: "5, Diamond Nagar",
    city: "Surat",
    state: "Gujarat",
    country: "India",
    pincode: "395002",
    photo_url: "",
    notes: "Bulk buyer. Seasonal purchases.",
    credit_limit: 1000000,
    is_premium_client: true,
    status: "Active",
    created_at: "2022-11-05T08:00:00Z",
    updated_at: "2024-07-01T09:00:00Z",
  },
  {
    id: "c4",
    client_code: "CL004",
    name: "Meena Iyer",
    phone: "9845678901",
    email: "",
    birth_date: "1990-07-08",
    anniversary_date: "",
    spouse_name: "",
    spouse_birth_date: "",
    occupation: "Software Engineer",
    company: "TCS",
    gst_no: "",
    pan_no: "CCCMI7890C",
    street_address: "78, Koramangala",
    city: "Bangalore",
    state: "Karnataka",
    country: "India",
    pincode: "560034",
    photo_url: "",
    notes: "",
    credit_limit: 100000,
    is_premium_client: false,
    status: "Deactive",
    created_at: "2023-06-12T11:00:00Z",
    updated_at: "2024-01-08T16:00:00Z",
  },
];
