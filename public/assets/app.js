'use strict';
const menuButton=document.querySelector('.menu-toggle');
const navigation=document.querySelector('#site-navigation');
if(menuButton&&navigation){
 menuButton.hidden=false;document.documentElement.classList.add('js');
 const setMenu=open=>{menuButton.setAttribute('aria-expanded',String(open));menuButton.firstChild.textContent=(open?menuButton.dataset.close:menuButton.dataset.open)+' ';navigation.classList.toggle('is-open',open);};
 menuButton.addEventListener('click',()=>setMenu(menuButton.getAttribute('aria-expanded')!=='true'));
 document.addEventListener('keydown',event=>{if(event.key==='Escape'&&menuButton.getAttribute('aria-expanded')==='true'){setMenu(false);menuButton.focus();}});
 navigation.addEventListener('click',event=>{if(event.target.closest('a'))setMenu(false);});
 document.addEventListener('click',event=>{if(!event.target.closest('.site-header'))setMenu(false);});
 matchMedia('(min-width: 1000px)').addEventListener('change',()=>setMenu(false));
}
document.querySelectorAll('[data-workflow]').forEach(panel=>{
 const button=panel.querySelector('[data-run]'),steps=[...panel.querySelectorAll('[data-step]')],status=panel.querySelector('[data-flow-status]');
 button.hidden=false;
 button.addEventListener('click',async()=>{
  button.disabled=true;status.textContent='';
  steps.forEach(step=>{step.classList.remove('running','complete');const state=step.querySelector('.step-state');state.textContent='·';state.setAttribute('aria-label',state.dataset.idle);});
  const reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
  for(const step of steps){
   const state=step.querySelector('.step-state');step.classList.add('running');state.textContent='↗';state.setAttribute('aria-label',state.dataset.running);
   if(!reduce)await new Promise(resolve=>setTimeout(resolve,650));
   step.classList.remove('running');step.classList.add('complete');state.textContent='✓';state.setAttribute('aria-label',state.dataset.success);
  }
  status.textContent=button.dataset.done;button.textContent=button.dataset.reset+' ↗';button.disabled=false;
 });
});
const form=document.querySelector('#brief-form');
if(form){
 const result=document.querySelector('#brief-result'),text=document.querySelector('#brief-text'),copy=document.querySelector('#copy-brief'),status=document.querySelector('#copy-status');form.hidden=false;
 form.addEventListener('submit',event=>{
  event.preventDefault();if(!form.reportValidity())return;
  const data=new FormData(form);
  text.value=[['name',form.dataset.labelName],['email',form.dataset.labelEmail],['service',form.dataset.labelService],['message',form.dataset.labelMessage]].map(([key,label])=>label+': '+String(data.get(key)||'').trim()).join('\n\n');
  form.hidden=true;result.hidden=false;status.textContent='';result.focus();
 });
 copy.addEventListener('click',async()=>{try{await navigator.clipboard.writeText(text.value);status.textContent=copy.dataset.copied;}catch{text.focus();text.select();status.textContent=copy.dataset.failed;}});
 document.querySelector('#edit-brief').addEventListener('click',()=>{result.hidden=true;form.hidden=false;document.querySelector('#name').focus();});
}
