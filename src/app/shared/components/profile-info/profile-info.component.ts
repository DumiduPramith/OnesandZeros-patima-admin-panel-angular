import { GetUserPredictionsService } from './../../../features/services/get-user-predictions.service';
import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { ProfileUpdateService } from '../../../features/services/profile-update.service';
import { CommonModule } from '@angular/common';
import { UserInterface } from '../../../features/interfaces/user.interface';
import { BackBtnComponent } from '../back-btn/back-btn.component';
import { PredictionCardComponent } from '../prediction-card/prediction-card.component';
import { Subscription } from 'rxjs';
import { PredictionInterface } from '../../../features/interfaces/predictions.interface';

@Component({
  selector: 'app-profile-info',
  standalone: true,
  imports: [
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    CommonModule,
    BackBtnComponent,
    PredictionCardComponent,
  ],
  templateUrl: './profile-info.component.html',
  styleUrl: './profile-info.component.scss',
})
export class ProfileInfoComponent {
  private profileService = inject(ProfileUpdateService);

  private predictionsService = inject(GetUserPredictionsService);
  private predictionServiceSubscription: Subscription = Subscription.EMPTY;

  profile: UserInterface | null = {
    user_id: 0,
    email: '',
    fname: '',
    lname: '',
    profile_picture: '',
    activation_status: 0,
    is_admin: 0,
    archeologist_id: 0,
    role: 0,
  };

  prediction_: PredictionInterface[] = [];

  ngOnInit() {
    this.profile = this.profileService.getProfile();
    if (this.profile) {
      this.predictionServiceSubscription = this.predictionsService
        .retrievePredictions(this.profile.user_id, 1)
        .subscribe({
          next: (data) => {
            this.prediction_ = data.predictions;
          },
          error: (error) => {
            console.error('Error fetching feedbacks: ', error);
          },
        });
    }
  }

  ngOnDestroy() {
    if (this.predictionServiceSubscription) {
      this.predictionServiceSubscription.unsubscribe();
    }
  }
}
