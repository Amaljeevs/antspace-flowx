import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { ThemeService } from '../../../core/services/theme.service';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-topbar',
  standalone: true,
  template: `
    <header class="h-16 px-6 border-b border-slate-200 dark:border-[#374151] bg-white/80 dark:bg-[#111827]/80 backdrop-blur flex items-center justify-between">
      <div class="hidden md:inline-flex items-center rounded-full border border-slate-200 dark:border-slate-700 px-3 py-1 text-xs text-slate-500 dark:text-slate-300">
        Flowx Workspace
      </div>
      <div class="flex items-center gap-3">
        @if (environment.backendMode === 'real') {
          <span class="text-xs text-amber-500">Real backend not configured yet</span>
        }
        <button
          type="button"
          class="rounded-lg border border-slate-300 dark:border-[#374151] px-3 py-1.5 text-sm hover:bg-slate-100 dark:hover:bg-slate-800"
          (click)="theme.toggle()"
        >
          {{ theme.current === 'light' ? 'Dark' : 'Light' }}
        </button>
        <div class="relative">
          <button
            type="button"
            class="rounded-lg bg-slate-100 dark:bg-slate-800 px-3 py-1.5 text-sm"
            (click)="menuOpen = !menuOpen"
          >
            {{ user?.name ?? 'Account' }}
          </button>
          @if (menuOpen) {
            <div class="absolute right-0 mt-2 min-w-44 rounded-xl border border-slate-200 dark:border-[#374151] bg-white dark:bg-[#111827] shadow-xl p-1 z-20">
              <button type="button" class="w-full text-left px-3 py-2 rounded-lg text-sm hover:bg-slate-100 dark:hover:bg-slate-800" (click)="goProfile()">
                My Profile
              </button>
              <button type="button" class="w-full text-left px-3 py-2 rounded-lg text-sm hover:bg-slate-100 dark:hover:bg-slate-800" (click)="goPlans()">
                Plans & Pricing
              </button>
              <button type="button" class="w-full text-left px-3 py-2 rounded-lg text-sm hover:bg-slate-100 dark:hover:bg-slate-800 text-red-500" (click)="logout()">
                Logout
              </button>
            </div>
          }
        </div>
      </div>
    </header>
  `,
})
export class TopbarComponent {
  private auth = inject(AuthService);
  private router = inject(Router);
  theme = inject(ThemeService);

  menuOpen = false;
  user = this.auth.getCurrentUser();
  environment = environment;

  logout(): void {
    this.auth.logout();
    this.menuOpen = false;
    this.router.navigate(['/auth/login']);
  }

  goProfile(): void {
    this.menuOpen = false;
    this.router.navigate(['/app/profile']);
  }

  goPlans(): void {
    this.menuOpen = false;
    this.router.navigate(['/app/plans']);
  }
}
