import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Activity, TrendingUp, AlertCircle } from 'lucide-react';

const SmartTracker = () => {
  const dilutionPredictions = {
    current: 12.5,
    predicted: 15.2,
    threshold: 16.0,
    timeline: '3 months',
    risk: 'medium'
  };

  const poolUtilization = {
    allocated: 8500000,
    remaining: 1500000,
    burnRate: '250,000 shares/month',
    estimatedDepletion: '6 months'
  };

  const grantTrends = [
    { month: 'Jan', grants: 450000, exercises: 120000 },
    { month: 'Feb', grants: 380000, exercises: 150000 },
    { month: 'Mar', grants: 520000, exercises: 180000 },
    { month: 'Apr', grants: 490000, exercises: 220000 },
    { month: 'May', grants: 600000, exercises: 250000 },
    { month: 'Jun', grants: 550000, exercises: 280000 }
  ];

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="h-5 w-5" />
            Dilution Intelligence
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <div className="text-sm text-gray-600">Current Dilution</div>
              <div className="text-2xl font-bold">{dilutionPredictions.current}%</div>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <div className="text-sm text-gray-600">Predicted ({dilutionPredictions.timeline})</div>
              <div className={`text-2xl font-bold ${
                dilutionPredictions.predicted > dilutionPredictions.threshold 
                ? 'text-red-500' 
                : 'text-yellow-500'
              }`}>
                {dilutionPredictions.predicted}%
              </div>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <div className="text-sm text-gray-600">Risk Level</div>
              <div className="text-2xl font-bold capitalize text-yellow-500">
                {dilutionPredictions.risk}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Option Pool Intelligence
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="relative pt-1">
              <div className="text-sm text-gray-600 mb-2">
                Pool Utilization ({Math.round(poolUtilization.allocated / (poolUtilization.allocated + poolUtilization.remaining) * 100)}%)
              </div>
              <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-gray-200">
                <div 
                  className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-500"
                  style={{ width: `${(poolUtilization.allocated / (poolUtilization.allocated + poolUtilization.remaining)) * 100}%` }}
                />
              </div>
            </div>
            
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={grantTrends}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="grants" stroke="#3b82f6" name="Grants" />
                  <Line type="monotone" dataKey="exercises" stroke="#10b981" name="Exercises" />
                </LineChart>
              </ResponsiveContainer>
            </div>

            <div className="grid grid-cols-2 gap-4 mt-4">
              <div className="p-4 bg-gray-50 rounded-lg">
                <div className="text-sm text-gray-600">Monthly Burn Rate</div>
                <div className="text-lg font-semibold">{poolUtilization.burnRate}</div>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg">
                <div className="text-sm text-gray-600">Estimated Depletion</div>
                <div className="text-lg font-semibold">{poolUtilization.estimatedDepletion}</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SmartTracker;