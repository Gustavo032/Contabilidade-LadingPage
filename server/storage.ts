
import { users, cnaeData, contactSubmissions, blogPosts, type User, type InsertUser, type CnaeData, type InsertCnaeData, type ContactSubmission, type InsertContactSubmission, type BlogPost, type InsertBlogPost } from "@shared/schema";
import { db } from "./db";
import { eq, ilike, or } from "drizzle-orm";

interface IStorage {
  // User methods
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(insertUser: InsertUser): Promise<User>;
  
  // CNAE methods
  searchCnae(query: string): Promise<CnaeData[]>;
  getAllCnae(): Promise<CnaeData[]>;
  createCnae(insertCnae: InsertCnaeData): Promise<CnaeData>;
  seedCnaeData(): Promise<void>;
  
  // Contact methods
  createContactSubmission(insertContact: InsertContactSubmission): Promise<ContactSubmission>;
  
  // Blog methods
  getAllBlogPosts(): Promise<BlogPost[]>;
  getBlogPostBySlug(slug: string): Promise<BlogPost | undefined>;
}

export class DatabaseStorage implements IStorage {
  async getUser(id: number): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user || undefined;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db
      .select()
      .from(users)
      .where(eq(users.username, username));
    return user || undefined;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db.insert(users).values(insertUser).returning();
    return user;
  }

  async searchCnae(query: string): Promise<CnaeData[]> {
    try {
      console.log(`Searching CNAE with query: ${query}`);
      
      const results = await db
        .select()
        .from(cnaeData)
        .where(
          or(
            ilike(cnaeData.description, `%${query}%`),
            ilike(cnaeData.code, `%${query}%`),
            ilike(cnaeData.keywords, `%${query}%`),
          ),
        )
        .limit(20);

      console.log(`Search for "${query}" returned ${results.length} results`);
      return results;
    } catch (error) {
      console.error("Error in searchCnae:", error);
      throw error;
    }
  }

  async getAllCnae(): Promise<CnaeData[]> {
    try {
      const results = await db.select().from(cnaeData);
      return results;
    } catch (error) {
      console.error("Error in getAllCnae:", error);
      throw error;
    }
  }

  async createCnae(insertCnae: InsertCnaeData): Promise<CnaeData> {
    try {
      const [cnae] = await db.insert(cnaeData).values(insertCnae).returning();
      return cnae;
    } catch (error) {
      console.error("Error creating CNAE:", error);
      throw error;
    }
  }

  async createContactSubmission(insertContact: InsertContactSubmission): Promise<ContactSubmission> {
    try {
      const [contact] = await db.insert(contactSubmissions).values(insertContact).returning();
      return contact;
    } catch (error) {
      console.error("Error creating contact submission:", error);
      throw error;
    }
  }

  async getAllBlogPosts(): Promise<BlogPost[]> {
    try {
      const results = await db.select().from(blogPosts);
      return results;
    } catch (error) {
      console.error("Error getting blog posts:", error);
      return [];
    }
  }

  async getBlogPostBySlug(slug: string): Promise<BlogPost | undefined> {
    try {
      const [post] = await db.select().from(blogPosts).where(eq(blogPosts.slug, slug));
      return post || undefined;
    } catch (error) {
      console.error("Error getting blog post by slug:", error);
      return undefined;
    }
  }

  async seedCnaeData(): Promise<void> {
    try {
      // Check if data already exists
      const existingData = await db.select().from(cnaeData).limit(1);
      if (existingData.length > 0) {
        console.log("CNAE data already exists, skipping seed");
        return;
      }

      console.log("Seeding CNAE data...");

      // Dados fornecidos pelo usuário - processando para adicionar informações MEI
      const cnaeList = [
        {
          "codigo": "0111301",
          "descricao": "Cultivo de arroz"
        },
        {
          "codigo": "0111302",
          "descricao": "Cultivo de milho"
        },
        {
          "codigo": "0111303",
          "descricao": "Cultivo de trigo"
        },
        {
          "codigo": "0111399",
          "descricao": "Cultivo de outros cereais não especificados anteriormente"
        },
        {
          "codigo": "0112101",
          "descricao": "Cultivo de algodão herbáceo"
        },
        {
          "codigo": "0112102",
          "descricao": "Cultivo de juta"
        },
        {
          "codigo": "0112199",
          "descricao": "Cultivo de outras fibras de lavoura temporária não especificadas anteriormente"
        },
        {
          "codigo": "0113000",
          "descricao": "Cultivo de cana-de-açúcar"
        },
        {
          "codigo": "0114800",
          "descricao": "Cultivo de fumo"
        },
        {
          "codigo": "0115600",
          "descricao": "Cultivo de soja"
        },
        // Popular alguns CNAEs mais comuns para MEI
        {
          "codigo": "9602501",
          "descricao": "Cabeleireiros, manicure e pedicure"
        },
        {
          "codigo": "6204000",
          "descricao": "Consultoria em tecnologia da informação"
        },
        {
          "codigo": "4789005",
          "descricao": "Comércio varejista de produtos saneantes domissanitários"
        },
        {
          "codigo": "8211300",
          "descricao": "Serviços combinados de escritório e apoio administrativo"
        },
        {
          "codigo": "7490103",
          "descricao": "Serviços de agronomia e de consultoria às atividades agrícolas e pecuárias"
        }
      ];

      // Função auxiliar para determinar se pode ser MEI e outras características
      const getMeiInfo = async (codigo: string): Promise<{
        canBeMei: boolean;
        isFatorR: boolean;
        allowedActivities: string;
        restrictedActivities: string;
        observations: string;
        keywords: string;
      }> => {
        // Simulação baseada no código - alguns CNAEs específicos
        const meiCodes = ['9602501', '6204000', '4789005', '8211300', '7490103'];
        const fatorRCodes = ['6204000'];
        
        const canBeMei = meiCodes.includes(codigo);
        const isFatorR = fatorRCodes.includes(codigo);
        
        let allowedActivities = "";
        let restrictedActivities = "";
        let observations = "";
        let keywords = "";

        switch (codigo) {
          case '9602501':
            allowedActivities = "Corte de cabelo\nPenteados\nManicure e pedicure\nTratamentos capilares básicos";
            restrictedActivities = "Procedimentos estéticos invasivos\nAplicação de botox\nProcedimentos médicos";
            observations = "Atividade permitida para MEI com faturamento até R$ 81.000,00 anuais";
            keywords = "cabeleireiro manicure pedicure cabelo unhas beleza salão";
            break;
          case '6204000':
            allowedActivities = "Consultoria em TI\nAnálise de sistemas\nPlanejamento de infraestrutura\nConsultoria em segurança digital";
            restrictedActivities = "Desenvolvimento de software sob encomenda\nTreinamento em informática";
            observations = "Sujeita ao Fator R para enquadramento no Simples Nacional";
            keywords = "consultoria tecnologia informação TI sistemas software";
            break;
          case '4789005':
            allowedActivities = "Venda de produtos de limpeza\nDetergentes\nDesinfetantes\nProdutos de higiene";
            restrictedActivities = "Produtos controlados pela ANVISA";
            observations = "Pode necessitar de licenças sanitárias específicas";
            keywords = "produtos limpeza detergente desinfetante higiene saneante";
            break;
          case '8211300':
            allowedActivities = "Serviços administrativos\nDigitação\nArquivamento\nAtendimento telefônico";
            restrictedActivities = "Serviços contábeis\nServiços jurídicos";
            observations = "Ideal para prestadores de serviços administrativos";
            keywords = "administrativo escritório apoio secretaria digitação";
            break;
          case '7490103':
            allowedActivities = "Consultoria agrícola\nPlanejamento rural\nAssistência técnica\nAgronomia";
            restrictedActivities = "Projetos que requerem ART\nAtividades de responsabilidade técnica";
            observations = "Pode ser MEI para consultoria básica";
            keywords = "agronomia consultoria rural agricultura pecuária";
            break;
          default:
            allowedActivities = "Atividades relacionadas à descrição do CNAE";
            restrictedActivities = "Verificar legislação específica";
            observations = canBeMei ? "Verificar se pode ser MEI através da Receita Federal" : "Não permitida para MEI";
            keywords = "atividade econômica negócio empresa";
        }

        return {
          canBeMei,
          isFatorR,
          allowedActivities,
          restrictedActivities,
          observations,
          keywords
        };
      };

      // Inserir uma amostra dos CNAEs com informações completas
      for (const cnae of cnaeList) {
        const info = await getMeiInfo(cnae.codigo);
        
        await this.createCnae({
          code: cnae.codigo,
          description: cnae.descricao,
          canBeMei: info.canBeMei,
          isFatorR: info.isFatorR,
          allowedActivities: info.allowedActivities,
          restrictedActivities: info.restrictedActivities,
          observations: info.observations,
          keywords: info.keywords
        });
      }

      console.log(`Seeded ${cnaeList.length} CNAE records`);
    } catch (error) {
      console.error("Error seeding CNAE data:", error);
      throw error;
    }
  }
}

export const storage = new DatabaseStorage();
