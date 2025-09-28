import { Migration } from '@mikro-orm/migrations';

export class Migration20250928072608 extends Migration {
  async up(): Promise<void> {
    this.addSql(`
      create table if not exists "users" (
        "id" serial primary key,
        "telegram_id" varchar(64) not null unique,
        "username" varchar(64) null,
        "country" varchar(10) not null default 'RU',
        "created_at" timestamptz not null default now(),
        "updated_at" timestamptz null
      );
    `);

    // wallets
    this.addSql(`
      create table if not exists "wallets" (
        "id" serial primary key,
        "user_id" int not null unique,
        "balance_crystals" int not null default 0,
        "created_at" timestamptz not null default now(),
        "updated_at" timestamptz null,
        constraint "wallets_user_id_fk"
          foreign key ("user_id") references "users" ("id")
          on update cascade on delete cascade
      );
    `);

    this.addSql(`create index if not exists "users_telegram_id_idx" on "users" ("telegram_id");`);
  }

  async down(): Promise<void> {
    this.addSql(`drop table if exists "wallets" cascade;`);
    this.addSql(`drop table if exists "users" cascade;`);
  }
}
