# HANDOFF

> 本檔案每次 session 結束時覆蓋重寫，不累加舊內容。最後更新：2026-07-29。

## 一、本次開發歷程

**本次涵蓋範圍（接續 2026-07-22 HANDOFF，該版由commit `a75550e`寫入、但寫入時機過早——見四、現況檢查提醒的教訓說明）：響應式問題修復、產區資料庫擴充奧地利/葡萄牙、釀造工藝頁production欄位結構化重構、以及移除linkedGrapes改為正文行內品種連結，共4批工作。`git fetch`確認本機領先`origin/main` 2個commit（`62e117b`、`16063d4`尚未push），其餘皆已同步，無落後。**

### 1. 響應式問題修復（DECISIONS.md #219，commit `1c6123c`）
- 依上一輪響應式檢測報告，修復2項「阻礙使用」＋4項「影響美觀但堪用」共6項問題，全部改動加在既有4個`@media`查詢之後的新增區塊，不改動桌面版樣式：
  1. 產區資料庫標題+搜尋框擠壓 → `#regions-header-row`加`flex-wrap:wrap`，搜尋框窄螢幕下改滿版寬度獨立一行。
  2. L2大區篩選列裁切 → 從`max-height`裁切隱藏改為單行橫向捲動（`overflow-x:auto`+`flex-wrap:nowrap`）。
  3. 地圖標記觸控熱區偏小 → 4張地圖的每個標記疊加`r=22`透明`<circle>`擴大熱區，視覺不變。
  4. 年份矩陣捲動提示＋欄名稱裁切 → 新增`updateVMScrollHint()`顯示捲動陰影提示；**根因診斷推翻了報告初稿的假設**：實測證實不是`.rl`的sticky失效，而是Chrome對「跨滿全部欄位的colspan儲存格」完全不支援`position:sticky`，改用拆分儲存格（不跨欄的sticky欄+colspan填滿的裝飾欄）解決。
  5. 比較模式品種下拉選單截斷 → 原提案選擇器因兩種模式DOM深度不一致而失效，改用共用class`cm-two-col`，窄螢幕下改單欄堆疊。
  6. 品種圖鑑雷達圖標籤裁切 → 依實際容器寬度（<300px）動態縮小`pointLabels.font.size`。
- 驗證：headless Chrome於375/390/768px+1280px桌面寬度逐項截圖+DOM量測確認修復生效且桌面版無回歸。

### 2. 產區資料庫擴充：奧地利/葡萄牙（DECISIONS.md #220，commit `317d726`）
- 新增4筆產區：Austria的`kamptal`／`burgenland`（插入於`wachau`之後），Portugal的`dao`／`alentejo`（插入於`vinho-verde`之後）。欄位格式比照`wachau`/`douro`既有結構。
- **意外發現**：Portugal的`dao`/`alentejo`雖無專屬地圖，但因與西班牙共用Iberia地圖，新增座標後自動以編號12/13顯示在既有Iberia地圖上（非刻意實作，是既有渲染邏輯的正確反應）；Austria兩筆則因四張地圖皆不含奧地利，維持既有「缺少地圖座標」狀態。
- `auditWineDB()`驗證106/106通過，無新增類型警告。

### 3. 釀造工藝頁production欄位結構化重構（DECISIONS.md #221，commit `62e117b`）
- `WINE_DB.wineStyles`6個物件新增`productionType`（'table'或'steps'）／`productionSteps`或`productionTable`／`tags`／`linkedGrapes`欄位，原`production`純文字欄位完整保留（不渲染，僅作備份）。sparkling/rosé/fortified用對照表版型，red/white/orange用編號流程版型。
- 新增`js/winestyles.js`的`buildProductionTableHTML()`/`buildProductionStepsHTML()`：table版型深酒紅標題列，steps版型深酒紅圓底白字編號（與`classifications.js`的tiers金色編號刻意區隔）。
- **此批新增的`linkedGrapes`欄位與其獨立卡片渲染，在下一批（#222）又被移除**，是同一場對話裡先做後改的決策，非兩次獨立需求。

