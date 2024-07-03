import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { GetUsersService } from '../../services/get-users.service';
import { Subscription } from 'rxjs';
import { AllUsersResponseInterface } from '../../interfaces/all_users.response.interface';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatTableModule } from '@angular/material/table';
import { UserInterface } from '../../interfaces/user.interface';
import { ProfileUpdateService } from '../../services/profile-update.service';
import { MatDialog } from '@angular/material/dialog';
import { YnDialogComponent } from '../../../shared/components/yn-dialog/yn-dialog.component';
import { DeleteAccountService } from '../../services/delete-account.service';
import { SnackBarComponent } from '../../../shared/components/snack-bar/snack-bar.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-display-users',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatIconModule,
    MatListModule,
    MatGridListModule,
    MatTableModule,
    RouterLink,
  ],
  templateUrl: './display-users.component.html',
  styleUrl: './display-users.component.scss',
})
export class DisplayUsersComponent {
  value = '';
  AllUsers: UserInterface[] = [];
  private userResponse: AllUsersResponseInterface = {
    users: [],
    status: '',
  };

  private httpSubscription: Subscription = Subscription.EMPTY;
  private deleteAccounthttpSubscription: Subscription = Subscription.EMPTY;
  private httpService = inject(GetUsersService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private profileService = inject(ProfileUpdateService);
  private dialog = inject(MatDialog);
  private deleteAccountService = inject(DeleteAccountService);
  private _snackBar = inject(MatSnackBar);

  ngOnInit() {
    let type = 0;
    const urlSegments = this.route.snapshot.url.map((segment) => segment.path);
    const userType = urlSegments[0];

    if (userType === 'archeologists') {
      type = 2;
    } else if (userType === 'general-public') {
      type = 1;
    } else if (userType === 'admin') {
      type = 3;
    }

    this.httpSubscription = this.httpService.getUsers(type).subscribe({
      next: (response) => {
        this.userResponse = response;
        this.AllUsers = this.userResponse.users;
      },
      error: (error) => {
        console.error(error);
      },
    });
  }

  deleteProfile(event: Event, user_id: number, user_name: string) {
    console.log(event);
    event.stopPropagation();
    const dialogRef = this.dialog.open(YnDialogComponent, {
      width: '350px',
      enterAnimationDuration: '200ms',
      exitAnimationDuration: '200ms',
      data: {
        name: user_name,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(result);
      if (result === 'yes') {
        this.deleteAccounthttpSubscription = this.deleteAccountService
          .deleteUser(user_id)
          .subscribe({
            next: (response) => {
              // console.log(response);
              this._snackBar.openFromComponent(SnackBarComponent, {
                duration: 5000,
                data: response,
              });
              this.ngOnInit();
            },
            error: (error) => {
              console.error(error);
              this._snackBar.openFromComponent(SnackBarComponent, {
                duration: 5000,
                data: error.error,
              });
            },
          });
      }
    });
  }

  clicked() {
    console.log('clicked');
  }

  viewProfile(user: UserInterface) {
    this.profileService.setProfile(user);
    this.router.navigate(['/dashboard', 'user', 'view']);
  }

  updateProfile(profile: UserInterface) {
    this.profileService.setProfile(profile);
    this.router.navigate(['/dashboard', 'user', 'update']);
  }

  performSearch($event: string) {
    this.AllUsers = this.userResponse.users.filter(
      (user) =>
        (user.fname &&
          user.fname.toLowerCase().includes($event.toLowerCase())) ||
        (user.lname &&
          user.lname.toLowerCase().includes($event.toLowerCase())) ||
        (user.email && user.email.toLowerCase().includes($event.toLowerCase()))
    );
  }

  ngOnDestroy() {
    if (this.httpSubscription) {
      this.httpSubscription.unsubscribe();
    }
    if (this.deleteAccounthttpSubscription) {
      this.deleteAccounthttpSubscription.unsubscribe();
    }
  }
}
