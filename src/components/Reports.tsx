import React, { useState } from 'react';
import { TrendingUp, Download, Calendar, DollarSign, BarChart3, PieChart } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, BarChart, Bar, PieChart as RechartsPieChart, Cell } from 'recharts';

export function Reports() {
  const [timeRange, setTimeRange] = useState('7d');

  // Sample data for charts
  const revenueUpliftData = [
    { day: 'Mon', dynamic: 1250, static: 1100 },
    { day: 'Tue', dynamic: 1380, static: 1200 },
    { day: 'Wed', dynamic: 1450, static: 1250 },
    { day: 'Thu', dynamic: 1620, static: 1350 },
    { day: 'Fri', dynamic: 2100, static: 1800 },
    { day: 'Sat', dynamic: 2450, static: 2000 },
    { day: 'Sun', dynamic: 1950, static: 1650 }
  ];

  const productPerformanceData = [
    { product: 'Pisco Sour', revenue: 3450, uplift: 18.5, crashes: 12 },
    { product: 'Gin Tonic', revenue: 2890, uplift: -8.2, crashes: 8 },
    { product: 'Lager 330ml', revenue: 2650, uplift: 15.0, crashes: 15 },
    { product: 'Moscow Mule', revenue: 2340, uplift: 22.1, crashes: 10 },
    { product: 'Nachos', revenue: 1980, uplift: -12.5, crashes: 18 }
  ];

  const crashEffectivenessData = [
    { name: 'Successful', value: 68, color: '#84cc16' },
    { name: 'Neutral', value: 22, color: '#eab308' },
    { name: 'Negative', value: 10, color: '#ef4444' }
  ];

  const hourlyPatternsData = [
    { hour: '18:00', avgMultiplier: 0.85, volume: 45 },
    { hour: '19:00', avgMultiplier: 0.92, volume: 67 },
    { hour: '20:00', avgMultiplier: 1.15, volume: 89 },
    { hour: '21:00', avgMultiplier: 1.35, volume: 124 },
    { hour: '22:00', avgMultiplier: 1.28, volume: 145 },
    { hour: '23:00', avgMultiplier: 1.12, volume: 98 },
    { hour: '00:00', avgMultiplier: 0.95, volume: 56 }
  ];

  const keyMetrics = {
    totalRevenue: 15750,
    revenueUplift: 16.8,
    avgCrashDuration: 18.5,
    inventoryTurnover: 87.3,
    priceChangesPerDay: 156,
    mlAccuracy: 84.7
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="mb-2">Reports & Analytics</h1>
          <p className="text-slate-400">Performance insights and pricing optimization analysis</p>
        </div>
        <div className="flex items-center gap-2">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-40 bg-slate-800 border-slate-600">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="24h">Last 24 hours</SelectItem>
              <SelectItem value="7d">Last 7 days</SelectItem>
              <SelectItem value="30d">Last 30 days</SelectItem>
              <SelectItem value="90d">Last 3 months</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" className="border-slate-600">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <Card className="bg-slate-800 border-slate-700">
          <CardContent className="p-4 text-center">
            <DollarSign className="w-6 h-6 text-lime-400 mx-auto mb-2" />
            <p className="text-2xl font-bold text-lime-400">S/. {keyMetrics.totalRevenue.toLocaleString()}</p>
            <p className="text-xs text-slate-400">Total Revenue</p>
          </CardContent>
        </Card>
        
        <Card className="bg-slate-800 border-slate-700">
          <CardContent className="p-4 text-center">
            <TrendingUp className="w-6 h-6 text-lime-400 mx-auto mb-2" />
            <p className="text-2xl font-bold text-lime-400">+{keyMetrics.revenueUplift}%</p>
            <p className="text-xs text-slate-400">Revenue Uplift</p>
          </CardContent>
        </Card>
        
        <Card className="bg-slate-800 border-slate-700">
          <CardContent className="p-4 text-center">
            <BarChart3 className="w-6 h-6 text-purple-400 mx-auto mb-2" />
            <p className="text-2xl font-bold text-purple-400">{keyMetrics.inventoryTurnover}%</p>
            <p className="text-xs text-slate-400">Inventory Turnover</p>
          </CardContent>
        </Card>
        
        <Card className="bg-slate-800 border-slate-700">
          <CardContent className="p-4 text-center">
            <Calendar className="w-6 h-6 text-yellow-400 mx-auto mb-2" />
            <p className="text-2xl font-bold text-yellow-400">{keyMetrics.avgCrashDuration}m</p>
            <p className="text-xs text-slate-400">Avg Crash Duration</p>
          </CardContent>
        </Card>
        
        <Card className="bg-slate-800 border-slate-700">
          <CardContent className="p-4 text-center">
            <PieChart className="w-6 h-6 text-blue-400 mx-auto mb-2" />
            <p className="text-2xl font-bold text-blue-400">{keyMetrics.priceChangesPerDay}</p>
            <p className="text-xs text-slate-400">Price Changes/Day</p>
          </CardContent>
        </Card>
        
        <Card className="bg-slate-800 border-slate-700">
          <CardContent className="p-4 text-center">
            <TrendingUp className="w-6 h-6 text-lime-400 mx-auto mb-2" />
            <p className="text-2xl font-bold text-lime-400">{keyMetrics.mlAccuracy}%</p>
            <p className="text-xs text-slate-400">ML Accuracy</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="revenue" className="space-y-4">
        <TabsList className="bg-slate-800">
          <TabsTrigger value="revenue">Revenue Analysis</TabsTrigger>
          <TabsTrigger value="products">Product Performance</TabsTrigger>
          <TabsTrigger value="crashes">Crash Effectiveness</TabsTrigger>
          <TabsTrigger value="patterns">Pricing Patterns</TabsTrigger>
        </TabsList>

        <TabsContent value="revenue" className="space-y-6">
          <Card className="bg-slate-800 border-slate-700">
            <CardHeader>
              <CardTitle>Revenue Uplift Comparison</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <LineChart data={revenueUpliftData}>
                  <XAxis dataKey="day" stroke="#64748b" />
                  <YAxis stroke="#64748b" />
                  <Line 
                    type="monotone" 
                    dataKey="dynamic" 
                    stroke="#84cc16" 
                    strokeWidth={3}
                    name="Dynamic Pricing"
                  />
                  <Line 
                    type="monotone" 
                    dataKey="static" 
                    stroke="#64748b" 
                    strokeWidth={2}
                    strokeDasharray="5 5"
                    name="Static Pricing"
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="products" className="space-y-6">
          <Card className="bg-slate-800 border-slate-700">
            <CardHeader>
              <CardTitle>Product Performance Analysis</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {productPerformanceData.map((product, i) => (
                  <div key={i} className="flex items-center justify-between p-4 bg-slate-700 rounded-lg">
                    <div>
                      <p className="font-medium">{product.product}</p>
                      <p className="text-sm text-slate-400">{product.crashes} price crashes</p>
                    </div>
                    <div className="text-right">
                      <p className="font-mono text-lime-400">S/. {product.revenue.toLocaleString()}</p>
                      <p className={`text-sm ${product.uplift > 0 ? 'text-lime-400' : 'text-red-400'}`}>
                        {product.uplift > 0 ? '+' : ''}{product.uplift}% uplift
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="crashes" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="bg-slate-800 border-slate-700">
              <CardHeader>
                <CardTitle>Crash Effectiveness</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <RechartsPieChart
                    data={crashEffectivenessData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    dataKey="value"
                  >
                    {crashEffectivenessData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </RechartsPieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card className="bg-slate-800 border-slate-700">
              <CardHeader>
                <CardTitle>Crash Statistics</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-slate-400">Total Crashes</span>
                  <span className="font-bold">63</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Success Rate</span>
                  <span className="font-bold text-lime-400">68%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Avg Duration</span>
                  <span className="font-bold">18.5 min</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Avg Discount</span>
                  <span className="font-bold text-yellow-400">-23%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Revenue Impact</span>
                  <span className="font-bold text-lime-400">+S/. 2,340</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="patterns" className="space-y-6">
          <Card className="bg-slate-800 border-slate-700">
            <CardHeader>
              <CardTitle>Hourly Pricing Patterns</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={hourlyPatternsData}>
                  <XAxis dataKey="hour" stroke="#64748b" />
                  <YAxis stroke="#64748b" />
                  <Bar dataKey="avgMultiplier" fill="#84cc16" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}