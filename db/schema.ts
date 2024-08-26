import { relations } from "drizzle-orm";
import { pgTable, uuid, varchar } from "drizzle-orm/pg-core";

export const userTable = pgTable("Users",{
   id: varchar("id").primaryKey().notNull(),
   name: varchar("name").notNull(),
   email: varchar("email").notNull().unique(),
   image_url: varchar("imageUrl").notNull().default(""),
   bio: varchar("bio", {length: 500}).default(""),
   githubId: varchar("githubId").default(""),
   githubImageUrl : varchar("githubImageurl").default("")
})

export const projectTable = pgTable("Projects",{
   id: uuid("id").primaryKey().notNull().defaultRandom(),
   name: varchar("name",{length: 255}).notNull(),
   hostId: varchar("hostId").references(() => userTable.id, { onDelete: "cascade"}).notNull(),
   githubRepo: varchar("githubRepo").default("").notNull(),
   details: varchar("details", {length: 200}).default(""),
   status: varchar("status").$type<"compeleted" | "not-completed" | "on-going">().$default(() => "not-completed"),
   inviteUrl: varchar("inviteUrl").notNull(),
})

export const sessionTable = pgTable("Sessions" , {
   id: uuid("id").primaryKey().notNull().defaultRandom(),
   name: varchar("name",{length: 255}).notNull(),
   hostId: varchar("hostId").references(() => userTable.id, { onDelete: "cascade"}).notNull(),
   githubRepo: varchar("githubRepo").default("").notNull(),
   details: varchar("details", {length: 200}).default(""),
   status: varchar("status").$type<"compeleted" | "not-completed" | "on-going">().$default(() => "not-completed"),
   inviteUrl: varchar("inviteUrl").notNull().default(""),
})

// relations
export const userRelations = relations(userTable ,  ({many}) => (
   {
      projectsId: many(projectTable),
      sessionId: many(sessionTable)
   }
))

export const projectRelations = relations(projectTable, ({one , many}) => ({
   hostId: one(userTable, {
      fields: [projectTable.hostId],
      references: [userTable.id]
   }),
   waitingCollaborators : many(userTable),
   collaborators: many(userTable)
}))

export const sessionRelations = relations(sessionTable,({one,many}) => ({
   hostId: one(userTable,{
      fields: [sessionTable.hostId],
      references: [userTable.id]
   }),
   collaborators: many(userTable)
}))


// types
export type UserTableType = typeof userTable.$inferInsert
export type ProjectTableType = typeof projectTable.$inferInsert
export type SessionTableType = typeof sessionTable.$inferInsert