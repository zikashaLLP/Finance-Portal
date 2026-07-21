export type LabourType = "Per Gram" | "Per Piece" | "Fixed" | "Daily Wage";
export type KarigarStatus = "Active" | "Inactive";

export interface KarigarProfile {
  id: string;
  karigar_code: string;
  name: string;
  phone: string;
  address: string;
  labour_type: LabourType;
  status: KarigarStatus;
}

export const mockKarigarProfiles: KarigarProfile[] = [
  {
    id: "kp1",
    karigar_code: "KG001",
    name: "Raju Soni",
    phone: "9711234567",
    address: "12, Dharavi, Mumbai",
    labour_type: "Per Gram",
    status: "Active",
  },
  {
    id: "kp2",
    karigar_code: "KG002",
    name: "Mohan Lal",
    phone: "9722345678",
    address: "45, Sitapura Industrial, Jaipur",
    labour_type: "Per Piece",
    status: "Active",
  },
  {
    id: "kp3",
    karigar_code: "KG003",
    name: "Santosh Kumar",
    phone: "9733456789",
    address: "7, Manpada, Thane",
    labour_type: "Daily Wage",
    status: "Active",
  },
  {
    id: "kp4",
    karigar_code: "KG004",
    name: "Pradeep Vishwakarma",
    phone: "9744567890",
    address: "3, Nandi Colony, Mysore",
    labour_type: "Fixed",
    status: "Inactive",
  },
  {
    id: "kp5",
    karigar_code: "KG005",
    name: "Dinesh Sonar",
    phone: "9755678901",
    address: "18, Lalbaug, Mumbai",
    labour_type: "Per Gram",
    status: "Active",
  },
];

export const LABOUR_TYPES: LabourType[] = ["Per Gram", "Per Piece", "Fixed", "Daily Wage"];
