"use strict";
$(function(){
    var init = {
        loadingProgress: function(){
            var hasLoader = $("body").find("#loader").length;
            if(hasLoader == 0){
                $("body").prepend("<div id='loader' class='loader'>\
                  <div class='loadingImg'><img width='100px' height='100px' src='images/loading.gif'></div>\
                    <div class='loadText'>Loading <span id='load-text'>0%</span></div>\
                    <div id='bar'><span></span></div>\
                </div>");
            }

            function getAllBgData(){
                var elementNames = ["div"];
                var allBackgroundURLs = [];

                elementNames.forEach(function(tagName) {
                    var tags = $(tagName);
                    var numTags = tags.length;

                    for (var i = 0; i < numTags; i++) {
                        if(tags[i].className != ''){
                            var target = $('.'+tags[i].className).css("background");
                            if(!!target && target.indexOf("url") > 0){
                                 var nowUrl = target.match(/\burl\s*\(\s*["']?([^"'\r\n\)\(]+)["']?\s*\)/gi);
                                 var bgUrl = nowUrl.toString().replace(/\(/,'').replace(/\)/,'').replace('\"', '').replace('\"', '').replace("url","").trim();
                                 allBackgroundURLs.push(bgUrl);
                            }
                        }
                    }
                });

                var images = $("img").length;

                for(var j = 0; j < images; j++){
                    var imgUrl = $("img")[j].src;
                    allBackgroundURLs.push(imgUrl);
                }

                var allPureImgData = $.unique(allBackgroundURLs);
                return allPureImgData;
            };

            var getAllData = getAllBgData();

            var now_percent = 0;
          	var displaying_percent= 0;

            if(getAllData.length != 0) {
                preload(getAllData, function(total, loaded){
                    now_percent = Math.ceil(100 * loaded / total);
                });
            }else{
                $('#loader').fadeOut('slow');
            }


            var timer = window.setInterval(function() {
          		if (displaying_percent >= 100) {
          			window.clearInterval(timer);
          			$('#loader').fadeOut('slow');
          		} else {
          			if (displaying_percent < now_percent) {
          				displaying_percent++;
          				$('#load-text').html(displaying_percent + '%');
          			}
          		}
          	},
          	20);

            Array.prototype.remove = function(element) {
              for (var i = 0; i < this.length; i++)
                if (this[i] == element) this.splice(i,1);
            };

            function preload(images, progress) {
              var total = images.length;
                $(images).each(function(key){
                    var src = this;
                    $("body").append("<img style='display: none;' class='loadImg"+key+"' src=''/>");

                    $('img.loadImg'+key).attr('src', src).load(function(){
                        images.remove(src);
                        progress(total, total - images.length);
                        $(this).remove();
                    });
                });
            }
        },
        //navs changes
        sideNavs: function(){

            var hashTag,
                hasHtml = window.location.pathname.split(".")[1]

            $(".sideNavs ul li").each(function(){
                var _navText = $(this).find("a").attr("href");

                if(hasHtml === "html"){
                    hashTag = window.location.pathname.split(".")[0];
                }else{
                    hashTag = window.location.pathname;
                }

                console.log(hashTag);
                if(hashTag === _navText){
                    $(this).addClass("active").siblings("li.active").removeClass("active");
                }
            });

        },
        parallaxScroll: function(winH){

            console.log(winH);

            var $window = $(window);		//Window object
            var scrollTime = 0.3;			//Scroll time
            var scrollDistance = 50;        //Distance. Use smaller value for shorter scroll and greater value for longer scroll
            $window.scrollTop(0);

            $window.on("mousewheel DOMMouseScroll", function(event){
                var target = $window;
                // var target = $(event.originalEvent.target).parents('.viewport')[0];
                //
                // if(!target) {
                //   target = $window;
                // } else {
                //   target = $(target);
                // }

                event.preventDefault();

        		var delta = event.originalEvent.wheelDelta/120 || -event.originalEvent.detail/3;
        		var scrollTop = target.scrollTop();
        		var finalScroll = scrollTop - parseInt(delta*scrollDistance);
        		TweenMax.to(target, scrollTime, {
    			    scrollTo : { y: finalScroll, autoKill:true },
    				ease: Power1.easeOut,
    				overwrite: 5
        		});
        	});

            var controller = $.superscrollorama({ playoutAnimations: false });
            var fallHook = $("#fallHook");
            var Alltimes = winH + 100;

            fallHook.css("height", Alltimes);


            var _jumpStartPos = 2.5;

            var _cloudStartPos = 3.5;

            // var _discStartPos = 3.5,
            //     _discEndPos = ((_fullH)+_halfH) + (_fullH*0.4);

            var _mGirlStartPos = 4,
                _mGirlEndPos = 3;

            var _McloudStartPos = 5,
                _McloudEndPos = 2;

            var _rGirlStartPos = 5.5,
                _rGirlEndPos = 4;

            var _rTextStartPos = 7.5,
                _rTextEndPos = 4.35;


            //effects
            var logoShow = TweenMax.fromTo($(".logo"), 1, {css:{opacity:'0'}}, {css:{opacity:'1'}});

            var jumpBoy = TweenMax.fromTo($(".jumpBoy"), 1, {css:{top: '220%' }}, {css:{top:'250%'}});
            var skyCloud = TweenMax.fromTo($(".skyCloud"), 1, {css:{top:'250%' }}, {css:{top:'200%'}});

            var mGirl = TweenMax.fromTo($(".mountainSence"), 1, {css:{top: '550%'}}, {css:{top:'340%'}});
            var mCloud = TweenMax.fromTo($(".mountainCloud"), 1, {css:{top: '600%'}}, {css:{top:'280%'}});

            var rGirl = TweenMax.fromTo($(".bg-4"), 1, {css:{top:'600%' }}, {css:{top:'455%'}});
            var rText = TweenMax.fromTo($(".run-text"), 1, {css:{ top:'600%' }}, {css:{top:'465%' }});

            // SETTINGS
            controller.addTween(fallHook, logoShow, Alltimes*0.3, Alltimes*0.3);

            controller.addTween(fallHook, jumpBoy, 800, Alltimes*0.3);
            controller.addTween(fallHook, skyCloud, 1000, Alltimes*0.3);

            // controller.addTween(fallHook, mGirl, Alltimes*1.1, (_fullH+_halfH));
            // controller.addTween(fallHook, mCloud, Alltimes*0.7, (_fullH+_fullH*0.1));
            controller.addTween(fallHook, mGirl, 900, Alltimes*0.4);
            controller.addTween(fallHook, mCloud, 1800, Alltimes*0.3);

            controller.addTween(fallHook, rGirl, 1000, Alltimes*0.5);
            controller.addTween(fallHook, rText, 900, Alltimes*0.65);


        },
        mailPop: function(){
            $("body").append("<div class='mask'></div>\
            <div class='mailPop'>\
              <div class='popContent'><iframe src=''></iframe></div>\
              <a class='closeBtn' href='javascript:void(0);'>close</a>\
            </div>");

            $(".mask, .mailPop").hide();
            $("a.link_o").each(function(){
              $(this).click(function(){
                $(".mask, .mailPop").fadeIn();
              });
            });

            $(".mask, a.closeBtn").click(function(){
              $(".mask, .mailPop").fadeOut();
            });
        },
        slider: function(){
            $(".catPhoto ul li").each(function(){
                $(this).click(function(){
                    var ImgUrl = $(this).find("img").attr("src");

                    $(this).addClass("active").siblings("li.active").removeClass("active");
                    $(".focusImg").attr("src",ImgUrl);
                });
            });
        }
    };

    //select ui plugins
    $.fn.selectCustom = function(){
        var _select = this,
            _selectLength = _select.find("option").length,
            _orgText = _select.find("option").eq(0).text();

        _select.hide();
        _select.parent().prepend("<div class='selectText'>\
        <span></span>\
        <ul class='selectLists'></ul>\
        </div>");

        var _lists = $("ul.selectLists"),
            _nowText = $(".selectText");

        _lists.hide();
        _nowText.find("span").text(_orgText);

        for(var i = 0; i < _selectLength; i++) {
            var _text = _select.find("option").eq(i).text();
            _lists.append("<li>"+_text+"</li>");
        }


        _nowText.hover(function(){
            _lists.show();
        },function(){
            _lists.hide();
        });


        _lists.find("li").hover(function(){
            $(this).addClass("mOver").siblings("li").removeClass("mOver");
        });

        _lists.find("li").click(function(){
            var _index = $(this).index(),
            _liText = $(this).text();
            $(".selectText > span").text(_liText);

            _select.find("option").eq(_index).attr("selected","selected");
        });
    }

    var url = window.location.href,
        area = url.split("/").pop().split(".")[0];

    $(document).ready(function(){
        parallaxScrollCheck(area);
        init.loadingProgress();
        init.sideNavs();
        init.slider();

        $(".pieces").selectCustom();
    });

    $(window).resize(function(){
      location.href = url;
      // parallaxScrollCheck(area);
    });

    function parallaxScrollCheck(obj){
      if(obj == "" || obj == "index") {
           var _windowHeight = $(document).height();
           init.parallaxScroll(_windowHeight);
      } else {
        $(".logo").css("opacity",1);
      }
    }




});
