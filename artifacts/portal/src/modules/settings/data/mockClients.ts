export type ClientStatus = "Active" | "Inactive";

export interface Client {
  id: string;
  client_code: string;
  name: string;
  phone: string;
  email: string;
  birth_date: string;
  anniversary_date: string;
  spouse_name: string;
  occupation: string;
  company: string;
  gst_no: string;
  pan_no: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  credit_limit: number;
  is_premium_client: boolean;
  status: ClientStatus;
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
    occupation: "Businessman",
    company: "Sharma Enterprises",
    gst_no: "27AABCS1234A1Z5",
    pan_no: "AABCS1234A",
    address: "101, Park View Apt",
    city: "Mumbai",
    state: "Maharashtra",
    pincode: "400076",
    credit_limit: 500000,
    is_premium_client: true,
    status: "Active",
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
    occupation: "Doctor",
    company: "Apollo Clinic",
    gst_no: "",
    pan_no: "BBBCM4567B",
    address: "32, Shanti Nagar",
    city: "Pune",
    state: "Maharashtra",
    pincode: "411007",
    credit_limit: 200000,
    is_premium_client: false,
    status: "Active",
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
    occupation: "Trader",
    company: "Patel Gold Traders",
    gst_no: "24AAACS9876B1Z2",
    pan_no: "AAACS9876B",
    address: "5, Diamond Nagar",
    city: "Surat",
    state: "Gujarat",
    pincode: "395002",
    credit_limit: 1000000,
    is_premium_client: true,
    status: "Active",
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
    occupation: "Software Engineer",
    company: "TCS",
    gst_no: "",
    pan_no: "CCCMI7890C",
    address: "78, Koramangala",
    city: "Bangalore",
    state: "Karnataka",
    pincode: "560034",
    credit_limit: 100000,
    is_premium_client: false,
    status: "Inactive",
  },
];
