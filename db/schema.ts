import { relations, sql } from "drizzle-orm";
import { pgTable, uuid, varchar, date, text } from "drizzle-orm/pg-core";

export const userTable = pgTable("Users",{
   id: varchar("id").primaryKey().notNull(),
   name: varchar("name").notNull(),
   email: varchar("email").notNull().unique(),
   image_url: varchar("imageUrl").notNull().default(""),
   bio: varchar("bio", {length: 500}).default(""),
   githubId: varchar("githubId").default(""),
   githubImageUrl : varchar("githubImageurl").default(""),
   skills: text("skills").default(""),
   location: text("location").default("Earth"),
   university: text("university").default(""),
})

export const sessionTable = pgTable("Sessions" , {
   id: uuid("id").primaryKey().notNull().defaultRandom(),
   name: varchar("name",{length: 255}).notNull(),
   hostId: varchar("hostId").references(() => userTable.id, { onDelete: "cascade"}).notNull(),
   githubRepo: varchar("githubRepo").default("").notNull(),
   details: varchar("details", {length: 200}).default(""),
   status: varchar("status").$type<"compeleted" | "not-completed" | "on-going">().$default(() => "on-going"),
   inviteUrl: varchar("inviteUrl").default(""),
   skills: text("skills").default(""),
   startAt: date("startAt").defaultNow(),
   endedAt: date("endedAt"),
})

// relations
export const userRelations = relations(userTable ,  ({many}) => (
   {
      sessionId: many(sessionTable)
   }
))

export const sessionRelations = relations(sessionTable,({one,many}) => ({
   hostId: one(userTable,{
      fields: [sessionTable.hostId],
      references: [userTable.id]
   })
}))


// types
export type UserTableType = typeof userTable.$inferInsert
export type SessionTableType = typeof sessionTable.$inferInsert