import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { LoginService } from '../services/login.service';
import { LoginInterface } from '../interfaces/login.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  serverError!: string;
  constructor(
    private fb: FormBuilder,
    private loginService: LoginService,
    private router: Router
  ) {}

  onSubmit(): void {
    if (this.loginForm.valid) {
      const email_control = this.loginForm.get('email');
      const password_control = this.loginForm.get('password');

      if (
        email_control &&
        password_control &&
        email_control.value &&
        password_control.value
      ) {
        const login_values: LoginInterface = {
          email: email_control.value,
          password: password_control.value,
          role: 3,
        };
        this.loginService.submitLogin(login_values).subscribe({
          next: (response) => {
            localStorage.setItem('token', response.token.access);
            this.router.navigate(['/dashboard']);
          },
          error: (error) => {
            console.error(error);
            if (error.error instanceof ErrorEvent) {
              // frontend error
            } else {
              // backend error
              this.serverError = error.error.message;
            }
          },
        });
      }
    }
  }
}
