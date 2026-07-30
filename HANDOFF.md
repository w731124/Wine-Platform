# HANDOFF

> 本檔案每次 session 結束時覆蓋重寫，不累加舊內容。最後更新：2026-07-30。

## 一、本次開發歷程

**本次涵蓋範圍（接續上一版 HANDOFF，該版由commit `f21672f`寫入、涵蓋至#255）：裁定上次session遺留的2項懸而未決事項——aromaWheel 4筆非標準詞彙修正、Old Vine/Late Harvest分級歸屬裁定，共1個commit（本次HANDOFF.md覆寫即最後一次commit）。**

### 1. aromaWheel詞彙非標準寫法修正、Old Vine/Late Harvest分級歸屬裁定（DECISIONS.md #256-257）
- **事項1（修正）**：`data/wine-data.js`4筆`aromaWheel`欄位非標準詞彙，比照`CANONICAL_VOCABULARY_MAP`（源自#251 keyIdentifiers統一結果）修正：`marlborough`／`sauvignon-blanc`的`Passion Fruit(百香果)`→`Passionfruit(百香果)`，`haut-medoc`／`sta-rita-hills`的`Dark Cherry(黑櫻桃)`→`Black Cherry(黑櫻桃)`。`grep`確認全域已無舊寫法殘留；全域大括號/中括號配對平衡（1258/1258、724/724）。
- **事項2（裁定維持現狀，不修改程式碼）**：分級制度頁的Old Vine/Vieilles Vignes與Late Harvest/Vendanges Tardives裁定**不新增第4種分類、不另闢頁面**，比照#241 sparkling/fortified款的既定判斷原則（風格/採收方式標示而非品質階層，不屬於`classifications.js`分級卡片的設計範疇）；核對確認這兩項術語已透過既有`styleSummary`/`history`/`keyIdentifiers`/`agingPotential`欄位自然帶出實質內容，形式上視為已解決。

## 二、討論過但尚未執行的項目／下一步規劃

- 上一版HANDOFF列出的2項懸而未決事項本次皆已裁定完畢，目前**無新的待裁定事項**。
- 執行`auditWineDB()`後預期`inconsistentVocabulary`清單應為空（本次修正的4筆是該清單當時的唯一內容），下次接手時建議實際執行一次確認無誤，不要只憑本次文字描述假設已通過。

## 三、我明確要求先記下來、之後再處理的內容

- 無。本次僅處理2項已明確裁定的待辦事項，未產生新的擱置項目。

## 四、現況檢查提醒

- **push狀態（重要）**：本次session結束時本機**領先**`origin/main` 1個commit（本次HANDOFF.md覆寫將是最後一次commit，即將push）。**接手時務必先跑`git fetch && git status -sb`確認目前的落後/領先狀態**，不要假設本機一定是最新或一定已同步。
- **`auditWineDB()`現在有6項稽核**（缺少地圖座標／缺少比較模式profile／法國產區未綁定年份矩陣／詞彙一致性`inconsistentVocabulary`／侍酒溫度區間`servingTempMismatch`，加上整體通過判斷），新增已知例外時比照既有`KNOWN_VINTAGE_EXCEPTIONS`／`KNOWN_SERVING_TEMP_STRADDLE_EXCEPTIONS`的模式（獨立常數＋輸出時區分✅已知例外與❌真正警告），不要直接把例外硬編碼進判斷式裡，維持這個站內已建立的稽核設計慣例。
- **`CANONICAL_VOCABULARY_MAP`（`js/core.js`）是全站詞彙統一的唯一事實來源**：日後若新增品種或產區資料時用了容易與既有詞彙混淆的英文/中文寫法，`auditWineDB()`會自動抓到並警告，若確認是新的同義詞情況，記得同步更新這個常數而不是只在資料層面修正。
- **本機環境限制（沿用既往）**：沒有Node.js，`python3`/`python`是Windows Store空殼；headless Chrome路徑固定在`C:\Program Files\Google\Chrome\Application\chrome.exe`；`_devserver.ps1`已修復UTF-8 BOM問題，之後直接沿用即可，不需重新排查。
- **`project-snapshot.md`目前已經過時**：已累積多次session未重新產生此檔案，快取內容明顯落後於當前程式碼。這份檔案每次有新commit後都會過時，如果使用者需要更新版本要重新產生，不要假設現有內容反映最新狀態。
- **本次未執行headless Chrome實測驗證**（純文字取代與純裁定紀錄，無新增互動邏輯或DOM渲染變動），下次接手若對這2項改動有疑慮，建議自行執行`auditWineDB()`實際確認`inconsistentVocabulary`清單狀態，不要只憑本檔案文字描述。
