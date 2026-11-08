import { Routes } from '@angular/router';
import { authGuard, guestGuard } from './auth.guard';
import { ShellComponent } from './shell.component';
import { LoginComponent } from './login.component';
import { DashboardComponent } from './dashboard.component';
import { PlaceholderComponent } from './placeholder.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent, canActivate: [guestGuard] },
  {
    path: '', component: ShellComponent, canActivate: [authGuard],
    children: [
      { path: 'dashboard', component: DashboardComponent, title: 'Dashboard' },
      { path: 'sources', component: PlaceholderComponent, data: { title: 'Source Management' } },
      { path: 'statistics', component: PlaceholderComponent, data: { title: 'Source Statistics' } },
      { path: 'settings', component: PlaceholderComponent, data: { title: 'Settings' } },
      { path: 'profile', component: PlaceholderComponent, data: { title: 'Profile' } },
      { path: '', pathMatch: 'full', redirectTo: 'dashboard' },
    ],
  },
  { path: '**', redirectTo: 'dashboard' },
];
