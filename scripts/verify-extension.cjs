// Verify source or a packaged copy of the unhosted Chromium extension.
"use strict";
const fs=require("node:fs");
const path=require("node:path");
const root=path.resolve(process.argv[2]||".");
const required=["manifest.json","app.js","content.js","popup.html","popup.css","icon.svg","icon-192.png","icon-512.png"];
function fail(message){console.error("Extension verification failed:",message);process.exitCode=1;}
for(const name of required){
  try{const s=fs.statSync(path.join(root,name));if(!s.isFile()||s.size===0)fail("Missing/empty "+name);}
  catch{fail("Missing "+name);}
}
if(process.exitCode)process.exit(process.exitCode);
const m=JSON.parse(fs.readFileSync(path.join(root,"manifest.json"),"utf8"));
if(m.manifest_version!==3)fail("Not Manifest V3");
if(!/^\d+\.\d+\.\d+$/.test(m.version))fail("Invalid version");
if(m.action?.default_popup!=="popup.html")fail("Toolbar popup missing");
if(m.background||m.options_ui)fail("Unexpected options page or background launcher");
if(JSON.stringify(m.permissions)!=='["storage"]')fail("Unexpected permission");
const allowed=["https://moxgate.com/*","https://www.moxgate.com/*"];
if(JSON.stringify(m.host_permissions)!==JSON.stringify(allowed))fail("Unexpected site access");
if(m.content_scripts?.length!==1||
JSON.stringify(m.content_scripts[0].matches)!==JSON.stringify(allowed)||
JSON.stringify(m.content_scripts[0].js)!=='["content.js"]')fail("Unexpected injection");
const html=fs.readFileSync(path.join(root,"popup.html"),"utf8");
if(/<iframe\b/i.test(html))fail("Remote iframe in popup");
if(!html.includes("popup.css")||!html.includes("app.js"))fail("Missing popup scripts");
for(const name of ["icon-192.png","icon-512.png"]){
  const b=fs.readFileSync(path.join(root,name));
  const expected=Number(name.match(/\d+/)[0]);
  if(b.length<24||b.subarray(0,8).toString("hex")!=="89504e470d0a1a0a"||
  b.readUInt32BE(16)!==expected||b.readUInt32BE(20)!==expected)fail("Bad icon "+name);
}
if(process.exitCode)process.exit(process.exitCode);
console.log("Verified extension v"+m.version+", "+required.length+" files");
