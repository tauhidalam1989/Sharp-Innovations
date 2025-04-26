import { Component } from '@angular/core';
import { RoutingService } from '../../shared/services/routing.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ContactService } from '../../shared/services/contact.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent {
 contactForm: FormGroup;
  successMessage: string | undefined;
  errorMessage: string | undefined;
  translatedsubject: any;

  constructor(private fb: FormBuilder,private contactservice: ContactService,
    private translate: TranslateService
  ) {
    this.contactForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      subject: ['' ],
      message: [''],
      contactNumber:['', [Validators.required]],
      organization:['']
    });
    setTimeout(() => {
      this.isLoading = false; // Simulating a delay
    }, 1000);
  }
isLoading =true
  loading = false; // Spinner state
  success = false; // Green tick state
  onSubmit(): void {
    if (this.contactForm.valid) {
      this.loading = true; // Show spinner
      this.success = false;

      const formValue = this.contactForm.value;
      const payload = { ...formValue, subject: this.translatedsubject };

      this.contactservice.sendContactForm(payload).subscribe(
        () => {
          this.loading = false;
          this.success = true; // Show green tick
        this.contactForm.reset();
          setTimeout(() => {
            this.success = false; // Reset green tick after a few seconds
          }, 1000);
        },
        () => {
          this.loading = false;
        }
      );
    } 
  }
  onSubjectChange(event: Event) {
    const selectedValue = (event.target as HTMLSelectElement).value;

    let translationKey = '';
    switch (selectedValue) {
      case '1':
        translationKey = 'CONTACT-FORM.SUBJECT_SERVICES';
        break;
      case '6':
        translationKey = 'CONTACT-FORM.SUBJECT_MEDIA';
        break;
      case '2':
        translationKey = 'CONTACT-FORM.SUBJECT_BILLING';
        break;
      case '3':
        translationKey = 'CONTACT-FORM.SUBJECT_GENERAL';
        break;
      case '5':
        translationKey = 'CONTACT-FORM.SUBJECT_TECHNICAL';
        break;
      case '7':
        translationKey = 'CONTACT-FORM.SUBJECT_COMPLAINTS';
        break;
      default:
        translationKey = 'CONTACT-FORM.PLACEHOLDER_SUBJECT';
        break;
    }

    this.translate.get(translationKey).subscribe((translatedText: string) => {
    this.translatedsubject=translatedText;
    });
  }
}
