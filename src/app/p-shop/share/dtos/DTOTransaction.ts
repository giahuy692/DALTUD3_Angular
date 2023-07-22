export class DTOTransaction {
  paymentID?: string;
  paymentName: string = '';
  ProductId?: string;
  ProductName: string = '';
  Qty: number = 0;
  Amount: number = 0;
  Status: string = 'Chờ xử lý';
}
