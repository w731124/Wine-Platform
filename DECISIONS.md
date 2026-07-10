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

## 2026-07-08 Beaujolais 獨立篩選類別＋新增14個非法國產區

28. **`l2Config` 的 France 清單新增 `Beaujolais(薄酒萊)` 選項，並將 `beaujolais.region` 從 `Burgundy(勃根地)` 改為獨立的 `Beaujolais(薄酒萊)`**。
    原因：使用者明確要求給薄酒萊獨立篩選類別，推翻先前第26條的技術權宜安排；改動範圍僅限新增一個 l2Config 選項與修改一筆 region 值，不影響其他既有產區的篩選歸屬。
29. **新增 14 個法國以外的產區，補強國家覆蓋廣度**：Douro、Vinho Verde（葡萄牙，資料庫首次納入）、Maipo Valley（智利，資料庫首次納入）、Stellenbosch（南非，資料庫首次納入）、Willamette Valley、Columbia Valley、Paso Robles（美國，從3筆增至6筆）、Hunter Valley、Clare Valley、Yarra Valley（澳洲，從2筆增至5筆）、Hawke's Bay、Gisborne（紐西蘭，從2筆增至4筆）、Pfalz、Baden（德國，從2筆增至4筆）。國家分布從9國擴展到12國，共75個產區。
    原因：使用者先確認「其他國家擴充」的候選清單，並指定美/澳/紐/德要再加碼補強（原提案這4國各只有1個新增），經二次確認後才動工。選擇標準與品種擴增一致：優先填補「完全空白的國家」與「風格單一、只有1-2個產區代表整國」的缺口（例如美國原本只有納帕/索諾瑪海岸/洛代皆加州，德國只有麗絲玲產區沒有德國紅酒），刻意挑選能展現風格多樣性的產區（如 Willamette Valley 黑皮諾補上加州以外的美國樣貌、Baden 補上德國紅酒缺口、Hunter Valley 的陳年賽美蓉補上澳洲白酒獨特案例）。
30. **少數新產區的 `history` 欄位在草稿階段明顯超過200字目標（Maipo Valley 269字、Stellenbosch 280字），主動二次刪減至180字左右**，而非直接套用「不影響版面就不強行調整」的既定寬鬆原則。
    原因：這兩筆的初稿超標幅度（30-40%）遠高於本次其餘產區與過去批次的「輕微超標」範圍，判斷屬於內容尚未精煉而非必要的完整語意，因此主動刪減而非援引寬鬆原則放行；其餘產區的10-25%輕微超標維持既定原則不強行砍字。

## 2026-07-08 新增9個義大利＋西班牙產區

31. **新增5個義大利產區**：Montepulciano d'Abruzzo（阿布魯佐）、Primitivo di Manduria（普利亞，連結既有的 Zinfandel/Primitivo 品種）、Franciacorta（倫巴底，義大利傳統法氣泡酒旗艦）、Taurasi（坎帕尼亞，Aglianico「南方巴羅洛」）、Alto Adige（特倫提諾-上阿迪傑，格烏茲塔明那品種命名原鄉 Tramin 村所在地）。義大利從10筆增至15筆，涵蓋大區從4個（皮埃蒙特/托斯卡尼/威尼托/西西里）增至8個。
    原因：延續與品種/產區擴充一致的選取原則，優先填補現有4大區之外、且具備清楚教學辨識度的空白（每個新增大區至少有一個「這裡最著名」的關鍵故事，如 Franciacorta 的超長酒渣培養時間、Alto Adige 與 Gewürztraminer 品種命名的直接地理連結），避免選入缺乏清楚教學切角的產區。
32. **新增4個西班牙產區**：Cava（加泰隆尼亞，西班牙傳統法氣泡酒）、Rueda（卡斯提亞-雷昂，Verdejo白酒旗艦）、Toro（卡斯提亞-雷昂，比斗羅河岸更雄渾的田帕尼優）、Bierzo（卡斯提亞-雷昂，Mencía近年新興明星產區）。西班牙從5筆增至9筆。
    原因：與義大利同一批動工，選取標準相同；Toro 與 Bierzo 雖然都在卡斯提亞-雷昂，但風格恰好呈現兩個極端（Toro 更雄渾濃縮 vs. Bierzo 更優雅礦石感），刻意保留這組對比作為教學案例，而非因為同一大區重複而略過其中一個。
33. **本批次動工前已預先套用上一批次學到的「history 超標幅度」判斷原則**：草稿階段對超過200字目標30%以上的4筆（Montepulciano d'Abruzzo、Primitivo di Manduria、Franciacorta、Taurasi 皆在義大利批次）主動二次刪減，西班牙的 Toro 也做了同樣處理；其餘輕微超標（10-25%）維持既定寬鬆原則不強行砍字。
    原因：延續第30條建立的判斷標準，避免每批次都要重新討論一次「要不要刪減」，直接套用已確立的門檻。

## 2026-07-08 義大利/西班牙第二輪深化，共新增7個產區

34. **新增5個義大利產區，填補剩餘5個空白大區**：Cerasuolo di Vittoria（西西里第2筆，Nero d'Avola+Frappato混調，唯一DOCG）、Lambrusco（艾米利亞-羅馬涅，全球商業能見度最高的氣泡紅酒）、Collio（弗留利-威尼斯朱利亞，義大利精品白酒重鎮）、Verdicchio dei Castelli di Jesi（馬爾凱，平價白酒代表）、Sagrantino di Montefalco（溫布里亞，全義大利單寧最強品種）。義大利從15筆增至20筆，涵蓋大區從8個增至12個（含西西里第2個產區）。
    原因：使用者要求「結束後提醒進行第三步複查」，本輪仍是延續既定的「填補空白大區、每個新增大區要有清楚教學切角」原則；Cerasuolo di Vittoria 刻意選為西西里第二筆而非其他大區的第二筆，因為它與 Etna 風格形成鮮明對比（優雅外放 vs. 火山礦石高酸），對同一大區內部多樣性也是有意義的教學案例。
35. **新增2個西班牙產區**：Jumilla（穆爾西亞，Monastrell未嫁接老藤價值型紅酒）、Navarra（納瓦拉，格那希粉紅酒故鄉現代化轉型為精品紅酒）。西班牙從9筆增至11筆，新增穆爾西亞、納瓦拉兩個全新大區。
    原因：與義大利同批動工，選取標準一致；Navarra 的 `wineColor` 選擇 `red` 而非該產區歷史上更知名的粉紅酒（Rosado），因為資料庫目前完全沒有 rosé 相關的 wineColor 資料與渲染邏輯，貿然引入會超出本次任務範圍，因此聚焦於 Navarra 現代化後同樣傑出的紅酒面向，rosado 傳統僅在 styleSummary/history 文字中帶到。
36. **本批次沿用第30/33條建立的「history 超標30%以上才主動刪減」門檻**：Cerasuolo di Vittoria、Collio 兩筆草稿超標接近或略高於30%，各自二次刪減至20%左右超標範圍；其餘5筆（Lambrusco、Verdicchio、Sagrantino、Jumilla、Navarra）維持10-25%輕微超標不強行砍字。
    原因：延續已確立的判斷標準，維持批次間處理方式的一致性。

## 2026-07-08 三步驟計畫第三步：全面複查91個產區與23個品種的連結

37. **全面比對 91 個產區的 `primaryGrapes`（純文字品種陣列）與 23 個品種的 `representativeRegions`（產區id陣列）**，發現四類落差並回報使用者逐類定案處理方式，而非自行決定。
    原因：這是使用者明確要求的複查任務，資料量大（91×23交叉比對）不適合逕行修改，須先完整回報讓使用者決定優先順序與處理原則，才符合「先報告、後施作」的既定流程。
38. **修正兩筆明確遺漏的品種-產區連結**：`zinfandel-primitivo.representativeRegions` 補上 `primitivo-di-manduria`、`gewurztraminer.representativeRegions` 補上 `alto-adige`。
    原因：這兩筆是先前 session 自己在 DECISIONS.md 明確寫過「打算連結」卻忘記回頭補上的疏漏（見第31、34條），屬於明確錯誤而非設計判斷，使用者確認後直接修正。
39. **「同一品種不同國家命名不同」的處理原則定案**：`primaryGrapes` 欄位維持依各產區當地命名（不強制統一成單一名稱），改在該品種頁面的 `styleSummary` 補一句提及其他產區的別名。本次依此原則更新 4 個品種：`tempranillo`（補充 Toro 產區稱 Tinta de Toro）、`albarino`（補充葡萄牙稱 Alvarinho）、`pinot-noir`（補充德語產區稱 Spätburgunder）、`pinot-gris`（補充德國稱 Grauburgunder）。`grenache`（Grenache/Garnacha）在品種新增當下就已經是雙語品種名稱，不需額外處理。
    原因：使用者明確裁示的處理原則——保留各地命名的教學真實性（法國格那希、西班牙格那希在地就叫 Garnacha 是事實，統一改名反而失真），透過品種頁面說明別名來解決「看起來像兩個不同品種」的認知落差，而不用去改產區資料。
40. **`representativeRegions` 缺口採「本次修復影響最大的3項、其餘列入待辦」策略**：新增 `pinot-noir` 的 `montagne-de-reims`／`vallee-de-la-marne`（原本香檳兩個產區完全沒被黑皮諾品種頁收錄）、`semillon` 的 `hunter-valley`（陳年賽美蓉是這品種最具教學獨特性的案例）、`viognier` 的 `cote-rotie`（Côte-Rôtie 的內容本身就整段在講維歐尼耶共發酵，卻沒連結）。
    原因：使用者裁示「依你建議，但之後還是要補齊」——這3項是回報時評估教學重要性最高、遺漏最明顯的案例，優先修正；其餘同類缺口（見下方待辦清單）規模較大，留待下次 session 專門處理，避免一次改動範圍過大難以核對。
41. **第四類（91個產區裡提及、但23個品種完全沒有對應頁面的~30個品種名稱，如 Marsanne、Mourvèdre、Corvina、Aglianico 等）維持擱置**，不在本次處理範圍。
    原因：使用者明確裁示擱置；這類屬於「品種資料庫規模擴增」的獨立決定，性質與本次「複查既有連結」不同，混在一起處理會模糊任務邊界。

## 2026-07-08 補齊 HANDOFF.md 待辦清單：representativeRegions 剩餘缺口全數處理完畢

42. **一次性補齊上次 session 記錄在 HANDOFF.md 待辦清單裡的全部缺口，共13個品種、40筆產區id**：cabernet-sauvignon(+5)、merlot(+1)、syrah-shiraz(+6)、chardonnay(+7)、pinot-gris(+2)、sauvignon-blanc(+4)、riesling(+3)、tempranillo(+2)、grenache(+4)、cabernet-franc(+1)、semillon(+1)、albarino(+1)、以及先前已提前處理的 pinot-noir/viognier 不重複列入。純粹是把已核對過的產區id加入既有陣列，不涉及新增內容、不改動任何文字欄位。
    原因：使用者明確要求「先處理待辦清單裡剩下的 representativeRegions 缺口」，清單內容在上次 session 已完整列出並經使用者認可（「之後還是要補齊」），本次直接執行、不再重新確認每一筆的必要性。
43. **至此 91 個產區與 23 個品種的已知連結缺口（第三類）全數處理完畢**，僅剩第四類（品種完全無對應頁面，約30個名稱）維持擱置狀態，供未來若要擴增品種資料庫規模時參考。
    原因：完成三步驟計畫第三步的收尾，避免待辦清單無限期累積、模糊「已完成」與「未完成」的邊界。

## 2026-07-08 修正產區資料庫 L1 國家篩選鈕與 L2 大產區清單的資料過時問題

44. **使用者發現 L1 國家篩選鈕沒有顯示新增的葡萄牙/智利/南非/奧地利/阿根廷**，追查後發現不只是 L1 按鈕，`data/wine-data.js` 的 `l2Config`（每個國家底下的大產區篩選清單）也早已過時——連既有的美國/澳洲/德國都因為本輪擴充漏掉新產區所在的州/大區（美國缺 Oregon/Washington、澳洲缺 New South Wales/Victoria）。
    原因：L1 按鈕與 `l2Config` 都是寫死在 `index.html`／`data/wine-data.js` 裡的靜態清單，跟先前修過的品種顏色篩選鈕、比較模式酒色篩選鈕是同一類問題（資料新增後不會自動反映到寫死的篩選清單）。
