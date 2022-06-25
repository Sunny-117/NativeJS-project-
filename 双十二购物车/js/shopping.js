
var selectData = {};	//用户已经选中的商品列表
function init() {
	selectData = JSON.parse(localStorage.getItem('shoppingCart'));

	createDom();

	addEvent();
}

init();


//给商品添加操作功能
function addEvent() {
	var trs = document.querySelectorAll('.product tr');
	for (var i = 0; i < trs.length; i++) {
		action(trs[i], i);
	}

	function action(tr, n) {
		var tds = tr.children,	//每一行里的单元格
			img = tds[0].children[0],	//每一行里的图片
			imgSrc = img.getAttribute('src'),	//图片的地址
			name = tds[1].children[0].innerHTML,	//标题
			colors = tds[1].children[1].children,	//颜色按钮
			price = parseFloat(tds[2].innerHTML),	//价格
			spans = tds[3].querySelectorAll('span'),	//加减按钮
			strong = tds[3].querySelector('strong'),	//数量
			joinBtn = tds[4].children[0],	//加入购物车按钮
			slectedNum = 0;	//选中商品的数量

		//颜色点击
		var last = null;	//上一个点击的颜色
		var colorValue = '';	//选中的颜色
		var colorId = '';	//选中颜色的id

		for (var i = 0; i < colors.length; i++) {
			colors[i].index = i;	//给每一个颜色添加一个索引值
			colors[i].onclick = function () {
				last && (last.className = '');
				this.className = 'active';

				colorValue = this.innerHTML;
				colorId = this.dataset.id;
				imgSrc = 'images/img_0' + (n + 1) + '-' + (this.index + 1) + '.png';

				img.src = imgSrc;

				last = this;
			}
		}

		//减
		spans[0].onclick = function () {
			slectedNum--;
			if (slectedNum < 0) {
				slectedNum = 0;
			}

			strong.innerHTML = slectedNum;
		};

		//加
		spans[1].onclick = function () {
			slectedNum++;
			strong.innerHTML = slectedNum;
		}

		//加入购物车
		joinBtn.onclick = function () {
			if (!colorValue) {
				alert('请选颜色');
				return;
			}

			if (!slectedNum) {
				alert('请选择商品数量');
				return;
			}

			selectData[colorId] = {
				"id": colorId,
				"name": name,
				"color": colorValue,
				"price": price,
				"num": slectedNum,
				"img": imgSrc,
				"time": new Date().getTime(),	//这个参数是用来排序的
			};

			localStorage.setItem('shoppingCart', JSON.stringify(selectData));	//本地存储

			//还原所有的选择
			img.src = 'images/img_0' + (n + 1) + '-1.png';
			last.className = '';
			strong.innerHTML = slectedNum = 0;

			createDom();

		}
	}
}

function createDom() {
	var tbody = document.querySelector('.selected tbody');
	var str = '';

	console.log(selectData);
	var goods = Object.values(selectData);	//把对象里的value拿出来拼成一个数组
	// console.log(goods);

	tbody.innerHTML = '';
	for (var i = 0; i < goods.length; i++) {
		str += `<tr>
			<td>
				<img src="${goods[i].img}" />
			</td>
			<td>
				<p>${goods[i].name}</p>
			</td>
			<td>${goods[i].color}</td>
			<td>${goods[i].price * goods[i].num}.00元</td>
			<td>x${goods[i].num}</td>
			<td><button data-id="${goods[i].id}">删除</button></td>
		</tr>`;

		/* str+='<tr>'+
			'<td>'+
				'<img src="'+goods[i].img+'" />'+
			</td>
			<td>
				<p>中筒皮毛一体雪地靴</p>
			</td>
			<td>红色</td>
			<td>359.00元</td>
			<td>x2</td>
			<td><button>删除</button></td>
		</tr>' */
	}

	tbody.innerHTML = str;

	del();
}

function del() {
	var btns = document.querySelectorAll('.selected tbody button');
	var tbody = document.querySelector('.selected tbody');

	for (var i = 0; i < btns.length; i++) {
		btns[i].onclick = function () {
			delete selectData[this.dataset.id];	//删除按钮那行对应的数据

			localStorage.setItem('shoppingCart', JSON.stringify(selectData));	//删除本地存储

			tbody.removeChild(this.parentNode.parentNode);	//删除DOM元素
		}
	}
}

window.addEventListener('storage', function () {	//当本地存储发生改变的时候就会触发这个事件，但是只能在别的页面触发
	// console.log('我在copy页面修改了，这个log会在index。html里打印出来');
	init();
});

