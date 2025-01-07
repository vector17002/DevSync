ALTER TABLE "Posts" ADD COLUMN "category" varchar NOT NULL;--> statement-breakpoint
ALTER TABLE "Posts" ADD COLUMN "likes" varchar[] DEFAULT ARRAY[]::varchar[] NOT NULL;