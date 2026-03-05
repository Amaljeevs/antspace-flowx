import { Component, signal, computed, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../core/services/auth.service';
import { StrategyRepository } from '../../../core/repositories/strategy.repository';
import type { Strategy, StrategyStatus } from '../../../core/models/strategy.model';

@Component({
  selector: 'app-strategies-list',
  standalone: true,
  imports: [RouterLink, FormsModule],
  template: `
    <div class="space-y-5">
      @if (toastMessage) {
        <div class="fixed right-6 top-5 z-30 rounded-xl border border-emerald-300 bg-emerald-50 text-emerald-700 px-4 py-2 text-sm font-medium shadow-lg">
          {{ toastMessage }}
        </div>
      }
      <div class="flex items-center justify-between gap-4 flex-wrap">
        <div>
          <h1 class="text-3xl font-semibold">Strategies</h1>
          <p class="text-sm text-slate-500 dark:text-slate-400">Manage pre-built and custom deployment workflows</p>
        </div>
        <a
          routerLink="/app/strategies/create"
          class="inline-flex items-center justify-center rounded-xl bg-[#0A1A5F] px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-blue-900/20 transition hover:bg-[#08144B] rounded-full px-5"
        >
          <span class="text-base">＋</span> Create Strategy
        </a>
      </div>

      <div class="rounded-2xl border border-slate-200/80 bg-white/90 shadow-sm backdrop-blur dark:border-slate-700/80 dark:bg-slate-900/70 p-3 flex items-center justify-between gap-3 flex-wrap">
        <div class="inline-flex rounded-full bg-slate-100 dark:bg-slate-800 p-1.5">
          @for (tab of strategyTabs; track tab.value) {
            <button
              type="button"
              class="px-5 py-1.5 text-sm rounded-full transition font-medium dark:text-slate-300"
              [class.bg-[#0A1A5F]]="activeTab() === tab.value"
              [class.text-white]="activeTab() === tab.value"
              [class.text-slate-600]="activeTab() !== tab.value"
              (click)="activeTab.set(tab.value)"
            >
              {{ tab.label }}
            </button>
          }
        </div>

        <div class="flex items-center gap-3 w-full md:w-auto">
          <div class="relative w-full md:w-80">
            <input
              type="search"
              placeholder="Search Strategy"
              [(ngModel)]="searchQuery"
              (input)="onSearch()"
              class="w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-sm outline-none transition focus:ring-2 focus:ring-blue-500/30 dark:border-slate-700 dark:bg-slate-900 rounded-full pl-10 pr-4"
            />
            <span class="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
              <svg viewBox="0 0 24 24" class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="1.8">
                <circle cx="11" cy="11" r="7"></circle>
                <path d="m20 20-3.5-3.5"></path>
              </svg>
            </span>
          </div>
          <button type="button" class="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-600 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 rounded-full px-5 py-2 text-sm">
            Filter
          </button>
        </div>
      </div>

      @if (filteredStrategies().length === 0) {
        <div class="rounded-2xl border border-dashed border-slate-300 dark:border-[#374151] p-10 text-center text-slate-500 dark:text-slate-400">
          {{ searchQuery ? 'No strategies match your search.' : 'No strategies found for this tab.' }}
        </div>
      } @else {
        <div class="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
          @for (s of filteredStrategies(); track s.id) {
            <article class="rounded-2xl border border-slate-200/70 bg-gradient-to-br from-white to-slate-50 shadow-sm dark:border-slate-700/70 dark:from-slate-900 dark:to-slate-900/70 p-4 hover:shadow-md transition">
              <div class="flex items-center justify-between gap-2 mb-3">
                <div class="flex items-center gap-2 min-w-0">
                  <input type="checkbox" />
                  <span class="inline-grid place-items-center h-8 w-8 rounded-full bg-indigo-100 dark:bg-indigo-500/20 text-indigo-700 dark:text-indigo-300">
                    <svg viewBox="0 0 24 24" class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="1.8">
                      <path d="M12 2 9 9l-7 .5 5.4 4.2L5.7 21 12 16.9 18.3 21l-1.7-7.3L22 9.5 15 9z"></path>
                    </svg>
                  </span>
                  <h3 class="font-semibold truncate">{{ s.name }}</h3>
                </div>
                <button type="button" class="text-slate-400 hover:text-slate-700 dark:hover:text-slate-200">⋮</button>
              </div>

              <p class="text-xs text-slate-500 dark:text-slate-400 mb-3 line-clamp-2">
                {{ s.description || 'Strategy type: Nifty option selling/buying with managed risk profile.' }}
              </p>

              <div class="flex items-center gap-3 text-xs mb-4">
                <span class="text-emerald-600 font-semibold">NIFTY</span>
                <span class="text-emerald-600 font-medium">Entry Time - {{ s.timeSettings.sessionStart }}</span>
                <span class="text-emerald-600 font-medium">Exit Time - {{ s.timeSettings.sessionEnd }}</span>
              </div>

              <div class="flex items-center justify-end gap-2">
                <a
                  [routerLink]="['/app/strategies', s.id, 'edit']"
                  class="rounded-full px-4 py-1.5 text-sm font-semibold bg-indigo-100 dark:bg-slate-700 text-indigo-700 dark:text-slate-100"
                >
                  View Strategy
                </a>
                <button
                  type="button"
                  class="rounded-full px-4 py-1.5 text-sm font-semibold dark:text-slate-100"
                  [class.bg-[#0A1A5F]]="isDeployed(s)"
                  [class.text-white]="isDeployed(s)"
                  [class.bg-slate-200]="!isDeployed(s)"
                  [class.bg-slate-600]="!isDeployed(s)"
                  (click)="toggleDeploy(s)"
                >
                  {{ isDeployed(s) ? 'Un-Deploy' : 'Deploy' }}
                </button>
              </div>
            </article>
          }
        </div>
      }
    </div>
  `,
})
export class StrategiesListComponent {
  auth = inject(AuthService);
  repo = inject(StrategyRepository);

  searchQuery = '';
  toastMessage = '';
  activeTab = signal<StrategyStatus>('LIVE');
  strategyTabs: Array<{ value: StrategyStatus; label: string }> = [
    { value: 'LIVE', label: 'Pre-built' },
    { value: 'DRAFT', label: 'Custom' },
    { value: 'DEPLOYED', label: 'Deployed' },
  ];

  filteredStrategies = computed(() => {
    const user = this.auth.getCurrentUser();
    if (!user) return [];
    return this.repo.search(user.userId, this.searchQuery, this.activeTab());
  });

  onSearch(): void {}

  isDeployed(strategy: Strategy): boolean {
    return strategy.status === 'DEPLOYED' || strategy.status === 'LIVE';
  }

  toggleDeploy(strategy: Strategy): void {
    const nextStatus: StrategyStatus = this.isDeployed(strategy) ? 'DRAFT' : 'DEPLOYED';
    const updated = this.repo.setStatus(strategy.id, nextStatus);
    if (!updated) return;
    this.toastMessage = nextStatus === 'DEPLOYED' ? 'Strategy deployed' : 'Strategy disabled';
    setTimeout(() => (this.toastMessage = ''), 2200);
  }
}
