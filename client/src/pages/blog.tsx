import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, ArrowRight, Loader2 } from "lucide-react";
import SEOHead from "@/components/seo/seo-head";
import type { BlogPost } from "@shared/schema";

export default function Blog() {
  const { data: posts, isLoading, error } = useQuery({
    queryKey: ["/api/blog"],
  });

  // Mock data for when no posts are available
  const mockPosts = [
    {
      id: 1,
      title: "Como escolher o CNAE correto para seu MEI",
      slug: "como-escolher-cnae-correto-mei",
      excerpt: "Guia completo para escolher a atividade econômica ideal e evitar problemas futuros com a Receita Federal.",
      category: "MEI",
      imageUrl: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=200",
      publishedAt: "2024-01-15T10:00:00Z"
    },
    {
      id: 2,
      title: "Simples Nacional 2024: O que mudou",
      slug: "simples-nacional-2024-mudancas",
      excerpt: "Principais alterações no regime tributário e como isso pode afetar sua empresa.",
      category: "Impostos",
      imageUrl: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=200",
      publishedAt: "2024-01-12T10:00:00Z"
    },
    {
      id: 3,
      title: "5 estratégias para reduzir impostos legalmente",
      slug: "estrategias-reduzir-impostos-legalmente",
      excerpt: "Dicas práticas de planejamento tributário para economizar impostos de forma legal.",
      category: "Planejamento",
      imageUrl: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=200",
      publishedAt: "2024-01-10T10:00:00Z"
    }
  ];

  const displayPosts = posts && posts.length > 0 ? posts : mockPosts;

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  };

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      'MEI': 'bg-blue-500',
      'Impostos': 'bg-green-500',
      'Planejamento': 'bg-purple-500',
      'Consultoria': 'bg-orange-500',
      'Dicas': 'bg-pink-500'
    };
    return colors[category] || 'bg-gray-500';
  };

  return (
    <>
      <SEOHead 
        title="Blog Contábil - Dicas e Orientações | Contabilize"
        description="Acesse nosso blog com dicas sobre contabilidade, tributação, MEI, abertura de empresa e gestão empresarial. Conteúdo atualizado e especializado."
        keywords="blog contabilidade, dicas tributarias, MEI, abertura empresa, gestão empresarial, impostos"
      />

      {/* Hero Section */}
      <section className="py-20 gradient-primary text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl lg:text-5xl font-bold mb-6">
              Blog Contábil
            </h1>
            <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
              Dicas, novidades e orientações sobre contabilidade empresarial, 
              tributação e gestão de negócios.
            </p>
          </div>
        </div>
      </section>

      {/* Blog Posts */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {isLoading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
              <span className="ml-2 text-muted-foreground">Carregando artigos...</span>
            </div>
          ) : error ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">
                Erro ao carregar artigos. Exibindo conteúdo de exemplo.
              </p>
            </div>
          ) : null}

          <div className="grid lg:grid-cols-3 gap-8">
            {displayPosts.map((post: BlogPost | any) => (
              <article key={post.id} className="group">
                <Card className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="relative overflow-hidden">
                    <img 
                      src={post.imageUrl}
                      alt={post.title}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-4 left-4">
                      <Badge className={`${getCategoryColor(post.category)} text-white`}>
                        {post.category}
                      </Badge>
                    </div>
                  </div>
                  
                  <CardContent className="p-6">
                    <div className="flex items-center text-xs text-muted-foreground mb-3">
                      <Calendar className="w-4 h-4 mr-1" />
                      <time>{formatDate(post.publishedAt)}</time>
                    </div>
                    
                    <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors line-clamp-2">
                      {post.title}
                    </h3>
                    
                    <p className="text-muted-foreground text-sm leading-relaxed mb-4 line-clamp-3">
                      {post.excerpt}
                    </p>
                    
                    <Button 
                      variant="ghost" 
                      className="p-0 h-auto font-medium text-primary hover:text-primary/80"
                      onClick={() => {
                        // For now, just show an alert since we don't have individual post pages
                        alert(`Artigo "${post.title}" será implementado`);
                      }}
                    >
                      Ler mais
                      <ArrowRight className="w-4 h-4 ml-1" />
                    </Button>
                  </CardContent>
                </Card>
              </article>
            ))}
          </div>

          {/* Load More */}
          <div className="text-center mt-12">
            <Button 
              size="lg" 
              variant="outline"
              onClick={() => alert("Função de carregar mais será implementada")}
            >
              Ver Todos os Artigos
            </Button>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-20 bg-muted/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-foreground mb-4">Categorias</h2>
            <p className="text-xl text-muted-foreground">Explore nosso conteúdo por tema</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { name: "MEI", count: 15, color: "bg-blue-500" },
              { name: "Impostos", count: 23, color: "bg-green-500" },
              { name: "Planejamento", count: 18, color: "bg-purple-500" },
              { name: "Consultoria", count: 12, color: "bg-orange-500" }
            ].map((category) => (
              <Card key={category.name} className="text-center hover:shadow-lg transition-shadow cursor-pointer">
                <CardContent className="p-6">
                  <div className={`${category.color} text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4`}>
                    <span className="text-2xl font-bold">{category.count}</span>
                  </div>
                  <h3 className="font-semibold text-foreground mb-1">{category.name}</h3>
                  <p className="text-sm text-muted-foreground">{category.count} artigos</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-20 gradient-primary text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Receba Nossas Atualizações</h2>
          <p className="text-xl text-blue-100 mb-8">
            Cadastre-se para receber as últimas novidades sobre contabilidade e tributação.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
            <input 
              type="email" 
              placeholder="Seu e-mail"
              className="flex-1 px-4 py-3 rounded-lg text-foreground"
            />
            <Button 
              size="lg" 
              variant="secondary"
              onClick={() => alert("Newsletter será implementada")}
            >
              Cadastrar
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
