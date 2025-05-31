
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { LogOut, Crown, BarChart3, Shield, Activity, Trophy, TrendingUp, MapPin, Users, Vote } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';

interface MasterAdminDashboardProps {
  onLogout: () => void;
}

const MasterAdminDashboard = ({ onLogout }: MasterAdminDashboardProps) => {
  const [selectedState, setSelectedState] = useState('All States');

  // Indian parties and their leaders by state
  const stateParties = {
    'Maharashtra': [
      { name: 'Eknath Shinde', party: 'Shiv Sena', votes: 14175, percentage: 45.0 },
      { name: 'Uddhav Thackeray', party: 'Shiv Sena (UBT)', votes: 11025, percentage: 35.0 },
      { name: 'Devendra Fadnavis', party: 'BJP', votes: 6300, percentage: 20.0 }
    ],
    'Uttar Pradesh': [
      { name: 'Yogi Adityanath', party: 'BJP', votes: 24526, percentage: 42.7 },
      { name: 'Akhilesh Yadav', party: 'Samajwadi Party', votes: 20148, percentage: 35.1 },
      { name: 'Mayawati', party: 'BSP', votes: 12726, percentage: 22.2 }
    ],
    'Tamil Nadu': [
      { name: 'M. K. Stalin', party: 'DMK', votes: 11970, percentage: 45.0 },
      { name: 'Edappadi K. Palaniswami', party: 'AIADMK', votes: 10640, percentage: 40.0 },
      { name: 'Annamalai', party: 'BJP', votes: 3990, percentage: 15.0 }
    ],
    'Gujarat': [
      { name: 'Bhupendra Patel', party: 'BJP', votes: 9800, percentage: 50.0 },
      { name: 'Bharatsinh Solanki', party: 'Congress', votes: 6860, percentage: 35.0 },
      { name: 'Isudan Gadhvi', party: 'AAP', votes: 2940, percentage: 15.0 }
    ],
    'West Bengal': [
      { name: 'Mamata Banerjee', party: 'AITC', votes: 12615, percentage: 44.0 },
      { name: 'Suvendu Adhikari', party: 'BJP', votes: 10005, percentage: 34.9 },
      { name: 'Adhir Ranjan Chowdhury', party: 'Congress', votes: 6080, percentage: 21.1 }
    ]
  };

  // All Indian states with voting data
  const allStatesData = [
    { state: 'Maharashtra', totalVoters: 45000, votedCount: 31500, participationRate: 70.0, leadingParty: 'Shiv Sena' },
    { state: 'Uttar Pradesh', totalVoters: 82000, votedCount: 57400, participationRate: 70.0, leadingParty: 'BJP' },
    { state: 'Tamil Nadu', totalVoters: 38000, votedCount: 26600, participationRate: 70.0, leadingParty: 'DMK' },
    { state: 'Gujarat', totalVoters: 28000, votedCount: 19600, participationRate: 70.0, leadingParty: 'BJP' },
    { state: 'West Bengal', totalVoters: 41000, votedCount: 28700, participationRate: 70.0, leadingParty: 'AITC' },
    { state: 'Karnataka', totalVoters: 35000, votedCount: 24500, participationRate: 70.0, leadingParty: 'Congress' },
    { state: 'Rajasthan', totalVoters: 32000, votedCount: 22400, participationRate: 70.0, leadingParty: 'Congress' },
    { state: 'Andhra Pradesh', totalVoters: 29000, votedCount: 20300, participationRate: 70.0, leadingParty: 'YSRCP' },
    { state: 'Kerala', totalVoters: 18000, votedCount: 12600, participationRate: 70.0, leadingParty: 'LDF' },
    { state: 'Punjab', totalVoters: 15000, votedCount: 10500, participationRate: 70.0, leadingParty: 'AAP' }
  ];

  // National party-wise seats
  const nationalResults = [
    { party: 'BJP', seats: 156, color: '#FF9933' },
    { party: 'Congress', seats: 89, color: '#19AAED' },
    { party: 'AITC', seats: 42, color: '#20C997' },
    { party: 'DMK', seats: 38, color: '#DC3545' },
    { party: 'Shiv Sena', seats: 28, color: '#FFC107' },
    { party: 'Others', seats: 190, color: '#6C757D' }
  ];

  const totalSeats = nationalResults.reduce((sum, party) => sum + party.seats, 0);
  const winningParty = nationalResults[0];

  // Get current state data
  const currentStateData = selectedState === 'All States' 
    ? allStatesData 
    : allStatesData.filter(state => state.state === selectedState);

  const statesList = ['All States', ...allStatesData.map(state => state.state)];

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-orange-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-red-600 rounded-lg">
                <Crown className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Master Admin Dashboard</h1>
                <p className="text-sm text-gray-600">Election Commission of India - National Overview</p>
              </div>
              <div className="text-2xl">🇮🇳</div>
            </div>
            <Button variant="outline" onClick={onLogout} className="hover:bg-red-50">
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* National Winner Alert */}
        <Card className="mb-8 bg-gradient-to-r from-orange-50 to-red-50 border-orange-200">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <Trophy className="h-12 w-12 text-yellow-500" />
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">National Election Results</h3>
                  <p className="text-lg text-gray-700">{winningParty.party} leads with {winningParty.seats} seats</p>
                  <p className="text-sm text-gray-600">
                    Out of {totalSeats} total seats ({((winningParty.seats / totalSeats) * 100).toFixed(1)}%)
                  </p>
                </div>
              </div>
              <Badge className="bg-orange-600 text-white text-lg px-4 py-2">
                Leading Party
              </Badge>
            </div>
          </CardContent>
        </Card>

        {/* State Selector */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="h-5 w-5" />
              State-wise Analysis
            </CardTitle>
            <CardDescription>Select a state for detailed analysis or view all states</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-4">
              <label className="text-sm font-medium text-gray-700">Select State:</label>
              <Select value={selectedState} onValueChange={setSelectedState}>
                <SelectTrigger className="w-64">
                  <SelectValue placeholder="Choose a state" />
                </SelectTrigger>
                <SelectContent>
                  {statesList.map((state) => (
                    <SelectItem key={state} value={state}>
                      {state}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* National Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total States</p>
                  <p className="text-2xl font-bold text-gray-900">{allStatesData.length}</p>
                </div>
                <MapPin className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Voters</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {allStatesData.reduce((sum, state) => sum + state.totalVoters, 0).toLocaleString()}
                  </p>
                </div>
                <Users className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Votes Cast</p>
                  <p className="text-2xl font-bold text-blue-600">
                    {allStatesData.reduce((sum, state) => sum + state.votedCount, 0).toLocaleString()}
                  </p>
                </div>
                <Vote className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Avg Participation</p>
                  <p className="text-2xl font-bold text-purple-600">70.0%</p>
                </div>
                <Activity className="h-8 w-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* National Party Results */}
          <Card>
            <CardHeader>
              <CardTitle>National Party-wise Results</CardTitle>
              <CardDescription>Seat distribution across India</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={nationalResults}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    dataKey="seats"
                    label={({ party, seats }) => `${party}: ${seats}`}
                  >
                    {nationalResults.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
              
              <div className="mt-4 space-y-2">
                {nationalResults.map((party, index) => (
                  <div key={index} className="flex justify-between items-center p-2 rounded" 
                       style={{ backgroundColor: party.color + '20' }}>
                    <span className="font-medium">{party.party}</span>
                    <Badge style={{ backgroundColor: party.color }}>
                      {party.seats} seats
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* State-wise Participation */}
          <Card>
            <CardHeader>
              <CardTitle>State-wise Voter Participation</CardTitle>
              <CardDescription>Participation rates across Indian states</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={selectedState === 'All States' ? allStatesData.slice(0, 6) : currentStateData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="state" tick={{ fontSize: 10 }} />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="participationRate" fill="#f97316" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* State-wise Details Table */}
        {selectedState === 'All States' && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>State-wise Election Summary</CardTitle>
              <CardDescription>Comprehensive overview of all states</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-3">State</th>
                      <th className="text-left p-3">Total Voters</th>
                      <th className="text-left p-3">Votes Cast</th>
                      <th className="text-left p-3">Participation</th>
                      <th className="text-left p-3">Leading Party</th>
                    </tr>
                  </thead>
                  <tbody>
                    {allStatesData.map((state, index) => (
                      <tr key={index} className="border-b hover:bg-gray-50">
                        <td className="p-3 font-medium">{state.state}</td>
                        <td className="p-3">{state.totalVoters.toLocaleString()}</td>
                        <td className="p-3">{state.votedCount.toLocaleString()}</td>
                        <td className="p-3">
                          <Badge variant={state.participationRate >= 70 ? "default" : "outline"}>
                            {state.participationRate}%
                          </Badge>
                        </td>
                        <td className="p-3">
                          <Badge className="bg-orange-100 text-orange-800">
                            {state.leadingParty}
                          </Badge>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Individual State Results */}
        {selectedState !== 'All States' && stateParties[selectedState as keyof typeof stateParties] && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>{selectedState} - Detailed Results</CardTitle>
              <CardDescription>Party leaders and vote breakdown</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {stateParties[selectedState as keyof typeof stateParties].map((candidate, index) => (
                  <div key={index} className="flex justify-between items-center p-4 border rounded-lg">
                    <div>
                      <h4 className="font-semibold text-lg">{candidate.name}</h4>
                      <p className="text-gray-600">{candidate.party}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold">{candidate.votes.toLocaleString()} votes</p>
                      <Badge variant={index === 0 ? "default" : "outline"}>
                        {candidate.percentage}%
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Security Status */}
        <Card className="bg-green-50 border-green-200">
          <CardContent className="pt-6">
            <div className="flex items-center justify-center space-x-3 text-green-800">
              <Shield className="h-8 w-8" />
              <div className="text-center">
                <h3 className="text-lg font-semibold">National Election Security: SECURE</h3>
                <p className="text-sm">All state systems operational. Real-time monitoring active across India.</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default MasterAdminDashboard;
