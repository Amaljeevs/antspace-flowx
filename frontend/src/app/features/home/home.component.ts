import { Component, computed, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';
import { StrategyRepository } from '../../core/repositories/strategy.repository';
import { AnalyticsRepository } from '../../core/repositories/analytics.repository';
import { Strategy } from '../../core/models/strategy.model';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [FormsModule],
  template: `
    <div class="space-y-6">
      @if (toastMessage()) {
        <div class="fixed top-5 left-1/2 -translate-x-1/2 z-50 rounded-xl bg-emerald-600 text-white px-5 py-2.5 shadow-2xl text-sm font-medium">
          {{ toastMessage() }}
        </div>
      }

      <div class="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 class="text-3xl font-semibold">Welcome {{ user?.name ?? 'Trader' }}</h1>
        </div>
      </div>

      <div class="grid lg:grid-cols-4 md:grid-cols-2 gap-4">
        <div class="rounded-2xl border border-slate-200/70 bg-gradient-to-br from-white to-slate-50 shadow-sm dark:border-slate-700/70 dark:from-slate-900 dark:to-slate-900/70 p-5 relative overflow-hidden">
          <div class="absolute -right-6 -top-6 w-20 h-20 rounded-full bg-emerald-100/80 dark:bg-emerald-500/10"></div>
          <p class="text-sm text-slate-500 dark:text-slate-400">Overall P&L</p>
          <p class="text-3xl font-bold text-emerald-500 mt-2">₹0</p>
          <p class="text-sm text-slate-400 mt-1">Active: {{ activeStrategies() }}/{{ strategies().length }}</p>
          <div class="mt-3"><span class="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-600 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 text-emerald-700 dark:text-emerald-300">+0.00% today</span></div>
        </div>
        <button
          type="button"
          (click)="selectPaper()"
          class="text-left p-5 transition rounded-2xl border border-slate-200/70 bg-gradient-to-br from-white to-slate-50 shadow-sm dark:border-slate-700/70 dark:from-slate-900 dark:to-slate-900/70"
          [class.border-emerald-500]="paperSelected()"
          [class.ring-1]="paperSelected()"
          [class.ring-emerald-500]="paperSelected()"
        >
          <div class="flex items-center justify-between">
            <p class="text-sm text-slate-500 dark:text-slate-400">Paper</p>
            <span class="inline-flex h-5 w-5 items-center justify-center rounded-full text-[11px] text-white" [class.bg-emerald-600]="paperSelected()" [class.bg-slate-400]="!paperSelected()">✓</span>
          </div>
          <p class="text-3xl font-bold mt-2">₹0</p>
          <p class="text-sm text-slate-400 mt-1">Active: {{ selectedCount() }}/{{ strategies().length }}</p>
          <div class="mt-3 flex gap-2">
            <button type="button" (click)="openConfirm('squareoff'); $event.stopPropagation()" class="rounded-lg bg-indigo-100 text-indigo-800 dark:bg-slate-700 dark:text-slate-100 px-3 py-1.5 text-xs font-semibold">
              Square off
            </button>
            <button type="button" (click)="openConfirm('stop'); $event.stopPropagation()" class="rounded-lg bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-200 px-3 py-1.5 text-xs font-semibold">
              Stop
            </button>
          </div>
        </button>
        <div class="rounded-2xl border border-slate-200/70 bg-gradient-to-br from-white to-slate-50 shadow-sm dark:border-slate-700/70 dark:from-slate-900 dark:to-slate-900/70 p-5">
          <p class="text-sm text-slate-500 dark:text-slate-400">Deployed Strategies</p>
          <p class="text-3xl font-bold mt-2">{{ deployedStrategies() }}</p>
          <p class="text-sm text-slate-400 mt-1">Live + Paper deployments</p>
          <div class="mt-3"><span class="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-600 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200">Execution health: Stable</span></div>
        </div>
        <div class="rounded-2xl border border-slate-200/70 bg-gradient-to-br from-white to-slate-50 shadow-sm dark:border-slate-700/70 dark:from-slate-900 dark:to-slate-900/70 p-5">
          <p class="text-sm text-slate-500 dark:text-slate-400">Win Rate</p>
          <p class="text-3xl font-bold text-blue-600 dark:text-blue-300 mt-2">--</p>
          <p class="text-sm text-slate-400 mt-1">Updates with live analytics</p>
          <div class="mt-3"><span class="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-600 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200">Risk profile: Balanced</span></div>
        </div>
      </div>

      <div class="flex flex-wrap items-center justify-between gap-3">
        <div class="flex gap-2">
          <button type="button" class="rounded-full bg-indigo-100 text-indigo-800 dark:bg-slate-700 dark:text-slate-100 px-4 py-1.5 text-xs font-semibold">Run</button>
          <button type="button" (click)="openConfirm('stop')" class="rounded-full bg-indigo-100 text-indigo-800 dark:bg-slate-700 dark:text-slate-100 px-4 py-1.5 text-xs font-semibold">Stop</button>
          <button type="button" (click)="openConfirm('squareoff')" class="rounded-full bg-indigo-100 text-indigo-800 dark:bg-slate-700 dark:text-slate-100 px-4 py-1.5 text-xs font-semibold">Squareoff</button>
        </div>
        <div class="relative w-full md:w-80">
          <input
            type="search"
            [ngModel]="searchQuery()"
            (ngModelChange)="searchQuery.set($event)"
            placeholder="Search Strategy"
            class="w-full rounded-full border border-slate-300 dark:border-[#374151] bg-white dark:bg-[#111827] pl-10 pr-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-blue-500/40"
          />
          <span class="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
            <svg viewBox="0 0 24 24" class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="1.8">
              <circle cx="11" cy="11" r="7"></circle>
              <path d="m20 20-3.5-3.5"></path>
            </svg>
          </span>
        </div>
        <button type="button" class="rounded-xl bg-indigo-100 text-indigo-700 dark:bg-slate-800 dark:text-slate-200 px-4 py-2.5 text-sm font-medium">
          <svg viewBox="0 0 24 24" class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="1.8">
            <path d="M12 8.5a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7Z"></path>
            <path d="M19.4 15a1 1 0 0 0 .2 1.1l.1.1a1.8 1.8 0 0 1-2.6 2.6l-.1-.1a1 1 0 0 0-1.1-.2 1 1 0 0 0-.6.9V20a1.8 1.8 0 0 1-3.6 0v-.1a1 1 0 0 0-.6-.9 1 1 0 0 0-1.1.2l-.1.1a1.8 1.8 0 0 1-2.6-2.6l.1-.1a1 1 0 0 0 .2-1.1 1 1 0 0 0-.9-.6H4a1.8 1.8 0 1 1 0-3.6h.1a1 1 0 0 0 .9-.6 1 1 0 0 0-.2-1.1l-.1-.1a1.8 1.8 0 0 1 2.6-2.6l.1.1a1 1 0 0 0 1.1.2 1 1 0 0 0 .6-.9V4a1.8 1.8 0 0 1 3.6 0v.1a1 1 0 0 0 .6.9 1 1 0 0 0 1.1-.2l.1-.1a1.8 1.8 0 0 1 2.6 2.6l-.1.1a1 1 0 0 0-.2 1.1 1 1 0 0 0 .9.6H20a1.8 1.8 0 1 1 0 3.6h-.1a1 1 0 0 0-.9.6Z"></path>
          </svg>
        </button>
        <button type="button" class="rounded-xl bg-indigo-100 text-indigo-700 dark:bg-slate-800 dark:text-slate-200 px-5 py-2.5 text-sm font-medium">Filter</button>
      </div>

      <div class="rounded-2xl border border-slate-200/80 bg-white/90 shadow-sm backdrop-blur dark:border-slate-700/80 dark:bg-slate-900/70 overflow-hidden">
        <table class="w-full text-sm">
          <thead class="bg-slate-50 dark:bg-slate-900/40">
            <tr class="text-left">
              <th class="px-5 py-3">
                <input type="checkbox" [checked]="allVisibleSelected()" (change)="toggleSelectAll($any($event.target).checked)" class="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500/40" />
              </th>
              <th class="px-5 py-3">Strategy Name</th>
              <th class="px-5 py-3">Start Time</th>
              <th class="px-5 py-3">End Time</th>
              <th class="px-5 py-3">Status</th>
              <th class="px-5 py-3">Underlying</th>
              <th class="px-5 py-3">Legs</th>
              <th class="px-5 py-3">Broker</th>
              <th class="px-5 py-3">Multiplier</th>
              <th class="px-5 py-3">MTM</th>
              <th class="px-5 py-3">Execution</th>
            </tr>
          </thead>
          <tbody>
            @for (s of filteredStrategies(); track s.id) {
              <tr
                class="border-t border-slate-100 dark:border-[#374151] odd:bg-slate-50 dark:odd:bg-slate-900/20"
                [class.bg-blue-50]="isSelected(s.id)"
              >
                <td class="px-5 py-4">
                  <input type="checkbox" [checked]="isSelected(s.id)" (change)="toggleRow(s.id, $any($event.target).checked)" class="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500/40" />
                </td>
                <td class="px-5 py-4">{{ s.name }}</td>
                <td class="px-5 py-4">{{ s.timeSettings.sessionStart }}</td>
                <td class="px-5 py-4">{{ s.timeSettings.sessionEnd }}</td>
                <td class="px-5 py-4">
                  <span class="inline-flex items-center gap-2 rounded-full px-3 py-1 bg-slate-100 dark:bg-slate-800 text-xs">
                    <span class="h-2 w-2 rounded-full" [class.bg-emerald-500]="s.status === 'LIVE'" [class.bg-blue-500]="s.status === 'DEPLOYED'" [class.bg-amber-500]="s.status === 'DRAFT'" [class.bg-rose-500]="s.status === 'CLOSED'"></span>
                    {{ statusLabel(s.status) }}
                  </span>
                </td>
                <td class="px-5 py-4">NIFTY</td>
                <td class="px-5 py-4">{{ s.legs.length || '--' }}</td>
                <td class="px-5 py-4">
                  <select
                    [ngModel]="brokerByStrategy()[s.id]"
                    (ngModelChange)="setBroker(s.id, $event)"
                    class="rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-2 py-1 text-xs"
                  >
                    @for (option of brokerOptions; track option) {
                      <option [value]="option">{{ option }}</option>
                    }
                  </select>
                </td>
                <td class="px-5 py-4">- 1 +</td>
                <td class="px-5 py-4 font-medium" [class.text-emerald-500]="s.status === 'LIVE' || s.status === 'DEPLOYED'" [class.text-rose-500]="s.status === 'CLOSED'">
                  {{ mtmLabel(s.status) }}
                </td>
                <td class="px-5 py-4">
                  <button class="rounded-full bg-indigo-100 text-indigo-700 dark:bg-slate-700 dark:text-slate-100 px-4 py-1.5 text-xs font-semibold">
                    {{ s.status === 'LIVE' ? 'Run' : 'Stop' }}
                  </button>
                </td>
              </tr>
            }
          </tbody>
        </table>
      </div>
    </div>

    @if (confirmAction()) {
      <div class="fixed inset-0 z-40 bg-black/40 flex items-center justify-center p-4" (click)="closeConfirm()">
        <div class="w-full max-w-3xl rounded-2xl bg-white dark:bg-[#111827] border border-red-300 dark:border-red-500/40 shadow-2xl p-7" (click)="$event.stopPropagation()">
          <div class="flex items-start gap-4">
            <div class="h-12 w-12 rounded-xl border-2 border-red-400 text-red-500 flex items-center justify-center text-2xl font-bold">!</div>
            <div class="flex-1">
              <h3 class="text-4 font-semibold text-slate-800 dark:text-slate-100">Are you sure?</h3>
              <p class="text-3 mt-1 text-slate-600 dark:text-slate-300">
                {{ confirmAction() === 'squareoff' ? 'Are you sure you want to square off all your positions?' : 'Are you sure you want to stop all your positions?' }}
              </p>
            </div>
            <button type="button" class="h-8 w-8 rounded-full bg-red-100 text-red-500" (click)="closeConfirm()">×</button>
          </div>

          <div class="mt-7 flex items-center justify-end gap-3">
            <button type="button" (click)="closeConfirm()" class="rounded-full bg-indigo-100 text-indigo-900 dark:bg-slate-700 dark:text-slate-100 px-8 py-2 font-medium">
              Cancel
            </button>
            <button type="button" (click)="submitConfirm()" class="rounded-full bg-[#081B5E] text-white px-8 py-2 font-semibold">
              {{ confirmAction() === 'squareoff' ? 'Square Off' : 'Stop' }}
            </button>
          </div>
        </div>
      </div>
    }
  `,
})
export class HomeComponent {
  user = this.auth.getCurrentUser();
  summary = this.analytics.getSummary();
  strategies = signal<Strategy[]>(this.strategyRepo.getByUser(this.user?.userId ?? ''));
  searchQuery = signal('');
  selectedRows = signal<string[]>([]);
  paperSelected = signal(true);
  confirmAction = signal<'squareoff' | 'stop' | null>(null);
  toastMessage = signal('');
  brokerByStrategy = signal<Record<string, string>>({});
  brokerOptions = ['Paper', 'Zerodha', 'Angel One', 'Upstox'];
  private toastHandle?: ReturnType<typeof setTimeout>;

