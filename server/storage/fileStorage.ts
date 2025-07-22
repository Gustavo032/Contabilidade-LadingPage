import {
  type User,
  type InsertUser,
  type CnaeData,
  type InsertCnaeData,
  type ContactSubmission,
  type InsertContactSubmission,
  type BlogPost,
} from "@shared/schema";
import { IStorage } from "./types";
import { readJson, writeJson } from "./fileUtils";

export class FileStorage implements IStorage {
  usersFile = "users.json";
  cnaeFile = "cnaeData.json";
  contactsFile = "contactSubmissions.json";
  blogsFile = "blogPosts.json";

  async getUser(id: number): Promise<User | undefined> {
    const users = await readJson<User[]>(this.usersFile);
    return users.find(u => u.id === id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const users = await readJson<User[]>(this.usersFile);
    return users.find(u => u.username === username);
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const users = await readJson<User[]>(this.usersFile);
    const newUser: User = {
      id: users.length ? users[users.length - 1].id + 1 : 1,
      ...insertUser,
    };
    users.push(newUser);
    await writeJson(this.usersFile, users);
    return newUser;
  }

  async searchCnae(query: string): Promise<CnaeData[]> {
    const cnaeList = await readJson<CnaeData[]>(this.cnaeFile);
    const q = query.toLowerCase();
    return cnaeList.filter(c =>
      c.description.toLowerCase().includes(q) ||
      c.code.includes(q) ||
      (c.keywords?.toLowerCase().includes(q) ?? false)
    ).slice(0, 20);
  }

  async getAllCnae(): Promise<CnaeData[]> {
    return await readJson<CnaeData[]>(this.cnaeFile);
  }

  async createCnae(insertCnae: InsertCnaeData): Promise<CnaeData> {
    const cnaes = await readJson<CnaeData[]>(this.cnaeFile);
    const newCnae: CnaeData = {
      id: cnaes.length ? cnaes[cnaes.length - 1].id + 1 : 1,
      canBeMei: insertCnae.canBeMei ?? false,
      isFatorR: insertCnae.isFatorR ?? false,
      allowedActivities: insertCnae.allowedActivities ?? "",
      restrictedActivities: insertCnae.restrictedActivities ?? "",
      observations: insertCnae.observations ?? "",
      keywords: insertCnae.keywords ?? "",
      ...insertCnae,
    };
    cnaes.push(newCnae);
    await writeJson(this.cnaeFile, cnaes);
    return newCnae;
  }
	
	async createContactSubmission(insertContact: InsertContactSubmission): Promise<ContactSubmission> {
		const contacts = await readJson<ContactSubmission[]>(this.contactsFile);
		const newContact: ContactSubmission = {
			id: contacts.length ? contacts[contacts.length - 1].id + 1 : 1,
			name: insertContact.name,
			email: insertContact.email,
			phone: insertContact.phone,
			service: insertContact.service ?? null,  // se undefined, vira null
			message: insertContact.message ?? null,  // se undefined, vira null
			createdAt: new Date(),
		};
		contacts.push(newContact);
		await writeJson(this.contactsFile, contacts);
		return newContact;
	}

  async getAllBlogPosts(): Promise<BlogPost[]> {
    return await readJson<BlogPost[]>(this.blogsFile);
  }

  async getBlogPostBySlug(slug: string): Promise<BlogPost | undefined> {
    const posts = await readJson<BlogPost[]>(this.blogsFile);
    return posts.find(p => p.slug === slug);
  }

  async seedCnaeData(): Promise<void> {
    const cnaes = await readJson<CnaeData[]>(this.cnaeFile);
    if (cnaes.length > 0) {
      console.log("CNAE data already exists, skipping seed");
      return;
    }

    const cnaeList: InsertCnaeData[] = [
      {
        code: "0111301",
        description: "Cultivo de arroz",
        canBeMei: false,
        isFatorR: false,
        allowedActivities: "",
        restrictedActivities: "",
        observations: "",
        keywords: "",
      },
      // ... complete com os outros CNAEs
    ];

    await writeJson(this.cnaeFile, cnaeList);
    console.log(`Seeded ${cnaeList.length} CNAE records`);
  }
}
