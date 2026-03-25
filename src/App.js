import { useState, useEffect } from 'react';
import { supabase } from './lib/supabase';
import Auth from './components/Auth';
import Dashboard from './components/Dashboard';
import Pricing from './components/Pricing';

export default function App() {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState('app');

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
    });
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get('success') === 'true') {
      alert('Paiement confirme ! Bienvenue sur FacturaPro Solo.');
      window.history.replaceState({}, '', '/');
    }
    if (window.location.pathname === '/pricing') setPage('pricing');
  }, []);

  if (loading) return (
    <div style={{minHeight:'100vh',background:'#0b0b0c',display:'flex',alignItems:'center',justifyContent:'center'}}>
      <div style={{fontFamily:'Playfair Display,serif',fontSize:20,color:'#c9a84c'}}>FacturaPro...</div>
    </div>
  );

  if (page === 'pricing') return <Pricing user={session?.user}/>;
  if (!session) return <Auth/>;
  return <Dashboard user={session.user}/>;
}
