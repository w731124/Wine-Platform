# HANDOFF

> 本檔案每次 session 結束時覆蓋重寫，不累加舊內容。最後更新：2026-07-09。

## 一、本次開發歷程

**地圖探索法國面板重建（試點，只做法國，義大利/伊比利面板不動）三階段任務至此全部完成：**

- **Stage 1（DECISIONS.md #80）**：35筆法國產區新增 `coords:{lat,lng}` 經緯度欄位，來源為 Nominatim 一次性查詢，使用者逐筆確認過。
- **Stage 2（DECISIONS.md #81-86）**：真實省份邊界資料＋投影運算，取代 `#france-svg` 手繪座標，六大產區形狀改用真實地理資料的凸包（convex hull）。
- **中途工具化（DECISIONS.md #87-88）**：把 Stage 2 的多段式手動操作整合成 `scripts/build-france-map.pl`，之後可直接重跑。
- **Stage 3（本次完成，DECISIONS.md #89-92）**：標記文字改為編號徽章＋側邊產區索引清單，範圍從原本10筆擴大到全部35筆法國產區。

### Stage 3 做了什麼
1. **範圍確認**：使用者確認擴大到全部35筆（不是維持原本10筆）。
2. **`js/map.js` 新增 `renderFranceMarkers()`／`renderFranceMarkerList()`**：於 `DOMContentLoaded` 時（排在 `initMapTooltips()` 之前，確保動態標記也能被 hover tooltip 邏輯抓到）動態產生35個編號徽章＋依 `a.region` 分組的側邊清單。投影參數 `FRANCE_PROJECTION` 常數直接沿用 Stage 2 腳本算出的數值。
3. **`index.html`**：原本10個寫死的 `<g class="pulse-marker">` 全部移除，改為單一空容器 `<g id="france-markers">`；`#inspector-placeholder` 靜態歡迎文字清空，完全交給 JS 填入（延續本專案「HTML留空、JS填入」的一貫模式）。
4. **標記樣式調整**：`dot-inner` 半徑5.5→7.5以容納數字，`pulse-ring` 維持 r=8（因為 CSS `@keyframes pRing` 本來就會動畫這個屬性，寫大沒有意義）；移除 Pauillac 原本獨有的深金色特例（無資料依據的舊手工調整，35筆統一資料驅動後不適合保留）。
5. **側邊清單分組邏輯**：比照 `regions.js` 既有的 `a.region` 欄位分組方式，不另外發明分組；清單項目點擊複用既有 `selectAppellation(id)`，未寫第二套選取邏輯。

### 驗證方式
headless Chrome 截圖確認35個編號徽章正確顯示在地圖對應位置、側邊清單依大區分組且編號與地圖一致；直接呼叫 `selectAppellation('condrieu')` 確認動態產生的標記正確帶上 `selected` class；`--dump-dom` 確認無 JS 錯誤。

**已知次要視覺瑕疵（記錄但本次不處理）**：波爾多群集（11筆產區集中在 Gironde 一省）徽章彼此輕微重疊；勃根地／羅亞爾河谷的六大區文字標籤（Stage 2 產物）跟新增的密集標記點略有重疊。前者是真實地理密度使然，後者的六大區標籤本來就不在 Stage 3 範圍內。

以上已 commit，**尚未 push**。**法國地圖三階段重建全部完成，等使用者確認整體效果後再決定下一步（例如是否套用到義大利/伊比利）。**

## 二、討論過但尚未執行的項目／下一步規劃

- **義大利／伊比利地圖面板**——使用者明確要求「這次只做法國試點」，法國三階段全部完成、使用者確認後才會是下一個討論項目，不要主動擴充。義大利/西班牙的省界開放資料集屆時需要另外尋找（Stage 2 用的 `gregoiredavid/france-geojson` 是法國專屬）。
- **已知次要視覺瑕疵**（見上方）——波爾多群集徽章重疊、六大區標籤與密集標記點重疊，使用者若在意可以之後要求微調（例如標記半徑再縮小，或六大區標籤位置手動避開密集區）。
- **`wine-data.js` 的 `emoji` 欄位清理**（產區資料裡的死欄位）——建議與下次技術債清理一併處理。
- **「分級制度」頁面下一步的候選擴充方向**（先前提出、使用者尚未確認）：新世界分級概念對照章節、Rioja、雙向跳轉連結。
- `auditCountryFlags()` 的 console 警告輸出尚未手動複查過。
- 是否要 push 本次 commit，尚待使用者這次對話明確指示。

## 三、我明確要求先記下來、之後再處理的內容

- 目前沒有新的「先記下來、之後處理」項目——法國地圖三階段的所有確認點（Stage 1座標表、Stage 2省份分組、Stage 3標記範圍）都已在本次完成並落實。

## 四、現況檢查提醒

- **push 狀態**：本次 session 的 commit 尚未 push——**接手前先跑 `git log --oneline origin/main..HEAD` 確認實際領先數量**，不要直接假設。
- **本次 session（Stage 3）異動範圍**：`index.html`（`#france-svg` 標記容器化、`#inspector-placeholder` 清空）、`js/map.js`（新增2個渲染函式＋`FRANCE_PROJECTION`常數）、`js/core.js`（DOMContentLoaded加2行，順序在initMapTooltips前）、`css/style.css`（新增 `.france-idx-item:hover`）、`DECISIONS.md`、`HANDOFF.md`。**`data/wine-data.js` 本次未異動**。
- **`FRANCE_PROJECTION` 常數同步風險**（重要）：這個 JS 常數的數值是從 `scripts/build-france-map.pl` 手動複製過來的，兩者沒有自動同步機制。**如果之後重跑該腳本調整省份分組或 viewBox，`js/map.js` 裡的 `FRANCE_PROJECTION` 常數必須跟著手動更新**，否則動態產生的35個標記位置會跟底圖對不上。這是已知的技術負債，刻意不做成執行期動態計算（會違反「最終部署維持純靜態」的鎖定慣例）。
- **地圖座標精確度提醒**（延續 Stage 1 記錄）：14筆大區級產區座標是代表點近似值，2筆（Hautes-Côtes de Nuits／Beaune）是低信心任選村莊代表，使用者若有更熟悉的建議地標可隨時要求更新。
- **地圖形狀方法論限制**（延續 Stage 2 記錄）：六個產區形狀是凸包不是精確省界聯集，比真實省界略外擴。
- **地理資料來源記錄**：省界／國界 GeoJSON 來自 `cdn.jsdelivr.net/gh/gregoiredavid/france-geojson@master/`，經緯度查詢用 `nominatim.openstreetmap.org`（1 req/sec 限制＋自訂 User-Agent）。
- **本機環境限制**：沒有 Node.js，`python3`／`python` 是 Windows Store 空殼（exit code 127 無法用），**真正可用的是 `awk` 與 `perl`**（Perl 內建 `JSON::PP` 可解析 GeoJSON）。
- **手風琴函式現況**（延續先前記錄）：全站4個各自獨立、範圍鎖定各自面板的手風琴 toggle 函式，刻意不合併成共用函式。
- **`.ic` 卡片套色提醒**（延續先前記錄）：`.ic` 預設背景 `var(--bg-el)`，疊加在同樣背景的容器裡要另外覆蓋成 `var(--bg-card)`。
- **國旗擴充提醒**（延續先前記錄）：新增新國家時要同步補 `COUNTRY_FLAG_CODE` 對照與 `assets/flags/{國碼}.svg`。
- **接手的 Claude Code 務必實際開啟異動的檔案核對真實現況**，不要只憑這份 HANDOFF.md 的文字描述去猜測。
