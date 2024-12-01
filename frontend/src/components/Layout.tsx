import React from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Building2, Users, BarChart3, FileText, Settings, MenuIcon } from 'lucide-react';

const Layout = ({ children }: { children: React.ReactNode }) => {
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(true);

  const menuItems = [
    { icon: Building2, label: 'Companies', path: '/companies' },
    { icon: Users, label: 'Employees', path: '/employees' },
    { icon: BarChart3, label: 'Equity Grants', path: '/grants' },
    { icon: FileText, label: 'Reports', path: '/reports' },
    { icon: Settings, label: 'Settings', path: '/settings' }
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <div className={`bg-white border-r ${isSidebarOpen ? 'w-64' : 'w-16'} transition-all duration-300 flex flex-col`}>
        <div className="p-4 border-b flex items-center justify-between">
          {isSidebarOpen && <h2 className="font-bold text-xl">Equity Manager</h2>}
          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          >
            <MenuIcon className="h-4 w-4" />
          </Button>
        </div>
        <nav className="flex-1 p-4">
          <ul className="space-y-2">
            {menuItems.map((item) => (
              <li key={item.path}>
                <Button
                  variant="ghost"
                  className={`w-full justify-start ${isSidebarOpen ? 'px-4' : 'px-2'}`}
                >
                  <item.icon className="h-4 w-4 mr-2" />
                  {isSidebarOpen && <span>{item.label}</span>}
                </Button>
              </li>
            ))}
          </ul>
        </nav>
        {isSidebarOpen && (
          <div className="p-4 border-t">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 rounded-full bg-gray-200" />
              <div>
                <p className="text-sm font-medium">John Doe</p>
                <p className="text-xs text-gray-500">Admin</p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Main Content */}
      <div className="flex-1">
        <header className="bg-white border-b">
          <div className="mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex h-16 items-center justify-between">
              <h1 className="text-2xl font-semibold">Dashboard</h1>
              <div className="flex items-center gap-4">
                <Button variant="outline">Help</Button>
                <Button>New Grant</Button>
              </div>
            </div>
          </div>
        </header>
        <main className="p-6">
          <Card className="max-w-7xl mx-auto">
            {children}
          </Card>
        </main>
      </div>
    </div>
  );
};

export default Layout;