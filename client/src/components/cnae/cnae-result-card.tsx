import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, XCircle, Info, ExternalLink } from "lucide-react";
import type { CnaeData } from "@shared/schema";

interface CnaeResultCardProps {
  cnae: CnaeData;
}

export default function CnaeResultCard({ cnae }: CnaeResultCardProps) {
  const allowedActivities = cnae.allowedActivities ? cnae.allowedActivities.split('\n').filter(Boolean) : [];
  const restrictedActivities = cnae.restrictedActivities ? cnae.restrictedActivities.split('\n').filter(Boolean) : [];

  return (
    <Card className="border border-neutral-200">
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="font-semibold text-lg text-foreground">CNAE: {cnae.code}</h3>
            <p className="text-muted-foreground">{cnae.description}</p>
          </div>
          <Badge 
            variant={cnae.canBeMei ? "default" : "secondary"}
            className={cnae.canBeMei ? "bg-accent text-white" : ""}
          >
            {cnae.canBeMei ? (
              <>
                <CheckCircle className="w-3 h-3 mr-1" />
                Pode ser MEI
              </>
            ) : (
              <>
                <XCircle className="w-3 h-3 mr-1" />
                Não pode ser MEI
              </>
            )}
          </Badge>
        </div>
        
        <div className="grid md:grid-cols-2 gap-4 mb-4">
          {allowedActivities.length > 0 && (
            <div>
              <h4 className="font-medium text-foreground mb-2 flex items-center">
                <CheckCircle className="w-4 h-4 text-green-600 mr-2" />
                Atividades Permitidas:
              </h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                {allowedActivities.map((activity, index) => (
                  <li key={index}>• {activity}</li>
                ))}
              </ul>
            </div>
          )}
          
          {restrictedActivities.length > 0 && (
            <div>
              <h4 className="font-medium text-foreground mb-2 flex items-center">
                <XCircle className="w-4 h-4 text-red-600 mr-2" />
                Restrições:
              </h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                {restrictedActivities.map((activity, index) => (
                  <li key={index}>• {activity}</li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {cnae.observations && (
          <div className="mb-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
            <div className="flex items-start">
              <Info className="w-4 h-4 text-blue-600 mr-2 mt-0.5 flex-shrink-0" />
              <div>
                <h4 className="font-medium text-blue-900 mb-1">Observações:</h4>
                <p className="text-sm text-blue-800">{cnae.observations}</p>
              </div>
            </div>
          </div>
        )}

        <div className="flex items-center justify-between pt-4 border-t border-neutral-200">
          <div className="text-sm text-muted-foreground">
            <Info className="inline-block w-4 h-4 text-primary mr-2" />
            <strong>Fator-R:</strong> {cnae.isFatorR ? "Aplicável" : "Não se aplica"}
          </div>
          <Button 
            className="gradient-primary text-white"
            onClick={() => window.location.href = '/contato'}
          >
            Abrir Empresa com este CNAE
            <ExternalLink className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
