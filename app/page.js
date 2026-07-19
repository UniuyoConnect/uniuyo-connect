"use client"
import { useState } from "react"
export default function Home(){
const [tab,setTab]=useState("feed")
const [posts,setPosts]=useState([
{id:1,name:"Favour E.",tag:"19/AG/BCH/123",time:"2h",text:"Who has GST 111 past questions? 😭",likes:12,liked:false},
{id:2,name:"Campus Buka",tag:"Vendor",time:"5h",text:"Jollof + Chicken ₦1500 today! Free delivery NDDC",likes:45,liked:false},
{id:3,name:"Anonymous",tag:"Confession",time:"1h",text:"Crush on that girl in Engineering always on white 😍",likes:89,liked:false}
])
const [market]=useState([
{id:1,name:"Jollof + Chicken",price:"₦1500",seller:"Campus Buka",img:"🍛"},
{id:2,name:"GST 111 Handout",price:"₦500",seller:"Library Vendor",img:"📚"},
{id:3,name:"Power Bank 20k mAh",price:"₦12000",seller:"Ekom Imman",img:"🔋"},
{id:4,name:"Ladies Gown - New",price:"₦7000",seller:"Fashion Hub",img:"👗"}
])
const [txt,setTxt]=useState("")
const likePost=(id)=>{setPosts(posts.map(p=>p.id===id?{...p,likes:p.liked?p.likes-1:p.likes+1,liked:!p.liked}:p))}
return(
<div style={{minHeight:"100vh",background:"#f5f5f5",paddingBottom:80}}>
<div style={{background:"white",padding:"12px 16px",borderBottom:"1px solid #eee",display:"flex",justifyContent:"space-between",position:"sticky",top:0,zIndex:10}}><b>🎓 Uniuyo Connect</b><div style={{width:32,height:32,background:"#2563eb",borderRadius:20,color:"white",display:"flex",alignItems:"center",justifyContent:"center",fontWeight:"bold"}}>EU</div></div>
{tab==="feed"&&<><div style={{background:"white",margin:12,padding:16,borderRadius:16}}><textarea value={txt} onChange={e=>setTxt(e.target.value)} placeholder="What's happening on campus?" style={{width:"100%",background:"#f3f4f6",border:"none",padding:12,borderRadius:12,outline:"none"}} rows={3}/><button onClick={()=>{if(txt.trim()){setPosts([{id:Date.now(),name:"You",tag:"16/AG/AS/303",time:"now",text:txt,likes:0,liked:false},...posts]);setTxt("")}}} style={{marginTop:12,width:"100%",background:"#2563eb",color:"white",padding:12,borderRadius:12,border:"none",fontWeight:"bold"}}>Post to Campus</button></div>
<div style={{padding:"0 12px",display:"flex",flexDirection:"column",gap:12}}>{posts.map(p=><div key={p.id} style={{background:"white",padding:16,borderRadius:16}}><div style={{display:"flex",gap:8}}><div style={{width:40,height:40,background:"#e5e7eb",borderRadius:20}}></div><div><div style={{fontWeight:"bold",fontSize:14}}>{p.name} {p.name!=="Anonymous"?"✓":""}</div><div style={{fontSize:12,color:"#6b7280"}}>{p.tag} • {p.time} ago</div></div></div><div style={{marginTop:12}}>{p.text}</div><div style={{marginTop:16,display:"flex",gap:24,fontSize:13,color:"#6b7280",borderTop:"1px solid #f3f4f6",paddingTop:12}}><span onClick={()=>likePost(p.id)} style={{color:p.liked?"red":""}}>{p.liked?"❤️":"🤍"} {p.likes}</span><span>💬 Comment</span><span>↗️ Share</span></div></div>)}</div></>}
{tab==="market"&&<div style={{padding:12}}><h2 style={{fontWeight:"bold",fontSize:18,marginBottom:12}}>🛒 Campus Market</h2><div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}>{market.map(m=><div key={m.id} style={{background:"white",padding:12,borderRadius:16}}><div style={{fontSize:40,textAlign:"center",background:"#f3f4f6",borderRadius:12,padding:12}}>{m.img}</div><div style={{fontWeight:"bold",marginTop:8,fontSize:14}}>{m.name}</div><div style={{fontSize:12,color:"#6b7280"}}>{m.seller}</div><div style={{fontWeight:"bold",color:"#2563eb",marginTop:4}}>{m.price}</div><button style={{width:"100%",marginTop:8,background:"#2563eb",color:"white",border:"none",padding:8,borderRadius:8,fontSize:12,fontWeight:"bold"}}>Chat Seller</button></div>)}</div></div>}
{tab==="events"&&<div style={{padding:12}}><h2 style={{fontWeight:"bold",fontSize:18,marginBottom:12}}>📅 Campus Events</h2><div style={{background:"white",padding:16,borderRadius:16,marginBottom:12}}><div style={{fontWeight:"bold"}}>🎉 SUG Week 2025</div><div style={{fontSize:13,color:"#6b7280",marginTop:4}}>Main Campus • Dec 10-15 • Music, Awards, Pageant</div></div><div style={{background:"white",padding:16,borderRadius:16}}><div style={{fontWeight:"bold"}}>📚 GST 111 Night Class</div><div style={{fontSize:13,color:"#6b7280",marginTop:4}}>Town Campus • Every night 6pm • NDDC Hall</div></div></div>}
{tab==="profile"&&<div style={{padding:12}}><div style={{background:"white",padding:20,borderRadius:16,textAlign:"center"}}><div style={{width:70,height:70,background:"#2563eb",borderRadius:35,color:"white",display:"flex",alignItems:"center",justifyContent:"center",fontSize:24,fontWeight:"bold",margin:"0 auto"}}>EU</div><div style={{fontWeight:"bold",marginTop:12}}>Emediong Usoro</div><div style={{fontSize:12,color:"#6b7280"}}>16/AG/AS/303 • Geography</div></div></div>}
<div style={{position:"fixed",bottom:0,left:0,right:0,background:"white",borderTop:"1px solid #eee",display:"flex",justifyContent:"space-around",padding:"12px 0",fontSize:12,fontWeight:"bold"}}>
<span onClick={()=>setTab("feed")} style={{color:tab==="feed"?"#2563eb":"#9ca3af"}}>📱 Feed</span>
<span onClick={()=>setTab("market")} style={{color:tab==="market"?"#2563eb":"#9ca3af"}}>🛒 Market</span>
<span onClick={()=>setTab("events")} style={{color:tab==="events"?"#2563eb":"#9ca3af"}}>📅 Events</span>
<span onClick={()=>setTab("profile")} style={{color:tab==="profile"?"#2563eb":"#9ca3af"}}>👤 Profile</span>
</div>
</div>
)}
