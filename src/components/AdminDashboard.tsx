
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { LogOut, Users, BarChart3, Shield, Activity, Trophy, TrendingUp, MapPin } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

interface AdminDashboardProps {
  onLogout: () => void;
  adminState: string;
}

const AdminDashboard = ({ onLogout, adminState }: AdminDashboardProps) => {
  // State-specific data based on admin's state
  const stateData = {
    'Maharashtra': {
      totalVoters: 45000,
      votedCount: 31500,
      participationRate: 70.0,
      candidates: [
        { name: 'Eknath Shinde', party: 'Shiv Sena', votes: 14175, percentage: 45.0 },
        { name: 'Uddhav Thackeray', party: 'Shiv Sena (UBT)', votes: 11025, percentage: 35.0 },
        { name: 'Devendra Fadnavis', party: 'BJP', votes: 6300, percentage: 20.0 }
      ]
    },
    'Uttar Pradesh': {
      totalVoters: 82000,
      votedCount: 57400,
      participationRate: 70.0,
      candidates: [
        { name: 'Yogi Adityanath', party: 'BJP', votes: 24526, percentage: 42.7 },
        { name: 'Akhilesh Yadav', party: 'Samajwadi Party', votes: 20148, percentage: 35.1 },
        { name: 'Mayawati', party: 'BSP', votes: 12726, percentage: 22.2 }
      ]
    },
    'Tamil Nadu': {
      totalVoters: 38000,
      votedCount: 26600,
      participationRate: 70.0,
      candidates: [
        { name: 'M. K. Stalin', party: 'DMK', votes: 11970, percentage: 45.0 },
        { name: 'Edappadi K. Palaniswami', party: 'AIADMK', votes: 10640, percentage: 40.0 },
        { name: 'Annamalai', party: 'BJP', votes: 3990, percentage: 15.0 }
      ]
    },
    'Gujarat': {
      totalVoters: 28000,
      votedCount: 19600,
      participationRate: 70.0,
      candidates: [
        { name: 'Bhupendra Patel', party: 'BJP', votes: 9800, percentage: 50.0 },
        { name: 'Bharatsinh Solanki', party: 'Congress', votes: 6860, percentage: 35.0 },
        { name: 'Isudan Gadhvi', party: 'AAP', votes: 2940, percentage: 15.0 }
      ]
    },
    'West Bengal': {
      totalVoters: 41000,
      votedCount: 28700,
      participationRate: 70.0,
      candidates: [
        { name: 'Mamata Banerjee', party: 'AITC', votes: 12615, percentage: 44.0 },
        { name: 'Suvendu Adhikari', party: 'BJP', votes: 10005, percentage: 34.9 },
        { name: 'Adhir Ranjan Chowdhury', party: 'Congress', votes: 6080, percentage: 21.1 }
      ]
    }
  };

  const currentStateData = stateData[adminState as keyof typeof stateData] || stateData['Maharashtra'];
  const winningCandidate = currentStateData.candidates[0];

  const participationData = [
    { name: 'Voted', value: currentStateData.votedCount, color: '#3b82f6' },
    { name: 'Not Voted', value: currentStateData.totalVoters - currentStateData.votedCount, color: '#e5e7eb' }
  ];

  // District-wise data for the state
  const districtData = [
    { district: 'District 1', votes: Math.floor(currentStateData.votedCount * 0.25) },
    { district: 'District 2', votes: Math.floor(currentStateData.votedCount * 0.20) },
    { district: 'District 3', votes: Math.floor(currentStateData.votedCount * 0.18) },
    { district: 'District 4', votes: Math.floor(currentStateData.votedCount * 0.15) },
    { district: 'Others', votes: Math.floor(currentStateData.votedCount * 0.22) }
  ];

  const electionStats = [
    { title: 'Total Registered Voters', value: currentStateData.totalVoters.toLocaleString(), icon: Users, color: 'blue' },
    { title: 'Votes Cast', value: currentStateData.votedCount.toLocaleString(), icon: BarChart3, color: 'green' },
    { title: 'Participation Rate', value: `${currentStateData.participationRate}%`, icon: Activity, color: 'purple' },
    { title: 'Security Status', value: 'Secure', icon: Shield, color: 'emerald' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-blue-600 rounded-lg">
                <Shield className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">{adminState} Admin Dashboard</h1>
                <p className="text-sm text-gray-600">State Election Commission - {adminState}</p>
              </div>
              <div className="flex items-center">
                <MapPin className="h-4 w-4 text-gray-500 mr-1" />
                <span className="text-sm text-gray-600">{adminState}</span>
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
        {/* State Winner Alert */}
        <Card className="mb-8 bg-gradient-to-r from-green-50 to-emerald-50 border-green-200">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <Trophy className="h-12 w-12 text-yellow-500" />
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">Leading in {adminState}</h3>
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
          {/* State Results */}
          <Card>
            <CardHeader>
              <CardTitle>{adminState} Election Results</CardTitle>
              <CardDescription>Vote breakdown for {adminState}</CardDescription>
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

          {/* District-wise Breakdown */}
          <Card>
            <CardHeader>
              <CardTitle>District-wise Votes</CardTitle>
              <CardDescription>Vote distribution across {adminState} districts</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={districtData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="district" tick={{ fontSize: 12 }} />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="votes" fill="#10b981" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Participation Overview */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>{adminState} Voter Participation</CardTitle>
            <CardDescription>Detailed participation breakdown</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
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
              
              <div className="space-y-4">
                <div className="flex justify-between items-center p-3 bg-blue-50 rounded">
                  <span className="font-medium">Participation Rate</span>
                  <span className="text-lg font-bold text-blue-600">{currentStateData.participationRate}%</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-green-50 rounded">
                  <span className="font-medium">Total Votes Cast</span>
                  <span className="text-lg font-bold text-green-600">
                    {currentStateData.votedCount.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                  <span className="font-medium">Remaining Voters</span>
                  <span className="text-lg font-bold text-gray-600">
                    {(currentStateData.totalVoters - currentStateData.votedCount).toLocaleString()}
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Security Status */}
        <Card className="bg-green-50 border-green-200">
          <CardContent className="pt-6">
            <div className="flex items-center justify-center space-x-3 text-green-800">
              <Shield className="h-8 w-8" />
              <div className="text-center">
                <h3 className="text-lg font-semibold">{adminState} Security Status: SECURE</h3>
                <p className="text-sm">All voting systems in {adminState} are operational. Real-time monitoring active.</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;
