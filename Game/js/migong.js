var aa = 14;
var chess = document.getElementById("mycanvas");
var context = chess.getContext('2d');

//  var context2 = chess.getContext('2d');
//      context.strokeStyle = 'yellow';
var tree = [];//存放是否联通
var isling = [];//判断是否相连
for (var i = 0; i < aa; i++) {
    tree[i] = [];
    for (var j = 0; j < aa; j++) {
        tree[i][j] = -1;//初始值为0
    }
}
for (var i = 0; i < aa * aa; i++) {
    isling[i] = [];
    for (var j = 0; j < aa * aa; j++) {
        isling[i][j] = -1;//初始值为0
    }
}

function drawChessBoard() {//绘画
    for (var i = 0; i < aa + 1; i++) {
        context.strokeStyle = 'gray';//可选区域
        context.moveTo(15 + i * 30, 15);//垂直方向画15根线，相距30px;
        context.lineTo(15 + i * 30, 15 + 30 * aa);
        context.stroke();
        context.moveTo(15, 15 + i * 30);//水平方向画15根线，相距30px;棋盘为14*14；
        context.lineTo(15 + 30 * aa, 15 + i * 30);
        context.stroke();
    }
}

drawChessBoard();//绘制棋盘

//      var mymap=new Array(36);
//      for(var i=0;i<36;i++)
//     {mymap[i]=-1;}


function getnei(a)//获得邻居号  random
{
    var x = parseInt(a / aa);//要精确成整数
    var y = a % aa;
    var mynei = new Array();//储存邻居
    if (x - 1 >= 0) {
        mynei.push((x - 1) * aa + y);
    }//上节点
    if (x + 1 < 14) {
        mynei.push((x + 1) * aa + y);
    }//下节点
    if (y + 1 < 14) {
        mynei.push(x * aa + y + 1);
    }//有节点
    if (y - 1 >= 0) {
        mynei.push(x * aa + y - 1);
    }//下节点
    var ran = parseInt(Math.random() * mynei.length);
    return mynei[ran];

}

function search(a)//找到根节点
{
    if (tree[parseInt(a / aa)][a % aa] > 0)//说明是子节点
    {
        return search(tree[parseInt(a / aa)][a % aa]);//不能压缩路径路径压缩
    } else
        return a;
}

function value(a)//找到树的大小
{
    if (tree[parseInt(a / aa)][a % aa] > 0)//说明是子节点
    {
        return tree[parseInt(a / aa)][a % aa] = value(tree[parseInt(a / aa)][a % aa]);//不能路径压缩
    } else
        return -tree[parseInt(a / aa)][a % aa];
}

function union(a, b)//合并
{
    var a1 = search(a);//a根
    var b1 = search(b);//b根
    if (a1 == b1) {
    } else {
        if (tree[parseInt(a1 / aa)][a1 % aa] < tree[parseInt(b1 / aa)][b1 % aa])//这个是负数()，为了简单减少计算，不在调用value函数
        {
            tree[parseInt(a1 / aa)][a1 % aa] += tree[parseInt(b1 / aa)][b1 % aa];//个数相加  注意是负数相加
            tree[parseInt(b1 / aa)][b1 % aa] = a1;       //b树成为a树的子树，b的根b1直接指向a；
        } else {
            tree[parseInt(b1 / aa)][b1 % aa] += tree[parseInt(a1 / aa)][a1 % aa];
            tree[parseInt(a1 / aa)][a1 % aa] = b1;//a所在树成为b所在树的子树
        }
    }
}

