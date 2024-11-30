import React, { useState } from 'react';
import { Header } from './components/Header';
import { LoginForm } from './components/LoginForm';
import { DatabaseTerminal } from './components/DatabaseTerminal';
import { Background } from './components/Background';
import { Footer } from './components/Footer';
import { AdminPanel } from './components/AdminPanel';
import { useAuth } from './hooks/useAuth';
import { useDatabase } from './hooks/useDatabase';
import { Lock, AlertCircle } from 'lucide-react';

function App() {
  const { user, isAuthenticated, login, logout } = useAuth();
  const { isConnected, error } = useDatabase();
  const [showAdmin, setShowAdmin] = useState(false);
  const isAdmin = user?.role === 'ADMIN' || user?.role === 'OWNER';

  const handleLogin = async (username: string, password: string) => {
    return login(username, password);
  };

  if (!isConnected) {
    return (
      <div className="min-h-screen bg-black text-red-500 flex items-center justify-center p-8">
        <Background />
        <div className="text-center space-y-4">
          <AlertCircle className="w-12 h-12 mx-auto" />
          <h1 className="text-xl">Database Connection Error</h1>
          {error && <p className="text-sm opacity-70">{error}</p>}
        </div>
      </div>
    );
  }

  if (showAdmin) {
    return <AdminPanel />;
  }

  return (
    <div className="min-h-screen bg-black text-green-500 flex items-center justify-center p-8">
      <Background />
      
      <div className="relative w-full max-w-4xl">
        {isAuthenticated && isAdmin && (
          <div className="absolute top-4 right-4">
            <button
              onClick={() => setShowAdmin(true)}
              className="flex items-center gap-2 bg-green-500/10 hover:bg-green-500/20 transition-colors px-3 py-1.5 rounded text-sm border border-green-500/30"
            >
              <Lock className="w-4 h-4" />
              Admin
            </button>
          </div>
        )}

        <Header />
        {isAuthenticated && user ? (
          <DatabaseTerminal user={user} onLogout={logout} />
        ) : (
          <LoginForm onLogin={handleLogin} />
        )}
        <Footer />
      </div>
    </div>
  );
}

export default App;