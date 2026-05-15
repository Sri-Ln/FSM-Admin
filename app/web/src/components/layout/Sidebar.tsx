import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  Briefcase,
  ClipboardList,
  HardHat,
  Settings,
  PaintBucket,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useRole } from '@/hooks/useRole';

const navItems = [
  { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard, roles: ['admin', 'contractor', 'homeowner'] },
  { to: '/jobs', label: 'Jobs', icon: Briefcase, roles: ['admin', 'contractor', 'homeowner'] },
  { to: '/work-orders', label: 'Work Orders', icon: ClipboardList, roles: ['admin', 'contractor'] },
  { to: '/contractors', label: 'Contractors', icon: HardHat, roles: ['admin'] },
  { to: '/settings', label: 'Settings', icon: Settings, roles: ['admin', 'contractor', 'homeowner'] },
] as const;

export default function Sidebar() {
  const { role } = useRole();

  const visible = navItems.filter((item) =>
    role ? (item.roles as readonly string[]).includes(role) : false,
  );

  return (
    <aside className="flex h-screen w-60 flex-col border-r bg-sidebar text-sidebar-foreground">
      <div className="flex h-16 items-center gap-2 border-b border-sidebar-border px-6">
        <PaintBucket className="h-6 w-6 text-primary" />
        <span className="font-semibold tracking-tight">PaintMarket</span>
      </div>

      <nav className="flex-1 overflow-y-auto py-4">
        <ul className="space-y-1 px-3">
          {visible.map(({ to, label, icon: Icon }) => (
            <li key={to}>
              <NavLink
                to={to}
                className={({ isActive }) =>
                  cn(
                    'flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors',
                    isActive
                      ? 'bg-sidebar-accent text-sidebar-accent-foreground'
                      : 'text-sidebar-foreground/70 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground',
                  )
                }
              >
                <Icon className="h-4 w-4" />
                {label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}
