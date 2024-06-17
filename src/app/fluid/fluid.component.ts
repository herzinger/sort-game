import { Component, Input } from '@angular/core';

import { Fluid } from './fluid';


@Component({
  selector:    'app-fluid',
  standalone:  true,
  imports:     [],
  templateUrl: './fluid.component.html',
  styleUrl:    './fluid.component.scss'
})
export class FluidComponent {

  @Input() public fluid: Fluid | undefined;

}
