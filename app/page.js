"use client"
import { useState } from "react"
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
const [notifications,setNotifications]=useState([
{id:1,text:"Favour E. mentioned you @You in W4 Annex",time:"2m",read:false,type:"mention"},
{id:2,text:"John liked your comment ❤️",time:"5m",read:false,type:"like"},
{id:3,text:"New message from Campus Buka 💬",time:"now",read:false,type:"message"}
])
const [unreadMsgs,setUnreadMsgs]=useState(1)
const [showPopup,setShowPopup]=useState(null)
const stickers=["😂","😭","❤️","🔥","😍","🙏","💀","🎉","👏","😎","🥺","🤣"]
const users=["Favour E.","John","Campus Buka","Ekom Imman","Sarah G.","David O.","You"]
const hostels=["NDDC Male","NDDC Female","W2A","W5","W4 Annex","Town Campus","NEEDS","New NDDC","Medical Hostel","Haldeen","OFF CAMPUS"]

// 🔊 TONE FUNCTION
const playTone=(type)=>{
try{
const ctx=new (window.AudioContext||window.webkitAudioContext)()
const o=ctx.createOscillator(); const g=ctx.createGain()
o.connect(g); g.connect(ctx.destination)
if(type==="mention"){o.frequency.value=880; g.gain.value=0.35}
else if(type==="message"){o.frequency.value=650; g.gain.value=0.4}
else {o.frequency.value=500; g.gain.value=0.3}
o.start(); g.gain.exponentialRampToValueAtTime(0.01,ctx.currentTime+0.6); o.stop(ctx.currentTime+0.6)
}catch(e){}
if("vibrate" in navigator) navigator.vibrate(type==="message"?[100,50,100]:200)
}

const pushNotif=(text,type)=>{
const n={id:Date.now(),text,time:"now",read:false,type}
setNotifications(p=>[n,...p])
setShowPopup(n)
playTone(type)
setTimeout(()=>setShowPopup(null),3500)
}

const [posts,setPosts]=useState([
{id:1,name:"Favour E.",tag:"19/AG/BCH/123 • Agriculture",time:"2h",text:"Who has GST 111 past questions? 😭",likes:13,liked:true,cat:"general",verified:true,comments:[
{id:101,name:"You",text:"I get am, DM me",likes:2,liked:false,img:null,sticker:null,replies:[{name:"You",text:"@You where you dey",likes:1,liked:true}]},
{id:102,name:"John",text:"Same here",likes:1,liked:false,img:null,sticker:null,replies:[{name:"Favour",text:"Send to my hostel NDDC",likes:0,liked:false}]}
]},
{id:2,name:"Campus Buka",tag:"Vendor • Food Review",time:"5h",text:"Jollof + Chicken ₦1500 today! Free delivery NDDC - Who don chop?",likes:46,liked:true,cat:"food",verified:true,comments:[]}
])
const [market,setMarket]=useState([{id:1,name:"Jollof + Chicken",price:"₦1500",seller:"Campus Buka",img:"🍛",imgUrl:null,verified:true,hostel:"NDDC Male"}])
const [txt,setTxt]=useState("")
const likePost=(id)=>{const p=posts.find(x=>x.id===id); if(!p.liked) pushNotif(`❤️ Someone liked your post: "${p.text.slice(0,20)}..."`,"like"); setPosts(posts.map(p=>p.id===id?{...p,likes:p.liked?p.likes-1:p.likes+1,liked:!p.liked}:p)); if(!p.liked) playTone("like")}
const likeComment=(postId,cId)=>{setPosts(posts.map(p=>p.id!==postId?p:{...p,comments:p.comments.map(c=>c.id===cId?{...c,likes:c.liked?c.likes-1:c.likes+1,liked:!c.liked}:c)})); pushNotif("❤️ Someone liked your comment","like"); playTone("like")}
const handleImg=(e)=>{const f=e.target.files[0]; if(f){const r=new FileReader(); r.onload=(ev)=>setNewItem({...newItem,imgUrl:ev.target.result}); r.readAsDataURL(f)}}
const handleCommentImg=(e)=>{const f=e.target.files[0]; if(f){const r=new FileReader(); r.onload=(ev)=>{ addComment(posts.find(p=>p.id===commentFor),null,ev.target.result,commentTxt)}; r.readAsDataURL(f)}}
const addComment=(postObj,sticker=null,img=null,text=null)=>{
const t=text!==null?text:commentTxt
if(!t.trim()&&!sticker&&!img) return
if(t.includes("@")) pushNotif(`You mentioned ${t.match(/@\w+/g)?.join(", ")} - they get 🔊 DING!`,"mention")
else pushNotif("Comment posted ✓","like")
setPosts(posts.map(p=>{
if(p.id!==postObj.id) return p
const newC={id:Date.now(),name:"You",text:t,likes:0,liked:false,sticker,img,replies:[]}
if(replyFor){const parent=p.comments.find(c=>c.id===replyFor); if(parent){parent.replies.push({name:"You",text:t,likes:0,liked:false}); setReplyFor(null); setCommentTxt(""); return p}}
return {...p,comments:[...p.comments,newC]}
})); setCommentTxt(""); setShowStickers(false); setShowMentions(false); playTone("mention")
}
const sharePost=(postId,target)=>{const post=posts.find(p=>p.id===postId); const newP={...post,id:Date.now(),tag:`Shared to ${target} • ${myHostel}`,time:"now"}; setPosts([newP,...posts]); setShareFor(null); pushNotif(`Shared to ${target} ↗️ Tone played 🔊`,"mention")}

