两周：

1. **贪食蛇游戏(公演)**
2. **扫雷游戏 智力游戏(公演) 扩散算法，闭包，事件委托**

3. **打方块游戏**

突破瓶颈，写代码快，前期思考慢

网络传输：输入框的下拉菜单提示功能，通过接口操作百度后台，写一个百度搜索



jq选项卡

```html
<div class="wrapper">
  <div class="btn">
    <button class="active">1</button>
    <button>2</button>
    <button>3</button>
  </div>
  <div class="content">
    <div class="c-active">111</div>
    <div>222</div>
    <div>333</div>
  </div>
</div>
<script src="jquery-3.2.1.js"></script>
<script>
  $('button').click(function() {
    $('.active').removeClass('active');
    $(this).addClass('active');
    $('.c-active').removeClass('c-active');
    var index = $(this).index();
    $('.content div').eq(index).addClass('c-active');
  })
</script>
```



古诗词

```html
<style>
  .box {
    margin: 50px auto;
    /* width: 500px; */
    writing-mode: vertical-rl;
  }

  .box span {
    opacity: 0;
    transition: opacity 0.5s;
  }
</style>
<div class="box"></div>
<script>
  var arr = ["关关雎鸠，", "在河之洲。", "窈窕淑女，", "君子好逑。"];
  var box = document.querySelector(".box");
  var oSpanArr = [];
  arr.forEach(function (item) {
    var oP = document.createElement("p");
    for (var i = 0; i < item.length; i++) {
      var oSpan = document.createElement("span");
      oSpan.innerText = item[i];
      oSpanArr.push(oSpan);
      oP.appendChild(oSpan);
    }
    box.appendChild(oP);
  });
  setTimeout(function () {
    oSpanArr.forEach(function (item, index) {
      item.style.transitionDelay = index * 0.5 + "s";
      item.style.opacity = 1;
    });
  }, 500);
</script>
```

loading

```html
<div class="wrapper">
  <div class="bounce">
    <div class="circle"></div>
    <div class="circle"></div>
    <div class="circle"></div>
  </div>
  <div class="text">loading...</div>
</div>
<style>
  .wrapper {
    width: 100px;
    height: 100px;
    background-color: rgba(0, 0, 0, 0.5);
    border-radius: 10px;
    margin: 200px auto;
    color: #fff;
    text-align: center;
  }

  .bounce {
    padding: 20px 0 10px 0;
  }

  .circle {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background-color: #fff;
    display: inline-block;
    /* 
    bounceLoading: 代表的是动画的关键帧名称
    1.4s：  动画执行时间
    infiniite: 动画执行次数 为无穷从
    */
    animation: bounceLoading 2.4s infinite;
  }

  /*  0.32s这个状态开始动画  动画到1.4s */
  .circle:nth-child(1) {
    animation-delay: -0.32s;
  }

  /*  0.16s这个状态开始动画 动画到 1.4s */
  .circle:nth-child(2) {
    animation-delay: -0.16s;
  }

  @keyframes bounceLoading {

    /* 0% ---> 100% */
    0% {
      transform: scale(0);
    }

    /* 0.48s 的时候的状态 */
    40% {
      transform: scale(1);
    }

    80% {
      transform: scale(0);
    }

    100% {
      transform: scale(0);
    }
  }

  /* 
  css3中的动画属性： transition, animation
  transition: 过渡动画  50px --> 100px   只有检测到属性变化  该属性才会有过度的效果
  animation: 关键帧动画  要有关键帧
  */
</style>
```

目录结构