  filteredStrategies = computed(() => {
    const q = this.searchQuery().trim().toLowerCase();
    if (!q) return this.strategies();
    return this.strategies().filter((s) => s.name.toLowerCase().includes(q));
  });
  allVisibleSelected = computed(() => {
    const visible = this.filteredStrategies().map((s) => s.id);
    if (!visible.length) return false;
    return visible.every((id) => this.selectedRows().includes(id));
  });
  selectedCount = computed(() => this.selectedRows().length);
  activeStrategies = computed(
    () => this.strategies().filter((s) => s.status === 'LIVE' || s.status === 'DEPLOYED').length
  );
  deployedStrategies = computed(
    () => this.strategies().filter((s) => s.status === 'DEPLOYED').length
  );

  constructor(
    private auth: AuthService,
    private strategyRepo: StrategyRepository,
    private analytics: AnalyticsRepository
  ) {
    const mapping: Record<string, string> = {};
    for (const s of this.strategies()) {
      mapping[s.id] = 'Paper';
    }
    this.brokerByStrategy.set(mapping);
  }

  statusLabel(status: Strategy['status']): string {
    if (status === 'LIVE') return 'Active';
    if (status === 'DEPLOYED') return 'Paper';
    if (status === 'DRAFT') return 'Draft';
    return 'Closed';
  }

