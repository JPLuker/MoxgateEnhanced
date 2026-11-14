import test from "node:test";
import assert from "node:assert/strict";
import {readFileSync} from "node:fs";

const read=path=>readFileSync(new URL("../"+path,import.meta.url),"utf8");
const manifest=JSON.parse(read("manifest.json"));
const html=read("popup.html");
const app=read("app.js");

test("extension icon opens settings in a popup, not a separate options page",()=>{
  assert.equal(manifest.action.default_popup,"popup.html");
  assert.equal(manifest.action.default_title,"MoxgateEnhanced settings");
  assert.equal(manifest.options_ui,undefined);
  assert.equal(manifest.background,undefined);
});

test("the popup contains every control required by the theme editor",()=>{
  const referenced=[...new Set([...app.matchAll(/\$\("([^"]+)"\)/g)].map(m=>m[1]))];
  for(const id of referenced)assert.match(html,new RegExp('id="'+id+'"'),"Missing control: "+id);
});

test("the popup never embeds or mirrors live gameplay",()=>{
  assert.doesNotMatch(html,/<iframe\b/i);
  assert.match(app,/https:\/\/www\.moxgate\.com\//);
});

test("regular page styling is limited to Moxgate",()=>{
  assert.deepEqual(manifest.content_scripts[0].js,["home-portal.js","content.js"]);
  assert.deepEqual(manifest.content_scripts[0].css,["content.css","home-portal.css"]);
  assert.deepEqual(manifest.content_scripts[0].matches,[
    "https://moxgate.com/*","https://www.moxgate.com/*"
  ]);
});


test("popup has fixed desktop extension width and page status",()=>{
  const css=read("popup.css");
  assert.match(css,/html\{width:398px;min-width:398px;/);
  assert.doesNotMatch(css,/width:min\(398px,100vw\)/);
  assert.match(html,/id="site-diagnostic"/);
  assert.match(app,/mge:status/);
});
