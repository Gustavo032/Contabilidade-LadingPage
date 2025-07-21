
import { db } from "./db";
import { cnaeData } from "@shared/schema";

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

// Função para determinar características MEI baseada no código
function getMeiCharacteristics(codigo: string, descricao: string) {
  // Lista de códigos comuns para MEI (baseado na legislação)
  const meiCommonCodes = [
    '9602501', // Cabeleireiros
    '6204000', // Consultoria TI
    '4789005', // Comércio saneantes
    '8211300', // Serviços escritório
    '7490103', // Consultoria agrícola
    '4721104', // Doces e balas
    '4722901', // Açougue
    '4784900', // GLP
    '7420001', // Fotografia
    '9529102', // Chaveiros
    '9601701', // Lavanderia
  ];

  // Códigos sujeitos ao Fator R
  const fatorRCodes = [
    '6204000', // Consultoria TI
    '7490103', // Consultoria agrícola
    '6920601', // Contabilidade
    '7111100', // Arquitetura
    '7112000', // Engenharia
  ];

  const canBeMei = meiCommonCodes.includes(codigo) || 
                   descricao.toLowerCase().includes('comércio varejista') ||
                   descricao.toLowerCase().includes('serviços');

  const isFatorR = fatorRCodes.includes(codigo) || 
                   descricao.toLowerCase().includes('consultoria') ||
                   descricao.toLowerCase().includes('técnic');

  let allowedActivities = "";
  let restrictedActivities = "";
  let observations = "";
  let keywords = "";

  // Gerar keywords baseadas na descrição
  keywords = descricao.toLowerCase()
    .replace(/[^\w\s]/g, ' ')
    .split(' ')
    .filter(word => word.length > 2)
    .join(' ');

  // Determinar atividades e observações baseadas no tipo de CNAE
  if (descricao.toLowerCase().includes('cultivo')) {
    allowedActivities = "Plantio e cultivo\nColheita\nVenda da produção própria";
    restrictedActivities = "Beneficiamento industrial\nComércio atacadista";
    observations = canBeMei ? "MEI rural pode ser aplicável" : "Atividade rural - verificar legislação específica";
  } else if (descricao.toLowerCase().includes('comércio')) {
    allowedActivities = "Venda de produtos\nAtendimento ao cliente\nEstoque";
    restrictedActivities = "Produtos controlados\nVenda de medicamentos";
    observations = canBeMei ? "Permitido MEI até R$ 81.000 anuais" : "Verificar enquadramento tributário";
  } else if (descricao.toLowerCase().includes('serviços')) {
    allowedActivities = "Prestação de serviços\nAtendimento personalizado\nConsultoria básica";
    restrictedActivities = "Atividades regulamentadas\nServiços que exigem registro profissional";
    observations = canBeMei ? "MEI de serviços - verificar atividades permitidas" : "Pode requerer qualificação específica";
  } else {
    allowedActivities = "Atividades relacionadas à descrição do CNAE";
    restrictedActivities = "Verificar legislação específica do setor";
    observations = canBeMei ? "Consultar lista de atividades MEI" : "Verificar enquadramento na Receita Federal";
  }

  return {
    canBeMei,
    isFatorR,
    allowedActivities,
    restrictedActivities,
    observations,
    keywords
  };
}

async function seedAllCnaeData() {
  try {
    console.log("Starting CNAE data seeding...");
    
    // Clear existing data
    await db.delete(cnaeData);
    console.log("Cleared existing CNAE data");

    let inserted = 0;
    
    for (const cnae of cnaeList) {
      const characteristics = getMeiCharacteristics(cnae.codigo, cnae.descricao);
      
      await db.insert(cnaeData).values({
        code: cnae.codigo,
        description: cnae.descricao,
        canBeMei: characteristics.canBeMei,
        isFatorR: characteristics.isFatorR,
        allowedActivities: characteristics.allowedActivities,
        restrictedActivities: characteristics.restrictedActivities,
        observations: characteristics.observations,
        keywords: characteristics.keywords
      });
      
      inserted++;
      
      if (inserted % 100 === 0) {
        console.log(`Inserted ${inserted} CNAEs...`);
      }
    }
    
    console.log(`Successfully seeded ${inserted} CNAE records`);
  } catch (error) {
    console.error("Error seeding CNAE data:", error);
    throw error;
  }
}

// Execute if run directly
if (require.main === module) {
  seedAllCnaeData()
    .then(() => {
      console.log("CNAE seeding completed successfully");
      process.exit(0);
    })
    .catch((error) => {
      console.error("CNAE seeding failed:", error);
      process.exit(1);
    });
}

export { seedAllCnaeData };
