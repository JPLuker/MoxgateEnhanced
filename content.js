/* MoxgateEnhanced: local-only, cosmetic-only extension content script.
 * No account reads, gameplay interception, network calls or hidden redirects. */
(()=>{
"use strict";
const id="mge-style";
const goodColor=(v,f)=>typeof v==="string"&&/^#[0-9a-f]{6}$/i.test(v)?v:f;
const goodImage=v=>typeof v==="string"&&v.length<3000000&&/^data:image\/(png|jpeg|webp);base64,[A-Za-z0-9+/=]+$/.test(v)?v:null;
function apply(theme){
 if(!theme||typeof theme!=="object")return;
 const a=goodColor(theme.accent,"#d4af69"),s=goodColor(theme.surface,"#231b15"),
 b=goodColor(theme.backdrop,"#15120e"),t=goodColor(theme.text,"#f3e7ce");
 const opacity=Number.isInteger(theme.opacity)?Math.max(0,Math.min(theme.opacity,100))/100:0.6;
 const art=goodImage(theme.image);
 const layer=art?'linear-gradient(rgba(0,0,0,'+(1-opacity).toFixed(2)+'),rgba(0,0,0,'+(1-opacity).toFixed(2)+')),url("'+art+'")':"none";
 let node=document.getElementById(id);
 if(!node){node=document.createElement("style");node.id=id;(document.head||document.documentElement).append(node);}
 const rules=[
 'html.mge-enabled{--mge-accent:'+a+';--mge-surface:'+s+';--mge-backdrop:'+b+';--mge-ink:'+t+'}',
 'html.mge-enabled body{background-color:var(--mge-backdrop)!important}',
 'html.mge-enabled button[class*="bg-purple"],html.mge-enabled button[class*="bg-violet"],html.mge-enabled a[class*="bg-purple"],html.mge-enabled a[class*="bg-violet"]{background-color:var(--mge-accent)!important;color:var(--mge-backdrop)!important}',
 'html.mge-enabled [class*="border-purple"],html.mge-enabled [class*="border-violet"]{border-color:var(--mge-accent)!important}'
 ];
 if(art)rules.push('html.mge-enabled body{background-image:'+layer+'!important;background-size:cover!important;background-attachment:fixed!important}');
 node.textContent=rules.join("\n");
 document.documentElement.classList.add("mge-enabled");
}
chrome.storage.local.get("theme").then(v=>apply(v.theme)).catch(()=>{});
chrome.storage.onChanged.addListener((changes,area)=>{if(area==="local"&&changes.theme)apply(changes.theme.newValue);});
})();