45. **採根治而非補資料**：`index.html` 的國家按鈕改為空容器 `#l1-country-filters`，`js/regions.js` 新增 `renderL1CountryFilters()` 於初始化時從 `WINE_DB.appellations` 動態產生（國家對應的國旗 emoji 直接取自該國第一筆產區資料，不另建對照表）；`renderL2Bar()` 改成即時用 `WINE_DB.appellations.filter+map` 算出當下選定國家實際存在的大產區清單，不再讀取任何寫死設定。`data/wine-data.js` 的 `l2Config` 區塊（唯一使用處只有 `regions.js` 這一行）確認無其他依賴後整個移除。
    原因：只補齊 `l2Config` 現有資料仍會在下次新增產區時重蹈覆轍；既然 L1/比較模式/品種顏色篩選鈕都已經證明「從資料動態產生」這個模式可行，這裡採用同樣手法一次根除，而非每次新增產區都要記得同步三份寫死清單。
46. **驗證方式**：因應用無 Node.js／PowerShell 5.1 無法執行 CDP WebSocket 互動（見更早的已知限制），改用 headless Chrome `--dump-dom`（不需要 WebSocket，等頁面 JS 執行完後直接輸出渲染後的 DOM）實際驗證 `#l1-country-filters` 渲染結果，確認 12 國按鈕正確產生後才回報使用者。L2 清單的點擊互動因同樣工具限制無法自動化驗證，已請使用者手動抽查。
    原因：優先採用能取得真實渲染結果的驗證方式，而非僅憑程式碼推論即回報完成；誠實標註哪部分是自動驗證、哪部分仍需人工確認。

## 2026-07-08 產區↔品種雙向跳轉連結（抽屜品種標籤 ⇄ 品種卡片代表產區標籤）

47. **比對機制**：新增 `js/core.js` 的 `findGrapeIdByName(text)`，依品種 `name` 欄位英文部分（去掉中文括號）做完全比對，並對含 `/` 的雙語品種名稱（如 `Syrah/Shiraz`、`Grenache/Garnacha`、`Zinfandel/Primitivo`、`Pinot Grigio/Pinot Gris`、`Muscat/Moscato`）額外比對拆分後的各別名稱。找不到對應品種就維持純文字標籤，不強行建立錯誤連結。
    原因：使用者明確要求「找不到就先不建立連結」；比對機制選擇依賴既有 `name` 欄位的 `/` 雙語命名慣例，而非另建對照表，避免新增一份需要手動維護、容易再度過時的資料。
48. **反方向（品種卡片→代表產區）不需要比對，因為 `representativeRegions` 本來就儲存產區 id**：直接用 id 查 `WINE_DB.appellations`，找得到就加超連結。
    原因：`representativeRegions` 是結構化 id 陣列而非文字，比對品種→產區文字比對複雜很多的不對稱性由此而來。
49. **只處理抽屜展開後（L4）的品種標籤，不動 L3 卡片列表上的品種標籤**（`js/regions.js` 第109行維持原樣，只改第175行抽屜區塊）。
    原因：使用者明確描述的情境是「抽屜展開後」，依最小範圍原則不擴大到使用者沒提及的 L3 卡片。
50. **驗證方式**：寫了一個獨立的 HTML 測試頁，直接載入正式的 `data/wine-data.js`，在瀏覽器裡實際執行 `findGrapeIdByName` 比對全部91個產區的 `primaryGrapes` 與23個品種的 `representativeRegions`，用 headless Chrome `--dump-dom` 印出比對結果（124命中/53未命中/113個代表產區連結全部有效）。過程中發現 `Muscat/Moscato` 因為 asti 的 primaryGrapes 存的是未拆分的組合字串而比對失敗，修正比對函式後重新驗證確認修好。
    原因：延續上次「不只憑程式碼推論，取得真實執行結果再回報」的原則；此次測試意外抓到一個一開始沒設計進去的邊界案例，證明了這種驗證方式的實際價值。

## 2026-07-08 技術債清理：修正比較模式稽核錯誤欄位、移除死碼

51. **核對使用者記錄的三筆已知技術債，逐筆確認現況而非直接照單修正**：
    - `auditWineDB()` 檢查 `radarStats`（5維）而非 `compare.js` 實際讀取的 `profile`（7維）——**確認仍存在**，修正為讀取 `profile` 並改齊 7 個維度鍵值（新增 `alcohol`／`finish`，這是原本 `radarStats` 沒有但 `profile` 有的欄位）。
    - `sensoryProfile`／`radarStats` 死碼殘留——**確認仍存在，且範圍隨本次 session 擴大**：Phase 4 之後新增的91個產區裡，本 session 新增的36筆（B4之後全部批次）延續了複製舊格式的習慣，一併帶入了這兩個死欄位，等於讓技術債跟著資料擴充一起長大。交叉核對 `regions.js`／`map.js`／`compare.js` 全部渲染路徑確認 `sensoryProfile` 全域無人讀取、`radarStats` 僅被上述錯誤稽核邏輯讀取後，兩者從全部91筆產區移除。
    - 酒窖收藏功能殘留——**確認已在更早的 session 完全移除**，唯一殘留 `cleanupLegacyCellarStorage()` 為刻意保留的一次性 localStorage 清理函式（非死碼），此項從清單移除。
    原因：使用者要求「先檢查是否還存在」而非直接假設清單正確；技術債清單本身也可能過時，需要跟資料現況一樣重新核對才能動工。
52. **額外掃出兩項清單外項目，分開處理**：`compare.js` 的 `renderRadar()` 是零呼叫的孤兒函式（單純包一層 `renderCompareRadar()`），確認無用後刪除；地圖探索分頁的手繪 SVG 座標僅覆蓋最早期約20個產區，本次擴充的70個新產區完全沒有地圖標記——**此項判定為功能規模缺口而非技術債，不在本次處理，向使用者說明後維持現狀**。
    原因：孤兒函式屬於單純清理，風險低、直接處理；地圖座標缺口需要手動設計新的 SVG 位置資料，工作量與性質都不同於「清理」，混在一起處理會模糊任務邊界，因此分開回報並取得使用者同意後才排除在本次範圍外。
53. **移除死欄位採用 `sed` 對 `data/wine-data.js` 做整檔行刪除，而非逐筆 Edit**：確認 `sensoryProfile:`／`radarStats:` 兩欄位在全部91筆產區都是單行完整寫法（無跨行 JSON）後，用 `sed -E '/^      (sensoryProfile|radarStats): \{/d'` 一次刪除182行，刪除前備份原檔，刪除後以大括號/中括號配對與 `wineColor`／`agingNote`／id 重複檢查確認結構完整，並用 headless Chrome `--dump-dom` 確認頁面仍能正常載入無錯誤。
    原因：182行的機械式刪除用逐筆 Edit 效率極低且容易出錯，行刪除的前提（單行完整、格式一致）已於動工前逐一確認，符合大量資料異動時的效率與正確性平衡。

## 2026-07-08 頂層導覽列改版：6個平行分頁歸納為4個項目（3個下拉分類＋1個獨立按鈕）

54. **導覽結構定案為「產區與分級」「品種與釀造」「品飲系統（獨立）」「工具」四個頂層項目**，前兩個與「工具」是下拉分類群組，「品飲系統」維持單一直接按鈕。
    原因：使用者提出的動機是之後要新增「分級制度」「釀造工藝」兩個新分頁，若不歸類，頂層分頁會膨脹到8個造成擁擠；使用者唯一的修改意見是把「品飲系統」從「品種與釀造」中獨立出來，其餘沿用建議方案。
55. **未新增「分級制度」「釀造工藝」的實際分頁內容，只在下拉選單中放入停用狀態（`disabled`）的「即將推出」項目，預留視覺與結構位置**。
    原因：使用者明確表示這次只做導覽重整、不是要建立新分頁內容；停用項目讓使用者可以預覽未來的分類位置，但不會誤觸進入不存在的分頁。
56. **下拉群組的「目前作用中」視覺狀態同時作用在兩層**：群組觸發鈕（頂層可見）與其內部對應的子項目（收合時不可見，但重新展開下拉選單時會顯示為已選取）。修改既有的 `switchToPanel(name)`（原本供產區↔品種跳轉連結使用）的比對邏輯，改為先比對獨立按鈕、找不到才在下拉項目裡比對，並在找到時同時點亮觸發鈕與子項目。
    原因：原本 `switchToPanel` 用簡單的 `onclick` 屬性字串比對（`[onclick*="'name'"]`）在分類群組觸發鈕的 `onclick`（如 `toggleTabGroup(this,'grapes-group')`）裡找不到精確比對目標，會意外比對到下拉項目而非觸發鈕，導致跨分頁連結跳轉後頂層看不出目前在哪一類——這是新增下拉結構後才會出現的連動問題，動工時就一併發現並修正，未留給下次 session。
57. **驗證方式**：先前的 headless Chrome `--dump-dom` 只能確認靜態渲染，這次新增了「載入真實 `js/core.js`＋精簡版導覽 HTML 骨架＋用 `.click()` 觸發真實 onclick handler」的獨立測試頁，實際跑過7種互動情境（展開/收合下拉、跨群組切換、獨立按鈕切換、`switchToPanel()` 連動、點外部關閉）並印出每一步的 DOM 狀態，全數比對正確後才回報完成；另外也對正式 `index.html` 跑過 `--dump-dom` 確認無載入錯誤、先前修過的功能（國家篩選鈕、品種卡片）沒有被這次改動波及。
    原因：`.click()` 屬於原生 DOM API、可在 headless 環境下不透過 CDP WebSocket 觸發真實 onclick 綁定，填補了先前「只能驗證靜態渲染、無法驗證互動行為」的缺口，是這次意外發現的新驗證手段，比純程式碼推論更可靠。

## 2026-07-08 修正頂層導覽列改版遺留的兩個視覺 bug

58. **修正「品飲系統」獨立按鈕被撐大、擠壓其他頂層項目的問題**：`.tab-nav` 是 `display:flex`，`.tab-btn{flex:1}` 原本假設全部頂層項目都是直接掛在 `.tab-nav` 下的 `.tab-btn`，但改版後多了 `.tab-group` 包裹層，`.tab-group` 本身沒有 `flex:1`，只有「品飲系統」這個沒被包裹的獨立按鈕還吃得到這條規則，導致它獨自撐大、其餘三個下拉群組被壓縮到內容寬度。修正為 `.tab-group{position:relative;flex:1;display:flex}`，讓群組容器在 `.tab-nav` 這層也吃到跟獨立按鈕相同的 `flex:1` 比例，內部的 `.tab-group-trigger`（本身也有 `.tab-btn` 的 `flex:1`）再自然撐滿容器寬度。
    原因：使用者回報並附上截圖，四個頂層項目寬度明顯不一致；問題根源是 CSS flex 規則沒有跟著新增的 DOM 包裹層一起更新，屬於改版時遺漏的連動問題。
59. **修正下拉選單展開後被裁切、要靠捲軸才看得到的問題**：`<nav class="flex-1 overflow-x-auto">` 的 `overflow-x-auto` 依 CSS Overflow 規範會讓 `overflow-y` 也一併被瀏覽器計算成 `auto`（而非維持 `visible`），使 nav 變成一個雙向裁切／捲動的容器，絕對定位展開的 `.tab-dropdown` 因此被關在這個框裡而非正常疊加在頁面上層。移除 nav 的 `overflow-x-auto`，只保留 `flex-1`。
    原因：新版只剩4個頂層項目（含 icon-only 的行動裝置窄螢幕模式），寬度需求遠低於改版前的6個平行分頁，原本為橫向捲動保留的 `overflow-x-auto` 已非必要，直接移除是修正裁切問題風險最低的做法，避免另外用 JS 動態定位下拉選單增加複雜度。
    驗證：用 headless Chrome 對正式 `index.html` 截圖確認四個頂層項目寬度平均分布；另外用一份會自動觸發 `toggleTabGroup()` 展開下拉選單的暫存測試頁（載入同目錄的真實 CSS/JS，測試後即刪除）截圖，確認下拉選單完整顯示在頁面上層、無捲軸裁切。
