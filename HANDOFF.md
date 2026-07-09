# HANDOFF

> 本檔案每次 session 結束時覆蓋重寫，不累加舊內容。最後更新：2026-07-09。

## 一、本次開發歷程

延續**地圖探索法國面板重建（試點，只做法國，義大利/伊比利面板不動）**三階段任務：

- **Stage 1（已完成，DECISIONS.md #80）**：35筆法國產區新增 `coords:{lat,lng}` 經緯度欄位，來源為 Nominatim 一次性查詢，使用者逐筆確認過。
- **Stage 2（本次完成，DECISIONS.md #81-86）**：真實省份邊界資料＋投影運算，取代 `#france-svg` 手繪座標。
- **Stage 3（尚未開始）**：移除 `pulse-marker` 上寫死的 `<text>` 名稱標籤，改用 JS 自動產生數字編號徽章＋側邊編號清單（取代 `#inspector-placeholder` 靜態文字），清單點擊複用既有 `selectAppellation(id)`。

### Stage 2 做了什麼
1. **省份分組**（先給使用者看清單、經兩項明確裁示才定案）：Bordeaux=Gironde(33)；Burgundy主體=Côte-d'Or(21)+Saône-et-Loire(71)（Chablis維持獨立標記，Yonne 89，不併入主體形狀）；Champagne=Marne(51)+Aube(10)；Alsace=Bas-Rhin(67)+Haut-Rhin(68)；Loire=6省（44/49/37/41/18/58，含2個純視覺連貫用途、無資料點的省份）；Rhône=5省（69/26/84/07/30，含2個AOC真實涵蓋但無資料點的省份）。**這兩項擴充是使用者明確同意的，不是我自行假設。**
2. **地理資料來源**：`gregoiredavid/france-geojson` 專案的簡化版檔案（`departements-version-simplifiee.geojson`／`metropole-version-simplifiee.geojson`），透過 jsdelivr CDN 一次性下載到本機處理（非網站執行期請求）。
3. **技術方法**（皆有記取的限制／取捨，見 DECISIONS.md #82-84）：六個產區形狀用 Perl 手刻凸包（convex hull）算法，非精確省界聯集（本機無 GIS 函式庫）；全國輪廓用本土多邊形（不含科西嘉/離島）decimate 至220點；投影用等距圓柱＋經度餘弦修正，viewBox 從580×560微調為580×565，**全國輪廓／六產區形狀／35產區座標點共用同一套投影參數**（使用者明確要求的技術風險點）。
4. **`index.html` 的 `#france-svg` 全面替換**：新輪廓 path、六個產區從 `<ellipse>` 改為 `<path>`（onclick 呼叫方式不變）、10個既有 pulse-marker 更新座標、6個區域文字標籤重新定位到凸包形心。移除3條綁定舊座標系統的裝飾河流曲線與 Chablis 的虛線小橢圓（換投影後位置會對不上，且無真實河流資料可重畫）。**標記文字/編號徽章化留給 Stage 3，本階段標記文字暫時維持原樣。**
5. **順手修正 `js/map.js` 的既有 bug**：`selectRegion()` 名稱對照表漏了 `alsace`，點擊 Alsace 色塊原本會顯示未翻譯的原始字串——這是重建 Alsace 形狀時順手發現、屬於同一個呼叫鏈的既有缺陷，直接修正。

### 驗證方式
Perl 腳本產生的 SVG 先發布成 Artifact 讓使用者視覺確認（法國輪廓可辨識、六產區相對位置正確、扁平示意圖風格未被破壞），確認後才寫入 `index.html`。寫入後 `--dump-dom` 確認無 JS 錯誤；直接呼叫 `selectRegion('alsace')`／`selectAppellation('chablis')` 確認邏輯正確（headless 環境對 SVG 元素的合成 `.click()` 事件有已知限制，改用直接函式呼叫驗證，真實瀏覽器滑鼠點擊不受影響）；截圖確認正式頁面視覺與 Artifact 預覽一致。

以上已 commit，**尚未 push**。

### 中途插入的工具化任務：`scripts/build-france-map.pl`（DECISIONS.md #87-88）
使用者要求把 Stage 2 那種「抓 GeoJSON→凸包運算→投影→輸出」的多段式 bash/perl 操作整合成單一腳本，減少每個小步驟都要等確認的中斷感。新增 `scripts/build-france-map.pl`：設定（省份分組／viewBox／快取路徑）集中在檔案頂部，直接從 `data/wine-data.js` 讀座標（不再手動複製貼上），GeoJSON 下載結果快取在 `scripts/.geo-cache/`（已加入 `.gitignore`）。首次執行時發現一個 regex 邊界抓取 bug（誤判 `appellations[]` 陣列結尾跟 `grapes:` 之間有空行，實際沒有）並當場修正，重跑後輸出與已寫入 `index.html` 的 Stage 2 座標完全一致，確認腳本可靠。**這支腳本本身是唯讀工具（只印出結果到 stdout，不會自動改 `index.html`），之後如果要重新產生地圖座標（例如調整省份分組，或未來義大利/伊比利地圖重建參考同一套方法論），可以直接重跑這支腳本，不需要重新手動走一次 Stage 2 的步驟。**

