import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
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
    type: 'client' | 'partner' | 'certificate' = 'client';
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
        } else if (url.includes('/certificates/')) {
            this.type = 'certificate';
        }

        this.id = Number(this.route.snapshot.paramMap.get('id'));
        if (this.id) {
            this.isEdit = true;
            this.loadData();
        }
    }

    loadData(): void {
        this.loading = true;
        const obs: Observable<ApiResponse<any>> = this.type === 'client'
            ? this.clientPartnerService.getClient(this.id!)
            : this.type === 'partner'
                ? this.clientPartnerService.getPartner(this.id!)
                : this.clientPartnerService.getCertificate(this.id!);

        obs.subscribe({
            next: (res: ApiResponse<any>) => {
                const item = res.result;
                if (item) {
                    this.form.patchValue({
                        name: item.name,
                        isActive: item.isActive,
                        order: item.order
                    });
                    this.imagePreview = this.type === 'certificate' ? item.image : item.logo;
                }
                this.loading = false;
            },
            error: (err: any) => {
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
            formData.append(this.type === 'certificate' ? 'certificate' : 'logo', this.selectedFile);
        }

        const obs: Observable<ApiResponse<any>> = this.type === 'client'
            ? (this.isEdit ? this.clientPartnerService.updateClient(this.id!, formData) : this.clientPartnerService.createClient(formData))
            : this.type === 'partner'
                ? (this.isEdit ? this.clientPartnerService.updatePartner(this.id!, formData) : this.clientPartnerService.createPartner(formData))
                : (this.isEdit ? this.clientPartnerService.updateCertificate(this.id!, formData) : this.clientPartnerService.createCertificate(formData));

        obs.subscribe({
            next: () => {
                const typeLabel = this.type === 'client' ? 'Client' : this.type === 'partner' ? 'Partner' : 'Certificate';
                alert(`${typeLabel} saved successfully`);
                this.router.navigate(['/dashboard/clients-partners']);
            },
            error: (err: any) => {
                console.error('Failed to save', err);
                alert('Failed to save');
                this.submitting = false;
            }
        });
    }
}
