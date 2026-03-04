import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ClientPartnerService } from '../../../../../core/services/client-partner.service';
import { ApiResponse } from '../../../../../core/models/client-partner.model';

@Component({
    selector: 'app-client-partner-form',
    templateUrl: './client-partner-form.component.html',
    styleUrls: ['./client-partner-form.component.scss']
})
export class ClientPartnerFormComponent implements OnInit {
    form: FormGroup;
    isEdit = false;
    id?: number;
    type: 'client' | 'partner' = 'client';
    loading = false;
    submitting = false;
    selectedFile?: File;
    imagePreview?: string;

    constructor(
        private fb: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private clientPartnerService: ClientPartnerService
    ) {
        this.form = this.fb.group({
            name: ['', Validators.required],
            isActive: [true],
            order: [0]
        });
    }

    ngOnInit(): void {
        const url = this.router.url;
        if (url.includes('/clients/')) {
            this.type = 'client';
        } else if (url.includes('/partners/')) {
            this.type = 'partner';
        }

        this.id = Number(this.route.snapshot.paramMap.get('id'));
        if (this.id) {
            this.isEdit = true;
            this.loadData();
        }
    }

    loadData(): void {
        this.loading = true;
        const obs = this.type === 'client'
            ? this.clientPartnerService.getClient(this.id!)
            : this.clientPartnerService.getPartner(this.id!);

        obs.subscribe({
            next: (res: ApiResponse<any>) => {
                const item = res.result;
                if (item) {
                    this.form.patchValue({
                        name: item.name,
                        isActive: item.isActive,
                        order: item.order
                    });
                    this.imagePreview = item.logo;
                }
                this.loading = false;
            },
            error: (err) => {
                console.error('Failed to load data', err);
                alert('Failed to load data');
                this.loading = false;
            }
        });
    }

    onFileSelected(event: any): void {
        const file = event.target.files[0];
        if (file) {
            this.selectedFile = file;
            const reader = new FileReader();
            reader.onload = () => {
                this.imagePreview = reader.result as string;
            };
            reader.readAsDataURL(file);
        }
    }

    onSubmit(): void {
        if (this.form.invalid || (!this.selectedFile && !this.isEdit)) {
            alert('Please fill all required fields and select a logo');
            return;
        }

        this.submitting = true;
        const formData = new FormData();
        formData.append('name', this.form.get('name')?.value);
        formData.append('isActive', this.form.get('isActive')?.value);
        formData.append('order', this.form.get('order')?.value);
        if (this.selectedFile) {
            formData.append('logo', this.selectedFile);
        }

        const obs = this.type === 'client'
            ? (this.isEdit ? this.clientPartnerService.updateClient(this.id!, formData) : this.clientPartnerService.createClient(formData))
            : (this.isEdit ? this.clientPartnerService.updatePartner(this.id!, formData) : this.clientPartnerService.createPartner(formData));

        obs.subscribe({
            next: () => {
                alert(`${this.type === 'client' ? 'Client' : 'Partner'} saved successfully`);
                this.router.navigate(['/dashboard/clients-partners']);
            },
            error: () => {
                alert('Failed to save');
                this.submitting = false;
            }
        });
    }
}
