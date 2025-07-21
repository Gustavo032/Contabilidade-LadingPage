
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Search, Loader2, RefreshCw, AlertCircle } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import CnaeResultCard from "./cnae-result-card";
import type { CnaeData } from "@shared/schema";

export default function CnaeSearchTool() {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [isInitializing, setIsInitializing] = useState(false);

  const { data: searchResults, isLoading, error, refetch } = useQuery({
    queryKey: ["/api/cnae/search", searchTerm],
    enabled: searchTerm.length >= 2,
    retry: 1,
  });

  // Função para inicializar dados CNAE se necessário
  const initializeCnaeData = async () => {
    try {
      setIsInitializing(true);
      const response = await fetch("/api/cnae/init");
      if (response.ok) {
        // Tentar buscar novamente após inicializar
        if (searchTerm.length >= 2) {
          refetch();
        }
      }
    } catch (error) {
      console.error("Error initializing CNAE data:", error);
    } finally {
      setIsInitializing(false);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim().length >= 2) {
      setSearchTerm(searchQuery.trim());
    }
  };

  const hasResults = searchResults && Array.isArray(searchResults) && searchResults.length > 0;
  const hasSearched = searchTerm.length >= 2;
  const showNoResults = hasSearched && !isLoading && !hasResults && !error;

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-foreground mb-4">
          Consulta CNAE Inteligente
        </h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Encontre o código CNAE ideal para sua atividade econômica. 
          Verifique se pode ser MEI, conhecer atividades permitidas e restrições.
        </p>
      </div>

      <Card className="mb-8">
        <CardContent className="p-6">
          <form onSubmit={handleSearch} className="flex gap-4">
            <div className="flex-1">
              <Input
                type="text"
                placeholder="Digite a atividade que deseja (ex: cabeleireiro, consultoria, vendas...)"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="text-lg h-12"
              />
            </div>
            <Button 
              type="submit" 
              size="lg" 
              className="gradient-primary text-white h-12 px-8"
              disabled={searchQuery.trim().length < 2 || isLoading}
            >
              {isLoading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <Search className="w-5 h-5" />
              )}
              {isLoading ? "Buscando..." : "Buscar CNAE"}
            </Button>
          </form>

          <div className="mt-4 text-sm text-muted-foreground">
            💡 <strong>Dicas de busca:</strong> Digite palavras-chave da sua atividade. 
            Ex: "corte cabelo", "desenvolvimento software", "venda roupas", etc.
          </div>
        </CardContent>
      </Card>

      {error && (
        <Alert className="mb-6 border-red-200 bg-red-50">
          <AlertCircle className="h-4 w-4 text-red-600" />
          <AlertDescription className="text-red-800">
            <div className="flex items-center justify-between">
              <span>Erro ao buscar CNAEs. Os dados podem não estar inicializados.</span>
              <Button
                onClick={initializeCnaeData}
                disabled={isInitializing}
                size="sm"
                variant="outline"
                className="ml-4"
              >
                {isInitializing ? (
                  <Loader2 className="w-4 h-4 animate-spin mr-2" />
                ) : (
                  <RefreshCw className="w-4 h-4 mr-2" />
                )}
                {isInitializing ? "Inicializando..." : "Inicializar Dados"}
              </Button>
            </div>
          </AlertDescription>
        </Alert>
      )}

      {isLoading && (
        <div className="flex items-center justify-center py-12">
          <div className="text-center">
            <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4 text-primary" />
            <p className="text-muted-foreground">Buscando CNAEs...</p>
          </div>
        </div>
      )}

      {showNoResults && (
        <Alert className="mb-6">
          <Search className="h-4 w-4" />
          <AlertDescription>
            <div>
              <strong>Nenhum resultado encontrado para "{searchTerm}"</strong>
              <p className="mt-2">Tente:</p>
              <ul className="list-disc list-inside mt-1 space-y-1">
                <li>Usar termos mais genéricos (ex: "vendas" ao invés de "venda de roupas femininas")</li>
                <li>Verificar a ortografia</li>
                <li>Usar sinônimos da atividade</li>
              </ul>
            </div>
          </AlertDescription>
        </Alert>
      )}

      {hasResults && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-semibold text-foreground">
              Resultados da Pesquisa
            </h2>
            <span className="text-sm text-muted-foreground">
              {searchResults.length} resultado(s) encontrado(s)
            </span>
          </div>

          <div className="grid gap-6">
            {searchResults.map((cnae: CnaeData) => (
              <CnaeResultCard key={cnae.id} cnae={cnae} />
            ))}
          </div>

          <Card className="bg-blue-50 border-blue-200">
            <CardContent className="p-6">
              <h3 className="font-semibold text-blue-900 mb-2">
                📋 Não encontrou o que procura?
              </h3>
              <p className="text-blue-800 mb-4">
                Nossa base contém milhares de CNAEs. Entre em contato conosco para 
                uma consultoria personalizada e encontraremos o CNAE ideal para seu negócio.
              </p>
              <Button 
                className="gradient-primary text-white"
                onClick={() => window.location.href = '/contato'}
              >
                Solicitar Consultoria Gratuita
              </Button>
            </CardContent>
          </Card>
        </div>
      )}

      {!hasSearched && (
        <div className="text-center py-12">
          <div className="max-w-2xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <Card className="p-6 text-center">
                <Search className="w-12 h-12 text-primary mx-auto mb-4" />
                <h3 className="font-semibold mb-2">Busca Inteligente</h3>
                <p className="text-sm text-muted-foreground">
                  Sistema avançado de busca por palavras-chave
                </p>
              </Card>
              <Card className="p-6 text-center">
                <AlertCircle className="w-12 h-12 text-primary mx-auto mb-4" />
                <h3 className="font-semibold mb-2">Info Completa</h3>
                <p className="text-sm text-muted-foreground">
                  MEI, Fator R, atividades permitidas e restrições
                </p>
              </Card>
              <Card className="p-6 text-center">
                <RefreshCw className="w-12 h-12 text-primary mx-auto mb-4" />
                <h3 className="font-semibold mb-2">Dados Atualizados</h3>
                <p className="text-sm text-muted-foreground">
                  Base integrada com dados oficiais
                </p>
              </Card>
            </div>
            
            <p className="text-muted-foreground">
              Digite no campo acima para começar sua pesquisa
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
