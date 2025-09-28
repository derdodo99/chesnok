export enum AmountType {
  CREDIT = 'credit',
  DEBIT = 'debit',
  BUYIN = 'buyin',
  PAYOUT = 'payout',
  BONUS = 'bonus',
  MANUAL = 'manual',
}
export const AMOUNT_TYPES = [
  'credit',
  'debit',
  'buyin',
  'payout',
  'bonus',
  'manual',
] as const;
