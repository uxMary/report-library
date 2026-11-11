document.querySelectorAll('[data-process-tabs]').forEach(group=>{
 const tabs=[...group.querySelectorAll('[role=tab]')];
 const panels=[...group.querySelectorAll('[role=tabpanel]')];
 function choose(index,focus=false){tabs.forEach((tab,i)=>{tab.setAttribute('aria-selected',String(i===index));tab.tabIndex=i===index?0:-1});panels.forEach((panel,i)=>panel.hidden=i!==index);if(focus)tabs[index].focus()}
 tabs.forEach((tab,index)=>{tab.addEventListener('click',()=>choose(index));tab.addEventListener('keydown',event=>{let next;if(event.key==='ArrowRight')next=(index+1)%tabs.length;else if(event.key==='ArrowLeft')next=(index+tabs.length-1)%tabs.length;else if(event.key==='Home')next=0;else if(event.key==='End')next=tabs.length-1;else return;event.preventDefault();choose(next,true)})});
});
