/* MoxgateEnhanced homepage console menu. Uses original Moxgate actions; no hosted content. */
(()=>{
"use strict";
const modes=[
 {id:"solo",number:"01",name:"Solo",title:"Solo Duel",description:"Play against an AI opponent with the full rules engine.",action:"Start a game"},
 {id:"play",number:"02",name:"Multiplayer",title:"Play with Friends",description:"Join an open table or play with friends.",action:"Play"},
 {id:"draft",number:"03",name:"Draft",title:"Draft a Deck",description:"Open three packs, build your deck, and play.",action:"Start drafting"}
];
const state={portal:null,row:null,panels:null,actions:null,selected:"solo",dismissed:false};
const STAGE_ID="mge-portal-scene";
function commonRow(panels){
 const first=panels?.play,second=panels?.solo,third=panels?.draft;
 if(!first||!second||!third)return null;
 let ancestor=first;
 while(ancestor&&ancestor!==document.body&&ancestor!==document.documentElement){
  if(ancestor!==first&&ancestor.contains(second)&&ancestor.contains(third)){
   const bounds=ancestor.getBoundingClientRect();
   if(bounds.height>=130&&bounds.height<=660)return ancestor;
   return null;
  }
  ancestor=ancestor.parentElement;
 }
 return null;
}
function sourceActive(){return Boolean(state.portal?.isConnected&&state.row&&document.documentElement.contains(state.row));}
function sourceImage(panel){
 if(!panel)return null;
 const descendants=[panel,...Array.from(panel.querySelectorAll("img,*")).slice(0,140)];
 let best=null,largest=0;
 for(const element of descendants){
  const rect=element.getBoundingClientRect();
  const area=Math.max(0,rect.width)*Math.max(0,rect.height);
  if(rect.width<140||rect.height<110||area<14000)continue;
  const candidates=[];
  if(element.tagName?.toLowerCase()==="img"){
   const src=element.currentSrc||element.src||"";
   if(/^https?:\/\/[^\n\r"\\]+$/.test(src)&&src.length<1600)candidates.push('url("'+src+'")');
  }
  try{
   const bg=getComputedStyle(element).backgroundImage;
   if(bg&&bg!=="none"&&bg.includes("url("))candidates.push(bg);
   // Moxgate may put its hero illustrations on a pseudo-element.
   const before=getComputedStyle(element,"::before").backgroundImage;
   if(before&&before!=="none"&&before.includes("url("))candidates.push(before);
  }catch{}
  if(candidates.length&&area>largest){best=candidates[0];largest=area;}
 }
 return best;
}
function unmount(resetDismissal=false){
 if(state.row)state.row.removeAttribute("data-mge-original-row");
 state.portal?.remove();
 state.portal=null;state.row=null;state.panels=null;state.actions=null;
 if(resetDismissal)state.dismissed=false;
}
function setChoice(id){
 if(!state.portal)return;
 const mode=modes.find(item=>item.id===id);
 if(!mode)return;
 state.selected=id;
 for(const button of state.portal.querySelectorAll("[data-mge-choice]")){
  const selected=button.getAttribute("data-mge-choice")===id;
  button.setAttribute("aria-pressed",selected?"true":"false");
  if(selected)button.setAttribute("data-active","on");else button.removeAttribute("data-active");
 }
 const put=(selector,text)=>{
  const node=state.portal.querySelector(selector);
  if(node)node.textContent=text;
 };
 put("[data-mge-index]",mode.number+" / 03");
 put("[data-mge-stage-title]",mode.title);
 put("[data-mge-stage-description]",mode.description);
 put("[data-mge-stage-action]",mode.action);
 const trigger=state.portal.querySelector("[data-mge-stage-action]");
 if(trigger){trigger.disabled=false;trigger.setAttribute("aria-label",mode.action+" — "+mode.name);}
 const scene=state.portal.querySelector("#"+STAGE_ID);
 if(scene){
  scene.style.removeProperty("--mge-scene-image");
  const artwork=sourceImage(state.panels?.[id]);
  if(artwork)scene.style.setProperty("--mge-scene-image",artwork);
 }
}
function triggerOriginal(original){
 if(!original||!original.isConnected||typeof original.click!=="function")return false;
 // A native React handler must run with its own control still attached and
 // visible. Never remove our portal in the middle of the initiating click.
 state.dismissed=true;
 if(state.row)state.row.removeAttribute("data-mge-original-row");
 try{
  original.click();
 }catch(error){
  console.error("MoxgateEnhanced: native action failed; original home restored",error);
  unmount();
  return false;
 }
 // Defer DOM cleanup until the native click finishes dispatching. Do not
 // remount while navigation is pending.
 queueMicrotask(()=>unmount());
 return true;
}
function activateMode(id){
 const action=state.actions?.[id];
 if(triggerOriginal(action))return true;
 // Never present an inert CTA. If site markup changed, restore the native
 // card strip so users can choose the mode without a broken replacement.
 state.dismissed=true;
 unmount();
 return false;
}
function handleClick(event){
 const choice=event.target.closest("[data-mge-choice]");
 if(choice){setChoice(choice.getAttribute("data-mge-choice"));return;}
 if(event.target.closest("[data-mge-restore]")){state.dismissed=true;unmount();return;}
 const shortcut=event.target.closest("[data-mge-shortcut]");
 if(shortcut){
  const original=state.row?.querySelectorAll("a,button,[role=button]");
  const index=Number(shortcut.getAttribute("data-mge-shortcut"));
  if(original&&Number.isInteger(index))if(!triggerOriginal(original[index])){state.dismissed=true;unmount();}
  return;
 }
 if(event.target.closest("[data-mge-stage-action]")){
  activateMode(state.selected);
 }
}
function createShortcuts(){
 const tray=state.portal?.querySelector("[data-mge-shortcuts]");
 if(!tray||!state.row)return;
 const all=Array.from(state.row.querySelectorAll("a,button,[role=button]"));
 const labels=/^(?:commander|standard|draft|more formats)$/i;
 for(let i=0;i<all.length;i++){
  const text=(all[i].textContent||"").replace(/\s+/g," ").trim().replace(/[→›]+$/,"").trim();
  if(!labels.test(text))continue;
  const button=document.createElement("button");
  button.type="button";
  button.textContent=text;
  button.setAttribute("data-mge-shortcut",String(i));
  tray.appendChild(button);
 }
}
function mount(panels,actions){
 if(sourceActive())return true;
 if(state.portal)unmount();
 if(state.dismissed)return false;
 const row=commonRow(panels);
 if(!row||!row.parentElement)return false;
 const portal=document.createElement("section");
 portal.id="mge-home-portal";
 portal.setAttribute("aria-label","MoxgateEnhanced home menu");
 portal.innerHTML=[
  '<div class="mge-home__nav">',
  '<div class="mge-home__masthead"><span class="mge-home__eyebrow">MAGIC: THE GATHERING</span><h2>Choose a mode</h2></div>',
  '<div class="mge-home__choices" role="group" aria-label="Game modes">',
  ...modes.map(m=>'<button type="button" data-mge-choice="'+m.id+'" aria-pressed="false"><span class="mge-home__number">'+m.number+'</span><span class="mge-home__choice-title">'+m.name+'</span><span class="mge-home__chevron" aria-hidden="true">›</span></button>'),
  '</div><div class="mge-home__navfoot"><button type="button" data-mge-restore>Original Moxgate home</button></div></div>',
  '<div class="mge-home__stage" id="'+STAGE_ID+'"><div class="mge-home__scene-content">',
  '<span class="mge-home__index" data-mge-index>01 / 03</span>',
  '<div class="mge-home__stage-text"><h2 data-mge-stage-title>Solo Duel</h2>',
  '<p data-mge-stage-description>Play against an AI opponent with the full rules engine.</p>',
  '<button type="button" class="mge-home__launch" data-mge-stage-action>Start a game</button>',
  '<p class="mge-home__status" data-mge-portal-status role="status" aria-live="polite"></p></div>',
  '<div class="mge-home__shortcuts"><span>Quick formats</span><div data-mge-shortcuts></div></div>',
  '</div></div>'
 ].join("");
 state.portal=portal;state.row=row;state.panels=panels;state.actions=actions;
 portal.addEventListener("click",handleClick);
 row.parentElement.insertBefore(portal,row);
 row.setAttribute("data-mge-original-row","on");
 createShortcuts();
 setChoice(state.selected);
 return true;
}
window.MGEHomePortal={mount,unmount,sourceActive,
 get status(){return{active:!!state.portal,selected:state.selected,dismissed:state.dismissed};}
};
})();
