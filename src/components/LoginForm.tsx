
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Shield, Vote, CheckCircle, BarChart3, Users, Crown } from 'lucide-react';

interface LoginFormProps {
  onLogin: (role: string, state?: string) => void;
}

// Indian state codes for ID verification
const stateCodesMap: { [key: string]: string } = {
  '01': 'Jammu and Kashmir', '02': 'Himachal Pradesh', '03': 'Punjab', '04': 'Chandigarh',
  '05': 'Uttarakhand', '06': 'Haryana', '07': 'Delhi', '08': 'Rajasthan',
  '09': 'Uttar Pradesh', '10': 'Bihar', '11': 'Sikkim', '12': 'Arunachal Pradesh',
  '13': 'Nagaland', '14': 'Manipur', '15': 'Mizoram', '16': 'Tripura',
  '17': 'Meghalaya', '18': 'Assam', '19': 'West Bengal', '20': 'Jharkhand',
  '21': 'Odisha', '22': 'Chhattisgarh', '23': 'Madhya Pradesh', '24': 'Gujarat',
  '25': 'Daman and Diu', '26': 'Dadra and Nagar Haveli', '27': 'Maharashtra',
  '28': 'Andhra Pradesh', '29': 'Karnataka', '30': 'Goa', '31': 'Lakshadweep',
  '32': 'Kerala', '33': 'Tamil Nadu', '34': 'Puducherry', '35': 'Andaman and Nicobar Islands',
  '36': 'Telangana', '37': 'Andhra Pradesh'
};

const indianStates = Object.values(stateCodesMap).filter((v, i, a) => a.indexOf(v) === i).sort();

