import { Entity, PrimaryKey, Property, OneToOne } from '@mikro-orm/core';
import { User } from './user.entity';

@Entity({ tableName: 'wallets' })
export class Wallet {
  @PrimaryKey()
  id!: number;

  @OneToOne(() => User, { unique: true })
  user!: User;

  @Property({ default: 0 })
  balanceCrystals!: number;

  @Property({ onCreate: () => new Date() })
  createdAt?: Date = new Date();

  @Property({ onUpdate: () => new Date(), nullable: true })
  updatedAt?: Date;
}
