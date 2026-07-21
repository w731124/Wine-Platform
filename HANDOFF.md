# HANDOFF

> 本檔案每次 session 結束時覆蓋重寫，不累加舊內容。最後更新：2026-07-18。

## 一、本次開發歷程

**本次涵蓋範圍：全站字體大小與內文顏色系統重構（含事後兩輪補洞）、產區資料庫新增智利2筆＋新世界四國9筆、以及3個獨立小bug修正。全部已 commit 並 push，`git status` 為 clean，本機已與 `origin/main` 完全同步（見四、現況檢查提醒的重要說明）。**

### 1. 全站字體大小與內文顏色系統重構（DECISIONS.md #197-204，commit `ab88ff0` + `7d77e4b`）
- **背景**：`:root` 新增8個 `--fs-*` 字級變數（badge12/sm13/label14/base16/lg17/card-title18/2xl20/h1 26px），`.ins-lbl` class 重寫（拿掉大寫/底線，改用變數）。先在「產區資料庫」「品飲系統SAT頁」試點，內文說明文字統一 `font-size:var(--fs-base);color:var(--txt2)`，其餘角色（badge/pill/卡片標題/分組標題/H1/副標題）對應不同`--fs-*`變數，再套用到其餘7個分頁（地圖探索/分級制度/年份矩陣/比較模式/品種圖鑑/釀造工藝/食物搭配）。
- **CLAUDE.md 新增兩條規則**：「字級層級鐵則」（任何結構層級的標題／副標都必須≥其內文字級）與「字體樣式規則」（一律用`--fs-*`變數、內文說明用`var(--txt2)`、新分頁複用`.ins-lbl`）。這是使用者實測發現多處標題比內文小之後，明確要求訂一條可自我檢查的絕對規則，而非逐次補洞。
- **回頭稽核發現的系統性違規**：`.ins-lbl`（原14px）與試點頁副標題（原14px）本身就小於內文（16px），違反剛訂的鐵則，已改為`var(--fs-lg)`（17px）；`--fs-label`變數因此保留但目前**無任何使用處**。
- **事後第二輪追加**（使用者主動指名放大先前判斷為「圖表元件維持原狀」的部分）：年份矩陣表格本身（`.vm-tbl th`／`.vm-region-group-hdr`／`.rl`/`.sub`）、年份詳情卡與產區抽屜的「結構量化」label+數值文字、比較模式與品種圖鑑的Chart.js雷達圖`pointLabels.font.size`（11/9→13，Chart.js吃像素數字無法套CSS變數）、全站`.tg-*`標籤家族（統一放大為`var(--fs-base)`、padding調為4px 12px）。品種圖鑑雷達圖容器因字級放大後長標籤被裁切，一併把canvas容器從260×230px放大到340×290px。
- **順手修正的既有小bug**：`compare.js`用了全站未定義的`var(--text-dim)`（改為`var(--txt4)`）；`.l2-bar{max-height:70px}`固定高度容器因字級放大被裁切（改為160px）；`.tg-match` standalone使用時原本缺`display:inline-flex`等膠囊樣式屬性，一併補上。
- **過程中的插曲**：一次perl批量取代誤把`compare.js`裡的JS模板字串`${c}`當成未定義的Perl變數吃空，造成兩處`<h4>`顏色失效，已發現並用Edit工具修復，事後對全檔案掃描確認無其他同類殘留。

### 2. 產區資料庫擴充（DECISIONS.md #205-207，commit `e5729ef` + `20ce19f`）
- 新增智利 `casablanca-valley`（Aconcagua，沿海冷涼白酒）、`colchagua-valley`（Rapel Valley，頂級紅酒），欄位比照`maipo-valley`結構，僅多一個使用者刻意保留給未來地圖擴充的`coords`欄位。
- 接著新增新世界四國共9筆：USA·California（russian-river-valley、sta-rita-hills）、Australia·South Australia（mclaren-vale、coonawarra、adelaide-hills）、Argentina·Mendoza（lujan-de-cuyo、valle-de-uco）、South Africa·Western Cape（swartland、constantia）。紐西蘭經核實三大產區已完整覆蓋、判斷無需新增。
- 每次新增後都執行`auditWineDB()`確認沒有觸發「新增類型」的警告（「缺少地圖座標」清單會自然納入新id，但這是該國本身無GeoJSON地圖的既有已知情況，非新問題）。

