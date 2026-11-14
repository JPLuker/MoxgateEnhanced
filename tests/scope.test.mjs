// Scope regression tests for the real content-script entry point and a representative homepage DOM.
import test from "node:test";
import assert from "node:assert/strict";
import {readFileSync} from "node:fs";
import {runInNewContext} from "node:vm";

const js=readFileSync(new URL("../content.js",import.meta.url),"utf8");
const css=readFileSync(new URL("../content.css",import.meta.url),"utf8");
const manifest=JSON.parse(readFileSync(new URL("../manifest.json",import.meta.url),"utf8"));

function fixture(path="/",theme={enabled:true,preset:"classic"}){
 const all=[];
 class Element{
  constructor(tag,text="",width=300,height=200,parent=null){
   this.tag=tag;this.textContent=text;this.attrs={};this.children=[];this.parentElement=parent;
   this.width=width;this.height=height;this.childElementCount=0;
   if(parent){parent.children.push(this);parent.childElementCount++;}
   all.push(this);
  }
  setAttribute(k,v){this.attrs[k]=v}
  removeAttribute(k){delete this.attrs[k]}
  getAttribute(k){return this.attrs[k]??null}
  getBoundingClientRect(){return {width:this.width,height:this.height}}
  querySelectorAll(sel){
   const matches=[];
   function walk(el){for(const child of el.children){if(
     sel.includes("h1,h2")&&["h1","h2","h3","h4"].includes(child.tag)||
     sel.includes("a,button")&&["a","button"].includes(child.tag)||
     sel.includes("span,div,strong")&&["span","div","strong"].includes(child.tag)
   )matches.push(child);walk(child);}}
   walk(this);return matches;
  }
 }
 const root=new Element("html","",1400,900);
 root.clientWidth=1400;const properties=new Map();
 root.style={setProperty(k,v){properties.set(k,v)},removeProperty(k){properties.delete(k)}};
 const body=new Element("body","",1400,900,root);
 const header=new Element("header","",1400,70,body);
 const main=new Element("main","",1360,700,body);
 const row=new Element("section","",1300,270,main);
 const outerCards={};
 for(const [name,width,action] of [["Play",360,"Play →"],["Solo",560,"Start a game →"],["Draft",340,"Start drafting →"]]){
  const card=new Element("article","",width,245,row);
  outerCards[name.toLowerCase()]=card;
  const inner=new Element("div","",width-35,190,card);
  new Element("h2",name,140,35,inner);
  if(name==="Solo"){
   const simulatedControl=new Element("div","",155,38,inner);
   new Element("span",action,120,20,simulatedControl);
  }else new Element("button",action,155,38,inner);
 }
 const tutorials=new Element("section","",1300,160,main);
 for(const [name,width] of [["New to Magic?",1270],["Conquest",580],["Sagas",580]]){
  const container=name==="New to Magic?"?main:tutorials;
  const card=new Element("article","",width,145,container);
  outerCards[name.toLowerCase()]=card;
  const inner=new Element("div","",name==="New to Magic?"?640:310,105,card);
  new Element("h2",name,200,35,inner);
 }
 let pathname=path,change,respond,onMutation;
 const queue=[];
 const doc={documentElement:root,body,querySelector(s){
  if(s.includes("header"))return header;return null;
 },querySelectorAll(s){
  if(s.includes("[data-mge-tile]"))return all.filter(e=>e.getAttribute("data-mge-tile"));
  if(s.includes("h1,h2"))return all.filter(e=>["h1","h2","h3","h4"].includes(e.tag));
  return [];
 },addEventListener(){}};
 const chrome={storage:{
  local:{get:async()=>({theme})},onChanged:{addListener(fn){change=fn}}
 },runtime:{onMessage:{addListener(fn){respond=fn}}}};
 const win={innerWidth:1400,addEventListener(){}};
 class MutationObserver{constructor(fn){onMutation=fn;}observe(){}disconnect(){}}
 runInNewContext(js,{document:doc,chrome,window:win,location:{get pathname(){return pathname}},
 MutationObserver,setTimeout(fn){queue.push(fn)},console});
 const drain=()=>{for(const fn of queue.splice(0))fn()};
 return{
  all,root,outerCards,properties,drain,
  get active(){return root.getAttribute("data-mge-ui")==="on"},
  get tiles(){return all.filter(x=>x.getAttribute("data-mge-tile"))},
  get actions(){return all.filter(x=>x.getAttribute("data-mge-action"))},
  navigate(p){pathname=p;onMutation();drain()},
  change(next){change({theme:{newValue:next}},"local")},
  status(){let result;respond({type:"mge:status"},null,x=>result=x);return result}
 };
}
async function loaded(path,theme){
 const f=fixture(path,theme);
 await Promise.resolve();await Promise.resolve();
 return f;
}
test("manifest loads a real extension stylesheet rather than injecting inline CSS",()=>{
 assert.deepEqual(manifest.content_scripts[0].css,["content.css"]);
 assert.doesNotMatch(js,/createElement\(["']style["']\)/);
 assert.match(css,/\[data-mge-tile\]/);
 assert.match(css,/data-mge-page="home"/);
});
test("homepage matches three hero tiles and three primary actions",async()=>{
 const f=await loaded("/");
 assert.equal(f.active,true);
 assert.deepEqual(f.tiles.filter(x=>["play","solo","draft"].includes(x.getAttribute("data-mge-tile"))).length,3);
 assert.equal(f.actions.length,3);
 assert.equal(f.status().tiles,6);
 assert.equal(f.root.getAttribute("data-mge-page"),"home");
});
test("gameplay routes never receive normal-UI styling",async()=>{
 for(const path of ["/solo","/solo/abc","/play/123","/draft/123","/conquest/new","/match/abc","/sagas/1"]){
  const f=await loaded(path);
  assert.equal(f.active,false,path);
  assert.equal(f.tiles.length,0,path);
 }
});
test("entering gameplay clears all semantic markers and theme state",async()=>{
 const f=await loaded("/");
 assert.equal(f.tiles.length,6);
 f.navigate("/solo");
 assert.equal(f.active,false);
 assert.equal(f.tiles.length,0);
 f.navigate("/");
 assert.equal(f.active,true);
 assert.equal(f.tiles.length,6);
});
test("disabling theme clears styled state",async()=>{
 const f=await loaded("/");
 f.change({enabled:false});
 assert.equal(f.active,false);
 assert.equal(f.tiles.length,0);
});
test("images only enter third-party CSS variables when explicitly enabled",async()=>{
 const art="data:image/png;base64,aGVsbG8=";
 const f=await loaded("/",{enabled:true,image:art,siteImageEnabled:false});
 assert.equal(f.properties.has("--mge-artwork"),false);
 f.change({enabled:true,image:art,siteImageEnabled:true});
 assert.match(f.properties.get("--mge-artwork"),/aGVsbG8/);
 f.change({enabled:true,image:art,siteImageEnabled:false});
 assert.equal(f.properties.has("--mge-artwork"),false);
});
test("unrecognized routes remain untouched",async()=>{
 const f=await loaded("/some-new-game-mode");
 assert.equal(f.active,false);
});

test("homepage gold frames attach to whole cards, not inset text blocks",async()=>{
 const f=await loaded("/");
 for(const [name,outer] of Object.entries(f.outerCards)){
  assert.equal(outer.getAttribute("data-mge-tile"),name==="new to magic?"?"tutorial":name,
   "Expected the outer card container for "+name);
 }
 for(const marked of f.tiles)assert.equal(marked.tag,"article","Gold frame must not surround an inner content element");
});

test("a text-only CTA nested in a styled control gets the marker, not just its label",async()=>{
 const f=await loaded("/");
 const soloAction=f.actions.find(x=>x.getAttribute("data-mge-action")==="solo");
 assert.ok(soloAction,"Solo CTA must be recognized without button/a tag");
 assert.equal(soloAction.tag,"div","Entire clickable visual surface should receive CTA styling");
 assert.equal(f.actions.length,3);
});
