import { Component, Input } from '@angular/core';
import { BreadcrumbItem } from '../../interfaces';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss']
})
export class BreadcrumbComponent {
  commonBreadcrumb = { label: 'Exam Management', url: '/home' };
  breadcrumbs: any = [];
  @Input() breadcrumbItems: BreadcrumbItem[];

  ngOnInit() {
   this.breadcrumbs.push(this.commonBreadcrumb, ...this.breadcrumbItems);
  }
}


