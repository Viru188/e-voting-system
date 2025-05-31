
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { LogOut, Users, BarChart3, Shield, Activity } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

interface AdminDashboardProps {
  onLogout: () => void;
}

const AdminDashboard = ({ onLogout }: AdminDashboardProps) => {
  const votingData = [
    { name: 'Alex Johnson', votes: 1250, percentage: 45 },
    { name: 'Sarah Williams', votes: 980, percentage: 35 },
    { name: 'Michael Chen', votes: 556, percentage: 20 }
  ];

  const participationData = [
    { name: 'Voted', value: 2786, color: '#3b82f6' },
    { name: 'Not Voted', value: 1214, color: '#e5e7eb' }
  ];

  const electionStats = [
    { title: 'Total Registered Voters', value: '4,000', icon: Users, color: 'blue' },
    { title: 'Votes Cast', value: '2,786', icon: BarChart3, color: 'green' },
    { title: 'Participation Rate', value: '69.7%', icon: Activity, color: 'purple' },
    { title: 'Security Status', value: 'Secure', icon: Shield, color: 'emerald' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-red-600 rounded-lg">
                <Shield className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Admin Dashboard</h1>
                <p className="text-sm text-gray-600">Election Management System</p>
              </div>
            </div>
            <Button variant="outline" onClick={onLogout} className="hover:bg-red-50">
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {electionStats.map((stat, index) => (
            <Card key={index}>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                    <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                  </div>
                  <stat.icon className={`h-8 w-8 text-${stat.color}-600`} />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Vote Results */}
          <Card>
            <CardHeader>
              <CardTitle>Presidential Election Results</CardTitle>
              <CardDescription>Real-time vote counting</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={votingData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="votes" fill="#3b82f6" />
                </BarChart>
              </ResponsiveContainer>
              
              <div className="mt-4 space-y-2">
                {votingData.map((candidate, index) => (
                  <div key={index} className="flex justify-between items-center py-2 border-b">
                    <span className="font-medium">{candidate.name}</span>
                    <div className="flex items-center space-x-3">
                      <span className="text-sm text-gray-600">{candidate.votes} votes</span>
                      <Badge variant="outline">{candidate.percentage}%</Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Participation Overview */}
          <Card>
            <CardHeader>
              <CardTitle>Voter Participation</CardTitle>
              <CardDescription>Overview of voting participation</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={participationData}
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    dataKey="value"
                    label={({ name, value }) => `${name}: ${value}`}
                  >
                    {participationData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
              
              <div className="mt-4 grid grid-cols-2 gap-4">
                <div className="text-center p-3 bg-blue-50 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">69.7%</div>
                  <div className="text-sm text-gray-600">Participation Rate</div>
                </div>
                <div className="text-center p-3 bg-green-50 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">2,786</div>
                  <div className="text-sm text-gray-600">Total Votes</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Security Status */}
        <Card className="mt-8 bg-green-50 border-green-200">
          <CardContent className="pt-6">
            <div className="flex items-center justify-center space-x-3 text-green-800">
              <Shield className="h-8 w-8" />
              <div className="text-center">
                <h3 className="text-lg font-semibold">System Security Status: SECURE</h3>
                <p className="text-sm">All voting systems operational. No security incidents detected.</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;
