import { Component, inject } from '@angular/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatExpansionModule } from '@angular/material/expansion';
import { FetchMessagesService } from '../../services/fetch-messages.service';
import { Subscription } from 'rxjs';
import { LocalMessageInterface } from '../../interfaces/message.interface';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackBarComponent } from '../../../shared/components/snack-bar/snack-bar.component';
import { DatePipe } from '@angular/common';
import { MarkAsReadService } from '../../services/mark-as-read.service';
import { MarkAsUnreadService } from '../../services/mark-as-unread.service';

@Component({
  selector: 'app-display-messages',
  standalone: true,
  imports: [MatCheckboxModule, MatExpansionModule, DatePipe],
  templateUrl: './display-messages.component.html',
  styleUrl: './display-messages.component.scss',
})
export class DisplayMessagesComponent {
  private messageRetrieveService = inject(FetchMessagesService);
  private messageRetrieveSubscription: Subscription = Subscription.EMPTY;
  private _matSnackBar = inject(MatSnackBar);
  private markAsReadService = inject(MarkAsReadService);
  private markAsReadSubscription: Subscription = Subscription.EMPTY;
  private markAsUnreadService = inject(MarkAsUnreadService);
  private markAsUnreadSubscription: Subscription = Subscription.EMPTY;

  messages: LocalMessageInterface[] = [];

  ngOnInit() {
    this.messageRetrieveSubscription = this.messageRetrieveService
      .fetchAllMessages(1)
      .subscribe({
        next: (data) => {
          const transformedMessages = data.messages.map((message_) => ({
            ...message_,
            check_status: message_.check_status === 1,
          }));

          this.messages = transformedMessages;
        },
        error: (error) => {
          console.error('Error fetching messages: ', error);
          this._matSnackBar.openFromComponent(SnackBarComponent, {
            duration: 5000,
            data: error.error,
          });
        },
      });
  }

  onCheck(completed: boolean, message_id: number) {
    if (completed) {
      this.markAsReadSubscription = this.markAsReadService
        .markAdRead(message_id)
        .subscribe({
          next: (data) => {
            this._matSnackBar.openFromComponent(SnackBarComponent, {
              duration: 5000,
              data: data,
            });
          },
          error: (error) => {
            console.error('Error marking message as read: ', error);
            this._matSnackBar.openFromComponent(SnackBarComponent, {
              duration: 5000,
              data: error.error,
            });
          },
        });
    } else {
      this.markAsUnreadSubscription = this.markAsUnreadService
        .markAsUnread(message_id)
        .subscribe({
          next: (data) => {
            this._matSnackBar.openFromComponent(SnackBarComponent, {
              duration: 5000,
              data: data,
            });
          },
          error: (error) => {
            console.error('Error marking message as unread: ', error);
            this._matSnackBar.openFromComponent(SnackBarComponent, {
              duration: 5000,
              data: error.error,
            });
          },
        });
    }
  }

  ngOnDestroy() {
    if (this.messageRetrieveSubscription) {
      this.messageRetrieveSubscription.unsubscribe();
    }
    if (this.markAsReadSubscription) {
      this.markAsReadSubscription.unsubscribe();
    }
    if (this.markAsUnreadSubscription) {
      this.markAsUnreadSubscription.unsubscribe();
    }
  }
}
