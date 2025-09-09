import React, { useState, useEffect } from 'react';
import { TrendingUp, TrendingDown, Zap, Clock, Maximize } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';

export function LivePriceBoard() {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const products = [
    {
      category: 'Cocktails',
      items: [
        { name: 'Pisco Sour', price: 24.50, change: 12.5, trend: 'up', crash: null },
        { name: 'Gin Tonic', price: 26.80, change: -8.2, trend: 'down', crash: null },
        { name: 'Moscow Mule', price: 28.00, change: 22.1, trend: 'up', crash: { discount: 25, timeLeft: 180 } },
        { name: 'Margarita', price: 25.50, change: 5.8, trend: 'up', crash: null },
      ]
    },
    {
      category: 'Beer',
      items: [
        { name: 'Lager 330ml', price: 13.20, change: 15.0, trend: 'up', crash: null },
        { name: 'IPA 330ml', price: 16.50, change: -3.2, trend: 'down', crash: null },
        { name: 'Wheat 330ml', price: 15.80, change: 8.7, trend: 'up', crash: null },
      ]
    },
    {
      category: 'Food',
      items: [
        { name: 'Nachos', price: 32.00, change: -12.5, trend: 'down', crash: { discount: 30, timeLeft: 720 } },
        { name: 'Wings', price: 28.50, change: 18.3, trend: 'up', crash: null },
        { name: 'Sliders', price: 24.00, change: 6.2, trend: 'up', crash: null },
      ]
    }
  ];

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const currentAlert = products
    .flatMap(cat => cat.items)
    .find(item => item.crash && item.crash.timeLeft < 300);

  return (
    <div className={`${isFullscreen ? 'fixed inset-0 z-50 bg-slate-950' : ''}`}>
      <div className={`${isFullscreen ? 'p-8' : ''} space-y-6`}>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="mb-2">Live Price Board</h1>
            <p className="text-slate-400">Real-time pricing • Updated every minute</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-2xl font-mono">{time.toLocaleTimeString()}</p>
              <p className="text-sm text-slate-400">Lima Time</p>
            </div>
            <Button
              onClick={() => setIsFullscreen(!isFullscreen)}
              variant="outline"
              size="icon"
              className="border-slate-600"
            >
              <Maximize className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Alert Banner */}
        {currentAlert && (
          <div className="bg-gradient-to-r from-yellow-500/20 to-red-500/20 border border-yellow-500/50 rounded-lg p-4 animate-pulse">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Zap className="w-6 h-6 text-yellow-400" />
                <div>
                  <p className="font-bold text-yellow-400">PRICE CRASH ACTIVE!</p>
                  <p className="text-sm">
                    {currentAlert.name} is now -{currentAlert.crash?.discount}% OFF
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-2xl font-mono text-yellow-400">
                  {formatTime(currentAlert.crash?.timeLeft || 0)}
                </p>
                <p className="text-xs text-slate-400">time remaining</p>
              </div>
            </div>
          </div>
        )}

        {/* Price Board */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {products.map((category) => (
            <Card key={category.category} className="bg-slate-800 border-slate-700">
              <CardHeader>
                <CardTitle className="text-center text-xl">
                  {category.category}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {category.items.map((item, i) => (
                  <div 
                    key={i} 
                    className={`p-4 rounded-lg border transition-all duration-300 ${
                      item.crash 
                        ? 'bg-gradient-to-r from-yellow-500/10 to-red-500/10 border-yellow-500/50 animate-pulse' 
                        : 'bg-slate-700 border-slate-600'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-medium">{item.name}</h3>
                      {item.crash && (
                        <Badge variant="destructive" className="bg-red-500/20 text-red-400 border-red-500">
                          -{item.crash.discount}%
                        </Badge>
                      )}
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className={`text-3xl font-mono ${
                          item.crash ? 'text-yellow-400' : 'text-lime-400'
                        }`}>
                          S/. {item.price.toFixed(2)}
                        </span>
                        {item.trend === 'up' ? (
                          <TrendingUp className="w-5 h-5 text-lime-400" />
                        ) : (
                          <TrendingDown className="w-5 h-5 text-red-400" />
                        )}
                      </div>
                      
                      <div className="text-right">
                        <div className={`flex items-center gap-1 ${
                          item.change > 0 ? 'text-lime-400' : 'text-red-400'
                        }`}>
                          <span className="font-mono">
                            {item.change > 0 ? '+' : ''}{item.change}%
                          </span>
                        </div>
                        {item.crash && (
                          <div className="flex items-center gap-1 text-yellow-400 text-sm">
                            <Clock className="w-3 h-3" />
                            {formatTime(item.crash.timeLeft)}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Price Movement Ticker */}
        <Card className="bg-slate-800 border-slate-700">
          <CardContent className="p-4">
            <div className="overflow-hidden">
              <div className="whitespace-nowrap animate-scroll">
                <span className="text-lime-400 mr-8">📈 Pisco Sour +12.5%</span>
                <span className="text-red-400 mr-8">📉 Gin Tonic -8.2%</span>
                <span className="text-yellow-400 mr-8">⚡ Moscow Mule CRASH -25%</span>
                <span className="text-lime-400 mr-8">📈 Lager +15.0%</span>
                <span className="text-yellow-400 mr-8">⚡ Nachos CRASH -30%</span>
                <span className="text-lime-400 mr-8">📈 Wings +18.3%</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <style jsx>{`
        @keyframes scroll {
          0% { transform: translateX(100%); }
          100% { transform: translateX(-100%); }
        }
        .animate-scroll {
          animation: scroll 20s linear infinite;
        }
      `}</style>
    </div>
  );
}