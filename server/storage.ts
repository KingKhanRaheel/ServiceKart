import {
  users,
  sellerProfiles,
  type User,
  type UpsertUser,
  type SellerProfile,
  type InsertSellerProfile,
} from "@shared/schema";
import { db } from "./db";
import { eq } from "drizzle-orm";

// Interface for storage operations
export interface IStorage {
  // User operations (mandatory for Replit Auth)
  getUser(id: string): Promise<User | undefined>;
  upsertUser(user: UpsertUser): Promise<User>;
  updateUserRole(id: string, role: "buyer" | "seller"): Promise<void>;
  
  // Seller profile operations
  createSellerProfile(profile: InsertSellerProfile): Promise<SellerProfile>;
  getSellerProfileByUserId(userId: string): Promise<SellerProfile | undefined>;
  getAllVerifiedSellerProfiles(): Promise<(SellerProfile & { user?: User })[]>;
}

export class DatabaseStorage implements IStorage {
  // User operations
  async getUser(id: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async upsertUser(userData: UpsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(userData)
      .onConflictDoUpdate({
        target: users.id,
        set: {
          ...userData,
          updatedAt: new Date(),
        },
      })
      .returning();
    return user;
  }

  async updateUserRole(id: string, role: "buyer" | "seller"): Promise<void> {
    await db
      .update(users)
      .set({ role, updatedAt: new Date() })
      .where(eq(users.id, id));
  }

  // Seller profile operations
  async createSellerProfile(profileData: InsertSellerProfile): Promise<SellerProfile> {
    const [profile] = await db
      .insert(sellerProfiles)
      .values(profileData)
      .returning();
    return profile;
  }

  async getSellerProfileByUserId(userId: string): Promise<SellerProfile | undefined> {
    const [profile] = await db
      .select()
      .from(sellerProfiles)
      .where(eq(sellerProfiles.userId, userId));
    return profile;
  }

  async getAllVerifiedSellerProfiles(): Promise<(SellerProfile & { user?: User })[]> {
    const profiles = await db
      .select({
        profile: sellerProfiles,
        user: users,
      })
      .from(sellerProfiles)
      .leftJoin(users, eq(sellerProfiles.userId, users.id))
      .where(eq(sellerProfiles.isVerified, "verified"));

    return profiles.map(row => ({
      ...row.profile,
      user: row.user || undefined,
    }));
  }
}

export const storage = new DatabaseStorage();