**接下來會開始 Stage 3（標記文字改為編號徽章＋側邊清單），除非使用者另有指示。**

## 二、討論過但尚未執行的項目／下一步規劃

- **Stage 3（編號徽章＋側邊清單）**——下一步要做的，規格已在任務一開始就完整給出（不需要重新確認規格本身），但完成後仍要停下來給使用者看效果再繼續。
- **義大利／伊比利地圖面板**——使用者明確要求「這次只做法國試點」，法國全部三階段完成、使用者確認後才會是下一個討論項目，不要主動擴充。
- **`wine-data.js` 的 `emoji` 欄位清理**（產區資料裡的死欄位）——建議與下次技術債清理一併處理。
- **「分級制度」頁面下一步的候選擴充方向**（先前提出、使用者尚未確認）：新世界分級概念對照章節、Rioja、雙向跳轉連結。
- `auditCountryFlags()` 的 console 警告輸出尚未手動複查過。
- 是否要 push 本次 commit，尚待使用者這次對話明確指示。

## 三、我明確要求先記下來、之後再處理的內容

- 目前沒有新的「先記下來、之後處理」項目——Stage 2 的兩個確認點（省份分組、投影共用參數）都已在本次完成並落實，不再是待處理項目。

## 四、現況檢查提醒

- **push 狀態**：本次 session 的 commit 尚未 push——**接手前先跑 `git log --oneline origin/main..HEAD` 確認實際領先數量**，不要直接假設。
- **本次 session 異動範圍**：`index.html`（`#france-svg` 全面替換）、`js/map.js`（`selectRegion()` 補上 alsace、修正既有bug）、`DECISIONS.md`、`HANDOFF.md`。**`data/wine-data.js` 本次未異動**（Stage 1 已完成，Stage 2 沒有再動資料檔）。
- **地圖座標精確度提醒**（延續 Stage 1 記錄）：14筆大區級產區座標是代表點近似值，2筆（Hautes-Côtes de Nuits／Beaune）是低信心任選村莊代表，如果使用者對這兩筆有更熟悉的建議地標可隨時要求更新。
- **地圖形狀方法論限制**：六個產區形狀是凸包（convex hull）不是精確省界聯集，比真實省界略外擴、邊角被拉直——這是本機沒有 GIS 函式庫下的務實選擇，已取得使用者知情同意，若未來要做精確版需要引入真正的多邊形聯集運算（可能需要找到有 Node.js/Python 的環境）。
- **地理資料來源記錄**：省界／國界 GeoJSON 來自 `cdn.jsdelivr.net/gh/gregoiredavid/france-geojson@master/`（`departements-version-simplifiee.geojson`／`metropole-version-simplifiee.geojson`），經緯度查詢用 `nominatim.openstreetmap.org`（1 req/sec 限制＋自訂 User-Agent）。義大利/伊比利地圖若未來也要重建，可比照同一套方法論與資料來源（GitHub 上應該有對應的義大利省界/西班牙省界開放資料集，屆時需要另外尋找）。
- **本機環境限制**：沒有 Node.js，`python3`／`python` 是 Windows Store 空殼（exit code 127 無法用），**真正可用的是 `awk` 與 `perl`**（Perl 有內建 `JSON::PP` 可解析 GeoJSON，Stage 2 的凸包演算法／投影運算／GeoJSON 解析都是用 Perl 完成）。
- **Stage 3 動工前提醒**：目前 `#france-svg` 只有原本的10個 pulse-marker（chablis/cote-de-nuits/cote-de-beaune/muscadet/sancerre/pauillac/margaux/saint-emilion/chateauneuf-du-pape/hermitage），Stage 3 規格提到「依照該面板涉及的 `WINE_DB.appellations` 資料順序」暗示應該擴充成全部35筆法國產區都有標記（不只現有10個）——這點在動工前建議跟使用者確認範圍是否真的要擴到35筆，避免自行假設。
- **手風琴函式現況**（延續先前記錄）：全站4個各自獨立、範圍鎖定各自面板的手風琴 toggle 函式，刻意不合併成共用函式。
- **`.ic` 卡片套色提醒**（延續先前記錄）：`.ic` 預設背景 `var(--bg-el)`，疊加在同樣背景的容器裡要另外覆蓋成 `var(--bg-card)`。
- **國旗擴充提醒**（延續先前記錄）：新增新國家時要同步補 `COUNTRY_FLAG_CODE` 對照與 `assets/flags/{國碼}.svg`。
- **接手的 Claude Code 務必實際開啟異動的檔案核對真實現況**，不要只憑這份 HANDOFF.md 的文字描述去猜測。
