export interface AnalyticsSummary {
  totalStrategies: number;
  liveStrategies: number;
  totalPnl: number;
  winRate: number;
  totalTrades: number;
}

export interface StrategyAnalytics {
  strategyId: string;
  strategyName: string;
  pnl: number;
  winRate: number;
  tradeCount: number;
  period: { from: string; to: string };
}
