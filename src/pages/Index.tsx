
import React, { useState } from 'react';
import LoginForm from '@/components/LoginForm';
import VotingDashboard from '@/components/VotingDashboard';
import AdminDashboard from '@/components/AdminDashboard';

const Index = () => {
  const [currentView, setCurrentView] = useState('login');
  const [userRole, setUserRole] = useState('');

  const handleLogin = (role: string) => {
    setUserRole(role);
    if (role === 'admin') {
      setCurrentView('admin');
    } else {
      setCurrentView('voting');
    }
  };

  const handleLogout = () => {
    setCurrentView('login');
    setUserRole('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {currentView === 'login' && <LoginForm onLogin={handleLogin} />}
      {currentView === 'voting' && <VotingDashboard onLogout={handleLogout} />}
      {currentView === 'admin' && <AdminDashboard onLogout={handleLogout} />}
    </div>
  );
};

export default Index;
