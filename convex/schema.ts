import { defineTable, defineSchema } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  messages: defineTable({
    username: v.string(),
    message: v.string(),
  }),
});
