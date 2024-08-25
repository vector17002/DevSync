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
   githubId: varchar("githubId").default("").notNull(),
   details: varchar("details", {length: 200}).default(""),
   status: varchar("status").$type<"compeleted" | "not-completed" | "on-going">().$default(() => "not-completed"),
   inviteUrl: varchar("inviteUrl").notNull(),
})


// relations
export const userRelations = relations(userTable ,  ({many}) => (
   {
      projectsId: many(projectTable)
   }
))

export const projectRelations = relations(projectTable, ({one , many}) => ({
   hostId: one(userTable, {
      fields: [projectTable.hostId],
      references: [userTable.id]
   }),
   waitingCollaborators : many(userTable)
}))

