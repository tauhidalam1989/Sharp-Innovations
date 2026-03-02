import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../../../core/services/auth.service';

@Component({
    selector: 'app-settings-page',
    templateUrl: './settings-page.component.html',
    styleUrls: ['./settings-page.component.scss']
})
export class SettingsPageComponent implements OnInit {
    passwordForm!: FormGroup;
    loading = false;
    successMessage = '';
    errorMessage = '';

    constructor(
        private fb: FormBuilder,
        private authService: AuthService
    ) { }

    ngOnInit(): void {
        this.passwordForm = this.fb.group({
            currentPassword: ['', Validators.required],
            newPassword: ['', [Validators.required, Validators.minLength(6)]],
            confirmPassword: ['', Validators.required]
        }, {
            validators: this.passwordMatchValidator
        });
    }

    passwordMatchValidator(g: FormGroup) {
        return g.get('newPassword')?.value === g.get('confirmPassword')?.value
            ? null : { mismatch: true };
    }

    onSubmit(): void {
        if (this.passwordForm.invalid) {
            return;
        }

        this.loading = true;
        this.successMessage = '';
        this.errorMessage = '';

        const { currentPassword, newPassword, confirmPassword } = this.passwordForm.value;

        this.authService.changePassword({ currentPassword, newPassword, confirmPassword })
            .subscribe({
                next: (res) => {
                    this.loading = false;
                    this.successMessage = 'Password changed successfully.';
                    this.passwordForm.reset();
                },
                error: (err) => {
                    this.loading = false;
                    this.errorMessage = err.message || 'Error changing password.';
                }
            });
    }
}
