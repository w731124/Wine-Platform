# HANDOFF

> 本檔案每次 session 結束時覆蓋重寫，不累加舊內容。最後更新：2026-07-09。

## 一、本次開發歷程

上次階段完成「釀造工藝」頁面的氣泡酒試點卡片並經兩輪視覺修正確認（DECISIONS.md #74-77）。本次接續：**使用者確認氣泡酒範本OK後，一次補完其餘5款（紅／白／粉紅／橘酒／強化酒），「釀造工藝」六大分類全部完成**（DECISIONS.md #78-79）。

### 做了什麼
- **僅異動 `data/wine-data.js`**：`WINE_DB.wineStyles[]` 依序新增 `red`／`white`／`rose`／`orange`／`fortified` 五筆，欄位結構（`oneLiner`／`history`／`grapes`／`terroir`／`production`）與字數區間比照氣泡酒，圖示分別為 🍷／🥂／🌸／🧡／🥃。
- **`js/winestyles.js`／`index.html`／`js/core.js` 完全不需改動**——渲染邏輯（`buildWineStyleCardHTML()`／`toggleWineStyleCard()`）與卡片樣式（先前已修正過的 `.ic` 白底卡片）純資料驅動，驗證了架構設計沒有預留單一酒款硬編碼的邏輯。

### 內容涵蓋的關鍵事實（供之後核實或延伸）
- 紅酒：25–30°C發酵溫度、pigeage/remontage萃取工法、乳酸發酵（MLF）幾乎是標配。
- 白酒：12–18°C低溫發酵、débourbage澄清、MLF在芳香品種常被刻意阻擋以保留酸度。
- 粉紅酒：直接壓榨法／短時間浸皮法／放血法（Saignée）三種製法區分。
- 橘酒：喬治亞qvevri傳統、Josko Gravner帶動的1990年代自然酒復興。
- 強化酒：波特酒發酵中強化（19–22% abv）、雪莉酒發酵後強化並以約15%為酒花（flor）存活分界、Solera逐年混調系統、馬德拉estufagem／canteiro加熱陳年。
- 以上皆屬 WSET Level 2/3 標準教材內容，撰寫時未生成任何不確定的具體數字（延續氣泡酒試點「沒把握就明講」的原則）。

### 驗證方式
headless Chrome 截圖確認全部6張卡片正確顯示於同一份手風琴清單、單一展開收合行為正常（跨卡片切換會自動收合前一張），紅酒與強化酒卡片展開內容逐區塊核對無破版；`--dump-dom` 確認無 JS 錯誤；`data/wine-data.js` 新增5筆後大括號／中括號配對仍平衡（1020/1020、546/546），`wineStyles` 陣列共6筆。

以上已 commit，**尚未 push**。**「釀造工藝」六大分類（紅/白/粉紅/橘酒/氣泡酒/強化酒）內容至此全部完成。**

## 二、討論過但尚未執行的項目／下一步規劃

- **`wine-data.js` 的 `emoji` 欄位清理**（產區資料裡的死欄位）——建議與下次技術債清理一併處理。
- **「分級制度」頁面下一步的候選擴充方向**（先前提出、使用者尚未確認）：新世界分級概念對照章節、Rioja（第4種分級邏輯）、雙向跳轉連結。
- 地圖探索分頁座標覆蓋缺口（判定為功能規模缺口非技術債）——仍未處理。
- `auditCountryFlags()` 的 console 警告輸出尚未手動複查過。
- 「釀造工藝」六款卡片彼此之間目前沒有交叉連結（例如粉紅酒/橘酒可提及「與紅白酒工藝的差異對照」），若使用者未來想強化教學脈絡可考慮比照 `classifications.js` 的 `crossNote` 欄位模式補上，但這是未經確認的推測方向，不要自行動工。
- 是否要 push 本次 commit，尚待使用者這次對話明確指示。

## 三、我明確要求先記下來、之後再處理的內容

- 目前沒有新的「先記下來、之後處理」項目——「釀造工藝」的範圍界線（先做氣泡酒試點、確認後才擴充）已在本次完成，不再是待處理項目。

## 四、現況檢查提醒

- **push 狀態**：本次 session 的 commit 尚未 push——**接手前先跑 `git log --oneline origin/main..HEAD` 確認實際領先數量**，不要直接假設。
- **本次 session 異動範圍**：僅 `data/wine-data.js`（`wineStyles[]` 從1筆補到6筆）、`DECISIONS.md`、`HANDOFF.md`。
- **資料完整性**：`data/wine-data.js` 大括號 1020/1020、中括號 546/546 配對平衡；`appellations` 91筆、`grapes` 23筆、`classifications` 7筆、`wineStyles` 6筆（紅/白/粉紅/橘酒/氣泡酒/強化酒，皆無 `keyTerms` 欄位）。
- **手風琴函式現況**：全站現有4個各自獨立、範圍鎖定各自面板的手風琴 toggle 函式——`toggleSATSection()`(`#panel-tasting`)、`toggleGrapeCard()`(`#grape-container`，另處理Chart.js銷毀)、`toggleClassCard()`(`#classification-container`)、`toggleWineStyleCard()`(`#winestyle-container`)。都是單開邏輯，刻意不合併成共用函式（教訓見 DECISIONS.md #66）。
- **中文字數核對指令範本**：`export LC_ALL=C.UTF-8` 後再用 `printf '%s' "$content" | wc -m`，不要漏掉 locale 設定，否則字數會被誤算成位元組數。
- **`.ic` 卡片套色提醒**：`.ic` 的預設背景是 `var(--bg-el)`，如果要疊加在同樣是 `--bg-el` 背景的容器裡（例如 `.acc-body`），會完全撞色看不出卡片邊界，需要另外用行內樣式覆蓋成 `var(--bg-card)`（白色）；`.ic` 在產區抽屜（`.drawer`，白底）上不會有這個問題，套用前先確認父層背景色。
- **國旗擴充提醒**（延續先前記錄）：新增新國家的產區資料時，要同步在 `js/core.js` 的 `COUNTRY_FLAG_CODE` 補上對照，並把對應的 `{國碼}.svg` 放進 `assets/flags/`。
- **已知限制／未完成的驗證**：本機環境沒有 Node.js、Python 也無法執行，所有驗證都是 headless Chrome `--dump-dom`／`--screenshot`／獨立測試頁 `.click()` 模擬，需要接手者實際操作頁面複查；本次5款新內容的技術細節雖遵循「有把握才寫」原則，但未經使用者逐款像氣泡酒那樣的第一輪／第二輪內容審核，接手前建議提醒使用者確認。
- **接手的 Claude Code 務必實際開啟異動的檔案核對真實現況**，不要只憑這份 HANDOFF.md 的文字描述去猜測。