```html
<style>
  div {
    margin-left: 10px;
  }
  .tree {
    cursor: pointer;
    position: relative;
  }
  .tree > div > .tree{
    display: none;
  }
  .tree.next::before {
    content: '+';
    position: absolute;
    left: -14px;
  }
  .tree.next.show > div > .tree {
    display: block;
  }
  .tree.next.show::before {
    content: '-';
  }
</style>
<div id="demo"></div>
<script>
  var data = [{
    name: 'node1',
    children: [{
      name: 'node1-1',
      children: []
    }, {
      name: 'node1-2',
      children: [{
        name: 'node1-2-1',
        children: [{
          name: 'node1-2-1-1'
        }]
      }, {
        name: 'node1-2-2'
      }]
    }]
  }, {
    name: 'node2',
    children: [{
      name: 'node2-1',
      children: []
    }, {
      name: 'node2-2',
      children: [{
        name: 'node2-2-1',
        children: []
      }]
    }]
  }, {
    name: 'node3',
    children: [{
      name: 'node3-1',
      children: []
    }, {
      name: 'node3-2',
      children: [{
        name: 'node3-2-1',
        children: [{
          name: 'node3-2-1-1'
        }]
      }, {
        name: 'node3-2-2'
      }]
    }]
  }, {
    name: 'node4',
    children: [{
      name: 'node4-1',
      children: []
    }, {
      name: 'node4-2',
      children: [{
        name: 'node4-2-1',
        children: []
      }]
    }]
  }];

  // 用来创建目录树  参数是目录树的数据
  // 返回一个目录树的dom节点
  function dTree(data) {
    // 最终返回一个dom节点
    var resultDom = document.createElement('div');
    // 遍历最外层目录并且渲染
    data.forEach(function (item, index) {
      // 创建当前目录的dom节点
      var dom = document.createElement('div');
      dom.className = 'tree';
      // 为当前的目录节点添加名称
      dom.innerText = item.name;
      // 给当前dom节点添加点击事件
      dom.onclick = function (e) {
        e.stopPropagation();
        // 用indexOf来判断当前class里面是否含有show类名
        // [].slice.call()  类数组转化成数组的方法   Javascript  类数组
        var isShow = [].slice.call(this.classList, 0).indexOf('show') > -1;
        // 如果已经显示了 就将show类名移除
        if (isShow) {
          this.classList.remove('show');
        } else {
          this.classList.add('show');
        }
      }
      // 判断是否存在子节点 如果存在子节点 则再次创建
      if (item.children && item.children.length) {
        dom.classList.add('next');
        // 创建子节点
        var node = dTree(item.children);
        // 将子节点插入到当前目录节点下面
        dom.appendChild(node);
      }
      // 当前木目录节点插入到其父节点（最后返回的最外层节点）中
      resultDom.appendChild(dom);
    })
    return resultDom;
  }
  var node = dTree(data);
  demo.appendChild(node);


</script>
```



Border-radius

```html
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Document</title>
        <style>
            * {
                margin: 0;
                padding: 0;
            }
            #demo {
                width: 200px;
                height: 200px;
                background: #fac;
                transition: all .3s;
            }
            .wrapper {
                width: 800px;
                display: flex;
                margin-left:  50px;
            }
            .left {
                width: 400px;
                height: 400px;
                box-sizing: border-box;
                cursor: pointer;
                user-select: none;
            }
            .right {
                width: 400px;
                height: 400px;
                display: flex;
                justify-content: center;
                align-items: center;
            }
            .item {
                height: 80px;
                line-height: 80px;
                box-sizing: border-box;
                width: 100%;
                border: 4px solid transparent;
                padding: 0 20px;
            }
            .active {
                border: 4px solid #aaa;
            }
        </style>
    </head>
    <body>
        <div class="wrapper">
            <div class="left " id="left">
                <div class="item active">200px</div>
                <div class="item">25% 10%</div>
                <div class="item">10% 30% 50% 70%</div>
                <div class="item">10px 100px / 120px</div>
                <div class="item">70% 30% 30% 70% / 60% 40% 60% 40%</div>
            </div>
            <div class="right">
                <div id="demo"></div>
            </div>
        </div>
        <script>
            var left = document.getElementById('left');
            var active = document.getElementsByClassName('active')[0];
            var demo = document.getElementById('demo');

            left.onclick = function (e) {
                var dom = e.target;
                demo.style.borderRadius = dom.innerText;
                active.className="item";
                active = dom;
                active.className = 'item active';
            }
        </script>
    </body>
</html>
```

多栏布局，双飞翼布局，圣杯布局

