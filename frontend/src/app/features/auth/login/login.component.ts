import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../core/services/auth.service';
import { ThemeService } from '../../../core/services/theme.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, FormsModule],
  template: `
    <div class="relative min-h-screen bg-[#F9FAFB] dark:bg-[#111827] flex items-center justify-center p-6 overflow-hidden">
      <div class="pointer-events-none absolute inset-0">
        <div class="absolute -top-28 -left-24 w-80 h-80 rounded-full bg-blue-500/15 blur-3xl dark:bg-blue-400/10"></div>
        <div class="absolute -bottom-24 -right-24 w-96 h-96 rounded-full bg-indigo-500/10 blur-3xl dark:bg-indigo-400/10"></div>
        <div class="absolute top-20 right-16 w-40 h-40 rounded-[2.5rem] rotate-12 bg-white/60 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 shadow-2xl"></div>
        <div class="absolute bottom-16 left-14 w-28 h-28 rounded-[1.5rem] -rotate-12 bg-white/70 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 shadow-xl"></div>
        <div class="absolute inset-x-0 top-1/2 -translate-y-1/2 mx-auto w-[520px] h-[520px] rounded-full border border-blue-200/60 dark:border-blue-900/40"></div>
      </div>
      <section class="relative z-10 w-full max-w-md">
        <button
          type="button"
          class="absolute -top-2 -right-2 w-9 h-9 rounded-full border border-slate-300 dark:border-[#374151] bg-white/90 dark:bg-slate-900/90 hover:bg-slate-100 dark:hover:bg-slate-800 shadow flex items-center justify-center"
          (click)="theme.toggle()"
          aria-label="Toggle theme"
        >
          <svg viewBox="0 0 24 24" class="w-4 h-4 text-slate-600 dark:text-slate-200" fill="none" stroke="currentColor" stroke-width="1.8">
            <path d="M12 3v2.2M12 18.8V21M5.64 5.64l1.55 1.55M16.81 16.81l1.55 1.55M3 12h2.2M18.8 12H21M5.64 18.36l1.55-1.55M16.81 7.19l1.55-1.55" />
            <circle cx="12" cy="12" r="3.5" />
          </svg>
        </button>
        <div class="rounded-2xl border border-slate-200 dark:border-[#374151] bg-white dark:bg-[#111827] shadow-xl p-7 md:p-8">
          <div class="mb-6">
            <p class="font-phonk text-3xl leading-none text-[#0A1A5F] dark:text-blue-300">Flowx</p>
            <p class="text-xs text-slate-500 dark:text-slate-400 mt-1">powered by Antspace</p>
            <p class="text-sm text-slate-500 dark:text-slate-400 mt-4">Automate multi-asset trading workflows across stocks, derivatives, and global markets.</p>
            <p class="text-xs text-slate-400 dark:text-slate-500 mt-2">Design logic, connect brokers, and run rule-based execution with confidence.</p>
          </div>

          <h2 class="text-2xl font-bold mb-1">Log in to your account</h2>
          <p class="text-sm text-slate-500 dark:text-slate-400 mb-5">Enter your details</p>

          @if (error) {
            <p class="text-sm text-red-500 mb-3">{{ error }}</p>
          }

          <form (ngSubmit)="onSubmit()" class="space-y-4">
            <label for="email" class="block text-xs text-slate-500 dark:text-slate-400">
              Mobile / Email
              <input
                id="email"
                type="email"
                [(ngModel)]="email"
                name="email"
                required
                autocomplete="email"
                class="mt-1 w-full rounded-lg border border-slate-200 dark:border-[#374151] bg-white dark:bg-[#111827] px-3 py-2.5 outline-none focus:ring-2 focus:ring-blue-500/40"
              />
            </label>
            <label for="password" class="block text-xs text-slate-500 dark:text-slate-400">
              Password
              <input
                id="password"
                type="password"
                [(ngModel)]="password"
                name="password"
                required
                autocomplete="current-password"
                class="mt-1 w-full rounded-lg border border-slate-200 dark:border-[#374151] bg-white dark:bg-[#111827] px-3 py-2.5 outline-none focus:ring-2 focus:ring-blue-500/40"
              />
            </label>
            <button
              type="submit"
              class="w-full rounded-lg bg-[#2563EB] hover:bg-blue-700 text-white font-semibold py-2.5 shadow-lg shadow-blue-500/20 transition"
            >
              Log In
            </button>
          </form>

          <p class="mt-5 text-sm text-center text-slate-500 dark:text-slate-400">
            Don't have an account?
            <a routerLink="/auth/register" class="text-[#2563EB] font-medium">Register</a>
          </p>
        </div>
      </section>
    </div>
  `,
})
export class LoginComponent {
  theme: ThemeService;
  email = '';
  password = '';
  error = '';

  constructor(
    private auth: AuthService,
    private router: Router,
    theme: ThemeService
  ) {
    this.theme = theme;
  }

  onSubmit(): void {
    this.error = '';
    const result = this.auth.login(this.email, this.password);
    if (result.success) {
      this.router.navigate(['/app/home']);
    } else {
      this.error = result.error ?? 'Login failed';
    }
  }
}
