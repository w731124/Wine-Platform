# HANDOFF

> 本檔案每次 session 結束時覆蓋重寫，不累加舊內容。最後更新：2026-07-30。

## 一、本次開發歷程

**本次涵蓋範圍（接續上一版 HANDOFF，該版由commit `d825b86`寫入、涵蓋至#235）：分級制度頁新增4張品質階層卡片＋rioja-aging詞序修正、釀造工藝頁sparkling/fortified補上官方標籤術語、品種圖鑑資料組織重構（LO4徽章回溯標記＋分級篩選列＋三層排序）、兩排篩選列視覺統一、分級制度頁串聯強化（crossNote行內連結＋產區↔分級雙向連結）＋keyIdentifiers全站稽核常態化、三項收尾（年份矩陣例外定案／servingTemp交叉核對／稽核邏輯常態化），共8個commit。`git fetch`確認本機領先`origin/main` 1個commit，即將push。**

### 1. 分級制度頁新增4張卡片＋rioja-aging詞序修正（DECISIONS.md #236-240，commit `bbb3c38`＋`e276cb4`）
- 新增`france-aoc-pyramid`／`bordeaux-basic-hierarchy`／`alsace-grand-cru`／`veneto-classico`共4張分級卡（`WINE_DB.classifications` 12→16筆），格式完全比照既有12張卡；Cru Bourgeois現行三級制沿革因把握不足，依使用者指示只寫確定的歷史脈絡（2003分級→訴訟→撤銷→改制），不寫死不確定的最新年份。
- `rioja-aging`的`Genérico/Joven`詞序修正為`Joven/Genérico`（符合官方規格原文順序）。
- **使用者事後發現`bordeaux-basic-hierarchy`卡片的`tiers`順序反了**（由低至高，應為由高至低），已修正為`Cru Bourgeois→Bordeaux Supérieur AOC→Bordeaux AOC`，這是全站16張分級卡中唯一一次順序疏漏，提醒之後新增分級卡務必檢查`tiers`陣列順序。

### 2. 釀造工藝頁sparkling/fortified補上官方標籤術語（DECISIONS.md #241，commit `7a2c29d`）
- sparkling款`tags`陣列新增5個標籤（Brut/Demi-Sec/Vintage/Non-Vintage·NV/Traditional Method與Cap Classique並列）；fortified款`productionTable`新增「常見風格標示」列（波特Ruby-Tawny五style、雪莉Fino-PX七style）。呈現方式依「術語是否對應既有欄位分類維度」決定：能對應表格欄位的用表格擴充，無法對應的用`tags`標籤。

### 3. 品種圖鑑資料組織重構：LO4徽章回溯標記＋分級篩選列＋三層排序（DECISIONS.md #242-244，commit `01095e3`）
- 12個非原始品種（tempranillo/sangiovese/nebbiolo/grenache/malbec/zinfandel-primitivo/gamay/chenin-blanc/gewurztraminer/viognier/semillon/albarino）回溯標記`wsetLevel:'2-regional'`；`js/grapes.js`徽章文字更名為「WSET L2·主要品種」／「WSET L2·區域重要品種」。
- 新增第二列獨立分級篩選（全部/主要品種/區域重要品種/其他，數字即時動態計算不寫死）；預設列表改三層排序（分級類別→酒色紅/白→英文品種名字母序）。
- **此commit的git commit訊息一開始複製貼上錯誤**（誤植上一個LO4擴充任務的訊息），發現後立即用`git commit --amend`修正為`01095e3`，內容檔案本身沒有問題，只有訊息文字錯誤。

### 4. 統一品種圖鑑兩排篩選列視覺呈現（DECISIONS.md #245，commit `a39e549`）
- 使用者回報兩排篩選按鈕字級不一致，**實際核對computed CSS後確認font-size/font-weight/padding完全相同，並無真正差異**，落差來自emoji+文字長度造成的視覺錯覺；唯一真實落差（酒色篩選缺數量顯示）改為`renderGrapeColorFilters()`動態渲染修正。

### 5. 分級制度頁串聯強化＋keyIdentifiers全站稽核常態化（DECISIONS.md #246-251，commit `ac7db92`）
- 16筆`crossNote`新增31處行內連結（`jumpToClassificationById()`），原文字內容不變動一字；`WINE_DB.classifications`新增`relatedAppellations`欄位，`js/classifications.js`渲染「相關產區」區塊，`js/regions.js`的`openDrawer()`新增反向「查看分級制度」區塊，完成雙向連結。
- **動工過程中自行發現並修正1處crossNote核對錯誤**（`champagne-echelle`誤植`italy-docg-pyramid`的內容，寫入前重新核對原文才改正）。
- keyIdentifiers全站一致性稽核：20組確定同義詞統一＋5組邊界案例（3組統一/2組保留區分）。**核對過程也抓到3處多數/少數關係算反的錯誤**（Silky Tannin／Passionfruit／Volcanic Mineral），改用`grep -c`逐一核實後才統一。

