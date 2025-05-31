
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Shield, Vote, CheckCircle, BarChart3 } from 'lucide-react';

interface LoginFormProps {
  onLogin: (role: string) => void;
}

const LoginForm = ({ onLogin }: LoginFormProps) => {
  const [voterData, setVoterData] = useState({ id: '', password: '' });
  const [adminData, setAdminData] = useState({ username: '', password: '' });

  const handleVoterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin('voter');
  };

  const handleAdminSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (adminData.username === 'admin' && adminData.password === 'admin123') {
      onLogin('admin');
    } else {
      alert('Invalid admin credentials');
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

        {/* Login Tabs */}
        <Card className="shadow-xl border-0 bg-white/80 backdrop-blur">
          <CardHeader>
            <CardTitle className="text-xl text-center">Login Portal</CardTitle>
            <CardDescription className="text-center">
              Choose your access level
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="voter" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="voter" className="flex items-center gap-2">
                  <Vote className="h-4 w-4" />
                  Voter
                </TabsTrigger>
                <TabsTrigger value="admin" className="flex items-center gap-2">
                  <BarChart3 className="h-4 w-4" />
                  Admin
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="voter" className="space-y-4">
                <form onSubmit={handleVoterSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="voterId">Voter ID</Label>
                    <Input
                      id="voterId"
                      type="text"
                      placeholder="Enter your voter ID"
                      value={voterData.id}
                      onChange={(e) => setVoterData({...voterData, id: e.target.value})}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="voterPassword">Password</Label>
                    <Input
                      id="voterPassword"
                      type="password"
                      placeholder="Enter your password"
                      value={voterData.password}
                      onChange={(e) => setVoterData({...voterData, password: e.target.value})}
                      required
                    />
                  </div>
                  <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">
                    <Shield className="mr-2 h-4 w-4" />
                    Voter Login
                  </Button>
                </form>
                <div className="text-center text-xs text-gray-600">
                  <p>Demo: Any ID + Any Password</p>
                </div>
              </TabsContent>
              
              <TabsContent value="admin" className="space-y-4">
                <form onSubmit={handleAdminSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="adminUsername">Admin Username</Label>
                    <Input
                      id="adminUsername"
                      type="text"
                      placeholder="Enter admin username"
                      value={adminData.username}
                      onChange={(e) => setAdminData({...adminData, username: e.target.value})}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="adminPassword">Admin Password</Label>
                    <Input
                      id="adminPassword"
                      type="password"
                      placeholder="Enter admin password"
                      value={adminData.password}
                      onChange={(e) => setAdminData({...adminData, password: e.target.value})}
                      required
                    />
                  </div>
                  <Button type="submit" className="w-full bg-red-600 hover:bg-red-700">
                    <BarChart3 className="mr-2 h-4 w-4" />
                    Admin Access
                  </Button>
                </form>
                <div className="text-center text-xs text-gray-600">
                  <p>Demo: admin + admin123</p>
                </div>
              </TabsContent>
            </Tabs>
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
