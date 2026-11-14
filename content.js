/* MoxgateEnhanced: style regular UI only. No gameplay changes or network calls. */
(()=>{
"use strict";
const root=document.documentElement;
const marked=new Set();
const defaults={accent:"#d4af69",surface:"#231b15",backdrop:"#15120e",text:"#f3e7ce"};
const excluded=/(?:^|\/)(?:solo|play|match|game|battle|arena|table|draft|conquest|multiplayer|saga|sagas)(?:\/|$)/i;
const ordinary=/^\/(?:[a-z]{2}\/)?(?:decks|sets|guides|faq|learn|leaderboard|explore|cards|settings|account)(?:\/[^/]*){0,3}$/i;
const heroes={play:"play",solo:"solo",draft:"draft"};
const features={tutorial:"new to magic?",conquest:"conquest",sagas:"sagas",star:"star trek"};
const actions={play:/^(?:play|join|find a game|play multiplayer)(?:\s*[→›])?$/i,solo:/^(?:start (?:a |solo )?game|play solo|solo duel|play against (?:the )?ai)(?:\s*[→›])?$/i,draft:/^(?:start (?:a )?draft(?:ing)?|draft (?:it|now|a deck)|play draft)(?:\s*[→›])?$/i};
let theme=null,appliedRoute="",scanScheduled=false;
function classify(path){
 const clean=(path||"/").replace(/\/+$/,"")||"/";
 if(excluded.test(clean))return"game";
 if(clean==="/"||/^\/[a-z]{2}$/i.test(clean))return"home";
 if(ordinary.test(clean))return"regular";
 return"unrecognized";
}
function color(value,fallback){return typeof value==="string"&&/^#[a-f\d]{6}$/i.test(value)?value:fallback}
function image(value){return typeof value==="string"&&value.length<3000000&&/^data:image\/(?:png|jpeg|webp);base64,[a-z0-9+/=]+$/i.test(value)?value:null}
function resetMarkers(){
 for(const el of marked)try{
  for(const key of ["data-mge-tile","data-mge-action","data-mge-topbar","data-mge-heading"])el.removeAttribute(key);
 }catch(error){console.warn("MoxgateEnhanced marker cleanup:",error)}
 marked.clear();
}
function clear(){
 window.MGEHomePortal?.unmount(true);
 resetMarkers();
 root.removeAttribute("data-mge-ui");root.removeAttribute("data-mge-page");root.removeAttribute("data-mge-preset");
 root.style.removeProperty("--mge-artwork");root.style.removeProperty("--mge-image-opacity");
}
function mark(el,key,value){if(el){if(el.getAttribute(key)!==value)el.setAttribute(key,value);marked.add(el)}}
function label(el){return(el?.textContent||"").replace(/\s+/g," ").trim().toLowerCase()}
function findPanel(heading,kind){
 const viewport=Math.max(root.clientWidth||0,window.innerWidth||0,320);
 const minWidth=Math.min(kind==="hero"?210:250,viewport*.38),minHeight=kind==="hero"?145:72;
 let outer=null;
 // An inner content column often meets the size requirements before the actual card does.
 // Walk OUTWARD, stopping at groups that contain other named cards, and select the
 // largest eligible single-card ancestor rather than the first arbitrary wrapper.
 for(let el=heading.parentElement,depth=0;el&&depth<12;el=el.parentElement,depth++){
  if(el===document.body||el===root||el.tagName?.toLowerCase()==="main")break;
  const r=el.getBoundingClientRect();
  if(r.width>viewport*.96||r.height>680)break;
  const headings=Array.from(el.querySelectorAll("h1,h2,h3,h4,[role=heading]"));
  const matches=headings.filter(x=>Object.values(heroes).includes(label(x))||
      Object.values(features).some(text=>label(x)===text||label(x).startsWith(text+" ")));
  if(matches.length>1)break;
  if(r.width>=minWidth&&r.height>=minHeight)outer=el;
 }
 return outer;
}
function findAction(panel,name){
 const pattern=actions[name];
 if(!pattern)return null;
 for(const el of panel.querySelectorAll("a,button,[role=button]")){
  if(pattern.test(label(el))||pattern.test((el.getAttribute("aria-label")||"").trim()))return el;
 }
 // Some site controls are styled DIVs containing a text SPAN without a
 // semantic button element. Mark their whole visible surface, not the text.
 for(const leaf of panel.querySelectorAll("span,div,strong")){
  if(leaf.childElementCount>0||!pattern.test(label(leaf)))continue;
  const r=leaf.getBoundingClientRect();
  if(r.width>270||r.height>70)continue;
  let target=leaf;
  for(let parent=leaf.parentElement,steps=0;parent&&parent!==panel&&steps<4;parent=parent.parentElement,steps++){
   const box=parent.getBoundingClientRect();
   if(box.width<50||box.width>270||box.height<25||box.height>72)break;
   target=parent;
  }
  return target;
 }
 return null;
}
function markHome(){
 resetMarkers();
 const panels={};const nativeActions={};
 mark(document.querySelector("header,nav,[role=banner]"),"data-mge-topbar","on");
 const headings=Array.from(document.querySelectorAll("h1,h2,h3,h4,[role=heading]"));
 const missing=[...Object.values(heroes),...Object.values(features)].filter(t=>!headings.some(h=>label(h)===t));
 if(missing.length){
  const leaves=document.querySelectorAll("main span,main strong,main p,main div,#root span,#root strong,#root div,#__next span,#__next strong,#__next div");
  let count=0;
  for(const el of leaves){
   if(++count>4500||!missing.length)break;
   if(el.childElementCount!==0)continue;
   const index=missing.indexOf(label(el));
   if(index<0)continue;
   headings.push(el);missing.splice(index,1);
  }
 }
 for(const [name,text]of Object.entries(heroes)){
  const heading=headings.find(h=>label(h)===text);
  if(!heading)continue;
  const panel=findPanel(heading,"hero");
  if(!panel)continue;
  mark(panel,"data-mge-tile",name);
  mark(heading,"data-mge-heading",name);
  panels[name]=panel;
  nativeActions[name]=findAction(panel,name);
  mark(nativeActions[name],"data-mge-action",name);
 }
 for(const [name,text]of Object.entries(features)){
  const heading=headings.find(h=>label(h)===text||label(h).startsWith(text+" "));
  if(!heading)continue;
  const panel=findPanel(heading,"feature");
  if(panel)mark(panel,"data-mge-tile",name);
 }
 return {panels,actions:nativeActions};
}
function refresh(){
 const kind=classify(location.pathname);
 if(!theme||theme.enabled===false||kind==="game"||kind==="unrecognized"){appliedRoute=location.pathname;clear();return}
 for(const [key,fallback]of Object.entries(defaults))root.style.setProperty("--mge-"+key,color(theme[key],fallback));
 const opacity=Number.isInteger(theme.opacity)&&theme.opacity>=0&&theme.opacity<=100?theme.opacity:60;
 root.style.setProperty("--mge-image-opacity",String(opacity/100));
 const art=theme.siteImageEnabled===true?image(theme.image):null;
 if(art)root.style.setProperty("--mge-artwork",'url("'+art+'")');else root.style.removeProperty("--mge-artwork");
 root.setAttribute("data-mge-ui","on");root.setAttribute("data-mge-page",kind);
 root.setAttribute("data-mge-preset",["classic","molten","aether","night","custom"].includes(theme.preset)?theme.preset:"classic");
 if(kind==="home"){
  if(window.MGEHomePortal?.status?.dismissed){root.removeAttribute("data-mge-ui");root.removeAttribute("data-mge-page");resetMarkers();}
  else if(!window.MGEHomePortal?.sourceActive()){
   const sources=markHome();
   window.MGEHomePortal?.mount(sources.panels,sources.actions);
  }
 }else{window.MGEHomePortal?.unmount(true);resetMarkers();}
 appliedRoute=location.pathname;
}
function scheduleScan(){
 if(scanScheduled)return;
 scanScheduled=true;
 setTimeout(()=>{scanScheduled=false;if(location.pathname!==appliedRoute||classify(location.pathname)==="home")refresh()},220);
}
chrome.storage.local.get("theme").then(({theme:saved})=>{theme=saved||{enabled:true};refresh()})
 .catch(error=>console.warn("MoxgateEnhanced settings unavailable:",error));
chrome.storage.onChanged.addListener((changes,area)=>{if(area==="local"&&changes.theme){theme=changes.theme.newValue||{enabled:true};refresh()}});
chrome.runtime?.onMessage?.addListener((msg,sender,respond)=>{
 if(msg?.type!=="mge:status")return;
 respond({mode:classify(location.pathname),enabled:root.getAttribute("data-mge-ui")==="on",
  tiles:document.querySelectorAll("[data-mge-tile]").length,
  actions:document.querySelectorAll("[data-mge-action]").length,
  portal:window.MGEHomePortal?.status?.active===true,
  originalHome:window.MGEHomePortal?.status?.dismissed===true});
});
window.addEventListener("popstate",scheduleScan);
window.addEventListener("hashchange",scheduleScan);
document.addEventListener("DOMContentLoaded",scheduleScan,{once:true});
const observer=new MutationObserver(scheduleScan);
observer.observe(root,{childList:true,subtree:true});
window.addEventListener("pagehide",()=>observer.disconnect(),{once:true});
})();
