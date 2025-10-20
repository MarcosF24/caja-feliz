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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/20 via-secondary/10 to-accent/20 p-4">
      <Card className="w-full max-w-md shadow-2xl animate-fade-in border-primary/20">
        <CardHeader className="space-y-4 text-center pb-8">
          <div className="mx-auto w-20 h-20 bg-gradient-to-br from-primary to-secondary rounded-3xl flex items-center justify-center shadow-xl transform hover:scale-110 transition-transform">
            <DollarSign className="h-10 w-10 text-white" />
          </div>
          <CardTitle className="text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Corte de Caja
          </CardTitle>
          <CardDescription className="text-base">Ingresa tus credenciales</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-semibold">Correo</Label>
              <Input
                id="email"
                type="email"
                placeholder="usuario@cajero.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-12 text-base"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" className="text-sm font-semibold">Contraseña</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="h-12 text-base"
              />
            </div>
            <Button type="submit" className="w-full h-12 text-base font-semibold shadow-lg hover:shadow-xl">
              Iniciar Sesión
            </Button>
          </form>

          <div className="mt-6 p-4 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-xl border border-primary/20">
            <p className="text-sm text-center">
              💡 Usa <code className="bg-primary/20 px-2 py-1 rounded font-mono">@cajero</code> o{" "}
              <code className="bg-secondary/20 px-2 py-1 rounded font-mono">@gerente</code>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
