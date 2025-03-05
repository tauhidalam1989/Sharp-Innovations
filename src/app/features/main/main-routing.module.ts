import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { MainLayoutComponent } from '../shared/layout/main-layout/main-layout/main-layout.component';


const routes: Routes = [

    {
      path: 'web-app-developmet',
       component: MainLayoutComponent,
      loadChildren: () =>
        import("./services/services.module").then(
          (m) => m.ServicesModule
        ),
    },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
