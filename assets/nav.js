(function(){var t=document.getElementById('navToggle'),l=document.getElementById('navLinks');if(!t||!l)return;
t.addEventListener('click',function(){var o=l.classList.toggle('open');t.setAttribute('aria-expanded',o?'true':'false');t.setAttribute('aria-label',o?'Close menu':'Open menu');});
l.querySelectorAll('a').forEach(function(a){a.addEventListener('click',function(){l.classList.remove('open');t.setAttribute('aria-expanded','false');t.setAttribute('aria-label','Open menu');});});})();
