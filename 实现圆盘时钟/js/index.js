


(function () { //命名空间 Clock的部分
    var clock = document.getElementsByClassName('clock')[0];
    window.onload = function(){
        clock.classList.add('init');//给clock 添加名为“init”的类名；
        getMyClock();

        setInterval(function(){
            window.location.reload();
        },30000);
    }
    //时钟函数  

    
    function getMyClock() {

        var hours = document.getElementsByClassName('hours')[0],
            minute = document.getElementsByClassName('minute')[0],
            second = document.getElementsByClassName('second')[0];


        var date = new Date();//获取当前的时间对象
        var h = date.getHours();//获取当前时间的小时数 24小时 
        h = h > 12 ? (h - 12) : h;//改变成12小时
        var m = date.getMinutes();//获取当前时间的分钟数
        var s = date.getSeconds(); //获取当前时间的秒钟数
        console.log(h, m, s)


        // 小时-分钟--联动 
        // 30deg/360deg  =  x/m*6
        var x = (m * 6 * 30) / 360;
        // 时间转换成角度
        var sed_deg = s * 6;//秒的对应的度数
        var minute_deg = m * 6;
        var h_deg = h * 30 + x;

        //度数赋给div
        hours.style.transform = 'rotate(' + h_deg + 'deg)';
        minute.style.transform = 'rotate(' + minute_deg + 'deg)';
        second.style.transform = 'rotate(' + sed_deg + 'deg)';
    }







})()