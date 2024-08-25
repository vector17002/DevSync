CREATE TABLE IF NOT EXISTS "Projects" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar(255) NOT NULL,
	"hostId" varchar NOT NULL,
	"githubId" varchar DEFAULT '' NOT NULL,
	"details" varchar(200) DEFAULT '',
	"status" varchar,
	"inviteUrl" varchar NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "Users" (
	"id" varchar PRIMARY KEY NOT NULL,
	"name" varchar(255) NOT NULL,
	"email" varchar(255) NOT NULL,
	"imageUrl" varchar DEFAULT '' NOT NULL,
	"bio" varchar(500) DEFAULT '',
	"githubId" varchar DEFAULT '',
	"githubImageurl" varchar DEFAULT '',
	CONSTRAINT "Users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "Projects" ADD CONSTRAINT "Projects_hostId_Users_id_fk" FOREIGN KEY ("hostId") REFERENCES "public"."Users"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
