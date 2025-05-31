
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { LogOut, Clock, CheckCircle, Users, Trophy } from 'lucide-react';
import ElectionCard from './ElectionCard';
import VotingBooth from './VotingBooth';

interface VotingDashboardProps {
  onLogout: () => void;
}

const VotingDashboard = ({ onLogout }: VotingDashboardProps) => {
  const [selectedElection, setSelectedElection] = useState<string | null>(null);
  const [completedVotes, setCompletedVotes] = useState<Set<string>>(new Set());

  const elections = [
    {
      id: 'presidential',
      title: 'Presidential Election 2024',
      description: 'Vote for the next President of the United States',
      candidates: [
        { id: 'candidate1', name: 'Alex Johnson', party: 'Democratic Party', image: '🇺🇸' },
        { id: 'candidate2', name: 'Sarah Williams', party: 'Republican Party', image: '🦅' },
        { id: 'candidate3', name: 'Michael Chen', party: 'Independent', image: '⭐' }
      ],
      deadline: '2024-11-05',
      category: 'Federal'
    },
    {
      id: 'congressional',
      title: 'Congressional District 5',
      description: 'Choose your representative in Congress',
      candidates: [
        { id: 'candidate4', name: 'Jennifer Davis', party: 'Democratic Party', image: '🏛️' },
        { id: 'candidate5', name: 'Robert Martinez', party: 'Republican Party', image: '🇺🇸' }
      ],
      deadline: '2024-11-05',
      category: 'Federal'
    },
    {
      id: 'mayor',
      title: 'Mayor Election',
      description: 'Select your city mayor',
      candidates: [
        { id: 'candidate6', name: 'Lisa Thompson', party: 'Democratic Party', image: '🏙️' },
        { id: 'candidate7', name: 'David Kim', party: 'Republican Party', image: '🌆' },
        { id: 'candidate8', name: 'Maria Rodriguez', party: 'Independent', image: '🌟' }
      ],
      deadline: '2024-11-12',
      category: 'Local'
    }
  ];

  const handleVoteComplete = (electionId: string) => {
    setCompletedVotes(new Set([...completedVotes, electionId]));
    setSelectedElection(null);
  };

  if (selectedElection) {
    const election = elections.find(e => e.id === selectedElection)!;
    return (
      <VotingBooth
        election={election}
        onVoteComplete={() => handleVoteComplete(selectedElection)}
        onBack={() => setSelectedElection(null)}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-blue-600 rounded-lg">
                <Users className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Voter Dashboard</h1>
                <p className="text-sm text-gray-600">Voter ID: #VT2024-001</p>
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
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Elections</p>
                  <p className="text-2xl font-bold text-gray-900">{elections.length}</p>
                </div>
                <Trophy className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Votes Cast</p>
                  <p className="text-2xl font-bold text-green-600">{completedVotes.size}</p>
                </div>
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Pending</p>
                  <p className="text-2xl font-bold text-orange-600">{elections.length - completedVotes.size}</p>
                </div>
                <Clock className="h-8 w-8 text-orange-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Elections List */}
        <div className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Available Elections</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {elections.map((election) => (
                <ElectionCard
                  key={election.id}
                  election={election}
                  isCompleted={completedVotes.has(election.id)}
                  onVote={() => setSelectedElection(election.id)}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Voting Status */}
        {completedVotes.size === elections.length && (
          <Card className="mt-8 bg-green-50 border-green-200">
            <CardContent className="pt-6">
              <div className="flex items-center justify-center space-x-3 text-green-800">
                <CheckCircle className="h-8 w-8" />
                <div className="text-center">
                  <h3 className="text-lg font-semibold">All Votes Cast Successfully!</h3>
                  <p className="text-sm">Thank you for participating in the democratic process.</p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default VotingDashboard;
