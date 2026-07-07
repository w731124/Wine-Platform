# HANDOFF

> 本檔案每次 session 結束時覆蓋重寫，不累加舊內容。最後更新：2026-07-08。

## 一、本次開發歷程

延續先前試點（haut-medoc、marlborough，commit `aebceb8`）的產區描述擴充工程，本次 session 依批次計畫（B1～B11，共 53 個待擴充產區）完成 **B1、B2、B3 共 17 個產區**，全部修改集中在單一檔案：

**data/wine-data.js**（唯一異動檔案，`js/regions.js` 本次未變動 — 原因見第四節）

- **B1（Bordeaux 左岸 1）**：pauillac、margaux、saint-emilion、medoc、pessac-leognan
- **B2（Bordeaux 左岸/右岸 2）**：graves、pomerol、sauternes、barsac、entre-deux-mers
- **B3（Burgundy）**：chablis、cote-de-nuits、cote-de-beaune、cote-chalonnaise、maconnais、hautes-cotes-de-nuits、hautes-cotes-de-beaune

每筆產區物件的異動內容：
- `styleSummary` 擴充為單句 90–120 字（不分段）
- `history` 擴充至 150–200 字，補入具體史實（如 1855 分級酒莊數、聖愛美濃教科文組織遺產、Pessac-Léognan 1987 年獨立、Sauternes 唯一 Premier Cru Supérieur、Pomerol 醫院騎士團朝聖史、夜丘西多會劃分地塊風土、伯恩鎮主宮醫院拍賣會等）
- `terroir.climate`／`terroir.soil` 各自濃縮為一句 30–40 字完整句（維持 regions.js 兩欄排版不跑版）
- 新增 `agingNote` 欄位（80–120 字），說明陳年潛力數值背後的風土/結構原因，不重複 `agingPotential` 已呈現的數字
- `memoryHook`、`agingPotential` 本身格式維持原樣，未更動

未變更 `js/regions.js`：「陳年潛力解析」渲染區塊（`app.agingNote ? ... : ''`）在更早的 pilot commit 就已寫成通用條件式，可直接支援本次新增 agingNote 的任何產區，不需額外修改程式碼。

## 二、討論過但尚未執行的項目

- **B4～B11（剩餘 36 個產區）尚未開始**，下次應從 **B4** 接續：
  - B4：montagne-de-reims, vallee-de-la-marne, cote-des-blancs, alsace（香檳+阿爾薩斯）
  - B5：muscadet, vouvray, sancerre, pouilly-fume, chinon（羅亞爾）
  - B6：hermitage, chateauneuf-du-pape, cote-rotie, condrieu, gigondas, cotes-du-rhone, languedoc-roussillon（隆河+朗格多克）
  - B7：barolo, barbaresco, chianti-classico, brunello-di-montalcino, etna（義大利 1）
  - B8：prosecco, soave, amarone-della-valpolicella, valpolicella（義大利 2）
  - B9：rioja, ribera-del-duero, jerez, priorat（西班牙）
  - B10：mosel, rheingau, napa-valley, sonoma-coast（德國+美國）
  - B11：barossa-valley, margaret-river, central-otago（澳洲+紐西蘭）
- CLAUDE.md（存放於專案上層目錄，非本 repo 內）是否要正式納入版控，先前對話中提過但使用者尚未決定，維持未追蹤狀態。

## 三、我明確要求先記下來、之後再處理的內容

- 依 CLAUDE.md 憲法第六條，完成階段性功能後應寫入 **DECISIONS.md** 並 commit。使用者於 2026-07-08 確認 DECISIONS.md **尚未建立**，且明確表示這次先不補寫，等下一個階段性功能完成後再一併處理（不只是這次 B1～B3，之前 commit `aebceb8` 的四項功能也還沒回溯記錄進去）。

## 四、現況檢查提醒

- **目前沒有半成品程式碼。** B1～B3 共 17 個產區物件的欄位（styleSummary / history / terroir.climate / terroir.soil / agingNote）皆已完整寫入，每次寫入後都有重新讀取檔案確認大括號、逗號、引號配對正確，未發現語法斷裂。
- 本機環境沒有安裝 Node.js（`node` 指令不存在，PowerShell 與 Bash 皆確認過），因此語法正確性是靠**人工讀取比對**，並非跑過 `node --check` 或任何自動化 lint／build 驗證。若接手環境有 Node，建議先跑一次語法檢查再繼續動工。
- **接手的 Claude Code 務必實際開啟 `data/wine-data.js` 核對 B1～B3 這 17 筆資料目前的真實欄位內容**（尤其是 styleSummary/history 字數是否落在目標範圍、agingNote 是否每筆都存在），不要只憑這份 HANDOFF.md 的文字描述去猜測程式碼細節。
- B4 開始前，同樣需要先讀取該批各產區在 `data/wine-data.js` 中的現有內容（有些產區如中間批次可能已在更早的「Step 4」階段被部分擴充過，需個別確認現況而非假設全部是最初的短版本）。
