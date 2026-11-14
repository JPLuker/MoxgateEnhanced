/* MoxgateEnhanced — scoped, cosmetic-only enhancement.
 * Gameplay and draft surfaces are intentionally excluded. */
(()=>{
"use strict";
const STYLE_ID="mge-ui-css";
const ROOT=document.documentElement;
const COLORS={accent:"#d4af69",surface:"#231b15",backdrop:"#15120e",text:"#f3e7ce"};
const safeColor=(value,fallback)=>typeof value==="string"&&/^#[0-9a-f]{6}$/i.test(value)?value:fallback;
const safeImage=value=>typeof value==="string"&&value.length<3000000&&/^data:image\/(?:png|jpeg|webp);base64,[A-Za-z0-9+/=]+$/.test(value)?value:null;
const excluded=/(?:^|\/)(?:solo|play|match|game|battle|arena|table|draft|conquest|multiplayer|saga|sagas)(?:\/|$)/i;
function isRegularPage(path){
  if(typeof path!=="string")return false;
  const normalized=path.replace(/\/+$/,"")||"/";
  if(excluded.test(normalized))return false;
  return normalized==="/"||
    /^(?:\/[a-z]{2})?$/.test(normalized)||
    /^(?:\/[a-z]{2}\/)?(?:decks|sets|guides|faq|learn|leaderboard|explore|cards|settings|account)(?:\/[^/]*){0,3}$/i.test(normalized);
}
let latestTheme=null;
let currentPath="";
function removeTheme(){
  ROOT.removeAttribute("data-mge-ui");
  ROOT.removeAttribute("data-mge-preset");
  document.getElementById(STYLE_ID)?.remove();
}
function updateRoute(){
  const path=location.pathname;
  if(path===currentPath)return;
  currentPath=path;
  if(latestTheme)applyTheme(latestTheme);
}
function cssFor(theme){
  const accent=safeColor(theme.accent,COLORS.accent);
  const surface=safeColor(theme.surface,COLORS.surface);
  const backdrop=safeColor(theme.backdrop,COLORS.backdrop);
  const ink=safeColor(theme.text,COLORS.text);
  const opacity=Number.isInteger(theme.opacity)?Math.max(0,Math.min(100,theme.opacity))/100:.6;
  const image=theme.siteImageEnabled===true?safeImage(theme.image):null;
  const art=image?'linear-gradient(rgba(0,0,0,'+(1-opacity).toFixed(2)+'),rgba(0,0,0,'+(1-opacity).toFixed(2)+')),url("'+image+'")':'';
  return [
    ':root[data-mge-ui="on"]{--mge-accent:'+accent+';--mge-surface:'+surface+';--mge-backdrop:'+backdrop+';--mge-ink:'+ink+';color-scheme:dark}',
    // A quieter carved-stone/tabletop visual language for the ordinary application UI.
    'html[data-mge-ui="on"] body{background-color:var(--mge-backdrop)!important;'+
      'background-image:'+(art||'radial-gradient(ellipse at 50% 0%,#a98d4422,transparent 65%),repeating-linear-gradient(45deg,transparent 0,transparent 15px,#ffffff02 16px)')+
      '!important;background-size:cover!important;background-attachment:fixed!important}',
    'html[data-mge-ui="on"] :is(header,nav)[class*="border"]{border-color:var(--mge-accent)!important}',
    'html[data-mge-ui="on"] main :is(h1,h2,h3){font-family:Georgia,"Times New Roman",serif!important;letter-spacing:.01em}',
    'html[data-mge-ui="on"] main :is(a,button)[class*="rounded"]{border-radius:4px!important}',
    'html[data-mge-ui="on"] main :is([class*="rounded-xl"],[class*="rounded-2xl"],[class*="rounded-3xl"]){border-radius:5px!important}',
    'html[data-mge-ui="on"] :is(main,header,nav) [class*="border-purple"],'+
      'html[data-mge-ui="on"] :is(main,header,nav) [class*="border-violet"],'+
      'html[data-mge-ui="on"] :is(main,header,nav) [class*="border-fuchsia"]{border-color:var(--mge-accent)!important}',
    'html[data-mge-ui="on"] :is(main,header,nav) [class*="text-purple"],'+
      'html[data-mge-ui="on"] :is(main,header,nav) [class*="text-violet"],'+
      'html[data-mge-ui="on"] :is(main,header,nav) [class*="text-fuchsia"]{color:var(--mge-accent)!important}',
    'html[data-mge-ui="on"] :is(main,header,nav) :is(a,button)[class*="bg-purple"],'+
      'html[data-mge-ui="on"] :is(main,header,nav) :is(a,button)[class*="bg-violet"],'+
      'html[data-mge-ui="on"] :is(main,header,nav) :is(a,button)[class*="bg-fuchsia"]{background-color:var(--mge-accent)!important;color:var(--mge-backdrop)!important;border-color:var(--mge-accent)!important}',
    'html[data-mge-ui="on"] main [class*="shadow-purple"],'+
      'html[data-mge-ui="on"] main [class*="shadow-violet"]{box-shadow:0 5px 22px #0007!important}',
    // Emphasize panel edges without replacing site-provided artwork or touching clickable hitboxes.
    'html[data-mge-ui="on"] main [class*="border-purple"][class*="rounded"],'+
      'html[data-mge-ui="on"] main [class*="border-violet"][class*="rounded"]{box-shadow:inset 0 0 0 1px var(--mge-accent),0 7px 25px #0005!important}',
    'html[data-mge-ui="on"] main [class*="bg-purple-950"],'+
      'html[data-mge-ui="on"] main [class*="bg-violet-950"]{background-color:var(--mge-surface)!important}',
    '@media(prefers-reduced-motion:reduce){html[data-mge-ui="on"] main [class*="transition"]{transition-duration:0s!important}}'
  ].join("\n");
}
function applyTheme(theme){
  latestTheme=theme&&typeof theme==="object"?theme:null;
  if(!latestTheme||latestTheme.enabled===false||!isRegularPage(location.pathname)){removeTheme();return;}
  let style=document.getElementById(STYLE_ID);
  if(!style){style=document.createElement("style");style.id=STYLE_ID;(document.head||ROOT).append(style);}
  style.textContent=cssFor(latestTheme);
  ROOT.setAttribute("data-mge-ui","on");
  ROOT.setAttribute("data-mge-preset",["classic","molten","aether","night","custom"].includes(latestTheme.preset)?latestTheme.preset:"classic");
}
chrome.storage.local.get("theme").then(({theme})=>applyTheme(theme||{enabled:true})).catch(()=>removeTheme());
chrome.storage.onChanged.addListener((changes,area)=>{
  if(area==="local"&&changes.theme)applyTheme(changes.theme.newValue);
});
// Handle sites using client-side history navigation without touching their routing code.
window.addEventListener("popstate",updateRoute);
window.addEventListener("hashchange",updateRoute);
const watcher=new MutationObserver(updateRoute);
watcher.observe(ROOT,{subtree:true,childList:true});
window.addEventListener("pagehide",()=>watcher.disconnect(),{once:true});
})();
