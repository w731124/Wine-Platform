# HANDOFF

> 本檔案每次 session 結束時覆蓋重寫，不累加舊內容。最後更新：2026-07-08。

## 一、本次開發歷程

延續先前試點（haut-medoc、marlborough，commit `aebceb8`）與 B1-B3（commit `a86e61c`）的產區描述擴充工程，本次 session 沒有新增產區內容，改為處理**專案本身的版控/工具設定**（非網站內容更動），共兩次 commit：

### commit `6ae8051`：CLAUDE.md 納入版控、補寫 DECISIONS.md、修正 B1-B3 terroir 格式不一致
- **CLAUDE.md 正式加入 git 版控**（先前一直放在 repo 但未追蹤）。
- **新建 DECISIONS.md**，回溯記錄 `aebceb8`／`a86e61c` 與本次的關鍵決策與原因，日後每個階段性功能完成後採**追加**方式寫入，不覆蓋舊內容（跟 HANDOFF.md 的覆蓋邏輯不同，要注意分辨）。
- **data/wine-data.js**：margaux／saint-emilion／chablis／cote-de-nuits／cote-de-beaune 五筆的 `terroir` 從單行寫法改成與其餘筆數一致的多行寫法，純排版統一，文字內容與字數完全未變動。

### 本次未 commit 的最新變動（尚未 push，見下方「現況檢查提醒」）
- **新建 `.gitignore`**，內容為 `.claude/settings.local.json`。
- **`.claude/settings.json` 納入版控**；`.claude/settings.local.json` 維持不版控。
  原因：`settings.json` 是「git push/fetch/pull 免確認」這類跨裝置共用的專案層級設定，值得共享；`settings.local.json` 是 Claude Code 每次 session 自動累加寫入的「已核准指令清單」，內含本機暫存資料夾絕對路徑（如 `C:\Users\HARRYW~1\AppData\Local\Temp\claude\...`），換裝置或換 session 就毫無意義，版控只會讓歷史越滾越亂。

## 二、討論過但尚未執行的項目

- **B4～B11（剩餘 36 個產區）尚未開始**，下次應從 **B4** 接續（與上次 HANDOFF 記錄相同，本次未動）：
  - B4：montagne-de-reims, vallee-de-la-marne, cote-des-blancs, alsace（香檳+阿爾薩斯）
  - B5：muscadet, vouvray, sancerre, pouilly-fume, chinon（羅亞爾）
  - B6：hermitage, chateauneuf-du-pape, cote-rotie, condrieu, gigondas, cotes-du-rhone, languedoc-roussillon（隆河+朗格多克）
  - B7：barolo, barbaresco, chianti-classico, brunello-di-montalcino, etna（義大利 1）
  - B8：prosecco, soave, amarone-della-valpolicella, valpolicella（義大利 2）
  - B9：rioja, ribera-del-duero, jerez, priorat（西班牙）
  - B10：mosel, rheingau, napa-valley, sonoma-coast（德國+美國）
  - B11：barossa-valley, margaret-river, central-otago（澳洲+紐西蘭）
- **B1-B3 的 17 筆產區仍有字數超標/不足未調整**（使用者已明確決定不強行湊字數，只要不影響版面/不需動程式就維持現況——這不是「待辦」，是已定案的判斷，記錄於 DECISIONS.md 第 9 條，供接手者理解為何沒有處理）：
  - `cote-de-nuits.history`＝247字（目標 150-200，超標 47）
  - `hautes-cotes-de-nuits.history`＝131字、`hautes-cotes-de-beaune.history`＝140字（皆低於 150 下限）
  - `cote-de-beaune.agingNote`＝149字（目標 80-120，超標 29）
  - `cote-de-beaune.terroir.climate`≈22字（目標 30-40，略低於下限）

## 三、我明確要求先記下來、之後再處理的內容

（本次 session 無新增此類項目。）

## 四、現況檢查提醒

- **目前有未 commit 的變動**：`.gitignore`（新檔）與 `.claude/settings.json`（新增追蹤）已 `git add` 進暫存區，但尚未執行 `git commit`。接手裝置 `git pull` 前，若原裝置這邊沒有先完成 commit，這兩個檔案的異動不會出現在遠端。
- **commit `6ae8051` 目前也尚未 push 到 GitHub**（`git status` 顯示 `ahead of origin/main by 1 commit`）。接手前務必先確認原裝置這邊的 push 狀態，避免兩台裝置各自產生不同步的本地 commit。
- **B1～B3 的 17 筆產區資料本身沒有半成品**：欄位（styleSummary／history／terroir.climate／terroir.soil／agingNote）皆已完整寫入且格式已統一為多行寫法，每次寫入後都有重新讀取比對大括號/中括號配對（目前為 984/984、319/319，平衡）。
- **本機環境沒有安裝 Node.js**（`node` 指令不存在，PowerShell 與 Bash 皆確認過），語法正確性靠人工讀取比對，並非跑過 `node --check` 或任何自動化 lint／build 驗證。若接手環境有 Node，建議先跑一次語法檢查再繼續動工。
- **接手的 Claude Code 務必實際開啟相關檔案核對現況**（尤其 `data/wine-data.js`、`.gitignore`、`.claude/settings.json` 的 git 追蹤狀態），不要只憑這份 HANDOFF.md 的文字描述去猜測。
- B4 開始前，同樣需要先讀取該批各產區在 `data/wine-data.js` 中的現有內容，逐筆確認現況而非假設全部是最初的短版本。
