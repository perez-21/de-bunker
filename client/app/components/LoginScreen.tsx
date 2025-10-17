'use client';

import { Lock } from 'lucide-react';
import { useState } from 'react';

interface LoginScreenProps {
  onLogin: (password: string) => void;
}

export default function LoginScreen({ onLogin }: LoginScreenProps) {
  const [masterPassword, setMasterPassword] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (masterPassword.length >= 8) {
      console.log('Attempting to log in with Master Password...');
      onLogin(masterPassword);
    } else {
      console.error('Master Password must be at least 8 characters.');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-full max-w-md bg-gray-800 p-8 md:p-10 rounded-2xl shadow-2xl border border-purple-800">
        <div className="text-center mb-8">
          <Lock size={48} className="text-purple-500 mx-auto mb-3" />
          <h1 className="text-3xl font-extrabold text-gray-100">Welcome Back</h1>
          <p className="text-gray-400 mt-2">
            Enter your Master Password to unlock your vault.
          </p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="relative">
            <Lock
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"
              size={18}
            />
            <input
              type="password"
              placeholder="Master Password"
              value={masterPassword}
              onChange={(e) => setMasterPassword(e.target.value)}
              required
              className="w-full pl-10 pr-4 py-3 bg-gray-700 border border-gray-600 rounded-xl text-gray-100 placeholder-gray-400 focus:ring-purple-500 focus:border-purple-500 shadow-inner"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-purple-600 hover:bg-purple-700 text-white font-extrabold py-3 rounded-xl transition duration-200 tracking-wider shadow-lg shadow-purple-900/50"
          >
            Unlock Vault
          </button>
        </form>
        <p className="text-center text-sm text-gray-500 mt-6">
          Need an account?{' '}
          <span
            className="text-purple-400 cursor-pointer hover:underline"
            onClick={() => console.log('Navigate to Signup')}
          >
            Sign Up
          </span>
        </p>
      </div>
    </div>
  );
}
