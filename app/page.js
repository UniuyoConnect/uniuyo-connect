"use client"
import { useState } from "react"
export default function Home(){
const [tab,setTab]=useState("feed")
const [commType,setCommType]=useState("faculty")
const [myHostel,setMyHostel]=useState("NDDC Male")
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

const faculties=["Agriculture","Arts","Basic Medical","Business Admin","Clinical Science","Education","Engineering","Environmental","Law","Pharmacy","Science","Social Science"]
const hostels=["NDDC Male","NDDC Female","W2A","W5","W4 Annex","Town Campus","NEEDS","New NDDC","Medical Hostel","Haldeen","OFF CAMPUS"]

const [posts,setPosts]=useState([
{id:1,name:"Favour E.",tag:"19/AG/BCH/123 • Agriculture",time:"2h",text:"Who has GST 111 past questions? 😭",likes:13,liked:true,cat:"general",verified:true,comments:[{id:101,name:"You",text:"I get am, DM me",replies:[]},{id:102,name:"John",text:"Same here",replies:[{name:"Favour",text:"Send to my hostel NDDC"}]}]},
{id:2,name:"Campus Buka",tag:"Vendor • Food Review",time:"5h",text:"Jollof + Chicken ₦1500 today! Free delivery NDDC - Who don chop?",likes:46,liked:true,cat:"food",verified:true,comments:[]},
{id:3,name:"Anonymous",tag:"Confession • NDDC Male",time:"1h",text:"Crush on that girl in Engineering always on white 😍 Anonymous please",likes:90,liked:true,cat:"confession",verified:false,comments:[{id:103,name:"Anonymous",text:"I know her 😏",replies:[]}]},
])

const [market,setMarket]=useState([
{id:1,name:"Jollof + Chicken",price:"₦1500",seller:"Campus Buka",img:"🍛",imgUrl:null,verified:true,hostel:"NDDC Male"},
{id:2,name:"GST 111 Handout",price:"₦500",seller:"Library Vendor",img:"📚",imgUrl:null,verified:true,hostel:"Town Campus"},
{id:3,name:"Power Bank 20k mAh",price:"₦12000",seller:"Ekom Imman",img:"🔋",imgUrl:null,verified:true,hostel:"OFF CAMPUS"},
{id:4,name:"Ladies Gown - New",price:"₦7000",seller:"Fashion Hub",img:"👗",imgUrl:null,verified:true,hostel:"W2A"}
])

const [txt,setTxt]=useState("")
const likePost=(id)=>{setPosts(posts.map(p=>p.id===id?{...p,likes:p.liked?p.likes-1:p.likes+1,liked:!p.liked}:p))}
const handleImg=(e)=>{const f=e.target.files[0]; if(f){const r=new FileReader(); r.onload=(ev)=>setNewItem({...newItem,imgUrl:ev.target.result}); r.readAsDataURL(f)}}
const postMarket=()=>{ if(!isVerified) return alert("Only verified ✓ can sell!"); if(!newItem.name||!newItem.price) return alert("Add name & price"); setMarket([{id:Date.now(),name:newItem.name,price:"₦"+newItem.price,seller:"You",img:"📦",imgUrl:newItem.imgUrl,verified:true,hostel:myHostel},...market]); setNewItem({name:"",price:"",imgUrl:null}); setShowMarketPost(false)}
const openChat=(m)=>{setActiveChat(m); setTab("chat")}
const sendMsg=()=>{ if(!chatInput.trim()||!activeChat) return; setMessages([...messages,{id:Date.now(),from:"you",text:chatInput,item:activeChat.name}]); setChatInput(""); setTimeout(()=>setMessages(v=>[...v,{id:Date.now()+1,from:"seller",text:"Ok boss, I dey "+myHostel+" now 👍",item:activeChat.name}]),800)}
const addComment=(postId)=>{ if(!commentTxt.trim()) return; setPosts(posts.map(p=>{ if(p.id===postId){ const newC={id:Date.now(),name:"You",text:commentTxt,replies:[]}; if(replyFor){ const parent=p.comments.find(c=>c.id===replyFor); if(parent){ parent.replies.push({name:"You",text:commentTxt}); setReplyFor(null); setCommentTxt(""); return p } } return {...p,comments:[...p.comments,newC]} } return p })); setCommentTxt(""); }
const sharePost=(postId,target)=>{ const post=posts.find(p=>p.id===postId); const newP={...post,id:Date.now(),tag:`Shared to ${target} • ${myHostel}`,time:"now"}; setPosts([newP,...posts]); setShareFor(null); alert(`Shared to ${target} ✓`); }

const filteredPosts = posts.filter(p=> feedFilter==="all" || p.cat===feedFilter)

return(
<div style={{minHeight:"100vh",background:"#f5f5f5",paddingBottom:80}}>
<div style={{background:"white",padding:"12px 16px",borderBottom:"1px solid #eee",display:"flex",justifyContent:"space-between",position:"sticky",top:0,zIndex:20}}><b>🎓 Uniuyo Connect</b><span style={{fontSize:10,background:"#dcfce7",padding:"4px 8px",borderRadius:20}}>✓ Verified Seller</span></div>

{tab==="feed"&&<><div style={{background:"white",margin:12,padding:12,borderRadius:16}}><div style={{display:"flex",gap:6,marginBottom:10,overflowX:"auto"}}>{["all","general","confession","food","lost","poll"].map(f=><span key={f} onClick={()=>setFeedFilter(f)} style={{padding:"6px 10px",borderRadius:20,fontSize:11,fontWeight:"bold",background:feedFilter===f?"#2563eb":"#f3f4f6",color:feedFilter===f?"white":"#6b7280"}}>{f.toUpperCase()}</span>)}</div><textarea value={txt} onChange={e=>setTxt(e.target.value)} placeholder={`What's happening in ${myHostel}?`} style={{width:"100%",background:"#f3f4f6",border:"none",padding:12,borderRadius:12,outline:"none"}} rows={2}/><button onClick={()=>{if(txt.trim()){setPosts([{id:Date.now(),name:"You",tag:`16/AG/AS/303 • ${myHostel}`,time:"now",text:txt,likes:0,liked:false,cat:"general",verified:isVerified,comments:[]},...posts]);setTxt("")}}} style={{marginTop:8,width:"100%",background:"#2563eb",color:"white",padding:10,borderRadius:10,border:"none",fontWeight:"bold"}}>Post to {myHostel}</button></div>

<div style={{padding:"0 12px",display:"flex",flexDirection:"column",gap:10}}>
{filteredPosts.map(p=><div key={p.id} style={{background:"white",padding:14,borderRadius:14}}>
<div style={{display:"flex",gap:8}}><div style={{width:36,height:36,background:"#e5e7eb",borderRadius:18}}></div><div><div style={{fontWeight:"bold",fontSize:13}}>{p.name} {p.verified?"✓":""}</div><div style={{fontSize:11,color:"#6b7280"}}>{p.tag} • {p.time}</div></div></div>
<div style={{marginTop:10,fontSize:14}}>{p.text}</div>

<div style={{marginTop:10,display:"flex",gap:18,fontSize:12,color:"#6b7280",borderTop:"1px solid #f3f4f6",paddingTop:10}}>
<span onClick={()=>likePost(p.id)} style={{color:p.liked?"red":"",fontWeight:"bold"}}>{p.liked?"❤️":"🤍"} {p.likes}</span>
<span onClick={()=>setCommentFor(commentFor===p.id?null:p.id)} style={{fontWeight:"bold"}}>💬 Comment {p.comments.length>0?`(${p.comments.length})`:""}</span>
<span onClick={()=>setShareFor(shareFor===p.id?null:p.id)} style={{fontWeight:"bold"}}>↗️ Share</span>
</div>

{shareFor===p.id&&<div style={{marginTop:10,background:"#f9fafb",padding:10,borderRadius:10}}><div style={{fontSize:11,fontWeight:"bold",marginBottom:6}}>Share to:</div><div style={{display:"flex",gap:6,flexWrap:"wrap"}}><button onClick={()=>sharePost(p.id,"Timeline")} style={{padding:"6px 10px",borderRadius:20,border:"none",background:"#2563eb",color:"white",fontSize:11}}>Timeline</button>{hostels.map(h=><button key={h} onClick={()=>sharePost(p.id,h)} style={{padding:"6px 10px",borderRadius:20,border:"1px solid #e5e7eb",background:"white",fontSize:11}}>🏠 {h}</button>)}{faculties.slice(0,3).map(f=><button key={f} onClick={()=>sharePost(p.id,f)} style={{padding:"6px 10px",borderRadius:20,border:"1px solid #e5e7eb",background:"white",fontSize:11}}>📚 {f}</button>)}</div></div>}

{commentFor===p.id&&<div style={{marginTop:10}}>
{p.comments.map(c=><div key={c.id} style={{background:"#f3f4f6",padding:8,borderRadius:10,marginBottom:6}}><div style={{fontSize:11,fontWeight:"bold"}}>{c.name}</div><div style={{fontSize:12}}>{c.text}</div><div style={{fontSize:10,color:"#2563eb",marginTop:4}} onClick={()=>{setReplyFor(c.id); setCommentTxt(`@${c.name} `)}}>Reply</div>{c.replies.map((r,i)=><div key={i} style={{marginLeft:12,marginTop:6,background:"white",padding:6,borderRadius:8}}><b style={{fontSize:10}}>{r.name}:</b><span style={{fontSize:11}}> {r.text}</span></div>)}</div>)}
<div style={{display:"flex",gap:6,marginTop:6}}><input value={commentTxt} onChange={e=>setCommentTxt(e.target.value)} placeholder={replyFor?"Write a reply...":"Write a comment..."} style={{flex:1,padding:8,borderRadius:20,border:"1px solid #e5e7eb",fontSize:12}}/><button onClick={()=>addComment(p.id)} style={{background:"#2563eb",color:"white",border:"none",padding:"8px 12px",borderRadius:20,fontSize:11,fontWeight:"bold"}}>Post</button></div>
</div>}
</div>)}
</div></>}

{tab==="community"&&<div style={{padding:12}}><div style={{display:"flex",gap:8,marginBottom:12}}><button onClick={()=>setCommType("faculty")} style={{flex:1,padding:10,borderRadius:10,border:"none",fontWeight:"bold",background:commType==="faculty"?"#2563eb":"white",color:commType==="faculty"?"white":"#6b7280"}}>Faculties (13)</button><button onClick={()=>setCommType("hostel")} style={{flex:1,padding:10,borderRadius:10,border:"none",fontWeight:"bold",background:commType==="hostel"?"#2563eb":"white",color:commType==="hostel"?"white":"#6b7280"}}>Hostels (11)</button></div>{commType==="faculty"?<div style={{display:"flex",flexDirection:"column",gap:8}}>{faculties.map(f=><div key={f} style={{background:"white",padding:14,borderRadius:12,display:"flex",justifyContent:"space-between"}}><span style={{fontWeight:"bold",fontSize:13}}>📚 {f}</span><span style={{fontSize:11,background:"#dcfce7",padding:"4px 8px",borderRadius:10}}>Auto Joined ✓</span></div>)}</div>:<div><select value={myHostel} onChange={e=>setMyHostel(e.target.value)} style={{width:"100%",padding:10,borderRadius:8,border:"1px solid #e5e7eb",marginBottom:10}}>{hostels.map(h=><option key={h} value={h}>{h}</option>)}</select><div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8}}>{hostels.map(h=><div key={h} onClick={()=>setMyHostel(h)} style={{background:myHostel===h?"#2563eb":"white",color:myHostel===h?"white":"black",padding:14,borderRadius:12,fontWeight:"bold",fontSize:12,textAlign:"center"}}>🏠 {h}{myHostel===h?" ✓":""}</div>)}</div></div>}</div>}

