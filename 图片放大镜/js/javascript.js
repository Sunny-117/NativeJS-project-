window.onload = function () {
  // 获取元素
  var box = document.querySelector("#box");
  var img = document.querySelector(".img1");
  var mag = document.querySelector("#mag");
  var ap = document.querySelector("#ap");
  var ap_img = document.querySelector(".ap_img");

  // 定义倍数
  var index = 3;

  // 拿到原图的大小
  var imgW = img.offsetWidth;
  var imgH = img.offsetHeight;
  // console.log(imgW);

  // 放大图片的大小
  ap_img.width = imgW * index;
  ap_img.height = imgH * index;

  // 定义放大镜的大小
  mag.style.width = imgW / index + "px";
  mag.style.height = imgH / index + "px";

  // box的鼠标移入和鼠标移出
  // enter   leave         over   out
  box.onmouseenter = function () {
    mag.style.display = "block";
    ap.style.display = "block";
  };

  box.onmouseleave = function () {
    mag.style.display = "none";
    ap.style.display = "none";
  };

  // box的鼠标移动事件
  box.onmousemove = function (event) {
    var x =
      event.clientX - box.getBoundingClientRect().left - mag.offsetWidth / 2;
    var y =
      event.clientY - box.getBoundingClientRect().top - mag.offsetHeight / 2;

    // 判断四边
    // 左边
    if (x < 0) {
      x = 0;
    }
    // 上边
    if (y < 0) {
      y = 0;
    }
    // 右边
    if (x > box.offsetWidth - mag.offsetWidth) {
      x = box.offsetWidth - mag.offsetWidth;
    }
    // 下边
    if (y > box.offsetHeight - mag.offsetHeight) {
      y = box.offsetHeight - mag.offsetHeight;
    }

    // 设置放大镜的left和top
    mag.style.left = x + "px";
    mag.style.top = y + "px";

    // 定义放大图片的位置
    ap_img.style.left = -x * index + "px";
    ap_img.style.top = -y * index + "px";

    // 给放大区域绑定鼠标移入
    ap.onmouseenter = function () {
      this.style.display = "none";
    };
  };
};
