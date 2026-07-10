# HANDOFF

> 本檔案每次 session 結束時覆蓋重寫，不累加舊內容。最後更新：2026-07-10。

## 一、本次開發歷程

**本次 session 涵蓋範圍很廣，橫跨全站視覺系統統一、產區資料庫瀏覽邏輯改版、年份矩陣全面重構、分級制度擴充四大主題，全部已 commit 並 push，`git status` 為 clean（DECISIONS.md #125-158）。使用者已明確表示本階段開發告一段落，目前沒有待執行的下一步項目。**

### 1. 全站資訊卡片視覺架構統一（DECISIONS.md #125-134）
- 以「釀造工藝」頁面為標準（`.acc-body` 淺褐底＋`.ic` 白卡片＋標題酒紅色+emoji），套用到產區資料庫抽屜、分級制度、品種圖鑑、品飲系統、年份矩陣資訊卡片共5處。
- 展開後小標題（`.ins-lbl`）改為深金色 `var(--gold-dk)`（原本跟大標題同為酒紅撞色），展開區域底色改用 `var(--bg-sub)`。
- **全站標籤系統依性質重新分色**（8類：品種綠／風味粉紫／國家舊世界酒紅／國家新世界藍／產區紫／辨識特徵中酒紅／餐酒搭配深綠／WSET徽章淺酒紅），修正 `.tg-reg` 先前被誤用在「產區名稱」與「辨識特徵」兩種不同性質內容上的既有 bug，新增 `.tg-trait` 拆分獨立。

### 2. 產區資料庫瀏覽邏輯與版面調整（DECISIONS.md #135-139, #145）
- 改為**漸進式瀏覽**：預設不再一次列出所有大產區，改成先顯示國家清單入口，點擊特定國家後才展開該國大產區手風琴列表；搜尋框不受此限制，隨時可跨國搜尋，且已從獨立一列移到頁面右上方與標題並排。
- 國家按鈕清單依舊世界／新世界分兩排並置中對齊。
- 4個分頁的小標文字修正過時描述（地圖探索、品種圖鑑、SAT、產區資料庫）。

### 3. 年份矩陣全面重構（DECISIONS.md #140-153，改動最大的部分）
- **5年一組手風琴收合**：刪除2000年資料（改為2001-2025），依5年分組，預設全部收合，解決原本26欄橫向捲動過長的問題；修正過收合組別在第二列年份子標題錯位的 bug。
- 產區欄底色改淺褐色與白色分數區域區隔；「良好」「普通」兩個無深度資料的級距分數格取消可點擊互動。
- **5個級距顏色改為依分數高低排列色階**：傳奇=紅、卓越=橘、優秀=黃、良好=淡棕、普通=灰。
- **結構量化新增「餘韻」維度**（4項→5項），**130筆有深度資料的年份的「年份總結」「氣候成因」文字全部擴寫約一倍字數**，逐一產區分組手動編輯完成。

### 4. 分級制度擴充（DECISIONS.md #154-158，本次最後完成的工作）
- **新增德國／西班牙／葡萄牙共5筆法定分級制度**：VDP Lagenklassifikation（vineyard）、Prädikatswein成熟度分級（region）、西班牙DO/DOCa金字塔（region）、Rioja Crianza/Reserva/Gran Reserva陳年分級（estate，但誠實註記這是三種basis中最不完美對應的分類）、葡萄牙DOC/Vinho Regional金字塔（region）。`classifications` 陣列從7筆增至12筆，補齊小標「舊世界法定分級制度」原本只兌現法國、義大利兩國的落差。
- **緊接著把全部12筆（原7＋新5）的內容做深度擴寫**：`summary`／`history`／`crossNote` 三欄位皆擴寫，部分過短的 `tiers[].note` 補上代表酒莊／產區實例，不變動任何既有客觀事實數字。兩個階段都先示範一筆（`bordeaux-1855`）定調風格/幅度，經使用者確認後才批次套用到其餘。

### 其他
- `.claude/settings.json` 解除 `git push` 的硬性 deny 規則。
- 曾應使用者要求，把全專案原始碼（排除 `.git`／`.claude`／`node_modules`／`scripts/.geo-cache`，共31個檔案、約0.89MB）合併輸出成 `project-snapshot.md` 供上傳使用，此為一次性輸出，未加入版控，目前已不在專案目錄中。