60. **修正等寬後文字未置中、版面看起來仍分散不整齊的問題**：等寬修正（#58）只解決了容器寬度，容器內的文字沒有跟著置中——`.tab-btn` 本身沒有 `text-align:center`，`.tab-group-trigger` 雖是 `display:flex` 排列圖示與文字但沒有 `justify-content:center`，導致每個項目的內容仍貼齊各自容器左側，寬度一致但視覺仍不整齊。修正為 `.tab-btn` 加 `text-align:center`、`.tab-group-trigger` 加 `justify-content:center`。
    原因：使用者截圖回報等寬修好之後文字仍分散不齊，是 #58 等寬修正時遺漏的下一層問題（容器寬度與內容對齊是兩件事），用 headless Chrome 截圖確認四個項目文字皆置中後才回報完成。

## 2026-07-08 新增「分級制度」頁面：法國／義大利舊世界分級系統首波內容

61. **資料結構設計為 `WINE_DB.classifications[]`，用 `basis` 欄位標註分級邏輯（`estate`／`vineyard`／`region`）而非依國家分組**：每筆資料含 `country`／`region`／`name`／`basis`／`basisLabel`／`summary`／`tiers[]`（由高到低的分級層級，每級含 `name`＋`note`）／`history`／`crossNote`（跨區對照說明）。渲染時先依篩選器過濾 `basis`，再依 `country` 分組顯示。
    原因：使用者明確提出「有些分級是By酒莊、有些By葡萄園、某些是By產區」是這個頁面要教的核心概念架構，因此把 `basis` 設計成第一層篩選維度而非隱藏欄位，讓分級邏輯本身變成可篩選、可比較的教學工具，而不只是附加標籤。
62. **首波納入7套系統，法國3套＋義大利雙軌4套，每套都明確標註 basis 並在 `crossNote` 欄位互相對照**：法國——1855 Cru Classé（By酒莊）、Saint-Émilion Classification（By酒莊，但採每10年重評制，與1855形成「同邏輯不同治理哲學」對照）、Grand Cru/Premier Cru（By葡萄園）、Échelle des Crus（By產區/村莊）；義大利——DOCG/DOC/IGT/VdT金字塔（By產區）、Barolo/Barbaresco MGA（By葡萄園，與勃根地對照）、Chianti Classico Gran Selezione（By酒莊，與1855對照評選標準的主觀／客觀差異）。
    原因：使用者要求「先介紹舊世界尤其是法國、義大利」，7套系統剛好覆蓋3種分級邏輯在兩國的對應與差異，且法義之間刻意安排了3組「同邏輯跨國對照」（By酒莊：1855 vs Gran Selezione；By葡萄園：勃根地 vs Barolo MGA；By產區：香檳村莊制 vs DOCG），這是撰寫 `crossNote` 時中途發現的敘事結構，比單純逐一介紹更能呼應使用者「列出這些不同國家、不同產區分級方式」的教學意圖，因此主動加強了跨區對照的份量，超出原本候選清單只是「列出7套系統」的最低要求。
63. **`history` 欄位刻意保留具爭議性或反直覺的個案**（Saint-Émilion 重評制引發酒莊提告、Super Tuscan 因不符合傳統混調規定被迫標示最低階 VdT 卻催生 IGT 新等級）：這類個案雖然增加了資料筆數的撰寫時間，但比條列式規範說明更能幫助理解「為什麼」該分級制度長成現在的樣子。
    原因：這是撰寫過程中主動的內容判斷，未經使用者事先要求，記錄理由以便使用者若覺得偏離「精省」原則可以要求砍掉——目前判斷這類個案屬於 WSET 教學脈絡下的高價值資訊，非贅述。
64. **手風琴展開/收合直接重用 `core.js` 既有的 `toggleSATSection()` 函式，未另寫 `toggleClassificationCard()`**：確認該函式邏輯純粹操作 `nextElementSibling` 與 `.acc-arrow`，不依賴任何 SAT 頁面專屬的全域狀態後，判定可安全跨頁面重用。
    原因：符合「非必要不做全檔重構」與避免重複造輪子的原則；與品種圖鑑的手風琴不同（品種圖鑑因為要銷毀 Chart.js 雷達圖實例、且要求同時只能展開一張，所以另有 `toggleGrapeCard()`），分級制度頁面沒有圖表資源需要銷毀，允許多張同時展開，因此可以共用最簡單版本的 toggle 邏輯。
65. **篩選器沿用既有 `.fp` 按鈕樣式與單一 `set*Filter(value,btn)` 函式命名模式**（`setClassBasisFilter`），未新增篩選器專屬 CSS。
    原因：延續本專案既有的「品種顏色篩選」「比較模式顏色篩選」慣例，維持視覺與程式碼模式一致，符合架構鐵律「新增邏輯時盡量將資料處理與 DOM 渲染區隔」——`classifications.js` 只負責讀取 `WINE_DB.classifications` 並輸出 HTML 字串，不直接操作篩選器以外的其他面板狀態。
    驗證：用 headless Chrome 對正式 `index.html` 截圖三次——(1) 從導覽列點入分級制度頁面確認7套系統依國家分組正確顯示；(2) 點擊「By Vineyard」篩選器確認僅顯示勃根地與Barolo MGA兩套，義大利段落標題正確跟著篩選結果只顯示有符合項目的國家；(3) 展開Grand Cru/Premier Cru卡片確認分級層級、歷史背景、跨區對照三個區塊都正確渲染無破版。另外用 `--dump-dom` 確認新增 `data/wine-data.js` 的 `classifications` 陣列與新的 `js/classifications.js` 載入後頁面無 JS 錯誤，且用大括號／中括號配對計數確認 `wine-data.js` 新增內容後結構仍平衡（1014/1014、545/545）。
66. **修正分級制度卡片可同時多開的問題，改為單一展開手風琴**：使用者回報「點選卡片展開後，再點別的卡片，原本的卡片應該要收合」，發現 #64 沿用 `toggleSATSection()` 是允許多卡同開的邏輯（SAT頁面本來就設計成可同時參考視覺/嗅覺/味覺多個段落）。新增 `toggleClassCard()`（仿 `grapes.js` 的 `toggleGrapeCard()` 單開邏輯，但不需銷毀 Chart.js 實例，因為分級卡片沒有圖表），卡片 `onclick` 改呼叫新函式，`toggleSATSection()` 維持只給 SAT 頁面使用不受影響。
    原因：這推翻了 #64 當時「可安全跨頁重用」的判斷——`toggleSATSection()` 邏輯本身沒有 bug，但「該不該單開」是每個頁面的產品行為決定，SAT頁面要多開、分級制度頁面要單開，這兩種頁面看似都是手風琴卡片，實際互動需求不同，不能只看函式邏輯是否通用就共用，這是本次修正記取的教訓。
    驗證：用 headless Chrome 模擬依序點擊卡片0與卡片2，確認卡片0自動收合、卡片2維持展開，並將每張卡片的 open 狀態即時印在頁面上核對截圖無誤。

## 2026-07-08 產區資料庫 L1 國家清單改為「舊世界／新世界」點擊後才展開的下拉

67. **國家清單從恆常可見的平鋪按鈕，改為比照 `renderL2Bar()` 模式的可收合子清單**：`renderL1CountryFilters()` 從「無條件列出全部國家、只在 init 時呼叫一次」改為「依 `curL1` 是否為 `old-world`／`new-world` 決定顯示與否、且只列出該世界底下實際存在的國家」，並在函式內部自行綁定 `cont.onclick`（比照 `renderL2Bar()` 的 `cont.onclick=e=>{...}` 寫法），選取國家的 `.fp2` 按鈕不再依賴 `core.js` 的 `#l1-filters` 委派監聽。國家清單容器（`#l1-country-bar`）從 `#l1-filters` 內部移出、改為與 `#l2-bar` 同級的獨立 `.l2-bar` 元素，共用同一套 `open` class 展開/收合機制與 `.fp2` 樣式，未新增任何 CSS。
    原因：使用者提供的規格已明確指定「比照 `renderL2Bar()` 同一套模式實作，不要另創一套顯示邏輯」，這是刻意延續本專案一貫的「資料驅動＋重用既有互動模式」慣例，也讓國家清單獲得跟 L2 大區清單一致的「僅在有意義的篩選脈絡下才出現」行為，減少恆常可見但多數時候不相關的按鈕造成的視覺雜訊。
68. **點擊「舊世界／新世界」維持既有的立即篩選捷徑（不需要額外選國家），國家清單只是後續可選的縮小範圍工具**：在 `core.js` 既有的 `#l1-filters` 點擊委派事件中，於設定 `curL1` 之後新增呼叫 `renderL1CountryFilters()`（緊接在原本的 `renderL2Bar()`／`renderFilteredRegions()` 之前），使國家清單的顯示/隱藏與內容跟著 `curL1` 同步重新產生；但從國家下拉點擊個別國家時，其自身的 `onclick` 只更新 `curL2`／呼叫 `renderL2Bar()`／`renderFilteredRegions()`，刻意不重新呼叫 `renderL1CountryFilters()`，避免選定國家後清單因為 `curL1` 已變成國家名稱（不再是 `old-world`/`new-world`）而立刻收合、讓使用者失去「同一個世界底下還有哪些國家」的脈絡。
    原因：使用者的第2點與第4點要求分別對應「世界按鈕仍要能單獨完成篩選」與「國家清單點擊要能像原本的國家按鈕一樣運作」，這兩個要求隱含「國家清單的顯示邏輯」與「選取國家後的行為」必須是兩條獨立路徑，撰寫時特別留意不要讓兩者互相觸發導致清單选完就消失的非預期收合，這是規格文字沒有明講、需要自行判斷的實作細節。
    驗證：寫了一份載入真實 `data/wine-data.js`／`regions.js`／`core.js` 的獨立測試頁，用 `.click()` 依序模擬「舊世界→清單內第一個國家→新世界→全部」，確認每一步的 `barOpen`／清單內容／`curL1`／L2清單開關／已渲染的產區卡片數量都符合預期（例如點「舊世界」只列出法義西德奧葡6國、立即篩出35組產區；點清單內的France後curL1正確變成國家名稱、L2大區清單隨之展開為8組；點「新世界」清單正確換成美澳紐阿智南非6國；點「全部」清單收合）。另外用 headless Chrome 對正式 `index.html` 截圖確認視覺樣式與既有 L2 大區列一致。

## 2026-07-09 國旗顯示改用自架 SVG，取代 Windows 平台不支援組合規則的國旗 emoji

69. **新增 `assets/flags/` 資料夾，存放12國國旗 SVG（`ar/au/at/cl/fr/de/it/nz/pt/za/es/us.svg`，ISO 3166-1 alpha-2 小寫國碼命名）**：來源為 flagcdn.com（基於 lipis/flag-icons 專案，國旗設計本身不受著作權保護，且此來源本來就是設計給使用者下載後自行架設用，非即時 CDN 依賴）。下載時發現各國檔案大小差異極大（多數 150B–4KB，Portugal 10.8KB，Spain 因官方國徽細節複雜達153KB）——這是各國官方旗幟設計複雜度的真實差異，非下載或轉檔錯誤，已逐一確認每個檔案都是完整合法的 SVG（開頭 `<svg`、結尾 `</svg>`，非錯誤頁面誤存）。
    原因：使用者明確要求「不依賴任何第三方 CDN 在使用者瀏覽器端即時抓取」，下載後自架的一次性動作（build-time fetch）符合此要求；命名採國碼而非中英文國名，是為了讓 `js/core.js` 的對照表與未來擴充新國家時的檔名規則保持機械化、可預期。
