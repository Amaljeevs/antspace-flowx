import { Component } from '@angular/core';

@Component({
  selector: 'app-profile',
  standalone: true,
  template: `
    <div class="max-w-5xl space-y-5">
      <div>
        <h1 class="text-3xl font-semibold">My Profile</h1>
        <p class="text-sm text-slate-500 dark:text-slate-400">Account, preferences and trading workspace identity</p>
      </div>
      <div class="grid md:grid-cols-3 gap-4">
        <div class="rounded-2xl border border-slate-200/70 bg-gradient-to-br from-white to-slate-50 shadow-sm dark:border-slate-700/70 dark:from-slate-900 dark:to-slate-900/70 p-5 md:col-span-2">
          <p class="text-sm font-medium mb-4">Account Details</p>
          <div class="grid md:grid-cols-2 gap-3">
            <div>
              <p class="text-xs text-slate-500 dark:text-slate-400">Name</p>
              <p class="text-sm font-medium">Demo User</p>
            </div>
            <div>
              <p class="text-xs text-slate-500 dark:text-slate-400">Email</p>
              <p class="text-sm font-medium">demo&#64;flowx.app</p>
            </div>
          </div>
        </div>
        <div class="rounded-2xl border border-slate-200/70 bg-gradient-to-br from-white to-slate-50 shadow-sm dark:border-slate-700/70 dark:from-slate-900 dark:to-slate-900/70 p-5">
          <p class="text-sm font-medium mb-2">Workspace</p>
          <p class="text-xs text-slate-500 dark:text-slate-400">Theme, notifications and risk defaults will be configurable here.</p>
        </div>
      </div>
      <div class="rounded-2xl border border-slate-200/80 bg-white/90 shadow-sm backdrop-blur dark:border-slate-700/80 dark:bg-slate-900/70 p-6">
        <p class="text-sm text-slate-500 dark:text-slate-400">Profile and plan management screens are in demo mode.</p>
      </div>
    </div>
  `,
})
export class ProfileComponent {}
