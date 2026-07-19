"use client"
import { useState } from "react"
export default function Home(){
const [posts,setPosts]=useState([
{id:1,name:"Favour E.",tag:"19/AG/BCH/123",time:"2h",text:"Who has GST 111 past questions? 😭",likes:12},
{id:2,name:"Campus Buka",tag:"Vendor",time:"5h",text:"Jollof + Chicken ₦1500 today! Free delivery NDDC",likes:45},
{id:3,name:"Anonymous",tag:"Confession",time:"1h",text:"Crush on that girl in Engineering always on white 😍",likes:89}
])
const [txt,setTxt]=useState("")
return(
<div style={{minHeight:"100vh",background:"#f5f5f5",paddingBottom:80}}>
<div style={{background:"white",padding:"12px 16px",borderBottom:"1px solid #eee",display:"flex",justifyContent:"space-between",position:"sticky",top:0}}><b>🎓 Uniuyo Connect</b><div style={{width:32,height:32,background:"#2563eb",borderRadius:20,color:"white",display:"flex",alignItems:"center",justifyContent:"center",fontWeight:"bold"}}>EU</div></div>
<div style={{background:"white",margin:12,padding:16,borderRadius:16}}><textarea value={txt} onChange={e=>setTxt(e.target.value)} placeholder="What's happening on campus?" style={{width:"100%",background:"#f3f4f6",border:"none",padding:12,borderRadius:12}} rows={3}/><button onClick={()=>{if(txt.trim()){setPosts([{id:Date.now(),name:"You",tag:"16/AG/AS/303",time:"now",text:txt,likes:0},...posts]);setTxt("")}}} style={{marginTop:12,width:"100%",background:"#2563eb",color:"white",padding:12,borderRadius:12,border:"none",fontWeight:"bold"}}>Post to Campus</button></div>
<div style={{padding:"0 12px",display:"flex",flexDirection:"column",gap:12}}>{posts.map(p=><div key={p.id} style={{background:"white",padding:16,borderRadius:16}}><div style={{display:"flex",gap:8}}><div style={{width:40,height:40,background:"#e5e7eb",borderRadius:20}}></div><div><div style={{fontWeight:"bold",fontSize:14}}>{p.name} {p.name!=="Anonymous"?"✓":""}</div><div style={{fontSize:12,color:"#6b7280"}}>{p.tag} • {p.time} ago</div></div></div><div style={{marginTop:12}}>{p.text}</div><div style={{marginTop:16,display:"flex",gap:24,fontSize:13,color:"#6b7280",borderTop:"1px solid #f3f4f6",paddingTop:12}}><span>❤️ {p.likes}</span><span>💬 Comment</span><span>↗️ Share</span></div></div>)}</div>
<div style={{position:"fixed",bottom:0,left:0,right:0,background:"white",borderTop:"1px solid #eee",display:"flex",justifyContent:"space-around",padding:"12px 0",fontSize:12,fontWeight:"bold"}}><span style={{color:"#2563eb"}}>📱 Feed</span><span style={{color:"#9ca3af"}}>🛒 Market</span><span style={{color:"#9ca3af"}}>📅 Events</span><span style={{color:"#9ca3af"}}>👤 Profile</span></div>
</div>
)}
