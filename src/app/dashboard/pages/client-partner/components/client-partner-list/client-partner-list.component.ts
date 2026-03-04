import { Component, OnInit } from '@angular/core';
import { ClientPartnerService } from '../../../../../core/services/client-partner.service';
import { Client, Partner, ApiResponse } from '../../../../../core/models/client-partner.model';
import { Router } from '@angular/router';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

@Component({
    selector: 'app-client-partner-list',
    templateUrl: './client-partner-list.component.html',
    styleUrls: ['./client-partner-list.component.scss']
})
export class ClientPartnerListComponent implements OnInit {
    clients: Client[] = [];
    partners: Partner[] = [];
    loadingClients = false;
    loadingPartners = false;
    error = '';

    modalRef?: BsModalRef;
    deleteId?: number;
    deleteType?: 'client' | 'partner';

    constructor(
        private clientPartnerService: ClientPartnerService,
        private router: Router,
        private modalService: BsModalService
    ) { }

    ngOnInit(): void {
        console.log('ClientPartnerListComponent initialized');
        this.loadData();
    }

    loadData(): void {
        this.loadClients();
        this.loadPartners();
    }

    loadClients(): void {
        this.loadingClients = true;
        this.clientPartnerService.getClients().subscribe({
            next: (res: ApiResponse<Client[]>) => {
                this.clients = res.result;
                this.loadingClients = false;
            },
            error: (err: any) => {
                this.error = 'Failed to load clients';
                this.loadingClients = false;
            }
        });
    }

    loadPartners(): void {
        this.loadingPartners = true;
        this.clientPartnerService.getPartners().subscribe({
            next: (res: ApiResponse<Partner[]>) => {
                this.partners = res.result;
                this.loadingPartners = false;
            },
            error: (err: any) => {
                this.error = 'Failed to load partners';
                this.loadingPartners = false;
            }
        });
    }

    openConfirmModal(template: any, id: number, type: 'client' | 'partner'): void {
        this.deleteId = id;
        this.deleteType = type;
        this.modalRef = this.modalService.show(template, { class: 'modal-sm' });
    }

    confirmDelete(): void {
        if (!this.deleteId || !this.deleteType) return;

        const id = this.deleteId;
        const type = this.deleteType;

        console.log(`Confirming delete for ${type} with id: ${id}`);

        if (type === 'client') {
            this.clientPartnerService.deleteClient(id).subscribe({
                next: () => {
                    console.log('Client deleted successfully');
                    this.loadClients();
                    this.modalRef?.hide();
                },
                error: (err) => {
                    console.error('Failed to delete client', err);
                    alert('Failed to delete client');
                    this.modalRef?.hide();
                }
            });
        } else {
            this.clientPartnerService.deletePartner(id).subscribe({
                next: () => {
                    console.log('Partner deleted successfully');
                    this.loadPartners();
                    this.modalRef?.hide();
                },
                error: (err) => {
                    console.error('Failed to delete partner', err);
                    alert('Failed to delete partner');
                    this.modalRef?.hide();
                }
            });
        }
    }

    declineDelete(): void {
        this.modalRef?.hide();
    }

    deleteClient(id: number): void {
        // Kept for backward compatibility or direct call if needed
        this.clientPartnerService.deleteClient(id).subscribe({
            next: () => this.loadClients(),
            error: (err) => alert('Failed to delete client')
        });
    }

    deletePartner(id: number): void {
        // Kept for backward compatibility or direct call if needed
        this.clientPartnerService.deletePartner(id).subscribe({
            next: () => this.loadPartners(),
            error: (err) => alert('Failed to delete partner')
        });
    }

    editClient(id: number): void {
        this.router.navigate(['/dashboard/clients-partners/clients/edit', id]);
    }

    editPartner(id: number): void {
        this.router.navigate(['/dashboard/clients-partners/partners/edit', id]);
    }
}