{tab==="market"&&<div style={{padding:12}}><div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:12}}><h2 style={{fontWeight:"bold",fontSize:16}}>🛒 Market • {myHostel}</h2><button onClick={()=>setShowMarketPost(!showMarketPost)} style={{background:isVerified?"#2563eb":"#9ca3af",color:"white",border:"none",padding:"8px 12px",borderRadius:8,fontSize:11,fontWeight:"bold"}}>{isVerified?"+ Sell":"🔒 Verify 3k"}</button></div>{showMarketPost&&<div style={{background:"white",padding:14,borderRadius:14,marginBottom:12}}><input placeholder="Item name" value={newItem.name} onChange={e=>setNewItem({...newItem,name:e.target.value})} style={{width:"100%",padding:10,borderRadius:8,border:"1px solid #e5e7eb"}}/><input placeholder="Price" type="number" value={newItem.price} onChange={e=>setNewItem({...newItem,price:e.target.value})} style={{width:"100%",padding:10,borderRadius:8,border:"1px solid #e5e7eb",marginTop:8}}/><input type="file" accept="image/*" onChange={handleImg} style={{marginTop:8}}/><button onClick={postMarket} style={{width:"100%",background:"#2563eb",color:"white",border:"none",padding:10,borderRadius:8,fontWeight:"bold",marginTop:8}}>Post</button></div>}<div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>{market.map(m=><div key={m.id} style={{background:"white",padding:10,borderRadius:14}}><div style={{height:80,background:"#f3f4f6",borderRadius:10,overflow:"hidden",display:"flex",alignItems:"center",justifyContent:"center"}}>{m.imgUrl?<img src={m.imgUrl} style={{width:"100%",height:"100%",objectFit:"cover"}}/>:<span style={{fontSize:32}}>{m.img}</span>}</div><div style={{fontWeight:"bold",fontSize:12,marginTop:6}}>{m.name}</div><div style={{fontSize:10,color:"#6b7280"}}>{m.seller} • {m.hostel}</div><div style={{fontWeight:"bold",color:"#2563eb"}}>{m.price}</div><button onClick={()=>openChat(m)} style={{width:"100%",marginTop:6,background:"#2563eb",color:"white",border:"none",padding:7,borderRadius:7,fontSize:11}}>💬 Chat in App</button></div>)}</div></div>}

