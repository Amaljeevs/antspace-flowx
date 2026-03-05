import { Component, computed, signal, inject } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AnalyticsRepository } from '../../core/repositories/analytics.repository';
import type { AnalyticsSummary } from '../../core/models/analytics.model';

type HeatCellValue = -1 | 1;
interface HeatMapMonth {
  name: string;
  cells: HeatCellValue[];
  pnlLabel: string;
}

@Component({
  selector: 'app-analytics',
  standalone: true,
  imports: [DecimalPipe, FormsModule],
  template: `
    <div class="space-y-6">
      <section class="rounded-2xl border border-slate-200/80 bg-white/90 shadow-sm backdrop-blur dark:border-slate-700/80 dark:bg-slate-900/70 p-4 md:p-5 space-y-4">
        <div class="flex items-center justify-between gap-3 flex-wrap">
          <h2 class="text-lg font-semibold">Day P/L Heat Map</h2>
          <select
            [ngModel]="selectedYear()"
            (ngModelChange)="selectedYear.set($event)"
            class="rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 py-1.5 text-sm"
          >
            @for (y of yearOptions; track y) {
              <option [ngValue]="y">{{ y }}</option>
            }
          </select>
        </div>

        <div class="grid md:grid-cols-5 gap-3">
          <div class="rounded-xl border border-slate-200 dark:border-slate-700 p-3">
            <p class="text-xs text-slate-500 dark:text-slate-400">Total Days</p>
            <p class="text-2xl font-semibold mt-1">{{ heatSummary().totalDays }}</p>
          </div>
          <div class="rounded-xl border border-slate-200 dark:border-slate-700 p-3">
            <p class="text-xs text-slate-500 dark:text-slate-400">Win Days</p>
            <p class="text-2xl font-semibold mt-1 text-emerald-500">{{ heatSummary().winDays }}</p>
          </div>
          <div class="rounded-xl border border-slate-200 dark:border-slate-700 p-3">
            <p class="text-xs text-slate-500 dark:text-slate-400">Loss Days</p>
            <p class="text-2xl font-semibold mt-1 text-rose-500">{{ heatSummary().lossDays }}</p>
          </div>
          <div class="rounded-xl border border-slate-200 dark:border-slate-700 p-3">
            <p class="text-xs text-slate-500 dark:text-slate-400">Win Streak Days</p>
            <p class="text-2xl font-semibold mt-1">{{ heatSummary().winStreak }}</p>
          </div>
          <div class="rounded-xl border border-slate-200 dark:border-slate-700 p-3">
            <p class="text-xs text-slate-500 dark:text-slate-400">Loss Streak Days</p>
            <p class="text-2xl font-semibold mt-1">{{ heatSummary().lossStreak }}</p>
          </div>
        </div>

        <div class="rounded-xl border border-slate-200 dark:border-slate-700 p-3 overflow-x-auto">
          <div class="min-w-[920px] grid grid-cols-12 gap-3">
            @for (month of heatMapMonths(); track month.name) {
              <div>
                <p class="text-xs text-slate-500 dark:text-slate-400 mb-2">{{ month.name }} {{ month.pnlLabel }}</p>
                <div class="grid grid-cols-7 gap-1">
                  @for (cell of month.cells; track $index) {
                    <span [class]="heatCellClass(cell)"></span>
                  }
                </div>
              </div>
            }
          </div>
        </div>
      </section>

      <div class="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 class="text-3xl font-semibold">Overall Strategy Analysis</h1>
          <p class="text-sm text-slate-500 dark:text-slate-400">Performance intelligence across active strategy sets</p>
        </div>
        <div class="inline-flex rounded-full bg-slate-100 dark:bg-slate-800 p-1">
          @for (tab of ['Week', 'Month', 'Year']; track tab) {
            <button type="button" class="px-4 py-1.5 rounded-full text-sm" [class.bg-[#0A1A5F]]="viewMode() === tab" [class.text-white]="viewMode() === tab" (click)="viewMode.set(tab)">
              {{ tab }}
            </button>
          }
        </div>
      </div>

      <div class="rounded-2xl border border-slate-200/80 bg-white/90 shadow-sm backdrop-blur dark:border-slate-700/80 dark:bg-slate-900/70 p-3 flex flex-wrap gap-3">
        <select class="w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-sm outline-none transition focus:ring-2 focus:ring-blue-500/30 dark:border-slate-700 dark:bg-slate-900 w-auto py-2">
          <option>All, sample</option>
          <option>Custom Strategies</option>
          <option>Prebuilt Strategies</option>
        </select>
        <div class="w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-sm outline-none transition focus:ring-2 focus:ring-blue-500/30 dark:border-slate-700 dark:bg-slate-900 w-auto py-2 text-slate-500">Start Date → End Date</div>
      </div>

      <div class="rounded-2xl border border-slate-200/80 bg-white/90 shadow-sm backdrop-blur dark:border-slate-700/80 dark:bg-slate-900/70 p-5">
        <div class="grid xl:grid-cols-[360px_1fr] gap-5">
          <div>
            <p class="text-sm mb-3">Trade Distribution</p>
            <div class="mx-auto h-64 w-64 rounded-full border-[26px] border-slate-200 dark:border-slate-700 border-t-emerald-400 border-r-rose-300 shadow-inner"></div>
            <div class="mt-4 flex justify-center gap-6 text-sm">
              <span class="inline-flex items-center gap-2"><span class="h-3 w-3 rounded bg-emerald-500"></span>Profit</span>
              <span class="inline-flex items-center gap-2"><span class="h-3 w-3 rounded bg-rose-400"></span>Loss</span>
            </div>
          </div>

          <div class="grid md:grid-cols-4 gap-3 content-start">
            @for (kpi of kpis; track kpi.label) {
              <div class="rounded-2xl border border-slate-200/70 bg-gradient-to-br from-white to-slate-50 shadow-sm dark:border-slate-700/70 dark:from-slate-900 dark:to-slate-900/70 p-4">
                <div class="h-8 w-8 rounded-lg bg-indigo-100 dark:bg-indigo-500/20 text-indigo-700 dark:text-indigo-300 grid place-items-center mb-2">{{ kpi.icon }}</div>
                <p class="text-xs text-slate-500 dark:text-slate-400">{{ kpi.label }}</p>
                <p class="text-2xl font-semibold" [class.text-emerald-500]="kpi.green">{{ kpi.value }}</p>
              </div>
            }
          </div>
        </div>
      </div>
    </div>
  `,
})
export class AnalyticsComponent {
  analyticsRepo = inject(AnalyticsRepository);
  summary = signal<AnalyticsSummary>(this.analyticsRepo.getSummary());
  viewMode = signal('Month');
  selectedYear = signal(new Date().getFullYear());
  yearOptions = [new Date().getFullYear(), new Date().getFullYear() - 1, new Date().getFullYear() - 2];
  monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  kpis = [
    { icon: '₹', label: 'Total PNL', value: '0', green: true },
    { icon: 'OD', label: 'Total Orders', value: '0' },
    { icon: 'ST', label: 'Total Strategies', value: '0' },
    { icon: 'TD', label: 'Total Trading Days', value: '0' },
    { icon: 'DP', label: 'Avg. Daily PNL', value: '0', green: true },
    { icon: 'AP', label: 'Avg. Profit Daily', value: '0', green: true },
    { icon: 'AL', label: 'Avg. Loss Daily', value: '0', green: true },
    { icon: 'PR', label: 'Profit Ratio Percentage', value: '0' },
  ];