  mtmLabel(status: Strategy['status']): string {
    if (status === 'LIVE' || status === 'DEPLOYED') return '0.00';
    if (status === 'CLOSED') return '-₹0';
    return '₹0';
  }

  isSelected(id: string): boolean {
    return this.selectedRows().includes(id);
  }

  toggleRow(id: string, checked: boolean): void {
    const next = new Set(this.selectedRows());
    if (checked) {
      next.add(id);
    } else {
      next.delete(id);
    }
    this.selectedRows.set(Array.from(next));
  }

  toggleSelectAll(checked: boolean): void {
    if (checked) {
      this.selectedRows.set(this.filteredStrategies().map((s) => s.id));
      return;
    }
    this.selectedRows.set([]);
  }

  setBroker(strategyId: string, broker: string): void {
    this.brokerByStrategy.update((current) => ({ ...current, [strategyId]: broker }));
  }

  selectPaper(): void {
    this.paperSelected.set(true);
    this.showToast('Paper mode selected');
  }

  openConfirm(action: 'squareoff' | 'stop'): void {
    this.confirmAction.set(action);
  }

  closeConfirm(): void {
    this.confirmAction.set(null);
  }

  submitConfirm(): void {
    const action = this.confirmAction();
    if (!action) return;
    const targetIds = this.selectedRows().length
      ? this.selectedRows()
      : this.strategies().map((s) => s.id);
    const nextStatus: Strategy['status'] = action === 'squareoff' ? 'CLOSED' : 'DRAFT';

    for (const id of targetIds) {
      this.strategyRepo.setStatus(id, nextStatus);
    }

    this.strategies.set(this.strategyRepo.getByUser(this.user?.userId ?? ''));
    this.closeConfirm();
    this.showToast(
      action === 'squareoff'
        ? 'Square off completed successfully'
        : 'Strategies stopped successfully'
    );
  }

  private showToast(message: string): void {
    this.toastMessage.set(message);
    if (this.toastHandle) {
      clearTimeout(this.toastHandle);
    }
    this.toastHandle = setTimeout(() => this.toastMessage.set(''), 2200);
  }
}
