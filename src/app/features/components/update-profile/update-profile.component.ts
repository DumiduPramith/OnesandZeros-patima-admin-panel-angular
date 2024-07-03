import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BackBtnComponent } from '../../../shared/components/back-btn/back-btn.component';
import { ProfileUpdateService } from '../../services/profile-update.service';
import { ProfileUpdateRequestService } from '../../services/profile-update-request.service';
import { Subscription } from 'rxjs';
import { SnackBarComponent } from '../../../shared/components/snack-bar/snack-bar.component';
import { Location } from '@angular/common';

@Component({
  selector: 'app-update-profile',
  standalone: true,
  imports: [
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatCheckboxModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    BackBtnComponent,
  ],
  templateUrl: './update-profile.component.html',
  styleUrl: './update-profile.component.scss',
})
export class UpdateProfileComponent {
  profileForm!: FormGroup;

  private fb = inject(FormBuilder);
  private profileService = inject(ProfileUpdateService);
  private updateRequestService = inject(ProfileUpdateRequestService);
  private _snackBar = inject(MatSnackBar);
  private updateSubscription: Subscription = Subscription.EMPTY;
  private location = inject(Location);

  errorMessage: string = '';
  private snackBarDuration = 5;

  ngOnInit(): void {
    this.profileForm = this.fb.group({
      user_id: [{ value: '', disabled: true }],
      email: ['', [Validators.required, Validators.email]],
      fname: ['', Validators.required],
      lname: [''],
      profile_picture: [''],
      archeologist_id: [''],
      role: [''],
      password: [''],
      is_admin: [false],
      activation_status: [false],
    });

    let profile = this.profileService.getProfile();
    if (profile !== null) {
      this.profileForm.patchValue(profile);
    }
  }

  onSubmit(): void {
    if (this.profileForm.valid) {
      // Handle the form submission, e.g., make an HTTP request to update the profile
      if (this.profileForm.get('is_admin')?.value === true) {
        this.profileForm.get('is_admin')?.setValue(1);
      } else if (this.profileForm.get('is_admin')?.value === false) {
        this.profileForm.get('is_admin')?.setValue(0);
      }
      if (this.profileForm.get('activation_status')?.value === true) {
        this.profileForm.get('activation_status')?.setValue(1);
      } else if (this.profileForm.get('activation_status')?.value === false) {
        this.profileForm.get('activation_status')?.setValue(0);
      }

      // console.log(this.profileForm.value);
      const form_data = this.profileForm.getRawValue();
      this.updateSubscription = this.updateRequestService
        .updateProfileRequest(form_data)
        .subscribe({
          next: (data) => {
            this._snackBar.openFromComponent(SnackBarComponent, {
              duration: this.snackBarDuration * 1000,
              data: data,
            });
            this.location.back();
          },
          error: (error) => {
            this.errorMessage = error.error;
            this._snackBar.openFromComponent(SnackBarComponent, {
              duration: this.snackBarDuration * 1000,
              data: this.errorMessage,
            });
          },
        });
    }
  }

  ngOnDestroy() {
    if (this.updateSubscription) {
      this.updateSubscription.unsubscribe();
    }
  }
}
