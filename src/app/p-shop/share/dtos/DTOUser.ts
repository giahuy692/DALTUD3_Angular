export class DTOUser {
  id?: number;
  email: string = '';
  username: string = '';
  password: string = '';
  name: {
    firstname: string;
    lastname: string;
  };
  image: string = '';
  address: {
    city: string;
    street: string;
    number: number;
    zipcode: string;
    geolocation: {
      lat: string;
      long: string;
    };
  };
  phone: string;
}
