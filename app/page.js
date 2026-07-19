export default function Home() {
  return (
    <div style={{padding:'20px', fontFamily:'system-ui', background:'#f1f5f9', minHeight:'100vh'}}>
      <div style={{maxWidth:'500px', margin:'0 auto', background:'white', padding:'24px', borderRadius:'20px', boxShadow:'0 4px 20px rgba(0,0,0,0.1)'}}>
        <h1 style={{fontSize:'32px', fontWeight:'900', color:'#0f172a'}}>🎓 Uniuyo Connect</h1>
        <p style={{color:'#64748b', marginTop:'8px'}}>Campus social app for University of Uyo students</p>
        <div style={{marginTop:'24px', background:'#dbeafe', padding:'16px', borderRadius:'12px', borderLeft:'4px solid #2563eb'}}>
          <p style={{fontWeight:'bold', color:'#1e40af'}}>✅ Your GitHub Setup Complete!</p>
          <p style={{fontSize:'14px', marginTop:'6px'}}>Next step: Deploy to Vercel to make it LIVE</p>
        </div>
        <div style={{marginTop:'20px'}}>
          <p style={{fontWeight:'bold'}}>Features coming:</p>
          <ul style={{marginTop:'8px', color:'#334155'}}>
            <li>💬 Campus Feed</li>
            <li>📚 Study Groups</li>
            <li>🛒 Campus Marketplace</li>
            <li>📅 Events</li>
          </ul>
        </div>
        <button style={{marginTop:'24px', width:'100%', background:'#2563eb', color:'white', padding:'14px', borderRadius:'12px', border:'none', fontWeight:'bold', fontSize:'16px'}}>Welcome, Uniuyo Student!</button>
      </div>
    </div>
  )
}
