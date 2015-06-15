$(function(){
    $('.main2').find('div').clone().appendTo('.main2').clone().appendTo('.main2');

    var $slides = $('.main2'),
        $numberLi = $('#position2').find('li'),
        _width = $('.main2 .discount_groups_s').width(),
        timer,
        _animateSpeed = 600,
        _showSpeed = 3000,
        _stop = false;

    $numberLi.click(function(){
        var $this = $(this),
            _index = $numberLi.filter('.on').index();
        $this.addClass('on').siblings('.on').removeClass('on');
        clearTimeout(timer);
        if ( _index == 4 && $this.index() == 0 ) {
            $slides.stop().animate({
                left: _width * -5
            }, _animateSpeed, function(){
                $slides.css('left',0);
                if(!_stop) timer = setTimeout(move, _showSpeed);
            });
        } else if ( _index == 0 && $this.index() == 4 ) {
            $slides.stop().animate({
                left: _width
            }, _animateSpeed, function(){
                $slides.css('left',_width * -4);
                if(!_stop) timer = setTimeout(move, _showSpeed);
            });
        } else {
            $slides.stop().animate({
                left: _width * $this.index() * -1
            }, _animateSpeed, function(){
                if(!_stop) timer = setTimeout(move, _showSpeed);
            });
        };
        return false;
    }).eq(0).click();

    $('ul#position_control li').click(function(){
        var _index = $numberLi.filter('.on').index();
        $numberLi.eq((this.className.indexOf('next')>-1?_index+1:_index-1+$numberLi.length)%$numberLi.length).click();
 
        return false;
    });

    $slides.hover(function(){
        _stop = true;
        clearTimeout(timer);
    }, function(){
        _stop = false;
        timer = setTimeout(move, _showSpeed);
    });

    function move(){
        $('ul#position_control li.next').click();
    }

    $.fn.touchwipe = function(settings) {
        var config = {
            min_move_x: 20,
            min_move_y: 20,
            wipeLeft: function() { },
            wipeRight: function() { },
            wipeUp: function() { },
            wipeDown: function() { },
            preventDefaultEvents: true
        };
     
        if (settings) $.extend(config, settings);
 
        this.each(function() {
            var startX,
                startY,
                isMoving = false;

            function cancelTouch() {
                this.removeEventListener('touchmove', onTouchMove);
                startX = null;
                isMoving = false;
            }
         
            function onTouchMove(e) {
                if(config.preventDefaultEvents) {
                    e.preventDefault();
                }
                if(isMoving) {
                    var x = e.touches[0].pageX;
                    var y = e.touches[0].pageY;
                    var dx = startX - x;
                    var dy = startY - y;
                    if(Math.abs(dx) >= config.min_move_x) {
                        cancelTouch();
                        if(dx > 0) {
                            config.wipeLeft();
                        } else {
                        config.wipeRight();
                        }
                    } else if(Math.abs(dy) >= config.min_move_y) {
                        cancelTouch();
                        if(dy > 0) {
                            config.wipeDown();
                        } else {
                            config.wipeUp();
                        }
                    }
                }
            }

            function onTouchStart(e) {
                if (e.touches.length == 1) {
                    startX = e.touches[0].pageX;
                    startY = e.touches[0].pageY;
                    isMoving = true;
                    this.addEventListener('touchmove', onTouchMove, false);
                }
            }

            if ('ontouchstart' in document.documentElement) {
                this.addEventListener('touchstart', onTouchStart, false);
            }
        });

        return this;
    };

    $(".main2").touchwipe({
         wipeLeft: function() { $('ul#position_control li.next').click(); },
         wipeRight: function() { $('ul#position_control li.prev').click(); }
    });

    var _showTab = 0;
    var $defaultLi = $('ul.tabs li').eq(_showTab).addClass('active');
    $($defaultLi.find('a').attr('href')).siblings().hide();
    
    $('ul.tabs li').click(function() {
        var $this = $(this),
            _clickTab = $this.find('a').attr('href');
        $this.addClass('active').siblings('.active').removeClass('active');
        $(_clickTab).stop(false, true).fadeIn().siblings().hide();

        return false;
    }).find('a').focus(function(){
        this.blur();
    });

    $('.text_overflow').each(function(){
        var maxwidth = 30;
        if ( $(this).text().length > maxwidth ) {
            $(this).text($(this).text().substring(0,maxwidth));
            $(this).html($(this).html()+ '...');
        };
    });

    $('.ms_content_rl').css('height', $('#more_search').innerHeight() );

    var ms_no = 0;

    $('#ms_tab').click(function(){
        $('#more_search').css('display', 'block');
        ms_no = 1;
    });
    if ( ms_no = 1 ) {
        $('.ui-page').click(function(){
            $('#more_search').css('display', 'none');
            ms_no = 0;
        });
        $('.ms_content_rl').click(function(){
            $('#more_search').css('display', 'none');
            ms_no = 0;
        });
    };
    $('#pi_single').click(function(){
        $('ul.product_groups').removeClass('product_groups_c').addClass('product_groups_b');
        $('ul.product_groups').find('li').removeClass('w_150').addClass('w_310');
    });
    $('#pi_double').click(function(){
        $('ul.product_groups').removeClass('product_groups_b').addClass('product_groups_c');
        $('ul.product_groups').find('li').removeClass('w_310').addClass('w_150');
    });

    $('.text_overflow').each(function(){
        var maxwidth = 30;
        if ( $(this).text().length > maxwidth ) {
            $(this).text($(this).text().substring(0,maxwidth));
            $(this).html($(this).html()+ '...');
        };
    });
});

$(window).load(function() {
    $('.mainWrap_b').css("min-height", $(window).innerHeight() - $('.headerZone').innerHeight() - $('.copyright').innerHeight() - 12 );
});