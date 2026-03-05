import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  template: `
    <aside class="fixed inset-y-0 left-0 z-20 w-20 h-screen border-r border-slate-200 dark:border-[#374151] bg-white dark:bg-[#111827] py-5 px-2 flex flex-col items-center gap-2">
      <div class="mb-4 text-center">
        <div class="font-phonk text-[17px] leading-none text-[#0A1A5F] dark:text-blue-300">Flowx</div>
      </div>
      <a
        routerLink="/app/home"
        routerLinkActive="bg-[#2563EB] text-white"
        [routerLinkActiveOptions]="{ exact: true }"
        title="Home"
        class="flex flex-col items-center justify-center gap-1 w-full h-14 rounded-xl text-[11px] font-medium text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-800 dark:hover:text-slate-100 transition"
      >
        <svg viewBox="0 0 24 24" class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="1.8">
          <path d="M3 10.5 12 3l9 7.5" />
          <path d="M5 9.5V21h5v-6h4v6h5V9.5" />
        </svg>
        <small>Home</small>
      </a>
      <a
        routerLink="/app/strategies"
        routerLinkActive="bg-[#2563EB] text-white"
        title="Strategy"
        class="flex flex-col items-center justify-center gap-1 w-full h-14 rounded-xl text-[11px] font-medium text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-800 dark:hover:text-slate-100 transition"
      >
        <svg viewBox="0 0 24 24" class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="1.8">
          <path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2Z" />
          <path d="m14.5 9.5-4 1.5-1.5 4 4-1.5 1.5-4Z" />
        </svg>
        <small>Strategy</small>
      </a>
      <a
        routerLink="/app/analytics"
        routerLinkActive="bg-[#2563EB] text-white"
        title="Analysis"
        class="flex flex-col items-center justify-center gap-1 w-full h-14 rounded-xl text-[11px] font-medium text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-800 dark:hover:text-slate-100 transition"
      >
        <svg viewBox="0 0 24 24" class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="1.8">
          <path d="M4 20V10" />
          <path d="M10 20V4" />
          <path d="M16 20v-7" />
          <path d="M22 20v-3" />
        </svg>
        <small>Analysis</small>
      </a>
      <a
        routerLink="/app/signals"
        routerLinkActive="bg-[#2563EB] text-white"
        title="Signals"
        class="flex flex-col items-center justify-center gap-1 w-full h-14 rounded-xl text-[11px] font-medium text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-800 dark:hover:text-slate-100 transition"
      >
        <svg viewBox="0 0 24 24" class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="1.8">
          <path d="M4 12a8 8 0 0 1 16 0" />
          <path d="M7 12a5 5 0 0 1 10 0" />
          <circle cx="12" cy="12" r="1.5" fill="currentColor" stroke="none" />
        </svg>
        <small>Signals</small>
      </a>
      <a
        routerLink="/app/broker"
        routerLinkActive="bg-[#2563EB] text-white"
        title="Broker"
        class="flex flex-col items-center justify-center gap-1 w-full h-14 rounded-xl text-[11px] font-medium text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-800 dark:hover:text-slate-100 transition"
      >
        <svg viewBox="0 0 24 24" class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="1.8">
          <path d="M10 13a5 5 0 0 1 0-7l1.5-1.5a5 5 0 1 1 7 7L17 13" />
          <path d="M14 11a5 5 0 0 1 0 7l-1.5 1.5a5 5 0 1 1-7-7L7 11" />
        </svg>
        <small>Broker</small>
      </a>
      <a
        routerLink="/app/plans"
        routerLinkActive="bg-[#2563EB] text-white"
        title="Plans"
        class="flex flex-col items-center justify-center gap-1 w-full h-14 rounded-xl text-[11px] font-medium text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-800 dark:hover:text-slate-100 transition"
      >
        <svg viewBox="0 0 24 24" class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="1.8">
          <rect x="3" y="5" width="18" height="14" rx="2" />
          <path d="M3 10h18" />
        </svg>
        <small>Plans</small>
      </a>
      <a
        routerLink="/app/profile"
        routerLinkActive="bg-[#2563EB] text-white"
        title="Profile"
        class="flex flex-col items-center justify-center gap-1 w-full h-14 rounded-xl text-[11px] font-medium text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-800 dark:hover:text-slate-100 transition"
      >
        <svg viewBox="0 0 24 24" class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="1.8">
          <circle cx="12" cy="8" r="3.5" />
          <path d="M5 20a7 7 0 0 1 14 0" />
        </svg>
        <small>Profile</small>
      </a>
    </aside>
  `,
})
export class SidebarComponent {}