return(
<div style={{minHeight:"100vh",background:"#f5f5f5",paddingBottom:80}}>
{showPopup&&<div style={{position:"fixed",top:65,left:10,right:10,background:"#0f172a",color:"white",padding:"14px",borderRadius:14,zIndex:999,display:"flex",justifyContent:"space-between",boxShadow:"0 8px 24px rgba(0,0,0,0.3)"}}><div><div style={{fontWeight:"bold",fontSize:12}}>{showPopup.type==="message"?"💬 New Message 🔊":"🔔 Notification 🔊"} - *DING*</div><div style={{fontSize:11,marginTop:4}}>{showPopup.text}</div></div><div style={{fontSize:20}}>🔊</div></div>}

<div style={{background:"white",padding:"12px 16px",borderBottom:"1px solid #eee",display:"flex",justifyContent:"space-between",position:"sticky",top:0,zIndex:20}}><b>🎓 Uniuyo Connect</b><div style={{display:"flex",gap:12,alignItems:"center"}}><span onClick={()=>{setTab("chat"); setUnreadMsgs(0)}} style={{position:"relative",fontSize:20}}>💬{unreadMsgs>0&&<span style={{position:"absolute",top:-8,right:-10,background:"red",color:"white",fontSize:10,padding:"2px 6px",borderRadius:10}}>{unreadMsgs}</span>}</span><span onClick={()=>setTab("notifs")} style={{position:"relative",fontSize:20}}>🔔{notifications.filter(n=>!n.read).length>0&&<span style={{position:"absolute",top:-8,right:-8,background:"red",color:"white",fontSize:10,padding:"2px 6px",borderRadius:10}}>{notifications.filter(n=>!n.read).length}</span>}</span><span style={{fontSize:10,background:"#dcfce7",padding:"4px 8px",borderRadius:20}}>✓ Verified</span></div></div>

{tab==="feed"&&<><div style={{background:"white",margin:12,padding:12,borderRadius:16}}><div style={{display:"flex",gap:6,marginBottom:8}}><span style={{fontSize:10,background:"#fef3c7",padding:"4px 8px",borderRadius:20}}>🔊 Tone ON</span><span style={{fontSize:10,background:"#dbeafe",padding:"4px 8px",borderRadius:20}}>Vibrate ON</span></div><textarea value={txt} onChange={e=>setTxt(e.target.value)} placeholder={`What's happening in ${myHostel}? Use @ to mention + tone`} style={{width:"100%",background:"#f3f4f6",border:"none",padding:12,borderRadius:12,outline:"none"}} rows={2}/><button onClick={()=>{if(txt.trim()){if(txt.includes("@")) pushNotif(`Post mentions someone in ${myHostel} 🔊`,"mention"); setPosts([{id:Date.now(),name:"You",tag:`16/AG/AS/303 • ${myHostel}`,time:"now",text:txt,likes:0,liked:false,cat:"general",verified:true,comments:[]},...posts]); setTxt(""); playTone("like")}}} style={{marginTop:8,width:"100%",background:"#2563eb",color:"white",padding:10,borderRadius:10,border:"none",fontWeight:"bold"}}>Post to {myHostel} 🔊</button></div>
<div style={{padding:"0 12px",display:"flex",flexDirection:"column",gap:10}}>{posts.map(p=><div key={p.id} style={{background:"white",padding:14,borderRadius:14}}><div style={{display:"flex",gap:8}}><div style={{width:36,height:36,background:"#e5e7eb",borderRadius:18}}></div><div><div style={{fontWeight:"bold",fontSize:13}}>{p.name} {p.verified?"✓":""}</div><div style={{fontSize:11,color:"#6b7280"}}>{p.tag} • {p.time}</div></div></div><div style={{marginTop:10,fontSize:14}}>{p.text}</div><div style={{marginTop:10,display:"flex",gap:18,fontSize:12,color:"#6b7280",borderTop:"1px solid #f3f4f6",paddingTop:10}}><span onClick={()=>likePost(p.id)} style={{color:p.liked?"red":"",fontWeight:"bold"}}>{p.liked?"❤️":"🤍"} {p.likes}</span><span onClick={()=>setCommentFor(commentFor===p.id?null:p.id)} style={{fontWeight:"bold"}}>💬 Comment ({p.comments.length})</span><span onClick={()=>setShareFor(shareFor===p.id?null:p.id)} style={{fontWeight:"bold"}}>↗️ Share</span></div>
{shareFor===p.id&&<div style={{marginTop:10,background:"#f9fafb",padding:10,borderRadius:10}}><div style={{display:"flex",gap:6,flexWrap:"wrap"}}><button onClick={()=>sharePost(p.id,"Timeline")} style={{padding:"6px 10px",borderRadius:20,border:"none",background:"#2563eb",color:"white",fontSize:11}}>Timeline + 🔊</button>{hostels.map(h=><button key={h} onClick={()=>sharePost(p.id,h)} style={{padding:"6px 10px",borderRadius:20,border:"1px solid #e5e7eb",background:"white",fontSize:11}}>🏠 {h}</button>)}</div></div>}
{commentFor===p.id&&<div style={{marginTop:10}}>{p.comments.map(c=><div key={c.id} style={{background:"#f3f4f6",padding:10,borderRadius:12,marginBottom:8}}><div style={{display:"flex",justifyContent:"space-between"}}><div><b style={{fontSize:12}}>{c.name}</b><div style={{fontSize:13}}>{c.text} {c.sticker&&<span style={{fontSize:18}}>{c.sticker}</span>}</div>{c.img&&<img src={c.img} style={{width:120,height:80,objectFit:"cover",borderRadius:8,marginTop:6}}/>}</div><span onClick={()=>likeComment(p.id,c.id)} style={{fontSize:12,color:c.liked?"red":"#6b7280",fontWeight:"bold"}}>{c.liked?"❤️":"🤍"} {c.likes}</span></div><div style={{marginTop:6,display:"flex",gap:10}}><span onClick={()=>{setReplyFor(c.id); setCommentTxt(`@${c.name} `); playTone("mention")}} style={{fontSize:11,color:"#2563eb",fontWeight:"bold"}}>Reply + 🔊</span><span style={{fontSize:11,color:"#6b7280"}}>Like ({c.likes})</span></div>{c.replies?.map((r,i)=><div key={i} style={{marginLeft:12,marginTop:8,background:"white",padding:8,borderRadius:10}}><b style={{fontSize:11}}>{r.name}:</b><span style={{fontSize:12}}> {r.text}</span></div>)}</div>)}
<div style={{marginTop:8,background:"white",border:"1px solid #e5e7eb",borderRadius:20,padding:"6px 10px",display:"flex",gap:6,alignItems:"center"}}><button onClick={()=>setShowMentions(!showMentions)} style={{border:"none",background:"#f3f4f6",borderRadius:15,padding:"5px 9px",fontSize:13,fontWeight:"bold"}}>@</button><button onClick={()=>setShowStickers(!showStickers)} style={{border:"none",background:"#f3f4f6",borderRadius:15,padding:"5px 9px"}}>😊</button><label style={{background:"#f3f4f6",borderRadius:15,padding:"5px 9px"}}>📷<input type="file" accept="image/*" onChange={handleCommentImg} style={{display:"none"}}/></label><input value={commentTxt} onChange={e=>{setCommentTxt(e.target.value); if(e.target.value.includes("@")) setShowMentions(true)}} placeholder="@ = tone 🔊" style={{flex:1,border:"none",outline:"none",fontSize:12}}/><button onClick={()=>addComment(p,null,null,commentTxt)} style={{background:"#2563eb",color:"white",border:"none",padding:"7px 14px",borderRadius:15,fontSize:12,fontWeight:"bold"}}>Post 🔊</button></div>
{showStickers&&<div style={{marginTop:8,background:"white",padding:10,borderRadius:12,display:"flex",gap:10,flexWrap:"wrap",border:"1px solid #eee"}}>{stickers.map(s=><span key={s} onClick={()=>addComment(p,s,null,commentTxt)} style={{fontSize:24,padding:6,background:"#f9fafb",borderRadius:8}}>{s}</span>)}</div>}
{showMentions&&<div style={{marginTop:6,background:"white",border:"1px solid #eee",borderRadius:12,padding:6}}><div style={{fontSize:10,color:"#6b7280",padding:4}}>Tap to mention — they get 🔊 DING + vibration</div>{users.map(u=><div key={u} onClick={()=>{setCommentTxt(commentTxt+"@"+u.split(" ")[0]+" "); setShowMentions(false); playTone("mention")}} style={{padding:8,fontSize:13,borderBottom:"1px solid #f9fafb",display:"flex",justifyContent:"space-between"}}><span>👤 {u}</span><span style={{fontSize:10,color:"#2563eb"}}>🔊 tone</span></div>)}</div>}
</div>}</div>)}</div></>}

{tab==="notifs"&&<div style={{padding:12}}><h2 style={{fontWeight:"bold"}}>🔔 Notifications 🔊</h2><div style={{fontSize:11,color:"#6b7280",marginTop:4}}>Every @mention + message + like comes with tone + vibration</div><div style={{marginTop:12,display:"flex",flexDirection:"column",gap:8}}>{notifications.map(n=><div key={n.id} style={{background:n.read?"white":"#eff6ff",padding:12,borderRadius:12,borderLeft:n.type==="mention"?"4px solid #2563eb":n.type==="message"?"4px solid #10b981":"4px solid #f59e0b"}}><div style={{fontSize:12,fontWeight:"bold"}}>{n.type==="mention"?"🔔 @Mention 🔊":n.type==="message"?"💬 Message 🔊":"❤️ Like"} - {n.text}</div><div style={{fontSize:10,color:"#6b7280",marginTop:4}}>{n.time} • Tone: {n.type==="mention"?"HIGH DING 880Hz":n.type==="message"?"POP 650Hz + Vibrate":"Soft"} • Everywhere: Feed, Hostel, Community, Comment, Chat</div></div>)}</div><div style={{display:"flex",gap:8,marginTop:14}}><button onClick={()=>{pushNotif("Test @mention in W4 Annex @You - You get DING 🔊","mention")}} style={{flex:1,background:"#2563eb",color:"white",border:"none",padding:12,borderRadius:10,fontWeight:"bold"}}>Test @ Tone 🔊</button><button onClick={()=>{pushNotif("New message from Campus Buka: Jollof ready! 💬","message"); setUnreadMsgs(unreadMsgs+1)}} style={{flex:1,background:"#111827",color:"white",border:"none",padding:12,borderRadius:10,fontWeight:"bold"}}>Test Msg 🔊</button></div><button onClick={()=>setTab("feed")} style={{marginTop:10,width:"100%",background:"white",border:"1px solid #eee",padding:10,borderRadius:10}}>Back to Feed</button></div>}

{tab==="chat"&&<div style={{display:"flex",flexDirection:"column",height:"82vh"}}><div style={{background:"white",padding:12,display:"flex",gap:8,alignItems:"center",borderBottom:"1px solid #eee"}}><span onClick={()=>setTab("feed")} style={{fontSize:18}}>←</span><b>Campus Buka</b><span style={{fontSize:10,background:"#dcfce7",padding:"3px 8px",borderRadius:10,marginLeft:8}}>Tone ON 🔊</span></div><div style={{flex:1,padding:12,overflowY:"auto"}}><div style={{textAlign:"center",fontSize:10,color:"#9ca3af",marginBottom:10}}>💬 Messages with tone 🔊 + vibrate + @mention everywhere</div>{messages.map(m=><div key={m.id} style={{background:m.from==="you"?"#2563eb":"white",color:m.from==="you"?"white":"black",padding:10,borderRadius:14,marginTop:8,maxWidth:"75%",alignSelf:m.from==="you"?"flex-end":"flex-start"}}>{m.text}</div>)}</div><div style={{background:"white",padding:10,display:"flex",gap:6}}><input value={chatInput} onChange={e=>setChatInput(e.target.value)} placeholder="Type... @ = tone 🔊" style={{flex:1,padding:12,borderRadius:24,border:"1px solid #eee",outline:"none"}}/><button onClick={()=>{if(!chatInput.trim()) return; if(chatInput.includes("@")) pushNotif(`You mentioned someone in chat 🔊`,"mention"); setMessages([...messages,{id:Date.now(),from:"you",text:chatInput}]); setChatInput(""); setTimeout(()=>{setMessages(v=>[...v,{id:Date.now()+1,from:"seller",text:"Ok boss, I dey W4 Annex now 👍"}]); pushNotif("New message from Campus Buka 💬 *ding*","message"); setUnreadMsgs(u=>u+1); playTone("message")},1200)}} style={{background:"#2563eb",color:"white",border:"none",padding:"12px 18px",borderRadius:24,fontWeight:"bold"}}>Send 🔊</button></div></div>}

{tab==="community"&&<div style={{padding:12}}><h3>🏠 Community - @ tone everywhere</h3><select value={myHostel} onChange={e=>setMyHostel(e.target.value)} style={{width:"100%",padding:10,marginTop:8,borderRadius:8}}>{hostels.map(h=><option key={h}>{h}</option>)}</select></div>}
{tab==="market"&&<div style={{padding:12}}><h3>🛒 Market</h3></div>}
{tab==="events"&&<div style={{padding:12}}><h3>📅 Events</h3></div>}
{tab==="profile"&&<div style={{padding:12}}><h3>👤 Profile - {myHostel} ✓</h3><div style={{background:"white",padding:12,borderRadius:12,marginTop:10}}><div style={{fontWeight:"bold",fontSize:13}}>🔊 Notification Settings - ACTIVE</div><div style={{fontSize:12,color:"#6b7280",marginTop:8,lineHeight:"1.6"}}>✓ @ Mention in Feed → HIGH DING 880Hz + Vibrate<br/>✓ @ Mention in Comment → HIGH DING + Popup<br/>✓ @ Mention in Hostel → DING + 🔔 Badge<br/>✓ @ Mention in Community → DING<br/>✓ New Message → POP 650Hz + Vibrate + Red Badge<br/>✓ Like on Comment → Soft tone<br/>✓ Share → Tone + Notification<br/>✓ Works everywhere: Feed, Community, Hostels, Comments, Chat</div></div></div>}

<div style={{position:"fixed",bottom:0,left:0,right:0,background:"white",borderTop:"1px solid #eee",display:"flex",justifyContent:"space-around",padding:"10px 0",fontSize:10,fontWeight:"bold"}}><span onClick={()=>setTab("feed")} style={{color:tab==="feed"?"#2563eb":"#9ca3af"}}>📱 Feed</span><span onClick={()=>setTab("community")} style={{color:tab==="community"?"#2563eb":"#9ca3af"}}>🏠 Hostels</span><span onClick={()=>setTab("market")} style={{color:tab==="market"?"#2563eb":"#9ca3af"}}>🛒 Market</span><span onClick={()=>{setTab("chat"); setUnreadMsgs(0)}} style={{color:tab==="chat"?"#2563eb":"#9ca3af"}}>💬 Chat {unreadMsgs>0?`(${unreadMsgs})`:""}</span><span onClick={()=>setTab("notifs")} style={{color:tab==="notifs"?"#2563eb":"#9ca3af"}}>🔔 {notifications.filter(n=>!n.read).length>0?`(${notifications.filter(n=>!n.read).length})`:""} Alerts</span></div>
</div>
)}
