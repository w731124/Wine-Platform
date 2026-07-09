# HANDOFF

> 本檔案每次 session 結束時覆蓋重寫，不累加舊內容。最後更新：2026-07-09。

## 一、本次開發歷程

**地圖探索重建，法國已全部完成，義大利本次完成，伊比利（西班牙+葡萄牙）是下一步：**

- **法國**（DECISIONS.md #80-96）：Stage 1-3＋標記碰撞避讓／真實河流／清單hover連動，全部完成並已 push。
- **義大利**（本次完成，DECISIONS.md #97-100）：真實13大區邊界（比法國更單純，region欄位直接對應真實行政區）、波河、20筆座標、編號清單，一次完成不再分3階段（因為不需要凸包近似這一關）。
- **伊比利**（尚未開始）：西班牙10筆＋葡萄牙2筆，使用者已確認「兩國都做」＋「加河流」。

### 義大利做了什麼
1. **Stage 1（座標）**：20筆義大利產區 Nominatim 查詢，12筆精確、8筆近似（大區/子產區取代表城鎮），無低信心項目，使用者確認表格後才寫入 `data/wine-data.js`。
2. **Stage 2（真實邊界，比法國單純）**：新增 `scripts/build-italy-map.pl`。義大利 `region` 欄位（Piedmont/Tuscany/Veneto等13個）直接對應真實義大利行政大區，不需要像法國那樣拿省份湊凸包——直接抓 `openpolis/geojson-italy` 的真實大區邊界。全國輪廓取本土+西西里（`martynafford/natural-earth-geojson`，排除薩丁尼亞/小島，因為只有 Etna/Cerasuolo di Vittoria 兩筆產區在西西里，其餘離島無資料點）。波河（Po）取自與法國共用的同一份河流資料集（快取共用不重複下載）。地圖預覽先發布 Artifact 給使用者確認才整合進 `index.html`。
3. **設計取捨：義大利地圖沒有大區文字標籤**（法國六大區有）——13個大區緊鄰且狹長，疊加文字會嚴重重疊，改由側邊清單的分組標題呈現大區名稱。
4. **程式碼重構**：`js/map.js` 的 `highlightFranceMarker()`／`renderFranceMarkerList()` 抽成通用的 `highlightMapMarker()`／`renderMarkerIndexList(list)`，法國/義大利共用同一套側邊清單邏輯，`renderFranceMarkerList()`／`renderItalyMarkerList()` 變成薄包裝。`js/core.js` 的 `showMap(id,btn)` 新增依 `id` 切換側邊清單＋重置 inspector（因為三個國家分頁共用同一個 `#inspector-placeholder` DOM 元素）。

### 驗證方式
Artifact 預覽確認義大利靴子形狀可辨識、13大區真實邊界正確、波河流經北部；整合進 `index.html` 後 headless Chrome 截圖確認正式頁面呈現一致；直接量測20個標記兩兩間距，最近16.95px（碰撞避讓對義大利同樣有效）；直接呼叫 `selectAppellation('barolo')` 確認動態標記相容；`--dump-dom` 確認無 JS 錯誤；資料結構配對平衡（1075/1075、546/546）。

以上已 commit，**尚未 push**。**接下來要做伊比利（西班牙+葡萄牙+河流），完成後再詢問是否 push。**

## 二、討論過但尚未執行的項目／下一步規劃

- **伊比利地圖（下一步）**：使用者已確認「西班牙+葡萄牙都做」＋「加河流」。西班牙10筆產區（Rioja、Castilla y León系列、Andalusia、Catalonia、Galicia）、葡萄牙2筆（Douro、Vinho Verde，目前地圖上只有文字佔位沒有實際內容）。河流候選需要另外研究（例如西班牙的Douro/Duero河貫穿Ribera del Duero與葡萄牙Douro產區，可能是最值得加的一條，埃布羅河Ebro流經Rioja也可考慮）。地理資料來源：義大利用的 `openpolis` 是義大利專屬，西班牙/葡萄牙的行政區邊界需要另外找（可先嘗試 Natural Earth admin-1 states/provinces 資料集是否涵蓋，該資料集是全球性的，可能一份資料就能同時涵蓋西班牙自治區與葡萄牙行政區，值得優先嘗試而非另外找兩份國別資料）。
- **義大利地圖沒有大區文字標籤**（見上方，刻意設計決定非疏漏）——若使用者覺得少了文字標籤不好辨識，可考慮之後補一版簡短縮寫標籤。
- **`wine-data.js` 的 `emoji` 欄位清理**（產區資料裡的死欄位）——建議與下次技術債清理一併處理。
- **「分級制度」頁面下一步的候選擴充方向**（先前提出、使用者尚未確認）：新世界分級概念對照章節、Rioja、雙向跳轉連結。
- **法國波爾多左右岸分界不完整**（缺 Dordogne，只用 Garonne 概略標示）——若使用者未來想要更完整的呈現需要另外找資料源。
- `auditCountryFlags()` 的 console 警告輸出尚未手動複查過。
- 是否要 push 本次 commit，尚待使用者這次對話明確指示。

