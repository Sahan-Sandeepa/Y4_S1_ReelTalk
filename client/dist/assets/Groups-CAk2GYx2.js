const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/ConfirmDeleteDialog-B1QvImGr.js","assets/index-BanVTlhg.js","assets/index-M6mL2Y7n.css","assets/dialogTitleClasses-CAlvBSfc.js","assets/DialogTitle-Dn6jQz4K.js","assets/DialogContent-CHfHGyro.js","assets/DialogActions-Cc9QZVvl.js","assets/Button-2cdgf7kG.js","assets/AddMemberDialog-kkv9sEX2.js","assets/UserItem-Bg2tYH2X.js","assets/ListItem-CRCg59Gd.js","assets/Avatar-D1EpHAeu.js","assets/Add-CXK5JxIE.js","assets/hook-DVnn475D.js"])))=>i.map(i=>d[i]);
import{E as v,j as e,r as o,aM as T,aN as te,u as ae,S as ne,a5 as ie,aO as ce,ah as le,ai as de,aP as me,aG as b,T as d,V as m,aQ as N,P as t,aR as pe,aS as ue,aT as xe,av as he,B as ge,I as h,aa as fe,aU as be,aV as je}from"./index-BanVTlhg.js";import{A as ke}from"./AvatarCard-lKOp44qc.js";import{U as ve}from"./UserItem-Bg2tYH2X.js";import{b as j,a as Ce}from"./hook-DVnn475D.js";import{C as R}from"./CircularProgress-CTT0hMsH.js";import{D as ye}from"./Drawer-plylLksj.js";import{m as Me}from"./motion-DOLrXkcA.js";import{M as Ie}from"./Menu-Bg3f8Fci.js";import{T as we}from"./TextField-DfDVmVvd.js";import{B as A}from"./Button-2cdgf7kG.js";import{D as De}from"./Delete-Bsodry54.js";import{A as Ge}from"./Add-CXK5JxIE.js";import"./Avatar-D1EpHAeu.js";import"./ListItem-CRCg59Gd.js";import"./Select-Do0TNfn1.js";const Se=v(e.jsx("path",{d:"M9 16.2 4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4z"}),"Done"),Ee=v(e.jsx("path",{d:"M3 17.25V21h3.75L17.81 9.94l-3.75-3.75zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34a.9959.9959 0 0 0-1.41 0l-1.83 1.83 3.75 3.75z"}),"Edit"),_e=v(e.jsx("path",{d:"M21 11H6.83l3.58-3.59L9 6l-6 6 6 6 1.41-1.41L6.83 13H21z"}),"KeyboardBackspace"),B={stackContainer:{maxWidth:"45rem",width:"100%",boxSizing:"border-box",padding:{sm:"1rem",xs:"0",md:"1rem 4rem"},height:"50vh",overflow:"auto",scrollbarWidth:"thin",scrollbarColor:"#888 #f5f5f5"},scrollbarContainer:{"&::-webkit-scrollbar":{width:"8px"},"&::-webkit-scrollbar-track":{background:"#f5f5f5"},"&::-webkit-scrollbar-thumb":{background:"#888",borderRadius:"4px"},"&::-webkit-scrollbar-thumb:hover":{background:"#555"}}},Le=o.lazy(()=>T(()=>import("./ConfirmDeleteDialog-B1QvImGr.js"),__vite__mapDeps([0,1,2,3,4,5,6,7]))),Ne=o.lazy(()=>T(()=>import("./AddMemberDialog-kkv9sEX2.js"),__vite__mapDeps([8,1,2,9,10,11,12,13,3,4,7]))),Ke=()=>{var _,L;const r=te()[0].get("group"),n=ae(),p=ne(),{isAddMember:l}=ie(a=>a.misc),s=ce(""),[g,y]=o.useState(!1),[z,f]=o.useState(!1),[M,I]=o.useState(!1),[w,u]=o.useState(""),[D,x]=o.useState(""),[P,V]=o.useState([]),{mode:i}=le(),c=de({chatId:r,populate:!0},{skip:!r}),[G,S]=j(ue),[H,O]=j(xe),[U]=j(he),q=[{isError:s.isError,error:s.error},{isError:c.isError,error:c.error}];Ce(q);const[F,W]=o.useState(!0);o.useEffect(()=>{c.data&&(u(c.data.chat.name),x(c.data.chat.name),V(c.data.chat.members),W(!1))},[c.data,G,u]);const Q=()=>{n("/")},$=()=>{y(a=>!a)},K=()=>y(!1),J=()=>{f(!1),G("Updating Group Name...",{chatId:r,name:D})},X=()=>{I(!0)},E=()=>{I(!1)},Y=()=>{p(je(!0))},Z=()=>{U("Deleting Group...",r),E(),n("/groups")},ee=a=>{H("Removing Member...",{chatId:r,userId:a})};o.useEffect(()=>(r&&(u(`Group Name ${r}`),x(`Group Name ${r}`)),()=>{u(""),x(""),f(!1)}),[r]);const re=e.jsxs(e.Fragment,{children:[e.jsx(ge,{sx:{display:{xs:"block",sm:"none",position:"fixed",right:"1rem",top:"1rem"}},children:e.jsx(h,{onClick:$,children:e.jsx(Ie,{})})}),e.jsx(fe,{title:"back",children:e.jsx(h,{sx:{position:"absolute",top:"2rem",left:"-3rem",bgcolor:be,color:"white",":hover":{bgcolor:"rgba(0,0,0,0.7)"}},onClick:Q,children:e.jsx(_e,{})})})]}),se=e.jsx(m,{direction:"row",alignItems:"center",justifyContent:"center",spacing:"1rem",padding:"3rem",children:z?e.jsxs(e.Fragment,{children:[e.jsx(we,{value:D,sx:{color:i==="dark"?"#fff":"2c2c2c"},onChange:a=>x(a.target.value)}),e.jsx(h,{onClick:J,disabled:S,sx:{color:i==="dark"?"#fff":"2c2c2c"},children:e.jsx(Se,{})})]}):e.jsxs(e.Fragment,{children:[F?e.jsx(d,{variant:"h4",children:e.jsx(R,{})}):e.jsx(d,{variant:"h4",sx:{pl:"2rem"},children:w}),e.jsx(h,{disabled:S,onClick:()=>f(!0),sx:{color:i==="dark"?"#fff":"2c2c2c"},children:e.jsx(Ee,{})})]})}),oe=e.jsxs(m,{direction:{xs:"column-reverse",sm:"row"},spacing:"1rem",p:{xs:"0",sm:"1rem",md:"1rem 4rem"},children:[e.jsx(A,{size:"medium",sx:{backgroundColor:"#ee243e",color:"white",":hover":{backgroundColor:"#cb243d"}},startIcon:e.jsx(De,{}),onClick:X,children:"Delete Group"}),e.jsx(A,{size:"medium",variant:"contained",startIcon:e.jsx(Ge,{}),onClick:Y,children:"Add Member"})]});return s.isLoading?e.jsx(me,{}):e.jsxs(b,{container:!0,height:"100vh",children:[e.jsx(b,{item:!0,sx:{display:{xs:"none",sm:"block"}},sm:4,children:e.jsx(k,{myGroups:(_=s==null?void 0:s.data)==null?void 0:_.groups,chatId:r,mode:i})}),e.jsxs(b,{item:!0,xs:12,sm:8,sx:{display:"flex",flexDirection:"column",alignItems:"center",position:"relative",padding:"1rem 3rem"},children:[re,w&&e.jsxs(e.Fragment,{children:[e.jsx(d,{sx:{fontWeight:"bold",fontSize:"1.2rem",color:i==="dark"?"#fff":"2c2c2c"},children:se}),e.jsx(m,{direction:"row",justifyContent:"center",marginBottom:"1rem",children:e.jsx(d,{variant:"body2",textAlign:"center",sx:{fontWeight:"bold",fontSize:"1.2rem",color:i==="dark"?"#fff":"2c2c2c"},children:"Members"})}),e.jsx(m,{sx:{...B.stackContainer,...B.scrollbarContainer},spacing:"0.5rem",children:O?e.jsx(R,{}):P.map(a=>e.jsx(ve,{user:a,isAdded:!0,styling:{boxShadow:"0 0 0.5rem  rgba(0,0,0,0.2)",padding:"1rem 2rem",borderRadius:"1rem",color:"2c2c2c",backgroundColor:"#fff"},handler:ee},a._id))}),oe]})]}),l&&e.jsx(o.Suspense,{fallback:e.jsx(N,{open:!0}),children:e.jsx(Ne,{chatId:r})}),M&&e.jsx(o.Suspense,{fallback:e.jsx(N,{open:!0}),children:e.jsx(Le,{open:M,handleClose:E,deleteHandler:Z})}),e.jsx(ye,{sx:{display:{xs:"block",sm:"none"}},open:g,onClose:K,children:e.jsx(k,{w:"50vw",myGroups:(L=s==null?void 0:s.data)==null?void 0:L.groups,chatId:r,mode:i})})]})},k=({w:r="100%",myGroups:n=[],chatId:p,mode:l={}})=>e.jsx(m,{width:r,sx:{backgroundColor:l==="dark"?"#2c2c2c":"#e0e0e0",height:"100vh",overflow:"auto",width:"80%"},children:n.length>0?n.map(s=>e.jsx(C,{group:s,chatId:p},s._id)):e.jsx(d,{textAlign:"center",padding:"1rem",sx:{color:l==="dark"?"#fff":"2c2c2c"},children:"No groups"})});k.propTypes={w:t.string,myGroups:t.arrayOf(t.shape({_id:t.string.isRequired,name:t.string.isRequired,avatar:t.string})),chatId:t.string,mode:t.object};const C=o.memo(({group:r,chatId:n})=>{const{name:p,avatar:l,_id:s}=r;return e.jsx(pe,{to:`?group=${s}`,onClick:g=>{n===s&&g.preventDefault()},children:e.jsx(Me.div,{initial:{opacity:0,y:"-100%"},whileInView:{opacity:1,y:0},transition:{delay:.01},style:{display:"flex",gap:"0.75rem",alignItems:"center",backgroundColor:"white",color:"black",position:"relative",padding:"0.75rem",borderRadius:"0.75rem",boxShadow:"0px 4px 6px rgba(0, 0, 0, 0.1)",marginBottom:"0.75rem",cursor:"pointer",transition:"background-color 0.3s ease"},children:e.jsxs(m,{direction:"row",spacing:"1rem",alignItems:"center",children:[e.jsx(ke,{avatar:l}),e.jsx(d,{sx:{fontWeight:"bold"},children:p})]})})})});C.displayName="GroupListItem";C.propTypes={group:t.shape({_id:t.string.isRequired,name:t.string.isRequired,avatar:t.string}).isRequired,chatId:t.string};export{Ke as default};
