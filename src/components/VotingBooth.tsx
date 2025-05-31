
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Vote, Shield, CheckCircle } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface Candidate {
  id: string;
  name: string;
  party: string;
  image: string;
}

interface Election {
  id: string;
  title: string;
  description: string;
  candidates: Candidate[];
  deadline: string;
  category: string;
}

interface VotingBoothProps {
  election: Election;
  onVoteComplete: () => void;
  onBack: () => void;
}

const VotingBooth = ({ election, onVoteComplete, onBack }: VotingBoothProps) => {
  const [selectedCandidate, setSelectedCandidate] = useState<string | null>(null);
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleCastVote = () => {
    if (!selectedCandidate) {
      toast({
        title: "No candidate selected",
        description: "Please select a candidate before casting your vote.",
        variant: "destructive"
      });
      return;
    }
    setShowConfirmation(true);
  };

  const confirmVote = () => {
    toast({
      title: "Vote Cast Successfully!",
      description: "Your vote has been recorded securely and anonymously.",
    });
    onVoteComplete();
  };

  if (showConfirmation) {
    const candidate = election.candidates.find(c => c.id === selectedCandidate)!;
    
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <Card className="w-full max-w-md shadow-xl">
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              <div className="p-3 bg-green-100 rounded-full">
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
            </div>
            <CardTitle className="text-xl">Confirm Your Vote</CardTitle>
            <CardDescription>
              Please review your selection before final submission
            </CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-6">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <h3 className="font-semibold text-gray-900">{election.title}</h3>
              <div className="mt-3 p-3 bg-white rounded border">
                <div className="text-2xl mb-2">{candidate.image}</div>
                <div className="font-semibold">{candidate.name}</div>
                <div className="text-sm text-gray-600">{candidate.party}</div>
              </div>
            </div>

            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <div className="flex items-center space-x-2 text-yellow-800 text-sm">
                <Shield className="h-4 w-4" />
                <span className="font-medium">Security Notice</span>
              </div>
              <p className="text-yellow-700 text-sm mt-1">
                This action cannot be undone. Your vote will be encrypted and stored securely.
              </p>
            </div>

            <div className="flex space-x-3">
              <Button 
                variant="outline" 
                onClick={() => setShowConfirmation(false)}
                className="flex-1"
              >
                Go Back
              </Button>
              <Button 
                onClick={confirmVote}
                className="flex-1 bg-green-600 hover:bg-green-700"
              >
                <Vote className="mr-2 h-4 w-4" />
                Submit Vote
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center py-4">
            <Button 
              variant="ghost" 
              onClick={onBack}
              className="mr-4"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back
            </Button>
            <div className="flex items-center space-x-3">
              <Shield className="h-6 w-6 text-blue-600" />
              <div>
                <h1 className="text-xl font-bold text-gray-900">Secure Voting Booth</h1>
                <p className="text-sm text-gray-600">Your vote is private and encrypted</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Election Info */}
        <Card className="mb-8">
          <CardHeader>
            <div className="flex justify-between items-start">
              <div>
                <CardTitle className="text-2xl">{election.title}</CardTitle>
                <CardDescription className="text-lg mt-2">{election.description}</CardDescription>
              </div>
              <Badge variant={election.category === 'Federal' ? 'default' : 'secondary'} className="text-sm">
                {election.category}
              </Badge>
            </div>
          </CardHeader>
        </Card>

        {/* Instructions */}
        <Card className="mb-8 bg-blue-50 border-blue-200">
          <CardContent className="pt-6">
            <div className="flex items-start space-x-3">
              <Vote className="h-6 w-6 text-blue-600 mt-1" />
              <div>
                <h3 className="font-semibold text-blue-900">Voting Instructions</h3>
                <p className="text-blue-800 text-sm mt-1">
                  Select one candidate by clicking on their card. Review your choice and click "Cast Vote" to submit.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Candidates */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {election.candidates.map((candidate) => (
            <Card
              key={candidate.id}
              className={`cursor-pointer transition-all duration-200 hover:shadow-lg ${
                selectedCandidate === candidate.id
                  ? 'ring-2 ring-blue-500 bg-blue-50 border-blue-300'
                  : 'hover:shadow-xl'
              }`}
              onClick={() => setSelectedCandidate(candidate.id)}
            >
              <CardContent className="pt-6">
                <div className="text-center space-y-4">
                  <div className="text-6xl">{candidate.image}</div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">{candidate.name}</h3>
                    <p className="text-gray-600">{candidate.party}</p>
                  </div>
                  
                  {selectedCandidate === candidate.id && (
                    <div className="flex items-center justify-center space-x-2 text-blue-600">
                      <CheckCircle className="h-5 w-5" />
                      <span className="font-medium">Selected</span>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Vote Button */}
        <div className="flex justify-center">
          <Button
            onClick={handleCastVote}
            disabled={!selectedCandidate}
            className="px-8 py-3 text-lg bg-blue-600 hover:bg-blue-700 disabled:opacity-50"
          >
            <Vote className="mr-2 h-5 w-5" />
            Cast Your Vote
          </Button>
        </div>
      </div>
    </div>
  );
};

export default VotingBooth;
