# Sliding Puzzle #

使用網路語言完成 Sliding Puzzle Game

### Content ###

事前準備:
在找尋資料的過程中 Ref 3 提供了我可以找圖片以及resize圖片的地方

v1:
使用Ref 1 網站所提供的資訊可以完成簡易的九宮格拼圖小遊戲，但沒有使用到分割圖片的技巧。有幾個缺點可以改進。
第一個是完成遊戲後如果直接按下開始鍵會當掉。
第二個是完成遊戲的機率有些低。這和一開始打亂圖片的方法有關係。

v2:
使用Ref 2 網站提供的CSS分割圖片技巧換成使用圖片進行遊戲。
修正v1遇到打亂後有機率會拚不回正確圖案的問題。

v3:
整合v1及v2功能。v3 參考了Ref 4 提供了關於 jQuery更詳細的使用說明，把v1的寫法使用jQuery的方式重新詮釋並使用在v3上。
最後測試在google chrome及Microsoft Edge瀏覽器上能順利操作。

### Source From ###

* (Ref 1) https://codertw.com/%E5%89%8D%E7%AB%AF%E9%96%8B%E7%99%BC/246384/
* (Ref 2) https://www.darkthread.net/jQuery/Tutorial08/default.htm
* (Ref 3) https://lyshie.gitbooks.io/scratch-2-advanced-game-design/puzzle.html
* (Ref 4) https://www.w3schools.com/jquery/jquery_syntax.asp
