import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Search, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import CnaeResultCard from "./cnae-result-card";
import type { CnaeData } from "@shared/schema";

export default function CnaeSearchTool() {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const { data: searchResults, isLoading, error } = useQuery({
    queryKey: ["/api/cnae/search", searchTerm],
    enabled: searchTerm.length >= 2,
  });

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim().length >= 2) {
      setSearchTerm(searchQuery.trim());
    }
  };

  return (
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
        <form onSubmit={handleSearch} className="mb-6">
          <label className="block text-sm font-medium text-foreground mb-2">
            Pesquise por atividade ou código CNAE
          </label>
          <div className="relative flex gap-2">
            <Input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Ex: manicure, consultoria, salão, ou código 8412..."
              className="flex-1"
            />
            <Button 
              type="submit" 
              disabled={searchQuery.length < 2 || isLoading}
              className="gradient-primary"
            >
              {isLoading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Search className="h-4 w-4" />
              )}
            </Button>
          </div>
        </form>

        {/* Search Results */}
        {searchTerm && (
          <div className="space-y-4">
            {isLoading && (
              <div className="flex items-center justify-center py-8">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
                <span className="ml-2 text-muted-foreground">Buscando CNAEs...</span>
              </div>
            )}

            {error && (
              <Card className="border-destructive">
                <CardContent className="pt-6">
                  <p className="text-destructive text-center">
                    Erro ao buscar CNAEs. Tente novamente.
                  </p>
                </CardContent>
              </Card>
            )}

            {searchResults && !isLoading && (
              <>
                {searchResults.length === 0 ? (
                  <Card className="border-yellow-200 bg-yellow-50">
                    <CardContent className="pt-6">
                      <p className="text-center text-yellow-800">
                        Nenhum CNAE encontrado para "{searchTerm}". 
                        Tente usar palavras-chave diferentes ou consulte nossos especialistas.
                      </p>
                    </CardContent>
                  </Card>
                ) : (
                  <div className="space-y-4">
                    <p className="text-sm text-muted-foreground">
                      Encontrados {searchResults.length} resultado(s) para "{searchTerm}"
                    </p>
                    {searchResults.map((cnae: CnaeData) => (
                      <CnaeResultCard key={cnae.id} cnae={cnae} />
                    ))}
                  </div>
                )}
              </>
            )}
          </div>
        )}

        {!searchTerm && (
          <div className="text-center text-muted-foreground py-8">
            <Search className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p>Digite pelo menos 2 caracteres para buscar CNAEs</p>
          </div>
        )}

        {/* CTA section */}
        <Card className="gradient-primary text-white mt-8">
          <CardContent className="p-6">
            <div className="text-center">
              <h3 className="font-semibold text-lg mb-2">Ficou em dúvida?</h3>
              <p className="mb-4">Fale com a Contabilize e escolha o melhor CNAE para pagar menos impostos.</p>
              <Button 
                variant="secondary" 
                className="bg-white text-primary hover:bg-neutral-100"
                onClick={() => window.location.href = '/contato'}
              >
                Falar com Especialista
              </Button>
            </div>
          </CardContent>
        </Card>
      </Card>
    </div>
  );
}
