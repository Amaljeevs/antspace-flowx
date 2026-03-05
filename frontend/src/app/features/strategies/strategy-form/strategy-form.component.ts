import { Component, input, computed, inject, effect } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../core/services/auth.service';
import { StrategyRepository } from '../../../core/repositories/strategy.repository';
import type { StrategyLeg, TimeSettings } from '../../../core/models/strategy.model';

const DAYS = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'] as const;

@Component({
  selector: 'app-strategy-form',
  standalone: true,
  imports: [RouterLink, FormsModule],
  template: `
    <div class="space-y-6">
      <div class="flex items-center justify-between gap-3 flex-wrap">
        <div>
          <h1 class="text-3xl font-semibold">{{ isEdit() ? 'Edit Strategy' : 'Create New Strategy' }}</h1>
          <p class="text-sm text-slate-500 dark:text-slate-400">Configure execution, timing and risk controls</p>
        </div>
        <a routerLink="/app/strategies" class="text-sm text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200">Back</a>
      </div>

      <form (ngSubmit)="save()" class="space-y-5">
        <div class="grid xl:grid-cols-2 gap-4">
          <section class="rounded-2xl border border-slate-200/80 bg-white/90 shadow-sm backdrop-blur dark:border-slate-700/80 dark:bg-slate-900/70 p-4">
            <h2 class="font-semibold mb-4">Strategy Feature</h2>
            <div class="space-y-3">
              <label class="block text-xs text-slate-500">Strategy Name
                <input class="mt-1 w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-sm outline-none transition focus:ring-2 focus:ring-blue-500/30 dark:border-slate-700 dark:bg-slate-900 py-2" type="text" [(ngModel)]="name" name="name" required />
              </label>
              <div class="grid md:grid-cols-2 gap-3">
                <label class="block text-xs text-slate-500">Instruments
                  <select class="mt-1 w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-sm outline-none transition focus:ring-2 focus:ring-blue-500/30 dark:border-slate-700 dark:bg-slate-900 py-2" [(ngModel)]="instrument" name="instrument">
                    <option>NIFTY 50</option>
                    <option>BANKNIFTY</option>
                    <option>FINNIFTY</option>
                  </select>
                </label>
                <label class="block text-xs text-slate-500">Underlying
                  <select class="mt-1 w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-sm outline-none transition focus:ring-2 focus:ring-blue-500/30 dark:border-slate-700 dark:bg-slate-900 py-2" [(ngModel)]="underlying" name="underlying">
                    <option>Cash</option>
                    <option>Futures</option>
                  </select>
                </label>
              </div>
              <label class="block text-xs text-slate-500">Order Type</label>
              <div class="inline-flex rounded-xl bg-slate-100 dark:bg-slate-800 p-1">
                @for (o of orderTypes; track o) {
                  <button type="button" class="px-4 py-1.5 rounded-lg text-sm dark:text-slate-200" [class.bg-white]="orderType===o" [class.bg-slate-700]="orderType===o" (click)="orderType=o">{{ o }}</button>
                }
              </div>
            </div>
          </section>

          <section class="rounded-2xl border border-slate-200/80 bg-white/90 shadow-sm backdrop-blur dark:border-slate-700/80 dark:bg-slate-900/70 p-4">
            <h2 class="font-semibold mb-4">Time Settings</h2>
            <div class="space-y-3">
              <label class="block text-xs text-slate-500">Strategy Feature</label>
              <div class="inline-flex rounded-xl bg-slate-100 dark:bg-slate-800 p-1">
                @for (mode of ['Intraday','Positional']; track mode) {
                  <button type="button" class="px-4 py-1.5 rounded-lg text-sm dark:text-slate-200" [class.bg-emerald-100]="strategyMode===mode" [class.bg-emerald-200]="strategyMode===mode" (click)="strategyMode=mode">{{ mode }}</button>
                }
              </div>
              <label class="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300">
                <input type="checkbox" [(ngModel)]="immediate" name="immediate" />
                Immediate
              </label>
              <div class="grid grid-cols-2 gap-3">
                <label class="block text-xs text-slate-500">Start Time
                  <input class="mt-1 w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-sm outline-none transition focus:ring-2 focus:ring-blue-500/30 dark:border-slate-700 dark:bg-slate-900 py-2" type="text" [(ngModel)]="timeSettings.sessionStart" name="sessionStart" />
                </label>
                <label class="block text-xs text-slate-500">End Time
                  <input class="mt-1 w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-sm outline-none transition focus:ring-2 focus:ring-blue-500/30 dark:border-slate-700 dark:bg-slate-900 py-2" type="text" [(ngModel)]="timeSettings.sessionEnd" name="sessionEnd" />
                </label>
              </div>
            </div>
          </section>
        </div>

        <section class="rounded-2xl border border-slate-200/80 bg-white/90 shadow-sm backdrop-blur dark:border-slate-700/80 dark:bg-slate-900/70 p-4">
          <h2 class="font-semibold mb-4">Add Leg</h2>
          <div class="grid xl:grid-cols-8 md:grid-cols-4 grid-cols-2 gap-3">
            <label class="text-xs text-slate-500">Segment
              <select class="mt-1 w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-sm outline-none transition focus:ring-2 focus:ring-blue-500/30 dark:border-slate-700 dark:bg-slate-900 py-2" [(ngModel)]="segment" name="segment">
                <option>OPT</option>
                <option>FUT</option>
              </select>
            </label>
            <label class="text-xs text-slate-500">Position
              <select class="mt-1 w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-sm outline-none transition focus:ring-2 focus:ring-blue-500/30 dark:border-slate-700 dark:bg-slate-900 py-2" [(ngModel)]="position" name="position">
                <option>Buy</option>
                <option>Sell</option>
              </select>
            </label>
            <label class="text-xs text-slate-500">Option Type
              <select class="mt-1 w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-sm outline-none transition focus:ring-2 focus:ring-blue-500/30 dark:border-slate-700 dark:bg-slate-900 py-2" [(ngModel)]="optionType" name="optionType">
                <option>CE</option>
                <option>PE</option>
              </select>
            </label>
            <label class="text-xs text-slate-500">Strike Criteria
              <input class="mt-1 w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-sm outline-none transition focus:ring-2 focus:ring-blue-500/30 dark:border-slate-700 dark:bg-slate-900 py-2" [(ngModel)]="strikeCriteria" name="strikeCriteria" />
            </label>
            <label class="text-xs text-slate-500">Strike Type
              <input class="mt-1 w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-sm outline-none transition focus:ring-2 focus:ring-blue-500/30 dark:border-slate-700 dark:bg-slate-900 py-2" [(ngModel)]="strikeType" name="strikeType" />
            </label>
            <label class="text-xs text-slate-500">Expiry
              <select class="mt-1 w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-sm outline-none transition focus:ring-2 focus:ring-blue-500/30 dark:border-slate-700 dark:bg-slate-900 py-2" [(ngModel)]="expiry" name="expiry">
                <option>Weekly</option>
                <option>Monthly</option>
              </select>
            </label>
            <label class="text-xs text-slate-500">Lots
              <input class="mt-1 w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-sm outline-none transition focus:ring-2 focus:ring-blue-500/30 dark:border-slate-700 dark:bg-slate-900 py-2" type="number" [(ngModel)]="lots" name="lots" min="1" />
            </label>
            <div class="flex items-end">
              <button type="button" class="w-full rounded-lg bg-indigo-200 dark:bg-slate-700 px-3 py-2 text-sm font-semibold" (click)="addLeg()">Add Leg</button>
            </div>
          </div>
        </section>

        <div class="grid xl:grid-cols-2 gap-4">
          <section class="rounded-2xl border border-slate-200/80 bg-white/90 shadow-sm backdrop-blur dark:border-slate-700/80 dark:bg-slate-900/70 p-4 space-y-4">
            <h2 class="font-semibold">Overall MTM Settings</h2>
            <div class="grid grid-cols-2 gap-3 text-sm">
              <label class="flex items-center gap-2"><input type="checkbox" [(ngModel)]="overallTarget" name="overallTarget" /> Overall Target</label>
              <label class="flex items-center gap-2"><input type="checkbox" [(ngModel)]="overallStoploss" name="overallStoploss" /> Overall Stoploss</label>
            </div>
            <h3 class="font-semibold">Days to Execute</h3>
            <div class="flex flex-wrap gap-2">
              @for (d of dayLabels; track d) {
                <button type="button" class="rounded-full px-4 py-1.5 text-sm font-medium border" [class.bg-[#0A1A5F]]="selectedDays.has(d)" [class.text-white]="selectedDays.has(d)" [class.border-[#0A1A5F]]="selectedDays.has(d)" [class.border-slate-300]="!selectedDays.has(d)" (click)="toggleDayChip(d)">
                  {{ d }}
                </button>
              }
            </div>
          </section>

          <section class="rounded-2xl border border-slate-200/80 bg-white/90 shadow-sm backdrop-blur dark:border-slate-700/80 dark:bg-slate-900/70 p-4 space-y-4">
            <h2 class="font-semibold">Profit Management System</h2>
            <label class="flex items-center gap-2 text-sm"><input type="checkbox" [(ngModel)]="profitLockEnabled" name="profitLockEnabled" /> Profit</label>
            <label class="block text-xs text-slate-500">Lock Profit
              <select class="mt-1 w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-sm outline-none transition focus:ring-2 focus:ring-blue-500/30 dark:border-slate-700 dark:bg-slate-900 py-2" [(ngModel)]="profitLockMode" name="profitLockMode">
                <option>Lock Profit</option>
                <option>Trail Profit</option>
              </select>
            </label>
          </section>
        </div>

        <div class="flex justify-center pt-2">
          <button type="submit" class="inline-flex items-center justify-center rounded-xl bg-[#0A1A5F] px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-blue-900/20 transition hover:bg-[#08144B] rounded-full px-8 py-3">Save Strategy</button>
        </div>
      </form>
    </div>
  `,
})
export class StrategyFormComponent {
  id = input<string | undefined>(undefined);
  private router = inject(Router);
  private auth = inject(AuthService);
  private repo = inject(StrategyRepository);

