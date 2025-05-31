
import React, { useState } from 'react';
import LoginForm from '@/components/LoginForm';
import VotingDashboard from '@/components/VotingDashboard';
import AdminDashboard from '@/components/AdminDashboard';
import MasterAdminDashboard from '@/components/MasterAdminDashboard';

const Index = () => {
  const [currentView, setCurrentView] = useState('login');
  const [userRole, setUserRole] = useState('');
  const [userState, setUserState] = useState('');

  const handleLogin = (role: string, state?: string) => {
    setUserRole(role);
    setUserState(state || '');
    
    if (role === 'admin') {
      setCurrentView('admin');
    } else if (role === 'master_admin') {
      setCurrentView('master_admin');
    } else {
      setCurrentView('voting');
    }
  };

  const handleLogout = () => {
    setCurrentView('login');
    setUserRole('');
    setUserState('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-blue-50">
      {currentView === 'login' && <LoginForm onLogin={handleLogin} />}
      {currentView === 'voting' && <VotingDashboard onLogout={handleLogout} userState={userState} />}
      {currentView === 'admin' && <AdminDashboard onLogout={handleLogout} adminState={userState} />}
      {currentView === 'master_admin' && <MasterAdminDashboard onLogout={handleLogout} />}
    </div>
  );
};

export default Index;
