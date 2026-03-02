import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { BlogsRoutingModule } from './blogs-routing.module';
import { BlogListingComponent } from './components/blog-listing/blog-listing.component';
import { BlogDetailComponent } from './components/blog-detail/blog-detail.component';
import { SharedModule } from '../../shared/shared.module';
import { CoreModule } from '../../../core/core.module';

@NgModule({
  declarations: [
    BlogListingComponent,
    BlogDetailComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    BlogsRoutingModule,
    SharedModule,
    CoreModule
  ]
})
export class BlogsModule { }
