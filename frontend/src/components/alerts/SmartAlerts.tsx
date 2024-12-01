import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AlertTriangle, Clock, TrendingUp, Settings } from 'lucide-react';

interface Alert {
  id: string;
  type: 'warning' | 'action' | 'info';
  title: string;
  description: string;
  priority: 'high' | 'medium' | 'low';
  dueDate?: string;
  actions?: string[];
}

const SmartAlerts = () => {
  const [alerts, setAlerts] = useState<Alert[]>([
    {
      id: '1',
      type: 'warning',
      title: 'Option Pool Threshold',
      description: 'Option pool utilization will reach 90% in 45 days based on current burn rate',
      priority: 'high',
      actions: ['Review allocation strategy', 'Schedule board meeting']
    },
    {
      id: '2',
      type: 'action',
      title: 'Insider Trading Window',
      description: 'Trading window opens in 5 days. 12 employees have pending exercises.',
      priority: 'high',
      dueDate: '2024-12-05',
      actions: ['Send notifications', 'Prepare compliance docs']
    },
    {
      id: '3',
      type: 'info',
      title: 'Grant Value Changes',
      description: '409A valuation changed by 15%. 85 unvested grants affected.',
      priority: 'medium',
      actions: ['Update grant documents']
    }
  ]);

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'low':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'warning':
        return AlertTriangle;
      case 'action':
        return Clock;
      case 'info':
        return TrendingUp;
      default:
        return Settings;
    }
  };

  const dismissAlert = (alertId: string) => {
    setAlerts(alerts.filter(alert => alert.id !== alertId));
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <AlertTriangle className="h-5 w-5" />
          Smart Alerts & Recommendations
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {alerts.map((alert) => {
            const Icon = getIcon(alert.type);
            return (
              <div 
                key={alert.id}
                className="border rounded-lg p-4 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start gap-4">
                  <div className={`p-2 rounded-full ${
                    alert.type === 'warning' ? 'bg-red-100' :
                    alert.type === 'action' ? 'bg-blue-100' : 'bg-gray-100'
                  }`}>
                    <Icon className={`h-5 w-5 ${
                      alert.type === 'warning' ? 'text-red-500' :
                      alert.type === 'action' ? 'text-blue-500' : 'text-gray-500'
                    }`} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold">{alert.title}</h3>
                        <span className={`text-xs px-2 py-1 rounded-full ${getPriorityColor(alert.priority)}`}>
                          {alert.priority}
                        </span>
                      </div>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => dismissAlert(alert.id)}
                        className="text-gray-500 hover:text-gray-700"
                      >
                        Dismiss
                      </Button>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">{alert.description}</p>
                    {alert.dueDate && (
                      <p className="text-sm text-gray-500 mt-2">
                        Due: {new Date(alert.dueDate).toLocaleDateString()}
                      </p>
                    )}
                    {alert.actions && (
                      <div className="mt-3 flex flex-wrap gap-2">
                        {alert.actions.map((action, index) => (
                          <Button
                            key={index}
                            variant="outline"
                            size="sm"
                            className="text-xs"
                          >
                            {action}
                          </Button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
          {alerts.length === 0 && (
            <div className="text-center py-6 text-gray-500">
              No active alerts
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default SmartAlerts;