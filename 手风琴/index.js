/* 
  1、获取所有btn、btns
  2、遍历btns、设置一个属性：singleExpanded: 'true'
  3、初始状态下让所有的btn的singleExpanded:全部为'false'
  4、遍历btns，绑定点击事件：回调函数：toggleAccordion
  5、toggleAccordion中遍历所有btn设置为false
  6、获取当前点击的这个btn的singleExpanded，判断到底是true还是false
*/
var btns = document.querySelectorAll('.accordion .btn')
console.log(btns)
for(var i = 0; i < btns.length; i++) {
  btns[i].setAttribute('singleExpanded', 'false')
}
function toggleAccordion() {
  var btnToggle = this.getAttribute('singleExpanded')
  /* 除了点击的这个标签要变化，别的标签都应该是false */
  for(var i = 0; i < btns.length; i++) {
    btns[i].setAttribute('singleExpanded', 'false')
  }
  if(btnToggle == 'false') {
    this.setAttribute('singleExpanded', true)
  }
}

btns.forEach(function(item) {
  item.addEventListener('click', toggleAccordion)
})