import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import * as schema from "./schema";
import { migrate } from 'drizzle-orm/neon-http/migrator';
import "@/lib/envConfig"

const sql = neon(process.env.DATABASE_URL!);
export const db = drizzle(sql , {schema});

// src/migrate.ts
const main = async () => {
  try {
    await migrate(db, { migrationsFolder: 'drizzle' });
    console.log('Migration completed');
  } catch (error) {
    console.error('Error during migration:', error);
    process.exit(1);
  }
};

//  main()