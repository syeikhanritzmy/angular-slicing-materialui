export interface IProduct {
  id: number;
  name: string;
  active: boolean;
  expirationDate: string;
  description: string;
  type: string;
  features?: [{ name: string }];
}
