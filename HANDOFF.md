# HANDOFF

> 本檔案每次 session 結束時覆蓋重寫，不累加舊內容。最後更新：2026-07-09。

## 一、本次開發歷程

**地圖探索重建全部完成：法國／義大利／伊比利三張地圖都已是真實地理邊界＋動態產區標記，取代了最早的手繪示意圖版本。**

- **法國**（DECISIONS.md #80-96）：Stage 1-3＋標記碰撞避讓／真實河流／清單hover連動，全部完成並已 push。
- **義大利**（DECISIONS.md #97-100）：真實13大區邊界（region欄位直接對應真實行政區，不需凸包）、波河、20筆座標、編號清單，已完成並已 push。
- **伊比利**（本次完成，DECISIONS.md #101-104）：西班牙11筆＋葡萄牙2筆，西班牙／葡萄牙採兩種不同方法論並存，見下方。**尚未 push。**

### 伊比利做了什麼
1. **Stage 1（座標）**：13筆伊比利產區（西班牙11筆＋葡萄牙2筆）Nominatim 查詢，皆已交使用者確認表格後才寫入 `data/wine-data.js`。西班牙產區數量查詢前重新核實為11筆（原本記憶誤植為10筆，見下方技術債段落）。
2. **Stage 2（真實邊界，西班牙／葡萄牙雙方法論並存）**：新增 `scripts/build-iberia-map.pl`。西班牙的 `region` 欄位值（Rioja/Castilla y León/Andalusia/Catalonia/Galicia/Murcia/Navarra）直接對應西班牙官方自治區，比照義大利模式直接抓真實邊界；葡萄牙的 `region` 欄位值（Douro/Vinho Verde）是產區概念不對應行政區，比照法國模式用 distrito 分組湊凸包（Douro=Vila Real+Bragança+Viseu，Vinho Verde=Viana do Castelo+Braga+Porto，方案已先與使用者確認）。邊界資料來源改用 `geoBoundaries`（`wmgeolab/geoBoundaries`）——義大利用的 `openpolis` 是義大利專屬、Natural Earth 的 admin-1 資料集試過兩個來源都只涵蓋少數大國不含西班牙/葡萄牙，最後確認 `geoBoundaries` 的 ESP-ADM1/PRT-ADM1 simplified GeoJSON 可用。全國輪廓＝西班牙+葡萄牙本土（各自抓最大環，排除 Canarias/Baleares/Azores/Madeira，無產區資料點）。河流：Duero/Ebro（Duero 這條線本身就橫跨西班牙內陸到葡萄牙出海口，同一條線同時代表西班牙 Duero 與葡萄牙 Douro，不需分開處理）。
3. **新增大區標籤避讓演算法**：使用者明確要求「記得放上大區名，並避免像法國那樣被標記遮住」，因此伊比利是三張地圖裡唯一「有標籤且做過避讓運算」的版本（法國有標籤但沒避讓，已知瑕疵；義大利完全不加標籤）。在 `build-iberia-map.pl` 裡新增以標籤為可動點、標記為固定點的相互推擠演算法，推離所有產區標記與彼此，收斂後夾住畫布邊界。
4. 地圖預覽（西班牙+葡萄牙輪廓、9個大區形狀、河流、9個避讓後標籤、13個標記）先發布 Artifact 讓使用者確認兩輪（第一輪標籤與標記重疊、調整避讓參數後第二輪通過）才整合進 `index.html`。

### 驗證方式
Artifact 預覽確認伊比利半島輪廓可辨識、9個大區真實邊界/分組正確、Duero/Ebro河流流經正確位置、標籤不再被標記遮住；整合進 `index.html` 後 headless Chrome 截圖確認正式頁面呈現一致、13個編號標記地理位置吻合（rioja在北部、jerez在南部安達魯西亞、douro/vinho-verde在葡萄牙北部等）；直接量測13個標記兩兩間距，最近16.95px（與法國/義大利一致的碰撞避讓效果）；`--dump-dom` 確認頁面載入無 JS 錯誤，68個 `.pulse-marker`（35+20+13）數量與三國資料筆數相符。

以上已完成但**尚未 commit、尚未 push**。**下一步：確認是否要 commit 並詢問是否 push。**

## 二、討論過但尚未執行的項目／下一步規劃

- **是否要 commit 本次伊比利地圖異動，以及 commit 後是否要 push**，尚待使用者這次對話明確指示。
- **義大利地圖沒有大區文字標籤**（刻意設計決定非疏漏，見 DECISIONS.md #99）——若使用者覺得少了文字標籤不好辨識，可考慮之後補一版簡短縮寫標籤（伊比利已有避讓演算法可直接沿用同一套邏輯）。
- **法國地圖的大區文字標籤沒有做避讓運算**（已知瑕疵，DECISIONS.md #92 記錄過）——伊比利已經做出可用的避讓演算法（`build-iberia-map.pl` 裡），若使用者之後想補強法國，可以把同一套邏輯搬過去，不需要重新設計。
- **`wine-data.js` 的 `emoji` 欄位清理**（產區資料裡的死欄位）——建議與下次技術債清理一併處理。
- **「分級制度」頁面下一步的候選擴充方向**（先前提出、使用者尚未確認）：新世界分級概念對照章節、Rioja、雙向跳轉連結。
- **法國波爾多左右岸分界不完整**（缺 Dordogne，只用 Garonne 概略標示）——若使用者未來想要更完整的呈現需要另外找資料源。
- `auditCountryFlags()` 的 console 警告輸出尚未手動複查過。
- **`.claude/settings.json` 的 `permissions.defaultMode: acceptEdits` 異動從很早以前就一直是 unstaged 狀態**，每次 session 都刻意不 commit（使用者當初問過一次是否要 commit，之後沒有明確回覆，後續所有 commit 都刻意排除這個檔案）。接手時如果 `git status` 看到這個 modified 檔案是正常現象，不是這次 session 造成的，除非使用者明確指示才處理。

