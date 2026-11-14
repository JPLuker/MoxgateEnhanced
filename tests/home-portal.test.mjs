import test from "node:test";
import assert from "node:assert/strict";
import {readFileSync} from "node:fs";
import {runInNewContext} from "node:vm";
const script=readFileSync(new URL("../home-portal.js",import.meta.url),"utf8");
function fixture(){
 let root;
 class El{
  constructor(tag,attrs={}){this.tagName=tag.toUpperCase();this.attrs={...attrs};this.parentElement=null;this.children=[];this.textContent="";this.width=400;this.height=250;this.clicked=0;this.listeners={};this.style={values:new Map(),setProperty:(k,v)=>this.style.values.set(k,v),removeProperty:k=>this.style.values.delete(k)};}
  appendChild(child){child.parentElement=this;this.children.push(child);return child;}
  insertBefore(child,next){child.parentElement=this;const i=this.children.indexOf(next);this.children.splice(i<0?this.children.length:i,0,child);return child;}
  remove(){if(this.parentElement){this.parentElement.children.splice(this.parentElement.children.indexOf(this),1);this.parentElement=null;}}
  setAttribute(k,v){this.attrs[k]=String(v);}
  getAttribute(k){return this.attrs[k]??null;}
  removeAttribute(k){delete this.attrs[k];}
  contains(node){while(node){if(node===this)return true;node=node.parentElement;}return false;}
  get isConnected(){return root.contains(this);}
  getBoundingClientRect(){return {width:this.width,height:this.height};}
  querySelectorAll(selector){if(selector==="img,*")return[];if(selector==="a,button,[role=button]")return this.controls||[];return[];}
  click(){this.clicked++;}
  addEventListener(event,handler){this.listeners[event]=handler;}
 }
 class Portal extends El{
  constructor(){super("section");this.finders=new Map();this.choices=["solo","play","draft"].map(id=>new El("button",{"data-mge-choice":id}));for(const choice of this.choices)this.appendChild(choice);for(const key of ["[data-mge-index]","[data-mge-stage-title]","[data-mge-stage-description]","[data-mge-stage-action]","[data-mge-portal-status]","[data-mge-shortcuts]","#mge-portal-scene"])this.finders.set(key,new El("div"));}
  querySelectorAll(selector){if(selector==="[data-mge-choice]")return this.choices;return super.querySelectorAll(selector);}
  querySelector(selector){return this.finders.get(selector)||null;}
  simulate(selector,element){this.listeners.click({target:{closest:s=>s===selector?element:null}});}
 }
 root=new El("html");const body=root.appendChild(new El("body"));const main=body.appendChild(new El("main"));const row=main.appendChild(new El("div"));row.width=1250;row.height=270;
 const panels={};const actions={};
 for(const id of ["play","solo","draft"]){const panel=row.appendChild(new El("article"));panels[id]=panel;const action=panel.appendChild(new El("button"));panel.controls=[action];actions[id]=action;}
 row.controls=Object.values(actions);
 const document={body,documentElement:root,createElement:tag=>tag==="section"?new Portal():new El(tag)};
 const window={};runInNewContext(script,{document,window,getComputedStyle:()=>({backgroundImage:"none"})});
 return{api:window.MGEHomePortal,row,main,panels,actions};
}
test("console mode menu replaces only the three-card hero strip",()=>{
 const f=fixture();assert.equal(f.api.mount(f.panels,f.actions),true);
 assert.equal(f.main.children.length,2);
 assert.equal(f.main.children[0].id,"mge-home-portal");
 assert.equal(f.row.getAttribute("data-mge-original-row"),"on");
 assert.match(f.main.children[0].innerHTML,/Choose a mode/);
 assert.equal(f.api.mount(f.panels,f.actions),true);
 assert.equal(f.main.children.length,2,"Must not create duplicate menus during React DOM updates");
});
test("select a mode and start the original site's corresponding action",()=>{
 const f=fixture();f.api.mount(f.panels,f.actions);
 const portal=f.main.children[0];
 const play=portal.choices.find(b=>b.getAttribute("data-mge-choice")==="play");
 portal.simulate("[data-mge-choice]",play);
 assert.equal(f.api.status.selected,"play");
 assert.equal(portal.querySelector("[data-mge-stage-title]").textContent,"Play with Friends");
 portal.simulate("[data-mge-stage-action]",portal.querySelector("[data-mge-stage-action]"));
 assert.equal(f.actions.play.clicked,1);
 assert.equal(f.api.status.active,false);
 assert.equal(f.row.getAttribute("data-mge-original-row"),null);
});
test("Original Moxgate home restores native page and avoids repeated mounting",()=>{
 const f=fixture();f.api.mount(f.panels,f.actions);
 f.main.children[0].simulate("[data-mge-restore]",{});
 assert.equal(f.api.status.active,false);
 assert.equal(f.api.status.dismissed,true);
 assert.equal(f.row.getAttribute("data-mge-original-row"),null);
 assert.equal(f.api.mount(f.panels,f.actions),false);
});
test("incomplete homepage never hides original controls",()=>{
 const f=fixture();assert.equal(f.api.mount({play:f.panels.play,solo:f.panels.solo},f.actions),false);
 assert.equal(f.row.getAttribute("data-mge-original-row"),null);
 assert.equal(f.main.children.length,1);
});
test("disable/unmount restores the original mode strip",()=>{
 const f=fixture();f.api.mount(f.panels,f.actions);f.api.unmount(true);
 assert.equal(f.row.getAttribute("data-mge-original-row"),null);
 assert.equal(f.api.status.dismissed,false);
 assert.equal(f.main.children.length,1);
});

test("missing native Solo action restores the original controls rather than disabling or trapping navigation",()=>{
 const f=fixture();f.actions.solo=null;f.api.mount(f.panels,f.actions);
 const portal=f.main.children[0];
 assert.equal(portal.querySelector("[data-mge-stage-action]").disabled,false);
 portal.simulate("[data-mge-stage-action]",portal.querySelector("[data-mge-stage-action]"));
 assert.equal(f.api.status.active,false);
 assert.equal(f.api.status.dismissed,true);
 assert.equal(f.row.getAttribute("data-mge-original-row"),null);
});
test("missing native Draft action returns to native page",()=>{
 const f=fixture();f.actions.draft=null;f.api.mount(f.panels,f.actions);
 const portal=f.main.children[0];const draft=portal.choices.find(b=>b.getAttribute("data-mge-choice")==="draft");
 portal.simulate("[data-mge-choice]",draft);
 portal.simulate("[data-mge-stage-action]",portal.querySelector("[data-mge-stage-action]"));
 assert.equal(f.api.status.active,false);
 assert.equal(f.row.getAttribute("data-mge-original-row"),null);
});
