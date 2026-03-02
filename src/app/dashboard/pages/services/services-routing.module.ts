import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ServiceListComponent } from './components/service-list/service-list.component';
import { ServiceFormComponent } from './components/service-form/service-form.component';
import { ServiceDetailComponent } from './components/service-detail/service-detail.component';

const routes: Routes = [
    { path: '', component: ServiceListComponent },
    { path: 'add', component: ServiceFormComponent },
    { path: 'edit/:id', component: ServiceFormComponent },
    { path: 'detail/:id', component: ServiceDetailComponent },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ServicesRoutingModule { }
