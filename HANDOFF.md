# HANDOFF

> 本檔案每次 session 結束時覆蓋重寫，不累加舊內容。最後更新：2026-07-29。

## 一、本次開發歷程

**本次涵蓋範圍（接續上一版 HANDOFF，該版由commit `da0a595`寫入、涵蓋至#222）：CLAUDE.md新增HANDOFF覆寫時機規則、4項技術債清理、新增「儲存與侍酒」頁面、分級制度/釀造工藝兩頁的WSET官方規格核對、sparkling補寫Moscato/Asti、品種資料庫擴充WSET L2 LO4的10個缺席品種，共6批工作。`git fetch`確認本機領先`origin/main` 8個commit，即將push。**

### 1. CLAUDE.md新增規則：HANDOFF.md覆寫時機（DECISIONS.md #224，commit `3e30b59`）
- 使用者採用提案：HANDOFF.md的覆寫必須是該次session最後一個git commit的一部分，不得在session中途、預期後續仍有其他改動時提前寫入並視為完成。此規則的採用背景見上一版HANDOFF記載的「教訓」。

### 2. 技術債清理：4項候選技術債逐一核對後修復（DECISIONS.md #225-226，commit `46940d1`）
- 比照#51方法論，逐項核對現況是否仍成立而非照單直接動工：
  1. `--fs-label`CSS變數——確認仍是孤兒（全站僅`:root`定義本身一處），已刪除。
  2. France/Italy/Iberia建置腳本CRLF正規式錯誤——確認仍存在且可重現（實際執行`build-france-map.pl`得到exit 255），3支腳本正規式比照`build-germany-map.pl`改為`\r?\n`，改完重新執行皆exit 0。
  3. `WINE_DB.wineStyles`的`production`備份欄位——確認仍是死欄位且與`productionSteps`/`productionTable`無語意分歧，使用者裁定直接刪除，6個物件的`production:`欄位全數移除。
  4. 響應式報告「3項輕微瑕疵」——**核對發現報告本身計數（寫3）與實際內容（僅2項）不一致**：地圖探索標題375px換行、年份詳情卡2欄/3欄grid窄螢幕換行，這2項原判定「非阻塞可接受」，使用者確認後仍予以修復（`index.html`媒體查詢+`.vmi-grid2`/`.vmi-grid3`class）。
- 過程中發現`_devserver.ps1`因缺少UTF-8 BOM、導致Windows PowerShell 5.1用系統ANSI codepage誤讀腳本裡的CJK路徑字面量而全部回傳404，已修復（改用`Set-Content -Encoding UTF8`加回BOM）。

### 3. 新增「儲存與侍酒」頁面＋品飲系統頁補熱害卡片（DECISIONS.md #227-228，commit `74fcf6f`）
- 依WSET L2 LO6新增`#panel-storage`（比照07-11食物搭配面板做法，`switchToPanel`通用邏輯不需修改），5張手風琴卡片：理想儲存條件、開瓶後保存方式、建議侍酒溫度（業界慣用具體區間，官方規格僅定性描述）、開瓶與醒酒程序、常見酒缺陷關聯。
- 核對發現品飲系統頁「常見酒缺陷」清單缺少「熱害」項目，與需求前提不符，取得確認後同步新增第6項缺陷卡片，並新增`js/core.js`的`jumpToFaultById()`建立兩頁雙向捲動連結。

### 4. 分級制度頁／釀造工藝頁WSET官方規格核對（純核對，未寫入獨立commit，結果已於對話中提供）
- 分級制度頁對WSET 25項標籤術語核對：已涵蓋7項／部分涵蓋7項／完全缺漏11項，缺漏集中在氣泡酒/加烈酒風格標示（Brut/Demi-Sec/Fino-PX/Ruby-Tawny全數缺漏）與各國陳年/風格副標示（Old Vine、Late Harvest、Classico等）。
- 釀造工藝頁6款式字數現況：`history`156–203字、`grapes`131–155字（後因#231變動）、`terroir`97–149字，DECISIONS.md並未留下如產區資料庫「150-200字」般的明確數字基準；sparkling/fortified技術覆蓋率比對LO5：fortified完整涵蓋，sparkling原本缺Moscato/Asti風格（已於#231補上）。

### 5. sparkling補上Moscato/Asti段落（DECISIONS.md #231，commit `df70103`）
- 使用者裁定不統一terroir字數基準，但確認補寫#230抓到的內容缺口：sparkling的`grapes`欄位新增Moscato d'Asti品種與單次發酵風格說明，連結既有`muscat`品種卡片。

