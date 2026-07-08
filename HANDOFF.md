# HANDOFF

> 本檔案每次 session 結束時覆蓋重寫，不累加舊內容。最後更新：2026-07-08。

## 一、本次開發歷程

延續產區描述擴充主線全部完成（`7bd34e4`，B1-B11 共55個產區）之後，本次 session 轉向**品種圖鑑擴增**：

### 新增 15 個品種（WSET L2 既有 8 個之外）
`data/wine-data.js` 的 `grapes` 陣列從 8 筆擴充到 23 筆。新增：Tempranillo、Sangiovese、Nebbiolo、Grenache/Garnacha、Cabernet Franc、Malbec、Zinfandel/Primitivo、Gamay（紅）、Chenin Blanc、Gewürztraminer、Viognier、Sémillon、Albariño、Grüner Veltliner、Muscat/Moscato（白）。欄位格式沿用既有 8 筆（`styleSummary` 單句 40-90 字，非長段落）。

**已知缺口**：Malbec、Zinfandel/Primitivo、Gamay、Albariño、Grüner Veltliner、Muscat 這 6 個的 `representativeRegions` 是空陣列，因為它們的代表產區（阿根廷 Mendoza、法國 Beaujolais、西班牙 Rías Baixas、奧地利 Wachau 等）目前不在 55 個產區資料庫裡。**這正是使用者規劃的下一步**：先擴增產區把這些缺口補上，再回頭把這 6 個品種連結起來，最後一步是「檢查每個產區跟每個品種的連結」全面複查。

### 介面調整（三項）
`js/grapes.js` 的 `buildGrapeCardHTML()` 與 `toggleGrapeCard()`：
1. 新增 `wsetLevel: 2` 欄位（8個原始品種），卡片標題旁渲染「WSET L2」徽章。
2. 新增 `originCountry` 欄位（23個品種全數），卡片標題旁渲染國家標籤——**語意是「當代旗艦/代表國家」而非植物學歷史原產國**（已用 AskUserQuestion 跟使用者確認，例：Malbec 標示阿根廷而非法國）。
3. 品種卡片改為手風琴式單一展開：展開新卡片會自動收合先前展開的卡片並銷毀其雷達圖實例，`querySelectorAll` 範圍限定在 `#grape-container` 內（因為品飲系統 SAT 分頁也共用同一組 `.acc-hdr`/`.acc-body` class，避免誤觸）。

### 驗證方式的限制（誠實記錄）
本次沒有在瀏覽器裡實際點擊測試手風琴收合行為。原因：這台機器沒有 Node.js、Python 也無法執行；嘗試用 headless Chrome + DevTools Protocol 驗證，但 Windows PowerShell 5.1 無法建立 WebSocket 連線執行 CDP 互動指令。改用「完整讀回程式碼、人工核對邏輯」的方式驗證，並已告知使用者、使用者已在自己瀏覽器手動確認過沒問題。

以上全部已 commit（見下方「現況檢查提醒」），**尚未 push**（本次 session 沒有再問是否 push，維持先前「累積到一個階段再一起 push」的預設習慣，下次接手時應主動確認）。

## 二、討論過但尚未執行的項目

使用者明確規劃的三步驟，目前完成第一步：
1. ~~擴增品種~~ ✅ 已完成（本次 session）
2. **擴增產區**（尚未開始）——已知至少要補：阿根廷 Mendoza（Malbec）、法國 Beaujolais（Gamay）、西班牙 Rías Baixas（Albariño）、奧地利 Wachau 或 Kamptal（Grüner Veltliner）；Zinfandel（美國加州 Lodi 或 Paso Robles）與 Muscat（義大利 Asti 或法國 Beaumes-de-Venise）的代表產區也還沒定案，需要新 session 先跟使用者確認要選哪個具體產區。
3. **檢查每個產區跟每個品種的連結**（尚未開始，需等第2步完成後才能真正執行，屬於全面複查性質，不是新增內容）

其餘：
- 是否要 push 累積的本地 commit，尚待使用者決定（見上方）
- 若要在此環境做瀏覽器自動化測試，需要使用者同意安裝 Node.js

## 三、我明確要求先記下來、之後再處理的內容

（本次 session 無新增此類項目。）

## 四、現況檢查提醒

- **本機領先 origin/main 的 commit**（尚未 push）：`6ae8051`、`33699c4`、`df68fcd`、`6650460`、`7bd34e4`（皆為先前 session 已 push 過的——注意：上一輪 session 結束時這 5 個已經 push 成功，`git log origin/main..HEAD` 應該只會顯示本次 session 新增的 commit，接手時請務必重新執行 `git log origin/main..HEAD` 確認實際落差，不要直接沿用這份清單）。
- **本次 session 的 wine-data.js／grapes.js 異動（15個新品種＋3項介面調整）截至本檔案寫入時尚未 commit**，接手前請先確認原裝置是否已完成 commit。
- **資料完整性已核對**：大括號/中括號配對正確（1014/1014、364/364），`originCountry` 共23筆、`wsetLevel` 共8筆、`skinColor` 共23筆，與預期一致。
- **本機環境沒有 Node.js，Python 也無法執行**（Windows Store 空殼指令），語法正確性靠人工讀取比對＋括號配對檢查。若要做瀏覽器自動化測試，需要先取得使用者同意安裝 Node.js 或其他工具鏈。
- **接手的 Claude Code 務必實際開啟 `data/wine-data.js`（grapes陣列）與 `js/grapes.js` 核對這次異動的真實現況**，不要只憑這份 HANDOFF.md 的文字描述去猜測。
- 下一步「擴增產區」開始前，記得延續 B1-B11 建立的習慣：先讀取現況、兩句話報告、等確認才動工。
