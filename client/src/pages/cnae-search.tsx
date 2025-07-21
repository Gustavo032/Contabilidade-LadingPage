import CnaeSearchTool from "@/components/cnae/cnae-search-tool";
import SEOHead from "@/components/seo/seo-head";

export default function CnaeSearch() {
  return (
    <>
      <SEOHead 
        title="Consulta CNAE - Encontre o CNAE Ideal para sua Empresa"
        description="Ferramenta exclusiva para consultar CNAEs, verificar se pode ser MEI, conhecer atividades permitidas e restrições. Consulta gratuita e completa."
        keywords="consulta CNAE, MEI, atividade econômica, código CNAE, abertura empresa"
      />

      <section className="py-20 bg-white">
        <CnaeSearchTool />
      </section>
    </>
  );
}
