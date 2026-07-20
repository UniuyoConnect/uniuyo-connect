"use client";
import { useState } from "react";

export default function Home() {
  const [regNo, setRegNo] = useState("");
  
  return (
    <div style={{minHeight:'100vh', background:'#fff', fontFamily:'Inter, sans-serif'}}>
      {/* HEADER */}
      <header style={{background:'#006400', padding:'16px 20px', display:'flex', justifyContent:'space-between', alignItems:'center'}}>
        <h1 style={{color:'#fff', fontWeight:800, fontSize:'20px', margin:0}}>UNIUYO CONNECT</h1>
        <div style={{color:'#fff', fontSize:'12px', background:'rgba(255,255,255,0.2)', padding:'6px 12px', borderRadius:'20px'}}>Real Students Only</div>
      </header>

      {/* HERO */}
      <div style={{padding:'40px 20px', textAlign:'center'}}>
        <h2 style={{fontSize:'32px', fontWeight:800, color:'#000', lineHeight:'1.1', marginBottom:'12px'}}>
          The Campus Network<br/>Built For <span style={{color:'#006400'}}>Uniuyo</span>
        </h2>
        <p style={{color:'#666', fontSize:'15px', marginBottom:'28px'}}>
          No avatars. No fake profiles. Real photos, 13 faculties, marketplace, lost & found. Verified by Reg No.
        </p>

        {/* LOGIN CARD */}
        <div style={{background:'#F5F5F5', borderRadius:'16px', padding:'20px', maxWidth:'380px', margin:'0 auto', textAlign:'left'}}>
          <label style={{fontSize:'13px', fontWeight:600}}>Reg No (15-99 only)</label>
          <input 
            value={regNo}
            onChange={(e)=>setRegNo(e.target.value)}
            placeholder="e.g 21/SCI/1234"
            style={{width:'100%', padding:'14px', borderRadius:'10px', border:'1px solid #ddd', marginTop:'6px', marginBottom:'16px', fontSize:'15px'}}
          />
          <button style={{width:'100%', background:'#006400', color:'#fff', padding:'14px', borderRadius:'10px', border:'none', fontWeight:700, fontSize:'15px'}}>
            Continue with Reg No
          </button>
          <p style={{fontSize:'11px', color:'#888', textAlign:'center', marginTop:'12px'}}>
            2-Step Verification via WhatsApp: 09028372118
          </p>
        </div>

        {/* FEATURES */}
        <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:'12px', maxWidth:'380px', margin:'30px auto 0'}}>
          <div style={{background:'#fff', border:'1px solid #eee', borderRadius:'12px', padding:'14px', textAlign:'left'}}>
            <b style={{fontSize:'13px'}}>13 Faculties</b>
            <p style={{fontSize:'11px', color:'#666', margin:'4px 0 0'}}>Communities + Hostel chat</p>
          </div>
          <div style={{background:'#fff', border:'1px solid #eee', borderRadius:'12px', padding:'14px', textAlign:'left'}}>
            <b style={{fontSize:'13px'}}>₦3k Verify</b>
            <p style={{fontSize:'11px', color:'#666', margin:'4px 0 0'}}>Blue tick + monthly</p>
          </div>
          <div style={{background:'#fff', border:'1px solid #eee', borderRadius:'12px', padding:'14px', textAlign:'left'}}>
            <b style={{fontSize:'13px'}}>Marketplace</b>
            <p style={{fontSize:'11px', color:'#666', margin:'4px 0 0'}}>Buy & Sell on campus</p>
          </div>
          <div style={{background:'#fff', border:'1px solid #eee', borderRadius:'12px', padding:'14px', textAlign:'left'}}>
            <b style={{fontSize:'13px'}}>World Class UI</b>
            <p style={{fontSize:'11px', color:'#666', margin:'4px 0 0'}}>Real Photos Only, No Avatars</p>
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <div style={{textAlign:'center', padding:'20px', color:'#999', fontSize:'11px'}}>
        © 2026 Uniuyo Connect • Admin: Emediong Usoro
      </div>
    </div>
  );
}
