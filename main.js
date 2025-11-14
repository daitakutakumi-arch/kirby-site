// Kirby Super Cute Remix - External JS

// === Audio Setup ===
// (外部ホスト上の短い効果音URLを利用しています。差し替え可)
const SFX = {
  load: new Audio('https://audio.jukehost.co.uk/32y3pFzi9M16.wav'),
  loaded: new Audio('https://audio.jukehost.co.uk/5zZKJRXW2G0H.wav'),
  click: new Audio('https://audio.jukehost.co.uk/mjK7rWGXDLEu.wav'),
  open: new Audio('https://audio.jukehost.co.uk/KO8qSgfLMt3M.wav'),
  close: new Audio('https://audio.jukehost.co.uk/1hBhgFexFm1n.wav'),
  hover: new Audio('https://audio.jukehost.co.uk/wGLjTUxF58yk.wav'),
  toast: new Audio('https://audio.jukehost.co.uk/Wx1nH9AfpPFo.wav'),
  slide: new Audio('https://audio.jukehost.co.uk/ViBPrHkkG99x.wav'),
  star: new Audio('https://audio.jukehost.co.uk/MpsSVg8AsFQh.wav')
};
Object.values(SFX).forEach(a=>{ a.volume = 0.45; a.preload = 'auto'; });

// Data: characters & goods
const CHARACTERS = [
  {name:'カービィ',img:'https://www.kirby.jp/img/characters/kirby.png',desc:'ぷくっと可愛い勇者'},
  {name:'ワドルディ',img:'https://www.kirby.jp/img/characters/waddle-dee.png',desc:'忠実な仲間'},
  {name:'デデデ大王',img:'https://www.kirby.jp/img/characters/dedede.png',desc:'おっきな王さま'},
  {name:'メタナイト',img:'https://www.kirby.jp/img/characters/meta-knight.png',desc:'剣の達人'},
  {name:'バンダナワドルディ',img:'https://www.kirby.jp/img/characters/bandana-waddle-dee.png',desc:'頼れる相棒'},
  {name:'マホロア',img:'https://www.kirby.jp/img/characters/magolor.png',desc:'ふしぎな魔法使い'},
  {name:'エフィリン',img:'https://www.kirby.jp/img/characters/efilin.png',desc:'きまぐれな存在'},
  {name:'マホロア（変）',img:'https://www.kirby.jp/img/characters/magolor.png',desc:'ちょっと怪しい'},
  {name:'クリスタル（仮）',img:'https://www.kirby.jp/img/characters/kirby.png',desc:'サンプルキャラ'}
];
// ユーザーの「全部入りきるまで」に合わせるため16個まで補填
while(CHARACTERS.length<16){
  const i = CHARACTERS.length+1;
  CHARACTERS.push({name:'キャラ'+i,img:'https://www.kirby.jp/img/characters/kirby.png',desc:'説明文が入ります'});
}

const GOODS = [
  {title:'カービィ もちもちぬいぐるみ',price:'¥3,980',img:'https://www.kirby-goods.jp/img/goods/plush-kirby.jpg'},
  {title:'ワドルディ マグカップ',price:'¥1,500',img:'https://www.family.co.jp/content/famima_kirby_bag.jpg'},
  {title:'カービィ スマホリング',price:'¥980',img:'https://www.kirbycafe.jp/img/common/menu-winter.png'},
  {title:'ワープスター クッション',price:'¥4,200',img:'https://www.kirby.jp/img/title/discovery/ogp.jpg'},
  {title:'カービィ トースター（限定）',price:'¥8,800',img:'https://www.kirby-goods.jp/img/goods/appliances-kettle.jpg'},
  {title:'ステッカーセット',price:'¥450',img:'https://www.kirby.jp/img/title/allstar_allies/ogp.jpg'}
];

const rnd = (min,max)=>Math.random()*(max-min)+min;

// Scene generation (stars, warp stars, clouds, kirby bubbles)
function makeStars(n=60){
  const cont = document.querySelector('.stars');
  for(let i=0;i<n;i++){
    const s = document.createElement('div'); s.className='star';
    const size = Math.floor(rnd(2,6)); s.style.width=size+'px'; s.style.height=size+'px';
    s.style.left=rnd(0,100)+'%'; s.style.top=rnd(0,100)+'%';
    s.style.opacity=rnd(0.2,1); s.style.animationDuration=rnd(2.5,5.5)+'s';
    cont.appendChild(s);
    // occasional soft star sound for variety (very rare)
    if(Math.random()<0.03){
      setTimeout(()=>{ SFX.star.play().catch(()=>{}); }, rnd(400,4000));
    }
  }
}

function makeWarpStars(n=6){
  const cont = document.querySelector('.warpstars');
  for(let i=0;i<n;i++){
    const w = document.createElement('div'); w.className='warp';
    const startTop = rnd(-20,120); w.style.top = startTop + 'vh';
    w.style.left = rnd(0,100)+'vw'; const dur = rnd(14,26); w.style.animationDuration = dur+'s';
    cont.appendChild(w);
  }
}

function makeClouds(n=3){
  const cont = document.querySelector('.clouds');
  for(let i=0;i<n;i++){
    const c=document.createElement('div'); c.className='cloud';
    c.style.top=rnd(5,55)+'%'; c.style.left=rnd(-40,40)+'%'; c.style.opacity=rnd(0.6,0.95);
    c.style.width=rnd(180,360)+'px'; const dur=rnd(50,90); c.style.animationDuration=dur+'s'; cont.appendChild(c);
  }
}

