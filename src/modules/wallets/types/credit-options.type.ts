import { AmountType } from '../constants/amount-type.enum.js';

export interface CreditOptions {
  userId: number;
  amount: number;
  reason?: string;
  correlationId?: string;
  type?: AmountType;
}
