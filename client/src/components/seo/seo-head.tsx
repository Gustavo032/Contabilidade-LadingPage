import { useEffect } from "react";

interface SEOHeadProps {
  title?: string;
  description?: string;
  keywords?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
}

export default function SEOHead({
  title = "Contabilize Assessoria Empresarial - Serviços Contábeis Especializados",
  description = "Contabilize oferece serviços contábeis completos, abertura de empresa, MEI, consultoria tributária e ferramenta exclusiva de consulta CNAE.",
  keywords = "contabilidade, abertura de empresa, MEI, consultoria tributária, CNAE, regularização CNPJ",
  ogTitle,
  ogDescription,
  ogImage = "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=630"
}: SEOHeadProps) {
  useEffect(() => {
    // Update title
    document.title = title;

    // Update meta tags
    const updateMeta = (name: string, content: string) => {
      let meta = document.querySelector(`meta[name="${name}"]`) as HTMLMetaElement;
      if (!meta) {
        meta = document.createElement("meta");
        meta.name = name;
        document.head.appendChild(meta);
      }
      meta.content = content;
    };

    const updateProperty = (property: string, content: string) => {
      let meta = document.querySelector(`meta[property="${property}"]`) as HTMLMetaElement;
      if (!meta) {
        meta = document.createElement("meta");
        meta.setAttribute("property", property);
        document.head.appendChild(meta);
      }
      meta.content = content;
    };

    updateMeta("description", description);
    updateMeta("keywords", keywords);
    
    // Open Graph tags
    updateProperty("og:title", ogTitle || title);
    updateProperty("og:description", ogDescription || description);
    updateProperty("og:image", ogImage);
    updateProperty("og:type", "website");
    
    // Twitter Card tags
    updateMeta("twitter:card", "summary_large_image");
    updateMeta("twitter:title", ogTitle || title);
    updateMeta("twitter:description", ogDescription || description);
    updateMeta("twitter:image", ogImage);
  }, [title, description, keywords, ogTitle, ogDescription, ogImage]);

  return null;
}
