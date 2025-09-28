export type TxCreateResult =
  | { transactionId: number; idempotent?: false }
  | { transactionId: number; idempotent: true };
