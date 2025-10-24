import { useState, useEffect } from 'react';
import { TopNavigation } from './components/TopNavigation';
import { Sidebar } from './components/Sidebar';
import { DataCards } from './components/DataCards';
import { ChartsSection } from './components/ChartsSection';
import { FilterControls } from './components/FilterControls';

export default function App() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeNav, setActiveNav] = useState('Dashboard');
  const [filters, setFilters] = useState({
    dateRange: '7d',
    category: 'all',
    region: 'all'
  });

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      <TopNavigation 
        theme={theme} 
        setTheme={setTheme}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />
      
      <div className="flex pt-16">
        <Sidebar 
          activeNav={activeNav} 
          setActiveNav={setActiveNav}
          isOpen={sidebarOpen}
        />
        
        <main className={`flex-1 transition-all duration-300 ${sidebarOpen ? 'ml-64' : 'ml-0'}`}>
          <div className="p-6 max-w-[1600px] mx-auto">
            <FilterControls filters={filters} setFilters={setFilters} />
            
            <DataCards />
            
            <ChartsSection filters={filters} />
          </div>
        </main>
      </div>
    </div>
  );
}
