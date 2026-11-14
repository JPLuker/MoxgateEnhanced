import test from "node:test";
import assert from "node:assert/strict";
import {readFileSync} from "node:fs";
import {runInNewContext} from "node:vm";

const script=readFileSync(new URL("../app.js",import.meta.url),"utf8");
const source=script.replace(/\binit\(\);\s*$/,"");
const context={location:{protocol:"https:"}};
runInNewContext(source+"\nthis.api={validate,defaultTheme};",context);
const {validate,defaultTheme}=context.api;

test("default palette and local-only settings exist",()=>{
  const theme=defaultTheme();
  assert.equal(theme.accent,"#d4af69");
  assert.equal(theme.enabled,true);
  assert.equal(theme.siteImageEnabled,false);
  assert.equal(theme.image,null);
});

test("valid imported palette and display settings survive validation",()=>{
  const theme=validate({...defaultTheme(),accent:"#123ABC",opacity:25,enabled:false,siteImageEnabled:true});
  assert.equal(theme.accent,"#123ABC");
  assert.equal(theme.opacity,25);
  assert.equal(theme.enabled,false);
  assert.equal(theme.siteImageEnabled,true);
});

test("uploaded SVG data cannot be imported",()=>{
  assert.throws(()=>validate({...defaultTheme(),image:"data:image/svg+xml;base64,PHN2Zz48L3N2Zz4="}),/Unsupported/);
});

test("oversized embedded images are rejected",()=>{
  assert.throws(()=>validate({...defaultTheme(),image:"data:image/png;base64,"+"A".repeat(3000000)}),/Unsupported/);
});

test("invalid imported colors use safe defaults",()=>{
  assert.equal(validate({...defaultTheme(),accent:"red"}).accent,"#d4af69");
});
