CREATE TABLE IF NOT EXISTS "testimonials" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"from_user_id" varchar NOT NULL,
	"to_user_id" varchar NOT NULL,
	"content" text NOT NULL,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "testimonials" ADD CONSTRAINT "testimonials_from_user_id_Users_id_fk" FOREIGN KEY ("from_user_id") REFERENCES "public"."Users"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "testimonials" ADD CONSTRAINT "testimonials_to_user_id_Users_id_fk" FOREIGN KEY ("to_user_id") REFERENCES "public"."Users"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
