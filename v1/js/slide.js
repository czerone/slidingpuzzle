var time=0; //儲存定時時間
var pause=true; //設定是否暫停標誌，true表示暫停
var set_timer; //設定定時函式
var d=new Array(10); //儲存大DIV當前裝的小DIV的編號
var d_direct=new Array(
    [0],[2,4],[1,3,5],[2,6],[1,5,7],[2,4,6,8],[3,5,9],[4,8],[5,7,9],[6,8]
    );
//為了邏輯更簡單，第一個元素我們不用，我們從下標1開始使用
//大DIV編號為1的DIV可以去的位置，比如第一塊可以去2,4號位置
//儲存大DIV編號的可移動位置編號
var d_posXY=new Array(
    [0],[0,0],[150,0],[300,0],[0,150],[150,150],[300,150],[0,300],[150,300],[300,300]
    );
//第一個表示left,第二個表示top，比如第一塊的位置為let:0px,top:0px
//大DIV編號的位置
for(var i=1;i<9;i++){
    d[i]=i;
}
d[9]=0;
//預設按照順序排好，大DIV第九塊沒有，所以為0，我們用0表示空白塊
// start move function
function move(id){
    var i=1;
    var target_d=0; //儲存小DIV可以去的編號，0表示不能移動
    var finish_flag=true; //設定遊戲是否完成標誌，true表示完成
    for(i=1;i<10;++i){
        if(d[i]==id)
            break;
    } //這個for迴圈是找出小DIV在大DIV中的位置
    target_d=whereCanTo(i); //用來找出小DIV可以去的位置，如果返回0，表示不能移動，如果可以移動，則返回可以去的位置編號
    if(target_d!=0){
        d[i]=0; //把當前的大DIV編號設定為0，因為當前小DIV已經移走了，所以當前大DIV就沒有裝小DIV了
        d[target_d]=id; //把目標大DIV設定為被點選的小DIV的編號
        document.getElementById("d"+id).style.left=d_posXY[target_d][0]+"px";
        document.getElementById("d"+id).style.top=d_posXY[target_d][1]+"px";
    } //最後設定被點選的小DIV的位置，把它移到目標大DIV的位置
    //如果target_d不為0，則表示可以移動，且target_d就是小DIV要去的大DIV的位置編號
    for(var k=1;k<9;++k){
        if(d[k]!=k){
            finish_flag=false;
            break; //如果大DIV儲存的編號和它本身的編號不同，則表示還不是全部按照順序排的，那麼設定為false，跳出迴圈，後面不用再判斷了
        }
    } //從1開始，把每個大DIV儲存的編號遍歷一下，判斷是否完成
    if(finish_flag==true){
        if(!pause)
            start();
        alert("congratulation");
        //如果為true，則表示遊戲完成，如果當前沒有暫停，則呼叫暫停韓式，並且彈出提示框，完成遊戲。
        //start()這個函式是開始，暫停一起的函式，如果暫停，呼叫後會開始，如果開始，則呼叫後會暫停
    }
}
// end move function
// start whereCanTo function
function whereCanTo(cur_div){ //判斷是否可移動函式，引數是大DIV的編號，不是小DIV的編號，因為小DIV編號跟可以去哪沒關係，小DIV是會動的
    var move_flag=false;
    for(var j=0;j<d_direct[cur_div].length;++j){ //把所有可能去的位置迴圈遍歷一下
        if(d[d_direct[cur_div][j]]==0){
            move_flag=true;
            break;
        }
    } //如果目標的值為0，說明目標位置沒有裝小DIV，則可以移動，跳出迴圈
    if(move_flag==true){
        return d_direct[cur_div][j];
    }
    else{
        return 0;
    } //可以移動，則返回目標位置的編號，否則返回0，表示不可移動
}
// end whereCanTo function
// start timer function
function timer(){ //定時函式，每一秒執行一次
    time+=1; //一秒鐘加一，單位是秒
    var min=parseInt(time/60); //把秒轉換為分鐘，一分鐘60秒，取商就是分鐘
    var sec=time%60; //取餘就是秒
    document.getElementById("timer").innerHTML=min+"分"+sec+"秒"; //然後把時間更新顯示出來
}
// end timer function
// start start function
function start(){ //開始暫停函式
    if(pause){
        document.getElementById("start").innerHTML="暫停"; //把按鈕文字設定為暫停
        pause=false; //暫停表示設定為false
        set_timer=setInterval(timer, 1000); //啟動定時
    } //如果當前是暫停，則開始
    else{
        document.getElementById("start").innerHTML="開始";
        pause=true;
        clearInterval(set_timer);
    }
}
// end start function
// start reset function
function reset(){ //重置函式
    time=0; //把時間設定為0
    random_d(); //把方塊隨機打亂函式
    if(pause) //如果暫停，則開始計時
        start();
}
// end reset function
// start random_d function
function random_d(){ //隨機打亂方塊函式，我們的思路是從第九塊開始，隨機生成一個數，然後他們兩塊對調一下
    for(var i=9;i>1; --i){
        var to=parseInt(Math.random()*(i-1)+1);
        if(d[i]!=0){ //產生隨機數，範圍為1到i，不能超出範圍，因為沒這個id的DIV
            document.getElementById("d"+d[i]).style.left=d_posXY[to][0]+"px";
            document.getElementById("d"+d[i]).style.top=d_posXY[to][1]+"px";
        } //把當前的DIV位置設定為隨機產生的DIV的位置
        if(d[to]!=0){
            document.getElementById("d"+d[to]).style.left=d_posXY[i][0]+"px";
            document.getElementById("d"+d[to]).style.top=d_posXY[i][1]+"px";
        } //把隨機產生的DIV的位置設定為當前的DIV的位置
        var tem=d[to];
        d[to]=d[i];
        d[i]=tem; //然後把它們兩個的DIV儲存的編號對調一下
    }
}
// end random_d function
window.onload=function(){
    reset();
} //初始化函式，頁面載入的時候呼叫重置函式，重新開始