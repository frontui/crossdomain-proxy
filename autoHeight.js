/**!
 * iframe嵌套跨域 高度自适应
 * @author: tommyshao <jinhong.shao@frontpay.cn>
 * @copyright www.frontpay.cn
 * @date:   2015-06-18
 */
!(function(root, d, undefined){

    function getStyle( elem, attr ) {
        var oStyle = elem.currentStyle? elem.currentStyle : window.getComputedStyle(elem, null);
        return oStyle[attr];
    }

    function ajustHeight(height){
        var oIframe = d.getElementById('j-mainFrame');
        var winH = document.documentElement.clientHeight;
        if(height){
            // TODO: 定义iframe最小高度
            // iframe内容高度小于iframe框的高度时，框的最小高度应该为窗口高度
            // 如果有头部和底部，还应当减去头部和底部的高度 height = winH - objTopH
               // objTop = document.getElementById('top');
               // objMarginTop = parseInt(getStyle(objTop, 'marginTop'), 10);
               // objMarginBottom = parseInt(getStyle(objTop, 'marginBottom'), 10);
               // objMarginTop = isNaN(objMarginTop) ? 0 : objMarginTop;
               // objMarginBottom = isNaN(objMarginBottom) ? 0 : objMarginBottom;
               // objTopH = objTop.offsetHeight + objMarginTop + objMarginBottom;
            // height = height > winH ? height : winH;
            oIframe.style.height = height + 'px';
        } 
    }

    /* 加载完成调整 */
    root.onload = function(){ // 顶级父窗口页面
        var oIframe = d.getElementById('j-mainFrame');
        if(!!oIframe) {
            var docH = d.documentElement.clientHeight;
            var barH = d.getElementById('j-topbar').clientHeight;
            var clientH = oIframe.clientHeight;
            // 获取最高，因为可能proxy.html先执行
            var h = Math.max((docH - barH), clientH);
            ajustHeight(h)
        }        
    }

    
    root.ajustHeight  = ajustHeight;
})(window, document);