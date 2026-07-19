"use client"
import {useState} from "react"
export default function Home(){
const [tab,setTab]=useState("feed")
const [joined,setJoined]=useState(["W4 Annex"])
const [members,setMembers]=useState({"W4 Annex":243,"NDDC Male":312,"NDDC Female":298,"W2A":180,"W5":210})
const [popup,setPopup]=useState("")
const [price,setPrice]=useState("all")
const [showAdd,setShowAdd]=useState(false)
const [active,setActive]=useState(null)
const [newS,setNewS]=useState("")
const [showReact,setShowReact]=useState(null)
const [commentFor,setCommentFor]=useState(null)
const [commentTxt,setCommentTxt]=useState("")
const [editId,setEditId]=useState(null)
const [txt,setTxt]=useState("")
const reacts=["❤️","👍","😂","😭","😍","🔥","🙏","💀","🎉","👏","😎","🥺","🤣","💯","😡","😮","🥰","🤩","😴","🤔"]
const hostels=["NDDC Male","NDDC Female","W4 Annex","W2A","W5","Town Campus"]
const [statusList,setStatusList]=useState([
{name:"You",ava:"Y",items:[{id:1,txt:"In W4 Annex reading all night",views:45,likes:12,liked:false}]},
{name:"Favour",ava:"F",items:[{id:2,txt:"My hostel view!",views:89,likes:23,liked:true}]},
{name:"Buka",ava:"B",items:[{id:3,txt:"Jollof ready 1500 Free delivery",views:120,likes:56,liked:false}]}
])
const [posts,setPosts]=useState([
{id:1,name:"Favour E.",tag:"Agric",time:"2h",text:"Who has GST 111 past questions?",react:"❤️",rc:13,comments:[{id:101,name:"You",text:"I get am",react:"👍",rc:2},{id:102,name:"John",text:"I need too",react:"😂",rc:1}]},
{id:2,name:"Campus Buka",tag:"Vendor",time:"5h",text:"Jollof plus Chicken 1500 today Free delivery NDDC",react:"❤️",rc:46,comments:[]}
])
const [market,setMarket]=useState([
{id:1,name:"Jollof + Chicken",price:1500,pt:"1500",seller:"Buka",hostel:"NDDC Male",sold:false},
{id:2,name:"Power Bank 20000mAh",price:8000,pt:"8000",seller:"You",hostel:"W4 Annex",sold:false},
{id:3,name:"Bedside Fan",price:1500,pt:"1500",seller:"You",hostel:"W4 Annex",sold:false}
])
const push=(t)=>{setPopup(t);setTimeout(()=>setPopup(""),2500)}
const filtered=market.filter(m=>{if(price==="low")return m.price<2000;if(price==="mid")return m.price>=2000&&m.price<=10000;if(price==="high")return m.price>10000;return true})
const totalStatus=statusList.reduce((a,b)=>a+b.items.length,0)

return(
<div style={{minHeight:"100vh",background:"#f5f5f5",paddingBottom:80}}>
{popup?<div style={{position:"fixed",top:60,left:10,right:10,background:"#0f172a",color:"white",padding:12,borderRadius:12,zIndex:999,fontSize:13}}>{popup}</div>:null}

<div style={{background:"white",padding:"12px 16px",borderBottom:"1px solid #eee",display:"flex",justifyContent:"space-between",position:"sticky",top:0,zIndex:20}}>
<b>Uniuyo Connect V9</b>
<div style={{display:"flex",gap:12,fontSize:12}}>
<span onClick={()=>setTab("feed")}>Feed</span>
<span onClick={()=>setTab("status")}>Status</span>
<span onClick={()=>setTab("market")}>Market</span>
</div>
</div>

<div style={{background:"white",padding:"10px 12px",display:"flex",gap:12,overflowX:"auto",borderBottom:"1px solid #f0f0f0"}}>
{statusList.map((s,i)=>(
<div key={i} onClick={()=>setActive(i)} style={{minWidth:62,textAlign:"center"}}>
<div style={{width:54,height:54,borderRadius:27,background:s.name==="You"?"#dbeafe":"#dcfce7",border:s.name==="You"?"2px dashed #2563eb":"3px solid #22c55e",display:"flex",alignItems:"center",justifyContent:"center",fontWeight:"bold"}}>{s.ava}</div>
<div style={{fontSize:10,fontWeight:"bold",marginTop:4}}>{s.name}</div>
<div style={{fontSize:9,color:"#6b7280"}}>{s.items.length} status • {s.items[0].views} views</div>
</div>
))}
<div onClick={()=>setShowAdd(true)} style={{minWidth:62,textAlign:"center"}}>
<div style={{width:54,height:54,borderRadius:27,background:"#f3f4f6",display:"flex",alignItems:"center",justifyContent:"center",fontSize:20}}>+</div>
<div style={{fontSize:10,marginTop:4}}>Add</div>
</div>
</div>

{showAdd?(
<div style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.75)",zIndex:100,display:"flex",alignItems:"center",justifyContent:"center",padding:20}}>
<div style={{background:"white",padding:20,borderRadius:16,width:"100%",maxWidth:320}}>
<h3 style={{margin:0}}>Add Status</h3>
<p style={{fontSize:11,color:"#6b7280",marginTop:4}}>WhatsApp style - add as many as you want</p>
<textarea value={newS} onChange={e=>setNewS(e.target.value)} placeholder="What is happening? Jollof ready..." rows={3} style={{width:"100%",marginTop:10,padding:12,borderRadius:12,border:"1px solid #e5e7eb"}}/>
<div style={{display:"flex",gap:8,marginTop:12}}>
<button onClick={()=>setShowAdd(false)} style={{flex:1,padding:10,borderRadius:10,border:"1px solid #e5e7eb",background:"white"}}>Cancel</button>
<button onClick={()=>{if(!newS.trim())return;const it={id:Date.now(),txt:newS,views:1,likes:0,liked:false};setStatusList(l=>{const me=l.find(x=>x.name==="You");if(me)return l.map(x=>x.name==="You"?{...x,items:[it,...x.items]}:x);return[{name:"You",ava:"Y",items:[it]},...l]});setNewS("");setShowAdd(false);push("Status added • "+totalStatus+" total")}} style={{flex:1,padding:10,borderRadius:10,border:"none",background:"#2563eb",color:"white",fontWeight:"bold"}}>Post Status</button>
</div>
</div>
</div>
):null}

{active!==null?(
<div style={{position:"fixed",inset:0,background:"black",zIndex:200,color:"white",display:"flex",flexDirection:"column"}}>
<div style={{padding:12,display:"flex",justifyContent:"space-between",alignItems:"center",background:"rgba(255,255,255,0.1)"}}>
<span onClick={()=>setActive(null)} style={{background:"rgba(255,255,255,0.2)",padding:"6px 12px",borderRadius:20}}>✕ Close</span>
<span style={{fontSize:11}}>{statusList[active].items[0].views} views • {statusList[active].items[0].likes} likes</span>
</div>
<div style={{flex:1,display:"flex",alignItems:"center",justifyContent:"center",padding:24,textAlign:"center",fontSize:22,lineHeight:1.4}}>{statusList[active].items[0].txt}</div>
<div style={{padding:12,background:"rgba(255,255,255,0.1)"}}>
<div style={{display:"flex",justifyContent:"space-around",marginBottom:12,fontSize:13}}>
<span onClick={()=>{setStatusList(s=>s.map((u,i)=>i!==active?u:{...u,items:u.items.map((it,j)=>j!==0?it:{...it,likes:it.liked?it.likes-1:it.likes+1,liked:!it.liked})}))}} style={{background:"rgba(255,255,255,0.2)",padding:"6px 12px",borderRadius:20}}>{statusList[active].items[0].liked?"❤️ Liked":"🤍 Like"} {statusList[active].items[0].likes}</span>
<span style={{background:"rgba(255,255,255,0.2)",padding:"6px 12px",borderRadius:20}}>👁️ {statusList[active].items[0].views} views</span>
</div>
<div style={{display:"flex",gap:8}}>
<button onClick={()=>{setPosts([{id:Date.now(),name:"You",tag:"Shared status",time:"now",text:statusList[active].items[0].txt,react:"❤️",rc:0,comments:[]},...posts]);push("Shared to Timeline");setActive(null);setTab("feed")}} style={{flex:1,padding:10,borderRadius:20,border:"none",background:"#2563eb",color:"white",fontWeight:"bold",fontSize:12}}>Share to Timeline</button>
<button onClick={()=>{const m=statusList[active].items[0].txt+" - View & register https://t-wine.vercel.app/?register=1";window.open("https://wa.me/?text="+encodeURIComponent(m),"_blank")}} style={{flex:1,padding:10,borderRadius:20,border:"none",background:"#25D366",color:"white",fontWeight:"bold",fontSize:12}}>WhatsApp + Gate</button>
</div>
</div>
</div>
):null}

{tab==="feed"?(
<div style={{padding:12}}>
<div style={{background:"white",padding:12,borderRadius:16,marginBottom:12}}>
<textarea value={txt} onChange={e=>setTxt(e.target.value)} placeholder="What is happening in W4 Annex?" rows={2} style={{width:"100%",background:"#f3f4f6",border:"none",padding:12,borderRadius:12}}/>
<button onClick={()=>{if(txt.trim()){setPosts([{id:Date.now(),name:"You",tag:"W4 Annex",time:"now",text:txt,react:"❤️",rc:0,comments:[]},...posts]);setTxt("");push("Posted to W4 Annex")}}} style={{marginTop:8,width:"100%",padding:10,borderRadius:10,border:"none",background:"#2563eb",color:"white",fontWeight:"bold"}}>Post to W4 Annex</button>
</div>
{posts.map(p=>(
<div key={p.id} style={{background:"white",padding:14,borderRadius:14,marginBottom:10}}>
<div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
<div style={{display:"flex",gap:8,alignItems:"center"}}><div style={{width:36,height:36,background:"#e5e7eb",borderRadius:18}}></div><div><div style={{fontWeight:"bold",fontSize:13}}>{p.name}</div><div style={{fontSize:11,color:"#6b7280"}}>{p.tag} • {p.time}</div></div></div>
<button onClick={()=>{const m=p.text+" - View & register https://t-wine.vercel.app/?register=1";window.open("https://wa.me/?text="+encodeURIComponent(m),"_blank")}} style={{background:"#25D366",color:"white",border:"none",padding:"6px 10px",borderRadius:20,fontSize:10,fontWeight:"bold"}}>WhatsApp Gate</button>
</div>
<div style={{marginTop:10,fontSize:14}}>{p.text}</div>
<div style={{marginTop:10,display:"flex",gap:14,borderTop:"1px solid #f3f4f6",paddingTop:10,fontSize:12,fontWeight:"bold"}}>
<span onClick={()=>setShowReact(showReact===p.id?null:p.id)} style={{cursor:"pointer"}}>{p.react} {p.rc} • 20 Reactions</span>
<span onClick={()=>setCommentFor(commentFor===p.id?null:p.id)} style={{cursor:"pointer"}}>💬 Comment {p.comments.length}</span>
<span>↗️ Share</span>
</div>
{showReact===p.id?(
<div style={{marginTop:8,background:"#fff",border:"1px solid #eee",borderRadius:12,padding:8,display:"flex",gap:6,flexWrap:"wrap"}}>
{reacts.map(r=>(
<span key={r} onClick={()=>{setPosts(posts.map(x=>x.id===p.id?{...x,react:r,rc:x.rc+1}:x));setShowReact(null);push("Reacted "+r)}} style={{fontSize:20,padding:4,cursor:"pointer"}}>{r}</span>
))}
</div>
):null}
{commentFor===p.id?(
<div style={{marginTop:10}}>
{p.comments.map(c=>(
<div key={c.id} style={{background:"#f3f4f6",padding:10,borderRadius:12,marginBottom:8}}>
<div style={{display:"flex",justifyContent:"space-between"}}><div><b style={{fontSize:11}}>{c.name} {c.react}</b><div style={{fontSize:13}}>{c.text}</div></div><span style={{fontSize:11}}>{c.react} {c.rc}</span></div>
<div style={{display:"flex",gap:10,marginTop:6}}>
{c.name==="You"?<><span onClick={()=>{setEditId(c.id);setCommentTxt(c.text)}} style={{fontSize:11,color:"#2563eb",fontWeight:"bold"}}>✏️ Edit</span><span onClick={()=>{if(confirm("Delete comment?"))setPosts(posts.map(x=>x.id!==p.id?x:{...x,comments:x.comments.filter(cc=>cc.id!==c.id)}))}} style={{fontSize:11,color:"red",fontWeight:"bold"}}>🗑️ Delete</span></>:null}
<span onClick={()=>{const m=c.text+" - https://t-wine.vercel.app/?register=1";window.open("https://wa.me/?text="+encodeURIComponent(m),"_blank")}} style={{fontSize:11,color:"#25D366",fontWeight:"bold"}}>WhatsApp</span>
</div>
</div>
))}
<div style={{marginTop:8,background:"white",border:"1px solid #e5e7eb",borderRadius:20,padding:"6px 10px",display:"flex",gap:6,alignItems:"center"}}>
<input value={commentTxt} onChange={e=>setCommentTxt(e.target.value)} placeholder={editId?"Edit comment...":"Write comment..."} style={{flex:1,border:"none",outline:"none",fontSize:12}}/>
<button onClick={()=>{if(!commentTxt.trim())return;if(editId){setPosts(posts.map(po=>po.id!==p.id?po:{...po,comments:po.comments.map(cc=>cc.id===editId?{...cc,text:commentTxt}:cc)}));setEditId(null);setCommentTxt("")}else{setPosts(posts.map(po=>po.id!==p.id?po:{...po,comments:[...po.comments,{id:Date.now(),name:"You",text:commentTxt,react:"❤️",rc:0}]}));setCommentTxt("")}}} style={{background:"#2563eb",color:"white",border:"none",padding:"6px 12px",borderRadius:15,fontSize:11,fontWeight:"bold"}}>{editId?"Save":"Post"}</button>
</div>
</div>
):null}
</div>
))}
</div>
):null}

{tab==="community"?(
<div style={{padding:12}}>
<h2 style={{margin:"0 0 6px 0"}}>Hostels — Join / Leave + Count</h2>
<p style={{fontSize:11,color:"#6b7280",margin:0}}>Tap Join — members increase, Leave — decreases</p>
<div style={{marginTop:12,display:"flex",flexDirection:"column",gap:8}}>
{hostels.map(h=>(
<div key={h} style={{background:"white",padding:14,borderRadius:12,display:"flex",justifyContent:"space-between",alignItems:"center"}}>
<div><div style={{fontWeight:"bold",fontSize:13}}>{h}</div><div style={{fontSize:11,color:"#6b7280"}}>👥 {members[h]||100} members • {joined.includes(h)?"Joined":"Not joined"}</div></div>
<button onClick={()=>{if(joined.includes(h)){setJoined(joined.filter(x=>x!==h));setMembers(m=>({...m,[h]:(m[h]||1)-1}));push("Left "+h)}else{setJoined([...joined,h]);setMembers(m=>({...m,[h]:(m[h]||0)+1}));push("Joined "+h+" • "+((members[h]||0)+1)+" members")}}} style={{padding:"8px 14px",borderRadius:20,border:"none",background:joined.includes(h)?"#fee2e2":"#dcfce7",color:joined.includes(h)?"#dc2626":"#16a34a",fontWeight:"bold",fontSize:11}}>{joined.includes(h)?"Leave":"Join"}</button>
</div>
))}
</div>
</div>
):null}

{tab==="market"?(
<div style={{padding:12}}>
<h2 style={{margin:"0 0 6px 0"}}>Market — Filter + Sold + Delete</h2>
<div style={{background:"white",padding:10,borderRadius:12,marginTop:10,display:"flex",gap:6,flexWrap:"wrap"}}>
<button onClick={()=>setPrice("all")} style={{padding:"6px 10px",borderRadius:20,border:"none",background:price==="all"?"#2563eb":"#f3f4f6",color:price==="all"?"white":"black",fontSize:11,fontWeight:"bold"}}>All</button>
<button onClick={()=>setPrice("low")} style={{padding:"6px 10px",borderRadius:20,border:"none",background:price==="low"?"#2563eb":"#f3f4f6",color:price==="low"?"white":"black",fontSize:11}}>Under 2k</button>
<button onClick={()=>setPrice("mid")} style={{padding:"6px 10px",borderRadius:20,border:"none",background:price==="mid"?"#2563eb":"#f3f4f6",color:price==="mid"?"white":"black",fontSize:11}}>2k-10k</button>
<button onClick={()=>setPrice("high")} style={{padding:"6px 10px",borderRadius:20,border:"none",background:price==="high"?"#2563eb":"#f3f4f6",color:price==="high"?"white":"black",fontSize:11}}>Above 10k</button>
</div>
<div style={{marginTop:10,display:"grid",gridTemplateColumns:"1fr 1fr",gap:8}}>
{filtered.map(m=>(
<div key={m.id} style={{background:m.sold?"#fee2e2":"white",padding:10,borderRadius:12,border:m.sold?"1px solid #fca5a5":"1px solid #f3f4f6"}}>
<div style={{fontSize:12,fontWeight:"bold"}}>{m.name}</div>
<div style={{fontWeight:"bold",marginTop:4}}>₦{m.pt} {m.sold?<span style={{color:"red",fontSize:10}}>SOLD</span>:null}</div>
<div style={{fontSize:10,color:"#6b7280"}}>{m.hostel} • {m.seller}</div>
{m.seller==="You"?(
<div style={{display:"flex",gap:6,marginTop:8}}>
<button onClick={()=>setMarket(market.map(x=>x.id===m.id?{...x,sold:!x.sold}:x))} style={{flex:1,padding:6,borderRadius:8,border:"none",background:"#f59e0b",color:"white",fontSize:10,fontWeight:"bold"}}>{m.sold?"Unsold":"Sold"}</button>
<button onClick={()=>{if(confirm("Delete this market item?"))setMarket(market.filter(x=>x.id!==m.id))}} style={{flex:1,padding:6,borderRadius:8,border:"none",background:"#ef4444",color:"white",fontSize:10,fontWeight:"bold"}}>Delete</button>
</div>
):null}
</div>
))}
</div>
</div>
):null}

{tab==="status"?(
<div style={{padding:12}}>
<h2 style={{margin:0}}>Status — WhatsApp Style</h2>
<p style={{fontSize:11,color:"#6b7280"}}>Unlimited statuses, views, likes, Timeline + WhatsApp Gate</p>
<button onClick={()=>setShowAdd(true)} style={{width:"100%",marginTop:10,padding:12,borderRadius:12,background:"#2563eb",color:"white",border:"none",fontWeight:"bold"}}>+ Add Status (as many as you want)</button>
<div style={{marginTop:12,display:"flex",flexDirection:"column",gap:8}}>
{statusList.map((s,i)=>(
<div key={i} onClick={()=>setActive(i)} style={{background:"white",padding:12,borderRadius:12,display:"flex",gap:10,alignItems:"center"}}>
<div style={{width:44,height:44,borderRadius:22,background:"#e5e7eb",display:"flex",alignItems:"center",justifyContent:"center",fontWeight:"bold"}}>{s.ava}</div>
<div style={{flex:1}}><b style={{fontSize:13}}>{s.name} • {s.items.length} status</b><div style={{fontSize:11,color:"#6b7280"}}>{s.items[0].views} views • {s.items[0].likes} likes • Tap to view, like, share to Timeline, WhatsApp + Gate, see who viewed</div></div>
</div>
))}
</div>
</div>
):null}

<div style={{position:"fixed",bottom:0,left:0,right:0,background:"white",borderTop:"1px solid #e5e7eb",display:"flex",justifyContent:"space-around",padding:"10px 0",fontSize:11,fontWeight:"bold",zIndex:30}}>
<span onClick={()=>setTab("feed")} style={{color:tab==="feed"?"#2563eb":"#9ca3af"}}>Feed</span>
<span onClick={()=>setTab("status")} style={{color:tab==="status"?"#2563eb":"#9ca3af"}}>Status {totalStatus}</span>
<span onClick={()=>setTab("community")} style={{color:tab==="community"?"#2563eb":"#9ca3af"}}>Hostels {joined.length}</span>
<span onClick={()=>setTab("market")} style={{color:tab==="market"?"#2563eb":"#9ca3af"}}>Market {filtered.length}</span>
</div>

</div>
)
}