### 3. 三個獨立小bug修正（DECISIONS.md #208-210）
- 產區資料庫L2大區手風琴補上單開收合邏輯（此頁原是全站唯一沒套用此邏輯的手風琴容器）。
- 年份矩陣PANEL容器從左右並排改為上下堆疊，表格與年份資訊卡皆全寬呈現。
- 頂部導覽4個下拉選單的emoji圖示欄固定18px寬並置中，解決不同emoji寬度導致文字對齊參差的問題。

## 二、討論過但尚未執行的項目／下一步規劃

**目前沒有已經和使用者討論過、但擱置未做的具體項目。**

唯一浮現的線索：產區資料庫目前已擴充智利（3筆）、USA/Australia/Argentina/South Africa（各自新增）、紐西蘭（核實無需新增）。**接手時可以主動問使用者**：
- 新世界六國清單裡還有沒有國家/大區沒擴充到？（例如本次沒提到的其他新世界國家）
- 舊世界（法國/義大利/西班牙/德國/奧地利/葡萄牙）是否也要比照做高優先度擴充？
- 除了產區資料庫，其他分頁（品種圖鑑、比較模式）的內容深度擴寫是否要繼續？

## 三、我明確要求先記下來、之後再處理的內容

- 目前沒有「先記下來、之後處理」的擱置項目。

## 四、現況檢查提醒

- **push/pull 狀態（重要）**：本次session結束時執行`git fetch`發現本機**落後origin/main 4個commit**（`20ce19f`/`eadaceb`/`8f57c53`/`d5bdec3`，即上方「2、3」的內容）——這代表在本次對話進行期間，**另有一個獨立的session／裝置對同一repo做了工作並push到GitHub**，本機這份checkout一直沒同步到。已確認本機working tree乾淨、純fast-forward無衝突，已執行`git pull --ff-only`同步。**接手時務必先跑`git fetch && git status -sb`確認目前是否又有落後，不要假設本機一定是最新狀態**——如果使用者同時開著另一台裝置或另一個對話視窗在改同一個repo，這種情況會重複發生。
- **`--fs-label`變數目前保留但無使用處**：`.ins-lbl`與所有H1副標題都因「標題≥內文」鐵則改用`var(--fs-lg)`，`--fs-label`(14px)暫時是個孤兒變數，不算bug，未來若有需要比內文小的次要標題角色可以重新啟用。
- **Chart.js雷達圖字級是手動像素數字**（`pointLabels.font.size:13`），無法用`--fs-*`CSS變數，未來若全站字級系統再調整，記得同步手動改這兩處（`compare.js`兩個雷達圖 + `grapes.js`一個雷達圖）。
- **年份矩陣表格與各頁chart圖例/stat bars的字級判斷基準**：目前只放大了使用者明確點名的部分（表格標題/年份數字/大產區/次產區文字、結構量化5/7項label文字），表格內的分數方塊（`.vc`/`.sc`）本身**沒有**放大，如果之後要動這塊需要重新確認使用者範圍。
- **測試檔案路徑限制（新發現，來自另一session的DECISIONS.md #210）**：臨時測試用的debug html副本**必須放在專案根目錄**才能正確載入相對路徑的`css/style.css`／`js/*.js`；放在系統暫存資料夾（如本session慣用的scratchpad）會導致樣式表載入失敗、渲染成無樣式的破版畫面。本session這幾輪的截圖驗證都是在專案根目錄建立`index.debug.html`副本、驗證後刪除，這個做法是對的，接手者應延續。
- **本機環境限制（沿用既往）**：沒有Node.js，`python3`/`python`是Windows Store空殼，可用`awk`/`perl`；headless Chrome路徑固定在`C:\Program Files\Google\Chrome\Application\chrome.exe`；Windows路徑轉`file://`URL要用`pwd -W`轉換。手風琴類分頁驗證展開狀態時，多數頁面的toggle函式是單開手風琴（點新項目會自動收合其他已展開項目），要驗證特定項目須用`document.querySelectorAll('.acc-hdr')[index]`精確指定，不能對多個header跑forEach。
- **接手的 Claude Code 務必實際開啟異動的檔案核對真實現況**，不要只憑這份 HANDOFF.md 的文字描述去猜測，尤其是git同步狀態這件事本次就證明了「假設本機是最新」會出錯。
