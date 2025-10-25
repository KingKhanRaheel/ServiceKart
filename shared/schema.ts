import { sql } from 'drizzle-orm';
import {
  index,
  jsonb,
  pgTable,
  text,
  timestamp,
  varchar,
  integer,
} from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Session storage table for Replit Auth
export const sessions = pgTable(
  "sessions",
  {
    sid: varchar("sid").primaryKey(),
    sess: jsonb("sess").notNull(),
    expire: timestamp("expire").notNull(),
  },
  (table) => [index("IDX_session_expire").on(table.expire)],
);

// User storage table with role field for buyer/seller differentiation
export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  email: varchar("email").unique(),
  firstName: varchar("first_name"),
  lastName: varchar("last_name"),
  profileImageUrl: varchar("profile_image_url"),
  role: varchar("role", { length: 20 }).notNull().default("buyer"), // 'buyer' or 'seller'
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Seller profiles table with detailed business information
export const sellerProfiles = pgTable("seller_profiles", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  businessName: varchar("business_name", { length: 255 }).notNull(),
  serviceCategory: varchar("service_category", { length: 100 }).notNull(),
  description: text("description").notNull(),
  contactNumber: varchar("contact_number", { length: 20 }).notNull(),
  address: text("address").notNull(),
  serviceArea: varchar("service_area", { length: 100 }),
  experienceYears: integer("experience_years").notNull(),
  isVerified: varchar("is_verified").notNull().default("pending"), // 'pending', 'verified', 'rejected'
  rating: integer("rating").default(0), // 0-5 scale, stored as integer (multiply by 10 for decimals)
  reviewCount: integer("review_count").default(0),
  priceRange: varchar("price_range", { length: 50 }), // e.g., "₹500-1000/hr"
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Type exports
export type User = typeof users.$inferSelect;
export type UpsertUser = typeof users.$inferInsert;

export type SellerProfile = typeof sellerProfiles.$inferSelect;
export type InsertSellerProfile = typeof sellerProfiles.$inferInsert;

// Zod schemas for validation
export const insertSellerProfileSchema = createInsertSchema(sellerProfiles).omit({
  id: true,
  userId: true,
  isVerified: true,
  rating: true,
  reviewCount: true,
  createdAt: true,
  updatedAt: true,
}).extend({
  businessName: z.string().min(2, "Business name must be at least 2 characters"),
  serviceCategory: z.string().min(1, "Please select a service category"),
  description: z.string().min(20, "Description must be at least 20 characters"),
  contactNumber: z.string().min(10, "Please enter a valid contact number"),
  address: z.string().min(10, "Address must be at least 10 characters"),
  experienceYears: z.number().min(0, "Experience cannot be negative").max(50, "Please enter valid years of experience"),
  serviceArea: z.string().optional(),
  priceRange: z.string().optional(),
});

export type InsertSellerProfileInput = z.infer<typeof insertSellerProfileSchema>;

// Service categories enum for consistency
export const SERVICE_CATEGORIES = [
  "Plumbing",
  "Electrical",
  "Tutoring",
  "Housekeeping",
  "Carpentry",
  "Cleaning",
  "Gardening",
  "Appliance Repair",
  "Painting",
  "Home Renovation",
  "Pest Control",
  "AC Repair",
] as const;
