import { Injectable } from '@angular/core';
import { Strategy, StrategyStatus } from '../models/strategy.model';

const KEY = 'flowx_strategies';

@Injectable({ providedIn: 'root' })
export class StrategyRepository {
  private get all(): Strategy[] {
    try {
      const raw = localStorage.getItem(KEY);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  }

  private set all(value: Strategy[]) {
    localStorage.setItem(KEY, JSON.stringify(value));
  }

  getByUser(userId: string): Strategy[] {
    this.seedDemoStrategies(userId);
    return this.all.filter((s) => s.userId === userId);
  }

  getByUserAndStatus(userId: string, status: StrategyStatus): Strategy[] {
    return this.getByUser(userId).filter((s) => s.status === status);
  }

  getById(id: string): Strategy | undefined {
    return this.all.find((s) => s.id === id);
  }

  search(userId: string, query: string, status?: StrategyStatus): Strategy[] {
    const list = status ? this.getByUserAndStatus(userId, status) : this.getByUser(userId);
    if (!query.trim()) return list;
    const q = query.toLowerCase();
    return list.filter(
      (s) =>
        s.name.toLowerCase().includes(q) ||
        (s.description?.toLowerCase().includes(q) ?? false)
    );
  }

  create(strategy: Omit<Strategy, 'id' | 'createdAt' | 'updatedAt'>): Strategy {
    const list = this.all;
    const now = new Date().toISOString();
    const newOne: Strategy = {
      ...strategy,
      id: crypto.randomUUID(),
      createdAt: now,
      updatedAt: now,
    };
    list.push(newOne);
    this.all = list;
    return newOne;
  }

  update(id: string, patch: Partial<Omit<Strategy, 'id' | 'userId' | 'createdAt'>>): Strategy | undefined {
    const list = this.all;
    const idx = list.findIndex((s) => s.id === id);
    if (idx === -1) return undefined;
    list[idx] = { ...list[idx], ...patch, updatedAt: new Date().toISOString() };
    this.all = list;
    return list[idx];
  }

  delete(id: string): boolean {
    const list = this.all.filter((s) => s.id !== id);
    if (list.length === this.all.length) return false;
    this.all = list;
    return true;
  }

  setStatus(id: string, status: StrategyStatus): Strategy | undefined {
    return this.update(id, { status });
  }

  private seedDemoStrategies(userId: string): void {
    if (!userId) return;
    const existing = this.all.filter((s) => s.userId === userId);
    if (existing.length > 0) return;

    const now = new Date().toISOString();
    const demo: Strategy[] = [
      {
        id: crypto.randomUUID(),
        userId,
        name: 'sample',
        description: 'Custom options setup for NIFTY 50',
        status: 'DRAFT',
        timeSettings: { timezone: 'Asia/Kolkata', sessionStart: '11:32', sessionEnd: '15:20' },
        legs: [
          {
            id: crypto.randomUUID(),
            symbol: 'NIFTY50',
            direction: 'BUY',
            quantity: 1,
            orderType: 'MIS',
            days: ['MON', 'TUE', 'WED', 'THU', 'FRI'],
          },
        ],
        createdAt: now,
        updatedAt: now,
      },
      {
        id: crypto.randomUUID(),
        userId,
        name: 'N50 Option Buying',
        description: 'Intraday breakout strategy',
        status: 'LIVE',
        timeSettings: { timezone: 'Asia/Kolkata', sessionStart: '09:17', sessionEnd: '15:15' },
        legs: [],
        createdAt: now,
        updatedAt: now,
      },
      {
        id: crypto.randomUUID(),
        userId,
        name: 'Nifty Positional Selling',
        description: 'Positional option selling',
        status: 'DEPLOYED',
        timeSettings: { timezone: 'Asia/Kolkata', sessionStart: '09:25', sessionEnd: '15:15' },
        legs: [],
        createdAt: now,
        updatedAt: now,
      },
    ];
    this.all = [...this.all, ...demo];
  }
}
