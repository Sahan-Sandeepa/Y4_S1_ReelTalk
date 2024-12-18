import{r as m,M as F,d as H,t as K,bx as Q,bw as S,j as b,h as l,e as Z,bF as tt,bG as X,l as et,m as rt,s as V,bH as nt,bc as ot,q as at,H as z,b8 as it,A as st,n as B,o as ct}from"./index-BanVTlhg.js";const lt=["addEndListener","appear","children","container","direction","easing","in","onEnter","onEntered","onEntering","onExit","onExited","onExiting","style","timeout","TransitionComponent"];function pt(e,t,o){const r=t.getBoundingClientRect(),a=o&&o.getBoundingClientRect(),v=S(t);let d;if(t.fakeTransform)d=t.fakeTransform;else{const i=v.getComputedStyle(t);d=i.getPropertyValue("-webkit-transform")||i.getPropertyValue("transform")}let f=0,u=0;if(d&&d!=="none"&&typeof d=="string"){const i=d.split("(")[1].split(")")[0].split(",");f=parseInt(i[4],10),u=parseInt(i[5],10)}return e==="left"?a?`translateX(${a.right+f-r.left}px)`:`translateX(${v.innerWidth+f-r.left}px)`:e==="right"?a?`translateX(-${r.right-a.left-f}px)`:`translateX(-${r.left+r.width-f}px)`:e==="up"?a?`translateY(${a.bottom+u-r.top}px)`:`translateY(${v.innerHeight+u-r.top}px)`:a?`translateY(-${r.top-a.top+r.height-u}px)`:`translateY(-${r.top+r.height-u}px)`}function dt(e){return typeof e=="function"?e():e}function M(e,t,o){const r=dt(o),a=pt(e,t,r);a&&(t.style.webkitTransform=a,t.style.transform=a)}const ut=m.forwardRef(function(t,o){const r=F(),a={enter:r.transitions.easing.easeOut,exit:r.transitions.easing.sharp},v={enter:r.transitions.duration.enteringScreen,exit:r.transitions.duration.leavingScreen},{addEndListener:d,appear:f=!0,children:u,container:i,direction:p="down",easing:D=a,in:g,onEnter:T,onEntered:L,onEntering:w,onExit:R,onExited:C,onExiting:j,style:y,timeout:x=v,TransitionComponent:I=Z}=t,P=H(t,lt),c=m.useRef(null),N=K(u.ref,c,o),E=n=>s=>{n&&(s===void 0?n(c.current):n(c.current,s))},k=E((n,s)=>{M(p,n,i),tt(n),T&&T(n,s)}),h=E((n,s)=>{const Y=X({timeout:x,style:y,easing:D},{mode:"enter"});n.style.webkitTransition=r.transitions.create("-webkit-transform",l({},Y)),n.style.transition=r.transitions.create("transform",l({},Y)),n.style.webkitTransform="none",n.style.transform="none",w&&w(n,s)}),$=E(L),A=E(j),q=E(n=>{const s=X({timeout:x,style:y,easing:D},{mode:"exit"});n.style.webkitTransition=r.transitions.create("-webkit-transform",s),n.style.transition=r.transitions.create("transform",s),M(p,n,i),R&&R(n)}),G=E(n=>{n.style.webkitTransition="",n.style.transition="",C&&C(n)}),J=n=>{d&&d(c.current,n)},W=m.useCallback(()=>{c.current&&M(p,c.current,i)},[p,i]);return m.useEffect(()=>{if(g||p==="down"||p==="right")return;const n=Q(()=>{c.current&&M(p,c.current,i)}),s=S(c.current);return s.addEventListener("resize",n),()=>{n.clear(),s.removeEventListener("resize",n)}},[p,g,i]),m.useEffect(()=>{g||W()},[g,W]),b.jsx(I,l({nodeRef:c,onEnter:k,onEntered:$,onEntering:h,onExit:q,onExited:G,onExiting:A,addEndListener:J,appear:f,in:g,timeout:x},P,{children:(n,s)=>m.cloneElement(u,l({ref:N,style:l({visibility:n==="exited"&&!g?"hidden":void 0},y,u.props.style)},s))}))});function ft(e){return et("MuiDrawer",e)}rt("MuiDrawer",["root","docked","paper","paperAnchorLeft","paperAnchorRight","paperAnchorTop","paperAnchorBottom","paperAnchorDockedLeft","paperAnchorDockedRight","paperAnchorDockedTop","paperAnchorDockedBottom","modal"]);const ht=["BackdropProps"],mt=["anchor","BackdropProps","children","className","elevation","hideBackdrop","ModalProps","onClose","open","PaperProps","SlideProps","TransitionComponent","transitionDuration","variant"],U=(e,t)=>{const{ownerState:o}=e;return[t.root,(o.variant==="permanent"||o.variant==="persistent")&&t.docked,t.modal]},gt=e=>{const{classes:t,anchor:o,variant:r}=e,a={root:["root"],docked:[(r==="permanent"||r==="persistent")&&"docked"],modal:["modal"],paper:["paper",`paperAnchor${z(o)}`,r!=="temporary"&&`paperAnchorDocked${z(o)}`]};return ct(a,ft,t)},xt=V(nt,{name:"MuiDrawer",slot:"Root",overridesResolver:U})(({theme:e})=>({zIndex:(e.vars||e).zIndex.drawer})),_=V("div",{shouldForwardProp:ot,name:"MuiDrawer",slot:"Docked",skipVariantsResolver:!1,overridesResolver:U})({flex:"0 0 auto"}),vt=V(at,{name:"MuiDrawer",slot:"Paper",overridesResolver:(e,t)=>{const{ownerState:o}=e;return[t.paper,t[`paperAnchor${z(o.anchor)}`],o.variant!=="temporary"&&t[`paperAnchorDocked${z(o.anchor)}`]]}})(({theme:e,ownerState:t})=>l({overflowY:"auto",display:"flex",flexDirection:"column",height:"100%",flex:"1 0 auto",zIndex:(e.vars||e).zIndex.drawer,WebkitOverflowScrolling:"touch",position:"fixed",top:0,outline:0},t.anchor==="left"&&{left:0},t.anchor==="top"&&{top:0,left:0,right:0,height:"auto",maxHeight:"100%"},t.anchor==="right"&&{right:0},t.anchor==="bottom"&&{top:"auto",left:0,bottom:0,right:0,height:"auto",maxHeight:"100%"},t.anchor==="left"&&t.variant!=="temporary"&&{borderRight:`1px solid ${(e.vars||e).palette.divider}`},t.anchor==="top"&&t.variant!=="temporary"&&{borderBottom:`1px solid ${(e.vars||e).palette.divider}`},t.anchor==="right"&&t.variant!=="temporary"&&{borderLeft:`1px solid ${(e.vars||e).palette.divider}`},t.anchor==="bottom"&&t.variant!=="temporary"&&{borderTop:`1px solid ${(e.vars||e).palette.divider}`})),O={left:"right",right:"left",top:"down",bottom:"up"};function Et(e){return["left","right"].indexOf(e)!==-1}function kt({direction:e},t){return e==="rtl"&&Et(t)?O[t]:t}const yt=m.forwardRef(function(t,o){const r=it({props:t,name:"MuiDrawer"}),a=F(),v=st(),d={enter:a.transitions.duration.enteringScreen,exit:a.transitions.duration.leavingScreen},{anchor:f="left",BackdropProps:u,children:i,className:p,elevation:D=16,hideBackdrop:g=!1,ModalProps:{BackdropProps:T}={},onClose:L,open:w=!1,PaperProps:R={},SlideProps:C,TransitionComponent:j=ut,transitionDuration:y=d,variant:x="temporary"}=r,I=H(r.ModalProps,ht),P=H(r,mt),c=m.useRef(!1);m.useEffect(()=>{c.current=!0},[]);const N=kt({direction:v?"rtl":"ltr"},f),k=l({},r,{anchor:f,elevation:D,open:w,variant:x},P),h=gt(k),$=b.jsx(vt,l({elevation:x==="temporary"?D:0,square:!0},R,{className:B(h.paper,R.className),ownerState:k,children:i}));if(x==="permanent")return b.jsx(_,l({className:B(h.root,h.docked,p),ownerState:k,ref:o},P,{children:$}));const A=b.jsx(j,l({in:w,direction:O[N],timeout:y,appear:c.current},C,{children:$}));return x==="persistent"?b.jsx(_,l({className:B(h.root,h.docked,p),ownerState:k,ref:o},P,{children:A})):b.jsx(xt,l({BackdropProps:l({},u,T,{transitionDuration:y}),className:B(h.root,h.modal,p),open:w,ownerState:k,onClose:L,hideBackdrop:g,ref:o},P,I,{children:A}))});export{yt as D};