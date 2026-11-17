(()=>{
 const layer=document.getElementById('ambient');if(!layer)return;
 layer.replaceChildren();layer.classList.add('cinematic-layer');
 const reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
 const mobile=matchMedia('(max-width: 700px)').matches;
 const butterflySVG=`<svg class="butterfly-body" viewBox="0 0 100 100" aria-hidden="true"><g class="wing wing-left"><path d="M49 49 C17 0 -8 14 10 48 Q20 66 49 54Z" fill="var(--wing-a)" stroke="var(--edge)" stroke-width="2"/><path d="M48 53 Q0 49 20 85 Q37 95 49 57Z" fill="var(--wing-b)" stroke="var(--edge)" stroke-width="2"/><path d="M44 43 Q20 18 16 34 Q23 49 44 49" fill="#fff" opacity=".35"/><circle cx="21" cy="42" r="4" fill="#fff8"/></g><g class="wing wing-right"><path d="M51 49 C83 0 108 14 90 48 Q80 66 51 54Z" fill="var(--wing-a)" stroke="var(--edge)" stroke-width="2"/><path d="M52 53 Q100 49 80 85 Q63 95 51 57Z" fill="var(--wing-b)" stroke="var(--edge)" stroke-width="2"/><path d="M56 43 Q80 18 84 34 Q77 49 56 49" fill="#fff" opacity=".35"/><circle cx="79" cy="42" r="4" fill="#fff8"/></g><path d="M50 36 Q47 20 42 18 M50 36 Q53 20 58 18" fill="none" stroke="#453052" stroke-width="1.6" stroke-linecap="round"/><ellipse cx="50" cy="55" rx="3.5" ry="22" fill="#382347"/><circle cx="50" cy="37" r="5" fill="#382347"/></svg>`;
 const palettes=[['#6bdcff','#4777f9','#254ea7'],['#ff80d4','#c95cf6','#a43c9c'],['#ffe487','#ff9f5d','#d46b57'],['#a1f7d5','#44b9ce','#338a99']];
 const butterflies=[];
 if(!reduce){for(let i=0;i<(mobile?2:4);i++){
   const el=document.createElement('div');el.className='cinematic-butterfly';el.innerHTML=butterflySVG;
   const p=palettes[i%palettes.length];el.style.setProperty('--wing-a',p[0]);el.style.setProperty('--wing-b',p[1]);el.style.setProperty('--edge',p[2]);
   const size=(mobile?30:38)+(i*7)%16;el.style.width=size+'px';el.style.height=size+'px';el.style.animationDelay=-(i*.27)+'s';
   layer.appendChild(el);butterflies.push({el,i,speed:.000028+(i%5)*.000007,offset:i/11,depth:.55+(i%4)*.2});
 }
 for(let i=0;i<(mobile?4:7);i++){
  const el=document.createElement('span');el.className='cinematic-drift '+(i%4===0?'drift-heart':i%3===0?'drift-spark':'drift-petal');
  el.textContent=i%4===0?'❤️':i%3===0?'✦':i%2===0?'🌸':'❀';
  el.style.setProperty('--left',((i*41+11)%100)+'%');el.style.setProperty('--duration',(13+i%9*2)+'s');el.style.setProperty('--delay',(-i*1.8)+'s');el.style.setProperty('--drift',((i%2?1:-1)*(40+i%5*20))+'px');el.style.fontSize=(13+i%4*5)+'px';layer.appendChild(el);
 }
 let last=0;function animate(t){if(t-last>30){const w=innerWidth,h=innerHeight;for(const b of butterflies){const u=(t*b.speed+b.offset)%1;const y=h*(1.2-u*1.45);const side=b.i%2===0?.11:.89;const x=w*(side+Math.sin(u*12+b.i*2)*.075);const tilt=Math.cos(u*10+b.i*1.3)*22;const scale=b.depth*(.85+.15*Math.sin(u*11+b.i));b.el.style.transform=`translate3d(${x}px,${y}px,0) rotate(${tilt}deg) scale(${scale})`;b.el.style.opacity=String(Math.min(1,Math.max(0,(u-.01)*16,(1-u)*9)));}last=t;}requestAnimationFrame(animate)}requestAnimationFrame(animate);
 }
 const style=document.createElement('style');style.textContent=`
 .cinematic-layer{perspective:900px;overflow:hidden;isolation:isolate}
 .cinematic-butterfly{position:absolute;top:0;left:0;transform-origin:center;will-change:transform;pointer-events:none;filter:drop-shadow(0 5px 7px #792ea25a) drop-shadow(0 0 12px #ffb8f7a0);z-index:0}
 .butterfly-body{width:100%;height:100%;overflow:visible;transform:rotate(-12deg)}
 .wing{transform-box:fill-box;transform-origin:center;animation:flap .48s ease-in-out infinite alternate}
 .wing-left{transform-origin:right center}.wing-right{transform-origin:left center;animation-direction:alternate-reverse}
 @keyframes flap{0%{transform:perspective(200px) rotateY(67deg)}100%{transform:perspective(200px) rotateY(-16deg)}}
 .cinematic-drift{position:absolute;left:var(--left);top:-12%;z-index:0;opacity:.32;will-change:transform;animation:cinematicFall var(--duration) linear infinite;animation-delay:var(--delay);filter:drop-shadow(0 0 8px #fff9);pointer-events:none}
 .drift-heart{filter:drop-shadow(0 0 9px #ff76ae)}.drift-spark{color:#fff5bb;text-shadow:0 0 12px #fff,0 0 22px #ffca64}
 @keyframes cinematicFall{0%{transform:translate3d(0,-8vh,0) rotate(-30deg) scale(.7);opacity:0}12%{opacity:.35}48%{transform:translate3d(var(--drift),52vh,0) rotate(110deg) scale(1.15)}90%{opacity:.3}100%{transform:translate3d(calc(var(--drift) * -1),115vh,0) rotate(280deg) scale(.7);opacity:0}}
 .scene.visible .scene-art img{animation:cinematicReveal 1.3s cubic-bezier(.2,.8,.2,1) both}
 @keyframes cinematicReveal{from{filter:brightness(.8) saturate(.8);clip-path:inset(8% 8% round 30px)}to{filter:brightness(1) saturate(1.06);clip-path:inset(0 0 round 30px)}}
 @media(prefers-reduced-motion:reduce){.cinematic-butterfly,.cinematic-drift{display:none!important}.scene.visible .scene-art img{animation:none!important}}
 `;document.head.appendChild(style);
})();
