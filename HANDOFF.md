# HANDOFF

> 本檔案每次 session 結束時覆蓋重寫，不累加舊內容。最後更新：2026-07-08。

## 一、本次開發歷程

延續先前試點（`aebceb8`）、B1-B3（`a86e61c`）、版控整理（`6ae8051`、`33699c4`）的進度，本次 session 完成：

### B4 產區描述擴充：montagne-de-reims、vallee-de-la-marne、cote-des-blancs、alsace（香檳＋阿爾薩斯，共 4 筆）
異動內容與前幾批相同：`styleSummary`（90-120字）、`history`（150-200字）、`terroir.climate`／`terroir.soil`（各30-40字，統一改為多行寫法）、新增 `agingNote`（80-120字）。`alsace.history` 為交代法德易手史與品種標示傳統完整語意，落在 215 字（略超 200 字上限，屬刻意保留、非疏漏）。

### 範圍外資料修正
`data/wine-data.js` 的 `vallee-de-la-marne.famousEstates` 原本有一筆 `'Jean-Marc Selosse anko'`，是執行 B4 時意外發現的既有錯誤資料（Jacques Selosse 實際上是白丘 Avize 的生產者、不屬於馬恩河谷，且「anko」無法辨識意義），經使用者確認後移除，只保留可確認正確的 `Gaston Chiquet`、`José Michel`。**未**自行猜測填入替代生產者名稱。

### 版控相關（.claude/、DECISIONS.md）——延續自上次 session，未變動
- CLAUDE.md、`.claude/settings.json`、`.gitignore`（排除 `.claude/settings.local.json`）皆已 commit。
- DECISIONS.md 持續以**追加**方式記錄每個階段的決策，本次新增第 12、13 條（B4 內容決策、Selosse 錯字修正原因）。

以上全部已 commit（見下方「現況檢查提醒」的 commit hash），**尚未 push**——使用者明確表示「等這一階段完成之後再一起 push」。

## 二、討論過但尚未執行的項目

- **B5～B11（剩餘 32 個產區）尚未開始**，下次應從 **B5** 接續：
  - B5：muscadet, vouvray, sancerre, pouilly-fume, chinon（羅亞爾）
  - B6：hermitage, chateauneuf-du-pape, cote-rotie, condrieu, gigondas, cotes-du-rhone, languedoc-roussillon（隆河+朗格多克）
  - B7：barolo, barbaresco, chianti-classico, brunello-di-montalcino, etna（義大利 1）
  - B8：prosecco, soave, amarone-della-valpolicella, valpolicella（義大利 2）
  - B9：rioja, ribera-del-duero, jerez, priorat（西班牙）
  - B10：mosel, rheingau, napa-valley, sonoma-coast（德國+美國）
  - B11：barossa-valley, margaret-river, central-otago（澳洲+紐西蘭）
- **B1-B3 的既有字數超標/不足未調整**（已定案，非待辦，詳見 DECISIONS.md 第 9 條）：`cote-de-nuits.history`＝247字、`hautes-cotes-de-nuits.history`＝131字、`hautes-cotes-de-beaune.history`＝140字、`cote-de-beaune.agingNote`＝149字、`cote-de-beaune.terroir.climate`≈22字。
- **本次 session 累積的所有 commit 都尚未 push 到 GitHub**，等這個開發階段（目前規劃到 B11 全部完成）告一段落後才會一次 push。

## 三、我明確要求先記下來、之後再處理的內容

（本次 session 無新增此類項目。）

## 四、現況檢查提醒

- **本機領先 origin/main 的 commit**（尚未 push，接手裝置 `git pull` 前務必先確認原裝置是否已 push，避免兩邊各自產生不同步的本地 commit）：
  - `6ae8051` CLAUDE.md 納入版控、補寫 DECISIONS.md、修正 B1-B3 terroir 格式不一致
  - `33699c4` `.claude/` 分流版控
  - 本次 session 的 B4＋Selosse 修正尚待 commit（見下一點）
- **本次 session 的 wine-data.js 異動（B4 四筆＋Selosse 修正）截至本檔案寫入時尚未 commit**，接手前請先確認原裝置是否已完成 commit。
- **B4 四筆資料本身沒有半成品**：欄位皆已完整寫入，terroir 已統一為多行寫法；寫入後已重新讀取比對大括號/中括號配對（984/984、319/319，平衡），`agingNote` 總數為 23（=試點2＋B1-B3共17＋B4共4），與預期一致。
- **本機環境沒有安裝 Node.js**，語法正確性靠人工讀取比對＋括號配對檢查，並非跑過 `node --check`。若接手環境有 Node，建議先跑一次語法檢查。
- **接手的 Claude Code 務必實際開啟 `data/wine-data.js` 核對 B4 這 4 筆與 Selosse 修正的真實現況**，不要只憑這份 HANDOFF.md 的文字描述去猜測。
- B5 開始前，同樣需要先讀取該批各產區在 `data/wine-data.js` 中的現有內容，逐筆確認現況再動工。