## 三、我明確要求先記下來、之後再處理的內容

- 目前沒有新的「先記下來、之後處理」項目。

## 四、現況檢查提醒

- **push 狀態**：本次 session 的 commit 尚未 push——**接手前先跑 `git log --oneline origin/main..HEAD` 確認實際領先數量**，不要直接假設。
- **本次 session（義大利）異動範圍**：`data/wine-data.js`（20筆義大利產區新增 `coords`）、新增 `scripts/build-italy-map.pl`、`index.html`（`#map-italy` 內容全面替換）、`js/map.js`（新增 `ITALY_PROJECTION`／`projectItaly()`／`getItalyAppellations()`／`renderItalyMarkers()`／`renderItalyMarkerList()`，重構出通用的 `highlightMapMarker()`／`renderMarkerIndexList()`，`selectRegion()` 名稱對照表補上10個義大利大區）、`js/core.js`（`showMap()` 新增清單切換邏輯，`DOMContentLoaded` 加 `renderItalyMarkers()`）、`DECISIONS.md`、`HANDOFF.md`。
- **重要技術債**：`scripts/build-italy-map.pl` 開發過程中踩過一個 Perl Unicode 坑——比對檔案裡的中文/重音字元時，讀檔案的 filehandle 如果沒有明確用 `:encoding(UTF-8)`，讀到的是未解碼的原始位元組字串，跟 `\x{...}` 轉義產生的已解碼 Unicode 字串比對永遠不會相符（正則會用 Latin-1 假設硬升級位元組字串，導致比對失敗但不會報錯，容易誤以為邏輯本身有問題而非編碼問題）。**這個坑之後寫伊比利的腳本時要記得避開**：需要跟中文/重音字元比對的地方，開檔案要用 `open($fh, '<:encoding(UTF-8)', $file)`；純粹餵給 `decode_json()` 的 GeoJSON 檔案則維持不加編碼層讀取原始位元組（`decode_json` 自己會處理 UTF-8 解碼），兩種用途不能混用同一種開檔方式。
- **`ITALY_PROJECTION` 常數同步風險**（比照法國 `FRANCE_PROJECTION` 的提醒）：`js/map.js` 這個常數數值是從 `scripts/build-italy-map.pl` 手動複製過來的，之後重跑腳本要記得手動同步更新。
- **義大利地圖沒有大區文字標籤**：這是刻意的設計決定（見上方），不是遺漏，不要在後續工作中「順手」補上而沒有先跟使用者確認。
- **地理資料來源記錄**：義大利大區邊界來自 `openpolis/geojson-italy`；全球國界（含義大利）來自 `martynafford/natural-earth-geojson` 的 `ne_50m_admin_0_countries.json`；河流資料與法國共用同一份 `ne_50m_rivers_lake_centerlines.json`（快取在 `scripts/.geo-cache/rivers.json`）。
- **地圖形狀方法論差異**：法國六大區是凸包近似（因為法國省份跟葡萄酒大區概念不一致），義大利13大區是真實邊界直接使用（因為義大利行政大區跟葡萄酒大區概念一致）——兩種方法論並存於同一個網站是刻意且合理的，不是不一致，因為底層資料特性本來就不同。
- **本機環境限制**：沒有 Node.js，`python3`／`python` 是 Windows Store 空殼（exit code 127 無法用），**真正可用的是 `awk` 與 `perl`**（Perl 內建 `JSON::PP`）。
- **手風琴函式現況**（延續先前記錄）：全站4個各自獨立、範圍鎖定各自面板的手風琴 toggle 函式，刻意不合併成共用函式。
- **`.ic` 卡片套色提醒**（延續先前記錄）：`.ic` 預設背景 `var(--bg-el)`，疊加在同樣背景的容器裡要另外覆蓋成 `var(--bg-card)`。
- **國旗擴充提醒**（延續先前記錄）：新增新國家時要同步補 `COUNTRY_FLAG_CODE` 對照與 `assets/flags/{國碼}.svg`。
- **接手的 Claude Code 務必實際開啟異動的檔案核對真實現況**，不要只憑這份 HANDOFF.md 的文字描述去猜測。