70. **新增 `js/core.js` 的 `COUNTRY_FLAG_CODE` 對照表與 `flagIconHTML(country, sizePx)` 輔助函式，取代三處直接輸出 `a.emoji`/`grp.emoji` 的位置**（`renderL1CountryFilters()` 的國家下拉、`renderFilteredRegions()` 的大產區分組標題、`openDrawer()` 的國家標籤）。對照表 key 需與 `wine-data.js` 的 `country` 欄位值完全一致（已用 `grep` 核對現有12國字串無誤）。
    原因：三處輸出邏輯集中在一個輔助函式，符合「資料處理與 DOM 渲染區隔」的架構鐵律，避免同樣的 `<img>` 標籤組裝邏輯散落三處；圖示尺寸用 `sizePx` 參數比照原本各處 emoji 的視覺大小微調（國家下拉/抽屜標籤預設較小，大產區分組標題稍大），避免版面跳動。
71. **順手移除 `renderFilteredRegions()` 分組物件裡已變成死欄位的 `emoji:a.emoji`**：三處輸出改用 `flagIconHTML()` 直接查 `COUNTRY_FLAG_CODE` 後，這個分組物件裡的 `emoji` 欄位已無任何讀取者。
    原因：屬於本次修改直接產生的死碼（非另一個獨立問題），與 sensoryProfile/radarStats 那次清理性質不同——那次是清理既有的技術債，這次是避免新增技術債，判斷上屬於本次任務範圍內的收尾而非擴大稽核範圍。**附註**：`wine-data.js` 91筆產區資料裡的 `emoji` 欄位本身（資料源頭，非上面提到的渲染用暫存分組物件）目前也已無任何程式碼讀取，成為新的死欄位，但因為刪除91筆資料的欄位屬於資料檔異動而非本次「改顯示方式」的範圍，本次不處理，留待下次技術債清理一併評估。
72. **新增 `auditCountryFlags()`，在 `DOMContentLoaded` 時與既有的 `auditWineDB()` 一起執行**：先同步檢查 `WINE_DB.appellations` 內每個 `country` 是否都能在 `COUNTRY_FLAG_CODE` 找到對照的國碼（找不到就 `console.warn`），再對有對照到的國碼用 `new Image()` 非同步驗證該 SVG 檔案實際可載入（`onerror` 時 `console.warn`），兩種失效模式（忘了補對照表、對照表寫對但檔案沒放進去或路徑打錯）都能個別捕捉到。
    原因：使用者明確要求「避免之後擴充新國家資料庫時忘記補國旗圖示」——只檢查對照表存在與否無法抓到「對照表寫了但檔案忘記放」這種更隱蔽的失誤，因此額外加上實際載入驗證，這是規格沒有明講、但符合「稽核要能真正抓到會發生的錯誤」意圖的判斷。
    驗證：headless Chrome 截圖確認國家下拉、大產區分組標題、抽屜國家標籤三處皆正確顯示對應向量國旗（無破圖圖示、無退化成 emoji 文字），並用 `--dump-dom` 確認頁面載入無 JS 錯誤。

## 2026-07-09 SAT 品飲系統四張卡片改為手風琴互斥收合

73. **`toggleSATSection()` 加入收合其他已展開卡片的邏輯，查詢範圍鎖定 `#panel-tasting .acc-hdr.open`**：直接比照 `grapes.js` 的 `toggleGrapeCard()` 寫法搬過來，差別只在不需要 `grapeRadarInsts.destroy()` 那段（SAT卡片沒有圖表資源要銷毀）。
    原因：使用者已在需求裡明確指定「不需要重新設計，`toggleGrapeCard()` 已經是現成範本」，屬於機械式移植而非新設計判斷；`toggleSATSection()` 同時也是 `classifications.js`（分級制度頁面，DECISIONS.md #66 已改用自己的 `toggleClassCard()`）過去曾短暫誤用過的函式，這次修改後 `toggleSATSection()` 的查詢範圍明確鎖定 `#panel-tasting`，即使未來又有其他頁面手滑重用這個函式，也不會影響到 SAT 以外的頁面（但仍建議新頁面依 #66 記取的教訓另外評估是否該共用）。
    驗證：用 headless Chrome 模擬依序點擊卡片0與卡片2，確認卡片0自動收合、卡片2維持展開，並將每張卡片的 open 狀態即時印在頁面上核對截圖無誤。

## 2026-07-09 新增「釀造工藝」頁面：氣泡酒試點卡片（僅此一款，其餘5款待確認後再擴充）

74. **啟用「釀造工藝」導覽項並新增 `#panel-winestyles`，資料獨立為 `WINE_DB.wineStyles[]`（與 `classifications[]` 平行、不合併）**：欄位設計為 `oneLiner`／`history`／`grapes`／`terroir`／`production`／`keyTerms`，其中 `production` 刻意設計成篇幅最長的欄位（目標250-350字，實際約380字，因三種製程的關鍵事實密度高，寧可略超字數上限也不犧牲技術正確性），其餘四欄依使用者給定的字數區間撰寫並逐一用 `wc -m`（需搭配 `LC_ALL=C.UTF-8` 才能正確計算多位元組字元數，預設 locale 下會誤算成位元組數）核對。
    原因：使用者明確要求「先只做氣泡酒一款當範本，完成後停下來等確認，不要自動套用到其餘5款」，因此本次範圍嚴格限定在資料結構設計＋單一筆內容驗證，不批量產生其餘5款；`production` 超出字數上限的取捨已於此說明，供使用者審核時判斷是否接受。
75. **`production` 內容明確區分傳統法／水槽法／轉注法三種製程，且所有數字細節（二次發酵約1.2–1.3%酒精增量、約6大氣壓、香檳AOC無年份酒款最低15個月陳年且至少12個月在渣上、年份酒款最低3年）均為有把握的標準 WSET 教學事實，未生成含糊或無法查證的技術細節**。
    原因：使用者明確要求「如果對某個技術細節沒有把握，明確告訴我這部分我不確定，需要你核實，不要生成看似專業但可能失真的內容」——本次撰寫的所有數字與流程描述（liqueur de tirage、autolysis、remuage、disgorgement、dosage 的定義與順序）皆屬 WSET Level 2/3 標準教材內容，撰寫時未納入任何不確定的細節（例如刻意不寫 Cava 的確切陳年月數規範，因對其近年法規修訂版本把握不足，僅以「Cava、香檳皆採此法」帶過、不列出 Cava 專屬數字）。
    驗證：headless Chrome 截圖確認卡片展開後四個子區塊（歷史文化／葡萄品種／風土／釀造方式）與 `keyTerms` 標籤皆正確渲染，配色（--burg/--gold/#FAF8F5）與 Cinzel 標題字體未被更動，`--dump-dom` 確認頁面載入無 JS 錯誤，`data/wine-data.js` 新增內容後大括號／中括號配對仍平衡（1015/1015、547/547）。
76. **使用者審核氣泡酒試點後回饋「四個區塊全部混在一起、標題不夠顯眼」，修正為每個區塊各自包進既有的 `.ic` 卡片樣式（沿用 `regions.js` 抽屜的寫法）並加上圖示＋酒紅色標題**：`📜歷史文化`／`🍇葡萄品種`／`🌍風土`／`⚗️釀造方式`／`🏷️關鍵字` 五個區塊現在各自有獨立的背景色與邊框卡片，`.ins-lbl` 標題另外用行內樣式加大字級並改為 `--burg` 酒紅色（未更動 `.ins-lbl` 這個全站共用 class 本身，避免波及品種圖鑑／分級制度頁面既有用法）。內容文字本身使用者確認沒問題，不需修改。
    原因：原始版本只用 `.ins-lbl` 純文字標籤＋段落直接相連，在段落較長（尤其 `production`）時視覺上難以區辨區塊邊界；`.ic` 是專案既有的資訊卡片樣式（產區抽屜的 TERROOR／歷史背景區塊已在用），直接重用不新增 CSS，符合「新樣式優先使用既有元件」的架構慣例，也避免了修改共用 `.ins-lbl` class 影響其他頁面的風險。
    驗證：headless Chrome 截圖確認五個區塊視覺上清楚分離、標題加上圖示與酒紅色後更顯眼，`--dump-dom` 確認無 JS 錯誤。
77. **修正 `.ic` 卡片辨識度不足的問題，並移除「關鍵字 Key Terms」區塊**：#76 的 `.ic` 沿用預設背景 `var(--bg-el)`，但父層 `.acc-body` 的背景剛好也是 `var(--bg-el)`，導致卡片與底色顏色完全相同、等於沒有分隔——這是延用既有 class 時漏看的細節，直接在 `winestyles.js` 用行內樣式把四個 `.ic` 卡片背景改成更淺的 `var(--bg-card)`（白色），未更動 `.ic` 這個全站共用 class 本身（產區抽屜是掛在白色 `.drawer` 上，原本的 `--bg-el` 背景在那裡本來就有足夠對比，不能直接改全域 class）。同時使用者表示不需要「關鍵字」資訊，整段移除 `buildWineStyleCardHTML()` 的 Key Terms 區塊與 `termTags` 變數，並同步移除 `data/wine-data.js` 氣泡酒資料裡的 `keyTerms` 欄位，避免留下沒有畫面讀取的死資料。
    原因：#76 的卡片化在截圖驗證時因為 headless Chrome 的螢幕擷取與人眼實際感受色差判斷不完全一致（兩個非常相近的米色調在小尺寸截圖裡更難分辨），這次是使用者實際看畫面後才抓到的視覺問題，之後如果又要疊加卡片樣式在同樣是 `--bg-el` 底色的容器裡，要記得先檢查父層背景色是否會撞色，而非照抄既有 class 的預設值；移除 `keyTerms` 資料欄位而非只是不渲染，是延續本專案「不留無人讀取的死欄位」的一貫做法（如國旗 emoji 欄位、sensoryProfile/radarStats 的先例）。
    驗證：headless Chrome 截圖確認四個卡片（History/Grapes/Terroir/Production）呈白色背景、與淺褐色 `.acc-body` 底色清楚區隔，Key Terms 區塊已不存在，`--dump-dom` 確認無 JS 錯誤，`data/wine-data.js` 移除 `keyTerms` 欄位後大括號／中括號配對仍平衡（1015/1015、546/546）。

## 2026-07-09 「釀造工藝」頁面補完：紅／白／粉紅／橘酒／強化酒五款（六大分類全部完成）

78. **使用者確認氣泡酒範本（內容與視覺）皆OK後，依相同資料結構與卡片樣式一次補完其餘5款，`js/winestyles.js`／`index.html`／`js/core.js` 完全不需改動**：`WINE_DB.wineStyles[]` 依序新增 `red`／`white`／`rose`／`orange`／`fortified` 五筆，欄位結構（`oneLiner`／`history`／`grapes`／`terroir`／`production`）與字數區間比照氣泡酒，圖示分別為 🍷／🥂／🌸／🧡／🥃。
    原因：既有渲染邏輯（`buildWineStyleCardHTML()`／`toggleWineStyleCard()`）與卡片樣式（#76、#77 已修正過的 `.ic` 白底卡片）是純資料驅動，本次擴充驗證了先前的架構設計沒有預留任何僅供單一酒款硬編碼的邏輯，符合「資料處理與 DOM 渲染區隔」的架構鐵律。
79. **五款內容撰寫時遵循與氣泡酒相同的「有把握才寫」原則，關鍵事實逐一列出以利使用者核實**：紅酒——25–30°C發酵溫度、pigeage/remontage萃取工法、乳酸發酵（MLF）幾乎是紅酒標配；白酒——12–18°C低溫發酵、débourbage澄清、MLF在芳香品種常被刻意阻擋；粉紅酒——直接壓榨法／短時間浸皮法／放血法（Saignée）三種製法區分；橘酒——喬治亞qvevri傳統與Josko Gravner帶動的1990年代自然酒復興；強化酒——波特酒發酵中強化（19–22% abv）、雪莉酒發酵後強化並以15%為酒花（flor）存活分界、Solera逐年混調系統、馬德拉estufagem／canteiro加熱陳年。以上皆屬 WSET Level 2/3 標準教材內容，撰寫時未生成任何不確定的具體數字。
    原因：延續 DECISIONS.md #75 的做法，確保六款酒的內容品質一致；強化酒因涵蓋波特/雪莉/馬德拉三個子傳統，`production` 欄位篇幅略高於其他四款（約426字），與氣泡酒因三種製程並列而超出目標字數的情況相同，皆屬事實密度使然的合理超字。
    驗證：headless Chrome 截圖確認全部6張卡片正確顯示於同一份手風琴清單、單一展開收合行為正常（點擊任一卡片會自動收合其他已展開卡片，含跨越多張卡片的情境），紅酒與強化酒卡片展開內容逐區塊核對無破版；`--dump-dom` 確認無 JS 錯誤；`data/wine-data.js` 新增5筆後大括號／中括號配對仍平衡（1020/1020、546/546），`wineStyles` 陣列共6筆。

