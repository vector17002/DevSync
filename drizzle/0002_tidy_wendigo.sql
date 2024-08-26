CREATE TABLE IF NOT EXISTS "Sessions" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar(255) NOT NULL,
	"hostId" varchar NOT NULL,
	"githubRepo" varchar DEFAULT '' NOT NULL,
	"details" varchar(200) DEFAULT '',
	"status" varchar,
	"inviteUrl" varchar NOT NULL
);
--> statement-breakpoint
ALTER TABLE "Projects" RENAME COLUMN "githubId" TO "githubRepo";--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "Sessions" ADD CONSTRAINT "Sessions_hostId_Users_id_fk" FOREIGN KEY ("hostId") REFERENCES "public"."Users"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