  constructor() {
    this.summary.set(this.analyticsRepo.getSummary());
  }

  heatMapMonths = computed(() => this.buildHeatMap(this.selectedYear()));
  heatSummary = computed(() => this.calculateHeatSummary(this.heatMapMonths()));

  heatCellClass(value: HeatCellValue): string {
    const base = 'inline-block h-3.5 w-3.5 rounded-[3px]';
    if (value === 1) return `${base} bg-emerald-500/80`;
    return `${base} bg-rose-400/80`;
  }

  private buildHeatMap(year: number): HeatMapMonth[] {
    return this.monthNames.map((name, monthIndex) => {
      const cells = this.generateMonthCells(year, monthIndex);
      const monthPnl = cells.reduce<number>(
        (acc, c) => acc + (c === 1 ? 1 : -1),
        0
      );
      return {
        name,
        cells,
        pnlLabel: monthPnl > 0 ? `+${monthPnl}` : `${monthPnl}`,
      };
    });
  }

  private generateMonthCells(year: number, monthIndex: number): HeatCellValue[] {
    const cells: HeatCellValue[] = [];
    for (let i = 0; i < 35; i++) {
      const score = (year * 19 + monthIndex * 23 + i * 11) % 100;
      cells.push(score >= 50 ? 1 : -1);
    }
    return cells;
  }

  private calculateHeatSummary(months: HeatMapMonth[]): {
    totalDays: number;
    winDays: number;
    lossDays: number;
    winStreak: number;
    lossStreak: number;
  } {
    const values = months.flatMap((m) => m.cells);
    let winDays = 0;
    let lossDays = 0;
    let winStreak = 0;
    let lossStreak = 0;
    let currWin = 0;
    let currLoss = 0;

    for (const v of values) {
      if (v > 0) {
        winDays += 1;
        currWin += 1;
        currLoss = 0;
      } else {
        lossDays += 1;
        currLoss += 1;
        currWin = 0;
      }
      if (currWin > winStreak) winStreak = currWin;
      if (currLoss > lossStreak) lossStreak = currLoss;
    }

    return {
      totalDays: values.length,
      winDays,
      lossDays,
      winStreak,
      lossStreak,
    };
  }
}
