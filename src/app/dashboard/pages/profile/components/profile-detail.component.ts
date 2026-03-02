import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../../core/services/auth.service';

@Component({
  selector: 'app-profile-detail',
  templateUrl: './profile-detail.component.html',
  styleUrls: ['./profile-detail.component.scss']
})
export class ProfileDetailComponent implements OnInit {
  profileData: any = null;
  loading: boolean = true;
  error: string = '';

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.loadProfile();
  }

  loadProfile(): void {
    this.loading = true;
    this.error = '';

    this.authService.getProfile().subscribe({
      next: (res: any) => {
        if (res.success && res.result) {
          this.profileData = res.result;
        }
        this.loading = false;
      },
      error: (err: any) => {
        this.error = 'Failed to load profile data';
        this.loading = false;
        console.error(err);
      }
    });
  }
}
