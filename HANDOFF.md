# HANDOFF

> 本檔案每次 session 結束時覆蓋重寫，不累加舊內容。最後更新：2026-07-09。

## 一、本次開發歷程

**地圖探索法國面板重建（試點，只做法國，義大利/伊比利面板不動）：三階段＋收尾修正全部完成：**

- **Stage 1（DECISIONS.md #80）**：35筆法國產區新增 `coords:{lat,lng}` 經緯度欄位。
- **Stage 2（DECISIONS.md #81-86）**：真實省份邊界資料＋投影運算，六大產區形狀改用凸包（convex hull）。
- **工具化（DECISIONS.md #87-88）**：整合成 `scripts/build-france-map.pl`，可重跑。
- **Stage 3（DECISIONS.md #89-92）**：標記文字改為編號徽章＋側邊產區索引清單，擴大到全部35筆。
- **收尾修正（本次完成，DECISIONS.md #93-96）**：標記碰撞避讓、真實河流、側邊清單 hover 連動地圖。

### 本次做了什麼
1. **標記碰撞避讓**：使用者回報「部分產區重疊過高，某些產地無法點擊」（35筆擴大後波爾多群集才浮現的問題）。`js/map.js` 新增 `declutterPoints()`，在 `renderFranceMarkers()` 投影完座標、渲染前用簡單相互推擠演算法把距離小於17px的標記推開（最多150輪迭代），只調整視覺位置不動 `WINE_DB` 原始座標。驗證後最近兩點間距16.96px，確認所有35個標記都能個別點擊。
2. **真實河流**：`scripts/build-france-map.pl` 新增抓取 Loire／Rhône／Garonne 河道資料（來源 Natural Earth 1:50m，`martynafford/natural-earth-geojson` 專案），用同一套 `FRANCE_PROJECTION` 投影後貼進 `index.html`。**已明確告知使用者**：資料源查不到 Dordogne，波爾多左右岸分界僅用 Garonne 概略標示，非完整的兩河匯流示意；使用者確認接受此簡化。過程中發現並修正一個資料串接 bug（Loire 的兩個原始線段共用同一個起點，直接串接會產生跳線，修正為先反轉一段再串接）。
3. **側邊清單 hover 連動地圖**：新增 `highlightFranceMarker(id, on)` 與 CSS class `.pulse-marker.list-hover`，清單項目加上 `onmouseenter`/`onmouseleave`。刻意用獨立的 `list-hover` class 而非重用 `selected` class——如果直接切換 `selected`，滑鼠移出清單時會誤清除使用者原本點擊選取的狀態。

### 驗證方式
河流疊圖先用 Artifact/截圖預覽核對走向正確（流經對應產區形狀）才寫入正式檔案；`declutterPoints` 效果用 JS 遍歷全部標記量測最近兩點間距（16.96px）確認碰撞已解決；`highlightFranceMarker` 直接呼叫確認正確加上 `list-hover` class；`--dump-dom` 確認無 JS 錯誤；截圖確認波爾多群集標記清楚分散、河流正確顯示。

以上已 commit，**尚未 push**。**法國地圖重建（含收尾修正）全部完成，等使用者確認整體效果後再決定下一步。**

## 二、討論過但尚未執行的項目／下一步規劃

- **義大利／伊比利地圖面板**——使用者明確要求「這次只做法國試點」，法國全部完成、使用者確認後才會是下一個討論項目，不要主動擴充。義大利/西班牙的省界＋河流開放資料集屆時需要另外尋找。
- **波爾多左右岸分界不完整**（見上方）——目前只用 Garonne 概略標示，若使用者未來想要更完整的呈現（含 Dordogne、真正的 Gironde 河口匯流示意），需要另外尋找資料源，目前這份 Natural Earth 1:50m 資料集查不到。
- **已知次要視覺瑕疵**：勃根地／羅亞爾河谷的六大區文字標籤（Stage 2 產物）跟密集標記點仍有些微重疊——不在本次修正範圍內（本次只處理使用者明確提出的兩個問題），使用者若在意可之後要求微調。
- **`wine-data.js` 的 `emoji` 欄位清理**（產區資料裡的死欄位）——建議與下次技術債清理一併處理。
- **「分級制度」頁面下一步的候選擴充方向**（先前提出、使用者尚未確認）：新世界分級概念對照章節、Rioja、雙向跳轉連結。
- `auditCountryFlags()` 的 console 警告輸出尚未手動複查過。
- 是否要 push 本次 commit，尚待使用者這次對話明確指示。

