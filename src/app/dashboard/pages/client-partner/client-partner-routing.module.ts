import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientPartnerListComponent } from './components/client-partner-list/client-partner-list.component';
import { ClientPartnerFormComponent } from './components/client-partner-form/client-partner-form.component';

const routes: Routes = [
    { path: '', component: ClientPartnerListComponent },
    { path: 'clients/new', component: ClientPartnerFormComponent },
    { path: 'clients/edit/:id', component: ClientPartnerFormComponent },
    { path: 'partners/new', component: ClientPartnerFormComponent },
    { path: 'partners/edit/:id', component: ClientPartnerFormComponent },
    { path: 'certificates/new', component: ClientPartnerFormComponent },
    { path: 'certificates/edit/:id', component: ClientPartnerFormComponent },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ClientPartnerRoutingModule { }
