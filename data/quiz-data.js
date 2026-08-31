// QUIZ_BANK — 自我測驗題庫（Phase 0 資料結構 + LO6 pilot 24題 + Phase 1 LO1 30題；54題正解位置已洗牌打散）
// schema: id / lo / sourceType / sourceId / question / options[4] / correctIndex / explanation
const QUIZ_BANK = [
  {
    id: 'lo6-001',
    lo: 6,
    sourceType: 'static-panel',
    sourceId: 'storage-conditions',
    question: '為什麼葡萄酒儲存時，溫度的「穩定性」比「精確數值」更重要？',
    options: [
      '因為葡萄酒在任何溫度都持續熟成波動只會加快',
      '因為只要低於20°C溫度高低沒影響',
      '因為溫度波動只影響白酒',
      '因為反覆溫度波動會加速氧化並使軟木塞失去密封彈性'
    ],
    correctIndex: 3,
    explanation: '溫度反覆劇烈波動即使在合理範圍內，也比單純偏高更容易加速氧化並讓軟木塞逐漸失去密封彈性。'
  },
  {
    id: 'lo6-002',
    lo: 6,
    sourceType: 'static-panel',
    sourceId: 'storage-conditions',
    question: '「光害（Lightstrike）」對以下哪一類酒款影響最明顯？',
    options: [
      '使用旋蓋封瓶的酒款',
      '裝在深色玻璃瓶的濃郁紅酒',
      '加烈酒',
      '裝在透明或淺色玻璃瓶的粉紅酒與部分白酒'
    ],
    correctIndex: 3,
    explanation: '紫外線與強光對透明或淺色玻璃瓶酒款更敏感，會產生濕羊毛、大蒜等異味。'
  },
  {
    id: 'lo6-003',
    lo: 6,
    sourceType: 'static-panel',
    sourceId: 'storage-conditions',
    question: '軟木塞封瓶的葡萄酒建議平躺存放，主要原因是？',
    options: [
      '平躺能加速陳年熟成',
      '平躺可節省空間',
      '讓酒液持續浸潤軟木塞，防止乾縮變硬、氧氣滲入',
      '讓標籤朝上以利辨識'
    ],
    correctIndex: 2,
    explanation: '軟木塞需持續接觸酒液才能保持彈性密封；旋蓋或合成塞無此需求。'
  },
  {
    id: 'lo6-004',
    lo: 6,
    sourceType: 'static-panel',
    sourceId: 'storage-conditions',
    question: '建議的葡萄酒儲存濕度區間為何？',
    options: [
      '濕度沒有影響',
      '20–40%',
      '50–80%',
      '90–100%'
    ],
    correctIndex: 2,
    explanation: '濕度過低使軟木塞乾裂，過高導致標籤發霉。'
  },
  {
    id: 'lo6-005',
    lo: 6,
    sourceType: 'static-panel',
    sourceId: 'storage-preservation',
    question: '真空幫浦系統（如Vacu Vin）保存開瓶酒的原理與限制？',
    options: [
      '完全排除氧氣可保存數月',
      '抽出部分空氣降低氧氣含量但無法完全排除，通常延長1–3天',
      '透過降溫達到保存效果與氧氣無關',
      '注入惰性氣體覆蓋酒液表面'
    ],
    correctIndex: 1,
    explanation: '真空幫浦成本低操作簡單，但效果有限。'
  },
  {
    id: 'lo6-006',
    lo: 6,
    sourceType: 'static-panel',
    sourceId: 'storage-preservation',
    question: 'Coravin這類惰性氣體系統的保存效果與操作特點？',
    options: [
      '延長1–3天，需完全拔出軟木塞',
      '延長數週甚至數月，細針穿刺軟木塞取酒並注入氬氣，全程不需拔出軟木塞',
      '延長約1週，需倒入其他容器',
      '無法延長賞味期'
    ],
    correctIndex: 1,
    explanation: 'Coravin可多次取用且大幅延長高單價酒款賞味期。'
  },
  {
    id: 'lo6-007',
    lo: 6,
    sourceType: 'static-panel',
    sourceId: 'storage-preservation',
    question: '關於紅酒開瓶後的保存方式？',
    options: [
      '冷藏與否沒有差異',
      '應存放於高於室溫環境',
      '紅酒不能冷藏會破壞風味',
      '開瓶後應盡快冷藏即使紅酒也建議如此，飲用前回溫即可'
    ],
    correctIndex: 3,
    explanation: '冷藏能有效減緩氧化與細菌活動，常被誤解為「紅酒不能冰」。'
  },
  {
    id: 'lo6-008',
    lo: 6,
    sourceType: 'static-panel',
    sourceId: 'storage-temp',
    question: '氣泡酒建議的侍酒溫度區間？',
    options: [
      '6–8°C',
      '10–13°C',
      '13–15°C',
      '16–18°C'
    ],
    correctIndex: 0,
    explanation: '低溫抑制氣泡過快散失、維持清爽口感。'
  },
  {
    id: 'lo6-009',
    lo: 6,
    sourceType: 'static-panel',
    sourceId: 'storage-temp',
    question: '哪一組酒款建議侍酒溫度同為7–10°C？',
    options: [
      '清淡不甜白酒/粉紅酒與不甜型加烈酒（如Fino雪莉）',
      '清淡型紅酒與濃郁型紅酒',
      '濃郁型白酒與濃郁型紅酒',
      '氣泡酒與甜型加烈酒'
    ],
    correctIndex: 0,
    explanation: 'Fino、Manzanilla等不甜型加烈酒與清淡白酒同屬此區間。'
  },
  {
    id: 'lo6-010',
    lo: 6,
    sourceType: 'static-panel',
    sourceId: 'storage-temp',
    question: '白布根地（多數Chardonnay）建議侍酒溫度？',
    options: [
      '6–8°C',
      '13–15°C',
      '7–10°C',
      '10–13°C'
    ],
    correctIndex: 3,
    explanation: '濃郁型／經橡木桶白酒建議10–13°C。'
  },
  {
    id: 'lo6-011',
    lo: 6,
    sourceType: 'static-panel',
    sourceId: 'storage-temp',
    question: 'Port（波特酒）建議侍酒溫度與哪類酒款相同？',
    options: [
      '清淡型紅酒',
      '濃郁型紅酒（如Cabernet Sauvignon）',
      '清淡不甜白酒',
      '氣泡酒'
    ],
    correctIndex: 1,
    explanation: '甜型加烈酒與濃郁型紅酒同屬16–18°C，皆為微涼室溫而非現代空調房間室溫。'
  },
  {
    id: 'lo6-012',
    lo: 6,
    sourceType: 'static-panel',
    sourceId: 'storage-temp',
    question: '薄酒萊（Gamay）建議侍酒溫度？',
    options: [
      '13–15°C',
      '10–13°C',
      '16–18°C',
      '7–10°C'
    ],
    correctIndex: 0,
    explanation: '清淡型紅酒建議13–15°C。'
  },
  {
    id: 'lo6-013',
    lo: 6,
    sourceType: 'static-panel',
    sourceId: 'storage-decanting',
    question: '開瓶時聞軟木塞氣味的目的？',
    options: [
      '判斷產區',
      '確認軟木塞材質',
      '判斷陳年時間',
      '若有濕紙板/發霉味是軟木塞污染警訊之一'
    ],
    correctIndex: 3,
    explanation: '濕紙板/發霉味是TCA污染常見警訊。'
  },
  {
    id: 'lo6-014',
    lo: 6,
    sourceType: 'static-panel',
    sourceId: 'storage-decanting',
    question: '開啟氣泡酒的正確程序？',
    options: [
      '直接用螺旋錐鑽穿軟木塞',
      '用力搖晃後快速拔出軟木塞',
      '撕除錫箔鬆開鐵絲籠時全程壓住軟木塞，瓶身傾斜45度轉動瓶身讓塞子發出輕柔嘆息聲',
      '開瓶前先冷凍瓶身'
    ],
    correctIndex: 2,
    explanation: '瓶內壓力可能隨時噴出塞子，須全程壓住並轉動瓶身而非塞子。'
  },
  {
    id: 'lo6-015',
    lo: 6,
    sourceType: 'static-panel',
    sourceId: 'storage-decanting',
    question: '醒酒的兩種主要目的？',
    options: [
      '提高酒精濃度與加速陳年',
      '分離陳年老酒沉澱物，以及為年輕高單寧紅酒換氣軟化單寧',
      '去除軟木塞污染與延緩氧化',
      '降低酒液溫度與增加氣泡'
    ],
    correctIndex: 1,
    explanation: '兩種目的分別對應老酒與年輕酒不同需求。'
  },
  {
    id: 'lo6-016',
    lo: 6,
    sourceType: 'static-panel',
    sourceId: 'storage-decanting',
    question: '醒酒時機的正確敘述？',
    options: [
      '所有酒款都不建議醒酒',
      '醒酒只適用白酒',
      '老酒香氣脆弱建議臨飲用前才醒酒且時間宜短，年輕高單寧紅酒可提前數小時甚至更早',
      '老酒與年輕紅酒都建議提前數小時'
    ],
    correctIndex: 2,
    explanation: '老酒求「短」、年輕高單寧酒求「久」。'
  },
  {
    id: 'lo6-017',
    lo: 6,
    sourceType: 'static-panel',
    sourceId: 'storage-decanting',
    question: '為什麼紅酒杯通常比白酒杯大？',
    options: [
      '白酒杯較小為防止氣泡散失',
      '紅酒杯需容納更多酒液',
      '純粹傳統習慣無實質功能',
      '紅酒杯較大以利香氣揮發，白酒杯較小以維持冰鎮溫度'
    ],
    correctIndex: 3,
    explanation: '杯型設計依酒款特性而異。'
  },
  {
    id: 'lo6-018',
    lo: 6,
    sourceType: 'static-panel',
    sourceId: 'storage-faults',
    question: '軟木塞因儲存濕度不足而乾裂，最可能導致？',
    options: [
      '軟木塞污染（TCA）與封瓶失效/氧化',
      '二氧化硫過量',
      '熱害（Maderisation）',
      '揮發性酸過高'
    ],
    correctIndex: 0,
    explanation: '濕度不足使軟木塞乾裂，可能引發TCA污染或密封失效導致氧化。'
  },
  {
    id: 'lo6-019',
    lo: 6,
    sourceType: 'static-panel',
    sourceId: 'storage-faults',
    question: '「熱害（Heat Damage/Maderisation）」的成因與徵狀？',
    options: [
      '長期暴露過高溫度或劇烈溫度波動，產生煮熟水果、焦糖甚至醬油氣味，瓶身可能滲液或軟木塞被推出',
      '二氧化硫添加不足導致氧化',
      '瓶身直立導致軟木塞乾燥',
      '軟木塞受TCA污染產生濕紙板氣味'
    ],
    correctIndex: 0,
    explanation: '熱害由運輸/存放環境溫度不當所致。'
  },
  {
    id: 'lo6-020',
    lo: 6,
    sourceType: 'static-panel',
    sourceId: 'storage-faults',
    question: '瓶身直立存放對軟木塞封瓶酒款最可能造成？',
    options: [
      '軟木塞未持續接觸酒液而乾燥龜裂，導致封瓶失效氧氣滲入',
      '提高酒精濃度',
      '加速陳年熟成',
      '沒有任何影響'
    ],
    correctIndex: 0,
    explanation: '軟木塞需持續浸潤才能維持密封彈性。'
  },
  {
    id: 'lo6-021',
    lo: 6,
    sourceType: 'data-object',
    sourceId: 'foodpairing-tags',
    question: '生蠔、烤鮭魚一類海鮮料理通常歸類在哪個食物搭配大類？',
    options: [
      'Red Meat & Game(紅肉與野味)',
      'Charcuterie & Appetizer(醃肉與開胃菜)',
      'Umami & Special Ingredients(鮮味與特殊食材)',
      'Seafood(海鮮)'
    ],
    correctIndex: 3,
    explanation: '對應FOOD_CATEGORY_MAP中\'seafood\'分類。'
  },
  {
    id: 'lo6-022',
    lo: 6,
    sourceType: 'data-object',
    sourceId: 'foodpairing-tags',
    question: '鵝肝與瑪格麗特披薩歸為哪一類？',
    options: [
      'Vegetable & Mushroom(蔬食與菇蕈)',
      'Umami & Special Ingredients(鮮味與特殊食材)',
      'White Meat & Poultry(白肉與禽肉)',
      'Dessert & Fruit(甜點與水果)'
    ],
    correctIndex: 1,
    explanation: '對應FOOD_CATEGORY_MAP中\'umami\'分類。'
  },
  {
    id: 'lo6-023',
    lo: 6,
    sourceType: 'wset-spec-supplement',
    sourceId: 'food-wine-interactions',
    question: '下列何者不屬於WSET官方列出的「會影響葡萄酒的食物成分」？',
    options: [
      '辣度（Chilli heat）',
      '鮮味（Umami）',
      '單寧（Tannin）',
      '甜度（Sweetness）'
    ],
    correctIndex: 2,
    explanation: '官方食物端因子為甜度/鮮味/酸度/鹹度/風味濃度/脂肪/辣度；單寧屬酒液端被影響成分，非食物成分。'
  },
  {
    id: 'lo6-024',
    lo: 6,
    sourceType: 'wset-spec-supplement',
    sourceId: 'food-wine-interactions',
    question: '下列何者屬於WSET官方列出的「會被食物影響的葡萄酒成分」？',
    options: [
      '脂肪（Fat）',
      '鹹度（Salt）',
      '辣度（Chilli heat）',
      '苦味（來自單寧或橡木桶）'
    ],
    correctIndex: 3,
    explanation: '官方酒液端因子為甜度/酸度/苦味(單寧/橡木桶)/果香度/酒精；脂肪、鹹度、辣度屬食物端因子。'
  },
  {
    id: 'lo1-001',
    lo: 1,
    sourceType: 'wset-spec-supplement',
    sourceId: 'grape-parts',
    question: '葡萄果皮（skin）主要提供釀酒師哪些成分？',
    options: [
      '糖分、酸度、水分',
      '單寧、酸度、糖分',
      '色澤、單寧、風味物質',
      '僅有色澤與水分'
    ],
    correctIndex: 2,
    explanation: '官方規格明列果皮提供Colour, Tannins, Flavours；糖分、酸度、水分主要來自果肉，屬常見混淆點。'
  },
  {
    id: 'lo1-002',
    lo: 1,
    sourceType: 'wset-spec-supplement',
    sourceId: 'grape-parts',
    question: '葡萄果肉（pulp）主要提供哪些成分？',
    options: [
      '色澤、單寧、糖分、水分',
      '單寧、酸度、色澤、水分',
      '糖分、酸度、水分、風味物質',
      '僅有糖分與酸度兩項'
    ],
    correctIndex: 2,
    explanation: '果肉提供Sugar, Acids, Water, Flavours；單寧與色澤主要來自果皮，屬常見混淆點。'
  },
  {
    id: 'lo1-003',
    lo: 1,
    sourceType: 'wset-spec-supplement',
    sourceId: 'vine-requirements',
    question: '葡萄藤生長所需的基本要素為何？',
    options: [
      '溫暖度、日照、水分、養分、二氧化碳',
      '溫暖度、日照、水分、氧氣、氮氣',
      '日照、水分、養分、氧氣、風速',
      '溫暖度、水分、養分、二氧化碳、氧氣'
    ],
    correctIndex: 0,
    explanation: '官方規格列出五項：Warmth, Sunlight, Water, Nutrients, CO2；氧氣、氮氣、風速均非官方明列要素。'
  },
  {
    id: 'lo1-004',
    lo: 1,
    sourceType: 'wset-spec-supplement',
    sourceId: 'vine-requirements',
    question: '葡萄藤透過光合作用主要利用哪一種氣體轉化為養分？',
    options: [
      '二氧化碳',
      '氧氣',
      '氮氣',
      '氬氣'
    ],
    correctIndex: 0,
    explanation: 'CO2是葡萄藤生長所需的關鍵氣體要素之一，用於光合作用。'
  },
  {
    id: 'lo1-005',
    lo: 1,
    sourceType: 'wset-spec-supplement',
    sourceId: 'grape-ripening-stages',
    question: '葡萄形成的三個依序階段為何？',
    options: [
      '轉色（véraison）→開花（flowering）→坐果（fruit set）',
      '坐果（fruit set）→轉色（véraison）→開花（flowering）',
      '開花（flowering）→坐果（fruit set）→轉色（véraison）',
      '開花（flowering）→轉色（véraison）→坐果（fruit set）'
    ],
    correctIndex: 2,
    explanation: '官方規格明列葡萄形成階段依序為flowering, fruit set, véraison；其餘選項為順序錯置。'
  },
  {
    id: 'lo1-006',
    lo: 1,
    sourceType: 'wset-spec-supplement',
    sourceId: 'grape-ripening-stages',
    question: '「Véraison（轉色期）」指的是什麼？',
    options: [
      '葡萄藤進行冬季修剪、去除多餘枝條的階段',
      '葡萄開始轉色、正式進入成熟期的階段',
      '葡萄採收後進入酒槽發酵轉化的階段',
      '葡萄藤萌芽開花、準備授粉結果的階段'
    ],
    correctIndex: 1,
    explanation: 'véraison是葡萄由綠轉色、正式進入成熟過程的轉折點，與修剪、發酵、開花階段不同。'
  },
  {
    id: 'lo1-007',
    lo: 1,
    sourceType: 'wset-spec-supplement',
    sourceId: 'grape-ripening-stages',
    question: '官方規格將葡萄熟度分為哪三種類型？',
    options: [
      '發酵前（pre-fermentation）、發酵中、發酵後',
      '未熟（unripe）、成熟（ripe）、極熟（extra-ripe）',
      '採收前（pre-harvest）、採收中、採收後',
      '生澀（unripe fault）、成熟、過熟腐敗（rot）'
    ],
    correctIndex: 1,
    explanation: '官方規格明列Unripe grapes, Ripe grapes, Extra-ripe grapes；extra-ripe包含晚摘、風乾等極熟型態。'
  },
  {
    id: 'lo1-008',
    lo: 1,
    sourceType: 'wset-spec-supplement',
    sourceId: 'grape-ripening-changes',
    question: '葡萄在成熟過程中，糖分與酸度的變化趨勢為何？',
    options: [
      '糖分上升、酸度下降',
      '糖分與酸度皆維持不變',
      '糖分下降、酸度上升',
      '糖分與酸度皆持續上升'
    ],
    correctIndex: 0,
    explanation: '隨葡萄成熟，光合作用累積糖分使糖度上升，同時酸度因呼吸作用消耗而下降。'
  },
  {
    id: 'lo1-009',
    lo: 1,
    sourceType: 'wset-spec-supplement',
    sourceId: 'grape-ripening-changes',
    question: '葡萄成熟過程中，單寧的變化趨勢為何？',
    options: [
      '單寧含量與成熟度變化並無明顯關聯',
      '單寧含量與澀感隨成熟度增加而持續上升',
      '單寧僅存在於白葡萄品種中，紅葡萄無單寧',
      '單寧隨成熟度增加而逐漸軟化、澀感降低'
    ],
    correctIndex: 3,
    explanation: '成熟度提升時單寧會逐漸軟化，澀感降低；紅、白葡萄皆含單寧，僅白酒釀造多不萃取果皮單寧。'
  },
  {
    id: 'lo1-010',
    lo: 1,
    sourceType: 'wset-spec-supplement',
    sourceId: 'grape-ripening-changes',
    question: '白葡萄與黑葡萄在成熟過程中的香氣/風味變化，官方規格的描述方式為何？',
    options: [
      '官方僅針對黑葡萄列出香氣變化模式，白葡萄未提及',
      '官方分別列出白葡萄與黑葡萄各自的香氣變化模式',
      '官方認為兩者香氣變化模式完全相同，不須區分',
      '官方規格中香氣變化僅與品種無關，只與產區有關'
    ],
    correctIndex: 1,
    explanation: '規格中將白葡萄與黑葡萄的香氣風味變化分開列出兩個子項目，兩者變化模式不完全相同。'
  },
  {
    id: 'lo1-011',
    lo: 1,
    sourceType: 'wset-spec-supplement',
    sourceId: 'environmental-influences',
    question: '官方規格將葡萄種植氣候分為哪三種基本類型？',
    options: [
      '乾燥（dry）、潮濕（humid）、適中（medium）',
      '熱帶（tropical）、溫帶（temperate）、寒帶（frigid）',
      '高緯（high latitude）、中緯、低緯（low latitude）',
      '涼爽（cool）、溫和（moderate）、溫暖（warm）'
    ],
    correctIndex: 3,
    explanation: '官方規格General climatic influences明列Cool, Moderate, Warm三類。'
  },
  {
    id: 'lo1-012',
    lo: 1,
    sourceType: 'wset-spec-supplement',
    sourceId: 'environmental-influences',
    question: '下列何者不屬於官方規格列出的「其他氣候影響因素」？',
    options: [
      '緯度（latitude）與海拔（altitude）',
      '坡度（slope）與朝向（aspect）',
      '山脈（mountains）與土壤（soils）',
      '葡萄藤修剪方式（pruning method）'
    ],
    correctIndex: 3,
    explanation: '修剪方式屬於「種植選項」，不屬於「其他氣候影響因素」；官方此項列出latitude, altitude, mountains, slope, aspect, soils, seas, rivers, air, fog, cloud, mist。'
  },
  {
    id: 'lo1-013',
    lo: 1,
    sourceType: 'wset-spec-supplement',
    sourceId: 'environmental-influences',
    question: '鄰近海洋或大型湖泊對葡萄園氣候的主要調節作用是什麼？',
    options: [
      '完全不影響葡萄園氣候，僅影響土壤排水',
      '只影響區域降雨量，與溫度調節無關',
      '具有調節溫度的作用，通常使氣候更溫和穩定',
      '使氣候更趨極端，日夜溫差因此擴大'
    ],
    correctIndex: 2,
    explanation: '水體具有蓄熱與釋熱的調節效果，鄰近海洋/湖泊/河流通常使區域氣候溫差較小。'
  },
  {
    id: 'lo1-014',
    lo: 1,
    sourceType: 'wset-spec-supplement',
    sourceId: 'environmental-influences',
    question: '晨霧（fog/mist）對葡萄園最主要的潛在影響為何（尤其貴腐甜酒產區）？',
    options: [
      '可能促進貴腐黴（Botrytis）生長，並調節溫度',
      '只會延後採收時間，對釀酒品質沒有幫助',
      '對葡萄生長與最終品質完全沒有影響',
      '只會加速葡萄腐敗，對釀酒毫無益處可言'
    ],
    correctIndex: 0,
    explanation: '晨霧提供的濕度是貴腐黴生長的關鍵條件之一（如Sauternes、Tokaj），也具有調節溫度的作用。'
  },
  {
    id: 'lo1-015',
    lo: 1,
    sourceType: 'wset-spec-supplement',
    sourceId: 'weather-influences',
    question: '下列何者屬於官方規格列出的「天氣影響因素」？',
    options: [
      '修剪、灌溉、疏葉、套袋、施肥、除草',
      '乾旱、霜害、冰雹、降雨、日照、溫度',
      '緯度、海拔、坡度、朝向、土壤、水系',
      '發酵溫度、浸皮、榨汁、下膠、過濾、裝瓶'
    ],
    correctIndex: 1,
    explanation: '官方Weather influences明列drought, frost, hail, rain, sunlight, temperature六項；其餘分屬種植選項、其他氣候影響因素、釀酒步驟。'
  },
  {
    id: 'lo1-016',
    lo: 1,
    sourceType: 'wset-spec-supplement',
    sourceId: 'weather-influences',
    question: '春季霜害（spring frost）對葡萄藤最主要的威脅是什麼？',
    options: [
      '破壞已經成熟的果實，導致採收品質下降',
      '提高葡萄的糖度，有助於釀出濃郁酒款',
      '加速葡萄成熟速度，使採收時間提前',
      '凍傷剛萌發的嫩芽，可能導致當年大幅減產'
    ],
    correctIndex: 3,
    explanation: '春霜發生在嫩芽剛萌發、抗寒能力最弱的階段，可能造成當年大幅減產。'
  },
  {
    id: 'lo1-017',
    lo: 1,
    sourceType: 'wset-spec-supplement',
    sourceId: 'ripeness-quality-link',
    question: '葡萄熟度如何影響葡萄酒的風格與品質？',
    options: [
      '熟度直接影響糖度、酸度、單寧與香氣濃縮度',
      '熟度只影響酒的顏色，與其他特性無關',
      '熟度只對白酒風格有影響，紅酒不受影響',
      '熟度變化與酒的風格品質完全無關'
    ],
    correctIndex: 0,
    explanation: '熟度變化牽動糖、酸、單寧、香氣風味等多重面向，是決定成品風格的核心因素之一。'
  },
  {
    id: 'lo1-018',
    lo: 1,
    sourceType: 'wset-spec-supplement',
    sourceId: 'ripeness-quality-link',
    question: '早摘（early-picked）葡萄與晚摘（late-harvest）葡萄釀成的酒款，風格差異的一般趨勢為何？',
    options: [
      '早摘通常釀出更濃郁厚重、酒精度更高的酒款',
      '早摘酸度較高、酒精較低、風味較淡；晚摘則相反',
      '早摘與晚摘葡萄釀出的酒款風格完全相同',
      '晚摘葡萄因糖度過高，無法用於正常釀酒'
    ],
    correctIndex: 1,
    explanation: '採收時機是決定葡萄糖酸比、進而影響成品風格的關鍵種植選項之一。'
  },
  {
    id: 'lo1-019',
    lo: 1,
    sourceType: 'wset-spec-supplement',
    sourceId: 'grape-growing-options',
    question: '下列何者屬於官方規格列出的「葡萄園種植選項」？',
    options: [
      '緯度、海拔、坡度、朝向、鄰近水域',
      '乾旱、霜害、冰雹、降雨、溫度',
      '整枝、修剪、灌溉、病蟲害管理、有機種植、採收',
      '破皮、榨汁、下膠、過濾、裝瓶'
    ],
    correctIndex: 2,
    explanation: '官方Grape growing options列出整枝訓練、修剪、灌溉、雜草/病蟲害管理、有機種植、產量管理、採收等項目，與環境因素、天氣因素、釀酒步驟為不同子項目。'
  },
  {
    id: 'lo1-020',
    lo: 1,
    sourceType: 'wset-spec-supplement',
    sourceId: 'grape-growing-options',
    question: '有機種植（organic production）的核心精神為何？',
    options: [
      '完全不進行採收，任由葡萄自然凋零',
      '僅適用於白葡萄品種的種植管理方式',
      '使用更多化學合成農藥以提高產量',
      '避免使用合成化學肥料、農藥與除草劑'
    ],
    correctIndex: 3,
    explanation: '有機種植核心是限制合成化學投入物的使用，以更自然的方式管理葡萄園，不限品種類型。'
  },
  {
    id: 'lo1-021',
    lo: 1,
    sourceType: 'wset-spec-supplement',
    sourceId: 'grape-growing-options',
    question: '一般而言，較低的產量（yield）與葡萄品質之間存在什麼樣的常見關聯？',
    options: [
      '產量越低，品質必然越差，兩者呈絕對負相關',
      '產量越高，濃縮度必然越高，兩者呈正相關',
      '較低產量通常關聯較濃縮的風味，但非絕對規則',
      '產量高低與葡萄品質完全無關，毫無關聯'
    ],
    correctIndex: 2,
    explanation: '官方規格強調「較低產量常關聯較濃縮風味與品質」是一般趨勢而非鐵律，仍需視具體條件而定。'
  },
  {
    id: 'lo1-022',
    lo: 1,
    sourceType: 'wset-spec-supplement',
    sourceId: 'grape-growing-options',
    question: '「葡萄糖分濃縮」的三種主要方式為何？',
    options: [
      '極熟葡萄、貴腐黴葡萄、冷凍葡萄',
      '浸皮萃取、榨汁分離、混調三步驟',
      '發酵、蒸餾、澄清三道釀造工序',
      '橡木桶陳年、瓶中陳年、不鏽鋼桶陳年'
    ],
    correctIndex: 0,
    explanation: '分別對應晚摘型（extra-ripe）、貴腐型（botrytis/noble rot）、冰酒型（frozen）甜酒的原料處理方式。'
  },
  {
    id: 'lo1-023',
    lo: 1,
    sourceType: 'data-object',
    sourceId: 'italy-docg-pyramid',
    question: '義大利的法定產區分級架構由高至低依序為？',
    options: [
      'IGT → DOC → DOCG',
      '三者地位平行，無高低之分',
      'DOC → DOCG → IGT',
      'DOCG → DOC → IGT'
    ],
    correctIndex: 3,
    explanation: '由高至低為DOCG、DOC、IGT。'
  },
  {
    id: 'lo1-024',
    lo: 1,
    sourceType: 'data-object',
    sourceId: 'spain-do-pyramid',
    question: '西班牙法定產區分級中，DOCa與DO的關係為何？',
    options: [
      '兩者完全相同，只是新舊名稱不同',
      'DO是比DOCa更高一級的分類',
      'DOCa是專門用於氣泡酒的特殊分級',
      'DOCa是比DO更高一級的分類'
    ],
    correctIndex: 3,
    explanation: 'DOCa是西班牙產區分級體系中最高等級，目前僅Rioja與Priorat等極少數產區獲此殊榮。'
  },
  {
    id: 'lo1-025',
    lo: 1,
    sourceType: 'wset-spec-supplement',
    sourceId: 'eu-gi-general',
    question: '歐盟GI體系中，PDO與PGI的核心差異為何？',
    options: [
      'PDO與PGI規範完全相同，僅英文縮寫不同',
      'PDO規範較嚴格、要求全程於產區完成；PGI較寬鬆',
      'PGI規範較嚴格，等級高於且優先於PDO',
      'PDO與PGI僅適用於氣泡酒，不適用靜態酒'
    ],
    correctIndex: 1,
    explanation: 'PDO通常要求全程在指定產區完成，PGI規範相對寬鬆、允許更大地理彈性；各會員國再各自對應本國用語（如法國AOP/IGP、義大利DOCG-DOC/IGT）。'
  },
  {
    id: 'lo1-026',
    lo: 1,
    sourceType: 'wset-spec-supplement',
    sourceId: 'germany-gi-tiers',
    question: '德國葡萄酒法定分級由高至低依序為？',
    options: [
      'Prädikatswein → Qualitätswein → Landwein',
      'Landwein → Qualitätswein → Prädikatswein',
      'Qualitätswein → Prädikatswein → Landwein',
      'Landwein → Prädikatswein → Qualitätswein'
    ],
    correctIndex: 0,
    explanation: '由高至低為Prädikatswein → Qualitätswein → Landwein；Prädikatswein依採收糖度再分Kabinett至TBA六個子級。'
  },
  {
    id: 'lo1-027',
    lo: 1,
    sourceType: 'data-object',
    sourceId: 'germany-praedikatswein',
    question: 'Icewine/Eiswein的定義為何？',
    options: [
      '只在法國布根地產區生產的傳統甜酒款',
      '專指加烈型甜酒其中一種特殊類別',
      '葡萄在藤上自然結凍狀態下採收釀成的甜酒',
      '泛指任何經過人工冷藏保存的酒款'
    ],
    correctIndex: 2,
    explanation: 'Eiswein需在葡萄自然結凍狀態下採收壓榨，屬於德國Prädikatswein體系中的特殊子級，非法國專屬、亦非加烈酒。'
  },
  {
    id: 'lo1-028',
    lo: 1,
    sourceType: 'wset-spec-supplement',
    sourceId: 'old-vine-labelling',
    question: '「Old Vine/Vieilles Vignes」這類標示術語的性質為何？',
    options: [
      '是受官方法規嚴格規範、有明確門檻的分級用語',
      '專指藤齡低於10年、尚未成熟的年輕葡萄藤',
      '多數產區並無法規門檻，屬行銷用語而非分級術語',
      '等同於法國AOC分級體系中的最高等級'
    ],
    correctIndex: 2,
    explanation: '強調老藤通常帶來的低產量與風味濃縮特性，但多數產區並無法規強制規定最低藤齡門檻，是生產者風格/行銷用語而非官方分級術語。'
  },
  {
    id: 'lo1-029',
    lo: 1,
    sourceType: 'wset-spec-supplement',
    sourceId: 'botrytis-noble-rot-labelling',
    question: '酒標上的「Botrytis/Noble Rot」標示所指為何？',
    options: [
      '只會出現在紅葡萄品種上，白葡萄不會感染',
      '葡萄感染貴腐黴後水分蒸發，糖分與風味高度濃縮',
      '一種葡萄病害，感染後葡萄必須全數淘汰不用',
      '專指葡萄藤本身隨樹齡老化的自然現象'
    ],
    correctIndex: 1,
    explanation: '葡萄感染貴腐黴（Botrytis cinerea）後，水分蒸發使糖分與風味物質高度濃縮，是釀造頂級貴腐甜酒的關鍵條件，屬於官方規格LO1中「濃縮糖分的方式」之一。'
  },
  {
    id: 'lo1-030',
    lo: 1,
    sourceType: 'wset-spec-supplement',
    sourceId: 'vintage-labelling',
    question: '酒標上的「Vintage」標示所指為何？',
    options: [
      '專指氣泡酒才會標示的年份術語',
      '代表該酒款裝瓶前陳放的總年數',
      '代表該酒莊創立成立的年份',
      '代表釀造該酒所使用葡萄的採收年份'
    ],
    correctIndex: 3,
    explanation: 'Vintage代表釀造該酒所使用葡萄的採收年份；部分酒款（如多數香檳）刻意混調多個年份而不標示Vintage（NV）。'
  },
  {
    id: 'lo2-001',
    lo: 2,
    sourceType: 'wset-spec-supplement',
    sourceId: 'alcoholic-fermentation',
    question: '酒精發酵的基本化學過程為何？',
    options: [
      '酵母將糖分轉化為酒精與二氧化碳',
      '酵母將水分轉化為糖分與酒精',
      '細菌將糖分的酸度轉化為單寧',
      '酵母將酒精逆向轉化為糖分'
    ],
    correctIndex: 0,
    explanation: '官方規格明列酒精發酵過程為Yeast converts sugar into alcohol and carbon dioxide。'
  },
  {
    id: 'lo2-002',
    lo: 2,
    sourceType: 'wset-spec-supplement',
    sourceId: 'alcoholic-fermentation',
    question: '酒精發酵過程中，除了酒精之外還會產生哪一種副產物？',
    options: [
      '二氧化碳',
      '氧氣',
      '氮氣',
      '甲烷'
    ],
    correctIndex: 0,
    explanation: '發酵是糖分同時轉化為酒精與二氧化碳的過程，這也是氣泡酒二次發酵能產生氣泡的原理基礎。'
  },
  {
    id: 'lo2-003',
    lo: 2,
    sourceType: 'data-object',
    sourceId: 'winestyle-red',
    question: '紅酒釀造中，「破皮去梗」後緊接的關鍵步驟為何？',
    options: [
      '直接裝瓶儲存，不進行任何後續處理',
      '立即進行乳酸發酵，跳過酒精發酵階段',
      '發酵浸皮，透過踩皮或淋皮萃取色素單寧',
      '送入冷凍庫保存數週後才開始發酵'
    ],
    correctIndex: 2,
    explanation: '紅酒帶皮發酵是核心工藝起點，發酵浸皮階段需踩皮或淋皮打散上浮的果皮酒帽。'
  },
  {
    id: 'lo2-004',
    lo: 2,
    sourceType: 'data-object',
    sourceId: 'winestyle-red',
    question: '紅酒釀造中，「自流酒（free-run）」與「壓榨酒（press wine）」的差異為何？',
    options: [
      '兩者完全相同，只是裝瓶先後順序不同',
      '自流酒較純淨清爽，壓榨酒單寧較重',
      '自流酒單寧較重，壓榨酒反而較清爽',
      '自流酒專指白酒工藝，紅酒沒有此步驟'
    ],
    correctIndex: 1,
    explanation: '壓榨分離階段會產生風格不同的自流酒與壓榨酒，可依風格需求決定是否混調回主酒。'
  },
  {
    id: 'lo2-005',
    lo: 2,
    sourceType: 'data-object',
    sourceId: 'winestyle-white',
    question: '白酒釀造中，為什麼多半在整串壓榨或破皮後立即榨汁，果皮接觸時間極短？',
    options: [
      '白葡萄品種本身天生沒有果皮構造',
      '純粹為了縮短釀造時間、降低成本',
      '法規明文強制規定不可帶皮發酵',
      '避免萃取單寧與色素，保留清新果香與酸度'
    ],
    correctIndex: 3,
    explanation: '白酒工藝核心是避開紅酒式的萃取，快速去皮取汁以保留新鮮果香與酸度。'
  },
  {
    id: 'lo2-006',
    lo: 2,
    sourceType: 'data-object',
    sourceId: 'winestyle-white',
    question: '白酒發酵溫度與紅酒相比，通常有何差異？',
    options: [
      '白酒發酵溫度較低，紅酒發酵溫度較高',
      '白酒發酵溫度遠高於紅酒，兩者相反',
      '白酒與紅酒發酵溫度完全相同不分',
      '白酒完全不需要進行控溫發酵處理'
    ],
    correctIndex: 0,
    explanation: '白酒發酵溫度較低（約12–18°C），以保留細緻果香與新鮮感，紅酒則多在25–30°C發酵，是白酒工藝的關鍵選項之一。'
  },
  {
    id: 'lo2-007',
    lo: 2,
    sourceType: 'data-object',
    sourceId: 'winestyle-rose',
    question: '粉紅酒最主要的三種釀造工法為何？',
    options: [
      '熱萃取法、冷萃取法、真空萃取法',
      '傳統法、水槽法、轉注法混調',
      '整串發酵法、破皮發酵法、去梗發酵法',
      '直接壓榨法、短時間浸皮法、放血法'
    ],
    correctIndex: 3,
    explanation: '這三種（放血法即Saignée）是官方與業界慣用的粉紅酒釀造分類法，果皮接觸時間長短決定色澤深淺。'
  },
  {
    id: 'lo2-008',
    lo: 2,
    sourceType: 'data-object',
    sourceId: 'winestyle-rose',
    question: '「放血法（Saignée）」在粉紅酒釀造中的定位為何？',
    options: [
      '是普羅旺斯地區主流的主動追求工藝',
      '是粉紅酒工法中色澤最淺的一種',
      '是紅酒濃縮工藝中放出酒液的副產品',
      '是專門只用於白葡萄品種的工法'
    ],
    correctIndex: 2,
    explanation: '放血法多半是紅酒濃縮工藝的副產品，與直接壓榨法、短時間浸皮法這類「主動追求」的粉紅酒工藝定位不同。'
  },
  {
    id: 'lo2-009',
    lo: 2,
    sourceType: 'wset-spec-supplement',
    sourceId: 'winemaking-adjustments',
    question: '「補糖（Chaptalization）」這項釀造調整選項的目的為何？',
    options: [
      '於發酵後添加糖分，降低最終酒精濃度',
      '直接增加酒液甜度，作為成品風格',
      '於發酵前添加糖分，提高最終酒精濃度',
      '用來取代乳酸發酵在釀造中的作用'
    ],
    correctIndex: 2,
    explanation: '補糖是官方規格列出的「調整」選項之一，目的是提高潛在酒精度而非成品甜度，發酵仍會將添加的糖分轉化為酒精。'
  },
  {
    id: 'lo2-010',
    lo: 2,
    sourceType: 'wset-spec-supplement',
    sourceId: 'winemaking-adjustments',
    question: '「調整酸度（Acidification）」通常在哪種情況下會被使用？',
    options: [
      '任何情況下都會例行使用，無須視條件',
      '葡萄過熟、天然酸度不足時添加酸類調整',
      '只用於氣泡酒二次發酵前的調整階段',
      '只用於已裝瓶完成後的成品酒調整'
    ],
    correctIndex: 1,
    explanation: '與補糖相對應，酸度調整多發生在溫暖氣候、葡萄成熟度過高導致天然酸度不足的產區，用來補足酸度以維持新鮮感。'
  },
  {
    id: 'lo2-011',
    lo: 2,
    sourceType: 'data-object',
    sourceId: 'winestyle-red',
    question: '紅酒釀造中「延長泡皮（Extended Maceration）」的目的為何？',
    options: [
      '加速發酵速度，藉此縮短釀造時間',
      '降低酒液最終的酒精濃度表現',
      '防止酒液氧化，藉此延長保存期限',
      '發酵後延長果皮接觸數週，柔化單寧增添結構'
    ],
    correctIndex: 3,
    explanation: '延長泡皮是可選的釀造選項，透過拉長果皮接觸時間來柔化單寧、增添結構。'
  },
  {
    id: 'lo2-012',
    lo: 2,
    sourceType: 'wset-spec-supplement',
    sourceId: 'sweet-wine-methods',
    question: '釀造甜酒時，「停止發酵（Fermentation Stopped）」這項工法的原理為何？',
    options: [
      '透過降溫或加酒精等方式中止發酵，保留殘糖',
      '讓發酵持續進行至所有糖分轉化完畢',
      '只適用於氣泡酒二次發酵的工序步驟',
      '與甜酒的釀造工藝完全無關的技術'
    ],
    correctIndex: 0,
    explanation: '官方規格明列Sweet wine的釀造選項為「Fermentation stopped」與「Sweetness added」兩種主要思路，前者透過降溫、過濾或添加酒精中止發酵以保留天然殘糖。'
  },
  {
    id: 'lo2-013',
    lo: 2,
    sourceType: 'wset-spec-supplement',
    sourceId: 'sweet-wine-methods',
    question: '除了中止發酵之外，官方規格列出的另一種甜酒釀造思路為何？',
    options: [
      '延長泡皮時間，以增加萃取程度',
      '發酵至乾型後，再額外添加甜度',
      '完全不使用任何糖分於釀造中',
      '使用野生酵母進行天然發酵'
    ],
    correctIndex: 1,
    explanation: '先完全發酵至乾型，再透過添加甜葡萄汁等方式回甜（Sweetness Added）。'
  },
  {
    id: 'lo2-014',
    lo: 2,
    sourceType: 'wset-spec-supplement',
    sourceId: 'fermentation-vessels',
    question: '官方規格列出的三種主要發酵容器類型為何？',
    options: [
      '玻璃瓶、塑膠桶、陶罐',
      '竹編容器、皮革容器、石缸',
      '不鏽鋼、水泥、橡木',
      '僅限不鏽鋼一種容器類型'
    ],
    correctIndex: 2,
    explanation: '官方規格明列發酵容器為stainless steel（不鏽鋼）、concrete（水泥）、oak（橡木）三類，容器類型直接影響酒款是否帶有木質調性與氧氣交換程度。'
  },
  {
    id: 'lo2-015',
    lo: 2,
    sourceType: 'wset-spec-supplement',
    sourceId: 'oak-vessel-types',
    question: '橡木桶的哪些變因會影響其對葡萄酒風格的影響程度？',
    options: [
      '只有橡木桶的表面顏色會影響風格',
      '桶身尺寸、新舊程度、內壁烘烤程度',
      '只有橡木桶的產地來源會影響風格',
      '橡木桶種類對風格完全沒有任何影響'
    ],
    correctIndex: 1,
    explanation: '官方規格明列Oak vessel types包含桶身尺寸大小（small/large）、新舊程度（new/old）、以及內壁烘烤程度（level of toast）等變因。'
  },
  {
    id: 'lo2-016',
    lo: 2,
    sourceType: 'data-object',
    sourceId: 'winestyle-red',
    question: '「乳酸發酵（Malolactic Conversion/MLF）」對酒款的主要影響為何？',
    options: [
      '使酒款的酸度變得更加尖銳刺激',
      '將尖銳蘋果酸轉化為柔和乳酸，常帶奶油堅果調性',
      '使酒款的顏色明顯加深、轉為深紫',
      '只發生在氣泡酒二次發酵的過程中'
    ],
    correctIndex: 1,
    explanation: '紅酒工藝流程中MLF幾乎是必經步驟，將尖銳的蘋果酸轉化為柔和的乳酸，常伴隨奶油、堅果調性，能軟化酸度、增添複雜度。'
  },
  {
    id: 'lo2-017',
    lo: 2,
    sourceType: 'data-object',
    sourceId: 'winestyle-white',
    question: '為什麼像Riesling、Sauvignon Blanc這類芳香品種的白酒，多半刻意阻擋乳酸發酵（MLF）進行？',
    options: [
      '因為這些品種本身不含蘋果酸成分',
      '因為MLF理論上只適用於紅酒',
      '為了保留銳利明亮的酸度風格特徵',
      '因為法規明文禁止芳香白酒進行MLF'
    ],
    correctIndex: 2,
    explanation: '芳香品種白酒的風格核心在於保留清新、銳利明亮的酸度與品種香氣，這是這類品種風格的核心特徵。'
  },
  {
    id: 'lo2-018',
    lo: 2,
    sourceType: 'wset-spec-supplement',
    sourceId: 'lees-contact',
    question: '「酒渣接觸（Lees）」對葡萄酒風格可能帶來什麼影響？',
    options: [
      '增添質地厚度、複雜度與麵包堅果調性',
      '使酒款顏色明顯變淺、趨於透明',
      '完全沒有風味影響，純屬釀造副產品',
      '只會影響酒液最終的酒精濃度高低'
    ],
    correctIndex: 0,
    explanation: '酒渣與酒液接觸的時間長短、是否攪動，是官方規格列出的重要釀造選項之一，可能增添質地厚度、複雜度與特定風味（如麵包、堅果調性），常見於白酒攪桶或氣泡酒的酒渣自溶。'
  },
  {
    id: 'lo2-019',
    lo: 2,
    sourceType: 'wset-spec-supplement',
    sourceId: 'blending-purpose',
    question: '「調配（Blending）」在釀造工藝中的三個主要目的為何？',
    options: [
      '降低成本、加快釀造速度、延長保存期限',
      '消耗多餘原料、簡化倉儲管理、節省人力',
      '只適用於氣泡酒二次發酵前的調配步驟',
      '維持風格一致性、增加複雜度、達成特定風格'
    ],
    correctIndex: 3,
    explanation: '官方規格明列調配的三個核心目的為consistency（一致性）、complexity（複雜度）、style（達成特定風格）。'
  },
  {
    id: 'lo2-020',
    lo: 2,
    sourceType: 'wset-spec-supplement',
    sourceId: 'bottle-ageing-red',
    question: '紅酒在瓶中陳年過程中，最主要會產生哪些變化？',
    options: [
      '顏色會隨陳年變得更深、更加鮮豔',
      '完全不會產生任何變化，長期維持原狀',
      '只有酒精濃度會隨陳年逐漸改變',
      '顏色、單寧、香氣風味皆會產生明顯變化'
    ],
    correctIndex: 3,
    explanation: '官方規格明列紅酒瓶陳的關鍵變化為Colour, Tannin, Aromas and flavours三個面向——顏色通常由紫紅漸轉磚紅、單寧逐漸軟化、香氣從果香轉為更複雜的三級香氣。'
  },
  {
    id: 'lo2-021',
    lo: 2,
    sourceType: 'wset-spec-supplement',
    sourceId: 'bottle-ageing-red',
    question: '紅酒陳年過程中，顏色的變化趨勢通常為何？',
    options: [
      '由年輕紫紅色，隨陳年轉為磚紅色',
      '由磚紅色，隨陳年反轉回鮮豔紫紅色',
      '顏色從裝瓶到開瓶完全不會改變',
      '由白色，隨陳年逐漸轉為粉紅色'
    ],
    correctIndex: 0,
    explanation: '紅酒色素會隨陳年逐漸與單寧結合沉澱，顏色由紫紅漸轉磚紅、石榴紅，甚至帶橘色調。'
  },
  {
    id: 'lo2-022',
    lo: 2,
    sourceType: 'wset-spec-supplement',
    sourceId: 'bottle-ageing-white',
    question: '白酒瓶陳過程中，官方規格列出的關鍵變化面向為何？',
    options: [
      '單寧與酒精濃度兩個面向',
      '顏色與香氣風味兩個面向',
      '糖分與酸度變化兩個面向',
      '只有酒精濃度單一面向'
    ],
    correctIndex: 1,
    explanation: '官方規格明列白酒瓶陳關鍵變化為Colour, Aromas and flavours兩項，不含單寧（因白酒單寧含量極低），不像紅酒額外列出Tannin。'
  },
  {
    id: 'lo2-023',
    lo: 2,
    sourceType: 'wset-spec-supplement',
    sourceId: 'bottle-ageing-white',
    question: '白酒陳年過程中，顏色的變化趨勢通常為何？',
    options: [
      '由金黃色，隨陳年逐漸褪為無色透明',
      '顏色從裝瓶到開瓶完全不會改變',
      '由淺黃綠色，隨陳年轉為紫紅色',
      '由淺黃綠色，隨陳年逐漸加深轉金黃色'
    ],
    correctIndex: 3,
    explanation: '與紅酒陳年顏色變淺的趨勢相反，白酒陳年通常顏色會逐漸加深，甚至轉為琥珀色。'
  },
  {
    id: 'lo2-024',
    lo: 2,
    sourceType: 'wset-spec-supplement',
    sourceId: 'bottle-ageing-white',
    question: '白酒陳年過程中，香氣風味通常會如何演變？',
    options: [
      '完全保持不變，永遠停留在年輕果香階段',
      '香氣會逐漸演變得更加接近紅酒的風格',
      '新鮮果香減弱，發展出蜂蜜堅果等三級香氣',
      '只會產生負面氧化異味，沒有正面陳年價值'
    ],
    correctIndex: 2,
    explanation: '白酒陳年會發展出蜂蜜、烤堅果、汽油（如老年份Riesling）等更複雜的三級陳年香氣，這是官方規格認可的正面熟成現象，需區分「合宜的陳年演變」與「缺陷」兩個概念。'
  },
  {
    id: 'lo3-cha-001',
    lo: 3,
    sourceType: 'data-object',
    sourceId: 'chardonnay',
    question: 'Chardonnay作為「中性品種」的意思是什麼？',
    options: [
      '它只能釀成氣泡酒，無法做成靜態酒款',
      '它只能在法國單一國家種植生產',
      '它完全沒有任何可辨識的香氣特徵',
      '品種香氣不強烈，風格取決於氣候與釀造工法'
    ],
    correctIndex: 3,
    explanation: 'Chardonnay因香氣中性、可塑性強，從夏布利的礦石高酸到納帕谷的奶油橡木皆可展現，是其風靡全球的原因（是否使用橡木桶、是否進行MLF等釀造工法影響顯著）。'
  },
  {
    id: 'lo3-cha-002',
    lo: 3,
    sourceType: 'data-object',
    sourceId: 'chardonnay',
    question: 'Chardonnay起源於哪個產區，其親本經DNA分析確認為何？',
    options: [
      '起源於義大利中部，是本土原生古老品種',
      '起源於法國波爾多，親本為卡本內弗朗與白蘇維濃',
      '起源於勃根地馬貢內地區，親本之一為黑皮諾',
      '起源於德國萊茵高地區，確切親本至今不明'
    ],
    correctIndex: 2,
    explanation: '2000年代DNA分析確認Chardonnay親本為黑皮諾與已幾近絕跡的Gouais Blanc（白高維斯）。'
  },
  {
    id: 'lo3-cha-003',
    lo: 3,
    sourceType: 'data-object',
    sourceId: 'chardonnay',
    question: '冷涼氣候（如Chablis夏布利）種植的Chardonnay，典型風格特徵為何？',
    options: [
      '單寧含量高、酒體厚重澀感明顯',
      '高酸度、礦石感明顯、青蘋果檸檬果香',
      '低酸度、高酒精、熱帶水果香氣',
      '永遠帶有明顯奶油與橡木桶調性'
    ],
    correctIndex: 1,
    explanation: 'Chardonnay的aromaWheel包含Green Apple、Lemon等青綠果香，冷涼產區這類特徵更為明顯；Chardonnay不含單寧（tannin profile為0），因白酒不帶皮發酵。'
  },
  {
    id: 'lo3-cha-004',
    lo: 3,
    sourceType: 'data-object',
    sourceId: 'chardonnay',
    question: '溫暖氣候（如Napa Valley納帕谷）種植並經橡木桶processing的Chardonnay，典型風格特徵為何？',
    options: [
      '保持完全不甜、無任何橡木調性殘留',
      '極高酸度、礦石感異常強烈明顯',
      '單寧含量高、澀感十分明顯突出',
      '酒體較飽滿，常帶奶油榛果等橡木調性'
    ],
    correctIndex: 3,
    explanation: 'Chardonnay的aromaWheel也包含Butter、Hazelnut這類經橡木桶與乳酸發酵帶來的調性，常見於溫暖產區風格。'
  },
  {
    id: 'lo3-cha-005',
    lo: 3,
    sourceType: 'data-object',
    sourceId: 'chardonnay',
    question: 'Chardonnay與白蘇維濃（Sauvignon Blanc）在香氣邏輯上的核心差異為何？',
    options: [
      'Chardonnay靠釀造塑形；白蘇維濃品種特徵強烈明確',
      '兩者香氣邏輯完全相同，難以區分辨別',
      '白蘇維濃比Chardonnay更依賴橡木桶調性',
      'Chardonnay只能釀造甜型酒款，無法做乾型'
    ],
    correctIndex: 0,
    explanation: 'confusionNote明確點出兩者香氣邏輯完全相反的對照關係：Chardonnay品種本身中性、風味主要來自釀造與產地；白蘇維濃品種特徵強烈（草本與醋栗氣息明確可辨），釀造工法影響相對有限。'
  },
  {
    id: 'lo3-cha-006',
    lo: 3,
    sourceType: 'data-object',
    sourceId: 'chardonnay',
    question: '下列何者是Chardonnay在盲飲時容易與其混淆的品種，兩者的關鍵區辨特徵為何？',
    options: [
      '白皮諾，其酸度更柔和、缺乏橡木奶油榛果調性',
      '麗絲玲，因兩者都帶有明顯汽油調性香氣',
      '白蘇維濃，因兩者香氣特徵極為相似難辨',
      '格烏茲塔明那，因兩者都帶玫瑰荔枝香氣'
    ],
    correctIndex: 0,
    explanation: 'confusionNote指出Chardonnay與白皮諾（Pinot Blanc）在盲飲時偶有混淆，白皮諾酸度通常更柔和、缺乏Chardonnay經橡木桶後常見的奶油榛果調性。'
  },
  {
    id: 'lo3-cha-007',
    lo: 3,
    sourceType: 'data-object',
    sourceId: 'chardonnay',
    question: '下列哪一個產區不屬於Chardonnay的代表性種植區域？',
    options: [
      'Napa Valley（納帕谷）',
      'Mosel（摩塞爾）',
      'Chablis（夏布利）',
      'Margaret River（瑪格麗特河）'
    ],
    correctIndex: 1,
    explanation: 'representativeRegions涵蓋Chablis、Napa Valley、Margaret River等多個產區，Mosel是Riesling的代表產區，不在Chardonnay清單中。'
  },
  {
    id: 'lo3-cha-008',
    lo: 3,
    sourceType: 'data-object',
    sourceId: 'chardonnay',
    question: 'Chardonnay建議的侍酒溫度區間為何？',
    options: [
      '10–13°C',
      '13–15°C',
      '16–18°C',
      '6–8°C'
    ],
    correctIndex: 0,
    explanation: 'servingTemp欄位標示為10–13°C，對應濃郁型／經橡木桶白酒的溫度區間。'
  },
  {
    id: 'lo3-cha-009',
    lo: 3,
    sourceType: 'data-object',
    sourceId: 'chardonnay',
    question: 'Chardonnay適合搭配下列哪些食物類型？',
    options: [
      '辛辣重口味料理與燒烤紅肉',
      '海鮮、奶油醬汁、中脂禽肉料理',
      '甜點、水果與冰品類料理',
      '醃肉、燻製品與開胃小菜'
    ],
    correctIndex: 1,
    explanation: 'foodPairingTags列出Seafood、Cream Sauce、Moderate Fat、Poultry，與其中等酒體和常見的奶油質地相呼應。'
  },
  {
    id: 'lo3-cha-010',
    lo: 3,
    sourceType: 'data-object',
    sourceId: 'chardonnay',
    question: '依profile資料，Chardonnay的單寧（tannin）評分為何？',
    options: [
      '0分，因白酒不帶皮發酵，幾乎不含單寧',
      '依產區不同差異極大，從0到9分都有可能',
      '單寧是Chardonnay最主要的風味特徵',
      '與Cabernet Sauvignon相同，屬中高單寧'
    ],
    correctIndex: 0,
    explanation: '白酒因不進行帶皮發酵，單寧含量普遍極低，profile.tannin為0，這是所有白葡萄品種的共通特性，非Chardonnay獨有。'
  },
  {
    id: 'lo3-cha-011',
    lo: 3,
    sourceType: 'data-object',
    sourceId: 'chardonnay',
    question: 'Chardonnay在profile資料中的酸度（acidity）與陳年潛力（aging）評分相對如何？',
    options: [
      '酸度偏低（3分）、陳年潛力也偏低（2分）',
      '兩者評分完全相同，皆為中等5分',
      '酸度中高（7分）、陳年潛力中等偏高（6分）',
      '酸度與陳年潛力皆為滿分10分之高'
    ],
    correctIndex: 2,
    explanation: 'profile中acidity為7、aging為6，反映其兼具支撐陳年的酸度結構與一定的陳年潛力，尤其經橡木桶陳年的版本。'
  },
  {
    id: 'lo3-cha-012',
    lo: 3,
    sourceType: 'data-object',
    sourceId: 'chardonnay',
    question: '1990年代葡萄酒市場曾出現對Chardonnay的什麼反思聲浪？',
    options: [
      '認為Chardonnay只能種植在法國一地',
      '認為Chardonnay完全不適合用來釀酒',
      '對「過度橡木化」的反思，一度出現ABC風潮',
      '認為Chardonnay應全面禁止使用不鏽鋼槽'
    ],
    correctIndex: 2,
    explanation: '因其可塑性強、市場一度過度依賴橡木桶調性，1990年代確實出現對「過度橡木化（over-oaked）」的市場反思，導致部分消費者一度追捧「ABC（Anything But Chardonnay）」風潮。'
  },
  {
    id: 'lo3-cha-013',
    lo: 3,
    sourceType: 'data-object',
    sourceId: 'chardonnay',
    question: 'Chardonnay的果皮顏色（skinColor）分類與原產國為何？',
    options: [
      '黑皮，原產義大利',
      '白皮，原產法國',
      '灰皮，原產德國',
      '白皮，原產美國'
    ],
    correctIndex: 1,
    explanation: "skinColor:'white'、originCountry:'France(法國)'。"
  },
  {
    id: 'lo3-cha-014',
    lo: 3,
    sourceType: 'data-object',
    sourceId: 'chardonnay',
    question: '為什麼Chardonnay被稱為「全球適應力最強的白酒品種之一」？',
    options: [
      '因為全世界僅有單一產區能夠種植它',
      '因為它完全不需要陽光與水分即可生長',
      '因為它只能在單一固定氣候類型下生長',
      '品種中性、可塑性高，冷涼到溫暖氣候皆能展現風格'
    ],
    correctIndex: 3,
    explanation: '正是這種「可塑性」讓Chardonnay能在幾乎所有主要葡萄酒產區找到立足之地，風格光譜極廣，從冷涼到溫暖氣候、不鏽鋼槽到橡木桶皆能展現不同且皆具辨識度的風格。'
  },
  {
    id: 'lo3-svb-001',
    lo: 3,
    sourceType: 'data-object',
    sourceId: 'sauvignon-blanc',
    question: 'Sauvignon Blanc的經典風格特徵為何？',
    options: [
      '高酸爽脆的芳香品種，經典帶有草本與醋栗香氣',
      '低酸度、濃郁橡木調性',
      '單寧明顯、酒體厚重',
      '永遠是甜型酒款'
    ],
    correctIndex: 0,
    explanation: 'styleSummary明確描述為高酸爽脆的芳香品種，經典風格帶草本與醋栗香氣。'
  },
  {
    id: 'lo3-svb-002',
    lo: 3,
    sourceType: 'data-object',
    sourceId: 'sauvignon-blanc',
    question: 'Sauvignon Blanc起源於哪個區域，最早文獻記載可追溯至何時？',
    options: [
      '法國羅亞爾河與波爾多一帶，18世紀文獻已有記載',
      '德國萊茵高，15世紀文獻記載',
      '義大利東北部，20世紀才有記載',
      '西班牙赫雷斯，16世紀文獻記載'
    ],
    correctIndex: 0,
    explanation: 'history欄位明確記載起源於法國羅亞爾河與波爾多一帶，18世紀文獻已有栽培記載。'
  },
  {
    id: 'lo3-svb-003',
    lo: 3,
    sourceType: 'data-object',
    sourceId: 'sauvignon-blanc',
    question: 'DNA分析確認Sauvignon Blanc與哪個知名紅酒品種具有親緣關係？',
    options: [
      '完全沒有已知的親緣關係品種',
      '黑皮諾',
      '梅洛',
      '是卡本內蘇維濃（Cabernet Sauvignon）的親本之一（與卡本內弗朗共同繁殖出卡本內蘇維濃）'
    ],
    correctIndex: 3,
    explanation: 'DNA分析確認白蘇維濃與卡本內弗朗為親本，共同繁殖出全球知名度最高的卡本內蘇維濃，換言之白蘇維濃是卡本內蘇維濃的祖父輩品種之一。'
  },
  {
    id: 'lo3-svb-004',
    lo: 3,
    sourceType: 'data-object',
    sourceId: 'sauvignon-blanc',
    question: '1980年代紐西蘭馬爾堡Sauvignon Blanc震驚國際市場的招牌香氣特徵為何？',
    options: [
      '蜂蜜與杏桃',
      '濃郁的百香果與青椒香氣',
      '奶油與榛果',
      '汽油與礦石感'
    ],
    correctIndex: 1,
    explanation: 'history記載1980年代馬爾堡以其獨特濃郁的百香果與青椒香氣震驚國際市場，開創新世界風格典範。'
  },
  {
    id: 'lo3-svb-005',
    lo: 3,
    sourceType: 'data-object',
    sourceId: 'sauvignon-blanc',
    question: '羅亞爾河（如Sancerre）與紐西蘭馬爾堡的Sauvignon Blanc，兩者風格光譜的核心差異為何？',
    options: [
      '兩者風格完全相同，沒有可辨識差異',
      '馬爾堡風格較羅亞爾河更礦石感',
      '羅亞爾河傾向燧石礦石感的冷涼礦物風格；紐西蘭馬爾堡則傾向熱帶果香奔放的風格',
      '羅亞爾河風格較馬爾堡更熱帶果香'
    ],
    correctIndex: 2,
    explanation: 'styleSummary點出因氣候差異呈現燧石礦石感或熱帶果香兩種光譜，分別對應舊世界（如羅亞爾河）與新世界（如馬爾堡）的典型風格。'
  },
  {
    id: 'lo3-svb-006',
    lo: 3,
    sourceType: 'data-object',
    sourceId: 'sauvignon-blanc',
    question: 'Sauvignon Blanc與賽美蓉（Sémillon）經常混調（如波爾多白酒與索甸貴腐甜酒），兩者角色互補的方式為何？',
    options: [
      '兩者角色完全相同，混調沒有實質意義',
      '白蘇維濃提供高酸與明亮香氣，賽美蓉提供酒體與陳年後的蜂蠟質地',
      '賽美蓉提供高酸，白蘇維濃提供酒體與蜂蠟質地',
      '兩者從不一起混調'
    ],
    correctIndex: 1,
    explanation: 'confusionNote說明白蘇維濃與賽美蓉常見混調且角色互補：白蘇維濃提供高酸與明亮香氣，賽美蓉提供酒體與陳年後的蜂蠟質地。'
  },
  {
    id: 'lo3-svb-007',
    lo: 3,
    sourceType: 'data-object',
    sourceId: 'sauvignon-blanc',
    question: 'Sauvignon Blanc與白詩楠（Chenin Blanc）相比，風格辨識上的關鍵差異為何？',
    options: [
      '兩者風味特徵幾乎無法區分',
      '白蘇維濃的青草／醋栗調性更明確、酸度更銳利；白詩楠則以榲桲與蜂蜜調性、酸度較圓潤為特徵',
      '白詩楠的酸度遠高於白蘇維濃',
      '白蘇維濃帶有明顯榲桲蜂蜜調性'
    ],
    correctIndex: 1,
    explanation: 'confusionNote明確對比兩者：白蘇維濃青草/醋栗調性更明確、酸度更銳利，白詩楠則以榲桲與蜂蜜調性、較圓潤酸度為特徵。'
  },
  {
    id: 'lo3-svb-008',
    lo: 3,
    sourceType: 'data-object',
    sourceId: 'sauvignon-blanc',
    question: '下列哪一個產區不屬於Sauvignon Blanc的代表性種植區域？',
    options: [
      'Barossa Valley（巴羅莎谷）',
      'Sancerre（松塞爾）',
      'Marlborough（馬爾堡）',
      'Graves（格拉夫）'
    ],
    correctIndex: 0,
    explanation: 'representativeRegions涵蓋Sancerre、Marlborough、Graves等產區，Barossa Valley是澳洲以Shiraz聞名的產區，不在Sauvignon Blanc代表產區清單中。'
  },
  {
    id: 'lo3-svb-009',
    lo: 3,
    sourceType: 'data-object',
    sourceId: 'sauvignon-blanc',
    question: 'Sauvignon Blanc建議的侍酒溫度區間為何？',
    options: [
      '10–13°C',
      '13–15°C',
      '8–10°C',
      '16–18°C'
    ],
    correctIndex: 2,
    explanation: 'servingTemp欄位標示為8–10°C，對應清淡不甜白酒的溫度區間。'
  },
  {
    id: 'lo3-svb-010',
    lo: 3,
    sourceType: 'data-object',
    sourceId: 'sauvignon-blanc',
    question: 'Sauvignon Blanc適合搭配下列哪些食物類型？',
    options: [
      '紅肉與野味',
      '甜點與水果',
      '海鮮、山羊起司、蘆筍等低脂料理',
      '醃肉開胃菜'
    ],
    correctIndex: 2,
    explanation: 'foodPairingTags列出Seafood、Goat Cheese、Light Fat、Asparagus，與其高酸清爽的特性相呼應（蘆筍是傳統上公認難與葡萄酒搭配的食材之一，但與白蘇維濃的草本調性有互補效果）。'
  },
  {
    id: 'lo3-svb-011',
    lo: 3,
    sourceType: 'data-object',
    sourceId: 'sauvignon-blanc',
    question: '依profile資料，Sauvignon Blanc的酸度（acidity）評分為何？',
    options: [
      '5分，中等偏低',
      '7分，中高',
      '3分，偏低',
      '9分，接近滿分的高酸'
    ],
    correctIndex: 3,
    explanation: 'profile.acidity為9，是白蘇維濃最鮮明的特徵之一，也是其「高酸爽脆」風格定位的數據依據。'
  },
  {
    id: 'lo3-svb-012',
    lo: 3,
    sourceType: 'data-object',
    sourceId: 'sauvignon-blanc',
    question: '依profile資料，Sauvignon Blanc的陳年潛力（aging）評分與Chardonnay相比如何？',
    options: [
      '兩者陳年潛力評分相同',
      'Sauvignon Blanc陳年潛力遠高於Chardonnay',
      '陳年潛力與品種無關，只與產區有關',
      'Sauvignon Blanc的陳年潛力（3分）明顯低於Chardonnay（6分），多數Sauvignon Blanc適合年輕時飲用'
    ],
    correctIndex: 3,
    explanation: 'profile.aging為3，反映白蘇維濃多數風格（尤其新世界芳香奔放型）不刻意追求長期陳年，這與其阻擋MLF、追求新鮮酸度的釀造哲學一致。'
  },
  {
    id: 'lo3-svb-013',
    lo: 3,
    sourceType: 'data-object',
    sourceId: 'sauvignon-blanc',
    question: 'Sauvignon Blanc的果皮顏色分類與原產國為何？',
    options: [
      '黑皮，原產紐西蘭',
      '白皮，原產法國',
      '灰皮，原產德國',
      '白皮，原產義大利'
    ],
    correctIndex: 1,
    explanation: "skinColor:'white'、originCountry:'France(法國)'。"
  },
  {
    id: 'lo3-svb-014',
    lo: 3,
    sourceType: 'data-object',
    sourceId: 'sauvignon-blanc',
    question: 'Sauvignon Blanc的aromaWheel香氣輪列出哪些核心香氣？',
    options: [
      '醋栗、青草、百香果、燧石',
      '蜂蜜、杏桃、橙皮果醬、貴腐風味',
      '青蘋果、檸檬、奶油、榛果',
      '黑莓、黑胡椒、結構化單寧'
    ],
    correctIndex: 0,
    explanation: 'aromaWheel列出Gooseberry(醋栗)、Grass(青草)、Passionfruit(百香果)、Flint(燧石)，涵蓋舊世界礦石與新世界熱帶果香兩種光譜的代表香氣。'
  },
  {
    id: 'lo3-rie-001',
    lo: 3,
    sourceType: 'data-object',
    sourceId: 'riesling',
    question: 'Riesling最鮮明的品種特徵為何？',
    options: [
      '極高酸度，且從極干到極甜（貴腐、冰酒）各種甜度光譜皆能勝任',
      '低酸度、僅能釀成甜酒',
      '單寧含量高、酒體厚重',
      '完全不適合陳年'
    ],
    correctIndex: 0,
    explanation: 'styleSummary明確指出Riesling兼具極高酸度與晚收潛力，橫跨干型到甜型皆能展現。'
  },
  {
    id: 'lo3-rie-002',
    lo: 3,
    sourceType: 'data-object',
    sourceId: 'riesling',
    question: 'Riesling最早文獻記載可追溯至哪個世紀、哪個產區？',
    options: [
      '19世紀，法國香檳區',
      '20世紀，紐西蘭馬爾堡',
      '16世紀，西班牙赫雷斯',
      '1435年，德國萊茵高地區'
    ],
    correctIndex: 3,
    explanation: 'history記載最早文獻可追溯至1435年德國萊茵高地區，是少數能明確追溯栽培源頭的歐洲古老品種之一。'
  },
  {
    id: 'lo3-rie-003',
    lo: 3,
    sourceType: 'data-object',
    sourceId: 'riesling',
    question: '關於Riesling常見的迷思「Riesling＝甜酒」，正確的理解為何？',
    options: [
      '這個迷思完全正確，Riesling只能釀成甜酒',
      '這是誤解，Riesling干型與甜型（如Auslese、貴腐）皆為經典風格，甜度須依酒標標示判斷而非品種本身決定',
      'Riesling只能釀成干型酒',
      '甜度只取決於採收季節，與酒標標示無關'
    ],
    correctIndex: 1,
    explanation: 'confusionNote明確點出此常見誤解，強調甜度判斷需依酒標而非品種本身。'
  },
  {
    id: 'lo3-rie-004',
    lo: 3,
    sourceType: 'data-object',
    sourceId: 'riesling',
    question: 'Riesling與格烏茲塔明那（Gewürztraminer）相比，關鍵區辨特徵為何？',
    options: [
      '兩者風味特徵幾乎無法區分',
      'Riesling香氣較內斂、酸度遠高於格烏茲塔明那；格烏茲塔明那則以濃郁荔枝玫瑰香與低酸為特徵',
      '格烏茲塔明那的酸度遠高於Riesling',
      'Riesling以荔枝玫瑰香為招牌香氣'
    ],
    correctIndex: 1,
    explanation: 'confusionNote明確對比：Riesling香氣內斂、高酸；格烏茲塔明那則濃郁荔枝玫瑰香、低酸，兩者盲飲不易混淆。'
  },
  {
    id: 'lo3-rie-005',
    lo: 3,
    sourceType: 'data-object',
    sourceId: 'riesling',
    question: 'Riesling在二戰後品牌形象受挫的原因為何？',
    options: [
      '受廉價甜型出口酒（如部分Liebfraumilch類產品）拖累品牌形象，近年隨精品干型Riesling復興才逐漸重拾應有地位',
      '因為法規全面禁止Riesling種植',
      '因為品種本身完全消失了數十年',
      '因為只有干型Riesling才受市場青睞'
    ],
    correctIndex: 0,
    explanation: 'history記載Riesling二戰後受廉價甜型出口酒拖累形象，19世紀時其實曾與波爾多頂級酒莊並列售價、聲望極高。'
  },
  {
    id: 'lo3-rie-006',
    lo: 3,
    sourceType: 'data-object',
    sourceId: 'riesling',
    question: '下列哪一項是Riesling aromaWheel香氣輪中，特別標記為「陳年後才出現」的特徵香氣？',
    options: [
      '青蘋果',
      '萊姆',
      '陳年汽油感（Petrol）',
      '板岩礦石感'
    ],
    correctIndex: 2,
    explanation: 'aromaWheel列出Lime、Green Apple、Slate Mineral、Petrol，其中Petrol陳年汽油感是Riesling隨瓶陳發展出的獨特標誌性香氣，年輕酒款通常不明顯。'
  },
  {
    id: 'lo3-rie-007',
    lo: 3,
    sourceType: 'data-object',
    sourceId: 'riesling',
    question: '下列哪一個產區不屬於Riesling的代表性種植區域？',
    options: [
      'Mosel（摩塞爾）',
      'Clare Valley（克萊爾谷）',
      'Chianti Classico（經典奇揚地）',
      'Wachau（瓦豪）'
    ],
    correctIndex: 2,
    explanation: 'representativeRegions涵蓋Mosel、Rheingau、Alsace、Wachau、Clare Valley、Pfalz等產區，Chianti Classico是義大利以Sangiovese聞名的產區，不在Riesling清單中。'
  },
  {
    id: 'lo3-rie-008',
    lo: 3,
    sourceType: 'data-object',
    sourceId: 'riesling',
    question: 'Riesling建議的侍酒溫度區間為何？',
    options: [
      '10–13°C',
      '8–10°C',
      '13–15°C',
      '16–18°C'
    ],
    correctIndex: 1,
    explanation: 'servingTemp欄位標示為8–10°C，對應清淡不甜白酒/高酸品種的溫度區間。'
  },
  {
    id: 'lo3-rie-009',
    lo: 3,
    sourceType: 'data-object',
    sourceId: 'riesling',
    question: 'Riesling適合搭配下列哪些食物類型？',
    options: [
      '紅肉與野味',
      '甜點與水果',
      '醃肉開胃菜',
      '辛香料理、亞洲料理、甲殼海鮮、清淡開胃菜'
    ],
    correctIndex: 3,
    explanation: 'foodPairingTags列出Spicy、Asian Cuisine、Shellfish、Light Appetizer，Riesling的高酸與微甜特性使其特別適合搭配辛辣的亞洲料理，能中和辣度並平衡口感。'
  },
  {
    id: 'lo3-rie-010',
    lo: 3,
    sourceType: 'data-object',
    sourceId: 'riesling',
    question: '依profile資料，Riesling的酸度（acidity）評分與白蘇維醂（Sauvignon Blanc）相比如何？',
    options: [
      'Riesling遠低於白蘇維濃',
      '兩者評分相同，皆為9分，都是酸度最鮮明的白酒品種之一',
      'Riesling遠高於白蘇維濃',
      '兩者評分皆為5分'
    ],
    correctIndex: 1,
    explanation: 'Riesling與Sauvignon Blanc的profile.acidity皆為9，是酸度表現最突出的兩個白酒品種，但風味走向截然不同。'
  },
  {
    id: 'lo3-rie-011',
    lo: 3,
    sourceType: 'data-object',
    sourceId: 'riesling',
    question: '依profile資料，Riesling的陳年潛力（aging）評分為何，與其風格特性有何關聯？',
    options: [
      '2分，屬極低陳年潛力，僅適合年輕時飲用',
      '10分，滿分，優於所有品種',
      '7分，屬中高陳年潛力，與其極高酸度提供的陳年支撐力、以及發展出汽油礦石調性的特性相符',
      '陳年潛力與酸度無關'
    ],
    correctIndex: 2,
    explanation: 'profile.aging為7，高酸是白酒陳年潛力的關鍵支撐要素之一，這也解釋了為何Riesling能發展出獨特的陳年汽油礦石感。'
  },
  {
    id: 'lo3-rie-012',
    lo: 3,
    sourceType: 'data-object',
    sourceId: 'riesling',
    question: 'Riesling的果皮顏色分類與原產國為何？',
    options: [
      '黑皮，原產法國',
      '灰皮，原產奧地利',
      '白皮，原產紐西蘭',
      '白皮，原產德國'
    ],
    correctIndex: 3,
    explanation: "skinColor:'white'、originCountry:'Germany(德國)'。"
  },
  {
    id: 'lo3-rie-013',
    lo: 3,
    sourceType: 'data-object',
    sourceId: 'riesling',
    question: '為什麼說Riesling是「少數能明確追溯栽培源頭的歐洲古老品種之一」？',
    options: [
      '因其最早文獻記載明確可追溯至1435年德國萊茵高地區，栽培歷史脈絡清晰',
      '因為它是所有歐洲品種中最年輕的一個',
      '因為它從未離開過原產地',
      '因為它完全沒有任何歷史文獻記載'
    ],
    correctIndex: 0,
    explanation: '多數古老葡萄品種的確切起源已難以考證，Riesling憑藉1435年的明確文獻記載成為少數例外。'
  },
  {
    id: 'lo3-rie-014',
    lo: 3,
    sourceType: 'data-object',
    sourceId: 'riesling',
    question: 'Riesling的profile資料顯示其單寧（tannin）與酒體（body）評分分別為何？',
    options: [
      '單寧6分、酒體7分（厚重型）',
      '單寧3分、酒體9分',
      '單寧9分、酒體3分',
      '單寧0分（白酒不帶皮發酵）、酒體3分（輕盈型）'
    ],
    correctIndex: 3,
    explanation: 'profile中tannin為0（所有白葡萄品種共通特性）、body為3，反映Riesling典型的輕盈酒體與高酸清爽風格。'
  },
  {
    id: 'lo3-pgg-001',
    lo: 3,
    sourceType: 'data-object',
    sourceId: 'pinot-gris',
    question: 'Pinot Grigio與Pinot Gris這兩個稱呼所指的是什麼關係？',
    options: [
      '兩個完全不同的品種，只是名字相似',
      '義大利種植的是黑葡萄，法國種植的是白葡萄',
      '同一個品種，僅因產地與工法不同而呈現兩種截然不同的風格面貌',
      '兩者是親子關係，Pinot Gris是Pinot Grigio的變種'
    ],
    correctIndex: 2,
    explanation: 'styleSummary明確指出這是同一品種因產地與工法呈現兩種面貌：義大利Pinot Grigio清爽中性，阿爾薩斯Pinot Gris則酒體飽滿油脂感強烈。'
  },
  {
    id: 'lo3-pgg-002',
    lo: 3,
    sourceType: 'data-object',
    sourceId: 'pinot-gris',
    question: '灰皮諾（Pinot Gris）這個品種名稱的由來為何？',
    options: [
      '因為它是黑皮諾的基因突變種，果皮呈現介於白與黑之間的灰粉色，因此得名',
      '因為它總是在灰色天氣下採收',
      '因為它是刻意雜交培育的新品種',
      '因為它的釀酒容器多為灰色橡木桶'
    ],
    correctIndex: 0,
    explanation: 'history記載灰皮諾是黑皮諾的基因突變種，果皮呈灰粉色因而得名。'
  },
  {
    id: 'lo3-pgg-003',
    lo: 3,
    sourceType: 'data-object',
    sourceId: 'pinot-gris',
    question: '灰皮諾19世紀由匈牙利傳入阿爾薩斯後，發展出什麼樣的風格定位？',
    options: [
      '清爽中性、早飲易感的風格',
      '完全被市場淘汰、停止種植',
      '酒體飽滿、油脂感強烈，長期被視為阿爾薩斯貴族品種之一',
      '專門用於釀造氣泡酒'
    ],
    correctIndex: 2,
    explanation: 'history記載灰皮諾19世紀傳入阿爾薩斯後發展出酒體飽滿、油脂感強烈的風格，長期被認為是阿爾薩斯貴族品種之一。'
  },
  {
    id: 'lo3-pgg-004',
    lo: 3,
    sourceType: 'data-object',
    sourceId: 'pinot-gris',
    question: '20世紀末哪個產區以清爽中性風格的Pinot Grigio席捲國際市場？',
    options: [
      '德國萊茵高',
      '義大利東北部（Friuli、Veneto）',
      '澳洲巴羅莎谷',
      '美國納帕谷'
    ],
    correctIndex: 1,
    explanation: 'history記載20世紀末義大利東北部（Friuli、Veneto）以清爽中性、早飲易感的Pinot Grigio風格席捲國際市場。'
  },
  {
    id: 'lo3-pgg-005',
    lo: 3,
    sourceType: 'data-object',
    sourceId: 'pinot-gris',
    question: '關於Pinot Grigio與Pinot Gris的風格差異，正確的理解為何？',
    options: [
      '義大利式（Grigio）早摘保酸、不鏽鋼槽發酵，追求清爽中性；阿爾薩斯式（Gris）晚摘、酒體飽滿甚至微帶殘糖',
      '兩者風味相近，選購時不需特別區分',
      '義大利式（Grigio）晚摘、酒體飽滿；阿爾薩斯式（Gris）早摘保酸、追求清爽',
      '兩者的差異來自完全不同的基因型'
    ],
    correctIndex: 0,
    explanation: 'confusionNote明確說明差異純粹來自產地與釀造哲學而非基因，並詳細對比兩種風格的釀造選項差異。'
  },
  {
    id: 'lo3-pgg-006',
    lo: 3,
    sourceType: 'data-object',
    sourceId: 'pinot-gris',
    question: '選購Pinot Grigio/Gris類型酒款時，confusionNote建議消費者應以什麼作為判斷風格的依據？',
    options: [
      '完全依賴酒精濃度數字',
      '酒標上的語言（義大利文標示Grigio或法文標示Gris），而非假設兩者風味相近',
      '完全依賴瓶身顏色',
      '完全依賴價格高低'
    ],
    correctIndex: 1,
    explanation: 'confusionNote強調選購時務必以酒標語言判斷預期風格，而非假設兩者風味相近。'
  },
  {
    id: 'lo3-pgg-007',
    lo: 3,
    sourceType: 'data-object',
    sourceId: 'pinot-gris',
    question: '德國對於灰皮諾這個品種的稱呼為何？',
    options: [
      'Weissburgunder',
      'Grauburgunder',
      'Spätburgunder',
      'Silvaner'
    ],
    correctIndex: 1,
    explanation: 'styleSummary提及德國稱灰皮諾為Grauburgunder（"grau"即德文的「灰色」）。'
  },
  {
    id: 'lo3-pgg-008',
    lo: 3,
    sourceType: 'data-object',
    sourceId: 'pinot-gris',
    question: '下列哪一個產區不屬於Pinot Gris的代表性種植區域？',
    options: [
      'Alsace（阿爾薩斯）',
      'Alto Adige（上阿迪杰）',
      'Collio（科里奧）',
      'Mosel（摩塞爾）'
    ],
    correctIndex: 3,
    explanation: 'representativeRegions涵蓋Alsace、Alto Adige、Collio等產區，Mosel是Riesling的代表產區，不在Pinot Gris清單中。'
  },
  {
    id: 'lo3-pgg-009',
    lo: 3,
    sourceType: 'data-object',
    sourceId: 'pinot-gris',
    question: 'Pinot Gris的aromaWheel香氣輪列出哪些核心香氣？',
    options: [
      '醋栗、青草、百香果、燧石',
      '萊姆、青蘋果、板岩礦石感、陳年汽油感',
      '梨子、白桃、蜂蜜、杏仁',
      '黑莓、黑胡椒、皮革、菸草'
    ],
    correctIndex: 2,
    explanation: 'aromaWheel列出Pear、White Peach、Honey、Almond，這組香氣組合橫跨清爽果香與較濃郁的蜂蜜杏仁調性，呼應其風格光譜的兩極特性。'
  },
  {
    id: 'lo3-pgg-010',
    lo: 3,
    sourceType: 'data-object',
    sourceId: 'pinot-gris',
    question: 'Pinot Gris建議的侍酒溫度區間為何？',
    options: [
      '10–13°C',
      '13–15°C',
      '16–18°C',
      '8–10°C'
    ],
    correctIndex: 3,
    explanation: 'servingTemp欄位標示為8–10°C。'
  },
  {
    id: 'lo3-pgg-011',
    lo: 3,
    sourceType: 'data-object',
    sourceId: 'pinot-gris',
    question: 'Pinot Gris適合搭配下列哪些食物類型？',
    options: [
      '低脂、海鮮、開胃菜、亞洲料理',
      '紅肉與野味',
      '甜點與水果',
      '醃肉開胃菜'
    ],
    correctIndex: 0,
    explanation: 'foodPairingTags列出Light Fat、Seafood、Appetizer、Asian Cuisine，適合搭配清淡海鮮類料理。'
  },
  {
    id: 'lo3-pgg-012',
    lo: 3,
    sourceType: 'data-object',
    sourceId: 'pinot-gris',
    question: '依profile資料，Pinot Gris的陳年潛力（aging）評分為何？',
    options: [
      '7分，中高陳年潛力',
      '9分，接近滿分',
      '5分，中等偏上',
      '3分，屬偏低陳年潛力，多數風格適合年輕時飲用'
    ],
    correctIndex: 3,
    explanation: 'profile.aging為3，與其多數風格（尤其義大利式清爽路線）適合早飲的特性相符。'
  },
  {
    id: 'lo3-pgg-013',
    lo: 3,
    sourceType: 'data-object',
    sourceId: 'pinot-gris',
    question: '依profile資料，Pinot Gris的酸度（acidity）評分與白蘇維濃（Sauvignon Blanc，9分）相比如何？',
    options: [
      'Pinot Gris更高，為10分',
      'Pinot Gris遠低於白蘇維濃，僅為5分，酸度中等而非銳利',
      '兩者評分相同',
      'Pinot Gris完全沒有酸度'
    ],
    correctIndex: 1,
    explanation: 'profile.acidity為5，明顯低於白蘇維濃的9分，反映Pinot Gris走中性易飲路線而非白蘇維濃的高酸鮮明風格。'
  },
  {
    id: 'lo3-pgg-014',
    lo: 3,
    sourceType: 'data-object',
    sourceId: 'pinot-gris',
    question: 'Pinot Gris的原產國標示為何，這點與其「灰皮諾是黑皮諾的基因突變種」的身世有何關聯？',
    options: [
      '原產法國，因其突變自法國原生的黑皮諾品種',
      '原產義大利，與法國品種黑皮諾無關',
      '原產德國，與其命名Grauburgunder相符',
      '原產匈牙利，因19世紀由此傳入阿爾薩斯'
    ],
    correctIndex: 0,
    explanation: 'originCountry標示為France(法國)，與其作為黑皮諾基因突變種的起源相符，儘管後來在阿爾薩斯、義大利、匈牙利等地都有重要發展歷史。'
  },
  {
    id: 'lo3-cs-001',
    lo: 3,
    sourceType: 'data-object',
    sourceId: 'cabernet-sauvignon',
    question: 'Cabernet Sauvignon的風格核心特徵為何？',
    options: [
      '厚實高單寧的晚熟品種，黑醋栗與雪松骨架鮮明，適應多元氣候並具備極佳陳年潛力',
      '薄皮早熟、低單寧品種，主要用於粉紅酒釀造',
      '專門用於甜酒釀造，天然酸度極低',
      '僅適合單一冷涼氣候類型種植，無法適應溫暖產區'
    ],
    correctIndex: 0,
    explanation: 'styleSummary明確描述為厚實高單寧的晚熟品種，黑醋栗與雪松骨架鮮明，適應多元氣候並具極佳陳年潛力。'
  },
  {
    id: 'lo3-cs-002',
    lo: 3,
    sourceType: 'data-object',
    sourceId: 'cabernet-sauvignon',
    question: 'Cabernet Sauvignon的起源與DNA鑑定結果為何？',
    options: [
      '是古羅馬時期就存在的純種古老品種，血統從未間斷',
      '起源於義大利，2000年代才傳入法國波爾多',
      '親本經鑑定為黑皮諾與Gouais Blanc',
      '波爾多西部18世紀的自然雜交品種，1996年加州大學戴維斯分校團隊證實親本為卡本內弗朗與白蘇維濃'
    ],
    correctIndex: 3,
    explanation: 'history記載1996年UC Davis團隊證實親本為卡本內弗朗與白蘇維濃（一紅一白的意外配對）。'
  },
  {
    id: 'lo3-cs-003',
    lo: 3,
    sourceType: 'data-object',
    sourceId: 'cabernet-sauvignon',
    question: '厚實果皮與晚熟特性，使Cabernet Sauvignon特別適應波爾多左岸的什麼地理條件？',
    options: [
      '肥沃黏土平原，水分充足',
      '礫石台地——良好排水且白天蓄熱、夜間釋熱，有助於晚熟品種完成成熟',
      '偏好陰涼潮濕的森林邊緣地帶',
      '與土壤條件完全無關，純粹是歷史偶然形成的種植傳統'
    ],
    correctIndex: 1,
    explanation: '礫石台地排水良好且具蓄熱效果，有助於晚熟品種完成成熟。'
  },
  {
    id: 'lo3-cs-004',
    lo: 3,
    sourceType: 'data-object',
    sourceId: 'cabernet-sauvignon',
    question: 'Cabernet Sauvignon與其父本卡本內弗朗（Cabernet Franc）在風格上的關鍵區辨為何？',
    options: [
      '卡本內蘇維濃單寧最緊實、晚熟、黑醋栗與石墨氣息主導；卡本內弗朗顏色較淺、青椒與覆盆莓氣息更明顯、單寧較柔和',
      '兩者風味完全相同，盲飲無法區分',
      '卡本內弗朗單寧比卡本內蘇維濃更緊實厚重',
      '卡本內蘇維濃顏色較淺，卡本內弗朗顏色較深'
    ],
    correctIndex: 0,
    explanation: 'confusionNote明確對比兩者單寧、熟度與香氣特徵的差異。'
  },
  {
    id: 'lo3-cs-005',
    lo: 3,
    sourceType: 'data-object',
    sourceId: 'cabernet-sauvignon',
    question: '在與Merlot的波爾多混調中，Cabernet Sauvignon通常扮演的角色為何？',
    options: [
      '提供骨架與陳年潛力，而非果香奔放度，因其單寧緊實、晚熟',
      '提供柔和果香與易飲度，骨架則由Merlot負責',
      '兩者在混調中角色完全相同，可互相替代',
      '只作為調色劑使用，不影響風味結構'
    ],
    correctIndex: 0,
    explanation: 'confusionNote指出混調時卡本內蘇維濃通常負責提供骨架與陳年潛力，梅洛則負責果香與易飲度。'
  },
  {
    id: 'lo3-cs-006',
    lo: 3,
    sourceType: 'data-object',
    sourceId: 'cabernet-sauvignon',
    question: 'Cabernet Sauvignon的aromaWheel香氣輪列出哪些核心香氣？',
    options: [
      '紅李、黑櫻桃、巧克力、月桂葉',
      '梨子、白桃、蜂蜜、杏仁',
      '黑醋栗、雪松、石墨、薄荷',
      '草莓乾、皮革、菸草、香草'
    ],
    correctIndex: 2,
    explanation: 'aromaWheel列出Blackcurrant、Cedar、Graphite、Mint；其餘選項為其他品種的特徵香氣。'
  },
  {
    id: 'lo3-cs-007',
    lo: 3,
    sourceType: 'data-object',
    sourceId: 'cabernet-sauvignon',
    question: '下列哪一個產區不屬於Cabernet Sauvignon的代表性種植區域？',
    options: [
      'Napa Valley（納帕谷）',
      'Pauillac（波雅克）',
      'Mosel（摩塞爾）',
      'Margaret River（瑪格麗特河）'
    ],
    correctIndex: 2,
    explanation: 'representativeRegions涵蓋Pauillac、Napa Valley、Margaret River等產區，Mosel是Riesling的代表產區。'
  },
  {
    id: 'lo3-cs-008',
    lo: 3,
    sourceType: 'data-object',
    sourceId: 'cabernet-sauvignon',
    question: 'Cabernet Sauvignon建議的侍酒溫度區間為何？',
    options: [
      '6–8°C',
      '8–10°C',
      '10–13°C',
      '16–18°C'
    ],
    correctIndex: 3,
    explanation: 'servingTemp欄位標示為16–18°C。'
  },
  {
    id: 'lo3-cs-009',
    lo: 3,
    sourceType: 'data-object',
    sourceId: 'cabernet-sauvignon',
    question: 'Cabernet Sauvignon適合搭配下列哪些食物類型？',
    options: [
      '海鮮、開胃菜、亞洲料理、清淡料理',
      '高脂、紅肉、硬質起司、燒烤',
      '甜點與水果',
      '醃肉與開胃菜'
    ],
    correctIndex: 1,
    explanation: 'foodPairingTags列出High Fat、Red Meat、Hard Cheese、Grilled。'
  },
  {
    id: 'lo3-cs-010',
    lo: 3,
    sourceType: 'data-object',
    sourceId: 'cabernet-sauvignon',
    question: '依profile資料，Cabernet Sauvignon的單寧（tannin）評分為何，這與其品種特性有何關聯？',
    options: [
      '2分，屬於單寧極輕盈的品種',
      '8分，屬於單寧最緊實厚重的品種之一，與其晚熟厚皮的特性相符',
      '單寧評分與果皮厚度完全無關',
      '8分，但屬於單寧口感最柔和圓潤的品種之一'
    ],
    correctIndex: 1,
    explanation: 'profile.tannin為8，與其厚實果皮、晚熟特性直接相關。'
  },
  {
    id: 'lo3-cs-011',
    lo: 3,
    sourceType: 'data-object',
    sourceId: 'cabernet-sauvignon',
    question: '依profile資料，Cabernet Sauvignon與Merlot的陳年潛力（aging）評分相比如何？',
    options: [
      'Cabernet Sauvignon（9分）略高於Merlot（7分），與其更高單寧、更厚實骨架的特性相符',
      '兩者陳年潛力評分完全相同',
      'Merlot的陳年潛力遠高於Cabernet Sauvignon',
      '陳年潛力評分與單寧含量沒有任何關聯'
    ],
    correctIndex: 0,
    explanation: 'Cabernet Sauvignon的profile.aging為9，高於Merlot的7。'
  },
  {
    id: 'lo3-cs-012',
    lo: 3,
    sourceType: 'data-object',
    sourceId: 'cabernet-sauvignon',
    question: 'Cabernet Sauvignon目前在全球葡萄酒版圖中的種植地位為何？',
    options: [
      '種植面積持續萎縮，如今僅剩波爾多小範圍種植',
      '是全球種植面積最廣的頂級紅酒品種之一，從納帕谷、庫納瓦拉到智利馬波河谷都有代表性演繹',
      '只能在法國種植，未曾成功移植海外產區',
      '種植面積雖廣，但國際品質評價普遍偏低'
    ],
    correctIndex: 1,
    explanation: 'history記載19世紀隨波爾多國際聲望擴散至新世界，如今已是全球種植面積最廣的頂級紅酒品種之一。'
  },
  {
    id: 'lo3-cs-013',
    lo: 3,
    sourceType: 'data-object',
    sourceId: 'cabernet-sauvignon',
    question: 'Cabernet Sauvignon的果皮顏色分類與原產國為何？',
    options: [
      '白皮，原產法國',
      '黑皮，原產義大利',
      '黑皮，原產法國',
      '灰皮，原產德國'
    ],
    correctIndex: 2,
    explanation: "skinColor:'red'（黑皮）、originCountry:'France(法國)'。"
  },
  {
    id: 'lo3-cs-014',
    lo: 3,
    sourceType: 'data-object',
    sourceId: 'cabernet-sauvignon',
    question: '依profile資料，Cabernet Sauvignon的花香（floral）評分僅2分，這反映了什麼風格特徵？',
    options: [
      '花香調性是其全品種中最濃郁鮮明的特徵',
      'floral評分與品種風味特徵完全無關，純屬隨機數值',
      'floral評分必然與profile.tannin評分呈正相關',
      '其風味核心以黑色果香、雪松、石墨等厚重調性為主，花香調性並非重點'
    ],
    correctIndex: 3,
    explanation: 'floral僅2分，與aromaWheel列出的黑醋栗、雪松、石墨、薄荷等厚重調性相符。'
  },
  {
    id: 'lo3-mer-001',
    lo: 3,
    sourceType: 'data-object',
    sourceId: 'merlot',
    question: 'Merlot的風格核心特徵為何？',
    options: [
      '晚熟且單寧極度緊澀，僅適合長期橡木桶陳年後才能飲用',
      '早熟且單寧圓潤，果香飽滿豐腴，常作為卡本內蘇維濃的混調搭檔，亦可獨立展現絲滑質地',
      '是白葡萄品種，主要用於釀造氣泡酒基酒',
      '天然酸度極高，是所有紅酒品種中酸度最鮮明的'
    ],
    correctIndex: 1,
    explanation: 'styleSummary描述為早熟且單寧圓潤，果香飽滿豐腴，常作為卡本內蘇維濃的混調搭檔。'
  },
  {
    id: 'lo3-mer-002',
    lo: 3,
    sourceType: 'data-object',
    sourceId: 'merlot',
    question: 'Merlot名稱的由來為何？',
    options: [
      '源自釀酒師的姓氏',
      '源自法語merle（烏鶇），因果實色澤或烏鶇喜愛啄食而得名',
      '源自波爾多某個城堡的名稱',
      '源自拉丁語意指陽光'
    ],
    correctIndex: 1,
    explanation: 'history記載Merlot名稱源自法語merle（烏鶇），起源於波爾多右岸，18世紀文獻已有記載。'
  },
  {
    id: 'lo3-mer-003',
    lo: 3,
    sourceType: 'data-object',
    sourceId: 'merlot',
    question: '相較於Cabernet Sauvignon，Merlot的發芽與成熟時序、以及對哪種土壤條件的適應力更強？',
    options: [
      '發芽與成熟皆更晚，適應力較弱，僅能在特定小範圍種植',
      '發芽與成熟時序與Cabernet Sauvignon完全相同',
      '發芽與成熟皆更早，對黏土與石灰岩台地的適應力更強',
      '只能種植於礫石台地，無法適應黏土'
    ],
    correctIndex: 2,
    explanation: 'Merlot發芽與成熟皆更早，對黏土與石灰岩台地的適應力更強，這是右岸聖愛美濃、玻美侯改以梅洛為主力的關鍵風土因素。'
  },
  {
    id: 'lo3-mer-004',
    lo: 3,
    sourceType: 'data-object',
    sourceId: 'merlot',
    question: '20世紀末Merlot種植面積一度超越Cabernet Sauvignon，成為全球種植最廣的紅酒品種之一，主要原因為何？',
    options: [
      '法規強制規定各產區必須優先種植Merlot',
      '國際市場對「順口易飲」紅酒的需求上升',
      'Cabernet Sauvignon因病蟲害大量絕種',
      'Merlot的售價遠低於其他品種，帶動大量種植'
    ],
    correctIndex: 1,
    explanation: '20世紀末隨國際市場對「順口易飲」紅酒需求上升，梅洛種植面積一度超越卡本內蘇維濃。'
  },
  {
    id: 'lo3-mer-005',
    lo: 3,
    sourceType: 'data-object',
    sourceId: 'merlot',
    question: 'Merlot與Cabernet Sauvignon作為波爾多混調經典搭檔，兩者風格關係的正確描述為何？',
    options: [
      '兩者風格幾乎相同，混調沒有太大實質意義',
      '梅洛單寧圓潤早熟、紅李與巧克力調性、酒體較豐腴；卡本內蘇維濃單寧緊實晚熟、黑醋栗與雪松調性、骨架更堅硬',
      '梅洛的單寧比卡本內蘇維濃更緊實',
      '卡本內蘇維濃的酒體比梅洛更豐腴圓潤'
    ],
    correctIndex: 1,
    explanation: '兩者是波爾多混調的經典搭檔但風格互補而非相近。'
  },
  {
    id: 'lo3-mer-006',
    lo: 3,
    sourceType: 'data-object',
    sourceId: 'merlot',
    question: 'Merlot與卡本內弗朗（Cabernet Franc）相比，風格上的關鍵差異為何？',
    options: [
      '兩者風味特徵完全相同，無法區分',
      '卡本內弗朗顏色比梅洛更深',
      '梅洛顏色更深、果香更甜熟；卡本內弗朗則帶明顯青椒與覆盆莓的清爽草本調性',
      '梅洛帶明顯青椒調性，卡本內弗朗則以甜熟果香為主'
    ],
    correctIndex: 2,
    explanation: '與卡本內弗朗相比，梅洛顏色更深、果香更甜熟，卡本內弗朗則帶明顯青椒與覆盆莓的清爽草本調性。'
  },
  {
    id: 'lo3-mer-007',
    lo: 3,
    sourceType: 'data-object',
    sourceId: 'merlot',
    question: 'Merlot的aromaWheel香氣輪列出哪些核心香氣？',
    options: [
      '紅李、黑櫻桃、巧克力、月桂葉',
      '黑醋栗、雪松、石墨、薄荷',
      '醋栗、青草、百香果、燧石',
      '玫瑰、焦油、櫻桃乾、甘草'
    ],
    correctIndex: 0,
    explanation: 'aromaWheel列出Red Plum、Black Cherry、Chocolate、Bay Leaf。'
  },
  {
    id: 'lo3-mer-008',
    lo: 3,
    sourceType: 'data-object',
    sourceId: 'merlot',
    question: '下列哪一個產區不屬於Merlot的代表性種植區域？',
    options: [
      'Barolo（巴羅洛）',
      'Saint-Émilion（聖愛美濃）',
      'Pomerol（玻美侯）',
      'Columbia Valley（哥倫比亞河谷）'
    ],
    correctIndex: 0,
    explanation: 'representativeRegions涵蓋Saint-Émilion、Pomerol、Columbia Valley等產區，Barolo是義大利以Nebbiolo聞名的產區。'
  },
  {
    id: 'lo3-mer-009',
    lo: 3,
    sourceType: 'data-object',
    sourceId: 'merlot',
    question: 'Merlot建議的侍酒溫度區間為何？',
    options: [
      '6–8°C',
      '10–13°C',
      '16–18°C',
      '8–10°C'
    ],
    correctIndex: 2,
    explanation: 'servingTemp欄位標示為16–18°C。'
  },
  {
    id: 'lo3-mer-010',
    lo: 3,
    sourceType: 'data-object',
    sourceId: 'merlot',
    question: 'Merlot適合搭配下列哪些食物類型？',
    options: [
      '中脂、紅肉、鮮味、烤物',
      '海鮮與甲殼類',
      '甜點與水果',
      '低脂開胃菜'
    ],
    correctIndex: 0,
    explanation: 'foodPairingTags列出Moderate Fat、Red Meat、Umami、Roasted。'
  },
  {
    id: 'lo3-mer-011',
    lo: 3,
    sourceType: 'data-object',
    sourceId: 'merlot',
    question: '依profile資料，Merlot的單寧（tannin）評分與Cabernet Sauvignon相比如何？',
    options: [
      '兩者單寧評分完全相同',
      'Merlot的單寧評分遠高於Cabernet Sauvignon',
      '單寧評分與品種特性無關',
      'Merlot（6分）低於Cabernet Sauvignon（8分），反映其單寧較圓潤柔和的風格'
    ],
    correctIndex: 3,
    explanation: 'Merlot的profile.tannin為6，低於Cabernet Sauvignon的8。'
  },
  {
    id: 'lo3-mer-012',
    lo: 3,
    sourceType: 'data-object',
    sourceId: 'merlot',
    question: '依profile資料，Merlot的酒體（body）與酒精濃度（alcohol）評分分別為何？',
    options: [
      '酒體7分、酒精濃度7分，屬中高酒體與酒精度的紅酒風格',
      '酒體2分、酒精濃度3分，屬清淡型紅酒',
      '酒體10分，是所有品種中酒體最厚重的',
      '酒體與酒精濃度評分皆為0'
    ],
    correctIndex: 0,
    explanation: 'profile中body為7、alcohol為7。'
  },
  {
    id: 'lo3-mer-013',
    lo: 3,
    sourceType: 'data-object',
    sourceId: 'merlot',
    question: 'Merlot的果皮顏色分類與原產國為何？',
    options: [
      '白皮，原產法國',
      '黑皮，原產義大利',
      '灰皮，原產西班牙',
      '黑皮，原產法國'
    ],
    correctIndex: 3,
    explanation: "skinColor:'red'（黑皮）、originCountry:'France(法國)'。"
  },
  {
    id: 'lo3-mer-014',
    lo: 3,
    sourceType: 'data-object',
    sourceId: 'merlot',
    question: '依profile資料，Merlot的陳年潛力（aging）評分為7分，這與其品種特性的關聯為何？',
    options: [
      '代表Merlot完全不具備任何陳年價值',
      '陳年潛力評分與單寧或酒體皆無關聯',
      '代表Merlot的陳年潛力是所有紅酒品種中最高的',
      '反映其雖不如Cabernet Sauvignon極致，但仍具備一定陳年潛力，尤其經橡木桶陳年的版本'
    ],
    correctIndex: 3,
    explanation: 'profile.aging為7，僅略低於Cabernet Sauvignon的9。'
  },
  {
    id: 'lo3-pn-001',
    lo: 3,
    sourceType: 'data-object',
    sourceId: 'pinot-noir',
    question: 'Pinot Noir的風格核心特徵為何？',
    options: [
      '厚皮晚熟品種，單寧極度厚重，僅適合溫暖氣候種植',
      '薄皮早熟品種，單寧輕盈、酸度明亮，紅色漿果與泥土氣息展現細膩風土差異，是風土表現力最強的品種之一',
      '是白葡萄品種，主要用於釀造氣泡酒基酒',
      '天然完全不具備陳年潛力，須立即飲用'
    ],
    correctIndex: 1,
    explanation: 'styleSummary描述為薄皮早熟品種，單寧輕盈、酸度明亮，是風土表現力最強的品種之一。'
  },
  {
    id: 'lo3-pn-002',
    lo: 3,
    sourceType: 'data-object',
    sourceId: 'pinot-noir',
    question: 'DNA證據顯示Pinot Noir的栽培歷史可追溯至何時、何地？',
    options: [
      '羅馬時期以前的勃根地地區，是全球最古老的葡萄品種之一',
      '18世紀的澳洲，是相對年輕的品種',
      '20世紀的美國加州',
      '16世紀的西班牙赫雷斯'
    ],
    correctIndex: 0,
    explanation: 'DNA證據顯示Pinot Noir栽培歷史可追溯至羅馬時期以前的勃根地地區。'
  },
  {
    id: 'lo3-pn-003',
    lo: 3,
    sourceType: 'data-object',
    sourceId: 'pinot-noir',
    question: 'Pinot Noir因基因極不穩定、易突變，衍生出哪些近親變種？',
    options: [
      '卡本內蘇維濃、梅洛',
      '希哈、格那希',
      '田帕尼優、山吉歐維榭',
      '灰皮諾、白皮諾等眾多近親變種'
    ],
    correctIndex: 3,
    explanation: '黑皮諾是極不穩定的品種，因基因易突變衍生出灰皮諾、白皮諾等眾多近親變種。'
  },
  {
    id: 'lo3-pn-004',
    lo: 3,
    sourceType: 'data-object',
    sourceId: 'pinot-noir',
    question: '中世紀由哪個團體在勃根地系統化栽培Pinot Noir，並發展出以地塊（Climat）為核心的風土分級概念？',
    options: [
      '波爾多商會',
      '熙篤會修士',
      '羅馬軍團',
      '法國皇室'
    ],
    correctIndex: 1,
    explanation: '中世紀由熙篤會修士在勃根地系統化栽培，逐步發展出以地塊為核心的風土分級概念。'
  },
  {
    id: 'lo3-pn-005',
    lo: 3,
    sourceType: 'data-object',
    sourceId: 'pinot-noir',
    question: 'Pinot Noir的薄皮特性使其對什麼特別敏感，種植難度公認為何？',
    options: [
      '完全不受任何天氣因素影響，種植難度最低',
      '只對高溫敏感，霜害完全不構成威脅',
      '薄皮特性與種植難度無關',
      '對霜害、病害極度敏感，種植難度公認是頂級品種中最高的之一'
    ],
    correctIndex: 3,
    explanation: '薄皮特性使其對霜害、病害極度敏感，種植難度公認是頂級品種中最高的之一。'
  },
  {
    id: 'lo3-pn-006',
    lo: 3,
    sourceType: 'data-object',
    sourceId: 'pinot-noir',
    question: 'Pinot Noir與加美（Gamay）相比，兩者風格上的關鍵差異為何？',
    options: [
      '兩者風格幾乎完全相同，僅產區命名不同',
      '加美的單寧與酒體遠比黑皮諾更重',
      '黑皮諾單寧與酒體皆更重、陳年潛力強，加美單寧極輕、多以二氧化碳浸漬工法早飲',
      '黑皮諾多以二氧化碳浸漬工法釀造，加美則走陳年路線'
    ],
    correctIndex: 2,
    explanation: '兩者常因同樣產自勃根地/薄酒萊地區而被連結，但風格差異極大。'
  },
  {
    id: 'lo3-pn-007',
    lo: 3,
    sourceType: 'data-object',
    sourceId: 'pinot-noir',
    question: 'Pinot Noir與格那希（Grenache）相比，酸度與酒精度的差異為何？',
    options: [
      '黑皮諾酸度遠高於格那希、酒精度也通常較低，格那希的甜熟果香與較低酸度是明顯區隔',
      '兩者酸度與酒精度完全相同',
      '格那希酸度遠高於黑皮諾',
      '黑皮諾的酒精度通常高於格那希'
    ],
    correctIndex: 0,
    explanation: '與格那希相比，黑皮諾顏色相近但酸度遠高於格那希、酒精度也通常較低。'
  },
  {
    id: 'lo3-pn-008',
    lo: 3,
    sourceType: 'data-object',
    sourceId: 'pinot-noir',
    question: 'Pinot Noir的aromaWheel香氣輪列出哪些核心香氣？',
    options: [
      '紅櫻桃、覆盆子、蘑菇、玫瑰',
      '黑醋栗、雪松、石墨、薄荷',
      '黑胡椒、黑莓、煙燻肉香、紫羅蘭',
      '紅李、黑櫻桃、巧克力、月桂葉'
    ],
    correctIndex: 0,
    explanation: 'aromaWheel列出Red Cherry、Raspberry、Mushroom、Rose。'
  },
  {
    id: 'lo3-pn-009',
    lo: 3,
    sourceType: 'data-object',
    sourceId: 'pinot-noir',
    question: '下列哪一個產區不屬於Pinot Noir的代表性種植區域？',
    options: [
      'Sonoma Coast（索諾瑪海岸）',
      'Central Otago（中奧塔哥）',
      'Barossa Valley（巴羅莎谷）',
      'Côte de Nuits（夜丘）'
    ],
    correctIndex: 3,
    explanation: 'representativeRegions涵蓋Côte de Nuits、Sonoma Coast、Central Otago等產區，Barossa Valley是澳洲以Shiraz聞名的產區。'
  },
  {
    id: 'lo3-pn-010',
    lo: 3,
    sourceType: 'data-object',
    sourceId: 'pinot-noir',
    question: 'Pinot Noir建議的侍酒溫度區間為何？',
    options: [
      '6–8°C',
      '14–15°C',
      '10–13°C',
      '16–18°C'
    ],
    correctIndex: 1,
    explanation: 'servingTemp欄位標示為14–15°C，介於清淡型與濃郁型紅酒之間。'
  },
  {
    id: 'lo3-pn-011',
    lo: 3,
    sourceType: 'data-object',
    sourceId: 'pinot-noir',
    question: 'Pinot Noir適合搭配下列哪些食物類型？',
    options: [
      '高脂、紅肉、野味、燒烤',
      '海鮮與甲殼類',
      '中脂、白肉、蕈菇鮮味、鴨肉',
      '甜點與水果'
    ],
    correctIndex: 2,
    explanation: 'foodPairingTags列出Moderate Fat、White Meat、Mushroom Umami、Duck。'
  },
  {
    id: 'lo3-pn-012',
    lo: 3,
    sourceType: 'data-object',
    sourceId: 'pinot-noir',
    question: '依profile資料，Pinot Noir的單寧（tannin）評分為何，與Cabernet Sauvignon（8分）相比如何？',
    options: [
      '4分，明顯低於Cabernet Sauvignon，反映其單寧輕盈的薄皮品種特性',
      '9分，遠高於Cabernet Sauvignon',
      '兩者單寧評分完全相同',
      '單寧評分與果皮厚度無關'
    ],
    correctIndex: 0,
    explanation: 'profile.tannin為4，明顯低於Cabernet Sauvignon的8。'
  },
  {
    id: 'lo3-pn-013',
    lo: 3,
    sourceType: 'data-object',
    sourceId: 'pinot-noir',
    question: '依profile資料，Pinot Noir的花香（floral）評分為8分，這在所有品種中屬於什麼水準？',
    options: [
      '屬於花香調性最不明顯的品種之一',
      '花香評分與aromaWheel香氣描述完全無關',
      '屬於花香調性最鮮明濃郁的品種之一，與其aromaWheel中的玫瑰香氣相呼應',
      '8分代表完全沒有花香調性'
    ],
    correctIndex: 2,
    explanation: 'profile.floral為8，與aromaWheel中列出的Rose（玫瑰）香氣相呼應。'
  },
  {
    id: 'lo3-pn-014',
    lo: 3,
    sourceType: 'data-object',
    sourceId: 'pinot-noir',
    question: 'Pinot Noir的果皮顏色分類與原產國為何，德語產區如何稱呼此品種？',
    options: [
      '白皮，原產德國，法國稱之為Pinot Gris',
      '黑皮，原產法國，德語產區稱之為Spätburgunder',
      '黑皮，原產義大利，德語產區稱之為Grauburgunder',
      '灰皮，原產法國，無其他別名'
    ],
    correctIndex: 1,
    explanation: "skinColor:'red'、originCountry:'France(法國)'，德語產區稱之為Spätburgunder。"
  },
  {
    id: 'lo3-syr-001',
    lo: 3,
    sourceType: 'data-object',
    sourceId: 'syrah-shiraz',
    question: 'Syrah/Shiraz的風格核心特徵為何？',
    options: [
      '薄皮早熟品種，單寧極輕盈，僅適合冷涼氣候種植',
      '是白葡萄品種，主要用於釀造貴腐甜酒',
      '風格完全不受產地影響，全球風格皆一致',
      '厚皮品種，舊世界（北隆河）展現冷香料與黑胡椒骨架，新世界（澳洲）則濃縮成熟果醬與巧克力，風格因產地而異'
    ],
    correctIndex: 3,
    explanation: 'styleSummary描述為厚皮品種，舊世界展現冷香料與黑胡椒骨架，新世界則濃縮成熟果醬與巧克力，風格因產地而異。'
  },
  {
    id: 'lo3-syr-002',
    lo: 3,
    sourceType: 'data-object',
    sourceId: 'syrah-shiraz',
    question: '2000年代DNA親緣分析確認Syrah的親本為何，推翻了什麼長期流傳的傳說？',
    options: [
      '親本為黑皮諾與Gouais Blanc，推翻了法國本土起源說',
      '親本為Dureza與Mondeuse Blanche兩個古老隆河品種，推翻了長期流傳的波斯或敘利亞起源傳說',
      '親本為卡本內弗朗與白蘇維濃，推翻了隆河起源說',
      '至今尚無任何DNA分析研究，起源仍完全成謎'
    ],
    correctIndex: 1,
    explanation: 'DNA親緣分析確認Syrah親本為Dureza與Mondeuse Blanche兩個古老隆河品種，推翻了波斯或敘利亞起源傳說。'
  },
  {
    id: 'lo3-syr-003',
    lo: 3,
    sourceType: 'data-object',
    sourceId: 'syrah-shiraz',
    question: '18世紀末是誰將Syrah引入澳洲，並在當地發展出濃縮成熟風格、改稱為Shiraz？',
    options: [
      '法國波爾多商人',
      '蘇格蘭移民詹姆士．布斯比',
      '德國修士',
      '義大利釀酒師'
    ],
    correctIndex: 1,
    explanation: '18世紀末由蘇格蘭移民詹姆士．布斯比引入澳洲，在此發展出與原鄉截然不同的濃縮成熟風格，並改稱Shiraz。'
  },
  {
    id: 'lo3-syr-004',
    lo: 3,
    sourceType: 'data-object',
    sourceId: 'syrah-shiraz',
    question: 'Syrah在法國與Shiraz在澳洲這兩種身份認同的現象，以及至今仍保有全球數一數二老藤希哈的產區為何？',
    options: [
      'Napa Valley（納帕谷）',
      'Mosel（摩塞爾）',
      'Barossa Valley（巴羅莎谷）',
      'Rioja（里奧哈）'
    ],
    correctIndex: 2,
    explanation: '兩地形成「同一品種、兩種身份認同」的獨特現象，至今Barossa Valley仍保有全球數一數二的老藤希哈。'
  },
  {
    id: 'lo3-syr-005',
    lo: 3,
    sourceType: 'data-object',
    sourceId: 'syrah-shiraz',
    question: 'Syrah與格那希（Grenache）常見於教皇新堡的GSM混調配方中，兩者角色互補的方式為何？',
    options: [
      '希哈提供酒精度與甜熟果香，格那希提供顏色與單寧骨架',
      '兩者角色完全相同，混調沒有實質分工意義',
      '希哈提供顏色、單寧與胡椒辛香骨架，格那希提供酒精度與甜熟果香',
      '希哈與格那希從未一起混調'
    ],
    correctIndex: 2,
    explanation: '兩者角色互補：希哈提供顏色、單寧與胡椒辛香骨架，格那希提供酒精度與甜熟果香。'
  },
  {
    id: 'lo3-syr-006',
    lo: 3,
    sourceType: 'data-object',
    sourceId: 'syrah-shiraz',
    question: '「Shiraz」與「Syrah」這兩個名稱拼寫不同，實際上代表什麼關係？',
    options: [
      '是兩個完全不同的獨立品種，僅風味相近',
      'Shiraz是Syrah的芽變品種，兩者基因略有差異',
      'Shiraz專指白葡萄品種，Syrah專指黑葡萄品種',
      '實為完全相同的品種，並非兩個獨立品種，只是澳洲與法國/舊世界的慣用稱呼不同'
    ],
    correctIndex: 3,
    explanation: 'Shiraz與Syrah雖拼寫不同，實為完全相同的品種，並非兩個獨立品種。'
  },
  {
    id: 'lo3-syr-007',
    lo: 3,
    sourceType: 'data-object',
    sourceId: 'syrah-shiraz',
    question: 'Syrah/Shiraz的aromaWheel香氣輪列出哪些核心香氣？',
    options: [
      '黑胡椒、黑莓、煙燻肉香、紫羅蘭',
      '紅櫻桃、覆盆子、蘑菇、玫瑰',
      '黑醋栗、雪松、石墨、薄荷',
      '紅李、黑櫻桃、巧克力、月桂葉'
    ],
    correctIndex: 0,
    explanation: 'aromaWheel列出Black Pepper、Blackberry、Smoked Meat、Violet，黑胡椒是希哈最具辨識度的招牌香氣之一。'
  },
  {
    id: 'lo3-syr-008',
    lo: 3,
    sourceType: 'data-object',
    sourceId: 'syrah-shiraz',
    question: '下列哪一個產區不屬於Syrah/Shiraz的代表性種植區域？',
    options: [
      'Hermitage（艾米達吉）',
      'Côte-Rôtie（羅第丘）',
      'Barossa Valley（巴羅莎谷）',
      'Rioja（里奧哈）'
    ],
    correctIndex: 0,
    explanation: 'representativeRegions涵蓋Hermitage、Côte-Rôtie、Barossa Valley等產區，Rioja是西班牙以Tempranillo聞名的產區。'
  },
  {
    id: 'lo3-syr-009',
    lo: 3,
    sourceType: 'data-object',
    sourceId: 'syrah-shiraz',
    question: 'Syrah/Shiraz建議的侍酒溫度區間為何？',
    options: [
      '6–8°C',
      '10–13°C',
      '8–10°C',
      '16–18°C'
    ],
    correctIndex: 3,
    explanation: 'servingTemp欄位標示為16–18°C。'
  },
  {
    id: 'lo3-syr-010',
    lo: 3,
    sourceType: 'data-object',
    sourceId: 'syrah-shiraz',
    question: 'Syrah/Shiraz適合搭配下列哪些食物類型？',
    options: [
      '高脂、紅肉、野味、燒烤',
      '海鮮與甲殼類',
      '甜點與水果',
      '低脂開胃菜'
    ],
    correctIndex: 0,
    explanation: 'foodPairingTags列出High Fat、Red Meat、Game、Grilled。'
  },
  {
    id: 'lo3-syr-011',
    lo: 3,
    sourceType: 'data-object',
    sourceId: 'syrah-shiraz',
    question: '依profile資料，Syrah/Shiraz的酒體（body）與酒精濃度（alcohol）評分分別為何？',
    options: [
      '酒體8分、酒精濃度8分，屬全品種中偏高水準的濃郁厚實風格',
      '酒體2分、酒精濃度3分，屬清淡型紅酒',
      '酒體與酒精濃度評分皆為0',
      '酒體8分，但酒精濃度極低僅2分'
    ],
    correctIndex: 0,
    explanation: 'profile中body為8、alcohol為8，反映其濃縮厚實的風格特徵。'
  },
  {
    id: 'lo3-syr-012',
    lo: 3,
    sourceType: 'data-object',
    sourceId: 'syrah-shiraz',
    question: '依profile資料，Syrah/Shiraz的單寧（tannin）評分與Cabernet Sauvignon（8分）相比如何？',
    options: [
      '遠高於Cabernet Sauvignon，達到滿分',
      '7分，略低於Cabernet Sauvignon但仍屬單寧厚重的品種',
      '兩者單寧評分完全相同',
      '單寧評分與品種厚皮特性無關'
    ],
    correctIndex: 1,
    explanation: 'profile.tannin為7，略低於Cabernet Sauvignon的8，但仍屬單寧表現厚重的品種之一。'
  },
  {
    id: 'lo3-syr-013',
    lo: 3,
    sourceType: 'data-object',
    sourceId: 'syrah-shiraz',
    question: 'Syrah/Shiraz的果皮顏色分類與原產國為何？',
    options: [
      '白皮，原產法國',
      '黑皮，原產法國',
      '黑皮，原產澳洲',
      '灰皮，原產西班牙'
    ],
    correctIndex: 1,
    explanation: "skinColor:'red'、originCountry:'France(法國)'，儘管Shiraz之名與澳洲密不可分，但品種起源仍是法國北隆河。"
  },
  {
    id: 'lo3-syr-014',
    lo: 3,
    sourceType: 'data-object',
    sourceId: 'syrah-shiraz',
    question: '依profile資料，Syrah/Shiraz的陳年潛力（aging）評分為8分，這與其品種特性的關聯為何？',
    options: [
      '代表Syrah/Shiraz完全不具備任何陳年價值',
      '陳年潛力評分與單寧或酒體結構無關',
      '反映其厚實單寧與酒體結構具備長期陳年支撐力，與Cabernet Sauvignon（9分）相近',
      '8分代表其陳年潛力是所有品種中最低的'
    ],
    correctIndex: 2,
    explanation: 'profile.aging為8，與Cabernet Sauvignon的9分相近。'
  },
  {
    id: 'lo3-sup-001',
    lo: 3,
    sourceType: 'data-object',
    sourceId: 'multi-grape-comparison',
    question: '下列四個品種中，依profile資料，哪一個的單寧（tannin）評分最高？',
    options: [
      'Pinot Noir（4分）',
      'Merlot（6分）',
      'Syrah/Shiraz（7分）',
      'Cabernet Sauvignon（8分）'
    ],
    correctIndex: 3,
    explanation: '四個品種的tannin評分分別為：Cabernet Sauvignon 8、Syrah/Shiraz 7、Merlot 6、Pinot Noir 4，Cabernet Sauvignon為最高，這與其厚實果皮、晚熟特性直接相關。'
  },
  {
    id: 'lo3-sup-002',
    lo: 3,
    sourceType: 'data-object',
    sourceId: 'multi-grape-comparison',
    question: '在WSET L2官方八大主要品種中，下列哪一組全部屬於白葡萄品種？',
    options: [
      'Chardonnay、Cabernet Sauvignon、Riesling、Merlot',
      'Chardonnay、Sauvignon Blanc、Riesling、Pinot Gris',
      'Pinot Noir、Syrah/Shiraz、Merlot、Cabernet Sauvignon',
      'Sauvignon Blanc、Pinot Noir、Riesling、Syrah/Shiraz'
    ],
    correctIndex: 1,
    explanation: '官方八大主要品種中，白葡萄品種為Chardonnay、Sauvignon Blanc、Riesling、Pinot Gris；黑葡萄品種為Cabernet Sauvignon、Merlot、Pinot Noir、Syrah/Shiraz。'
  },
  {
    id: 'lo4-tem-001',
    lo: 4,
    sourceType: 'data-object',
    sourceId: 'tempranillo',
    question: 'Tempranillo名稱的由來為何？',
    options: [
      '源自品種發現者的姓氏',
      '源自西班牙語「temprano」（早熟），指其相對於格那希等品種更早成熟採收的特性',
      '源自西班牙某個城市的名稱',
      '源自拉丁語意指「陽光充足」'
    ],
    correctIndex: 1,
    explanation: '田帕尼優之名源自西班牙語「temprano」（早熟）。'
  },
  {
    id: 'lo4-tem-002',
    lo: 4,
    sourceType: 'data-object',
    sourceId: 'tempranillo',
    question: 'Tempranillo在西班牙不同產區有多個地方別名，下列對應何者正確？',
    options: [
      'Ribera del Duero稱Tinto Fino、Toro稱Tinta de Toro、La Mancha一帶稱Cencibel，皆為同一品種',
      '這些別名其實是完全不同的獨立品種，只是外觀相似',
      '只有Rioja才種植這個品種，其他產區並無別名',
      '這些別名專指釀造甜酒的版本'
    ],
    correctIndex: 0,
    explanation: '在西班牙不同產區有多個地方別名，皆為同一品種，非獨立品種。'
  },
  {
    id: 'lo4-tem-003',
    lo: 4,
    sourceType: 'data-object',
    sourceId: 'tempranillo',
    question: 'Rioja自19世紀因什麼歷史事件促成波爾多釀酒技術（含橡木桶陳年）傳入，進而發展出Crianza/Reserva/Gran Reserva分級體系？',
    options: [
      '西班牙內戰',
      '法國大革命',
      '根瘤蚜蟲害',
      '工業革命'
    ],
    correctIndex: 2,
    explanation: 'Rioja自19世紀根瘤蚜蟲害促成波爾多釀酒技術傳入後，發展出獨特的陳年分級體系。'
  },
  {
    id: 'lo4-tem-004',
    lo: 4,
    sourceType: 'data-object',
    sourceId: 'tempranillo',
    question: 'Tempranillo與Sangiovese相比，兩者風格上的關鍵差異為何？',
    options: [
      '兩者風味特徵完全相同，無法區分',
      '山吉歐維榭酸度較低，田帕尼優酸度較高',
      '田帕尼優以酸櫻桃調性為特徵，山吉歐維榭則單寧更緊實',
      '田帕尼優酸度較低、單寧更緊實，山吉歐維榭則以更高酸度與酸櫻桃調性為特徵'
    ],
    correctIndex: 3,
    explanation: '兩者同樣走「高適配紅酒配餐」路線，但風格細節不同。'
  },
  {
    id: 'lo4-san-001',
    lo: 4,
    sourceType: 'data-object',
    sourceId: 'sangiovese',
    question: 'Sangiovese名稱可能源自拉丁語的什麼意思？',
    options: [
      '「太陽之子」',
      '「托斯卡尼的驕傲」',
      '「山丘之風」',
      '「Sanguis Jovis」（朱庇特之血）'
    ],
    correctIndex: 3,
    explanation: '山吉歐維榭之名可能源自拉丁語「Sanguis Jovis」（朱庇特之血）。'
  },
  {
    id: 'lo4-san-002',
    lo: 4,
    sourceType: 'data-object',
    sourceId: 'sangiovese',
    question: '1970年代托斯卡尼酒莊不滿Chianti法定規範限制、混調國際品種釀出高品質酒款，催生出什麼運動？這間接推動了什麼歷史事件？',
    options: [
      '「新世界革命」運動，間接推動DOCG分級制度誕生',
      '「超級托斯卡尼」運動，間接推動1996年Chianti Classico脫離Chianti大產區獨立',
      '「有機種植」運動，間接推動歐盟GI體系建立',
      '「風土保護」運動，間接推動Barolo產區劃界'
    ],
    correctIndex: 1,
    explanation: '1970年代催生出「超級托斯卡尼」運動，間接推動1996年Chianti Classico獨立。'
  },
  {
    id: 'lo4-san-003',
    lo: 4,
    sourceType: 'data-object',
    sourceId: 'sangiovese',
    question: 'Sangiovese與Nebbiolo同為義大利高酸代表品種，兩者風格差異的關鍵區辨為何？',
    options: [
      '兩者風味特徵完全相同，常被混淆',
      '內比歐露顏色較深、單寧較輕盈',
      '山吉歐維榭顏色較淺、酸櫻桃與番茄葉調性、單寧中等；內比歐露顏色更淺卻單寧與酸度皆更高，玫瑰與焦油氣息是關鍵辨識點',
      '山吉歐維榭的單寧與酸度都高於內比歐露'
    ],
    correctIndex: 2,
    explanation: '兩者風格差異明顯，內比歐露的玫瑰與焦油氣息是關鍵辨識點。'
  },
  {
    id: 'lo4-san-004',
    lo: 4,
    sourceType: 'data-object',
    sourceId: 'sangiovese',
    question: '依profile資料，Sangiovese的酸度（acidity）評分為8分，這與其料理搭配定位有何關聯？',
    options: [
      '高酸度使其成為配餐酒的理想選擇，尤其適合搭配番茄基底料理',
      '高酸度使其完全不適合搭配任何食物',
      '酸度評分與食物搭配沒有任何關聯',
      '高酸度代表其只能單獨飲用，不能配餐'
    ],
    correctIndex: 0,
    explanation: '高酸度與其foodPairingTags中的番茄酸香直接呼應。'
  },
  {
    id: 'lo4-neb-001',
    lo: 4,
    sourceType: 'data-object',
    sourceId: 'nebbiolo',
    question: 'Nebbiolo名稱可能源自義大利語的什麼意思？',
    options: [
      '「nebbia」（霧），指皮埃蒙特秋季採收期常見的濃霧景象',
      '「陽光」，指其偏好日照充足的環境',
      '「國王」，直接指涉其「酒中之王」的地位',
      '「石灰岩」，指其偏好的土壤類型'
    ],
    correctIndex: 0,
    explanation: '內比歐露之名可能源自義大利語「nebbia」（霧）。'
  },
  {
    id: 'lo4-neb-002',
    lo: 4,
    sourceType: 'data-object',
    sourceId: 'nebbiolo',
    question: 'Nebbiolo顏色淺淡常被誤判為單寧與酒體皆輕盈的品種，實際狀況為何？',
    options: [
      '這個誤判其實是正確的，內比歐露單寧確實很輕盈',
      '內比歐露的顏色深淺與單寧含量呈正相關，顏色淺代表單寧真的較低',
      '內比歐露單寧與酸度皆是所有品種中數一數二的高，是「以貌取酒」最容易踩雷的品種之一',
      '內比歐露完全不含任何單寧'
    ],
    correctIndex: 2,
    explanation: '外觀近似黑皮諾，實際上單寧與酸度皆是所有品種中數一數二的高。'
  },
  {
    id: 'lo4-neb-003',
    lo: 4,
    sourceType: 'data-object',
    sourceId: 'nebbiolo',
    question: 'Nebbiolo的成熟特性與對風土的敏感度為何？',
    options: [
      '晚熟發芽且早熟採收，對風土條件完全不敏感',
      '發芽與採收時序與其他品種完全相同，無特殊之處',
      '只能種植於火山土壤，對其他土壤類型完全無法適應',
      '早熟發芽但極晚熟採收，且對風土（尤其是Barolo、Barbaresco的鈣質泥灰岩）極為敏感'
    ],
    correctIndex: 3,
    explanation: '早熟發芽但極晚熟採收，對風土極為敏感，是義大利葡萄酒教學中風土表現力的經典案例。'
  },
  {
    id: 'lo4-neb-004',
    lo: 4,
    sourceType: 'data-object',
    sourceId: 'nebbiolo',
    question: '依profile資料，Nebbiolo的陳年潛力（aging）評分為10分（滿分），這代表什麼？',
    options: [
      '代表這個評分是資料庫的錯誤，紅酒不可能有滿分陳年潛力',
      '反映其極高單寧與酸度提供的陳年支撐結構，陳年潛力驚人',
      '陳年潛力與單寧酸度完全無關，純屬巧合',
      '代表內比歐露完全不需要瓶中陳年就能達到最佳風味'
    ],
    correctIndex: 1,
    explanation: 'profile.aging為10，與其極高單寧、酸度評分相符。'
  },
  {
    id: 'lo4-gre-001',
    lo: 4,
    sourceType: 'data-object',
    sourceId: 'grenache',
    question: 'Grenache的風格核心特徵為何？',
    options: [
      '厚皮低酒精度品種，單寧極度緊澀',
      '是白葡萄品種，主要用於釀造氣泡酒',
      '天然酸度是所有品種中最高的',
      '薄皮高酒精度品種，果香甜美豐盈，單寧與酸度天生較低'
    ],
    correctIndex: 3,
    explanation: '薄皮高酒精度品種，果香甜美豐盈，常作為隆河與西班牙混調的核心。'
  },
  {
    id: 'lo4-gre-002',
    lo: 4,
    sourceType: 'data-object',
    sourceId: 'grenache',
    question: 'Grenache普遍被認為起源於何處，其耐旱耐風特性使其特別適應什麼氣候？',
    options: [
      '起源於法國香檳區，適應冷涼氣候',
      '起源於西班牙東北部阿拉貢一帶，適應隆河南部與西班牙乾燥炎熱的地中海型氣候',
      '起源於義大利西西里島，適應濕潤氣候',
      '起源於德國萊茵河谷，適應大陸性氣候'
    ],
    correctIndex: 1,
    explanation: '起源於西班牙東北部阿拉貢一帶，薄皮耐旱特性適應地中海型氣候。'
  },
  {
    id: 'lo4-gre-003',
    lo: 4,
    sourceType: 'data-object',
    sourceId: 'grenache',
    question: 'Grenache與Syrah常一起混調（如教皇新堡GSM配方），兩者風格互補的方式為何？',
    options: [
      '格那希單寧與酸度天生較低、酒精度高、果香甜熟；希哈單寧與酸度更高、帶胡椒辛香與更深色澤',
      '兩者風味特徵完全相同，混調沒有實質意義',
      '格那希單寧與酸度更高，希哈則酒精度較高',
      '格那希提供胡椒辛香，希哈提供甜熟果香'
    ],
    correctIndex: 0,
    explanation: '兩者風格互補：格那希單寧酸度較低、酒精度高；希哈單寧酸度更高、帶胡椒辛香。'
  },
  {
    id: 'lo4-gre-004',
    lo: 4,
    sourceType: 'data-object',
    sourceId: 'grenache',
    question: 'Grenache與Gamay相比，兩者風格差異為何？',
    options: [
      '兩者風味特徵完全相同，經常被混淆',
      '加美酒體比格那希更飽滿厚重',
      '格那希以極輕盈酒體著稱，加美則酒體飽滿',
      '格那希酒體明顯更飽滿厚重、酒精度更高，加美則以極輕盈酒體與極低單寧為特徵，兩者僅在「早飲易感」這點有共通之處'
    ],
    correctIndex: 3,
    explanation: '格那希酒體更飽滿厚重、酒精度更高，加美則酒體輕盈、單寧極低。'
  },
  {
    id: 'lo4-mal-001',
    lo: 4,
    sourceType: 'data-object',
    sourceId: 'malbec',
    question: 'Malbec起源於法國西南部哪個產區，當地稱之為什麼別名？',
    options: [
      '波爾多，當地稱為Petit Verdot',
      '隆河，當地稱為Mourvèdre',
      '卡歐（Cahors），當地稱為Côt或Auxerrois',
      '普羅旺斯，當地稱為Cinsault'
    ],
    correctIndex: 2,
    explanation: '馬爾貝克起源於法國西南部卡歐，當地稱為Côt或Auxerrois。'
  },
  {
    id: 'lo4-mal-002',
    lo: 4,
    sourceType: 'data-object',
    sourceId: 'malbec',
    question: '19世紀中根瘤蚜蟲害重創歐洲葡萄園後，Malbec在哪個新興產地意外找到最適合的第二故鄉？',
    options: [
      '澳洲巴羅莎谷',
      '美國納帕谷',
      '阿根廷門多薩（高海拔安地斯山麓）',
      '紐西蘭中奧塔哥'
    ],
    correctIndex: 2,
    explanation: '19世紀末引入阿根廷門多薩後意外找到最適合的第二故鄉，20世紀末成為阿根廷國家代表品種。'
  },
  {
    id: 'lo4-mal-003',
    lo: 4,
    sourceType: 'data-object',
    sourceId: 'malbec',
    question: '法國卡歐產區與阿根廷版本的Malbec，風格差異為何？',
    options: [
      '法國卡歐版本風格較質樸緊澀、單寧更粗獷；阿根廷版本則顏色更深邃、單寧更圓潤、果香更濃郁',
      '兩者風格完全相同，沒有可辨識差異',
      '阿根廷版本風格較質樸緊澀，法國卡歐版本則圓潤香甜',
      '法國卡歐版本的顏色比阿根廷版本更深邃'
    ],
    correctIndex: 0,
    explanation: '兩者雖同品種但因風土與釀造哲學不同，經常被誤認為兩個品種。'
  },
  {
    id: 'lo4-mal-004',
    lo: 4,
    sourceType: 'data-object',
    sourceId: 'malbec',
    question: 'Malbec與Syrah相比，風味調性上的關鍵差異為何？',
    options: [
      '兩者風味特徵完全相同，無法區分',
      '希哈的果香調性比馬爾貝克更甜美圓潤',
      '馬爾貝克的藍莓與可可調性更甜美，單寧質地也更絲滑圓潤，希哈則帶更明顯的黑胡椒辛香與較堅實的單寧骨架',
      '馬爾貝克以黑胡椒辛香為招牌特徵'
    ],
    correctIndex: 2,
    explanation: '馬爾貝克藍莓可可調性更甜美，希哈則帶黑胡椒辛香與較堅實骨架。'
  },
  {
    id: 'lo4-chb-001',
    lo: 4,
    sourceType: 'data-object',
    sourceId: 'chenin-blanc',
    question: 'Chenin Blanc天生極高的酸度，使其能勝任哪些風格類型？',
    options: [
      '只能釀成極干型白酒，無法釀造甜酒',
      '只能釀成氣泡酒，無法釀造靜態酒',
      '只能釀成貴腐甜酒，無法釀造干型酒',
      '從極干到貴腐甜型、氣泡酒皆能勝任，是罕見的「全能型」品種'
    ],
    correctIndex: 3,
    explanation: '極高天然酸度使其成為少數能勝任多種風格的「全能型」品種。'
  },
  {
    id: 'lo4-chb-002',
    lo: 4,
    sourceType: 'data-object',
    sourceId: 'chenin-blanc',
    question: '17世紀Chenin Blanc由荷蘭東印度公司引入哪個國家後大獲成功，如今成為全球該品種種植面積最大的產地？',
    options: [
      '南非',
      '澳洲',
      '紐西蘭',
      '美國'
    ],
    correctIndex: 0,
    explanation: '17世紀引入南非後大獲成功，如今南非是全球白詩楠種植面積最大的產地。'
  },
  {
    id: 'lo4-chb-003',
    lo: 4,
    sourceType: 'data-object',
    sourceId: 'chenin-blanc',
    question: 'Chenin Blanc與Sauvignon Blanc同為高酸白酒品種，兩者香氣邏輯的差異為何？',
    options: [
      '兩者香氣邏輯完全相同，經常被混淆',
      '白詩楠以榲桲、蜂蠟、濕羊毛（陳年後）等較沉穩的調性為主，白蘇維濃則以更外放的醋栗、青草香氣為特徵',
      '白蘇維濃以榲桲蜂蠟調性為主，白詩楠則以醋栗青草香氣為特徵',
      '白詩楠完全沒有可辨識的香氣特徵'
    ],
    correctIndex: 1,
    explanation: '白詩楠調性較沉穩，白蘇維濃則更外放。'
  },
  {
    id: 'lo4-chb-004',
    lo: 4,
    sourceType: 'data-object',
    sourceId: 'chenin-blanc',
    question: '選購Chenin Blanc時，為何務必留意酒標甜度標示？',
    options: [
      '因白詩楠只釀造甜酒，酒標標示只是形式',
      '因白詩楠可橫跨極干到極甜多種風格，不能假設「白詩楠＝甜酒」或「白詩楠＝干酒」',
      '因白詩楠只釀造干酒，甜度標示沒有實質意義',
      '因白詩楠的甜度與品種無關，完全取決於瓶身顏色'
    ],
    correctIndex: 1,
    explanation: '白詩楠橫跨極干到極甜多種風格，不能只憑品種假設甜度。'
  },
  {
    id: 'lo4-zin-001',
    lo: 4,
    sourceType: 'data-object',
    sourceId: 'zinfandel-primitivo',
    question: '2001年加州大學戴維斯分校DNA比對確認Zinfandel與哪些品種為完全相同的品種？',
    options: [
      '義大利的Sangiovese、法國的Gamay',
      '西班牙的Tempranillo、葡萄牙原生品種',
      '義大利南部普利亞的Primitivo、克羅埃西亞原生古老品種Tribidrag',
      '純屬美國原生品種，與歐洲品種無關'
    ],
    correctIndex: 2,
    explanation: '2001年DNA比對確認金芬黛與Primitivo、克羅埃西亞Tribidrag為完全相同的品種，三個名稱橫跨三個國家。'
  },
  {
    id: 'lo4-zin-002',
    lo: 4,
    sourceType: 'data-object',
    sourceId: 'zinfandel-primitivo',
    question: '加州Zinfandel與義大利Primitivo，兩者風格差異為何？',
    options: [
      '兩者風格完全相同，只是名稱不同',
      '加州版本通常更成熟濃縮、酒精度更高；義大利版本相對質樸緊實、單寧結構更明顯',
      '義大利版本酒精度更高、更成熟濃縮',
      '加州版本風格較質樸緊實'
    ],
    correctIndex: 1,
    explanation: '差異純粹來自產地風土與釀造哲學，加州版本更成熟濃縮、酒精度更高。'
  },
  {
    id: 'lo4-zin-003',
    lo: 4,
    sourceType: 'data-object',
    sourceId: 'zinfandel-primitivo',
    question: '依profile資料，Zinfandel/Primitivo的酒精濃度（alcohol）評分為9分，這代表什麼？',
    options: [
      '代表這是資料庫錯誤，紅酒酒精濃度不可能這麼高',
      '酒精濃度評分與品種風格完全無關',
      '是所有已建立資料的品種中酒精濃度數一數二高的，與其果醬香甜厚重的風格相符',
      '代表金芬黛只能釀成低酒精度的清爽風格'
    ],
    correctIndex: 2,
    explanation: 'profile.alcohol為9，與其果醬香甜厚重、酒精度高的風格相符。'
  },
  {
    id: 'lo4-gam-001',
    lo: 4,
    sourceType: 'data-object',
    sourceId: 'gamay',
    question: '1395年勃根地公爵「勇敢的菲利普」因何頒布法令禁止在勃根地核心產區種植Gamay，迫使其向南遷徙至薄酒萊？',
    options: [
      '認為加美容易感染病害、危及其他品種',
      '認為加美品質低劣、有損黑皮諾聲譽',
      '因宗教因素禁止種植',
      '因加美產量過低、不符經濟效益'
    ],
    correctIndex: 1,
    explanation: '1395年因認為加美品質低劣、有損黑皮諾聲譽而頒布禁令，是葡萄酒史上少數有明確政治法令記載的品種遷徙案例。'
  },
  {
    id: 'lo4-gam-002',
    lo: 4,
    sourceType: 'data-object',
    sourceId: 'gamay',
    question: 'Gamay與Pinot Noir常因產地相鄰而被比較，兩者風格上的關鍵差異為何？',
    options: [
      '加美單寧極低、酒體極輕盈、多採二氧化碳浸漬工法呈現奔放的香蕉與泡泡糖香氣；黑皮諾單寧與酒體皆較重、風土表現力更複雜細膩',
      '兩者風格幾乎完全相同，僅產區命名不同',
      '黑皮諾單寧極低、酒體極輕盈，加美則單寧與酒體皆較重',
      '加美的風土表現力比黑皮諾更複雜細膩'
    ],
    correctIndex: 0,
    explanation: '兩者風格截然不同，加美單寧極低、酒體極輕盈，黑皮諾則單寧酒體皆較重。'
  },
  {
    id: 'lo4-gam-003',
    lo: 4,
    sourceType: 'data-object',
    sourceId: 'gamay',
    question: '「薄酒萊新酒」的行銷策略雖讓Gamay全球知名度大增，但正確理解薄酒萊十村的加美應具備什麼特性？',
    options: [
      '薄酒萊十村（如Morgon、Moulin-à-Vent）的加美其實具備不輸黑皮諾的陳年潛力，不應被「薄酒萊新酒」的印象一概而論',
      '薄酒萊十村的加美與薄酒萊新酒品質完全相同，沒有差異',
      '所有加美酒款都不具備任何陳年潛力',
      '薄酒萊新酒才是加美的最高品質代表'
    ],
    correctIndex: 0,
    explanation: '薄酒萊十村的加美具備不輸黑皮諾的陳年潛力，不應被薄酒萊新酒的印象一概而論。'
  },
  {
    id: 'lo4-gew-001',
    lo: 4,
    sourceType: 'data-object',
    sourceId: 'gewurztraminer',
    question: 'Gewürztraminer的名稱由來與字首「Gewürz」的德語意涵為何？',
    options: [
      '名稱純粹是釀酒師發明的商標，無實質語源',
      '字首「Gewürz」意為「甜」，強調此品種必然是甜酒',
      '名稱源自法國阿爾薩斯某個城堡',
      '名稱由品種原鄉義大利北部Tramin村莊而來，字首「Gewürz」在德語中意為「香料」，強調此品種異常濃郁奔放的香氣特性'
    ],
    correctIndex: 3,
    explanation: '名稱由原鄉Tramin村莊而來，「Gewürz」意為「香料」，強調異常濃郁奔放的香氣特性。'
  },
  {
    id: 'lo4-gew-002',
    lo: 4,
    sourceType: 'data-object',
    sourceId: 'gewurztraminer',
    question: 'Gewürztraminer與Viognier同為高辨識度的濃郁芳香品種，兩者香氣調性的差異為何？',
    options: [
      '兩者香氣調性完全相同，經常被混淆',
      '格烏茲塔明那以荔枝、玫瑰花、薑等偏東方香料調性為主，維歐尼耶則以水蜜桃、忍冬花等偏奶油果香調性為主',
      '維歐尼耶以荔枝玫瑰花調性為主，格烏茲塔明那則以水蜜桃調性為主',
      '兩者皆完全沒有可辨識的香氣特徵'
    ],
    correctIndex: 1,
    explanation: '格烏茲塔明那偏東方香料調性，維歐尼耶則偏奶油果香調性。'
  },
  {
    id: 'lo4-gew-003',
    lo: 4,
    sourceType: 'data-object',
    sourceId: 'gewurztraminer',
    question: '依profile資料，Gewürztraminer的花香（floral）評分為9分，這與其品種辨識度有何關聯？',
    options: [
      '代表格烏茲塔明那完全沒有花香調性',
      '花香評分與品種辨識度完全無關',
      '9分代表這是所有品種中花香最不明顯的',
      '是花香調性最鮮明的品種之一，是少數盲飲時可憑濃郁荔枝香直接辨識的品種'
    ],
    correctIndex: 3,
    explanation: '花香評分9分，是少數盲飲時可憑濃郁荔枝香直接辨識的品種。'
  },
  {
    id: 'lo4-vio-001',
    lo: 4,
    sourceType: 'data-object',
    sourceId: 'viognier',
    question: 'Viognier曾一度瀕臨滅絕，1960年代法國北隆河孔德里約產區種植面積剩下多少？',
    options: [
      '超過1000公頃',
      '完全絕種、零公頃',
      '與現今種植面積相同，從未減少',
      '不到10公頃'
    ],
    correctIndex: 3,
    explanation: '1960年代孔德里約產區僅剩不到10公頃種植面積，是少數瀕危後成功復興的品種案例。'
  },
  {
    id: 'lo4-vio-002',
    lo: 4,
    sourceType: 'data-object',
    sourceId: 'viognier',
    question: '北隆河傳統上會將少量Viognier與Syrah共同發酵，這種做法的目的與代表產區為何？',
    options: [
      '純粹是為了增加酒精濃度，與香氣或單寧無關',
      '這種做法只存在於歷史文獻，實際上從未真正實行',
      '賦予紅酒額外的花香層次與柔化單寧的效果，是白葡萄與紅葡萄協同釀造的經典案例，代表產區如Côte-Rôtie',
      '目的是降低紅酒的酒精濃度'
    ],
    correctIndex: 2,
    explanation: '賦予紅酒額外花香層次與柔化單寧效果，代表產區如Côte-Rôtie。'
  },
  {
    id: 'lo4-vio-003',
    lo: 4,
    sourceType: 'data-object',
    sourceId: 'viognier',
    question: 'Viognier與Chardonnay混淆的情況也不少見，兩者最主要的辨識依據為何？',
    options: [
      '維歐尼耶的芳香濃度遠高於夏多內，是最主要的辨識依據',
      '兩者的辨識依據完全在於顏色深淺',
      '夏多內的芳香濃度遠高於維歐尼耶',
      '兩者無法透過任何方式區辨'
    ],
    correctIndex: 0,
    explanation: '兩者皆可呈現飽滿酒體與偏低酸度，但維歐尼耶的芳香濃度遠高於夏多內。'
  },
  {
    id: 'lo4-sem-001',
    lo: 4,
    sourceType: 'data-object',
    sourceId: 'semillon',
    question: 'Sémillon的薄皮特性使其比Sauvignon Blanc更容易感染什麼，並在索甸產區扮演什麼角色？',
    options: [
      '更容易感染貴腐黴，是索甸貴腐甜酒最重要的骨幹品種',
      '更不容易感染任何黴菌，只能釀造干型酒',
      '與貴腐黴感染完全無關，僅因香氣濃郁而被選用',
      '只用於氣泡酒基酒，與索甸貴腐甜酒無關'
    ],
    correctIndex: 0,
    explanation: '賽美蓉薄皮特性使其比白蘇維濃更容易感染貴腐黴，是索甸貴腐甜酒最重要的骨幹品種。'
  },
  {
    id: 'lo4-sem-002',
    lo: 4,
    sourceType: 'data-object',
    sourceId: 'semillon',
    question: 'Sémillon與Sauvignon Blanc混調時，兩者角色互補的方式為何？',
    options: [
      '賽美蓉提供高酸與明亮果香，白蘇維濃提供酒體與陳年潛力',
      '兩者角色完全相同，混調沒有實質分工意義',
      '賽美蓉提供酒體、圓潤質地與陳年潛力，白蘇維濃提供高酸與明亮果香',
      '賽美蓉與白蘇維濃從未一起混調'
    ],
    correctIndex: 2,
    explanation: '兩者角色互補，賽美蓉提供酒體與陳年潛力，白蘇維濃提供高酸與明亮果香。'
  },
  {
    id: 'lo4-sem-003',
    lo: 4,
    sourceType: 'data-object',
    sourceId: 'semillon',
    question: '年輕的干型Sémillon香氣相對中性平淡，容易被誤判為無特色，正確的評價方式為何？',
    options: [
      '年輕平淡即代表品質低劣，沒有陳年後改善的可能',
      '需理解其「陳年後才展現真正實力」的特性，陳年後會發展出蜂蠟與烤堅果般的複雜層次',
      '賽美蓉完全不具備任何陳年潛力',
      '所有賽美蓉都應該在年輕時盡快飲用完畢'
    ],
    correctIndex: 1,
    explanation: '這種「年輕平淡、陳年驚艷」的特性使其成為波爾多白酒與獵人谷陳年白酒的經典案例。'
  },
  {
    id: 'lo4-alb-001',
    lo: 4,
    sourceType: 'data-object',
    sourceId: 'albarino',
    question: 'Albariño起源於西班牙哪個地區，品種名稱可能暗示與哪國品種的歷史關聯（此說法尚無確切DNA證據支持）？',
    options: [
      '安達魯西亞，名稱源自阿拉伯語',
      '加利西亞下海灣地區，名稱可能源自「白色的萊茵」，暗示與德國白酒品種的可能歷史關聯',
      '加泰隆尼亞，名稱源自法語',
      '里奧哈，名稱源自拉丁語'
    ],
    correctIndex: 1,
    explanation: '起源於西班牙西北部加利西亞下海灣地區，名稱可能源自「白色的萊茵」，此說法尚無確切DNA證據支持。'
  },
  {
    id: 'lo4-alb-002',
    lo: 4,
    sourceType: 'data-object',
    sourceId: 'albarino',
    question: 'Albariño在鄰近的葡萄牙青酒（Vinho Verde）產區稱為什麼名稱，兩者差異主要來自何處？',
    options: [
      '稱為Alvarinho，兩者其實是完全不同的獨立品種',
      '名稱完全相同，沒有任何差異',
      '稱為Godello，是另一個西班牙品種',
      '稱為Alvarinho，差異主要來自產地風土與法規（葡萄牙版本傳統上帶微氣泡感、酒精度較低）'
    ],
    correctIndex: 3,
    explanation: '與葡萄牙版本Alvarinho為完全相同品種，差異主要來自產地風土與法規。'
  },
  {
    id: 'lo4-alb-003',
    lo: 4,
    sourceType: 'data-object',
    sourceId: 'albarino',
    question: 'Albariño與Sauvignon Blanc相比，兩者高酸的共通點容易讓人誤判，實際風味差異為何？',
    options: [
      '白蘇維濃的海洋鹹鮮感更明顯，阿爾巴利諾則草本調性強烈',
      '阿爾巴利諾的海洋鹹鮮感更明顯、草本調性較弱',
      '兩者風味完全相同，沒有可辨識差異',
      '阿爾巴利諾完全沒有任何香氣特徵'
    ],
    correctIndex: 1,
    explanation: '阿爾巴利諾的海洋鹹鮮感更明顯、草本調性較弱。'
  },
  {
    id: 'lo4-bar-001',
    lo: 4,
    sourceType: 'data-object',
    sourceId: 'barbera',
    question: "1980年代Giacomo Bologna等釀酒師開始嘗試什麼做法，扭轉外界對Barbera「僅適合日常飲用」的刻板印象？",
    options: [
      '改用大型舊橡木桶延長陳年',
      '完全停止使用橡木桶，改用不鏽鋼槽',
      '改種植於更冷涼的高海拔地區',
      "小型法國橡木桶陳釀（barrique），推出如Bricco dell'Uccellone等指標酒款"
    ],
    correctIndex: 3,
    explanation: "1980年代嘗試小型法國橡木桶陳釀，證明本品種也能釀出具陳年潛力的頂級版本。"
  },
  {
    id: 'lo4-bar-002',
    lo: 4,
    sourceType: 'data-object',
    sourceId: 'barbera',
    question: 'Barbera與同產區的Nebbiolo相比，兩者風格上的關鍵差異為何？',
    options: [
      '兩者風格幾乎完全相同，常被消費者搞混',
      'Nebbiolo單寧極輕、酸度極高，Barbera則單寧極重',
      'Barbera的顏色比Nebbiolo更淺淡',
      'Barbera單寧極輕、酸度極高、顏色深邃；Nebbiolo則單寧極重、顏色反而較淡、需要長期陳年軟化'
    ],
    correctIndex: 3,
    explanation: '兩者風格迥異，常見於同一酒莊產品線用以區隔日常款與頂級陳年款。'
  },
  {
    id: 'lo4-bar-003',
    lo: 4,
    sourceType: 'data-object',
    sourceId: 'barbera',
    question: '依profile資料，Barbera的酸度（acidity）評分為9分，這與其品種定位有何關聯？',
    options: [
      '極高酸度代表這款酒完全不適合搭配任何食物',
      '酸度評分與其作為日常餐酒的定位完全無關',
      '極高酸度是其核心特徵，使其長期作為適合日常配餐的親民餐酒選擇',
      '9分代表Barbera的酸度是所有品種中最低的'
    ],
    correctIndex: 2,
    explanation: 'profile.acidity為9，解釋了其長期作為日常餐酒選擇的原因。'
  },
  {
    id: 'lo4-cor-001',
    lo: 4,
    sourceType: 'data-object',
    sourceId: 'corvina',
    question: '威尼托Valpolicella產區獨特的風乾工法（Appassimento）如何將Corvina轉化為Amarone？',
    options: [
      '將採收葡萄置於通風閣樓風乾3–4個月，大幅濃縮糖分與風味，發酵後轉化為酒精度極高的Amarone',
      '將葡萄直接冷凍後榨汁，如同冰酒工法',
      '將葡萄浸泡於橡木桶中數月後才發酵',
      '完全不經過任何特殊工法，僅是不同的混調比例'
    ],
    correctIndex: 0,
    explanation: '風乾工法能大幅濃縮糖分與風味，轉化為酒精度極高的Amarone。'
  },
  {
    id: 'lo4-cor-002',
    lo: 4,
    sourceType: 'data-object',
    sourceId: 'corvina',
    question: 'Corvina與其混調搭檔Rondinella、Corvinone相比，三者在混調中的角色分工為何？',
    options: [
      '三者風味特徵完全相同，角色可互相替代',
      'Rondinella是主導品種，Corvina僅用於補充色澤',
      'Corvina是三者中風味最濃郁、酸度最高的主導品種；Rondinella主要用於補充色澤與產量；Corvinone顆粒較大、糖分濃縮效果更好',
      'Corvinone是產量最不穩定、最少使用的品種'
    ],
    correctIndex: 2,
    explanation: 'Corvina是主導品種，Rondinella補充色澤產量，Corvinone顆粒較大糖分濃縮效果更好。'
  },
  {
    id: 'lo4-cor-003',
    lo: 4,
    sourceType: 'data-object',
    sourceId: 'corvina',
    question: 'Corvina作為傳統清爽早飲的日常紅酒，與經Appassimento工法製成的Amarone版本，兩者建議侍酒溫度有何不同？',
    options: [
      '一般Corvina建議14–15°C，Amarone版本因酒體更濃郁厚重則建議提高至16–18°C',
      '兩者建議侍酒溫度完全相同',
      '一般Corvina建議16–18°C，Amarone版本則建議降溫至6–8°C',
      '侍酒溫度與工法差異無關，純粹依個人喜好決定'
    ],
    correctIndex: 0,
    explanation: 'servingTemp欄位標示為14–15°C（Amarone版本16–18°C）。'
  },
  {
    id: 'lo4-mon-001',
    lo: 4,
    sourceType: 'data-object',
    sourceId: 'montepulciano',
    question: 'Montepulciano品種名稱與托斯卡尼小鎮「Montepulciano」（以Sangiovese釀造Vino Nobile di Montepulciano）之間的關係為何？',
    options: [
      '小鎮名稱源自這個品種，兩者是同一件事',
      '這個品種其實就種植在托斯卡尼小鎮Montepulciano',
      '兩者是同一品種的不同稱呼方式',
      '兩者完全無關，是WSET考試中經典的「同名不同義」命名陷阱——一個是品種名稱、一個是地名'
    ],
    correctIndex: 3,
    explanation: '這是WSET考試中經典的命名陷阱，一個是品種名稱、一個是地名。'
  },
  {
    id: 'lo4-mon-002',
    lo: 4,
    sourceType: 'data-object',
    sourceId: 'montepulciano',
    question: 'Montepulciano d\'Abruzzo與Vino Nobile di Montepulciano這兩款酒名稱相似，實際差異為何？',
    options: [
      '兩者使用完全相同的品種，只是產區不同',
      '前者用Sangiovese釀造，後者用Montepulciano品種釀造',
      '前者用Montepulciano品種釀造；後者是托斯卡尼小鎮以Sangiovese（當地稱Prugnolo Gentile）釀造，兩者品種完全不同',
      '兩者名稱雖相似但其實是同一款酒的不同標示'
    ],
    correctIndex: 2,
    explanation: '兩者品種完全不同，僅因巧合共用「Montepulciano」字樣。'
  },
  {
    id: 'lo4-mon-003',
    lo: 4,
    sourceType: 'data-object',
    sourceId: 'montepulciano',
    question: 'Montepulciano作為全球最暢銷的義大利紅酒之一，主要種植於義大利哪個地區？',
    options: [
      '阿布魯佐',
      '皮埃蒙特',
      '威尼托',
      '西西里島'
    ],
    correctIndex: 0,
    explanation: '原生於義大利中部，主要種植於阿布魯佐。'
  },
  {
    id: 'lo4-pin-001',
    lo: 4,
    sourceType: 'data-object',
    sourceId: 'pinotage',
    question: '1925年斯泰倫博斯大學教授Abraham Izak Perold以哪兩個品種雜交培育出Pinotage？',
    options: [
      '黑皮諾與神索（當時誤稱為Hermitage，因此得名Pinotage）',
      '卡本內蘇維濃與梅洛',
      '希哈與格那希',
      '田帕尼優與格那希'
    ],
    correctIndex: 0,
    explanation: '1925年由Perold以黑皮諾與神索雜交培育而成，因神索當時誤稱Hermitage，故得名Pinotage。'
  },
  {
    id: 'lo4-pin-002',
    lo: 4,
    sourceType: 'data-object',
    sourceId: 'pinotage',
    question: 'Pinotage雖親本之一為Pinot Noir常被誤認風味相近，但實際風格差異為何？',
    options: [
      'Pinotage單寧與酒精度皆更高、帶有招牌煙燻／橡膠調性；黑皮諾則酸度更高、單寧更輕盈、以紅色漿果與泥土氣息為主',
      '兩者風味特徵幾乎完全相同，難以區分',
      '黑皮諾的單寧與酒精度皆高於Pinotage',
      'Pinotage以紅色漿果與泥土氣息為主，黑皮諾則帶煙燻調性'
    ],
    correctIndex: 0,
    explanation: '兩者風格截然不同，Pinotage單寧酒精度更高帶煙燻調性，黑皮諾則更輕盈細膩。'
  },
  {
    id: 'lo4-pin-003',
    lo: 4,
    sourceType: 'data-object',
    sourceId: 'pinotage',
    question: '早期Pinotage因釀造工藝不成熟，部分酒款容易帶有什麼負面氣味而評價兩極？',
    options: [
      '軟木塞污染的濕紙板氣味',
      '熱害導致的煮熟水果氣味',
      '過度氧化的雪莉酒氣味',
      '丙酮或指甲油氣味'
    ],
    correctIndex: 3,
    explanation: '品質不佳的Pinotage易出現丙酮或指甲油氣味，現代釀造工藝已大幅改善此問題。'
  },
  {
    id: 'lo4-car-001',
    lo: 4,
    sourceType: 'data-object',
    sourceId: 'carmenere',
    question: 'Carménère原是19世紀波爾多常見的混調品種之一，為何在歐洲幾近絕跡？',
    options: [
      '因政府法規強制禁止種植',
      '根瘤蚜蟲害後因難以嫁接栽培而在歐洲幾近絕跡',
      '因品質低劣、被市場淘汰',
      '因氣候變遷導致無法適應歐洲氣候'
    ],
    correctIndex: 1,
    explanation: '根瘤蚜蟲害後因難以嫁接栽培而在歐洲幾近絕跡。'
  },
  {
    id: 'lo4-car-002',
    lo: 4,
    sourceType: 'data-object',
    sourceId: 'carmenere',
    question: '直到1994年才由誰透過葉片型態與DNA鑑定確認智利長期被誤植為Merlot的葡萄，其真實身分實為Carménère？',
    options: [
      '加州大學戴維斯分校的美國團隊',
      '智利本地的釀酒師協會',
      '法國植物學家Jean-Michel Boursiquot',
      '義大利的DNA鑑定實驗室'
    ],
    correctIndex: 2,
    explanation: '1994年法國植物學家Jean-Michel Boursiquot確認其真實身分，智利成為全球最大Carménère產區。'
  },
  {
    id: 'lo4-car-003',
    lo: 4,
    sourceType: 'data-object',
    sourceId: 'carmenere',
    question: 'Carménère與Merlot長期混淆是本品種最著名的歷史事件，兩者的關鍵區辨特徵為何？',
    options: [
      '兩者外觀與風味完全相同，至今仍無法區分',
      '梅洛成熟期更晚、帶明顯青椒氣息',
      'Carménère比梅洛更早熟、果香更甜熟',
      'Carménère成熟期更晚、青椒與綠色香料氣息更明顯；梅洛則更早熟、果香更甜熟圓潤'
    ],
    correctIndex: 3,
    explanation: '兩者葉片與果實外觀相似，但成熟期與香氣調性有明顯差異。'
  },
  {
    id: 'lo4-ver-001',
    lo: 4,
    sourceType: 'data-object',
    sourceId: 'verdicchio',
    question: 'Verdicchio在20世紀中期以什麼行銷手法推廣全球，卻也因此長期被貼上「廉價量產」標籤？',
    options: [
      '限量編號酒標行銷',
      '手工吹製水晶瓶行銷',
      '魚形酒瓶行銷',
      '生肖年份特殊瓶身行銷'
    ],
    correctIndex: 2,
    explanation: '以魚形酒瓶行銷全球，成為義大利白酒能見度最高的品種之一。'
  },
  {
    id: 'lo4-ver-002',
    lo: 4,
    sourceType: 'data-object',
    sourceId: 'verdicchio',
    question: '近年Bucci、Garofoli等酒莊致力於Riserva等級的低產量釀造，證明Verdicchio的什麼特性足以支撐長期陳年？',
    options: [
      '極高的單寧含量',
      '天生的高酸度',
      '極低的酒精濃度',
      '特殊的貴腐感染能力'
    ],
    correctIndex: 1,
    explanation: '本品種天生的高酸度足以支撐長期陳年，發展出堅果與蜂蜜般的複雜香氣。'
  },
  {
    id: 'lo4-ver-003',
    lo: 4,
    sourceType: 'data-object',
    sourceId: 'verdicchio',
    question: 'Verdicchio與Cortese（釀造Gavi的品種）因風味特徵相近而偶爾混淆，兩者最可靠的辨識方式為何？',
    options: [
      '兩者的酒精濃度差異，Cortese遠高於Verdicchio',
      '產區（馬爾凱vs皮埃蒙特），Verdicchio果香更偏柑橘與青蘋果，Cortese則風格更中性寡淡',
      '兩者的顏色深淺，Cortese顏色明顯較深',
      '兩者無法透過任何方式區辨，完全相同'
    ],
    correctIndex: 1,
    explanation: '最可靠的辨識方式仍是產區，兩者風味細節也有差異。'
  },
  {
    id: 'lo4-cot-001',
    lo: 4,
    sourceType: 'data-object',
    sourceId: 'cortese',
    question: 'Cortese傳統上因風味中性、缺乏強烈品種特徵而長期被視為配角，是什麼契機讓它躍升為義大利最具國際知名度的白酒品種之一？',
    options: [
      '1990年代加入DOCG最高分級',
      '20世紀初被引入法國香檳區混調',
      '1970年代後Gavi產區致力於行銷推廣',
      '二戰後被聯合國列為保護品種'
    ],
    correctIndex: 2,
    explanation: '1970年代後Gavi產區致力於行銷推廣，讓Cortese躍升為義大利最具國際知名度的白酒品種之一。'
  },
  {
    id: 'lo4-cot-002',
    lo: 4,
    sourceType: 'data-object',
    sourceId: 'cortese',
    question: 'Cortese是義大利哪個產區的唯一法定品種？',
    options: [
      'Gavi（皮埃蒙特）',
      'Soave（威尼托）',
      'Fiano di Avellino（坎帕尼亞）',
      'Verdicchio dei Castelli di Jesi（馬爾凱）'
    ],
    correctIndex: 0,
    explanation: 'styleSummary明確指出Cortese是Gavi產區的唯一法定品種。'
  },
  {
    id: 'lo4-cot-003',
    lo: 4,
    sourceType: 'data-object',
    sourceId: 'cortese',
    question: 'Cortese與Verdicchio因風味中性、酸度高而常被混淆，兩者的辨識差異為何？',
    options: [
      '兩者風味完全相同，無法區分',
      'Cortese整體風味更寡淡內斂、礦物感更明顯，Verdicchio則帶有更明顯的杏仁與核果調性',
      'Verdicchio風味更寡淡內斂，Cortese則帶明顯杏仁核果調性',
      '兩者的差異只在於顏色深淺'
    ],
    correctIndex: 1,
    explanation: '仍建議以產區作為最終辨識依據。'
  },
  {
    id: 'lo4-gar-001',
    lo: 4,
    sourceType: 'data-object',
    sourceId: 'garganega',
    question: 'Garganega在火山玄武岩地塊上發展出獨特的礦物質結構，這與東側平原什麼土壤種植的酒款形成鮮明品質落差？',
    options: [
      '花崗岩砂質土',
      '純黏土地質',
      '石灰岩沖積土',
      '礫石台地'
    ],
    correctIndex: 2,
    explanation: '火山玄武岩地塊與東側平原石灰岩沖積土形成鮮明品質落差。'
  },
  {
    id: 'lo4-gar-002',
    lo: 4,
    sourceType: 'data-object',
    sourceId: 'garganega',
    question: '1970至80年代哪些先驅酒莊致力於提升Soave Classico核心區的品質形象，扭轉外界對Soave廉價量產的刻板印象？',
    options: [
      'Pieropan、Anselmi等酒莊',
      'Antinori、Frescobaldi等酒莊',
      'Gaja、Ceretto等酒莊',
      'Mastroberardino酒莊'
    ],
    correctIndex: 0,
    explanation: 'Pieropan、Anselmi等先驅酒莊致力於提升Classico核心區的品質形象。'
  },
  {
    id: 'lo4-gar-003',
    lo: 4,
    sourceType: 'data-object',
    sourceId: 'garganega',
    question: 'Garganega與Corvina（Valpolicella/Amarone的核心紅葡萄品種）常被一併作為教學對照組，兩者的共通與差異點為何？',
    options: [
      '兩者其實是完全相同的品種，只是顏色標示不同',
      'Garganega是紅葡萄，Corvina是白葡萄',
      '兩者風味與風乾工法皆有相似之處，但Garganega是白葡萄、Corvina是紅葡萄，分屬威尼托紅白酒的代表品種',
      '兩者完全沒有任何共通點，不會被一併討論'
    ],
    correctIndex: 2,
    explanation: '常作為「威尼托風乾工法不限紅白酒」的教學對照組。'
  },
  {
    id: 'lo4-fia-001',
    lo: 4,
    sourceType: 'data-object',
    sourceId: 'fiano',
    question: '古羅馬時期文獻記載的「Apianum」可能即為Fiano的前身，這個名稱的由來與什麼有關？',
    options: [
      '意指品種原產於古羅馬的Apium地區',
      '意指這是修道院僧侶培育的品種',
      '意指這是專供皇室釀酒使用的品種',
      '意指蜜蜂偏愛採集其香甜果實'
    ],
    correctIndex: 3,
    explanation: '古羅馬時期文獻記載的「Apianum」意指蜜蜂偏愛採集其香甜果實。'
  },
  {
    id: 'lo4-fia-002',
    lo: 4,
    sourceType: 'data-object',
    sourceId: 'fiano',
    question: '哪個家族酒莊在20世紀是保存與復興Fiano的關鍵推手，並於1978年推出現代版Fiano di Avellino奠定其品質聲望？',
    options: [
      'Mastroberardino家族酒莊',
      'Antinori家族酒莊',
      'Gaja家族酒莊',
      'Bologna家族酒莊'
    ],
    correctIndex: 0,
    explanation: 'Mastroberardino家族酒莊是保存與復興本品種的關鍵推手。'
  },
  {
    id: 'lo4-fia-003',
    lo: 4,
    sourceType: 'data-object',
    sourceId: 'fiano',
    question: 'Fiano與Verdicchio同樣強調陳年實力而常被一併討論，兩者的風味差異為何？',
    options: [
      '兩者風味完全相同，僅產區不同',
      'Verdicchio的蜂蜜堅果調性更濃郁厚實，Fiano則走清爽柑橘路線',
      '兩者皆完全不具備任何陳年實力',
      'Fiano的蜂蜜與堅果調性更濃郁厚實，Verdicchio則以柑橘與杏仁的清爽調性為主'
    ],
    correctIndex: 3,
    explanation: '兩者最可靠的辨識方式仍是產區（坎帕尼亞vs馬爾凱）。'
  },
  {
    id: 'lo4-fur-001',
    lo: 4,
    sourceType: 'data-object',
    sourceId: 'furmint',
    question: 'Furmint特別容易感染貴腐菌（Botrytis cinerea），這得益於Tokaj產區哪兩條河流交會處秋季易起的晨霧？',
    options: [
      '多瑙河與萊茵河',
      'Bodrog與Tisza兩河',
      '隆河與索恩河',
      '萊茵河與摩塞爾河'
    ],
    correctIndex: 1,
    explanation: 'Bodrog與Tisza兩河交會處秋季易起的晨霧，造就傳奇的Tokaji Aszú貴腐甜酒。'
  },
  {
    id: 'lo4-fur-002',
    lo: 4,
    sourceType: 'data-object',
    sourceId: 'furmint',
    question: 'Furmint除了傳統貴腐甜酒外，近年還發展出什麼獨立風格，因其高酸度與礦物感逐漸受到國際市場關注？',
    options: [
      '氣泡酒',
      '加烈酒',
      '粉紅酒',
      '不甜型乾白酒'
    ],
    correctIndex: 3,
    explanation: '不甜型Furmint乾白酒被視為匈牙利白酒的下一波浪潮。'
  },
  {
    id: 'lo4-fur-003',
    lo: 4,
    sourceType: 'data-object',
    sourceId: 'furmint',
    question: 'Furmint與Tokaj混調搭檔Hárslevelű相比，兩者在混調中角色互補的方式為何？',
    options: [
      '兩者角色完全相同，可互相替代',
      'Furmint酸度更高、骨架更緊實，是主導品種；Hárslevelű則香氣更奔放、帶明顯椴樹花與蜂蜜調性，用於補充香氣複雜度',
      'Hárslevelű是主導品種，Furmint只用於補充香氣',
      'Furmint與Hárslevelű從未一起混調'
    ],
    correctIndex: 1,
    explanation: '兩者角色互補而非替代關係。'
  },
  {
    id: 'lo5-spk-001',
    lo: 5,
    sourceType: 'data-object',
    sourceId: 'sparkling',
    question: '氣泡酒最早可追溯至17世紀香檳區，其氣泡產生的歷史成因為何？',
    options: [
      '寒冷氣候讓發酵在冬天中斷，隔年春天瓶中殘糖意外引發二次發酵，產生氣泡與高壓',
      '是釀酒師刻意設計的工法，從一開始就是有意為之',
      '與溫度或發酵中斷完全無關，純粹是裝瓶時人工注入氣體',
      '源自古羅馬時期就已存在的成熟工藝'
    ],
    correctIndex: 0,
    explanation: '寒冷氣候讓發酵在冬天中斷，隔年春天瓶中殘糖意外引發二次發酵，當時甚至造成大量爆瓶。'
  },
  {
    id: 'lo5-spk-002',
    lo: 5,
    sourceType: 'data-object',
    sourceId: 'sparkling',
    question: '本篤會修士Dom Pérignon常被通俗說法稱為「氣泡酒發明者」，但他真正的貢獻其實是什麼？',
    options: [
      '改良調配與壓榨技術，而非發明氣泡本身',
      '確實是他發明了二次發酵產生氣泡的工法',
      '他的貢獻僅限於設計香檳酒瓶的形狀',
      '他發明了轉瓶（remuage）這項技術'
    ],
    correctIndex: 0,
    explanation: 'Dom Pérignon真正的貢獻是改良調配與壓榨技術，而非發明氣泡本身，這是常見的歷史迷思。'
  },
  {
    id: 'lo5-spk-003',
    lo: 5,
    sourceType: 'data-object',
    sourceId: 'sparkling',
    question: '香檳三大品種在氣泡酒混調中各司其職，下列對應何者正確？',
    options: [
      'Chardonnay提供結構與紅果調性，Pinot Noir貢獻花香與細緻酸度',
      '三者角色完全相同，可任意替換比例而不影響風格',
      'Chardonnay貢獻花香與細緻酸度；Pinot Noir提供結構與紅果調性；Pinot Meunier帶來早熟果香與圓潤口感',
      '只有Chardonnay是香檳允許使用的品種'
    ],
    correctIndex: 2,
    explanation: '三大品種各司其職，共同構成香檳的骨架與複雜度。'
  },
  {
    id: 'lo5-spk-004',
    lo: 5,
    sourceType: 'data-object',
    sourceId: 'sparkling',
    question: 'Cava與Prosecco在葡萄品種選擇上分別依賴什麼？',
    options: [
      'Cava與Prosecco使用完全相同的品種組合',
      'Cava依賴Glera，Prosecco使用Macabeo等西班牙原生品種',
      '兩者都只使用Chardonnay單一品種',
      'Cava多用西班牙原生的Macabeo、Xarel·lo、Parellada混調；Prosecco則依賴Glera'
    ],
    correctIndex: 3,
    explanation: 'Cava與Prosecco各自依賴不同的原生品種組合。'
  },
  {
    id: 'lo5-spk-005',
    lo: 5,
    sourceType: 'data-object',
    sourceId: 'sparkling',
    question: 'Asti／Moscato d\'Asti的釀造思路與傳統法或水槽法氣泡酒有何根本不同？',
    options: [
      '與其他氣泡酒工法完全相同，沒有任何差異',
      '僅進行一次發酵並提前中止以保留天然糖分，是氣泡酒家族裡唯一不靠「二次發酵」產生氣泡的例外做法',
      'Asti需要經過三次發酵，比傳統法更複雜',
      'Asti的酒精度遠高於傳統法香檳'
    ],
    correctIndex: 1,
    explanation: 'Asti酒精度也遠低於傳統法或水槽法氣泡酒（通常僅5–6% abv）。'
  },
  {
    id: 'lo5-spk-006',
    lo: 5,
    sourceType: 'data-object',
    sourceId: 'sparkling',
    question: '氣泡酒基酒為何特別重視高酸度保留，因此偏好什麼樣的氣候條件？',
    options: [
      '偏好冷涼氣候，因葡萄成熟緩慢，糖度與風味成熟前已能維持銳利酸度，這是支撐二次發酵與長期陳年的關鍵',
      '偏好溫暖氣候，因為溫暖氣候能加速累積更高酸度',
      '氣候條件與氣泡酒基酒的酸度需求完全無關',
      '偏好極端乾燥的沙漠型氣候'
    ],
    correctIndex: 0,
    explanation: '冷涼氣候是支撐二次發酵與長期陳年的關鍵。'
  },
  {
    id: 'lo5-spk-007',
    lo: 5,
    sourceType: 'data-object',
    sourceId: 'sparkling',
    question: '香檳與英格蘭南部共享的白堊土，賦予氣泡酒什麼特有風味特徵？',
    options: [
      '特有的辛香料調性，與土壤排水能力無關',
      '白堊土只影響顏色，不影響風味',
      '白堊土會使氣泡酒帶有明顯的甜度',
      '特有的礦石感，因白堊土排水佳且保水適中'
    ],
    correctIndex: 3,
    explanation: '白堊土排水佳且保水適中，賦予酒款特有的礦石感。'
  },
  {
    id: 'lo5-spk-008',
    lo: 5,
    sourceType: 'data-object',
    sourceId: 'sparkling',
    question: '傳統法（Traditional Method）氣泡酒的二次發酵位置與酒渣接觸時間為何？',
    options: [
      '二次發酵於密閉壓力槽進行，酒渣接觸時間短（數週）',
      '二次發酵於瓶中進行，酒渣接觸時間長（無年份15個月以上，年份酒3年以上）',
      '二次發酵於瓶中進行，但完全不需要酒渣接觸',
      '傳統法不需要進行二次發酵'
    ],
    correctIndex: 1,
    explanation: '對應吐司堅果等自溶(autolysis)風味特徵。'
  },
  {
    id: 'lo5-spk-009',
    lo: 5,
    sourceType: 'data-object',
    sourceId: 'sparkling',
    question: '水槽法（Tank Method，如Prosecco所採用）與傳統法相比，在成本與風味特徵上有何差異？',
    options: [
      '水槽法成本最高、酒渣接觸時間最長',
      '水槽法成本最低、酒渣接觸時間短，風味特徵為清新奔放的品種果香，而非吐司堅果調性',
      '水槽法與傳統法的成本、風味完全相同',
      '水槽法完全不需要二次發酵'
    ],
    correctIndex: 1,
    explanation: '水槽法成本/複雜度最低，風味特徵與傳統法的自溶調性形成對比。'
  },
  {
    id: 'lo5-spk-010',
    lo: 5,
    sourceType: 'data-object',
    sourceId: 'sparkling',
    question: '轉注法（Transfer Method）的二次發酵流程為何？',
    options: [
      '二次發酵完全於密閉壓力槽進行，與傳統法完全相同',
      '轉注法完全不需要進行任何形式的二次發酵',
      '二次發酵於瓶中進行，後轉入加壓槽，整批過濾去渣，成本／複雜度介於傳統法與水槽法之間',
      '轉注法的酒渣接觸時間比傳統法更長'
    ],
    correctIndex: 2,
    explanation: '轉注法成本/複雜度介於傳統法與水槽法之間。'
  },
  {
    id: 'lo5-spk-011',
    lo: 5,
    sourceType: 'data-object',
    sourceId: 'sparkling',
    question: '氣泡酒工藝術語中「Autolysis（酒渣自溶）」指的是什麼現象？',
    options: [
      '指葡萄本身在採收前自然發酵的現象',
      '指氣泡在開瓶後自然散失的過程',
      '死酵母細胞在長時間酒渣接觸過程中分解，賦予酒款吐司、堅果等複雜風味',
      '指軟木塞因濕度不足而自然乾裂的現象'
    ],
    correctIndex: 2,
    explanation: '這正是傳統法氣泡酒長時間酒渣接觸後產生吐司、堅果調性的來源。'
  },
  {
    id: 'lo5-spk-012',
    lo: 5,
    sourceType: 'data-object',
    sourceId: 'sparkling',
    question: '「Remuage（轉瓶）」在傳統法氣泡酒工藝中的作用為何？',
    options: [
      '用來調整氣泡酒的最終甜度',
      '逐漸將瓶中酒渣集中移動至瓶頸，以利後續去渣（disgorgement）',
      '用來混合不同年份的基酒',
      '用來提高瓶內壓力以產生更多氣泡'
    ],
    correctIndex: 1,
    explanation: '這是傳統法工藝中將酒渣逐漸移動集中至瓶頸的關鍵步驟。'
  },
  {
    id: 'lo5-spk-013',
    lo: 5,
    sourceType: 'data-object',
    sourceId: 'sparkling',
    question: '「Dosage（補液）」是氣泡酒工藝中的哪個步驟，其目的為何？',
    options: [
      '指二次發酵前添加酵母的步驟',
      '指裝瓶前為了增加氣泡而額外注入二氧化碳',
      '指轉瓶前為了穩定溫度而進行的步驟',
      '去渣後添加糖與酒液的混合液，用以調整最終成品的甜度風格'
    ],
    correctIndex: 3,
    explanation: '用以調整最終成品的甜度風格（如Brut、Demi-Sec等）。'
  },
  {
    id: 'lo5-spk-014',
    lo: 5,
    sourceType: 'data-object',
    sourceId: 'sparkling',
    question: '氣泡酒最常見的甜度分類「Brut」，其殘糖標準為何？',
    options: [
      '殘糖32–50g/L',
      '殘糖必須完全為0',
      '殘糖沒有明確標準，依各產區自行認定',
      '殘糖<12g/L，是最常見的氣泡酒甜度'
    ],
    correctIndex: 3,
    explanation: 'Brut是氣泡酒最主流的甜度風格。'
  },
  {
    id: 'lo5-spk-015',
    lo: 5,
    sourceType: 'data-object',
    sourceId: 'sparkling',
    question: '「Demi-Sec（半甜型）」氣泡酒的殘糖標準與「Brut」相比為何？',
    options: [
      'Demi-Sec殘糖32–50g/L，明顯高於Brut的<12g/L',
      'Demi-Sec殘糖低於Brut',
      '兩者殘糖標準完全相同',
      'Demi-Sec專指完全不含糖分的極干型氣泡酒'
    ],
    correctIndex: 0,
    explanation: '明顯高於Brut的殘糖標準<12g/L。'
  },
  {
    id: 'lo5-spk-016',
    lo: 5,
    sourceType: 'data-object',
    sourceId: 'sparkling',
    question: '「Vintage」與「Non-Vintage/NV」氣泡酒的核心差異為何？',
    options: [
      'Vintage為單一年份釀造，Non-Vintage則是多年份調配以維持品牌一致風格',
      'Vintage是多年份調配，Non-Vintage是單一年份釀造',
      '兩者其實是同一件事，只是不同產區的稱呼方式',
      'Vintage專指氣泡酒的甜度分類，與年份無關'
    ],
    correctIndex: 0,
    explanation: '兩者是氣泡酒重要的分類概念。'
  },
  {
    id: 'lo5-spk-017',
    lo: 5,
    sourceType: 'data-object',
    sourceId: 'sparkling',
    question: '南非對「傳統法」氣泡酒的正式稱法為何？',
    options: [
      'Metodo Classico',
      'Método Tradicional',
      'Cap Classique（簡稱MCC）',
      'Klassische Flaschengärung'
    ],
    correctIndex: 2,
    explanation: '南非對傳統法的正式稱法為Cap Classique，簡稱MCC。'
  },
  {
    id: 'lo5-spk-018',
    lo: 5,
    sourceType: 'data-object',
    sourceId: 'sparkling',
    question: '19世紀後，西班牙與義大利分別發展出什麼氣泡酒風格路線？',
    options: [
      '西班牙與義大利在19世紀後完全放棄氣泡酒生產',
      '西班牙發展出Cava，義大利發展出Prosecco，各自形成獨立風格路線',
      '兩國在19世紀後才首次開始接觸氣泡酒工藝，此前完全沒有相關產業',
      '西班牙發展出Prosecco，義大利發展出Cava'
    ],
    correctIndex: 1,
    explanation: '19世紀後兩國各自發展出獨立風格路線。'
  },
  {
    id: 'lo5-for-001',
    lo: 5,
    sourceType: 'data-object',
    sourceId: 'fortified',
    question: '強化酒的興起與大航海時代的長途海運密切相關，17世紀英國商人添加烈酒提高酒精度的目的為何？',
    options: [
      '純粹為了提高售價，與海運耐久性無關',
      '讓運往英國的葡萄牙紅酒耐得住長途海運',
      '為了掩蓋葡萄牙紅酒本身的品質缺陷',
      '為了符合英國當時的宗教飲酒規範'
    ],
    correctIndex: 1,
    explanation: '17世紀英國商人為讓運往英國的葡萄牙紅酒耐得住長途海運，開始添加烈酒提高酒精度。'
  },
  {
    id: 'lo5-for-002',
    lo: 5,
    sourceType: 'data-object',
    sourceId: 'fortified',
    question: '1703年《梅休因條約》對哪款強化酒與英國市場的貿易關係有進一步鞏固作用？',
    options: [
      '雪莉酒',
      '波特酒',
      '馬德拉酒',
      '貴腐甜酒'
    ],
    correctIndex: 1,
    explanation: '1703年《梅休因條約》進一步鞏固波特酒與英國市場的貿易關係。'
  },
  {
    id: 'lo5-for-003',
    lo: 5,
    sourceType: 'data-object',
    sourceId: 'fortified',
    question: '雪莉酒的強化傳統源自何處，受什麼歷史文化影響？',
    options: [
      '源自西班牙赫雷斯地區，受摩爾人影響的釀酒文化',
      '源自葡萄牙杜羅河谷，受英國商人影響',
      '源自馬德拉島，受大航海時代長途海運影響',
      '源自法國波爾多，受修道院釀酒傳統影響'
    ],
    correctIndex: 0,
    explanation: '雪莉酒的強化傳統更早，源自西班牙赫雷斯地區受摩爾人影響的釀酒文化。'
  },
  {
    id: 'lo5-for-004',
    lo: 5,
    sourceType: 'data-object',
    sourceId: 'fortified',
    question: '馬德拉酒獨特的「刻意加熱陳年（estufagem）」工藝，其歷史成因為何？',
    options: [
      '是釀酒師從一開始就刻意設計的工法，沒有意外成分',
      '與溫度或海運完全無關，純粹是為了節省釀造成本',
      '早期運酒船隻長期暴露於赤道高溫下，意外發現酒質更穩定醇厚，才發展出此工藝',
      '源自古羅馬時期就已存在的加熱工藝'
    ],
    correctIndex: 2,
    explanation: '早期運酒船隻長期暴露於赤道高溫下，意外發現酒質更穩定醇厚，才發展出刻意加熱陳年的工藝。'
  },
  {
    id: 'lo5-for-005',
    lo: 5,
    sourceType: 'data-object',
    sourceId: 'fortified',
    question: '波特酒的核心品種以哪個產區的原生品種混調而成？',
    options: [
      '赫雷斯原生品種',
      '杜羅河原生品種（如Touriga Nacional等）',
      '馬德拉島原生品種',
      '波爾多原生品種'
    ],
    correctIndex: 1,
    explanation: '波特酒以Touriga Nacional等杜羅河原生品種混調。'
  },
  {
    id: 'lo5-for-006',
    lo: 5,
    sourceType: 'data-object',
    sourceId: 'fortified',
    question: '雪莉酒的乾型與甜型版本分別以什麼品種為主？',
    options: [
      '乾型以Pedro Ximénez為主，甜型用Palomino',
      '乾型以Palomino為主，甜型另用Pedro Ximénez或Moscatel',
      '乾型與甜型使用完全相同的品種，僅釀造工法不同',
      '乾型與甜型皆以Touriga Nacional為主'
    ],
    correctIndex: 1,
    explanation: '雪莉酒乾型以Palomino為主，甜型另用Pedro Ximénez或Moscatel。'
  },
  {
    id: 'lo5-for-007',
    lo: 5,
    sourceType: 'data-object',
    sourceId: 'fortified',
    question: '馬德拉酒的四大貴族品種（Sercial、Verdelho、Bual、Malmsey）如何對應風格光譜？',
    options: [
      '對應由不甜到極甜的風格光譜，品種與甜度幾乎一一對應',
      '四個品種釀造出的甜度完全相同，沒有光譜差異',
      '只有Sercial一個品種真正用於釀酒，其餘三者僅具歷史意義',
      '四個品種對應的是酒精濃度光譜，與甜度無關'
    ],
    correctIndex: 0,
    explanation: '馬德拉酒四大貴族品種對應由不甜到極甜的風格光譜，品種與甜度幾乎一一對應。'
  },
  {
    id: 'lo5-for-008',
    lo: 5,
    sourceType: 'data-object',
    sourceId: 'fortified',
    question: '杜羅河谷陡峭的片岩梯田承受夏季酷暑，這種風土條件造就了波特酒葡萄的什麼特性？',
    options: [
      '極低糖分',
      '極高酸度而糖分偏低',
      '風土條件與波特酒葡萄的糖分濃縮完全無關',
      '高度濃縮'
    ],
    correctIndex: 3,
    explanation: '杜羅河谷陡峭的片岩梯田承受夏季酷暑，造就波特酒葡萄的高度濃縮。'
  },
  {
    id: 'lo5-for-009',
    lo: 5,
    sourceType: 'data-object',
    sourceId: 'fortified',
    question: '赫雷斯的albariza白堊土如何支撐Palomino品種在燠熱氣候下維持基本酸度？',
    options: [
      '反射陽光並在乾季保留水分',
      '吸收陽光並加速水分蒸發',
      '與陽光反射或水分保留完全無關，純粹因土壤肥沃',
      '白堊土會使葡萄提早成熟，因此與酸度保留無關'
    ],
    correctIndex: 0,
    explanation: 'albariza白堊土反射陽光並在乾季保留水分，支撐Palomino在燠熱氣候下維持基本酸度。'
  },
  {
    id: 'lo5-for-010',
    lo: 5,
    sourceType: 'data-object',
    sourceId: 'fortified',
    question: '波特酒與雪莉酒/馬德拉酒相比，強化時機的關鍵差異為何？',
    options: [
      '三者皆於發酵中途強化，沒有差異',
      '波特酒於發酵完全結束後才強化，雪莉酒與馬德拉酒則於發酵中途強化',
      '波特酒於發酵中途強化，雪莉酒與馬德拉酒則於發酵完全結束後才強化',
      '強化時機與這三款酒的甜度風格完全無關'
    ],
    correctIndex: 2,
    explanation: '這是三者強化時機的關鍵差異，也直接影響波特酒天生帶甜的特性。'
  },
  {
    id: 'lo5-for-011',
    lo: 5,
    sourceType: 'data-object',
    sourceId: 'fortified',
    question: '波特酒天生帶甜的原因，與其強化時機有何直接關聯？',
    options: [
      '波特酒天生帶甜與強化時機完全無關，純粹是額外添加糖分所致',
      '波特酒的甜度來自發酵完全結束後額外添加的葡萄濃縮汁',
      '波特酒其實不帶甜，甜度只是消費者的誤解',
      '發酵中途強化會中止發酵，保留尚未轉化為酒精的天然糖分'
    ],
    correctIndex: 3,
    explanation: '發酵中途強化使酒精快速升高中止酵母活動，保留尚未轉化為酒精的天然糖分。'
  },
  {
    id: 'lo5-for-012',
    lo: 5,
    sourceType: 'data-object',
    sourceId: 'fortified',
    question: '雪莉酒的Fino與Oloroso兩種主要風格，在陳年方式上的關鍵差異為何？',
    options: [
      '兩者皆採相同的氧化陳年方式，沒有差異',
      'Fino採氧化陳年，Oloroso則採Flor生物陳年',
      '陳年方式與Fino、Oloroso的風格差異完全無關',
      'Fino採Flor生物陳年，Oloroso則採氧化陳年，Amontillado為介於兩者之間的中間風格'
    ],
    correctIndex: 3,
    explanation: 'Amontillado為介於兩者之間的中間風格。'
  },
  {
    id: 'lo5-for-013',
    lo: 5,
    sourceType: 'data-object',
    sourceId: 'fortified',
    question: '馬德拉酒的兩種加熱陳年方式「estufagem」與「canteiro」有何差異？',
    options: [
      '兩者其實是同一種工法的不同稱呼，沒有實質差異',
      'estufagem為槽內加熱，canteiro則是閣樓自然受熱',
      'estufagem是閣樓自然受熱，canteiro則是槽內加熱',
      'estufagem與canteiro皆專指瓶中陳年，與加熱無關'
    ],
    correctIndex: 1,
    explanation: 'estufagem為槽內加熱，canteiro則是閣樓自然受熱。'
  },
  {
    id: 'lo5-for-014',
    lo: 5,
    sourceType: 'data-object',
    sourceId: 'fortified',
    question: '波特酒常見風格標示中，「Tawny(茶色)」與「Ruby(寶石紅)」的風味差異方向為何？',
    options: [
      '由Ruby年輕果香到Tawny氧化堅果調性依序遞增，可再標示10/20/30/40年等陳年時長',
      '兩者風味完全相同，只是顏色標示不同',
      'Tawny代表年輕果香，Ruby則代表氧化堅果調性',
      'Tawny與Ruby皆專指未經任何陳年的新酒'
    ],
    correctIndex: 0,
    explanation: '由Ruby、Reserve Ruby、LBV、Vintage至Tawny，由年輕果香至氧化堅果調性依序遞增。'
  },
  {
    id: 'lo5-for-015',
    lo: 5,
    sourceType: 'data-object',
    sourceId: 'fortified',
    question: '雪莉酒常見風格標示中，「Fino」與「Pedro Ximénez(PX)」在甜度光譜上的位置為何？',
    options: [
      'Fino最甜，PX最干',
      '兩者甜度完全相同，僅陳年方式不同',
      'Fino與PX皆專指同一等級的中間甜度風格',
      'Fino最干最淡，PX最濃最甜，兩者是雪莉酒甜度光譜的兩個極端'
    ],
    correctIndex: 3,
    explanation: 'Fino最干最淡，PX最濃最甜。'
  },
  {
    id: 'lo5-for-016',
    lo: 5,
    sourceType: 'data-object',
    sourceId: 'fortified',
    question: '馬德拉酒與波特酒、雪莉酒相比，在「常見風格標示系統」上有何根本差異？',
    options: [
      '馬德拉酒依四大貴族品種對應甜度光譜分級，無獨立風格標示系統',
      '馬德拉酒的標示系統與波特酒完全相同，皆用Ruby/Tawny分級',
      '馬德拉酒的標示系統與雪莉酒完全相同，皆用Fino/Oloroso分級',
      '馬德拉酒沒有任何甜度或風格分級概念'
    ],
    correctIndex: 0,
    explanation: '這點與波特酒（Ruby/Tawny系統）、雪莉酒（Fino/Oloroso系統）皆不同。'
  },
  {
    id: 'lo5-for-017',
    lo: 5,
    sourceType: 'data-object',
    sourceId: 'fortified',
    question: '強化酒工藝術語「Flor（酒花）」指的是什麼現象，主要用於哪款強化酒？',
    options: [
      '指強化酒裝瓶時添加的花香調味劑',
      '指波特酒陳年過程中瓶內產生的沉澱物',
      '一層天然酵母膜覆蓋於酒液表面、隔絕氧氣進行生物陳年，主要用於雪莉酒Fino系風格',
      '指馬德拉酒加熱陳年過程中產生的焦糖化反應'
    ],
    correctIndex: 2,
    explanation: 'Flor是雪莉酒Fino系風格的關鍵陳年機制。'
  },
  {
    id: 'lo5-for-018',
    lo: 5,
    sourceType: 'data-object',
    sourceId: 'fortified',
    question: '強化酒工藝術語「Solera System（索雷拉系統）」的核心概念為何？',
    options: [
      '指單一年份、單一酒桶的靜態陳年方式',
      '專指波特酒的年份標示系統',
      '多層次、多年份酒桶依序疊放並定期部分抽取調配的動態混調陳年系統，常見於雪莉酒',
      '指馬德拉酒特有的閣樓自然受熱陳年方式'
    ],
    correctIndex: 2,
    explanation: '這是雪莉酒常用的多層次、多年份動態混調陳年系統，確保成品風格的一致性。'
  }
];