function makeKirbyBubbles(n=6){
  const cont = document.querySelector('.kirby-bubbles');
  for(let i=0;i<n;i++){
    const k=document.createElement('div'); k.className='kirby-floating';
    k.style.left=rnd(0,100)+'%'; k.style.top=rnd(10,80)+'%'; k.style.opacity=rnd(0.6,1);
    k.style.animation = `kirbyHop ${rnd(2.2,4)}s ease-in-out ${rnd(0,2)}s infinite`;
    cont.appendChild(k);
  }
}

// Build character grid
function buildChars(){
  const grid = document.getElementById('charGrid');
  CHARACTERS.forEach(c=>{
    const el = document.createElement('div'); el.className='char';
    el.innerHTML = `<img src="${c.img}" alt="${c.name}"><h4>${c.name}</h4><p class='muted'>${c.desc}</p>`;
    el.addEventListener('click',()=>openModal(c));
    el.addEventListener('mouseover',()=>{ SFX.hover.play().catch(()=>{}); });
    grid.appendChild(el);
  });
}

// Build goods
function buildGoods(){
  const g = document.querySelector('.goods');
  GOODS.forEach(p=>{
    const el = document.createElement('div'); el.className='product card';
    el.innerHTML = `<img src="${p.img}" alt="${p.title}" style='height:140px;object-fit:contain;margin-bottom:8px'><h4>${p.title}</h4><div class="price">${p.price}</div><div style='margin-top:8px'><button class='pill' data-title="${p.title}">詳細</button></div>`;
    el.querySelector('button').addEventListener('click',()=>{
      SFX.click.play().catch(()=>{});
      showToast(p.title + 'を見てくれてありがとう！');
    });
    el.addEventListener('mouseover',()=>{ SFX.hover.play().catch(()=>{}); });
    g.appendChild(el);
  });
}

// Modal open/close
function openModal(obj){
  SFX.open.play().catch(()=>{});
  const modal=document.getElementById('modal'); const body=document.getElementById('modalBody');
  body.innerHTML = `<h3>${obj.name || obj.title}</h3><p>${obj.desc || '詳細情報が入ります。'}</p>`;
  modal.style.display='flex';
}
function closeModal(){
  SFX.close.play().catch(()=>{});
  document.getElementById('modal').style.display='none';
}

// Slider logic with sound
function setupSlider(){
  const slides = document.getElementById('slides'); const dots = document.getElementById('dots'); const total = slides.children.length; let idx=0;
  for(let i=0;i<total;i++){ const d=document.createElement('div'); d.className='dot'; d.addEventListener('click',()=>go(i)); dots.appendChild(d); }
  dots.children[0].classList.add('active');
  function go(i){ idx=i; slides.style.transform = `translateX(-${i*100}%)`; for(let k=0;k<dots.children.length;k++){ dots.children[k].classList.toggle('active',k===i); } SFX.slide.play().catch(()=>{}); }
  let auto = setInterval(()=>{ go((idx+1)%total); },4200);
  slides.parentElement.addEventListener('mouseenter',()=>{ clearInterval(auto); });
  slides.parentElement.addEventListener('mouseleave',()=>{ auto = setInterval(()=>{ go((idx+1)%total); },4200); });
}

// Toast
function showToast(text){
  SFX.toast.play().catch(()=>{});
  const t = document.getElementById('toast'); t.textContent = text; t.style.display='block'; setTimeout(()=>t.style.display='none',2400);
}

// Loading logic (simulate)
function simulateLoading(){
  SFX.load.play().catch(()=>{});
  const fill = document.getElementById('suckFill');
  let p = 0;
  const tick = setInterval(()=>{
    p += rnd(10,35);
    if(p >= 100) p = 100;
    fill.style.width = p + '%';
    if(p >= 100){
      clearInterval(tick);
      setTimeout(()=>{
        SFX.loaded.play().catch(()=>{});
        document.getElementById('loadingWrap').style.display='none';
        init();
      },700);
    }
  },220);
}

// Init - create scene and bindings
function init(){
  makeStars(80); makeWarpStars(6); makeClouds(4); makeKirbyBubbles(8);
  buildChars(); buildGoods(); setupSlider();

  // play trailer opens modal
  const trailer = document.getElementById('playTrailer');
  if(trailer) trailer.addEventListener('click',()=>{ SFX.click.play().catch(()=>{}); openModal({name:'トレーラー',desc:'トレーラーはここに埋め込みます（サンプル）。'}); });

  document.getElementById('closeModal').addEventListener('click',closeModal);

  // hover-sfx class: small hover sound for nav/pills
  document.querySelectorAll('.hover-sfx').forEach(el=>{
    el.addEventListener('mouseenter',()=>{ SFX.hover.play().catch(()=>{}); });
    el.addEventListener('click',()=>{ SFX.click.play().catch(()=>{}); });
  });

  // parallax-ish movement
  document.addEventListener('mousemove',(e)=>{
    const px = (e.clientX/window.innerWidth-0.5)*20;
    const py = (e.clientY/window.innerHeight-0.5)*10;
    document.querySelectorAll('.cloud').forEach((el,i)=>{ el.style.transform = `translate(${px*(i+1)/40}px, ${py*(i+1)/20}px)`; });
    document.querySelectorAll('.warp').forEach((el,i)=>{ el.style.transform = `translateX(${px*(i+1)/60}vw) rotate(${px*3}deg)`; });
  });

  // esc closes modal
  document.addEventListener('keydown',(ev)=>{ if(ev.key === 'Escape') closeModal(); });

  // gentle welcome toast
  setTimeout(()=>showToast('ページを読み込みました！カービィと遊ぼう♪'),1200);
}

// Start when DOM ready
if(document.readyState === 'loading'){
  document.addEventListener('DOMContentLoaded', simulateLoading);
} else {
  simulateLoading();
}
