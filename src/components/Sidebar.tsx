import { LayoutDashboard, FileText, Filter, Settings, TrendingUp, Users, DollarSign } from 'lucide-react';
import { Button } from './ui/button';
import { cn } from './ui/utils';

interface SidebarProps {
  activeNav: string;
  setActiveNav: (nav: string) => void;
  isOpen: boolean;
}

const navItems = [
  { name: 'Dashboard', icon: LayoutDashboard },
  { name: 'Reports', icon: FileText },
  { name: 'Analytics', icon: TrendingUp },
  { name: 'Users', icon: Users },
  { name: 'Revenue', icon: DollarSign },
  { name: 'Filters', icon: Filter },
  { name: 'Settings', icon: Settings },
];

export function Sidebar({ activeNav, setActiveNav, isOpen }: SidebarProps) {
  return (
    <aside
      className={cn(
        'fixed left-0 top-16 h-[calc(100vh-4rem)] w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 transition-transform duration-300 z-40',
        isOpen ? 'translate-x-0' : '-translate-x-full'
      )}
    >
      <nav className="p-4 space-y-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeNav === item.name;
          
          return (
            <Button
              key={item.name}
              variant={isActive ? 'secondary' : 'ghost'}
              className={cn(
                'w-full justify-start gap-3',
                isActive && 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400'
              )}
              onClick={() => setActiveNav(item.name)}
            >
              <Icon className="h-5 w-5" />
              {item.name}
            </Button>
          );
        })}
      </nav>
    </aside>
  );
}
