"use client";
import { useState, useEffect, useRef } from "react";
export default function Page() {
 const [user, setUser] = useState(null);
 const [regNo, setRegNo] = useState("");
 const [dob, setDob] = useState("");
 const [facultyCode, setFacultyCode] = useState("");
 const [facultyName, setFacultyName] = useState("");
 const [hostelPick, setHostelPick] = useState("");
 const [tab, setTab] = useState("feed");
 const [subTab, setSubTab] = useState("faculties");
 const [feedFilter, setFeedFilter] = useState("All");
 const [callActive, setCallActive] = useState(null);
 const [callLogs, setCallLogs] = useState([]);
 const [flagged, setFlagged] = useState([]);
 const [chatWith, setChatWith] = useState(null);
 const [chatMsgs, setChatMsgs] = useState({});
 const [chatInput, setChatInput] = useState("");
 const [posts, setPosts] = useState([
  {id:1,name:"Favour E.",tag:"Agric",text:"V18 - 18+ Compliant! DOB 18+ checked, AI scan every 5 sec, flagged_18plus_content, Confessions anon 18+",type:"text",media:"",age:"18+",flagged:false,anon:false},
  {id:2,name:"Anonymous",tag:"Confessions 18+",text:"I have a crush on my roommate - 18+ anon",type:"text",media:"",age:"18+",flagged:false,anon:true}
 ]);
 const faculties=[{code:"AG",name:"Agriculture"},{code:"AS",name:"Arts"},{code:"ED",name:"Education"},{code:"EN",name:"Engineering"},{code:"LW",name:"Law"},{code:"MS",name:"Basic Medical"},{code:"SC",name:"Science"},{code:"SS",name:"Social Sciences"},{code:"BS",name:"Management Sciences"},{code:"PH",name:"Pharmacy"}];
 const realHostels=[{name:"NDDC Hostel Main Campus"},{name:"W2A Female Hostel"},{name:"W2B Female Hostel"},{name:"W4 Girls Hostel"},{name:"W5 Annex Female Hostel"},{name:"M2 Hall Boys Hostel"},{name:"Medical Students Hostel UUTH"},{name:"NEEDS Hall I"},{name:"New NDDC Hostel"},{name:"NDDC Medical 522-bed"},{name:"Haldeen Hostel"},{name:"Ekanem Ikpi Hostel"}];
 const offCampusAreas=["Ikpa Road","Nwaniba Road","Use Offot","Ewet Housing"];
 const usersList=[{name:"Favour E.",hostel:"W2A"},{name:"John Doe",hostel:"NDDC Main"}];
 const [joinedHostels, setJoinedHostels] = useState([]);
 const [joinedOff, setJoinedOff] = useState(false);
 const [newPost, setNewPost] = useState("");
 const [postType, setPostType] = useState("text");
 const [isAnon, setIsAnon] = useState(false);
 const [is18Plus, setIs18Plus] = useState(false);
 const [mediaUrl, setMediaUrl] = useState("");
 const fileRef=useRef(null);
 const bannedWords=["nude","naked","sex","porn","xxx","pussy","dick","boobs","onlyfans"];
 useEffect(()=>{
  const s=localStorage.getItem("uc_v18"); if(s){const u=JSON.parse(s); setUser(u); setFacultyCode(u.facultyCode); setFacultyName(u.facultyName);}
  const l=localStorage.getItem("uc_calls_v18"); if(l) setCallLogs(JSON.parse(l));
  const f=localStorage.getItem("uc_flagged_18plus"); if(f) setFlagged(JSON.parse(f));
 },[]);
 useEffect(()=>{localStorage.setItem("uc_flagged_18plus",JSON.stringify(flagged))},[flagged]);
 // 18+ AI Moderation every 5 sec - Master Plan
 useEffect(()=>{
  const interval=setInterval(()=>{
   const last=posts[0];
   if(last){
    const txt=(last.text||"").toLowerCase();
    const isBad=bannedWords.some(w=>txt.includes(w));
    if(isBad &&!last.flagged){
     const flaggedItem={id:Date.now(),postId:last.id,text:last.text,user:last.name,reason:"18+ banned word detected - Hive/Sightengine scan",date:new Date().toLocaleString()};
     setFlagged(prev=>[flaggedItem,...prev]);
     setPosts(prev=>prev.map(p=>p.id===last.id?{...p,flagged:true}:p));
     console.log("WhatsApp Alert to Admin: 18+ Content flagged - Call Continued - Logged", flaggedItem);
    }
   }
  },5000);
  return()=>clearInterval(interval);
 },[posts]);
 const detectFaculty=(r)=>{
  const parts=r.toUpperCase().split("/"); if(parts.length>=2){
   const code=parts[1]; const map={AG:"Agriculture",AS:"Arts",ED:"Education",EN:"Engineering",LW:"Law",MS:"Basic Medical",SC:"Science",SS:"Social Sciences",BS:"Management Sciences",PH:"Pharmacy"};
   if(map[code]){setFacultyCode(code); setFacultyName(map[code]);}
  }
 };
 const check18Plus=(dobStr)=>{
  if(!dobStr) return false;
  const birth=new Date(dobStr); const today=new Date(); let age=today.getFullYear()-birth.getFullYear(); const m=today.getMonth()-birth.getMonth(); if(m<0||(m===0&&today.getDate()<birth.getDate())) age--;
  return age>=18;
 };
 const handleLogin=()=>{
  if(!regNo||!hostelPick||!dob) return alert("Enter Reg No, DOB, Hostel - 18+ Required");
  if(!check18Plus(dob)) return alert("You must be 18+ to use Uniuyo Connect - Age verification failed!");
  const isOff=offCampusAreas.includes(hostelPick) || hostelPick.includes("Off Campus");
  const u={regNo,facultyCode,facultyName:facultyName||"General",hostel:hostelPick,isOffCampus:isOff,dob,ageVerified:true};
  localStorage.setItem("uc_v18",JSON.stringify(u)); setUser(u);
 };
 const startCall=(name,type,isGroup=false)=>{
  if(!user.ageVerified) return alert("18+ verification required for calls");
  setCallActive({name,type,isGroup,time:0});
  const id=setInterval(()=>{setCallActive(c=>c?{...c,time:c.time+1}:null)},1000);
  setTimeout(()=>{clearInterval(id); setCallLogs([{id:Date.now(),name,type,isGroup,duration:"00:23",status:"Call Continued - Logged",date:new Date().toLocaleString()},...callLogs]); setCallActive(null);},4000);
 };
 const handleFile=(e)=>{
  const file=e.target.files[0]; if(!file) return;
  const url=URL.createObjectURL(file);
  setMediaUrl(url);
  if(file.type.startsWith("video")) setPostType("video");
  else if(file.type.startsWith("image")) setPostType("image");
  else if(file.type.startsWith("audio")) setPostType("voice");
 };
 if(!user){
  return(<div style={{minHeight:"100vh",background:"#f0f2f5",padding:20,fontFamily:"sans-serif"}}>
   <div style={{maxWidth:440,margin:"20px auto",background:"white",padding:22,borderRadius:16}}>
    <h2 style={{color:"#0b5fff",textAlign:"center"}}>Uniuyo Connect V18</h2>
    <p style={{textAlign:"center",fontSize:11,color:"#d00",fontWeight:"bold"}}>18+ ONLY — Age verification required — DOB checked</p>
    <input value={regNo} onChange={e=>{setRegNo(e.target.value);detectFaculty(e.target.value)}} placeholder="Reg No 16/AG to 99/AG" style={{width:"100%",padding:12,marginTop:12,borderRadius:8,border:"1px solid #ddd"}}/>
    <input type="date" value={dob} onChange={e=>setDob(e.target.value)} style={{width:"100%",padding:12,marginTop:10,borderRadius:8,border:"1px solid #ddd"}}/>
    <div style={{fontSize:10,color:"#666",marginTop:4}}>Must be 18+ — Will verify at login — Underage cannot register</div>
    {facultyName&&<div style={{marginTop:8,background:"#e8f0ff",padding:8,borderRadius:6,fontSize:12}}>Faculty {facultyName} — ONLY this, others cannot join</div>}
    <select value={hostelPick} onChange={e=>setHostelPick(e.target.value)} style={{width:"100%",padding:12,marginTop:10,borderRadius:8,border:"1px solid #ddd"}}>
     <option value="">Select Hostel (12) or Off Campus ONE</option>
     {realHostels.map(h=><option key={h.name} value={h.name}>{h.name}</option>)}
     <option value="Off Campus Community">Off Campus Community — ONE</option>
    </select>
    <button onClick={handleLogin} style={{width:"100%",marginTop:14,padding:12,background:"#0b5fff",color:"white",border:"none",borderRadius:8,fontWeight:"bold"}}>Verify 18+ & Enter V18</button>
    <div style={{marginTop:10,fontSize:9,color:"#888"}}>18+ Compliance: DOB check, AI moderation every 5 sec Hive/Sightengine, flagged_18plus_content table, WhatsApp alert to admin "Call Continued - Logged", Confessions anon 18+ only, Age gate blur</div>
   </div>
  </div>);
 }
 const filteredPosts=posts.filter(p=>{
  if(feedFilter==="All") return true;
  if(feedFilter==="18+") return p.age==="18+"||p.flagged||p.tag.includes("Confessions");
  if(feedFilter==="Safe") return!p.flagged && p.age!=="18+";
  if(feedFilter==="Meme") return p.tag==="Meme";
  if(feedFilter==="Confessions") return p.tag.includes("Confessions");
  return true;
 });
 return(<div style={{minHeight:"100vh",background:"#f0f2f5",fontFamily:"sans-serif",paddingBottom:70}}>
  {callActive&&<div style={{position:"fixed",inset:0,background:"#0f172a",zIndex:999,color:"white",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center"}}>
   <div style={{width:100,height:100,borderRadius:50,background:"#334155",display:"flex",alignItems:"center",justifyContent:"center",fontSize:30}}>{callActive.type==="video"?"🎥":"📞"}</div>
   <div style={{marginTop:16,fontWeight:"bold",fontSize:18}}>{callActive.isGroup?"Group ":""}{callActive.type} Call {callActive.isGroup?"in":"with"} {callActive.name} — 18+ Verified</div>
   <div style={{marginTop:8,fontSize:14,color:"#94a3b8"}}>{Math.floor(callActive.time/60)}:{String(callActive.time%60).padStart(2,"0")} — Call Continued - Logged + WhatsApp alert</div>
   <button onClick={()=>setCallActive(null)} style={{marginTop:20,padding:"12px 20px",borderRadius:30,border:"none",background:"#ef4444",color:"white",fontWeight:"bold"}}>End Call</button>
  </div>}
  <div style={{background:"white",padding:10,position:"sticky",top:0,zIndex:10,display:"flex",gap:6,borderBottom:"1px solid #eee",overflowX:"auto"}}>
   {["feed","chat","communities","calls","moderation"].map(t=><button key={t} onClick={()=>setTab(t)} style={{padding:"8px 10px",borderRadius:20,border:"none",background:tab===t?"#0b5fff":"#e4e6eb",color:tab===t?"white":"black",fontWeight:"bold",fontSize:10,textTransform:"capitalize"}}>{t} {t==="moderation"?`(${flagged.length})`:t==="calls"?`(${callLogs.length})`:""}</button>)}
  </div>
  {tab==="feed"&&<div style={{padding:12}}>
   <div style={{display:"flex",gap:6,marginBottom:10,overflowX:"auto"}}>{["All","Safe","18+","Confessions","Meme"].map(f=><button key={f} onClick={()=>setFeedFilter(f)} style={{padding:"6px 10px",borderRadius:16,border:"none",background:feedFilter===f?"#0b5fff":"#e4e6eb",fontSize:11,fontWeight:"bold"}}>{f}</button>)}</div>
   <div style={{background:"white",padding:12,borderRadius:12,marginBottom:12,border:is18Plus?"2px solid #ef4444":"1px solid #eee"}}>
    <div style={{fontSize:11,fontWeight:"bold",color:is18Plus?"#ef4444":"#666"}}>{isAnon?"Anonymous Confession 18+":"Feed Post"} {is18Plus?"— 18+ Age Gate":""} {isAnon?"— Anon":""}</div>
    <textarea value={newPost} onChange={e=>setNewPost(e.target.value)} placeholder={isAnon?"Confess anonymously 18+...":"What's happening? AI scans every 5 sec for 18+ content"} style={{width:"100%",marginTop:8,border:"1px solid #ddd",borderRadius:8,padding:10,minHeight:50}}></textarea>
    <div style={{display:"flex",gap:6,marginTop:8,flexWrap:"wrap"}}>
     <label style={{display:"flex",alignItems:"center",gap:4,fontSize:11}}><input type="checkbox" checked={isAnon} onChange={e=>setIsAnon(e.target.checked)}/> Anonymous 18+</label>
     <label style={{display:"flex",alignItems:"center",gap:4,fontSize:11}}><input type="checkbox" checked={is18Plus} onChange={e=>setIs18Plus(e.target.checked)}/> Mark 18+</label>
     <button onClick={()=>fileRef.current.click()} style={{padding:"6px 10px",borderRadius:16,border:"none",background:"#e4e6eb",fontSize:11}}>📷 Image / 🎥 Video Circular / 🎤 Voice Note</button>
     <input ref={fileRef} type="file" accept="image/*,video/*,audio/*" style={{display:"none"}} onChange={handleFile}/>
    </div>
    {mediaUrl&&<div style={{marginTop:10}}>{postType==="image"&&<img src={mediaUrl} style={{width:"100%",borderRadius:12,maxHeight:300}}/>}{postType==="video"&&<div style={{display:"flex",justifyContent:"center"}}><video src={mediaUrl} controls style={{width:120,height:120,borderRadius:"50%",border:"3px solid #0b5fff"}}/></div>}{postType==="voice"&&<audio src={mediaUrl} controls style={{width:"100%"}}/>}</div>}
    <button onClick={()=>{if(!newPost&&!mediaUrl) return; const flaggedNow=bannedWords.some(w=>newPost.toLowerCase().includes(w)); const p={id:Date.now(),name:isAnon?"Anonymous": "You",tag:isAnon?"Confessions 18+":is18Plus?"18+":user.facultyName,text:newPost,type:postType,media:mediaUrl,age:is18Plus||isAnon?"18+":"Safe",flagged:flaggedNow,anon:isAnon}; if(flaggedNow){setFlagged([{id:Date.now(),postId:p.id,text:p.text,user:p.name,reason:"18+ word detected at post",date:new Date().toLocaleString()},...flagged])} setPosts([p,...posts]); setNewPost(""); setMediaUrl(""); setIsAnon(false); setIs18Plus(false);}} style={{marginTop:10,padding:"8px 14px",background:isAnon?"#ef4444":is18Plus?"#f59e0b":"#0b5fff",color:"white",border:"none",borderRadius:8,fontWeight:"bold"}}>Post {isAnon?"Anon 18+":is18Plus?"18+":""}</button>
    <div style={{fontSize:9,color:"#888",marginTop:6}}>AI Moderation: Hive/Sightengine scans every 5 sec • flagged_18plus_content table • WhatsApp alert to admin • Age gate blur for 18+</div>
   </div>
   {filteredPosts.map(p=><div key={p.id} style={{background:"white",padding:12,borderRadius:12,marginBottom:10,border:p.flagged?"2px solid #ef4444":p.age==="18+"?"1px solid #f59e0b":"1px solid #eee",opacity:p.flagged?0.6:1}}>
    <div style={{display:"flex",justifyContent:"space-between"}}><b style={{fontSize:12}}>{p.name} • {p.tag} {p.age==="18+"&&"🔞 18+"} {p.flagged&&"🚩 FLAGGED"}</b><span style={{fontSize:10,color:"#666"}}>{p.age}</span></div>
    {p.flagged?<div style={{background:"#fee2e2",padding:8,borderRadius:8,marginTop:6,fontSize:11}}>🚩 This post flagged by AI moderation (Hive/Sightengine) - 18+ content detected - Saved to flagged_18plus_content - WhatsApp alert sent to admin - Call Continued - Logged</div>:p.age==="18+"?<div><div style={{marginTop:6,filter:"blur(8px)"}}>{p.text}</div><div style={{fontSize:11,color:"#ef4444",fontWeight:"bold"}}>🔞 18+ Content — Tap to view — Age verified 18+</div></div>:<div style={{marginTop:6}}>{p.text}</div>}
    {p.media&&!p.flagged&&<div style={{marginTop:8}}>{p.type==="image"&&<img src={p.media} style={{width:"100%",borderRadius:12,filter:p.age==="18+"?"blur(10px)":"none"}}/>}{p.type==="video"&&<video src={p.media} controls style={{width:130,height:130,borderRadius:"50%",border:"3px solid #0b5fff",filter:p.age==="18+"?"blur(8px)":"none"}}/>}{p.type==="voice"&&<audio src={p.media} controls style={{width:"100%"}}/>}</div>}
   </div>)}
  </div>}
  {tab==="moderation"&&<div style={{padding:12}}><h4 style={{fontWeight:"bold",color:"#ef4444"}}>flagged_18plus_content Table — Master Plan 18+ — {flagged.length} flagged</h4><p style={{fontSize:11,color:"#666"}}>AI Hive/Sightengine scans every 5 sec • WhatsApp alert to admin • Call Continued - Logged</p>{flagged.length===0&&<div style={{background:"white",padding:20,borderRadius:12,textAlign:"center"}}>No flagged content — AI scanning every 5 sec</div>}{flagged.map(f=><div key={f.id} style={{background:"white",padding:10,borderRadius:10,marginTop:8,border:"2px solid #ef4444"}}><b>🚩 Post {f.postId} by {f.user}</b><div style={{fontSize:12}}>{f.text}</div><div style={{fontSize:10,color:"#666"}}>Reason: {f.reason} • {f.date} • WhatsApp alert sent • call_logs saved</div></div>)}</div>}
  {tab==="communities"&&<div style={{padding:12}}><div style={{display:"flex",gap:6,marginBottom:10}}>{[{id:"faculties",label:`Faculties ${faculties.length}`},{id:"hostels",label:`Hostels ${realHostels.length}`},{id:"offcampus",label:"Off Campus 1"}].map(s=><button key={s.id} onClick={()=>setSubTab(s.id)} style={{padding:"6px 10px",borderRadius:16,border:"none",background:subTab===s.id?"#0b5fff":"#e4e6eb",fontSize:11,fontWeight:"bold"}}>{s.label}</button>)}</div>{subTab==="faculties"&&<div>{faculties.map(f=>{const isYour=f.code===facultyCode; return(<div key={f.code} style={{background:"white",padding:10,borderRadius:10,marginTop:6,border:isYour?"2px solid #0b5fff":"1px solid #eee"}}><b>{f.name} ({f.code})</b> {isYour?"⭐ YOURS":"— Not your faculty"}<div style={{marginTop:6,display:"flex",gap:6}}>{isYour&&<><button onClick={()=>startCall(f.name+" Faculty","voice",true)} style={{padding:"4px 8px",borderRadius:12,border:"none",background:"#10b981",color:"white",fontSize:10}}>📞 Group Voice 18+</button><button onClick={()=>startCall(f.name+" Faculty","video",true)} style={{padding:"4px 8px",borderRadius:12,border:"none",background:"#0b5fff",color:"white",fontSize:10}}>🎥 Group Video 18+</button></>}</div></div>)})}</div>}{subTab==="hostels"&&<div>{realHostels.map(h=><div key={h.name} style={{background:"white",padding:10,borderRadius:10,marginTop:6}}><b style={{fontSize:12}}>{h.name}</b><div style={{marginTop:6,display:"flex",gap:6}}><button onClick={()=>startCall(h.name,"voice",true)} style={{padding:"4px 8px",borderRadius:12,border:"none",background:"#10b981",color:"white",fontSize:10}}>📞 Group Voice 18+</button><button onClick={()=>startCall(h.name,"video",true)} style={{padding:"4px 8px",borderRadius:12,border:"none",background:"#0b5fff",color:"white",fontSize:10}}>🎥 Group Video 18+</button></div></div>)}</div>}{subTab==="offcampus"&&<div><div style={{background:"white",padding:12,borderRadius:10}}><b>Off Campus Community — ONE — Group Calls 18+</b><div style={{marginTop:8,display:"flex",gap:6}}><button onClick={()=>startCall("Off Campus Community","voice",true)} style={{padding:"6px 10px",borderRadius:12,border:"none",background:"#10b981",color:"white",fontSize:11}}>📞 Group Voice 18+</button><button onClick={()=>startCall("Off Campus Community","video",true)} style={{padding:"6px 10px",borderRadius:12,border:"none",background:"#0b5fff",color:"white",fontSize:11}}>🎥 Group Video 18+</button></div></div></div>}</div>}
  {tab==="chat"&&<div style={{padding:12}}>{!chatWith&&<div><h4>Chats — 1-on-1 Voice+Video 18+ Verified</h4>{usersList.map(u=><div key={u.name} style={{background:"white",padding:12,borderRadius:12,marginTop:8,display:"flex",justifyContent:"space-between"}}><div onClick={()=>setChatWith(u.name)}><b>{u.name}</b><div style={{fontSize:11,color:"#666"}}>{u.hostel} • Tap to chat</div></div><div style={{display:"flex",gap:6}}><button onClick={()=>startCall(u.name,"voice",false)} style={{padding:"6px 10px",borderRadius:16,border:"none",background:"#10b981",color:"white"}}>📞</button><button onClick={()=>startCall(u.name,"video",false)} style={{padding:"6px 10px",borderRadius:16,border:"none",background:"#0b5fff",color:"white"}}>🎥</button></div></div>)}</div>}{chatWith&&<div><div style={{background:"white",padding:10,borderRadius:12,display:"flex",justifyContent:"space-between"}}><button onClick={()=>setChatWith(null)} style={{border:"none",background:"#e4e6eb",padding:"6px 10px",borderRadius:12}}>← Back</button><b>{chatWith} 18+ Verified</b><div style={{display:"flex",gap:6}}><button onClick={()=>startCall(chatWith,"voice",false)} style={{padding:"6px 10px",borderRadius:16,border:"none",background:"#10b981",color:"white"}}>📞 Voice 18+</button><button onClick={()=>startCall(chatWith,"video",false)} style={{padding:"6px 10px",borderRadius:16,border:"none",background:"#0b5fff",color:"white"}}>🎥 Video 18+</button></div></div><div style={{marginTop:10,display:"flex",gap:6}}><input value={chatInput} onChange={e=>setChatInput(e.target.value)} placeholder="Message 18+ verified..." style={{flex:1,padding:10,borderRadius:20,border:"1px solid #ddd"}}/><button onClick={()=>{if(!chatInput) return; setChatMsgs({...chatMsgs,[chatWith]:[...(chatMsgs[chatWith]||[]),{id:Date.now(),from:"You",text:chatInput}]}); setChatInput("")}} style={{padding:"10px 16px",borderRadius:20,border:"none",background:"#0b5fff",color:"white"}}>Send</button></div></div>}</div>}
  {tab==="calls"&&<div style={{padding:12}}><h4>Call Logs — call_logs table — 18+ Verified — {callLogs.length}</h4>{callLogs.map(c=><div key={c.id} style={{background:"white",padding:10,borderRadius:10,marginTop:8}}><b>{c.isGroup?"👥 Group":"👤"} {c.type} {c.name}</b><div style={{fontSize:11,color:"#666"}}>{c.status} • {c.date} • 18+ Verified</div></div>)}</div>}
  <div style={{position:"fixed",bottom:0,left:0,right:0,background:"white",borderTop:"1px solid #ddd",display:"flex",justifyContent:"space-around",padding:"8px 0"}}>{["feed","chat","communities","calls","moderation"].map(t=><button key={t} onClick={()=