## 三、我明確要求先記下來、之後再處理的內容

- 目前沒有新的「先記下來、之後處理」項目。

## 四、現況檢查提醒

- **push 狀態**：本次 session 的 commit 尚未 push——**接手前先跑 `git log --oneline origin/main..HEAD` 確認實際領先數量**，不要直接假設。
- **本次 session 異動範圍**：`scripts/build-france-map.pl`（新增河流抓取邏輯＋UTF-8處理）、`index.html`（新增河流 `<path>`）、`js/map.js`（新增 `declutterPoints()`／`highlightFranceMarker()`，`renderFranceMarkers()` 內插入避讓邏輯）、`css/style.css`（新增 `.pulse-marker.list-hover`）、`DECISIONS.md`、`HANDOFF.md`。**`data/wine-data.js`／`js/core.js` 本次未異動**。
- **`FRANCE_PROJECTION` 常數同步風險**（延續 Stage 3 記錄，仍然成立）：`js/map.js` 的這個常數數值是從 `scripts/build-france-map.pl` 手動複製過來的，兩者沒有自動同步機制。之後重跑該腳本（例如調整省份分組、viewBox，或要補河流資料）要記得手動同步更新。
- **碰撞避讓參數提醒**：`declutterPoints(points, 17, 150)` 的 `17`（最小間距px）與 `150`（最大迭代次數）是憑經驗選的值，如果未來標記數量再增加（例如義大利/伊比利也擴充到全部產區）或發現某些點還是太擠，可以調整這兩個參數，不需要重新設計演算法。
- **河流資料完整性限制**：目前只有 Loire／Rhône／Garonne 三條，且 Garonne 用來概略標示波爾多左右岸分界並不完整（缺 Dordogne，見上方）。資料來源快取在 `scripts/.geo-cache/rivers.json`。
- **地圖座標精確度提醒**（延續 Stage 1 記錄）：14筆大區級產區座標是代表點近似值，2筆（Hautes-Côtes de Nuits／Beaune）是低信心任選村莊代表。
- **地圖形狀方法論限制**（延續 Stage 2 記錄）：六個產區形狀是凸包不是精確省界聯集，比真實省界略外擴。
- **地理資料來源記錄**：省界／國界 GeoJSON 來自 `gregoiredavid/france-geojson`；河流來自 `martynafford/natural-earth-geojson`（皆透過 jsdelivr CDN）；經緯度查詢用 `nominatim.openstreetmap.org`（1 req/sec 限制＋自訂 User-Agent）。
- **本機環境限制**：沒有 Node.js，`python3`／`python` 是 Windows Store 空殼（exit code 127 無法用），**真正可用的是 `awk` 與 `perl`**（Perl 內建 `JSON::PP` 可解析 GeoJSON；處理含重音字元的資料比對時記得 `use utf8;`＋`binmode(STDOUT/STDERR,':utf8')`＋來源檔案用 `<:raw` 讀取，避免雙重解碼或比對失敗，這是本次河流比對時踩過的坑）。
- **手風琴函式現況**（延續先前記錄）：全站4個各自獨立、範圍鎖定各自面板的手風琴 toggle 函式，刻意不合併成共用函式。
- **`.ic` 卡片套色提醒**（延續先前記錄）：`.ic` 預設背景 `var(--bg-el)`，疊加在同樣背景的容器裡要另外覆蓋成 `var(--bg-card)`。
- **國旗擴充提醒**（延續先前記錄）：新增新國家時要同步補 `COUNTRY_FLAG_CODE` 對照與 `assets/flags/{國碼}.svg`。
- **接手的 Claude Code 務必實際開啟異動的檔案核對真實現況**，不要只憑這份 HANDOFF.md 的文字描述去猜測。
