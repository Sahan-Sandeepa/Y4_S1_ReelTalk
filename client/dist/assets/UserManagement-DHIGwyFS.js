import{r as m,ax as d,j as a,al as l,$ as h}from"./index-nQwRLWIV.js";import{s as n}from"./index-CuMLlqtw.js";import{A as p}from"./AdminLayout-DfXFzIWd.js";import{T as f}from"./Table-CgmuquRb.js";import{a as u}from"./hook-CbcOqQDK.js";import{A as N}from"./Avatar-Cp_pS6TR.js";import"./Menu-BQtQEp1m.js";import"./Drawer-CrhtyCwH.js";import"./Container-pKhpZPRr.js";import"./createStyled-_vrQOoQc.js";import"./Select-CNHqHSZW.js";import"./Chip-DmxrvcVU.js";import"./ListItemText-D4lQFR75.js";import"./TextField-DRpVSgRA.js";import"./Button-CDrbuMrr.js";import"./InputAdornment-BVIphoD5.js";import"./CircularProgress-B9RjoFSh.js";const c=[{field:"avatar",headerName:"Avatar",headerClassName:"table-header",width:150,renderCell:e=>a.jsx(N,{alt:e.row.name,src:e.row.avatar})},{field:"name",headerName:"Name",headerClassName:"table-header",width:200},{field:"username",headerName:"Username",headerClassName:"table-header",width:200},{field:"friends",headerName:"Friends",headerClassName:"table-header",width:150},{field:"groups",headerName:"Groups",headerClassName:"table-header",width:200}],G=()=>{const{loading:e,data:r,error:t}=n(`${h}/api/v1/admin/users`);u([{isError:t,error:t}]);const[o,i]=m.useState([]);return m.useEffect(()=>{r&&i(r.users.map(s=>({...s,id:s._id,avatar:d(s.avatar,50)})))},[r]),a.jsx(p,{children:e?a.jsx(l,{height:"100vh"}):a.jsx(f,{heading:"All Users",columns:c,rows:o})})};export{G as default};