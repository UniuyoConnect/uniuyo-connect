"use client"
import { useState, useEffect, useRef } from "react"
export default function Home(){
const [tab,setTab]=useState("feed")
const [myHostel,setMyHostel]=useState("W4 Annex")
const [isVerified]=useState(true)
const [showMarketPost,setShowMarketPost]=useState(false)
const [newItem,setNewItem]=useState({name:"",price:"",imgUrl:null})
const [activeChat,setActiveChat]=useState(null)
const [messages,setMessages]=useState([])
const [chatInput,setChatInput]=useState("")
const [feedFilter,setFeedFilter]=useState("all")
const [commentFor,setCommentFor]=useState(null)
const [commentTxt,setCommentTxt]=useState("")
const [replyFor,setReplyFor]=useState(null)
const [shareFor,setShareFor]=useState(null)
const [showStickers,setShowStickers]=useState(false)
const [showMentions,setShowMentions]=useState(false)
const [notifications,setNotifications]=useState([{id:1,text:"Favour E. mentioned you in NDDC Male @You",time:"2m",read:false,type:"mention"},{id:2,text:"John liked your comment ❤️",time:"5m",read:false,type:"like"}])
const [unreadMsgs,setUnreadMsgs]=useState(1)
const [showPopup,setShowPopup]=useState(null)
const audioRef=useRef(null)

const stickers=["😂","😭","❤️","🔥","😍","🙏","💀","🎉","👏","😎","🥺","🤣"]
const usersToMention=["Favour E.","John","Campus Buka","Ekom Imman","Sarah G.","David O.","You"]
const hostels=["NDDC Male","NDDC Female","W2A","W5","W4 Annex","Town Campus","NEEDS","New NDDC","Medical Hostel","Haldeen","OFF CAMPUS"]

// NOTIFICATION TONE - Web Audio API
const playTone=(type="notif")=>{
try{
const ctx=new (window.AudioContext||window.webkitAudioContext)()
const osc=ctx.createOscillator()
const gain=ctx.createGain()
osc.connect(gain); gain.connect(ctx.destination)
if(type==="mention"){ osc.frequency.value=880; gain.gain.value=0.3; osc.type="sine" }
else if(type==="message"){ osc.frequency.value=600; gain.gain.value=0.4; osc.type="sine" }
else { osc.frequency.value=440; gain.gain.value=0.2 }
osc.start(); gain.gain.exponentialRampToValueAtTime(0.01,ctx.currentTime+0.5); osc.stop(ctx.currentTime+0.5)
}catch(e){ console.log("Audio blocked",e) }
}

const pushNotif=(text,type="mention")=>{
const n={id:Date.now(),text,time:"now",read:false,type}
setNotifications(prev=>[n,...prev])
setShowPopup(n)
playTone(type)
setTimeout(()=>setShowPopup(null),3000)
if("vibrate" in navigator) navigator.vibrate(200)
}

const [posts,setPosts]=useState([
{id:1,name:"Favour E.",tag:"19/AG/BCH/123 • Agriculture",time:"2h",text:"Who has GST 111 past questions? 😭",likes:13,liked:true,cat:"general",verified:true,comments:[{id:101,name:"You",text:"I get am, DM me",likes:2,liked:false,sticker:null,img:null,replies:[]}]}
])

const [market,setMarket]=useState([{id:1,name:"Jollof + Chicken",price:"₦1500",seller:"Campus Buka",img:"🍛",imgUrl:null,verified:true,hostel:"NDDC Male"}])
const [txt,setTxt]=useState("")
const likePost=(id)=>{ setPosts(posts.map(p=>p.id===id?{...p,likes:p.liked?p.likes-1:p.likes+1,liked:!p.liked}:p)); if(!posts.find(p=>p.id===id)?.liked) pushNotif("Someone liked your post ❤️","like") }
const likeComment=(postId,commentId)=>{ setPosts(posts.map(p=>{if(p.id!==postId) return p; return {...p,comments:p.comments.map(c=>c.id===commentId?{...c,likes:c.liked?c.likes-1:c.likes+1,liked:!c.liked}:c)} })); pushNotif("Someone liked your comment ❤️","like") }
const handleImg=(e)=>{const f=e.target.files[0]; if(f){const r=new FileReader(); r.onload=(ev)=>setNewItem({...newItem,imgUrl:ev.target.result}); r.readAsDataURL(f)}}
const handleCommentImg=(e)=>{const f=e.target.files[0]; if(f){const r=new FileReader(); r.onload=(ev)=>{ addComment(posts.find(p=>p.id===commentFor),null,ev.target.result,null) }; r.readAsDataURL(f)}}
const addComment=(postObj, sticker=null, img=null, customText=null)=>{
const textToUse = customText!==null? customText : commentTxt
if(!textToUse.trim() &&!sticker &&!img) return
if(textToUse.includes("@")){ const mentioned=textToUse.match(/@\w+/g); if(mentioned){ pushNotif(`You mentioned ${mentioned.join(", ")} - they will get tone 🔔`, "mention") } }
setPosts(posts.map(p=>{ if(p.id!==postObj.id) return p; const newC={id:Date.now(),name:"You",text:textToUse,likes:0,liked:false,sticker,img,replies:[]}; if(replyFor){ const parent=p.comments.find(c=>c.id===replyFor); if(parent){ parent.replies.push({name:"You",text:textToUse,likes:0,liked:false}); setReplyFor(null); setCommentTxt(""); pushNotif("Reply sent! User will get notification 🔔","mention"); return p } } return {...p,comments:[...p.comments,newC]} })); setCommentTxt(""); setShowStickers(false); setShowMentions(false); pushNotif("Comment posted ✓","like")
}
const sharePost=(postId,target)=>{ const post=posts.find(p=>p.id===postId); const newP={...post,id:Date.now(),tag:`Shared to ${target} • ${myHostel}`,time:"now"}; setPosts([newP,...posts]); setShareFor(null); pushNotif(`Shared to ${target} ✓ - Tone played!`,"mention") }

return(
<div style={{minHeight:"100vh",background:"#f5f5f5",paddingBottom:80}}>
{showPopup&&<div style={{position:"fixed",top:60,left:12,right:12,background:"#111827",color:"white",padding:"12px 14px",borderRadius:12,zIndex:100,display:"flex",justifyContent:"space-between",alignItems:"center"}}><div><div style={{fontWeight:"bold",fontSize:12}}>🔔 {showPopup.type==="message"?"New Message":"Notification"} *ding*</div><div style={{fontSize:11,marginTop:2}}>{showPopup.text}</div></div><span style={{fontSize:16}}>🔊</span></div>}

<div style={{background:"white",padding:"12px 16px",borderBottom:"1px solid #eee",display:"flex",justifyContent:"space-between",position:"sticky",top:0,zIndex:20}}><b>🎓 Uniuyo Connect</b><div style={{display:"flex",gap:10,alignItems:"center"}}><span onClick={()=>{setTab("chatlist"); setUnreadMsgs(0)}} style={{fontSize:18,position:"relative"}}>💬{unreadMsgs>0&&<span style={{position:"absolute",top:-6,right:-8,background:"red",color:"white",fontSize:9,padding:"2px 6px",borderRadius:10}}>{unreadMsgs}</span>}</span><span onClick={()=>setTab("notifications")} style={{fontSize:18,position:"relative"}}>🔔{notifications.filter(n=>!n.read).length>0&&<span style={{position:"absolute",top:-6,right:-6,background:"red",color:"white",fontSize:9,padding:"2px 5px",borderRadius:10}}>{notifications.filter(n=>!n.read).length}</span>}</span><span style={{fontSize:10,background:"#dcfce7",padding:"4px 8px",borderRadius:20}}>✓ Verified</span></div></div>

{tab==="feed"&&<><div style={{background:"white",margin:12,padding:12,borderRadius:16}}><div style={{display:"flex",gap:6,marginBottom:8}}><span style={{fontSize:10,background:"#fef3c7",padding:"4px 8px",borderRadius:20}}>🔊 Notification with tone ON</span><span style={{fontSize:10,background:"#dbeafe",padding:"4px 8px",borderRadius:20}}>💬 Message tone ON</span></div><textarea value={txt} onChange={e=>setTxt(e.target.value)} placeholder={`What's happening in ${myHostel}? Use @ for mention + tone`} style={{width:"100%",background:"#f3f4f6",border:"none",padding:12,borderRadius:12,outline:"none"}} rows={2}/><button onClick={()=>{if(txt.trim()){ if(txt.includes("@")) pushNotif(`Post with @mention in ${myHostel} - tone sent!`,"mention"); setPosts([{id:Date.now(),name:"You",tag:`16/AG/AS/303 • ${myHostel}`,time:"now",text:txt,likes:0,liked:false,cat:"general",verified:true,comments:[]},...posts]);setTxt(""); playTone("like") }}} style={{marginTop:8,width:"100%",background:"#2563eb",color:"white",padding:10,borderRadius:10,border:"none",fontWeight:"bold"}}>Post to {myHostel} 🔊</button></div>
<div style={{padding:"0 12px",display:"flex",flexDirection:"column",gap:10}}>{posts.map(p=><div key={p.id} style={{background:"white",padding:14,borderRadius:14}}><div style={{display:"flex",gap:8}}><div style={{width:36,height:36,background:"#e5e7eb",borderRadius:18}}></div><div><div style={{fontWeight:"bold",fontSize:13}}>{p.name} ✓</div><div style={{fontSize:11,color:"#6b7280"}}>{p.tag} • {p.time}</div></div></div><div style={{marginTop:10,fontSize:14}}>{p.text}</div><div style={{marginTop:10,display:"flex",gap:18,fontSize:12,color:"#6b7280",borderTop:"1px solid #f3f4f6",paddingTop:10}}><span onClick={()=>likePost(p.id)} style={{color:p.liked?"red":""}}>{p.liked?"❤️":"🤍"} {p.likes}</span><span onClick={()=>setCommentFor(commentFor===p.id?null:p.id)}>💬 Comment ({p.comments.length})</span><span onClick={()=>setShareFor(shareFor===p.id?null:p.id)}>↗️ Share</span></div>
{commentFor===p.id&&<div style={{marginTop:10}}>{p.comments.map(c=><div key={c.id} style={{background:"#f3f4f6",padding:10,borderRadius:12,marginBottom:8}}><div style={{display:"flex",justifyContent:"space-between"}}><div><b style={{fontSize:12}}>{c.name}</b><div style={{fontSize:13}}>{c.text} {c.sticker}</div>{c.img&&<img src={c.img} style={{width:100,height:80,objectFit:"cover",borderRadius:8,marginTop:4}}/>}</div><span onClick={()=>likeComment(p.id,c.id)} style={{fontSize:11,color:c.liked?"red":"#6b7280"}}>{c.liked?"❤️":"🤍"} {c.likes}</span></div><div style={{marginTop:6,display:"flex",gap:10}}><span onClick={()=>{setReplyFor(c.id); setCommentTxt(`@${c.name} `)}} style={{fontSize:11,color:"#2563eb"}}>Reply + Tone</span></div></div>)}
<div style={{marginTop:8,background:"white",border:"1px solid #e5e7eb",borderRadius:20,padding:"6px 10px",display:"flex",gap:6,alignItems:"center"}}><button onClick={()=>setShowMentions(!showMentions)} style={{border:"none",background:"#f3f4f6",borderRadius:15,padding:"4px 8px",fontSize:12}}>@</button><button onClick={()=>setShowStickers(!showStickers)} style={{border:"none",background:"#f3f4f6",borderRadius:15,padding:"4px 8px"}}>😊</button><label style={{background:"#f3f4f6",borderRadius:15,padding:"4px 8px"}}>📷<input type="file" accept="image/*" onChange={handleCommentImg} style={{display:"none"}}/></label><input value={commentTxt} onChange={e=>setCommentTxt(e.target.value)} placeholder="@mention = tone + notify!" style={{flex:1,border:"none",outline:"none",fontSize:12}}/><button onClick={()=>addComment(p,null,null,commentTxt)} style={{background:"#2563eb",color:"white",border:"none",padding:"6px 12px",borderRadius:15,fontSize:11,fontWeight:"bold"}}>Post 🔊</button></div>
{showStickers&&<div style={{marginTop:8,background:"white",padding:8,borderRadius:12,display:"flex",gap:8,flexWrap:"wrap"}}>{stickers.map(s=><span key={s} onClick={()=>addComment(p,s,null,commentTxt)} style={{fontSize:20,padding:6,background:"#f9fafb",borderRadius:8}}>{s}</span>)}</div>}
{showMentions&&<div style={{marginTop:6,background:"white",border:"1px solid #eee",borderRadius:10,padding:6}}><div style={{fontSize:10,color:"#6b7280"}}>Tap to mention — they get 🔊 tone + 🔔</div>{usersToMention.map(u=><div key={u} onClick={()=>{setCommentTxt(commentTxt+"@"+u.split(" ")[0]+" "); setShowMentions(false); playTone("mention")}} style={{padding:8,fontSize:12,borderBottom:"1px solid #f3f4f6"}}>👤 {u} <span style={{color:"#2563eb",fontSize:10}}>— will get tone 🔊</span></div>)}</div>}
</div>}</div>)}</div></>}

{tab==="chatlist"&&<div style={{padding:12}}><h2 style={{fontWeight:"bold"}}>💬 Messages 🔊 Tone ON</h2><div style={{background:"white",padding:12,borderRadius:12,marginTop:10}}><div style={{display:"flex",justifyContent:"space-between"}}><b>Campus Buka</b><span style={{fontSize:10,background:"red",color:"white",padding:"2px 6px",borderRadius:10}}>{unreadMsgs} new • tone</span></div><div style={{fontSize:12,color:"#6b7280",marginTop:4}}>Jollof still available? *ding* 🔊</div><button onClick={()=>{setActiveChat({name:"Jollof + Chicken",seller:"Campus Buka"}); setTab("chat"); setUnreadMsgs(0); playTone("message")}} style={{marginTop:8,background:"#2563eb",color:"white",border:"none",padding:8,borderRadius:8,fontSize:11}}>Open Chat + Tone 🔊</button></div><button onClick={()=>{pushNotif("Test message notification *ding* 🔊","message"); setUnreadMsgs(unreadMsgs+1)}} style={{marginTop:12,width:"100%",background:"#111827",color:"white",padding:10,borderRadius:10,border:"none"}}>🔊 Test Message Tone</button></div>}

{tab==="notifications"&&<div style={{padding:12}}><h2 style={{fontWeight:"bold"}}>🔔 All Notifications 🔊</h2><div style={{fontSize:11,color:"#6b7280",marginTop:4}}>Every @mention and message comes with tone + vibration</div><div style={{display:"flex",flexDirection:"column",gap:8,marginTop:12}}>{notifications.map(n=><div key={n.id} style={{background:n.read?"white":"#eff6ff",padding:12,borderRadius:12}}><div style={{fontSize:12,fontWeight:"bold"}}>{n.type==="message"?"💬":"🔔"} {n.text} 🔊</div><div style={{fontSize:10,color:"#6b7280",marginTop:4}}>{n.time} • Tone played {n.type==="mention"?"*high ding*":"*pop*"}</div></div>)}</div><div style={{display:"flex",gap:8,marginTop:12}}><button onClick={()=>pushNotif("You were mentioned in W4 Annex @You 🔊","mention")} style={{flex:1,background:"#2563eb",color:"white",border:"none",padding:10,borderRadius:10,fontSize:11}}>Test @ Tone 🔊</button><button onClick={()=>{pushNotif("New message from Campus Buka 💬","message"); setUnreadMsgs(unreadMsgs+1)}} style={{flex:1,background:"#111827",color:"white",border:"none",padding:10,borderRadius:10,fontSize:11}}>Test Msg Tone 🔊</button></div></div>}

{tab==="community"&&<div style={{padding:12}}><h3>🏠 Community</h3><div style={{fontSize:11,marginTop:6}}>Your hostel: {myHostel} • @mention works everywhere with tone</div></div>}
{tab==="market"&&<div style={{padding:12}}><h3>🛒 Market</h3><div style={{background:"white",padding:10,borderRadius:12,marginTop:10}}><div>Jollof + Chicken - ₦1500</div><button onClick={()=>{setActiveChat({name:"Jollof + Chicken",seller:"Campus Buka"}); setTab("chat"); pushNotif("Chat started with seller - message tone ON 🔊","message")}} style={{marginTop:6,background:"#2563eb",color:"white",border:"none",padding:8,borderRadius:8,fontSize:11}}>💬 Chat Seller + Tone</button></div></div>}
{tab==="chat"&&<div style={{display:"flex",flexDirection:"column",height:"82vh"}}><div style={{background:"white",padding:12,display:"flex",gap:8}}><span onClick={()=>setTab("chatlist")}>←</span><b>{activeChat?.seller}</b><span style={{fontSize:10,background:"#dcfce7",padding:"2px 6px",borderRadius:10}}>Tone ON 🔊</span></div><div style={{flex:1,padding:12,overflowY:"auto"}}><div style={{textAlign:"center",fontSize:10,color:"#9ca3af"}}>Messages come with *ding* tone 🔊</div>{messages.map(m=><div key={m.id} style={{background:m.from==="you"?"#2563eb":"white",color:m.from==="you"?"white":"black",padding:8,borderRadius:12,marginTop:8,maxWidth:"70%"}}>{m.text}</div>)}</div><div style={{background:"white",padding:10,display:"flex",gap:6}}><input value={chatInput} onChange={e=>setChatInput(e.target.value)} placeholder="Type... @mention = tone 🔊" style={{flex:1,padding:10,borderRadius:20,border:"1px solid #eee"}}/><button onClick={()=>{ if(chatInput.includes("@")) pushNotif(`You mentioned in chat - tone sent!`,"mention"); setMessages([...messages,{id:Date.now(),from:"you",text:chatInput,item:activeChat?.name}]); setChatInput(""); setTimeout(()=>{ setMessages(v=>[...v,{id:Date.now()+1,from:"seller",text:"Ok boss 👍",item:activeChat?.name}]); pushNotif("New message from seller 💬 *ding*","message"); setUnreadMsgs(u=>u+1); playTone("message") },1000) }} style={{background:"#2563eb",color:"white",border:"none",padding:10,borderRadius:20}}>Send 🔊</button></div></div>}
{tab==="events"&&<div style={{padding:12}}><h3>Events</h3></div>}
{tab==="profile"&&<div style={{padding:12}}><h3>Profile - {myHostel}</h3><div style={{marginTop:10,background:"white",padding:12,borderRadius:12}}><div style={{fontSize:12}}>🔊 Notification Settings</div><div style={{fontSize:11,color:"#6b7280",marginTop:6}}>✓ Mention tone: HIGH DING<br/>✓ Message tone: POP<br/>✓ Like tone: soft<br/>✓ Vibrate ON<br/>✓ Works in Feed, Community, Hostel, Comments, Chat everywhere</div></div></div>}

<div style={{position:"fixed",bottom:0,left:0,right:0,background:"white",borderTop:"1px solid #eee",display:"flex",justifyContent:"space-around",padding:"10px 0",fontSize:10,fontWeight:"bold"}}><span onClick={()=>setTab("feed")} style={{color:tab==="feed"?"#2563eb":"#9ca3af"}}>Feed</span><span onClick={()=>setTab("community")} style={{color:tab==="community"?"#2563eb":"#9ca3af"}}>Community</span><span onClick={()=>setTab("market")} style={{color:tab==="market"?"#2563eb":"#9ca3af"}}>Market</span><span onClick={()=>setTab("chatlist")} style={{color:tab==="chatlist"?"#2563eb":"#9ca3af"}}>💬 {unreadMsgs>0?`(${unreadMsgs})`:""} Chat</span><span onClick={()=>setTab("notifications")} style={{color:tab==="notifications"?"#2563eb":"#9ca3af"}}>🔔 Alerts</span></div>
</div>
)}