  isEdit = computed(() => !!this.id());
  name = '';
  description = '';
  instrument = 'NIFTY 50';
  underlying = 'Cash';
  orderType = 'MIS';
  orderTypes = ['MIS', 'CNC'];
  strategyMode = 'Intraday';
  immediate = false;
  segment = 'OPT';
  position = 'Buy';
  optionType = 'CE';
  strikeCriteria = 'ATM Type';
  strikeType = 'ATM';
  expiry = 'Weekly';
  lots = 1;
  overallTarget = false;
  overallStoploss = false;
  profitLockEnabled = false;
  profitLockMode = 'Lock Profit';
  dayLabels = ['All Days', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'] as const;
  selectedDays = new Set<string>(['All Days', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']);
  timeSettings: TimeSettings = {
    timezone: 'Asia/Kolkata',
    sessionStart: '09:15',
    sessionEnd: '15:30',
  };
  days = DAYS;
  legs: Array<StrategyLeg & { id: string }> = [{ id: crypto.randomUUID(), symbol: '', direction: 'BUY', quantity: 1, orderType: 'MARKET', days: ['MON', 'TUE', 'WED', 'THU', 'FRI'] }];
  private loadedId: string | null = null;

  constructor() {
    effect(() => {
      const id = this.id();
      if (id && id !== this.loadedId) {
        const s = this.repo.getById(id);
        if (s) {
          this.loadedId = id;
          this.name = s.name;
          this.description = s.description ?? '';
          this.timeSettings = { ...s.timeSettings };
          this.legs = s.legs.length ? s.legs.map((l) => ({ ...l, id: l.id })) : [{ id: crypto.randomUUID(), symbol: '', direction: 'BUY', quantity: 1, orderType: 'MARKET', days: ['MON', 'TUE', 'WED', 'THU', 'FRI'] }];
        }
      }
    });
  }

  toggleDay(leg: StrategyLeg & { id: string }, day: string): void {
    const idx = leg.days.indexOf(day);
    if (idx >= 0) leg.days = leg.days.filter((d) => d !== day);
    else leg.days = [...leg.days, day].sort();
  }

  addLeg(): void {
    this.legs.push({
      id: crypto.randomUUID(),
      symbol: '',
      direction: 'BUY',
      quantity: 1,
      orderType: 'MARKET',
      days: ['MON', 'TUE', 'WED', 'THU', 'FRI'],
    });
  }

  removeLeg(index: number): void {
    this.legs.splice(index, 1);
  }

  toggleDayChip(day: string): void {
    if (this.selectedDays.has(day)) {
      this.selectedDays.delete(day);
    } else {
      this.selectedDays.add(day);
    }
  }

  save(): void {
    const user = this.auth.getCurrentUser();
    if (!user) return;
    const legPayload = this.legs.map((l) => ({ id: l.id, symbol: l.symbol, direction: l.direction, quantity: l.quantity, orderType: l.orderType, days: l.days }));
    if (this.id()) {
      const updated = this.repo.update(this.id()!, {
        name: this.name,
        description: this.description || undefined,
        timeSettings: this.timeSettings,
        legs: legPayload,
      });
      if (updated) this.router.navigate(['/app/strategies']);
    } else {
      this.repo.create({
        userId: user.userId,
        name: this.name,
        description: this.description || undefined,
        status: 'DRAFT',
        timeSettings: this.timeSettings,
        legs: legPayload,
      });
      this.router.navigate(['/app/strategies']);
    }
  }
}
