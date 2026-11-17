function addParticle(i,temporary=false){
 if(!temporary)return;
 const layer=document.getElementById('ambient');
 const el=document.createElement('span');el.className='cinematic-drift drift-heart';el.textContent=i%3===0?'🌸':'❤️';
 el.style.setProperty('--left',((i*43)%100)+'%');el.style.setProperty('--duration','8s');el.style.setProperty('--delay','0s');el.style.setProperty('--drift',((i%2?1:-1)*80)+'px');layer.appendChild(el);setTimeout(()=>el.remove(),9000);
}
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
 try{await audio.play();updateMusic()}catch(err){musicButton.textContent='♫ Tap to play music';musicButton.title='Tap again to start audio';console.warn('Audio playback blocked or file missing',err)}
}
musicButton.addEventListener('click',()=>toggleMusic());
document.getElementById('start').addEventListener('click',()=>{toggleMusic(true);document.querySelector('.intro').scrollIntoView({behavior:'smooth'})});
audio.addEventListener('play',updateMusic);audio.addEventListener('pause',updateMusic);audio.addEventListener('error',()=>{musicButton.textContent='♫ Music file missing';musicButton.title='Check assets/birthday_music.mp3 was uploaded';});
document.getElementById('surprise').addEventListener('click',()=>{
 document.getElementById('surpriseText').textContent='I would choose you in every lifetime, Pondati. ❤️';
 for(let i=0;i<6;i++)addParticle(i+50,true)
});
