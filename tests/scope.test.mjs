import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { runInNewContext } from "node:vm";

const code = readFileSync(new URL("../content.js", import.meta.url), "utf8");

async function launch(path, theme={enabled:true,preset:"classic"}) {
  let pathname=path;
  let style=null;
  let changeListener;
  let observerCallback;
  const attributes=new Map();
  const root={
    setAttribute(k,v){attributes.set(k,v);},
    removeAttribute(k){attributes.delete(k);},
    getAttribute(k){return attributes.get(k);}
  };
  const document={
    documentElement:root,
    head:{append(node){style=node;}},
    getElementById(id){return style?.id===id?style:null;},
    createElement(tag){assert.equal(tag,"style");return {
      id:"",textContent:"",remove(){style=null;}
    };}
  };
  const chrome={
    storage:{
      local:{async get(){return {theme};}},
      onChanged:{addListener(callback){changeListener=callback;}}
    }
  };
  const listeners={};
  const window={addEventListener(event,callback){listeners[event]=callback;}};
  class MutationObserver {
    constructor(callback){observerCallback=callback;}
    observe(){}
    disconnect(){}
  }
  const location={get pathname(){return pathname;}};
  runInNewContext(code,{chrome,document,window,location,MutationObserver});
  await Promise.resolve();
  await Promise.resolve();
  return {
    get active(){return root.getAttribute("data-mge-ui")==="on";},
    get css(){return style?.textContent||"";},
    navigate(next){pathname=next;observerCallback();},
    change(next){changeListener({theme:{newValue:next}},"local");}
  };
}

test("the homepage and deck library receive the normal-UI theme",async()=>{
  const home=await launch("/");
  assert.equal(home.active,true);
  assert.match(home.css,/main :is\(h1,h2,h3\)/);
  const decks=await launch("/decks");
  assert.equal(decks.active,true);
});

test("the solo battlefield and live play are never styled",async()=>{
  for(const path of ["/solo","/solo/abc","/play/123","/draft/abc","/conquest/new","/match/abc"]){
    const app=await launch(path);
    assert.equal(app.active,false,path);
    assert.equal(app.css,"",path);
  }
});

test("client-side navigation removes UI styles on entering gameplay",async()=>{
  const app=await launch("/decks");
  assert.equal(app.active,true);
  app.navigate("/solo");
  assert.equal(app.active,false);
  assert.equal(app.css,"");
  app.navigate("/");
  assert.equal(app.active,true);
});

test("disabling themes clears previously injected styling",async()=>{
  const app=await launch("/");
  app.change({enabled:false});
  assert.equal(app.active,false);
  assert.equal(app.css,"");
});

test("uploaded images are off by default, on only when enabled",async()=>{
  const image="data:image/png;base64,aGVsbG8=";
  const app=await launch("/",{enabled:true,image,siteImageEnabled:false});
  assert.equal(app.css.includes(image),false);
  app.change({enabled:true,image,siteImageEnabled:true});
  assert.equal(app.css.includes(image),true);
});
