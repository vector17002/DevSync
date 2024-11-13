import { relations, sql } from "drizzle-orm";
import { pgTable, uuid, varchar, date, text, timestamp, AnyPgColumn } from "drizzle-orm/pg-core";

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
   followers: varchar("followers").array().notNull().default(sql`ARRAY[]::varchar[]`),
   following: varchar("following").array().notNull().default(sql`ARRAY[]::varchar[]`),
   tagline: text("tagline").default("").notNull()
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

export const postTable = pgTable("Posts" , {
   id: uuid("id").primaryKey().notNull().defaultRandom(),
   title: varchar("title",{length: 255}).notNull(),
   authorId: varchar("authorId").references(() => userTable.id, { onDelete: "cascade"}).notNull(),
   content: text("content").notNull().default(""),
   postedAt: timestamp("postedAt").defaultNow(),
})

export const commentsTable = pgTable("Comments",{
   id: uuid("id").primaryKey().notNull().defaultRandom(),
   message: text("message").notNull(),
   createdAt: timestamp("createAt").defaultNow(),
   authorId : varchar("authorId").references(() => userTable.id, { onDelete : "cascade"}).notNull(),
   postId: uuid("postId").references(() => postTable.id , {onDelete: "cascade"}).notNull(),
   parentId: uuid("parent").references(() : AnyPgColumn => commentsTable.id , {onDelete : "cascade"}),
})



// RELATIONS
export const userRelations = relations(userTable ,  ({many}) => (
   {
      sessions: many(sessionTable),
      posts : many(postTable),
      comments : many(commentsTable)
   }
))

export const sessionRelations = relations(sessionTable,({one}) => ({
   hostId: one(userTable,{
      fields: [sessionTable.hostId],
      references: [userTable.id]
   })
}))

export const postRelations = relations(postTable, ({one , many}) => ({
    authorId : one(userTable, {
      fields: [postTable.authorId],
      references: [userTable.id]
    }),
    comments: many(commentsTable)
}))

export const commentRelations = relations(commentsTable, ({one}) => ({
   parentId: one(commentsTable,{
      fields: [commentsTable.parentId],
      references: [commentsTable.id]
   }),
   postId: one(postTable, {
      fields: [commentsTable.postId],
      references: [postTable.id]
   }),
   authorId: one(userTable,{
      fields: [commentsTable.authorId],
      references: [userTable.id]
   })
}))

// TYPES
export type UserTableType = typeof userTable.$inferInsert
export type SessionTableType = typeof sessionTable.$inferInsert

