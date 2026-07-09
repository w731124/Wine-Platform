# HANDOFF

> 本檔案每次 session 結束時覆蓋重寫，不累加舊內容。最後更新：2026-07-09。

## 一、本次開發歷程

上次 session（國旗顯示改用自架 SVG，DECISIONS.md #69-72）已 commit（當時尚未 push）。本次接續開發：**SAT 品飲系統四張卡片改為手風琴互斥收合**（DECISIONS.md #73）。

### 做了什麼
- **`js/core.js` 的 `toggleSATSection()`**：加入收合其他已展開卡片的邏輯，查詢範圍鎖定 `#panel-tasting .acc-hdr.open`。直接比照 `grapes.js` 的 `toggleGrapeCard()` 寫法移植，差別只在不需要 `grapeRadarInsts.destroy()`（SAT卡片沒有圖表資源要銷毀）。這是使用者已指定範本的機械式移植，沒有額外設計判斷。

### 驗證方式
用 headless Chrome 模擬依序點擊卡片0與卡片2，確認卡片0自動收合、卡片2維持展開，並將每張卡片的 open 狀態即時印在頁面上核對截圖無誤。另用 `--dump-dom` 確認頁面載入無 JS 錯誤。

以上已 commit，**尚未 push**。

## 二、討論過但尚未執行的項目／下一步規劃

- **`wine-data.js` 的 `emoji` 欄位清理**（上次 session 發現的死欄位，91筆產區資料裡已無程式碼讀取）——建議與下次技術債清理一併處理，屬於低風險的機械式刪除。
- **「分級制度」頁面下一步的候選擴充方向**（先前提出、使用者尚未確認）：新世界分級概念對照章節、Rioja（By陳年時間，第4種分級邏輯）、幫每套系統補上 `representativeRegions`/`representativeGrapes` 雙向跳轉連結。
- **「釀造工藝」頁面**（紅白粉橘氣泡強化酒的釀造過程差異）——導覽結構已預留位置，仍是 disabled 停用項目，內容完全未開始。
- 地圖探索分頁座標覆蓋缺口（判定為功能規模缺口非技術債）——仍未處理。
- `auditCountryFlags()` 的 console 警告輸出尚未手動複查過（上次 session 遺留的待確認項目）。
- 是否要 push 本次 commit，尚待使用者這次對話明確指示。

## 三、我明確要求先記下來、之後再處理的內容

- 目前沒有新的「先記下來、之後處理」項目，維持先前記錄的「釀造工藝待建立」原狀。

## 四、現況檢查提醒

- **push 狀態**：本次 session 的 commit 尚未 push——**接手前先跑 `git log --oneline origin/main..HEAD` 確認實際領先數量**，不要直接假設。
- **本次 session 異動範圍**：`js/core.js`（`toggleSATSection()` 加入單開邏輯）、`DECISIONS.md`、`HANDOFF.md`。**未異動其他任何檔案**。
- **資料完整性**：本次未異動資料檔，維持先前核對結果（大括號 1014/1014、中括號 545/545 配對平衡；`appellations` 91筆、`grapes` 23筆、`classifications` 7筆）。
- **手風琴行為現況（已更新，注意跟舊記錄不同）**：目前全站有兩個獨立的手風琴 toggle 函式——`core.js` 的 `toggleSATSection()`（現在是**單開**，範圍鎖定 `#panel-tasting`，本次修改）與 `grapes.js` 的 `toggleGrapeCard()`（單開，範圍鎖定 `#grape-container`，另外處理 Chart.js 銷毀）；`classifications.js` 的 `toggleClassCard()`（單開，範圍鎖定 `#classification-container`，DECISIONS.md #66）。三者邏輯相似但個別鎖定各自面板範圍、互不呼叫，這是刻意的設計（教訓見 DECISIONS.md #66：函式邏輯通用不代表跨頁面重用是對的），新增手風琴頁面時比照這個模式各自建立，不要嘗試合併成一個共用函式。
- **國旗擴充提醒**（延續上次記錄）：新增新國家的產區資料時，要同步在 `js/core.js` 的 `COUNTRY_FLAG_CODE` 補上對照，並把對應的 `{國碼}.svg` 放進 `assets/flags/`，兩者都要做。
- **已知限制／未完成的驗證**：本機環境沒有 Node.js、Python 也無法執行，所有驗證都是 headless Chrome `--dump-dom`／`--screenshot`／獨立測試頁 `.click()` 模擬，抓不到 JS 語法本身以外的邏輯錯誤，需要接手者實際操作頁面複查。
- **接手的 Claude Code 務必實際開啟異動的檔案核對真實現況**，不要只憑這份 HANDOFF.md 的文字描述去猜測。
