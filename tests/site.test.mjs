import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile, access, readdir, stat } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { locales, routes } from '../src/locales.mjs';
import config from '../site.config.mjs';
const root=fileURLToPath(new URL('../dist/',import.meta.url));
const route=(lang,key)=>`/${lang}/${routes[lang][key]?routes[lang][key]+'/':''}`;
const pages=[];
for(const lang of config.languages)for(const key of Object.keys(routes[lang]))pages.push({lang,key,url:route(lang,key),html:await readFile(path.join(root,route(lang,key),'index.html'),'utf8')});
test('All 42 localized routes build, with one H1 and the correct language',()=>{
 assert.equal(pages.length,42);
 for(const {html,lang,url} of pages){assert.ok(html.includes(`<html lang="${lang}">`),url);assert.equal((html.match(/<h1(?:>|\s)/g)||[]).length,1,url);assert.ok(html.includes('<main id="main">'),url);}
});
test('Every page has a unique title, description, canonical and reciprocal language URLs',()=>{
 const titles=new Set();
 for(const {html,lang,key,url} of pages){const title=html.match(/<title>(.*?)<\/title>/s)?.[1];assert.ok(title);assert.ok(!titles.has(title),'Duplicate '+title);titles.add(title);assert.ok(html.match(/<meta name="description" content="[^"]{5,}"/),url);assert.ok(html.includes(`<link rel="canonical" href="${config.origin+url}">`),url);for(const other of config.languages){assert.ok(html.includes(`hreflang="${other}" href="${config.origin+route(other,key)}"`),url);assert.ok(html.includes(`href="${route(other,key)}" lang="${other}"`),url);}}
});
test('All local links, scripts, fonts and image references resolve to real nonempty files',async()=>{
 const sources=[...pages.map(p=>p.html),await readFile(path.join(root,'assets/style.css'),'utf8')];
 const files=new Set();for(const html of sources)for(const m of html.matchAll(/(?:href|src)="(\/[^"#]*)"|url\("(\/[^"#]*)"\)/g))files.add(m[1]||m[2]);
 for(const url of files){const candidate=path.join(root,url);await access(candidate);const info=await stat(candidate);if(info.isDirectory())assert.ok((await stat(path.join(candidate,'index.html'))).size>0,url);else assert.ok(info.size>0,url);}
});
test('Structured data parses and uses the page URL and configured person',()=>{
 for(const p of pages){const json=JSON.parse(p.html.match(/<script type="application\/ld\+json">(.*?)<\/script>/s)[1]);assert.equal(json['@context'],'https://schema.org');assert.equal(json['@graph'][0].name,config.person);assert.ok(json['@graph'].some(n=>n.url===config.origin+p.url));}
});
test('Preview remains noindex while allowing crawlers to read the directive',async()=>{
 for(const p of pages)assert.ok(p.html.includes('content="noindex,follow"'),p.url);
 const robots=await readFile(path.join(root,'robots.txt'),'utf8');assert.ok(robots.includes('Allow: /'));assert.ok(!robots.includes('Disallow: /'));assert.ok(robots.includes(config.origin+'/sitemap.xml'));
});
test('Sitemap contains exactly the canonical localized routes',async()=>{
 const xml=await readFile(path.join(root,'sitemap.xml'),'utf8');const urls=[...xml.matchAll(/<loc>(.*?)<\/loc>/g)].map(m=>m[1]);assert.equal(urls.length,pages.length);assert.equal(new Set(urls).size,urls.length);for(const p of pages)assert.ok(urls.includes(config.origin+p.url));
});
test('Contact forms are labeled, validate data and never pretend to send a request',()=>{
 for(const p of pages.filter(p=>p.key==='contact')){for(const field of ['name','email','service','message'])assert.ok(p.html.includes(`for="${field}"`));assert.ok(p.html.includes('type="email"'));assert.ok(p.html.includes('minlength="10"'));assert.ok(p.html.includes(config.whatsappUrl));assert.ok(!p.html.includes('action="'));}
});
test('Self-hosted fonts are WOFF and sharing images are 1200 × 630 PNGs',async()=>{
 for(const name of ['dm-sans-latin','dm-sans-medium','dm-sans-bold']){const b=await readFile(path.join(root,'assets/fonts/'+name+'.woff'));assert.equal(b.subarray(0,4).toString(),'wOFF');}
 for(const lang of config.languages){const b=await readFile(path.join(root,`assets/social-${lang}.png`));assert.equal(b.readUInt32BE(16),1200);assert.equal(b.readUInt32BE(20),630);}
});
test('404 is noindex and offers a valid route home',async()=>{
 const html=await readFile(path.join(root,'404.html'),'utf8');assert.ok(html.includes('noindex,follow'));assert.ok(html.includes('href="/it/"'));assert.ok(!html.includes('rel="canonical"'));
});
test('No runtime tracking or remote font dependency is introduced',async()=>{
 const js=await readFile(path.join(root,'assets/app.js'),'utf8');assert.ok(!/localStorage|sessionStorage|document\.cookie|fetch\(/.test(js));for(const {html} of pages)assert.ok(!html.includes('fonts.googleapis.com'));assert.ok(js.includes('prefers-reduced-motion'));assert.ok(js.includes("event.key==='Escape'"));
});
