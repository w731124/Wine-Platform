# HANDOFF

> 本檔案每次 session 結束時覆蓋重寫，不累加舊內容。最後更新：2026-07-08。

## 一、本次開發歷程

延續義大利/西班牙第二輪深化（`6ec41f6`，91個產區）之後，本次 session 執行**三步驟計畫的第三步：全面複查產區與品種的連結**。

### 複查方式
比對 91 個產區的 `primaryGrapes`（純文字品種陣列）與 23 個品種的 `representativeRegions`（產區id陣列），發現四類落差，逐類回報使用者定案：

1. **明確遺漏（2項，已修正）**：`zinfandel-primitivo` 補 `primitivo-di-manduria`、`gewurztraminer` 補 `alto-adige`——這兩筆是先前 session 自己說要連結卻忘記做的疏漏。
2. **同品種不同國家命名（已定案處理原則並執行4筆）**：`primaryGrapes` 維持依當地命名（不強制統一），改在品種頁 `styleSummary` 補一句提及別名。已更新 `tempranillo`（提及 Tinta de Toro）、`albarino`（提及 Alvarinho）、`pinot-noir`（提及 Spätburgunder）、`pinot-gris`（提及 Grauburgunder）。
3. **representativeRegions 缺口（優先修3項，其餘列待辦）**：`pinot-noir` 補 `montagne-de-reims`／`vallee-de-la-marne`、`semillon` 補 `hunter-valley`、`viognier` 補 `cote-rotie`。
4. **品種完全沒有對應頁面（~30個品種名稱，維持擱置）**：如 Marsanne、Mourvèdre、Corvina、Aglianico 等，屬於「品種資料庫規模擴增」的獨立決定，不在本次範圍。

以上已 commit（見下方「現況檢查提醒」），**尚未 push**。

## 二、⚠️ 使用者明確表示「之後還是要補齊」——第三類的待辦清單

**這是使用者明確要求保留、下次要繼續處理的項目**，不是我自行判斷的待辦。以下是本次複查發現、但這次沒動的 `representativeRegions` 缺口（品種已存在，產區也正確列為 primaryGrape，只是品種頁沒收錄該產區）：

- **cabernet-sauvignon**（現8個）缺：mendoza, maipo-valley, stellenbosch, columbia-valley, paso-robles
- **chardonnay**（現7個）缺：hautes-cotes-de-nuits, hautes-cotes-de-beaune, margaret-river, willamette-valley, yarra-valley, gisborne, franciacorta
- **syrah-shiraz**（現6個）缺：languedoc-roussillon, hunter-valley, clare-valley, hawkes-bay, columbia-valley, paso-robles
- **grenache**（現5個）缺：languedoc-roussillon, rioja, paso-robles, navarra
- **riesling**（現3個）缺：wachau, clare-valley, pfalz
- **cabernet-franc**（現2個）缺：pomerol（波美侯卡本內弗朗比例高，教學上較明顯的缺口）
- **pinot-noir**（本次已補香檳2筆，現9個）仍缺：marlborough, willamette-valley, yarra-valley
- **pinot-gris**（現1個）仍缺：alto-adige, collio（本次只做了 styleSummary 別名補充，未做連結）
- **tempranillo**（現2個）仍缺：toro, navarra（本次只做了 styleSummary 別名補充，未做連結）
- **albarino**（現1個）仍缺：vinho-verde（本次只做了 styleSummary 別名補充，未做連結）
- **semillon**（本次已補獵人谷，現5個）仍缺：entre-deux-mers
- **sauvignon-blanc**（現6個）缺：sauternes, barsac, rueda, collio（皆為次要混調角色，優先度較低）
- **merlot**（現6個）缺：columbia-valley（pauillac／margaux 為次要角色，優先度低）

下次接手時，建議先跟使用者確認要一次處理完還是分批，不要自行決定範圍。

## 三、我明確要求先記下來、之後再處理的內容

- **上方第二節的 `representativeRegions` 缺口清單**，使用者原話「依你建議，但之後還是要補齊」——這不是可以無限期擱置的項目，是明確要接續的待辦。

## 四、現況檢查提醒

- **本次 session 的 wine-data.js 異動（9處修正：2項明確遺漏＋4項命名補充＋3項優先連結）截至本檔案寫入時尚未 commit**，接手前請先確認原裝置是否已完成 commit。
- **資料完整性已核對**：大括號/中括號配對正確（1195/1195、544/544，本次異動不影響總數，只是陣列內增加字串與修改既有字串）。
- **本機環境沒有 Node.js，Python 也無法執行**，語法正確性靠人工讀取比對＋括號配對檢查。
- **接手的 Claude Code 務必實際開啟 `data/wine-data.js` 核對這9處異動的真實現況**，不要只憑這份 HANDOFF.md 的文字描述去猜測。
- **第四類（~30個品種完全沒有對應頁面）維持擱置**，除非使用者主動提起，否則不要在複查任務的脈絡下自行提議處理。
