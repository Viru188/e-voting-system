import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { LogOut, Users, BarChart3, Shield, Activity, Trophy, TrendingUp, Calendar, MapPin } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';

interface AdminDashboardProps {
  onLogout: () => void;
}

const AdminDashboard = ({ onLogout }: AdminDashboardProps) => {
  const [selectedState, setSelectedState] = useState('Maharashtra');

  // Indian states data
  const indianStates = [
    'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh',
    'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand',
    'Karnataka', 'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur',
    'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha', 'Punjab',
    'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Telangana', 'Tripura',
    'Uttar Pradesh', 'Uttarakhand', 'West Bengal'
  ];

  // State-wise voting data (mock data)
  const stateWiseData = {
    'Maharashtra': {
      totalVoters: 45000,
      votedCount: 31500,
      participationRate: 70.0,
      candidates: [
        { name: 'Alex Johnson', votes: 14175, percentage: 45.0, party: 'Democratic Party' },
        { name: 'Sarah Williams', votes: 11025, percentage: 35.0, party: 'Republican Party' },
        { name: 'Michael Chen', votes: 6300, percentage: 20.0, party: 'Independent' }
      ]
    },
    'Uttar Pradesh': {
      totalVoters: 82000,
      votedCount: 57400,
      participationRate: 70.0,
      candidates: [
        { name: 'Alex Johnson', votes: 24526, percentage: 42.7, party: 'Democratic Party' },
        { name: 'Sarah Williams', votes: 20148, percentage: 35.1, party: 'Republican Party' },
        { name: 'Michael Chen', votes: 12726, percentage: 22.2, party: 'Independent' }
      ]
    },
    'Tamil Nadu': {
      totalVoters: 38000,
      votedCount: 26600,
      participationRate: 70.0,
      candidates: [
        { name: 'Sarah Williams', votes: 11970, percentage: 45.0, party: 'Republican Party' },
        { name: 'Alex Johnson', votes: 10640, percentage: 40.0, party: 'Democratic Party' },
        { name: 'Michael Chen', votes: 3990, percentage: 15.0, party: 'Independent' }
      ]
    },
    'Gujarat': {
      totalVoters: 28000,
      votedCount: 19600,
      participationRate: 70.0,
      candidates: [
        { name: 'Alex Johnson', votes: 9800, percentage: 50.0, party: 'Democratic Party' },
        { name: 'Sarah Williams', votes: 6860, percentage: 35.0, party: 'Republican Party' },
        { name: 'Michael Chen', votes: 2940, percentage: 15.0, party: 'Independent' }
      ]
    },
    'West Bengal': {
      totalVoters: 41000,
      votedCount: 28700,
      participationRate: 70.0,
      candidates: [
        { name: 'Michael Chen', votes: 12615, percentage: 44.0, party: 'Independent' },
        { name: 'Alex Johnson', votes: 10005, percentage: 34.9, party: 'Democratic Party' },
        { name: 'Sarah Williams', votes: 6080, percentage: 21.1, party: 'Republican Party' }
      ]
    }
  };

  // Get current state data or default
  const currentStateData = stateWiseData[selectedState] || stateWiseData['Maharashtra'];
  const winningCandidate = currentStateData.candidates[0];

  // Overall national data (aggregated)
  const nationalData = [
    { name: 'Alex Johnson', votes: 1250, percentage: 45, party: 'Democratic Party' },
    { name: 'Sarah Williams', votes: 980, percentage: 35, party: 'Republican Party' },
    { name: 'Michael Chen', votes: 556, percentage: 20, party: 'Independent' }
  ];

  const participationData = [
    { name: 'Voted', value: currentStateData.votedCount, color: '#3b82f6' },
    { name: 'Not Voted', value: currentStateData.totalVoters - currentStateData.votedCount, color: '#e5e7eb' }
  ];

  // Hourly voting trend data
  const hourlyVotingTrend = [
    { hour: '8AM', votes: 120 },
    { hour: '10AM', votes: 340 },
    { hour: '12PM', votes: 580 },
    { hour: '2PM', votes: 720 },
    { hour: '4PM', votes: 980 },
    { hour: '6PM', votes: 1250 },
    { hour: '8PM', votes: 1450 }
  ];

  // Demographic data
  const demographicData = [
    { age: '18-25', votes: 456, percentage: 16.4 },
    { age: '26-35', votes: 892, percentage: 32.0 },
    { age: '36-50', votes: 978, percentage: 35.1 },
    { age: '51-65', votes: 334, percentage: 12.0 },
    { age: '65+', votes: 126, percentage: 4.5 }
  ];

  // Election statistics
  const electionStats = [
    { title: 'Total Registered Voters', value: currentStateData.totalVoters.toLocaleString(), icon: Users, color: 'blue' },
    { title: 'Votes Cast', value: currentStateData.votedCount.toLocaleString(), icon: BarChart3, color: 'green' },
    { title: 'Participation Rate', value: `${currentStateData.participationRate}%`, icon: Activity, color: 'purple' },
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
        {/* State Selector */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="h-5 w-5" />
              State-wise Analysis
            </CardTitle>
            <CardDescription>Select a state to view detailed voting statistics</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-4">
              <label className="text-sm font-medium text-gray-700">Select State:</label>
              <Select value={selectedState} onValueChange={setSelectedState}>
                <SelectTrigger className="w-64">
                  <SelectValue placeholder="Choose a state" />
                </SelectTrigger>
                <SelectContent>
                  {indianStates.map((state) => (
                    <SelectItem key={state} value={state}>
                      {state}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* State Winning Party Alert */}
        <Card className="mb-8 bg-gradient-to-r from-green-50 to-emerald-50 border-green-200">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <Trophy className="h-12 w-12 text-yellow-500" />
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">Leading in {selectedState}</h3>
                  <p className="text-lg text-gray-700">{winningCandidate.name} ({winningCandidate.party})</p>
                  <p className="text-sm text-gray-600">
                    {winningCandidate.votes.toLocaleString()} votes ({winningCandidate.percentage}%)
                  </p>
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
          {/* State Vote Results */}
          <Card>
            <CardHeader>
              <CardTitle>{selectedState} Election Results</CardTitle>
              <CardDescription>Vote breakdown for {selectedState}</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={currentStateData.candidates}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="votes" fill="#3b82f6" />
                </BarChart>
              </ResponsiveContainer>
              
              <div className="mt-4 space-y-3">
                {currentStateData.candidates.map((candidate, index) => (
                  <div key={index} className="flex justify-between items-center py-3 border-b border-gray-100">
                    <div>
                      <span className="font-medium text-gray-900">{candidate.name}</span>
                      <p className="text-sm text-gray-600">{candidate.party}</p>
                    </div>
                    <div className="flex items-center space-x-3">
                      <span className="text-sm text-gray-600">{candidate.votes.toLocaleString()} votes</span>
                      <Badge variant={index === 0 ? "default" : "outline"}>
                        {candidate.percentage}%
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* National Comparison */}
          <Card>
            <CardHeader>
              <CardTitle>National vs {selectedState}</CardTitle>
              <CardDescription>Comparison with national averages</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={nationalData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="percentage" fill="#10b981" />
                </BarChart>
              </ResponsiveContainer>
              
              <div className="mt-4 space-y-2">
                <div className="flex justify-between items-center p-2 bg-blue-50 rounded">
                  <span className="text-sm font-medium">{selectedState} Participation</span>
                  <span className="text-lg font-bold text-blue-600">{currentStateData.participationRate}%</span>
                </div>
                <div className="flex justify-between items-center p-2 bg-green-50 rounded">
                  <span className="text-sm font-medium">National Average</span>
                  <span className="text-lg font-bold text-green-600">69.7%</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* State Participation Overview */}
          <Card>
            <CardHeader>
              <CardTitle>{selectedState} Voter Participation</CardTitle>
              <CardDescription>Detailed breakdown for {selectedState}</CardDescription>
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
                    label={({ name, value }) => `${name}: ${value.toLocaleString()}`}
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
                  <span className="text-lg font-bold text-blue-600">{currentStateData.participationRate}%</span>
                </div>
                <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                  <span className="text-sm font-medium">Remaining Voters</span>
                  <span className="text-lg font-bold text-gray-600">
                    {(currentStateData.totalVoters - currentStateData.votedCount).toLocaleString()}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Demographic Analysis */}
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
