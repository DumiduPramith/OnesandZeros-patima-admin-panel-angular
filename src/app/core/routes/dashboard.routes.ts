import { Routes } from '@angular/router';
import { WelcomeMessageComponent } from '../components/welcome-message/welcome-message.component';
import { DisplayUsersComponent } from '../../features/components/display-users/display-users.component';
import { UpdateProfileComponent } from '../../features/components/update-profile/update-profile.component';
import { restrictGuard } from '../guard/restrict.guard';
import { ProfileInfoComponent } from '../../shared/components/profile-info/profile-info.component';
import { DisplayMessagesComponent } from '../../features/components/display-messages/display-messages.component';
import { FeedbackListComponent } from '../../features/components/feedback-list/feedback-list.component';

export const dashboard_routes: Routes = [
  {
    path: '',
    component: WelcomeMessageComponent,
  },
  {
    path: 'general-public/all',
    component: DisplayUsersComponent,
  },
  {
    path: 'archeologists/all',
    component: DisplayUsersComponent,
  },
  {
    path: 'admin/all',
    component: DisplayUsersComponent,
  },
  {
    path: 'user/update',
    component: UpdateProfileComponent,
    canActivate: [restrictGuard],
  },
  {
    path: 'user/view',
    component: ProfileInfoComponent,
    canActivate: [restrictGuard],
  },
  {
    path: 'messages/all',
    component: DisplayMessagesComponent,
  },
  {
    path: 'feedback/all',
    component: FeedbackListComponent,
  },
];
