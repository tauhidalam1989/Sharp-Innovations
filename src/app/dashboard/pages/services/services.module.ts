import { NgModule } from '@angular/core';
import { CommonModule, SlicePipe, DatePipe } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';
import { ServicesRoutingModule } from './services-routing.module';
import { ServiceListComponent } from './components/service-list/service-list.component';
import { ServiceFormComponent } from './components/service-form/service-form.component';
import { ServiceDetailComponent } from './components/service-detail/service-detail.component';

@NgModule({
    declarations: [
        ServiceListComponent,
        ServiceFormComponent,
        ServiceDetailComponent
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        FormsModule,
        SharedModule,
        ServicesRoutingModule
    ],
    providers: [
        SlicePipe,
        DatePipe
    ]
})
export class ServicesModule { }
