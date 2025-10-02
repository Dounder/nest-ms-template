import path from 'node:path';
import { config } from 'dotenv';
import type { PrismaConfig } from 'prisma/config';

config({ path: '.env' });

export default {
  schema: path.join('src', 'prisma'),
} satisfies PrismaConfig;
