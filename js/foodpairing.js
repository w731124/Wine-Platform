/* ════════════════════════════════════
   FOOD PAIRING — 品種反查工具
════════════════════════════════════ */
const FOOD_CATEGORY_MAP = {
  'red-meat':    { label: 'Red Meat & Game(紅肉與野味)', tags: ['Red Meat(紅肉)', 'Lamb(羊肉)', 'Game(野味)', 'Duck(鴨肉)'] },
  'white-meat':  { label: 'White Meat & Poultry(白肉與禽肉)', tags: ['White Meat(白肉)', 'Poultry(禽肉)', 'Pork(豬肉)', 'Roasted Poultry(烤禽肉)'] },
  'seafood':     { label: 'Seafood(海鮮)', tags: ['Seafood(海鮮)', 'Shellfish(甲殼海鮮)', 'Oysters(生蠔)', 'Roasted Salmon(烤鮭魚)'] },
  'cheese':      { label: 'Cheese(起司)', tags: ['Cheese(起司)', 'Hard Cheese(硬質起司)', 'Soft Cheese(軟質起司)', 'Blue Cheese(藍紋起司)', 'Goat Cheese(山羊起司)'] },
  'vegetable':   { label: 'Vegetable & Mushroom(蔬食與菇蕈)', tags: ['Vegetable(蔬食)', 'Salad(沙拉)', 'Light Salad(清爽沙拉)', 'Asparagus(蘆筍)', 'Mushroom(蘑菇)', 'Mushroom Umami(蕈菇鮮味)', 'Truffle(松露)', 'Risotto(燉飯)'] },
  'charcuterie': { label: 'Charcuterie & Appetizer(醃肉與開胃菜)', tags: ['Charcuterie(醃肉拼盤)', 'Cured Meat(醃肉)', 'Appetizer(開胃菜)', 'Light Appetizer(清淡開胃菜)', 'Tapas(西班牙小吃)', 'Nuts(堅果)'] },
  'asian-spicy':  { label: 'Asian & Spicy Cuisine(亞洲與辛香料理)', tags: ['Asian Cuisine(亞洲料理)', 'Spicy Asian(亞洲辛香料理)', 'Spicy(辛香料)', 'Light Spicy(微辣)'] },
  'dessert':     { label: 'Dessert & Fruit(甜點與水果)', tags: ['Fruit Dessert(水果甜點)', 'Light Dessert(清爽甜點)', 'Dark Chocolate(黑巧克力)', 'Fruit(水果)'] },
  'umami':       { label: 'Umami & Special Ingredients(鮮味與特殊食材)', tags: ['Foie Gras(鵝肝)', 'Umami(鮮味)', 'Salty(鹹鮮)', 'Pizza(披薩)'] },
};

let curFoodCategory = null;

function renderFoodCategoryFilters() {
  const wrap = document.getElementById('fp-category-filters');
  if (!wrap) return;
  wrap.innerHTML = Object.keys(FOOD_CATEGORY_MAP).map(key => {
    const cat = FOOD_CATEGORY_MAP[key];
    return `<button class="fp fp-basis" onclick="setFoodCategory('${key}',this)">${cat.label}</button>`;
  }).join('');
}

function setFoodCategory(key, btn) {
  curFoodCategory = key;
  const wrap = document.getElementById('fp-category-filters');
  if (wrap) wrap.querySelectorAll('.fp').forEach(b => b.classList.remove('active'));
  if (btn) btn.classList.add('active');
  renderFoodPairingResults();
}

function renderFoodPairingResults() {
  const resultWrap = document.getElementById('fp-grape-results');
  if (!resultWrap) return;
  if (!curFoodCategory) {
    resultWrap.innerHTML = '<p style="font-size:11.5px;color:var(--txt4);">請先選擇上方的食物大類。</p>';
    return;
  }
  const tags = FOOD_CATEGORY_MAP[curFoodCategory].tags;
  const matches = (WINE_DB.grapes || []).filter(g => (g.foodPairingTags || []).some(t => tags.includes(t)));
  if (matches.length === 0) {
    resultWrap.innerHTML = '<p style="font-size:11.5px;color:var(--txt4);">目前沒有符合的品種。</p>';
    return;
  }
  resultWrap.innerHTML = matches.map(g =>
    `<span class="tg tg-food" style="cursor:pointer;text-decoration:underline;" onclick="jumpToGrapeById('${g.id}')">${g.name}</span>`
  ).join('');
}
