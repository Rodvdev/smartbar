import React from 'react';
import { Bell, ChevronDown, User } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';

interface HeaderProps {
  currentTenant: {
    id: string;
    name: string;
    slug: string;
  };
  setCurrentTenant: (tenant: { id: string; name: string; slug: string }) => void;
}

export function Header({ currentTenant, setCurrentTenant }: HeaderProps) {
  const availableTenants = [
    { id: 'tenant_1', name: 'BarNova', slug: 'barnova' },
    { id: 'tenant_2', name: 'Club Zen', slug: 'clubzen' },
  ];

  return (
    <header className="bg-slate-900 border-b border-slate-700 px-6 py-4 text-white">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="gap-2 border-slate-600 text-white hover:bg-slate-800">
                <div className="w-6 h-6 bg-gradient-to-br from-lime-400 to-purple-500 rounded-full" />
                {currentTenant.name}
                <ChevronDown className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="bg-slate-800 border-slate-600 text-white">
              {availableTenants.map((tenant) => (
                <DropdownMenuItem
                  key={tenant.id}
                  onClick={() => setCurrentTenant(tenant)}
                  className="hover:bg-slate-700 text-white"
                >
                  <div className="w-6 h-6 bg-gradient-to-br from-lime-400 to-purple-500 rounded-full mr-2" />
                  {tenant.name}
                </DropdownMenuItem>
              ))}
              <DropdownMenuSeparator className="bg-slate-600" />
              <DropdownMenuItem className="hover:bg-slate-700 text-white">
                + Create Tenant
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          
          <Badge variant="outline" className="border-lime-500 text-lime-400 bg-lime-500/10">
            Miraflores
          </Badge>
        </div>

        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" className="relative text-white hover:bg-slate-800">
            <Bell className="w-5 h-5" />
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-lime-400 rounded-full" />
          </Button>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="gap-2 text-white hover:bg-slate-800">
                <Avatar className="w-8 h-8">
                  <AvatarImage src="/placeholder-avatar.jpg" />
                  <AvatarFallback className="bg-purple-500 text-white">
                    <User className="w-4 h-4" />
                  </AvatarFallback>
                </Avatar>
                <span>Manager</span>
                <ChevronDown className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="bg-slate-800 border-slate-600 text-white">
              <DropdownMenuItem className="hover:bg-slate-700 text-white">Profile</DropdownMenuItem>
              <DropdownMenuItem className="hover:bg-slate-700 text-white">Settings</DropdownMenuItem>
              <DropdownMenuSeparator className="bg-slate-600" />
              <DropdownMenuItem className="hover:bg-slate-700 text-red-400">
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}