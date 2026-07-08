# HANDOFF

> 本檔案每次 session 結束時覆蓋重寫，不累加舊內容。最後更新：2026-07-08。

## 一、本次開發歷程

延續上次「頂層導覽列改版」收尾的三個視覺 bug 修正（DECISIONS.md #58-60），本次 session 開發了**「分級制度」頁面的第一批內容**（DECISIONS.md #61-65），這是導覽列改版時預留的 disabled 停用項目第一次真正被啟用；隨後修正了使用者回報的手風琴多開 bug（DECISIONS.md #66）。

### 做了什麼
- **新增 `WINE_DB.classifications[]` 資料陣列**（`data/wine-data.js`，插在 `grapes[]` 陣列與 `vintages{}` 之間）：7筆分級系統資料，法國3套（1855 Cru Classé、Saint-Émilion Classification、Grand Cru/Premier Cru、Échelle des Crus）＋義大利4套（DOCG/DOC/IGT/VdT、Barolo/Barbaresco MGA、Chianti Classico Gran Selezione）。每筆含 `basis`（`estate`／`vineyard`／`region`，即「By酒莊／By葡萄園／By產區」三種分級邏輯）、`tiers[]`（分級層級）、`history`、`crossNote`（跨區對照說明）。
- **新增 `js/classifications.js`**：`renderClassificationPanel()` 依 `basis` 篩選＋依 `country` 分組渲染，`buildClassificationCardHTML()` 組出手風琴卡片，`toggleClassCard()` 負責單一展開收合（過程中曾短暫沿用 `core.js` 的 `toggleSATSection()`，因該函式是多開邏輯不符合這裡的需求，被使用者回報後改寫成獨立函式，詳見下方「中途發現的落差」）。
- **`index.html`**：把導覽下拉選單裡「分級制度（即將推出）」的 `disabled` 項目改為可點擊（`onclick="selectTabFromGroup(this,'classifications',event)"`），新增 `<div id="panel-classifications">` 內容區塊（含 `全部/By Estate/By Vineyard/By Region` 篩選按鈕＋容器），新增 `<script src="js/classifications.js">`。
- **`js/core.js`**：`DOMContentLoaded` 初始化流程加入 `renderClassificationPanel()`。

### 中途發現的落差／內容判斷
- 撰寫 `crossNote` 時發現法義之間可以整理出3組「同邏輯跨國對照」（By酒莊：1855 vs Chianti Gran Selezione；By葡萄園：勃根地 vs Barolo MGA；By產區：香檳村莊制 vs 義大利DOCG），這比單純逐一介紹更貼近使用者「列出不同國家、不同產區分級方式」的教學意圖，因此主動加強了這部分的敘事份量，超出候選清單原本只是「列出7套系統」的最低要求。
- `history` 欄位保留了兩個具爭議/反直覺的個案（Saint-Émilion 重評制引發酒莊提告、Super Tuscan 因不符合傳統混調規定被迫標示最低階 VdT 卻催生 IGT 新等級）——這是主動的內容判斷，未事先與使用者確認，如果覺得偏離「精省」原則可以要求刪減。
- **手風琴共用判斷失準**：一開始判斷 `toggleSATSection()`「邏輯純粹操作 open class、無 SAT 頁面專屬依賴，可安全跨頁重用」，這個判斷本身沒錯，但漏了「該不該單開」是每個頁面的產品行為決定而非函式本身的技術屬性——SAT 頁面設計成可多段落同開參考，分級制度頁面則需要單開避免版面過長。使用者實際操作後回報「點別的卡片原本的應該收合」，才發現這個落差，修正為新寫 `toggleClassCard()`。教訓：**函式邏輯通用不代表跨頁面的互動行為需求也相同**，之後新增手風琴頁面要先確認單開/多開需求，不要預設沿用。

