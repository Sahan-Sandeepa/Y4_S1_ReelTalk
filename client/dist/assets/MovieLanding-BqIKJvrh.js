import{E as de,j as e,a3 as y,a4 as v,P as n,aA as ue,aB as pe,u as me,r as t,ag as fe,S as xe,a6 as he,R as ge,q as ye,B as ve,T as Se,C as je,an as be,ac as Y,$ as M,aK as Ce,aL as Re,a5 as ke,M as Me,a7 as we,a9 as N,a0 as _e}from"./index-BanVTlhg.js";import{H as qe}from"./navbar-BLnWOB6g.js";import{C as Ie,H as Te}from"./Header-BfiNiPBh.js";import{a as $e,u as Le}from"./hook-DVnn475D.js";import{F as Pe}from"./footer-DAjajGdC.js";import"./AvatarCard-lKOp44qc.js";import"./Avatar-D1EpHAeu.js";import"./motion-DOLrXkcA.js";const Ae=de(e.jsx("path",{d:"M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20z"}),"ArrowBack");var z={},Ee=v;Object.defineProperty(z,"__esModule",{value:!0});var G=z.default=void 0,Oe=Ee(y()),De=e;G=z.default=(0,Oe.default)((0,De.jsx)("path",{d:"M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2m0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2m0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2"}),"MoreVert");var H={},Be=v;Object.defineProperty(H,"__esModule",{value:!0});var Q=H.default=void 0,Ne=Be(y()),ze=e;Q=H.default=(0,Ne.default)((0,ze.jsx)("path",{d:"M10 9V5l-7 7 7 7v-4.1c5 0 8.5 1.6 11 5.1-1-5-4-10-11-11"}),"Reply");var F={},He=v;Object.defineProperty(F,"__esModule",{value:!0});var Z=F.default=void 0,Fe=He(y()),Ve=e;Z=F.default=(0,Fe.default)((0,Ve.jsx)("path",{d:"M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2m6 9.8a.9.9 0 0 1-.1.5l-2.1 4.9a1.34 1.34 0 0 1-1.3.8H9a2 2 0 0 1-2-2v-5a1.28 1.28 0 0 1 .4-1L12 5l.69.69a1.08 1.08 0 0 1 .3.7v.2L12.41 10H17a1 1 0 0 1 1 1z"}),"Recommend");var V={},Je=v;Object.defineProperty(V,"__esModule",{value:!0});var ee=V.default=void 0,Ue=Je(y()),Xe=e;ee=V.default=(0,Ue.default)((0,Xe.jsx)("path",{d:"m10 16.5 6-4.5-6-4.5zM12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2m0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8"}),"PlayCircleOutline");const te=({selectedAction:l,movie:m})=>{const w=ue(),{isLoading:_,data:c,isError:q,error:S,refetch:f}=pe(""),a=me(),[j,I]=t.useState([]),T=fe(),x=xe(),b=w.chatId;$e([{isError:q,error:S}]);const[$]=he(),d=t.useCallback(()=>{f(),a("/")},[f,a]),C=t.useCallback(u=>{I(u)},[]),i=async u=>{try{const R=await(await fetch(m.Poster)).blob(),P=new File([R],"poster.jpg",{type:R.type}),h=new FormData;h.append("chatId",u),h.append("files",P),x(Y(!0));const k=M.loading(`Sending ${l}...`);if(await $(h).unwrap()){sessionStorage.setItem("chatAttachmentResponse",JSON.stringify(m.Poster));const A=sessionStorage.getItem("chatAttachmentResponse");console.log("Stored Value in Session Storage:",JSON.parse(A)),M.success(`${l} sent successfully`,{id:k})}else M.error(`Failed to send ${l}`,{id:k})}catch(p){M.error(`Error: ${p.message}`)}finally{x(Y(!1))}},L={[Ce]:d,[Re]:C};return Le(T,L),e.jsx(ge.Fragment,{children:e.jsxs(ye,{square:!0,sx:{width:"100%",maxWidth:"390px",position:"fixed",bottom:"40px",left:"50%",top:"80px",transform:"translateX(-50%)",overflowY:"auto",maxHeight:"calc(100vh - 70px)",borderRadius:"8px","&::-webkit-scrollbar":{width:"8px",backgroundColor:"transparent"},"&:hover::-webkit-scrollbar":{backgroundColor:"#f1f1f1"},"&::-webkit-scrollbar-thumb":{backgroundColor:"#888",borderRadius:"10px"},"&:hover::-webkit-scrollbar-thumb":{backgroundColor:"#555"}},children:[e.jsxs(ve,{sx:{display:"flex",alignItems:"center",padding:1},children:[e.jsx(Ae,{sx:{cursor:"pointer",fontSize:28},onClick:d}),e.jsx(Se,{variant:"h5",sx:{flexGrow:1,textAlign:"center"},children:"All chats"})]}),e.jsx(je,{sx:{mb:2},children:_?e.jsx(be,{}):e.jsx(Ie,{w:"24.3vw",chats:c==null?void 0:c.chats,chatId:b,onChatSelect:i,onlineUsers:j,selectedAction:l,poster:m.Poster})})]})})};te.propTypes={selectedAction:n.string.isRequired,movie:n.shape({Title:n.string.isRequired,Year:n.string.isRequired,imdbID:n.string.isRequired,Type:n.string.isRequired,Poster:n.string.isRequired}).isRequired};var J={},Ye=v;Object.defineProperty(J,"__esModule",{value:!0});var se=J.default=void 0,Ke=Ye(y()),K=e;se=J.default=(0,Ke.default)([(0,K.jsx)("path",{d:"M12 14c.04 0 .08-.01.12-.01l-2.61-2.61c0 .04-.01.08-.01.12 0 1.38 1.12 2.5 2.5 2.5m1.01-4.79 1.28 1.28c-.26-.57-.71-1.03-1.28-1.28m7.81 2.29C19.17 8.13 15.79 6 12 6c-.68 0-1.34.09-1.99.22l.92.92c.35-.09.7-.14 1.07-.14 2.48 0 4.5 2.02 4.5 4.5 0 .37-.06.72-.14 1.07l2.05 2.05c.98-.86 1.81-1.91 2.41-3.12M12 17c.95 0 1.87-.13 2.75-.39l-.98-.98c-.54.24-1.14.37-1.77.37-2.48 0-4.5-2.02-4.5-4.5 0-.63.13-1.23.36-1.77L6.11 7.97c-1.22.91-2.23 2.1-2.93 3.52C4.83 14.86 8.21 17 12 17",opacity:".3"},"0"),(0,K.jsx)("path",{d:"M12 6c3.79 0 7.17 2.13 8.82 5.5-.59 1.22-1.42 2.27-2.41 3.12l1.41 1.41c1.39-1.23 2.49-2.77 3.18-4.53C21.27 7.11 17 4 12 4c-1.27 0-2.49.2-3.64.57l1.65 1.65C10.66 6.09 11.32 6 12 6m2.28 4.49 2.07 2.07c.08-.34.14-.7.14-1.07C16.5 9.01 14.48 7 12 7c-.37 0-.72.06-1.07.14L13 9.21c.58.25 1.03.71 1.28 1.28M2.01 3.87l2.68 2.68C3.06 7.83 1.77 9.53 1 11.5 2.73 15.89 7 19 12 19c1.52 0 2.98-.29 4.32-.82l3.42 3.42 1.41-1.41L3.42 2.45zm7.5 7.5 2.61 2.61c-.04.01-.08.02-.12.02-1.38 0-2.5-1.12-2.5-2.5 0-.05.01-.08.01-.13m-3.4-3.4 1.75 1.75c-.23.55-.36 1.15-.36 1.78 0 2.48 2.02 4.5 4.5 4.5.63 0 1.23-.13 1.77-.36l.98.98c-.88.24-1.8.38-2.75.38-3.79 0-7.17-2.13-8.82-5.5.7-1.43 1.72-2.61 2.93-3.53"},"1")],"VisibilityOffTwoTone");const We="aef6913e",W=[{title:"Popular Movies",query:"Avengers"},{title:"Top Rated Movies",query:"Deadpool"},{title:"Upcoming Movies",query:"fast and furious"},{title:"Action Movies",query:"action"},{title:"Comedy Movies",query:"comedy"},{title:"X-rated Movies",query:"Sex"}],ot=()=>{const[l,m]=t.useState([]),[w,_]=t.useState(!0),[c,q]=t.useState(null),[S,f]=t.useState(null),[a,j]=t.useState(null),[I,T]=t.useState(!1),{user:x}=ke(r=>r.auth),[b,$]=t.useState(null),[d,C]=t.useState(null),{mode:i}=Me();t.useEffect(()=>{(async()=>{try{const o=W.map(({query:B})=>_e.get(`https://www.omdbapi.com/?s=${B}&apikey=${We}`)),s=(await Promise.all(o)).map((B,ne)=>{var X;return((X=B.data.Search)==null?void 0:X.map((le,ce)=>({...le,dynamicID:`${ne}-${ce}`})))||[]}),D=JSON.parse(localStorage.getItem("movies")||"[]");JSON.stringify(s)!==JSON.stringify(D)&&localStorage.setItem("movies",JSON.stringify(s)),m(s)}catch(o){q(o)}finally{_(!1)}})()},[]);const L=(r,o,g)=>{f(r.currentTarget),j({...o,categoryTitle:g.title})},u=()=>{f(null)},p=r=>{a&&(C(r),T(!0),u())};if(t.useEffect(()=>{b&&d&&a&&($(null),C(null),j(null))},[b,d,a]),w)return e.jsx("div",{children:"Loading..."});if(c)return e.jsxs("div",{children:["Error: ",c.message]});const R={padding:"20px"},P={marginBottom:"40px"},h={fontSize:"1.5em",marginTop:"0px",marginBottom:"20px",color:i==="dark"?"#fff":"black"},k={display:"flex",flexWrap:"wrap",gap:"20px"},U={display:"flex",alignItems:"center",justifyContent:"center",width:"68%",height:"70%",backgroundColor:"#000",marginLeft:"50px",marginTop:"10px",borderRadius:"6px",color:"#fff",flexDirection:"column"},A={width:"300px",borderRadius:"8px",backgroundColor:i==="dark"?"#333":"#fff",marginLeft:"45px",marginBottom:"25px",height:"470px",overflow:"hidden",boxShadow:"0 6px 9px rgba(0,0,0,0.5)",position:"relative",color:i==="dark"?"#fff":"black"},ae={width:"68%",height:"70%",display:"block",marginLeft:"50px",marginTop:"10px",borderRadius:"6px"},re={fontSize:"1.1em",margin:"10px",color:i==="dark"?"#fff":"black"},oe={fontSize:"0.9em",color:i==="dark"?"#fff":"black",margin:"10px"},ie={borderRadius:"8px",boxShadow:"0 4px 8px rgba(0,0,0,0.2)"},E={display:"flex",alignItems:"center",padding:"10px 20px",fontSize:"1em",color:"#333",transition:"background-color 0.3s, color 0.3s"},O={marginRight:"10px",fontSize:"1.3em",color:"#282828"};return e.jsxs(e.Fragment,{children:[e.jsx(Te,{}),e.jsxs("div",{className:"landing-container",children:[e.jsxs(qe,{children:[e.jsx("title",{children:"Chat App"}),e.jsx("meta",{property:"og:title",content:"Landing - Chat App"})]}),e.jsx("div",{style:R,children:W.map((r,o)=>{var g;return e.jsxs("div",{style:P,children:[e.jsx("h2",{style:h,children:r.title}),e.jsx("div",{style:k,children:(g=l[o])==null?void 0:g.map(s=>e.jsxs("div",{style:A,children:[r.title==="X-rated Movies"&&x.age<18?e.jsxs("div",{style:U,children:[e.jsx(se,{style:{fontSize:"50px",color:"#fff"}}),e.jsx("div",{style:{fontSize:"10px"},children:"This image may contain explicit content."})]}):e.jsx("img",{src:s.Poster,alt:s.Title,style:ae}),e.jsx("div",{style:re,children:s.Title}),e.jsxs("div",{style:oe,children:[s.Year," | ",s.Type]}),e.jsx(G,{style:{position:"absolute",bottom:"10px",right:"10px",cursor:"pointer"},onClick:D=>L(D,s,r)})]},s.dynamicID))})]},o)})}),e.jsxs(we,{anchorEl:S,open:!!S,onClose:u,PaperProps:{style:ie},children:[e.jsxs(N,{onClick:()=>p("Share"),style:E,className:"thq-link thq-body-small",children:[e.jsx(Q,{style:O}),"Share"]}),e.jsxs(N,{onClick:()=>p("Recommend"),style:E,className:"thq-link thq-body-small",children:[e.jsx(Z,{style:O}),"Recommend"]}),(a==null?void 0:a.categoryTitle)==="X-rated Movies"&&x.age<18&&e.jsxs(N,{onClick:()=>p("Request"),style:E,className:"thq-link thq-body-small",children:[e.jsx(ee,{style:O}),"Request"]})]}),I&&e.jsx(te,{selectedAction:d,movie:a}),e.jsx(Pe,{title:e.jsx(t.Fragment,{children:e.jsx("span",{className:"landing-text132 thq-body-small",children:"Connect with us"})})})]})]})};export{ot as default};
