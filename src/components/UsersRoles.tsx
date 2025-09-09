import React, { useState } from 'react';
import { Plus, Mail, Shield, User, Edit, Trash2 } from 'lucide-react';
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';

export function UsersRoles() {
  const [users] = useState([
    {
      id: '1',
      email: 'maria.garcia@barnova.com',
      name: 'Maria Garcia',
      role: 'MANAGER',
      status: 'Active',
      lastLogin: new Date(Date.now() - 2 * 60 * 60 * 1000),
      createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
    },
    {
      id: '2',
      email: 'carlos.mendez@barnova.com',
      name: 'Carlos Mendez',
      role: 'BARTENDER',
      status: 'Active',
      lastLogin: new Date(Date.now() - 30 * 60 * 1000),
      createdAt: new Date(Date.now() - 25 * 24 * 60 * 60 * 1000)
    },
    {
      id: '3',
      email: 'ana.rodriguez@barnova.com',
      name: 'Ana Rodriguez',
      role: 'BARTENDER',
      status: 'Active',
      lastLogin: new Date(Date.now() - 4 * 60 * 60 * 1000),
      createdAt: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000)
    },
    {
      id: '4',
      email: 'luis.torres@barnova.com',
      name: 'Luis Torres',
      role: 'ANALYST',
      status: 'Pending',
      lastLogin: null,
      createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000)
    },
    {
      id: '5',
      email: 'sofia.morales@barnova.com',
      name: 'Sofia Morales',
      role: 'ADMIN',
      status: 'Inactive',
      lastLogin: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000),
      createdAt: new Date(Date.now() - 45 * 24 * 60 * 60 * 1000)
    }
  ]);

  const roleDescriptions = {
    OWNER: {
      label: 'Owner',
      color: 'border-purple-500 text-purple-400 bg-purple-500/10',
      permissions: ['All permissions', 'Tenant management', 'User management', 'Billing']
    },
    ADMIN: {
      label: 'Admin',
      color: 'border-red-500 text-red-400 bg-red-500/10',
      permissions: ['User management', 'Settings', 'API keys', 'Reports']
    },
    MANAGER: {
      label: 'Manager',
      color: 'border-lime-500 text-lime-400 bg-lime-500/10',
      permissions: ['Products', 'Rules', 'Launch crashes', 'View reports']
    },
    BARTENDER: {
      label: 'Bartender',
      color: 'border-blue-500 text-blue-400 bg-blue-500/10',
      permissions: ['Live board', 'Orders', 'Basic inventory']
    },
    ANALYST: {
      label: 'Analyst',
      color: 'border-yellow-500 text-yellow-400 bg-yellow-500/10',
      permissions: ['Reports', 'ML settings', 'Data export']
    }
  };

  const getRoleInfo = (role: string) => {
    return roleDescriptions[role as keyof typeof roleDescriptions] || {
      label: role,
      color: 'border-slate-600 text-slate-400',
      permissions: []
    };
  };

  const formatLastLogin = (date: Date | null) => {
    if (!date) return 'Never';
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    return `${days}d ago`;
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active':
        return 'border-lime-500 text-lime-400 bg-lime-500/10';
      case 'Pending':
        return 'border-yellow-500 text-yellow-400 bg-yellow-500/10';
      case 'Inactive':
        return 'border-slate-600 text-slate-400';
      default:
        return 'border-slate-600 text-slate-400';
    }
  };

  const InviteUserForm = () => (
    <div className="space-y-4">
      <div>
        <Label htmlFor="email">Email Address</Label>
        <Input 
          id="email" 
          type="email"
          placeholder="user@company.com" 
          className="bg-slate-700 border-slate-600" 
        />
      </div>
      
      <div>
        <Label htmlFor="name">Full Name (Optional)</Label>
        <Input 
          id="name" 
          placeholder="John Doe" 
          className="bg-slate-700 border-slate-600" 
        />
      </div>
      
      <div>
        <Label htmlFor="role">Role</Label>
        <Select>
          <SelectTrigger className="bg-slate-700 border-slate-600">
            <SelectValue placeholder="Select role" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="BARTENDER">Bartender</SelectItem>
            <SelectItem value="MANAGER">Manager</SelectItem>
            <SelectItem value="ANALYST">Analyst</SelectItem>
            <SelectItem value="ADMIN">Admin</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="flex justify-end gap-2 pt-4">
        <Button variant="outline" className="border-slate-600">
          Cancel
        </Button>
        <Button className="bg-lime-600 hover:bg-lime-700">
          <Mail className="w-4 h-4 mr-2" />
          Send Invitation
        </Button>
      </div>
    </div>
  );

  const roleStats = {
    total: users.length,
    active: users.filter(u => u.status === 'Active').length,
    pending: users.filter(u => u.status === 'Pending').length,
    byRole: Object.entries(
      users.reduce((acc, user) => {
        acc[user.role] = (acc[user.role] || 0) + 1;
        return acc;
      }, {} as Record<string, number>)
    )
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="mb-2">Users & Roles</h1>
          <p className="text-slate-400">Manage team members and access permissions</p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="bg-lime-600 hover:bg-lime-700">
              <Plus className="w-4 h-4 mr-2" />
              Invite User
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-slate-800 border-slate-700">
            <DialogHeader>
              <DialogTitle>Invite New User</DialogTitle>
            </DialogHeader>
            <InviteUserForm />
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-slate-800 border-slate-700">
          <CardContent className="p-4 text-center">
            <User className="w-6 h-6 text-slate-400 mx-auto mb-2" />
            <p className="text-2xl font-bold">{roleStats.total}</p>
            <p className="text-sm text-slate-400">Total Users</p>
          </CardContent>
        </Card>
        
        <Card className="bg-slate-800 border-slate-700">
          <CardContent className="p-4 text-center">
            <div className="w-6 h-6 bg-lime-400 rounded-full mx-auto mb-2" />
            <p className="text-2xl font-bold text-lime-400">{roleStats.active}</p>
            <p className="text-sm text-slate-400">Active</p>
          </CardContent>
        </Card>
        
        <Card className="bg-slate-800 border-slate-700">
          <CardContent className="p-4 text-center">
            <div className="w-6 h-6 bg-yellow-400 rounded-full mx-auto mb-2" />
            <p className="text-2xl font-bold text-yellow-400">{roleStats.pending}</p>
            <p className="text-sm text-slate-400">Pending</p>
          </CardContent>
        </Card>
        
        <Card className="bg-slate-800 border-slate-700">
          <CardContent className="p-4 text-center">
            <Shield className="w-6 h-6 text-purple-400 mx-auto mb-2" />
            <p className="text-2xl font-bold text-purple-400">{roleStats.byRole.length}</p>
            <p className="text-sm text-slate-400">Roles</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Users Table */}
        <div className="lg:col-span-2">
          <Card className="bg-slate-800 border-slate-700">
            <CardHeader>
              <CardTitle>Team Members</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow className="border-slate-600">
                    <TableHead>User</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Last Login</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {users.map((user) => {
                    const roleInfo = getRoleInfo(user.role);
                    return (
                      <TableRow key={user.id} className="border-slate-600">
                        <TableCell>
                          <div>
                            <p className="font-medium">{user.name}</p>
                            <p className="text-sm text-slate-400">{user.email}</p>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline" className={roleInfo.color}>
                            {roleInfo.label}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline" className={getStatusColor(user.status)}>
                            {user.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <span className="text-sm text-slate-400">
                            {formatLastLogin(user.lastLogin)}
                          </span>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex items-center justify-end gap-2">
                            <Button variant="ghost" size="icon">
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button variant="ghost" size="icon">
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>

        {/* Role Permissions */}
        <div>
          <Card className="bg-slate-800 border-slate-700">
            <CardHeader>
              <CardTitle>Role Permissions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {Object.entries(roleDescriptions).map(([role, info]) => (
                <div key={role} className="p-3 bg-slate-700 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant="outline" className={info.color}>
                      {info.label}
                    </Badge>
                    <span className="text-sm text-slate-400">
                      ({roleStats.byRole.find(([r]) => r === role)?.[1] || 0})
                    </span>
                  </div>
                  <ul className="text-sm text-slate-300 space-y-1">
                    {info.permissions.map((permission, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <div className="w-1 h-1 bg-slate-400 rounded-full" />
                        {permission}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}