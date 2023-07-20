export class DTOProduct {
  _id: string;
  CatalogId: string;
  CatalogName: string;
  ProductName: string;
  Price: number;
  Discount: number;
  Description: string;
  Quantity: number;
  Image_link: string;
  Image_list: string[] = [];
  createdAt: Date;
  updatedAt: Date;
}

// _id: string;
// CatalogId: string;
// CatalogName: string;
// ProductName: string;
// Price: number;
// Discount: number;
// Description: string;
// Quantity: number;
// Image_link: string;
// Image_list: string[] = [];
// createdAt: Date;
// updatedAt: Date;
