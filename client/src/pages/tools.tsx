import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calculator, Settings, Download, ExternalLink } from "lucide-react";
import SEOHead from "@/components/seo/seo-head";

export default function Tools() {
  const toolCategories = [
    {
      icon: Calculator,
      title: "Contabilidade",
      tools: [
        { name: "Emissor gratuito de NF-e", url: "https://www.nfe.fazenda.gov.br/" },
        { name: "Calculadora Simples Nacional", url: "https://www8.receita.fazenda.gov.br/simplesnacional/" },
        { name: "Gerador de DARF", url: "https://cav.receita.fazenda.gov.br/eCAC/" },
        { name: "Tabela INSS/IRRF Atualizada", url: "https://www.gov.br/inss/pt-br" }
      ]
    },
    {
      icon: Settings,
      title: "Utilitários Diversos",
      tools: [
        { name: "Consulta CNPJ na Receita", url: "https://servicos.receita.fazenda.gov.br/servicos/cnpjreva/" },
        { name: "Consulta débitos PGFN", url: "https://www.pgfn.gov.br/" },
        { name: "Parcelamento Simples Nacional", url: "https://www8.receita.fazenda.gov.br/simplesnacional/" },
        { name: "Verificador de CPF/CNPJ", url: "https://www.receita.fazenda.gov.br/orientacao/tributaria/cadastros/cpf/" }
      ]
    },
    {
      icon: Download,
      title: "Manuais e Downloads", 
      tools: [
        { name: "Manuais abertura de empresa", url: "#", download: true },
        { name: "Modelos de contrato", url: "#", download: true },
        { name: "Tabela de atividades MEI", url: "#", download: true },
        { name: "Planilhas úteis", url: "#", download: true }
      ]
    }
  ];

  const handleToolClick = (tool: any) => {
    if (tool.download) {
      // For downloads, you would typically trigger a file download
      alert("Download iniciado - recurso será implementado com arquivos reais");
    } else {
      window.open(tool.url, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <>
      <SEOHead 
        title="Ferramentas Úteis - Calculadoras e Utilitários Contábeis"
        description="Acesse ferramentas gratuitas para contabilidade: calculadoras, geradores de DARF, consultas, manuais e planilhas úteis para sua empresa."
        keywords="ferramentas contábeis, calculadora simples nacional, gerador DARF, consulta CNPJ, manuais contabilidade"
      />

      {/* Hero Section */}
      <section className="py-20 gradient-primary text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl lg:text-5xl font-bold mb-6">
              Ferramentas Úteis
            </h1>
            <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
              Acesso rápido às principais ferramentas contábeis, calculadoras e recursos 
              essenciais para manter sua empresa em dia.
            </p>
          </div>
        </div>
      </section>

      {/* Tools Grid */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-8">
            {toolCategories.map((category) => (
              <Card key={category.title} className="h-fit">
                <CardContent className="p-6">
                  <div className="flex items-center mb-6">
                    <category.icon className="w-6 h-6 text-primary mr-3" />
                    <h3 className="text-xl font-semibold text-foreground">{category.title}</h3>
                  </div>
                  <div className="space-y-3">
                    {category.tools.map((tool) => (
                      <button
                        key={tool.name}
                        onClick={() => handleToolClick(tool)}
                        className="flex items-center justify-between w-full p-3 bg-muted rounded-lg hover:shadow-sm transition-shadow text-left"
                      >
                        <span className="text-foreground">{tool.name}</span>
                        {tool.download ? (
                          <Download className="w-4 h-4 text-muted-foreground" />
                        ) : (
                          <ExternalLink className="w-4 h-4 text-muted-foreground" />
                        )}
                      </button>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Additional Resources */}
      <section className="py-20 bg-muted/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-foreground mb-4">Recursos Adicionais</h2>
            <p className="text-xl text-muted-foreground">Mais ferramentas para auxiliar na gestão da sua empresa</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="text-center">
              <CardContent className="p-6">
                <div className="bg-primary text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Calculator className="w-8 h-8" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">Calculadora de Impostos</h3>
                <p className="text-muted-foreground mb-4">
                  Calcule aproximadamente os impostos devidos pela sua empresa
                </p>
                <Button variant="outline" onClick={() => alert("Calculadora será implementada")}>
                  Usar Calculadora
                </Button>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="p-6">
                <div className="bg-accent text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Settings className="w-8 h-8" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">Simulador de Regimes</h3>
                <p className="text-muted-foreground mb-4">
                  Compare diferentes regimes tributários para sua empresa
                </p>
                <Button variant="outline" onClick={() => alert("Simulador será implementado")}>
                  Usar Simulador
                </Button>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="p-6">
                <div className="bg-yellow-500 text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Download className="w-8 h-8" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">Biblioteca de Modelos</h3>
                <p className="text-muted-foreground mb-4">
                  Baixe modelos de contratos, planilhas e documentos
                </p>
                <Button variant="outline" onClick={() => alert("Biblioteca será implementada")}>
                  Acessar Biblioteca
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Help Section */}
      <section className="py-20 gradient-primary text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Precisa de Ajuda com as Ferramentas?</h2>
          <p className="text-xl text-blue-100 mb-8">
            Nossa equipe está pronta para auxiliar você no uso das ferramentas e esclarecer suas dúvidas.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              variant="secondary" 
              onClick={() => window.location.href = '/contato'}
            >
              Falar com Especialista
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-white text-white hover:bg-white hover:text-primary"
              onClick={() => window.open('https://wa.me/5511999999999', '_blank')}
            >
              WhatsApp Direto
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