### 驗證方式
用 headless Chrome 對正式 `index.html` 截圖驗證：(1) 從導覽列點入分級制度頁面，確認7套系統依國家分組正確顯示；(2) 點擊「By Vineyard」篩選器，確認僅顯示勃根地與Barolo MGA兩套；(3) 展開卡片確認分級層級／歷史背景／跨區對照三區塊正確渲染；(4) 模擬依序點擊卡片0與卡片2，確認卡片0自動收合、卡片2維持展開（單開行為修正後）。另用 `--dump-dom` 確認新增資料與新腳本載入後無 JS 錯誤，並用大括號／中括號配對計數確認 `wine-data.js` 新增內容後結構仍平衡（1014/1014、545/545）。

以上已 commit 並 **push 到 origin/main**（本次收尾同步完成）。

## 二、討論過但尚未執行的項目／下一步規劃

- **「分級制度」頁面下一步的候選擴充方向**（本次 session 未討論細節，僅是我基於已完成內容推測的自然延伸，需使用者確認才能動工）：
  - 新世界是否要納入分級概念（如美國 AVA 屬純地理標示、無官方品質分級，可作為「舊世界 vs 新世界分級哲學差異」的對照章節）
  - 是否要新增 Rioja（西班牙 Crianza/Reserva/Gran Reserva，By 陳年時間而非By酒莊/葡萄園/產區，會是第4種分級邏輯）
  - 是否要幫每套系統補上對應的 `representativeRegions` 或 `representativeGrapes` 連結，比照產區↔品種的雙向跳轉模式
- **「釀造工藝」頁面**（紅白粉橘氣泡強化酒的釀造過程差異）——導覽結構已預留位置，仍是 disabled 停用項目，內容完全未開始，需另外確認範圍。
- 地圖探索分頁座標覆蓋缺口（判定為功能規模缺口非技術債）——仍未處理。

## 三、我明確要求先記下來、之後再處理的內容

- 目前沒有新的「先記下來、之後處理」項目——上次記錄的「分級制度／釀造工藝待建立」已有一半（分級制度）在本次 session 完成第一批內容，「釀造工藝」仍待處理，維持原狀。

## 四、現況檢查提醒

- **push 狀態**：本次 session 的3個 commit（分級制度新增、單開手風琴修正、本次收尾同步）已全部 push 到 origin/main，`git status` 應顯示 up to date——**接手前仍建議先跑 `git log --oneline origin/main..HEAD` 確認實際狀態**，不要直接假設。
- **資料完整性核對結果**：`data/wine-data.js` 新增 `classifications[]` 陣列（7筆）後，大括號 1014 開／1014 閉、中括號 545 開／545 閉，配對平衡；`appellations` 91筆、`grapes` 23筆維持不變（本次未異動這兩個陣列）。
- **本次 session 異動範圍**：`data/wine-data.js`（新增 `classifications[]`）、`js/classifications.js`（新檔）、`index.html`（導覽項目啟用＋新增 panel＋新增 script include）、`js/core.js`（DOMContentLoaded 加一行）、`DECISIONS.md`、`HANDOFF.md`。
- **已知限制／未完成的驗證**：
  - 分級制度頁面目前**沒有**跟產區資料庫或品種圖鑑做雙向跳轉連結（不像 `regions.js`/`grapes.js` 之間已有的 `jumpToGrapeById`/`jumpToRegionById`）——`classifications[]` 目前也沒有欄位可以掛這種連結，這是刻意的最小範圍實作，見上方「下一步規劃」。
  - 本機環境沒有 Node.js、Python 也無法執行，所有驗證都是 headless Chrome `--dump-dom` ／ `--screenshot` ／ bash `grep -o | wc -l` 計數，抓不到 JS 語法本身以外的邏輯錯誤，需要接手者實際操作頁面複查。
- **手風琴行為提醒**：`classifications.js` 有自己的 `toggleClassCard()`（單開，不涉及圖表銷毀），`core.js` 的 `toggleSATSection()`（多開）維持只給 SAT 頁面使用，兩者不要互相取代——新增手風琴頁面時先確認該頁面該單開還是多開。
- **接手的 Claude Code 務必實際開啟異動的檔案核對真實現況**，不要只憑這份 HANDOFF.md 的文字描述去猜測。
