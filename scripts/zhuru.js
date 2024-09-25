// 向页面注入JS
function injectCustomJs(jsPath)
{
	//不是课程学习页面不注入
    if(!/studyPlace/g.test(window.location.href)){
        return
    }  
	jsPath = jsPath || 'js/inject.js';
	var temp = document.createElement('script');
	temp.setAttribute('type', 'text/javascript');
	// 获得的地址类似：chrome-extension://ihcokhadfjfchaeagdoclpnjdiokfakg/js/inject.js
	temp.src = chrome.runtime.getURL(jsPath);
	temp.onload = function()
	{
		// 放在页面不好看，执行完后移除掉
		this.parentNode.removeChild(this);
	};
	document.body.appendChild(temp);
}
injectCustomJs("js/inject.js")