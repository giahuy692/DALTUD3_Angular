export class DTOProduct {
  id: number = 1;
  title: string = '';
  price: number = 0;
  category: string = '';
  description: string = '';
  image: string = '';
  rating: {
    count: number;
    rate: number;
  };
}