```HTML
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Document</title>
        <style>
            * {
                margin: 0;
                padding: 0;
            }
            .header, .footer {
                height: 100px;
                background: #fac;
            }
            .main {
                height: 100px;
                background: #cfa;
                width: 100%;
            }
            .left {
                width: 200px;
                height: 100px;
                background: #caf;
                margin-left: -100%;
                position: relative;
                left: -200px;
            }
            .right {
                width: 100px;
                height: 100px;
                background: #afc;
                margin-left: -100px;
                position: relative;
                right: -100px;
            }
            /* 浮动 */
            .content > div {
                float: left;
            }
            .clear-float::after {
                content: '';
                display: block;
                clear: both;
            }
            /* 圣杯布局的核心思想 */
            /* a 父级元素利用padding预留位置 */
            .content {
                padding: 0 100px 0 200px;
            }
            /* 利用定位放到对应位置上面去 */
        </style>
    </head>
    <body>
        <!-- 同学，你了解圣杯布局和双飞翼布局嘛 -->
        <!-- 核心：三栏布局 -->
        <!-- 左右固定，中间自适应 -->
        <!-- left: 200 中间自适应 right: 100 -->

        <div class="header">HEAD</div>
        <div class="content clear-float">
            <div class="main">MAIN</div>
            <div class="left">LEFT</div>
            <div class="right">RIGHT</div>
        </div>
        <div class="footer">FOOT</div>
    </body>
</html>
```

圣杯布局

```HTML
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Document</title>
        <style>
            .header, .footer {
                height: 100px;
                background: #fac;
            }
            .main {
                height: 100px;
                width: 100%;
                background: #cfa;
            }
            .left {
                width: 200px;
                height: 100px;
                background: #fca;
                margin-left: -100%;
                position: relative;
                left: -200px;
            }
            .right {
                width: 100px;
                height: 100px;
                background: #acf;
                margin-left: -100px;
                position: relative;
                right: -100px;
            }
            .content > div {
                float: left;
            }
            .content {
                padding: 0 100px 0 200px;
            }
            .clear-float::after {
                display: block;
                content: '';
                clear: both;
            }
        </style>
    </head>
    <body>
        <!-- 
圣杯布局核心思想：
1. 父级元素利用padding预留位置
2. 子元素利用相对定位进行位置调整
-->

        <div class="header">Header</div>
        <div class="content clear-float">
            <div class="main">main</div>
            <div class="left">left</div>
            <div class="right">right</div>
        </div>
        <div class="footer">Footer</div>


    </body>
</html>
```

三栏布局

```HTML
<!DOCTYPE html>
<html lang="en">

    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Document</title>
        <style>
            .header,
            .footer {
                height: 100px;
                background: #fac;
            }

            .main {
                height: 100px;
                width: 100%;
                background: #cfa;
            }

            .left {
                width: 200px;
                height: 100px;
                background: #fca;
                margin-left: -100%;
            }

            .right {
                width: 100px;
                height: 100px;
                background: #acf;
                margin-left: -100px;
            }

            .content>div {
                float: left;
            }

            .clear-float::after {
                display: block;
                content: '';
                clear: both;
            }
        </style>
    </head>

    <body>
        <!-- 圣杯布局与双飞翼布局 -->
        <!--  -->

        <!-- 需求： 左边200像素, 中间自适应, 右边100像素 -->

        <div class="header">Header</div>
        <div class="content clear-float">
            <div class="main">main</div>
            <div class="left">left</div>
            <div class="right">right</div>
        </div>
        <div class="footer">Footer</div>


    </body>

</html>
```



预编译

```JS
// 先来一道笔试题 (百度)
function fn(func) {
    console.log(func); // function func() {}
    var func = 100;
    function func() {
        console.log(func);
    }
    console.log(func); // 100
}
fn(1);
// 形参，形式参数，实参，实际参数
/*
         key: value
         // GO: Global Obejct
         // Active Object
         AO = {
            // func: function func() {}
            func: 100
         }

        */
// 答案： function func () {}, 100
```



```JS
// 再来一题：
var a = 1;
function test() {
    a += 1;
    // a = a + 1
}
test(); 
console.log(a); // 1 + 3 = 4
function test() {
    a += 3;
    // a = a + 3
}
test(); 
console.log(a);  // 4 + 3 = 7
/*
       GO = {
           a: 1
           test: function() {a += 3}
           AO(test) {

           } 
       }

    */
```

