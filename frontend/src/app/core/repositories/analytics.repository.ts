import { Injectable } from '@angular/core';
import { StrategyRepository } from './strategy.repository';
import { AuthService } from '../services/auth.service';
import { AnalyticsSummary, StrategyAnalytics } from '../models/analytics.model';

@Injectable({ providedIn: 'root' })
export class AnalyticsRepository {
  constructor(
    private strategyRepo: StrategyRepository,
    private auth: AuthService
  ) {}

  getSummary(): AnalyticsSummary {
    const user = this.auth.getCurrentUser();
    if (!user) {
      return { totalStrategies: 0, liveStrategies: 0, totalPnl: 0, winRate: 0, totalTrades: 0 };
    }
    const strategies = this.strategyRepo.getByUser(user.userId);
    const live = strategies.filter((s) => s.status === 'LIVE' || s.status === 'DEPLOYED').length;
    return {
      totalStrategies: strategies.length,
      liveStrategies: live,
      totalPnl: 0,
      winRate: 0,
      totalTrades: 0,
    };
  }

  getByStrategyId(strategyId: string): StrategyAnalytics | undefined {
    const strategy = this.strategyRepo.getById(strategyId);
    if (!strategy) return undefined;
    const from = strategy.createdAt.slice(0, 10);
    const to = new Date().toISOString().slice(0, 10);
    return {
      strategyId: strategy.id,
      strategyName: strategy.name,
      pnl: 0,
      winRate: 0,
      tradeCount: 0,
      period: { from, to },
    };
  }
}
