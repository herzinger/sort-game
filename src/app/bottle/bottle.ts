import { Fluid } from '../fluid/fluid';


export interface Bottle {
  id:     string;
  fluids: Fluid[];

  topFluid(): Fluid | undefined;
}