{tab==="chat"&&<div style={{display:"flex",flexDirection:"column",height:"82vh"}}><div style={{background:"white",padding:12,borderBottom:"1px solid #eee",display:"flex",gap:8}}><span onClick={()=>setTab("market")}>←</span><b style={{fontSize:13}}>{activeChat?.seller}</b></div><div style={{flex:1,padding:12,overflowY:"auto",display:"flex",flexDirection:"column",gap:8}}>{messages.filter(m=>m.item===activeChat?.name).map(msg=><div key={msg.id} style={{alignSelf:msg.from==="you"?"flex-end":"flex-start",background:msg.from==="you"?"#2563eb":"white",color:msg.from==="you"?"white":"black",padding:"8px 12px",borderRadius:16,maxWidth:"70%",fontSize:12}}>{msg.text}</div>)}</div><div style={{background:"white",padding:10,display:"flex",gap:6}}><input value={chatInput} onChange={e=>setChatInput(e.target.value)} placeholder="Chat..." style={{flex:1,padding:10,borderRadius:20,border:"none",background:"#f3f4f6"}}/><button onClick={sendMsg} style={{background:"#2563eb",color:"white",border:"none",padding:"10px 14px",borderRadius:20}}>Send</button></div></div>}

{tab==="events"&&<div style={{padding:12}}><h2 style={{fontWeight:"bold"}}>📅 Events</h2><div style={{background:"white",padding:14,borderRadius:12,marginTop:10}}>🎉 SUG Week • Dec 10-15</div></div>}
{tab==="profile"&&<div style={{padding:12}}><div style={{background:"white",padding:18,borderRadius:14,textAlign:"center"}}><div style={{width:60,height:60,background:"#2563eb",borderRadius:30,color:"white",display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto",fontWeight:"bold"}}>EU</div><div style={{fontWeight:"bold",marginTop:8}}>Emediong • {myHostel} ✓</div></div></div>}

<div style={{position:"fixed",bottom:0,left:0,right:0,background:"white",borderTop:"1px solid #eee",display:"flex",justifyContent:"space-around",padding:"10px 0",fontSize:10,fontWeight:"bold"}}>
<span onClick={()=>setTab("feed")} style={{color:tab==="feed"?"#2563eb":"#9ca3af"}}>📱<br/>Feed</span>
<span onClick={()=>setTab("community")} style={{color:tab==="community"?"#2563eb":"#9ca3af"}}>🏠<br/>Community</span>
<span onClick={()=>setTab("market")} style={{color:tab==="market"?"#2563eb":"#9ca3af"}}>🛒<br/>Market</span>
<span onClick={()=>setTab("events")} style={{color:tab==="events"?"#2563eb":"#9ca3af"}}>📅<br/>Events</span>
<span onClick={()=>setTab("profile")} style={{color:tab==="profile"?"#2563eb":"#9ca3af"}}>👤<br/>Profile</span>
</div>
</div>
)}
