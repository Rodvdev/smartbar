import React from 'react';
import { TrendingUp, TrendingDown, Clock, Zap, AlertTriangle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, BarChart, Bar } from 'recharts';

export function Dashboard() {
  const hourlyData = [
    { hour: '18:00', revenue: 450, static: 380 },
    { hour: '19:00', revenue: 620, static: 520 },
    { hour: '20:00', revenue: 890, static: 750 },
    { hour: '21:00', revenue: 1250, static: 1100 },
    { hour: '22:00', revenue: 1680, static: 1420 },
    { hour: '23:00', revenue: 1450, static: 1350 },
  ];

  const topProducts = [
    { name: 'Pisco Sour', sales: 45, price: 24.50, change: 12.5 },
    { name: 'Gin Tonic', sales: 38, price: 26.80, change: -8.2 },
    { name: 'Lager 330ml', sales: 67, price: 13.20, change: 15.0 },
    { name: 'Moscow Mule', sales: 29, price: 28.00, change: 22.1 },
  ];

  const upcomingCrashes = [
    { product: 'Pisco Sour', discount: 25, startsIn: '12 min', duration: '15 min' },
    { product: 'Nachos', discount: 30, startsIn: '45 min', duration: '20 min' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="mb-2">Dashboard</h1>
        <p className="text-slate-400">Revenue optimization in real-time</p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-slate-800 border-slate-700">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm">Revenue Uplift</CardTitle>
            <TrendingUp className="h-4 w-4 text-lime-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl mb-2">+18.5%</div>
            <Progress value={18.5} className="h-2" />
            <p className="text-xs text-slate-400 mt-2">vs static pricing</p>
          </CardContent>
        </Card>

        <Card className="bg-slate-800 border-slate-700">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm">Inventory Rotation</CardTitle>
            <Zap className="h-4 w-4 text-purple-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl mb-2">87%</div>
            <Progress value={87} className="h-2" />
            <p className="text-xs text-slate-400 mt-2">daily turnover rate</p>
          </CardContent>
        </Card>

        <Card className="bg-slate-800 border-slate-700">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm">Active Crashes</CardTitle>
            <AlertTriangle className="h-4 w-4 text-yellow-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl mb-2">3</div>
            <p className="text-xs text-slate-400">live promotions</p>
          </CardContent>
        </Card>

        <Card className="bg-slate-800 border-slate-700">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm">ML Engine</CardTitle>
            <div className="w-3 h-3 bg-lime-400 rounded-full animate-pulse" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl mb-2">ACTIVE</div>
            <p className="text-xs text-slate-400">last prediction: 2 min ago</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Chart */}
        <Card className="bg-slate-800 border-slate-700">
          <CardHeader>
            <CardTitle>Hourly Revenue Comparison</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={hourlyData}>
                <XAxis dataKey="hour" stroke="#64748b" />
                <YAxis stroke="#64748b" />
                <Line 
                  type="monotone" 
                  dataKey="revenue" 
                  stroke="#84cc16" 
                  strokeWidth={2}
                  name="Dynamic"
                />
                <Line 
                  type="monotone" 
                  dataKey="static" 
                  stroke="#64748b" 
                  strokeWidth={2}
                  strokeDasharray="5 5"
                  name="Static"
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Top Products */}
        <Card className="bg-slate-800 border-slate-700">
          <CardHeader>
            <CardTitle>Top Products Today</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topProducts.map((product, i) => (
                <div key={i} className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">{product.name}</p>
                    <p className="text-sm text-slate-400">{product.sales} units</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">S/. {product.price}</p>
                    <div className="flex items-center gap-1">
                      {product.change > 0 ? (
                        <TrendingUp className="w-3 h-3 text-lime-400" />
                      ) : (
                        <TrendingDown className="w-3 h-3 text-red-400" />
                      )}
                      <span className={`text-xs ${product.change > 0 ? 'text-lime-400' : 'text-red-400'}`}>
                        {product.change > 0 ? '+' : ''}{product.change}%
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Upcoming Crashes */}
      <Card className="bg-slate-800 border-slate-700">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="w-5 h-5 text-yellow-400" />
            Upcoming Price Crashes
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {upcomingCrashes.map((crash, i) => (
              <div key={i} className="flex items-center justify-between p-4 bg-slate-700 rounded-lg">
                <div>
                  <p className="font-medium">{crash.product}</p>
                  <p className="text-sm text-slate-400">-{crash.discount}% for {crash.duration}</p>
                </div>
                <div className="text-right">
                  <Badge variant="outline" className="border-yellow-500 text-yellow-400">
                    {crash.startsIn}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}