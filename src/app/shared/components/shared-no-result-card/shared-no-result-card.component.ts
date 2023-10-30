import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-shared-no-result-card',
  templateUrl: './shared-no-result-card.component.html',
  styleUrls: ['./shared-no-result-card.component.scss']
})
export class SharedNoResultCardComponent {

  @Input() noResultMessage: string = 'No data found to show'

}