function drawline(a, b)//划线，要判断是上下还是左右
{

    var x1 = parseInt(a / aa);
    var y1 = a % aa;
    var x2 = parseInt(b / aa);
    var y2 = b % aa;
    var x3 = (x1 + x2) / 2;
    var y3 = (y1 + y2) / 2;
    if (x1 - x2 == 1 || x1 - x2 == -1)//左右方向的点  需要上下划线
    {
        //alert(x1);
        //  context.beginPath();
        context.strokeStyle = 'white';
        //    context.moveTo(30+x3*30,y3*30+15);//
        //   context.lineTo(30+x3*30,y3*30+45);
        context.clearRect(29 + x3 * 30, y3 * 30 + 16, 2, 28);
        //    context.stroke();
    } else {
        //   context.beginPath();
        context.strokeStyle = 'white';
        //  context.moveTo(x3*30+15,30+y3*30);//
        //    context.lineTo(45+x3*30,30+y3*30);
        context.clearRect(x3 * 30 + 16, 29 + y3 * 30, 28, 2);
        //      context.stroke();
    }
}

while (search(0) != search(aa * aa - 1))//主要思路
{
    var num = parseInt(Math.random() * aa * aa);//产生一个小于196的随机数
    var neihbour = getnei(num);
    if (search(num) == search(neihbour)) {
        continue;
    } else//不在一个上
    {
        isling[num][neihbour] = 1;
        isling[neihbour][num] = 1;
        drawline(num, neihbour);//划线
        union(num, neihbour);

    }
}
var a = aa * 30 - 10, b = aa * 30 - 10;
var x = 20, y = 20;

function load() {
    var canvas = document.getElementById("mycanvas");
    Context = canvas.getContext("2d");
    Context.fillStyle = "blue";
    Context.fillRect(x, y, 20, 20);
    context.fillStyle = "red";
    context.fillRect(a, b, 20, 20);
    Context.fillStyle = "blue";
    canvas.addEventListener('keydown', doKeyDown, true);
    canvas.focus();
    window.addEventListener('keydown', doKeyDown, true);
}

load();

function doKeyDown(e) {
    //alert(x+" "+y);
    // console.log(x+" "+y);测试
    var keyID = e.keyCode ? e.keyCode : e.which;//获取按键的Unicode代码值
    if (i == 1) {
        if (keyID === 38 || keyID === 87) { // W键以及上键的移动方向
            if (y - 30 < 0) {
            } else if (isling[(x - 20) / 30 * aa + (y - 20) / 30][((x - 20) / 30) * aa + (y - 20) / 30 - 1] != 1) {
            } else {
                clearCanvas();
                y = y - 30;
                Context.fillRect(x, y, 20, 20);
                e.preventDefault();
                gameover();
                show();
            }
        }
        if (keyID === 39 || keyID === 68) { // D键以及you键的移动方向
            if (x + 30 > 15 + 30 * aa) {
            } else if (isling[(x - 20) / 30 * aa + (y - 20) / 30][((x - 20) / 30) * aa + (y - 20) / 30 + aa] != 1) {
            } else {
                clearCanvas();
                x = x + 30;
                Context.fillRect(x, y, 20, 20);
                e.preventDefault();
                gameover();
                show();
            }
        }
        if (keyID === 40 || keyID === 83) { // S键以及下键的移动方向
            if (y + 30 > 15 + 30 * aa) {
            } else if (isling[(x - 20) / 30 * aa + (y - 20) / 30][((x - 20) / 30) * aa + (y - 20) / 30 + 1] != 1) {
            } else {
                clearCanvas();
                y = y + 30;
                Context.fillRect(x, y, 20, 20);
                e.preventDefault();
                gameover();
                show();
            }
        }
        if (keyID === 37 || keyID === 65) { // A键以及zuo向
            if (x - 30 < 0) {
            } else if (isling[(x - 20) / 30 * aa + (y - 20) / 30][((x - 20) / 30) * aa + (y - 20) / 30 - aa] != 1) {
            } else {
                clearCanvas();
                x = x - 30;
                Context.fillRect(x, y, 20, 20);
                e.preventDefault();
                gameover();
                show();

            }
        }
    }
}

function clearCanvas() {//清除之间的痕迹
    Context.clearRect(x - 2, y - 2, 25, 25)
}

var end = false;

function gameover() {
    if (x >= a && y >= b) {
        end = true;
    }
}

