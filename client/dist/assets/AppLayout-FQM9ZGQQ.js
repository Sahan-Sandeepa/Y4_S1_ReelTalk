import{D as b,j as e,P as s,u as L,a3 as v,at as Y,au as Z,r as i,a5 as $,S as I,T as y,av as z,aw as ee,a1 as te,a2 as se,af as F,ax as ae,ac as ne,B as re,R as oe,ay as ce,O as ie,ae as le,az as he,aA as de,aB as H,aC as pe,aD as me,al as w,aE as j,aF as xe,aG as ue,aH as ge,aI as fe,aJ as je}from"./index-nQwRLWIV.js";import{b as R,a as ve,u as Ce}from"./hook-CbcOqQDK.js";import{D as Ie}from"./Delete-DGRb6gYX.js";import{H as ye,C as T}from"./Header-CqC6JSBY.js";import{A as Ee}from"./Avatar-Cp_pS6TR.js";import{D as Me}from"./Drawer-CrhtyCwH.js";const be=b(e.jsx("path",{d:"M19 4h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2m0 16H5V10h14zM9 14H7v-2h2zm4 0h-2v-2h2zm4 0h-2v-2h2zm-8 4H7v-2h2zm4 0h-2v-2h2zm4 0h-2v-2h2z"}),"CalendarMonth"),Se=b(e.jsx("path",{d:"M10.09 15.59 11.5 17l5-5-5-5-1.41 1.41L12.67 11H3v2h9.67zM19 3H5c-1.11 0-2 .9-2 2v4h2V5h14v14H5v-4H3v4c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2"}),"ExitToApp"),ke=b(e.jsx("path",{d:"M9 11.75c-.69 0-1.25.56-1.25 1.25s.56 1.25 1.25 1.25 1.25-.56 1.25-1.25-.56-1.25-1.25-1.25m6 0c-.69 0-1.25.56-1.25 1.25s.56 1.25 1.25 1.25 1.25-.56 1.25-1.25-.56-1.25-1.25-1.25M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2m0 18c-4.41 0-8-3.59-8-8 0-.29.02-.58.05-.86 2.36-1.05 4.23-2.98 5.21-5.37C11.07 8.33 14.05 10 17.42 10c.78 0 1.53-.09 2.25-.26.21.71.33 1.47.33 2.26 0 4.41-3.59 8-8 8"}),"Face"),_=({dispatch:t,deleteMenuAnchor:a})=>{const o=L(),{isDeleteMenu:l,selectedDeleteChat:h}=v(g=>g.misc),[r,u]=R(Y),[m,c]=R(Z),x=h.groupChat,d=()=>{t(z(!1)),a.current=null},E=()=>{d(),m("Leaving Group...",h.chatId)},M=()=>{d(),r("Deleting Chat...",h.chatId)};return i.useEffect(()=>{(u||c)&&o("/")},[u,c]),e.jsx($,{open:l,onClose:d,anchorEl:a.current,anchorOrigin:{vertical:"bottom",horizontal:"right"},transformOrigin:{vertical:"center",horizontal:"center"},children:e.jsx(I,{sx:{width:"10rem",padding:"0.5rem",cursor:"pointer"},direction:"row",alignItems:"center",spacing:"0.5rem",onClick:x?E:M,children:x?e.jsxs(e.Fragment,{children:[e.jsx(Se,{}),e.jsx(y,{children:"Leave Group"})]}):e.jsxs(e.Fragment,{children:[e.jsx(Ie,{}),e.jsx(y,{children:"Delete Chat"})]})})})};_.propTypes={dispatch:s.func.isRequired,deleteMenuAnchor:s.shape({current:s.instanceOf(Element)}).isRequired};const G=({title:t="FamilyFrame",description:a="this is the Chat App called"})=>e.jsxs(ee,{children:[e.jsx("title",{children:t}),e.jsx("meta",{name:"description",content:a})]});G.propTypes={title:s.string,description:s.string};var S={},Ae=se;Object.defineProperty(S,"__esModule",{value:!0});var q=S.default=void 0,De=Ae(te()),He=e;q=S.default=(0,De.default)((0,He.jsx)("path",{d:"M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2m1 15h-2v-6h2zm0-8h-2V7h2z"}),"Info");const N=({user:t})=>{var o;const{mode:a}=F();return e.jsxs(I,{spacing:"2rem",direction:"column",alignItems:"center",width:"100%",children:[e.jsx(Ee,{src:ae((o=t==null?void 0:t.avatar)==null?void 0:o.url),sx:{width:200,height:200,objectFit:"contain",marginBottom:"1rem",border:a==="dark"?"5px solid white":"5px solid #bdbdbd"}}),e.jsx(C,{text:t==null?void 0:t.name,style:{color:a==="dark"?"#fff":"#424242"},Icon:e.jsx(ke,{})}),e.jsx(C,{heading:"About",text:t==null?void 0:t.bio,style:{color:a==="dark"?"#fff":"#424242"},Icon:e.jsx(q,{})}),e.jsx(C,{heading:"Joined",text:ne(t==null?void 0:t.createdAt).fromNow(),style:{color:a==="dark"?"#fff":"#424242"},Icon:e.jsx(be,{})})]})},C=({text:t,Icon:a,heading:o,style:l={}})=>e.jsxs(I,{direction:"row",alignItems:"center",spacing:"1rem",color:l,textAlign:"center",justifyContent:"flex-start",paddingLeft:"107px",paddingTop:"20px",sx:{width:"100%"},children:[a&&e.jsx(re,{sx:{display:"flex",alignItems:"center",justifyContent:"center",width:"40px",height:"40px",color:{style:l}},children:oe.cloneElement(a,{sx:{fontSize:"2rem"}})}),e.jsxs(I,{alignItems:"flex-start",children:[e.jsx(y,{variant:"caption",sx:{display:"flex",alignItems:"center"},children:o}),e.jsx(y,{variant:"body1",sx:{pt:"1px"},children:t})]})]});N.propTypes={user:s.shape({avatar:s.shape({url:s.string}),bio:s.string,username:s.string,name:s.string,createdAt:s.string}).isRequired};C.propTypes={text:s.string.isRequired,Icon:s.element,heading:s.string.isRequired,style:s.object};const _e=t=>o=>{const l=ce(),h=L(),r=ie(),u=le(),{mode:m}=F(),c=l.chatId,x=i.useRef(null),[d,E]=i.useState([]),{isMobile:M}=v(n=>n.misc),{user:g}=v(n=>n.auth),{newMessagesAlert:f}=v(n=>n.chat),{isLoading:k,data:p,isError:O,error:V,refetch:A}=he(""),P=()=>r(xe(!1));ve([{isError:O,error:V}]),i.useEffect(()=>{de({key:H,value:f})},[f]);const D=(n,K,X)=>{r(z(!0)),r(ue({chatId:K,groupChat:X})),x.current=n.currentTarget},U=i.useCallback(n=>{n.chatId!==c&&r(pe(n))},[c]),B=i.useCallback(()=>{r(me())},[r]),J=i.useCallback(()=>{A(),h("/")},[A,h]),Q=i.useCallback(n=>{E(n)},[]),W={[H]:U,[ge]:B,[fe]:J,[je]:Q};return Ce(u,W),e.jsxs(e.Fragment,{children:[e.jsx(G,{}),e.jsx(ye,{}),e.jsx(_,{dispatch:r,deleteMenuAnchor:x}),k?e.jsx(w,{}):e.jsx(Me,{open:M,onClose:P,children:e.jsx(T,{w:"70vw",chats:p==null?void 0:p.chats,chatId:c,handleDeleteChat:D,newMessagesAlert:f,onlineUsers:d})}),e.jsxs(j,{container:!0,height:"calc(100vh - 4rem)",sx:{mt:"-65px"},children:[e.jsx(j,{item:!0,sm:4,md:3,sx:{display:{xs:"none",sm:"block"},bgcolor:m==="dark"?"#2c2c2c":"#e0e0e0",color:m==="dark"?"#2c2c2c":"#e0e0e0"},height:"100%",children:k?e.jsx(w,{}):e.jsx(T,{chats:p==null?void 0:p.chats,chatId:c,handleDeleteChat:D,newMessagesAlert:f,onlineUsers:d})}),e.jsx(j,{item:!0,xs:12,sm:8,md:5,lg:6,height:"100%",children:e.jsx(t,{...o,chatId:c,user:g})}),e.jsx(j,{item:!0,md:4,lg:3,height:"100%",sx:{display:{xs:"none",md:"block"},padding:"2rem",bgcolor:m==="dark"?"#2c2c2c":"#e0e0e0"},children:e.jsx(N,{user:g})})]})]})};export{_e as A};