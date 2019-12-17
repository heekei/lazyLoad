/**
 * @name lazyLoad 图片懒加载
 * @version 1.2.2
 * @author Heekei <heekei@foxmail.com>
 */
'use strict';
(function () {
    var lazyLoad = {
        imgs: [],
        arrImgs: [],
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
        , eleInView: function (elem) {
            var bounding = elem.getBoundingClientRect();
            return (
                bounding.top >= 0 &&
                bounding.left >= 0 &&
                bounding.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
                bounding.right <= (window.innerWidth || document.documentElement.clientWidth)
            );
        }/* function (el) {
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
                top <= (window.pageYOffset + window.innerHeight) &&
                left <= (window.pageXOffset + window.innerWidth) &&
                (top + height) >= window.pageYOffset &&
                (left + width) >= window.pageXOffset
            );
        } */
    };
    var timer = null;
    document.addEventListener('DOMContentLoaded', function () {
        lazyLoad.imgs = document.querySelectorAll('img[data-src]'); //document.getElementsByTagName("img");//HTMLCollection
        for (var len = 0; len < lazyLoad.imgs.length; len++) {
            lazyLoad.arrImgs.push(lazyLoad.imgs[len]);
        }
        lazyLoad.watch(lazyLoad.arrImgs);
        timer = setInterval(function () {
            lazyLoad.watch(lazyLoad.arrImgs);
        }, 500);
        function scrollThrottle() {
            window.removeEventListener("scroll", scrollThrottle, false);
            window.removeEventListener("resize", scrollThrottle, false);
            clearInterval(timer);
            setTimeout(function () {
                window.addEventListener("scroll", scrollThrottle, false);
                window.addEventListener("resize", scrollThrottle, false);
                lazyLoad.watch(lazyLoad.arrImgs);
                timer = setInterval(function () {
                    lazyLoad.watch(lazyLoad.arrImgs);
                }, 500);
            }, lazyLoad.scrollDelay);
        }
        window.addEventListener("scroll", scrollThrottle, false);
        window.addEventListener("resize", scrollThrottle, false);
        // window.lazyLoad = lazyLoad;
    }, false);
})()
