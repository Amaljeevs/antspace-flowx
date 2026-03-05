import { Routes } from '@angular/router';
import { AppShellComponent } from './app-shell.component';

export const APP_SHELL_ROUTES: Routes = [
  {
    path: '',
    component: AppShellComponent,
    children: [
      { path: 'home', loadComponent: () => import('../home/home.component').then((m) => m.HomeComponent) },
      { path: 'strategies', loadComponent: () => import('../strategies/strategies-list/strategies-list.component').then((m) => m.StrategiesListComponent) },
      { path: 'signals', loadComponent: () => import('../signals/signals.component').then((m) => m.SignalsComponent) },
      { path: 'broker', loadComponent: () => import('../broker/broker.component').then((m) => m.BrokerComponent) },
      { path: 'plans', loadComponent: () => import('../plans/plans.component').then((m) => m.PlansComponent) },
      { path: 'strategies/create', loadComponent: () => import('../strategies/strategy-form/strategy-form.component').then((m) => m.StrategyFormComponent) },
      { path: 'strategies/:id/edit', loadComponent: () => import('../strategies/strategy-form/strategy-form.component').then((m) => m.StrategyFormComponent) },
      { path: 'analytics', loadComponent: () => import('../analytics/analytics.component').then((m) => m.AnalyticsComponent) },
      { path: 'profile', loadComponent: () => import('../profile/profile.component').then((m) => m.ProfileComponent) },
      { path: '', redirectTo: 'home', pathMatch: 'full' },
    ],
  },
];
