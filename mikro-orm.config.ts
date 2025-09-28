import 'dotenv/config';
import { defineConfig } from '@mikro-orm/postgresql';
import { TsMorphMetadataProvider } from '@mikro-orm/reflection';

export default defineConfig({
  metadataProvider: TsMorphMetadataProvider,
  entities: ['dist/**/*.entity.js'],
  entitiesTs: ['src/**/*.entity.ts'],

  dbName: process.env.DB_NAME ?? 'lootjoy',
  user: process.env.DB_USER ?? 'postgres',
  password: process.env.DB_PASSWORD ?? "1234",
  host: process.env.DB_HOST ?? 'localhost',
  port: Number(process.env.DB_PORT ?? 5432),

  debug: process.env.NODE_ENV !== 'production',
  migrations: {
    tableName: 'mikro_orm_migrations',
    path: 'migrations',
    pathTs: 'migrations',
    transactional: true,
  },
})
