import { Component, Input, inject, input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { FeedbackInterface } from '../../../features/interfaces/feedback.interface';
import { DatePipe } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { UserInterface } from '../../../features/interfaces/user.interface';
import { ProfileUpdateService } from '../../../features/services/profile-update.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-feedback-card',
  standalone: true,
  imports: [MatCardModule, MatIconModule, DatePipe],
  templateUrl: './feedback-card.component.html',
  styleUrl: './feedback-card.component.scss',
})
export class FeedbackCardComponent {
  @Input() feedback: FeedbackInterface = {
    feedback_id: 10,
    text: 'string',
    rating: 10,
    archeologist_user_id: 1,
    image_id: 15,
    created_at: 'string',
    input_image_path: 'string',
    predicted_image_path: 'string',
    user_id: 1,
    email: '',
    fname: '',
    lname: '',
    profile_picture: '',
    activation_status: 0,
    is_admin: 0,
    role: 0,
    archeologist_id: 0,
  };

  private router = inject(Router);
  private profileService = inject(ProfileUpdateService);

  viewProfile(feedback: FeedbackInterface) {
    const user: UserInterface = {
      user_id: feedback.archeologist_user_id,
      email: feedback.email,
      fname: feedback.fname,
      lname: feedback.lname,
      profile_picture: feedback.profile_picture,
      activation_status: feedback.activation_status,
      is_admin: feedback.is_admin,
      role: feedback.role,
      archeologist_id: feedback.archeologist_id,
    };

    this.profileService.setProfile(user);
    this.router.navigate(['/dashboard', 'user', 'view']);
  }
}
