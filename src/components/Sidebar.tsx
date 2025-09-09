import React from 'react';
import { 
  BarChart3, 
  Monitor, 
  Package, 
  Settings2, 
  Receipt, 
  Brain, 
  TrendingUp, 
  Users, 
  Key 
} from 'lucide-react';
import { Button } from './ui/button';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export function Sidebar({ activeTab, setActiveTab }: SidebarProps) {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
    { id: 'live-board', label: 'Live Price Board', icon: Monitor },
    { id: 'products', label: 'Products', icon: Package },
    { id: 'rules', label: 'Rules', icon: Settings2 },
    { id: 'orders', label: 'Orders', icon: Receipt },
    { id: 'ml-settings', label: 'ML Settings', icon: Brain },
    { id: 'reports', label: 'Reports', icon: TrendingUp },
    { id: 'users', label: 'Users & Roles', icon: Users },
    { id: 'settings', label: 'Settings', icon: Key },
  ];

  return (
    <div className="bg-slate-900 w-64 min-h-screen border-r border-slate-700">
      <div className="p-6">
        <div className="flex items-center gap-2 mb-8">
          <div className="w-8 h-8 bg-gradient-to-br from-lime-400 to-purple-500 rounded-lg flex items-center justify-center">
            <BarChart3 className="w-5 h-5 text-slate-900" />
          </div>
          <h1 className="text-xl font-bold bg-gradient-to-r from-lime-400 to-purple-400 bg-clip-text text-transparent">
            DynamicBar
          </h1>
        </div>
        
        <nav className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <Button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                variant={activeTab === item.id ? 'secondary' : 'ghost'}
                className={`w-full justify-start gap-3 ${
                  activeTab === item.id 
                    ? 'bg-lime-500/20 text-lime-400 border-lime-500/50' 
                    : 'text-slate-300 hover:text-white hover:bg-slate-800'
                }`}
              >
                <Icon className="w-5 h-5" />
                {item.label}
              </Button>
            );
          })}
        </nav>
      </div>
    </div>
  );
}