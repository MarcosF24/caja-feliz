import { Home, DollarSign, LayoutDashboard, LogOut } from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";

interface AppSidebarProps {
  userRole: "cajero" | "gerente" | null;
}

export function AppSidebar({ userRole }: AppSidebarProps) {
  const { open } = useSidebar();
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/");
  };

  const items = userRole === "cajero" 
    ? [
        { title: "Registro de Corte", url: "/cajero", icon: DollarSign },
      ]
    : userRole === "gerente"
    ? [
        { title: "Dashboard", url: "/gerente", icon: LayoutDashboard },
      ]
    : [];

  return (
    <Sidebar className="border-r border-sidebar-border">
      <SidebarContent>
        <div className="px-6 py-4 border-b border-sidebar-border">
          <h2 className="text-lg font-bold text-sidebar-foreground flex items-center gap-2">
            <DollarSign className="h-5 w-5" />
            {open && <span>Corte de Caja</span>}
          </h2>
        </div>

        <SidebarGroup>
          <SidebarGroupLabel>Menú Principal</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink
                      to={item.url}
                      className={({ isActive }) =>
                        isActive
                          ? "bg-sidebar-accent text-sidebar-accent-foreground font-medium"
                          : "hover:bg-sidebar-accent/50"
                      }
                    >
                      <item.icon className="h-4 w-4" />
                      {open && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <div className="mt-auto p-4 border-t border-sidebar-border">
          <Button
            onClick={handleLogout}
            variant="outline"
            className="w-full justify-start text-sidebar-foreground border-sidebar-border hover:bg-sidebar-accent"
          >
            <LogOut className="h-4 w-4 mr-2" />
            {open && <span>Cerrar Sesión</span>}
          </Button>
        </div>
      </SidebarContent>
    </Sidebar>
  );
}
