# HANDOFF

> 本檔案每次 session 結束時覆蓋重寫，不累加舊內容。最後更新：2026-09-07。

## 一、本次開發歷程

**本次是一個橫跨數十輪的長session，從零開始建置「模擬考」整個Phase 2功能，並完成quiz-data.js 300題內容的全面重寫。上一版HANDOFF（涵蓋至#257）之後的所有工作皆屬本次。**

### 1. Phase 2：模擬考UI與計分引擎（新檔案`js/quiz.js`，新增`data/quiz-data.js`、`index.html` panel-quiz區塊、`css/style.css` `.quiz-badge`系列）
- 抽題邏輯：`buildQuizQuestionSet()`依`QUIZ_LO_ALLOCATION`分層抽樣→整體洗牌→每題選項獨立洗牌→`breakQuizCorrectIndexRuns()`後處理避免連續同答案位置。
- 狀態機：`showQuizState()`調度`.quiz-state`（start/lo-select/active/result/history/resume）之間切換，`updateQuizPanelHeader()`同步改寫panel標題。
- 計分：`calculateQuizResults()`算correct/wrong/unanswered/scoreRatio/loStats；分級（`QUIZ_GRADE_META`）只在`quizMode==='exam'`時計算。
- **5級分級門檻（85/70/55/45%）已查證為WSET Level 2官方規格書2019年版第17頁的真實標準**，非自創設計，記錄於DECISIONS.md（commit `e7b6b17`）——未來如需簡化不可未經查證就改動。
- 過程中修了多輪實測抓到的UI bug（LO選擇畫面缺返回鈕、測驗中缺離開鈕、練習模式panel標題未同步、Tailwind preflight吃掉`<ul>`項目符號等）。

### 2. quiz-data.js 300題內容全面重寫
- 因舊有重寫進度遺失，本次以`data/quiz-rewrite-progress-v2.json`重新起點追蹤，依LO1→LO2→LO3（8品種）→LO4（17品種，4批）→LO5（氣泡酒+加烈酒）→LO6（2批）逐批完成，每批獨立commit（commit訊息格式`quiz rewrite restart: lo{N} {說明}`）。
- **內容正確性由「顧問Claude」（另一對話）把關，本對話僅依給定的精確JSON執行替換+結構驗證**，不自行判斷/修改題目內容（除非使用者當場明確核准，如lo3-syr-008）。
- 收尾驗收（結構完整性/選項長度洩題/no-run約束三項指標）全數通過，2題手動修正（`lo5-spk-003`長度差距、`lo4-alb-001`no-run違規）。**300題重寫已完整結束（status:"COMPLETE"）**。
- 過程中曾3次因「內容已一致仍執行Edit」誤插入空物件/重複id，已改為**內容一致就完全跳過Edit呼叫**，不做確認性編輯。

### 3. buildQuizQuestionSet() runtime no-run約束擴充（commit `673a05e`）
- 原參考演算法只往後(`j>i`)找交換候選，陣列尾端沒有候選可換，實測50題模擬考仍有7-9%殘留。擴充為**找不到則往前找**，50題殘留降到0%；8題練習模式殘留1.15-2.05%（結構性限制，非尾端問題，需多題同時重排才能根除）——**使用者已確認接受此殘留、不再處理**。

### 4. sessionStorage持久化修正重整遺失進度風險（commit `69567fe`）
- 新增`quiz-state-resume`畫面+`saveQuizSessionState/loadQuizSessionState/clearQuizSessionState`+`beforeunload`監聽。
- **實測抓到真bug並已修正**：`initQuizPanel()`偵測到未完成測驗時，除了`showQuizState('resume')`還必須呼叫`showPanel('quiz')`，否則提示畫面會被其他預設分頁蓋住看不到。

