# HANDOFF

> 本檔案每次 session 結束時覆蓋重寫，不累加舊內容。最後更新：2026-07-09。

## 一、本次開發歷程

上次 session（SAT 品飲系統手風琴互斥收合，DECISIONS.md #73）已 commit（當時尚未 push）。本次接續開發：**新增「釀造工藝」頁面，僅完成氣泡酒試點卡片**（DECISIONS.md #74-75），使用者明確要求先做一款當範本、審核後才決定是否套用到其餘5款（紅/白/粉紅/橘酒/強化酒）。

### 做了什麼
- **`index.html`**：啟用導覽下拉選單裡「釀造工藝」的 `disabled` 占位項（比照「品種圖鑑」的 `onclick="selectTabFromGroup(this,'winestyles',event)"` 寫法），新增 `#panel-winestyles` 分頁容器（無色系篩選鈕，只有6張卡不需要），新增 `<script src="js/winestyles.js">`。
- **`data/wine-data.js`**：新增 `WINE_DB.wineStyles[]`（與 `classifications[]` 平行的新頂層陣列），目前僅1筆「氣泡酒 Sparkling Wine」，欄位為 `oneLiner`／`history`／`grapes`／`terroir`／`production`／`keyTerms`。
- **新增 `js/winestyles.js`**：比照 `grapes.js` 的手風琴卡片模式（不含雷達圖/Chart.js），`toggleWineStyleCard()` 從一開始就內建互斥收合邏輯（吸取 DECISIONS.md #73 的教訓，沒有拖到之後才補）。
- **`js/core.js`**：`DOMContentLoaded` 加入 `renderWineStylePanel()`。

### 內容撰寫的關鍵取捨
- **`production` 欄位刻意超出使用者給的250-350字上限（實際約380字）**：因為傳統法／水槽法／轉注法三種製程要交代清楚（liqueur de tirage、二次發酵、autolysis、remuage、disgorgement、dosage 的定義與順序），關鍵事實密度高，多次嘗試壓縮字數後判斷寧可略超字數也不犧牲技術正確性——**這個取捨尚待使用者確認是否接受**，如果覺得太長可以再要求刪減。
- **所有數字細節都是有把握的標準 WSET 教學事實**：二次發酵約產生1.2–1.3%酒精增量與約6大氣壓、香檳AOC無年份酒款最低15個月陳年（其中至少12個月在渣上）、年份酒款最低3年。**刻意不寫的部分**：Cava 的確切陳年月數法定規範（因近年法規修訂版本把握不足，只用「Cava、香檳皆採此法」帶過，未生成可能過時或不準確的具體數字）——這是使用者要求「沒把握就明講」後主動採取的保守做法。
- 字數核對用 `wc -m`，發現本機 locale 預設不是 UTF-8（`LANG` 為空），直接用 `wc -m` 會把多位元組中文字元誤算成位元組數，需要顯式加 `LC_ALL=C.UTF-8` 才能拿到正確字數——這是這次意外發現、之後如果還要核對中文字數要記得的環境細節。

### 驗證方式
headless Chrome 截圖確認卡片展開後四個子區塊（歷史文化／葡萄品種／風土／釀造方式）與 `keyTerms` 標籤皆正確渲染，配色與 Cinzel 標題字體未被更動；`--dump-dom` 確認頁面載入無 JS 錯誤；`data/wine-data.js` 新增內容後大括號／中括號配對仍平衡（1015/1015、547/547）。

**使用者審核後回饋兩點**：(1) `production` 字數超標與 Cava 陳年月數留白皆「沒關係」，內容文字本身沒問題；(2) 四個區塊視覺上混在一起、標題不夠顯眼，需要加強區分。已針對第2點修正（DECISIONS.md #76）：`buildWineStyleCardHTML()` 把五個區塊（含 Key Terms）各自包進既有的 `.ic` 卡片樣式（沿用 `regions.js` 抽屜寫法，不新增 CSS），標題加上圖示（📜🍇🌍⚗️🏷️）並改為 `--burg` 酒紅色（只在 `winestyles.js` 內用行內樣式覆蓋，未更動全站共用的 `.ins-lbl` class 本身）。headless Chrome 截圖確認五個區塊視覺上清楚分離。

