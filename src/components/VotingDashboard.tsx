
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { LogOut, Clock, CheckCircle, Users, Trophy, MapPin } from 'lucide-react';
import ElectionCard from './ElectionCard';
import VotingBooth from './VotingBooth';

interface VotingDashboardProps {
  onLogout: () => void;
  userState: string;
}

const VotingDashboard = ({ onLogout, userState }: VotingDashboardProps) => {
  const [selectedElection, setSelectedElection] = useState<string | null>(null);
  const [completedVotes, setCompletedVotes] = useState<Set<string>>(new Set());

  // State-specific elections and candidates
  const stateElections = {
    'Maharashtra': {
      state_assembly: {
        id: 'maharashtra_assembly',
        title: 'Maharashtra Legislative Assembly',
        description: 'Vote for your MLA representative',
        candidates: [
          { id: 'candidate1', name: 'Eknath Shinde', party: 'Shiv Sena', image: '🏛️' },
          { id: 'candidate2', name: 'Uddhav Thackeray', party: 'Shiv Sena (UBT)', image: '🦁' },
          { id: 'candidate3', name: 'Devendra Fadnavis', party: 'BJP', image: '🚩' }
        ],
        deadline: '2024-11-15',
        category: 'State'
      }
    },
    'Uttar Pradesh': {
      state_assembly: {
        id: 'up_assembly',
        title: 'Uttar Pradesh Legislative Assembly',
        description: 'Vote for your MLA representative',
        candidates: [
          { id: 'candidate1', name: 'Yogi Adityanath', party: 'BJP', image: '🚩' },
          { id: 'candidate2', name: 'Akhilesh Yadav', party: 'Samajwadi Party', image: '🚴' },
          { id: 'candidate3', name: 'Mayawati', party: 'BSP', image: '🐘' }
        ],
        deadline: '2024-11-15',
        category: 'State'
      }
    },
    'Tamil Nadu': {
      state_assembly: {
        id: 'tn_assembly',
        title: 'Tamil Nadu Legislative Assembly',
        description: 'Vote for your MLA representative',
        candidates: [
          { id: 'candidate1', name: 'M. K. Stalin', party: 'DMK', image: '🌅' },
          { id: 'candidate2', name: 'Edappadi K. Palaniswami', party: 'AIADMK', image: '🌿' },
          { id: 'candidate3', name: 'Annamalai', party: 'BJP', image: '🚩' }
        ],
        deadline: '2024-11-15',
        category: 'State'
      }
    },
    'Gujarat': {
      state_assembly: {
        id: 'gujarat_assembly',
        title: 'Gujarat Legislative Assembly',
        description: 'Vote for your MLA representative',
        candidates: [
          { id: 'candidate1', name: 'Bhupendra Patel', party: 'BJP', image: '🚩' },
          { id: 'candidate2', name: 'Bharatsinh Solanki', party: 'Congress', image: '✋' },
          { id: 'candidate3', name: 'Isudan Gadhvi', party: 'AAP', image: '🧹' }
        ],
        deadline: '2024-11-15',
        category: 'State'
      }
    },
    'West Bengal': {
      state_assembly: {
        id: 'wb_assembly',
        title: 'West Bengal Legislative Assembly',
        description: 'Vote for your MLA representative',
        candidates: [
          { id: 'candidate1', name: 'Mamata Banerjee', party: 'AITC', image: '🌸' },
          { id: 'candidate2', name: 'Suvendu Adhikari', party: 'BJP', image: '🚩' },
          { id: 'candidate3', name: 'Adhir Ranjan Chowdhury', party: 'Congress', image: '✋' }
        ],
        deadline: '2024-11-15',
        category: 'State'
      }
    }
  };

  // Common elections available in all states
  const commonElections = [
    {
      id: 'lok_sabha',
      title: 'Lok Sabha Election',
      description: 'Vote for your Member of Parliament',
      candidates: [
        { id: 'candidate_ls1', name: 'National Candidate 1', party: 'BJP', image: '🏛️' },
        { id: 'candidate_ls2', name: 'National Candidate 2', party: 'Congress', image: '✋' },
        { id: 'candidate_ls3', name: 'National Candidate 3', party: 'AAP', image: '🧹' }
      ],
      deadline: '2024-11-05',
      category: 'Federal'
    }
  ];

  // Get state-specific elections
  const stateSpecificElections = stateElections[userState as keyof typeof stateElections] 
    ? [stateElections[userState as keyof typeof stateElections].state_assembly]
    : [];

  const allElections = [...commonElections, ...stateSpecificElections];

  const handleVoteComplete = (electionId: string) => {
    setCompletedVotes(new Set([...completedVotes, electionId]));
    setSelectedElection(null);
  };

  if (selectedElection) {
    const election = allElections.find(e => e.id === selectedElection)!;
    return (
      <VotingBooth
        election={election}
        onVoteComplete={() => handleVoteComplete(selectedElection)}
        onBack={() => setSelectedElection(null)}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-blue-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-orange-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-orange-600 rounded-lg">
                <Users className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Voter Dashboard</h1>
                <p className="text-sm text-gray-600">Registered State: {userState}</p>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4 text-gray-500" />
                <span className="text-sm text-gray-600">{userState}</span>
                <span className="text-lg">🇮🇳</span>
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
                  <p className="text-sm font-medium text-gray-600">Available Elections</p>
                  <p className="text-2xl font-bold text-gray-900">{allElections.length}</p>
                </div>
                <Trophy className="h-8 w-8 text-orange-600" />
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
                  <p className="text-2xl font-bold text-blue-600">{allElections.length - completedVotes.size}</p>
                </div>
                <Clock className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* State Information */}
        <Card className="mb-8 bg-gradient-to-r from-orange-50 to-blue-50 border-orange-200">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <MapPin className="h-8 w-8 text-orange-600" />
                <div>
                  <h3 className="text-lg font-bold text-gray-900">Voting in {userState}</h3>
                  <p className="text-sm text-gray-600">
                    You are eligible to vote in {userState} state elections and national elections
                  </p>
                </div>
              </div>
              <Badge className="bg-orange-600 text-white px-3 py-1">
                {userState}
              </Badge>
            </div>
          </CardContent>
        </Card>

        {/* Elections List */}
        <div className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Available Elections</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {allElections.map((election) => (
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
        {completedVotes.size === allElections.length && (
          <Card className="mt-8 bg-green-50 border-green-200">
            <CardContent className="pt-6">
              <div className="flex items-center justify-center space-x-3 text-green-800">
                <CheckCircle className="h-8 w-8" />
                <div className="text-center">
                  <h3 className="text-lg font-semibold">All Votes Cast Successfully!</h3>
                  <p className="text-sm">Thank you for participating in the democratic process of India. 🇮🇳</p>
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
