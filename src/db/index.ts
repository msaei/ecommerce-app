import { parseEnv } from "@neon/env";
import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";

import neonConfig from "../../neon";
import * as schema from "./schema";

// Pooled connection string, pulled into `.env.local` by `neon deploy` / `neon env pull`.
const { postgres } = parseEnv(neonConfig, ["DATABASE_URL"]);

const sql = neon(postgres.databaseUrl);

export const db = drizzle(sql, { schema });
