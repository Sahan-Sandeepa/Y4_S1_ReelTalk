import{r as d,az as n,ae as i,j as a,an as l,af as h,B as c,V as p,a1 as f}from"./index-BanVTlhg.js";import{c as g}from"./index-BivT61Nk.js";import{A as u}from"./AdminLayout-DKfm4OHT.js";import{R as w}from"./RenderAttachment-BOwaebpU.js";import{T as x}from"./Table-Cm2cQwW9.js";import{a as A}from"./hook-DVnn475D.js";import{A as N}from"./Avatar-D1EpHAeu.js";import"./Menu-Bg3f8Fci.js";import"./Drawer-plylLksj.js";import"./Container-anp6EPnq.js";import"./Select-Do0TNfn1.js";import"./Chip-Ci8AMjE3.js";import"./ListItemText-Bm1-2-T9.js";import"./TextField-DfDVmVvd.js";import"./Button-2cdgf7kG.js";import"./InputAdornment-BYHUHDBx.js";import"./CircularProgress-CTT0hMsH.js";import"./useThemeProps-DZ_aboNc.js";const j=[{field:"attachments",headerName:"Attachments",headerClassName:"table-header",width:200,renderCell:r=>{const{attachments:e}=r.row;return(e==null?void 0:e.length)>0?e.map((o,m)=>{const s=o.url,t=h(s);return a.jsx(c,{children:a.jsx("a",{href:s,download:!0,target:"_blank",style:{color:"black"},children:w(t,s)})},m)}):"No Attachments"}},{field:"content",headerName:"Content",headerClassName:"table-header",width:400},{field:"sender",headerName:"Sent By",headerClassName:"table-header",width:200,renderCell:r=>a.jsxs(p,{direction:"row",spacing:"1rem",alignItems:"center",children:[a.jsx(N,{alt:r.row.sender.name,src:r.row.sender.avatar}),a.jsx("span",{children:r.row.sender.name})]})},{field:"groupChat",headerName:"Group Chat",headerClassName:"table-header",width:100},{field:"createdAt",headerName:"Time",headerClassName:"table-header",width:250}],H=()=>{const{loading:r,data:e,error:o}=g(`${f}/api/v1/admin/messages`,"dashboard-messages");A([{isError:o,error:o}]);const[m,s]=d.useState([]);return d.useEffect(()=>{e&&s(e.messages.map(t=>({...t,id:t._id,sender:{name:t.sender.name,avatar:n(t.sender.avatar,50)},createdAt:i(t.createdAt).format("MMMM Do YYYY, h:mm:ss a")})))},[e]),a.jsx(u,{children:r?a.jsx(l,{height:"100vh"}):a.jsx(x,{heading:"All Messages",columns:j,rows:m,rowHeight:200})})};export{H as default};
