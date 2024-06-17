import { Fluid }  from '../fluid/fluid';
import { Bottle } from './bottle';


export class BottleClass implements Bottle {
  public id:     string;
  public fluids: Fluid[];

  constructor(id: string, fluids: Fluid[]) {
    this.id     = id;
    this.fluids = fluids;
  }

  public topFluid(): Fluid | undefined {
    return this.fluids[this.fluids.length - 1];
  }

  public isFull(): boolean {
    return this.fluids.length === 4;
  }

  public isEmpty(): boolean {
    return !this.fluids || this.fluids.length === 0;
  }

  public isCompleted(): boolean {
    if (this.fluids.length < 4) return false;

    return this.fluids.every((fluid: Fluid, index: number, array: Fluid[]) => {
      return index === 0 || fluid.color === array[index - 1].color;
    });
  }

  private validateFluidDestination(destination: BottleClass): boolean {
    if (destination.isEmpty())      return true;
    if (destination.id === this.id) return false;

    const isFluidValid: boolean      = this.topFluid()?.color === destination.topFluid()?.color,
          isDestinationFull: boolean = destination?.isFull();

    return Boolean(!isDestinationFull && isFluidValid);
  }

  public transferFluidTo(destination: BottleClass): BottleClass {
    const fluidToTransfer: Fluid | undefined = this.topFluid(),
          isDestinationValid: boolean        = this.validateFluidDestination(destination);

    if (isDestinationValid && fluidToTransfer) {
      destination.fluids.push(fluidToTransfer);
      this.fluids.pop();

      if (this.validateFluidDestination(destination)) this.transferFluidTo(destination)
    }


    return this;
  }
}