## 三、我明確要求先記下來、之後再處理的內容

- 目前沒有新的「先記下來、之後處理」項目。

## 四、現況檢查提醒

- **push 狀態**：目前為止所有法國/義大利的 commit 應該都已 push（上次 session 收尾時使用者確認過 push），但本次伊比利的異動**連 commit 都還沒做**——**接手前先跑 `git status` 與 `git log --oneline origin/main..HEAD` 確認實際狀態**，不要直接假設。
- **本次 session（伊比利）異動範圍**：`data/wine-data.js`（13筆伊比利產區新增 `coords`）、新增 `scripts/build-iberia-map.pl`、`index.html`（`#map-iberia` 內容全面替換，從舊手繪版本改為真實邊界+動態標記+大區標籤）、`js/map.js`（新增 `IBERIA_PROJECTION`／`projectIberia()`／`getIberiaAppellations()`／`renderIberiaMarkers()`／`renderIberiaMarkerList()`，`selectRegion()` 名稱對照表補上9個伊比利大區鍵值、移除舊版遺留的 `ribera-del-duero`/`jerez` 鍵值）、`js/core.js`（`showMap()` 新增 `iberia` 分支，`DOMContentLoaded` 加 `renderIberiaMarkers()`）、`DECISIONS.md`（#101-104）、`HANDOFF.md`。
- **重要技術債（新發現）**：`geoBoundaries` 葡萄牙資料集裡 `BRAGANÇA` 這個地名的「Ç」字元是雙重 UTF-8 編碼（上游資料本身的瑕疵，不是我方解碼錯誤），比對時要用實際出現的雙重編碼形式 `\x{c3}\x{87}` 而非正常的 `\x{c7}`。這是繼義大利腳本已記錄的「比對中文字元要用 `:encoding(UTF-8)` 開檔」陷阱之外，另一種變形的編碼陷阱——**之後若再處理其他國家的地理資料，遇到比對永遠不成功但邏輯看起來沒錯時，要懷疑上游資料本身的編碼是否有瑕疵，直接印出實際位元組/碼位比對，不要預設自己的轉義字串一定是對的**。
- **`IBERIA_PROJECTION` 常數同步風險**（比照法國/義大利的提醒）：`js/map.js` 這個常數數值是從 `scripts/build-iberia-map.pl` 手動複製過來的，之後重跑腳本要記得手動同步更新。
- **地理資料來源記錄**：西班牙/葡萄牙自治區/distrito 邊界來自 `geoBoundaries`（`wmgeolab/geoBoundaries`，ESP-ADM1/PRT-ADM1 simplified GeoJSON，經 `www.geoboundaries.org/api/current/gbOpen/{ISO3}/ADM1/` 查詢 metadata 取得下載連結）；全球國界（含西班牙/葡萄牙）來自與法國/義大利共用的 `martynafford/natural-earth-geojson` 的 `ne_50m_admin_0_countries.json`；河流資料同樣共用 `ne_50m_rivers_lake_centerlines.json`（快取在 `scripts/.geo-cache/rivers.json`）。**注意**：Natural Earth 的 admin-1 states/provinces 資料集（不論是 `martynafford` 版本還是官方 `nvkelso/natural-earth-vector` 版本）都試過，只涵蓋少數大國（各100/294筆），不含西班牙/葡萄牙，之後若有其他小國需要行政區邊界，`geoBoundaries` 是比 Natural Earth admin-1 更可靠的候選來源（涵蓋全球每個國家，經 API 查詢即可取得下載連結）。
- **地圖形狀方法論差異（三張地圖三種組合）**：法國六大區凸包近似（省份≠葡萄酒大區概念）；義大利13大區真實邊界直接使用（大區＝葡萄酒大區概念一致）；伊比利兩者並存（西班牙真實邊界、葡萄牙凸包近似）——同一個網站三種方法論並存是刻意且合理的，取決於底層行政區資料與葡萄酒產區概念是否一致，不是不一致的技術債。
- **大區文字標籤現況（三張地圖三種處理）**：法國有標籤但沒避讓（已知瑕疵）；義大利完全不加標籤（刻意設計）；伊比利有標籤且有避讓演算法（本次新增，使用者驗收通過）——若之後要統一或補強，伊比利的避讓演算法是可直接沿用的現成邏輯。
- **本機環境限制**：沒有 Node.js，`python3`／`python` 是 Windows Store 空殼（exit code 127 無法用），**真正可用的是 `awk` 與 `perl`**（Perl 內建 `JSON::PP`）。
- **手風琴函式現況**（延續先前記錄）：全站4個各自獨立、範圍鎖定各自面板的手風琴 toggle 函式，刻意不合併成共用函式。
- **`.ic` 卡片套色提醒**（延續先前記錄）：`.ic` 預設背景 `var(--bg-el)`，疊加在同樣背景的容器裡要另外覆蓋成 `var(--bg-card)`。
- **國旗擴充提醒**（延續先前記錄）：新增新國家時要同步補 `COUNTRY_FLAG_CODE` 對照與 `assets/flags/{國碼}.svg`（西班牙/葡萄牙國旗應該在更早的國旗任務就已經補齊，這次沒有再檢查）。
- **接手的 Claude Code 務必實際開啟異動的檔案核對真實現況**，不要只憑這份 HANDOFF.md 的文字描述去猜測。
