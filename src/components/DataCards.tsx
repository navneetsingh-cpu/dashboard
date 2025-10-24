import { useEffect, useState } from 'react';
import { Users, TrendingUp, DollarSign, Activity, ArrowUp, ArrowDown } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';

interface MetricData {
  title: string;
  value: string;
  change: number;
  icon: any;
  color: string;
}

export function DataCards() {
  const [metrics, setMetrics] = useState<MetricData[]>([
    {
      title: 'Active Users',
      value: '2,543',
      change: 12.5,
      icon: Users,
      color: 'text-blue-600 dark:text-blue-400',
    },
    {
      title: 'Conversion Rate',
      value: '3.24%',
      change: 8.2,
      icon: TrendingUp,
      color: 'text-green-600 dark:text-green-400',
    },
    {
      title: 'Revenue',
      value: '$45,231',
      change: -2.4,
      icon: DollarSign,
      color: 'text-purple-600 dark:text-purple-400',
    },
    {
      title: 'System Load',
      value: '68%',
      change: 5.1,
      icon: Activity,
      color: 'text-orange-600 dark:text-orange-400',
    },
  ]);

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics((prev) =>
        prev.map((metric) => ({
          ...metric,
          change: metric.change + (Math.random() - 0.5) * 2,
        }))
      );
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
      {metrics.map((metric, index) => {
        const Icon = metric.icon;
        const isPositive = metric.change >= 0;

        return (
          <Card key={index} className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm text-gray-600 dark:text-gray-400">
                {metric.title}
              </CardTitle>
              <div className={`p-2 rounded-lg bg-gray-50 dark:bg-gray-700 ${metric.color}`}>
                <Icon className="h-4 w-4" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl text-gray-900 dark:text-white">{metric.value}</div>
              <div className="flex items-center gap-1 mt-1">
                {isPositive ? (
                  <ArrowUp className="h-3 w-3 text-green-600" />
                ) : (
                  <ArrowDown className="h-3 w-3 text-red-600" />
                )}
                <span
                  className={`text-xs ${
                    isPositive ? 'text-green-600' : 'text-red-600'
                  }`}
                >
                  {Math.abs(metric.change).toFixed(1)}%
                </span>
                <span className="text-xs text-gray-500 dark:text-gray-400 ml-1">
                  vs last period
                </span>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
