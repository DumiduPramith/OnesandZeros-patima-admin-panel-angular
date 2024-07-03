import { Injectable } from '@angular/core';
import { UserInterface } from '../interfaces/user.interface';

@Injectable({
  providedIn: 'root',
})
export class ProfileUpdateService {
  private profile: UserInterface | null = null;

  setProfile(profile: UserInterface): void {
    this.profile = profile;
  }

  getProfile(): UserInterface | null {
    return this.profile;
  }
}
