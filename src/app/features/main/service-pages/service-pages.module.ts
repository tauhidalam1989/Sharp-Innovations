import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ServicePagesRoutingModule } from './service-pages-routing.module';
import { ServicesListingComponent } from '../services/components/services-listing/services-listing.component';
import { UserServiceDetailComponent } from '../services/components/user-service-detail/user-service-detail.component';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
    declarations: [
        ServicesListingComponent,
        UserServiceDetailComponent
    ],
    imports: [
        CommonModule,
        ServicePagesRoutingModule,
        SharedModule
    ]
})
export class ServicePagesModule { }
