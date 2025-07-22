import type { Express } from "express";
import { createServer, type Server } from "http";
// Assuming you have an index.ts in storage that exports a 'storage' instance
// Or, if you have a FileStorage class, import it and instantiate it
import { FileStorage } from "./storage"; // Adjust path if FileStorage is in a different file, e.g., './storage/fileUtils'
import { insertContactSchema, insertCnaeSchema } from "@shared/schema";

// Instantiate your storage class
const storage = new FileStorage();

// Interface para dados do IBGE
interface IBGECnaeResponse {
  id: string;
  descricao: string;
  observacoes?: string;
}

export async function registerRoutes(app: Express): Promise<Server> {
  // CNAE search endpoint
  app.get("/api/cnae/search", async (req, res) => {
    try {
      const { query } = req.query;

      console.log("CNAE search request:", { query });

      if (!query || typeof query !== "string") {
        console.log("Invalid query parameter");
        return res.status(400).json({ message: "Query parameter is required" });
      }

      if (query.length < 2) {
        console.log("Query too short");
        return res
          .status(400)
          .json({ message: "Query must be at least 2 characters long" });
      }

      const results = await storage.searchCnae(query);
      console.log(`Returning ${results.length} results for query: ${query}`);
      res.json(results);
    } catch (error) {
      console.error("Error searching CNAE:", error);
      let errorMessage: string | undefined;
      if (error instanceof Error) {
        errorMessage = error.message;
      } else {
        errorMessage = String(error); // Fallback for non-Error objects
      }
      res.status(500).json({
        message: "Internal server error",
        error: process.env.NODE_ENV === "development" ? errorMessage : undefined,
      });
    }
  });

  // Get CNAE details from IBGE API
  app.get("/api/cnae/:code/details", async (req, res) => {
    try {
      const { code } = req.params;

      console.log(`Fetching CNAE details for code: ${code}`);

      // Fetch from IBGE API
      const response = await fetch(
        `https://servicodados.ibge.gov.br/api/v2/cnae/subclasses/${code}`
      );

      if (!response.ok) {
        return res
          .status(404)
          .json({ message: "CNAE não encontrado na base do IBGE" });
      }

      const data: IBGECnaeResponse[] = await response.json();

      if (data && data.length > 0) {
        const cnaeInfo = data[0];
        res.json({
          code: cnaeInfo.id,
          description: cnaeInfo.descricao,
          observations: cnaeInfo.observacoes || "",
          source: "IBGE",
        });
      } else {
        res.status(404).json({ message: "CNAE não encontrado" });
      }
    } catch (error) {
      console.error("Error fetching CNAE details from IBGE:", error);
      let errorMessage: string | undefined;
      if (error instanceof Error) {
        errorMessage = error.message;
      } else {
        errorMessage = String(error);
      }
      res.status(500).json({
        message: "Erro ao consultar dados do IBGE",
        error: process.env.NODE_ENV === "development" ? errorMessage : undefined,
      });
    }
  });

  // Get all CNAE data (for admin purposes)
  app.get("/api/cnae", async (_req, res) => { // 'req' is unused
    try {
      const cnaeList = await storage.getAllCnae();
      res.json(cnaeList);
    } catch (error) {
      console.error("Error fetching CNAE data:", error);
      let errorMessage: string | undefined;
      if (error instanceof Error) {
        errorMessage = error.message;
      } else {
        errorMessage = String(error);
      }
      res.status(500).json({
        message: "Internal server error",
        error: process.env.NODE_ENV === "development" ? errorMessage : undefined,
      });
    }
  });

  // Create CNAE entry (for seeding data)
  app.post("/api/cnae", async (_req, res) => { // 'req' is unused as you get body from req.body
    try {
      // It's good practice to use req.body directly here
      const validatedData = insertCnaeSchema.parse(_req.body);
      const cnae = await storage.createCnae(validatedData);
      res.status(201).json(cnae);
    } catch (error) {
      console.error("Error creating CNAE:", error);
      let errorMessage: string | undefined;
      if (error instanceof Error) {
        errorMessage = error.message;
      } else {
        errorMessage = String(error);
      }
      res.status(500).json({
        message: "Internal server error",
        error: process.env.NODE_ENV === "development" ? errorMessage : undefined,
      });
    }
  });

  // Contact form submission
  app.post("/api/contact", async (_req, res) => { // 'req' is unused
    try {
      // It's good practice to use req.body directly here
      const validatedData = insertContactSchema.parse(_req.body);
      const contact = await storage.createContactSubmission(validatedData);
      res.status(201).json({
        message: "Mensagem enviada com sucesso! Entraremos em contato em breve.",
        id: contact.id,
      });
    } catch (error) {
      console.error("Error creating contact submission:", error);
      let errorMessage: string | undefined;
      if (error instanceof Error) {
        errorMessage = error.message;
      } else {
        errorMessage = String(error);
      }
      res.status(500).json({
        message: "Erro interno do servidor",
        error: process.env.NODE_ENV === "development" ? errorMessage : undefined,
      });
    }
  });

  // Get blog posts
  app.get("/api/blog", async (_req, res) => { // 'req' is unused
    try {
      const posts = await storage.getAllBlogPosts();
      res.json(posts);
    } catch (error) {
      console.error("Error fetching blog posts:", error);
      let errorMessage: string | undefined;
      if (error instanceof Error) {
        errorMessage = error.message;
      } else {
        errorMessage = String(error);
      }
      res.status(500).json({
        message: "Internal server error",
        error: process.env.NODE_ENV === "development" ? errorMessage : undefined,
      });
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
      let errorMessage: string | undefined;
      if (error instanceof Error) {
        errorMessage = error.message;
      } else {
        errorMessage = String(error);
      }
      res.status(500).json({
        message: "Internal server error",
        error: process.env.NODE_ENV === "development" ? errorMessage : undefined,
      });
    }
  });

  // Initialize CNAE data if needed
  app.get("/api/cnae/init", async (_req, res) => { // 'req' is unused
    try {
      await storage.seedCnaeData();
      res.json({ message: "CNAE data initialized successfully" });
    } catch (error) {
      console.error("Error initializing CNAE data:", error);
      let errorMessage: string | undefined;
      if (error instanceof Error) {
        errorMessage = error.message;
      } else {
        errorMessage = String(error);
      }
      res.status(500).json({
        message: "Internal server error",
        error: process.env.NODE_ENV === "development" ? errorMessage : undefined,
      });
    }
  });

//   // Seed all CNAE data (development only)
//   app.post("/api/cnae/seed-all", async (_req, res) => { // 'req' is unused
//     try {
//       if (process.env.NODE_ENV === "production") {
//         return res.status(403).json({ message: "Not allowed in production" });
//       }

//       // Dynamically import to avoid issues if seed-cnae.ts doesn't always exist
//       const { seedAllCnaeData } = await import('./seed-cnae');
//       await seedAllCnaeData();
//       res.json({ message: "All CNAE data seeded successfully" });
//     } catch (error) {
//       console.error("Error seeding all CNAE data:", error);
//       let errorMessage: string | undefined;
//       if (error instanceof Error) {
//         errorMessage = error.message;
//       } else {
//         errorMessage = String(error);
//       }
//       res.status(500).json({
//         message: "Internal server error",
//         error: process.env.NODE_ENV === "development" ? errorMessage : undefined,
//       });
//     }
//   });

  const httpServer = createServer(app);
  return httpServer;
}