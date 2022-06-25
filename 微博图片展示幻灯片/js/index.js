var bigImgWrap = document.querySelector('.bigImg');   //大图的父级
var bigImg = bigImgWrap.children[0];  //大图
var smallImg = document.querySelector('.smallImg');   //小图的父级
var ul = document.querySelector('.smallImg ul');
var lis = document.querySelectorAll('.smallImg li');
var btns = document.querySelectorAll('.btn');
var cursor = 'left';  //存储鼠标在图片上的方向

ul.style.width = lis[0].offsetWidth * lis.length + 'px';

//大图上鼠标的样式（鼠标移动的时候去判断鼠标在哪边）
bigImgWrap.onmousemove = function (ev) {
    if ((ev.clientX - this.offsetLeft) > this.offsetWidth / 2) {
        //这个条件成立，说明鼠标在盒子的右边
        this.style.cursor = 'url(images/pic_next.cur), auto';
        cursor = 'right';
    } else {
        this.style.cursor = 'url(images/pic_prev.cur), auto';
        cursor = 'left';
    }
}

var cn = 0;   //当前的索引值
var ln = 0;   //上一次选中的图片对应的索引值
var parentCenter = smallImg.getBoundingClientRect().left + smallImg.offsetWidth / 2;    //小图父级的中心点
var ulDis = smallImg.offsetWidth - ul.offsetWidth;  //ul标签能够走的最大距离，值为负数

/*
    getBoundingClientRect(),这个方法返回元素的盒模型信息
    {
        left:0,
        right:0,
        top:0,
        bottom:0,
        width:0,
        height:0
    }
 */

for (var i = 0; i < lis.length; i++) {
    lis[i].index = i; //把各自对应的索引值添加到自己的属性上
    lis[i].onclick = function () {
        cn = this.index;

        setPostion(this);
        change();

        /* this.className = 'active';
        lis[ln].className = '';

        bigImg.src = 'images/' + (cn + 1) + '.png';
        ln = cn; */
    }
}

function setPostion(li) {
    var liCenter = li.getBoundingClientRect().left + li.offsetWidth / 2;  //点击那个图片的中心点
    var ulTranslate = parseFloat(ul.style.transform.split('(')[1]); //ul已经走的距离
    var dis = ulTranslate + parentCenter - liCenter;  //图片要走到的位置


    if (dis > 0) {
        //这个条件成立说明ul要走的距离是正值，表示ul离左边要出现空白了
        dis = 0;
    }

    if (dis < ulDis) {
        //这个条件成立，说明ul要走的距离大于了ul能走的最大距离，右边要出空白了
        dis = ulDis;
    }

    ul.style.transform = 'translateX(' + dis + 'px)';
}

function change(){
    lis[ln].className = '';
    lis[cn].className = 'active';

    bigImg.style.opacity=0;

    //给定时器的原因是让定时器里面的代码在下一次执行
    setTimeout(function(){
        bigImg.src = 'images/' + (cn + 1) + '.png';
        bigImg.style.opacity=1;
    },150);

    ln = cn;
}

//左右箭头点击
bigImgWrap.onclick=function(){
    if(cursor=='left'){
        cn--;
        if(cn<0){
            cn=0;
        }
    }else{
        cn++;
        if(cn>lis.length-1){
            cn=lis.length-1;
        }
    }

    setPostion(lis[cn]);
    change();
}

//下面左右箭头点击
btns[0].onclick=function(){
    ul.style.transform='translateX(0px)';
}
btns[1].onclick=function(){
    ul.style.transform='translateX('+ulDis+'px)';
}