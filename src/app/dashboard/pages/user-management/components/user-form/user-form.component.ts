import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../../../../core/services/user.service';
import { User } from '../../../../../core/models/auth.model';

@Component({
    selector: 'app-user-form',
    templateUrl: './user-form.component.html',
    styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit {
    userForm: FormGroup;
    isEditMode = false;
    userId: number | null = null;
    loading = false;
    submitting = false;
    error = '';
    success = '';

    roles = [
        { value: 'admin', label: 'Admin' },
        { value: 'editor', label: 'Editor' },
        { value: 'viewer', label: 'Viewer' },
        { value: 'super_admin', label: 'Super Admin' }
    ];

    constructor(
        private fb: FormBuilder,
        private userService: UserService,
        private route: ActivatedRoute,
        private router: Router
    ) {
        this.userForm = this.fb.group({
            name: ['', [Validators.required, Validators.maxLength(100)]],
            email: ['', [Validators.required, Validators.email, Validators.maxLength(100)]],
            password: ['', [Validators.required, Validators.minLength(6)]],
            role: ['viewer', Validators.required],
            phone: ['', Validators.maxLength(20)],
            isActive: [true]
        });
    }

    ngOnInit(): void {
        const id = this.route.snapshot.paramMap.get('id');
        if (id) {
            this.isEditMode = true;
            this.userId = +id;
            this.userForm.get('password')?.clearValidators();
            this.userForm.get('password')?.updateValueAndValidity();
            this.loadUserDetails();
        }
    }

    loadUserDetails(): void {
        if (!this.userId) return;
        this.loading = true;
        this.userService.getUserById(this.userId).subscribe({
            next: (response) => {
                if (response.success && response.data) {
                    const user = response.data as User;
                    this.userForm.patchValue({
                        name: user.name,
                        email: user.email,
                        role: user.role,
                        phone: user.phone || '',
                        isActive: user.isActive ?? true
                    });
                }
                this.loading = false;
            },
            error: (error) => {
                console.error('Error loading user details:', error);
                this.error = 'Failed to load user details';
                this.loading = false;
            }
        });
    }

    onSubmit(): void {
        if (this.userForm.invalid) {
            this.userForm.markAllAsTouched();
            return;
        }

        this.submitting = true;
        this.error = '';

        const userData = this.userForm.value;
        if (this.isEditMode) {
            if (!userData.password) {
                delete userData.password;
            }
            this.userService.updateUser(this.userId!, userData).subscribe({
                next: (response) => {
                    this.submitting = false;
                    if (response.success) {
                        this.router.navigate(['/dashboard/users']);
                    } else {
                        this.error = response.message;
                    }
                },
                error: (err) => {
                    this.submitting = false;
                    this.error = err.error?.message || 'Error updating user';
                }
            });
        } else {
            this.userService.createUser(userData).subscribe({
                next: (response) => {
                    this.submitting = false;
                    if (response.success) {
                        this.router.navigate(['/dashboard/users']);
                    } else {
                        this.error = response.message;
                    }
                },
                error: (err) => {
                    this.submitting = false;
                    this.error = err.error?.message || 'Error creating user';
                }
            });
        }
    }

    onCancel(): void {
        this.router.navigate(['/dashboard/users']);
    }
}
