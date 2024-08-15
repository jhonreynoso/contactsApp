import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LayoutContainerComponent } from './layout-container.component';
import { NgbNavModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [LayoutContainerComponent],
  imports: [
    CommonModule,
    RouterModule,
    NgbNavModule
  ]
})
export class LayoutModule { }
