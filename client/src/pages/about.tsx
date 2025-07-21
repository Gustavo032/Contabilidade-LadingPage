import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { CheckCircle, Users, Target, Eye, Heart } from "lucide-react";
import SEOHead from "@/components/seo/seo-head";

export default function About() {
  const stats = [
    { number: "10+", label: "Anos de experiência" },
    { number: "500+", label: "Empresas atendidas" },
    { number: "98%", label: "Satisfação dos clientes" },
    { number: "24h", label: "Tempo médio de resposta" }
  ];

  const values = [
    {
      icon: CheckCircle,
      title: "Transparência",
      description: "Processos claros e comunicação honesta com nossos clientes"
    },
    {
      icon: Target,
      title: "Excelência",
      description: "Busca constante pela qualidade em todos os nossos serviços"
    },
    {
      icon: Users,
      title: "Agilidade",
      description: "Resposta rápida e eficiente para todas as demandas"
    },
    {
      icon: Heart,
      title: "Inovação",
      description: "Uso de tecnologia para modernizar processos contábeis"
    }
  ];

  const team = [
    {
      name: "Maria Silva",
      role: "Contadora Responsável",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b5bb?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150"
    },
    {
      name: "João Santos",
      role: "Especialista Tributário",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150"
    },
    {
      name: "Ana Costa",
      role: "Consultora Empresarial",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150"
    }
  ];

  return (
    <>
      <SEOHead 
        title="Sobre a Contabilize - Nossa História e Equipe"
        description="Conheça a história da Contabilize Assessoria Empresarial, nossa missão, valores e equipe especializada em contabilidade empresarial."
        keywords="sobre contabilize, historia empresa, equipe contabilidade, missao valores"
      />

      {/* Hero Section */}
      <section className="py-20 gradient-primary text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl lg:text-5xl font-bold mb-6">
              Sobre a Contabilize
            </h1>
            <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
              Há mais de 10 anos oferecendo soluções contábeis completas e personalizadas 
              para empresários, autônomos e prestadores de serviço.
            </p>
          </div>
        </div>
      </section>

      {/* Company Story */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl font-bold text-foreground mb-6">Nossa História</h2>
              <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                A Contabilize Assessoria Empresarial nasceu da visão de simplificar a vida empresarial 
                dos nossos clientes. Fundada em 2014, começamos como um pequeno escritório com o 
                objetivo de oferecer atendimento personalizado e humanizado.
              </p>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                Ao longo dos anos, crescemos mantendo nossos valores fundamentais: transparência, 
                excelência no atendimento e inovação constante. Hoje, somos referência no mercado 
                contábil, atendendo mais de 500 empresas de diversos segmentos.
              </p>
              <p className="text-muted-foreground mb-8 leading-relaxed">
                Nossa missão é ser mais que um escritório de contabilidade - somos parceiros 
                estratégicos no crescimento sustentável dos nossos clientes.
              </p>
              
              <div className="grid sm:grid-cols-2 gap-6 lg:gap-4">
                {stats.map((stat) => (
                  <div key={stat.label} className="text-center p-4 bg-muted rounded-lg">
                    <div className="text-2xl font-bold text-primary">{stat.number}</div>
                    <div className="text-muted-foreground">{stat.label}</div>
                  </div>
                ))}
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

      {/* Mission, Vision, Values */}
      <section className="py-20 bg-muted/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-foreground mb-4">Missão, Visão e Valores</h2>
            <p className="text-xl text-muted-foreground">Os pilares que guiam nossa atuação no mercado</p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8 mb-16">
            <Card className="text-center">
              <CardContent className="p-8">
                <div className="bg-primary text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Target className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-4">Missão</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Simplificar a vida empresarial dos nossos clientes, oferecendo soluções contábeis 
                  completas e estratégicas que contribuam para o crescimento sustentável dos seus negócios.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="p-8">
                <div className="bg-accent text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Eye className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-4">Visão</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Ser reconhecida como a principal referência em assessoria contábil empresarial, 
                  destacando-se pela inovação, qualidade de atendimento e resultados excepcionais.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="p-8">
                <div className="bg-yellow-500 text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Heart className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-4">Valores</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Transparência, excelência, agilidade e inovação são os valores que norteiam 
                  todas as nossas ações e relacionamentos com clientes e parceiros.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Values Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value) => (
              <div key={value.title} className="text-center">
                <value.icon className="w-10 h-10 text-primary mx-auto mb-3" />
                <h4 className="font-semibold text-foreground mb-2">{value.title}</h4>
                <p className="text-sm text-muted-foreground">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-foreground mb-4">Nossa Equipe</h2>
            <p className="text-xl text-muted-foreground">
              Profissionais experientes e especializados prontos para atender suas necessidades
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {team.map((member) => (
              <Card key={member.name} className="text-center">
                <CardContent className="p-8">
                  <img 
                    src={member.image}
                    alt={`Foto de ${member.name}`}
                    className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
                  />
                  <h3 className="font-semibold text-foreground mb-1">{member.name}</h3>
                  <p className="text-muted-foreground">{member.role}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card className="bg-primary text-white">
            <CardContent className="p-8 text-center">
              <h3 className="text-xl font-semibold mb-4">Equipe Completa</h3>
              <p className="mb-6">
                Além dos nossos especialistas principais, contamos com uma equipe de mais de 5 profissionais 
                especializados em diferentes áreas da contabilidade, sempre prontos para oferecer o melhor atendimento.
              </p>
              <div className="flex justify-center items-center space-x-2">
                <div className="flex -space-x-2">
                  {team.map((member, index) => (
                    <img 
                      key={index}
                      src={member.image}
                      alt="Membro da equipe"
                      className="w-10 h-10 rounded-full border-2 border-white object-cover"
                    />
                  ))}
                </div>
                <span className="text-blue-100 ml-4">+5 profissionais especializados</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-20 gradient-primary text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Quer Conhecer Melhor Nosso Trabalho?</h2>
          <p className="text-xl text-blue-100 mb-8">
            Entre em contato conosco e descubra como podemos ajudar sua empresa a crescer de forma sustentável.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contato">
              <Button size="lg" variant="secondary" className="w-full sm:w-auto">
                Falar com Nossa Equipe
              </Button>
            </Link>
            <Link href="/servicos">
              <Button 
                size="lg" 
                variant="outline" 
                className="border-white text-white hover:bg-white hover:text-primary w-full sm:w-auto"
              >
                Conhecer Nossos Serviços
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