const LoginForm = ({ onLogin }: LoginFormProps) => {
  const [voterData, setVoterData] = useState({ epicId: '', mobile: '' });
  const [adminData, setAdminData] = useState({ adminId: '', password: '', state: '' });
  const [masterAdminData, setMasterAdminData] = useState({ username: '', password: '' });
  const [voterState, setVoterState] = useState<string>('');

  // Function to extract state from EPIC ID (first 2 digits)
  const getStateFromEpicId = (epicId: string): string => {
    if (epicId.length >= 2) {
      const stateCode = epicId.substring(0, 2);
      return stateCodesMap[stateCode] || '';
    }
    return '';
  };

  const handleVoterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (voterData.epicId.length < 10) {
      alert('Please enter a valid EPIC ID (minimum 10 characters)');
      return;
    }
    if (voterData.mobile.length !== 10) {
      alert('Please enter a valid 10-digit mobile number');
      return;
    }
    
    const detectedState = getStateFromEpicId(voterData.epicId);
    if (!detectedState) {
      alert('Invalid EPIC ID format. Please check your Voter ID.');
      return;
    }
    
    setVoterState(detectedState);
    onLogin('voter', detectedState);
  };

  const handleAdminSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!adminData.state) {
      alert('Please select your state');
      return;
    }
    
    // Demo state admin credentials
    const validAdmins = {
      'Maharashtra': { id: 'mh_admin', password: 'mh123' },
      'Uttar Pradesh': { id: 'up_admin', password: 'up123' },
      'Tamil Nadu': { id: 'tn_admin', password: 'tn123' },
      'Gujarat': { id: 'gj_admin', password: 'gj123' },
      'West Bengal': { id: 'wb_admin', password: 'wb123' }
    };
    
    const stateAdmin = validAdmins[adminData.state as keyof typeof validAdmins];
    if (stateAdmin && adminData.adminId === stateAdmin.id && adminData.password === stateAdmin.password) {
      onLogin('admin', adminData.state);
    } else {
      alert('Invalid state admin credentials');
    }
  };

  const handleMasterAdminSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (masterAdminData.username === 'master_admin' && masterAdminData.password === 'india2024') {
      onLogin('master_admin');
    } else {
      alert('Invalid master admin credentials');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8">
        {/* Header */}
        <div className="text-center">
          <div className="flex justify-center mb-4">
            <div className="p-3 bg-orange-600 rounded-full">
              <Vote className="h-8 w-8 text-white" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-gray-900">भारत E-Voting</h1>
          <p className="text-gray-600 mt-2">सुरक्षित • पारदर्शी • लोकतांत्रिक</p>
          <div className="flex justify-center mt-2">
            <span className="text-2xl">🇮🇳</span>
          </div>
        </div>

        {/* Login Tabs */}
        <Card className="shadow-xl border-0 bg-white/90 backdrop-blur">
          <CardHeader>
            <CardTitle className="text-xl text-center">Login Portal</CardTitle>
            <CardDescription className="text-center">
              Choose your access level
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="voter" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="voter" className="flex items-center gap-1">
                  <Vote className="h-3 w-3" />
                  Voter
                </TabsTrigger>
                <TabsTrigger value="admin" className="flex items-center gap-1">
                  <BarChart3 className="h-3 w-3" />
                  Admin
                </TabsTrigger>
                <TabsTrigger value="master" className="flex items-center gap-1">
                  <Crown className="h-3 w-3" />
                  Master
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="voter" className="space-y-4">
                <form onSubmit={handleVoterSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="epicId">EPIC ID (Voter ID)</Label>
                    <Input
                      id="epicId"
                      type="text"
                      placeholder="Enter your EPIC ID (e.g., ABC1234567)"
                      value={voterData.epicId}
                      onChange={(e) => {
                        setVoterData({...voterData, epicId: e.target.value.toUpperCase()});
                        const state = getStateFromEpicId(e.target.value);
                        if (state) setVoterState(state);
                      }}
                      required
                      maxLength={15}
                    />
                    {voterState && (
                      <p className="text-sm text-green-600">Detected State: {voterState}</p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="mobile">Mobile Number</Label>
                    <Input
                      id="mobile"
                      type="tel"
                      placeholder="Enter 10-digit mobile number"
                      value={voterData.mobile}
                      onChange={(e) => setVoterData({...voterData, mobile: e.target.value.replace(/\D/g, '')})}
                      required
                      maxLength={10}
                    />
                  </div>
                  <Button type="submit" className="w-full bg-orange-600 hover:bg-orange-700">
                    <Shield className="mr-2 h-4 w-4" />
                    Voter Login
                  </Button>
                </form>
                <div className="text-center text-xs text-gray-600">
                  <p>Demo: Use any EPIC ID starting with state code + 10-digit mobile</p>
                </div>
              </TabsContent>
              
              <TabsContent value="admin" className="space-y-4">
                <form onSubmit={handleAdminSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="adminState">Select Your State</Label>
                    <Select value={adminData.state} onValueChange={(value) => setAdminData({...adminData, state: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Choose your state" />
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
                  <div className="space-y-2">
                    <Label htmlFor="adminId">Admin ID</Label>
                    <Input
                      id="adminId"
                      type="text"
                      placeholder="Enter state admin ID"
                      value={adminData.adminId}
                      onChange={(e) => setAdminData({...adminData, adminId: e.target.value})}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="adminPassword">Password</Label>
                    <Input
                      id="adminPassword"
                      type="password"
                      placeholder="Enter admin password"
                      value={adminData.password}
                      onChange={(e) => setAdminData({...adminData, password: e.target.value})}
                      required
                    />
                  </div>
                  <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">
                    <BarChart3 className="mr-2 h-4 w-4" />
                    State Admin Access
                  </Button>
                </form>
                <div className="text-center text-xs text-gray-600">
                  <p>Demo: mh_admin/mh123 (Maharashtra), up_admin/up123 (UP)</p>
                </div>
              </TabsContent>

              <TabsContent value="master" className="space-y-4">
                <form onSubmit={handleMasterAdminSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="masterUsername">Master Admin Username</Label>
                    <Input
                      id="masterUsername"
                      type="text"
                      placeholder="Enter master admin username"
                      value={masterAdminData.username}
                      onChange={(e) => setMasterAdminData({...masterAdminData, username: e.target.value})}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="masterPassword">Master Password</Label>
                    <Input
                      id="masterPassword"
                      type="password"
                      placeholder="Enter master admin password"
                      value={masterAdminData.password}
                      onChange={(e) => setMasterAdminData({...masterAdminData, password: e.target.value})}
                      required
                    />
                  </div>
                  <Button type="submit" className="w-full bg-red-600 hover:bg-red-700">
                    <Crown className="mr-2 h-4 w-4" />
                    Master Admin Access
                  </Button>
                </form>
                <div className="text-center text-xs text-gray-600">
                  <p>Demo: master_admin / india2024</p>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* Security Features */}
        <div className="grid grid-cols-3 gap-4 text-center">
          <div className="flex flex-col items-center space-y-2">
            <Shield className="h-6 w-6 text-orange-600" />
            <span className="text-xs text-gray-600">Secure</span>
          </div>
          <div className="flex flex-col items-center space-y-2">
            <CheckCircle className="h-6 w-6 text-green-600" />
            <span className="text-xs text-gray-600">Verified</span>
          </div>
          <div className="flex flex-col items-center space-y-2">
            <Vote className="h-6 w-6 text-blue-600" />
            <span className="text-xs text-gray-600">Anonymous</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
