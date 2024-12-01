import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, ResponsiveContainer, XAxis, YAxis, Tooltip } from 'recharts';

const AdvancedVisualizations = () => {
  const vestingTimeline = [
    { month: 'Jan', shares: 125000, cumulative: 125000 },
    { month: 'Feb', shares: 150000, cumulative: 275000 },
    { month: 'Mar', shares: 175000, cumulative: 450000 },
    { month: 'Apr', shares: 200000, cumulative: 650000 },
    { month: 'May', shares: 225000, cumulative: 875000 },
    { month: 'Jun', shares: 250000, cumulative: 1125000 }
  ];

  const grantDistribution = [
    { level: 'Executive', count: 5, totalShares: 2500000, avgValue: 500000 },
    { level: 'Senior', count: 15, totalShares: 1500000, avgValue: 100000 },
    { level: 'Mid', count: 45, totalShares: 2250000, avgValue: 50000 },
    { level: 'Junior', count: 85, totalShares: 1700000, avgValue: 20000 }
  ];

  const grantTypes = [
    { name: 'ISO', value: 45 },
    { name: 'NSO', value: 30 },
    { name: 'RSU', value: 25 }
  ];

  const COLORS = ['#3b82f6', '#10b981', '#6366f1', '#f59e0b'];

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Vesting Timeline Analysis</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={vestingTimeline}>
                <XAxis dataKey="month" />
                <YAxis yAxisId="shares" />
                <YAxis yAxisId="cumulative" orientation="right" />
                <Tooltip />
                <Line
                  yAxisId="shares"
                  type="monotone"
                  dataKey="shares"
                  stroke="#3b82f6"
                  name="Monthly Vesting"
                />
                <Line
                  yAxisId="cumulative"
                  type="monotone"
                  dataKey="cumulative"
                  stroke="#10b981"
                  name="Cumulative"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Grant Distribution by Level</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={grantDistribution}>
                  <XAxis dataKey="level" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="totalShares" fill="#3b82f6" name="Total Shares" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Grant Type Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={grantTypes}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {grantTypes.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4 grid grid-cols-3 gap-2">
              {grantTypes.map((type, index) => (
                <div key={type.name} className="text-center">
                  <div className="text-sm font-medium">{type.name}</div>
                  <div className="text-xs text-gray-500">{type.value}%</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdvancedVisualizations;