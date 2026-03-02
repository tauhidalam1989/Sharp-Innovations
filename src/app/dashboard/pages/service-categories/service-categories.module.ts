import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { ServiceCategoriesComponent } from './service-categories.component';

const routes: Routes = [
    { path: '', component: ServiceCategoriesComponent }
];

@NgModule({
    declarations: [ServiceCategoriesComponent],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        ReactiveFormsModule,
        FormsModule
    ]
})
export class ServiceCategoriesModule { }
