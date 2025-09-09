import React, { useState, useEffect } from 'react';
import { Receipt, Clock, CheckCircle, XCircle, Eye } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from './ui/table';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './ui/dialog';

export function Orders() {
  const [orders, setOrders] = useState([
    {
      id: 'ORD-001',
      cashierId: 'USER-001',
      cashierName: 'Maria Garcia',
      status: 'PAID',
      total: 89.50,
      createdAt: new Date(Date.now() - 5 * 60 * 1000),
      items: [
        { product: 'Pisco Sour', qty: 2, unitPrice: 24.50, finalPrice: 49.00 },
        { product: 'Nachos', qty: 1, unitPrice: 32.00, finalPrice: 32.00 },
        { product: 'Lager 330ml', qty: 1, unitPrice: 13.20, finalPrice: 8.50 }
      ]
    },
    {
      id: 'ORD-002',
      cashierId: 'USER-002',
      cashierName: 'Carlos Mendez',
      status: 'OPEN',
      total: 52.80,
      createdAt: new Date(Date.now() - 2 * 60 * 1000),
      items: [
        { product: 'Gin Tonic', qty: 2, unitPrice: 26.80, finalPrice: 52.80 }
      ]
    },
    {
      id: 'ORD-003',
      cashierId: 'USER-001',
      cashierName: 'Maria Garcia',
      status: 'PAID',
      total: 156.40,
      createdAt: new Date(Date.now() - 12 * 60 * 1000),
      items: [
        { product: 'Moscow Mule', qty: 3, unitPrice: 28.00, finalPrice: 63.00 },
        { product: 'Wings', qty: 2, unitPrice: 28.50, finalPrice: 57.00 },
        { product: 'Lager 330ml', qty: 3, unitPrice: 13.20, finalPrice: 36.40 }
      ]
    },
    {
      id: 'ORD-004',
      cashierId: 'USER-003',
      cashierName: 'Ana Rodriguez',
      status: 'VOID',
      total: 24.50,
      createdAt: new Date(Date.now() - 18 * 60 * 1000),
      items: [
        { product: 'Pisco Sour', qty: 1, unitPrice: 24.50, finalPrice: 24.50 }
      ]
    },
    {
      id: 'ORD-005',
      cashierId: 'USER-002',
      cashierName: 'Carlos Mendez',
      status: 'PAID',
      total: 78.60,
      createdAt: new Date(Date.now() - 25 * 60 * 1000),
      items: [
        { product: 'Margarita', qty: 2, unitPrice: 25.50, finalPrice: 51.00 },
        { product: 'Sliders', qty: 1, unitPrice: 24.00, finalPrice: 19.20 },
        { product: 'IPA 330ml', qty: 1, unitPrice: 16.50, finalPrice: 8.40 }
      ]
    }
  ]);

  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTimeAgo = (date: Date) => {
    const minutes = Math.floor((currentTime.getTime() - date.getTime()) / 60000);
    if (minutes < 1) return 'Just now';
    if (minutes === 1) return '1 min ago';
    if (minutes < 60) return `${minutes} min ago`;
    const hours = Math.floor(minutes / 60);
    return hours === 1 ? '1 hour ago' : `${hours} hours ago`;
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'PAID':
        return 'border-lime-500 text-lime-400 bg-lime-500/10';
      case 'OPEN':
        return 'border-yellow-500 text-yellow-400 bg-yellow-500/10';
      case 'VOID':
        return 'border-red-500 text-red-400 bg-red-500/10';
      default:
        return 'border-slate-600 text-slate-400';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'PAID':
        return <CheckCircle className="w-4 h-4" />;
      case 'OPEN':
        return <Clock className="w-4 h-4" />;
      case 'VOID':
        return <XCircle className="w-4 h-4" />;
      default:
        return <Receipt className="w-4 h-4" />;
    }
  };

  const OrderDetail = ({ order }: { order: { id: string; cashierName: string; status: string; total: number; items: { product: string; qty: number; unitPrice: number; finalPrice: number }[] } }) => (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4 text-sm">
        <div>
          <p className="text-slate-400">Order ID</p>
          <p className="font-mono">{order.id}</p>
        </div>
        <div>
          <p className="text-slate-400">Cashier</p>
          <p>{order.cashierName}</p>
        </div>
        <div>
          <p className="text-slate-400">Status</p>
          <Badge variant="outline" className={getStatusColor(order.status)}>
            {getStatusIcon(order.status)}
            <span className="ml-1">{order.status}</span>
          </Badge>
        </div>
        <div>
          <p className="text-slate-400">Total</p>
          <p className="text-xl font-mono text-lime-400">S/. {order.total.toFixed(2)}</p>
        </div>
      </div>

      <div>
        <h4 className="font-medium mb-3">Order Items</h4>
        <div className="space-y-2">
          {order.items.map((item: { product: string; qty: number; unitPrice: number; finalPrice: number }, i: number) => (
            <div key={i} className="flex items-center justify-between p-3 bg-slate-700 rounded-lg">
              <div>
                <p className="font-medium">{item.product}</p>
                <p className="text-sm text-slate-400">
                  {item.qty}x @ S/. {item.unitPrice.toFixed(2)}
                </p>
              </div>
              <div className="text-right">
                <p className="font-mono text-lime-400">S/. {item.finalPrice.toFixed(2)}</p>
                {item.unitPrice !== item.finalPrice / item.qty && (
                  <p className="text-xs text-yellow-400">Dynamic pricing applied</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const stats = {
    total: orders.length,
    paid: orders.filter(o => o.status === 'PAID').length,
    open: orders.filter(o => o.status === 'OPEN').length,
    void: orders.filter(o => o.status === 'VOID').length,
    revenue: orders
      .filter(o => o.status === 'PAID')
      .reduce((sum, o) => sum + o.total, 0)
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="mb-2">Orders</h1>
        <p className="text-slate-400">Real-time order feed and transaction history</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <Card className="bg-slate-800 border-slate-700">
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold">{stats.total}</p>
            <p className="text-sm text-slate-400">Total Orders</p>
          </CardContent>
        </Card>
        <Card className="bg-slate-800 border-slate-700">
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-lime-400">{stats.paid}</p>
            <p className="text-sm text-slate-400">Paid</p>
          </CardContent>
        </Card>
        <Card className="bg-slate-800 border-slate-700">
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-yellow-400">{stats.open}</p>
            <p className="text-sm text-slate-400">Open</p>
          </CardContent>
        </Card>
        <Card className="bg-slate-800 border-slate-700">
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-red-400">{stats.void}</p>
            <p className="text-sm text-slate-400">Void</p>
          </CardContent>
        </Card>
        <Card className="bg-slate-800 border-slate-700">
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-lime-400">S/. {stats.revenue.toFixed(0)}</p>
            <p className="text-sm text-slate-400">Revenue</p>
          </CardContent>
        </Card>
      </div>

      {/* Orders Table */}
      <Card className="bg-slate-800 border-slate-700">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Receipt className="w-5 h-5" />
            Recent Orders
            <div className="ml-auto flex items-center gap-2">
              <div className="w-2 h-2 bg-lime-400 rounded-full animate-pulse" />
              <span className="text-xs text-slate-400">Live feed</span>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className="border-slate-600">
                <TableHead>Order ID</TableHead>
                <TableHead>Cashier</TableHead>
                <TableHead>Items</TableHead>
                <TableHead>Total</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Time</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orders.map((order) => (
                <TableRow key={order.id} className="border-slate-600">
                  <TableCell>
                    <span className="font-mono">{order.id}</span>
                  </TableCell>
                  <TableCell>{order.cashierName}</TableCell>
                  <TableCell>
                    <div className="text-sm">
                      {order.items.length} item{order.items.length !== 1 ? 's' : ''}
                      <br />
                      <span className="text-slate-400">
                        {order.items.slice(0, 2).map(item => item.product).join(', ')}
                        {order.items.length > 2 ? '...' : ''}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className="font-mono text-lime-400">
                      S/. {order.total.toFixed(2)}
                    </span>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className={getStatusColor(order.status)}>
                      {getStatusIcon(order.status)}
                      <span className="ml-1">{order.status}</span>
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <span className="text-sm text-slate-400">
                      {formatTimeAgo(order.createdAt)}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <Eye className="w-4 h-4" />
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="bg-slate-800 border-slate-700">
                        <DialogHeader>
                          <DialogTitle>Order Details - {order.id}</DialogTitle>
                        </DialogHeader>
                        <OrderDetail order={order} />
                      </DialogContent>
                    </Dialog>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}