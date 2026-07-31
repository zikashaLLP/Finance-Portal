export type LabourType = "Per Gram" | "Per Piece" | "Fixed" | "Daily Wage";
export type KarigarStatus = "Active" | "Deactive";

export interface KarigarProfile {
  id: string;
  karigar_code: string;
  name: string;
  phone: string;
  address: string;
  labour_type: LabourType;
  image_url: string;
  status: KarigarStatus;
  created_at: string;
  updated_at: string;
}

export const mockKarigarProfiles: KarigarProfile[] = [
  {
    id: "kp1",
    karigar_code: "KG001",
    name: "Raju Soni",
    phone: "9711234567",
    address: "12, Dharavi, Mumbai",
    labour_type: "Per Gram",
    image_url: "",
    status: "Active",
    created_at: "2022-08-10T09:00:00Z",
    updated_at: "2024-05-20T11:00:00Z",
  },
  {
    id: "kp2",
    karigar_code: "KG002",
    name: "Mohan Lal",
    phone: "9722345678",
    address: "45, Sitapura Industrial, Jaipur",
    labour_type: "Per Piece",
    image_url: "",
    status: "Active",
    created_at: "2022-09-15T10:00:00Z",
    updated_at: "2024-04-12T14:00:00Z",
  },
  {
    id: "kp3",
    karigar_code: "KG003",
    name: "Santosh Kumar",
    phone: "9733456789",
    address: "7, Manpada, Thane",
    labour_type: "Daily Wage",
    image_url: "",
    status: "Active",
    created_at: "2023-01-05T08:00:00Z",
    updated_at: "2024-06-01T09:30:00Z",
  },
  {
    id: "kp4",
    karigar_code: "KG004",
    name: "Pradeep Vishwakarma",
    phone: "9744567890",
    address: "3, Nandi Colony, Mysore",
    labour_type: "Fixed",
    image_url: "",
    status: "Deactive",
    created_at: "2023-03-22T11:00:00Z",
    updated_at: "2023-11-30T16:00:00Z",
  },
  {
    id: "kp5",
    karigar_code: "KG005",
    name: "Dinesh Sonar",
    phone: "9755678901",
    address: "18, Lalbaug, Mumbai",
    labour_type: "Per Gram",
    image_url: "",
    status: "Active",
    created_at: "2023-05-18T08:00:00Z",
    updated_at: "2024-07-10T10:00:00Z",
  },
];

export const LABOUR_TYPES: LabourType[] = ["Per Gram", "Per Piece", "Fixed", "Daily Wage"];
