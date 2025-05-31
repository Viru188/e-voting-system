
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { LogOut, Users, BarChart3, Shield, Activity, Trophy, TrendingUp, Calendar } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';

interface AdminDashboardProps {
  onLogout: () => void;
}

const AdminDashboard = ({ onLogout }: AdminDashboardProps) => {
  const votingData = [
    { name: 'Alex Johnson', votes: 1250, percentage: 45, party: 'Democratic Party' },
    { name: 'Sarah Williams', votes: 980, percentage: 35, party: 'Republican Party' },
    { name: 'Michael Chen', votes: 556, percentage: 20, party: 'Independent' }
  ];

  const participationData = [
    { name: 'Voted', value: 2786, color: '#3b82f6' },
    { name: 'Not Voted', value: 1214, color: '#e5e7eb' }
  ];

  const hourlyVotingTrend = [
    { hour: '8AM', votes: 120 },
    { hour: '10AM', votes: 340 },
    { hour: '12PM', votes: 580 },
    { hour: '2PM', votes: 720 },
    { hour: '4PM', votes: 980 },
    { hour: '6PM', votes: 1250 },
    { hour: '8PM', votes: 1450 }
  ];

  const demographicData = [
    { age: '18-25', votes: 456, percentage: 16.4 },
    { age: '26-35', votes: 892, percentage: 32.0 },
    { age: '36-50', votes: 978, percentage: 35.1 },
    { age: '51-65', votes: 334, percentage: 12.0 },
    { age: '65+', votes: 126, percentage: 4.5 }
  ];

  const electionStats = [
    { title: 'Total Registered Voters', value: '4,000', icon: Users, color: 'blue' },
    { title: 'Votes Cast', value: '2,786', icon: BarChart3, color: 'green' },
    { title: 'Participation Rate', value: '69.7%', icon: Activity, color: 'purple' },
    { title: 'Security Status', value: 'Secure', icon: Shield, color: 'emerald' }
  ];

  const winningCandidate = votingData[0];
  const leadMargin = votingData[0].votes - votingData[1].votes;

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
                <p className="text-sm text-gray-600">Election Analytics & Results</p>
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
        {/* Winning Party Alert */}
        <Card className="mb-8 bg-gradient-to-r from-green-50 to-emerald-50 border-green-200">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <Trophy className="h-12 w-12 text-yellow-500" />
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">Leading Candidate</h3>
                  <p className="text-lg text-gray-700">{winningCandidate.name} ({winningCandidate.party})</p>
                  <p className="text-sm text-gray-600">Leading by {leadMargin} votes ({winningCandidate.percentage}%)</p>
                </div>
              </div>
              <Badge className="bg-green-600 text-white text-lg px-4 py-2">
                {winningCandidate.percentage}% of votes
              </Badge>
            </div>
          </CardContent>
        </Card>

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

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Vote Results */}
          <Card>
            <CardHeader>
              <CardTitle>Presidential Election Results</CardTitle>
              <CardDescription>Real-time vote counting with party breakdown</CardDescription>
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
              
              <div className="mt-4 space-y-3">
                {votingData.map((candidate, index) => (
                  <div key={index} className="flex justify-between items-center py-3 border-b border-gray-100">
                    <div>
                      <span className="font-medium text-gray-900">{candidate.name}</span>
                      <p className="text-sm text-gray-600">{candidate.party}</p>
                    </div>
                    <div className="flex items-center space-x-3">
                      <span className="text-sm text-gray-600">{candidate.votes} votes</span>
                      <Badge variant={index === 0 ? "default" : "outline"}>
                        {candidate.percentage}%
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Hourly Voting Trend */}
          <Card>
            <CardHeader>
              <CardTitle>Voting Trend</CardTitle>
              <CardDescription>Hourly voting activity throughout the day</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={hourlyVotingTrend}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="hour" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="votes" stroke="#3b82f6" strokeWidth={3} />
                </LineChart>
              </ResponsiveContainer>
              
              <div className="mt-4 grid grid-cols-2 gap-4">
                <div className="text-center p-3 bg-blue-50 rounded-lg">
                  <div className="text-xl font-bold text-blue-600">1,450</div>
                  <div className="text-sm text-gray-600">Peak Hour Votes</div>
                </div>
                <div className="text-center p-3 bg-green-50 rounded-lg">
                  <div className="text-xl font-bold text-green-600">120/hour</div>
                  <div className="text-sm text-gray-600">Average Rate</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Participation Overview */}
          <Card>
            <CardHeader>
              <CardTitle>Voter Participation Analysis</CardTitle>
              <CardDescription>Detailed breakdown of voting participation</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie
                    data={participationData}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
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
              
              <div className="mt-4 space-y-2">
                <div className="flex justify-between items-center p-2 bg-blue-50 rounded">
                  <span className="text-sm font-medium">Participation Rate</span>
                  <span className="text-lg font-bold text-blue-600">69.7%</span>
                </div>
                <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                  <span className="text-sm font-medium">Remaining Voters</span>
                  <span className="text-lg font-bold text-gray-600">1,214</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Demographic Breakdown */}
          <Card>
            <CardHeader>
              <CardTitle>Demographic Analysis</CardTitle>
              <CardDescription>Voting patterns by age group</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {demographicData.map((demo, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">{demo.age} years</span>
                      <span className="text-sm text-gray-600">{demo.votes} votes ({demo.percentage}%)</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-blue-600 h-2 rounded-full" 
                        style={{ width: `${demo.percentage}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-6 p-4 bg-purple-50 rounded-lg">
                <div className="flex items-center space-x-2 text-purple-800">
                  <TrendingUp className="h-5 w-5" />
                  <span className="font-semibold">Highest Participation: 36-50 age group</span>
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
                <p className="text-sm">All voting systems operational. Real-time monitoring active. No security incidents detected.</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;
