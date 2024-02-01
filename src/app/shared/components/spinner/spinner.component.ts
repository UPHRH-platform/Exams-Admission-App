import { Component, ViewEncapsulation } from '@angular/core';
import { SpinnerService } from 'src/app/service/spinner.service';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss'],
  encapsulation: ViewEncapsulation.ShadowDom
})
export class SpinnerComponent {

  constructor(public loader: SpinnerService) { }

}
