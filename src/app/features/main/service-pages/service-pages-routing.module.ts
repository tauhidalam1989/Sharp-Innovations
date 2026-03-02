import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ServicesListingComponent } from '../services/components/services-listing/services-listing.component';
import { UserServiceDetailComponent } from '../services/components/user-service-detail/user-service-detail.component';

const routes: Routes = [
    {
        path: '',
        component: ServicesListingComponent,
        pathMatch: 'full'
    },
    {
        path: ':slug',
        component: UserServiceDetailComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ServicePagesRoutingModule { }
