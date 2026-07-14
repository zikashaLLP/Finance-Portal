export type ItemType = "Jewelry" | "Gold" | "Silver" | "Other";
export type DispatchStatus = "dispatched" | "delivered" | "returned";

export interface Dispatch {
  id: string;
  staffName: string;
  itemType: ItemType;
  itemDescription: string;
  fromLocation: string;
  toLocation: string;
  recipientName: string;
  notes: string;
  status: DispatchStatus;
  createdAt: string;
}

export const mockDispatches: Dispatch[] = [
  {
    id: "d001",
    staffName: "Ramesh Verma",
    itemType: "Gold",
    itemDescription: "22kt gold necklace set — 3 pieces for client inspection",
    fromLocation: "Main Store, Zaveri Bazaar",
    toLocation: "Client Residence, Juhu",
    recipientName: "Mrs. Anjali Shah",
    notes: "Handle with care. Return by 5 PM.",
    status: "dispatched",
    createdAt: "2026-07-14T09:15:00",
  },
  {
    id: "d002",
    staffName: "Suresh Patil",
    itemType: "Jewelry",
    itemDescription: "Diamond earrings and bangles set — repair pickup",
    fromLocation: "Showroom, Dadar",
    toLocation: "Karigar Workshop, Dharavi",
    recipientName: "Raju Karigar",
    notes: "Collect receipt after drop-off.",
    status: "delivered",
    createdAt: "2026-07-14T08:00:00",
  },
  {
    id: "d003",
    staffName: "Manoj Kumar",
    itemType: "Silver",
    itemDescription: "Silver puja thali set — 2 kg approx",
    fromLocation: "Warehouse, Andheri",
    toLocation: "Client Office, Bandra",
    recipientName: "Mr. Prakash Mehta",
    notes: "",
    status: "returned",
    createdAt: "2026-07-13T14:30:00",
  },
  {
    id: "d004",
    staffName: "Anil Sharma",
    itemType: "Gold",
    itemDescription: "Gold coin lot — 10 grams each, qty 5",
    fromLocation: "Main Store, Zaveri Bazaar",
    toLocation: "Bank Locker, Fort",
    recipientName: "Mr. Rajiv Nair",
    notes: "Require bank receipt as acknowledgement.",
    status: "delivered",
    createdAt: "2026-07-13T11:45:00",
  },
  {
    id: "d005",
    staffName: "Deepak Singh",
    itemType: "Jewelry",
    itemDescription: "Wedding jewellery set — bridal collection trial",
    fromLocation: "Showroom, Dadar",
    toLocation: "Client Residence, Thane",
    recipientName: "Ms. Priya Joshi",
    notes: "Appointment at 2 PM. Client may wish to purchase.",
    status: "dispatched",
    createdAt: "2026-07-14T10:00:00",
  },
  {
    id: "d006",
    staffName: "Ramesh Verma",
    itemType: "Other",
    itemDescription: "Polishing equipment and chemicals — monthly supply",
    fromLocation: "Warehouse, Andheri",
    toLocation: "Karigar Workshop, Dharavi",
    recipientName: "Raju Karigar",
    notes: "",
    status: "returned",
    createdAt: "2026-07-12T09:00:00",
  },
];