## 2026-07-09 地圖探索法國面板重建（試點）Stage 1：新增產區經緯度資料

80. **35筆法國產區物件新增 `coords:{lat,lng}` 欄位，資料來源為 OpenStreetMap Nominatim 地理編碼服務的一次性本機查詢（非網站執行期請求）**：對每個產區挑選一個代表性城鎮／村莊送出查詢，結果先整理成表格交給使用者逐筆確認後才寫入 `data/wine-data.js`，寫入時用 Perl 腳本依 `id` 精準比對插入，避免手動編輯35筆時出錯或誤傷 `classifications[]` 裡同名的 `saint-emilion` 條目（已用行範圍限定在 `appellations[]` 陣列內插入，並在插入前備份原檔）。
    原因：使用者明確要求「不要憑空捏造座標數字」並指定要標註沒把握的部分——比起單憑訓練資料記憶背誦座標，用公開地理編碼服務查詢並附上 `display_name` 核對是更可驗證、可追溯來源的做法；21筆屬於「產區本身即該城鎮」的精確匹配，14筆屬於大區級產區（涵蓋多個村莊）取代表點的近似值，其中 Hautes-Côtes de Nuits／Beaune 兩筆因產區本身是零散丘陵地帶、無明顯單一地標，額外標註為低信心並在確認清單中請使用者複查。
    驗證：`data/wine-data.js` 新增35個 `coords` 欄位後大括號／中括號配對仍平衡（1055/1055、546/546），`--dump-dom` 確認頁面載入無 JS 錯誤；本階段僅新增資料欄位，未修改任何渲染邏輯，地圖畫面尚未改變（座標資料要等 Stage 2 的投影轉換才會實際用於畫面呈現）。

## 2026-07-09 地圖探索法國面板重建 Stage 2：真實地理邊界＋投影，取代手繪座標

81. **六個大產區的省份分組，經使用者逐一確認後定案，包含「AOC真實涵蓋但無資料點的省份也畫進邊界」的取捨**：Bordeaux=Gironde(33)；Burgundy主體=Côte-d'Or(21)+Saône-et-Loire(71)，Chablis維持獨立標記（Yonne 89）不併入主體；Champagne=Marne(51)+Aube(10)；Alsace=Bas-Rhin(67)+Haut-Rhin(68)；Loire=Loire-Atlantique(44)+Maine-et-Loire(49)+Indre-et-Loire(37)+Loir-et-Cher(41)+Cher(18)+Nièvre(58)（含2個純粹為視覺連貫、目前無資料點的省份）；Rhône=Rhône(69)+Drôme(26)+Vaucluse(84)+Ardèche(07)+Gard(30)（含2個真實AOC涵蓋但無資料點的省份）。
    原因：使用者針對 Stage 1 提出的分組表做了兩項明確裁示：(1) Loire 的4個有資料點省份彼此不相鄰，同意額外納入中間2個省份讓形狀連貫而非畫成4塊破碎區域；(2) Champagne／Rhône 的真實 AOC 範圍比我們資料點涵蓋的省份更大，同意把「AOC真實涵蓋但我們沒資料點」的省份也畫進邊界（Champagne+Aube、Rhône+Ardèche/Gard），使邊界更貼近真實產區範圍而非受限於目前資料庫的完整度。
82. **省份邊界資料來源 `gregoiredavid/france-geojson`（透過 jsdelivr CDN 一次性下載，本機處理，非執行期請求），採用簡化版檔案（`departements-version-simplifiee.geojson`／`metropole-version-simplifiee.geojson`）而非完整精度版（3.4MB→569KB／79KB）**：19個所需省份的邊界點各自從對應 feature 抓取（沿海省份的離島小多邊形已排除，僅取點數最多的主體多邊形）；全國輪廓為法國本土多邊形（不含科西嘉與外島，與原手繪版本範圍一致），原始1706個點decimate取樣為220點。
    原因：完整精度版檔案對「扁平示意圖」而言精度過剩、點數過多不利手工風格呈現，社群維護的簡化版本已經是常見的網頁地圖前端慣用選擇；只取主體多邊形排除離島是延續原手繪地圖本來就不畫外島的既有設計，不是新增的簡化。
83. **六個大產區形狀改用「凸包（convex hull）」而非精確省界聯集（union）**：本機環境沒有 GIS 函式庫（無 Node.js/Python，僅有 `awk`／`perl`），無法計算真正的多邊形布林聯集；凸包改用 Perl 手刻 Andrew's monotone chain 演算法計算，是可行且結果視覺上仍合理的替代方案。
    原因：凸包會比真實省界聯集略為外擴、把凹陷邊角拉直（例如兩省交界的內凹處會被拉平），但對於本專案明確要求「扁平示意圖，不要求寫實地圖」的鎖定慣例而言，這個誤差在視覺呈現上可接受；此為技術限制下的務實選擇，已在確認畫面前明確告知使用者這個方法論細節。
84. **投影方式：等距圓柱投影＋經度乘以緯度餘弦修正變形（非精確的地圖學投影如 Albers/Lambert，避免引入本機無法驗證的複雜三角函數公式風險）**，全國輪廓／六個產區形狀／35個產區座標點共用同一套投影參數（`minLng`/`maxLng`/`minLat`/`maxLat`/`cosMid`/`scale`/`offX`/`offY`），viewBox 從 580×560 微調為 580×565 以符合法國本土真實經緯度範圍的長寬比（約1.03）。
    原因：使用者明確要求「投影時使用的換算依據需要與階段一的產區座標共用同一套」，避免兩邊各自處理導致點位跟輪廓對不上；等距圓柱投影搭配餘弦修正是在法國這種中緯度、範圍不大（緯度跨9°）的區域內視覺失真極小的簡單投影，不需要更複雜的圓錐投影。
85. **`index.html` 的 `#france-svg` 全面替換：全國輪廓 `<path>`、六個大產區從 `<ellipse>` 改為 `<path>`（onclick 屬性與顏色沿用既有的 `selectRegion()` 呼叫方式不變）、10個既有 `pulse-marker` 的 cx/cy 更新為新投影座標、6個大產區文字標籤重新定位到各自凸包的形心（centroid）。移除了3條純裝飾用、綁定舊手繪座標系統的河流曲線（新座標系統下位置已對不上，且沒有真實河流地理資料可以重畫），移除了 Chablis 原本的虛線小橢圓（現在只保留標記點，沒有獨立邊界形狀，因為 Chablis 只對應單一省份且被歸類為「獨立標記」而非六大產區形狀之一）。**產區標記的文字標籤與編號徽章化留給 Stage 3 處理，本階段標記文字暫時維持原樣。**
    原因：範圍嚴格對應使用者定義的 Stage 2／Stage 3 分工——Stage 2 只處理「輪廓與座標系統正確」，不處理「標籤重疊問題」（那是 Stage 3 的工作）；決定移除而非保留裝飾河流／Chablis虛線橢圓，是因為兩者都是綁定舊座標系統的手繪元素，換了投影後若不處理會顯示在錯誤位置，移除比留著顯示錯誤位置更負責任。
86. **順手修正 `js/map.js` 的 `selectRegion()` 名稱對照表遺漏 `alsace` 項目的既有 bug**：點擊 Alsace 色塊原本會因為 `n['alsace']` 是 `undefined` 而退回顯示原始字串 `"alsace"`，而非正確的 `Alsace(阿爾薩斯)`。
    原因：這是本次重建 Alsace 形狀時順手發現、且直接屬於本次任務範圍內（同一個 `selectRegion()` 呼叫鏈）的既有缺陷，非另一個獨立問題，不算擴大稽核範圍，直接修正。
    驗證：`--dump-dom` 確認頁面載入無 JS 錯誤；直接呼叫 `selectRegion('alsace')` 確認正確顯示「Alsace(阿爾薩斯)」（headless 環境對 SVG 元素的合成 `.click()` 事件有已知限制，改用直接函式呼叫驗證邏輯正確性，真實瀏覽器滑鼠點擊不受此限制影響）；直接呼叫 `selectAppellation('chablis')` 確認抽屜正確帶出 Chablis 資料。截圖確認新版地圖在正式頁面中視覺呈現正確（六個色塊位置、10個標記點位置、國家輪廓皆與 Stage 2 預覽一致），已先發布為 Artifact 供使用者確認後才寫入專案檔案。

## 2026-07-09 新增 `scripts/build-france-map.pl`：把 Stage 2 的地理資料處理整合成單一可重跑腳本

87. **把 Stage 2 手動分段執行的抓取 GeoJSON／凸包運算／全國輪廓 decimate／投影轉換整合成一支 Perl 腳本，設定（省份分組、viewBox、快取路徑）集中在檔案頂部參數區，下載結果快取在 `scripts/.geo-cache/`（已加入 `.gitignore`，不進版控）**：腳本從 `data/wine-data.js` 直接解析法國產區座標（單一資料來源，不再手動複製貼上），純讀取不寫入，輸出結果印到 stdout 供人工核對後再貼進 `index.html`。
    原因：使用者明確要求「減少不停等待 Bash 指令確認導致開發流程中斷」，把地理資料處理整合成一支腳本、寫好後先給使用者看內容確認、確認後只用一個指令執行，取代 Stage 2 當時逐段執行 bash/perl 片段、每段都要單獨核可的做法；這支腳本本身不是網站執行期程式碼，純粹是本機一次性建圖工具，符合「最終部署維持純靜態」的鎖定慣例。
88. **腳本首次執行時發現一個 regex 邊界抓取 bug 並當場修正**：原本假設 `appellations[]` 陣列結尾 `],` 跟 `grapes:` 之間有空行，實際上没有（`],\n  grapes:` 而非 `],\n\n  grapes:`），導致第一次執行找不到陣列邊界而報錯。修正後重新執行，輸出結果與 Stage 2 手動跑過、已寫入 `index.html` 的座標完全一致，確認腳本邏輯正確、可作為之後重跑（例如調整省份分組，或未來義大利/伊比利地圖重建時參考同一套方法論）的可靠工具。
    原因：純技術修正，執行前的假設與檔案實際格式有落差，發現後立即修正並重新驗證輸出一致性，不影響腳本設計本身的正確性。

## 2026-07-09 地圖探索法國面板重建 Stage 3：標記文字改為編號徽章＋側邊產區索引清單

89. **標記範圍從原本手動挑選的10筆擴大到全部35筆法國產區**：使用者確認擴大範圍後才動工，波爾多與勃根地兩個群集在35筆規模下重疊最明顯，也最能顯示編號徽章方案相對於完整地名文字的優勢。
    原因：使用者原始規格文字「依照該面板涉及的 `WINE_DB.appellations` 資料順序」暗示應涵蓋全部法國產區而非現有10筆子集，且 Stage 1 已經為全部35筆準備好座標，維持只用10筆會讓座標資料閒置；動工前先用一句話向使用者確認範圍，而非自行擴大解讀規格。
