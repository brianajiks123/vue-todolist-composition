import{k as b,l as V,e as v,m as y,o as r,c as u,u as c,h as f,f as l,a as e,g as p,q as w,t as k}from"./index-d0f6f896.js";import{B as d}from"./BaseInput-0b48fb2c.js";const R=e("h1",{style:{color:"green"}},"Register",-1),x=e("br",null,null,-1),U=["onSubmit"],B=e("br",null,null,-1),L=e("br",null,null,-1),q=e("br",null,null,-1),N=e("button",{type:"submit",style:{"background-color":"green",color:"azure",padding:"5px","border-radius":"5px"}},"Register",-1),S=e("br",null,null,-1),C=e("br",null,null,-1),F={key:1},z={__name:"RegisterView",setup(I){const _=b(),a=V(),i={name:"",username:"",password:""},o=v({...i}),m=()=>Object.assign(o.value,i),g=async()=>{try{const s=await a.register(o.value);m(),alert(`User ${s.name} successfully registered.`),_.replace({name:"Login"})}catch(s){console.log(s),alert(s)}};return(s,t)=>{const h=y("RouterLink");return r(),u("div",null,[R,x,c(a).getUser.id?(r(),u("h3",F,k(c(a).getUser.id),1)):(r(),u("form",{key:0,method:"post",onSubmit:f(g,["prevent"]),onReset:m},[l(d,{name:"name",modelValue:o.value.name,"onUpdate:modelValue":t[0]||(t[0]=n=>o.value.name=n),placeholder:"your name",required:""},null,8,["modelValue"]),B,l(d,{name:"username",modelValue:o.value.username,"onUpdate:modelValue":t[1]||(t[1]=n=>o.value.username=n),placeholder:"username",required:""},null,8,["modelValue"]),L,l(d,{name:"password",modelValue:o.value.password,"onUpdate:modelValue":t[2]||(t[2]=n=>o.value.password=n),placeholder:"password",type:"password",required:""},null,8,["modelValue"]),q,N,S,C,e("p",null,[p("Already have account? "),l(h,{to:{name:"Login"}},{default:w(()=>[p("Login")]),_:1})])],40,U))])}}};export{z as default};
