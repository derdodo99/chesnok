import {
  Entity,
  PrimaryKey,
  Property,
  ManyToOne,
  Index,
  Unique,
  Enum,
} from '@mikro-orm/core';
import { Wallet } from './wallet.entity';
import {
  AMOUNT_TYPES,
  AmountType,
} from '../modules/wallets/constants/amount-type.enum';

@Entity({ tableName: 'transactions' })
export class Transaction {
  @PrimaryKey()
  id!: number;

  @ManyToOne(() => Wallet)
  @Index({ name: 'transactions_wallet_id_idx' })
  wallet!: Wallet;

  @Property()
  amount!: number;

  @Enum({ items: () => AMOUNT_TYPES, type: 'string' })
  type!: AmountType;

  @Property({ nullable: true })
  reason?: string;

  @Property({ nullable: true })
  @Unique({
    name: 'transactions_correlation_id_uq',
    expression: 'unique ("correlation_id") where "correlation_id" is not null',
  })
  correlationId?: string;

  @Property({ onCreate: () => new Date() })
  @Index({ name: 'transactions_created_at_idx' })
  createdAt?: Date = new Date();
}
