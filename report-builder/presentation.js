const links=[...document.querySelectorAll('.chapter-nav a')];
function setActiveChapter(hash){
 const chapterHash=hash.startsWith('#final-')?'#final-home':hash;
 links.forEach(link=>{if(link.hash===chapterHash)link.setAttribute('aria-current','location');else link.removeAttribute('aria-current')});
}
links.forEach(link=>link.addEventListener('click',()=>setActiveChapter(link.hash)));
if('IntersectionObserver'in window){
 const observer=new IntersectionObserver(entries=>{
  const visible=entries.filter(entry=>entry.isIntersecting).sort((a,b)=>a.boundingClientRect.top-b.boundingClientRect.top);
  if(visible.length)setActiveChapter(visible[0].target.classList.contains('screen-panels')?'#final-home':'#'+visible[0].target.id);
 },{rootMargin:'-15% 0px -55% 0px'});
 document.querySelectorAll('.chapter,.screen-panels').forEach(section=>observer.observe(section));
}
setActiveChapter(location.hash||'#final-home');



const screenTabs=[...document.querySelectorAll('.screen-panels .screen-index [role="tab"]')];
const screenPanels=[...document.querySelectorAll('.final-screen-story')];
function selectScreen(id,focus=false){
 if(!screenPanels.some(panel=>panel.id===id))return;
 setActiveChapter('#'+id);
 screenTabs.forEach(tab=>{const active=tab.getAttribute('aria-controls')===id;tab.setAttribute('aria-selected',String(active));tab.tabIndex=active?0:-1;if(active&&focus)tab.focus()});
 screenPanels.forEach(panel=>{panel.hidden=panel.id!==id});
}
screenTabs.forEach((tab,index)=>{
 tab.addEventListener('click',()=>{const id=tab.getAttribute('aria-controls');selectScreen(id);history.replaceState(null,'','#'+id)});
 tab.addEventListener('keydown',event=>{
 let next=index;
 if(event.key==='ArrowRight')next=(index+1)%screenTabs.length;
 else if(event.key==='ArrowLeft')next=(index-1+screenTabs.length)%screenTabs.length;
 else if(event.key==='Home')next=0;
 else if(event.key==='End')next=screenTabs.length-1;
 else return;
 event.preventDefault();screenTabs[next].click();screenTabs[next].focus();
 });
});
function screenFromHash(){selectScreen(location.hash.slice(1));if(location.hash)setActiveChapter(location.hash)}
window.addEventListener('hashchange',screenFromHash);
document.querySelectorAll('a[href^="#final-"]').forEach(link=>link.addEventListener('click',()=>selectScreen(link.hash.slice(1))));
screenFromHash();


const conceptTabs=[...document.querySelectorAll('.concept-tabs [role="tab"]')];
const conceptPanels=[...document.querySelectorAll('.concept-tab-panel')];
function chooseConcept(index){conceptTabs.forEach((tab,i)=>{tab.setAttribute('aria-selected',String(i===index));tab.tabIndex=i===index?0:-1});conceptPanels.forEach((panel,i)=>panel.hidden=i!==index)}
conceptTabs.forEach((tab,index)=>{
 tab.addEventListener('click',()=>chooseConcept(index));
 tab.addEventListener('keydown',event=>{
 let next=index;
 if(event.key==='ArrowRight')next=(index+1)%conceptTabs.length;
 else if(event.key==='ArrowLeft')next=(index-1+conceptTabs.length)%conceptTabs.length;
 else if(event.key==='Home')next=0;
 else if(event.key==='End')next=conceptTabs.length-1;
 else return;
 event.preventDefault();chooseConcept(next);conceptTabs[next].focus();
 });
});