function show() {
    if (end == true) {
        // stop();
        aa = aa + 2;
        if (aa == 20) {
            rangeinsert();
            stop();
        } else {
            end = false;
            Context.clearRect(0, 0, 600, 600);

            for (var i = 0; i < aa; i++) {
                tree[i] = [];
                for (var j = 0; j < aa; j++) {
                    tree[i][j] = -1;//初始值为0
                }
            }
            for (var i = 0; i < aa * aa; i++) {
                isling[i] = [];
                for (var j = 0; j < aa * aa; j++) {
                    isling[i][j] = -1;//初始值为0
                }
            }
            drawChessBoard();//绘制棋盘
            while (search(0) != search(aa * aa - 1))//主要思路
            {
                var num = parseInt(Math.random() * aa * aa);//产生一个小于196的随机数
                var neihbour = getnei(num);
                if (search(num) == search(neihbour)) {
                    continue;
                } else//不在一个上
                {
                    isling[num][neihbour] = 1;
                    isling[neihbour][num] = 1;
                    drawline(num, neihbour);//划线
                    union(num, neihbour);

                }
            }
            a = aa * 30 - 10, b = aa * 30 - 10;
            x = 20, y = 20;
            load();
            // start();
        }
        // alert("游戏成功！共用时："+str);
    }
}

var h = m = s = ms = 0;  //定义时，分，秒，毫秒并初始化为0；
var time = 0;
var i = 0;

function timer() {   //定义计时函数
    ms = ms + 50;         //毫秒
    if (ms >= 1000) {
        ms = 0;
        s = s + 1;         //秒
    }
    if (s >= 60) {
        s = 0;
        m = m + 1;        //分钟
    }
    if (m >= 60) {
        m = 0;
        h = h + 1;        //小时
    }
    str = toDub(h) + "时" + toDub(m) + "分" + toDub(s) + "秒" + toDubms(ms) + "毫秒";
    mytime = document.getElementById('mytime');
    mytime.innerHTML = str;
    // document.getElementById('mytime').innerHTML=h+"时"+m+"分"+s+"秒"+ms+"毫秒";
}

function reset() {  //重置
    i = 1;
    time = setInterval(timer, 50);
}

function start() {  //开始
    i = 1;
    time = setInterval(timer, 50);
}

function stop() {  //暂停
    i = 0;
    clearInterval(time);
}

function toDub(n) {  //补0操作
    if (n < 10) {
        return "0" + n;
    } else {
        return "" + n;
    }
}

function toDubms(n) {  //给毫秒补0操作
    if (n < 10) {
        return "00" + n;
    } else {
        return "0" + n;
    }

}

function renovates() {
    document.location.reload();
}

var req;//创建对象

function range() {

    var url = "";//ajax
    //创建一个XMLHttpRequest对象req
    if (window.XMLHttpRequest) {
        //IE7, Firefox, Opera支持
        req = new XMLHttpRequest();
    } else if (window.ActiveXObject) {
        //IE5,IE6支持
        req = new ActiveXObject("Microsoft.XMLHTTP");
    }
    req.open("GET", url, true);
    //onreadystatechange属性存有处理服务器响应的函数,有5个取值分别代表不同状态
    req.onreadystatechange = callback;
    //send函数发送请求
    req.send(null);
}

function rangeinsert() {

    var url = "insertrange?id=" + (m * 60 + s);
    //创建一个XMLHttpRequest对象req
    if (window.XMLHttpRequest) {
        //IE7, Firefox, Opera支持
        req = new XMLHttpRequest();
    } else if (window.ActiveXObject) {
        //IE5,IE6支持
        req = new ActiveXObject("Microsoft.XMLHTTP");
    }
    req.open("GET", url, true);
    //onreadystatechange属性存有处理服务器响应的函数,有5个取值分别代表不同状态
    req.onreadystatechange = callback;
    //send函数发送请求
    req.send(null);
}

function callback() {
    if (req.readyState == 4 && req.status == 200) {
        var check = req.responseText;
        alert(check);
    }
}
