const ambient=document.getElementById('ambient');
const particles=['🦋','🦋','🦋','❤️','❤️','💖','💗','💕','🌸','🌺','🌼','✨','💐'];
function addParticle(i,temporary=false){
 const b=document.createElement('span');const butterfly=i%13<3;
 b.className='floaty '+(butterfly?'butterfly':'petal');b.textContent=particles[i%particles.length];
 b.style.setProperty('--x',((i*37+13)%100)+'%');
 b.style.setProperty('--size',(butterfly?25+(i*11)%28:18+(i*7)%22)+'px');
 b.style.setProperty('--dur',(butterfly?9+(i*3)%12:12+(i*5)%18)+'s');
 b.style.setProperty('--delay',temporary?'0s':(-i*1.7)+'s');
 b.style.setProperty('--drift',((i%2===0?1:-1)*(30+(i*17)%120))+'px');
 ambient.appendChild(b);if(temporary)setTimeout(()=>b.remove(),17000);
}
for(let i=0;i<45;i++)addParticle(i);
const observer=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add('visible')}),{threshold:.14});
document.querySelectorAll('.scene').forEach(el=>observer.observe(el));
const progress=document.getElementById('progress');
addEventListener('scroll',()=>{const max=document.documentElement.scrollHeight-innerHeight;progress.style.width=(max>0?100*scrollY/max:0)+'%'},{passive:true});
const audio=document.getElementById('birthdayAudio'),musicButton=document.getElementById('musicToggle');
audio.volume=.65;
function updateMusic(){const on=!audio.paused;musicButton.textContent=on?'♫ Music: On':'♫ Music: Off';musicButton.setAttribute('aria-pressed',String(on))}
async function toggleMusic(forceStart=false){
 if(!audio.paused&&!forceStart){audio.pause();updateMusic();return}
 if(!audio.paused){updateMusic();return}
 try{await audio.play()}catch(err){musicButton.textContent='♫ Tap to play music'}updateMusic()
}
musicButton.addEventListener('click',()=>toggleMusic());
document.getElementById('start').addEventListener('click',()=>{toggleMusic(true);document.querySelector('.intro').scrollIntoView({behavior:'smooth'})});
audio.addEventListener('play',updateMusic);audio.addEventListener('pause',updateMusic);
document.getElementById('surprise').addEventListener('click',()=>{
 document.getElementById('surpriseText').textContent='I would choose you in every lifetime, Pondati. ❤️';
 for(let i=0;i<26;i++)addParticle(i+50,true)
});
