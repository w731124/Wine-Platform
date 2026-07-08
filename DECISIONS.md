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

## 2026-07-08 產區描述擴充 B5+B6+B7（羅亞爾＋隆河/朗格多克＋義大利，一併處理）

14. **執行前發現 6 筆（pouilly-fume、chinon、cote-rotie、condrieu、gigondas、cotes-du-rhone）已在更早、未被 HANDOFF.md 追蹤到的「Batch 3」工作中完成 styleSummary/history/多行terroir 擴充，只缺 `agingNote`**；`languedoc-roussillon` 則是 history 已達標、但 styleSummary 與 terroir 仍是原始短版本。
    原因：據此調整實際施工範圍為「10 筆全套擴充＋1 筆半套（languedoc-roussillon 補 styleSummary/terroir/agingNote，history 不動）＋6 筆只補 agingNote」，避免不必要地重寫已經合格的內容；此發現已於動工前回報並取得使用者確認。
15. **完成 B5（muscadet, vouvray, sancerre, pouilly-fume, chinon）、B6（hermitage, chateauneuf-du-pape, cote-rotie, condrieu, gigondas, cotes-du-rhone, languedoc-roussillon）、B7（barolo, barbaresco, chianti-classico, brunello-di-montalcino, etna）共 17 筆**，依上述調整後範圍分別處理。
    原因：使用者要求三個批次一次處理完，內容涵蓋的史實（如 Hermitage「hermitaged claret」典故、教皇新堡 1923 年 Baron Le Roy 規範、Barolo/Barbaresco 陳年月數與 Barolo Boys 現代派、Chianti Classico 1996 年獨立與 Gran Selezione、Brunello 由 Biondi-Santi 首創、Etna 的 contrada 與未嫁接老藤）皆為有把握的既有 WSET/產區知識；少數欄位（如 brunello.history 232字、etna.agingNote 139字）超出字數目標但未強行刪減，理由與先前批次一致——不影響版面、不需動程式碼即不強行湊數字。

## 2026-07-08 產區描述擴充 B8+B9+B10+B11（義大利2＋西班牙＋德國/美國＋澳洲/紐西蘭，一併處理，B1-B11全數完成）

16. **執行前依 B7 學到的教訓，先逐筆核對現況**：發現 valpolicella 同樣屬於未被追蹤的既有豐富內容（多行 terroir、styleSummary/history 已達標），只補 `agingNote`；其餘 14 筆（prosecco, soave, amarone-della-valpolicella, napa-valley, sonoma-coast, barossa-valley, margaret-river, rioja, ribera-del-duero, jerez, priorat, mosel, rheingau, central-otago）皆為原始短版本，需全套擴充。
    原因：延續 B5-B7 發現的模式，動工前核對而非直接假設，避免重複已完成的工作。
17. **完成 B8～B11 共 15 筆**，其中 rioja、priorat、mosel、rheingau、central-otago 的 `history` 欄位原文已達 150-200 字目標或以上（mosel/rheingau 原文甚至已達 255 字），故只新增 `agingNote` 並補 `styleSummary`/`terroir` 擴充，`history` 不強行改寫。
    原因：與先前批次一致的判斷原則——已達標的內容不重寫，只補真正缺少的欄位；避免為了「統一動一次」而對已經合格的史實文字做無意義的編輯。
18. **至此 B1～B11 全部 55 個產區的 `agingNote` 欄位皆已補齊**（`grep -c "agingNote:"` 與 `grep -c "wineColor:"` 皆為 55，一一對應），產區描述擴充工程主線正式完成。
    原因：此為使用者原始批次計畫的最終里程碑；本次新增內容涉及的史實（如 Prosecco Cartizze 頂級園與 2019 UNESCO 世界遺產、Amarone 2010年升格DOCG、Napa Valley 1981年成為加州第一個AVA、Barossa Old Vine Charter 老藤分級、Margaret River 由 Gladstones 博士氣候報告催生、Vega Sicilia 1864年創立、Sherry 一名源自 Jerez 英語化拼寫、Rheingau 19世紀末建立熟度分級概念）皆為有把握內容，無不確定項目需使用者核實。

## 2026-07-08 品種圖鑑擴增 15 個新品種（WSET L2 之外的主流品種）＋介面調整

19. **新增 15 個品種，選取原則為「國際主流市場常見、避免冷門難尋」**：紅酒 Tempranillo、Sangiovese、Nebbiolo、Grenache/Garnacha、Cabernet Franc、Malbec、Zinfandel/Primitivo、Gamay；白酒 Chenin Blanc、Gewürztraminer、Viognier、Sémillon、Albariño、Grüner Veltliner、Muscat/Moscato。欄位格式沿用既有 8 個 WSET L2 品種的結構（`styleSummary` 單句 40-90 字，非長段落，與產區物件的擴充字數目標不同）。
    原因：使用者要求擴增品種但排除冷門品種；先提出清單經使用者確認後才動工，維持與產區擴充相同的「先建議範圍、確認後才分批施作」流程。
