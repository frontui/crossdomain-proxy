# crossdomain-proxy
第三方iframe JS跨域代理

为了可以让父页面 `http://a.com/` 获取到iframe里面内容 `http://b.com` 的高度，我们往往需要创建一个`iframe`,访问地址需同父页面同域 `http://a.com/proxy.html` ，将内容 `自己系统页面` 的高度加在`iframe`的`src`属性地址的`hash`上,比如`http://a.com/proxy.html#height=2000`

## 本系统 b.com

配置第三方代理地址

```
window['proxyUrl'] = 'http://a.com/proxy.html';
```

引入创建iframe代理的js

```
<script src="http://b.com/static_file/thirdPart/js/iframeProxy.js"></script>
```

## 第三方系统 a.com

主域下有共用设置`iframe`高度的`函数`方法

比如:

```
function ajustHeight(height){
    var oIframe = d.getElementById('j-mainFrame');
    if(height){
        oIframe.style.height = height + 'px';
    } 
}
```

## 代理页 a.com/proxy.html

代理页是跟父级页面的父级同域，所以只需要调用主域下的设置iframe高度的方法。`parent.parent.fnSetHeight()`

```
function autoHeight(){
    // 当前页面地址 `http://a.com/proxy.html#height=2000`
	var hash = location.hash;
	// 获取height的值
	var height = hash.split('=')[1];
	// 调用主域全局设置高度函数
	parent.parent.ajustHeight(height);
}
// 页面加载完成执行
window.onload = function(){
	// 直接设置
	autoHeight();
	// 当父级页面内容有变动，修改了当前url时
	if('onhashchange' in window) {  // 标准浏览器，hash改变，立刻触发设置高度事件
		window.onhashchange = autoHeight;
	} else { // 兼容ie8-
		setInterval(autoHeight, 200);
	}
}
```