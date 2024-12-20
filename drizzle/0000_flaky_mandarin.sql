CREATE TABLE IF NOT EXISTS "Comments" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"message" text NOT NULL,
	"createAt" timestamp DEFAULT now(),
	"authorId" varchar NOT NULL,
	"postId" uuid NOT NULL,
	"parent" uuid
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "Posts" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"title" varchar(255) NOT NULL,
	"authorId" varchar NOT NULL,
	"content" text DEFAULT '' NOT NULL,
	"postedAt" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "Sessions" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar(255) NOT NULL,
	"hostId" varchar NOT NULL,
	"githubRepo" varchar DEFAULT '' NOT NULL,
	"details" varchar(200) DEFAULT '',
	"status" varchar,
	"inviteUrl" varchar DEFAULT '',
	"skills" text DEFAULT '',
	"startAt" date DEFAULT now(),
	"endedAt" date
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "Users" (
	"id" varchar PRIMARY KEY NOT NULL,
	"name" varchar NOT NULL,
	"email" varchar NOT NULL,
	"imageUrl" varchar DEFAULT '' NOT NULL,
	"bio" varchar(500) DEFAULT '',
	"githubId" varchar DEFAULT '',
	"githubImageurl" varchar DEFAULT '',
	"skills" text DEFAULT '',
	"location" text DEFAULT 'Earth',
	"university" text DEFAULT '',
	"followers" varchar[] DEFAULT ARRAY[]::varchar[] NOT NULL,
	"following" varchar[] DEFAULT ARRAY[]::varchar[] NOT NULL,
	"tagline" text DEFAULT '' NOT NULL,
	CONSTRAINT "Users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "Comments" ADD CONSTRAINT "Comments_authorId_Users_id_fk" FOREIGN KEY ("authorId") REFERENCES "public"."Users"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "Comments" ADD CONSTRAINT "Comments_postId_Posts_id_fk" FOREIGN KEY ("postId") REFERENCES "public"."Posts"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "Comments" ADD CONSTRAINT "Comments_parent_Comments_id_fk" FOREIGN KEY ("parent") REFERENCES "public"."Comments"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "Posts" ADD CONSTRAINT "Posts_authorId_Users_id_fk" FOREIGN KEY ("authorId") REFERENCES "public"."Users"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "Sessions" ADD CONSTRAINT "Sessions_hostId_Users_id_fk" FOREIGN KEY ("hostId") REFERENCES "public"."Users"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
