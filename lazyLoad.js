/**
 * @name lazyLoad 图片懒加载
 * @version 1.2.0
 * @author Heekei <heekei@foxmail.com>
 * @site http://www.heekei.cn
 * 
 */
'use strict';
(function (window, undefined) {
    var lazyLoad = {
        scrollDelay: 100 //滚动节流间隔
        , watch: function (doms) {
            doms = doms.filter(function (element, index) {
                if (!element._isloaded && lazyLoad.eleInView(element)) {
                    element.src = element.getAttribute("data-src");//显示图片
                    // doms.splice(index, 1);
                    element._isloaded = true;
                    return false;
                }
                return true;
            }, this);
        }
        , eleInView: function (el) {
            var top = el.offsetTop,
                left = el.offsetLeft,
                width = el.offsetWidth,
                height = el.offsetHeight;

            while (el.offsetParent) {
                el = el.offsetParent;
                top += el.offsetTop;
                left += el.offsetLeft;
            }

            return (
                top < (window.pageYOffset + window.innerHeight) &&
                left < (window.pageXOffset + window.innerWidth) &&
                (top + height) > window.pageYOffset &&
                (left + width) > window.pageXOffset
            );
        }
    };
    document.addEventListener('DOMContentLoaded', function () {
        lazyLoad.imgs = document.getElementsByTagName("img");//HTMLCollection
        lazyLoad.arrImgs = [];//
        for (var len = 0; len < lazyLoad.imgs.length; len++) {
            lazyLoad.arrImgs.push(lazyLoad.imgs[len]);
        }
        lazyLoad.watch(lazyLoad.arrImgs);

        // window.onscroll 节流
        function scrollThrottle() {
            window.removeEventListener("scroll", scrollThrottle, false);
            setTimeout(function () {
                window.addEventListener("scroll", scrollThrottle, false);
                lazyLoad.watch(lazyLoad.arrImgs);
            }, lazyLoad.scrollDelay);
            // lazyLoad.watch(lazyLoad.arrImgs);
        }
        window.addEventListener("scroll", scrollThrottle, false);
        window.lazyLoad = lazyLoad;
    }, false);
})(window)


