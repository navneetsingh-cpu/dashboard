import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from './ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

interface ChartsSectionProps {
  filters: {
    dateRange: string;
    category: string;
    region: string;
  };
}

const generateTimeSeriesData = () => {
  const data = [];
  const now = Date.now();
  for (let i = 23; i >= 0; i--) {
    data.push({
      time: new Date(now - i * 60 * 60 * 1000).toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
      }),
      users: Math.floor(Math.random() * 500 + 1500),
      revenue: Math.floor(Math.random() * 3000 + 5000),
      conversions: Math.floor(Math.random() * 100 + 200),
    });
  }
  return data;
};

const categoryData = [
  { name: 'Electronics', value: 4200, fill: '#3b82f6' },
  { name: 'Clothing', value: 3100, fill: '#8b5cf6' },
  { name: 'Food', value: 2800, fill: '#10b981' },
  { name: 'Books', value: 1900, fill: '#f59e0b' },
  { name: 'Other', value: 1500, fill: '#ef4444' },
];

const regionData = [
  { name: 'Jan', northAmerica: 4000, europe: 2400, asia: 2400 },
  { name: 'Feb', northAmerica: 3000, europe: 1398, asia: 2210 },
  { name: 'Mar', northAmerica: 2000, europe: 9800, asia: 2290 },
  { name: 'Apr', northAmerica: 2780, europe: 3908, asia: 2000 },
  { name: 'May', northAmerica: 1890, europe: 4800, asia: 2181 },
  { name: 'Jun', northAmerica: 2390, europe: 3800, asia: 2500 },
];

export function ChartsSection({ filters }: ChartsSectionProps) {
  const [realtimeData, setRealtimeData] = useState(generateTimeSeriesData());

  // Simulate real-time data updates
  useEffect(() => {
    const interval = setInterval(() => {
      setRealtimeData((prev) => {
        const newData = [...prev.slice(1)];
        const lastTime = new Date();
        newData.push({
          time: lastTime.toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
          }),
          users: Math.floor(Math.random() * 500 + 1500),
          revenue: Math.floor(Math.random() * 3000 + 5000),
          conversions: Math.floor(Math.random() * 100 + 200),
        });
        return newData;
      });
    }, 10000); // Update every 10 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-6">
      {/* Real-time Line Chart */}
      <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
        <CardHeader>
          <CardTitle className="text-gray-900 dark:text-white">Real-time User Activity</CardTitle>
          <CardDescription className="text-gray-500 dark:text-gray-400">
            Live metrics updated every 10 seconds
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={350}>
            <LineChart data={realtimeData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.2} />
              <XAxis
                dataKey="time"
                stroke="#6b7280"
                tick={{ fill: '#6b7280' }}
              />
              <YAxis stroke="#6b7280" tick={{ fill: '#6b7280' }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#1f2937',
                  border: '1px solid #374151',
                  borderRadius: '8px',
                  color: '#fff',
                }}
              />
              <Legend />
              <Line
                type="monotone"
                dataKey="users"
                stroke="#3b82f6"
                strokeWidth={2}
                dot={false}
                name="Active Users"
              />
              <Line
                type="monotone"
                dataKey="conversions"
                stroke="#10b981"
                strokeWidth={2}
                dot={false}
                name="Conversions"
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Area Chart */}
        <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
          <CardHeader>
            <CardTitle className="text-gray-900 dark:text-white">Revenue Trend</CardTitle>
            <CardDescription className="text-gray-500 dark:text-gray-400">
              Revenue over the last 24 hours
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={realtimeData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.2} />
                <XAxis dataKey="time" stroke="#6b7280" tick={{ fill: '#6b7280' }} />
                <YAxis stroke="#6b7280" tick={{ fill: '#6b7280' }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1f2937',
                    border: '1px solid #374151',
                    borderRadius: '8px',
                    color: '#fff',
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="revenue"
                  stroke="#8b5cf6"
                  fill="#8b5cf6"
                  fillOpacity={0.3}
                  name="Revenue ($)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Pie Chart */}
        <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
          <CardHeader>
            <CardTitle className="text-gray-900 dark:text-white">Sales by Category</CardTitle>
            <CardDescription className="text-gray-500 dark:text-gray-400">
              Distribution across product categories
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={100}
                  dataKey="value"
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1f2937',
                    border: '1px solid #374151',
                    borderRadius: '8px',
                    color: '#fff',
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Bar Chart with Tabs */}
      <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
        <CardHeader>
          <CardTitle className="text-gray-900 dark:text-white">Regional Performance</CardTitle>
          <CardDescription className="text-gray-500 dark:text-gray-400">
            Comparison of metrics across regions
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="stacked" className="w-full">
            <TabsList className="mb-4">
              <TabsTrigger value="stacked">Stacked</TabsTrigger>
              <TabsTrigger value="grouped">Grouped</TabsTrigger>
            </TabsList>
            <TabsContent value="stacked">
              <ResponsiveContainer width="100%" height={350}>
                <BarChart data={regionData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.2} />
                  <XAxis dataKey="name" stroke="#6b7280" tick={{ fill: '#6b7280' }} />
                  <YAxis stroke="#6b7280" tick={{ fill: '#6b7280' }} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#1f2937',
                      border: '1px solid #374151',
                      borderRadius: '8px',
                      color: '#fff',
                    }}
                  />
                  <Legend />
                  <Bar dataKey="northAmerica" stackId="a" fill="#3b82f6" name="North America" />
                  <Bar dataKey="europe" stackId="a" fill="#10b981" name="Europe" />
                  <Bar dataKey="asia" stackId="a" fill="#f59e0b" name="Asia Pacific" />
                </BarChart>
              </ResponsiveContainer>
            </TabsContent>
            <TabsContent value="grouped">
              <ResponsiveContainer width="100%" height={350}>
                <BarChart data={regionData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.2} />
                  <XAxis dataKey="name" stroke="#6b7280" tick={{ fill: '#6b7280' }} />
                  <YAxis stroke="#6b7280" tick={{ fill: '#6b7280' }} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#1f2937',
                      border: '1px solid #374151',
                      borderRadius: '8px',
                      color: '#fff',
                    }}
                  />
                  <Legend />
                  <Bar dataKey="northAmerica" fill="#3b82f6" name="North America" />
                  <Bar dataKey="europe" fill="#10b981" name="Europe" />
                  <Bar dataKey="asia" fill="#f59e0b" name="Asia Pacific" />
                </BarChart>
              </ResponsiveContainer>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
