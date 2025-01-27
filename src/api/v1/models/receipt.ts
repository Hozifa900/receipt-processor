export interface Item {
  shortDescription: string;
  price: string;
}

export interface Receipt {
  retailer: string;
  purchaseDate: string; // e.g. "2022-01-02"
  purchaseTime: string; // e.g. "13:13" (24-hour format)
  items: Item[];
  total: string; // e.g. "1.25"
}
