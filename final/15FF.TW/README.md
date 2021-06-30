# [109-2] Web Programming Final

組別:42組

組員: b07902042 葉璟諄(組長) 、 b07902054 林子權

分工:
後端：葉璟諄
前端：林子權

題目名稱:(Group 42) 15FF.TW

Demo Link: https://www.youtube.com/watch?v=bnKP1TjQ3pU

**提供服務:**

 提供線上遊戲**英雄聯盟**，台服玩家的戰績查詢功能，除了可以獲取自己的戰績以外，我們還在台服抓取了大量玩家資料(台服天梯1000名)，統計各角色的勝率與各項數據後，用戶能與這些資料去比較，除此之外還統計了任意兩個角色對戰情形的資料。
 
Deploy Link:http://140.112.30.34:1515/
(如果以上link掛掉請使用這個)https://lol-15ff-tw.herokuapp.com/

登入畫面輸入自己英雄聯盟名稱可登入，並抓取你的近十場對戰
登入後第一二項可以查詢全服的英雄資料，點進去後記得在上面選要查看的英雄才會有畫面，第三項可以看自己的近期對戰紀錄，如果持續使用我們網站記錄(例如每10場登錄一次)就會有很多頁。

**使用之第三方套件、框架、程式碼**:

Backend:  Garena英雄聯盟所提供的API，能用玩家名稱得到該玩家近期的對戰數據

Frontend: 使用大量antd提供的模塊，登入介面參考作業七的設計

**專題製作心得:**

我們本身就很愛玩英雄聯盟，因為國外的各大數據網站(op.gg)從近年起不再提供臺服相關數據，台服的戰績查詢網頁速度又很慢，且沒辦法比較英雄間的數據，就想利用網服課程所學，架設一個戰績網。

而抓取資料的過程蠻艱難的，一開始是從別人提供的網站爬取數據後再做統計，但問過該網站的使用者後說他不同意我們爬取，因此在網路上尋找了許久終於找到官方提供的API用法，能獲取戰績後就把大量的數據統計起來，存到我們的資料庫中，這樣用戶和我們的數據做比較才比較可信。實作出來後發現成果蠻不錯的，而且比台服可用的戰績網快上了許多，未來可能就會使用自己寫的網頁來做查詢，希望也能對其他有玩英雄聯盟的同學有所幫助。

前端也是第一次自己從頭設計這樣規模的網站，遇到最多問題的絕對是在css的使用上，有的時候想讓一個頁面排版成自己腦中的樣子，都要花很多時間去慢慢嘗試。整個網頁做完的心得是好險上課時有介紹到antd這個套件，如果沒有使用這個第三方套件真的會麻煩蠻多的，許多功能如果要自己手刻絕對會多花好幾倍的時間。
### localhost 安裝與測試
在15FF.TW目錄下
```
yarn install
cd ./backend
yarn install
cd ../frontend
yarn install
cd ..
```
分別執行`yarn server` `yarn start
並且開啟localhost 4000，就會有前端網頁
如果沒有英雄聯盟帳號 以下提供帳號來做測試:
固定穿搭海灘褲
