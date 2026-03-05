import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./features/auth/auth.routes').then((m) => m.AUTH_ROUTES),
  },
  {
    path: 'app',
    canActivate: [authGuard],
    loadChildren: () => import('./features/app-shell/app-shell.routes').then((m) => m.APP_SHELL_ROUTES),
  },
  { path: '', redirectTo: 'app/home', pathMatch: 'full' },
  { path: '**', redirectTo: 'app/home' },
];
