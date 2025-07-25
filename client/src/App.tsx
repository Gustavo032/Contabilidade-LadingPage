import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import WhatsAppFloat from "@/components/layout/whatsapp-float";
import Home from "@/pages/home";
import Services from "@/pages/services";
import CnaeSearch from "@/pages/cnae-search";
import Tools from "@/pages/tools";
import About from "@/pages/about";
import Contact from "@/pages/contact";
import Blog from "@/pages/blog";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <Switch>
          <Route path="/" component={Home} />
          <Route path="/servicos" component={Services} />
          <Route path="/consulta-cnae" component={CnaeSearch} />
          <Route path="/ferramentas" component={Tools} />
          <Route path="/sobre" component={About} />
          <Route path="/contato" component={Contact} />
          <Route path="/blog" component={Blog} />
          <Route component={NotFound} />
        </Switch>
      </main>
      <Footer />
      <WhatsAppFloat />
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
