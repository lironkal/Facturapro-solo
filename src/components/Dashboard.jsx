import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import InvoiceEditor from './InvoiceEditor';

export default function Dashboard({ user }) {
  const [invoices, setInvoices] = useState([]);
  const [view, setView] = useState('list');
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    supabase.from('invoices').select('*').order('created_at', { ascending: false })
      .then(({ data }) => setInvoices(data || []));
  }, []);

  const handleNew = () => { setSelected(null); setView('editor'); };
  const handleEdit = (inv) => { setSelected(inv); setView('editor'); };
  const handleBack = () => {
    supabase.from('invoices').select('*').order('created_at', { ascending: false })
      .then(({ data }) => setInvoices(data || []));
    setView('list');
  };
  const handleDelete = async (id) => {
    if (!window.confirm('Supprimer cette facture ?')) return;
    await supabase.from('invoices').delete().eq('id', id);
    setInvoices(invoices.filter(i => i.id !== id));
  };

  if (view === 'editor') return <InvoiceEditor user={user} invoice={selected} onBack={handleBack}/>;

  return (
    <div style={{minHeight:'100vh',background:'#0b0b0c',padding:'40px 20px'}}>
      <div style={{maxWidth:800,margin:'0 auto'}}>
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:40}}>
          <div>
            <p style={{fontSize:10,letterSpacing:4,color:'#c9a84c',textTransform:'uppercase',marginBottom:4}}>Tableau de bord</p>
            <h1 style={{fontFamily:'Playfair Display,serif',fontSize:28,fontWeight:700,color:'#ede9df'}}>FacturaPro</h1>
          </div>
          <div style={{display:'flex',gap:12,alignItems:'center'}}>
            <button onClick={()=>window.location.href='/pricing'}
              style={{padding:'8px 16px',background:'transparent',border:'1px solid rgba(201,168,76,.3)',borderRadius:8,color:'#c9a84c',fontSize:12,cursor:'pointer'}}>
              Plans
            </button>
            <button onClick={handleNew}
              style={{padding:'10px 20px',background:'linear-gradient(135deg,#d4a94e,#9a6e18)',color:'#0b0b0c',border:'none',borderRadius:8,fontFamily:'DM Sans,sans-serif',fontSize:13,fontWeight:700,cursor:'pointer'}}>
              + Nouvelle facture
            </button>
            <button onClick={()=>supabase.auth.signOut()}
              style={{padding:'8px 16px',background:'transparent',border:'1px solid rgba(255,255,255,.08)',borderRadius:8,color:'#888480',fontSize:12,cursor:'pointer'}}>
              Déconnexion
            </button>
          </div>
        </div>
        {invoices.length === 0 ? (
          <div style={{textAlign:'center',padding:'80px 20px'}}>
            <p style={{fontSize:40,marginBottom:16}}>📄</p>
            <p style={{color:'#888480',fontSize:15,marginBottom:24}}>Aucune facture pour l'instant</p>
            <button onClick={handleNew}
              style={{padding:'12px 28px',background:'linear-gradient(135deg,#d4a94e,#9a6e18)',color:'#0b0b0c',border:'none',borderRadius:10,fontFamily:'DM Sans,sans-serif',fontSize:14,fontWeight:700,cursor:'pointer'}}>
              Créer ma première facture
            </button>
          </div>
        ) : (
          <div style={{display:'flex',flexDirection:'column',gap:12}}>
            {invoices.map(inv => (
              <div key={inv.id} style={{background:'#131315',border:'1px solid rgba(255,255,255,.06)',borderRadius:12,padding:'20px 24px',display:'flex',justifyContent:'space-between',alignItems:'center'}}>
                <div>
                  <p style={{color:'#ede9df',fontSize:15,fontWeight:600,marginBottom:4}}>{inv.client_name || 'Client sans nom'}</p>
                  <p style={{color:'#888480',fontSize:13}}>Facture {inv.number} · {new Date(inv.date).toLocaleDateString('fr-CH')}</p>
                </div>
                <div style={{display:'flex',alignItems:'center',gap:16}}>
                  <span style={{fontFamily:'Playfair Display,serif',fontSize:20,color:'#c9a84c'}}>{inv.total?.toFixed(2)} CHF</span>
                  <span style={{fontSize:11,padding:'4px 10px',borderRadius:20,background: inv.status==='paid'?'rgba(34,197,94,.1)':'rgba(201,168,76,.1)',color:inv.status==='paid'?'#22c55e':'#c9a84c'}}>
                    {inv.status==='paid'?'Payée':'En attente'}
                  </span>
                  <button onClick={()=>handleEdit(inv)} style={{padding:'6px 14px',background:'transparent',border:'1px solid rgba(255,255,255,.1)',borderRadius:6,color:'#ede9df',fontSize:12,cursor:'pointer'}}>Éditer</button>
                  <button onClick={()=>handleDelete(inv.id)} style={{padding:'6px 14px',background:'transparent',border:'1px solid rgba(255,80,80,.2)',borderRadius:6,color:'#ff5050',fontSize:12,cursor:'pointer'}}>Supprimer</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
