import { Component, ViewChild } from '@angular/core';

import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-clients-page',
  templateUrl: './clients-page.component.html',
  styleUrls: ['./clients-page.component.scss']
})
export class ClientsPageComponent {
  @ViewChild('imageModal') imageModal: any;
  selectedImage: '' | any;
  constructor(private modalService: BsModalService) {}
  modalRef?: BsModalRef;
  openModal(imageUrl: string) {
    this.selectedImage = imageUrl;
    this.modalRef = this.modalService.show(this.imageModal, {
      id: 1,
      class: "modal-lg modal-dialog-centered",
      backdrop: "static",
      keyboard: false,
    });
    
  }

  closeModal() {
    this.modalRef?.hide();
  }
  clientLogos: string[] = [
    'assets/clients/2.jpg',
    'assets/clients/3.png',
    'assets/clients/4.jpg',
    'assets/clients/5.png',
    'assets/clients/6.jpg',
    'assets/clients/7.png',
    'assets/clients/8.png',
    'assets/clients/9.png',
    'assets/clients/10.png',
    'assets/clients/11.png',
    'assets/clients/12.jpeg',
    'assets/clients/13.png',
  ];

  partnerLogos: string[] = [
    'assets/partner/Cisco.png',
    'assets/partner/Dell.png',
    'assets/partner/HP.svg',
    'assets/partner/odoo_logo.png',
    'assets/partner/T.png',
    'assets/partner/O.png',
  ];

  isocertificates: string[] = [
    'assets/isocert/UAF_Americo-ISO_9001-0001.jpg',
    'assets/isocert/UAF_Americo-ISO_9001-0002.jpg',
    'assets/isocert/UAF_Americo-ISO_9001-0003.jpg',
    'assets/isocert/UAF_Americo-ISO_9001-0004.jpg',
    'assets/isocert/UAF_Americo-ISO_9001-0005.jpg',
    'assets/isocert/UAF_Americo-ISO_9001-0006.jpg',
    'assets/isocert/UAF_Americo-ISO_9001-0007.jpg',
    'assets/isocert/UAF_Americo-ISO_9001-0008.jpg',
  ];
  clientOptions = {
    items: 4,
    dots: true,
    nav: false,
    loop: true,
    margin: 20,
    autoplay: true,
    touchDrag: true,
    autoplayTimeout: 2000,
    responsive: {
      0: { items: 2 },
      600: { items: 3 },
      1000: { items: 4 }
    }
  };

  // Carousel options for partners
  partnerOptions = {
    items: 4,
    dots: true,
    nav: false,
    loop: true,
    margin: 20,
    autoplay: true,
    touchDrag: true,
    autoplayTimeout: 3000,
    responsive: {
      0: { items: 2 },
      600: { items: 3 },
      1000: { items: 4 }
    }
  };

  // Carousel options for certificates
  certificateOptions = {
    items: 4,
    dots: true,
    nav: false,
    loop: true,
    margin: 20,
    touchDrag: true,
    autoplay: true,
    autoplayTimeout: 4000,
    responsive: {
      0: { items: 2 },
      600: { items: 3 },
      1000: { items: 4 }
    }
  };
}
