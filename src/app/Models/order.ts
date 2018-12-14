import { Product } from "./product";

export class Order {
    id: string;
    name: String;
    product: Product;
    itemProduct: Product[];
  }