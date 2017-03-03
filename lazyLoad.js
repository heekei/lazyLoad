/**
 * @name lazyLoad 图片懒加载
 * @version 1.1.0
 * @author Heekei <heekei@foxmail.com>
 * @site http://www.heekei.cn
 * 
 */
'use strict';
(function (window, undefined) {
    var lazyLoad = {
        scrollDelay: 100 //滚动节流间隔
        , watch: function (doms) {
            doms.forEach(function (element, index) {
                if (lazyLoad.eleInView(element)) {
                    element.src = element.getAttribute("data-src");//显示图片
                    doms.splice(index, 1);
                }
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
            }, lazyLoad.scrollDelay);
            lazyLoad.watch(lazyLoad.arrImgs);
        }
        window.addEventListener("scroll", scrollThrottle, false);
        window.lazyLoad = lazyLoad;
    }, false);
})(window)


