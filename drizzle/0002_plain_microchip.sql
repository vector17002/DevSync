ALTER TABLE "testimonials" RENAME TO "Testimonials";--> statement-breakpoint
ALTER TABLE "Testimonials" DROP CONSTRAINT "testimonials_from_user_id_Users_id_fk";
--> statement-breakpoint
ALTER TABLE "Testimonials" DROP CONSTRAINT "testimonials_to_user_id_Users_id_fk";
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "Testimonials" ADD CONSTRAINT "Testimonials_from_user_id_Users_id_fk" FOREIGN KEY ("from_user_id") REFERENCES "public"."Users"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "Testimonials" ADD CONSTRAINT "Testimonials_to_user_id_Users_id_fk" FOREIGN KEY ("to_user_id") REFERENCES "public"."Users"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
