export type StrategyStatus = 'LIVE' | 'CLOSED' | 'DEPLOYED' | 'DRAFT';

export interface StrategyLeg {
  id: string;
  symbol: string;
  direction: 'BUY' | 'SELL';
  quantity: number;
  orderType: string;
  days: string[];
}

export interface TimeSettings {
  timezone: string;
  sessionStart: string;
  sessionEnd: string;
}

export interface Strategy {
  id: string;
  userId: string;
  name: string;
  description?: string;
  status: StrategyStatus;
  timeSettings: TimeSettings;
  legs: StrategyLeg[];
  createdAt: string;
  updatedAt: string;
}
