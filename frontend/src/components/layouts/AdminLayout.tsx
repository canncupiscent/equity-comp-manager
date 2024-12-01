import React from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { Users, Tool, LineChart, Home } from 'lucide-react';
import { Button } from '@/components/ui/button';

const AdminLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const navigationItems = [
    {
      id: '/',
      label: 'Dashboard',
      icon: Home,
      path: '/'
    },
    {
      id: '/employees',
      label: 'Employee Reports',
      icon: Users,
      path: '/employees'
    },
    {
      id: '/tools',
      label: 'Tools',
      icon: Tool,
      path: '/tools'
    },
    {
      id: '/grants',
      label: 'Grants',
      icon: LineChart,
      path: '/grants'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Navigation Bar */}
      <header className="bg-white border-b">
        <div className="mx-auto px-4">
          <div className="flex h-16 items-center justify-between">
            <h1 className="text-2xl font-bold">Equity Manager Admin</h1>
            <div className="flex items-center gap-4">
              <Button variant="outline">Settings</Button>
              <Button variant="outline">Help</Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Navigation Tabs */}
        <div className="mb-8">
          <nav className="flex space-x-4">
            {navigationItems.map((item) => (
              <Button
                key={item.id}
                variant={location.pathname === item.path ? "default" : "ghost"}
                className="flex items-center gap-2"
                onClick={() => navigate(item.path)}
              >
                <item.icon className="h-4 w-4" />
                {item.label}
              </Button>
            ))}
          </nav>
        </div>

        {/* Content Area */}
        <div className="space-y-6">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;