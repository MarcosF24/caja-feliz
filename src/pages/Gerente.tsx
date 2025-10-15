import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { Eye, TrendingUp, TrendingDown, DollarSign } from "lucide-react";

// Datos de ejemplo
const cortesEjemplo = [
  {
    id: 1,
    fecha: "2025-01-15",
    hora: "18:30",
    cajero: "Juan Pérez",
    montoInicial: 1000.0,
    montoFinal: 5420.5,
    totalVentas: 4850.0,
    totalGastos: 429.5,
  },
  {
    id: 2,
    fecha: "2025-01-15",
    hora: "14:15",
    cajero: "María López",
    montoInicial: 1000.0,
    montoFinal: 6123.75,
    totalVentas: 5680.25,
    totalGastos: 556.5,
  },
  {
    id: 3,
    fecha: "2025-01-14",
    hora: "19:00",
    cajero: "Juan Pérez",
    montoInicial: 1000.0,
    montoFinal: 4892.3,
    totalVentas: 4250.8,
    totalGastos: 358.5,
  },
  {
    id: 4,
    fecha: "2025-01-14",
    hora: "13:45",
    cajero: "Carlos Ruiz",
    montoInicial: 1000.0,
    montoFinal: 7234.6,
    totalVentas: 6789.1,
    totalGastos: 554.5,
  },
];

const Gerente = () => {
  const navigate = useNavigate();
  const [filtroFecha, setFiltroFecha] = useState("");
  const [filtroCajero, setFiltroCajero] = useState("");

  const cortesFiltrados = cortesEjemplo.filter((corte) => {
    const cumpleFecha = !filtroFecha || corte.fecha === filtroFecha;
    const cumpleCajero = !filtroCajero || corte.cajero.toLowerCase().includes(filtroCajero.toLowerCase());
    return cumpleFecha && cumpleCajero;
  });

  const totalVentas = cortesFiltrados.reduce((sum, corte) => sum + corte.totalVentas, 0);
  const totalGastos = cortesFiltrados.reduce((sum, corte) => sum + corte.totalGastos, 0);
  const totalNeto = totalVentas - totalGastos;

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar userRole="gerente" />
        <div className="flex-1 flex flex-col">
          <header className="h-16 border-b bg-card flex items-center px-6 sticky top-0 z-10 shadow-sm">
            <SidebarTrigger />
            <h1 className="ml-4 text-xl font-semibold">Dashboard de Cortes</h1>
          </header>

          <main className="flex-1 p-6 bg-background overflow-auto">
            <div className="max-w-7xl mx-auto space-y-6 animate-fade-in">
              {/* Cards de Resumen */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card className="shadow-md">
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground">Total Ventas</p>
                        <p className="text-2xl font-bold text-success">
                          ${totalVentas.toLocaleString("es-MX", { minimumFractionDigits: 2 })}
                        </p>
                      </div>
                      <TrendingUp className="h-8 w-8 text-success" />
                    </div>
                  </CardContent>
                </Card>

                <Card className="shadow-md">
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground">Total Gastos</p>
                        <p className="text-2xl font-bold text-destructive">
                          ${totalGastos.toLocaleString("es-MX", { minimumFractionDigits: 2 })}
                        </p>
                      </div>
                      <TrendingDown className="h-8 w-8 text-destructive" />
                    </div>
                  </CardContent>
                </Card>

                <Card className="shadow-md bg-gradient-to-r from-primary to-primary/80 text-primary-foreground">
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm opacity-90">Neto Total</p>
                        <p className="text-2xl font-bold">
                          ${totalNeto.toLocaleString("es-MX", { minimumFractionDigits: 2 })}
                        </p>
                      </div>
                      <DollarSign className="h-8 w-8 opacity-80" />
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Filtros */}
              <Card className="shadow-md">
                <CardHeader>
                  <CardTitle>Filtros de Búsqueda</CardTitle>
                  <CardDescription>Filtra los cortes por fecha y cajero</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="filtroFecha">Fecha</Label>
                      <Input
                        id="filtroFecha"
                        type="date"
                        value={filtroFecha}
                        onChange={(e) => setFiltroFecha(e.target.value)}
                        className="transition-all duration-200"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="filtroCajero">Cajero</Label>
                      <Input
                        id="filtroCajero"
                        type="text"
                        placeholder="Buscar por nombre..."
                        value={filtroCajero}
                        onChange={(e) => setFiltroCajero(e.target.value)}
                        className="transition-all duration-200"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Tabla de Cortes */}
              <Card className="shadow-md">
                <CardHeader>
                  <CardTitle>Historial de Cortes</CardTitle>
                  <CardDescription>
                    {cortesFiltrados.length} corte(s) encontrado(s)
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="rounded-md border overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Fecha</TableHead>
                          <TableHead>Hora</TableHead>
                          <TableHead>Cajero</TableHead>
                          <TableHead className="text-right">M. Inicial</TableHead>
                          <TableHead className="text-right">M. Final</TableHead>
                          <TableHead className="text-right">Ventas</TableHead>
                          <TableHead className="text-right">Gastos</TableHead>
                          <TableHead className="text-center">Acciones</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {cortesFiltrados.map((corte) => (
                          <TableRow key={corte.id} className="hover:bg-muted/50 transition-colors">
                            <TableCell>{corte.fecha}</TableCell>
                            <TableCell>{corte.hora}</TableCell>
                            <TableCell className="font-medium">{corte.cajero}</TableCell>
                            <TableCell className="text-right">
                              ${corte.montoInicial.toLocaleString("es-MX", { minimumFractionDigits: 2 })}
                            </TableCell>
                            <TableCell className="text-right">
                              ${corte.montoFinal.toLocaleString("es-MX", { minimumFractionDigits: 2 })}
                            </TableCell>
                            <TableCell className="text-right text-success font-medium">
                              ${corte.totalVentas.toLocaleString("es-MX", { minimumFractionDigits: 2 })}
                            </TableCell>
                            <TableCell className="text-right text-destructive font-medium">
                              ${corte.totalGastos.toLocaleString("es-MX", { minimumFractionDigits: 2 })}
                            </TableCell>
                            <TableCell className="text-center">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => navigate(`/corte/${corte.id}`)}
                                className="hover:bg-primary hover:text-primary-foreground transition-all"
                              >
                                <Eye className="h-4 w-4 mr-1" />
                                Ver
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
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

export default Gerente;
