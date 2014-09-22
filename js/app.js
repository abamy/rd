$(document).ready(function () {


    var addEvent = function addEvent(element, eventName, func) {
        if (element.addEventListener) {
            return element.addEventListener(eventName, func, false);
        } else if (element.attachEvent) {
            return element.attachEvent("on" + eventName, func);
        }
    };

    addEvent(document.getElementById('open-left'), 'click', function () {
        if (snapper.state().state == "left") {
            snapper.close();
        } else {
            snapper.open('left');
        }
    });


    /* Prevent Safari opening links when viewing as a Mobile App */
    (function (a, b, c) {
        if (c in b && b[c]) {
            var d, e = a.location,
                f = /^(a|html)$/i;
            a.addEventListener("click", function (a) {
                d = a.target;
                while (!f.test(d.nodeName)) d = d.parentNode;
                "href" in d && (d.href.indexOf("http") || ~d.href.indexOf(e.host)) && (a.preventDefault(), e.href = d.href)
            }, !1)
        }
    })(document, window.navigator, "standalone");


    jQuery.fn.resizeImg = function (selector) {
        $(selector).each(function () {

            var ratio = 16 / 9;

            var imgwidth = $(this).width();
            var imgheight = $(this).height();

            var width = (window.innerWidth);
            var height = (window.innerHeight);
            var currentRatio = width / height;
            var fixWidth = (width - imgwidth) * 0.5;
            var fixHeight = (height - imgheight) * 0.5;

            if (currentRatio < ratio) {
                $(this).css({
                    "height": "100%",
                    "width": "auto",
                    "margin-left": fixWidth + "px",
                    "margin-top": "0px"
                });

            } else {
                $(this).css({
                    "height": "auto",
                    "width": "100%",
                    "margin-top": fixHeight + "px",
                    "margin-left": "0px"
                });

            }
        });
    }

    var $currentFlexslider = $(".container .flexslider.actif");
    if (!$currentFlexslider.prev().length) {
        $('#scrollup-ico').css({
            "display": "none"
        });
    }
    if (!$currentFlexslider.next().length) {
        $('#scrolldown-ico').css({
            "display": "none"
        });
    }

    $(window).load(function () {
        $('.flexslider .slides img').each(function () {
            var imgwidth = $(this).width();
            var imgheight = $(this).height();

            if (imgwidth > imgheight) {
                $(this).css({
                    "height": "100%",
                    "width": "auto"
                });
            } else {
                $(this).css({
                    "width": "100%",
                    "height": "auto"
                });
            }

            $().resizeImg('.flexslider .slides img');

        });
    });

    $(window).resize(function () {
        $().resizeImg('.flexslider .slides img');
    });


    $("#content").on("click", "#scrolldown a", function (e) {
        e.preventDefault();
        var $currentFlexslider = $(".container .flexslider.actif");
        var $index = $currentFlexslider.index() + 1;
        if ($currentFlexslider.next().length) {
            $('.container .flexslider:lt(' + $index + ')').addClass("up");
            $('.container .flexslider:gt(' + $index + ')').addClass("down");
            $currentFlexslider.removeClass("actif");
            $currentFlexslider.next().removeClass("down").removeClass("up").addClass("actif");
            $('#scrollup-ico').css({
                "display": "inline-block"
            });
            if (!$currentFlexslider.next().next().length) {
                $('#scrolldown-ico').css({
                    "display": "none"
                });
            }
        }
    });
    $("#content").on("click", "#scrollup a", function (e) {
        e.preventDefault();
        var $currentFlexslider = $(".container .flexslider.actif");
        var $index = $currentFlexslider.index() - 1;
        if ($currentFlexslider.prev().length) {
            $('.container .flexslider:lt(' + $index + ')').addClass("up");
            $('.container .flexslider:gt(' + $index + ')').addClass("down");
            $currentFlexslider.removeClass("actif");
            $currentFlexslider.prev().removeClass("down").removeClass("up").addClass("actif");
            $('#scrolldown-ico').css({
                "display": "inline-block"
            });
            if (!$currentFlexslider.prev().prev().length) {
                $('#scrollup-ico').css({
                    "display": "none"
                });
            }
        }
    });

    // SWIPE SMARTPHONES
    $(function () {
        $(".flexslider").swipe({
            swipeDown: function () {
                $('#scrollup-ico').click();
            },
            swipeUp: function () {
                $('#scrolldown-ico').click();
            },
            threshold: 0,
            fingers: 'all'
        });
    });

    // KEYBOARD SHORTCUTS
    $(document).keydown(function (e) {
        var code = e.keyCode ? e.keyCode : e.charCode;
        switch (code) {

            case 37:
                $('.flex-prev').click();
                break;

            case 38:
                $('#scrollup-ico').click();
                break;

            case 39:
                $('.flex-next').click();
                break;

            case 40:
                $('#scrolldown-ico').click();
                break;
        }

    });

    $("body.projects").on("click", ".submenu li", function (e) {
        e.preventDefault();
        var $index = $(this).index();

        $('.container .flexslider:eq(' + $index + ')').removeClass("down").removeClass("up").addClass("actif");
        $('.container .flexslider:gt(' + $index + ')').removeClass("actif").removeClass("up").addClass("down");
        $('.container .flexslider:lt(' + $index + ')').removeClass("actif").removeClass("down").addClass("up");

        if ($(this).next().length) {
            $('#scrolldown-ico').css({
                "display": "inline-block"
            });
        } else {
            $('#scrolldown-ico').css({
                "display": "none"
            });
        }

        if ($(this).prev().length) {
            $('#scrollup-ico').css({
                "display": "inline-block"
            });
        } else {
            $('#scrollup-ico').css({
                "display": "none"
            });
        }
    });

    $("body").on("mouseenter",function () {
        $("#toolbar").removeClass("ease-tb-up");
        $("#scrollup-ico").removeClass("ease-up");
        $("#scrolldown-ico").removeClass("ease-down");

    }).on("mouseleave", function () {
            $("#toolbar").addClass("ease-tb-up");
            $("#scrollup-ico").addClass("ease-up");
            $("#scrolldown-ico").addClass("ease-down");
        });

    $.idleTimer(2000);

    $(document).bind("idle.idleTimer", function(){
        $("#toolbar").addClass("ease-tb-up");
        $("#scrollup-ico").addClass("ease-up");
        $("#scrolldown-ico").addClass("ease-down");
    });

    $(document).bind("active.idleTimer", function(){
        $("#toolbar").removeClass("ease-tb-up");
        $("#scrollup-ico").removeClass("ease-up");
        $("#scrolldown-ico").removeClass("ease-down");
    });

});
