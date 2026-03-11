export type ReviewStatus = 'NEW' | 'GENERATED' | 'APPROVED' | 'FAILED';
export type RuleMode = 'AUTO' | 'SUGGEST';

export interface LogEntry {
  provider: string;
  latencyMs: number;
  attempts: number;
  timestamp: string;
}

export interface AutoReplyRule {
  id: string;
  name: string;
  mode: RuleMode;
  promptTemplate: string;
  triggerConditions?: string[];
  provider?: string;
  status?: 'ACTIVE' | 'PAUSED';
}

export interface Review {
  id: string;
  rating: number;
  text: string;
  productName: string;
  buyerName: string;
  date: string;
  status: ReviewStatus;
  aiDraft?: string;
  logs?: LogEntry[];
}
