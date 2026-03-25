import { redirectToStripeCheckout } from '../lib/stripe';

export default function Pricing({ user }) {
  const plans = [
    { name:'Gratuit', price:'0', period:'pour toujours', features:['3 factures/mois','Apercu PDF','QR-Facture suisse'], cta:'Commencer', free:true },
    { name:'Solo', price:'9', period:'CHF/mois', features:['Factures illimitees','Sauvegarde cloud','Clients enregistres','Support email'], cta:'Commencer - 9 CHF/mois', free:false },
  ];

  return (
    <div style={{minHeight:'100vh',background:'#0b0b0c',padding:'60px 20px'}}>
      <div style={{maxWidth:700,margin:'0 auto',textAlign:'center'}}>
        <p style={{fontSize:10,letterSpacing:4,color:'#c9a84c',textTransform:'uppercase',marginBottom:12}}>Tarifs</p>
        <h1 style={{fontFamily:'Playfair Display,serif',fontSize:36,fontWeight:700,color:'#ede9df',marginBottom:16}}>Simple et transparent</h1>
        <p style={{fontSize:15,color:'#888480',marginBottom:48}}>Commence gratuitement. Passe a Solo quand tu es pret.</p>
        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:20}}>
          {plans.map(p=>(
            <div key={p.name} style={{background:p.free?'#131315':'linear-gradient(135deg,rgba(201,168,76,.1),rgba(201,168,76,.03))',border:p.free?'1px solid rgba(255,255,255,.06)':'1px solid rgba(201,168,76,.3)',borderRadius:14,padding:'32px 28px',textAlign:'left'}}>
              <p style={{fontSize:10,letterSpacing:3,color:p.free?'#888480':'#c9a84c',textTransform:'uppercase',marginBottom:12}}>{p.name}</p>
              <div style={{display:'flex',alignItems:'baseline',gap:6,marginBottom:24}}>
                <span style={{fontFamily:'Playfair Display,serif',fontSize:42,fontWeight:700,color:'#ede9df'}}>{p.price}</span>
                <span style={{fontSize:13,color:'#888480'}}>{p.period}</span>
              </div>
              <ul style={{listStyle:'none',display:'flex',flexDirection:'column',gap:10,marginBottom:28}}>
                {p.features.map(f=>(
                  <li key={f} style={{fontSize:14,color:'#ede9df',display:'flex',alignItems:'center',gap:8}}>
                    <span style={{color:'#c9a84c',fontSize:16}}>✓</span>{f}
                  </li>
                ))}
              </ul>
              <button
                onClick={()=>p.free?window.location.href='/':redirectToStripeCheckout(user?.email)}
                style={{width:'100%',padding:'12px',background:p.free?'#1a1a1d':'linear-gradient(135deg,#d4a94e,#9a6e18)',color:p.free?'#ede9df':'#0b0b0c',border:p.free?'1px solid rgba(255,255,255,.1)':'none',borderRadius:9,fontFamily:'DM Sans,sans-serif',fontSize:13,fontWeight:700,cursor:'pointer',letterSpacing:1}}>
                {p.cta}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