以上已 commit，**尚未 push**。**本次仍只做氣泡酒一款，未套用到紅/白/粉紅/橘酒/強化酒，等使用者再次確認畫面後才決定下一步。**

## 二、討論過但尚未執行的項目／下一步規劃

- **釀造工藝頁面其餘5款（紅/白/粉紅/橘酒/強化酒）**——氣泡酒試點的內容品質與視覺分區都已通過使用者確認，下一步可以是「套用同樣的資料結構與卡片樣式擴充其餘5款」，但仍須等使用者明確下指令才動工，不要自行假設已核准而逕自擴充。
- **`wine-data.js` 的 `emoji` 欄位清理**（產區資料裡的死欄位）——建議與下次技術債清理一併處理。
- **「分級制度」頁面下一步的候選擴充方向**（先前提出、使用者尚未確認）：新世界分級概念對照章節、Rioja（第4種分級邏輯）、雙向跳轉連結。
- 地圖探索分頁座標覆蓋缺口（判定為功能規模缺口非技術債）——仍未處理。
- `auditCountryFlags()` 的 console 警告輸出尚未手動複查過。
- 是否要 push 本次 commit，尚待使用者這次對話明確指示。

## 三、我明確要求先記下來、之後再處理的內容

- **釀造工藝其餘5款內容尚待使用者確認範本品質後才擴充**（見上方）——這是本次任務使用者親自劃定的範圍界線，不是我自行決定暫緩。

## 四、現況檢查提醒

- **push 狀態**：本次 session 的 commit 尚未 push——**接手前先跑 `git log --oneline origin/main..HEAD` 確認實際領先數量**，不要直接假設。
- **本次 session 異動範圍**：`index.html`（啟用釀造工藝導覽項＋新增panel）、`data/wine-data.js`（新增 `wineStyles[]`，僅1筆）、`js/winestyles.js`（新檔＋事後依回饋修正卡片內部視覺分區）、`js/core.js`（DOMContentLoaded加一行）、`DECISIONS.md`、`HANDOFF.md`。
- **資料完整性**：`data/wine-data.js` 新增 `wineStyles[]`（1筆）後，大括號 1015/1015、中括號 547/547 配對平衡；`appellations` 91筆、`grapes` 23筆、`classifications` 7筆、`wineStyles` 1筆。
- **手風琴函式現況**：全站現有4個各自獨立、範圍鎖定各自面板的手風琴 toggle 函式——`toggleSATSection()`(`#panel-tasting`)、`toggleGrapeCard()`(`#grape-container`，另處理Chart.js銷毀)、`toggleClassCard()`(`#classification-container`)、`toggleWineStyleCard()`(`#winestyle-container`，本次新增)。都是單開邏輯，刻意不合併成共用函式（教訓見 DECISIONS.md #66）。
- **中文字數核對指令範本**：`export LC_ALL=C.UTF-8` 後再用 `printf '%s' "$content" | wc -m`，不要漏掉 locale 設定，否則字數會被誤算成位元組數（約多算2倍以上）。
- **國旗擴充提醒**（延續先前記錄）：新增新國家的產區資料時，要同步在 `js/core.js` 的 `COUNTRY_FLAG_CODE` 補上對照，並把對應的 `{國碼}.svg` 放進 `assets/flags/`。
- **已知限制／未完成的驗證**：本機環境沒有 Node.js、Python 也無法執行，所有驗證都是 headless Chrome `--dump-dom`／`--screenshot`／獨立測試頁 `.click()` 模擬，需要接手者實際操作頁面複查。
- **接手的 Claude Code 務必實際開啟異動的檔案核對真實現況**，不要只憑這份 HANDOFF.md 的文字描述去猜測。
