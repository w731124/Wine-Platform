# HANDOFF

> 本檔案每次 session 結束時覆蓋重寫，不累加舊內容。最後更新：2026-07-10。

## 一、本次開發歷程

**本次 session 涵蓋範圍很廣，橫跨全站視覺系統統一、產區資料庫瀏覽邏輯改版、年份矩陣全面重構三大主題，全部已 commit 並 push（DECISIONS.md #125-153）。收尾階段使用者要求暫停開發並存檔，下一步已確定但尚未動工（見「二」）。**

### 1. 全站資訊卡片視覺架構統一（DECISIONS.md #125-134）
- 以「釀造工藝」頁面為標準（`.acc-body` 淺褐底＋`.ic` 白卡片＋標題酒紅色+emoji），套用到產區資料庫抽屜、分級制度、品種圖鑑、品飲系統、年份矩陣資訊卡片共5處。
- 使用者回報展開後小標題（.ins-lbl）跟其他未展開卡片的大標題撞色，改成深金色 `var(--gold-dk)`，展開區域底色也改用色階更深的 `var(--bg-sub)` 加強分區感。
- 接著發現深金色小標題跟部分標籤（`.tg-aroma`、`.tg-reg` 原本也是金色）又撞色，順勢把**全站標籤系統依性質重新分色**（8類：品種綠／風味粉紫／國家舊世界酒紅／國家新世界藍／產區紫／辨識特徵中酒紅／餐酒搭配深綠／WSET徽章淺酒紅），並修正一個既有 bug：`.tg-reg` 這個 class 先前被誤用在「產區名稱」與「辨識特徵」兩種不同性質內容上，新增 `.tg-trait` 拆分獨立。

### 2. 產區資料庫瀏覽邏輯與版面調整（DECISIONS.md #135-139, #145）
- 改為**漸進式瀏覽**：預設「全部」按鈕不再一次列出所有大產區，改成先顯示國家清單入口，點擊特定國家後才展開該國大產區手風琴列表；搜尋框則不受此限制，隨時可跨國搜尋。
- 國家按鈕清單依舊世界／新世界分兩排並置中對齊（原本混在一起靠左排列）。
- 搜尋框從獨立一列移到頁面右上方，跟大標題同一列並排、上緣對齊。
- 4個分頁的小標文字修正過時描述（地圖探索「幾何拓撲示意圖」→「真實地理邊界地圖」；品種圖鑑「八大葡萄品種」→ 不寫死數字的「核心品種與其他重要品種」；SAT「視覺」→「外觀」；產區資料庫拿掉冗餘的L1-L4編號）。

### 3. 年份矩陣全面重構（DECISIONS.md #140-153，改動最大的部分）
- **5年一組手風琴收合**：刪除2000年資料（改為2001-2025），依5年分組，預設全部收合，同一時間僅一組展開，解決原本26欄橫向捲動過長的問題。過程中發現並修正一個 bug：收合組別在第二列年份子標題沒有補空白佔位，導致展開非第一組時整排錯位。
- **產區欄底色改淺褐色**，與白色分數區域做出區隔（原本跟容器同色，視覺上像沒設計過的Excel）。
- **「良好」「普通」兩個級距的分數格取消可點擊互動**：實際稽核後確認這兩個級距全站合計120格皆無深度資料（`WINE_DB.vintages.detail` 查無對應），改用「實際檢查資料是否存在」而非寫死級距字母來決定要不要綁 `onclick`，沒資料的格子加 `vc-static` 取消 hover 效果。
- **5個級距顏色改為依分數高低排列色階**：傳奇=紅、卓越=橘（原金色，因跟優秀的黃色太像而改）、優秀=黃、良好=更淺淡的棕色（呼應其無資料狀態）、普通=灰（不變，文字改用更淺的 `var(--txt4)`）。
- **結構量化新增「餘韻」維度**（4項→5項），**130筆有深度資料的年份（傳奇7＋卓越55＋優秀68）的「年份總結」「氣候成因」文字全部擴寫約一倍字數**，逐一產區分組（Bordeaux L/R、Burgundy Red/White、Rhône N/S、Loire、Alsace、Champagne、Languedoc-Roussillon）手動編輯，過程中修正一次 JS 字串跳脫錯誤（英文所有格 `'s` 誤用雙反斜線跳脫導致語法錯誤，已改為避免在擴寫文字中使用英文縮寫所有格）。

