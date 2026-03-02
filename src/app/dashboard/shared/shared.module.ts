import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { PaginationPagesPipe } from '../../dashboard/shared/pipes/pagination.pipe';
import { CeilPipe } from '../../dashboard/shared/pipes/ceil.pipe';

@NgModule({
  declarations: [
    SidebarComponent,
    PaginationPagesPipe,
    CeilPipe
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    SidebarComponent,
    PaginationPagesPipe,
    CeilPipe
  ]
})
export class SharedModule { }