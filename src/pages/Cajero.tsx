import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { Calculator } from "lucide-react";

const Cajero = () => {
  const [montoInicial, setMontoInicial] = useState("");
  const [montoFinal, setMontoFinal] = useState("");
  const [totalVentas, setTotalVentas] = useState("");
  const [totalGastos, setTotalGastos] = useState("");
  const [observaciones, setObservaciones] = useState("");

  const calcularNeto = () => {
    const ventas = parseFloat(totalVentas) || 0;
    const gastos = parseFloat(totalGastos) || 0;
    return ventas - gastos;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!montoInicial || !montoFinal || !totalVentas || !totalGastos) {
      toast({
        title: "Error",
        description: "Por favor completa todos los campos requeridos",
        variant: "destructive",
      });
      return;
    }

    // Simular registro exitoso
    toast({
      title: "¡Corte registrado exitosamente!",
      description: "El corte de caja ha sido guardado correctamente",
      className: "bg-success text-success-foreground",
    });

    // Limpiar formulario
    setMontoInicial("");
    setMontoFinal("");
    setTotalVentas("");
    setTotalGastos("");
    setObservaciones("");
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar userRole="cajero" />
        <div className="flex-1 flex flex-col">
          <header className="h-16 border-b bg-card flex items-center px-6 sticky top-0 z-10 shadow-sm">
            <SidebarTrigger />
            <h1 className="ml-4 text-xl font-semibold">Registro de Corte de Caja</h1>
          </header>

          <main className="flex-1 p-6 bg-background overflow-auto">
            <div className="max-w-3xl mx-auto space-y-6 animate-fade-in">
              {/* Card de Neto Calculado */}
              <Card className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground shadow-lg">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm opacity-90">Total Neto Calculado</p>
                      <p className="text-3xl font-bold mt-1">
                        ${calcularNeto().toLocaleString("es-MX", { minimumFractionDigits: 2 })}
                      </p>
                    </div>
                    <Calculator className="h-12 w-12 opacity-80" />
                  </div>
                </CardContent>
              </Card>

              {/* Formulario de Corte */}
              <Card className="shadow-md">
                <CardHeader>
                  <CardTitle>Información del Corte</CardTitle>
                  <CardDescription>Completa los datos del corte de caja actual</CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="montoInicial">Monto Inicial *</Label>
                        <Input
                          id="montoInicial"
                          type="number"
                          step="0.01"
                          placeholder="0.00"
                          value={montoInicial}
                          onChange={(e) => setMontoInicial(e.target.value)}
                          className="transition-all duration-200 focus:ring-2 focus:ring-primary"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="montoFinal">Monto Final *</Label>
                        <Input
                          id="montoFinal"
                          type="number"
                          step="0.01"
                          placeholder="0.00"
                          value={montoFinal}
                          onChange={(e) => setMontoFinal(e.target.value)}
                          className="transition-all duration-200 focus:ring-2 focus:ring-primary"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="totalVentas">Total de Ventas *</Label>
                        <Input
                          id="totalVentas"
                          type="number"
                          step="0.01"
                          placeholder="0.00"
                          value={totalVentas}
                          onChange={(e) => setTotalVentas(e.target.value)}
                          className="transition-all duration-200 focus:ring-2 focus:ring-primary"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="totalGastos">Total de Gastos *</Label>
                        <Input
                          id="totalGastos"
                          type="number"
                          step="0.01"
                          placeholder="0.00"
                          value={totalGastos}
                          onChange={(e) => setTotalGastos(e.target.value)}
                          className="transition-all duration-200 focus:ring-2 focus:ring-primary"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="observaciones">Observaciones</Label>
                      <Textarea
                        id="observaciones"
                        placeholder="Notas adicionales sobre el corte..."
                        value={observaciones}
                        onChange={(e) => setObservaciones(e.target.value)}
                        rows={4}
                        className="transition-all duration-200 focus:ring-2 focus:ring-primary resize-none"
                      />
                    </div>

                    <Button
                      type="submit"
                      className="w-full shadow-md hover:shadow-lg transition-all duration-200"
                      size="lg"
                    >
                      Registrar Corte
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Cajero;
