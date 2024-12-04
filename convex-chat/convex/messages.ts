import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const getMessages = query({
  args: {},
  handler: async (ctx) => {
    const messages = await ctx.db.query("messages").order("desc").take(100);

    return messages.reverse();
  },
});

export const sendMessage = mutation({
  args: { username: v.string(), message: v.string() },
  handler: async (ctx, args) => {
    await ctx.db.insert("messages", {
      username: args.username,
      message: args.message,
    });
  },
});