20. **`representativeRegions` 欄位：9 個新品種（Tempranillo/Sangiovese/Nebbiolo/Grenache/Cabernet Franc/Chenin Blanc/Gewürztraminer/Viognier/Sémillon）連結到現有 55 個產區中已存在的對應產區；Malbec、Zinfandel/Primitivo、Gamay、Albariño、Grüner Veltliner、Muscat 這 6 個因其代表產區（Mendoza、Beaujolais、Rías Baixas、Wachau 等）尚未建入產區資料庫，暫留空陣列**。
    原因：不在無對應資料下勉強塞入不準確的產區連結；此缺口與使用者接下來要做的「擴增產區」步驟直接對應，屆時補上對應產區後即可回填。
21. **新增 `originCountry` 欄位（23 個品種全數），語意採「當代旗艦／代表國家」而非「植物學歷史原產國」**（例：Malbec 標示 Argentina 而非法國 Cahors；Zinfandel 標示 USA 而非克羅埃西亞）。
    原因：這是資料語意上的判斷分歧，已用 AskUserQuestion 向使用者確認，選擇對一般學習者更直覺實用的「當代代表國家」語意，且與品種擴增時 styleSummary 已經寫好的敘述口徑一致（如 Malbec 的 styleSummary 就是「阿根廷旗艦品種」）。
22. **新增 `wsetLevel: 2` 欄位到原始 8 個品種**（cabernet-sauvignon、merlot、pinot-noir、syrah-shiraz、chardonnay、pinot-gris、sauvignon-blanc、riesling），`js/grapes.js` 依此欄位渲染「WSET L2」徽章，而非在渲染程式碼裡寫死品種 id 清單。
    原因：符合「資料處理與 DOM 渲染區隔」的架構傾向；未來若要標示 WSET L3 等其他分級，直接在資料層加欄位即可，不需要改渲染邏輯。
23. **品種卡片改為手風琴式單一展開**：`toggleGrapeCard()` 在展開新卡片前，先收合 `#grape-container` 範圍內所有其他已展開卡片並銷毀其 Chart.js 雷達圖實例。刻意將 `querySelectorAll` 範圍限定在 `#grape-container` 內，而非全頁面搜尋 `.acc-hdr.open`。
    原因：`.acc-wrap`/`.acc-hdr`/`.acc-body` 這組 class 在品飲系統（SAT）分頁的手風琴區塊也有使用，若不限定範圍，品種卡片的收合邏輯可能誤觸其他分頁的手風琴狀態；同時遵守 CLAUDE.md 技術死線關於 Chart.js 銷毀舊實例的規定。
24. **未能於此環境完成互動式瀏覽器自動化驗證**：嘗試以 headless Chrome + DevTools Protocol 驗證手風琴收合行為，但 Windows PowerShell 5.1 無法建立 WebSocket 連線執行 CDP 互動指令（環境無 Node.js、Python 也無法執行）；已改為完整讀回程式碼人工核對邏輯正確性，並將此限制告知使用者，由使用者於自己的瀏覽器手動確認。
    原因：誠實記錄驗證方式的落差，避免未來誤以為此功能已通過自動化測試；若日後要在此環境做瀏覽器自動化，需先取得使用者同意安裝 Node.js。

## 2026-07-08 新增6個產區，補齊品種擴增時留白的代表產區連結

25. **新增 mendoza（阿根廷）、lodi（美國加州）、beaujolais（法國）、rias-baixas（西班牙）、wachau（奧地利，資料庫第一個奧地利產區）、asti（義大利）共6個產區**，逐一對應先前品種擴增時 representativeRegions 留空的 Malbec、Zinfandel/Primitivo、Gamay、Albariño、Grüner Veltliner、Muscat。每個品種只選一個最具代表性/國際能見度最高的單一產區（例如 Zinfandel 選 Lodi 而非 Paso Robles，Muscat 選 Asti 而非 Beaumes-de-Venise），不做多產區並列，維持與品種擴增時「主流常見、避免冷門」的原則一致。
    原因：這是使用者規劃三步驟（擴增品種→補齊代表產區缺口→全面複查連結）中的第二個子任務；先提出6個候選產區清單附理由，經使用者確認「Go」才動工，維持既定的「先建議、後施作」流程。
26. **beaujolais 的 `region` 欄位設為 `Burgundy(勃根地)`，未使用獨立的 `Beaujolais` region 值**。
    原因：資料庫的 L2 篩選清單（`l2Config`）目前 France 底下只有 Bordeaux/Burgundy/Rhône Valley/Champagne/Loire Valley/Alsace/Languedoc-Roussillon 七個選項，沒有 Beaujolais；若賦予獨立 region 值，會在地區篩選下拉選單中找不到對應選項、只能在「全部大區」才看得到。薄酒萊在法定行政與傳統教學脈絡上也常被歸入廣義勃根地產區討論，因此選擇歸入現有 Burgundy 篩選類別，避免額外修改 `index.html`／`core.js` 的篩選設定（超出本次任務範圍）。此為技術權宜考量，非產區身份認定的絕對主張，供未來檢視。
27. **6個品種的 `representativeRegions` 已全數補上對應產區 id 連結**（malbec→mendoza、zinfandel-primitivo→lodi、gamay→beaujolais、albarino→rias-baixas、gruner-veltliner→wachau、muscat→asti），資料庫目前已無任何品種的 `representativeRegions` 是空陣列。
    原因：完成使用者三步驟計畫的第二步；第三步「全面複查每個產區跟每個品種的連結」仍待後續 session 執行。
