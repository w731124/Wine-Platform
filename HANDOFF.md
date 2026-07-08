# HANDOFF

> 本檔案每次 session 結束時覆蓋重寫，不累加舊內容。最後更新：2026-07-08。

## 一、本次開發歷程

延續上次的**頂層導覽列改版**（6個平行分頁歸納為4個項目，見 DECISIONS.md #54-57），本次修了使用者截圖回報的**兩個視覺 bug**：

1. **「品飲系統」獨立按鈕被撐大、擠壓其他項目**：根因是 `.tab-nav{display:flex}` + `.tab-btn{flex:1}` 的規則沒有跟著新增的 `.tab-group` 包裹層更新，只有沒被包裹的「品飲系統」按鈕還吃得到 `flex:1`。修法：`css/style.css` 的 `.tab-group` 加上 `flex:1;display:flex`，讓四個頂層項目（3個群組容器＋1個獨立按鈕）恢復等寬。
2. **下拉選單展開後被裁切、要滑捲軸才看得到**：根因是 `<nav class="flex-1 overflow-x-auto">` 的 `overflow-x-auto` 依 CSS 規範會連帶把 `overflow-y` 也變成 `auto`，讓 nav 變成雙向裁切容器，關住了絕對定位展開的 `.tab-dropdown`。修法：`index.html` 的 nav 拿掉 `overflow-x-auto`，只留 `flex-1`（新版只剩4個頂層項目，寬度需求遠低於改版前的6個，不再需要橫向捲動）。

兩處都用 headless Chrome 截圖驗證過：一張確認四個頂層項目寬度平均分布，另一張用暫存測試頁（複製到同目錄以維持相對路徑，載入真實 CSS/JS，自動觸發 `toggleTabGroup()` 展開「工具」下拉選單，驗證後即刪除）確認下拉選單完整顯示、無裁切。

以上已 commit（見下方「現況檢查提醒」），**尚未 push**（連同上次改版的 commit 一起，目前領先 origin/main 多個 commit）。

## 二、討論過但尚未執行的項目

- **「分級制度」「釀造工藝」兩個新分頁的實際內容**（波爾多列級莊制度、勃根地葡萄園分級、紅白粉橘氣泡強化酒的釀造工藝差異等）——導覽結構已預留位置（disabled 停用項目），內容本身是新任務，需要另外確認範圍再動工。
- 地圖探索分頁座標覆蓋缺口（判定為功能規模缺口非技術債）——仍未處理。
- 是否要 push 累積的 commits，尚待使用者決定。

## 三、我明確要求先記下來、之後再處理的內容

- **「分級制度」「釀造工藝」兩個分頁的實際內容尚待建立**（見上方第二節），目前只是導覽選單裡的停用預留項目。

## 四、現況檢查提醒

- **本次 session 的異動（css/style.css／index.html／DECISIONS.md）截至本檔案寫入時尚未 commit**，接手前請先確認原裝置是否已完成 commit。
- **接手的 Claude Code 若要新增「分級制度」或「釀造工藝」分頁，記得先把 index.html 對應下拉選單裡的 `disabled` 停用項目改成可點擊、並補上 `onclick="selectTabFromGroup(this,'新分頁id',event)"`，同時要新增對應的 `<div id="panel-新分頁id" class="panel">` 內容區塊**——導覽結構已經預留好分類位置，不需要再改一次 HTML 巢狀結構。
- **`.tab-group` 現在有 `flex:1;display:flex`**：未來若在頂層導覽列（`.tab-nav` 底下）新增任何項目，記得比照現有的 `.tab-group`／獨立 `.tab-btn` 兩種寫法之一，不要漏掉 flex 屬性，否則會重演這次寬度不一致的 bug。
- **nav 已不再有 `overflow-x-auto`**：若未來頂層項目數量增加導致 `.tab-nav`（`min-w-max`）寬度超出可視範圍，需要重新設計橫向捲動或換行方案時，記得下拉選單的裁切問題會再度出現，屆時要考慮把下拉選單改用 JS 動態定位（如 `position:fixed`）而非依賴 nav 的 overflow 屬性。
- **`switchToPanel(name)` 的比對邏輯**：先比對獨立按鈕（`.tab-nav > .tab-btn`），找不到才在 `.tab-dropdown-item` 裡用 `onclick*="'name',event"` 比對。未來如果又調整導覽結構，記得這個函式的比對邏輯要跟著檢查。
- **本機環境沒有 Node.js，Python 也無法執行**。
- **接手的 Claude Code 務必實際開啟異動的檔案核對真實現況**，不要只憑這份 HANDOFF.md 的文字描述去猜測。