### 6. 三項收尾（DECISIONS.md #252-255，commit `490f18d`）
- 年份矩陣4筆例外（sauternes/barsac/beaujolais/entre-deux-mers）正式裁定為刻意排除，`auditWineDB()`新增`KNOWN_VINTAGE_EXCEPTIONS`，輸出從❌改為✅已知例外。
- 33筆`servingTemp`與儲存頁5個溫度區間交叉核對，6筆超界依裁定調整品種數值（5個清淡紅酒品種`14–16→14–15°C`、Gamay`12–14→13–14°C`、Gewürztraminer`8–10→10–13°C`）；新增品種卡片↔儲存頁溫度表雙向連結。
- `auditWineDB()`新增第5/6項稽核`inconsistentVocabulary`（掃描範圍擴大到`aromaWheel`+`keyIdentifiers`兩欄位）與`servingTempMismatch`。**新稽核範圍擴大後浮現4筆`aromaWheel`裡先前刻意排除在keyIdentifiers-only稽核之外的既有案例**（`haut-medoc`/`sta-rita-hills`的`Dark Cherry(黑櫻桃)`、`marlborough`/`sauvignon-blanc`的`Passion Fruit(百香果)`），屬預期內新發現，尚未修正。

## 二、討論過但尚未執行的項目／下一步規劃

**已重新核對現況：**

- **`aromaWheel`欄位裡的4筆非標準詞彙寫法尚未修正**（見上方第6點）：`Dark Cherry(黑櫻桃)`應改`Black Cherry(黑櫻桃)`、`Passion Fruit(百香果)`應改`Passionfruit(百香果)`，皆已被新的`inconsistentVocabulary`稽核抓到並在console顯示，但這次任務範圍是「稽核邏輯常態化」而非「修正這4筆」，是否要修正、或者這4筆是否有意保留在`aromaWheel`裡不同於`keyIdentifiers`的寫法，需要使用者裁定後才動工。
- **分級制度頁的原始11項完全缺漏標籤術語，現況已部分改變**：阿爾薩斯Grand Cru／Valpolicella-Soave的Classico已透過新增分級卡解決（本次#236-238）；氣泡酒Brut/Demi-Sec/Cap Classique與雪莉/波特風格標示已透過「款式風格描述」路線解決（#241新增至釀造工藝頁的tags/表格，而非分級制度頁的tier卡）。**仍完全未處理的是Old Vine/Vieilles Vignes與Late Harvest/Vendanges Tardives**，這兩項當初就被歸類為「無法歸類到既有By酒莊/葡萄園/產區三分類」，尚待使用者決定如何處理（新增第4種分類邏輯？或另闢頁面？）。
- **現有23筆品種裡先前擴增的15個非LO3品種，是否還有其餘LO4品種需要回溯標記的疑慮已釐清**：本次#242已完整核對並補上全部12個確定屬於LO4的品種，剩餘3個（cabernet-franc/gruner-veltliner/muscat）確認不屬於官方規格範圍、維持不標記，此項不再是待辦。

## 三、我明確要求先記下來、之後再處理的內容

- 核對本次8個commit的完整對話紀錄，沒有發現使用者提出「先記下來、之後處理」但尚未處理的擱置項目（上述二、的2個項目皆已在回報時明確定調為「待裁定」，非「已承諾之後處理」）。

## 四、現況檢查提醒

- **push狀態（重要）**：本次session結束時本機**領先**`origin/main` 1個commit（本次HANDOFF.md覆寫將是最後一次commit，即將push）。**接手時務必先跑`git fetch && git status -sb`確認目前的落後/領先狀態**，不要假設本機一定是最新或一定已同步。
- **`auditWineDB()`現在有6項稽核**（缺少地圖座標／缺少比較模式profile／法國產區未綁定年份矩陣／詞彙一致性`inconsistentVocabulary`／侍酒溫度區間`servingTempMismatch`，加上整體通過判斷），新增已知例外時比照既有`KNOWN_VINTAGE_EXCEPTIONS`／`KNOWN_SERVING_TEMP_STRADDLE_EXCEPTIONS`的模式（獨立常數＋輸出時區分✅已知例外與❌真正警告），不要直接把例外硬編碼進判斷式裡，維持這個站內已建立的稽核設計慣例。
- **`CANONICAL_VOCABULARY_MAP`（`js/core.js`）是全站詞彙統一的唯一事實來源**：日後若新增品種或產區資料時用了容易與既有詞彙混淆的英文/中文寫法，`auditWineDB()`會自動抓到並警告，若確認是新的同義詞情況，記得同步更新這個常數而不是只在資料層面修正。
- **本機環境限制（沿用既往）**：沒有Node.js，`python3`/`python`是Windows Store空殼；headless Chrome路徑固定在`C:\Program Files\Google\Chrome\Application\chrome.exe`；`_devserver.ps1`已修復UTF-8 BOM問題，之後直接沿用即可，不需重新排查。
- **`project-snapshot.md`目前已經過時**：本次8個commit皆未重新產生此檔案，快取內容明顯落後於當前程式碼。這份檔案每次有新commit後都會過時，如果使用者需要更新版本要重新產生，不要假設現有內容反映最新狀態。
- **接手的Claude Code務必實際開啟異動的檔案核對真實現況**，不要只憑這份HANDOFF.md的文字描述去猜測——本次session本身就有3次「先核對才發現自己或先前報告有誤」的案例（champagne-echelle內容誤植、3組詞彙多數/少數算反、commit訊息複製貼上錯誤），這是最好的示範：即使是同一個session裡剛做的核對，也可能出錯，重新核對永遠是必要的。
