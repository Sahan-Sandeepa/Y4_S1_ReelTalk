import{r as i,$ as o}from"./index-BanVTlhg.js";const w=(e=[])=>{i.useEffect(()=>{e.forEach(({isError:n,error:t,fallback:a})=>{var c;n&&(a?a():o.error(((c=t==null?void 0:t.data)==null?void 0:c.message)||"Something went wrong"))})},[e])},S=e=>{const[n,t]=i.useState(!1),[a,c]=i.useState(null),[f]=e();return[async(g,...l)=>{var r,d;t(!0);const u=o.loading(g||"Updating data...");try{const s=await f(...l);s.data?(o.success(s.data.message||"Updated data successfully",{id:u}),c(s.data)):o.error(((d=(r=s==null?void 0:s.error)==null?void 0:r.data)==null?void 0:d.message)||"Something went wrong",{id:u})}catch(s){console.log(s),o.error("Something went wrong",{id:u})}finally{t(!1)}},n,a]},h=(e,n)=>{i.useEffect(()=>(Object.entries(n).forEach(([t,a])=>{e.on(t,a)}),()=>{Object.entries(n).forEach(([t,a])=>{e.off(t,a)})}),[e,n])};export{w as a,S as b,h as u};
