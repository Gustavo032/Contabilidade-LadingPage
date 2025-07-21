
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Calculator, Settings, Download, ExternalLink, DollarSign, Building2, FileText, TrendingUp, Percent, FileBarChart } from "lucide-react";
import SEOHead from "@/components/seo/seo-head";

export default function Tools() {
  const [taxCalculatorOpen, setTaxCalculatorOpen] = useState(false);
  const [regimeSimulatorOpen, setRegimeSimulatorOpen] = useState(false);
  const [documentsLibraryOpen, setDocumentsLibraryOpen] = useState(false);
  const [salaryCalculatorOpen, setSalaryCalculatorOpen] = useState(false);
  const [meiCalculatorOpen, setMeiCalculatorOpen] = useState(false);
  const [profitCalculatorOpen, setProfitCalculatorOpen] = useState(false);

  // Tax Calculator State
  const [revenue, setRevenue] = useState("");
  const [regime, setRegime] = useState("");
  const [activity, setActivity] = useState("");
  const [taxResult, setTaxResult] = useState<any>(null);

  // Regime Simulator State
  const [monthlyRevenue, setMonthlyRevenue] = useState("");
  const [employees, setEmployees] = useState("");
  const [regimeComparison, setRegimeComparison] = useState<any>(null);

  // Salary Calculator State
  const [grossSalary, setGrossSalary] = useState("");
  const [dependents, setDependents] = useState("");
  const [salaryResult, setSalaryResult] = useState<any>(null);

  // MEI Calculator State
  const [meiRevenue, setMeiRevenue] = useState("");
  const [meiActivity, setMeiActivity] = useState("");
  const [meiResult, setMeiResult] = useState<any>(null);

  // Profit Calculator State
  const [totalRevenue, setTotalRevenue] = useState("");
  const [totalExpenses, setTotalExpenses] = useState("");
  const [profitResult, setProfitResult] = useState<any>(null);

  const calculateTax = () => {
    const revenueNum = parseFloat(revenue);
    if (!revenueNum || !regime) return;

    let taxRate = 0;
    let approximateTax = 0;

    switch (regime) {
      case "simples":
        taxRate = 0.06; // 6% aproximado
        break;
      case "presumido":
        taxRate = 0.1138; // 11.38% aproximado
        break;
      case "real":
        taxRate = 0.34; // 34% aproximado
        break;
    }

    approximateTax = revenueNum * taxRate;

    setTaxResult({
      regime,
      revenue: revenueNum,
      taxRate: (taxRate * 100).toFixed(2),
      approximateTax: approximateTax.toFixed(2),
      netRevenue: (revenueNum - approximateTax).toFixed(2)
    });
  };

  const simulateRegimes = () => {
    const monthlyRevenueNum = parseFloat(monthlyRevenue);
    if (!monthlyRevenueNum) return;

    const annualRevenue = monthlyRevenueNum * 12;
    
    const simples = {
      name: "Simples Nacional",
      tax: annualRevenue * 0.06,
      rate: "6%",
      pros: ["Simplicidade na apuração", "Menor carga tributária", "Unifica vários impostos"],
      cons: ["Limite de faturamento", "Restrições de atividades"]
    };

    const presumido = {
      name: "Lucro Presumido",
      tax: annualRevenue * 0.1138,
      rate: "11.38%",
      pros: ["Flexibilidade maior", "Sem limite de faturamento", "Distribuição de lucros"],
      cons: ["Tributação sobre receita presumida", "Mais complexo"]
    };

    const real = {
      name: "Lucro Real",
      tax: annualRevenue * 0.34,
      rate: "34%",
      pros: ["Tributação sobre lucro real", "Compensação de prejuízos"],
      cons: ["Maior complexidade", "Obrigações acessórias"]
    };

    setRegimeComparison({ simples, presumido, real, annualRevenue });
  };

  const calculateSalary = () => {
    const grossSalaryNum = parseFloat(grossSalary);
    const dependentsNum = parseInt(dependents) || 0;
    
    if (!grossSalaryNum) return;

    // Simplificação do cálculo - valores aproximados para 2024
    const inssRate = grossSalaryNum <= 1320 ? 0.075 : 
                     grossSalaryNum <= 2571.29 ? 0.09 :
                     grossSalaryNum <= 3856.94 ? 0.12 : 0.14;
    
    const inssDiscount = Math.min(grossSalaryNum * inssRate, 713.10);
    const taxableIncome = grossSalaryNum - inssDiscount;
    
    const deduction = 2259.20 + (dependentsNum * 189.59);
    const irBase = Math.max(taxableIncome - deduction, 0);
    
    let irDiscount = 0;
    if (irBase > 4664.68) {
      irDiscount = irBase * 0.275 - 869.36;
    } else if (irBase > 3751.06) {
      irDiscount = irBase * 0.225 - 636.13;
    } else if (irBase > 2826.66) {
      irDiscount = irBase * 0.15 - 354.80;
    } else if (irBase > 2112) {
      irDiscount = irBase * 0.075 - 158.40;
    }

    const netSalary = grossSalaryNum - inssDiscount - Math.max(irDiscount, 0);

    setSalaryResult({
      grossSalary: grossSalaryNum,
      inssDiscount: inssDiscount.toFixed(2),
      irDiscount: Math.max(irDiscount, 0).toFixed(2),
      netSalary: netSalary.toFixed(2),
      totalDiscounts: (inssDiscount + Math.max(irDiscount, 0)).toFixed(2)
    });
  };

  const calculateMEI = () => {
    const revenueNum = parseFloat(meiRevenue);
    if (!revenueNum || !meiActivity) return;

    let monthlyTax = 0;
    
    switch (meiActivity) {
      case "comercio":
        monthlyTax = 66.60; // INSS + ICMS
        break;
      case "industria":
        monthlyTax = 67.60; // INSS + ICMS + IPI
        break;
      case "servicos":
        monthlyTax = 70.60; // INSS + ISS
        break;
    }

    const annualTax = monthlyTax * 12;
    const taxRate = (annualTax / revenueNum) * 100;

    setMeiResult({
      revenue: revenueNum,
      monthlyTax: monthlyTax.toFixed(2),
      annualTax: annualTax.toFixed(2),
      taxRate: taxRate.toFixed(2),
      netRevenue: (revenueNum - annualTax).toFixed(2)
    });
  };

  const calculateProfit = () => {
    const revenueNum = parseFloat(totalRevenue);
    const expensesNum = parseFloat(totalExpenses);
    
    if (!revenueNum || !expensesNum) return;

    const grossProfit = revenueNum - expensesNum;
    const profitMargin = (grossProfit / revenueNum) * 100;
    
    setProfitResult({
      revenue: revenueNum,
      expenses: expensesNum,
      grossProfit: grossProfit.toFixed(2),
      profitMargin: profitMargin.toFixed(2)
    });
  };

  const toolCategories = [
    {
      icon: Calculator,
      title: "Contabilidade",
      tools: [
        { name: "Emissor gratuito de NF-e", url: "https://www.nfe.fazenda.gov.br/" },
        { name: "Calculadora Simples Nacional", url: "https://www8.receita.fazenda.gov.br/simplesnacional/" },
        { name: "Gerador de DARF", url: "https://cav.receita.fazenda.gov.br/eCAC/" },
        { name: "Tabela INSS/IRRF Atualizada", url: "https://www.gov.br/inss/pt-br" }
      ]
    },
    {
      icon: Settings,
      title: "Utilitários Diversos",
      tools: [
        { name: "Consulta CNPJ na Receita", url: "https://servicos.receita.fazenda.gov.br/servicos/cnpjreva/" },
        { name: "Consulta débitos PGFN", url: "https://www.pgfn.gov.br/" },
        { name: "Parcelamento Simples Nacional", url: "https://www8.receita.fazenda.gov.br/simplesnacional/" },
        { name: "Verificador de CPF/CNPJ", url: "https://www.receita.fazenda.gov.br/orientacao/tributaria/cadastros/cpf/" }
      ]
    }
  ];

  const downloadableResources = [
    { name: "Manual de Abertura MEI", type: "PDF", size: "2.5 MB" },
    { name: "Modelo de Contrato Social", type: "DOC", size: "145 KB" },
    { name: "Planilha de Controle Financeiro", type: "XLS", size: "890 KB" },
    { name: "Tabela de Atividades CNAE", type: "PDF", size: "1.2 MB" },
    { name: "Checklist Obrigações Mensais", type: "PDF", size: "320 KB" },
    { name: "Modelo de Nota Fiscal", type: "PDF", size: "450 KB" }
  ];

  const handleToolClick = (tool: any) => {
    window.open(tool.url, '_blank', 'noopener,noreferrer');
  };

  const handleDownload = (resource: any) => {
    // Simula download
    alert(`Iniciando download de: ${resource.name}`);
  };

  return (
    <>
      <SEOHead 
        title="Ferramentas Úteis - Calculadoras e Utilitários Contábeis"
        description="Acesse ferramentas gratuitas para contabilidade: calculadoras, geradores de DARF, consultas, manuais e planilhas úteis para sua empresa."
        keywords="ferramentas contábeis, calculadora simples nacional, gerador DARF, consulta CNPJ, manuais contabilidade"
      />

      {/* Hero Section */}
      <section className="py-20 gradient-primary text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl lg:text-5xl font-bold mb-6">
              Ferramentas Úteis
            </h1>
            <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
              Calculadoras inteligentes e recursos essenciais para manter sua empresa em dia.
            </p>
          </div>
        </div>
      </section>

      {/* Interactive Tools */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-foreground mb-4">Calculadoras Interativas</h2>
            <p className="text-xl text-muted-foreground">Ferramentas modernas para facilitar seus cálculos</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Tax Calculator */}
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="bg-primary text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Calculator className="w-8 h-8" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">Calculadora de Impostos</h3>
                <p className="text-muted-foreground mb-4">
                  Calcule aproximadamente os impostos devidos pela sua empresa
                </p>
                <Dialog open={taxCalculatorOpen} onOpenChange={setTaxCalculatorOpen}>
                  <DialogTrigger asChild>
                    <Button>Usar Calculadora</Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-md">
                    <DialogHeader>
                      <DialogTitle>Calculadora de Impostos</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="revenue">Faturamento Anual (R$)</Label>
                        <Input
                          id="revenue"
                          value={revenue}
                          onChange={(e) => setRevenue(e.target.value)}
                          placeholder="Ex: 180000"
                          type="number"
                        />
                      </div>
                      <div>
                        <Label htmlFor="regime">Regime Tributário</Label>
                        <Select value={regime} onValueChange={setRegime}>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione o regime" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="simples">Simples Nacional</SelectItem>
                            <SelectItem value="presumido">Lucro Presumido</SelectItem>
                            <SelectItem value="real">Lucro Real</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <Button onClick={calculateTax} className="w-full">
                        Calcular
                      </Button>
                      {taxResult && (
                        <div className="mt-4 p-4 bg-muted rounded-lg">
                          <h4 className="font-semibold mb-2">Resultado:</h4>
                          <p>Regime: {taxResult.regime}</p>
                          <p>Taxa aproximada: {taxResult.taxRate}%</p>
                          <p>Impostos: R$ {taxResult.approximateTax}</p>
                          <p>Receita líquida: R$ {taxResult.netRevenue}</p>
                        </div>
                      )}
                    </div>
                  </DialogContent>
                </Dialog>
              </CardContent>
            </Card>

            {/* Regime Simulator */}
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="bg-accent text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <TrendingUp className="w-8 h-8" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">Simulador de Regimes</h3>
                <p className="text-muted-foreground mb-4">
                  Compare diferentes regimes tributários para sua empresa
                </p>
                <Dialog open={regimeSimulatorOpen} onOpenChange={setRegimeSimulatorOpen}>
                  <DialogTrigger asChild>
                    <Button>Usar Simulador</Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl">
                    <DialogHeader>
                      <DialogTitle>Simulador de Regimes Tributários</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="monthlyRevenue">Faturamento Mensal (R$)</Label>
                        <Input
                          id="monthlyRevenue"
                          value={monthlyRevenue}
                          onChange={(e) => setMonthlyRevenue(e.target.value)}
                          placeholder="Ex: 15000"
                          type="number"
                        />
                      </div>
                      <Button onClick={simulateRegimes} className="w-full">
                        Simular Regimes
                      </Button>
                      {regimeComparison && (
                        <div className="mt-4 space-y-4">
                          {[regimeComparison.simples, regimeComparison.presumido, regimeComparison.real].map((regime, index) => (
                            <div key={index} className="p-4 border rounded-lg">
                              <h4 className="font-semibold">{regime.name}</h4>
                              <p>Taxa: {regime.rate}</p>
                              <p>Impostos anuais: R$ {regime.tax.toFixed(2)}</p>
                              <div className="mt-2">
                                <p className="text-sm text-green-600">Vantagens:</p>
                                <ul className="text-xs list-disc list-inside">
                                  {regime.pros.map((pro: string, i: number) => <li key={i}>{pro}</li>)}
                                </ul>
                                <p className="text-sm text-red-600 mt-1">Desvantagens:</p>
                                <ul className="text-xs list-disc list-inside">
                                  {regime.cons.map((con: string, i: number) => <li key={i}>{con}</li>)}
                                </ul>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </DialogContent>
                </Dialog>
              </CardContent>
            </Card>

            {/* Salary Calculator */}
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="bg-green-500 text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <DollarSign className="w-8 h-8" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">Calculadora de Salário</h3>
                <p className="text-muted-foreground mb-4">
                  Calcule salário líquido com desconto de INSS e IR
                </p>
                <Dialog open={salaryCalculatorOpen} onOpenChange={setSalaryCalculatorOpen}>
                  <DialogTrigger asChild>
                    <Button>Calcular Salário</Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-md">
                    <DialogHeader>
                      <DialogTitle>Calculadora de Salário</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="grossSalary">Salário Bruto (R$)</Label>
                        <Input
                          id="grossSalary"
                          value={grossSalary}
                          onChange={(e) => setGrossSalary(e.target.value)}
                          placeholder="Ex: 5000"
                          type="number"
                        />
                      </div>
                      <div>
                        <Label htmlFor="dependents">Número de Dependentes</Label>
                        <Input
                          id="dependents"
                          value={dependents}
                          onChange={(e) => setDependents(e.target.value)}
                          placeholder="Ex: 2"
                          type="number"
                        />
                      </div>
                      <Button onClick={calculateSalary} className="w-full">
                        Calcular
                      </Button>
                      {salaryResult && (
                        <div className="mt-4 p-4 bg-muted rounded-lg">
                          <h4 className="font-semibold mb-2">Resultado:</h4>
                          <p>Salário Bruto: R$ {salaryResult.grossSalary}</p>
                          <p>Desconto INSS: R$ {salaryResult.inssDiscount}</p>
                          <p>Desconto IR: R$ {salaryResult.irDiscount}</p>
                          <p>Total Descontos: R$ {salaryResult.totalDiscounts}</p>
                          <p className="font-semibold">Salário Líquido: R$ {salaryResult.netSalary}</p>
                        </div>
                      )}
                    </div>
                  </DialogContent>
                </Dialog>
              </CardContent>
            </Card>

            {/* MEI Calculator */}
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="bg-blue-500 text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Building2 className="w-8 h-8" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">Calculadora MEI</h3>
                <p className="text-muted-foreground mb-4">
                  Calcule impostos e contribuições do MEI
                </p>
                <Dialog open={meiCalculatorOpen} onOpenChange={setMeiCalculatorOpen}>
                  <DialogTrigger asChild>
                    <Button>Calcular MEI</Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-md">
                    <DialogHeader>
                      <DialogTitle>Calculadora MEI</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="meiRevenue">Faturamento Anual (R$)</Label>
                        <Input
                          id="meiRevenue"
                          value={meiRevenue}
                          onChange={(e) => setMeiRevenue(e.target.value)}
                          placeholder="Ex: 81000"
                          type="number"
                        />
                      </div>
                      <div>
                        <Label htmlFor="meiActivity">Tipo de Atividade</Label>
                        <Select value={meiActivity} onValueChange={setMeiActivity}>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione a atividade" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="comercio">Comércio</SelectItem>
                            <SelectItem value="industria">Indústria</SelectItem>
                            <SelectItem value="servicos">Serviços</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <Button onClick={calculateMEI} className="w-full">
                        Calcular
                      </Button>
                      {meiResult && (
                        <div className="mt-4 p-4 bg-muted rounded-lg">
                          <h4 className="font-semibold mb-2">Resultado:</h4>
                          <p>Faturamento: R$ {meiResult.revenue}</p>
                          <p>DAS Mensal: R$ {meiResult.monthlyTax}</p>
                          <p>DAS Anual: R$ {meiResult.annualTax}</p>
                          <p>Taxa Efetiva: {meiResult.taxRate}%</p>
                          <p className="font-semibold">Receita Líquida: R$ {meiResult.netRevenue}</p>
                        </div>
                      )}
                    </div>
                  </DialogContent>
                </Dialog>
              </CardContent>
            </Card>

            {/* Profit Calculator */}
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="bg-purple-500 text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Percent className="w-8 h-8" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">Calculadora de Lucro</h3>
                <p className="text-muted-foreground mb-4">
                  Calcule margem de lucro e rentabilidade
                </p>
                <Dialog open={profitCalculatorOpen} onOpenChange={setProfitCalculatorOpen}>
                  <DialogTrigger asChild>
                    <Button>Calcular Lucro</Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-md">
                    <DialogHeader>
                      <DialogTitle>Calculadora de Lucro</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="totalRevenue">Receita Total (R$)</Label>
                        <Input
                          id="totalRevenue"
                          value={totalRevenue}
                          onChange={(e) => setTotalRevenue(e.target.value)}
                          placeholder="Ex: 100000"
                          type="number"
                        />
                      </div>
                      <div>
                        <Label htmlFor="totalExpenses">Gastos Totais (R$)</Label>
                        <Input
                          id="totalExpenses"
                          value={totalExpenses}
                          onChange={(e) => setTotalExpenses(e.target.value)}
                          placeholder="Ex: 70000"
                          type="number"
                        />
                      </div>
                      <Button onClick={calculateProfit} className="w-full">
                        Calcular
                      </Button>
                      {profitResult && (
                        <div className="mt-4 p-4 bg-muted rounded-lg">
                          <h4 className="font-semibold mb-2">Resultado:</h4>
                          <p>Receita: R$ {profitResult.revenue}</p>
                          <p>Gastos: R$ {profitResult.expenses}</p>
                          <p className="font-semibold">Lucro Bruto: R$ {profitResult.grossProfit}</p>
                          <p className="font-semibold">Margem de Lucro: {profitResult.profitMargin}%</p>
                        </div>
                      )}
                    </div>
                  </DialogContent>
                </Dialog>
              </CardContent>
            </Card>

            {/* Documents Library */}
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="bg-yellow-500 text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FileBarChart className="w-8 h-8" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">Biblioteca de Modelos</h3>
                <p className="text-muted-foreground mb-4">
                  Baixe modelos de contratos, planilhas e documentos
                </p>
                <Dialog open={documentsLibraryOpen} onOpenChange={setDocumentsLibraryOpen}>
                  <DialogTrigger asChild>
                    <Button>Acessar Biblioteca</Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl">
                    <DialogHeader>
                      <DialogTitle>Biblioteca de Documentos</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-3 max-h-96 overflow-y-auto">
                      {downloadableResources.map((resource, index) => (
                        <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                          <div className="flex items-center space-x-3">
                            <FileText className="w-5 h-5 text-muted-foreground" />
                            <div>
                              <p className="font-medium">{resource.name}</p>
                              <p className="text-sm text-muted-foreground">{resource.type} • {resource.size}</p>
                            </div>
                          </div>
                          <Button size="sm" onClick={() => handleDownload(resource)}>
                            <Download className="w-4 h-4 mr-2" />
                            Baixar
                          </Button>
                        </div>
                      ))}
                    </div>
                  </DialogContent>
                </Dialog>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* External Tools Grid */}
      <section className="py-20 bg-muted/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-foreground mb-4">Ferramentas Externas</h2>
            <p className="text-xl text-muted-foreground">Links diretos para sites oficiais</p>
          </div>
          <div className="grid lg:grid-cols-2 gap-8">
            {toolCategories.map((category) => (
              <Card key={category.title} className="h-fit">
                <CardContent className="p-6">
                  <div className="flex items-center mb-6">
                    <category.icon className="w-6 h-6 text-primary mr-3" />
                    <h3 className="text-xl font-semibold text-foreground">{category.title}</h3>
                  </div>
                  <div className="space-y-3">
                    {category.tools.map((tool) => (
                      <button
                        key={tool.name}
                        onClick={() => handleToolClick(tool)}
                        className="flex items-center justify-between w-full p-3 bg-muted rounded-lg hover:shadow-sm transition-shadow text-left"
                      >
                        <span className="text-foreground">{tool.name}</span>
                        <ExternalLink className="w-4 h-4 text-muted-foreground" />
                      </button>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Help Section */}
      <section className="py-20 gradient-primary text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Precisa de Ajuda com as Ferramentas?</h2>
          <p className="text-xl text-blue-100 mb-8">
            Nossa equipe está pronta para auxiliar você no uso das ferramentas e esclarecer suas dúvidas.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              variant="secondary" 
              onClick={() => window.location.href = '/contato'}
            >
              Falar com Especialista
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-white text-white hover:bg-white hover:text-primary"
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
