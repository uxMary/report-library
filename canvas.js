const rail=document.querySelector('.canvas-sections');
const mobile=window.matchMedia('(max-width:760px)');
function sizeRail(){rail.open=!mobile.matches}
sizeRail();mobile.addEventListener('change',sizeRail);
rail.querySelectorAll('a').forEach(link=>link.addEventListener('click',()=>{if(mobile.matches)rail.open=false}));
document.addEventListener('keydown',event=>{if(event.key==='Escape'&&rail.open&&mobile.matches){rail.open=false;rail.querySelector('summary').focus()}});
