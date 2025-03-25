import { Component } from '@angular/core';
import { RoutingService } from '../../shared/services/routing.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ContactService } from '../../shared/services/contact.service';

@Component({
  selector: 'contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent {
 contactForm: FormGroup;
  successMessage: string | undefined;
  errorMessage: string | undefined;

  constructor(private fb: FormBuilder,private contactservice: ContactService) {
    this.contactForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      //email: ['', [Validators.required, Validators.email]],
     // subject: ['', [Validators.required]],
      //message: ['', [Validators.required, Validators.minLength(10)]],
      contactNumber:['', [Validators.required]],
      //organization:['']
    });
  }


  onSubmit(): void {
    if (this.contactForm.valid) {
      const payload = this.contactForm.value;
      this.contactservice.sendContactForm(payload).subscribe(
        (response) => {
          this.successMessage = 'Your message has been sent successfully!';
          this.contactForm.reset();
        },
        (error) => {
          this.errorMessage = 'Something went wrong. Please try again later.';
        }
      );
    } else {
      this.errorMessage = 'Please fill out the form correctly.';
    }
  }
}
