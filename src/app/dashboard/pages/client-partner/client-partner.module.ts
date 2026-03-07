import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';
import { ClientPartnerRoutingModule } from './client-partner-routing.module';
import { ClientPartnerListComponent } from './components/client-partner-list/client-partner-list.component';
import { ClientPartnerFormComponent } from './components/client-partner-form/client-partner-form.component';

@NgModule({
    declarations: [
        ClientPartnerListComponent,
        ClientPartnerFormComponent
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        FormsModule,
        SharedModule,
        ClientPartnerRoutingModule
    ]
})
export class ClientPartnerModule { }