### 6. 品種資料庫擴充：WSET L2 LO4「區域重要品種」10個缺席品種（DECISIONS.md #232-235，commit `66d49bc`）
- 核對10個候選品種對應產區現況，**發現3項與原始清單描述不符**：Montepulciano d'Abruzzo與Verdicchio dei Castelli di Jesi其實已存在（非預期的「完全缺席」）、Carménère既有拼法是雙重音符而非單一重音符。避免了重複新增已存在的產區。
- 新增10筆品種資料（`WINE_DB.grapes` 23→33）、4筆產區資料（`WINE_DB.appellations` 106→110：Barbera d'Asti/Gavi/Fiano di Avellino/Tokaj），Tokaj是網站首筆匈牙利資料，同步新增`assets/flags/hu.svg`與`COUNTRY_FLAG_CODE`。
- 新增`wsetLevel:'2-regional'`欄位＋金色「WSET L2·LO4」徽章區分LO3/LO4品種（使用者在「新增語意欄位」vs「不區分」兩選項中選前者）。
- `auditWineDB()`驗證：義大利3筆新產區因既有動態座標投影邏輯自動標記於Italy地圖（比照#220葡萄牙案例，非刻意實作），僅Tokaj因無地圖覆蓋落入「缺少地圖座標」清單（預期內、非新類型警告）。

## 二、討論過但尚未執行的項目／下一步規劃

**已重新核對現況：**

- **上一版記載的「響應式報告3項輕微瑕疵」已解決**：本次確認實際只有2項具體案例（非3項，報告本身計數有誤），且這2項（地圖標題換行、年份詳情卡grid）皆已於本次#226修復，此項不再是待辦。
- **分級制度頁的11項完全缺漏標籤術語（氣泡酒/加烈酒風格標示、Old Vine等）目前僅止於核對回報，尚未動工修復**——是否要擴充分級制度頁的分類邏輯（例如新增「By 甜度/風格」第4種分類）或另闢新頁面承接這些不屬於現有「By酒莊/葡萄園/產區」三分類的標籤，需要使用者決定方向後才能動工。
- **現有23筆品種裡先前擴增的15個非LO3品種，尚未逐一核對哪些屬於官方LO4其餘12個品種而應一併回溯標記`wsetLevel:'2-regional'`**——這是#233明確記錄的任務範圍外缺口，本次選擇不擴大稽核，留待日後單獨處理。
- **舊世界產區擴充（France/Italy/Spain/Germany）持續有零星進展但未系統化**：本次因LO4品種任務新增了3筆義大利產區（Barbera d'Asti/Gavi/Fiano di Avellino），法國/西班牙/德國目前仍無新進展。

## 三、我明確要求先記下來、之後再處理的內容

- 核對本次6批工作的完整對話紀錄，沒有發現使用者提出「先記下來、之後處理」但尚未處理的擱置項目（上述二、的3個項目皆已在回報時明確定調為「範圍外/待決定方向」，非「已承諾之後處理」）。

## 四、現況檢查提醒

- **push狀態（重要）**：本次session結束時本機**領先**`origin/main` 8個commit（`3e30b59`→`66d49bc`，即將push）。**接手時務必先跑`git fetch && git status -sb`確認目前的落後/領先狀態**，不要假設本機一定是最新或一定已同步。
- **本機環境限制（沿用既往，本次新增一項教訓）**：沒有Node.js，`python3`/`python`是Windows Store空殼；headless Chrome路徑固定在`C:\Program Files\Google\Chrome\Application\chrome.exe`。驗證方式：PowerShell內建`System.Net.HttpListener`起靜態伺服器＋`System.Net.WebSockets.ClientWebSocket`手動驅動headless Chrome DevTools Protocol。**新教訓：`_devserver.ps1`這類含CJK路徑字面量的.ps1腳本，檔案本身必須帶UTF-8 BOM，否則Windows PowerShell 5.1會用系統ANSI codepage誤讀而導致路徑全部讀錯（本次因此排查了一段時間才發現是編碼問題而非邏輯錯誤）**，scratchpad裡的`_devserver.ps1`已修復並帶BOM，之後直接沿用即可。
- **`--fs-label`孤兒變數已刪除**（本次#225清理），若之後又看到類似`--fs-*`變數零使用情況，可比照本次方法核對後清理。
- **3支建置腳本（France/Italy/Iberia）的CRLF regex已修復**（本次#225），與`build-germany-map.pl`一致使用`\r?\n`，之後重跑舊腳本不會再因換行符不符而失敗。
- **分級制度頁對WSET官方25項標籤術語的核對結果（7項已涵蓋/7項部分涵蓋/11項完全缺漏）已回報但未修復**，接手時可主動詢問使用者是否要排入優先序。
- **`project-snapshot.md`目前已經過時**：本次多批工作皆未重新產生此檔案，快取內容明顯落後於當前程式碼。這份檔案每次有新commit後都會過時，如果使用者需要更新版本要重新產生，不要假設現有內容反映最新狀態。
- **接手的Claude Code務必實際開啟異動的檔案核對真實現況**，不要只憑這份HANDOFF.md的文字描述去猜測。
