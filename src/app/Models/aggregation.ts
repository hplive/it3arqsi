import { Measure } from "./measure";
import { Cathegory } from "./cathegory";
import { Material } from "./material";

export class Aggregation {
    ProductParentId: number;
    ProductChildId: number;
    maxPercentage: number;
    minPercentage: number;
    type: boolean;
    sameMaterialRequired: boolean;
  }