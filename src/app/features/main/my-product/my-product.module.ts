import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MyProductRoutingModule } from './my-product-routing.module';
import { MyProductLayoutComponent } from './components/my-product-layout/my-product-layout.component';
import { AssetsManagementSystemComponent } from './pages/assets-management-system/assets-management-system.component';
import { SharedModule } from '../../shared/shared.module';


@NgModule({
  declarations: [
    MyProductLayoutComponent,
    AssetsManagementSystemComponent
  ],
  imports: [
    CommonModule,
    MyProductRoutingModule,
    SharedModule
  ]
})
export class MyProductModule { }
