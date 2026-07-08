# HANDOFF

> 本檔案每次 session 結束時覆蓋重寫，不累加舊內容。最後更新：2026-07-08。

## 一、本次開發歷程

延續先前試點（`aebceb8`）、B1-B3（`a86e61c`）、版控整理（`6ae8051`、`33699c4`）、B4（`df68fcd`）的進度，本次 session 完成 **B5+B6+B7 共 17 筆**（羅亞爾河、隆河/朗格多克、義大利），一次處理完畢。

### 重要發現：實際施工範圍與計畫不同
動工前讀取現況時發現，**pouilly-fume、chinon、cote-rotie、condrieu、gigondas、cotes-du-rhone 共 6 筆，早已在一次未被本 HANDOFF.md 系統追蹤到的「Batch 3」工作中完成擴充**（`data/wine-data.js` 裡有 `/* ── France · Rhône 補全 (Batch 3) ── */`、`/* ── Italy · Veneto 補全 (Batch 3) ── */` 這類註解可對照），styleSummary／history／多行 terroir 皆已到位，**只缺 `agingNote`**。`languedoc-roussillon` 則是 history 已達標、但 styleSummary 與 terroir 仍是原始短版本、半完成狀態。此發現已回報使用者並取得確認後才調整實際施工範圍：

- **10 筆全套擴充**（styleSummary/history/terroir改多行/新增agingNote）：hermitage、chateauneuf-du-pape、muscadet、vouvray、sancerre、barolo、barbaresco、chianti-classico、brunello-di-montalcino、etna
- **1 筆半套**：languedoc-roussillon（補 styleSummary/terroir/agingNote，history 不動）
- **6 筆只補 agingNote**：pouilly-fume、chinon、cote-rotie、condrieu、gigondas、cotes-du-rhone

**⚠️ 重要提醒給下一個 session：本 HANDOFF.md 的追蹤範圍可能仍有其他遺漏。** B8～B11 開始前，務必先用 `grep -n "Batch 3\|補全"` 之類的指令搜尋 `data/wine-data.js` 全檔，確認該批各產區是否也已經有類似的未追蹤既有擴充內容，不要直接假設都是最初短版本。

### 內容品質備註
本批新增內容涉及的史實（Hermitage「hermitaged claret」典故、Châteauneuf-du-Pape 1923年 Baron Le Roy 規範與 AOC 制度起源、Barolo/Barbaresco 法定陳年月數差異與「Barolo Boys」現代派運動、Chianti Classico 1996年獨立與 Gran Selezione 分級、Brunello 由 Biondi-Santi 家族首創、Etna 的 contrada 單一葡萄園系統與未嫁接老藤）皆為有把握內容，無需使用者核實的不確定項目。少數欄位超出字數目標但依既定原則（不影響版面、不需動程式碼即不強行刪減）予以保留：`brunello-di-montalcino.history`＝232字、`etna.agingNote`＝139字、`chianti-classico.history`＝211字、`barbaresco.history`＝218字、`muscadet.agingNote`＝146字。

以上全部已 commit（見下方「現況檢查提醒」），**尚未 push**——使用者持續要求「等這一階段完成之後再一起 push」。

## 二、討論過但尚未執行的項目

- **B8～B11（剩餘 15 個產區）尚未開始**，下次應從 **B8** 接續，且**開始前務必先檢查是否有 Batch 3 式的既有未追蹤內容**（見上方提醒）：
  - B8：prosecco, soave, amarone-della-valpolicella, valpolicella（義大利 2，注意 `data/wine-data.js` 中 valpolicella 前有 `/* ── Italy · Veneto 補全 (Batch 3) ── */` 註解，很可能也已部分擴充，務必先讀取核對）
  - B9：rioja, ribera-del-duero, jerez, priorat（西班牙）
  - B10：mosel, rheingau, napa-valley, sonoma-coast（德國+美國）
  - B11：barossa-valley, margaret-river, central-otago（澳洲+紐西蘭）
- **B1-B4 的既有字數超標/不足未調整**（已定案，非待辦，詳見 DECISIONS.md 第 9 條）。
- **本次 session 累積的所有 commit 都尚未 push 到 GitHub**，等 B8-B11 全部完成後才會一次 push。

## 三、我明確要求先記下來、之後再處理的內容

（本次 session 無新增此類項目。）

## 四、現況檢查提醒

- **本機領先 origin/main 的 commit**（尚未 push，接手裝置 `git pull` 前務必先確認原裝置是否已 push，避免兩邊各自產生不同步的本地 commit）：
  - `6ae8051` CLAUDE.md 納入版控、補寫 DECISIONS.md、修正 B1-B3 terroir 格式不一致
  - `33699c4` `.claude/` 分流版控
  - `df68fcd` B4（香檳+阿爾薩斯）＋Selosse 錯字修正
  - 本次 session 的 B5+B6+B7（17筆）尚待 commit（見下一點）
- **本次 session 的 wine-data.js 異動（B5+B6+B7 共17筆）截至本檔案寫入時尚未 commit**，接手前請先確認原裝置是否已完成 commit。
- **本批資料本身沒有半成品**：寫入後已重新讀取比對大括號/中括號配對（984/984、319/319，平衡），`agingNote` 總數為 40（=試點2＋B1-B3共17＋B4共4＋B5-B7共17），與預期一致；`wineColor` 總數仍為 55，未增減任何產區筆數。
- **本機環境沒有安裝 Node.js**，語法正確性靠人工讀取比對＋括號配對檢查，並非跑過 `node --check`。若接手環境有 Node，建議先跑一次語法檢查。
- **接手的 Claude Code 務必實際開啟 `data/wine-data.js` 核對這 17 筆與 languedoc-roussillon 半套處理的真實現況**，不要只憑這份 HANDOFF.md 的文字描述去猜測，且如上所述要留意可能還有其他未被追蹤的既有擴充內容。
