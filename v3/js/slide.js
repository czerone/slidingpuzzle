$(function() {
    var time = 0;
    var pause = true;
    var rand_pic = false;
    var set_timer;
    var first_pic;
    // 位置轉座標的換算表
    var posConv = {};
    for(var i=0;i<9;i++) {
        $("#dvPuzzle").append("<div class='PicCell' id='Pic" + i + "'><img src='img/dragon960.png' /></div>");
        var row = parseInt(i / 3);
        var col = i % 3;
        $("#Pic" + i + " img").css("margin-left", col * -320 + 1).css("margin-top", row * -240 + 1);
        // 第i個轉成第row列第col行
        posConv[i] = {row:row, col:col};
    }
    // 取得相鄰位置
    function getNearPos(i) {
        var pool = [];
        var row = posConv[i].row, col = posConv[i].col;
        // toCheck用來放入待比對的對象
        if(row > 0) // 上
            pool.push((row-1)*3 + col);
        if(row < 3) // 下
            pool.push((row+1)*3 + col);
        if(col > 0) // 左
            pool.push(i-1);
        if(col < 3) // 右
            pool.push(i + 1);
        return pool;
    }
    // 計時
    function timer() { //定時函式，每一秒執行一次
        time += 1; //一秒鐘加一，單位是秒
        var min = parseInt(time/60); //把秒轉換為分鐘，一分鐘60秒，取商就是分鐘
        var sec = time%60; //取餘就是秒
        $("#timer").text(min + "分" + sec + "秒"); //然後把時間更新顯示出來
    }
    // 打亂圖片
    function random_d() {
        for(var i=0;i<500;i++) {
            var cells = $("#dvPuzzle div");
            // 找出空格所在位置,並取得其相鄰圖塊
            var toMove = getNearPos(cells.index($("#Pic0")[0]));
            cells.eq(toMove[parseInt(Math.random()*toMove.length)]).click();
        }
    }
    // 點選動作
    $(".PicCell").click(function() {
        if(!pause) {
            // 找尋左右上下有無Pic0,有則可以與他交換位置
            // 先找出元素是9個中第幾個?
            var cells = $("#dvPuzzle div");
            var i = cells.index(this);
            var toCheck = getNearPos(i);
            while(toCheck.length > 0){
                var j = toCheck.pop();
                if(cells.eq(j).attr("id") == "Pic0") { // 為空白格,交換位置
                    // 排序,必要時對調,讓i < j
                    if(i > j){
                        var k = j;j = i;i = k;
                    }
                    var ahead = cells.eq(i);
                    var behind = cells.eq(j);
                    var behindPrev = behind.prev();
                    // 左右對調
                    if(Math.abs(i-j) == 1)
                        behind.after(ahead);
                    else { // 上下對調
                        ahead.after(behind);
                        behindPrev.after(ahead);
                    }
                }
            }
            if(rand_pic) { // shuffle時不確認
                // 確認是否完成拼圖
                var finish_flag = true;
                cells = $("#dvPuzzle div");
                for(var num=1;num<9;num++) {
                    if(cells.eq(num).attr("id") != "Pic"+num) {
                        finish_flag = false;
                        break;
                    }
                }
                if(finish_flag == true) {
                    $("#start").text("開始");
                    pause = true;
                    clearInterval(set_timer);
                    rand_pic = false;
                    $("#Pic0").append(first_pic);
                    alert("Congratulation!");
                }
            }
        }
    });

    $("#start").click(function() { //開始暫停函式
        if(pause) {
            if(!rand_pic) {
                if(set_timer)
                    clearInterval(set_timer);
                time = 0;
                first_pic = $("#Pic0 img");
                $("#Pic0 img").remove();
                pause = false; //暫停表示設定為false
                random_d();
                rand_pic = true;
            }
            $("#start").text("暫停"); //把按鈕文字設定為暫停
            set_timer = setInterval(timer, 1000); //啟動定時
        } //如果當前是暫停，則開始
        else {
            $("#start").text("開始");
            pause = true;
            clearInterval(set_timer);
        }
    });
    $("#reset").click(function() {
        // 更新狀態與時間
        $("#start").text("暫停");
        pause = false;
        if(set_timer)
            clearInterval(set_timer);
        time = 0;
        set_timer = setInterval(timer, 1000);
        // 除去左上角
        first_pic = $("#Pic0 img");
        $("#Pic0 img").remove();
        random_d();
        rand_pic = true;
    });
});