const concepts = {
  clinic: { number:'01', title:'Лечим слова<br><em>буква за буквой!</em>', text:'Выбирай пациента, собирай нужные буквы и возвращай зверятам отличное настроение.', games:[['А','Скорая буква','Помоги щенку найти первую букву слова','НОВИЧОК','#68d2c4'],['Ж','Слово-рецепт','Собери лекарство из букв по порядку','СРЕДНИЙ','#ff9b68'],['Р','Рентген слов','Найди спрятавшиеся внутри слова буквы','СМЕЛЫЙ','#f5c852']]},
  islands: { number:'02', title:'Открывай<br><em>острова букв!</em>', text:'Плыви по красочной карте, выполняй задания и собирай свою команду исследователей.', games:[['О','Бухта гласных','Лови звонкие гласные в морской пене','ЛЕГКО','#51bfe2'],['К','Кокосовый код','Составляй слова и открывай сундуки','СРЕДНИЙ','#ff797b'],['Я','Маяк «Я»','Освети только слова на нужную букву','СМЕЛЫЙ','#f2bf3f']]},
  city: { number:'03', title:'Построй свой<br><em>Буквоград!</em>', text:'Каждое новое слово превращается в дом, магазин или весёлого жителя твоего города.', games:[['Д','Дом для слова','Подбери буквы и дострой яркий дом','ЛЕГКО','#68c96e'],['М','Маршрут слов','Проведи автобус по правильным слогам','СРЕДНИЙ','#ff934d'],['Ш','Шумная площадь','Рассели слова по звукам и районам','СМЕЛЫЙ','#55bfe0']]},
  space: { number:'04', title:'Запускаем<br><em>слова в космос!</em>', text:'Настраивай ракету, исследуй планеты и знакомься с буквами далёкой галактики.', games:[['Л','Лунный слог','Соедини капсулы в правильный слог','ЛЕГКО','#7764e8'],['З','Звёздный радар','Отыщи слова среди созвездий','СРЕДНИЙ','#eb62ae'],['П','Планета «П»','Засели планету словами на одну букву','СМЕЛЫЙ','#42cfba']]},
  lab: { number:'05', title:'Смешивай<br><em>формулы слов!</em>', text:'Экспериментируй со звуками, выращивай слова и получай весёлые научные открытия.', games:[['Б','Буквомиксер','Смешай буквы и получи новое слово','ЛЕГКО','#45d3a0'],['Ф','Формула звука','Сравни произношение и выбери ответ','СРЕДНИЙ','#995cdd'],['Э','Эврика!','Проведи опыт со сложными словами','СМЕЛЫЙ','#f0be3c']]}
};

const grid = document.querySelector('#gameGrid');
const dialog = document.querySelector('#gameDialog');
const words = {
  'А':['Арбуз','Кот','Дом'], 'Ж':['Жираф','Мяч','Сок'], 'Р':['Ракета','Лиса','Чай'],
  'О':['Облако','Рыба','Мак'], 'К':['Корабль','Утка','Лев'], 'Я':['Яблоко','Сыр','Кит'],
  'Д':['Дом','Сова','Мир'], 'М':['Машина','Жук','Рот'], 'Ш':['Шар','Нос','Лук'],
  'Л':['Луна','Сад','Кот'], 'З':['Звезда','Мяч','Дом'], 'П':['Планета','Кит','Река'],
  'Б':['Банан','Сыр','Мак'], 'Ф':['Филин','Дом','Кот'], 'Э':['Экран','Лук','Мяч']
};
let stars = Number(localStorage.getItem('bukvapark-stars') || 12);
document.querySelector('.profile b').textContent=stars;

function render(theme){
  const data=concepts[theme]; document.body.dataset.theme=theme;
  document.querySelector('#conceptNumber').textContent=`КОНЦЕПТ ${data.number}`;
  document.querySelector('#heroTitle').innerHTML=data.title; document.querySelector('#heroText').textContent=data.text;
  grid.innerHTML=data.games.map((g,i)=>`<article class="card" style="--card-bg:${g[4]};--tilt:${i%2?'4deg':'-4deg'}"><div class="card__art"><span class="letter">${g[0]}</span></div><div class="card__body"><div class="card__meta"><span class="pill">${g[3]}</span><span>★ ${i+2} НАГРАДЫ</span></div><h3>${g[1]}</h3><p>${g[2]}</p><button class="play" type="button" data-letter="${g[0]}" data-title="${g[1]}"><span>Играть</span><span>▶</span></button></div></article>`).join('');
  document.querySelectorAll('.concept-tab').forEach(t=>t.classList.toggle('is-active',t.dataset.theme===theme));
}
document.querySelectorAll('.concept-tab').forEach(tab=>tab.addEventListener('click',()=>render(tab.dataset.theme)));
grid.addEventListener('click',(event)=>{
  const button=event.target.closest('.play'); if(!button)return;
  const letter=button.dataset.letter; const variants=words[letter];
  document.querySelector('#dialogTitle').textContent=button.dataset.title;
  document.querySelector('#dialogPrompt').textContent=`Какое слово начинается на букву «${letter}»?`;
  document.querySelector('#gameResult').textContent='';
  document.querySelector('#answers').innerHTML=variants.sort(()=>Math.random()-.5).map(word=>`<button type="button" data-correct="${word[0]===letter}">${word}</button>`).join('');
  dialog.showModal();
});
document.querySelector('#answers').addEventListener('click',(event)=>{
  if(event.target.tagName!=='BUTTON')return;
  const correct=event.target.dataset.correct==='true';
  document.querySelector('#gameResult').textContent=correct?'Верно! Ты получаешь звезду ⭐':'Почти! Попробуй ещё раз';
  event.target.classList.add(correct?'is-correct':'is-wrong');
  if(correct){stars+=1;localStorage.setItem('bukvapark-stars',stars);document.querySelector('.profile b').textContent=stars;document.querySelectorAll('#answers button').forEach(b=>b.disabled=true);}
});
document.querySelector('.dialog-close').addEventListener('click',()=>dialog.close());
dialog.addEventListener('click',(event)=>{if(event.target===dialog)dialog.close();});
render('clinic');
