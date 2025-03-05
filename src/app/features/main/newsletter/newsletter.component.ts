import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'newsletter',
  templateUrl: './newsletter.component.html',
  styleUrls: ['./newsletter.component.scss']
})
export class NewsletterComponent {
  newsletterForm: FormGroup;
 @Input() isHome: boolean = false;
  constructor(private fb: FormBuilder) {
    this.newsletterForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }

  onSubmit(): void {
    if (this.newsletterForm.valid) {
      console.log('Newsletter Subscription:', this.newsletterForm.value);
      alert('Thank you for subscribing to our newsletter!');
      this.newsletterForm.reset();
    }
  }
}
