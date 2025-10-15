import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { ArrowLeft, FileDown, Calendar, Clock, User, DollarSign } from "lucide-react";
import { toast } from "@/hooks/use-toast";

// Datos de ejemplo (en una app real vendría de una API o estado global)
const cortesEjemplo: Record<string, any> = {
  "1": {
    id: 1,
    fecha: "2025-01-15",
    hora: "18:30",
    cajero: "Juan Pérez",
    montoInicial: 1000.0,
    montoFinal: 5420.5,
    totalVentas: 4850.0,
    totalGastos: 429.5,
    observaciones: "Día normal de operación. Se registró un pico de ventas durante el horario de almuerzo.",
  },
  "2": {
    id: 2,
    fecha: "2025-01-15",
    hora: "14:15",
    cajero: "María López",
    montoInicial: 1000.0,
    montoFinal: 6123.75,
    totalVentas: 5680.25,
    totalGastos: 556.5,
    observaciones: "Turno matutino con buen flujo de clientes.",
  },
  "3": {
    id: 3,
    fecha: "2025-01-14",
    hora: "19:00",
    cajero: "Juan Pérez",
    montoInicial: 1000.0,
    montoFinal: 4892.3,
    totalVentas: 4250.8,
    totalGastos: 358.5,
    observaciones: "Sin incidencias.",
  },
  "4": {
    id: 4,
    fecha: "2025-01-14",
    hora: "13:45",
    cajero: "Carlos Ruiz",
    montoInicial: 1000.0,
    montoFinal: 7234.6,
    totalVentas: 6789.1,
    totalGastos: 554.5,
    observaciones: "Excelente día de ventas. Cliente mayorista realizó compra importante.",
  },
};

const DetalleCorte = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const corte = cortesEjemplo[id || ""];

  if (!corte) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Card className="max-w-md">
          <CardHeader>
            <CardTitle>Corte no encontrado</CardTitle>
            <CardDescription>El corte solicitado no existe</CardDescription>
          </CardHeader>
          <CardContent>
            <Button onClick={() => navigate("/gerente")}>Volver al Dashboard</Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const neto = corte.totalVentas - corte.totalGastos;

  const handleExportPDF = () => {
    toast({
      title: "¡PDF Generado!",
      description: "El archivo PDF se ha generado exitosamente (simulado)",
      className: "bg-success text-success-foreground",
    });
  };

  const handleExportExcel = () => {
    toast({
      title: "¡Excel Generado!",
      description: "El archivo Excel se ha generado exitosamente (simulado)",
      className: "bg-success text-success-foreground",
    });
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar userRole="gerente" />
        <div className="flex-1 flex flex-col">
          <header className="h-16 border-b bg-card flex items-center px-6 sticky top-0 z-10 shadow-sm">
            <SidebarTrigger />
            <h1 className="ml-4 text-xl font-semibold">Detalle del Corte #{corte.id}</h1>
          </header>

          <main className="flex-1 p-6 bg-background overflow-auto">
            <div className="max-w-4xl mx-auto space-y-6 animate-fade-in">
              {/* Botón Volver */}
              <Button
                variant="outline"
                onClick={() => navigate("/gerente")}
                className="mb-4"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Volver al Dashboard
              </Button>

              {/* Card Principal */}
              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle className="text-2xl">Información del Corte</CardTitle>
                  <CardDescription>
                    Detalles completos del corte de caja #{corte.id}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Información General */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-center gap-3 p-4 bg-muted rounded-lg">
                      <Calendar className="h-5 w-5 text-primary" />
                      <div>
                        <p className="text-sm text-muted-foreground">Fecha</p>
                        <p className="font-semibold">{corte.fecha}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 p-4 bg-muted rounded-lg">
                      <Clock className="h-5 w-5 text-primary" />
                      <div>
                        <p className="text-sm text-muted-foreground">Hora</p>
                        <p className="font-semibold">{corte.hora}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 p-4 bg-muted rounded-lg md:col-span-2">
                      <User className="h-5 w-5 text-primary" />
                      <div>
                        <p className="text-sm text-muted-foreground">Cajero</p>
                        <p className="font-semibold">{corte.cajero}</p>
                      </div>
                    </div>
                  </div>

                  <Separator />

                  {/* Montos */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold flex items-center gap-2">
                      <DollarSign className="h-5 w-5 text-primary" />
                      Detalle de Montos
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="p-4 bg-muted rounded-lg">
                        <p className="text-sm text-muted-foreground">Monto Inicial</p>
                        <p className="text-xl font-bold">
                          ${corte.montoInicial.toLocaleString("es-MX", { minimumFractionDigits: 2 })}
                        </p>
                      </div>

                      <div className="p-4 bg-muted rounded-lg">
                        <p className="text-sm text-muted-foreground">Monto Final</p>
                        <p className="text-xl font-bold">
                          ${corte.montoFinal.toLocaleString("es-MX", { minimumFractionDigits: 2 })}
                        </p>
                      </div>

                      <div className="p-4 bg-success/10 border border-success rounded-lg">
                        <p className="text-sm text-success/80">Total Ventas</p>
                        <p className="text-xl font-bold text-success">
                          ${corte.totalVentas.toLocaleString("es-MX", { minimumFractionDigits: 2 })}
                        </p>
                      </div>

                      <div className="p-4 bg-destructive/10 border border-destructive rounded-lg">
                        <p className="text-sm text-destructive/80">Total Gastos</p>
                        <p className="text-xl font-bold text-destructive">
                          ${corte.totalGastos.toLocaleString("es-MX", { minimumFractionDigits: 2 })}
                        </p>
                      </div>
                    </div>

                    {/* Total Neto */}
                    <div className="p-6 bg-gradient-to-r from-primary to-primary/80 text-primary-foreground rounded-lg shadow-md">
                      <p className="text-sm opacity-90">Total Neto</p>
                      <p className="text-3xl font-bold">
                        ${neto.toLocaleString("es-MX", { minimumFractionDigits: 2 })}
                      </p>
                    </div>
                  </div>

                  <Separator />

                  {/* Observaciones */}
                  {corte.observaciones && (
                    <div className="space-y-2">
                      <h3 className="text-lg font-semibold">Observaciones</h3>
                      <p className="p-4 bg-muted rounded-lg text-foreground">
                        {corte.observaciones}
                      </p>
                    </div>
                  )}

                  <Separator />

                  {/* Botones de Exportación */}
                  <div className="flex flex-wrap gap-3">
                    <Button
                      onClick={handleExportPDF}
                      className="flex-1 min-w-[200px] shadow-md hover:shadow-lg transition-all"
                    >
                      <FileDown className="h-4 w-4 mr-2" />
                      Exportar PDF
                    </Button>
                    <Button
                      onClick={handleExportExcel}
                      variant="outline"
                      className="flex-1 min-w-[200px] shadow-md hover:shadow-lg transition-all"
                    >
                      <FileDown className="h-4 w-4 mr-2" />
                      Exportar Excel
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default DetalleCorte;
