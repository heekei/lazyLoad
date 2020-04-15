/**
 * @name lazyLoad 图片懒加载
 * @version 1.2.3
 * @author Heekei <heekei@foxmail.com>
 */
'use strict';
(function () {
    var lazyLoad = {
        imgs: [],
        waitThrottle: 200,
        scrollDelay: 300 //滚动节流间隔
        , watch: function (doms) {
            for (var i = 0; i < doms.length; i++) {
                if (!doms[i]._isloaded && lazyLoad.eleInView(doms[i])) {
                    doms[i].src = doms[i].getAttribute("data-src");//显示图片
                    doms[i]._isloaded = true;
                }
            }
        }
        , eleInView: function (elem) {
            var bounding = elem.getBoundingClientRect();
            var h = (window.innerHeight || document.documentElement.clientHeight);
            var w = (window.innerWidth || document.documentElement.clientWidth);
            return (
                ((bounding.top >= 0 && bounding.top <= h) || (bounding.bottom >= 0 && bounding.bottom <= h)) &&
                ((bounding.left >= 0 && bounding.left <= w) || (bounding.right >= 0 && bounding.right <= w))
            );
        }
    };
    var timer = null;
    var scrollTimer = null;
    document.addEventListener('DOMContentLoaded', function () {
        lazyLoad.imgs = document.querySelectorAll('img[data-src]'); //document.getElementsByTagName("img");//HTMLCollection
        lazyLoad.watch(lazyLoad.imgs);
        function scrollThrottle() {
            window.removeEventListener("scroll", scrollThrottle, false);
            window.removeEventListener("resize", scrollThrottle, false);
            clearInterval(timer);
            clearInterval(scrollTimer);
            scrollTimer = setTimeout(function () {
                window.addEventListener("scroll", scrollThrottle, false);
                window.addEventListener("resize", scrollThrottle, false);
                timer = setTimeout(function () {
                    lazyLoad.watch(lazyLoad.imgs);
                }, lazyLoad.waitThrottle);
            }, lazyLoad.scrollDelay);
        }
        window.addEventListener("scroll", scrollThrottle, false);
        window.addEventListener("resize", scrollThrottle, false);
        // window.lazyLoad = lazyLoad;
    }, false);
})()
