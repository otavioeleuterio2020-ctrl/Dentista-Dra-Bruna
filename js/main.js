(function(){
var $=function(s,r){return (r||document).querySelector(s)},$$=function(s,r){return Array.prototype.slice.call((r||document).querySelectorAll(s))};
// menu
var b=$('.burger'),n=$('#menu');
function fecha(){b.setAttribute('aria-expanded','false');b.setAttribute('aria-label','Abrir menu');n.classList.remove('open')}
b.addEventListener('click',function(){var o=b.getAttribute('aria-expanded')==='true';if(o){fecha()}else{b.setAttribute('aria-expanded','true');b.setAttribute('aria-label','Fechar menu');n.classList.add('open')}});
$$('#menu a').forEach(function(a){a.addEventListener('click',fecha)});
document.addEventListener('keydown',function(e){if(e.key==='Escape')fecha()});
// FAQ
$$('.q button').forEach(function(btn){btn.addEventListener('click',function(){var o=btn.getAttribute('aria-expanded')==='true';btn.setAttribute('aria-expanded',String(!o));$('#'+btn.getAttribute('aria-controls')).classList.toggle('open',!o)})});
// horários (fuso de Franca/SP)
var H={1:[9,20],2:[9,20],3:[9,20],4:[9,20],5:[9,20],6:[10,16]},NM=['domingo','segunda','terça','quarta','quinta','sexta','sábado'];
function agora(){var p=new Intl.DateTimeFormat('en-US',{timeZone:'America/Sao_Paulo',weekday:'short',hour:'numeric',minute:'numeric',hour12:false}).formatToParts(new Date()),o={};p.forEach(function(x){o[x.type]=x.value});var d={Sun:0,Mon:1,Tue:2,Wed:3,Thu:4,Fri:5,Sat:6}[o.weekday];return{d:d,m:(parseInt(o.hour,10)%24)*60+parseInt(o.minute,10)}}
function status(){var t=agora(),h=H[t.d],el=$('#status');$$('.hours li').forEach(function(li){li.classList.toggle('today',+li.dataset.d===t.d)});
if(h&&t.m>=h[0]*60&&t.m<h[1]*60){el.textContent='Aberto agora, até '+h[1]+'h.'}
else{var d=t.d,k=0;if(h&&t.m<h[0]*60){el.textContent='Fechado agora. Abre hoje às '+h[0]+'h.';return}
do{d=(d+1)%7;k++}while(!H[d]);el.textContent='Fechado agora. Abre '+(k===1?'amanhã':NM[d])+' às '+H[d][0]+'h.'}}
status();setInterval(status,60000);
// galeria ampliada
var lb=$('#lb'),body=$('.lb-body',lb);
$$('.gal button').forEach(function(bt){bt.addEventListener('click',function(){body.innerHTML=$('.ph',bt).outerHTML;if(lb.showModal)lb.showModal()})});
$('.x',lb).addEventListener('click',function(){lb.close()});
lb.addEventListener('click',function(e){if(e.target===lb)lb.close()});
$('#ano').textContent=new Date().getFullYear();
})();