### 驗證方式
本次每個階段性修改都用 headless Chrome（`chrome.exe --headless=new --screenshot` / `--dump-dom`）截圖或檢查 DOM 屬性驗證，大量文字資料異動額外用 `grep`／Perl 統計數量與大括號開合數確認 JSON 結構完整。全部改動皆已 commit 且 push。

## 二、討論過但尚未執行的項目／下一步規劃

**目前沒有待執行的下一步項目**——先前記錄的「分級制度擴充」已於本次 session 完整執行完畢（新增5筆＋全12筆擴寫），使用者已表示本階段開發告一段落。

其餘先前記錄、仍未處理的既有事項（延續自更早的 HANDOFF，非本次新增，優先度較低）：
- 義大利 Lombardy／Piedmont 兩個地圖標籤仍稍微靠近（`MAX_DISPLACEMENT` 58px 是目前測試下來效果較平衡的數值）。
- 法國波爾多左右岸分界不完整（缺 Dordogne，只用 Garonne 概略標示）。

**接手時建議先問使用者想從哪個主題繼續**，例如：
- 其他分頁（品種圖鑑、品飲系統、比較模式）是否也要比照分級制度／年份矩陣做內容深度擴寫？
- 地圖探索的既有小瑕疵（Lombardy/Piedmont 標籤、波爾多左右岸分界）是否要處理？
- 是否有全新功能方向？

## 三、我明確要求先記下來、之後再處理的內容

- 目前沒有「先記下來、之後處理」的擱置項目。

## 四、現況檢查提醒

- **push 狀態**：本次 session 所有 commit 皆已 push，`git status` 為 clean，`git log --oneline origin/main..HEAD` 應為空。接手前仍建議實際跑一次指令確認，不要假設。
- **標籤色盤現況（重要）**：全站標籤（`.tg-*`）已改為8種語意色（`.tg-grape/.tg-aroma/.tg-co/.tg-nw/.tg-reg/.tg-trait/.tg-food/.tg-match`），`.ins-lbl` 小標題固定用 `var(--gold-dk)`，這個顏色刻意不分配給任何標籤類別。未來新增任何標籤類型或卡片小標題，記得先查現有色碼避免撞色。
- **年份矩陣資料結構現況（重要）**：`WINE_DB.vintages.detail` 的 `structure` 物件是5個key（`acidity`/`tannin`/`body`/`alcohol`/`finish`），跟「產區資料庫」`app.profile` 的7個key（多`aging`/`floral`）不同，這是刻意設計不是漏加。
- **分級制度資料結構現況（重要，新發現）**：`classifications` 陣列12筆的 `basis` 欄位只有三種值（`estate`/`vineyard`/`region`），對應 `js/classifications.js` 的 `CLASS_BASIS_META`；`rioja-aging` 這一筆勉強歸類在 `estate` 但實際判準是陳年時間，若未來要新增其他「陳年時間導向」的分級制度（如Chianti Riserva體系以外的案例），建議先考慮是否該新增第四種 basis 類別，而非持續往 estate 硬塞。
- **JS 字串跳脫提醒（本次踩過的坑，務必牢記）**：在 `data/wine-data.js` 這類單引號字串陣列裡寫入英文內容時，絕對不要用英文所有格縮寫（如 `vigneron's`），曾因跳脫符號寫錯（`\\'` 而非 `\'`）直接讓 JS 語法炸掉；已有多處既有資料正確使用單一反斜線 `\'` 跳脫（如 `Château d\'Yquem`），可以複製既有寫法但新增文字時最保險的做法還是直接避開英文所有格用詞。
- **`project-snapshot.md` 現況**：已產生過一次，但檔案目前已不在專案目錄中，且從未加入版控，純粹是一次性輸出給使用者下載用，不是遺漏的異動。
- **本機環境限制**：沒有 Node.js，`python3`／`python` 是 Windows Store 空殼，實際可用的是 `awk` 與 `perl`；headless Chrome 路徑固定在 `C:\Program Files\Google\Chrome\Application\chrome.exe`，Windows 路徑轉 file:// URL 要用 `cygpath -w` 再把反斜線換成正斜線（`${WINPATH//\\//}`），不能直接用 bash 的 POSIX 路徑。
- **接手的 Claude Code 務必實際開啟異動的檔案核對真實現況**，不要只憑這份 HANDOFF.md 的文字描述去猜測。
