(function (window, undefined) {
    document.addEventListener('DOMContentLoaded', function () {
        var lazyLoad = {};
        lazyLoad.imgs = document.getElementsByTagName("img");
        lazyLoad.arrLoaded = [];
        lazyLoad.arrImgs = [];
        for (var len = 0; len < lazyLoad.imgs.length; len++) {
            lazyLoad.arrImgs.push(lazyLoad.imgs[len]);
        }
        lazyLoad.watch = function (doms) {
            var tmp = doms;
            var arrLoadedID = [];
            for (var x in tmp) {
                if (isVisible(tmp[x])) {
                    console.log(tmp);
                    tmp[x].src = tmp[x].getAttribute("data-src");//显示图片
                    arrLoadedID.push(x);//记录已加载的id
                    lazyLoad.arrLoaded.push(tmp[x]);//添加进已加载数组
                    console.log(lazyLoad.arrImgs);
                }
            }
            //从arrImgs中清除已加载的图片
            for (var i = 0; i < arrLoadedID.length; i++) {
                lazyLoad.arrImgs.splice(arrLoadedID[i], 1)
            }

        }
        lazyLoad.watch(lazyLoad.arrImgs);
        // window.onscroll 稀释
        var cb = {
            onscroll: function () {
                lazyLoad.watch(lazyLoad.arrImgs);
                window.removeEventListener("scroll", cb.onscroll, false);
                setTimeout(function () {
                    console.log("done");
                    window.addEventListener("scroll", cb.onscroll, false);
                }, 300);
            }
        };
        window.addEventListener("scroll", cb.onscroll, false);

        function isVisible(node) {
            var SCROLLTOP = document.body.scrollTop;
            var CLIENTHEIGHT = window.innerHeight//document.documentElement.clientHeight;
            if (node.offsetTop < (SCROLLTOP + CLIENTHEIGHT) && (node.offsetTop + node.clientHeight) > SCROLLTOP) {
                return true;
            }
            else {
                return false;
            }
        }
        window.lazyLoad = lazyLoad;
    }, false);
})(window)


