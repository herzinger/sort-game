import { Component, OnInit } from '@angular/core';

import * as uuid from 'uuid';

import { Fluid, fluidColor } from '../fluid/fluid';

import { BottleComponent }   from '../bottle/bottle.component';
import { BottleClass }       from '../bottle/bottle.class';


@Component({
  selector:    'app-game-stage',
  standalone:  true,
  imports:     [
    BottleComponent
  ],
  templateUrl: './game-stage.component.html',
  styleUrl:    './game-stage.component.scss'
})
export class GameStageComponent implements OnInit {

  public colors:        fluidColor[];
  public colorsCounter: Map<fluidColor, number>;
  public bottles:       BottleClass[];

  public activeBottle: BottleClass | undefined;

  constructor() {
    this.colorsCounter = new Map<fluidColor, number>();

    this.bottles = [];
    this.colors  = [
      'red', 'orange', 'yellow', 'green', 'blue', 'cyan',
      'purple', 'brown', 'grey', 'pink', 'olive', 'teal'
    ];
  }

  ngOnInit() {
    this.initBottles();
  }

  private initBottles() {
    this.resetColorsCounter();

    this.bottles = Array.from(
      { length: this.colors.length },
      () => this.generateBottle()
    );

    const emptyBottles: BottleClass[] = Array.from(
      { length: 2 },
      () => new BottleClass(uuid.v4(), [])
    )

    this.bottles = [ ...this.bottles, ...emptyBottles ];
  }

  private resetColorsCounter() {
    this.colors.forEach((color: fluidColor) => this.colorsCounter.set(color, 0));
  }

  private getRandomFluidColor(): fluidColor {
    const colors: fluidColor[] = Array.from(this.colorsCounter.keys());

    const randomColorIndex: number = Math.floor(Math.random() * colors.length),
          randomColor: fluidColor  = colors[randomColorIndex];

    const counter: number = (this.colorsCounter.get(randomColor) || 0) + 1;

    this.colorsCounter.set(randomColor, counter);

    if (counter > 4) {
      this.colorsCounter.delete(randomColor);
      return this.getRandomFluidColor();
    }

    return randomColor;
  }

  private generateFluid(): Fluid  {
    return { id: uuid.v4(), color: this.getRandomFluidColor() }
  };

  private generateBottle(): BottleClass {
    const fluids: Fluid[] = Array.from(
      { length: 4 },
      () => this.generateFluid()
    );

    return new BottleClass(uuid.v4(), fluids);
  }

  public selectBottle(bottle: BottleClass) {
    if (!this.activeBottle) return this.setActiveBottle(bottle);
    this.setActiveBottle(this.activeBottle.transferFluidTo(bottle));
  }

  private setActiveBottle(bottle: BottleClass) {
    this.activeBottle = this.activeBottle?.id === bottle?.id ? undefined : bottle;
  }

}
