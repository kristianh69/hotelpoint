export interface Room {
  id: number;
  name: string;
  tags: string;
  description: string;
  numberOfBeds: number;
  price: number;
  imageUrl: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
  surname: string;
}

export interface Booking {
  id: string;
  Room: Room;
  StartingDate: string;
  EndingDate: string;
  User: User;
}
