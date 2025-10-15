import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { DollarSign } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      toast({
        title: "Error",
        description: "Por favor completa todos los campos",
        variant: "destructive",
      });
      return;
    }

    // Simular inicio de sesión basado en el email
    if (email.includes("@cajero")) {
      toast({
        title: "¡Bienvenido!",
        description: "Iniciaste sesión como Cajero",
      });
      navigate("/cajero");
    } else if (email.includes("@gerente")) {
      toast({
        title: "¡Bienvenido!",
        description: "Iniciaste sesión como Gerente",
      });
      navigate("/gerente");
    } else {
      toast({
        title: "Error",
        description: "Credenciales inválidas. Usa @cajero o @gerente en tu correo",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/10 via-background to-success/10 p-4">
      <Card className="w-full max-w-md shadow-lg animate-fade-in">
        <CardHeader className="space-y-4 text-center">
          <div className="mx-auto w-16 h-16 bg-primary rounded-2xl flex items-center justify-center shadow-lg">
            <DollarSign className="h-8 w-8 text-primary-foreground" />
          </div>
          <CardTitle className="text-3xl font-bold">Sistema de Corte de Caja</CardTitle>
          <CardDescription>Ingresa tus credenciales para continuar</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Correo Electrónico</Label>
              <Input
                id="email"
                type="email"
                placeholder="usuario@cajero.com o usuario@gerente.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="transition-all duration-200 focus:ring-2 focus:ring-primary"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Contraseña</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="transition-all duration-200 focus:ring-2 focus:ring-primary"
              />
            </div>
            <Button type="submit" className="w-full shadow-md hover:shadow-lg transition-all duration-200">
              Iniciar Sesión
            </Button>
          </form>

          <div className="mt-6 p-4 bg-muted rounded-lg">
            <p className="text-xs text-muted-foreground text-center">
              <strong>Tip:</strong> Usa <code className="bg-background px-1 py-0.5 rounded">@cajero</code> o{" "}
              <code className="bg-background px-1 py-0.5 rounded">@gerente</code> en tu correo
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
