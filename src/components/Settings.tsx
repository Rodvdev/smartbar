import React, { useState } from 'react';
import { Key, Eye, EyeOff, Copy, Plus, Trash2, Clock } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
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
import { toast } from 'sonner';

export function Settings() {
  const [apiKeys] = useState([
    {
      id: '1',
      name: 'Live Price Board TV',
      key: 'sk_live_abc123def456ghi789',
      isActive: true,
      createdAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000),
      lastUsed: new Date(Date.now() - 2 * 60 * 60 * 1000)
    },
    {
      id: '2',
      name: 'Mobile POS Integration',
      key: 'sk_live_xyz789uvw456rst123',
      isActive: true,
      createdAt: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000),
      lastUsed: new Date(Date.now() - 30 * 60 * 1000)
    },
    {
      id: '3',
      name: 'External Analytics',
      key: 'sk_live_mno456pqr789stu012',
      isActive: false,
      createdAt: new Date(Date.now() - 45 * 24 * 60 * 60 * 1000),
      lastUsed: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000)
    }
  ]);

  const [auditLogs] = useState([
    {
      id: '1',
      actorType: 'USER',
      actorName: 'Maria Garcia',
      action: 'PRICE_CRASH_LAUNCHED',
      details: 'Launched 25% crash on Pisco Sour for 15 minutes',
      timestamp: new Date(Date.now() - 15 * 60 * 1000)
    },
    {
      id: '2',
      actorType: 'SYSTEM',
      actorName: 'ML Engine',
      action: 'PRICE_RECOMMENDATION',
      details: 'Recommended price increase for Gin Tonic (confidence: 0.89)',
      timestamp: new Date(Date.now() - 45 * 60 * 1000)
    },
    {
      id: '3',
      actorType: 'API_KEY',
      actorName: 'Live Price Board TV',
      action: 'PRICE_SNAPSHOT_FETCH',
      details: 'Fetched current prices for all products',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000)
    },
    {
      id: '4',
      actorType: 'USER',
      actorName: 'Carlos Mendez',
      action: 'ORDER_CREATED',
      details: 'Created order ORD-002 (S/. 52.80)',
      timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000)
    },
    {
      id: '5',
      actorType: 'SYSTEM',
      actorName: 'Price Engine',
      action: 'RULE_APPLIED',
      details: 'Applied Happy Hour rule (0.85x multiplier)',
      timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000)
    }
  ]);

  const [visibleKeys, setVisibleKeys] = useState<Set<string>>(new Set());

  const toggleKeyVisibility = (keyId: string) => {
    const newVisible = new Set(visibleKeys);
    if (newVisible.has(keyId)) {
      newVisible.delete(keyId);
    } else {
      newVisible.add(keyId);
    }
    setVisibleKeys(newVisible);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success('API key copied to clipboard');
  };

  const maskApiKey = (key: string) => {
    return `${key.substring(0, 12)}${'*'.repeat(20)}`;
  };

  const formatTimestamp = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    return `${days}d ago`;
  };

  const getActorIcon = (actorType: string) => {
    switch (actorType) {
      case 'USER':
        return '👤';
      case 'SYSTEM':
        return '🤖';
      case 'API_KEY':
        return '🔑';
      default:
        return '❓';
    }
  };

  const getActorColor = (actorType: string) => {
    switch (actorType) {
      case 'USER':
        return 'border-blue-500 text-blue-400 bg-blue-500/10';
      case 'SYSTEM':
        return 'border-lime-500 text-lime-400 bg-lime-500/10';
      case 'API_KEY':
        return 'border-purple-500 text-purple-400 bg-purple-500/10';
      default:
        return 'border-slate-600 text-slate-400';
    }
  };

  const ApiKeyForm = () => (
    <div className="space-y-4">
      <div>
        <Label htmlFor="keyName">API Key Name</Label>
        <Input 
          id="keyName" 
          placeholder="e.g., Mobile POS" 
          className="bg-slate-700 border-slate-600" 
        />
      </div>

      <div className="flex justify-end gap-2 pt-4">
        <Button variant="outline" className="border-slate-600">
          Cancel
        </Button>
        <Button className="bg-lime-600 hover:bg-lime-700">
          Generate API Key
        </Button>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="mb-2">Settings</h1>
        <p className="text-slate-400">API keys, audit logs, and system configuration</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* API Keys */}
        <Card className="bg-slate-800 border-slate-700">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Key className="w-5 h-5" />
                API Keys
              </CardTitle>
              <Dialog>
                <DialogTrigger asChild>
                  <Button size="sm" className="bg-lime-600 hover:bg-lime-700">
                    <Plus className="w-4 h-4 mr-2" />
                    Generate Key
                  </Button>
                </DialogTrigger>
                <DialogContent className="bg-slate-800 border-slate-700">
                  <DialogHeader>
                    <DialogTitle>Generate New API Key</DialogTitle>
                  </DialogHeader>
                  <ApiKeyForm />
                </DialogContent>
              </Dialog>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {apiKeys.map((apiKey) => (
                <div key={apiKey.id} className="p-4 bg-slate-700 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <p className="font-medium">{apiKey.name}</p>
                      <p className="text-xs text-slate-400">
                        Created {formatTimestamp(apiKey.createdAt)}
                      </p>
                    </div>
                    <Badge 
                      variant="outline" 
                      className={
                        apiKey.isActive 
                          ? 'border-lime-500 text-lime-400 bg-lime-500/10' 
                          : 'border-slate-600 text-slate-400'
                      }
                    >
                      {apiKey.isActive ? 'Active' : 'Inactive'}
                    </Badge>
                  </div>
                  
                  <div className="flex items-center gap-2 mb-2">
                    <code className="text-sm bg-slate-600 px-2 py-1 rounded font-mono flex-1">
                      {visibleKeys.has(apiKey.id) ? apiKey.key : maskApiKey(apiKey.key)}
                    </code>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => toggleKeyVisibility(apiKey.id)}
                    >
                      {visibleKeys.has(apiKey.id) ? (
                        <EyeOff className="w-4 h-4" />
                      ) : (
                        <Eye className="w-4 h-4" />
                      )}
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => copyToClipboard(apiKey.key)}
                    >
                      <Copy className="w-4 h-4" />
                    </Button>
                  </div>
                  
                  <div className="flex items-center justify-between text-xs text-slate-400">
                    <span>Last used: {formatTimestamp(apiKey.lastUsed)}</span>
                    <Button variant="ghost" size="sm" className="text-red-400 hover:text-red-300">
                      <Trash2 className="w-3 h-3 mr-1" />
                      Revoke
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* System Status */}
        <Card className="bg-slate-800 border-slate-700">
          <CardHeader>
            <CardTitle>System Status</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-slate-400">Price Engine</span>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-lime-400 rounded-full animate-pulse" />
                <span className="text-lime-400">Active</span>
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-slate-400">ML Engine</span>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-lime-400 rounded-full animate-pulse" />
                <span className="text-lime-400">Training</span>
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-slate-400">Database</span>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-lime-400 rounded-full" />
                <span className="text-lime-400">Healthy</span>
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-slate-400">API Gateway</span>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-lime-400 rounded-full" />
                <span className="text-lime-400">Online</span>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-600">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-slate-400">API Requests</p>
                  <p className="text-xl font-bold">1,247</p>
                  <p className="text-xs text-slate-500">last 24h</p>
                </div>
                <div>
                  <p className="text-slate-400">Uptime</p>
                  <p className="text-xl font-bold text-lime-400">99.9%</p>
                  <p className="text-xs text-slate-500">30 days</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Audit Log */}
      <Card className="bg-slate-800 border-slate-700">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="w-5 h-5" />
            Audit Log
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className="border-slate-600">
                <TableHead>Actor</TableHead>
                <TableHead>Action</TableHead>
                <TableHead>Details</TableHead>
                <TableHead className="text-right">Time</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {auditLogs.map((log) => (
                <TableRow key={log.id} className="border-slate-600">
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <span className="text-lg">{getActorIcon(log.actorType)}</span>
                      <div>
                        <p className="font-medium">{log.actorName}</p>
                        <Badge variant="outline" className={`text-xs ${getActorColor(log.actorType)}`}>
                          {log.actorType}
                        </Badge>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <code className="text-sm bg-slate-700 px-2 py-1 rounded">
                      {log.action}
                    </code>
                  </TableCell>
                  <TableCell>
                    <span className="text-sm text-slate-300">{log.details}</span>
                  </TableCell>
                  <TableCell className="text-right">
                    <span className="text-sm text-slate-400">
                      {formatTimestamp(log.timestamp)}
                    </span>
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