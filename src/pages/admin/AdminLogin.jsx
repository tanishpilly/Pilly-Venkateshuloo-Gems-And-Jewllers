import React, { useState } from 'react';
import PVLogo from '../../components/PVLogo';
import { Lock, Mail, ArrowRight, ShieldCheck } from 'lucide-react';
import { loginAdmin } from '../../services/cmsService';
import { isSupabaseConfigured } from '../../lib/supabaseClient';

export default function AdminLogin({ onLoginSuccess, onNavigatePublic }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');

    try {
      const session = await loginAdmin(email, password);
      onLoginSuccess(session);
    } catch (err) {
      setErrorMsg(err.message || 'Authentication failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#2D0A14] flex flex-col justify-center items-center p-4 relative overflow-hidden text-white font-sans">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#C5A059]/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="w-full max-w-md space-y-8 relative z-10">
        
        {/* Logo Card */}
        <div className="text-center space-y-3">
          <div className="inline-block p-4 bg-white/5 rounded-3xl border border-[#C5A059]/30 backdrop-blur-md shadow-xl">
            <PVLogo size="lg" variant="dark" />
          </div>
          <h1 className="font-serif-luxury text-3xl font-bold text-white pt-2">
            Owner CMS Sign In
          </h1>
          <p className="text-xs text-[#DFBA6A]">
            Private Dashboard for Pilly Venkateshuloo Gems & Jewellers
          </p>
        </div>

        {/* Login Box */}
        <div className="bg-[#3B101C]/90 p-8 rounded-3xl border border-[#C5A059]/40 shadow-2xl backdrop-blur-md">
          {errorMsg && (
            <div className="mb-6 p-4 bg-red-900/50 border border-red-500/50 rounded-2xl text-xs text-red-200">
              {errorMsg}
            </div>
          )}

          {!isSupabaseConfigured && (
            <div className="mb-6 p-3.5 bg-[#C5A059]/20 border border-[#C5A059]/40 rounded-xl text-[11px] text-gray-200">
              <strong>Dev Mode Notice:</strong> Supabase environment keys pending setup on Vercel. Standard admin credentials supported for dev testing.
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-gray-300 mb-1">
                Owner Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                  <Mail className="w-4 h-4" />
                </div>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="e.g. pillyvenkateshuloogemsjeweller@gmail.com"
                  className="w-full pl-10 pr-4 py-3 bg-white/10 border border-[#C5A059]/40 rounded-xl text-sm text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#DFBA6A]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-gray-300 mb-1">
                Admin Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter password..."
                  className="w-full pl-10 pr-4 py-3 bg-white/10 border border-[#C5A059]/40 rounded-xl text-sm text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#DFBA6A]"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 bg-[#C5A059] hover:bg-[#d6b066] text-[#2D0A14] text-xs font-bold uppercase tracking-wider rounded-xl shadow-lg flex items-center justify-center gap-2 transition-transform hover:scale-[1.01] disabled:opacity-50"
            >
              {loading ? 'Authenticating...' : 'Log In to CMS'} <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        </div>

        {/* Back to Public Site */}
        <div className="text-center">
          <button
            onClick={onNavigatePublic}
            className="text-xs text-gray-400 hover:text-white transition-colors"
          >
            ← Return to Public Showroom Website
          </button>
        </div>

      </div>
    </div>
  );
}
