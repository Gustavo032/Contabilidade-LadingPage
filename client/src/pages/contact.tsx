import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Phone, Mail, MapPin, Clock, MessageCircle } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import ContactForm from "@/components/forms/contact-form";
import SEOHead from "@/components/seo/seo-head";

export default function Contact() {
  const contactInfo = [
    {
      icon: Phone,
      title: "Telefone",
      value: "(11) 9999-9999",
      href: "tel:+5511999999999"
    },
    {
      icon: FaWhatsapp,
      title: "WhatsApp",
      value: "(11) 9999-9999",
      href: "https://wa.me/5511999999999"
    },
    {
      icon: Mail,
      title: "E-mail",
      value: "contato@contabilize.com.br",
      href: "mailto:contato@contabilize.com.br"
    },
    {
      icon: MapPin,
      title: "Endereço",
      value: "Rua da Contabilidade, 123\nCentro - São Paulo/SP\nCEP: 01000-000",
      href: "#"
    }
  ];

  const businessHours = [
    { day: "Segunda a Sexta", hours: "8h às 18h" },
    { day: "Sábado", hours: "8h às 12h" },
    { day: "Domingo", hours: "Fechado" }
  ];

  return (
    <>
      <SEOHead 
        title="Contato - Fale com a Contabilize Assessoria Empresarial"
        description="Entre em contato com a Contabilize. Telefone, WhatsApp, e-mail e endereço do nosso escritório. Receba uma consultoria gratuita."
        keywords="contato contabilize, telefone contador, whatsapp contabilidade, endereço escritório"
      />

      {/* Hero Section */}
      <section className="py-20 gradient-primary text-white">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl lg:text-5xl font-bold mb-6">
              Entre em Contato
            </h1>
            <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
              Fale com nossos especialistas e receba uma consultoria gratuita personalizada para seu negócio.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div>
              <ContactForm />
            </div>

            {/* Contact Information */}
            <div className="space-y-8">
              <div>
                <h3 className="text-xl font-semibold text-foreground mb-6">Informações de Contato</h3>
                <div className="space-y-4">
                  {contactInfo.map((info) => (
                    <div key={info.title} className="flex items-start">
                      <div className="bg-primary text-white p-3 rounded-lg mr-4 flex-shrink-0">
                        <info.icon className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="font-medium text-foreground">{info.title}</div>
                        {info.href.startsWith('#') ? (
                          <div className="text-muted-foreground whitespace-pre-line">{info.value}</div>
                        ) : (
                          <a 
                            href={info.href}
                            className="text-muted-foreground hover:text-primary transition-colors"
                            target={info.href.startsWith('http') ? '_blank' : undefined}
                            rel={info.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                          >
                            {info.value}
                          </a>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick Actions */}
              <div>
                <h3 className="text-xl font-semibold text-foreground mb-4">Ações Rápidas</h3>
                <div className="space-y-3">
                  <a 
                    href="https://wa.me/5511999999999" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between bg-green-500 hover:bg-green-600 text-white p-4 rounded-lg transition-colors"
                  >
                    <span className="flex items-center">
                      <FaWhatsapp className="w-5 h-5 mr-3" />
                      Conversar no WhatsApp
                    </span>
                    <MessageCircle className="w-5 h-5" />
                  </a>
                  
                  <a 
                    href="mailto:contato@contabilize.com.br"
                    className="flex items-center justify-between bg-primary hover:bg-primary/90 text-white p-4 rounded-lg transition-colors"
                  >
                    <span className="flex items-center">
                      <Mail className="w-5 h-5 mr-3" />
                      Enviar E-mail
                    </span>
                    <Mail className="w-5 h-5" />
                  </a>
                </div>
              </div>

              {/* Business Hours */}
              <div>
                <h3 className="text-xl font-semibold text-foreground mb-4">Horário de Atendimento</h3>
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center mb-3">
                      <Clock className="w-5 h-5 text-primary mr-2" />
                      <span className="font-medium text-foreground">Horários</span>
                    </div>
                    <div className="space-y-2">
                      {businessHours.map((schedule) => (
                        <div key={schedule.day} className="flex justify-between text-sm">
                          <span className="text-muted-foreground">{schedule.day}:</span>
                          <span className="text-foreground font-medium">{schedule.hours}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Location Section */}
      <section className="py-20 bg-muted/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-foreground mb-4">Nossa Localização</h2>
            <p className="text-xl text-muted-foreground">Venha nos visitar em nosso escritório</p>
          </div>

          <Card className="overflow-hidden">
            <div className="bg-neutral-200 h-64 flex items-center justify-center">
              <div className="text-center text-muted-foreground">
                <MapPin className="w-16 h-16 mx-auto mb-4" />
                <p className="font-medium">Mapa do Google será integrado aqui</p>
                <p className="text-sm">Rua da Contabilidade, 123 - Centro - São Paulo/SP</p>
              </div>
            </div>
            <CardContent className="p-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold text-foreground mb-2">Endereço Completo</h3>
                  <p className="text-muted-foreground">
                    Rua da Contabilidade, 123<br />
                    Centro - São Paulo/SP<br />
                    CEP: 01000-000
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-2">Como Chegar</h3>
                  <p className="text-muted-foreground">
                    Próximo ao metrô República<br />
                    Estacionamento disponível<br />
                    Fácil acesso por transporte público
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-foreground mb-4">Perguntas Frequentes</h2>
            <p className="text-xl text-muted-foreground">Dúvidas comuns sobre nossos serviços</p>
          </div>

          <div className="space-y-6">
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold text-foreground mb-2">
                  Quanto tempo demora para abrir uma empresa?
                </h3>
                <p className="text-muted-foreground">
                  O prazo varia entre 15 a 30 dias úteis, dependendo do tipo de empresa e complexidade 
                  do negócio. Acompanhamos todo o processo e mantemos você informado sobre cada etapa.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold text-foreground mb-2">
                  Vocês atendem empresas de todos os portes?
                </h3>
                <p className="text-muted-foreground">
                  Sim, atendemos desde MEI até empresas de grande porte. Nossos serviços são 
                  personalizados conforme a necessidade e porte de cada cliente.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold text-foreground mb-2">
                  Como funciona a consultoria tributária?
                </h3>
                <p className="text-muted-foreground">
                  Fazemos uma análise completa da situação fiscal da sua empresa, identificamos 
                  oportunidades de economia e criamos estratégias para redução legal de impostos.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </>
  );
}