90. **標記與側邊清單的座標／編號皆由 `js/map.js` 新增的 `renderFranceMarkers()`／`renderFranceMarkerList()` 於 `DOMContentLoaded` 時動態產生，`index.html` 原本10個寫死的 `<g class="pulse-marker">` 全部移除，改為單一空容器 `<g id="france-markers">` 由 JS 填入**：投影參數（`FRANCE_PROJECTION` 常數）直接沿用 `scripts/build-france-map.pl` Stage 2 執行時算出的數值，兩者的呼叫順序刻意排在 `initMapTooltips()` 之前，確保動態產生的標記也能被既有的 hover tooltip 邏輯抓到（`initMapTooltips()` 是用 `querySelectorAll('.pulse-marker')` 一次性綁定監聽器，如果標記在它執行後才產生就會漏綁）。
    原因：延續本專案一貫的「資料驅動渲染」架構慣例（品種篩選、國家篩選、L2大區清單皆同一套模式），35筆標記若手寫在 HTML 裡會是大量重複樣板，改成從 `WINE_DB.appellations` 動態產生後，未來新增/修改法國產區資料不需要再手動同步 SVG 標記；`FRANCE_PROJECTION` 常數與 Perl 腳本數值脫鉤同步是刻意的技術負債（已在 HANDOFF.md 記錄提醒：若重跑腳本調整省份分組或 viewBox，這個 JS 常數要跟著手動更新），但目前沒有更輕量的替代方案（不想為了避免這個同步問題而讓 SVG 輪廓也改成執行期動態生成，那會違反「最終部署維持純靜態、無執行期地圖運算」的鎖定慣例精神）。
91. **編號徽章樣式：`dot-inner` 半徑從5.5放大到7.5以容納1-2位數字，`pulse-ring` 維持原本的 r=8（CSS `@keyframes pRing` 動畫本來就會把 r 動畫成8→14，放大 pulse-ring 的隱含起始值沒有意義，寫大反而會在動畫重啟時造成跳動），數字文字統一白色、置中、`pointer-events:none`（避免文字截走本該給圓圈的 click/hover 事件）。移除了 Pauillac 原本獨有的深金色特殊配色（`#A8820A`），改成與其餘34筆一致的標準金色，因為那個特例是舊版手工調整、沒有對應任何資料欄位，35筆全部自動產生時不適合保留單一硬編碼例外。**側邊清單依 `a.region` 欄位分組**（比照 `regions.js` 既有的分組邏輯與欄位，而非另外發明分組），清單項目點擊呼叫既有的 `selectAppellation(id)`，未另寫第二套選取邏輯。
    原因：CSS 動畫覆蓋 SVG 屬性是撰寫時發現的既有機制（`pRing` keyframe 直接動畫 `r` 屬性，會覆蓋掉 inline 設定的初始值），先讀懂既有 CSS 才決定新增的 r 值該設多少，避免無意義的改動；移除 Pauillac 特例是「35筆全部一致對待」這個資料驅動設計的自然結果，不特別保留無資料依據的視覺例外。
92. **`#inspector-placeholder` 原本的靜態歡迎文字整個清空，改由 `renderFranceMarkerList()` 完全接管內容**：只在頁面載入時清空後立即填入清單，沒有為「JS尚未執行前」保留任何靜態備援文字。
    原因：延續本專案其餘資料驅動容器（`#grape-container`／`#classification-container`／`#winestyle-container` 等）一律「HTML留空、JS填入」的既有模式，不特別為這個容器破例保留靜態內容——整個網站本來就完全依賴 JS 運行，沒有無 JS 情境下的降級需求。
    驗證：headless Chrome 截圖確認35個編號徽章正確顯示在地圖對應位置、側邊清單依大區分組正確列出35筆並與地圖編號一致；直接呼叫 `selectAppellation('condrieu')` 後確認對應動態產生的 `.pulse-marker[data-id="condrieu"]` 元素正確帶上 `selected` class（證明 `selectAppellation()` 的既有選取邏輯與動態產生的標記相容，不需修改）；`--dump-dom` 確認頁面載入無 JS 錯誤。已知的次要視覺瑕疵（波爾多群集徽章彼此輕微重疊、勃根地/羅亞爾河谷的六大區文字標籤與新增的密集標記點略有重疊）記錄在 HANDOFF.md，判斷屬於真實地理密度使然、且六大區文字標籤本來就不在 Stage 3 範圍內，本次不處理。

## 2026-07-09 地圖探索法國面板修正：標記碰撞避讓、真實河流、側邊清單 hover 連動地圖

93. **新增 `declutterPoints()` 碰撞避讓演算法，在 `renderFranceMarkers()` 投影完座標、渲染前執行**：用簡單的成對相互推擠（每一輪把距離小於 `minDist`(17px) 的兩點各推開一半差距，最多迭代150輪直到收斂或迭代上限），只調整螢幕上的視覺位置，不改動 `WINE_DB` 裡的原始經緯度資料；波爾多11筆產區（原本集中在 Gironde 一省）是主要受益對象。
    原因：使用者回報「部分產區重疊程度過高，某些產地根本無法點擊」——這是 Stage 3 擴大到35筆後才浮現的問題（原本手動挑選的10筆刻意避開了最密集的重疊，35筆全部納入後波爾多群集裡的多筆座標實際投影後幾乎完全重合）。改用相互推擠而非完整的力導向佈局（force-directed layout）或分群聚合（clustering）等更複雜方案，是因為35個點、單次計算的規模很小，簡單迭代法足夠收斂且不需要額外函式庫；驗證時實測最近兩點間距 16.96px（margaux/haut-medoc），確認演算法確實把所有標記推開到可個別點擊的最小間距（兩個 r=7.5 圓圈中心距離17px時邊緣不重疊）。
94. **`scripts/build-france-map.pl` 新增河流資料抓取：Loire(羅亞爾河)／Rhône(隆河)／Garonne(加隆河)，來源為 Natural Earth 1:50m 河流資料集（`martynafford/natural-earth-geojson` 專案，同樣透過 jsdelivr 一次性下載快取）**：三條河流用同一套 `FRANCE_PROJECTION` 換算依據投影，結果貼進 `index.html` 的 `#france-svg`（畫在色塊上方、標記下方，細藍線樣式比照 Stage 2 移除的舊裝飾河流）。
    原因：使用者要求標示羅亞爾河、隆河，以及區分波爾多左右岸的河，用於輔助判讀產區的相對地理位置；動工前明確告知使用者「這份資料集查不到多爾多涅河(Dordogne)，因此無法完整畫出兩河匯流成吉倫特河口(Gironde)的示意，僅用加隆河概略標示波爾多左右岸分界」，使用者確認可以接受這個簡化才動工——這是「沒把握就明講」原則的延伸應用（此處不是知識性事實的把握度問題，而是資料源覆蓋範圍的限制，同樣選擇透明告知而非悄悄用近似值蒙混過去）。
95. **河流資料處理過程中發現並修正一個資料串接 bug**：Natural Earth 資料集裡「Loire」被拆成兩個 LineString 片段，兩段的起點座標相同（都是河流中段某個匯流點，一段往南接源頭、一段往西接出海口），直接依原始順序串接會在中段產生一條不存在的長直線（視覺上像是跳線）。修正為先反轉其中一段（源頭→中段）再接上另一段（中段→出海口），使路徑連續不跳線。
    原因：這是資料處理過程中透過視覺預覽（發布前的河流疊圖截圖）才發現的實際問題，純技術修正，發現後立即在腳本內修正並重新驗證輸出視覺正確（河流路徑平滑無跳線，且正確流經對應的產區形狀範圍）。
96. **新增 `highlightFranceMarker(id, on)` 與 CSS `.pulse-marker.list-hover`，側邊清單項目加上 `onmouseenter`/`onmouseleave`，hover 時對應地圖圓點同步以「點擊後選取」的視覺樣式亮起（重用 `.selected` 已有的顏色變化邏輯，另立一個 class 而非直接套用 `.selected`，避免 hover 結束時誤清除使用者原本點擊選取的狀態）**。
    原因：使用者明確要求「除了列表項目本身的底色效果外，地圖上對應的圓點也要在 hover 時亮起，不用等點擊」，這是提升「側邊清單」與「地圖標記」兩者關聯性的體驗改善；用獨立的 `list-hover` class 而非重用 `selected` class 是刻意的設計決定——如果直接切換 `selected`，滑鼠移出清單項目時會清除掉使用者原本已經點擊選中的產區狀態，兩種語意（暫時性 hover 提示 vs. 持久性選取狀態）必須用不同 class 才不會互相干擾。
    驗證：headless Chrome 截圖確認波爾多群集標記彼此可辨識分散、河流正確流經對應產區；直接呼叫 `declutterPoints` 邏輯後遍歷全部標記量測得最近兩點間距 16.96px，確認碰撞避讓生效；直接呼叫 `highlightFranceMarker('condrieu', true)` 確認對應標記正確帶上 `list-hover` class；`--dump-dom` 確認頁面載入無 JS 錯誤。

## 2026-07-09 義大利地圖重建：真實大區邊界、波河、20筆產區座標與編號清單

97. **義大利改用真實行政大區（regioni）邊界直接繪製，不需要像法國那樣用凸包近似**：`WINE_DB.appellations` 裡義大利產區的 `region` 欄位（Piedmont、Tuscany、Veneto等13個）本身就直接對應義大利官方20個行政大區裡的其中13個，新增 `scripts/build-italy-map.pl`（省份分組來源 `openpolis/geojson-italy` 的 `limits_IT_regions.geojson`，13個大區邊界各自 decimate 至60個點），全國輪廓則取本土+西西里（`martynafford/natural-earth-geojson` 的 `ne_50m_admin_0_countries.json`，排除薩丁尼亞與小島——薩丁尼亞沒有任何產區資料點，比照法國排除科西嘉的既有先例），波河（Po）河道取自與法國共用的同一份 Natural Earth 河流資料集（快取共用，未重複下載）。
    原因：這是使用者確認「先做義大利、義大利更單純因為 region 欄位直接對應真實行政區」後採用的技術路徑，比法國省份湊凸包更準確（直接是真實邊界而非近似形狀），且西西里納入輪廓是因為 Etna、Cerasuolo di Vittoria 兩筆產區資料點都在西西里，若比照法國排除離島會漏掉這兩個真實產區的地理位置。
98. **20筆義大利產區座標經 Nominatim 一次性查詢，12筆精確匹配（產區即該城鎮）、8筆近似值（大區/子產區範圍取代表城鎮），皆已交使用者確認過才寫入 `data/wine-data.js`**，無低信心項目（不像法國 Hautes-Côtes 系列那樣零散丘陵無明顯地標，義大利20筆都能找到明確對應的核心城鎮）。
    原因：延續法國 Stage 1 的方法論與「不要憑空捏造座標」的要求，本次未出現需要特別標註低信心的個案，可能是義大利葡萄酒產區普遍以特定城鎮命名（Barolo、Barbaresco、Montalcino、Manduria等）而非像法國部分次產區是純地理概念（如Hautes-Côtes上夜丘）。
99. **義大利地圖刻意不加大區文字標籤（法國版本的六大區有文字標籤，義大利13個大區沒有）**：只用色塊區分13個大區、不疊加文字，區域名稱改為透過側邊清單分組標題呈現。
    原因：義大利13個大區彼此緊鄰、形狀狹長（尤其中部到南部半島段特別窄），若沿用法國的做法疊加13個文字標籤，在有限的420×540 viewBox裡會嚴重互相重疊、難以辨識；側邊清單本來就會依大區分組並顯示大區名稱，文字標籤在地圖上重複呈現的邊際效益不足以抵銷造成的視覺雜訊，因此判斷省略地圖上的大區文字標籤是更好的取捨，而非單純為了省事偷工。
100. **`js/map.js` 的 `highlightFranceMarker()`／`renderFranceMarkerList()` 重構為通用版本 `highlightMapMarker()`／`renderMarkerIndexList(list)`，法國與義大利共用同一套側邊清單產生邏輯與 hover 連動邏輯，不重複實作**：`renderFranceMarkerList()`／`renderItalyMarkerList()` 現在只是分別傳入對應國家的產區清單呼叫通用函式的薄包裝。`js/core.js` 的 `showMap(id,btn)` 新增依 `id` 切換對應側邊清單（並呼叫 `clearInspector()` 重置成清單檢視，避免切換國家分頁時殘留上一個國家已選取產區的詳情面板）。
    原因：義大利的側邊清單需求與法國完全相同（依 `region` 分組＋編號徽章＋hover連動），在動工前就看出這是可以抽共用邏輯的重複情境，避免複製貼上兩份幾乎一樣的函式；`showMap()` 需要同步切換清單是因為側邊 `#inspector-placeholder` 是三個國家分頁共用的同一個 DOM 元素（不是各自獨立的容器），不處理的話切換到義大利分頁還會顯示法國的清單。
    驗證：headless Chrome 截圖確認義大利分頁正確顯示13個真實大區邊界（色塊清楚可辨識、無需文字標籤）、波河正確流經北部、20個編號標記與側邊清單編號一致；直接量測全部20個標記兩兩間距，最近16.95px（barbaresco/asti），確認碰撞避讓對義大利同樣有效；直接呼叫 `selectAppellation('barolo')` 確認動態產生的義大利標記正確帶上 `selected` class；`--dump-dom` 確認頁面載入無 JS 錯誤；`data/wine-data.js` 新增20個 `coords` 欄位後大括號／中括號配對仍平衡（1075/1075、546/546）。地圖預覽（真實邊界＋波河＋20個座標點）已先發布 Artifact 供使用者確認後才整合進正式頁面。