### 5. LO練習模式加入歷史紀錄（commit `287c169`）
- 新增`wineAtlasQuizPracticeHistory`獨立storage key（20筆上限），與模擬考`wineAtlasQuizHistory`（10筆上限）分開，避免互相擠壓。歷史成績畫面拆成「模擬考成績」+「LO練習紀錄」兩個獨立區塊，各自獨立空狀態文案。

### 6. LO正確率彙總長條圖（commit `800080b`，**本次最後一個功能commit**）
- `computeLoWeaknessStats()`彙總兩份history的loStats，`renderLoWeaknessChart()`用Chart.js長條圖（酒紅`#5C061C`）+line型dataset疊加55%金色虛線參考線，比照既有`radarInst`銷毀慣例先`.destroy()`再重繪。已用Playwright驗證4種情境（空狀態文案、資料與手動彙總一致、55%參考線、連續進出5次Chart實例數固定為1）。

### 7. 環境能力解鎖：Node.js + Playwright
- 本次session中途完成安裝設定，之後所有UI/互動類需求改用**真實Playwright瀏覽器**驗證（取代純讀程式碼推測），純資料/結構驗證仍用Node腳本（於scratchpad執行、不進repo）。設定細節與踩雷已寫入使用者memory系統（`reference_nodejs_playwright_setup`）。

### 8. 順手完成的小功能
- `js/grapes.js`：`buildGrapeCardHTML()`品種卡片加`border-left:4px solid`色條區分紅（`--burg`）/白（`--gold`）酒。

## 二、討論過但尚未執行的項目／下一步規劃

- **時間趨勢折線圖**（例如「近N次模擬考LO3正確率變化」）：使用者於LO正確率長條圖規格提出時**明確排除本次範圍**，需要額外的時間範圍篩選+LO選擇互動設計，留待未來單獨評估。
- 跨session的錯題本/多次作答的錯題彙總目前不存在（僅有單次交卷後的逐題複查）。
- 練習模式同一天同一LO重複練習多次時，歷史列表除了時間戳記外沒有其他區分標題。
- `js/quiz.js`檔案隨功能疊加持續增長，尚未到需要拆分的程度，但若未來繼續加功能可留意。

## 三、我明確要求先記下來、之後再處理的內容

- 無。上述「時間趨勢折線圖」是使用者主動排除範圍的項目，不是要求記錄待辦，僅供未來session參考脈絡。

## 四、現況檢查提醒

- **push狀態**：本機與`origin/main`已同步（`git fetch`後確認`main...origin/main`無領先/落後），最新commit為`800080b`（本次HANDOFF.md覆寫即最後一次commit，即將詢問是否push）。
- **quiz-data.js 300題重寫已100%完成並驗證通過**，`data/quiz-rewrite-progress-v2.json`的`status`為`"COMPLETE"`——之後若顧問Claude提出新一輪內容調整需求，仍照本次建立的「精確JSON替換+Node腳本結構驗證」模式執行，不要重新發明流程。
- **8題練習模式的no-run殘留（1.15-2.05%）是已知且使用者已接受的限制**，不是bug，未來若被問起不需要重新debug，直接引用DECISIONS.md中該筆決策記錄即可。
- **5級分級門檻（85/70/55/45%）已查證為WSET官方標準**，不是本站自創，未來如有人質疑或想簡化，先查DECISIONS.md記錄再回應，不要憑印象重新設計。
- **`project-snapshot.md`目前為未追蹤的殘留檔案**（本次對話中打包網站時產生，未commit）——如果使用者確認不需要可以刪除，或留給下次「請打包目前網站」時覆蓋。
- **Node.js + Playwright環境本次已確認可正常運作**，之後對quiz功能或其他UI互動類需求，優先用瀏覽器實測而非只讀程式碼推測正確性；純資料/結構類仍優先用grep或Node腳本，不要為了圖方便反過來用瀏覽器測資料結構問題。
- 本次未對quiz功能之外的其他既有分頁（產區資料庫/品種/分級制度等）做任何回歸測試，若使用者反映其他分頁有異常，需視為獨立問題重新排查，不要假設與本次改動有關。
