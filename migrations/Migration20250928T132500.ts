import { Migration } from '@mikro-orm/migrations';

export class Migration20250928T132500 extends Migration {
  async up(): Promise<void> {
    // Таблица транзакций кошельков
    this.addSql(`
      create table if not exists "transactions" (
        "id" serial primary key,
        "wallet_id" int not null,
        "amount" int not null,    
        "type" varchar(20) not null,  
        "reason" varchar(64) null,                    -- короткая причина/метка
        "correlation_id" varchar(128) null,           -- идемпотентность: уникальный ключ операции
        "created_at" timestamptz not null default now(),
        constraint "transactions_wallet_id_fk"
          foreign key ("wallet_id") references "wallets" ("id")
          on update cascade on delete cascade
      );
    `);

    this.addSql(`
      create unique index if not exists "transactions_correlation_id_uq"
      on "transactions" ("correlation_id")
      where "correlation_id" is not null;
    `);

    this.addSql(`create index if not exists "transactions_wallet_id_idx" on "transactions" ("wallet_id");`);
    this.addSql(`create index if not exists "transactions_created_at_idx" on "transactions" ("created_at");`);
  }

  async down(): Promise<void> {
    this.addSql(`drop table if exists "transactions" cascade;`);
  }
}
