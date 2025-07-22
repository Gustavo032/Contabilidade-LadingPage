import {
  type User,
  type InsertUser,
  type CnaeData,
  type InsertCnaeData,
  type ContactSubmission,
  type InsertContactSubmission,
  type BlogPost,
} from "@shared/schema";

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(insertUser: InsertUser): Promise<User>;
  searchCnae(query: string): Promise<CnaeData[]>;
  getAllCnae(): Promise<CnaeData[]>;
  createCnae(insertCnae: InsertCnaeData): Promise<CnaeData>;
  createContactSubmission(insertContact: InsertContactSubmission): Promise<ContactSubmission>;
  getAllBlogPosts(): Promise<BlogPost[]>;
  getBlogPostBySlug(slug: string): Promise<BlogPost | undefined>;
  seedCnaeData(): Promise<void>;
}
