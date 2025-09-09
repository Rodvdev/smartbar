import React, { useState } from 'react';
import { Brain, TrendingUp, Settings, AlertCircle, CheckCircle, Clock } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Label } from './ui/label';
import { Slider } from './ui/slider';
import { Switch } from './ui/switch';
import { Progress } from './ui/progress';

export function MLSettings() {
  const [predictionHorizon, setPredictionHorizon] = useState([30]);
  const [aggressiveness, setAggressiveness] = useState([1.2]);
  const [abTestingEnabled, setAbTestingEnabled] = useState(true);
  const [autoApplyEnabled, setAutoApplyEnabled] = useState(false);

  const trainingHistory = [
    {
      id: '1',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
      status: 'SUCCEEDED',
      accuracy: 0.847,
      samples: 2456,
      duration: '4m 32s'
    },
    {
      id: '2',
      timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000),
      status: 'SUCCEEDED',
      accuracy: 0.832,
      samples: 2401,
      duration: '4m 18s'
    },
    {
      id: '3',
      timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000),
      status: 'FAILED',
      accuracy: null,
      samples: 2389,
      duration: '1m 45s'
    }
  ];

  const currentPredictions = [
    {
      product: 'Pisco Sour',
      currentPrice: 24.50,
      recommendedPrice: 26.80,
      confidence: 0.89,
      predictedDemand: 'High',
      reasoning: 'Peak hour approaching, high historical demand'
    },
    {
      product: 'Gin Tonic',
      currentPrice: 26.80,
      recommendedPrice: 24.20,
      confidence: 0.73,
      predictedDemand: 'Medium',
      reasoning: 'Slower period, reduce price to increase volume'
    },
    {
      product: 'Lager 330ml',
      currentPrice: 13.20,
      recommendedPrice: 14.50,
      confidence: 0.91,
      predictedDemand: 'High',
      reasoning: 'Weekend premium, strong demand pattern'
    },
    {
      product: 'Nachos',
      currentPrice: 32.00,
      recommendedPrice: 28.80,
      confidence: 0.65,
      predictedDemand: 'Low',
      reasoning: 'Excess inventory, promote to move stock'
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'SUCCEEDED':
        return <CheckCircle className="w-4 h-4 text-lime-400" />;
      case 'FAILED':
        return <AlertCircle className="w-4 h-4 text-red-400" />;
      case 'RUNNING':
        return <Clock className="w-4 h-4 text-yellow-400 animate-spin" />;
      default:
        return <Clock className="w-4 h-4 text-slate-400" />;
    }
  };

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 0.8) return 'text-lime-400';
    if (confidence >= 0.6) return 'text-yellow-400';
    return 'text-red-400';
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="mb-2">ML Settings</h1>
        <p className="text-slate-400">Configure machine learning predictions and automation</p>
      </div>

      {/* ML Engine Status */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-gradient-to-br from-lime-500/10 to-lime-600/5 border-lime-500/30">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">Engine Status</p>
                <div className="flex items-center gap-2 mt-1">
                  <div className="w-3 h-3 bg-lime-400 rounded-full animate-pulse" />
                  <span className="text-lime-400 font-bold">ACTIVE</span>
                </div>
              </div>
              <Brain className="w-8 h-8 text-lime-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-800 border-slate-700">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">Last Training</p>
                <p className="text-lg font-bold">2h ago</p>
                <p className="text-xs text-lime-400">84.7% accuracy</p>
              </div>
              <TrendingUp className="w-8 h-8 text-purple-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-800 border-slate-700">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">Active Predictions</p>
                <p className="text-2xl font-bold">{currentPredictions.length}</p>
              </div>
              <Settings className="w-8 h-8 text-yellow-400" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Configuration Panel */}
        <Card className="bg-slate-800 border-slate-700">
          <CardHeader>
            <CardTitle>Model Configuration</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <Label className="text-base">Prediction Horizon: {predictionHorizon[0]} minutes</Label>
              <p className="text-sm text-slate-400 mb-2">How far ahead to predict demand</p>
              <Slider
                value={predictionHorizon}
                onValueChange={setPredictionHorizon}
                max={120}
                min={15}
                step={15}
                className="w-full"
              />
              <div className="flex justify-between text-sm text-slate-400 mt-1">
                <span>15 min</span>
                <span>120 min</span>
              </div>
            </div>

            <div>
              <Label className="text-base">Price Aggressiveness: {aggressiveness[0]}x</Label>
              <p className="text-sm text-slate-400 mb-2">Maximum multiplier for price changes</p>
              <Slider
                value={aggressiveness}
                onValueChange={setAggressiveness}
                max={2.0}
                min={0.5}
                step={0.1}
                className="w-full"
              />
              <div className="flex justify-between text-sm text-slate-400 mt-1">
                <span>0.5x</span>
                <span>2.0x</span>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-base">A/B Testing (ε-greedy)</Label>
                  <p className="text-sm text-slate-400">Enable exploration vs exploitation</p>
                </div>
                <Switch
                  checked={abTestingEnabled}
                  onCheckedChange={setAbTestingEnabled}
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-base">Auto-Apply Recommendations</Label>
                  <p className="text-sm text-slate-400">Automatically apply high-confidence predictions</p>
                </div>
                <Switch
                  checked={autoApplyEnabled}
                  onCheckedChange={setAutoApplyEnabled}
                />
              </div>
            </div>

            <div className="pt-4">
              <Button className="w-full bg-lime-600 hover:bg-lime-700">
                Save Configuration
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Training History */}
        <Card className="bg-slate-800 border-slate-700">
          <CardHeader>
            <CardTitle>Training History</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {trainingHistory.map((training) => (
                <div key={training.id} className="flex items-center justify-between p-3 bg-slate-700 rounded-lg">
                  <div className="flex items-center gap-3">
                    {getStatusIcon(training.status)}
                    <div>
                      <p className="font-medium">
                        {training.timestamp.toLocaleString()}
                      </p>
                      <p className="text-sm text-slate-400">
                        {training.samples.toLocaleString()} samples • {training.duration}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    {training.accuracy && (
                      <p className="font-mono text-lime-400">
                        {(training.accuracy * 100).toFixed(1)}%
                      </p>
                    )}
                    <Badge variant="outline" className={
                      training.status === 'SUCCEEDED' 
                        ? 'border-lime-500 text-lime-400' 
                        : 'border-red-500 text-red-400'
                    }>
                      {training.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
            
            <Button variant="outline" className="w-full mt-4 border-slate-600">
              Trigger Training Now
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Current Predictions */}
      <Card className="bg-slate-800 border-slate-700">
        <CardHeader>
          <CardTitle>Current Predictions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {currentPredictions.map((prediction, i) => (
              <div key={i} className="p-4 bg-slate-700 rounded-lg">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-medium">{prediction.product}</h4>
                  <Badge variant="outline" className={`${getConfidenceColor(prediction.confidence)} border-current`}>
                    {(prediction.confidence * 100).toFixed(0)}% confident
                  </Badge>
                </div>
                
                <div className="grid grid-cols-2 gap-4 mb-3">
                  <div>
                    <p className="text-sm text-slate-400">Current Price</p>
                    <p className="text-lg font-mono">S/. {prediction.currentPrice.toFixed(2)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-400">Recommended</p>
                    <p className="text-lg font-mono text-lime-400">S/. {prediction.recommendedPrice.toFixed(2)}</p>
                  </div>
                </div>
                
                <div className="mb-3">
                  <p className="text-sm text-slate-400">Predicted Demand</p>
                  <Badge variant="outline" className={
                    prediction.predictedDemand === 'High' 
                      ? 'border-lime-500 text-lime-400'
                      : prediction.predictedDemand === 'Medium'
                      ? 'border-yellow-500 text-yellow-400'
                      : 'border-red-500 text-red-400'
                  }>
                    {prediction.predictedDemand}
                  </Badge>
                </div>
                
                <p className="text-sm text-slate-400 mb-3">{prediction.reasoning}</p>
                
                <div className="flex gap-2">
                  <Button size="sm" className="bg-lime-600 hover:bg-lime-700 flex-1">
                    Apply
                  </Button>
                  <Button size="sm" variant="outline" className="border-slate-600">
                    Ignore
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}