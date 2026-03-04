import { Component, ViewChild, OnInit } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { TranslateService } from '@ngx-translate/core';
import { ClientPartnerService } from '../../../core/services/client-partner.service';
import { Client, Partner } from '../../../core/models/client-partner.model';

@Component({
  selector: 'app-clients-page',
  templateUrl: './clients-page.component.html',
  styleUrls: ['./clients-page.component.scss']
})
export class ClientsPageComponent implements OnInit {
  @ViewChild('imageModal') imageModal: any;
  modalRef?: BsModalRef;
  selectedImage: string = '';
  rtl: boolean = false;

  clientLogos: string[] = [];
  partnerLogos: string[] = [];
  isocertificates: string[] = [
    'assets/isocert/1.jpg',
    'assets/isocert/2.jpg',
    'assets/isocert/3.jpg',
    'assets/isocert/4.jpg',
    'assets/isocert/5.jpg',
    'assets/isocert/6.jpg',
    'assets/isocert/7.jpg',
  ];

  clientOptions: any = {};
  partnerOptions: any = {};
  certificateOptions: any = {};

  constructor(
    private modalService: BsModalService,
    private translate: TranslateService,
    private clientPartnerService: ClientPartnerService
  ) { }

  ngOnInit() {
    // Initial language direction setup
    this.updateDirection(this.translate.currentLang);

    // Listen for language changes
    this.translate.onLangChange.subscribe((event) => {
      this.updateDirection(event.lang);
    });

    this.loadData();
  }

  loadData() {
    this.clientPartnerService.getClients('active').subscribe({
      next: (res) => {
        this.clientLogos = res.result.map(c => c.logo);
      },
      error: (err) => console.error('Error loading clients', err)
    });

    this.clientPartnerService.getPartners('active').subscribe({
      next: (res) => {
        this.partnerLogos = res.result.map(p => p.logo);
      },
      error: (err) => console.error('Error loading partners', err)
    });
  }

  updateDirection(lang: string) {
    this.rtl = lang === 'ar';

    this.clientOptions = {
      items: 4,
      dots: true,
      nav: false,
      loop: true,
      margin: 20,
      autoplay: true,
      touchDrag: true,
      autoplayTimeout: 2000,
      rtl: this.rtl,
      responsive: {
        0: { items: 2 },
        600: { items: 3 },
        1000: { items: 4 }
      }
    };

    this.partnerOptions = {
      ...this.clientOptions,
      autoplayTimeout: 3000
    };

    this.certificateOptions = {
      ...this.clientOptions,
      autoplayTimeout: 4000
    };
  }

  openModal(imageUrl: string) {
    this.selectedImage = imageUrl;
    this.modalRef = this.modalService.show(this.imageModal, {
      id: 1,
      class: 'modal-lg modal-dialog-centered',
      backdrop: 'static',
      keyboard: false
    });
  }

  closeModal() {
    this.modalRef?.hide();
  }
}
