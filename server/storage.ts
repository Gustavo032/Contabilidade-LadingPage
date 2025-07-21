` tags.

```python
<replit_final_file>
import { users, type User, type InsertUser } from "@shared/schema";
import { db } from "./db";
import { eq } from "drizzle-orm";

// keep IStorage the same

// rewrite MemStorage to DatabaseStorage
export class DatabaseStorage implements IStorage {
  async getUser(id: number): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user || undefined;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user || undefined;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(insertUser)
      .returning();
    return user;
  }

  async searchCnae(query: string): Promise<CnaeData[]> {
    try {
      // Primeiro, verificar se há dados na tabela
      const allCnae = await this.db.select().from(cnaeData).limit(5);
      console.log("Total CNAEs in database:", allCnae.length);

      if (allCnae.length === 0) {
        // Se não há dados, retornar array vazio
        console.log("No CNAE data found in database");
        return [];
      }

      const results = await this.db
        .select()
        .from(cnaeData)
        .where(
          or(
            ilike(cnaeData.description, `%${query}%`),
            ilike(cnaeData.code, `%${query}%`),
            ilike(cnaeData.keywords, `%${query}%`)
          )
        )
        .limit(20);

      console.log(`Search for "${query}" returned ${results.length} results`);
      return results;
    } catch (error) {
      console.error("Error in searchCnae:", error);
      throw error;
    }
  }

  async seedCnaeData(): Promise<void> {
    try {
      // Verificar se já existem dados
      const existingData = await this.db.select().from(cnaeData).limit(1);
      if (existingData.length > 0) {
        console.log("CNAE data already exists, skipping seed");
        return;
      }

      console.log("Seeding CNAE data...");

      const sampleCnae = [
        {
          code: "9602-5/01",
          description: "Cabeleireiros, manicure e pedicure",
          canBeMei: true,
          isFatorR: false,
          allowedActivities: "Corte de cabelo\nPenteados\nManicure e pedicure\nTratamentos capilares básicos",
          restrictedActivities: "Procedimentos estéticos invasivos\nAplicação de botox\nProcedimentos médicos",
          observations: "Atividade permitida para MEI com faturamento até R$ 81.000,00 anuais",
          keywords: "cabeleireiro manicure pedicure cabelo unhas beleza salão"
        },
        {
          code: "6204-0/00",
          description: "Consultoria em tecnologia da informação",
          canBeMei: true,
          isFatorR: true,
          allowedActivities: "Consultoria em TI\nAnálise de sistemas\nPlanejamento de infraestrutura\nConsultoria em segurança digital",
          restrictedActivities: "Desenvolvimento de software sob encomenda\nTreinamento em informática",
          observations: "Sujeita ao Fator R para enquadramento no Simples Nacional",
          keywords: "consultoria tecnologia informação TI sistemas software"
        },
        {
          code: "8230-0/01",
          description: "Serviços de organização de feiras, congressos, exposições e festas",
          canBeMei: false,
          isFatorR: false,
          allowedActivities: "Organização de eventos\nCoordenação de festas\nPlanejamento de congressos",
          restrictedActivities: "",
          observations: "Não permitida para MEI devido à natureza da atividade",
          keywords: "eventos festas congressos organização cerimonial"
        },
        {
          code: "4789-0/05",
          description: "Comércio varejista de produtos saneantes domissanitários",
          canBeMei: true,
          isFatorR: false,
          allowedActivities: "Venda de produtos de limpeza\nDetergentes\nDesinfetantes\nProdutos de higiene",
          restrictedActivities: "Produtos controlados pela ANVISA",
          observations: "Pode necessitar de licenças sanitárias específicas",
          keywords: "produtos limpeza detergente desinfetante higiene saneante"
        },
        {
          code: "8211-3/00",
          description: "Serviços combinados de escritório e apoio administrativo",
          canBeMei: true,
          isFatorR: false,
          allowedActivities: "Serviços administrativos\nDigitação\nArquivamento\nAtendimento telefônico",
          restrictedActivities: "Serviços contábeis\nServiços jurídicos",
          observations: "Ideal para prestadores de serviços administrativos",
          keywords: "administrativo escritório apoio secretaria digitação"
        }
      ];

      for (const cnae of sampleCnae) {
        await this.createCnae(cnae);
      }

      console.log(`Seeded ${sampleCnae.length} CNAE records`);
    } catch (error) {
      console.error("Error seeding CNAE data:", error);
      throw error;
    }
  }
}

export const storage = new DatabaseStorage();