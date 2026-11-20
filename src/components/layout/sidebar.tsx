import { cn } from "@/lib/utils";
import { ClipboardList, KanbanSquare, LayoutGrid, MapPin, Package } from "lucide-react";
import { NavLink } from "react-router-dom";

const links = [
  { to: '/categories', label: 'Categorias', icon: LayoutGrid },
  { to: '/products', label: 'Produtos', icon: Package },
  { to: '/spots', label: 'Mesas', icon: MapPin },
  { to: '/guest-checks', label: 'Comandas', icon: ClipboardList },
  { to: '/orders', label: 'Pedidos (Kanban)', icon: KanbanSquare },
];

export function Sidebar() {
  return (
    <aside className="flex shrink-0 flex-col gap-6 bg-brand p-4 text-brand-foreground md:min-h-screen md:w-60">
      <div className="flex items-center gap-3 px-2">
        <img src="/logomarca.svg" alt="Mater Burguer" className="h-auto w-28 brightness-0 invert" />
        <span className="rounded bg-primary px-2 py-0.5 text-xs font-bold text-primary-foreground">CMS</span>
      </div>
      <nav className="flex gap-1 overflow-x-auto md:flex-col">
        {links.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) => cn(
              'flex items-center gap-3 whitespace-nowrap rounded-lg px-3 py-2 text-sm font-medium transition-colors',
              isActive ? 'bg-primary text-primary-foreground' : 'hover:bg-white/10'
            )}
          >
            <Icon className="size-4" />
            {label}
          </NavLink>
        ))}
      </nav>
    </aside>
  )
}
