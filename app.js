const concepts = {
  clinic: { number:'01', title:'Help cute pets.<br><em>Learn new words!</em>', text:'Pick a pet, find the right letters, and make your new friend smile again!', games:[['A','Animal ABC','Find the first letter of each animal','STARTER','#34d6c5'],['B','Bunny Words','Put easy words in the right order','EASY','#ff7a70'],['C','Cat Scan','Spot the hidden letters in each word','BRAVE','#ffc83d']]},
  islands: { number:'02', title:'Sail away to<br><em>Alphabet Island!</em>', text:'Follow the bright map, play sunny word games, and find a treasure full of letters.', games:[['O','Ocean Letters','Catch the vowels in the blue waves','STARTER','#28bde9'],['P','Pirate Words','Build a word to open the treasure','EASY','#ff6378'],['S','Sunny Sounds','Match each sound with a simple word','BRAVE','#ffbe2e']]},
  city: { number:'03', title:'Build your own<br><em>Happy Word Town!</em>', text:'Every new word makes a colorful home, shop, or friendly town helper.', games:[['D','Dream House','Pick letters to finish the little house','STARTER','#5bd25c'],['B','Bus Stop','Drive the bus to the right word','EASY','#ff812e'],['T','Town Sounds','Sort words into their sound streets','BRAVE','#39b9ec']]},
  space: { number:'04', title:'Blast off on a<br><em>Space Word Trip!</em>', text:'Ready your rocket, visit new planets, and meet letters from across the galaxy.', games:[['M','Moon Match','Join two sounds to make a word','STARTER','#735cf1'],['S','Star Finder','Find simple words in the stars','EASY','#f056b1'],['P','Planet P','Pack words that start with P','BRAVE','#2dd4bb']]},
  lab: { number:'05', title:'Mix, pop, and make<br><em>magic new words!</em>', text:'Play with sounds, grow silly words, and make a bright discovery in every game.', games:[['B','Bubble Mixer','Mix the letters to make a word','STARTER','#2ed79d'],['S','Sound Lab','Listen and choose the matching word','EASY','#9d56e5'],['W','Wow Words','Try a fun test with new words','BRAVE','#ffbf24']]}
};

const grid = document.querySelector('#gameGrid');
const dialog = document.querySelector('#gameDialog');
const words = {
  A:['Apple','Dog','Sun'], B:['Ball','Cat','Fish'], C:['Cake','Moon','Tree'], O:['Orange','Bus','Star'],
  P:['Panda','House','Duck'], S:['Sun','Apple','Fox'], D:['Dog','Moon','Ball'], T:['Tiger','Fish','Cake'],
  M:['Moon','Sun','Cat'], W:['Water','Dog','Tree']
};
let stars = Number(localStorage.getItem('bukvapark-stars') || 12);
document.querySelector('.profile b').textContent=stars;

function render(theme){
  const data=concepts[theme]; document.body.dataset.theme=theme;
  document.querySelector('#conceptNumber').textContent=`WORLD ${data.number}`;
  document.querySelector('#heroTitle').innerHTML=data.title; document.querySelector('#heroText').textContent=data.text;
  grid.innerHTML=data.games.map((g,i)=>`<article class="card" style="--card-bg:${g[4]};--tilt:${i%2?'4deg':'-4deg'}"><div class="card__art"><span class="art-sticker">${['WOW!','GO!','YAY!'][i]}</span><span class="letter">${g[0]}</span></div><div class="card__body"><div class="card__meta"><span class="pill">${g[3]}</span><span>★ ${i+2} STARS</span></div><h3>${g[1]}</h3><p>${g[2]}</p><button class="play" type="button" data-letter="${g[0]}" data-title="${g[1]}"><span>Play now</span><span>▶</span></button></div></article>`).join('');
  document.querySelectorAll('.concept-tab').forEach(t=>t.classList.toggle('is-active',t.dataset.theme===theme));
}
document.querySelectorAll('.concept-tab').forEach(tab=>tab.addEventListener('click',()=>render(tab.dataset.theme)));
grid.addEventListener('click',(event)=>{
  const button=event.target.closest('.play'); if(!button)return;
  const letter=button.dataset.letter; const variants=words[letter];
  document.querySelector('#dialogTitle').textContent=button.dataset.title;
  document.querySelector('#dialogPrompt').textContent=`Which word starts with “${letter}”?`;
  document.querySelector('#gameResult').textContent='';
  document.querySelector('#answers').innerHTML=variants.sort(()=>Math.random()-.5).map(word=>`<button type="button" data-correct="${word[0]===letter}">${word}</button>`).join('');
  dialog.showModal();
});
document.querySelector('#answers').addEventListener('click',(event)=>{
  if(event.target.tagName!=='BUTTON')return;
  const correct=event.target.dataset.correct==='true';
  document.querySelector('#gameResult').textContent=correct?'Great job! You won a star! ⭐':'Nice try! Pick one more.';
  event.target.classList.add(correct?'is-correct':'is-wrong');
  if(correct){stars+=1;localStorage.setItem('bukvapark-stars',stars);document.querySelector('.profile b').textContent=stars;document.querySelectorAll('#answers button').forEach(b=>b.disabled=true);}
});
document.querySelector('.dialog-close').addEventListener('click',()=>dialog.close());
dialog.addEventListener('click',(event)=>{if(event.target===dialog)dialog.close();});
render('clinic');
