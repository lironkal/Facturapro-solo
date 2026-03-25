import { useState } from 'react';
import { supabase } from '../lib/supabase';

export default function Auth() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleAuth = async () => {
    setLoading(true);
    setMessage('');
    const { error } = isLogin
      ? await supabase.auth.signInWithPassword({ email, password })
      : await supabase.auth.signUp({ email, password });
    if (error) setMessage(error.message);
    else if (!isLogin) setMessage('Verifie ton email pour confirmer ton compte.');
    setLoading(false);
  };

  return (
    <div style={{minHeight:'100vh',background:'#0b0b0c',display:'flex',alignItems:'center',justifyContent:'center',padding:20}}>
      <div style={{width:'100%',maxWidth:400}}>
        <p style={{fontSize:10,letterSpacing:4,color:'#c9a84c',textTransform:'uppercase',marginBottom:12,textAlign:'center'}}>Facturation Suisse</p>
        <h1 style={{fontFamily:'Playfair Display,serif',fontSize:32,fontWeight:700,color:'#ede9df',marginBottom:8,textAlign:'center'}}>FacturaPro</h1>
        <p style={{fontSize:14,color:'#888480',marginBottom:40,textAlign:'center'}}>{isLogin ? 'Connecte-toi a ton compte' : 'Cree ton compte gratuit'}</p>
        <input value={email} onChange={e=>setEmail(e.target.value)} placeholder="Email" type="email"
          style={{width:'100%',padding:'14px 16px',background:'#131315',border:'1px solid rgba(255,255,255,.08)',borderRadius:10,color:'#ede9df',fontSize:14,marginBottom:12,boxSizing:'border-box'}}/>
        <input value={password} onChange={e=>setPassword(e.target.value)} placeholder="Mot de passe" type="password"
          style={{width:'100%',padding:'14px 16px',background:'#131315',border:'1px solid rgba(255,255,255,.08)',borderRadius:10,color:'#ede9df',fontSize:14,marginBottom:20,boxSizing:'border-box'}}/>
        {message && <p style={{fontSize:13,color:'#c9a84c',marginBottom:16,textAlign:'center'}}>{message}</p>}
        <button onClick={handleAuth} disabled={loading}
          style={{width:'100%',padding:'14px',background:'linear-gradient(135deg,#d4a94e,#9a6e18)',color:'#0b0b0c',border:'none',borderRadius:10,fontFamily:'DM Sans,sans-serif',fontSize:14,fontWeight:700,cursor:'pointer',marginBottom:16}}>
          {loading ? 'Chargement...' : isLogin ? 'Se connecter' : 'Creer mon compte'}
        </button>
        <p style={{fontSize:13,color:'#888480',textAlign:'center',cursor:'pointer'}} onClick={()=>setIsLogin(!isLogin)}>
          {isLogin ? "Pas de compte ? Inscris-toi" : "Deja un compte ? Connecte-toi"}
        </p>
      </div>
    </div>
  );
}