### 4. 其他
- `.claude/settings.json` 解除 `git push` 的硬性 deny 規則（改由 auto mode 一般確認流程處理）。
- 應使用者要求，把全專案原始碼（排除 `.git`／`.claude`／`node_modules`／`scripts/.geo-cache`，共31個檔案、約0.89MB）合併輸出成 `project-snapshot.md` 供上傳使用——**此檔案為一次性輸出，未加入版控，且目前已不存在於專案目錄中（推測使用者下載後自行刪除），未來若再需要可重新產生，指令記錄見對話紀錄**。

### 驗證方式
本次每個階段性修改都用 headless Chrome（`chrome.exe --headless=new --screenshot` / `--dump-dom`）截圖或檢查 DOM 屬性驗證，年份矩陣資料異動額外用 `grep`／Perl 統計 `finish:` 數量與大括號開合數確認 JSON 結構完整。全部改動皆已 commit 且 push，`git status` 為 clean。

## 二、討論過但尚未執行的項目／下一步規劃

**下一步已與使用者確認方向、但尚未動工：擴充「分級制度」頁面，新增德國／西班牙／葡萄牙的法定分級制度，目前只有法國與義大利兩國。** 提出的清單（**尚待使用者對此清單本身按下最終確認**，上一輪對話只確認了「要新增這三國」的大方向，清單細節在使用者要求存檔前還沒得到逐項確認）：

| 國家 | 制度名稱 | 分類邏輯（basis） |
|---|---|---|
| 德國 | VDP Erste Lage／Grosse Lage（葡萄園分級） | vineyard（與勃根地特級園對照） |
| 德國 | Prädikatswein 成熟度金字塔（Kabinett→Spätlese→Auslese→BA→TBA/Eiswein） | region（與義大利DOCG金字塔對照） |
| 西班牙 | DO／DOCa 全國分級金字塔（僅Rioja、Priorat達DOCa） | region |
| 西班牙 | Rioja Crianza／Reserva／Gran Reserva（陳年分級） | estate（**注意：這是三者中最不完美對應的分類，實際判準是陳年時間而非酒莊所有權，動工時記得在 crossNote 誠實說明這個落差，不要為了硬塞進現有3個basis類別而模糊帶過**） |
| 葡萄牙 | DOC／Vinho Regional 全國分級金字塔 | region |

接手時建議：
1. 先跟使用者確認上表清單本身（尤其 Rioja 陳年分級的 basis 歸類方式），比照本次 session 其他任務的模式（先示範一筆、確認風格後再批次寫完）。
2. 資料寫入位置：`data/wine-data.js` 第2687行 `classifications:` 陣列，插入方式與現有7筆同結構（`id`／`country`／`region`／`name`／`basis`／`basisLabel`／`summary`／`tiers[]`／`history`／`crossNote`）。
3. `js/classifications.js` 的 `CLASS_BASIS_META` 已經有 estate/vineyard/region 三個 key，不需要新增 class 或改 UI，純粹是資料層新增。
4. 新增後記得核對「分級制度」小標「舊世界法定分級制度」是否還需要調整（目前小標沒提具體國家數量，理論上不用改，但建議動工前再看一眼現況）。

其餘先前記錄、本次未處理的既有事項（延續自更早的 HANDOFF）：
- 義大利 Lombardy／Piedmont 兩個地圖標籤仍稍微靠近（`MAX_DISPLACEMENT` 58px 是目前測試下來效果較平衡的數值，調到72會有標籤被推太遠的副作用）。
- 法國波爾多左右岸分界不完整（缺 Dordogne，只用 Garonne 概略標示）。
- `auditCountryFlags()` 的 console 警告輸出已於先前 session 複查過、確認無異常，之後如資料再擴充建議重新複查一次。

