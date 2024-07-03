import { Routes } from '@angular/router';
import { LoginComponent } from './features/auth/login/login.component';
import { authGuard } from './core/guard/auth.guard';
import { DashboardComponent } from './core/components/dashboard/dashboard.component';
import { dashboard_routes } from './core/routes/dashboard.routes';
import { loginGuard } from './core/guard/login.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [loginGuard],
  },
  {
    path: 'dashboard',
    canActivate: [authGuard],
    component: DashboardComponent,
    children: dashboard_routes,
  },
];
