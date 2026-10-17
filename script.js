const screens = [...document.querySelectorAll('.screen')];
const ambient = document.getElementById('ambient');
const music = document.getElementById('loveMusic');
const musicBtn = document.getElementById('musicBtn');
const musicLabel = document.getElementById('musicLabel');
let petalTimer;
function showScreen(id) {
  screens.forEach(s => s.classList.toggle('active', s.id === id));
  window.scrollTo({top:0, behavior:'smooth'});
  if (id === 'bloom') runBloom();
}
function makePetal() {
  const el = document.createElement('span');
  el.className = 'falling';
  el.textContent = Math.random() > .45 ? '🌹' : (Math.random() > .5 ? '♥' : '🌸');
  el.style.left = Math.random()*100 + 'vw';
  el.style.fontSize = (10 + Math.random()*17) + 'px';
  el.style.setProperty('--drift', (Math.random()*180-90)+'px');
  el.style.animationDuration = (5 + Math.random()*7)+'s';
  ambient.appendChild(el);
  setTimeout(() => el.remove(), 13000);
}
for(let i=0;i<18;i++) setTimeout(makePetal, i*180);
petalTimer = setInterval(makePetal, 420);

document.getElementById('startBtn').addEventListener('click', () => {
  const btn = document.getElementById('startBtn');
  btn.disabled = true; btn.textContent = 'একটু অপেক্ষা করো… ♥';
  setTimeout(() => { btn.disabled = false; btn.innerHTML = '♥ &nbsp; Tap to Bloom for Love &nbsp; →'; showScreen('bloom'); }, 800);
});
function runBloom(){
  const rose = document.querySelector('.rose');
  const flower = document.querySelector('.flower');
  const progress = document.getElementById('bloomProgress');
  const caption = document.getElementById('bloomCaption');
  const letterBtn = document.getElementById('letterBtn');
  rose.style.animation = 'none'; flower.style.animation = 'none';
  void rose.offsetWidth;
  rose.style.animation = ''; flower.style.animation = '';
  progress.style.width = '0%'; letterBtn.classList.add('hidden');
  const captions = ['একটি ছোট্ট কুঁড়ি… 🌱','ধীরে ধীরে ফুটছে… 🌹','আরও একটু… ❤️','শুধু তোমার জন্য… ✨'];
  let start = performance.now();
  function frame(now){
    const pct = Math.min(100, ((now-start)/5000)*100);
    progress.style.width = pct+'%';
    caption.textContent = captions[Math.min(3, Math.floor(pct/26))];
    if(pct < 100) requestAnimationFrame(frame);
    else {caption.textContent='ফুলটি ফুটেছে—শুধু তোমার জন্য! 🌹';letterBtn.classList.remove('hidden');}
  }
  requestAnimationFrame(frame);
}
document.getElementById('letterBtn').addEventListener('click',()=>showScreen('letter'));
document.getElementById('memoriesBtn').addEventListener('click',()=>showScreen('memories'));
document.getElementById('finalBtn').addEventListener('click',()=>showScreen('final'));
document.getElementById('againBtn').addEventListener('click',()=>showScreen('welcome'));
musicBtn.addEventListener('click', async()=>{
  if(music.paused){
    try { await music.play(); musicLabel.textContent='Music On'; musicBtn.innerHTML='♫ <span id="musicLabel">Music On</span>'; }
    catch(e){ alert('মিউজিক চালাতে একই ফোল্ডারে music.mp3 নামে একটি MP3 ফাইল যোগ করুন।'); }
  } else {music.pause(); musicLabel.textContent='Music Off'; musicBtn.innerHTML='♫ <span id="musicLabel">Music Off</span>';}
});
document.querySelectorAll('.photo-card input').forEach(input=>{
  input.addEventListener('change',()=>{
    const file=input.files && input.files[0]; if(!file) return;
    const card=input.closest('.photo-card');
    const reader=new FileReader();
    reader.onload=()=>{card.style.backgroundImage=`linear-gradient(#17041935,#17041975),url("${reader.result}")`;card.classList.add('has-image');card.querySelector('.photo-placeholder').textContent='♥';card.querySelector('small').textContent='ছবি যোগ হয়েছে';};
    reader.readAsDataURL(file);
  });
});
