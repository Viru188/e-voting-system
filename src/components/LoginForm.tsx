
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Shield, Vote, CheckCircle } from 'lucide-react';

interface LoginFormProps {
  onLogin: (role: string) => void;
}

const LoginForm = ({ onLogin }: LoginFormProps) => {
  const [voterId, setVoterId] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simple demo logic
    if (voterId === 'admin' && password === 'admin') {
      onLogin('admin');
    } else {
      onLogin('voter');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8">
        {/* Header */}
        <div className="text-center">
          <div className="flex justify-center mb-4">
            <div className="p-3 bg-blue-600 rounded-full">
              <Vote className="h-8 w-8 text-white" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-gray-900">E-Voting System</h1>
          <p className="text-gray-600 mt-2">Secure • Transparent • Democratic</p>
        </div>

        {/* Login Card */}
        <Card className="shadow-xl border-0 bg-white/80 backdrop-blur">
          <CardHeader>
            <CardTitle className="text-xl text-center">Voter Login</CardTitle>
            <CardDescription className="text-center">
              Enter your credentials to access the voting system
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="voterId">Voter ID</Label>
                <Input
                  id="voterId"
                  type="text"
                  placeholder="Enter your voter ID"
                  value={voterId}
                  onChange={(e) => setVoterId(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">
                <Shield className="mr-2 h-4 w-4" />
                Secure Login
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Demo Info */}
        <Card className="bg-blue-50 border-blue-200">
          <CardContent className="pt-6">
            <div className="text-center text-sm text-blue-800">
              <h3 className="font-semibold mb-2">Demo Credentials</h3>
              <p>Voter: Any ID + Any Password</p>
              <p>Admin: admin + admin</p>
            </div>
          </CardContent>
        </Card>

        {/* Security Features */}
        <div className="grid grid-cols-3 gap-4 text-center">
          <div className="flex flex-col items-center space-y-2">
            <Shield className="h-6 w-6 text-blue-600" />
            <span className="text-xs text-gray-600">Secure</span>
          </div>
          <div className="flex flex-col items-center space-y-2">
            <CheckCircle className="h-6 w-6 text-green-600" />
            <span className="text-xs text-gray-600">Verified</span>
          </div>
          <div className="flex flex-col items-center space-y-2">
            <Vote className="h-6 w-6 text-purple-600" />
            <span className="text-xs text-gray-600">Anonymous</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