## 2026-07-09 伊比利地圖重建：西班牙／葡萄牙雙方法論並存、Duero/Ebro河流、大區標籤避讓演算法

101. **西班牙（7個大區）與葡萄牙（2個大區）在同一支 `scripts/build-iberia-map.pl` 裡採用兩種不同方法論，分別對應法國與義大利已建立的先例**：西班牙的 `region` 欄位值（Rioja、Castilla y León、Andalusia、Catalonia、Galicia、Murcia、Navarra）直接對應西班牙官方自治區（comunidad autónoma），比照義大利模式直接抓真實邊界；葡萄牙的 `region` 欄位值（Douro、Vinho Verde）是產區概念、不對應行政區，比照法國模式用 distrito（葡萄牙的省級行政區）分組湊凸包——Douro 取 Vila Real＋Bragança＋Viseu（杜羅河谷三分區主要涵蓋範圍），Vinho Verde 取 Viana do Castelo＋Braga＋Porto（西北 Minho 歷史省份核心涵蓋範圍，刻意不含 Vila Real 邊緣子產區以避免與 Douro 區塊視覺重疊）。邊界資料來源改用 `geoBoundaries`（`wmgeolab/geoBoundaries` 專案的 ESP-ADM1／PRT-ADM1 simplified GeoJSON），因為義大利用的 `openpolis` 是義大利專屬資料集，西班牙/葡萄牙沒有對應資料——曾先嘗試 Natural Earth 的 admin-1 states/provinces 資料集（`martynafford/natural-earth-geojson` 與官方 `nvkelso/natural-earth-vector` 兩個來源都試過），但兩者都只涵蓋少數大國（各自100/294筆，不含西班牙/葡萄牙），確認不可行後才改用 `geoBoundaries`。
    原因：葡萄牙的分組方案（Douro／Vinho Verde 各自涵蓋哪些 distrito）屬於地理判斷（信心中等，非精確行政對應），動工前已列出提案表格向使用者確認，比照法國 Stage 2「先列出每個產區實際涵蓋哪些省份給我看，確認無誤後才進行下一步」的既有模式；西班牙部分因為是直接真實邊界對應，信心高，不需要額外確認。
102. **西班牙 comunidad autónoma 名稱比對時發現並修正一個 Perl 雙重編碼陷阱**：`geoBoundaries` 葡萄牙資料集裡 `BRAGANÇA`（布拉干薩）這個 distrito 名稱的「Ç」字元在原始檔案裡是雙重 UTF-8 編碼（正確的單一字元 U+00C7 被錯誤地編碼成兩個獨立字元 U+00C3+U+0087），若用正常的 `\x{c7}` 去比對永遠不會相符（`decode_json` 忠實還原了原始檔案裡「已經錯誤」的位元組序列，這不是我方解碼邏輯的錯，是上游資料本身的既有瑕疵）。修正方式是直接比對「實際出現的雙重編碼形式」`\x{c3}\x{87}`，而不是嘗試在程式裡「修正」上游資料的編碼瑕疵。
    原因：這是延續義大利腳本已記錄的 Perl UTF-8 編碼陷阱（比對中文/重音字元需要 `:encoding(UTF-8)` 開檔）之外，新發現的另一種變形——上游資料本身編碼有瑕疵時，比對邏輯要對齊「資料實際的樣子」而非「應該要有的樣子」，避免為了「修正」一個孤立的上游瑕疵而引入額外的編碼轉換邏輯（只有這一個地名受影響，寫一個通用的雙重解碼修正函式不符合最小改動範圍原則）。
103. **13筆伊比利產區座標（西班牙11筆＋葡萄牙2筆）經 Nominatim 一次性查詢，5筆精確匹配（產區即該城鎮：jerez、rueda、toro、jumilla）、其餘為大區/子產區取代表城鎮的近似值，皆已交使用者確認過才寫入 `data/wine-data.js`**，無低信心項目；西班牙產區數量在查詢前已重新核實為11筆（而非先前記憶中的10筆——先前一次 `sed` 範圍寫死導致漏算 jumilla，已修正並改用逐一 `grep` 核對，詳見 HANDOFF.md 技術債記錄）。
    原因：延續法國/義大利 Stage 1 的既有方法論；西班牙/葡萄牙的酒鎮命名慣例與義大利類似（Rioja以Haro為核心、Jerez即城鎮本身等），沒有出現像法國 Hautes-Côtes 系列那樣需要標註低信心的個案。
104. **新增大區文字標籤自動避讓演算法（`build-iberia-map.pl` 的標籤 vs. 標記碰撞避讓段落），伊比利地圖是三張地圖裡唯一「有大區文字標籤且經過避讓運算」的版本**：法國六大區有標籤但未做避讓（曾出現標籤被標記蓋住的已知瑕疵，記錄在 DECISIONS.md #92）；義大利刻意完全不加標籤（見 #99）；伊比利則是使用者明確要求「記得放上大區名，並且要避免像法國那樣被標記遮住」，因此新增一個以標籤為可動點、標記為固定點的相互推擠演算法（推離所有產區標記，也推離彼此），推擠距離依標籤文字長度估算寬度，收斂後再夾住畫布邊界避免標籤被推出可視範圍。
    原因：這是使用者針對法國既有瑕疵提出的明確改進要求，不是憑空新增的功能；用「標籤半寬粗估」而非精確量測文字實際渲染寬度，是因為 SVG 文字寬度依字型渲染而異、build script 端無法精確得知，粗估＋較寬鬆的安全間距（迭代參數已從初版的0.6/0.75倍寬度上調至1.0/1.05倍寬度）足以在9個大區、13個標記的規模下達到肉眼可接受的清晰度，不需要引入完整的文字量測函式庫。
    驗證：Artifact 發布地圖預覽（西班牙+葡萄牙半島輪廓、9個大區形狀、Duero/Ebro河流、9個避讓後的大區標籤、13個產區標記）供使用者確認兩輪（第一輪標籤與標記重疊、第二輪調整避讓參數後確認通過）；整合進 `index.html` 後 headless Chrome 截圖確認正式頁面呈現與預覽一致、13個編號標記位置與對應產區地理位置吻合（如 rioja 在西班牙北部、jerez 在南部安達魯西亞、douro/vinho-verde 在葡萄牙北部）；直接量測13個標記兩兩間距，最近16.95px，確認碰撞避讓與法國/義大利一致有效；`--dump-dom` 確認頁面載入無 JS 錯誤，68個 `.pulse-marker`（35+20+13）數量與三國資料筆數相符。

## 2026-07-09 三張地圖大區標籤三項修正：法國歸位、義大利補標籤+指示線、伊比利改高對比配色

105. **使用者回報三個獨立問題：法國 Loire Valley 標籤位置跑到形狀外、義大利完全沒有大區文字標籤、伊比利標籤配色跟色塊邊框顏色太接近難以閱讀。三支建圖腳本都補上「標籤避讓標記」演算法的後續強化，而非各自寫一套獨立邏輯**：`label_halfwidth()` 改用「實際顯示文字」（含中文括號說明）估計寬度，而非先前用大區 key 長度概略估算（key 長度估算會嚴重低估含中文的實際顯示寬度，這正是後來發現 Rioja/Navarra 標籤擠在一起的根本原因）。
    原因：延續「同一套避讓演算法先在伊比利驗證過，之後可以直接套用到法國/義大利」的既定方向（HANDOFF.md 先前已記錄這個規劃）；改用實際顯示文字而非 key 長度，是在除錯 Rioja/Navarra 重疊問題時發現的既有精度問題，一併修正。
106. **法國／伊比利改用「避讓後若跑出大區形狀外，沿線退回原始重心方向直到落回形狀內」的硬性保底（point-in-polygon 判斷）；義大利因大區形狀普遍狹長窄小、多數放不下完整文字，改用「限制離原始重心的最大位移距離＋指示線」的折衷方案，而非強制夾回形狀內**：義大利另外輸出「標籤→大區重心」的指示線座標，在地圖上畫細虛線＋小圓點連回重心，解決「標籤離實際產地太遠時看不出對應哪一塊」的問題。
    原因：法國/伊比利的大區形狀夠大，經使用者確認「該區域內位置還夠擺放文字」，可以用硬性容器約束；義大利13個大區彼此緊鄰狹長是已知限制（先前決定完全不加標籤正是因為這個限制，見 DECISIONS.md #99），這次使用者要求「理解原因，但還有空間可以更接近」，因此不強求完全不越界，改成「限制位移幅度＋指示線輔助辨識」的務實折衷，兩種做法依各地圖的幾何特性分開選用，而非套用同一套僵化規則。
107. **除錯 Rioja/Navarra 標籤擠在一起的過程中，發現「避讓運算跑完才一次性拉回形狀內」與「兩個相鄲小形狀」之間的衝突：先讓標籤被推得夠開、最後才拉回形狀內，會導致兩個相鄰小形狀的標籤都被拉回各自重心附近而重新擠在一起**。修正為「每一輪避讓運算後立即做位移限制（伊比利改用「大區形狀自身平均半徑 x 2.2」的彈性上限，而非固定像素值或強制留在形狀內），讓相鄰小形狀的標籤能各自貼著離對方最遠的一側定住」，同時把伊比利的標記避讓權重從「完整標籤半寬」降到「半寬的55%」、標籤間互斥的安全係數從1.05提高到1.3，釋放更多空間給標籤間的排斥力。
    原因：這是實際測試 Rioja/Navarra 時反覆調參才發現的動態問題（純看最終公式參數看不出來，需要實際跑演算法觀察收斂結果才發現「一次性拉回」與「逐輪拉回」的差異），修正後 Rioja/Navarra 中心距離從42px提升到約68px（兩者標籤半寬總和的合理安全距離），解決重疊問題。
108. **建圖腳本重跑時的一個既有 bug 順帶浮現並修正：`build-france-map.pl` 的 `load_app_coords()` 原本沒有依 `country` 欄位過濾，在義大利/伊比利也補上 `coords` 欄位之前不會出錯，但這次為了算法國標籤位置重跑腳本時，才發現它把三國全部68筆產區都當成法國資料，導致投影範圍被拉爆到涵蓋整個西歐**。已改用與 `build-italy-map.pl`／`build-iberia-map.pl` 相同的「先切物件邊界、比對 `country` 欄位」寫法，重新驗證後投影參數與現有 `FRANCE_PROJECTION`／既有地圖完全一致，確認純粹是腳本重跑時才會觸發的問題，不影響已經上線的地圖本身。
    原因：純技術債修正，發現時機是本次任務的副產品（不是使用者要求的範圍），但因為直接卡住本次任務（沒修好就無法正確算出法國新標籤位置），屬於任務執行必要的前置修正，不算擴大稽核範圍。
    驗證：三支腳本重新執行後用 Perl 組合出三張地圖的獨立預覽頁面（含實際 SVG 色塊、標記、河流、新標籤），發布 Artifact 供使用者確認，經三輪調整（第一輪：呈現三個問題現況＋義大利限制說明；第二輪：法國/伊比利加上形狀容器約束＋義大利加指示線；第三輪：修正 Rioja/Navarra 重疊、義大利避讓參數微調）後使用者確認「OK」；整合進 `index.html` 後 `--dump-dom` 確認頁面載入無 JS 錯誤、68個 `.pulse-marker` 數量不變（本次只調整靜態標籤與指示線，未動態標記渲染邏輯）。

