const PRESETS={
classic:{name:"Classic Tabletop",accent:"#d4af69",surface:"#231b15",backdrop:"#15120e",text:"#f3e7ce"},
molten:{name:"Molten Plane",accent:"#db784f",surface:"#301d19",backdrop:"#170d0d",text:"#f6ded1"},
aether:{name:"Aether Table",accent:"#7ab6d8",surface:"#172c3a",backdrop:"#09121c",text:"#e1edf4"},
night:{name:"Night Play",accent:"#9b83d9",surface:"#251d33",backdrop:"#0d0b15",text:"#eee7fb"}};
const $=id=>document.getElementById(id);
const extension=location.protocol==="chrome-extension:"&&typeof chrome!=="undefined"&&!!chrome.storage?.local;
const defaultTheme=()=>({...PRESETS.classic,preset:"classic",image:null,opacity:60,enabled:true,siteImageEnabled:false,version:1});
let current=defaultTheme(),queue=Promise.resolve();
const isColor=value=>typeof value==="string"&&/^#[a-f0-9]{6}$/i.test(value);
const isImage=value=>typeof value==="string"&&value.length<3000000&&/^data:image\/(png|jpeg|webp);base64,[A-Za-z0-9+/=]+$/.test(value);
function validate(source){
 if(!source||typeof source!=="object"||Array.isArray(source))throw Error("Invalid theme.");
 const result=defaultTheme();
 for(const key of ["accent","surface","backdrop","text"])if(isColor(source[key]))result[key]=source[key];
 if(["classic","molten","aether","night","custom"].includes(source.preset))result.preset=source.preset;
 if(source.image!=null){if(!isImage(source.image))throw Error("Unsupported or oversized embedded image.");result.image=source.image;}
 if(Number.isInteger(source.opacity)&&source.opacity>=0&&source.opacity<=100)result.opacity=source.opacity;
 if(typeof source.enabled==="boolean")result.enabled=source.enabled;
 if(typeof source.siteImageEnabled==="boolean")result.siteImageEnabled=source.siteImageEnabled;
 return result;
}
function openDb(){
 return new Promise((resolve,reject)=>{
  const r=indexedDB.open("moxgate-enhanced",1);
  r.onupgradeneeded=()=>{if(!r.result.objectStoreNames.contains("settings"))r.result.createObjectStore("settings");};
  r.onsuccess=()=>resolve(r.result);r.onerror=()=>reject(r.error);
 });
}
async function load(){
 if(extension)return (await chrome.storage.local.get("theme")).theme;
 const db=await openDb();
 try{return await new Promise((resolve,reject)=>{
  const r=db.transaction("settings","readonly").objectStore("settings").get("theme");
  r.onsuccess=()=>resolve(r.result);r.onerror=()=>reject(r.error);
 });}finally{db.close();}
}
async function save(value){
 if(extension)return chrome.storage.local.set({theme:value});
 const db=await openDb();
 try{return await new Promise((resolve,reject)=>{
  const t=db.transaction("settings","readwrite");t.objectStore("settings").put(value,"theme");
  t.oncomplete=()=>resolve();t.onerror=()=>reject(t.error);t.onabort=()=>reject(t.error);
 });}finally{db.close();}
}
function message(text,error=false){$("status").textContent=text;$("status").style.borderLeftColor=error?"#d77b67":"#d6ae63";}
function persist(){
 const snapshot={...current};
 queue=queue.catch(()=>{}).then(()=>save(snapshot));
 queue.then(()=>message("Saved on this device.")).catch(e=>message("Save failed: "+e.message,true));
}
function render(){
 for(const k of ["accent","surface","backdrop"])$(k).value=current[k];
 $("text-color").value=current.text;
 $("preset").value=current.preset;
 $("image-opacity").value=String(current.opacity);
 $("apply-on-site").checked=current.enabled;
 $("image-on-site").checked=current.siteImageEnabled;
 $("opacity-value").textContent=current.opacity+"%";
 $("theme-name").textContent=PRESETS[current.preset]?.name||"Custom Theme";
 $("preview-image-status").textContent=current.image?"Custom image stored locally":"No custom background";
 const styles=document.documentElement.style;
 for(const [k,v] of Object.entries({accent:current.accent,surface:current.surface,backdrop:current.backdrop,ink:current.text}))styles.setProperty("--"+k,v);
 styles.setProperty("--image-opacity",String(current.opacity/100));
 styles.setProperty("--custom-image",current.image?'url("'+current.image+'")':"none");
}
function modify(update){current={...current,...update,version:1};render();persist();}
function exportTheme(){
 const json=JSON.stringify({format:"moxgate-enhanced-theme",...current},null,2);
 const blob=new Blob([json],{type:"application/json"}),url=URL.createObjectURL(blob);
 const a=document.createElement("a");a.href=url;a.download="moxgate-enhanced-theme.json";
 document.body.append(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),1000);
 message("Theme exported. Keep the file private if it includes personal artwork.");
}
async function importTheme(file){
 if(!file)return;
 if(file.size>4000000)throw Error("Theme file must be under 4 MB.");
 const data=JSON.parse(await file.text());
 if(data.format!=="moxgate-enhanced-theme")throw Error("Not a MoxgateEnhanced theme file.");
 current=validate(data);render();persist();
}
function events(){
 $("open-moxgate").addEventListener("click",async()=>{try{if(extension&&chrome.windows?.create){await chrome.windows.create({url:"https://www.moxgate.com/",type:"popup",width:1440,height:900});return;}}catch(e){message("Dedicated window unavailable: "+e.message,true);}window.open("https://www.moxgate.com/","_blank","noopener,noreferrer");});
 $("preset").addEventListener("change",e=>{const p=e.target.value;modify(p==="custom"?{preset:p}:{...PRESETS[p],preset:p});});
 for(const k of ["accent","surface","backdrop","text-color"]){
  $(k).addEventListener("input",e=>modify({[k==="text-color"?"text":k]:e.target.value,preset:"custom"}));
 }
 $("image-opacity").addEventListener("input",e=>modify({opacity:Number(e.target.value)}));
 $("apply-on-site").addEventListener("change",e=>modify({enabled:e.target.checked}));
 $("image-on-site").addEventListener("change",e=>modify({siteImageEnabled:e.target.checked}));
 $("image-upload").addEventListener("change",async e=>{
  const file=e.target.files?.[0];if(!file)return;
  try{
   if(!["image/png","image/jpeg","image/webp"].includes(file.type))throw Error("Use PNG, JPG or WebP.");
   if(file.size>2000000)throw Error("Image must be under 2 MB.");
   const data=await new Promise((resolve,reject)=>{
    const reader=new FileReader();reader.onload=()=>resolve(reader.result);reader.onerror=()=>reject(Error("Image could not be read."));reader.readAsDataURL(file);
   });
   if(!isImage(data))throw Error("Image failed validation.");
   modify({image:data});
  }catch(error){message(error.message,true);}finally{e.target.value="";}
 });
 $("remove-image").addEventListener("click",()=>modify({image:null}));
 $("export-theme").addEventListener("click",exportTheme);
 $("import-theme").addEventListener("change",async e=>{
  try{await importTheme(e.target.files?.[0]);message("Theme imported locally.");}
  catch(error){message("Import failed: "+error.message,true);}finally{e.target.value="";}
 });
 $("reset-theme").addEventListener("click",()=>{if(confirm("Reset colors and remove your image?")){current=defaultTheme();render();persist();}});
}
async function init(){
 events();
 try{const saved=await load();if(saved)current=validate(saved);render();message(extension?"Extension settings loaded. Open Moxgate to apply.":"Ready. Settings are local to this browser.");}
 catch(error){render();message("Local storage unavailable: "+error.message,true);}
}
init();
