"use client"
import {useState,useEffect} from "react"
export default function Home(){
const [tab,setTab]=useState("feed")
const [joined,setJoined]=useState(["W4 Annex"])
const [members,setMembers]=useState({"W4 Annex":243,"NDDC Male":312,"NDDC Female":298})
const [popup,setPopup]=useState("")
const [statusList,setStatusList]=useState([
{name:"You",items:[{id:1,txt:"In W4 Annex reading",views:45,likes:12}]},
{name:"Favour",items:[{id:2,txt:"My hostel view",views:89,likes:23}]},
{name:"Buka",items:[{id:3,txt:"Jollof ready 1500",views:120,likes:56}]}
])
const [active,setActive]=useState(null)
const [newS,setNewS]=useState("")
const [showAdd,setShowAdd]=useState(false)
const [posts,setPosts]=useState([
{id:1,name:"Favour E.",tag:"Agric",time:"2h",text:"Who has GST 111?",rc:13,comments:[{id:101,name:"You",text:"I get am"}]},
{id:2,name:"Campus Buka",tag:"Vendor",time:"5h",text:"Jollof 1500 Free delivery",rc:46,comments:[]}
])
const [txt,setTxt]=useState("")
const [price,setPrice]=useState("all")
const [market,setMarket]=useState([
{id:1,name:"Jollof",price:1500,seller:"Buka",sold:false},
{id:2,name:"Power Bank",price:8000,seller:"You",sold:false}
])
const hostels=["NDDC Male","NDDC Female","W4 Annex","W2A","W5"]
const push=(t)=>{setPopup(t);setTimeout(()=>setPopup(""),2500)}
const filtered=market.filter(m=>{if(price==="low")return m.price<2000;if(price==="mid")return m.price<=10000;if(price==="high")return m.price>10000;return true})

return(
<div style={{paddingBottom:80,background:"#f5f5f5",minHeight:"100vh"}}>
{popup?<div style={{position:"fixed",top:60,left:10,right:10,background:"black",color:"white",padding:12,borderRadius:10,zIndex:99}}>{popup}</div>:null}
<div style={{background:"white",padding:12,display:"flex",justifyContent:"space-between",position:"sticky",top:0}}>
<b>Uniuyo Connect V8.4 Status</b>
<div style={{display:"flex",gap:12}}>
<span onClick={()=>setTab("feed")}>Feed</span>
<span onClick={()=>setTab("status")}>Status</span>
<span onClick={()=>setTab("market")}>Market</span>
</div>
</div>

<div style={{background:"white",padding:10,display:"flex",gap:12,overflowX:"auto"}}>
{statusList.map((s,i)=>(
<div key={i} onClick={()=>setActive(i)} style={{minWidth:60,textAlign:"center"}}>
<div style={{width:50,height:50,background:"#eee",borderRadius:25,display:"flex",alignItems:"center",justifyContent:"center"}}>{s.name[0]}</div>
<div style={{fontSize:10}}>{s.name}</div>
<div style={{fontSize:9}}>{s.items.length} status</div>
</div>
))}
<div onClick={()=>setShowAdd(true)} style={{minWidth:60,textAlign:"center"}}>
<div style={{width:50,height:50,background:"#ddd",borderRadius:25,display:"flex",alignItems:"center",justifyContent:"center"}}>+</div>
<div style={{fontSize:10}}>Add</div>
</div>
</div>

{showAdd?(
<div style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.8)",zIndex:100,display:"flex",alignItems:"center",justifyContent:"center",padding:20}}>
<div style={{background:"white",padding:20,borderRadius:12,width:300}}>
<h3>Add Status</h3>
<textarea value={newS} onChange={e=>setNewS(e.target.value)} rows={3} style={{width:"100%",padding:10,borderRadius:10,border:"1px solid #ccc"}}/>
<div style={{display:"flex",gap:10,marginTop:10}}>
<button onClick={()=>setShowAdd(false)} style={{flex:1,padding:10}}>Cancel</button>
<button onClick={()=>{if(!newS.trim())return;const it={id:Date.now(),txt:newS,views:1,likes:0};setStatusList(list=>{const me=list.find(x=>x.name==="You");if(me){return list.map(x=>x.name==="You"?{...x,items:[it,...x.items]}:x)}else{return[{name:"You",items:[it]},...list]}});setNewS("");setShowAdd(false);push("Status added")}} style={{flex:1,padding:10,background:"blue",color:"white",border:"none",borderRadius:10}}>Post</button>
</div>
</div>
</div>
):null}

{active!==null?(
<div style={{position:"fixed",inset:0,background:"black",zIndex:200,color:"white",display:"flex",flexDirection:"column"}}>
<div style={{padding:12,display:"flex",justifyContent:"space-between"}}>
<span onClick={()=>setActive(null)}>Close</span>
<span>{statusList[active].items[0].views} views</span>
</div>
<div style={{flex:1,display:"flex",alignItems:"center",justifyContent:"center",padding:20,fontSize:22,textAlign:"center"}}>
{statusList[active].items[0].txt}
</div>
<div style={{padding:12,display:"flex",gap:10}}>
<button onClick={()=>{setPosts([{id:Date.now(),name:"You",tag:"Status",time:"now",text:statusList[active].items[0].txt,rc:0,comments:[]},...posts]);push("Shared to timeline")}} style={{padding:10,background:"blue",color:"white",border:"none",borderRadius:20}}>Timeline</button>
<button onClick={()=>{const m=statusList[active].items[0].txt+" https://t-wine.vercel.app/?register=1";window.open("https://wa.me/?text="+encodeURIComponent(m),"_blank")}} style={{padding:10,background:"green",color:"white",border:"none",borderRadius:20}}>WhatsApp + Gate</button>
</div>
</div>
):null}

{tab==="feed"?(
<div style={{padding:12}}>
<div style={{background:"white",padding:12,borderRadius:12,marginBottom:12}}>
<textarea value={txt} onChange={e=>setTxt(e.target.value)} placeholder="What is happening?" rows={2} style={{width:"100%",background:"#f3f4f6",border:"none",padding:10,borderRadius:10}}/>
<button onClick={()=>{if(txt.trim()){setPosts([{id:Date.now(),name:"You",tag:"W4 Annex",time:"now",text:txt,rc:0,comments:[]},...posts]);setTxt("")}}} style={{marginTop:8,width:"100%",padding:10,background:"blue",color:"white",border:"none",borderRadius:10}}>Post</button>
</div>
{posts.map(p=>(
<div key={p.id} style={{background:"white",padding:12,borderRadius:12,marginBottom:10}}>
<div style={{fontWeight:"bold"}}>{p.name} - {p.tag}</div>
<div style={{marginTop:6}}>{p.text}</div>
<div style={{marginTop:10,display:"flex",gap:10}}>
<span>{p.rc} Reactions 20 emojis</span>
<span>Comment {p.comments.length}</span>
<span onClick={()=>{const m=p.text+" https://t-wine.vercel.app/?register=1";window.open("https://wa.me/?text="+encodeURIComponent(m),"_blank")}}>WhatsApp Gate</span>
</div>
</div>
))}
</div>
):null}

{tab==="community"?(
<div style={{padding:12}}>
<h2>Hostels Join Leave Count</h2>
{hostels.map(h=>(
<div key={h} style={{background:"white",padding:12,borderRadius:10,marginTop:8,display:"flex",justifyContent:"space-between"}}>
<div><b>{h}</b><div>{members[h]||100} members {joined.includes(h)?"Joined":"Not"}</div></div>
<button onClick={()=>{if(joined.includes(h)){setJoined(joined.filter(x=>x!==h))}else{setJoined([...joined,h]);push("Joined "+h)}}} style={{padding:"8px 12px",borderRadius:20,border:"none",background:joined.includes(h)?"#fee2e2":"#dcfce7"}}>{joined.includes(h)?"Leave":"Join"}</button>
</div>
))}
</div>
):null}

{tab==="market"?(
<div style={{padding:12}}>
<h2>Market Filter Delete</h2>
<div style={{display:"flex",gap:6,marginTop:10}}>
<button onClick={()=>setPrice("all")} style={{padding:6,borderRadius:20,border:"none",background:price==="all"?"blue":"#eee",color:price==="all"?"white":"black"}}>All</button>
<button onClick={()=>setPrice("low")} style={{padding:6,borderRadius:20,border:"none",background:price==="low"?"blue":"#eee"}}>Under 2k</button>
<button onClick={()=>setPrice("mid")} style={{padding:6,borderRadius:20,border:"none",background:price==="mid"?"blue":"#eee"}}>2k-10k</button>
<button onClick={()=>setPrice("high")} style={{padding:6,borderRadius:20,border:"none",background:price==="high"?"blue":"#eee"}}>Above 10k</button>
</div>
<div style={{marginTop:10,display:"grid",gridTemplateColumns:"1fr 1fr",gap:8}}>
{filtered.map(m=>(
<div key={m.id} style={{background:m.sold?"#fee2e2":"white",padding:10,borderRadius:10}}>
<div>{m.name}</div>
<div>{m.price} {m.sold?"SOLD":""}</div>
{m.seller==="You"?<div style={{display:"flex",gap:6,marginTop:6}}><button onClick={()=>setMarket(market.map(x=>x.id===m.id?{...x,sold:true}:x))} style={{flex:1,padding:4,background:"orange",color:"white",border:"none",borderRadius:6}}>Sold</button><button onClick={()=>setMarket(market.filter(x=>x.id!==m.id))} style={{flex:1,padding:4,background:"red",color:"white",border:"none",borderRadius:6}}>Delete</button></div>:null}
</div>
))}
</div>
</div>
):null}

{tab==="status"?(
<div style={{padding:12}}>
<h2>Status WhatsApp Style Unlimited</h2>
<button onClick={()=>setShowAdd(true)} style={{width:"100%",padding:12,background:"blue",color:"white",border:"none",borderRadius:10}}>+ Add Status as many</button>
<div style={{marginTop:10}}>
{statusList.map((s,i)=>(
<div key={i} onClick={()=>setActive(i)} style={{background:"white",padding:12,borderRadius:10,marginTop:8}}>
<b>{s.name} {s.items.length} status</b>
<div style={{fontSize:11}}>{s.items[0].views} views - Tap to view Like Share Timeline WhatsApp Hostels</div>
</div>
))}
</div>
</div>
):null}

<div style={{position:"fixed",bottom:0,left:0,right:0,background:"white",borderTop:"1px solid #eee",display:"flex",justifyContent:"space-around",padding:"10px 0",fontSize:11,fontWeight:"bold"}}>
<span onClick={()=>setTab("feed")} style={{color:tab==="feed"?"blue":"gray"}}>Feed</span>
<span onClick={()=>setTab("status")} style={{color:tab==="status"?"blue":"gray"}}>Status {statusList.reduce((a,b)=>a+b.items.length,0)}</span>
<span onClick={()=>setTab("community")} style={{color:tab==="community"?"blue":"gray"}}>Hostels</span>
<span onClick={()=>setTab("market")} style={{color:tab==="market"?"blue":"gray"}}>Market</span>
</div>

</div>
)
}
