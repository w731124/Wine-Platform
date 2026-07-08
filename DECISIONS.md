# DECISIONS

> 本檔案記錄每個階段性功能完成後的關鍵決策與原因，採**追加**寫法，不覆蓋舊內容。

## 2026-07-07（commit `aebceb8`）品種雷達圖視覺區隔、標籤雙語化、比較模式動態酒色篩選、產區描述擴充試點

1. **品種圖鑑雷達圖 7 維視覺區隔**：用實心/空心點＋標籤深淺＋文字圖例區分「品種基因決定」（單寧、酸度、花香）與「風格參考值」（酒體、酒精、餘韻、陳年潛力）兩類維度，而非移除或合併維度。
   原因：兩類維度的證據強度不同，同一種視覺呈現會把產地/釀造結果誤呈現為固有品種特性，是真實的教學正確性風險。
2. **aromaWheel／foodPairingTags／keyIdentifiers 雙語化**：直接把翻譯寫進 `data/wine-data.js` 陣列字串（`English(中文)` literal），不另建翻譯對照層。
   原因：與既有 `name`／`country`／`region` 欄位的既定慣例一致，避免引入新架構模式；資料量雖大（56×3＋8×2）但一次性異動即可，未來新增產區時比查表更直覺。
3. **比較模式移除「全部」酒色篩選鈕**，改為依 `WINE_DB.appellations` 實際出現的 `wineColor` 動態產生按鈕，且無「全部」選項，強制使用者先選定酒色。
   原因：從資料流上根除 A/B 兩側選到不同酒色的無意義比較組合，比選完後才跳提示更早攔截問題；同時一併解決氣泡酒篩選鈕重複貼上的既有 bug，未來新增酒色（如 rosé）時按鈕會自動出現，不必手動同步。
4. **產區描述擴充採「兩筆試點先確認再擴大」策略**（haut-medoc／marlborough），刻意選一個 old-world／red 與一個 new-world／white 做對照。
   原因：內容涉及真實史實與風土細節，先驗證格式與內容品質、抓出不確定的事實（如年份），再決定是否套用到其餘 53 筆，降低批次出錯或風格跑掉的風險。
5. **新增 `agingNote` 欄位＋`js/regions.js` 條件式渲染**（`${app.agingNote ? ... : ''}`）：只有存在 `agingNote` 的產區才顯示「陳年潛力解析」區塊。
   原因：允許欄位漸進式導入（試點／分批擴充），之後每批新增資料時不需要同步改一次渲染程式碼。

## 2026-07-08（commit `a86e61c`）產區描述擴充 B1-B3

6. **依批次計畫（B1～B11）擴充剩餘 53 個產區**，本次完成 B1（波爾多左岸 5 筆）＋B2（波爾多左岸/右岸 5 筆）＋B3（布根地 7 筆）共 17 筆，沿用試點的欄位格式與字數目標。
   原因：一次改 53 筆風險過高、不易核對，分批處理可以讓每批結束後單獨檢查與 commit。
7. **語法正確性以人工讀取比對＋大括號/引號配對檢查為主，未跑自動化 lint／`node --check`**。
   原因：本機環境未安裝 Node.js（PowerShell 與 Bash 皆確認 `node` 指令不存在）；記錄下來提醒之後若換到有 Node 的環境，建議補一次自動化語法檢查。

## 2026-07-08 CLAUDE.md 版控化＋B1-B3 格式一致性修正

8. **CLAUDE.md 正式加入 git 版控**。
   原因：先前多個 session 都是讀取上層目錄的 CLAUDE.md 但未納入 repo，換裝置時容易拿不到最新版；使用者明確決定要正式版控，讓工作慣例本身也受版本歷史保護。
9. **margaux／saint-emilion／chablis／cote-de-nuits／cote-de-beaune 的 `terroir` 從單行改成與其餘 12＋2 筆一致的多行寫法**；字數超標或不足（如 `cote-de-nuits.history` 247 字、`cote-de-beaune.agingNote` 149 字、`hautes-cotes-de-nuits.history` 131 字等）刻意不強行調整。
   原因：純排版一致性問題不影響顯示或資料正確性，值得統一；而字數目標本來就是避免版面跑版的軟性參考值，只要沒有實際影響 `regions.js` 兩欄排版或需要動到程式，就不必為了湊數字犧牲語意完整度或塞入填充句。
10. **DECISIONS.md 補寫回溯至 `aebceb8`／`a86e61c` 兩次 commit**，未在完成當下即時寫入。
    原因：使用者於 2026-07-08 明確表示先不補寫，等下一個階段性功能完成後（即本次）再一併回溯記錄，避免中斷當時的開發節奏。

## 2026-07-08 `.claude/` 分流版控（settings.json 追蹤、settings.local.json 排除）

11. **新增 `.gitignore`，僅排除 `.claude/settings.local.json`；`.claude/settings.json` 則納入版控**。
    原因：`settings.json` 內容是「git push/fetch/pull 免確認」這類跨裝置共用的專案層級設定，版控後可讓另一台裝置開啟 repo 時直接沿用；`settings.local.json` 是 Claude Code 每次 session 自動累加寫入的「已核准指令清單」，內含本機暫存資料夾絕對路徑，換裝置或換 session 即失去意義，版控只會讓歷史越滾越亂，故排除。

## 2026-07-08 產區描述擴充 B4（香檳＋阿爾薩斯）

12. **完成 B4：montagne-de-reims、vallee-de-la-marne、cote-des-blancs、alsace 共 4 筆**，沿用試點與 B1-B3 的欄位格式、字數目標與多行 `terroir` 寫法。
    原因：延續既定批次計畫接續作業；`alsace.history`（215字）略超 200 字上限，因為要完整交代法德多次易手史與品種標示傳統這兩項核心史實，選擇保留完整語意而非砍字湊數。
13. **修正 `vallee-de-la-marne.famousEstates` 既有錯誤資料**：移除 `'Jean-Marc Selosse anko'`（疑似資料損壞產生的錯字／幻覺內容——Jacques Selosse 實際上是白丘 Avize 的生產者，不屬於馬恩河谷，且「anko」無法辨識其意義），僅保留可確認正確的 `Gaston Chiquet`、`José Michel` 兩筆。
    原因：此為執行 B4 任務時範圍外意外發現的資料品質問題，使用者確認後一併修正；未自行猜測替換成其他生產者名稱（雖懷疑原意可能是馬恩河谷小農 Jean-Marc Sélèque，但把握不足，選擇移除而非用不確定的猜測填補）。
