import { Component } from '@angular/core';

@Component({
  selector: 'app-signals',
  standalone: true,
  template: `
    <div class="space-y-5">
      <div>
        <h1 class="text-3xl font-semibold">Signals</h1>
        <p class="text-sm text-slate-500 dark:text-slate-400">Real-time trigger monitor and generated alerts</p>
      </div>
      <div class="grid md:grid-cols-3 gap-4">
        <div class="rounded-2xl border border-slate-200/70 bg-gradient-to-br from-white to-slate-50 shadow-sm dark:border-slate-700/70 dark:from-slate-900 dark:to-slate-900/70 p-5">
          <p class="text-sm text-slate-500 dark:text-slate-400">Active signals</p>
          <p class="text-3xl font-semibold mt-2">0</p>
        </div>
        <div class="rounded-2xl border border-slate-200/70 bg-gradient-to-br from-white to-slate-50 shadow-sm dark:border-slate-700/70 dark:from-slate-900 dark:to-slate-900/70 p-5">
          <p class="text-sm text-slate-500 dark:text-slate-400">Pending triggers</p>
          <p class="text-3xl font-semibold mt-2">0</p>
        </div>
        <div class="rounded-2xl border border-slate-200/70 bg-gradient-to-br from-white to-slate-50 shadow-sm dark:border-slate-700/70 dark:from-slate-900 dark:to-slate-900/70 p-5">
          <p class="text-sm text-slate-500 dark:text-slate-400">Alert health</p>
          <p class="text-3xl font-semibold mt-2 text-emerald-500">Stable</p>
        </div>
      </div>
      <div class="rounded-2xl border border-slate-200/80 bg-white/90 shadow-sm backdrop-blur dark:border-slate-700/80 dark:bg-slate-900/70 p-6">
        <p class="text-sm text-slate-500 dark:text-slate-400">Signals module is in demo mode. Live stream integration will appear here.</p>
      </div>
    </div>
  `,
})
export class SignalsComponent {}