## 2026-07-10 換裝置後三項收尾：本機 acceptEdits、emoji 死欄位清理、國旗稽核複查

109. **`.claude/settings.local.json` 新增 `permissions.defaultMode: "acceptEdits"`，寫入 local（未版控）檔案而非 `settings.json`**：與先前裝置的既定做法一致（DECISIONS.md #11：`settings.local.json` 本來就是各裝置自行維護、不共用的執行期設定），使用者只要求「這台裝置也套用」，不是要讓全部裝置共用同一個 defaultMode，因此不動 `settings.json`。
    原因：維持「共用規則進 `settings.json`、機器個別偏好進 `settings.local.json`」的既有分工，避免把單一裝置的操作模式偏好強制推給其他裝置。
110. **刪除 `data/wine-data.js` 全部91筆產區資料的 `emoji:` 欄位**：動工前先用 `grep -rn "\.emoji\b"` 核對全站 `js/*.js`／`index.html`，確認唯一比對到的 `meta.emoji`（`compare.js`）是完全獨立的 `WINE_COLOR_META` 常數（酒色圖示，紅/白/粉紅/氣泡），與產區資料的 `emoji` 欄位（國旗 emoji，DECISIONS.md #71 已標記為死欄位）無關，確認91行皆為單行完整格式（`      emoji: '...',`）後用 `sed` 一次刪除，刪除前備份原檔。
    原因：延續 DECISIONS.md #71 標記但當時保留未處理的死欄位，這次一併清除；91行格式一致，機械式刪除風險低，刪除前後大括號/中括號配對計數一致（1088/1088、546/546）確認結構完整，`--dump-dom` 確認頁面載入無 JS 錯誤、`auditCountryFlags()` 仍正常輸出「全部產區國家皆有對應的國碼」。
111. **`auditCountryFlags()` console 警告複查結果：目前無任何警告**：用 headless Chrome 載入正式 `index.html` 並以 `--enable-logging=stderr --v=1` 擷取 console 輸出，確認 12 個國家與 `COUNTRY_FLAG_CODE` 對照表、`assets/flags/` 的 12 個 SVG 檔案三方完全一致，無缺漏也無載入失敗。
    原因：使用者要求複查，純檢查性質不涉及程式碼修改；複查過程中連帶看到 console 另外印出兩則範圍外的既有警告（23個新產區缺地圖座標、6個法國產區未綁定年份矩陣），這兩項是 HANDOFF.md 已記錄的已知功能缺口，非本次任務範圍，僅附註不處理。

## 2026-07-10 修正伊比利地圖大區標籤重疊與被標記蓋住的問題

112. **`scripts/build-iberia-map.pl` 新增資料驅動的大小分流**：依「重心到邊界平均距離 ÷ 標籤半寬」比值（門檻1.5）自動判斷每個大區形狀是否大到能容納完整標籤文字，而非憑印象寫死清單。夠大的形狀比照法國，用 point-in-polygon 判斷＋「跑出形狀外就沿線退回重心方向」做硬性容器約束（重新啟用原本定義但從未被呼叫的 `point_in_polygon()`）；過窄過小的形狀比照義大利，維持彈性位移上限並新增「標籤→重心」指示線。
     原因：使用者回報伊比利大區標籤互相交疊、且被金色圓點標記蓋住，要求依先前修正法國/義大利地圖標籤時的做法處理；量測後發現伊比利9個大區形狀大小差異懸殊（Castilla y León遠大於Rioja/Navarra），套用單一邏輯無法同時兼顧，需分流。
113. **發現並修正一個既有 bug：`%LABEL_TEXT` 對照表的 key（如 `rioja`、`vinho-verde`，小寫連字號格式，疑似誤用了產區 `id` 命名習慣）與實際大區形狀的 key（如 `Rioja`、`Vinho Verde`，源自 `%SPAIN_REGIONS`/`%PORTUGAL_REGIONS`，比照 `wine-data.js` 的 `region` 欄位原始大小寫）完全對不上，導致 `label_halfwidth($LABEL_TEXT{$r} // $r)` 每次都 fallback 成沒有中文括號的裸字串（例如「Rioja」而非「Rioja(里奧哈)」），嚴重低估每個標籤的實際寬度**。這是先前 Rioja/Navarra 重疊、Douro 標籤被自己的產區標記蓋住等問題的真正根源——先前幾輪參數調整（位移上限、排斥係數）都只是在錯誤的寬度估計基礎上打轉，治標不治本。
     原因：純技術 bug 修正，動工前用手動計算比對腳本印出的 halfw 值與正確公式的差異才發現（例如 Rioja 應為 halfw=41，但實際印出 17，等於少了一半以上），France/Italy 腳本的 `%LABEL_TEXT` key 本來就採用與其 `%regionShape` 一致的小寫慣例、不受影響，此 bug 為伊比利腳本獨有。
114. **修正 key 後重新量測，9個大區的 halfw 值全數大幅提升（例如 Castilla y León 從47暴增到95），導致沒有一個大區的形狀大到能通過1.5倍的「夠大」門檻——分類結果自然變成「全部9個大區都用義大利式彈性位移＋指示線」，不再有大區使用硬性容器約束**：同步把小形狀的位移上限從「重心半徑倍數」改為比照義大利的固定像素值（58px），因為半徑倍數在標籤實際寬度暴增後會讓大形狀（如 Castilla y León）的標籤被推到離重心100px以上、指示線橫跨大半個地圖。
     原因：這是修正 key 錯誤後的自然結果，如實反映伊比利大區文字本身（西班牙語＋中文雙語全名）比法國/義大利的大區名稱長上不少，用真實寬度計算後沒有大區形狀能完整容納文字是誠實的量測結論，不強行維持原本「有些用容器約束」的假象。
115. **新增「初始位置去簡併偏移」處理 Vinho Verde 個案**：`labelPos` 初始化時，若大區重心本身就落在某個產區標記的安全距離內（例如 Vinho Verde 重心與同名產區標記僅距約5.8px），先沿反方向做一次性偏移再開始迭代，避免起點與標記幾乎重合導致後續迭代收斂不穩定（同一份腳本重跑因 Perl 雜湊迭代順序不固定，會在「仍重疊」與「勉強不重疊」之間跳動）。
     原因：這是修正 LABEL_TEXT bug 之前、獨立除錯 Vinho Verde 個案時發現的根因（起點簡併），保留此修正因為即使在 bug 修正後、大區全數改用彈性位移的新格局下，這個去簡併邏輯依然有效降低收斂不穩定性。
116. **驗證方式**：headless Chrome 截圖確認正式 `index.html` 的伊比利地圖9個大區標籤全數清楚分離、無交疊、指示線正確連回各自大區重心，且金色編號標記皆未被文字蓋住（含真實 `renderIberiaMarkers()` 動態產生的13個編號標記一併截圖比對）；`--dump-dom` 確認頁面載入無 JS 錯誤。
     原因：先前僅用程式化 pairwise 距離估算會因為安全係數是保守估計值、而非真實字型渲染寬度，出現「數字上剛好壓線過關但視覺上仍重疊」的落差（如 Rioja 與自身標記數字上僅差0.05px達標，實際畫面上兩者仍緊貼），這次額外用實際渲染截圖交叉確認，不只依賴數字門檻。

## 2026-07-10 修正三張地圖側邊列表編號邏輯不連續的問題

117. **`js/map.js` 新增共用函式 `computeGroupedNumbering(list)`，把編號依據從「該產區在 `WINE_DB.appellations` 陣列裡的原始資料撰寫順序」改為「側邊清單依大區分組後、由上到下顯示的順序」**：`renderMarkerIndexList()`（側邊清單）與 `renderFranceMarkers()`／`renderItalyMarkers()`／`renderIberiaMarkers()`（地圖上的編號標記）三者都改讀同一份 `numById` 對照表，確保清單編號永遠是連續的 1,2,3,4...，且地圖上同一個產區的標記數字與清單上的數字保持一致。
     原因：使用者回報側邊列表編號順序很亂，詢問該用「地圖座標由左上到右下」還是「清單顯示順序」編號；因為清單本身就是依大區分組顯示，若採座標排序，組內編號仍會不連續、達不到使用者想要的「清單讀起來就是1,2,3,4」效果，因此建議並採用清單顯示順序編號，大區在地理上通常本來就聚集，同大區內連號在地圖上也會相對靠近，間接兼顧空間直覺性。
     驗證：寫測試頁載入真實 `data/wine-data.js`／`js/map.js`，確認法國清單编号為連續 1-35；另外交叉比對三張地圖的地圖標記編號與清單編號，逐一產區 id 比對無任何不一致。

## 2026-07-10 修正義大利地圖 Abruzzo／Marche／Tuscany／Emilia-Romagna 四個標籤位置

118. **`index.html` 的 `#italy-svg`：Tuscany／Emilia-Romagna 兩個 `<text>` 座標直接互換（各自指示線起點跟著換，終點維持指向各自大區重心不變）；Abruzzo／Marche 則依使用者提供的截圖標紅位置，分別移到內陸空白區（195,295）與東側海域空白區（330,208）**。
     原因：使用者截圖標出四個標籤目前的重疊/擁擠問題與期望位置，其中 Tuscany/Emilia-Romagna 是明確的「直接對調」指令，Abruzzo/Marche 則是依截圖標紅位置的視覺估計（截圖非精確座標標註，採合理估計後以 headless Chrome 實際渲染比對確認）。
     驗證：headless Chrome 截圖比對使用者提供的參考圖，確認 Marche 移至東側空白海域、Abruzzo 移至托斯卡尼/溫布里亞之間的空白內陸區，Tuscany/Emilia-Romagna 位置正確互換，四個標籤與其餘大區文字、編號標記均無重疊，視覺呈現與使用者參考圖吻合。

## 2026-07-10 伊比利地圖大區標籤依參考圖重新定位＋三張地圖大產區文字字體統一為 8.5

119. **三張地圖（法國／義大利／伊比利）全部大產區文字 `font-size` 統一為 `8.5`、`stroke-width` 統一為 `2.6`**：義大利原本已是 8.5/2.6 不需改；法國原本 9–10 不等，統一調降；伊比利原本 9–10 不等，統一調降。基準值採「伊比利現有最小尺寸 9 再小一級＝8.5」，經 AskUserQuestion 向使用者確認三個候選基準（10/9/8.5系列）後選定。
     原因：使用者明確要求「三張地圖的大產區文字字體統一」，且指定以伊比利現有最小字級再小一號作為統一後的目標值；三種候選基準會得到不同最終數字，屬於使用者主觀偏好判斷、非技術限制，故先詢問而非自行假設。
120. **伊比利地圖依使用者提供的參考截圖，重新定位7個大區標籤**：Galicia／Castilla y León／Vinho Verde／Murcia 四個移到各自大區重心座標，並移除原本的指示線（文字本身已落在大區形狀內，不需要指示線輔助辨識）；Rioja／Douro／Catalonia 三個移到參考圖標示的新位置，但保留指示線指回各自大區重心；Navarra／Andalusia 兩個依參考圖沒有標示新位置，維持不變。
     原因：使用者提供截圖用紅字標出7個大區的期望文字位置，動工前已用 AskUserQuestion 確認移動方向的判斷（先前誤判 Rioja/Douro 也要移除指示線，經使用者糾正「移到指定位置後仍要保留指示線」、「Murcia 移到指定位置後不需要指示線」才動工），Galicia/Castilla y León/Vinho Verde/Murcia 四個因文字新位置已落在大區形狀內部，移除指示線是合理的視覺簡化；Rioja/Douro/Catalonia 因新位置明顯離開大區形狀本身（如 Rioja 移到地圖上緣），保留指示線才能讓使用者看出對應哪個大區。
     驗證：由於參考截圖本身不是精確座標標註，採「截圖視覺估計＋headless Chrome 實際渲染後比對」的方式反覆確認，最終渲染結果（Rioja/Navarra 位置關係、Galicia/Vinho Verde/Douro 在各自形狀內的相對位置、Murcia/Catalonia 位置）與使用者提供的參考圖高度吻合。