### 4. 移除linkedGrapes獨立區塊，改為正文行內品種連結（DECISIONS.md #222，commit `16063d4`）
- 移除#221剛新增的`linkedGrapes`欄位與獨立卡片，改為在`history`/`grapes`/`terroir`/`productionSteps`/`productionTable`文字裡，把符合`WINE_DB.grapes`23個品種名稱的文字直接改成行內連結（`.grape-inline-link`，深酒紅粗體點狀底線，hover轉金色）。
- 動工前逐一比對找出18處確定符合的品種提及，1處邊界案例（fortified的「Moscatel」拼法與資料庫不完全相符）由使用者裁定不轉連結、維持純文字。
- `tags`（工法標籤，如Autolysis/Remuage）完全不受影響。
- 驗證：全站`.grape-inline-link`元素總數18，與比對清單一致；點擊測試確認跳轉品種圖鑑正常；orange/fortified確認無linkedGrapes殘留卡片。

## 二、討論過但尚未執行的項目／下一步規劃

**已重新核對現況（不是照抄舊版假設）：**

- **響應式報告的3項「輕微瑕疵」（regions/mapview標題換行、年份詳情卡grid稍嫌壓迫）仍未處理**——上一批(#219)修復範圍明確只涵蓋「2項阻礙使用+4項影響美觀但堪用」共6項，這3項輕微瑕疵當初報告就判定「非阻塞、可接受」，本次也不在任務範圍內，**目前仍是原樣未動**。接手時可以問使用者是否要順手處理，或維持現狀。
- **產區資料庫擴充討論部分推進**：本次新增了Austria（2筆）與Portugal（2筆），舊世界六國清單裡的法國/義大利/西班牙/德國目前**沒有新進展**（沿用07-18/07-22 HANDOFF遺留的問題）。接手時可以問使用者：
  - 舊世界剩餘4國（France/Italy/Spain/Germany）是否要繼續比照高優先度擴充？
  - 新世界是否還有國家/大區沒擴充到？

## 三、我明確要求先記下來、之後再處理的內容

- 核對本次4批工作的完整對話紀錄，**沒有發現使用者提出「先記下來、之後處理」但尚未處理的擱置項目**。

## 四、現況檢查提醒

- **push狀態（重要）**：本次session結束時本機**領先**`origin/main` 2個commit（`62e117b`、`16063d4`），尚未push。**接手時務必先跑`git fetch && git status -sb`確認目前的落後/領先狀態**，不要假設本機一定是最新或一定已同步。
- **★ HANDOFF.md 曾經失準的教訓（本次修復的起因）**：上一份HANDOFF.md（commit `a75550e`，標註2026-07-22）在寫入當下內容正確，但**寫入之後同一個session又繼續做了響應式問題修復（commit `1c6123c`）**，之後的session又接續做了產區擴充與釀造工藝重構（`317d726`/`62e117b`/`16063d4`），HANDOFF.md卻從未再更新，導致它與DECISIONS.md記載矛盾長達4批工作、約一週的落差（該檔案錯誤宣稱「響應式檢測尚未執行任何修復」，實際上早已修復並驗證通過）。**教訓：覆寫HANDOFF.md必須是收尾動作的最後一步，在該次session最後一次commit之後才寫、且該次commit本身也要被涵蓋進HANDOFF.md的敘述裡；不能在session中途、預期後面還有其他改動時就提前寫死內容。** 是否要把這條規則正式寫進CLAUDE.md，已另外提案給使用者確認（見對話紀錄），尚未定案。
- **本機環境限制（沿用既往）**：沒有Node.js，`python3`/`python`是Windows Store空殼；headless Chrome路徑固定在`C:\Program Files\Google\Chrome\Application\chrome.exe`。UI驗證方式：PowerShell內建`System.Net.HttpListener`起靜態伺服器 + `System.Net.WebSockets.ClientWebSocket`手動驅動headless Chrome DevTools Protocol（`Emulation.setDeviceMetricsOverride`可模擬裝置寬度），這是目前最穩定的做法，建議後續session延用。
- **`--fs-label`變數目前仍是孤兒**（沒有使用處），舊有已知情況，非本次造成。
- **`data/wine-data.js`是CRLF換行**：France/Italy/Iberia三支舊建置腳本的正規表示式只認`\n`，理論上重新執行會失敗（Germany腳本已用`\r?\n`正確處理）。如果之後要重跑舊腳本，記得先修正這個問題。
- **`project-snapshot.md`目前已經過時**：仍含12處`linkedGrapes`殘留文字、完全沒有`grape-inline-link`（#222剛新增的class），代表這份快取檔是在#221之後、#222之前產生的。這份檔案**每次有新commit後都會過時**，如果使用者需要更新版本要重新產生，不要假設現有內容反映最新狀態。
- **接手的Claude Code務必實際開啟異動的檔案核對真實現況**，不要只憑這份HANDOFF.md的文字描述去猜測——這次HANDOFF.md本身失準的教訓正是最好的示範。
