import { Measure } from "./measure";
import { Cathegory } from "./cathegory";
import { Material } from "./material";

export class Product {
    id: number;
    name: string;
    price: number;
    heightMin: number;
    heightMax: number;
    lengthMin: number;
    lengthMax: number;
    depthMin: number;
    depthMax: number;
  }