import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductService } from '../products/products/product.service';
import { ProductCategory } from '../products/products/product.model';

@Component({
    selector: 'app-product-categories',
    templateUrl: './product-categories.component.html',
    styleUrls: ['./product-categories.component.scss']
})
export class ProductCategoriesComponent implements OnInit {
    categories: ProductCategory[] = [];
    loading = false;
    error = '';

    showForm = false;
    editingId: number | null = null;
    categoryForm: FormGroup;
    submitting = false;

    constructor(
        private fb: FormBuilder,
        private productService: ProductService
    ) {
        this.categoryForm = this.fb.group({
            name: ['', Validators.required],
            nameAr: [''],
            slug: ['', Validators.required],
            order: [0],
            isActive: [true]
        });
    }

    ngOnInit(): void {
        this.loadCategories();
    }

    loadCategories(): void {
        this.loading = true;
        this.productService.getCategories().subscribe({
            next: (res) => {
                if (res.success && res.result) {
                    this.categories = Array.isArray(res.result) ? res.result : [res.result];
                } else {
                    this.error = res.message || 'Failed to load categories';
                }
                this.loading = false;
            },
            error: (err) => {
                console.error('Error loading categories:', err);
                this.error = err.error?.message || 'Failed to load categories';
                this.loading = false;
            }
        });
    }

    openCreateForm(): void {
        this.editingId = null;
        this.categoryForm.reset({ order: 0, isActive: true });
        this.showForm = true;
    }

    openEditForm(category: ProductCategory): void {
        this.editingId = category.id;
        this.categoryForm.patchValue({
            name: category.name,
            nameAr: category.nameAr,
            slug: category.slug,
            order: category.order,
            isActive: category.isActive
        });
        this.showForm = true;
    }

    closeForm(): void {
        this.showForm = false;
        this.editingId = null;
        this.categoryForm.reset();
    }

    onSubmit(): void {
        if (this.categoryForm.invalid) return;

        this.submitting = true;
        const data = this.categoryForm.value;

        if (this.editingId) {
            this.productService.updateCategory(this.editingId, data).subscribe({
                next: (res) => {
                    this.submitting = false;
                    if (res.success) {
                        this.closeForm();
                        this.loadCategories();
                    } else {
                        alert(res.message || 'Failed to update');
                    }
                },
                error: (err) => {
                    this.submitting = false;
                    alert(err.error?.message || 'Update failed');
                }
            });
        } else {
            this.productService.createCategory(data).subscribe({
                next: (res) => {
                    this.submitting = false;
                    if (res.success) {
                        this.closeForm();
                        this.loadCategories();
                    } else {
                        alert(res.message || 'Failed to create');
                    }
                },
                error: (err) => {
                    this.submitting = false;
                    alert(err.error?.message || 'Creation failed');
                }
            });
        }
    }

    deleteCategory(id: number): void {
        if (confirm('Are you sure you want to delete this category?')) {
            this.productService.deleteCategory(id).subscribe({
                next: (res) => {
                    if (res.success) {
                        this.loadCategories();
                    } else {
                        alert(res.message || 'Failed to delete');
                    }
                },
                error: (err) => {
                    alert(err.error?.message || 'Failed to delete');
                }
            });
        }
    }
}
