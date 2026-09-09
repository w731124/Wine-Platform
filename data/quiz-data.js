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
      '因為只要平均溫度落在建議範圍內，短期劇烈波動可以忽略不計',
      '因為反覆溫度波動會加速氧化、破壞軟木塞密封',
      '因為只要控制在精確的溫度數值，就不需要在意是否出現波動',
      '因為溫度波動會影響白酒風味，但不影響紅酒風味'
    ],
    correctIndex: 1,
    explanation: '溫度反覆劇烈波動即使在合理範圍內，也比單純偏高更容易加速氧化並讓軟木塞逐漸失去密封彈性。'
  },
  {
    id: 'lo6-002',
    lo: 6,
    sourceType: 'static-panel',
    sourceId: 'storage-conditions',
    question: '「光害（Lightstrike）」對以下哪一類酒款影響最明顯？',
    options: [
      '使用旋蓋封瓶包裝的清淡型白酒',
      '裝在深色玻璃瓶包裝的濃郁紅酒',
      '酒精濃度極高的加烈酒款',
      '裝在透明或淺色玻璃瓶的粉紅酒白酒'
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
      '平躺能加速酒款陳年熟成過程',
      '平躺是為了節省收納空間，與軟木塞密封無關',
      '讓酒液持續浸潤軟木塞，防止乾縮氧化',
      '讓標籤朝上，方便日後辨識查找'
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
      '25–40%',
      '40–50%',
      '50–80%',
      '82–95%'
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
      '完全排除氧氣，可保存長達數月之久',
      '抽出部分空氣降低氧氣，通常延長1–3天',
      '透過降溫達到保存效果，與氧氣無關',
      '注入惰性氣體，覆蓋於酒液表面'
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
      '延長1–3天，需完全拔出軟木塞取酒',
      '延長數週甚至數月，全程不需拔出軟木塞',
      '延長約1週，需倒入其他容器保存',
      '延長效果與軟木塞新舊有關，通常不到1天'
    ],
    correctIndex: 1,
    explanation: 'Coravin可多次取用且大幅延長高單價酒款賞味期，細針穿刺軟木塞取酒並注入氬氣。'
  },
  {
    id: 'lo6-007',
    lo: 6,
    sourceType: 'static-panel',
    sourceId: 'storage-preservation',
    question: '關於紅酒開瓶後的保存方式？',
    options: [
      '開瓶後應盡快冷藏，紅酒亦然，飲用前回溫',
      '冷藏與否對保存效果沒有任何差異',
      '應存放於高於室溫的溫暖環境中',
      '紅酒不能冷藏，冷藏會嚴重破壞風味'
    ],
    correctIndex: 0,
    explanation: '冷藏能有效減緩氧化與細菌活動，常被誤解為「紅酒不能冰」。'
  },
  {
    id: 'lo6-008',
    lo: 6,
    sourceType: 'static-panel',
    sourceId: 'storage-temp',
    question: '氣泡酒建議的侍酒溫度區間？',
    options: [
      '10–13°C',
      '13–15°C',
      '6–8°C',
      '16–18°C'
    ],
    correctIndex: 2,
    explanation: '低溫抑制氣泡過快散失、維持清爽口感。'
  },
  {
    id: 'lo6-009',
    lo: 6,
    sourceType: 'static-panel',
    sourceId: 'storage-temp',
    question: '哪一組酒款建議侍酒溫度同為7–10°C？',
    options: [
      '清淡型紅酒與濃郁型紅酒兩者相同',
      '濃郁型白酒與濃郁型紅酒兩者相同',
      '氣泡酒與甜型加烈酒兩者相同',
      '清淡不甜白酒與不甜型加烈酒如Fino雪莉'
    ],
    correctIndex: 3,
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
      '濃郁型紅酒這個類別',
      '清淡型紅酒這個類別',
      '清淡不甜白酒這個類別',
      '氣泡酒這個類別'
    ],
    correctIndex: 0,
    explanation: '甜型加烈酒（如Port波特酒）與濃郁型紅酒（如Cabernet Sauvignon）同屬16–18°C，皆為微涼室溫而非現代空調房間室溫。'
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
      '用來判斷這款酒的產地與產區',
      '用來確認軟木塞的材質種類',
      '用來判斷這款酒的陳年時間長短',
      '若有濕紙板發霉味，是軟木塞污染警訊'
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
      '全程壓住軟木塞，瓶身傾斜轉動讓塞子輕柔滑出',
      '直接用開瓶器螺旋錐鑽穿軟木塞',
      '用力搖晃酒瓶後快速拔出軟木塞',
      '開瓶前應先將整瓶酒放入冷凍庫'
    ],
    correctIndex: 0,
    explanation: '瓶內壓力可能隨時噴出塞子，須全程壓住並轉動瓶身而非塞子；撕除錫箔鬆開鐵絲籠時全程壓住軟木塞，瓶身傾斜45度轉動瓶身讓塞子發出輕柔嘆息聲。'
  },
  {
    id: 'lo6-015',
    lo: 6,
    sourceType: 'static-panel',
    sourceId: 'storage-decanting',
    question: '醒酒的兩種主要目的？',
    options: [
      '提高酒精濃度，並加速酒款陳年速度',
      '去除軟木塞污染，並延緩酒液氧化速度',
      '分離老酒沉澱物、為年輕高單寧紅酒換氣軟化',
      '降低酒液溫度，並增加氣泡活性表現'
    ],
    correctIndex: 2,
    explanation: '兩種目的分別對應老酒與年輕酒不同需求：分離陳年老酒沉澱物，以及為年輕高單寧紅酒換氣軟化單寧。'
  },
  {
    id: 'lo6-016',
    lo: 6,
    sourceType: 'static-panel',
    sourceId: 'storage-decanting',
    question: '醒酒時機的正確敘述？',
    options: [
      '多數酒款都不建議進行醒酒處理',
      '醒酒這個步驟主要適用於白酒款',
      '老酒臨飲前才醒且時間宜短；年輕紅酒可提前數小時',
      '老酒與年輕紅酒皆建議提前數小時醒酒'
    ],
    correctIndex: 2,
    explanation: '老酒求「短」、年輕高單寧酒求「久」：老酒香氣脆弱建議臨飲用前才醒酒且時間宜短，年輕高單寧紅酒可提前數小時甚至更早。'
  },
  {
    id: 'lo6-017',
    lo: 6,
    sourceType: 'static-panel',
    sourceId: 'storage-decanting',
    question: '為什麼紅酒杯通常比白酒杯大？',
    options: [
      '紅酒杯較大利於香氣揮發，白酒杯較小維持冰鎮',
      '白酒杯較小是為了防止氣泡散失，與香氣無關',
      '紅酒杯較大只是為了容納更多酒液而已',
      '是傳統習慣沿用而已，並非因為香氣揮發需求'
    ],
    correctIndex: 0,
    explanation: '杯型設計依酒款特性而異：紅酒杯較大以利香氣揮發，白酒杯較小以維持冰鎮溫度。'
  },
  {
    id: 'lo6-018',
    lo: 6,
    sourceType: 'static-panel',
    sourceId: 'storage-faults',
    question: '軟木塞因儲存濕度不足而乾裂，最可能導致？',
    options: [
      '二氧化硫添加過量的問題',
      '軟木塞污染與封瓶失效氧化',
      '熱害（Maderisation）現象',
      '揮發性酸過高導致的問題'
    ],
    correctIndex: 1,
    explanation: '濕度不足使軟木塞乾裂，可能引發TCA污染或密封失效導致氧化。'
  },
  {
    id: 'lo6-019',
    lo: 6,
    sourceType: 'static-panel',
    sourceId: 'storage-faults',
    question: '「熱害（Heat Damage/Maderisation）」的成因與徵狀？',
    options: [
      '長期暴露過高溫度，產生煮熟水果焦糖氣味',
      '二氧化硫添加不足，導致酒液氧化',
      '瓶身直立存放，導致軟木塞乾燥龜裂',
      '軟木塞受TCA污染，產生濕紙板氣味'
    ],
    correctIndex: 0,
    explanation: '熱害由運輸/存放環境溫度不當所致：長期暴露過高溫度或劇烈溫度波動，產生煮熟水果、焦糖甚至醬油氣味，瓶身可能滲液或軟木塞被推出。'
  },
  {
    id: 'lo6-020',
    lo: 6,
    sourceType: 'static-panel',
    sourceId: 'storage-faults',
    question: '瓶身直立存放對軟木塞封瓶酒款最可能造成？',
    options: [
      '意外提高酒款的最終酒精濃度表現',
      '意外加速酒款的陳年熟成速度過程',
      '軟木塞未接觸酒液乾燥龜裂，導致封瓶失效',
      '會影響瓶身外觀清潔度，但不影響封瓶或酒液狀態'
    ],
    correctIndex: 2,
    explanation: '軟木塞需持續浸潤才能維持密封彈性：軟木塞未持續接觸酒液而乾燥龜裂，導致封瓶失效氧氣滲入。'
  },
  {
    id: 'lo6-021',
    lo: 6,
    sourceType: 'data-object',
    sourceId: 'foodpairing-tags',
    question: '生蠔、烤鮭魚一類海鮮料理通常歸類在哪個食物搭配大類？',
    options: [
      'Red Meat & Game（紅肉野味）',
      'Seafood（海鮮）分類',
      'Charcuterie & Appetizer（醃肉開胃菜）',
      'Umami & Special Ingredients（鮮味特殊食材）'
    ],
    correctIndex: 1,
    explanation: '對應FOOD_CATEGORY_MAP中\'seafood\'分類。'
  },
  {
    id: 'lo6-022',
    lo: 6,
    sourceType: 'data-object',
    sourceId: 'foodpairing-tags',
    question: '鵝肝與瑪格麗特披薩歸為哪一類？',
    options: [
      'Vegetable & Mushroom（蔬食與菇蕈類）',
      'White Meat & Poultry（白肉與禽肉類）',
      'Dessert & Fruit（甜點與水果類）',
      'Umami & Special Ingredients（鮮味特殊食材）'
    ],
    correctIndex: 3,
    explanation: '對應FOOD_CATEGORY_MAP中\'umami\'分類。'
  },
  {
    id: 'lo6-023',
    lo: 6,
    sourceType: 'wset-spec-supplement',
    sourceId: 'food-wine-interactions',
    question: '根據WSET官方規格，食物中的哪一項特性最容易讓葡萄酒的單寧顯得更緊澀苦硬？',
    options: [
      '甜度（Sweetness）',
      '鮮味（Umami）',
      '辣度（Chilli heat）',
      '脂肪（Fat）'
    ],
    correctIndex: 1,
    explanation: '鮮味（Umami）重的食物（如蘆筍、菇類、清蒸海鮮）會讓葡萄酒的單寧感覺更粗糙苦澀、甚至帶金屬感，是知名的搭餐地雷；甜度與脂肪反而有軟化單寧的效果，辣度則主要放大酒精灼熱感，皆非讓單寧變緊澀的主因。'
  },
  {
    id: 'lo6-024',
    lo: 6,
    sourceType: 'wset-spec-supplement',
    sourceId: 'food-wine-interactions',
    question: '根據WSET官方規格，食物中的「脂肪」與「鹹味」最容易軟化或降低葡萄酒的哪一項成分？',
    options: [
      '甜度（Sweetness）這項因子',
      '酸度（Acidity）這項因子',
      '酒精濃度（Alcohol）這項因子',
      '苦味（來自單寧或橡木桶）'
    ],
    correctIndex: 3,
    explanation: '食物中的脂肪與鹹味具有軟化單寧、降低葡萄酒苦澀感知的效果，是經典的搭餐原則（例如油脂豐富的牛排能讓高單寧紅酒喝起來更圓潤）；甜度、酸度、酒精濃度則不是脂肪與鹹味主要作用的對象。'
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
      '會加速葡萄成熟，使採收期明顯提早',
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
      '會延後採收時間，對釀酒品質沒有幫助',
      '會提高葡萄園蟲害風險，與貴腐黴或溫度調節無關',
      '會加速葡萄腐敗，對釀酒沒有正面幫助'
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
      '熟度會影響單寧含量，但酸度不會隨之改變'
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
      '早摘糖度更高、酒精更高；晚摘酸度更高、風味更淡',
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
      '不進行採收，任由葡萄自然凋零',
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
      '產量越低，品質會變差，兩者呈負相關',
      '產量越高，濃縮度也會提高，兩者呈正相關',
      '較低產量通常關聯較濃縮的風味，但仍受氣候、年份等其他因素影響',
      '產量高低主要取決於天氣，與修剪、種植密度等人為管理較無關'
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
      '兩者差異純粹在於是否可用於氣泡酒，與規範嚴格程度無關',
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
      '同一種黴菌若在潮濕天氣下大量繁殖未及時轉為貴腐，會演變成必須淘汰的灰黴病',
      '葡萄感染貴腐黴後水分蒸發，糖分與風味高度濃縮',
      '指葡萄採收後刻意風乾以提升糖度的傳統工法',
      '指葡萄成熟後刻意延後採收、讓糖分持續累積的晚摘工法'
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
    id: 'lo1-031',
    lo: 1,
    sourceType: 'wset-spec-supplement',
    sourceId: 'soil-drainage-vigor',
    question: '排水性佳、養分貧瘠的土壤（如礫石、砂質土）為何普遍被認為有利於優質葡萄酒生產？',
    options: [
      '礫石與砂質土壤本身含有稀有礦物質，能被根系直接吸收進入果實，形成獨特的礦石風味物質',
      '貧瘠土壤能大幅提升葡萄藤對病蟲害的天然抵抗力，降低農藥使用需求',
      '這類土壤保水／蓄熱能力較差，能延長生長季，藉此提升果實複雜度',
      '逼迫根系向下深入尋找水分與養分，同時限制果實含水量，避免風味被過度稀釋'
    ],
    correctIndex: 3,
    explanation: '貧瘠、排水佳的土壤限制水分供應，逼迫根系深入土層，同時控制果實含水量與植株活力（vigor），是官方規格中低肥力土壤有利品質的核心機制；土壤礦物質是否能直接轉化為酒中風味分子，並非WSET認可的科學共識。'
  },
  {
    id: 'lo1-032',
    lo: 1,
    sourceType: 'wset-spec-supplement',
    sourceId: 'topography-aspect',
    question: '葡萄園坡向（aspect）與坡度在種植決策中主要影響什麼？',
    options: [
      '坡向主要影響採收時的人工搬運難度，與果實成熟度較無關聯',
      '朝向陽光的坡面能增加日照接收量與角度，有助於果實成熟度',
      '坡度越陡峭，土壤排水性通常越差，較不利於葡萄種植',
      '坡向主要影響的是葡萄藤根系深度，與地面上果實接收的日照量較無直接關聯'
    ],
    correctIndex: 1,
    explanation: '在中高緯度涼爽產區，朝陽坡面（如北半球的南向坡）能接收更多日照，提升果實累積糖分與酚類物質成熟度的能力，是選址時的重要考量之一；坡度陡峭實際上通常有助排水，而非變差。'
  },
  {
    id: 'lo1-033',
    lo: 1,
    sourceType: 'wset-spec-supplement',
    sourceId: 'rootstock-phylloxera',
    question: '現今全球絕大多數葡萄藤為何要嫁接在特定砧木（rootstock）上種植？',
    options: [
      '為了抵抗根瘤蚜蟲害，美洲原生種砧木對此害蟲具有天然抗性',
      '嫁接主要是為了讓葡萄藤能適應鹽鹼與貧瘠土壤等特殊種植環境，與病蟲害防治較無直接關聯',
      '嫁接能讓同一株藤同時結出兩種不同品種的果實，藉此提高整體種植與採收效率',
      '砧木主要功能是加速植株生長速度，讓葡萄提早一至兩年進入結果期'
    ],
    correctIndex: 0,
    explanation: '19世紀根瘤蚜蟲害重創歐洲葡萄園後，業界發現將歐洲種（Vitis vinifera）嫁接在具天然抗性的美洲原生種砧木上可解決此問題，這項作法延續至今，是現今全球絕大多數葡萄園的標準種植方式。'
  },
  {
    id: 'lo1-034',
    lo: 1,
    sourceType: 'wset-spec-supplement',
    sourceId: 'canopy-management',
    question: '葉幕管理（canopy management，如適度去除葉片）的主要目的為何？',
    options: [
      '去除葉片能直接讓葡萄藤產生更多花青素，加深紅酒顏色',
      '調節果實接收的日照與通風程度，平衡光合作用效率並降低病害風險',
      '葉幕管理主要用於延後採收時間，與果實品質調控較無關',
      '去除葉片主要是為了降低葡萄藤的整體產量，與光照通風較無關'
    ],
    correctIndex: 1,
    explanation: '適度移除果實周圍葉片能改善通風、降低黴菌病害風險，並調節果實接收的日照量，同時維持足夠葉面積供光合作用之用，是常見的葉幕管理手法之一。'
  },
  {
    id: 'lo1-035',
    lo: 1,
    sourceType: 'wset-spec-supplement',
    sourceId: 'irrigation',
    question: '灌溉（irrigation）在葡萄種植中，官方規格如何看待其角色？',
    options: [
      '灌溉主要用於加速葡萄成熟時間，藉此提早進入採收期，與缺水風險管理較無關',
      '灌溉主要用於新種植的幼藤定根期，成株後多半不再使用灌溉',
      '在乾燥或缺水產區可作為必要或輔助手段，但部分傳統產區法規會限制或禁止使用',
      '灌溉在多數傳統歐洲法定產區屬於法規鼓勵的標準種植手段'
    ],
    correctIndex: 2,
    explanation: '在天然降雨不足的產區（如部分新世界產區），灌溉是維持葡萄藤存活與產量穩定的必要工具；但許多傳統歐洲法定產區出於品質與風土考量，會透過法規限制甚至禁止灌溉，兩種情況並存，並非鼓勵使用。'
  },
  {
    id: 'lo1-036',
    lo: 1,
    sourceType: 'wset-spec-supplement',
    sourceId: 'hail-drought-hazards',
    question: '冰雹（hail）對葡萄園造成的損害，主要體現在哪個層面？',
    options: [
      '冰雹主要影響土壤酸鹼值，長期下來會降低土壤肥力',
      '冰雹造成的果實與枝葉損傷主要顯現在隔年，當季產量損失通常相對有限',
      '可能直接損傷果實、葉片甚至枝條，造成當季甚至隔年產量損失',
      '冰雹主要透過提高果園濕度，間接增加黴菌感染機率'
    ],
    correctIndex: 2,
    explanation: '冰雹屬於突發性天氣災害，會直接對果實、葉片與枝條造成物理性損傷，嚴重時甚至傷及來年結果的枝芽，是葡萄種植者需要因應的重大天氣風險之一。'
  },
  {
    id: 'lo1-037',
    lo: 1,
    sourceType: 'wset-spec-supplement',
    sourceId: 'frost-protection-methods',
    question: '春霜（spring frost）發生時，葡萄園常見的防護方法為何？',
    options: [
      '包括風扇攪動空氣防止冷空氣堆積、灑水在嫩芽表面形成保護冰層等措施',
      '常見作法是延後隔年整枝與修剪的時間，讓植株的枝芽提前適應低溫環境',
      '春霜防護主要透過施灑特定除草劑，降低植株組織對低溫的生理敏感度',
      '春霜防護主要仰賴選用晚熟品種延後發芽期，與當季主動防護措施較無直接關聯'
    ],
    correctIndex: 0,
    explanation: '常見防霜方式包括利用風扇或直升機攪動空氣、避免冷空氣在低窪處堆積積聚，或在預期降霜時灑水於嫩芽表面（水結冰釋放的潛熱可維持嫩芽表面溫度略高於致命低溫），是主動且有效的防護手段。'
  },
  {
    id: 'lo1-038',
    lo: 1,
    sourceType: 'wset-spec-supplement',
    sourceId: 'france-appellation-pyramid',
    question: '法國葡萄酒法定分級體系由高至低依序為何？',
    options: [
      'IGP（地區餐酒）→ AOC/AOP（法定產區）→ Vin de France（法國餐酒）',
      'Vin de France（法國餐酒）→ AOC/AOP（法定產區）→ IGP（地區餐酒）',
      'AOC/AOP（法定產區）→ Vin de France（法國餐酒）→ IGP（地區餐酒）',
      'AOC/AOP（法定產區）→ IGP（地區餐酒）→ Vin de France（法國餐酒）'
    ],
    correctIndex: 3,
    explanation: "法國分級體系由高至低依序為AOC/AOP（Appellation d'Origine Contrôlée/Protégée，法定產區）、IGP（Indication Géographique Protégée，地區餐酒）、Vin de France（法國餐酒，法規限制最少），與義大利、西班牙的金字塔式分級架構邏輯相同。"
  },
  {
    id: 'lo1-039',
    lo: 1,
    sourceType: 'wset-spec-supplement',
    sourceId: 'harvest-methods',
    question: '人工採收（hand-harvesting）相較於機械採收（machine-harvesting），常被認為的主要優勢為何？',
    options: [
      '人工採收的成本通常低於機械採收，是選擇人工的主要理由',
      '能選擇性挑選成熟度理想的果串，並保留完整果串、減少果實破損與氧化風險',
      '人工採收主要因為法規要求特定產區禁止使用機械採收，才被迫採用',
      '人工採收能大幅提高單位面積的採收速度，適合大型商業酒莊'
    ],
    correctIndex: 1,
    explanation: '人工採收能在採收當下由人眼挑選成熟度較佳、健康無病害的果串，且果串保持完整、減少破皮氧化與過早釋出汁液的風險，適合坡度陡峭或品質要求較高的地塊；成本通常高於機械採收，速度也通常慢於機械採收。'
  },
  {
    id: 'lo1-040',
    lo: 1,
    sourceType: 'wset-spec-supplement',
    sourceId: 'sustainable-organic-biodynamic',
    question: '「永續（sustainable）」種植與「有機（organic）」種植，兩者在規範精神上的主要差異為何？',
    options: [
      '永續種植規範內容與有機種植規範大致重疊，僅額外多了節能與包裝材質相關的技術要求',
      '有機種植所涵蓋的規範範圍比永續種植更廣，額外包含勞工權益與能源使用相關規範',
      '永續種植除了限制化學合成物質使用，還進一步涵蓋節水、生物多樣性與勞工權益等環境與社會面向',
      '永續種植的核心規範主要聚焦於限制灌溉系統與人工肥料的使用，其餘面向則與有機種植規範相同'
    ],
    correctIndex: 2,
    explanation: '有機種植的核心規範聚焦於限制人工合成化學肥料、農藥與除草劑的使用；永續種植則是更廣義的概念，除了環境友善的種植措施，通常也涵蓋水資源管理、生物多樣性維護、能源使用與勞工權益等面向，兩者規範範疇並不相同。'
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
      '兩者的差異只在於採收年份不同，與榨汁方式無關',
      '自流酒較純淨清爽，壓榨酒單寧較重',
      '自流酒單寧較重，壓榨酒較清爽',
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
      '溫度差異主要取決於使用的酵母菌株，與酒色較無關',
      '白酒較少需要進行控溫發酵處理'
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
      '是主要用於白葡萄品種的工法'
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
      '多數年份都會例行使用，不需視葡萄狀況而定',
      '葡萄過熟、天然酸度不足時添加酸類調整',
      '主要用於氣泡酒二次發酵前的調整階段',
      '主要用於已裝瓶完成後的成品酒調整'
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
      '主要適用於氣泡酒二次發酵的工序步驟',
      '透過額外添加糖漿調整甜度，並非透過中止發酵達成'
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
      '刻意排除糖分於釀造過程中',
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
      '橡木桶的表面顏色是影響風格的主要變因',
      '桶身尺寸、新舊程度、內壁烘烤程度',
      '橡木桶的產地來源是影響風格的主要變因',
      '橡木桶產地是影響風格最主要的變因，尺寸與烘烤程度影響較小'
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
      '因為MLF理論上主要適用於紅酒',
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
      '會讓酒款產生令人不悅的異味，屬於應避免的釀造缺陷',
      '會影響酒液最終的酒精濃度高低'
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
      '主要適用於氣泡酒二次發酵前的調配步驟',
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
      '單寧會隨陳年軟化，但顏色與香氣變化較不明顯',
      '酒精濃度會隨陳年逐漸改變，是主要變化項目',
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
      '顏色變化主要取決於瓶塞材質，與陳年時間長短較無關',
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
      '酒精濃度是主要變化面向'
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
      '顏色變化速度主要取決於瓶塞材質，與品種或陳年時間較無關',
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
      '會長時間保持不變，停留在年輕果香階段',
      '香氣會逐漸演變得更加接近紅酒的風格',
      '新鮮果香減弱，發展出蜂蜜堅果等三級香氣',
      '會產生負面氧化異味，沒有正面陳年價值'
    ],
    correctIndex: 2,
    explanation: '白酒陳年會發展出蜂蜜、烤堅果、汽油（如老年份Riesling）等更複雜的三級陳年香氣，這是官方規格認可的正面熟成現象，需區分「合宜的陳年演變」與「缺陷」兩個概念。'
  },
  {
    id: 'lo2-025',
    lo: 2,
    sourceType: 'wset-spec-supplement',
    sourceId: 'extraction-techniques',
    question: '紅酒發酵過程中，「淋皮（pump-over/remontage）」與「踩皮（punch-down/pigeage）」這兩種操作的共同目的為何？',
    options: [
      '兩者主要目的是加速酒精發酵的化學反應速度，藉此縮短整體發酵所需的時間',
      '兩者是用來降低發酵桶內溫度的散熱手段，與果皮萃取程度較無直接關聯',
      '讓浮在液面的果皮「酒帽」重新與發酵中的酒液接觸，加強色素與單寧的萃取程度',
      '兩者的目的是讓果皮持續沉入桶底，盡量減少與酒液的接觸機會'
    ],
    correctIndex: 2,
    explanation: '發酵過程中二氧化碳會將果皮、籽等固體物質推浮至液面形成「酒帽」；淋皮是將底部酒液抽取後淋回酒帽表面，踩皮則是直接將酒帽壓入液面下，兩者都是為了讓酒帽持續與酒液接觸，加強色素與單寧的萃取程度。'
  },
  {
    id: 'lo2-026',
    lo: 2,
    sourceType: 'wset-spec-supplement',
    sourceId: 'fining-filtration',
    question: '「黏合澄清（fining）」與「過濾（filtration）」這兩種裝瓶前的處理工序，主要差異為何？',
    options: [
      '黏合澄清透過添加物質吸附懸浮微粒使其沉澱，過濾則是讓酒液實際通過孔隙介質移除微粒',
      '黏合澄清是過濾工序當中的其中一個步驟，兩者屬於從屬關係而非兩種獨立工序',
      '黏合澄清較常用於白酒，過濾則較常用於紅酒，兩者依酒色分工使用',
      '兩者都是透過提高酒液溫度，讓微粒自然揮發移除的工序'
    ],
    correctIndex: 0,
    explanation: '黏合澄清是透過添加物質（如皂土、蛋白）與酒中懸浮微粒結合後沉澱移除；過濾則是讓酒液實際通過不同孔隙大小的介質，物理性地攔截並移除微粒或微生物，兩者原理不同、彼此獨立，實務上可能搭配使用。'
  },
  {
    id: 'lo2-027',
    lo: 2,
    sourceType: 'wset-spec-supplement',
    sourceId: 'oak-origin-flavor',
    question: '法國橡木桶與美國橡木桶賦予葡萄酒的風味特徵，一般認為有何差異？',
    options: [
      '兩者風味差異主要來自製桶時的烘烤程度深淺，與木材本身的產地來源較無直接關係',
      '美國橡木桶較常用於白酒陳年、法國橡木桶較常用於紅酒陳年，兩者依酒色分工使用',
      '法國橡木桶的木紋密度通常低於美國橡木桶，因此風味釋放的速度會明顯更快',
      '法國橡木桶通常帶來較細緻的香料與烘烤調性，美國橡木桶則常帶來更明顯的椰子與甜香草調性'
    ],
    correctIndex: 3,
    explanation: '法國橡木通常木紋較細密，經傳統剖裂製桶，賦予酒款較細緻的香料、烘烤與雪松調性；美國橡木木紋較粗，通常經鋸切製桶，化合物組成不同，常帶來更明顯的椰子、甜香草與奶油糖調性，是業界公認的一般傾向。'
  },
  {
    id: 'lo2-028',
    lo: 2,
    sourceType: 'wset-spec-supplement',
    sourceId: 'sulfur-dioxide-role',
    question: '二氧化硫（SO2）在釀造過程中被廣泛添加，主要作用為何？',
    options: [
      '二氧化硫主要透過提高酒液酸鹼值來延長保存期，而非直接抑制微生物活動',
      '具有抗氧化與抑制微生物（如野生酵母、細菌）活動的雙重功能，有助於穩定酒質',
      '添加二氧化硫主要用途是加速酒精發酵反應速度，縮短釀造週期',
      '二氧化硫主要用於調整酒款顏色深淺，與微生物穩定性較無關'
    ],
    correctIndex: 1,
    explanation: '二氧化硫是葡萄酒釀造中常用的添加物，具備抗氧化（延緩氧化變質）與抑制不需要的野生酵母、細菌等微生物活動的雙重功能，有助於維持酒款穩定性與延長保存潛力，是官方規格中重要的釀造添加物知識點。'
  },
  {
    id: 'lo2-029',
    lo: 2,
    sourceType: 'wset-spec-supplement',
    sourceId: 'cold-soak',
    question: '紅酒釀造中，發酵前的「低溫泡皮（cold soak/pre-fermentation maceration）」目的為何？',
    options: [
      '低溫泡皮主要目的是讓酒精濃度提前達到穩定數值，藉此避免發酵後期濃度出現劇烈波動',
      '低溫泡皮主要是為了殺死果皮上殘留的野生酵母，確保後續發酵可控',
      '低溫泡皮的主要目的是延後啟動酒精發酵的時間點，與風味萃取程度較無關',
      '在酒精發酵尚未開始的低溫環境下，先行萃取部分色素與風味物質，且不易萃取出過多單寧'
    ],
    correctIndex: 3,
    explanation: '在正式酒精發酵開始前，先將破皮後的果漿維持在較低溫度浸泡一段時間，此時酒精尚未產生，能以相對溫和的方式萃取部分色素與果香物質，同時避免發酵中高溫伴隨的過度單寧萃取，是部分酒莊用來提升果香表現的手法。'
  },
  {
    id: 'lo2-030',
    lo: 2,
    sourceType: 'wset-spec-supplement',
    sourceId: 'carbonic-maceration',
    question: '「二氧化碳浸皮法（Carbonic Maceration）」這種特殊釀造工法的核心原理為何？',
    options: [
      '這種工法會先將葡萄破皮去梗，再額外注入二氧化碳氣體以加速發酵反應',
      '將完整未破皮的整串葡萄置於充滿二氧化碳的密閉環境中，讓果粒內部先行進行細胞內發酵',
      '這種工法主要用於白酒釀造，讓酒款產生類似氣泡酒的自然氣泡感',
      '這種工法的目的是延長葡萄酒的瓶中陳年潛力，讓單寧結構更為緊實'
    ],
    correctIndex: 1,
    explanation: '二氧化碳浸皮法將完整、未破皮的整串葡萄放入充滿二氧化碳的密閉容器中，果粒在缺氧環境下會啟動細胞內發酵，產生獨特的果香與較低單寧的酒款風格，是薄酒萊（Beaujolais）等產區釀造清爽早飲型紅酒的經典工法。'
  },
  {
    id: 'lo2-031',
    lo: 2,
    sourceType: 'wset-spec-supplement',
    sourceId: 'yeast-selection',
    question: '釀酒時選用「人工培養酵母（cultured/inoculated yeast）」而非「野生酵母（wild/ambient yeast）」發酵，常見的考量為何？',
    options: [
      '人工培養酵母的發酵特性可預測，有助於穩定控制發酵風格與降低發酵中止的風險',
      '人工培養酵母的主要優勢是能大幅提高最終酒款的酒精濃度上限，而非發酵穩定性',
      '選用人工培養酵母是多數產區的法規強制規定，野生酵母發酵屬特例許可',
      '野生酵母發酵的酒款風味複雜度通常較低，因此較少被追求高複雜度的酒莊採用'
    ],
    correctIndex: 0,
    explanation: '人工培養酵母菌株經過篩選，發酵特性（如發酵速度、耐酒精程度、風味產物）較可預測與控制，有助於降低發酵中止或產生異味的風險；野生酵母發酵雖能帶來更多層次的複雜度，但穩定性與可預測性通常較低，兩者各有取捨，並非法規強制或品質必然低劣的問題。'
  },
  {
    id: 'lo2-032',
    lo: 2,
    sourceType: 'wset-spec-supplement',
    sourceId: 'alternative-vessels',
    question: '除了不鏽鋼槽與橡木桶之外，水泥蛋（concrete egg）等替代發酵/陳年容器，常見的特性為何？',
    options: [
      '水泥蛋的主要優勢是能顯著降低採購與長期維護的成本，因此逐漸取代橡木桶成為主流選擇',
      '水泥蛋主要透過持續釋放鹼性礦物質中和酒液酸度，藉此讓酒款風格更為圓潤',
      '不像橡木桶般帶來明顯的木質風味，但其形狀有助於酒液產生自然對流，兼具類似橡木桶的微氧化效果',
      '使用水泥蛋是特定法定產區法規中，規範入門等級酒款所使用的強制容器類型'
    ],
    correctIndex: 2,
    explanation: '水泥蛋等替代容器不含橡木，因此不會為酒款增添木質、香草等橡木衍生風味；但其蛋形結構有助於酒液在容器內自然對流循環，且水泥具有些微透氣性，能提供類似橡木桶的緩慢微氧化效果，同時保留酒款更純粹的果味表現，是近年愈來愈多酒莊採用的替代方案。'
  },
  {
    id: 'lo3-cha-001',
    lo: 3,
    sourceType: 'data-object',
    sourceId: 'chardonnay',
    question: 'Chardonnay作為「中性品種」的意思是什麼？',
    options: [
      '它主要用來釀成氣泡酒，較少做成靜態酒款',
      '它主要在法國種植生產，其他國家較少見',
      '它幾乎沒有可辨識的香氣特徵',
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
      '低酸度、高甜度，帶明顯蜂蜜與杏桃調性',
      '高酸度、礦石感明顯、青蘋果檸檬果香',
      '低酸度、高酒精、熱帶水果香氣',
      '通常帶有明顯奶油與橡木桶調性'
    ],
    correctIndex: 1,
    explanation: 'Chardonnay的香氣輪包含Green Apple、Lemon等青綠果香，冷涼產區這類特徵更為明顯；白葡萄酒普遍不進行帶皮發酵，因此單寧含量極低，這是所有白葡萄品種的共通特性，並非Chardonnay獨有。'
  },
  {
    id: 'lo3-cha-004',
    lo: 3,
    sourceType: 'data-object',
    sourceId: 'chardonnay',
    question: '溫暖氣候（如Napa Valley納帕谷）種植並經橡木桶processing的Chardonnay，典型風格特徵為何？',
    options: [
      '橡木調性會完全掩蓋果香，僅能嚐到木頭與香草味',
      '極高酸度、礦石感異常強烈明顯',
      '極低酸度、風味極淡，幾乎嚐不出果香',
      '酒體較飽滿，常帶奶油榛果等橡木調性'
    ],
    correctIndex: 3,
    explanation: 'Chardonnay的香氣輪也包含Butter、Hazelnut這類經橡木桶與乳酸發酵帶來的調性，常見於溫暖產區風格。'
  },
  {
    id: 'lo3-cha-005',
    lo: 3,
    sourceType: 'data-object',
    sourceId: 'chardonnay',
    question: 'Chardonnay與白蘇維濃（Sauvignon Blanc）在香氣邏輯上的核心差異為何？',
    options: [
      'Chardonnay靠釀造塑形；白蘇維濃品種特徵強烈明確',
      '兩者都主要依賴橡木桶調性，品種本身特徵並不明顯',
      '白蘇維濃比Chardonnay更依賴橡木桶調性',
      'Chardonnay多半釀造甜型酒款，較少做乾型'
    ],
    correctIndex: 0,
    explanation: '官方規格明確點出兩者香氣邏輯相反的對照關係：Chardonnay品種本身中性、風味主要來自釀造與產地；白蘇維濃品種特徵強烈（草本與醋栗氣息明確可辨），釀造工法影響相對有限。'
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
    explanation: '官方規格指出Chardonnay與白皮諾（Pinot Blanc）在盲飲時偶有混淆，白皮諾酸度通常更柔和、缺乏Chardonnay經橡木桶後常見的奶油榛果調性。'
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
    explanation: '代表產區涵蓋Chablis、Napa Valley、Margaret River等多個產區，Mosel是Riesling的代表產區，不在Chardonnay清單中。'
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
    explanation: '建議侍酒溫度為10–13°C，對應濃郁型／經橡木桶白酒的溫度區間。'
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
    explanation: '建議搭餐項目包括Seafood、Cream Sauce、Moderate Fat、Poultry，與其中等酒體和常見的奶油質地相呼應。'
  },
  {
    id: 'lo3-cha-010',
    lo: 3,
    sourceType: 'data-object',
    sourceId: 'chardonnay',
    question: '為什麼Chardonnay（以及絕大多數白葡萄酒）幾乎不帶單寧口感？',
    options: [
      '因為Chardonnay是所有品種中果皮最薄的一種，天生單寧極少',
      '因為裝瓶前普遍會以皂土（Bentonite）等方式進行澄清處理，將單寧濾除',
      '單寧含量會依產區不同從無到有大幅浮動，無法一概而論',
      '白葡萄酒釀造時果汁不與果皮長時間接觸發酵，單寧幾乎無從萃取'
    ],
    correctIndex: 3,
    explanation: '白葡萄酒釀造流程通常在榨汁後才發酵，果汁與果皮接觸時間短，單寧（主要存在於果皮、籽與梗）幾乎無法萃取，這是所有白葡萄品種（包含Chardonnay）共通的釀造原理，而非個別品種特性。'
  },
  {
    id: 'lo3-cha-011',
    lo: 3,
    sourceType: 'data-object',
    sourceId: 'chardonnay',
    question: 'Chardonnay在不同釀造風格下，酸度與陳年潛力的關聯為何？',
    options: [
      '經過橡木桶陳年的版本，陳年潛力通常較高',
      '陳年潛力主要取決於裝瓶時添加的二氧化硫劑量，與酸度高低較無關',
      '未經橡木桶、單靠高酸支撐的頂級版本（如Chablis特級園）本身就具備長期陳年實力',
      'Chardonnay陳年潛力普遍偏低，無論釀造方式為何'
    ],
    correctIndex: 2,
    explanation: 'Chardonnay天生具備支撐陳年的酸度結構，這種陳年實力並非來自橡木桶，而是來自品種本身的酸度與釀造品質——例如完全不經橡木桶、僅靠高酸與礦石感支撐的頂級Chablis特級園，同樣以優異的陳年實力聞名，顯示橡木桶並非決定陳年潛力的關鍵因素。'
  },
  {
    id: 'lo3-cha-012',
    lo: 3,
    sourceType: 'data-object',
    sourceId: 'chardonnay',
    question: '1990年代葡萄酒市場曾出現對Chardonnay的什麼反思聲浪？',
    options: [
      '認為Chardonnay過度依賴法國產區，缺乏其他產地代表性',
      '認為Chardonnay不再適合用來釀造優質酒款',
      '對「過度橡木化」的反思，一度出現ABC風潮',
      '認為Chardonnay應禁止使用不鏽鋼槽'
    ],
    correctIndex: 2,
    explanation: '因其可塑性強、市場一度過度依賴橡木桶調性，1990年代確實出現對「過度橡木化（over-oaked）」的市場反思，導致部分消費者一度追捧「ABC（Anything But Chardonnay）」風潮。'
  },
  {
    id: 'lo3-cha-013',
    lo: 3,
    sourceType: 'data-object',
    sourceId: 'chardonnay',
    question: 'Chardonnay的果皮顏色分類與原產國為何？',
    options: [
      '黑皮，原產義大利',
      '白皮，原產法國',
      '灰皮，原產德國',
      '白皮，原產美國'
    ],
    correctIndex: 1,
    explanation: '果皮顏色為白葡萄，原生國為法國。'
  },
  {
    id: 'lo3-cha-014',
    lo: 3,
    sourceType: 'data-object',
    sourceId: 'chardonnay',
    question: '為什麼Chardonnay被稱為「全球適應力最強的白酒品種之一」？',
    options: [
      '因為它對霜害、病害的抵抗力特別強，這是它適應多種氣候的主因',
      '因為它天生帶有濃郁獨特的品種香氣，不易受氣候與釀造工法影響',
      '因為它糖酸比天生穩定，受採收時間早晚的影響較小',
      '品種中性、可塑性高，冷涼到溫暖氣候皆能展現風格'
    ],
    correctIndex: 3,
    explanation: '正是這種「可塑性」讓Chardonnay能在幾乎所有主要葡萄酒產區找到立足之地，風格光譜極廣，從冷涼到溫暖氣候、不鏽鋼槽到橡木桶皆能展現不同且皆具辨識度的風格。'
  },
  {
    id: 'lo3-cha-015',
    lo: 3,
    sourceType: 'wset-spec-supplement',
    sourceId: 'chardonnay',
    question: 'Chardonnay在香檳區（Champagne）的釀造中扮演什麼角色？',
    options: [
      'Chardonnay在香檳區僅作為調配用的少量輔助品種，法規明文不允許以100%單一品種裝瓶',
      'Chardonnay在香檳區主要用於粉紅香檳的染色調配用途，較少用於白中白酒款釀造',
      'Chardonnay並非香檳區官方認可的法定品種，該產區僅允許兩種黑葡萄品種合法種植',
      '是香檳三大法定品種之一，100%使用Chardonnay釀造的香檳稱為「Blanc de Blancs」'
    ],
    correctIndex: 3,
    explanation: 'Chardonnay是香檳區三大法定品種之一（另兩種為Pinot Noir與Pinot Meunier），100%使用Chardonnay釀造的香檳稱為「Blanc de Blancs」（白中白），是官方規格中Chardonnay跨LO應用的重要知識點。'
  },
  {
    id: 'lo3-cha-016',
    lo: 3,
    sourceType: 'wset-spec-supplement',
    sourceId: 'chardonnay',
    question: '市面上常見「奶油感（buttery）」風格的Chardonnay，這種風味主要來自什麼釀造選擇？',
    options: [
      '主要來自發酵前延長酒渣接觸時間並持續攪拌，與是否進行乳酸發酵較無直接關聯',
      '主要來自裝瓶前使用全新美國橡木桶進行長期陳年，與是否進行乳酸發酵較無關',
      '讓酒液進行乳酸發酵（MLF），將尖銳的蘋果酸轉化為較柔和的乳酸，同時產生奶油般的雙乙醯風味物質',
      '主要來自採收時刻意延後採收、提高果實成熟度與糖分濃度，讓天然奶油風味物質累積'
    ],
    correctIndex: 2,
    explanation: '乳酸發酵（MLF）會將尖銳的蘋果酸轉化為口感較柔和的乳酸，同時副產物雙乙醯（diacetyl）帶來奶油般的風味，是Chardonnay奶油感風格的主要成因；酒渣接觸主要影響的是麵包／堅果調性與口感圓潤度，性質不同。'
  },
  {
    id: 'lo3-cha-017',
    lo: 3,
    sourceType: 'wset-spec-supplement',
    sourceId: 'chardonnay',
    question: '布根地（Burgundy）Chardonnay產區的法定分級架構，由高至低依序為何？',
    options: [
      'Grand Cru（特級園）→ Premier Cru（一級園）→ Village（村莊級）→ Regional（大區級）',
      'Premier Cru（一級園）→ Grand Cru（特級園）→ Village（村莊級）→ Regional（大區級）',
      'Village（村莊級）→ Premier Cru（一級園）→ Grand Cru（特級園）→ Regional（大區級）',
      'Grand Cru（特級園）→ Village（村莊級）→ Premier Cru（一級園）→ Regional（大區級）'
    ],
    correctIndex: 0,
    explanation: '布根地分級由高至低依序為Grand Cru（特級園）、Premier Cru（一級園）、Village（村莊級）、Regional（大區級），是官方規格中重要的法定分級知識點，Chardonnay與Pinot Noir皆適用此架構。'
  },
  {
    id: 'lo3-cha-018',
    lo: 3,
    sourceType: 'wset-spec-supplement',
    sourceId: 'chardonnay',
    question: '除了美國納帕谷之外，下列哪個產區也是以涼爽氣候風格著稱的Chardonnay代表產區？',
    options: [
      '澳洲Barossa Valley（巴羅莎谷），該產區以溫暖氣候風格聞名',
      '澳洲Margaret River（瑪格麗特河），因鄰近印度洋、受海洋氣候調節而風格偏涼爽',
      '西班牙Rioja（里奧哈），該產區以Tempranillo紅酒聞名',
      '智利Maipo Valley（邁波谷），該產區同樣以溫暖氣候紅酒聞名居多'
    ],
    correctIndex: 1,
    explanation: '澳洲Margaret River因鄰近印度洋、受海洋調節氣候影響，是澳洲少數以涼爽氣候風格Chardonnay聞名的產區之一，與納帕谷同屬新世界涼爽氣候Chardonnay的代表；其餘三個產區皆以溫暖氣候紅酒品種聞名，並非Chardonnay代表產區。'
  },
  {
    id: 'lo3-cha-019',
    lo: 3,
    sourceType: 'wset-spec-supplement',
    sourceId: 'chardonnay',
    question: '「攪桶（bâtonnage/lees stirring）」這項工序對Chardonnay風格的主要影響為何？',
    options: [
      '讓死酵母渣持續與酒液接觸並攪拌，增添酒體的圓潤度與麵包／堅果調性複雜度',
      '攪桶主要目的是加速酒精發酵的化學反應速度，與酒體質地變化較無直接關聯',
      '攪桶主要用途是降低酒液最終的總酸度，達到部分去酸的釀造效果',
      '攪桶是裝瓶前的最後一道過濾步驟，主要用於移除殘留酒渣本身'
    ],
    correctIndex: 0,
    explanation: '攪桶是主動攪動桶底死酵母渣、使其與酒液持續接觸的工序，有助於增添酒體圓潤度、口感厚度與麵包／堅果調性複雜度，是Chardonnay常見的風格化釀造手法之一。'
  },
  {
    id: 'lo3-svb-001',
    lo: 3,
    sourceType: 'data-object',
    sourceId: 'sauvignon-blanc',
    question: 'Sauvignon Blanc的經典風格特徵為何？',
    options: [
      '高酸爽脆的芳香品種，帶草本與醋栗香氣',
      '低酸度圓潤風格，帶濃郁橡木調性',
      '香氣中性不明顯，主要仰賴橡木桶賦予風味',
      '多半是甜型酒款，較少見不甜版本'
    ],
    correctIndex: 0,
    explanation: '官方規格明確描述為高酸爽脆的芳香品種，經典風格帶草本與醋栗香氣。'
  },
  {
    id: 'lo3-svb-002',
    lo: 3,
    sourceType: 'data-object',
    sourceId: 'sauvignon-blanc',
    question: 'Sauvignon Blanc起源於哪個區域，最早文獻記載可追溯至何時？',
    options: [
      '德國萊茵高地區，15世紀已有文獻記載',
      '法國羅亞爾河與波爾多，18世紀已有記載',
      '義大利東北部地區，20世紀才首見記載',
      '西班牙赫雷斯地區，16世紀已有文獻記載'
    ],
    correctIndex: 1,
    explanation: 'history欄位明確記載起源於法國羅亞爾河與波爾多一帶，18世紀文獻已有栽培記載。'
  },
  {
    id: 'lo3-svb-003',
    lo: 3,
    sourceType: 'data-object',
    sourceId: 'sauvignon-blanc',
    question: 'DNA分析確認Sauvignon Blanc與哪個知名紅酒品種具有親緣關係？',
    options: [
      '是卡本內蘇維濃的親本之一',
      '與希哈具有直接親緣關係',
      '與黑皮諾具有直接親緣關係',
      '與梅洛具有直接親緣關係'
    ],
    correctIndex: 0,
    explanation: 'DNA分析確認白蘇維濃與卡本內弗朗為親本，共同繁殖出全球知名度最高的卡本內蘇維濃，換言之白蘇維濃是卡本內蘇維濃的祖父輩品種之一。'
  },
  {
    id: 'lo3-svb-004',
    lo: 3,
    sourceType: 'data-object',
    sourceId: 'sauvignon-blanc',
    question: '1980年代紐西蘭馬爾堡Sauvignon Blanc震驚國際市場的招牌香氣特徵為何？',
    options: [
      '溫和的蜂蜜與杏桃香氣',
      '明顯的奶油與榛果香氣',
      '濃郁的百香果與青椒香氣',
      '強烈的汽油與礦石感香氣'
    ],
    correctIndex: 2,
    explanation: 'history記載1980年代馬爾堡以其獨特濃郁的百香果與青椒香氣震驚國際市場，開創新世界風格典範。'
  },
  {
    id: 'lo3-svb-005',
    lo: 3,
    sourceType: 'data-object',
    sourceId: 'sauvignon-blanc',
    question: '羅亞爾河（如Sancerre）與紐西蘭馬爾堡的Sauvignon Blanc，兩者風格光譜的核心差異為何？',
    options: [
      '兩者主要差異在於甜度高低，與香氣風格無關',
      '馬爾堡風格比羅亞爾河更具礦石感特徵',
      '羅亞爾河風格比馬爾堡更偏熱帶果香調',
      '羅亞爾河偏燧石礦物風格；馬爾堡偏熱帶果香'
    ],
    correctIndex: 3,
    explanation: '官方規格點出因氣候差異呈現燧石礦石感或熱帶果香兩種光譜，分別對應舊世界（如羅亞爾河）與新世界（如馬爾堡）的典型風格。'
  },
  {
    id: 'lo3-svb-006',
    lo: 3,
    sourceType: 'data-object',
    sourceId: 'sauvignon-blanc',
    question: 'Sauvignon Blanc與賽美蓉（Sémillon）經常混調（如波爾多白酒與索甸貴腐甜酒），兩者角色互補的方式為何？',
    options: [
      '賽美蓉主要負責提升整體酒精濃度，白蘇維濃負責提供甜度',
      '賽美蓉提供高酸，白蘇維濃提供酒體蜂蠟質地',
      '白蘇維濃提供高酸香氣，賽美蓉提供酒體蜂蠟質地',
      '兩者混調主要是為了降低生產成本，與風味互補無關'
    ],
    correctIndex: 2,
    explanation: '官方規格說明白蘇維濃與賽美蓉常見混調且角色互補：白蘇維濃提供高酸與明亮香氣，賽美蓉提供酒體與陳年後的蜂蠟質地。'
  },
  {
    id: 'lo3-svb-007',
    lo: 3,
    sourceType: 'data-object',
    sourceId: 'sauvignon-blanc',
    question: 'Sauvignon Blanc與白詩楠（Chenin Blanc）相比，風格辨識上的關鍵差異為何？',
    options: [
      '兩者主要差異來自產區氣候而非品種本身，本質風味相近',
      '白蘇維濃青草醋栗調性更明確；白詩楠偏榲桲蜂蜜圓潤',
      '白詩楠的酸度表現明顯遠高於白蘇維濃',
      '白蘇維濃本身帶有明顯榲桲蜂蜜調性'
    ],
    correctIndex: 1,
    explanation: '官方規格明確對比兩者：白蘇維濃青草/醋栗調性更明確、酸度更銳利，白詩楠則以榲桲與蜂蜜調性、較圓潤酸度為特徵。'
  },
  {
    id: 'lo3-svb-008',
    lo: 3,
    sourceType: 'data-object',
    sourceId: 'sauvignon-blanc',
    question: '下列哪一個產區不屬於Sauvignon Blanc的代表性種植區域？',
    options: [
      'Sancerre（松塞爾）',
      'Marlborough（馬爾堡）',
      'Graves（格拉夫）',
      'Barossa Valley（巴羅莎谷）'
    ],
    correctIndex: 3,
    explanation: '代表產區涵蓋Sancerre、Marlborough、Graves等產區，Barossa Valley是澳洲以Shiraz聞名的產區，不在Sauvignon Blanc代表產區清單中。'
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
      '16–18°C',
      '8–10°C'
    ],
    correctIndex: 3,
    explanation: '建議侍酒溫度為8–10°C，對應清淡不甜白酒的溫度區間。'
  },
  {
    id: 'lo3-svb-010',
    lo: 3,
    sourceType: 'data-object',
    sourceId: 'sauvignon-blanc',
    question: 'Sauvignon Blanc適合搭配下列哪些食物類型？',
    options: [
      '紅肉與野味等重口味料理',
      '甜點、水果與冰品類料理',
      '海鮮、山羊起司、蘆筍等低脂料理',
      '醃肉、開胃菜與煙燻食材'
    ],
    correctIndex: 2,
    explanation: '建議搭餐項目包括Seafood、Goat Cheese、Light Fat、Asparagus，與其高酸清爽的特性相呼應（蘆筍是傳統上公認難與葡萄酒搭配的食材之一，但與白蘇維濃的草本調性有互補效果）。'
  },
  {
    id: 'lo3-svb-011',
    lo: 3,
    sourceType: 'data-object',
    sourceId: 'sauvignon-blanc',
    question: 'Sauvignon Blanc在白葡萄品種中，其天然酸度表現屬於哪種等級？',
    options: [
      '中等偏低，酸度並非其風味重點',
      '中高，但仍明顯低於多數白葡萄品種',
      '偏低，需要靠人工添加酸才能達到爽脆口感',
      '高酸，是其「爽脆清新」風格定位的關鍵特徵之一'
    ],
    correctIndex: 3,
    explanation: 'Sauvignon Blanc天生高酸，是其「高酸爽脆」風格定位的核心特徵之一，也是其草本與醋栗調性之外另一個重要的品種辨識指標。'
  },
  {
    id: 'lo3-svb-012',
    lo: 3,
    sourceType: 'data-object',
    sourceId: 'sauvignon-blanc',
    question: 'Sauvignon Blanc與Chardonnay相比，兩者在陳年潛力上的一般傾向為何？',
    options: [
      '兩者陳年潛力相近，皆適合長期窖藏',
      'Sauvignon Blanc（尤其新世界芳香奔放型）陳年潛力較低，通常較適合及早飲用',
      'Sauvignon Blanc陳年潛力遠高於Chardonnay',
      '陳年潛力主要取決於封瓶方式（旋轉瓶蓋或軟木塞），與品種本身較無關'
    ],
    correctIndex: 1,
    explanation: '多數Sauvignon Blanc為保留新鮮果香與高酸特性，通常避免蘋果酸乳酸發酵（MLF）與橡木桶陳年，走向較不利長期陳年的早飲風格；相較之下，經橡木桶與MLF處理的Chardonnay（尤其優質版本）較常展現一定的陳年潛力。'
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
    explanation: '果皮顏色為白葡萄，原生國為法國。'
  },
  {
    id: 'lo3-svb-014',
    lo: 3,
    sourceType: 'data-object',
    sourceId: 'sauvignon-blanc',
    question: 'Sauvignon Blanc的香氣輪列出哪些核心香氣？',
    options: [
      '醋栗、青草、百香果、燧石',
      '蜂蜜、杏桃、橙皮果醬、貴腐風味',
      '青蘋果、檸檬、奶油、榛果',
      '紅櫻桃、覆盆莓、蘑菇'
    ],
    correctIndex: 0,
    explanation: '香氣輪列出Gooseberry(醋栗)、Grass(青草)、Passionfruit(百香果)、Flint(燧石)，涵蓋舊世界礦石與新世界熱帶果香兩種光譜的代表香氣。'
  },
  {
    id: 'lo3-svb-015',
    lo: 3,
    sourceType: 'wset-spec-supplement',
    sourceId: 'sauvignon-blanc',
    question: '「Fumé Blanc」這個酒標用語通常指的是什麼風格的白蘇維濃？',
    options: [
      '經橡木桶發酵或陳年的白蘇維濃，風格較為圓潤、帶有煙燻／香料調性，與經典清爽不鏽鋼槽風格不同',
      '特指產自法國羅亞爾河Pouilly-Fumé產區的白蘇維濃酒款，與加州釀造工法選擇較無關',
      '特指刻意延遲採收時間、進一步發展出貴腐甜酒風格的白蘇維濃甜型酒款',
      '特指刻意跳過酒精發酵階段、直接以蒸餾方式製成的白蘇維濃烈酒款'
    ],
    correctIndex: 0,
    explanation: '「Fumé Blanc」源自加州酒莊（如Robert Mondavi）的行銷命名，指經橡木桶發酵或陳年的白蘇維濃，風格較圓潤厚實、帶橡木香料調性，與傳統不鏽鋼槽釀造的清爽草本風格形成對比。'
  },
  {
    id: 'lo3-svb-016',
    lo: 3,
    sourceType: 'wset-spec-supplement',
    sourceId: 'sauvignon-blanc',
    question: '智利Casablanca Valley（卡薩布蘭卡谷）的白蘇維濃，其風格定位相對智利其他內陸產區，一般被認為如何？',
    options: [
      '該產區主要種植區域距海遙遠，屬智利境內氣候最溫暖乾燥的內陸河谷產區之一',
      '因鄰近太平洋、受涼爽海洋氣候調節，風格偏向清爽高酸，與智利內陸溫暖產區的濃郁風格不同',
      '該產區的白蘇維濃法規規定裝瓶前須混調至少三成比例的Chardonnay',
      '該產區以經長期橡木桶陳年、風格濃郁厚實的白蘇維濃聞名於國際市場'
    ],
    correctIndex: 1,
    explanation: 'Casablanca Valley鄰近太平洋，受涼爽的洪堡德涼流與晨霧調節氣候，是智利少數以清爽高酸風格白蘇維濃聞名的產區，與智利內陸溫暖產區的濃郁風格形成對比，是新世界涼爽氣候白蘇維濃的代表產區之一。'
  },
  {
    id: 'lo3-svb-017',
    lo: 3,
    sourceType: 'wset-spec-supplement',
    sourceId: 'sauvignon-blanc',
    question: '南非白蘇維濃的風格定位，一般被認為介於哪兩種風格光譜之間？',
    options: [
      '介於加州Fumé Blanc橡木風格與義大利Pinot Grigio清淡風格之間',
      '南非白蘇維濃的風格與德國Riesling高酸甜型風格最為接近',
      '介於羅亞爾河的礦石／草本調性與紐西蘭馬爾堡的濃郁熱帶果香調性之間',
      '南非白蘇維濃普遍走向極度濃縮的貴腐甜酒風格，與其他產區差異極大'
    ],
    correctIndex: 2,
    explanation: '南非白蘇維濃常被形容風格定位介於羅亞爾河礦石／草本調性與紐西蘭馬爾堡濃郁熱帶果香調性之間，兼具兩種風格光譜的部分特徵，是常見的產區風格比較知識點。'
  },
  {
    id: 'lo3-svb-018',
    lo: 3,
    sourceType: 'wset-spec-supplement',
    sourceId: 'sauvignon-blanc',
    question: '白蘇維濃常見的「青椒／草本（green pepper/herbaceous）」香氣，主要來自哪一類天然化合物？',
    options: [
      '主要來自另一類天然硫醇化合物，其濃度高低與果實成熟度較無直接關聯',
      '主要來自橡木桶長期陳年過程中，單寧氧化後逐漸釋出的特定風味物質',
      '主要來自發酵過程中，乳酸菌代謝糖分後產生的特定酯類副產物質',
      '甲氧基吡𠯤（Methoxypyrazines），在果實未完全成熟時濃度通常較高'
    ],
    correctIndex: 3,
    explanation: '甲氧基吡𠯤（Methoxypyrazines）是白蘇維濃青椒／草本調性的主要來源，其濃度通常隨果實成熟度提高而下降；熱帶果香則主要來自另一類硫醇化合物，兩者是不同的香氣物質來源，常被拿來對比說明。'
  },
  {
    id: 'lo3-svb-019',
    lo: 3,
    sourceType: 'wset-spec-supplement',
    sourceId: 'sauvignon-blanc',
    question: '採收時機的早晚，如何影響白蘇維濃的香氣走向？',
    options: [
      '較早採收時青椒／草本調性通常較明顯，較晚採收則熱帶果香與成熟果香調性通常更為突出',
      '採收時機主要影響最終酒精濃度高低，與香氣調性走向較無直接關聯',
      '無論採收早晚，白蘇維濃的香氣調性主要由土壤類型決定，與果實成熟度較無關',
      '較早採收通常帶來更明顯的熱帶果香調性，較晚採收則帶來更明顯的青椒調性'
    ],
    correctIndex: 0,
    explanation: '較早採收時果實酚類物質成熟度較低，甲氧基吡𠯤（青椒調性）濃度較高；隨著採收時間延後、果實成熟度提高，甲氧基吡𠯤濃度下降，熱帶果香調性通常更為突出，是採收時機影響白蘇維濃風格走向的核心原理。'
  },
  {
    id: 'lo3-rie-001',
    lo: 3,
    sourceType: 'data-object',
    sourceId: 'riesling',
    question: 'Riesling最鮮明的品種特徵為何？',
    options: [
      '低酸度風格，僅能釀成單一甜型酒款',
      '極高酸度，橫跨極干到極甜各種甜度皆能勝任',
      '香氣濃郁奔放，以熱帶水果與奶油調性為主',
      '不適合長期瓶中陳年，建議儘早飲用'
    ],
    correctIndex: 1,
    explanation: '官方規格明確指出Riesling兼具極高酸度與晚收潛力，橫跨干型到甜型（貴腐、冰酒）皆能展現。'
  },
  {
    id: 'lo3-rie-002',
    lo: 3,
    sourceType: 'data-object',
    sourceId: 'riesling',
    question: 'Riesling最早文獻記載可追溯至哪個世紀、哪個產區？',
    options: [
      '1435年，德國萊茵高地區',
      '19世紀，法國香檳區一帶',
      '20世紀，紐西蘭馬爾堡地區',
      '16世紀，西班牙赫雷斯地區'
    ],
    correctIndex: 0,
    explanation: 'history記載最早文獻可追溯至1435年德國萊茵高地區，是少數能明確追溯栽培源頭的歐洲古老品種之一。'
  },
  {
    id: 'lo3-rie-003',
    lo: 3,
    sourceType: 'data-object',
    sourceId: 'riesling',
    question: '關於Riesling常見的迷思「Riesling＝甜酒」，正確的理解為何？',
    options: [
      '這個迷思源自萊茵河流域法規規定Riesling裝瓶前需額外添加糖分',
      '這是誤解，干型與甜型皆為經典風格，須依酒標判斷甜度',
      'Riesling多半釀成干型酒，較少做成甜酒',
      '甜度主要取決於採收季節，與酒標標示較無關'
    ],
    correctIndex: 1,
    explanation: '官方規格明確點出此常見誤解，Riesling干型與甜型（如Auslese、貴腐）皆為經典風格，甜度須依酒標標示判斷而非品種本身決定。'
  },
  {
    id: 'lo3-rie-004',
    lo: 3,
    sourceType: 'data-object',
    sourceId: 'riesling',
    question: 'Riesling與格烏茲塔明那（Gewürztraminer）相比，關鍵區辨特徵為何？',
    options: [
      'Riesling香氣內斂高酸；格烏茲塔明那濃郁荔枝玫瑰低酸',
      '兩者風味差異主要受釀造溫度影響，品種本身香氣邏輯相近',
      '格烏茲塔明那的酸度表現遠高於Riesling',
      'Riesling以荔枝玫瑰香為招牌特徵香氣'
    ],
    correctIndex: 0,
    explanation: '官方規格明確對比：Riesling香氣較內斂、酸度遠高於格烏茲塔明那；格烏茲塔明那則以濃郁荔枝玫瑰香與低酸為特徵，兩者盲飲不易混淆。'
  },
  {
    id: 'lo3-rie-005',
    lo: 3,
    sourceType: 'data-object',
    sourceId: 'riesling',
    question: 'Riesling在二戰後品牌形象受挫的原因為何？',
    options: [
      '因為法規一度限制Riesling種植與生產',
      '因為品種本身完全從市場上消失了數十年',
      '因為當時市場普遍偏好干型Riesling',
      '受廉價甜型出口酒拖累品牌形象，近年才逐漸復興'
    ],
    correctIndex: 3,
    explanation: 'history記載Riesling二戰後受廉價甜型出口酒（如部分Liebfraumilch類產品）拖累品牌形象，近年隨精品干型Riesling復興才逐漸重拾應有地位；19世紀時其實曾與波爾多頂級酒莊並列售價、聲望極高。'
  },
  {
    id: 'lo3-rie-006',
    lo: 3,
    sourceType: 'data-object',
    sourceId: 'riesling',
    question: '下列哪一項是Riesling香氣輪中，特別標記為「陳年後才出現」的特徵香氣？',
    options: [
      '青蘋果（Green Apple）香氣',
      '陳年汽油感（Petrol）',
      '萊姆（Lime）柑橘香氣',
      '板岩礦石感（Slate）香氣'
    ],
    correctIndex: 1,
    explanation: '香氣輪列出Lime、Green Apple、Slate Mineral、Petrol，其中Petrol陳年汽油感是Riesling隨瓶陳發展出的獨特標誌性香氣，年輕酒款通常不明顯。'
  },
  {
    id: 'lo3-rie-007',
    lo: 3,
    sourceType: 'data-object',
    sourceId: 'riesling',
    question: '下列哪一個產區不屬於Riesling的代表性種植區域？',
    options: [
      'Mosel（摩塞爾）地區',
      'Clare Valley（克萊爾谷）',
      'Chianti Classico（經典奇揚地）產區',
      'Wachau（瓦豪）地區'
    ],
    correctIndex: 2,
    explanation: '代表產區涵蓋Mosel、Rheingau、Alsace、Wachau、Clare Valley、Pfalz等產區，Chianti Classico是義大利以Sangiovese聞名的產區，不在Riesling清單中。'
  },
  {
    id: 'lo3-rie-008',
    lo: 3,
    sourceType: 'data-object',
    sourceId: 'riesling',
    question: 'Riesling建議的侍酒溫度區間為何？',
    options: [
      '10–13°C',
      '13–15°C',
      '16–18°C',
      '8–10°C'
    ],
    correctIndex: 3,
    explanation: '建議侍酒溫度為8–10°C，對應清淡不甜白酒/高酸品種的溫度區間。'
  },
  {
    id: 'lo3-rie-009',
    lo: 3,
    sourceType: 'data-object',
    sourceId: 'riesling',
    question: 'Riesling適合搭配下列哪些食物類型？',
    options: [
      '紅肉與野味等重口味料理',
      '辛香料理、亞洲料理、甲殼海鮮',
      '甜點、水果等偏甜食材料理',
      '醃肉、開胃菜與煙燻食材'
    ],
    correctIndex: 1,
    explanation: '建議搭餐項目包括Spicy、Asian Cuisine、Shellfish、Light Appetizer，Riesling的高酸與微甜特性使其特別適合搭配辛辣的亞洲料理，能中和辣度並平衡口感。'
  },
  {
    id: 'lo3-rie-010',
    lo: 3,
    sourceType: 'data-object',
    sourceId: 'riesling',
    question: 'Riesling與Sauvignon Blanc這兩個白葡萄品種，在酸度表現上有何共同點？',
    options: [
      '兩者酸度皆偏低，是柔和圓潤風格的代表',
      'Riesling酸度較高，Sauvignon Blanc酸度中等',
      '兩者皆是公認酸度表現最突出的白葡萄品種代表',
      '兩者酸度皆會因裝瓶年份不同而有明顯落差'
    ],
    correctIndex: 2,
    explanation: 'Riesling與Sauvignon Blanc都是公認酸度表現最突出的白葡萄品種代表，但風味走向截然不同：Riesling常帶花香與礦石感，Sauvignon Blanc則以草本與醋栗調性為主。'
  },
  {
    id: 'lo3-rie-011',
    lo: 3,
    sourceType: 'data-object',
    sourceId: 'riesling',
    question: '為什麼Riesling即使釀成清淡風格，仍以陳年潛力聞名？',
    options: [
      '因為Riesling裝瓶前會刻意提高二氧化硫添加量，達到防腐效果',
      '陳年潛力主要來自其偏高的殘糖，與酸度高低較無關',
      '天然高酸提供了支撐長期陳年的結構，並能發展出獨特的陳年香氣（如汽油、礦石感）',
      'Riesling的高酸主要用於平衡甜度，與陳年潛力並無直接關聯'
    ],
    correctIndex: 2,
    explanation: '高酸是白酒陳年潛力的關鍵支撐要素之一，Riesling天然高酸使其能發展出獨特的陳年汽油（TDN）與礦石調性，是WSET教學中高酸白酒陳年能力的經典案例。'
  },
  {
    id: 'lo3-rie-012',
    lo: 3,
    sourceType: 'data-object',
    sourceId: 'riesling',
    question: 'Riesling的果皮顏色分類與原產國為何？',
    options: [
      '白皮，原產德國',
      '黑皮，原產法國',
      '灰皮，原產奧地利',
      '白皮，原產紐西蘭'
    ],
    correctIndex: 0,
    explanation: '果皮顏色為白葡萄，原生國為德國。'
  },
  {
    id: 'lo3-rie-013',
    lo: 3,
    sourceType: 'data-object',
    sourceId: 'riesling',
    question: '為什麼說Riesling是「少數能明確追溯栽培源頭的歐洲古老品種之一」？',
    options: [
      '因為它是所有歐洲品種中最年輕的一個品種',
      '因為它長期集中在原產地種植，少有對外傳播的紀錄',
      '最早文獻記載出現在19世紀，相對其他古老品種年輕許多',
      '最早文獻可追溯至1435年德國萊茵高，脈絡清晰'
    ],
    correctIndex: 3,
    explanation: '多數古老葡萄品種的確切起源已難以考證，Riesling憑藉1435年的明確文獻記載成為少數例外。'
  },
  {
    id: 'lo3-rie-014',
    lo: 3,
    sourceType: 'data-object',
    sourceId: 'riesling',
    question: 'Riesling在單寧與酒體上的典型表現為何？',
    options: [
      '單寧極低（不帶皮發酵，屬白酒共通特性）、酒體輕盈',
      '由於採用少量浸皮工序，帶有輕微單寧與淡粉紅色澤',
      '單寧偏高是因為Riesling果皮較厚，與其他白葡萄品種不同',
      '酒體極為飽滿厚重，是白酒中最厚重的品種之一'
    ],
    correctIndex: 0,
    explanation: '白葡萄酒普遍不帶皮發酵，單寧含量極低，這是所有白葡萄品種的共通特性；Riesling典型風格為輕盈酒體搭配高酸清爽口感。'
  },
  {
    id: 'lo3-rie-015',
    lo: 3,
    sourceType: 'wset-spec-supplement',
    sourceId: 'riesling',
    question: '德國Riesling在甜度光譜上，「Trocken（不甜型）」與傳統印象中的甜型風格，兩者並存的現況反映了什麼？',
    options: [
      '現代德國Riesling除了傳統甜型風格，Trocken不甜型也是市場常見且受重視的風格選項',
      'Trocken主要是用來標示裝瓶年份較新的酒款，與實際殘糖量高低較無直接關聯',
      'Trocken專指裝瓶前不進行酒渣過濾的傳統釀造方式，與甜度高低較無直接關聯',
      '現今德國市場的Trocken不甜型多半僅用於低價入門款，傳統甜型仍是市場主流與品質代表'
    ],
    correctIndex: 0,
    explanation: '現代德國Riesling風格光譜涵蓋不甜（Trocken）到極甜（如Trockenbeerenauslese），兩種風格並存且都受市場重視，並非某一種風格完全取代另一種，甜度標示是依實際殘糖量而定，並非單純行銷用語。'
  },
  {
    id: 'lo3-rie-016',
    lo: 3,
    sourceType: 'wset-spec-supplement',
    sourceId: 'riesling',
    question: '阿爾薩斯（Alsace）的Riesling，相較於德國傳統印象中的Riesling風格，常見的差異為何？',
    options: [
      '阿爾薩斯Riesling多半以極甜型冰酒風格呈現，酒精濃度通常較低',
      '阿爾薩斯Riesling的法規要求必須經橡木桶陳年，與德國不鏽鋼槽風格不同',
      '阿爾薩斯Riesling多半以不甜型（dry）風格呈現，酒精濃度也通常較高，適合搭配多種食物',
      '阿爾薩斯與德國Riesling的風格差異主要來自使用不同的葡萄品系，而非甜度或釀造風格選擇'
    ],
    correctIndex: 2,
    explanation: '阿爾薩斯Riesling多半採不甜型（dry）釀造，酒精濃度通常高於德國傳統風格，且因高酸度與不甜特性而適合搭配多種食物，與德國常見的甜型印象形成對比，是常見的產區風格比較知識點。'
  },
  {
    id: 'lo3-rie-017',
    lo: 3,
    sourceType: 'wset-spec-supplement',
    sourceId: 'riesling',
    question: '澳洲Clare Valley與Eden Valley的Riesling，代表性風格特徵為何？',
    options: [
      '多半為甜型風格，酸度普遍偏低，與德國傳統甜型Riesling風格相近',
      '不甜型、高酸度，常帶有明顯的萊姆（lime）與礦石調性',
      '該產區的Riesling法規要求混調一定比例的Chardonnay',
      '該產區以經橡木桶長期陳年的濃郁奶油風格Riesling聞名'
    ],
    correctIndex: 1,
    explanation: 'Clare Valley與Eden Valley是澳洲代表性的Riesling產區，風格以不甜型、高酸度、明顯的萊姆與礦石調性著稱，是新世界Riesling的重要代表風格之一，與德國傳統甜型印象不同。'
  },
  {
    id: 'lo3-rie-018',
    lo: 3,
    sourceType: 'wset-spec-supplement',
    sourceId: 'riesling',
    question: '為什麼Riesling常被視為釀造貴腐甜酒／冰酒（Icewine）的經典品種選擇之一？',
    options: [
      '因為Riesling的果皮特別厚，能承受更長時間的低溫冷凍過程',
      '因為法規明文規定冰酒僅能使用Riesling這個單一品種釀造',
      '因為Riesling的天然糖分濃度普遍遠高於其他白葡萄品種，較容易達到冰酒門檻',
      '其天生的高酸度能在高糖分濃縮的甜型酒款中，平衡甜膩感、維持風味結構的清爽度'
    ],
    correctIndex: 3,
    explanation: 'Riesling天生的高酸度是其適合釀造甜型酒款的關鍵原因——高糖分濃縮後仍能靠高酸度平衡甜膩感、維持風味結構的清爽平衡，而非因為果皮厚度或天然糖分濃度特別突出。'
  },
  {
    id: 'lo3-rie-019',
    lo: 3,
    sourceType: 'wset-spec-supplement',
    sourceId: 'riesling',
    question: '德國摩塞爾（Mosel）產區以陡峭的板岩（slate）坡地種植Riesling聞名，這種地形土壤組合帶來的主要優勢為何？',
    options: [
      '陡峭朝陽坡面能增加日照接收角度，板岩則有助於白天蓄熱、夜間緩慢釋放，彌補當地氣候涼爽的限制',
      '板岩土壤能直接釋放大量礦物質進入果實內部深層，是Riesling礦石風味的主要化學來源',
      '陡峭地形的主要考量是為了方便大型機械採收作業，藉此提高整體採收效率',
      '板岩土壤的排水性在當地土壤類型中相對較差，有助於保留額外水分'
    ],
    correctIndex: 0,
    explanation: '摩塞爾陡峭朝陽坡面能增加日照接收角度，板岩則具備白天蓄熱、夜間緩慢釋放的特性，兩者共同彌補當地緯度偏高帶來的氣候涼爽限制，是官方規格中選址因素（坡向、土壤蓄熱）的實際應用案例。'
  },
  {
    id: 'lo3-pgg-001',
    lo: 3,
    sourceType: 'data-object',
    sourceId: 'pinot-gris',
    question: 'Pinot Grigio與Pinot Gris這兩個稱呼所指的是什麼關係？',
    options: [
      '長期地理隔離下各自演化的近緣品種，基因已有明顯差異',
      '義大利種的是黑葡萄，法國種的是白葡萄',
      '同一品種，因產地工法不同呈現兩種風格',
      '兩者是親子關係，一個是另一個的變種'
    ],
    correctIndex: 2,
    explanation: '官方規格明確指出這是同一品種因產地與工法呈現兩種面貌：義大利Pinot Grigio清爽中性，阿爾薩斯Pinot Gris則酒體飽滿油脂感強烈。'
  },
  {
    id: 'lo3-pgg-002',
    lo: 3,
    sourceType: 'data-object',
    sourceId: 'pinot-gris',
    question: '灰皮諾（Pinot Gris）這個品種名稱的由來為何？',
    options: [
      '是黑皮諾的基因突變種，果皮呈灰粉色因而得名',
      '因為它多半在陰天多雲的天氣下採收',
      '因為它是刻意雜交培育出的新品種',
      '因為它的釀酒容器多半為灰色橡木桶'
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
      '清爽中性、早飲易感的簡單風格特徵',
      '酒體飽滿、油脂感強烈，被視為貴族品種',
      '完全被市場淘汰、逐漸停止種植生產',
      '只被專門用於釀造氣泡酒的基酒品種'
    ],
    correctIndex: 1,
    explanation: 'history記載灰皮諾19世紀傳入阿爾薩斯後發展出酒體飽滿、油脂感強烈的風格，長期被認為是阿爾薩斯貴族品種之一。'
  },
  {
    id: 'lo3-pgg-004',
    lo: 3,
    sourceType: 'data-object',
    sourceId: 'pinot-gris',
    question: '20世紀末哪個產區以清爽中性風格的Pinot Grigio席捲國際市場？',
    options: [
      '德國萊茵高（Rheingau）地區',
      '義大利東北部（Friuli、Veneto）',
      '澳洲巴羅莎谷（Barossa）地區',
      '美國納帕谷（Napa Valley）地區'
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
      '兩者風格差異主要來自採收時的天氣狀況，與刻意的釀造選擇無關',
      '義式Grigio晚摘飽滿；阿式Gris早摘保酸求清爽',
      '兩者風味差異源自不同的基因表現，義式版本為天生低酸的突變品系',
      '義式Grigio早摘保酸求清爽；阿式Gris晚摘飽滿帶殘糖'
    ],
    correctIndex: 3,
    explanation: '官方規格明確說明差異來自產地與釀造哲學而非基因，並詳細對比兩種風格的釀造選項差異：義大利式（Grigio）早摘保酸、不鏽鋼槽發酵，追求清爽中性；阿爾薩斯式（Gris）晚摘、酒體飽滿甚至微帶殘糖。'
  },
  {
    id: 'lo3-pgg-006',
    lo: 3,
    sourceType: 'data-object',
    sourceId: 'pinot-gris',
    question: '選購Pinot Grigio/Gris類型酒款時，應以什麼作為判斷風格的依據？',
    options: [
      '主要依賴酒精濃度數字的高低判斷',
      '主要依賴瓶身與酒標顏色來判斷',
      '酒標上的語言標示（Grigio或Gris）',
      '主要依賴售價的高低來判斷風格'
    ],
    correctIndex: 2,
    explanation: '官方規格強調選購時務必以酒標上的語言（義大利文標示Grigio或法文標示Gris）判斷預期風格，而非假設兩者風味相近。'
  },
  {
    id: 'lo3-pgg-007',
    lo: 3,
    sourceType: 'data-object',
    sourceId: 'pinot-gris',
    question: '德國對於灰皮諾這個品種的稱呼為何？',
    options: [
      'Grauburgunder',
      'Weissburgunder',
      'Spätburgunder',
      'Silvaner（希爾瓦那）'
    ],
    correctIndex: 0,
    explanation: '官方規格提及德國稱灰皮諾為Grauburgunder（"grau"即德文的「灰色」）。'
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
    explanation: '代表產區涵蓋Alsace、Alto Adige、Collio等產區，Mosel是Riesling的代表產區，不在Pinot Gris清單中。'
  },
  {
    id: 'lo3-pgg-009',
    lo: 3,
    sourceType: 'data-object',
    sourceId: 'pinot-gris',
    question: 'Pinot Gris的香氣輪列出哪些核心香氣？',
    options: [
      '醋栗、青草、百香果、燧石',
      '萊姆、青蘋果、板岩礦石感、陳年汽油感',
      '梨子、白桃、蜂蜜、杏仁',
      '黑莓、黑胡椒、皮革、菸草'
    ],
    correctIndex: 2,
    explanation: '香氣輪列出Pear、White Peach、Honey、Almond，這組香氣組合橫跨清爽果香與較濃郁的蜂蜜杏仁調性，呼應其風格光譜的兩極特性。'
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
    explanation: '建議侍酒溫度為8–10°C。'
  },
  {
    id: 'lo3-pgg-011',
    lo: 3,
    sourceType: 'data-object',
    sourceId: 'pinot-gris',
    question: 'Pinot Gris適合搭配下列哪些食物類型？',
    options: [
      '低脂、海鮮、開胃菜、亞洲料理',
      '紅肉、野味與燒烤重口味料理',
      '甜點、水果與冰品類料理',
      '醃肉、開胃菜與煙燻食材'
    ],
    correctIndex: 0,
    explanation: '建議搭餐項目包括Light Fat、Seafood、Appetizer、Asian Cuisine，適合搭配清淡海鮮類料理。'
  },
  {
    id: 'lo3-pgg-012',
    lo: 3,
    sourceType: 'data-object',
    sourceId: 'pinot-gris',
    question: 'Pinot Gris與Pinot Grigio雖是同一品種，為何在陳年潛力上常給人截然不同的印象？',
    options: [
      '義大利Pinot Grigio多走清爽早飲風格；阿爾薩斯晚摘/貴腐甜型Pinot Gris則可具備長期陳年實力',
      '因為兩地採用的克隆品系（clone）不同，義大利選育的克隆天生早熟早飲、缺乏陳年潛力',
      '純粹因為義大利與法國消費者的口味偏好不同，與實際釀造工法無關',
      '義大利Pinot Grigio才具備長期陳年實力；阿爾薩斯版本多走清淡早飲路線'
    ],
    correctIndex: 0,
    explanation: '義大利Pinot Grigio多以不鏽鋼槽釀造，走清爽中性、及早飲用的風格；阿爾薩斯的Pinot Gris則可能透過晚摘（Vendange Tardive）或貴腐（Sélection de Grains Nobles）工法，發展出濃縮度與陳年實力兼具的甜型或半甜型酒款，兩者陳年潛力的差異源自產區釀造哲學不同，而非品種本身固定特性。'
  },
  {
    id: 'lo3-pgg-013',
    lo: 3,
    sourceType: 'data-object',
    sourceId: 'pinot-gris',
    question: 'Pinot Gris/Grigio的酸度表現與Sauvignon Blanc相比如何？',
    options: [
      '兩者酸度表現完全相同，皆屬高酸品種',
      '明顯低於Sauvignon Blanc，走中性、易飲路線而非高酸鮮明風格',
      'Pinot Gris/Grigio的酸度更高更鮮明',
      'Pinot Gris/Grigio幾乎不具備任何可察覺的酸度'
    ],
    correctIndex: 1,
    explanation: 'Pinot Gris/Grigio的酸度明顯低於Sauvignon Blanc，走中性易飲路線，這也是兩者風格定位上的關鍵差異之一。'
  },
  {
    id: 'lo3-pgg-014',
    lo: 3,
    sourceType: 'data-object',
    sourceId: 'pinot-gris',
    question: 'Pinot Gris的原產國標示為何，這點與其「灰皮諾是黑皮諾的基因突變種」的身世有何關聯？',
    options: [
      '原產義大利，與法國品種黑皮諾無關',
      '原產法國，因其突變自法國原生的黑皮諾品種',
      '原產德國，與其命名Grauburgunder相符',
      '原產匈牙利，因19世紀由此傳入阿爾薩斯'
    ],
    correctIndex: 1,
    explanation: '原生國標示為France(法國)，與其作為黑皮諾基因突變種的起源相符，儘管後來在阿爾薩斯、義大利、匈牙利等地都有重要發展歷史。'
  },
  {
    id: 'lo3-pgg-015',
    lo: 3,
    sourceType: 'wset-spec-supplement',
    sourceId: 'pinot-gris',
    question: '美國奧勒岡州Willamette Valley的Pinot Gris，其風格定位相對於阿爾薩斯與義大利兩種風格光譜，一般被認為如何？',
    options: [
      '介於阿爾薩斯的濃郁圓潤風格與義大利的清爽中性風格之間，兼具一定果香濃郁度與清爽酸度',
      '完全比照義大利清爽風格複製，與阿爾薩斯風格光譜較無關聯',
      'Willamette Valley法規禁止種植Pinot Gris，該產區以Pinot Noir聞名',
      '完全比照阿爾薩斯晚摘甜型風格複製，市面上多為甜型酒款'
    ],
    correctIndex: 0,
    explanation: 'Willamette Valley的Pinot Gris風格常被認為介於阿爾薩斯的濃郁圓潤與義大利的清爽中性之間，兼具一定的果香濃郁度與清爽酸度，是新世界Pinot Gris的重要代表產區之一。'
  },
  {
    id: 'lo3-pgg-016',
    lo: 3,
    sourceType: 'wset-spec-supplement',
    sourceId: 'pinot-gris',
    question: '義大利Friuli（弗留利）產區有一種稱為「Ramato」的Pinot Grigio風格，其特色為何？',
    options: [
      'Ramato是指添加天然色素調整酒液顏色的釀造添加物，與果皮接觸較無關',
      'Ramato專指經過至少十年以上長期瓶陳的老年份Pinot Grigio酒款',
      '讓果汁與灰皮諾略帶粉紅色的果皮短暫接觸，因此酒液呈現淡淡的銅粉色澤，帶有更多單寧結構與風味複雜度',
      'Ramato是指跳過發酵階段、直接以蒸餾方式製成的Pinot Grigio烈酒款'
    ],
    correctIndex: 2,
    explanation: 'Ramato（義大利文意為「銅色」）是Friuli產區的傳統風格，讓果汁與灰皮諾略帶粉紅色的果皮短暫接觸，使酒液呈現淡淡的銅粉色澤，同時帶來更多單寧結構與風味複雜度，與一般清爽中性的Pinot Grigio風格不同。'
  },
  {
    id: 'lo3-pgg-017',
    lo: 3,
    sourceType: 'wset-spec-supplement',
    sourceId: 'pinot-gris',
    question: '德國對灰皮諾除了「Grauburgunder」這個現代常用稱呼外，另一個較傳統的稱呼「Ruländer」，通常與什麼風格印象有關？',
    options: [
      'Ruländer較常與稍具甜感、酒體飽滿的傳統風格連結，Grauburgunder則較常用於現代不甜型風格',
      '兩個稱呼指的是兩個親緣關係相近但基因上獨立的葡萄品種，並非同一品種的不同稱呼',
      'Ruländer專指經過氣泡酒傳統二次發酵工法特別釀造製成的灰皮諾氣泡酒款',
      'Grauburgunder是德國法規近年明文禁止使用的舊稱，目前僅Ruländer仍為合法標示'
    ],
    correctIndex: 0,
    explanation: '德國市場上，「Ruländer」是較傳統的稱呼，常與稍具甜感、酒體較飽滿的傳統風格連結；「Grauburgunder」則是較現代的稱呼，較常用於不甜型風格酒款，兩者為同一品種的不同稱呼慣例，反映的是風格印象差異而非品種差異。'
  },
  {
    id: 'lo3-pgg-018',
    lo: 3,
    sourceType: 'wset-spec-supplement',
    sourceId: 'pinot-gris',
    question: '白皮諾（Pinot Blanc）與灰皮諾（Pinot Gris）同屬Pinot家族的基因突變近親，兩者在風格辨識上的關鍵差異為何？',
    options: [
      '白皮諾是由灰皮諾經人工雜交培育而成的新品種，兩者並非源自同一基因突變起源',
      '兩者主要差異在於白皮諾的酒精濃度普遍遠高於灰皮諾，是兩者最主要的辨識依據',
      '白皮諾主要用於氣泡酒基酒，灰皮諾的法規完全禁止用於氣泡酒釀造',
      '白皮諾風味較為中性淡雅、酸度通常較高，灰皮諾則通常酒體更飽滿、風味更濃郁具辨識度'
    ],
    correctIndex: 3,
    explanation: '白皮諾（Pinot Blanc）與灰皮諾（Pinot Gris）皆為黑皮諾的基因突變品種，白皮諾風味通常較中性淡雅、酸度較高，灰皮諾則通常酒體更飽滿、風味更濃郁具辨識度，兩者風格辨識度不同，並非以酒精濃度作為主要區分依據。'
  },
  {
    id: 'lo3-cs-001',
    lo: 3,
    sourceType: 'data-object',
    sourceId: 'cabernet-sauvignon',
    question: 'Cabernet Sauvignon的風格核心特徵為何？',
    options: [
      '薄皮早熟低單寧品種，多用於粉紅酒',
      '專門用於甜酒釀造，天然酸度極低',
      '僅適合單一冷涼氣候，無法適應溫暖產區',
      '厚實高單寧的晚熟品種，具極佳陳年潛力'
    ],
    correctIndex: 3,
    explanation: '官方規格明確描述為厚實高單寧的晚熟品種，黑醋栗與雪松骨架鮮明，適應多元氣候並具極佳陳年潛力。'
  },
  {
    id: 'lo3-cs-002',
    lo: 3,
    sourceType: 'data-object',
    sourceId: 'cabernet-sauvignon',
    question: 'Cabernet Sauvignon的起源與DNA鑑定結果為何？',
    options: [
      '是古羅馬時期就已存在的純種古老品種',
      '波爾多18世紀的自然雜交，親本為卡本內弗朗與白蘇維濃',
      '起源於義大利，直到2000年代才傳入波爾多',
      '親本經DNA鑑定為黑皮諾與已幾近絕跡的Gouais Blanc'
    ],
    correctIndex: 1,
    explanation: 'history記載1996年UC Davis團隊證實親本為卡本內弗朗與白蘇維濃（一紅一白的意外配對），是波爾多西部18世紀的自然雜交品種。'
  },
  {
    id: 'lo3-cs-003',
    lo: 3,
    sourceType: 'data-object',
    sourceId: 'cabernet-sauvignon',
    question: '厚實果皮與晚熟特性，使Cabernet Sauvignon特別適應波爾多左岸的什麼地理條件？',
    options: [
      '礫石台地，排水良好且能蓄熱釋熱助熟成',
      '肥沃黏土平原，水分十分充足供應',
      '偏好陰涼潮濕的森林邊緣地帶種植',
      '偏好石灰岩台地，因排水較差、能保留更多水分供應根系'
    ],
    correctIndex: 0,
    explanation: '礫石台地排水良好且具蓄熱效果，白天蓄熱、夜間釋熱，有助於晚熟品種完成成熟。'
  },
  {
    id: 'lo3-cs-004',
    lo: 3,
    sourceType: 'data-object',
    sourceId: 'cabernet-sauvignon',
    question: 'Cabernet Sauvignon與其父本卡本內弗朗（Cabernet Franc）在風格上的關鍵區辨為何？',
    options: [
      '卡本內蘇維濃單寧緊實黑醋栗主導；卡本內弗朗較淺青椒柔和',
      '卡本內弗朗單寧更緊實，卡本內蘇維濃較為柔和',
      '卡本內弗朗單寧比卡本內蘇維濃更緊實厚重',
      '卡本內蘇維濃顏色較淺，卡本內弗朗顏色較深'
    ],
    correctIndex: 0,
    explanation: '官方規格明確對比兩者：卡本內蘇維濃單寧最緊實、晚熟、黑醋栗與石墨氣息主導；卡本內弗朗顏色較淺、青椒與覆盆莓氣息更明顯、單寧較柔和。'
  },
  {
    id: 'lo3-cs-005',
    lo: 3,
    sourceType: 'data-object',
    sourceId: 'cabernet-sauvignon',
    question: '在與Merlot的波爾多混調中，Cabernet Sauvignon通常扮演的角色為何？',
    options: [
      '提供柔和果香與易飲度，骨架交由梅洛負責',
      '主要用於降低整體混調的酒精濃度，對單寧或果香無實質貢獻',
      '提供骨架與陳年潛力，單寧緊實而非果香奔放',
      '主要作為調色劑使用，對風味結構影響不大'
    ],
    correctIndex: 2,
    explanation: '官方規格指出混調時卡本內蘇維濃通常負責提供骨架與陳年潛力，梅洛則負責果香與易飲度，因卡本內蘇維濃單寧緊實、晚熟。'
  },
  {
    id: 'lo3-cs-006',
    lo: 3,
    sourceType: 'data-object',
    sourceId: 'cabernet-sauvignon',
    question: 'Cabernet Sauvignon的香氣輪列出哪些核心香氣？',
    options: [
      '紅李、黑櫻桃、巧克力、月桂葉',
      '梨子、白桃、蜂蜜、杏仁',
      '草莓乾、皮革、菸草、香草',
      '黑醋栗、雪松、石墨、薄荷'
    ],
    correctIndex: 3,
    explanation: '香氣輪列出Blackcurrant、Cedar、Graphite、Mint；其餘選項為其他品種的特徵香氣。'
  },
  {
    id: 'lo3-cs-007',
    lo: 3,
    sourceType: 'data-object',
    sourceId: 'cabernet-sauvignon',
    question: '下列哪一個產區不屬於Cabernet Sauvignon的代表性種植區域？',
    options: [
      'Napa Valley（納帕谷）',
      'Mosel（摩塞爾）',
      'Pauillac（波雅克）',
      'Margaret River（瑪格麗特河）'
    ],
    correctIndex: 1,
    explanation: '代表產區涵蓋Pauillac、Napa Valley、Margaret River等產區，Mosel是Riesling的代表產區。'
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
    explanation: '建議侍酒溫度為16–18°C。'
  },
  {
    id: 'lo3-cs-009',
    lo: 3,
    sourceType: 'data-object',
    sourceId: 'cabernet-sauvignon',
    question: 'Cabernet Sauvignon適合搭配下列哪些食物類型？',
    options: [
      '高脂、紅肉、硬質起司、燒烤',
      '海鮮、開胃菜、亞洲料理、清淡料理',
      '甜點與水果',
      '醃肉與開胃菜'
    ],
    correctIndex: 0,
    explanation: '建議搭餐項目包括High Fat、Red Meat、Hard Cheese、Grilled。'
  },
  {
    id: 'lo3-cs-010',
    lo: 3,
    sourceType: 'data-object',
    sourceId: 'cabernet-sauvignon',
    question: 'Cabernet Sauvignon的單寧為何以緊實厚重聞名？',
    options: [
      '果皮極薄，單寧主要來自橡木桶陳年',
      '果皮厚實且晚熟，能萃取出大量單寧物質',
      '單寧含量主要取決於發酵溫度高低，與果皮厚度較無關',
      '單寧雖含量高，主要來自葡萄籽而非果皮'
    ],
    correctIndex: 1,
    explanation: 'Cabernet Sauvignon果皮厚實、晚熟，帶皮發酵能萃取出大量單寧與色素物質，是其單寧緊實厚重風格的品種基礎。'
  },
  {
    id: 'lo3-cs-011',
    lo: 3,
    sourceType: 'data-object',
    sourceId: 'cabernet-sauvignon',
    question: 'Cabernet Sauvignon與Merlot相比，一般而言哪一個陳年潛力較高，原因為何？',
    options: [
      'Cabernet Sauvignon通常較高，因其單寧與骨架結構更為緊實厚重',
      '兩者陳年潛力的差異主要來自產區，而非品種本身',
      'Merlot通常被認為陳年潛力更高',
      '陳年潛力與單寧含量一般被認為沒有關聯'
    ],
    correctIndex: 0,
    explanation: 'Cabernet Sauvignon單寧與骨架結構通常較Merlot更緊實厚重，因此一般教學上認為其陳年潛力較高，這是品種傾向的一般化描述，並非否定個別頂級酒款的例外表現。'
  },
  {
    id: 'lo3-cs-012',
    lo: 3,
    sourceType: 'data-object',
    sourceId: 'cabernet-sauvignon',
    question: 'Cabernet Sauvignon目前在全球葡萄酒版圖中的種植地位為何？',
    options: [
      '種植面積持續萎縮，僅剩波爾多小範圍種植',
      '是全球種植面積最廣的頂級紅酒品種之一',
      '主要在法國種植，較少成功移植海外產區',
      '種植面積雖廣，但國際品質評價普遍偏低'
    ],
    correctIndex: 1,
    explanation: 'history記載19世紀隨波爾多國際聲望擴散至新世界，如今已是全球種植面積最廣的頂級紅酒品種之一，從納帕谷、庫納瓦拉到智利馬波河谷都有代表性演繹。'
  },
  {
    id: 'lo3-cs-013',
    lo: 3,
    sourceType: 'data-object',
    sourceId: 'cabernet-sauvignon',
    question: 'Cabernet Sauvignon的果皮顏色分類與原產國為何？',
    options: [
      '黑皮，原產法國',
      '白皮，原產法國',
      '黑皮，原產義大利',
      '灰皮，原產德國'
    ],
    correctIndex: 0,
    explanation: '果皮顏色為紅葡萄（黑皮），原生國為法國。'
  },
  {
    id: 'lo3-cs-014',
    lo: 3,
    sourceType: 'data-object',
    sourceId: 'cabernet-sauvignon',
    question: 'Cabernet Sauvignon的風味核心為何較少帶有明顯花香調性？',
    options: [
      '花香調性是Cabernet Sauvignon全品種中最濃郁的特徵',
      '風味核心以黑色果香、雪松、石墨等厚重調性為主，花香並非其重點特徵',
      '花香調性主要來自橡木桶陳年賦予，與品種本身的香氣物質較無關',
      '單寧含量越高，花香調性也會越濃郁，兩者呈正相關'
    ],
    correctIndex: 1,
    explanation: 'Cabernet Sauvignon的香氣輪以黑醋栗、雪松、石墨、薄荷等厚重調性為主，花香調性並非其風味重點。'
  },
  {
    id: 'lo3-cs-015',
    lo: 3,
    sourceType: 'wset-spec-supplement',
    sourceId: 'cabernet-sauvignon',
    question: '波爾多左岸1855年分級制度（1855 Classification）主要是針對什麼進行評等？',
    options: [
      '依當時市場交易價格，將左岸酒莊評定為Premier Cru至Cinquième Cru等五個等級',
      '依據葡萄園土壤的排水性與蓄熱能力優劣程度，將左岸各產區劃分為不同等級',
      '依當時每位釀酒師的個人聲望、從業資歷與家族傳承背景，將左岸酒莊評定為五個等級',
      '依酒莊建築物的歷史年代、整體規模大小與外觀氣派程度，將左岸酒莊評定為五個等級'
    ],
    correctIndex: 0,
    explanation: '1855年分級制度是依當時葡萄酒的市場交易價格，將梅多克（Médoc）等左岸酒莊評定為Premier Cru（一級）至Cinquième Cru（五級）共五個等級，是波爾多左岸最具代表性的歷史分級制度，與Cabernet Sauvignon為主的左岸酒款密切相關。'
  },
  {
    id: 'lo3-cs-016',
    lo: 3,
    sourceType: 'wset-spec-supplement',
    sourceId: 'cabernet-sauvignon',
    question: '澳洲Coonawarra（庫納瓦拉）產區以Cabernet Sauvignon聞名，當地著名的紅色土壤「Terra Rossa」對種植有何助益？',
    options: [
      'Terra Rossa是一種完全阻絕水分滲透的黏土，能讓葡萄藤持續維持高含水量',
      'Terra Rossa土壤本身呈鹼性極強，能大幅提升果實的天然甜度',
      '表層紅色石灰質黏土排水良好，下方石灰岩層則有助於根系深入吸收水分養分',
      'Terra Rossa土壤含有豐富有機質，主要功能是加速葡萄藤的生長速度'
    ],
    correctIndex: 2,
    explanation: 'Coonawarra著名的Terra Rossa紅土，表層排水良好，下方石灰岩層有助於根系深入發展並吸收穩定的水分養分，是當地Cabernet Sauvignon品質優異的重要風土因素之一。'
  },
  {
    id: 'lo3-cs-017',
    lo: 3,
    sourceType: 'wset-spec-supplement',
    sourceId: 'cabernet-sauvignon',
    question: 'Cabernet Sauvignon在果實未完全成熟或種植於較涼爽氣候時，有時會出現什麼香氣特徵？',
    options: [
      '類似青椒的草本調性，來自甲氧基吡𠯤這類化合物，隨成熟度提高而減少',
      '類似荔枝的濃郁花果調性，來自品種天生的萜烯類化合物',
      '類似奶油的濃郁調性，來自發酵過程中產生的雙乙醯物質',
      '類似汽油的礦石調性，來自品種陳年後產生的特定芳香物質'
    ],
    correctIndex: 0,
    explanation: 'Cabernet Sauvignon與白蘇維濃同樣含有甲氧基吡𠯤這類化合物，在果實未完全成熟或種植於較涼爽氣候時，可能出現類似青椒的草本調性，隨果實成熟度提高，此調性通常會逐漸減少。'
  },
  {
    id: 'lo3-cs-018',
    lo: 3,
    sourceType: 'wset-spec-supplement',
    sourceId: 'cabernet-sauvignon',
    question: '義大利托斯卡尼地區，Cabernet Sauvignon等國際品種被引入並與Sangiovese混調，發展出被稱為「Super Tuscan」的酒款風格，這個現象反映了什麼？',
    options: [
      '義大利官方法規強制要求所有托斯卡尼酒莊必須種植一定比例的Cabernet Sauvignon',
      'Super Tuscan專指不使用任何義大利本地品種、僅以進口國際品種釀造的酒款類別',
      '這個現象主要反映歐盟法規對「托斯卡尼」地理標示的嚴格保護，與品種選擇較無直接關聯',
      '部分酒莊為追求品質與市場定位，選擇跳脫當地傳統法規限制，改用國際品種混調，最初因此被標示為較低階的餐酒等級'
    ],
    correctIndex: 3,
    explanation: '部分托斯卡尼酒莊為追求品質與國際市場定位，選擇使用Cabernet Sauvignon等國際品種與本地Sangiovese混調，因不符合當地傳統法規要求，最初只能標示為較低階的餐酒等級，後續才逐漸發展出專屬分級，是義大利葡萄酒近代史上的重要現象。'
  },
  {
    id: 'lo3-cs-019',
    lo: 3,
    sourceType: 'wset-spec-supplement',
    sourceId: 'cabernet-sauvignon',
    question: '由於Cabernet Sauvignon單寧結構厚重，部分酒莊會採用「延長泡皮（Extended Maceration）」工序，這項工序的主要目的為何？',
    options: [
      '延長泡皮主要用於降低最終酒款的酒精濃度，與單寧結構較無直接關聯',
      '在酒精發酵完成後持續泡皮一段時間，讓單寧進一步軟化、口感更為圓潤細緻',
      '延長泡皮是裝瓶前的最後一道過濾工序，主要用於移除酒液中殘留的死酵母渣',
      '延長泡皮主要目的是加速酒精發酵反應速度，縮短整體釀造週期'
    ],
    correctIndex: 1,
    explanation: '延長泡皮是在酒精發酵完成後，繼續讓酒液與果皮接觸一段時間，讓原本較粗澀的單寧透過持續萃取與聚合作用逐漸軟化，使成酒口感更為圓潤細緻，是處理Cabernet Sauvignon這類厚重單寧品種常見的釀造手法。'
  },
  {
    id: 'lo3-mer-001',
    lo: 3,
    sourceType: 'data-object',
    sourceId: 'merlot',
    question: 'Merlot的風格核心特徵為何？',
    options: [
      '晚熟且單寧極度緊澀，需長期陳年才能飲用',
      '是白葡萄品種，主要用於釀造氣泡酒基酒',
      '早熟且單寧圓潤，果香飽滿豐腴，常作混調搭檔',
      '天然酸度極高，是紅酒品種中酸度最鮮明的'
    ],
    correctIndex: 2,
    explanation: '官方規格描述為早熟且單寧圓潤，果香飽滿豐腴，常作為卡本內蘇維濃的混調搭檔，亦可獨立展現絲滑質地。'
  },
  {
    id: 'lo3-mer-002',
    lo: 3,
    sourceType: 'data-object',
    sourceId: 'merlot',
    question: 'Merlot名稱的由來為何？',
    options: [
      '源自法語merle（烏鶇），因鳥喜啄食而得名',
      '源自某位釀酒師姓氏的傳承而來',
      '源自波爾多某個知名城堡的名稱',
      '源自拉丁語，意指「陽光」之意'
    ],
    correctIndex: 0,
    explanation: 'history記載Merlot名稱源自法語merle（烏鶇），因果實色澤或烏鶇喜愛啄食而得名，起源於波爾多右岸，18世紀文獻已有記載。'
  },
  {
    id: 'lo3-mer-003',
    lo: 3,
    sourceType: 'data-object',
    sourceId: 'merlot',
    question: '相較於Cabernet Sauvignon，Merlot的發芽與成熟時序、以及對哪種土壤條件的適應力更強？',
    options: [
      '發芽與成熟皆更晚，適應力較弱，僅能小範圍種植',
      '發芽與成熟皆更早，對黏土與石灰岩台地的適應力更強',
      '發芽較早但成熟較晚，對排水不良土壤適應力最強',
      '較適合種植於礫石台地，對黏土適應力有限'
    ],
    correctIndex: 1,
    explanation: 'Merlot發芽與成熟皆更早，對黏土與石灰岩台地的適應力更強，這是右岸聖愛美濃、玻美侯改以梅洛為主力的關鍵風土因素。'
  },
  {
    id: 'lo3-mer-004',
    lo: 3,
    sourceType: 'data-object',
    sourceId: 'merlot',
    question: '20世紀末Merlot種植面積一度超越Cabernet Sauvignon，成為全球種植最廣的紅酒品種之一，主要原因為何？',
    options: [
      '國際市場對「順口易飲」紅酒的需求上升',
      '法規強制規定各產區必須優先種植Merlot',
      'Cabernet Sauvignon因病蟲害大量絕種',
      'Merlot的售價遠低於其他品種，帶動大量種植'
    ],
    correctIndex: 0,
    explanation: '20世紀末隨國際市場對「順口易飲」紅酒需求上升，梅洛種植面積一度超越卡本內蘇維濃。'
  },
  {
    id: 'lo3-mer-005',
    lo: 3,
    sourceType: 'data-object',
    sourceId: 'merlot',
    question: 'Merlot與Cabernet Sauvignon作為波爾多混調經典搭檔，兩者風格關係的正確描述為何？',
    options: [
      '兩者風格幾乎相同，混調並沒有太大實質意義',
      '梅洛的單寧比卡本內蘇維濃更緊實厚重',
      '卡本內蘇維濃的酒體比梅洛更豐腴圓潤',
      '梅洛單寧圓潤早熟；卡本內蘇維濃單寧緊實晚熟骨架硬'
    ],
    correctIndex: 3,
    explanation: '梅洛單寧圓潤早熟、紅李與巧克力調性、酒體較豐腴；卡本內蘇維濃單寧緊實晚熟、黑醋栗與雪松調性、骨架更堅硬，兩者是波爾多混調的經典搭檔但風格互補而非相近。'
  },
  {
    id: 'lo3-mer-006',
    lo: 3,
    sourceType: 'data-object',
    sourceId: 'merlot',
    question: 'Merlot與卡本內弗朗（Cabernet Franc）相比，風格上的關鍵差異為何？',
    options: [
      '梅洛與卡本內弗朗的差異主要來自橡木桶處理方式，而非品種本身特性',
      '卡本內弗朗顏色比梅洛顏色更深沉',
      '梅洛帶青椒調性，卡本內弗朗則以甜熟果香為主',
      '梅洛顏色更深果香甜熟；卡本內弗朗帶青椒草本調性'
    ],
    correctIndex: 3,
    explanation: '與卡本內弗朗相比，梅洛顏色更深、果香更甜熟，卡本內弗朗則帶明顯青椒與覆盆莓的清爽草本調性。'
  },
  {
    id: 'lo3-mer-007',
    lo: 3,
    sourceType: 'data-object',
    sourceId: 'merlot',
    question: 'Merlot的香氣輪列出哪些核心香氣？',
    options: [
      '紅李、黑櫻桃、巧克力、月桂葉',
      '黑醋栗、雪松、石墨、薄荷',
      '醋栗、青草、百香果、燧石',
      '玫瑰、焦油、櫻桃乾、甘草'
    ],
    correctIndex: 0,
    explanation: '香氣輪列出Red Plum、Black Cherry、Chocolate、Bay Leaf。'
  },
  {
    id: 'lo3-mer-008',
    lo: 3,
    sourceType: 'data-object',
    sourceId: 'merlot',
    question: '下列哪一個產區不屬於Merlot的代表性種植區域？',
    options: [
      'Saint-Émilion（聖愛美濃）',
      'Barolo（巴羅洛）',
      'Pomerol（玻美侯）',
      'Columbia Valley（哥倫比亞河谷）'
    ],
    correctIndex: 1,
    explanation: '代表產區涵蓋Saint-Émilion、Pomerol、Columbia Valley等產區，Barolo是義大利以Nebbiolo聞名的產區。'
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
      '8–10°C',
      '16–18°C'
    ],
    correctIndex: 3,
    explanation: '建議侍酒溫度為16–18°C。'
  },
  {
    id: 'lo3-mer-010',
    lo: 3,
    sourceType: 'data-object',
    sourceId: 'merlot',
    question: 'Merlot適合搭配下列哪些食物類型？',
    options: [
      '海鮮與甲殼類等清淡料理',
      '甜點與水果等偏甜食材',
      '中脂、紅肉、鮮味、烤物',
      '低脂開胃菜與清淡小點'
    ],
    correctIndex: 2,
    explanation: '建議搭餐項目包括Moderate Fat、Red Meat、Umami、Roasted。'
  },
  {
    id: 'lo3-mer-011',
    lo: 3,
    sourceType: 'data-object',
    sourceId: 'merlot',
    question: 'Merlot的單寧口感與Cabernet Sauvignon相比，通常有何差異？',
    options: [
      '單寧口感的差異主要來自採收年份，與品種特性關聯較低',
      'Merlot單寧通常較圓潤柔和，整體強度也低於Cabernet Sauvignon',
      'Merlot單寧通常被認為比Cabernet Sauvignon更為緊澀',
      '單寧口感與品種特性一般被認為沒有直接關聯'
    ],
    correctIndex: 1,
    explanation: 'Merlot果皮相對較薄且早熟，單寧萃取通常較Cabernet Sauvignon圓潤柔和，這也是其常被用作混調搭檔以柔化Cabernet Sauvignon單寧的原因之一。'
  },
  {
    id: 'lo3-mer-012',
    lo: 3,
    sourceType: 'data-object',
    sourceId: 'merlot',
    question: 'Merlot在較溫暖產區（如智利中央山谷）種植時，酒體與酒精濃度通常會呈現什麼樣的變化趨勢？',
    options: [
      '溫暖氣候主要影響單寧成熟度，對酒體與酒精濃度影響有限',
      '溫暖氣候會讓酒體與酒精濃度雙雙下降',
      '酒體與酒精濃度只受橡木桶類型影響，與氣候無關',
      '果實成熟度提高，通常釀出酒體更飽滿、酒精濃度更高的酒款'
    ],
    correctIndex: 3,
    explanation: '這是LO1氣候與葡萄成熟度的基本原理：溫暖氣候提高果實糖度累積，發酵後轉化為更高酒精濃度，並常伴隨更飽滿的酒體，這適用於包含Merlot在內的多數葡萄品種，而非單一品種的固定特性。'
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
      '黑皮，原產法國',
      '灰皮，原產西班牙'
    ],
    correctIndex: 2,
    explanation: '果皮顏色為紅葡萄（黑皮），原生國為法國。'
  },
  {
    id: 'lo3-mer-014',
    lo: 3,
    sourceType: 'data-object',
    sourceId: 'merlot',
    question: 'Merlot為什麼即使單寧總量不算最低，口感卻仍以「圓潤」聞名？',
    options: [
      '因為Merlot果皮極薄，單寧主要來自橡木桶陳年',
      '早熟品種，採收時單寧（尤其種籽單寧）成熟度較高，口感較不苦澀生青',
      '單寧的圓潤與否主要取決於橡木桶類型，與品種較無關',
      '因為Merlot採收時通常刻意留下大量未成熟果實'
    ],
    correctIndex: 1,
    explanation: 'Merlot屬早熟品種，採收時果實（含種籽）通常已達到良好的酚類成熟度，單寧口感較不帶生青苦澀感，這是其「圓潤柔和」風格的關鍵原因，與單寧總量高低是兩個不同的面向。'
  },
  {
    id: 'lo3-mer-015',
    lo: 3,
    sourceType: 'wset-spec-supplement',
    sourceId: 'merlot',
    question: '波爾多右岸聖愛美濃（St-Émilion）產區的經典混調配方，Merlot通常與哪個品種搭配，與左岸的搭檔品種有何不同？',
    options: [
      '通常與希哈（Syrah）搭配裝瓶為主，形成類似南隆河GSM混調配方的品種組合邏輯',
      '通常與卡本內弗朗（Cabernet Franc）搭配，與左岸慣用的Cabernet Sauvignon不同',
      '通常僅以單一品種裝瓶為主要風格，聖愛美濃當地法規明文禁止任何形式的品種混調',
      '通常與格那希（Grenache）搭配裝瓶為主，這是南隆河GSM混調配方邏輯的延伸應用方式'
    ],
    correctIndex: 1,
    explanation: '聖愛美濃的經典配方通常是Merlot搭配卡本內弗朗（Cabernet Franc），與左岸梅多克慣用的Merlot搭配Cabernet Sauvignon不同，是波爾多左右岸混調配方差異的重要知識點。'
  },
  {
    id: 'lo3-mer-016',
    lo: 3,
    sourceType: 'wset-spec-supplement',
    sourceId: 'merlot',
    question: '智利的Merlot在1994年之前，曾與哪個品種長期混淆種植，直到DNA鑑定才釐清？',
    options: [
      'Cabernet Franc，兩者因葉形相近，長期被誤認為同一品種',
      'Petit Verdot，兩者因成熟時間相近，長期被誤認為同一品種',
      'Carménère，兩者外觀相似，長期被誤認為同一品種種植在同一葡萄園中',
      'Malbec，兩者因原產法國西南部，長期被誤認為同一品種'
    ],
    correctIndex: 2,
    explanation: '智利葡萄園過去長期將Carménère誤認為Merlot混種在一起，直到1994年DNA鑑定才確認兩者是不同品種，是智利葡萄酒產業近代重要的品種鑑定事件。'
  },
  {
    id: 'lo3-mer-017',
    lo: 3,
    sourceType: 'wset-spec-supplement',
    sourceId: 'merlot',
    question: '美國華盛頓州（Washington State）是加州之外，另一個以Merlot品質聞名的重要產區，其氣候條件相對加州許多產區有何特點？',
    options: [
      '日照時數長但晝夜溫差大，有助於果實在累積成熟度的同時保留一定酸度',
      '氣候型態與熱帶雨林相近，全年濕度極高、降雨量極大',
      '主要因當地降雨量遠高於加州，需仰賴大量排水設施避免葡萄園淹水',
      '該產區完全仰賴人工溫室栽培，與露天葡萄園種植方式不同'
    ],
    correctIndex: 0,
    explanation: '華盛頓州內陸產區日照時數長、晝夜溫差大，有助於果實在累積糖分與酚類成熟度的同時，仍能保留一定酸度，是當地Merlot與其他紅酒品種品質優異的重要氣候因素。'
  },
  {
    id: 'lo3-mer-018',
    lo: 3,
    sourceType: 'wset-spec-supplement',
    sourceId: 'merlot',
    question: 'Merlot天生屬於較高產（high-yielding）的品種，種植管理上常需要採取什麼措施以確保品質？',
    options: [
      '透過修剪與疏果等產量控制措施，避免產量過高導致果實風味被稀釋',
      '完全停止灌溉，讓葡萄藤處於極度缺水狀態以強迫減產',
      '刻意延遲採收至隔年春天，讓多餘果實自然脫落',
      '大幅增加化學肥料使用量，透過加速生長來間接降低單位產量'
    ],
    correctIndex: 0,
    explanation: 'Merlot天生屬於較高產的品種，若不加以控制容易因產量過高導致果實風味被稀釋，因此種植管理上常需透過修剪、疏果等產量控制措施，確保每株葡萄藤的產量維持在有利品質的範圍內。'
  },
  {
    id: 'lo3-mer-019',
    lo: 3,
    sourceType: 'wset-spec-supplement',
    sourceId: 'merlot',
    question: 'Merlot因發芽時間較早，在種植管理上特別需要留意什麼天氣風險？',
    options: [
      '冰雹風險，因Merlot果串結構相對鬆散，特別容易被冰雹擊碎損傷',
      '乾旱風險，因Merlot根系天生發展深度較其他品種來得淺薄',
      '強風風險，因Merlot植株生長高度普遍較其他品種更為高大',
      '春霜（spring frost）風險，因較早發芽的嫩芽對低溫特別敏感脆弱'
    ],
    correctIndex: 3,
    explanation: 'Merlot發芽時間較早，較早萌發的嫩芽對低溫特別敏感，因此春霜是Merlot種植管理上特別需要留意的天氣風險之一，與其發芽早、成熟也早的品種特性直接相關。'
  },
  {
    id: 'lo3-pn-001',
    lo: 3,
    sourceType: 'data-object',
    sourceId: 'pinot-noir',
    question: 'Pinot Noir的風格核心特徵為何？',
    options: [
      '厚皮晚熟品種，單寧極度厚重，僅適合溫暖氣候種植',
      '是白葡萄品種，主要用於釀造氣泡酒的基酒之一',
      '陳年潛力普遍偏低，建議及早飲用完畢',
      '薄皮早熟品種，單寧輕盈酸度明亮，風土表現力極強'
    ],
    correctIndex: 3,
    explanation: '官方規格描述為薄皮早熟品種，單寧輕盈、酸度明亮，紅色漿果與泥土氣息展現細膩風土差異，是風土表現力最強的品種之一。'
  },
  {
    id: 'lo3-pn-002',
    lo: 3,
    sourceType: 'data-object',
    sourceId: 'pinot-noir',
    question: 'DNA證據顯示Pinot Noir的栽培歷史可追溯至何時、何地？',
    options: [
      '18世紀的澳洲，是相對年輕的品種',
      '羅馬時期以前的勃根地，是最古老品種之一',
      '20世紀的美國加州地區才開始種植',
      '16世紀的西班牙赫雷斯地區一帶'
    ],
    correctIndex: 1,
    explanation: 'DNA證據顯示Pinot Noir栽培歷史可追溯至羅馬時期以前的勃根地地區，是全球最古老的葡萄品種之一。'
  },
  {
    id: 'lo3-pn-003',
    lo: 3,
    sourceType: 'data-object',
    sourceId: 'pinot-noir',
    question: 'Pinot Noir因基因極不穩定、易突變，衍生出哪些近親變種？',
    options: [
      '卡本內蘇維濃、梅洛等波爾多品種',
      '希哈、格那希等隆河谷代表品種',
      '田帕尼優、山吉歐維榭等南歐品種',
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
      '羅馬軍團',
      '法國皇室',
      '熙篤會修士'
    ],
    correctIndex: 3,
    explanation: '中世紀由熙篤會修士在勃根地系統化栽培，逐步發展出以地塊為核心的風土分級概念。'
  },
  {
    id: 'lo3-pn-005',
    lo: 3,
    sourceType: 'data-object',
    sourceId: 'pinot-noir',
    question: 'Pinot Noir的薄皮特性使其對什麼特別敏感，種植難度公認為何？',
    options: [
      '對霜害、病害極度敏感，種植難度公認最高',
      '只對乾旱缺水敏感，霜害與病害威脅相對輕微',
      '對高溫較敏感，霜害威脅相對輕微',
      '薄皮特性主要影響最終酒色深淺，與種植難度較無關'
    ],
    correctIndex: 0,
    explanation: '薄皮特性使其對霜害、病害極度敏感，種植難度公認是頂級品種中最高的之一。'
  },
  {
    id: 'lo3-pn-006',
    lo: 3,
    sourceType: 'data-object',
    sourceId: 'pinot-noir',
    question: 'Pinot Noir與加美（Gamay）相比，兩者風格上的關鍵差異為何？',
    options: [
      '兩者的差異主要在於陳年潛力，單寧與酒體相近',
      '加美的單寧與酒體遠比黑皮諾更重厚',
      '黑皮諾單寧酒體更重陳年強；加美單寧輕早飲',
      '黑皮諾多用二氧化碳浸漬，加美走陳年路線'
    ],
    correctIndex: 2,
    explanation: '黑皮諾單寧與酒體皆更重、陳年潛力強，加美單寧極輕、多以二氧化碳浸漬工法早飲，兩者常因同樣產自勃根地/薄酒萊地區而被連結，但風格差異極大。'
  },
  {
    id: 'lo3-pn-007',
    lo: 3,
    sourceType: 'data-object',
    sourceId: 'pinot-noir',
    question: 'Pinot Noir與格那希（Grenache）相比，酸度與酒精度的差異為何？',
    options: [
      '兩者的差異主要來自產區氣候，品種本身特性相近',
      '黑皮諾酸度遠高於格那希，酒精度通常較低',
      '格那希酸度遠高於黑皮諾許多',
      '黑皮諾的酒精度通常高於格那希'
    ],
    correctIndex: 1,
    explanation: '與格那希相比，黑皮諾顏色相近但酸度遠高於格那希、酒精度也通常較低，格那希的甜熟果香與較低酸度是明顯區隔。'
  },
  {
    id: 'lo3-pn-008',
    lo: 3,
    sourceType: 'data-object',
    sourceId: 'pinot-noir',
    question: 'Pinot Noir的香氣輪列出哪些核心香氣？',
    options: [
      '黑醋栗、雪松、石墨、薄荷',
      '黑胡椒、黑莓、煙燻肉香、紫羅蘭',
      '紅櫻桃、覆盆子、蘑菇、玫瑰',
      '紅李、黑櫻桃、巧克力、月桂葉'
    ],
    correctIndex: 2,
    explanation: '香氣輪列出Red Cherry、Raspberry、Mushroom、Rose。'
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
    correctIndex: 2,
    explanation: '代表產區涵蓋Côte de Nuits、Sonoma Coast、Central Otago等產區，Barossa Valley是澳洲以Shiraz聞名的產區。'
  },
  {
    id: 'lo3-pn-010',
    lo: 3,
    sourceType: 'data-object',
    sourceId: 'pinot-noir',
    question: 'Pinot Noir建議的侍酒溫度區間為何？',
    options: [
      '14–15°C',
      '6–8°C',
      '10–13°C',
      '16–18°C'
    ],
    correctIndex: 0,
    explanation: '建議侍酒溫度為14–15°C，介於清淡型與濃郁型紅酒之間。'
  },
  {
    id: 'lo3-pn-011',
    lo: 3,
    sourceType: 'data-object',
    sourceId: 'pinot-noir',
    question: 'Pinot Noir適合搭配下列哪些食物類型？',
    options: [
      '高脂、紅肉、野味、燒烤料理',
      '海鮮與甲殼類等清淡料理',
      '甜點與水果等偏甜食材',
      '中脂、白肉、蕈菇鮮味、鴨肉'
    ],
    correctIndex: 3,
    explanation: '建議搭餐項目包括Moderate Fat、White Meat、Mushroom Umami、Duck。'
  },
  {
    id: 'lo3-pn-012',
    lo: 3,
    sourceType: 'data-object',
    sourceId: 'pinot-noir',
    question: 'Pinot Noir的單寧為何普遍偏向輕盈，與Cabernet Sauvignon形成鮮明對比？',
    options: [
      '果皮與Cabernet Sauvignon一樣厚實，只是萃取方式不同',
      '單寧含量與果皮厚度一般被認為沒有關聯',
      'Pinot Noir單寧含量比Cabernet Sauvignon更高',
      '果皮薄、色素與單寧物質含量天生較少'
    ],
    correctIndex: 3,
    explanation: 'Pinot Noir果皮薄，天生色素與單寧物質含量較少，這是其單寧輕盈風格的品種基礎，與Cabernet Sauvignon厚皮晚熟的特性形成鮮明對比。'
  },
  {
    id: 'lo3-pn-013',
    lo: 3,
    sourceType: 'data-object',
    sourceId: 'pinot-noir',
    question: 'Pinot Noir在花香表現上的品種特色為何？',
    options: [
      '屬於花香調性鮮明的品種之一，常與玫瑰等花香氣息相呼應',
      '屬於花香調性最不明顯的品種之一，接近無香',
      '花香調性只出現在經橡木桶陳年的版本，未經橡木桶則幾乎不存在',
      '其香氣調性更接近Cabernet Sauvignon的黑色果香系，而非花香'
    ],
    correctIndex: 0,
    explanation: 'Pinot Noir的香氣輪中列出玫瑰（Rose）等花香調性，屬於花香調性較鮮明的品種之一，尤其在較冷涼產區或經一定陳年後更為明顯。'
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
      '灰皮，原產法國，德語產區無特殊別名'
    ],
    correctIndex: 1,
    explanation: '果皮顏色為紅葡萄，原生國為法國，德語產區稱之為Spätburgunder。'
  },
  {
    id: 'lo3-pn-015',
    lo: 3,
    sourceType: 'wset-spec-supplement',
    sourceId: 'pinot-noir',
    question: '布根地夜丘（Côte de Nuits）與伯恩丘（Côte de Beaune）這兩個子產區，在特級園（Grand Cru）分布上有何常見的對比印象？',
    options: [
      '夜丘的特級園全數種植Chardonnay，伯恩丘的特級園全數種植Pinot Noir',
      '兩個子產區的特級園分布主要以產區歷史悠久程度區分，與品種類型較無直接關聯',
      '夜丘的特級園以Pinot Noir紅酒居多，伯恩丘的特級園則以Chardonnay白酒居多',
      '夜丘與伯恩丘皆不種植Pinot Noir，兩者皆以Chardonnay特級園聞名'
    ],
    correctIndex: 2,
    explanation: '夜丘（Côte de Nuits）的特級園以Pinot Noir紅酒居多，伯恩丘（Côte de Beaune）的特級園則以Chardonnay白酒居多（雖伯恩丘也有少數紅酒特級園），是布根地產區地理與品種分布的重要知識點。'
  },
  {
    id: 'lo3-pn-016',
    lo: 3,
    sourceType: 'wset-spec-supplement',
    sourceId: 'pinot-noir',
    question: '紐西蘭Central Otago（中奧塔哥）產區的Pinot Noir，其氣候條件在紐西蘭當地屬於哪一種類型，並帶來什麼風格特徵？',
    options: [
      '屬於熱帶海洋型氣候、終年高溫潮濕，酒款風格通常清淡如水、缺乏果香',
      '該產區氣候與馬爾堡皆屬溫和海洋型氣候，日夜溫差普遍不大',
      '該產區地處紐西蘭最北端，屬於全紐西蘭最溫暖潮濕的產區',
      '屬於大陸型氣候、日照充足但晝夜溫差大，酒款風格通常濃郁飽滿、色澤深邃'
    ],
    correctIndex: 3,
    explanation: 'Central Otago是紐西蘭少數具大陸型氣候特徵的產區，日照充足但晝夜溫差大，當地Pinot Noir酒款風格通常較濃郁飽滿、色澤較深，是紐西蘭最重要的Pinot Noir產區之一。'
  },
  {
    id: 'lo3-pn-017',
    lo: 3,
    sourceType: 'wset-spec-supplement',
    sourceId: 'pinot-noir',
    question: '為什麼Pinot Noir普遍被認為特別適合種植在涼爽氣候（cool climate）產區？',
    options: [
      '涼爽氣候能大幅提高Pinot Noir的單寧含量與厚度，藉此彌補單寧天生偏薄的缺點',
      '涼爽氣候有助於延緩果實成熟速度，讓Pinot Noir在保留較高酸度的同時，逐漸發展出風味複雜度',
      '涼爽氣候的主要效果是明顯加速Pinot Noir的酒精發酵速度，藉此縮短整體釀造時間',
      '涼爽氣候能讓Pinot Noir的果皮顏色明顯加深，進而產生更為濃郁飽滿的酒色表現'
    ],
    correctIndex: 1,
    explanation: 'Pinot Noir是相對早熟的品種，涼爽氣候有助於延緩其成熟速度，讓果實在累積風味複雜度的同時仍能保留較高酸度，維持其細緻優雅的風格特徵，這是Pinot Noir偏好涼爽氣候的核心原理。'
  },
  {
    id: 'lo3-pn-018',
    lo: 3,
    sourceType: 'wset-spec-supplement',
    sourceId: 'pinot-noir',
    question: '布根地過去在較涼爽的年份，Pinot Noir常因糖分累積不足而採用什麼釀造調整手法？',
    options: [
      '補糖（Chaptalization），在發酵過程中額外添加糖分以提升最終酒精濃度',
      '補酸（Acidification），額外添加酸性物質以彌補糖分不足',
      '停止發酵（Fermentation Stopped），提前終止發酵以保留天然糖分',
      '延長泡皮（Extended Maceration），透過拉長泡皮時間彌補糖分不足'
    ],
    correctIndex: 0,
    explanation: '在較涼爽、日照不足的年份，果實糖分累積可能不足，過去布根地常見的調整手法是補糖（Chaptalization），透過在發酵過程中額外添加糖分來提升最終酒精濃度，是官方規格中釀造調整選項的實際應用案例。'
  },
  {
    id: 'lo3-pn-019',
    lo: 3,
    sourceType: 'wset-spec-supplement',
    sourceId: 'pinot-noir',
    question: '部分Pinot Noir酒莊會採用「整串發酵（whole-bunch fermentation）」，保留部分或全部果梗一起發酵，這項工序對酒款風格可能帶來什麼影響？',
    options: [
      '果梗可能增添額外的香料調性與結構感，但若果梗未完全成熟，也可能帶來過於生青的草本氣息',
      '整串發酵能顯著提高最終酒款的整體酒精濃度數值，與香氣調性較無直接關聯',
      '整串發酵是裝瓶前的最後一道過濾工序，主要用於移除多餘殘留的果梗碎屑',
      '整串發酵的主要效果是加深最終酒款的色澤深度，與香料調性或結構感較無關'
    ],
    correctIndex: 0,
    explanation: '整串發酵保留部分或全部果梗一起參與發酵，可能為酒款增添額外的香料調性與結構感，但若果梗未完全成熟（木質化程度不足），也可能帶來過於生青的草本氣息，是把雙面刃的釀造選擇，需視果梗成熟度謹慎判斷是否採用。'
  },
  {
    id: 'lo3-syr-001',
    lo: 3,
    sourceType: 'data-object',
    sourceId: 'syrah-shiraz',
    question: 'Syrah/Shiraz的風格核心特徵為何？',
    options: [
      '薄皮早熟品種，單寧極輕盈，僅適合冷涼氣候種植',
      '厚皮品種，舊世界冷香料黑胡椒；新世界濃縮果醬巧克力',
      '是白葡萄品種，主要用於釀造貴腐甜酒的基酒',
      '風格差異主要來自採收時間早晚，與氣候冷熱關聯較低'
    ],
    correctIndex: 1,
    explanation: '官方規格描述為厚皮品種，舊世界（北隆河）展現冷香料與黑胡椒骨架，新世界（澳洲）則濃縮成熟果醬與巧克力，風格因產地而異。'
  },
  {
    id: 'lo3-syr-002',
    lo: 3,
    sourceType: 'data-object',
    sourceId: 'syrah-shiraz',
    question: '2000年代DNA親緣分析確認Syrah的親本為何，推翻了什麼長期流傳的傳說？',
    options: [
      '親本為法國隆河兩個古老品種，推翻波斯敘利亞起源說',
      '親本為黑皮諾與白高維斯，推翻法國本土起源說',
      '親本為卡本內弗朗與白蘇維濃，推翻了隆河起源說法',
      '親本為神索與慕維得爾，推翻了美國加州起源說'
    ],
    correctIndex: 0,
    explanation: 'DNA親緣分析確認Syrah親本為Dureza與Mondeuse Blanche兩個古老隆河品種，推翻了波斯或敘利亞起源傳說。'
  },
  {
    id: 'lo3-syr-003',
    lo: 3,
    sourceType: 'data-object',
    sourceId: 'syrah-shiraz',
    question: '18世紀末是誰將Syrah引入澳洲，並在當地發展出濃縮成熟風格、改稱為Shiraz？',
    options: [
      '法國波爾多的葡萄酒商人',
      '德國萊茵地區的傳教修士',
      '義大利托斯卡尼的釀酒師',
      '蘇格蘭移民詹姆士．布斯比'
    ],
    correctIndex: 3,
    explanation: '18世紀末由蘇格蘭移民詹姆士．布斯比引入澳洲，在此發展出與原鄉截然不同的濃縮成熟風格，並改稱Shiraz。'
  },
  {
    id: 'lo3-syr-004',
    lo: 3,
    sourceType: 'data-object',
    sourceId: 'syrah-shiraz',
    question: 'Syrah在法國與Shiraz在澳洲這兩種身份認同的現象，以及至今仍保有全球數一數二老藤希哈的產區為何？',
    options: [
      'Napa Valley（納帕谷）地區',
      'Mosel（摩塞爾）河谷地區',
      'Rioja（里奧哈）產區一帶',
      'Barossa Valley（巴羅莎谷）'
    ],
    correctIndex: 3,
    explanation: '兩地形成「同一品種、兩種身份認同」的獨特現象，至今Barossa Valley仍保有全球數一數二的老藤希哈。'
  },
  {
    id: 'lo3-syr-005',
    lo: 3,
    sourceType: 'data-object',
    sourceId: 'syrah-shiraz',
    question: 'Syrah與格那希（Grenache）常見於教皇新堡的GSM混調配方中，兩者角色互補的方式為何？',
    options: [
      '希哈提供顏色單寧胡椒骨架，格那希提供酒精甜熟果香',
      '希哈提供酒精度與甜熟果香，格那希提供顏色與單寧骨架',
      '兩者混調主要是為了掩蓋希哈的青澀單寧，而非追求風味互補',
      '兩者混調比例通常固定為各半，並無主導與輔助之分'
    ],
    correctIndex: 0,
    explanation: '兩者角色互補：希哈提供顏色、單寧與胡椒辛香骨架，格那希提供酒精度與甜熟果香。'
  },
  {
    id: 'lo3-syr-006',
    lo: 3,
    sourceType: 'data-object',
    sourceId: 'syrah-shiraz',
    question: '「Shiraz」與「Syrah」這兩個名稱拼寫不同，實際上代表什麼關係？',
    options: [
      '是法國原生種與澳洲當地演化出的近緣突變種，基因已有分化',
      'Shiraz是Syrah的芽變品種，基因略有差異',
      '實為完全相同的品種，只是產地慣用稱呼不同',
      'Shiraz專指白葡萄，Syrah專指黑葡萄品種'
    ],
    correctIndex: 2,
    explanation: 'Shiraz與Syrah雖拼寫不同，實為完全相同的品種，並非兩個獨立品種，只是澳洲與法國/舊世界的慣用稱呼不同。'
  },
  {
    id: 'lo3-syr-007',
    lo: 3,
    sourceType: 'data-object',
    sourceId: 'syrah-shiraz',
    question: 'Syrah/Shiraz的香氣輪列出哪些核心香氣？',
    options: [
      '黑胡椒、黑莓、煙燻肉香、紫羅蘭',
      '紅櫻桃、覆盆子、蘑菇與玫瑰',
      '黑醋栗、雪松、石墨與薄荷',
      '紅李、黑櫻桃、巧克力、月桂葉'
    ],
    correctIndex: 0,
    explanation: '香氣輪列出Black Pepper、Blackberry、Smoked Meat、Violet，黑胡椒是希哈最具辨識度的招牌香氣之一。'
  },
  {
    id: 'lo3-syr-008',
    lo: 3,
    sourceType: 'data-object',
    sourceId: 'syrah-shiraz',
    question: '下列哪一個產區不屬於Syrah/Shiraz的代表性種植區域？',
    options: [
      'Hermitage（艾米達吉）地區',
      'Côte-Rôtie（羅第丘）產區',
      'Barossa Valley（巴羅莎谷）一帶',
      'Rioja（里奧哈）產區'
    ],
    correctIndex: 3,
    explanation: '代表產區涵蓋Hermitage、Côte-Rôtie、Barossa Valley等產區，Rioja是西班牙以Tempranillo聞名的產區，不在Syrah/Shiraz代表產區清單中（此題經WSET規格與解析文字核對後，已將正解從Hermitage修正為Rioja，此為經Harry核准的內容修正，原資料存在題幹與解析矛盾）。'
  },
  {
    id: 'lo3-syr-009',
    lo: 3,
    sourceType: 'data-object',
    sourceId: 'syrah-shiraz',
    question: 'Syrah/Shiraz建議的侍酒溫度區間為何？',
    options: [
      '6–8°C',
      '16–18°C',
      '10–13°C',
      '8–10°C'
    ],
    correctIndex: 1,
    explanation: '建議侍酒溫度為16–18°C。'
  },
  {
    id: 'lo3-syr-010',
    lo: 3,
    sourceType: 'data-object',
    sourceId: 'syrah-shiraz',
    question: 'Syrah/Shiraz適合搭配下列哪些食物類型？',
    options: [
      '海鮮與甲殼類等清淡料理',
      '高脂、紅肉、野味、燒烤',
      '甜點與水果等偏甜食材',
      '低脂開胃菜與清淡小點'
    ],
    correctIndex: 1,
    explanation: '建議搭餐項目包括High Fat、Red Meat、Game、Grilled。'
  },
  {
    id: 'lo3-syr-011',
    lo: 3,
    sourceType: 'data-object',
    sourceId: 'syrah-shiraz',
    question: 'Syrah/Shiraz在溫暖氣候（如Barossa Valley）種植時，酒體與酒精濃度通常會呈現什麼樣的變化趨勢？',
    options: [
      '果實成熟度與含糖量提高，通常釀出酒體更飽滿、酒精濃度更高的酒款',
      '氣候溫暖與否，對酒體和酒精濃度影響不大',
      '溫暖氣候會讓酒體與酒精濃度雙雙下降',
      '酒體與酒精濃度只受釀酒師人為添加酒精影響，與氣候無關'
    ],
    correctIndex: 0,
    explanation: '這是LO1氣候與葡萄成熟度的基本原理：溫暖氣候延長生長季、提高果實含糖量，發酵後通常轉化為更高的酒精濃度，並伴隨更飽滿的酒體，這適用於包含Syrah/Shiraz在內的多數葡萄品種，而非單一品種的固定特性。'
  },
  {
    id: 'lo3-syr-012',
    lo: 3,
    sourceType: 'data-object',
    sourceId: 'syrah-shiraz',
    question: 'Syrah/Shiraz的單寧表現與Cabernet Sauvignon相比如何？',
    options: [
      'Syrah/Shiraz單寧含量被認為遠低於絕大多數黑葡萄品種',
      '同屬單寧表現厚重的品種，強度上與Cabernet Sauvignon相近',
      'Syrah/Shiraz單寧遠高於Cabernet Sauvignon，是所有品種中最厚重的',
      'Syrah/Shiraz被認為單寧含量極低，幾乎不明顯'
    ],
    correctIndex: 1,
    explanation: 'Syrah/Shiraz同屬單寧表現厚重的品種之一，強度上與Cabernet Sauvignon相近，這也是兩者常被歸類為「結構扎實」代表性黑葡萄品種的原因。'
  },
  {
    id: 'lo3-syr-013',
    lo: 3,
    sourceType: 'data-object',
    sourceId: 'syrah-shiraz',
    question: 'Syrah/Shiraz的果皮顏色分類與原產國為何？',
    options: [
      '黑皮，原產法國',
      '白皮，原產法國',
      '黑皮，原產澳洲',
      '灰皮，原產西班牙'
    ],
    correctIndex: 0,
    explanation: '果皮顏色為紅葡萄，原生國為法國，儘管Shiraz之名與澳洲密不可分，但品種起源仍是法國北隆河。'
  },
  {
    id: 'lo3-syr-014',
    lo: 3,
    sourceType: 'data-object',
    sourceId: 'syrah-shiraz',
    question: 'Syrah/Shiraz常帶有一種獨特的黑胡椒／白胡椒香氣，這種特徵與什麼因素最相關？',
    options: [
      '這種胡椒調性完全來自橡木桶陳年時添加的香料',
      '多數黑葡萄品種都普遍帶有相近程度的胡椒調性',
      '這種胡椒調性主要存在於Shiraz，Syrah較不明顯',
      '品種本身含有稱為Rotundone的天然化合物，尤其在冷涼氣候下更為明顯'
    ],
    correctIndex: 3,
    explanation: 'Syrah/Shiraz常見的黑胡椒／白胡椒調性源自品種天然含有的Rotundone化合物，在較冷涼氣候（如北隆河）下這種特徵通常更為明顯，是其重要的品種辨識線索之一。'
  },
  {
    id: 'lo3-syr-015',
    lo: 3,
    sourceType: 'wset-spec-supplement',
    sourceId: 'syrah-shiraz',
    question: '北隆河的Hermitage與Côte-Rôtie，這兩個知名法定產區在品種使用上有何共同特色？',
    options: [
      '兩者皆允許以100%單一Syrah品種裝瓶，屬於北隆河單一品種風格的代表產區',
      '兩者皆強制要求Syrah須與至少四種其他品種混調，禁止單一品種裝瓶',
      '兩者的法定品種以格那希為主，Syrah僅能作為少量調配用途的品種使用',
      '兩者皆位於南隆河，與北隆河的地理範圍並無關聯'
    ],
    correctIndex: 0,
    explanation: 'Hermitage與Côte-Rôtie皆位於北隆河，允許以100%單一Syrah品種裝瓶，是北隆河單一品種風格Syrah的代表產區，與南隆河常見的多品種混調風格（如教皇新堡的GSM配方）形成對比。'
  },
  {
    id: 'lo3-syr-016',
    lo: 3,
    sourceType: 'wset-spec-supplement',
    sourceId: 'syrah-shiraz',
    question: 'Côte-Rôtie法規允許酒莊在釀造Syrah時，額外混入少量白葡萄品種Viognier一起發酵，這項傳統作法的主要目的為何？',
    options: [
      'Viognier的主要作用是大幅提高最終酒款的單寧含量與陳年潛力',
      '混入Viognier主要是為了降低釀造成本，與風味或色澤穩定性較無關',
      '這項作法是近代行銷噱頭，Côte-Rôtie官方法規並不允許此作法',
      '少量Viognier能為酒款增添花香調性，並有助於穩定酒液色澤'
    ],
    correctIndex: 3,
    explanation: 'Côte-Rôtie傳統上允許酒莊在Syrah中混入少量（通常不超過一定比例）Viognier一起發酵，少量Viognier能為酒款增添細緻花香調性，同時有助於穩定酒液色澤，是該產區歷史悠久且獨特的傳統工法。'
  },
  {
    id: 'lo3-syr-017',
    lo: 3,
    sourceType: 'wset-spec-supplement',
    sourceId: 'syrah-shiraz',
    question: '南非Stellenbosch（斯泰倫博斯）與Swartland（斯瓦特蘭）產區的Shiraz，在南非葡萄酒版圖中的定位為何？',
    options: [
      '兩者皆是南非法規明文禁止種植Shiraz的產區，僅能種植白葡萄品種',
      '是南非重要的Shiraz代表產區之一，風格介於舊世界優雅與新世界濃郁之間',
      '兩者是南非境內氣候最寒冷潮濕的產區，並不適合Shiraz這類黑葡萄品種',
      '兩者的Shiraz種植歷史不足十年，屬於南非最新興的實驗性產區'
    ],
    correctIndex: 1,
    explanation: 'Stellenbosch與Swartland是南非重要的Shiraz代表產區，當地風格常被認為介於舊世界的優雅結構與新世界的濃郁果香之間，是南非葡萄酒版圖中重要的黑葡萄品種產區。'
  },
  {
    id: 'lo3-syr-018',
    lo: 3,
    sourceType: 'wset-spec-supplement',
    sourceId: 'syrah-shiraz',
    question: 'Syrah/Shiraz在色澤深度上，相較於多數其他黑葡萄品種，一般被認為如何？',
    options: [
      '通常色澤極淺，是黑葡萄品種中色澤表現數一數二淡薄的品種之一',
      'Syrah/Shiraz的色澤深淺完全取決於裝瓶時添加的人工色素比例',
      '通常色澤極深，是黑葡萄品種中色澤表現數一數二深邃的品種之一',
      '色澤深淺與品種較無關聯，主要單純取決於採收當年的降雨量多寡'
    ],
    correctIndex: 2,
    explanation: 'Syrah/Shiraz的果皮色素含量豐富，成酒通常色澤極深、近乎不透光，是黑葡萄品種中色澤表現數一數二深邃的品種之一，這也是其厚實酒體風格的視覺線索之一。'
  },
  {
    id: 'lo3-sup-001',
    lo: 3,
    sourceType: 'data-object',
    sourceId: 'multi-grape-comparison',
    question: '依業界公認的品種特性，下列四個黑葡萄品種中，何者以單寧最為厚重紮實聞名？',
    options: [
      'Cabernet Sauvignon（厚皮晚熟，單寧最為緊實厚重）',
      'Pinot Noir（薄皮早熟，單寧輕盈明亮）',
      'Merlot（果皮較薄，單寧較圓潤柔和）',
      'Syrah/Shiraz（單寧扎實，但略遜於Cabernet Sauvignon）'
    ],
    correctIndex: 0,
    explanation: '四個品種的單寧特性依業界公認的品種描述，由厚至薄依序約為：Cabernet Sauvignon＞Syrah/Shiraz＞Merlot＞Pinot Noir，這與各品種果皮厚度及成熟時間直接相關，Cabernet Sauvignon因厚皮晚熟特性成為單寧最紮實的代表。'
  },
  {
    id: 'lo3-sup-002',
    lo: 3,
    sourceType: 'data-object',
    sourceId: 'multi-grape-comparison',
    question: '在WSET L2官方八大主要品種中，下列哪一組全部屬於白葡萄品種？',
    options: [
      'Chardonnay、Cabernet Sauvignon、Riesling、Merlot',
      'Pinot Noir、Syrah/Shiraz、Merlot、Cabernet Sauvignon',
      'Sauvignon Blanc、Pinot Noir、Riesling、Syrah/Shiraz',
      'Chardonnay、Sauvignon Blanc、Riesling、Pinot Gris'
    ],
    correctIndex: 3,
    explanation: '官方八大主要品種中，白葡萄品種為Chardonnay、Sauvignon Blanc、Riesling、Pinot Gris；黑葡萄品種為Cabernet Sauvignon、Merlot、Pinot Noir、Syrah/Shiraz。'
  },
  {
    id: 'lo4-tem-001',
    lo: 4,
    sourceType: 'data-object',
    sourceId: 'tempranillo',
    question: 'Tempranillo名稱的由來為何？',
    options: [
      '源自西班牙語「temprano」（早熟）之意',
      '源自某位品種發現者的姓氏名稱',
      '源自西班牙某個知名城市的名稱',
      '源自拉丁語，意指「陽光充足」之意'
    ],
    correctIndex: 0,
    explanation: '田帕尼優之名源自西班牙語「temprano」（早熟），指其相對於格那希等品種更早成熟採收的特性。'
  },
  {
    id: 'lo4-tem-002',
    lo: 4,
    sourceType: 'data-object',
    sourceId: 'tempranillo',
    question: 'Tempranillo在西班牙不同產區有多個地方別名，下列對應何者正確？',
    options: [
      '這些別名專指僅在里奧哈產區使用的正式法規名稱',
      '這個品種主要集中在Rioja種植，其他產區較少使用別名',
      '這些別名是專指釀造甜酒版本的稱呼',
      '不同產區有不同別名（如Tinto Fino），皆為同一品種'
    ],
    correctIndex: 3,
    explanation: 'Ribera del Duero稱Tinto Fino、Toro稱Tinta de Toro、La Mancha一帶稱Cencibel，皆為同一品種，非獨立品種。'
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
      '工業革命',
      '根瘤蚜蟲害'
    ],
    correctIndex: 3,
    explanation: 'Rioja自19世紀根瘤蚜蟲害促成波爾多釀酒技術傳入後，發展出獨特的陳年分級體系。'
  },
  {
    id: 'lo4-tem-004',
    lo: 4,
    sourceType: 'data-object',
    sourceId: 'tempranillo',
    question: 'Tempranillo與Sangiovese相比，兩者風格上的關鍵差異為何？',
    options: [
      '兩者的差異主要來自釀造工法，品種本身特性非常相近',
      '山吉歐維榭酸度較低，田帕尼優酸度較高',
      '田帕尼優酸度低單寧緊實；山吉歐維榭高酸酸櫻桃',
      '田帕尼優以酸櫻桃調性為特徵，山吉歐維榭單寧更緊實'
    ],
    correctIndex: 2,
    explanation: '田帕尼優酸度較低、單寧更緊實，山吉歐維榭則以更高酸度與酸櫻桃調性為特徵，兩者同樣走「高適配紅酒配餐」路線，但風格細節不同。'
  },
  {
    id: 'lo4-san-001',
    lo: 4,
    sourceType: 'data-object',
    sourceId: 'sangiovese',
    question: 'Sangiovese名稱可能源自拉丁語的什麼意思？',
    options: [
      '「Sanguis Jovis」（朱庇特之血）',
      '「太陽之子」，象徵陽光充足的滋養',
      '「托斯卡尼的驕傲」，代表地方認同',
      '「山丘之風」，指山區風土的影響'
    ],
    correctIndex: 0,
    explanation: '山吉歐維榭之名可能源自拉丁語「Sanguis Jovis」（朱庇特之血）。'
  },
  {
    id: 'lo4-san-002',
    lo: 4,
    sourceType: 'data-object',
    sourceId: 'sangiovese',
    question: '1970年代托斯卡尼酒莊不滿Chianti法定規範限制、混調國際品種釀出高品質酒款，催生出什麼運動？這間接推動了什麼歷史事件？',
    options: [
      '「新世界革命」運動，間接推動DOCG分級誕生',
      '「有機種植」運動，間接推動歐盟GI體系建立',
      '「風土保護」運動，間接推動Barolo產區劃界',
      '「超級托斯卡尼」運動，間接推動1996年產區獨立'
    ],
    correctIndex: 3,
    explanation: '1970年代催生出「超級托斯卡尼」運動，間接推動1996年Chianti Classico脫離Chianti大產區獨立。'
  },
  {
    id: 'lo4-san-003',
    lo: 4,
    sourceType: 'data-object',
    sourceId: 'sangiovese',
    question: 'Sangiovese與Nebbiolo同為義大利高酸代表品種，兩者風格差異的關鍵區辨為何？',
    options: [
      '兩者的差異主要在於顏色深淺，風味調性非常接近',
      '山吉歐維榭酸櫻桃番茄葉；內比歐露玫瑰焦油單寧更高',
      '內比歐露顏色較深，單寧也較輕盈',
      '山吉歐維榭的單寧與酸度都高於內比歐露'
    ],
    correctIndex: 1,
    explanation: '山吉歐維榭顏色較淺、酸櫻桃與番茄葉調性、單寧中等；內比歐露顏色更淺卻單寧與酸度皆更高，玫瑰與焦油氣息是關鍵辨識點。'
  },
  {
    id: 'lo4-san-004',
    lo: 4,
    sourceType: 'data-object',
    sourceId: 'sangiovese',
    question: 'Sangiovese的高酸度與其料理搭配定位有何關聯？',
    options: [
      '高酸度使其大多不適合搭配食物',
      '高酸度使其特別適合搭配濃郁甜點，而非一般鹹食料理',
      '高酸度使其成為理想的配餐酒，尤其適合搭配番茄類料理',
      '高酸度代表較適合單獨飲用，不適合配餐'
    ],
    correctIndex: 2,
    explanation: 'Sangiovese天生高酸，與其常見的酸櫻桃、番茄葉調性相互呼應，這種高酸特性使其成為義大利料理，尤其是番茄類料理的理想配餐酒選擇。'
  },
  {
    id: 'lo4-neb-001',
    lo: 4,
    sourceType: 'data-object',
    sourceId: 'nebbiolo',
    question: 'Nebbiolo名稱可能源自義大利語的什麼意思？',
    options: [
      '「陽光」，指其偏好日照充足的環境',
      '「nebbia」（霧），指秋季採收期的濃霧景象',
      '「國王」，指涉其「酒中之王」的地位',
      '「石灰岩」，指其偏好的土壤類型'
    ],
    correctIndex: 1,
    explanation: '內比歐露之名可能源自義大利語「nebbia」（霧），指皮埃蒙特秋季採收期常見的濃霧景象。'
  },
  {
    id: 'lo4-neb-002',
    lo: 4,
    sourceType: 'data-object',
    sourceId: 'nebbiolo',
    question: 'Nebbiolo顏色淺淡常被誤判為單寧與酒體皆輕盈的品種，實際狀況為何？',
    options: [
      '顏色偏淡是因為果皮特別薄，因此單寧萃取量也偏低',
      '單寧與酸度接近中等水準，介於黑皮諾與卡本內蘇維濃之間',
      '單寧與酸度皆是所有品種中數一數二的高',
      '單寧含量中等，主要來自橡木桶陳年而非果皮萃取'
    ],
    correctIndex: 2,
    explanation: '內比歐露單寧與酸度皆是所有品種中數一數二的高，是「以貌取酒」最容易踩雷的品種之一。'
  },
  {
    id: 'lo4-neb-003',
    lo: 4,
    sourceType: 'data-object',
    sourceId: 'nebbiolo',
    question: 'Nebbiolo的成熟特性與對風土的敏感度為何？',
    options: [
      '早熟發芽但極晚熟採收，對風土極為敏感',
      '晚熟發芽且早熟採收，對風土敏感度較低',
      '發芽與採收時序與其他品種完全相同無異',
      '較適合種植於火山土壤，對其他土壤適應力有限'
    ],
    correctIndex: 0,
    explanation: '早熟發芽但極晚熟採收，且對風土（尤其是Barolo、Barbaresco的鈣質泥灰岩）極為敏感，是義大利葡萄酒教學中風土表現力的經典案例。'
  },
  {
    id: 'lo4-neb-004',
    lo: 4,
    sourceType: 'data-object',
    sourceId: 'nebbiolo',
    question: 'Nebbiolo（如Barolo、Barbaresco）為何以驚人的長期陳年潛力聞名？',
    options: [
      '極高的單寧與酸度提供了長期陳年所需的結構支撐',
      '陳年潛力主要來自其偏高的殘糖，與單寧酸度結構較無關',
      '因為採收時保留大量葡萄梗，額外增添了單寧與陳年結構',
      '因為顏色極深，能有效阻隔氧氣延緩老化'
    ],
    correctIndex: 0,
    explanation: 'Nebbiolo單寧與酸度皆是所有品種中數一數二的高，這樣的結構為Barolo、Barbaresco等頂級酒款提供了長期陳年所需的支撐力，是義大利葡萄酒教學中陳年潛力的經典案例之一。'
  },
  {
    id: 'lo4-gre-001',
    lo: 4,
    sourceType: 'data-object',
    sourceId: 'grenache',
    question: 'Grenache的風格核心特徵為何？',
    options: [
      '厚皮低酒精度品種，單寧極度緊澀厚重',
      '薄皮高酒精度，果香甜美，單寧酸度天生較低',
      '是白葡萄品種，主要用於釀造氣泡酒基酒',
      '天然酸度是所有品種中數一數二高的'
    ],
    correctIndex: 1,
    explanation: '薄皮高酒精度品種，果香甜美豐盈，單寧與酸度天生較低，常作為隆河與西班牙混調的核心。'
  },
  {
    id: 'lo4-gre-002',
    lo: 4,
    sourceType: 'data-object',
    sourceId: 'grenache',
    question: 'Grenache普遍被認為起源於何處，其耐旱耐風特性使其特別適應什麼氣候？',
    options: [
      '起源於西班牙阿拉貢，適應乾燥炎熱地中海氣候',
      '起源於法國香檳區一帶，適應冷涼型氣候',
      '起源於義大利西西里島，適應濕潤氣候',
      '起源於德國萊茵河谷，適應大陸性氣候'
    ],
    correctIndex: 0,
    explanation: '起源於西班牙東北部阿拉貢一帶，薄皮耐旱特性適應隆河南部與西班牙乾燥炎熱的地中海型氣候。'
  },
  {
    id: 'lo4-gre-003',
    lo: 4,
    sourceType: 'data-object',
    sourceId: 'grenache',
    question: 'Grenache與Syrah常一起混調（如教皇新堡GSM配方），兩者風格互補的方式為何？',
    options: [
      '格那希主要負責提供單寧與骨架，希哈負責提供酒精與果香',
      '格那希單寧與酸度更高，希哈則酒精度較高',
      '格那希單寧酸度低酒精高；希哈單寧酸度更高帶胡椒',
      '格那希提供胡椒辛香，希哈提供甜熟果香'
    ],
    correctIndex: 2,
    explanation: '格那希單寧與酸度天生較低、酒精度高、果香甜熟；希哈單寧與酸度更高、帶胡椒辛香與更深色澤，兩者風格互補。'
  },
  {
    id: 'lo4-gre-004',
    lo: 4,
    sourceType: 'data-object',
    sourceId: 'grenache',
    question: 'Grenache與Gamay相比，兩者風格差異為何？',
    options: [
      '兩者的差異主要來自產區規範，品種本身風味相近',
      '加美酒體比格那希更飽滿厚重許多',
      '格那希以極輕盈酒體著稱，加美酒體更飽滿',
      '格那希酒體更飽滿酒精更高；加美極輕盈低單寧'
    ],
    correctIndex: 3,
    explanation: '格那希酒體明顯更飽滿厚重、酒精度更高，加美則以極輕盈酒體與極低單寧為特徵，兩者僅在「早飲易感」這點有共通之處。'
  },
  {
    id: 'lo4-mal-001',
    lo: 4,
    sourceType: 'data-object',
    sourceId: 'malbec',
    question: 'Malbec起源於法國西南部哪個產區，當地稱之為什麼別名？',
    options: [
      '波爾多地區，當地稱為Petit Verdot',
      '卡歐（Cahors），當地稱為Côt或Auxerrois',
      '隆河河谷地區，當地稱為Mourvèdre',
      '普羅旺斯地區，當地稱為Cinsault'
    ],
    correctIndex: 1,
    explanation: '馬爾貝克起源於法國西南部卡歐，當地稱為Côt或Auxerrois。'
  },
  {
    id: 'lo4-mal-002',
    lo: 4,
    sourceType: 'data-object',
    sourceId: 'malbec',
    question: '19世紀中根瘤蚜蟲害重創歐洲葡萄園後，Malbec在哪個新興產地意外找到最適合的第二故鄉？',
    options: [
      '澳洲巴羅莎谷（低海拔平原地帶）',
      '美國納帕谷（沿海溫和氣候區）',
      '阿根廷門多薩（高海拔安地斯山麓）',
      '紐西蘭中奧塔哥（南島冷涼產區）'
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
      '兩者主要差異在於甜度，阿根廷版本明顯偏甜型',
      '法國版本質樸緊澀；阿根廷版本深邃圓潤濃郁',
      '阿根廷版本風格質樸緊澀，法國版本圓潤香甜',
      '法國卡歐版本的顏色比阿根廷版本更深邃'
    ],
    correctIndex: 1,
    explanation: '法國卡歐版本風格較質樸緊澀、單寧更粗獷；阿根廷版本則顏色更深邃、單寧更圓潤、果香更濃郁，兩者雖同品種但因風土與釀造哲學不同，經常被誤認為兩個品種。'
  },
  {
    id: 'lo4-mal-004',
    lo: 4,
    sourceType: 'data-object',
    sourceId: 'malbec',
    question: 'Malbec與Syrah相比，風味調性上的關鍵差異為何？',
    options: [
      '馬爾貝克藍莓可可更甜美圓潤；希哈帶黑胡椒堅實骨架',
      '兩者的差異主要來自橡木桶使用程度，品種本身調性相近',
      '希哈的果香調性比馬爾貝克更甜美圓潤許多',
      '馬爾貝克以黑胡椒辛香作為其招牌特徵香氣'
    ],
    correctIndex: 0,
    explanation: '馬爾貝克的藍莓與可可調性更甜美，單寧質地也更絲滑圓潤，希哈則帶更明顯的黑胡椒辛香與較堅實的單寧骨架。'
  },
  {
    id: 'lo4-chb-001',
    lo: 4,
    sourceType: 'data-object',
    sourceId: 'chenin-blanc',
    question: 'Chenin Blanc天生極高的酸度，使其能勝任哪些風格類型？',
    options: [
      '多半釀成極干型白酒，較少釀造甜酒',
      '多半釀成氣泡酒，較少釀造靜態酒',
      '從極干到貴腐甜型皆能勝任，是全能型品種',
      '多半釀成貴腐甜酒，較少釀造干型酒款'
    ],
    correctIndex: 2,
    explanation: '極高天然酸度使其成為少數能勝任從極干到貴腐甜型、氣泡酒皆能勝任的「全能型」品種。'
  },
  {
    id: 'lo4-chb-002',
    lo: 4,
    sourceType: 'data-object',
    sourceId: 'chenin-blanc',
    question: '17世紀Chenin Blanc由荷蘭東印度公司引入哪個國家後大獲成功，如今成為全球該品種種植面積最大的產地？',
    options: [
      '澳洲',
      '紐西蘭',
      '南非',
      '美國'
    ],
    correctIndex: 2,
    explanation: '17世紀引入南非後大獲成功，如今南非是全球白詩楠種植面積最大的產地。'
  },
  {
    id: 'lo4-chb-003',
    lo: 4,
    sourceType: 'data-object',
    sourceId: 'chenin-blanc',
    question: 'Chenin Blanc與Sauvignon Blanc同為高酸白酒品種，兩者香氣邏輯的差異為何？',
    options: [
      '白詩楠以榲桲蜂蠟濕羊毛沉穩調性；白蘇維濃醋栗青草外放',
      '兩者的差異主要來自產區氣候，品種本身香氣邏輯相近',
      '白蘇維濃以榲桲蜂蠟調性為主，白詩楠則醋栗青草香氣',
      '白詩楠的獨特香氣特徵較不明顯'
    ],
    correctIndex: 0,
    explanation: '白詩楠以榲桲、蜂蠟、濕羊毛（陳年後）等較沉穩的調性為主，白蘇維濃則以更外放的醋栗、青草香氣為特徵。'
  },
  {
    id: 'lo4-chb-004',
    lo: 4,
    sourceType: 'data-object',
    sourceId: 'chenin-blanc',
    question: '選購Chenin Blanc時，為何務必留意酒標甜度標示？',
    options: [
      '因白詩楠只釀造甜酒，酒標標示只是形式',
      '因白詩楠只釀造干酒，甜度標示沒有實質意義',
      '白詩楠橫跨極干到極甜多種風格，不能假設甜度',
      '因白詩楠的甜度與品種無關，完全取決於瓶身顏色'
    ],
    correctIndex: 2,
    explanation: '因白詩楠可橫跨極干到極甜多種風格，不能假設「白詩楠＝甜酒」或「白詩楠＝干酒」。'
  },
  {
    id: 'lo4-zin-001',
    lo: 4,
    sourceType: 'data-object',
    sourceId: 'zinfandel-primitivo',
    question: '2001年加州大學戴維斯分校DNA比對確認Zinfandel與哪些品種為完全相同的品種？',
    options: [
      '義大利的Sangiovese、法國的Gamay兩者',
      '西班牙的Tempranillo、葡萄牙原生品種',
      '法國的Merlot、西班牙的Garnacha兩者',
      '義大利普利亞的Primitivo、克羅埃西亞Tribidrag'
    ],
    correctIndex: 3,
    explanation: '2001年DNA比對確認金芬黛與義大利南部普利亞的Primitivo、克羅埃西亞原生古老品種Tribidrag為完全相同的品種，三個名稱橫跨三個國家。'
  },
  {
    id: 'lo4-zin-002',
    lo: 4,
    sourceType: 'data-object',
    sourceId: 'zinfandel-primitivo',
    question: '加州Zinfandel與義大利Primitivo，兩者風格差異為何？',
    options: [
      '兩者的差異主要來自葡萄品系（clone）不同，而非產地氣候',
      '加州更成熟濃縮酒精高；義大利質樸緊實單寧明顯',
      '義大利版本酒精度更高、更成熟濃縮',
      '加州版本風格較質樸緊實、不濃縮'
    ],
    correctIndex: 1,
    explanation: '加州版本通常更成熟濃縮、酒精度更高；義大利版本相對質樸緊實、單寧結構更明顯，差異純粹來自產地風土與釀造哲學。'
  },
  {
    id: 'lo4-zin-003',
    lo: 4,
    sourceType: 'data-object',
    sourceId: 'zinfandel-primitivo',
    question: 'Zinfandel/Primitivo為何常以偏高的酒精濃度聞名？',
    options: [
      '因為釀酒師習慣額外添加烈酒調整酒精濃度，與品種本身特性無關',
      '高酒精濃度主要來自產區普遍的加糖工藝，而非葡萄本身糖度',
      '高酒精濃度主要受橡木桶陳年時的持續濃縮所致',
      '果串成熟不均，晚採收部分果粒糖度極高，是公認的高酒精代表品種之一'
    ],
    correctIndex: 3,
    explanation: 'Zinfandel/Primitivo果串內果粒成熟度不均，為等待多數果粒成熟常延後採收，導致部分果粒糖度極高，發酵後轉化出偏高的酒精濃度，是公認以高酒精、果醬香甜風格聞名的代表品種之一。'
  },
  {
    id: 'lo4-gam-001',
    lo: 4,
    sourceType: 'data-object',
    sourceId: 'gamay',
    question: '1395年勃根地公爵「勇敢的菲利普」因何頒布法令禁止在勃根地核心產區種植Gamay，迫使其向南遷徙至薄酒萊？',
    options: [
      '認為加美容易感染病害、危及其他品種',
      '因宗教信仰因素而禁止種植',
      '認為加美品質低劣、有損黑皮諾聲譽',
      '因加美產量過低、不符經濟效益'
    ],
    correctIndex: 2,
    explanation: '1395年因認為加美品質低劣、有損黑皮諾聲譽而頒布禁令，是葡萄酒史上少數有明確政治法令記載的品種遷徙案例。'
  },
  {
    id: 'lo4-gam-002',
    lo: 4,
    sourceType: 'data-object',
    sourceId: 'gamay',
    question: 'Gamay與Pinot Noir常因產地相鄰而被比較，兩者風格上的關鍵差異為何？',
    options: [
      '兩者的差異主要在於酒精濃度，單寧與酒體相近',
      '加美單寧低酒體輕帶香蕉泡泡糖；黑皮諾風土表現更複雜',
      '黑皮諾單寧極低、酒體極輕盈，加美單寧酒體皆較重',
      '加美的風土表現力比黑皮諾更為複雜細膩'
    ],
    correctIndex: 1,
    explanation: '加美單寧極低、酒體極輕盈、多採二氧化碳浸漬工法呈現奔放的香蕉與泡泡糖香氣；黑皮諾單寧與酒體皆較重、風土表現力更複雜細膩。'
  },
  {
    id: 'lo4-gam-003',
    lo: 4,
    sourceType: 'data-object',
    sourceId: 'gamay',
    question: '「薄酒萊新酒」的行銷策略雖讓Gamay全球知名度大增，但正確理解薄酒萊十村的加美應具備什麼特性？',
    options: [
      '薄酒萊十村的加美與新酒品質完全相同',
      '多數加美酒款陳年潛力有限',
      '薄酒萊新酒才是加美酒款的最高品質代表',
      '薄酒萊十村的加美具備不輸黑皮諾的陳年潛力'
    ],
    correctIndex: 3,
    explanation: '薄酒萊十村（如Morgon、Moulin-à-Vent）的加美其實具備不輸黑皮諾的陳年潛力，不應被「薄酒萊新酒」的印象一概而論。'
  },
  {
    id: 'lo4-gew-001',
    lo: 4,
    sourceType: 'data-object',
    sourceId: 'gewurztraminer',
    question: 'Gewürztraminer的名稱由來與字首「Gewürz」的德語意涵為何？',
    options: [
      '字首Gewürz源自法語，意為「花園」',
      '字首Gewürz意為「甜」，強調此品種多半是甜酒',
      '名稱源自法國阿爾薩斯地區某個知名城堡',
      '名稱源自原鄉Tramin村莊，Gewürz意為「香料」'
    ],
    correctIndex: 3,
    explanation: '名稱由品種原鄉義大利北部Tramin村莊而來，字首「Gewürz」在德語中意為「香料」，強調此品種異常濃郁奔放的香氣特性。'
  },
  {
    id: 'lo4-gew-002',
    lo: 4,
    sourceType: 'data-object',
    sourceId: 'gewurztraminer',
    question: 'Gewürztraminer與Viognier同為高辨識度的濃郁芳香品種，兩者香氣調性的差異為何？',
    options: [
      '兩者的差異主要來自產區傳統，品種本身香氣邏輯相近',
      '格烏茲塔明那荔枝玫瑰薑偏東方；維歐尼耶水蜜桃忍冬偏奶油',
      '維歐尼耶荔枝玫瑰花調性為主，格烏茲塔明那水蜜桃調性',
      '兩者香氣調性皆主要來自橡木桶處理，而非品種本身'
    ],
    correctIndex: 1,
    explanation: '格烏茲塔明那以荔枝、玫瑰花、薑等偏東方香料調性為主，維歐尼耶則以水蜜桃、忍冬花等偏奶油果香調性為主。'
  },
  {
    id: 'lo4-gew-003',
    lo: 4,
    sourceType: 'data-object',
    sourceId: 'gewurztraminer',
    question: 'Gewürztraminer為何是少數盲飲時可憑香氣直接辨識的品種？',
    options: [
      '主要因其帶有濃郁的黑醋栗與雪松調性，而非花果香氣',
      '香氣濃郁度與品種辨識度一般被認為沒有任何關聯',
      '天然帶有極濃郁鮮明的荔枝、玫瑰花與薑等香料調性，辨識度極高',
      '這種辨識度只出現在極少數特定酒莊的產品'
    ],
    correctIndex: 2,
    explanation: 'Gewürztraminer天然帶有極為鮮明濃郁的荔枝、玫瑰花與薑等香料調性，辨識度在白葡萄品種中數一數二，是少數盲飲時能憑香氣直接辨識的品種代表。'
  },
  {
    id: 'lo4-vio-001',
    lo: 4,
    sourceType: 'data-object',
    sourceId: 'viognier',
    question: 'Viognier曾一度瀕臨滅絕，1960年代法國北隆河孔德里約產區種植面積剩下多少？',
    options: [
      '不到10公頃，僅存極少量老藤',
      '超過1000公頃，種植面積龐大',
      '完全絕種，種植面積剩零公頃',
      '約100公頃，雖有減少但仍維持一定種植規模'
    ],
    correctIndex: 0,
    explanation: '1960年代孔德里約產區僅剩不到10公頃種植面積，是少數瀕危後成功復興的品種案例。'
  },
  {
    id: 'lo4-vio-002',
    lo: 4,
    sourceType: 'data-object',
    sourceId: 'viognier',
    question: '北隆河傳統上會將少量Viognier與Syrah共同發酵，這種做法的目的與代表產區為何？',
    options: [
      '主要是為了增加酒精濃度，與香氣或單寧較無關',
      '主要目的是為了增加紅酒的顏色深度，代表產區為Hermitage',
      '賦予紅酒花香層次與柔化單寧，代表產區如Côte-Rôtie',
      '目的單純是為了降低紅酒的最終酒精濃度高低'
    ],
    correctIndex: 2,
    explanation: '賦予紅酒額外的花香層次與柔化單寧的效果，是白葡萄與紅葡萄協同釀造的經典案例，代表產區如Côte-Rôtie。'
  },
  {
    id: 'lo4-vio-003',
    lo: 4,
    sourceType: 'data-object',
    sourceId: 'viognier',
    question: 'Viognier與Chardonnay混淆的情況也不少見，兩者最主要的辨識依據為何？',
    options: [
      '兩者的辨識依據完全在於顏色深淺',
      '夏多內的芳香濃度遠高於維歐尼耶',
      '兩者無法透過任何方式加以區辨',
      '維歐尼耶的芳香濃度遠高於夏多內'
    ],
    correctIndex: 3,
    explanation: '兩者皆可呈現飽滿酒體與偏低酸度，但維歐尼耶的芳香濃度遠高於夏多內，是最主要的辨識依據。'
  },
  {
    id: 'lo4-sem-001',
    lo: 4,
    sourceType: 'data-object',
    sourceId: 'semillon',
    question: 'Sémillon的薄皮特性使其比Sauvignon Blanc更容易感染什麼，並在索甸產區扮演什麼角色？',
    options: [
      '更容易感染貴腐黴，是索甸甜酒骨幹品種',
      '更不容易感染黴菌，多半釀造干型酒',
      '更容易感染灰黴病（非貴腐黴），因此多用於快速汰除的劣質酒款',
      '主要用於提升貴腐甜酒的清爽酸度，酒體與蜂蠟質地則來自白蘇維濃'
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
      '賽美蓉提供高酸與明亮果香，白蘇維濃提供酒體陳年',
      '賽美蓉提供酒體圓潤質地；白蘇維濃提供高酸果香',
      '賽美蓉主要負責提升整體甜度，白蘇維濃負責提升酒精濃度',
      '混調比例通常以白蘇維濃占絕大多數，賽美蓉僅作微量調味使用'
    ],
    correctIndex: 1,
    explanation: '兩者角色互補，賽美蓉提供酒體、圓潤質地與陳年潛力，白蘇維濃提供高酸與明亮果香。'
  },
  {
    id: 'lo4-sem-003',
    lo: 4,
    sourceType: 'data-object',
    sourceId: 'semillon',
    question: '年輕的干型Sémillon香氣相對中性平淡，容易被誤判為無特色，正確的評價方式為何？',
    options: [
      '需理解陳年後才展現實力，發展蜂蠟烤堅果層次',
      '香氣平淡是因為採收時特意提早，果實酚類尚未成熟所致',
      '香氣平淡是因為採用不鏽鋼槽發酵，未經橡木桶處理所致',
      '香氣平淡主要受年份氣候影響，與品種特性較無關'
    ],
    correctIndex: 0,
    explanation: '需理解其「陳年後才展現真正實力」的特性，陳年後會發展出蜂蠟與烤堅果般的複雜層次，這種特性使其成為波爾多白酒與獵人谷陳年白酒的經典案例。'
  },
  {
    id: 'lo4-alb-001',
    lo: 4,
    sourceType: 'data-object',
    sourceId: 'albarino',
    question: 'Albariño起源於西班牙哪個地區，品種名稱可能暗示與哪國品種的歷史關聯（此說法尚無確切DNA證據支持）？',
    options: [
      '加泰隆尼亞地區，名稱源自法語相關詞彙',
      '安達魯西亞地區，名稱源自阿拉伯語系詞彙',
      '加利西亞下海灣，名稱可能源自「白色的萊茵」',
      '里奧哈產區一帶，名稱源自拉丁語詞根'
    ],
    correctIndex: 2,
    explanation: '起源於西班牙西北部加利西亞下海灣地區，名稱可能源自「白色的萊茵」，暗示與德國白酒品種的可能歷史關聯，此說法尚無確切DNA證據支持。'
  },
  {
    id: 'lo4-alb-002',
    lo: 4,
    sourceType: 'data-object',
    sourceId: 'albarino',
    question: 'Albariño在鄰近的葡萄牙青酒（Vinho Verde）產區稱為什麼名稱，兩者差異主要來自何處？',
    options: [
      '稱為Alvarinho，差異來自風土與法規',
      '稱為Alvarinho，是Albariño與當地野生品種雜交後產生的獨立品種',
      '名稱雖相同，但兩地種植的是經數百年分別演化、基因已明顯分化的變異品系',
      '稱為Godello，是另一個西班牙品種'
    ],
    correctIndex: 0,
    explanation: '與葡萄牙版本Alvarinho為完全相同品種，差異主要來自產地風土與法規（葡萄牙版本傳統上帶微氣泡感、酒精度較低）。'
  },
  {
    id: 'lo4-alb-003',
    lo: 4,
    sourceType: 'data-object',
    sourceId: 'albarino',
    question: 'Albariño與Sauvignon Blanc相比，兩者高酸的共通點容易讓人誤判，實際風味差異為何？',
    options: [
      '白蘇維濃的海洋鹹鮮感更明顯，阿爾巴利諾草本強烈',
      '兩者主要差異在於酒精濃度高低，與香氣風味調性較無關',
      '阿爾巴利諾的海洋鹹鮮感更明顯、草本調性較弱',
      '阿爾巴利諾的可辨識香氣特徵較不明顯'
    ],
    correctIndex: 2,
    explanation: '阿爾巴利諾的海洋鹹鮮感更明顯、草本調性較弱。'
  },
  {
    id: 'lo4-bar-001',
    lo: 4,
    sourceType: 'data-object',
    sourceId: 'barbera',
    question: "1980年代Giacomo Bologna等釀酒師開始嘗試什麼做法，扭轉外界對Barbera「僅適合日常飲用」的刻板印象？",
    options: [
      '改用大型舊橡木桶延長陳年時間',
      '完全停止使用任何橡木桶，改用不鏽鋼槽',
      '改種植於氣候更冷涼的高海拔地區',
      '改用小型法國橡木桶陳釀（barrique）新工法'
    ],
    correctIndex: 3,
    explanation: "1980年代嘗試小型法國橡木桶陳釀（barrique），推出如Bricco dell'Uccellone等指標酒款，證明本品種也能釀出具陳年潛力的頂級版本。"
  },
  {
    id: 'lo4-bar-002',
    lo: 4,
    sourceType: 'data-object',
    sourceId: 'barbera',
    question: 'Barbera與同產區的Nebbiolo相比，兩者風格上的關鍵差異為何？',
    options: [
      '兩者的差異主要在於陳年潛力，單寧與顏色相近',
      'Barbera單寧輕酸高深色；Nebbiolo單寧重顏色淡',
      'Nebbiolo單寧極輕、酸度極高，Barbera則單寧極重',
      'Barbera的顏色比Nebbiolo更加淺淡許多'
    ],
    correctIndex: 1,
    explanation: 'Barbera單寧極輕、酸度極高、顏色深邃；Nebbiolo則單寧極重、顏色反而較淡、需要長期陳年軟化，兩者風格迥異，常見於同一酒莊產品線用以區隔日常款與頂級陳年款。'
  },
  {
    id: 'lo4-bar-003',
    lo: 4,
    sourceType: 'data-object',
    sourceId: 'barbera',
    question: 'Barbera的高酸度與其作為日常餐酒的定位有何關聯？',
    options: [
      '親民日常定位主要來自其低廉的生產成本，與酸度風味較無直接關聯',
      '極高酸度代表這款酒不適合搭配食物，建議單獨飲用',
      '極高酸度是其核心特徵，使其成為爽口易配餐的親民日常選擇',
      'Barbera酸度偏低，這才是親民定位的原因'
    ],
    correctIndex: 2,
    explanation: 'Barbera天生極高酸度，是其核心品種特徵之一，這種爽口特性使其長期作為義大利日常餐桌上易於配餐的親民酒款選擇。'
  },
  {
    id: 'lo4-cor-001',
    lo: 4,
    sourceType: 'data-object',
    sourceId: 'corvina',
    question: '威尼托Valpolicella產區獨特的風乾工法（Appassimento）如何將Corvina轉化為Amarone？',
    options: [
      '將葡萄直接冷凍後榨汁，如同冰酒工法一般處理',
      '採收葡萄置於閣樓風乾數月，濃縮糖分風味成Amarone',
      '將葡萄浸泡於橡木桶中長達數月後才進行發酵',
      '將葡萄浸泡於鹽水中數週，藉此加速糖分濃縮'
    ],
    correctIndex: 1,
    explanation: '將採收葡萄置於通風閣樓風乾3–4個月，大幅濃縮糖分與風味，發酵後轉化為酒精度極高的Amarone。'
  },
  {
    id: 'lo4-cor-002',
    lo: 4,
    sourceType: 'data-object',
    sourceId: 'corvina',
    question: 'Corvina與其混調搭檔Rondinella、Corvinone相比，三者在混調中的角色分工為何？',
    options: [
      '三者角色分工主要取決於採收時間先後，而非品種本身特性',
      'Rondinella是主導品種，Corvina僅補充色澤',
      'Corvinone是產量最不穩定、最少被使用的品種',
      'Corvina風味最濃是主導品種，Rondinella補色澤'
    ],
    correctIndex: 3,
    explanation: 'Corvina是三者中風味最濃郁、酸度最高的主導品種；Rondinella主要用於補充色澤與產量；Corvinone顆粒較大、糖分濃縮效果更好。'
  },
  {
    id: 'lo4-cor-003',
    lo: 4,
    sourceType: 'data-object',
    sourceId: 'corvina',
    question: 'Corvina作為傳統清爽早飲的日常紅酒，與經Appassimento工法製成的Amarone版本，兩者建議侍酒溫度有何不同？',
    options: [
      '兩者建議侍酒溫度確實不同，但差異主要來自瓶身大小，而非酒體結構的濃縮程度',
      '一般建議14–15°C，Amarone則提高至16–18°C',
      '一般建議16–18°C，Amarone降至6–8°C',
      '侍酒溫度主要取決於年份新舊，與釀造工法差異較無關'
    ],
    correctIndex: 1,
    explanation: '一般Corvina建議侍酒溫度14–15°C，Amarone版本因酒體更濃郁厚重則建議提高至16–18°C。'
  },
  {
    id: 'lo4-mon-001',
    lo: 4,
    sourceType: 'data-object',
    sourceId: 'montepulciano',
    question: 'Montepulciano品種名稱與托斯卡尼小鎮「Montepulciano」（以Sangiovese釀造Vino Nobile di Montepulciano）之間的關係為何？',
    options: [
      '兩者名稱來源不同，是經典的「同名不同義」命名陷阱',
      '小鎮名稱源自這個品種，兩者是同一件事',
      '這個品種就種植在托斯卡尼小鎮境內',
      '兩者是同一品種的不同稱呼方式而已'
    ],
    correctIndex: 0,
    explanation: '兩者完全無關，是WSET考試中經典的「同名不同義」命名陷阱——一個是品種名稱、一個是地名。'
  },
  {
    id: 'lo4-mon-002',
    lo: 4,
    sourceType: 'data-object',
    sourceId: 'montepulciano',
    question: 'Montepulciano d\'Abruzzo與Vino Nobile di Montepulciano這兩款酒名稱相似，實際差異為何？',
    options: [
      '兩者的差異主要在於陳年時間長短，使用品種相同',
      '前者用Sangiovese釀造，後者用Montepulciano品種',
      '兩者名稱雖相似，但是同一款酒的不同標示',
      '前者用Montepulciano釀造；後者用Sangiovese釀造'
    ],
    correctIndex: 3,
    explanation: '前者用Montepulciano品種釀造；後者是托斯卡尼小鎮以Sangiovese（當地稱Prugnolo Gentile）釀造，兩者品種完全不同，僅因巧合共用「Montepulciano」字樣。'
  },
  {
    id: 'lo4-mon-003',
    lo: 4,
    sourceType: 'data-object',
    sourceId: 'montepulciano',
    question: 'Montepulciano作為全球最暢銷的義大利紅酒之一，主要種植於義大利哪個地區？',
    options: [
      '皮埃蒙特',
      '阿布魯佐',
      '威尼托',
      '西西里島'
    ],
    correctIndex: 1,
    explanation: '原生於義大利中部，主要種植於阿布魯佐。'
  },
  {
    id: 'lo4-pin-001',
    lo: 4,
    sourceType: 'data-object',
    sourceId: 'pinotage',
    question: '1925年斯泰倫博斯大學教授Abraham Izak Perold以哪兩個品種雜交培育出Pinotage？',
    options: [
      '卡本內蘇維濃與梅洛兩個知名波爾多品種',
      '希哈與格那希兩個經典隆河代表品種',
      '黑皮諾與神索，因神索誤稱Hermitage而得名',
      '田帕尼優與格那希兩個西班牙代表品種'
    ],
    correctIndex: 2,
    explanation: '1925年由Perold以黑皮諾與神索雜交培育而成，因神索當時誤稱Hermitage，故得名Pinotage。'
  },
  {
    id: 'lo4-pin-002',
    lo: 4,
    sourceType: 'data-object',
    sourceId: 'pinotage',
    question: 'Pinotage雖親本之一為Pinot Noir常被誤認風味相近，但實際風格差異為何？',
    options: [
      'Pinotage單寧酒精更高帶煙燻；黑皮諾酸高單寧輕',
      '兩者的差異主要來自產區氣候，親本特性影響有限',
      '黑皮諾的單寧與酒精度皆高於Pinotage',
      'Pinotage以紅色漿果泥土氣息為主，黑皮諾帶煙燻調性'
    ],
    correctIndex: 0,
    explanation: 'Pinotage單寧與酒精度皆更高、帶有招牌煙燻／橡膠調性；黑皮諾則酸度更高、單寧更輕盈、以紅色漿果與泥土氣息為主，兩者風格截然不同。'
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
      '丙酮或指甲油般的刺鼻氣味',
      '過度氧化的雪莉酒氣味'
    ],
    correctIndex: 2,
    explanation: '品質不佳的Pinotage易出現丙酮或指甲油氣味，現代釀造工藝已大幅改善此問題。'
  },
  {
    id: 'lo4-car-001',
    lo: 4,
    sourceType: 'data-object',
    sourceId: 'carmenere',
    question: 'Carménère原是19世紀波爾多常見的混調品種之一，為何在歐洲幾近絕跡？',
    options: [
      '因政府法規強制禁止種植生產',
      '因品質低劣、逐漸被市場淘汰',
      '根瘤蚜蟲害後因難嫁接而幾近絕跡',
      '因氣候變遷導致無法適應歐洲氣候'
    ],
    correctIndex: 2,
    explanation: '根瘤蚜蟲害後因難以嫁接栽培而在歐洲幾近絕跡。'
  },
  {
    id: 'lo4-car-002',
    lo: 4,
    sourceType: 'data-object',
    sourceId: 'carmenere',
    question: '直到1994年才由誰透過葉片型態與DNA鑑定確認智利長期被誤植為Merlot的葡萄，其真實身分實為Carménère？',
    options: [
      '法國植物學家Jean-Michel Boursiquot',
      '智利釀酒師Aurelio Montes所帶領的團隊',
      '美國加州大學戴維斯分校的葡萄研究團隊',
      '義大利政府設立的葡萄品種DNA鑑定實驗室'
    ],
    correctIndex: 0,
    explanation: '1994年法國植物學家Jean-Michel Boursiquot透過葉片型態與DNA鑑定確認其真實身分，智利此後成為全球最大Carménère產區。'
  },
  {
    id: 'lo4-car-003',
    lo: 4,
    sourceType: 'data-object',
    sourceId: 'carmenere',
    question: 'Carménère與Merlot長期混淆是本品種最著名的歷史事件，兩者的關鍵區辨特徵為何？',
    options: [
      '兩者的關鍵區辨在於果串大小，而非成熟時間或香氣調性',
      '梅洛成熟期更晚，帶有明顯青椒氣息',
      'Carménère比梅洛更早熟、果香更甜熟',
      'Carménère成熟更晚帶青椒；梅洛更早熟甜熟圓潤'
    ],
    correctIndex: 3,
    explanation: 'Carménère成熟期更晚、青椒與綠色香料氣息更明顯；梅洛則更早熟、果香更甜熟圓潤，兩者葉片與果實外觀相似，但成熟期與香氣調性有明顯差異。'
  },
  {
    id: 'lo4-ver-001',
    lo: 4,
    sourceType: 'data-object',
    sourceId: 'verdicchio',
    question: 'Verdicchio在20世紀中期以什麼行銷手法推廣全球，卻也因此長期被貼上「廉價量產」標籤？',
    options: [
      '獨特的魚形酒瓶包裝行銷',
      '限量編號酒標行銷手法',
      '手工吹製水晶瓶行銷手法',
      '生肖年份特殊瓶身行銷'
    ],
    correctIndex: 0,
    explanation: '以魚形酒瓶行銷全球，成為義大利白酒能見度最高的品種之一。'
  },
  {
    id: 'lo4-ver-002',
    lo: 4,
    sourceType: 'data-object',
    sourceId: 'verdicchio',
    question: '近年Bucci、Garofoli等酒莊致力於Riserva等級的低產量釀造，證明Verdicchio的什麼特性足以支撐長期陳年？',
    options: [
      '特殊的品種糖度表現，天生極高的天然糖分',
      '天生具備的高酸度特性',
      '極低的酒精濃度表現',
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
      '兩者酒精濃度差異，Cortese遠高於Verdicchio',
      '產區不同，Verdicchio偏柑橘青蘋果，Cortese較中性',
      '兩者顏色深淺不同，Cortese顏色明顯較深',
      '兩者的差異主要來自裝瓶時間先後，品種本身風味相近'
    ],
    correctIndex: 1,
    explanation: '最可靠的辨識方式仍是產區（馬爾凱vs皮埃蒙特），Verdicchio果香更偏柑橘與青蘋果，Cortese則風格更中性寡淡，兩者風味細節也有差異。'
  },
  {
    id: 'lo4-cot-001',
    lo: 4,
    sourceType: 'data-object',
    sourceId: 'cortese',
    question: 'Cortese傳統上因風味中性、缺乏強烈品種特徵而長期被視為配角，是什麼契機讓它躍升為義大利最具國際知名度的白酒品種之一？',
    options: [
      '1990年代加入DOCG最高分級體系',
      '20世紀初被引入法國香檳區混調',
      '二戰後被聯合國正式列為保護品種',
      '1970年代後Gavi產區致力行銷推廣'
    ],
    correctIndex: 3,
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
    explanation: '官方規格明確指出Cortese是Gavi產區的唯一法定品種。'
  },
  {
    id: 'lo4-cot-003',
    lo: 4,
    sourceType: 'data-object',
    sourceId: 'cortese',
    question: 'Cortese與Verdicchio因風味中性、酸度高而常被混淆，兩者的辨識差異為何？',
    options: [
      'Cortese更寡淡內斂礦物；Verdicchio帶杏仁核果',
      '兩者的差異主要在於酸度高低，風味調性非常接近',
      'Verdicchio更寡淡內斂，Cortese帶杏仁核果調性',
      '兩者的差異純粹只在於顏色深淺不同'
    ],
    correctIndex: 0,
    explanation: 'Cortese整體風味更寡淡內斂、礦物感更明顯，Verdicchio則帶有更明顯的杏仁與核果調性，仍建議以產區作為最終辨識依據。'
  },
  {
    id: 'lo4-gar-001',
    lo: 4,
    sourceType: 'data-object',
    sourceId: 'garganega',
    question: 'Garganega在火山玄武岩地塊上發展出獨特的礦物質結構，這與東側平原什麼土壤種植的酒款形成鮮明品質落差？',
    options: [
      '花崗岩砂質土壤',
      '純黏土質地土壤',
      '礫石台地地形',
      '石灰岩沖積土壤'
    ],
    correctIndex: 3,
    explanation: '火山玄武岩地塊與東側平原石灰岩沖積土形成鮮明品質落差。'
  },
  {
    id: 'lo4-gar-002',
    lo: 4,
    sourceType: 'data-object',
    sourceId: 'garganega',
    question: '1970至80年代哪些先驅酒莊致力於提升Soave Classico核心區的品質形象，扭轉外界對Soave廉價量產的刻板印象？',
    options: [
      'Antinori、Frescobaldi等酒莊',
      'Gaja、Ceretto等知名酒莊',
      'Pieropan、Anselmi等酒莊',
      'Mastroberardino家族酒莊'
    ],
    correctIndex: 2,
    explanation: 'Pieropan、Anselmi等先驅酒莊致力於提升Classico核心區的品質形象。'
  },
  {
    id: 'lo4-gar-003',
    lo: 4,
    sourceType: 'data-object',
    sourceId: 'garganega',
    question: 'Garganega與Corvina（Valpolicella/Amarone的核心紅葡萄品種）常被一併作為教學對照組，兩者的共通與差異點為何？',
    options: [
      '兩者的共通點主要在於原產國，風乾工法與釀造方式截然不同',
      'Garganega是紅葡萄，Corvina才是白葡萄',
      '兩者風乾工法相似，但一白一紅分屬威尼托代表',
      '兩者的共通點僅止於同屬義大利原生品種，其餘特性差異極大'
    ],
    correctIndex: 2,
    explanation: '兩者風味與風乾工法皆有相似之處，但Garganega是白葡萄、Corvina是紅葡萄，分屬威尼托紅白酒的代表品種，常作為「威尼托風乾工法不限紅白酒」的教學對照組。'
  },
  {
    id: 'lo4-fia-001',
    lo: 4,
    sourceType: 'data-object',
    sourceId: 'fiano',
    question: '古羅馬時期文獻記載的「Apianum」可能即為Fiano的前身，這個名稱的由來與什麼有關？',
    options: [
      '意指蜜蜂偏愛採集其香甜果實',
      '意指品種原產於古羅馬的Apium地區',
      '意指這是修道院僧侶培育的品種',
      '意指這是專供皇室釀酒使用的品種'
    ],
    correctIndex: 0,
    explanation: '古羅馬時期文獻記載的「Apianum」意指蜜蜂偏愛採集其香甜果實。'
  },
  {
    id: 'lo4-fia-002',
    lo: 4,
    sourceType: 'data-object',
    sourceId: 'fiano',
    question: '哪個家族酒莊在20世紀是保存與復興Fiano的關鍵推手，並於1978年推出現代版Fiano di Avellino奠定其品質聲望？',
    options: [
      'Antinori家族老牌知名酒莊',
      'Gaja家族老牌頂級酒莊',
      'Bologna家族老牌知名酒莊',
      'Mastroberardino家族酒莊'
    ],
    correctIndex: 3,
    explanation: 'Mastroberardino家族酒莊是保存與復興本品種的關鍵推手。'
  },
  {
    id: 'lo4-fia-003',
    lo: 4,
    sourceType: 'data-object',
    sourceId: 'fiano',
    question: 'Fiano與Verdicchio同樣強調陳年實力而常被一併討論，兩者的風味差異為何？',
    options: [
      '兩者主要差異在於甜度，Verdicchio明顯偏甜型',
      'Verdicchio蜂蜜堅果更濃郁，Fiano走清爽柑橘路線',
      'Fiano蜂蜜堅果更濃郁；Verdicchio柑橘杏仁清爽',
      '兩者陳年實力主要來自偏高的殘糖，而非香氣物質本身'
    ],
    correctIndex: 2,
    explanation: 'Fiano的蜂蜜與堅果調性更濃郁厚實，Verdicchio則以柑橘與杏仁的清爽調性為主，兩者最可靠的辨識方式仍是產區（坎帕尼亞vs馬爾凱）。'
  },
  {
    id: 'lo4-fur-001',
    lo: 4,
    sourceType: 'data-object',
    sourceId: 'furmint',
    question: 'Furmint特別容易感染貴腐菌（Botrytis cinerea），這得益於Tokaj產區哪兩條河流交會處秋季易起的晨霧？',
    options: [
      '多瑙河與萊茵河交會之處',
      '隆河與索恩河交會之處',
      'Bodrog與Tisza兩河交會處',
      '萊茵河與摩塞爾河交會處'
    ],
    correctIndex: 2,
    explanation: 'Bodrog與Tisza兩河交會處秋季易起的晨霧，造就傳奇的Tokaji Aszú貴腐甜酒。'
  },
  {
    id: 'lo4-fur-002',
    lo: 4,
    sourceType: 'data-object',
    sourceId: 'furmint',
    question: 'Furmint除了傳統貴腐甜酒外，近年還發展出什麼獨立風格，因其高酸度與礦物感逐漸受到國際市場關注？',
    options: [
      '氣泡酒釀造風格',
      '不甜型乾白酒風格',
      '加烈酒釀造風格',
      '粉紅酒釀造風格'
    ],
    correctIndex: 1,
    explanation: '不甜型Furmint乾白酒被視為匈牙利白酒的下一波浪潮。'
  },
  {
    id: 'lo4-fur-003',
    lo: 4,
    sourceType: 'data-object',
    sourceId: 'furmint',
    question: 'Furmint與Tokaj混調搭檔Hárslevelű相比，兩者在混調中角色互補的方式為何？',
    options: [
      '兩者角色互補主要體現在甜度而非酸度骨架，Furmint負責提供圓潤甜感',
      'Hárslevelű是主導品種，Furmint只補充香氣',
      '兩者混調比例通常各占一半，並無明顯的主導與輔助品種之分',
      'Furmint酸高骨架緊是主導；Hárslevelű補充香氣複雜度'
    ],
    correctIndex: 3,
    explanation: 'Furmint酸度更高、骨架更緊實，是主導品種；Hárslevelű則香氣更奔放、帶明顯椴樹花與蜂蜜調性，用於補充香氣複雜度，兩者角色互補而非替代關係。'
  },
  {
    id: 'lo5-spk-001',
    lo: 5,
    sourceType: 'data-object',
    sourceId: 'sparkling',
    question: '氣泡酒最早可追溯至17世紀香檳區，其氣泡產生的歷史成因為何？',
    options: [
      '寒冷氣候使發酵冬天中斷，隔年殘糖意外二次發酵',
      '是釀酒師刻意設計的工法，從一開始就有意為之',
      '源自運送途中船隻長途搖晃震盪，意外產生的物理現象',
      '源自古羅馬時期就已存在的成熟釀造工藝'
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
      '確實是他發明了二次發酵產生氣泡的工法',
      '他的貢獻僅限於設計香檳酒瓶的形狀',
      '改良調配與壓榨技術，而非發明氣泡本身',
      '他發明了轉瓶（remuage）這項技術'
    ],
    correctIndex: 2,
    explanation: 'Dom Pérignon真正的貢獻是改良調配與壓榨技術，而非發明氣泡本身，這是常見的歷史迷思。'
  },
  {
    id: 'lo5-spk-003',
    lo: 5,
    sourceType: 'data-object',
    sourceId: 'sparkling',
    question: '香檳三大品種在氣泡酒混調中各司其職，下列對應何者正確？',
    options: [
      '三大品種對氣泡酒風格的貢獻程度大致相同，彼此可互相替代',
      'Chardonnay提供結構，Pinot Noir則貢獻花香與細緻酸度',
      'Chardonnay花香酸；Pinot Noir結構；Meunier圓潤',
      '香檳法規明文規定三大品種的混調比例須完全相等'
    ],
    correctIndex: 2,
    explanation: 'Chardonnay貢獻花香與細緻酸度；Pinot Noir提供結構與紅果調性；Pinot Meunier帶來早熟果香與圓潤口感，三大品種各司其職，共同構成香檳的骨架與複雜度。'
  },
  {
    id: 'lo5-spk-004',
    lo: 5,
    sourceType: 'data-object',
    sourceId: 'sparkling',
    question: 'Cava與Prosecco在葡萄品種選擇上分別依賴什麼？',
    options: [
      'Cava與Prosecco的差異主要在於陳年時間長短，使用品種相近',
      'Cava依賴Glera，Prosecco用西班牙原生品種',
      '兩者都只使用Chardonnay單一品種釀造',
      'Cava用西班牙原生品種混調；Prosecco用Glera'
    ],
    correctIndex: 3,
    explanation: 'Cava多用西班牙原生的Macabeo、Xarel·lo、Parellada混調；Prosecco則依賴Glera，各自依賴不同的原生品種組合。'
  },
  {
    id: 'lo5-spk-005',
    lo: 5,
    sourceType: 'data-object',
    sourceId: 'sparkling',
    question: 'Asti／Moscato d\'Asti的釀造思路與傳統法或水槽法氣泡酒有何根本不同？',
    options: [
      '透過額外添加天然氣泡水達到起泡效果，而非透過發酵過程產生二氧化碳',
      'Asti需要經過三次發酵，比傳統法更加複雜',
      'Asti的酒精度遠高於傳統法香檳許多',
      '僅一次發酵並提前中止，是唯一不靠二次發酵的例外'
    ],
    correctIndex: 3,
    explanation: '僅進行一次發酵並提前中止以保留天然糖分，是氣泡酒家族裡唯一不靠「二次發酵」產生氣泡的例外做法，酒精度也遠低於傳統法或水槽法氣泡酒（通常僅5–6% abv）。'
  },
  {
    id: 'lo5-spk-006',
    lo: 5,
    sourceType: 'data-object',
    sourceId: 'sparkling',
    question: '氣泡酒基酒為何特別重視高酸度保留，因此偏好什麼樣的氣候條件？',
    options: [
      '偏好溫暖氣候，因為能加速累積更高酸度',
      '偏好冷涼氣候，成熟緩慢能維持銳利酸度支撐陳年',
      '偏好日照時數最長的氣候，因為能加速糖分累積、提高基酒濃縮度',
      '偏好極端乾燥的沙漠型氣候條件'
    ],
    correctIndex: 1,
    explanation: '偏好冷涼氣候，因葡萄成熟緩慢，糖度與風味成熟前已能維持銳利酸度，這是支撐二次發酵與長期陳年的關鍵。'
  },
  {
    id: 'lo5-spk-007',
    lo: 5,
    sourceType: 'data-object',
    sourceId: 'sparkling',
    question: '香檳與英格蘭南部共享的白堊土，賦予氣泡酒什麼特有風味特徵？',
    options: [
      '特有的辛香料調性，與土壤排水能力無關',
      '特有的礦石感，因白堊土排水佳且保水適中',
      '白堊土會影響顏色，但不影響風味表現',
      '白堊土會使氣泡酒帶有明顯的甜度感'
    ],
    correctIndex: 1,
    explanation: '白堊土排水佳且保水適中，賦予酒款特有的礦石感。'
  },
  {
    id: 'lo5-spk-008',
    lo: 5,
    sourceType: 'data-object',
    sourceId: 'sparkling',
    question: '傳統法（Traditional Method）氣泡酒的二次發酵位置與酒渣接觸時間為何？',
    options: [
      '二次發酵於密閉壓力槽進行，接觸時間短',
      '二次發酵於瓶中進行，接觸時間僅數週，遠短於水槽法',
      '二次發酵於瓶中進行，酒渣接觸時間長達數年',
      '傳統法只在裝瓶前進行一次發酵，並無所謂二次發酵的額外工序'
    ],
    correctIndex: 2,
    explanation: '二次發酵於瓶中進行，酒渣接觸時間長（無年份15個月以上，年份酒3年以上），對應吐司堅果等自溶(autolysis)風味特徵。'
  },
  {
    id: 'lo5-spk-009',
    lo: 5,
    sourceType: 'data-object',
    sourceId: 'sparkling',
    question: '水槽法（Tank Method，如Prosecco所採用）與傳統法相比，在成本與風味特徵上有何差異？',
    options: [
      '水槽法成本最高、酒渣接觸時間最長',
      '水槽法的成本高於傳統法，因需要更大型的專用設備',
      '水槽法的二次發酵須在瓶中完成後才轉入大型槽體，與傳統法工序相近',
      '水槽法成本最低，風味為清新奔放品種果香'
    ],
    correctIndex: 3,
    explanation: '水槽法成本最低、酒渣接觸時間短，風味特徵為清新奔放的品種果香，而非吐司堅果調性，成本/複雜度最低，風味特徵與傳統法的自溶調性形成對比。'
  },
  {
    id: 'lo5-spk-010',
    lo: 5,
    sourceType: 'data-object',
    sourceId: 'sparkling',
    question: '轉注法（Transfer Method）的二次發酵流程為何？',
    options: [
      '與水槽法相同，直接在大型加壓槽中進行二次發酵，不經瓶中發酵階段',
      '瓶中發酵後轉入加壓槽過濾，複雜度介於兩者之間',
      '透過額外注入二氧化碳氣體達到起泡效果，並非依靠二次發酵產生',
      '轉注法的酒渣接觸時間比傳統法更長許多'
    ],
    correctIndex: 1,
    explanation: '二次發酵於瓶中進行，後轉入加壓槽，整批過濾去渣，成本／複雜度介於傳統法與水槽法之間。'
  },
  {
    id: 'lo5-spk-011',
    lo: 5,
    sourceType: 'data-object',
    sourceId: 'sparkling',
    question: '氣泡酒工藝術語中「Autolysis（酒渣自溶）」指的是什麼現象？',
    options: [
      '指葡萄本身在採收前自然發酵的一種現象',
      '指氣泡在開瓶後逐漸自然散失的過程',
      '指軟木塞因濕度不足而自然乾裂的現象',
      '死酵母細胞分解，賦予酒款吐司堅果等複雜風味'
    ],
    correctIndex: 3,
    explanation: '死酵母細胞在長時間酒渣接觸過程中分解，賦予酒款吐司、堅果等複雜風味，這正是傳統法氣泡酒長時間酒渣接觸後產生吐司、堅果調性的來源。'
  },
  {
    id: 'lo5-spk-012',
    lo: 5,
    sourceType: 'data-object',
    sourceId: 'sparkling',
    question: '「Remuage（轉瓶）」在傳統法氣泡酒工藝中的作用為何？',
    options: [
      '將瓶中酒渣集中移動至瓶頸，以利後續去渣',
      '用來調整氣泡酒最終成品的甜度風格',
      '用來混合不同年份與產區的基酒液',
      '用來提高瓶內壓力以產生更多氣泡'
    ],
    correctIndex: 0,
    explanation: '逐漸將瓶中酒渣集中移動至瓶頸，以利後續去渣（disgorgement），這是傳統法工藝中將酒渣逐漸移動集中至瓶頸的關鍵步驟。'
  },
  {
    id: 'lo5-spk-013',
    lo: 5,
    sourceType: 'data-object',
    sourceId: 'sparkling',
    question: '「Dosage（補液）」是氣泡酒工藝中的哪個步驟，其目的為何？',
    options: [
      '指二次發酵前額外添加酵母的相關步驟',
      '指裝瓶前為增加氣泡而額外注入二氧化碳',
      '指轉瓶前為了穩定溫度而進行的步驟',
      '去渣後添加糖酒混合液，調整最終甜度風格'
    ],
    correctIndex: 3,
    explanation: '去渣後添加糖與酒液的混合液，用以調整最終成品的甜度風格（如Brut、Demi-Sec等）。'
  },
  {
    id: 'lo5-spk-014',
    lo: 5,
    sourceType: 'data-object',
    sourceId: 'sparkling',
    question: '氣泡酒最常見的甜度分類「Brut」，其殘糖標準為何？',
    options: [
      '殘糖32–50g/L，屬於偏甜型分類',
      '殘糖必須完全為0，絕不允許殘糖',
      '殘糖<12g/L，是最常見的氣泡酒甜度',
      '殘糖標準因產區而異，沒有統一規定'
    ],
    correctIndex: 2,
    explanation: 'Brut是氣泡酒最主流的甜度風格。'
  },
  {
    id: 'lo5-spk-015',
    lo: 5,
    sourceType: 'data-object',
    sourceId: 'sparkling',
    question: '「Demi-Sec（半甜型）」氣泡酒的殘糖標準與「Brut」相比為何？',
    options: [
      'Demi-Sec殘糖明顯低於Brut標準',
      'Demi-Sec殘糖32–50g/L，明顯高於Brut',
      'Demi-Sec殘糖12–17g/L，僅略高於Brut標準',
      'Demi-Sec專指幾乎不含糖分的極干型'
    ],
    correctIndex: 1,
    explanation: 'Demi-Sec殘糖32–50g/L，明顯高於Brut的<12g/L。'
  },
  {
    id: 'lo5-spk-016',
    lo: 5,
    sourceType: 'data-object',
    sourceId: 'sparkling',
    question: '「Vintage」與「Non-Vintage/NV」氣泡酒的核心差異為何？',
    options: [
      'Vintage單一年份；Non-Vintage多年份調配求一致',
      'Vintage是多年份調配，Non-Vintage是單一年份',
      '兩者是同一件事，只是不同產區的稱呼',
      'Vintage專指氣泡酒的甜度分類，與年份無關'
    ],
    correctIndex: 0,
    explanation: 'Vintage為單一年份釀造，Non-Vintage則是多年份調配以維持品牌一致風格，兩者是氣泡酒重要的分類概念。'
  },
  {
    id: 'lo5-spk-017',
    lo: 5,
    sourceType: 'data-object',
    sourceId: 'sparkling',
    question: '南非對「傳統法」氣泡酒的正式稱法為何？',
    options: [
      'Cap Classique（簡稱MCC）',
      'Metodo Classico',
      'Método Tradicional',
      'Klassische Flaschengärung'
    ],
    correctIndex: 0,
    explanation: '南非對傳統法的正式稱法為Cap Classique，簡稱MCC。'
  },
  {
    id: 'lo5-spk-018',
    lo: 5,
    sourceType: 'data-object',
    sourceId: 'sparkling',
    question: '19世紀後，西班牙與義大利分別發展出什麼氣泡酒風格路線？',
    options: [
      '西班牙與義大利19世紀後放棄氣泡酒生產',
      '西班牙發展Cava、義大利發展Prosecco',
      '兩國19世紀後才首次接觸氣泡酒工藝',
      '西班牙發展Prosecco、義大利發展Cava'
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
      '為了掩蓋葡萄牙紅酒本身的品質缺陷',
      '為了符合英國當時的宗教飲酒規範',
      '讓運往英國的葡萄牙紅酒耐得住長途海運'
    ],
    correctIndex: 3,
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
      '源自葡萄牙杜羅河谷，受英國商人影響',
      '源自馬德拉島，受大航海長途海運影響',
      '源自法國波爾多，受修道院釀酒傳統影響',
      '源自西班牙赫雷斯，受摩爾人釀酒文化影響'
    ],
    correctIndex: 3,
    explanation: '雪莉酒的強化傳統更早，源自西班牙赫雷斯地區受摩爾人影響的釀酒文化。'
  },
  {
    id: 'lo5-for-004',
    lo: 5,
    sourceType: 'data-object',
    sourceId: 'fortified',
    question: '馬德拉酒獨特的「刻意加熱陳年（estufagem）」工藝，其歷史成因為何？',
    options: [
      '是釀酒師從一開始就刻意設計的工法，並無意外',
      '源自19世紀根瘤蚜蟲害後，為了模仿香檳工法而刻意發展出的技術',
      '運酒船長期暴露赤道高溫，意外發現酒質更穩定',
      '源自古羅馬時期就已經存在的加熱工藝'
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
      '馬德拉島當地的原生葡萄品種',
      '波爾多地區的原生葡萄品種',
      '杜羅河谷當地的原生葡萄品種',
      '赫雷斯地區的原生葡萄品種'
    ],
    correctIndex: 2,
    explanation: '波特酒以Touriga Nacional等杜羅河原生品種混調。'
  },
  {
    id: 'lo5-for-006',
    lo: 5,
    sourceType: 'data-object',
    sourceId: 'fortified',
    question: '雪莉酒的乾型與甜型版本分別以什麼品種為主？',
    options: [
      '乾型用PX為主，甜型用Palomino',
      '乾型用Palomino，甜型用PX或Moscatel',
      '乾型與甜型的差異主要來自陳年時間長短，使用品種相近',
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
      '四個品種由不甜到極甜的實際排序，與一般認知的順序恰好完全相反',
      '四個品種中以Sercial最常用於釀酒，其餘三者較少見',
      '對應由不甜到極甜的風格光譜，品種與甜度幾乎一一對應',
      '四個品種對應的是酒精濃度光譜，與甜度無關'
    ],
    correctIndex: 2,
    explanation: '馬德拉酒四大貴族品種對應由不甜到極甜的風格光譜，品種與甜度幾乎一一對應。'
  },
  {
    id: 'lo5-for-008',
    lo: 5,
    sourceType: 'data-object',
    sourceId: 'fortified',
    question: '杜羅河谷陡峭的片岩梯田承受夏季酷暑，這種風土條件造就了波特酒葡萄的什麼特性？',
    options: [
      '葡萄糖分極低不足',
      '極高酸度而糖分偏低',
      '使葡萄單寧含量大幅降低，整體風格趨於清淡',
      '葡萄糖分高度濃縮'
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
      '吸收陽光並加速水分快速蒸發',
      '主要透過提高土壤含鹽量來抑制葡萄過度成熟，藉此保留酸度',
      '反射陽光並在乾季保留水分',
      '使葡萄提早成熟，與酸度保留無關'
    ],
    correctIndex: 2,
    explanation: 'albariza白堊土反射陽光並在乾季保留水分，支撐Palomino在燠熱氣候下維持基本酸度。'
  },
  {
    id: 'lo5-for-010',
    lo: 5,
    sourceType: 'data-object',
    sourceId: 'fortified',
    question: '波特酒與雪莉酒/馬德拉酒相比，強化時機的關鍵差異為何？',
    options: [
      '波特酒發酵後強化；雪莉馬德拉發酵中途強化',
      '波特酒與雪莉酒的強化時機相同，馬德拉酒的做法也相近',
      '波特酒發酵中途強化；雪莉馬德拉發酵後強化',
      '強化時機與這三款酒的甜度風格關聯不大'
    ],
    correctIndex: 2,
    explanation: '波特酒於發酵中途強化，藉此提前中止發酵、保留天然糖分，這正是波特酒天生帶甜的關鍵原因；雪莉酒與馬德拉酒則於發酵完全結束後才強化，因此可以做出如Fino這類完全不甜的風格。'
  },
  {
    id: 'lo5-for-011',
    lo: 5,
    sourceType: 'data-object',
    sourceId: 'fortified',
    question: '波特酒天生帶甜的原因，與其強化時機有何直接關聯？',
    options: [
      '發酵中途強化會中止發酵，保留尚未轉化為酒精的天然糖分',
      '波特酒的甜度來自特殊酵母菌株，天生無法完全代謝葡萄中的糖分',
      '波特酒的甜度來自發酵完全結束後額外添加的葡萄濃縮汁',
      '波特酒不帶甜，甜度只是消費者的誤解'
    ],
    correctIndex: 0,
    explanation: '發酵中途強化使酒精快速升高中止酵母活動，保留尚未轉化為酒精的天然糖分。'
  },
  {
    id: 'lo5-for-012',
    lo: 5,
    sourceType: 'data-object',
    sourceId: 'fortified',
    question: '雪莉酒的Fino與Oloroso兩種主要風格，在陳年方式上的關鍵差異為何？',
    options: [
      '兩者皆採用Flor生物陳年，差異只在於陳放時間長短',
      'Fino採Flor生物陳年；Oloroso採氧化陳年',
      'Fino採氧化陳年，Oloroso則採Flor生物陳年',
      '陳年方式與兩者的風格差異關聯不大'
    ],
    correctIndex: 1,
    explanation: 'Fino採Flor生物陳年，Oloroso則採氧化陳年，Amontillado為介於兩者之間的中間風格。'
  },
  {
    id: 'lo5-for-013',
    lo: 5,
    sourceType: 'data-object',
    sourceId: 'fortified',
    question: '馬德拉酒的兩種加熱陳年方式「estufagem」與「canteiro」有何差異？',
    options: [
      'estufagem為槽內加熱，canteiro則是閣樓自然受熱',
      '兩者是同一種工法的不同稱呼，沒有實質差異',
      'estufagem是閣樓自然受熱，canteiro則是槽內加熱',
      'estufagem與canteiro皆專指瓶中陳年，與加熱無關'
    ],
    correctIndex: 0,
    explanation: 'estufagem為槽內加熱，canteiro則是閣樓自然受熱。'
  },
  {
    id: 'lo5-for-014',
    lo: 5,
    sourceType: 'data-object',
    sourceId: 'fortified',
    question: '波特酒常見風格標示中，「Tawny(茶色)」與「Ruby(寶石紅)」的風味差異方向為何？',
    options: [
      '兩者的差異主要來自裝瓶年份新舊，陳年方式相同',
      'Tawny代表年輕果香，Ruby代表氧化堅果調性',
      'Tawny與Ruby皆專指未經任何陳年的新酒',
      '由Ruby年輕果香到Tawny氧化堅果調性依序遞增'
    ],
    correctIndex: 3,
    explanation: '由Ruby、Reserve Ruby、LBV、Vintage至Tawny，由年輕果香至氧化堅果調性依序遞增，可再標示10/20/30/40年等陳年時長。'
  },
  {
    id: 'lo5-for-015',
    lo: 5,
    sourceType: 'data-object',
    sourceId: 'fortified',
    question: '雪莉酒常見風格標示中，「Fino」與「Pedro Ximénez(PX)」在甜度光譜上的位置為何？',
    options: [
      'Fino最甜，PX則最干最淡不甜',
      'Fino最干最淡，PX最濃最甜，是甜度光譜兩極端',
      '兩者甜度差異主要來自裝瓶時間先後，陳年工法相同',
      'Fino與PX皆專指同一等級的中間甜度風格'
    ],
    correctIndex: 1,
    explanation: 'Fino最干最淡，PX最濃最甜，兩者是雪莉酒甜度光譜的兩個極端。'
  },
  {
    id: 'lo5-for-016',
    lo: 5,
    sourceType: 'data-object',
    sourceId: 'fortified',
    question: '馬德拉酒與波特酒、雪莉酒相比，在「常見風格標示系統」上有何根本差異？',
    options: [
      '馬德拉酒依四大貴族品種對應甜度光譜分級，無獨立風格標示系統',
      '馬德拉酒的標示系統比波特酒更為複雜，細分超過十種等級',
      '馬德拉酒的標示系統與香檳的甜度分級（Brut/Demi-Sec）系統相同',
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
      '天然酵母膜覆蓋酒液表面進行生物陳年',
      '指馬德拉酒加熱陳年過程中產生的焦糖化反應'
    ],
    correctIndex: 2,
    explanation: '一層天然酵母膜覆蓋於酒液表面、隔絕氧氣進行生物陳年，主要用於雪莉酒Fino系風格，是雪莉酒Fino系風格的關鍵陳年機制。'
  },
  {
    id: 'lo5-for-018',
    lo: 5,
    sourceType: 'data-object',
    sourceId: 'fortified',
    question: '強化酒工藝術語「Solera System（索雷拉系統）」的核心概念為何？',
    options: [
      '指單一年份、單一酒桶的靜態陳年方式',
      '專指波特酒特有的年份標示系統',
      '多層次多年份酒桶動態混調陳年系統',
      '指馬德拉酒特有的閣樓自然受熱陳年方式'
    ],
    correctIndex: 2,
    explanation: '多層次、多年份酒桶依序疊放並定期部分抽取調配的動態混調陳年系統，常見於雪莉酒，確保成品風格的一致性。'
  }
];