```HTML
HTML+CSS面试题	
1、兼容的问题
2、html和css布局上的问题

面试题一：

A：一个200*200的盒子，如何水平垂直居中
S：一个盒子，不给宽度不给高度，如何水平垂直居中

1. 弹性盒
2. 
position: absolute;
left:50%;
top:50%;
transform: translate(-50%,-50%);

面试题二：

1. input在pc端显示没问题，但是移动端，要弹起键盘，并且右下角有搜索该怎么做

解决：<form action="">
    <input type="search">
</form>

面试题三：

1. ios的键盘首字母默认大写怎么取消

解决：<input type="text" autocapitalize='off'>

面试题四：

1. input如何显示纯数字的键盘（输入手机号）

面试题五：

跨平台或者浏览器的表现一致性怎么解决？

解决：normalize.css

面试题六：

html5和css3，在很垃圾的浏览器不兼容怎么办？


html5兼容解决：
<!--[if lte IE 8]>
<script src="https://cdn.bootcss.com/html5shiv/r29/html5shiv.js"></script>
<![endif]-->
css3不兼容
ie-css3.js
```

利用递归的方式生成4个不重复的1~32之间的随机整数

 a. 整数（parseInt, Math.ceil, Math.floor, Math.round）

​    b. 1~32之间的随机数。(1~32之间的概率得相等啊)

​    c. 4个

​    d. 不重复

​    e. 递归

```JS
// 随机数 Math.random();

// console.log(Math.random());
// 区间 0到1之间的随机数。 能取到0，无法取到1
// [0, 1) 能取到唯一的整数是0，剩下的全是小数。

// 扩展1
// 产生 0~10 之间的随机数[0, 10) 区间支持乘法
Math.random() * 10 // [0, 10)
// 扩展2
// 产生 5~6之间的随机数[5, 6)
Math.random() + 5; // [5, 6) 区间支持加法

// 扩展3 
// 产生 7~12之间的随机数[7, 10) 杂交
// [7, 12)
// [0, 5) + 7;
// [0, 1) * 5 + 7
//  console.log(Math.random()*5 + 7)
```

Test: 产生-1到1之间的随机数。

parseInt 取整数，直接取整数位

```JS
console.log(parseInt(0.001));
console.log(parseInt(Math.random())); // 0
```

Math.ceil

```JS
console.log(Math.ceil(0));
console.log(Math.ceil(0.00001));
console.log(Math.ceil(0.9999));
console.log(Math.ceil(0.5));

Math.ceil 向上取整 大于等于自己的最小整数
console.log(Math.ceil(Math.random()));
极小概率是0， 非常非常非常大的概率是1； 不稳定
```

Math.floor()

```JS
console.log(Math.floor(0));
console.log(Math.floor(0.99));
console.log(Math.floor(0.0001));
console.log(Math.floor(0.5));
向下取整，小于等于自己的最大整数。
console.log(Math.floor(Math.random())); // 0 稳定 等价于 parseInt

Math.floor(Math.random()*32+1) 结论3
```

 Math.round 

```JS
console.log(Math.round(0));
console.log(Math.round(0.99));
console.log(Math.round(0.0001));
console.log(Math.round(0.5));

// console.log(Math.round(Math.random()));
// 稳定，0和1的概率相同
// [0, 0.5) + 0.5 = [0.5, 1)

// Math.round(Math.random()*10); // 不稳定
// [0, 0.5) => 0 0.5
// [0.5, 1.5) => 1 1
// [1.5, 2.5) => 2 1
// ....
// [9.5, 10) => 10 0.5
```



生成四个不重复

```JS
var arr = [];// 生成四个不重复for (var i = 0; arr.length < 4; i++) {    var n = Math.floor(Math.random() * 32 + 1);    if (arr.indexOf(n) !== -1) {        continue    }    arr.push(n);}console.log(arr);console.log(i);function getNum(arr) {    if (arr.length >= 4) {        return;    }    var n = Math.floor(Math.random() * 32 + 1);    if (arr.indexOf(n) == -1) {        arr.push(n);    }    getNum(arr);}var arr = [];getNum(arr);console.log(arr);
```

 CSS 计数 

