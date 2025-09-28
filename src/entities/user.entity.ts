import { Entity, PrimaryKey, Property } from '@mikro-orm/core';

@Entity({ tableName: 'users' })
export class User {
  @PrimaryKey()
  id!: number;

  @Property({ unique: true })
  telegramId!: string;

  @Property({ nullable: true })
  username?: string;

  @Property({ default: 'RU' })
  country!: 'RU' | 'NON_RU';

  @Property({ onCreate: () => new Date() })
  createdAt?: Date = new Date();

  @Property({ onUpdate: () => new Date(), nullable: true })
  updatedAt?: Date;
}
