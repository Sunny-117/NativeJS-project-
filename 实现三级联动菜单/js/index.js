/* 
一：tab切换处理
    1：DOM元素的查找，查找内容元素导航条集合，查找内容元素聚合
    2: 通过集合查找所有的导航按钮（事件的绑定）
    3：class类名的切换，通过类名切换实现导航条的正确显示
    4: 切换内容区域的显示隐藏   index
二：值的渲染
    1：初始化数据的渲染 定义渲染函数，参数，不同级别的渲染数组，渲染对象
    2：获取DOM对象，省市区内容元素，初始化数据数组的全局使用定义
    3：存储value值为当前渲染的元素的id值的操作,并且让这个渲染的元素显示
    4：渲染元素的点击事件操作处理（处理未来元素，给父元素进行事件的绑定）
    5：处理省级的点击事件（添加事件处理函数，通过事件冒泡的机制，实现事件代理）
    6：处理点击切换菜单操作（复用导航菜单的事件处理函数，找到需要切换的DOM元素）
    7：从新调用渲染函数（获取渲染函数需要的数组，定义数组的获取函数，通过ID进行查找），指定渲染函数的填充目标
    8：市级点击事件的绑定（事件冒泡机制，事件代理）
    
三：内容区域的渲染
    1：点击事件绑定进行内容文本框内容渲染 （省市区的内容绑定）
    2：优化处理操作，省市区点击的时候可进行请选择的操作
 */

(function () {
  // 1：
  var navItems = document.querySelectorAll(".nav-item");
  // 2:
  var contentList = document.querySelectorAll(".content");
  var provinceContent = document.querySelector("#provinceContent");
  var cityContent = document.querySelector("#cityContent");
  var areaContent = document.querySelector("#areaContent");
  var provinceList = cityData;
  var cityArr = [];
  var provinceTxt = document.querySelector("#provinceTxt");
  var cityTxt = document.querySelector("#cityTxt");
  var areaTxt = document.querySelector("#areaTxt");
  var init = function () {
    renderList(provinceContent, provinceList);
    initEvent();
  };

  /* 事件入口函数 */
  var initEvent = function () {
    // 2：导航集合事件绑定
    navItems.forEach(function (item, index) {
      item.addEventListener("click", onNavItemClick.bind(null, index));
    });
    provinceContent.addEventListener("click", onProvinceClick);
    cityContent.addEventListener("click", onCityContentClick);
    areaContent.addEventListener("click", onAreaContentClick);
  };

  /* 省级点击操作 */
  var onProvinceClick = function (e) {
    if (e.target.innerHTML !== provinceTxt.innerHTML) {
      cityTxt.innerHTML = "请选择城市";
      areaTxt.innerHTML = "请选择地区";
    }
    provinceTxt.innerHTML = e.target.innerHTML;

    onNavItemClick(1, { target: city });
    cityArr = getList(e.target.id, provinceList);
    renderList(cityContent, cityArr);
  };

  /* 市级点击事件 */
  var onCityContentClick = function (e) {
    if (e.target.innerHTML !== cityTxt.innerHTML) {
      areaTxt.innerHTML = "请选择地区";
    }
    var areaArr = getList(e.target.id, cityArr);
    cityTxt.innerHTML = e.target.innerHTML;
    onNavItemClick(2, { target: area });
    renderList(areaContent, areaArr);
  };

  var onAreaContentClick = function (e) {
    areaTxt.innerHTML = e.target.innerHTML;
  };

  /*获取当前渲染的数组 */
  var getList = function (id, arr) {
    var resArr = null;
    for (var i = 0; i < arr.length; i++) {
      if (arr[i].value === id) {
        resArr = arr[i].children;
        break;
      }
    }
    return resArr;
  };

  /* 导航条的点击事件 */
  onNavItemClick = function (index, e) {
    navItems.forEach(function (item) {
      item.className = "nav-item";
    });
    e.target.className = "nav-item active";
    contentList.forEach(function (item) {
      item.style.display = "none";
    });
    contentList[index].style.display = "block";
  };

  /* 渲染函数定义 */
  var renderList = function (node, lists) {
    const renderList = [];
    for (var i = 0; i < lists.length; i++) {
      renderList.push(
        ' <div id="' +
          lists[i].value +
          '" class="city-list">' +
          lists[i].text +
          "</div>"
      );
    }
    node.innerHTML = renderList.join("");
    node.style.display = "block";
  };

  init();
})();
