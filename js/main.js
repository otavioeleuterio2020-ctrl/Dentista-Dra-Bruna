(function(){
  var d=document,root=d.documentElement;root.classList.add('js');
  var MSG='Olá! Acessei o site do Consultório Dra. Bruna Amazonas Aloise e gostaria de obter informações sobre o atendimento e os horários disponíveis.';
  d.querySelectorAll('[data-wa]').forEach(function(a){a.href='https://wa.me/5516991097313?text='+encodeURIComponent(MSG)});
  d.getElementById('ano').textContent=new Date().getFullYear();

  // menu móvel
  var b=d.querySelector('.burger'),nav=d.getElementById('menu');
  function setMenu(o){nav.classList.toggle('open',o);b.setAttribute('aria-expanded',o);b.setAttribute('aria-label',o?'Fechar menu':'Abrir menu')}
  b.addEventListener('click',function(){setMenu(!nav.classList.contains('open'))});
  nav.addEventListener('click',function(e){if(e.target.closest('a'))setMenu(false)});
  d.addEventListener('keydown',function(e){if(e.key==='Escape'){setMenu(false);lb.hidden=true}});

  // destaque do dia (horário de Brasília)
  var wd={Sun:0,Mon:1,Tue:2,Wed:3,Thu:4,Fri:5,Sat:6};
  try{var k=new Intl.DateTimeFormat('en-US',{weekday:'short',timeZone:'America/Sao_Paulo'}).format(new Date());
    var r=d.querySelector('.hours tr[data-d="'+wd[k]+'"]');if(r)r.classList.add('today')}catch(e){}

  // fotos reais: só entram se o arquivo existir em assets/img
  var lb=d.getElementById('lb'),lbi=lb.querySelector('img');
  d.querySelectorAll('[data-photo]').forEach(function(f){
    var im=new Image();im.onload=function(){
      var alt=(f.querySelector('span')||{}).textContent||'Consultório Dra. Bruna Amazonas Aloise, Franca-SP';
      im.alt=alt;im.loading='lazy';f.innerHTML='';f.appendChild(im);f.classList.add('has');
      if(f.closest('.gallery')){f.tabIndex=0;f.setAttribute('role','button');f.setAttribute('aria-label','Ampliar: '+alt)}
    };im.src=f.dataset.photo});
  function open(f){var i=f.querySelector('img');if(!i)return;lbi.src=i.src;lbi.alt=i.alt;lb.hidden=false}
  d.getElementById('gallery').addEventListener('click',function(e){var f=e.target.closest('figure.has');if(f)open(f)});
  d.getElementById('gallery').addEventListener('keydown',function(e){if(e.key==='Enter'&&e.target.matches('figure.has'))open(e.target)});
  lb.addEventListener('click',function(){lb.hidden=true});

  // revelação suave (apenas nas seções)
  if('IntersectionObserver' in window){
    var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}})},{threshold:.12});
    d.querySelectorAll('.sec .wrap,.cta-in').forEach(function(s){s.classList.add('rv');io.observe(s)});
  }else d.querySelectorAll('.rv').forEach(function(s){s.classList.add('in')});
})();
