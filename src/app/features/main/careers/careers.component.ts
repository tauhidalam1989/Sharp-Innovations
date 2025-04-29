import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ContactService } from '../../shared/services/contact.service';

@Component({
  selector: 'app-careers',
  templateUrl: './careers.component.html',
  styleUrls: ['./careers.component.scss']
})
export class CareersComponent {
  careerForm: FormGroup;
  selectedFile: File | null = null;

  constructor(private fb: FormBuilder, private http: HttpClient,private contactservice: ContactService) {
    this.careerForm = this.fb.group({
      name: ['', Validators.required],
      designation: ['', Validators.required],
    });
  }

  onFileChange(event: any): void {
    this.selectedFile = event.target.files[0];
  }

  onSubmit(): void {
    if (this.careerForm.valid && this.selectedFile) {
      const formData = new FormData();
      formData.append('name', this.careerForm.get('name')?.value);
      formData.append('designation', this.careerForm.get('designation')?.value);
      formData.append('file', this.selectedFile);

      this.contactservice.sendResume(formData).subscribe({
        next: () => alert('Submitted successfully'),
        error: (err: any) => console.error('Submission error:', err)
      });
    }
  }
}
