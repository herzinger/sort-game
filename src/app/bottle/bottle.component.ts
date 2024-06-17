import { ChangeDetectionStrategy, Component, Input, OnChanges, SimpleChanges } from '@angular/core';

import { BottleClass }    from './bottle.class';
import { FluidComponent } from '../fluid/fluid.component';


@Component({
  selector:        'app-bottle',
  standalone:      true,
  imports:         [
    FluidComponent
  ],
  templateUrl:     './bottle.component.html',
  styleUrl:        './bottle.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BottleComponent implements OnChanges {

  @Input() public bottle:   BottleClass | undefined;
  @Input() public isActive: boolean;

  public classList: string;

  constructor() {
    this.isActive  = false;
    this.classList = 'c-bottle';
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['bottle'] && changes['bottle'].currentValue) {

    }
  }

  public get fluidColor(): string | undefined {
    return this.bottle?.topFluid()?.color;
  }

  private updateClassList() {
    const colorClass: string | null = this.fluidColor ? 'c-bottle--' + this.fluidColor : null,
          baseClass: string         = 'c-bottle';

    this.classList = [ baseClass, colorClass ].filter(Boolean).join(' ');
  }
}
