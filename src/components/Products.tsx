import React, { useState } from 'react';
import { Plus, Edit, Trash2, Package } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
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

export function Products() {
  const [products] = useState([
    {
      id: '1',
      sku: 'PISCO-001',
      name: 'Pisco Sour',
      category: 'Cocktails',
      basePrice: 22.00,
      currentPrice: 24.50,
      taxRate: 18.00,
      isActive: true,
      stock: 45,
      lowStockThreshold: 10
    },
    {
      id: '2',
      sku: 'GIN-001',
      name: 'Gin Tonic',
      category: 'Cocktails',
      basePrice: 24.00,
      currentPrice: 26.80,
      taxRate: 18.00,
      isActive: true,
      stock: 32,
      lowStockThreshold: 10
    },
    {
      id: '3',
      sku: 'BEER-001',
      name: 'Lager 330ml',
      category: 'Beer',
      basePrice: 12.00,
      currentPrice: 13.20,
      taxRate: 18.00,
      isActive: true,
      stock: 89,
      lowStockThreshold: 20
    },
    {
      id: '4',
      sku: 'FOOD-001',
      name: 'Nachos',
      category: 'Food',
      basePrice: 28.00,
      currentPrice: 32.00,
      taxRate: 18.00,
      isActive: true,
      stock: 15,
      lowStockThreshold: 10
    },
    {
      id: '5',
      sku: 'WINE-001',
      name: 'House Red Wine',
      category: 'Wine',
      basePrice: 35.00,
      currentPrice: 35.00,
      taxRate: 18.00,
      isActive: false,
      stock: 0,
      lowStockThreshold: 5
    },
  ]);

  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = ['all', 'Cocktails', 'Beer', 'Food', 'Wine'];

  const filteredProducts = selectedCategory === 'all' 
    ? products 
    : products.filter(p => p.category === selectedCategory);

  const activeProducts = filteredProducts.filter(p => p.isActive);
  const inactiveProducts = filteredProducts.filter(p => !p.isActive);

  const ProductForm = () => (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="sku">SKU</Label>
          <Input id="sku" placeholder="PROD-001" className="bg-slate-700 border-slate-600" />
        </div>
        <div>
          <Label htmlFor="name">Product Name</Label>
          <Input id="name" placeholder="Product name" className="bg-slate-700 border-slate-600" />
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="category">Category</Label>
          <Select>
            <SelectTrigger className="bg-slate-700 border-slate-600">
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="cocktails">Cocktails</SelectItem>
              <SelectItem value="beer">Beer</SelectItem>
              <SelectItem value="food">Food</SelectItem>
              <SelectItem value="wine">Wine</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="basePrice">Base Price (S/.)</Label>
          <Input 
            id="basePrice" 
            type="number" 
            step="0.01" 
            placeholder="0.00" 
            className="bg-slate-700 border-slate-600" 
          />
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="taxRate">Tax Rate (%)</Label>
          <Input 
            id="taxRate" 
            type="number" 
            step="0.01" 
            defaultValue="18.00" 
            className="bg-slate-700 border-slate-600" 
          />
        </div>
        <div>
          <Label htmlFor="lowStock">Low Stock Threshold</Label>
          <Input 
            id="lowStock" 
            type="number" 
            defaultValue="10" 
            className="bg-slate-700 border-slate-600" 
          />
        </div>
      </div>

      <div className="flex justify-end gap-2 pt-4">
        <Button variant="outline" className="border-slate-600">
          Cancel
        </Button>
        <Button className="bg-lime-600 hover:bg-lime-700">
          Save Product
        </Button>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="mb-2">Products</h1>
          <p className="text-slate-400">Manage your product catalog and pricing</p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="bg-lime-600 hover:bg-lime-700">
              <Plus className="w-4 h-4 mr-2" />
              Add Product
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-slate-800 border-slate-700">
            <DialogHeader>
              <DialogTitle>Add New Product</DialogTitle>
            </DialogHeader>
            <ProductForm />
          </DialogContent>
        </Dialog>
      </div>

      {/* Category Filter */}
      <div className="flex gap-2">
        {categories.map((cat) => (
          <Button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            variant={selectedCategory === cat ? 'default' : 'outline'}
            size="sm"
            className={selectedCategory === cat ? 'bg-lime-600' : 'border-slate-600'}
          >
            {cat === 'all' ? 'All Categories' : cat}
          </Button>
        ))}
      </div>

      <Tabs defaultValue="active" className="space-y-4">
        <TabsList className="bg-slate-800">
          <TabsTrigger value="active">Active ({activeProducts.length})</TabsTrigger>
          <TabsTrigger value="inactive">Inactive ({inactiveProducts.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="active">
          <Card className="bg-slate-800 border-slate-700">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Package className="w-5 h-5" />
                Active Products
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow className="border-slate-600">
                    <TableHead>Product</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Base Price</TableHead>
                    <TableHead>Current Price</TableHead>
                    <TableHead>Stock</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {activeProducts.map((product) => (
                    <TableRow key={product.id} className="border-slate-600">
                      <TableCell>
                        <div>
                          <p className="font-medium">{product.name}</p>
                          <p className="text-sm text-slate-400">{product.sku}</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className="border-slate-600">
                          {product.category}
                        </Badge>
                      </TableCell>
                      <TableCell>S/. {product.basePrice.toFixed(2)}</TableCell>
                      <TableCell>
                        <span className="text-lime-400 font-mono">
                          S/. {product.currentPrice.toFixed(2)}
                        </span>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <span>{product.stock}</span>
                          {product.stock <= product.lowStockThreshold && (
                            <Badge variant="destructive" className="text-xs">
                              Low
                            </Badge>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className="border-lime-500 text-lime-400">
                          Active
                        </Badge>
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
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="inactive">
          <Card className="bg-slate-800 border-slate-700">
            <CardHeader>
              <CardTitle>Inactive Products</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow className="border-slate-600">
                    <TableHead>Product</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Base Price</TableHead>
                    <TableHead>Stock</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {inactiveProducts.map((product) => (
                    <TableRow key={product.id} className="border-slate-600">
                      <TableCell>
                        <div>
                          <p className="font-medium text-slate-400">{product.name}</p>
                          <p className="text-sm text-slate-500">{product.sku}</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className="border-slate-600 text-slate-400">
                          {product.category}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-slate-400">S/. {product.basePrice.toFixed(2)}</TableCell>
                      <TableCell className="text-slate-400">{product.stock}</TableCell>
                      <TableCell>
                        <Badge variant="outline" className="border-red-500 text-red-400">
                          Inactive
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Button variant="ghost" size="sm" className="text-lime-400">
                            Activate
                          </Button>
                          <Button variant="ghost" size="icon">
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}