
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, Users, CheckCircle, Vote } from 'lucide-react';

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

interface ElectionCardProps {
  election: Election;
  isCompleted: boolean;
  onVote: () => void;
}

const ElectionCard = ({ election, isCompleted, onVote }: ElectionCardProps) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <Card className={`transition-all duration-200 hover:shadow-lg ${
      isCompleted ? 'bg-green-50 border-green-200' : 'hover:shadow-xl border-gray-200'
    }`}>
      <CardHeader>
        <div className="flex justify-between items-start">
          <div className="space-y-1">
            <CardTitle className="text-lg">{election.title}</CardTitle>
            <CardDescription>{election.description}</CardDescription>
          </div>
          <Badge variant={election.category === 'Federal' ? 'default' : 'secondary'}>
            {election.category}
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* Candidates Preview */}
        <div className="space-y-2">
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <Users className="h-4 w-4" />
            <span>{election.candidates.length} Candidates</span>
          </div>
          <div className="flex -space-x-2">
            {election.candidates.slice(0, 3).map((candidate, index) => (
              <div
                key={candidate.id}
                className="w-8 h-8 rounded-full bg-gray-100 border-2 border-white flex items-center justify-center text-sm"
                title={candidate.name}
              >
                {candidate.image}
              </div>
            ))}
            {election.candidates.length > 3 && (
              <div className="w-8 h-8 rounded-full bg-gray-200 border-2 border-white flex items-center justify-center text-xs text-gray-600">
                +{election.candidates.length - 3}
              </div>
            )}
          </div>
        </div>

        {/* Deadline */}
        <div className="flex items-center space-x-2 text-sm text-gray-600">
          <Calendar className="h-4 w-4" />
          <span>Deadline: {formatDate(election.deadline)}</span>
        </div>

        {/* Action Button */}
        <div className="pt-2">
          {isCompleted ? (
            <div className="flex items-center justify-center space-x-2 py-2 text-green-700">
              <CheckCircle className="h-5 w-5" />
              <span className="font-medium">Vote Submitted</span>
            </div>
          ) : (
            <Button 
              onClick={onVote} 
              className="w-full bg-blue-600 hover:bg-blue-700"
            >
              <Vote className="mr-2 h-4 w-4" />
              Cast Your Vote
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ElectionCard;
