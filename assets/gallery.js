(function(){
  var btns=[].slice.call(document.querySelectorAll('.gallery button'));
  if(!btns.length) return;
  var srcs=btns.map(function(b){var im=b.querySelector('img');return b.getAttribute('data-full')||(im&&im.src)||'';});
  var lb=document.createElement('div'); lb.className='lb'; lb.setAttribute('role','dialog'); lb.setAttribute('aria-modal','true');
  lb.innerHTML='<button class="lb-btn lb-close" aria-label="Close gallery">&times;</button>'+
    '<button class="lb-btn lb-prev" aria-label="Previous photo">&#8249;</button>'+
    '<img alt="Enlarged gallery photo">'+
    '<button class="lb-btn lb-next" aria-label="Next photo">&#8250;</button>'+
    '<div class="lb-count"></div>';
  document.body.appendChild(lb);
  var big=lb.querySelector('img'), cnt=lb.querySelector('.lb-count'), i=0;
  function show(n){i=(n+srcs.length)%srcs.length; big.src=srcs[i]; cnt.textContent=(i+1)+' / '+srcs.length;}
  function open(n){show(n); lb.classList.add('open'); document.body.style.overflow='hidden';}
  function close(){lb.classList.remove('open'); big.src=''; document.body.style.overflow='';}
  btns.forEach(function(b,n){b.addEventListener('click',function(){open(n);});});
  lb.querySelector('.lb-close').addEventListener('click',close);
  lb.querySelector('.lb-prev').addEventListener('click',function(e){e.stopPropagation();show(i-1);});
  lb.querySelector('.lb-next').addEventListener('click',function(e){e.stopPropagation();show(i+1);});
  lb.addEventListener('click',function(e){if(e.target===lb)close();});
  document.addEventListener('keydown',function(e){if(!lb.classList.contains('open'))return;
    if(e.key==='Escape')close(); else if(e.key==='ArrowLeft')show(i-1); else if(e.key==='ArrowRight')show(i+1);});
})();
