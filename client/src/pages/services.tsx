import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { Building, FileText, TrendingUp, Calculator, Briefcase, UserCheck } from "lucide-react";
import SEOHead from "@/components/seo/seo-head";

export default function Services() {
  const services = [
    {
      icon: Building,
      title: "Abertura de Empresa",
      description: "Processo completo de abertura para MEI, ME, EPP, Lucro Presumido e Simples Nacional.",
      image: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=200",
      features: [
        "Análise de viabilidade",
        "Consulta de nome empresarial", 
        "Registro na Receita Federal",
        "Alvará de funcionamento"
      ]
    },
    {
      icon: FileText,
      title: "Regularização de CNPJ",
      description: "Regularize sua empresa e evite problemas com órgãos fiscalizadores.",
      image: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=200",
      features: [
        "Análise da situação atual",
        "Quitação de pendências",
        "Atualização cadastral", 
        "Reativação de empresa"
      ]
    },
    {
      icon: TrendingUp,
      title: "Consultoria Tributária",
      description: "Estratégias personalizadas para reduzir impostos de forma legal e segura.",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=200",
      features: [
        "Planejamento tributário",
        "Análise de regime tributário",
        "Recuperação de impostos",
        "Compliance fiscal"
      ]
    },
    {
      icon: Calculator,
      title: "Declaração Imposto de Renda",
      description: "Declaração completa para pessoa física e jurídica sem complicações.",
      image: "https://images.unsplash.com/photo-1586953208448-b95a79798f07?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=200",
      features: [
        "Pessoa física e jurídica",
        "Análise de deduções",
        "Revisão de declarações",
        "Parcelamento de débitos"
      ]
    },
    {
      icon: Briefcase,
      title: "Atendimento PJ Completo",
      description: "Suporte contábil completo para manter sua empresa sempre em dia.",
      image: "https://images.unsplash.com/photo-1521791136064-7986c2920216?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=200",
      features: [
        "Escrituração contábil",
        "Folha de pagamento",
        "Obrigações assessórias",
        "Suporte mensalista"
      ]
    },
    {
      icon: UserCheck,
      title: "MEI Especializado",
      description: "Suporte completo para microempreendedores individuais.",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=200",
      features: [
        "Abertura de MEI",
        "Emissão de DAS",
        "Alteração cadastral",
        "Baixa de MEI"
      ]
    }
  ];

  return (
    <>
      <SEOHead 
        title="Serviços Contábeis - Contabilize Assessoria Empresarial"
        description="Conheça todos os nossos serviços contábeis: abertura de empresa, MEI, consultoria tributária, regularização de CNPJ e muito mais."
        keywords="serviços contábeis, abertura empresa, MEI, consultoria tributária, declaração imposto renda"
      />

      {/* Hero Section */}
      <section className="py-20 gradient-primary text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl lg:text-5xl font-bold mb-6">
              Nossos Serviços Contábeis
            </h1>
            <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
              Oferecemos soluções completas em contabilidade empresarial, desde a abertura 
              da sua empresa até o suporte contábil contínuo.
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-8">
            {services.map((service) => (
              <Card key={service.title} className="overflow-hidden hover:shadow-lg transition-shadow">
                <img 
                  src={service.image}
                  alt={`Ilustração do serviço ${service.title}`}
                  className="w-full h-48 object-cover"
                />
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <service.icon className="w-6 h-6 text-primary mr-3" />
                    <h3 className="text-xl font-semibold text-foreground">{service.title}</h3>
                  </div>
                  <p className="text-muted-foreground mb-4">{service.description}</p>
                  <ul className="text-sm text-muted-foreground space-y-1 mb-4">
                    {service.features.map((feature) => (
                      <li key={feature}>• {feature}</li>
                    ))}
                  </ul>
                  <Link href="/contato">
                    <Button className="w-full gradient-primary text-white">
                      Solicitar Orçamento
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-muted/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-foreground mb-4">Por que Escolher a Contabilize?</h2>
            <p className="text-xl text-muted-foreground">Nossos diferenciais no mercado contábil</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-primary text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold">10+</span>
              </div>
              <h3 className="font-semibold text-foreground mb-2">Anos de Experiência</h3>
              <p className="text-muted-foreground">Década de expertise no mercado contábil</p>
            </div>

            <div className="text-center">
              <div className="bg-accent text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold">24h</span>
              </div>
              <h3 className="font-semibold text-foreground mb-2">Suporte Ágil</h3>
              <p className="text-muted-foreground">Resposta rápida às suas demandas</p>
            </div>

            <div className="text-center">
              <div className="bg-yellow-500 text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold">98%</span>
              </div>
              <h3 className="font-semibold text-foreground mb-2">Satisfação</h3>
              <p className="text-muted-foreground">Clientes satisfeitos com nossos serviços</p>
            </div>

            <div className="text-center">
              <div className="bg-green-500 text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold">100%</span>
              </div>
              <h3 className="font-semibold text-foreground mb-2">Digital</h3>
              <p className="text-muted-foreground">Processos modernos e digitalizados</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 gradient-primary text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Precisa de um Serviço Contábil?</h2>
          <p className="text-xl text-blue-100 mb-8">
            Entre em contato conosco e receba um atendimento personalizado para sua necessidade.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contato">
              <Button size="lg" variant="secondary" className="w-full sm:w-auto">
                Solicitar Contato
              </Button>
            </Link>
            <Link href="/consulta-cnae">
              <Button 
                size="lg" 
                variant="outline" 
                className="border-white text-white hover:bg-white hover:text-primary w-full sm:w-auto"
              >
                Consultar CNAE
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
