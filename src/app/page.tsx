"use client";

import React, { useState } from 'react';
import { Sidebar } from '@/components/Sidebar';
import { Header } from '@/components/Header';
import { Dashboard } from '@/components/Dashboard';
import { LivePriceBoard } from '@/components/LivePriceBoard';
import { Products } from '@/components/Products';
import { Rules } from '@/components/Rules';
import { Orders } from '@/components/Orders';
import { MLSettings } from '@/components/MLSettings';
import { Reports } from '@/components/Reports';
import { UsersRoles } from '@/components/UsersRoles';
import { Settings } from '@/components/Settings';

export default function Home() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [currentTenant, setCurrentTenant] = useState({
    id: 'tenant_1',
    name: 'BarNova',
    slug: 'barnova'
  });

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />;
      case 'live-board':
        return <LivePriceBoard />;
      case 'products':
        return <Products />;
      case 'rules':
        return <Rules />;
      case 'orders':
        return <Orders />;
      case 'ml-settings':
        return <MLSettings />;
      case 'reports':
        return <Reports />;
      case 'users':
        return <UsersRoles />;
      case 'settings':
        return <Settings />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="dark min-h-screen bg-background text-foreground">
      <div className="flex">
        <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
        <div className="flex-1 flex flex-col">
          <Header currentTenant={currentTenant} setCurrentTenant={setCurrentTenant} />
          <main className="flex-1 p-6 bg-slate-950">
            {renderContent()}
          </main>
        </div>
      </div>
    </div>
  );
}
