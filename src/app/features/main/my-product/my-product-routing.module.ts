import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MyProductLayoutComponent } from './components/my-product-layout/my-product-layout.component';
import { AssetsManagementSystemComponent } from './pages/assets-management-system/assets-management-system.component';

const routes: Routes = [

  {
    path: "",
    component: MyProductLayoutComponent,
    children: [
      {
        path: "",
        pathMatch: "full",
        redirectTo: "profile",
      },
      {
        path: "assets-management-system",
        component: AssetsManagementSystemComponent,
      },
    ]
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MyProductRoutingModule { }
