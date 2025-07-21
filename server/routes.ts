import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertContactSchema, insertCnaeSchema } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // CNAE search endpoint
  app.get("/api/cnae/search", async (req, res) => {
    try {
      const { query } = req.query;
      
      console.log("CNAE search request:", { query });
      
      if (!query || typeof query !== 'string') {
        console.log("Invalid query parameter");
        return res.status(400).json({ message: "Query parameter is required" });
      }

      if (query.length < 2) {
        console.log("Query too short");
        return res.status(400).json({ message: "Query must be at least 2 characters long" });
      }

      const results = await storage.searchCnae(query);
      console.log(`Returning ${results.length} results for query: ${query}`);
      res.json(results);
    } catch (error) {
      console.error("Error searching CNAE:", error);
      res.status(500).json({ 
        message: "Internal server error", 
        error: process.env.NODE_ENV === 'development' ? error.message : undefined 
      });
    }
  });

  // Get all CNAE data (for admin purposes)
  app.get("/api/cnae", async (req, res) => {
    try {
      const cnaeList = await storage.getAllCnae();
      res.json(cnaeList);
    } catch (error) {
      console.error("Error fetching CNAE data:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });

  // Create CNAE entry (for seeding data)
  app.post("/api/cnae", async (req, res) => {
    try {
      const validatedData = insertCnaeSchema.parse(req.body);
      const cnae = await storage.createCnae(validatedData);
      res.status(201).json(cnae);
    } catch (error) {
      console.error("Error creating CNAE:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });

  // Contact form submission
  app.post("/api/contact", async (req, res) => {
    try {
      const validatedData = insertContactSchema.parse(req.body);
      const contact = await storage.createContactSubmission(validatedData);
      res.status(201).json({ 
        message: "Mensagem enviada com sucesso! Entraremos em contato em breve.",
        id: contact.id
      });
    } catch (error) {
      console.error("Error creating contact submission:", error);
      res.status(500).json({ message: "Erro interno do servidor" });
    }
  });

  // Get blog posts
  app.get("/api/blog", async (req, res) => {
    try {
      const posts = await storage.getAllBlogPosts();
      res.json(posts);
    } catch (error) {
      console.error("Error fetching blog posts:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });

  // Get single blog post by slug
  app.get("/api/blog/:slug", async (req, res) => {
    try {
      const { slug } = req.params;
      const post = await storage.getBlogPostBySlug(slug);
      
      if (!post) {
        return res.status(404).json({ message: "Post not found" });
      }
      
      res.json(post);
    } catch (error) {
      console.error("Error fetching blog post:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });

  // Seed CNAE data endpoint (for initial setup)
  app.post("/api/seed-cnae", async (req, res) => {
    try {
      await storage.seedCnaeData();
      res.json({ message: "CNAE data seeded successfully" });
    } catch (error) {
      console.error("Error seeding CNAE data:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });

  // Initialize CNAE data if needed
  app.get("/api/cnae/init", async (req, res) => {
    try {
      await storage.seedCnaeData();
      res.json({ message: "CNAE data initialized successfully" });
    } catch (error) {
      console.error("Error initializing CNAE data:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
