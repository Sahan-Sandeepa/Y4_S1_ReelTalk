import{l as N,m as U,be as D,s as g,H as c,h as o,bf as M,r as w,b8 as z,d as E,j as v,n as I,o as F}from"./index-BanVTlhg.js";function K(r){return N("MuiCircularProgress",r)}U("MuiCircularProgress",["root","determinate","indeterminate","colorPrimary","colorSecondary","svg","circle","circleDeterminate","circleIndeterminate","circleDisableShrink"]);const W=["className","color","disableShrink","size","style","thickness","value","variant"];let l=r=>r,P,b,S,$;const t=44,B=D(P||(P=l`
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
`)),G=D(b||(b=l`
  0% {
    stroke-dasharray: 1px, 200px;
    stroke-dashoffset: 0;
  }

  50% {
    stroke-dasharray: 100px, 200px;
    stroke-dashoffset: -15px;
  }

  100% {
    stroke-dasharray: 100px, 200px;
    stroke-dashoffset: -125px;
  }
`)),H=r=>{const{classes:e,variant:s,color:a,disableShrink:d}=r,u={root:["root",s,`color${c(a)}`],svg:["svg"],circle:["circle",`circle${c(s)}`,d&&"circleDisableShrink"]};return F(u,K,e)},L=g("span",{name:"MuiCircularProgress",slot:"Root",overridesResolver:(r,e)=>{const{ownerState:s}=r;return[e.root,e[s.variant],e[`color${c(s.color)}`]]}})(({ownerState:r,theme:e})=>o({display:"inline-block"},r.variant==="determinate"&&{transition:e.transitions.create("transform")},r.color!=="inherit"&&{color:(e.vars||e).palette[r.color].main}),({ownerState:r})=>r.variant==="indeterminate"&&M(S||(S=l`
      animation: ${0} 1.4s linear infinite;
    `),B)),V=g("svg",{name:"MuiCircularProgress",slot:"Svg",overridesResolver:(r,e)=>e.svg})({display:"block"}),Z=g("circle",{name:"MuiCircularProgress",slot:"Circle",overridesResolver:(r,e)=>{const{ownerState:s}=r;return[e.circle,e[`circle${c(s.variant)}`],s.disableShrink&&e.circleDisableShrink]}})(({ownerState:r,theme:e})=>o({stroke:"currentColor"},r.variant==="determinate"&&{transition:e.transitions.create("stroke-dashoffset")},r.variant==="indeterminate"&&{strokeDasharray:"80px, 200px",strokeDashoffset:0}),({ownerState:r})=>r.variant==="indeterminate"&&!r.disableShrink&&M($||($=l`
      animation: ${0} 1.4s ease-in-out infinite;
    `),G)),A=w.forwardRef(function(e,s){const a=z({props:e,name:"MuiCircularProgress"}),{className:d,color:u="primary",disableShrink:R=!1,size:m=40,style:_,thickness:i=3.6,value:f=0,variant:k="indeterminate"}=a,j=E(a,W),n=o({},a,{color:u,disableShrink:R,size:m,thickness:i,value:f,variant:k}),h=H(n),p={},x={},y={};if(k==="determinate"){const C=2*Math.PI*((t-i)/2);p.strokeDasharray=C.toFixed(3),y["aria-valuenow"]=Math.round(f),p.strokeDashoffset=`${((100-f)/100*C).toFixed(3)}px`,x.transform="rotate(-90deg)"}return v.jsx(L,o({className:I(h.root,d),style:o({width:m,height:m},x,_),ownerState:n,ref:s,role:"progressbar"},y,j,{children:v.jsx(V,{className:h.svg,ownerState:n,viewBox:`${t/2} ${t/2} ${t} ${t}`,children:v.jsx(Z,{className:h.circle,style:p,ownerState:n,cx:t,cy:t,r:(t-i)/2,fill:"none",strokeWidth:i})})}))});export{A as C};