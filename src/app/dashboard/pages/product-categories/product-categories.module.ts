import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { ProductCategoriesComponent } from './product-categories.component';

const routes: Routes = [
    { path: '', component: ProductCategoriesComponent }
];

@NgModule({
    declarations: [ProductCategoriesComponent],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        ReactiveFormsModule,
        FormsModule
    ]
})
export class ProductCategoriesModule { }
