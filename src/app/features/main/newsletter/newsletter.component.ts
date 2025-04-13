import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ContactService } from '../../shared/services/contact.service';

@Component({
  selector: 'newsletter',
  templateUrl: './newsletter.component.html',
  styleUrls: ['./newsletter.component.scss']
})
export class NewsletterComponent {
  newsletterForm: FormGroup;
  @Input() isHome: boolean = false;

  constructor(private fb: FormBuilder, private contactService: ContactService) {
    this.newsletterForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }

  onSubmit(): void {
    if (this.newsletterForm.valid) {
      // Get the email from the form control
      const email = this.newsletterForm.value.email;

      // Call the newsletter service to send the subscription request
      this.contactService.newsletter({ email })
        .subscribe(
          (response) => {
            // Handle success response
           // alert('Thank you for subscribing to our newsletter!');
            this.newsletterForm.reset(); // Reset form
          },
          (error) => {
            // Handle error response
            //alert('An error occurred while subscribing. Please try again.');
          }
        );
    } else {
      //alert('Please enter a valid email.');
    }
  }
}
