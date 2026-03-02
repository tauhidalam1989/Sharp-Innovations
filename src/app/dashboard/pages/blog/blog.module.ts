import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';
import { BlogRoutingModule } from './blog-routing.module';
import { BlogListComponent } from './components/blog-list/blog-list.component';
import { BlogFormComponent } from './components/blog-form/blog-form.component';
import { BlogDetailComponent } from './components/blog-detail/blog-detail.component';
import { QuillModule } from 'ngx-quill';
import { CoreModule } from '../../../core/core.module';

@NgModule({
  declarations: [
    BlogListComponent,
    BlogFormComponent,
    BlogDetailComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    BlogRoutingModule,
    SharedModule,
    FormsModule,
    CoreModule,
    QuillModule.forRoot()
  ]
})
export class BlogModule { }