import React, { useState } from 'react';
import { Plus, Clock, TrendingDown, Settings, Zap, Play, Pause } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Slider } from './ui/slider';
import { Switch } from './ui/switch';
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

export function Rules() {
  const [rules] = useState([
    {
      id: '1',
      name: 'Happy Hour',
      kind: 'time-of-day',
      params: {
        startTime: '18:00',
        endTime: '20:00',
        multiplier: 0.85,
        days: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday']
      },
      isActive: true,
      description: '15% discount during weekday happy hour'
    },
    {
      id: '2',
      name: 'Price Floor',
      kind: 'floor',
      params: {
        multiplier: 0.7
      },
      isActive: true,
      description: 'Minimum price at 70% of base price'
    },
    {
      id: '3',
      name: 'Price Ceiling',
      kind: 'ceiling',
      params: {
        multiplier: 1.5
      },
      isActive: true,
      description: 'Maximum price at 150% of base price'
    },
    {
      id: '4',
      name: 'Weekend Premium',
      kind: 'time-of-day',
      params: {
        startTime: '21:00',
        endTime: '02:00',
        multiplier: 1.2,
        days: ['friday', 'saturday']
      },
      isActive: false,
      description: '20% premium on Friday and Saturday nights'
    }
  ]);

  const [crashDuration, setCrashDuration] = useState([15]);
  const [crashDiscount, setCrashDiscount] = useState([25]);

  const RuleForm = () => (
    <div className="space-y-4">
      <div>
        <Label htmlFor="ruleName">Rule Name</Label>
        <Input 
          id="ruleName" 
          placeholder="e.g., Happy Hour" 
          className="bg-slate-700 border-slate-600" 
        />
      </div>
      
      <div>
        <Label htmlFor="ruleType">Rule Type</Label>
        <Select>
          <SelectTrigger className="bg-slate-700 border-slate-600">
            <SelectValue placeholder="Select rule type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="time-of-day">Time of Day</SelectItem>
            <SelectItem value="floor">Price Floor</SelectItem>
            <SelectItem value="ceiling">Price Ceiling</SelectItem>
            <SelectItem value="campaign">Campaign</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="startTime">Start Time</Label>
          <Input 
            id="startTime" 
            type="time" 
            className="bg-slate-700 border-slate-600" 
          />
        </div>
        <div>
          <Label htmlFor="endTime">End Time</Label>
          <Input 
            id="endTime" 
            type="time" 
            className="bg-slate-700 border-slate-600" 
          />
        </div>
      </div>

      <div>
        <Label htmlFor="multiplier">Price Multiplier</Label>
        <div className="mt-2">
          <Slider
            defaultValue={[0.85]}
            max={2}
            min={0.5}
            step={0.05}
            className="w-full"
          />
          <div className="flex justify-between text-sm text-slate-400 mt-1">
            <span>0.5x</span>
            <span>2.0x</span>
          </div>
        </div>
      </div>

      <div className="flex justify-end gap-2 pt-4">
        <Button variant="outline" className="border-slate-600">
          Cancel
        </Button>
        <Button className="bg-lime-600 hover:bg-lime-700">
          Save Rule
        </Button>
      </div>
    </div>
  );

  const CrashForm = () => (
    <div className="space-y-6">
      <div>
        <Label>Select Products</Label>
        <div className="mt-2 space-y-2">
          {['Pisco Sour', 'Gin Tonic', 'Moscow Mule', 'Nachos'].map((product) => (
            <div key={product} className="flex items-center space-x-2">
              <input type="checkbox" id={product} className="rounded" />
              <Label htmlFor={product}>{product}</Label>
            </div>
          ))}
        </div>
      </div>

      <div>
        <Label>Discount Percentage: {crashDiscount[0]}%</Label>
        <div className="mt-2">
          <Slider
            value={crashDiscount}
            onValueChange={setCrashDiscount}
            max={50}
            min={10}
            step={5}
            className="w-full"
          />
          <div className="flex justify-between text-sm text-slate-400 mt-1">
            <span>10%</span>
            <span>50%</span>
          </div>
        </div>
      </div>

      <div>
        <Label>Duration: {crashDuration[0]} minutes</Label>
        <div className="mt-2">
          <Slider
            value={crashDuration}
            onValueChange={setCrashDuration}
            max={60}
            min={5}
            step={5}
            className="w-full"
          />
          <div className="flex justify-between text-sm text-slate-400 mt-1">
            <span>5 min</span>
            <span>60 min</span>
          </div>
        </div>
      </div>

      <div className="flex justify-end gap-2 pt-4">
        <Button variant="outline" className="border-slate-600">
          Cancel
        </Button>
        <Button className="bg-red-600 hover:bg-red-700">
          <Zap className="w-4 h-4 mr-2" />
          Launch Crash
        </Button>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="mb-2">Pricing Rules</h1>
          <p className="text-slate-400">Configure automated pricing rules and manual overrides</p>
        </div>
        <div className="flex gap-2">
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" className="border-red-600 text-red-400 hover:bg-red-600 hover:text-white">
                <Zap className="w-4 h-4 mr-2" />
                Launch Crash
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-slate-800 border-slate-700">
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2 text-red-400">
                  <Zap className="w-5 h-5" />
                  Launch Price Crash
                </DialogTitle>
              </DialogHeader>
              <CrashForm />
            </DialogContent>
          </Dialog>
          
          <Dialog>
            <DialogTrigger asChild>
              <Button className="bg-lime-600 hover:bg-lime-700">
                <Plus className="w-4 h-4 mr-2" />
                Add Rule
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-slate-800 border-slate-700">
              <DialogHeader>
                <DialogTitle>Create New Rule</DialogTitle>
              </DialogHeader>
              <RuleForm />
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-gradient-to-br from-lime-500/10 to-lime-600/5 border-lime-500/30">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">Active Rules</p>
                <p className="text-2xl font-bold text-lime-400">3</p>
              </div>
              <Settings className="w-8 h-8 text-lime-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-yellow-500/10 to-yellow-600/5 border-yellow-500/30">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">Live Crashes</p>
                <p className="text-2xl font-bold text-yellow-400">2</p>
              </div>
              <Zap className="w-8 h-8 text-yellow-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-500/10 to-purple-600/5 border-purple-500/30">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">Avg Multiplier</p>
                <p className="text-2xl font-bold text-purple-400">1.12x</p>
              </div>
              <TrendingDown className="w-8 h-8 text-purple-400" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Rules Table */}
      <Card className="bg-slate-800 border-slate-700">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="w-5 h-5" />
            Pricing Rules
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className="border-slate-600">
                <TableHead>Rule Name</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Parameters</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {rules.map((rule) => (
                <TableRow key={rule.id} className="border-slate-600">
                  <TableCell>
                    <div>
                      <p className="font-medium">{rule.name}</p>
                      <p className="text-sm text-slate-400">{rule.description}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className="border-slate-600">
                      <Clock className="w-3 h-3 mr-1" />
                      {rule.kind}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm">
                      {rule.kind === 'time-of-day' && (
                        <span>
                          {rule.params.startTime} - {rule.params.endTime}<br />
                          <span className="text-slate-400">
                            Multiplier: {rule.params.multiplier}x
                          </span>
                        </span>
                      )}
                      {(rule.kind === 'floor' || rule.kind === 'ceiling') && (
                        <span className="text-slate-400">
                          Multiplier: {rule.params.multiplier}x
                        </span>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge 
                      variant="outline" 
                      className={
                        rule.isActive 
                          ? 'border-lime-500 text-lime-400 bg-lime-500/10' 
                          : 'border-slate-600 text-slate-400'
                      }
                    >
                      {rule.isActive ? 'Active' : 'Inactive'}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Button variant="ghost" size="icon">
                        {rule.isActive ? (
                          <Pause className="w-4 h-4 text-yellow-400" />
                        ) : (
                          <Play className="w-4 h-4 text-lime-400" />
                        )}
                      </Button>
                      <Switch checked={rule.isActive} />
                    </div>
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