计数游戏

```HTML
<!DOCTYPE html>
<html lang="en">

    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Document</title>
    </head>

    <body>
        <!--  -->
        <style>
            .wrapper {
                counter-reset: c1;
            }

            #bx:checked {
                counter-increment: c1 10;
            }

            #qlz:checked {
                counter-increment: c1 8;
            }

            #lgb:checked {
                counter-increment: c1 6;
            }

            span::before {
                content: counter(c1);
            }
        </style>
        <div class="wrapper">
            <input type="checkbox" id="bx" name="ice"> <label for="bx">八喜 ￥10</label>
            <input type="checkbox" id="qlz" name="ice"> <label for="qlz">巧乐兹 ￥8</label>
            <input type="checkbox" id="lgb" name="ice"> <label for="lgb">老冰棍 ￥6</label>
            <p>总共要￥ <span></span> 元</p>
        </div>

    </body>

</html>
```

input

属性

type: 

​    html4:

​    text 文本

​    password 密码

​    radio 单选

​    checkbox 多选

​    button 按钮

​    image 图片按钮

https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/input

爱心demo

```HTML
<!DOCTYPE html>
<html lang="en">

    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>爱心</title>
        <style>
            .heart {
                width: 200px;
                height: 200px;
                background-color: pink;
                margin: 100px auto;
                position: relative;
                transform: rotate(-45deg);
                animation: peng 0.8s infinite alternate;
            }

            @keyframes peng {
                0% {
                    transform: rotate(-45deg) scale(0.5);
                }

                100% {
                    transform: rotate(-45deg) scale(1);
                }
            }

            .heart::after,
            .heart::before {
                content: "";
                display: block;
                width: 100%;
                height: 100%;
                background-color: pink;
                border-radius: 50%;
                position: absolute;
            }

            .heart::before {
                top: -50%;
                left: 0;
            }

            .heart::after {
                right: -50%;
                top: 0;
            }
        </style>
    </head>

    <body>
        <div class="heart">

        </div>
    </body>

</html>
```

引用值转换成原始值。

   toString

   valueOf

   先调用valueOf方法，再调用toString

   如果valueOf返回的结果不是原始值，会继续调用toString，

   如果valueOf， toString返回结果都是对象，则报错。

```JS
var obj = {
    toString() {
        console.log('toString');
        return 1;
    },
    valueOf() {
        console.log('valueOf');
        return {};
    }
}

console.log(obj == 1);
console.log(obj == 2);
```

加载demo

```HTML
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>animation动画</title>
        <style>
            body {
                background-color: black;
            }
            .demo {
                text-align: center;
                margin-top: 300px;
            }
            .circle {
                display: inline-block;
                width: 10px;
                height: 10px;
                border-radius: 50%;
                background-color: #fff;
                border: 1px solid #ddd;
                animation: loading 0.6s infinite alternate;
            }
            @keyframes loading {
                0% {
                    transform: scale(0);
                    background-color: coral;
                }
                100% {
                    transform: scale(1);
                    background-color: cornflowerblue;
                }
            }
            /* 作为第一个孩子的circle */
            .circle:nth-child(1) {
                animation-delay: -0.4s;
            }
            .circle:nth-child(2) {
                animation-delay: -0.2s;
            }
        </style>
    </head>
    <body>
        <div class="demo">
            <span class="circle"></span>
            <span class="circle"></span>
            <span class="circle"></span>
        </div>
    </body>
</html>
```

面试题

```JS
[1,2,3].map(parseInt)
```

高阶函数

1. 函数的参数是函数

2. 函数作为返回值。

```JS
回调函数
setTimeout(function () {
    // some code
}, 1000);
ES5
Array.prototype.forEach(), map, filter, some, every, reduce, reduceRight.
AOP（面向切片编程） OOP(面向对象编程)
面试题：如何在不修改函数主体的情况下，在函数执行前，执行某个函数。
```

