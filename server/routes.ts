import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { setupAuth, isAuthenticated } from "./replitAuth";
import { insertSellerProfileSchema } from "@shared/schema";
import { fromError } from "zod-validation-error";

export async function registerRoutes(app: Express): Promise<Server> {
  // Auth middleware
  await setupAuth(app);

  // Auth routes
  app.get('/api/auth/user', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const user = await storage.getUser(userId);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      res.json(user);
    } catch (error) {
      console.error("Error fetching user:", error);
      res.status(500).json({ message: "Failed to fetch user" });
    }
  });

  // Seller profile routes
  app.post("/api/seller-profile", isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      
      // Check if seller profile already exists
      const existingProfile = await storage.getSellerProfileByUserId(userId);
      if (existingProfile) {
        return res.status(400).json({ message: "Seller profile already exists" });
      }

      // Validate request body
      const validationResult = insertSellerProfileSchema.safeParse(req.body);
      if (!validationResult.success) {
        const validationError = fromError(validationResult.error);
        return res.status(400).json({ message: validationError.toString() });
      }

      // Create seller profile
      const profile = await storage.createSellerProfile({
        ...validationResult.data,
        userId,
      });

      // Update user role to seller
      await storage.updateUserRole(userId, "seller");

      res.status(201).json(profile);
    } catch (error) {
      console.error("Error creating seller profile:", error);
      res.status(500).json({ message: "Failed to create seller profile" });
    }
  });

  app.get("/api/seller-profile/me", isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const profile = await storage.getSellerProfileByUserId(userId);
      
      if (!profile) {
        return res.status(404).json({ message: "Seller profile not found" });
      }

      res.json(profile);
    } catch (error) {
      console.error("Error fetching seller profile:", error);
      res.status(500).json({ message: "Failed to fetch seller profile" });
    }
  });

  app.get("/api/seller-profiles", async (req, res) => {
    try {
      const profiles = await storage.getAllVerifiedSellerProfiles();
      res.json(profiles);
    } catch (error) {
      console.error("Error fetching seller profiles:", error);
      res.status(500).json({ message: "Failed to fetch seller profiles" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
