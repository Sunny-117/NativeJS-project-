// 本节课中使用的是jQuery
// 没学过jQuery的同学 你也能听懂的，放心！

// window.onload= function(){}
// window.onload= function(){}
$(function () {
  // 入口函数 在文档结构加载完毕之后执行

  // 我们编写一个函数，这个函数的功能，就是调用之后，就能让指定的图片展示在轮播图前方
  // 这个函数接收一个索引号

  var $lis = $(".pic-list li");
  function active(index) {
    // 给index这个索引对应的元素加上 first-layer 类样式
    // 给index-1的元素 加上  second-layer-left
    // 给index+1的元素 加上  second-layer-right
    var prevIndex = index - 1;
    prevIndex = prevIndex < 0 ? $lis.length - 1 : prevIndex;
    var nextIndex = index + 1;
    nextIndex = nextIndex === $lis.length ? 0 : nextIndex;

    // console.log($lis);
    // 在给元素添加类样式的时候，注意，要把之前添加的类样式给干掉
    $($lis[index])
      .addClass("first-layer")
      .siblings()
      .removeClass("first-layer");
    $($lis[prevIndex])
      .addClass("second-layer-left")
      .siblings()
      .removeClass("second-layer-left");
    $($lis[nextIndex])
      .addClass("second-layer-right")
      .siblings()
      .removeClass("second-layer-right");
    // 还需要把指示器变红（当前索引对应的指示器）
    $(`.inspectors span:eq(${index})`)
      .addClass("active")
      .siblings()
      .removeClass("active");
    // 把背景图切换成 当前图片的图片
    $(".bg").css(
      "background-image",
      "url(" + $($lis[index]).find("img").prop("src") + ")"
    );
    // 把currentIndex换成当前图片的index
    currentIndex = index;
  }

  active(0);

  // 测试用的
  // window.active = active;

  // 实现点击指示器，切换轮播图
  $(".inspectors span").click(function () {
    // console.log(this);
    // 切换到当前span索引对应的轮播图

    // active(当前span的索引);

    active($(this).index());
  });

  // 实现图片自动轮播

  var currentIndex = 0;

  var timer = setInterval(function () {
    active(currentIndex);
    currentIndex++;
    // 下面这个代码能让 currentIndex 在0 - 6 之间一直跑
    currentIndex = currentIndex % $lis.length;
  }, 1000);

  $(".banner").mouseenter(function () {
    clearInterval(timer);
  });

  $(".banner").mouseleave(function () {
    clearInterval(timer);
    timer = setInterval(function () {
      active(currentIndex);
      currentIndex++;
      // 下面这个代码能让 currentIndex 在0 - 6 之间一直跑
      currentIndex = currentIndex % $lis.length;
    }, 1000);
  });
});
