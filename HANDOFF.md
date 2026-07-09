# HANDOFF

> 本檔案每次 session 結束時覆蓋重寫，不累加舊內容。最後更新：2026-07-09。

## 一、本次開發歷程

上次階段完成「釀造工藝」六大分類全部內容並 push（DECISIONS.md #78-79）。本次開始**地圖探索法國面板重建（試點，範圍限定只做法國，義大利/伊比利面板不動）**，這是一個明確分三階段、每階段都要停下來給使用者確認的大型任務：

- **Stage 1（本次已完成，DECISIONS.md #80）**：35筆法國產區新增 `coords:{lat,lng}` 經緯度欄位。
- **Stage 2（尚未開始）**：取得法國國家輪廓＋大產區（Bordeaux/Burgundy/Loire/Champagne/Rhône等）以「省」（département）層級的真實 GeoJSON 邊界資料，用地圖投影轉換為 SVG 座標，取代 `index.html` 裡 `#france-svg` 現有手繪的 `<path>`。**使用者要求先看過每個產區實際涵蓋哪些省份的分組清單，確認無誤後才進行形狀生成，不要自行假設分組。**
- **Stage 3（尚未開始）**：移除 `pulse-marker` 上寫死的 `<text>` 名稱標籤，改用 JS 自動產生數字編號徽章＋側邊編號清單（取代 `#inspector-placeholder` 目前的靜態文字），清單點擊複用既有 `selectAppellation(id)`。

### Stage 1 做了什麼
- **`data/wine-data.js`**：35筆法國產區物件新增 `coords:{lat,lng}`。座標來源是 OpenStreetMap Nominatim 地理編碼服務的一次性本機查詢（純研究用途，非網站執行期請求，符合使用者「最終部署必須純靜態」的鎖定慣例）——對每個產區挑一個代表性城鎮／村莊送出查詢，21筆是「產區本身即該城鎮」的精確匹配，14筆是大區級產區（涵蓋多個村莊）取代表點的近似值，其中 **Hautes-Côtes de Nuits／Beaune 兩筆額外標註為低信心**（零散丘陵地帶無明顯單一地標，任選一村莊代表）。完整座標表已交使用者逐筆確認過才寫入。
- 寫入方式：用 Perl 腳本依 `id` 精準比對插入（避免手動編輯35筆出錯，也避免誤傷 `classifications[]` 裡同名的 `saint-emilion` 條目——已用行範圍限定只在 `appellations[]` 陣列內插入），寫入前備份原檔。

### 驗證方式
`data/wine-data.js` 新增35個 `coords` 欄位後大括號／中括號配對仍平衡（1055/1055、546/546），`--dump-dom` 確認頁面載入無 JS 錯誤。**本階段僅新增資料欄位，未修改任何渲染邏輯，地圖畫面尚未改變**——座標資料要等 Stage 2 的投影轉換才會實際用於畫面呈現。

以上已 commit，**尚未 push**。**已停下等待使用者對 Stage 1 的確認，確認後才會開始 Stage 2（GeoJSON 邊界資料＋省份分組清單，同樣會先給使用者確認分組再動工）。**

## 二、討論過但尚未執行的項目／下一步規劃

- **地圖探索法國面板重建 Stage 2／Stage 3**——見上方，是本次任務的核心，尚未開始，且 Stage 2 明確要求「先列出省份分組給使用者看、確認無誤後才進行下一步」，不要自行假設分組跳過確認直接產生形狀。
- **義大利／伊比利地圖面板**——使用者明確要求「這次只做法國試點，不要自動套用」，法國效果確認後才會是下一個要討論的項目，不要主動擴充。
- **`wine-data.js` 的 `emoji` 欄位清理**（產區資料裡的死欄位）——建議與下次技術債清理一併處理。
- **「分級制度」頁面下一步的候選擴充方向**（先前提出、使用者尚未確認）：新世界分級概念對照章節、Rioja、雙向跳轉連結。
- `auditCountryFlags()` 的 console 警告輸出尚未手動複查過。
- 是否要 push 本次 commit，尚待使用者這次對話明確指示。

## 三、我明確要求先記下來、之後再處理的內容

- **Stage 2 的省份分組清單必須先給使用者確認，不得自行假設**——這是使用者在本次任務規格裡明講的硬性要求，不是我自行判斷的謹慎做法。
- **地圖投影參數（viewBox、投影中心點）必須與 Stage 1 的產區座標共用同一套換算依據**，不能各自獨立處理導致點位跟輪廓對不上——這是使用者在規格裡特別強調的技術風險點，Stage 2 動工時要優先設計好這個共用換算層。

## 四、現況檢查提醒

- **push 狀態**：本次 session 的 commit 尚未 push——**接手前先跑 `git log --oneline origin/main..HEAD` 確認實際領先數量**，不要直接假設。
- **本次 session 異動範圍**：僅 `data/wine-data.js`（35筆法國產區新增 `coords` 欄位）、`DECISIONS.md`、`HANDOFF.md`。**`js/map.js`／`index.html` 的地圖相關內容尚未異動**，Stage 2 才會動到。
- **資料完整性**：`data/wine-data.js` 大括號 1055/1055、中括號 546/546 配對平衡；`appellations` 91筆（35筆法國產區皆有 `coords`，其餘56筆非法國產區目前沒有）、`grapes` 23筆、`classifications` 7筆、`wineStyles` 6筆。
- **座標精確度提醒**：14筆大區級產區的座標是代表點近似值，2筆（Hautes-Côtes de Nuits／Beaune）是低信心任選村莊代表——Stage 2/3 使用這些座標畫標記點時，如果使用者對這兩筆有更熟悉的建議地標，可以隨時要求更新，不需要視為已定案。
- **地理資料來源記錄**：法國省份層級 GeoJSON 邊界資料已確認可從 `cdn.jsdelivr.net/gh/gregoiredavid/france-geojson@master/departements.geojson`（約3.4MB，完整精度，Stage 2 會需要簡化）取得；經緯度查詢用 `nominatim.openstreetmap.org`（需遵守 1 req/sec 速率限制＋自訂 User-Agent）。兩者皆為 Stage 1 研究階段已測試過可正常連線的來源，Stage 2 可直接沿用。
- **本機環境限制**：沒有 Node.js，`python3`／`python` 指令在 PATH 裡雖然存在但只是 Windows Store 的空殼（實際執行會 exit code 127 無法用），**真正可用的腳本語言是 `awk` 與 `perl`**（皆已驗證可正常運作，Stage 1 座標插入即用 Perl 完成）。Stage 2 的地圖投影數學運算（含三角函數）建議用 `awk`（內建 sin/cos/atan2/sqrt）或 `perl` 處理，不要嘗試用 `python3`。
- **手風琴函式現況**（延續先前記錄）：全站4個各自獨立、範圍鎖定各自面板的手風琴 toggle 函式，刻意不合併成共用函式。
- **`.ic` 卡片套色提醒**（延續先前記錄）：`.ic` 預設背景 `var(--bg-el)`，疊加在同樣背景的容器裡要另外覆蓋成 `var(--bg-card)`。
- **國旗擴充提醒**（延續先前記錄）：新增新國家時要同步補 `COUNTRY_FLAG_CODE` 對照與 `assets/flags/{國碼}.svg`。
- **接手的 Claude Code 務必實際開啟異動的檔案核對真實現況**，不要只憑這份 HANDOFF.md 的文字描述去猜測。
