import { Link } from "wouter";
import { Calculator, Facebook, Instagram, Linkedin } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-neutral-800 text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-4 gap-8">
          <div className="lg:col-span-2">
            <div className="flex items-center mb-4">
              <Calculator className="text-primary text-2xl mr-3" />
              <div>
                <div className="text-xl font-bold">Contabilize</div>
                <div className="text-sm text-neutral-400">Assessoria Empresarial</div>
              </div>
            </div>
            <p className="text-neutral-400 mb-6 leading-relaxed">
              Especialistas em contabilidade empresarial oferecendo soluções completas 
              para abertura de empresa, consultoria tributária e regularização de CNPJ.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-neutral-400 hover:text-primary transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="text-neutral-400 hover:text-primary transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="text-neutral-400 hover:text-primary transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
              <a 
                href="https://wa.me/5511999999999" 
                target="_blank"
                rel="noopener noreferrer"
                className="text-neutral-400 hover:text-primary transition-colors"
              >
                <FaWhatsapp className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-4">Serviços</h3>
            <ul className="space-y-2 text-neutral-400">
              <li><Link href="/servicos" className="hover:text-white transition-colors">Abertura de Empresa</Link></li>
              <li><Link href="/servicos" className="hover:text-white transition-colors">Regularização CNPJ</Link></li>
              <li><Link href="/servicos" className="hover:text-white transition-colors">Consultoria Tributária</Link></li>
              <li><Link href="/servicos" className="hover:text-white transition-colors">Declaração IR</Link></li>
              <li><Link href="/servicos" className="hover:text-white transition-colors">MEI</Link></li>
              <li><Link href="/servicos" className="hover:text-white transition-colors">Atendimento PJ</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-4">Links Úteis</h3>
            <ul className="space-y-2 text-neutral-400">
              <li><Link href="/consulta-cnae" className="hover:text-white transition-colors">Consulta CNAE</Link></li>
              <li><Link href="/ferramentas" className="hover:text-white transition-colors">Ferramentas</Link></li>
              <li><Link href="/blog" className="hover:text-white transition-colors">Blog</Link></li>
              <li><Link href="/sobre" className="hover:text-white transition-colors">Sobre Nós</Link></li>
              <li><Link href="/contato" className="hover:text-white transition-colors">Contato</Link></li>
              <li><a href="#" className="hover:text-white transition-colors">Política de Privacidade</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-neutral-700 pt-8 mt-12">
          <div className="flex flex-col sm:flex-row justify-between items-center">
            <p className="text-neutral-400 text-sm">
              © 2024 Contabilize Assessoria Empresarial. Todos os direitos reservados.
            </p>
            <p className="text-neutral-400 text-sm mt-2 sm:mt-0">
              Desenvolvido com ❤️ para nossos clientes
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
