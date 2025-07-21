import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Building, FileText, TrendingUp, Calculator, Search, Phone, CheckCircle } from "lucide-react";
import SEOHead from "@/components/seo/seo-head";

export default function Home() {
  const services = [
    {
      icon: Building,
      title: "Abertura de Empresa",
      description: "MEI, ME, EPP e outros tipos societários com processo rápido e seguro.",
      color: "bg-primary",
    },
    {
      icon: FileText,
      title: "Regularização CNPJ",
      description: "Regularize sua empresa e evite multas e problemas com a Receita Federal.",
      color: "bg-accent",
    },
    {
      icon: TrendingUp,
      title: "Consultoria Tributária",
      description: "Estratégias personalizadas para reduzir impostos legalmente.",
      color: "bg-secondary",
    },
    {
      icon: Calculator,
      title: "Imposto de Renda",
      description: "Declaração completa para pessoa física e jurídica sem complicações.",
      color: "bg-yellow-500",
    },
  ];

  const stats = [
    { number: "10+", label: "Anos de experiência" },
    { number: "500+", label: "Empresas atendidas" },
    { number: "98%", label: "Satisfação" },
  ];

  const values = [
    "Transparência",
    "Excelência", 
    "Agilidade",
    "Inovação"
  ];

  return (
    <>
      <SEOHead />
      
      {/* Hero Section */}
      <section className="gradient-primary text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl lg:text-5xl font-bold mb-6">
                Sua <span className="text-yellow-300">Contabilidade</span> 
                <br />Empresarial Completa
              </h1>
              <p className="text-xl text-blue-100 mb-8 leading-relaxed">
                Especializados em abertura de empresa, MEI, consultoria tributária e regularização de CNPJ. 
                Conte com nossa experiência para pagar menos impostos e manter sua empresa sempre regular.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/consulta-cnae">
                  <Button size="lg" className="bg-yellow-400 text-primary hover:bg-yellow-300 w-full sm:w-auto">
                    <Search className="w-5 h-5 mr-2" />
                    Consultar CNAE
                  </Button>
                </Link>
                <Link href="/contato">
                  <Button size="lg" variant="secondary" className="w-full sm:w-auto">
                    <Phone className="w-5 h-5 mr-2" />
                    Falar com Contador
                  </Button>
                </Link>
              </div>
            </div>
            <div className="lg:text-right">
              <img 
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600" 
                alt="Equipe profissional trabalhando em escritório moderno" 
                className="rounded-lg shadow-2xl max-w-full h-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Services Highlights */}
      <section className="py-20 bg-muted/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-foreground mb-4">Nossos Principais Serviços</h2>
            <p className="text-xl text-muted-foreground">Soluções completas para seu negócio crescer com segurança</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service) => (
              <Card key={service.title} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className={`${service.color} text-white w-12 h-12 rounded-lg flex items-center justify-center mb-4`}>
                    <service.icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">{service.title}</h3>
                  <p className="text-muted-foreground mb-4">{service.description}</p>
                  <Link href="/servicos" className="text-primary font-medium hover:text-primary/80">
                    Saiba mais →
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CNAE Search Preview */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              <Search className="inline-block text-primary mr-3" />
              Consulta CNAE Inteligente
            </h2>
            <p className="text-xl text-muted-foreground">
              Encontre o CNAE ideal para sua atividade e descubra se pode ser MEI
            </p>
          </div>

          <Card className="p-8 shadow-lg">
            <div className="text-center">
              <div className="bg-primary/10 p-6 rounded-lg mb-6">
                <Search className="w-16 h-16 text-primary mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Ferramenta Exclusiva</h3>
                <p className="text-muted-foreground">
                  Nossa ferramenta de consulta CNAE permite encontrar rapidamente a atividade econômica ideal 
                  para seu negócio, verificar se pode ser MEI e conhecer todas as restrições.
                </p>
              </div>
              <Link href="/consulta-cnae">
                <Button size="lg" className="gradient-primary text-white">
                  Acessar Consulta CNAE
                </Button>
              </Link>
            </div>
          </Card>
        </div>
      </section>

      {/* About Preview */}
      <section className="py-20 bg-muted/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl font-bold text-foreground mb-6">Sobre a Contabilize</h2>
              <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                Há mais de 10 anos no mercado, a Contabilize Assessoria Empresarial é especializada 
                em oferecer soluções contábeis completas e personalizadas para empresários, 
                autônomos e prestadores de serviço.
              </p>
              
              <div className="grid sm:grid-cols-3 gap-4 mb-8">
                {stats.map((stat) => (
                  <div key={stat.label} className="text-center p-4">
                    <div className="text-2xl font-bold text-primary">{stat.number}</div>
                    <div className="text-muted-foreground">{stat.label}</div>
                  </div>
                ))}
              </div>

              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-foreground">Nossos Valores</h3>
                <div className="grid sm:grid-cols-2 gap-4">
                  {values.map((value) => (
                    <div key={value} className="flex items-center">
                      <CheckCircle className="w-5 h-5 text-accent mr-3" />
                      <span className="text-muted-foreground">{value}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-8">
                <Link href="/sobre">
                  <Button variant="outline">Conhecer Nossa História</Button>
                </Link>
              </div>
            </div>
            
            <div>
              <img 
                src="https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600" 
                alt="Interior moderno de escritório de contabilidade" 
                className="rounded-xl shadow-lg w-full h-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 gradient-primary text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Pronto para Regularizar sua Empresa?</h2>
          <p className="text-xl text-blue-100 mb-8">
            Fale com nossos especialistas e receba uma consultoria gratuita personalizada para seu negócio.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contato">
              <Button size="lg" variant="secondary" className="w-full sm:w-auto">
                <Phone className="w-5 h-5 mr-2" />
                Falar com Especialista
              </Button>
            </Link>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-white text-white hover:bg-white hover:text-primary w-full sm:w-auto"
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