## 三、我明確要求先記下來、之後再處理的內容

- 目前沒有新的「先記下來、之後處理」項目（分級制度擴充已明確排入「下一步」而非擱置事項，見上方「二」）。

## 四、現況檢查提醒

- **push 狀態**：本次 session 所有 commit 皆已 push，`git status` 為 clean，`git log --oneline origin/main..HEAD` 應為空。接手前仍建議實際跑一次指令確認，不要假設。
- **本次 session 異動檔案範圍**：`index.html`（多處版面與樣式調整，範圍已於上方逐項說明）、`css/style.css`（tag顏色、卡片底色、年份矩陣表格樣式）、`js/regions.js`、`js/classifications.js`、`js/grapes.js`、`js/vintage.js`（新增 `toggleVMGroup()`／`vmOpenGroup` 狀態、`openVMI()` dims 陣列擴充）、`data/wine-data.js`（vintages.detail 130筆擴寫+新增finish欄位）、`DECISIONS.md`（#125-153）、`.claude/settings.json`（git push deny 規則解除，此檔案已 commit 過，非本次才發現的 unstaged 狀態）。
- **標籤色盤現況（新發現，重要）**：全站標籤（`.tg-*`）已於本次改為8種語意色，若未來新增任何標籤類型，記得先查 `css/style.css` 裡 `.tg-grape/.tg-aroma/.tg-co/.tg-nw/.tg-reg/.tg-trait/.tg-food/.tg-match` 現有色碼，避免又跟既有類別撞色；`.ins-lbl` 小標題固定用 `var(--gold-dk)`，這個顏色刻意不分配給任何標籤類別，新增標籤時要避開。
- **年份矩陣資料結構現況（新發現，重要）**：`WINE_DB.vintages.detail` 的 `structure` 物件現在是5個key（`acidity`/`tannin`/`body`/`alcohol`/`finish`），跟「產區資料庫」`app.profile` 的7個key（多`aging`/`floral`）不同，這是刻意設計（陳年潛力已有「巔峰」日期欄位涵蓋、花香/草本屬品種固定特徵非年份變因），不是漏加，未來如果有人問「怎麼年份矩陣只有5個維度」不要誤以為要補齊到7個。
- **JS 字串跳脫提醒（本次踩過的坑）**：在 `data/wine-data.js` 這類單引號字串陣列裡寫入英文內容時，絕對不要用英文所有格縮寫（`vigneron's` 這類），本次曾因為跳脫符號寫錯（`\\'` 而非 `\'`）直接讓 JS 語法炸掉，後來直接改寫成不含英文縮寫的說法解決，比手動處理跳脫符號更保險。
- **`project-snapshot.md` 現況**：已產生過一次（31檔案、約0.89MB，排除 `scripts/.geo-cache/`），但檔案目前已不在專案目錄中，且從未加入版控，純粹是一次性輸出給使用者下載用，不是遺漏的異動。
- **`.claude/settings.json` 的 `permissions.defaultMode: acceptEdits`**：如果接手時在 `settings.local.json`（非本次改動的 `settings.json`）看到這個異動仍是 unstaged 狀態，屬於正常現象（各裝置各自維護，不共用），除非使用者明確指示才處理。
- **本機環境限制（延續先前記錄）**：沒有 Node.js，`python3`／`python` 是 Windows Store 空殼，實際可用的是 `awk` 與 `perl`；headless Chrome 路徑固定在 `C:\Program Files\Google\Chrome\Application\chrome.exe`，Windows 路徑轉 file:// URL 要用 `cygpath -w` 再把反斜線換成正斜線，不能直接用 bash 的 POSIX 路徑（會變成 `file:///c/...` 而非 `file:///C:/...`，導致 ERR_FILE_NOT_FOUND）。
- **接手的 Claude Code 務必實際開啟異動的檔案核對真實現況**，不要只憑這份 HANDOFF.md 的文字描述去猜測。
