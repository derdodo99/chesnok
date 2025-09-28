
import { Injectable } from '@nestjs/common';
import { TransactionsRepository } from './repository/transactions.repository.js';
import { Wallet } from '../../entities/wallet.entity.js';
import { AmountType } from '../wallets/constants/amount-type.enum.js';
import { TxCreateResult } from './types/tx-create-result.type.js';
import { PG_UNIQUE_VIOLATION } from './constants/index.js';

@Injectable()
export class TransactionsService {
  constructor(private readonly repo: TransactionsRepository) {}

  /**
   * Идемпотентное создание транзакции.
   * Если передан correlationId и такая транзакция уже существует — вернёт её id и флаг idempotent.
   */
  async createIdempotent(
    wallet: Wallet,
    amount: number,
    type: AmountType,
    opts?: { reason?: string; correlationId?: string },
  ): Promise<TxCreateResult> {
    const { reason, correlationId } = opts ?? {};

    if (correlationId) {
      const existing = await this.repo.findByCorrelationId(correlationId);
      if (existing) {
        return { transactionId: existing.id, idempotent: true };
      }
    }

    try {
      const tx = await this.repo.create(wallet, amount, type, {
        reason,
        correlationId,
      });
      return { transactionId: tx.id, idempotent: false as const };
    } catch (e: any) {
      // конфликт по уникальному индексу (correlation_id)
      if (correlationId && e?.code === PG_UNIQUE_VIOLATION) {
        const existing = await this.repo.findByCorrelationId(correlationId);
        if (existing) return { transactionId: existing.id, idempotent: true };
      }
      throw e;
    }
  }

  async listForWallet(wallet: Wallet, limit = 50, offset = 0) {
    return this.repo.listByWallet(wallet, limit, offset);
  }

  async getByCorrelationId(correlationId: string) {
    return this.repo.findByCorrelationId(correlationId);
  }
}
