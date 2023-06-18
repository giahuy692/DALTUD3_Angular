import { DTOProduct } from './DTOProduct';

export class DTOCart {
  id: number;
  userId: number;
  date: any;
  products: DTOProduct[] = [];
}
