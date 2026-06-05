// Custom cursor
const cursor = document.getElementById('cursor');
const follow = document.getElementById('cursorFollow');
let mx=0,my=0,fx=0,fy=0;
document.addEventListener('mousemove',e=>{
  mx=e.clientX;my=e.clientY;
  cursor.style.left=mx+'px';cursor.style.top=my+'px';
});
(function animFollow(){
  fx+=(mx-fx)*0.12;fy+=(my-fy)*0.12;
  follow.style.left=fx+'px';follow.style.top=fy+'px';
  requestAnimationFrame(animFollow);
})();
document.querySelectorAll('a,button,.project-card,.skill-card,.contact-card').forEach(el=>{
  el.addEventListener('mouseenter',()=>{
    cursor.style.width='20px';cursor.style.height='20px';
    follow.style.width='60px';follow.style.height='60px';
    follow.style.borderColor='rgba(59,130,246,0.8)';
  });
  el.addEventListener('mouseleave',()=>{
    cursor.style.width='12px';cursor.style.height='12px';
    follow.style.width='36px';follow.style.height='36px';
    follow.style.borderColor='rgba(59,130,246,0.5)';
  });
});

// Scroll reveal
const reveals = document.querySelectorAll('.reveal');
const obs = new IntersectionObserver(entries=>{
  entries.forEach(e=>{ if(e.isIntersecting) e.target.classList.add('visible'); });
},{threshold:0.12});
reveals.forEach(r=>obs.observe(r));

// Active nav
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');
window.addEventListener('scroll',()=>{
  let current='';
  sections.forEach(s=>{ if(window.scrollY>=s.offsetTop-120) current=s.id; });
  navLinks.forEach(a=>{ a.classList.remove('active'); if(a.getAttribute('href')==='#'+current) a.classList.add('active'); });
  document.getElementById('navbar').style.padding=window.scrollY>60?'8px 60px':'12px 60px';
  // scroll up
  const btn=document.getElementById('scrollUp');
  if(window.scrollY>400) btn.classList.add('visible');
  else btn.classList.remove('visible');
});

// Typewriter
const words=['Data Analyst · Graphics Designer','Adobe Photoshop Designer','Visual Storyteller','Brand Identity Creator','Social Media Designer','Data Insights Creator'];
let wi=0;
const tw=document.getElementById('typewriter');
function nextWord(){ wi=(wi+1)%words.length; tw.textContent=words[wi]; }
setInterval(nextWord,3600);

// Theme toggle
function toggleTheme(){
  document.body.classList.toggle('dark');
  const icon=document.getElementById('themeIcon');
  icon.className=document.body.classList.contains('dark')?'fa fa-sun':'fa fa-moon';
}

function toggleProjectDetails(card){
  const details = card.querySelector('.project-details');
  const button = card.querySelector('.project-details-btn');
  if(!details || !button) return;

  const isOpen = details.classList.toggle('visible');
  button.textContent = isOpen ? 'Hide Details' : 'View Details';
}

document.querySelectorAll('.project-details-btn').forEach(button=>{
  button.addEventListener('click',event=>{
    event.stopPropagation();
    toggleProjectDetails(button.closest('.project-card'));
  });
});

document.querySelectorAll('.project-thumb').forEach(thumb=>{
  thumb.addEventListener('click',()=>{
    toggleProjectDetails(thumb.closest('.project-card'));
  });
});
