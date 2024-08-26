import { defineConfig }  from "drizzle-kit";
import "@/lib/envConfig"
export default defineConfig({
    schema: "./db/schema.ts",
    out: "./drizzle",
    dialect: "postgresql"
})