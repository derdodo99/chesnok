import { Injectable } from '@nestjs/common';
import { EntityManager } from '@mikro-orm/postgresql';
import { Wallet } from '../../../entities/wallet.entity';
import { User } from '../../../entities/user.entity';

@Injectable()
export class WalletsRepository {
  constructor(private readonly em: EntityManager) {}

  async findByUser(user: User): Promise<Wallet | null> {
    return this.em.findOne(Wallet, { user });
  }

  create(user: User): Wallet {
    return this.em.create(Wallet, { user, balanceCrystals: 0 });
  }

  persist(wallet: Wallet): void {
    this.em.persist(wallet);
  }
}
