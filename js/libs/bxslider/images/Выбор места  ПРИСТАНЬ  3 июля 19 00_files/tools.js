var speedSlider  = 500;

if (!periodSlider)
{
    var periodSlider = 3000;
}

var timerSlider;

(function($) {

    $(document).ready(
        function() {

            $("div.slider").each(function() {
                var curSlider = $(this);
                    curSlider.data("curIndex", 0);

                $(window).load(resizeSlider);
                $(window).resize(resizeSlider);
                
                // shows/views/scripts/index/partials/shows-banners.phtml
                if (shows_banners_count > 1)
                {
                    timerSlider = window.setTimeout(sliderNext, periodSlider);
                }
            });

            var curZ = 100;
            /*
            $("div.calendar-item").each(
                function() {
                    $(this).css({"z-index":curZ--});
                }
            );
            $("div.calendar-row").each(
                function() {
                    $(this).css({"z-index":curZ--});
                }
            );
            */
            if ($.browser.msie && $.browser.version == "6.0") {
                $("div.calendar-row").each(
                    function() {
                        $(this).find("div.calendar-item:first").addClass("calendar-item-first");
                    }
                );
                $(this).find("div.spisok-row:first").addClass("spisok-row-first-child");
            }
            
            $("div.calendar-item.single").live('mouseover', function()
            {
                $('div.calendar-item-name').removeClass("active");
                
                $('.calendar-item-name', $(this)).toggleClass("active");
            });

            $("div.calendar-item.multi .calendar-item-name").live('mouseover', function()
            {
                $('div.calendar-item-name').removeClass("active");
                
                $(this).addClass("active");
            });

            $("div.calendar-item").live('mouseout', function()
            {
                $('div.calendar-item-name').removeClass("active");
            });
           
            $(document).click(function(e) {
                if ($(e.target).parents().filter(".calendar-item-name").length != 1) {
                    $("div.calendar-item-name").removeClass("active");
                }
            });

//            $("a.calendar-prev, a.calendar-next").live('click', 
//                function() {
//                    var curURL = $(this).attr("href");
//                    $.post(curURL, function(data)
//                    {
//                        $('#page_content').html(data);
//                        
//                        $("div.calendar-item-name a").click(function()
//                        {
//                                $("div.calendar-item-name").removeClass("active");
//                                $(this).parent().toggleClass("active");
//                        });
//                        
//                    });
//
//                    return false;
//                }
//            );

            $("div.podrobno-photos-slider-inner").each(function() {
                var curSlider = $(this);
                curSlider.data("curIndex", 0);
                /*
                for (var i = 0; i < curSlider.find("div.podrobno-photos-item").length; i++) {
                    $('div.podrobno-photos-ctrl').append("<a href='#'></a>");
                    $('div.podrobno-photos-ctrl a:first').addClass("active");
                    $('div.podrobno-photos-ctrl a').bind("click",
                        function() {
                            var curSlider = $("div.podrobno-photos-slider-inner");
                            var curIndex = $("div.podrobno-photos-ctrl a").index($(this));

                            $("div.podrobno-photos-ctrl a.active").removeClass("active");
                            $(this).addClass("active");

                            curSlider.animate({"left":-curIndex * curSlider.find("div.podrobno-photos-item:first").width()}, speedSlider);
                            curSlider.data("curIndex", curIndex);

                            return false;
                        }
                    );
                }
                */
                curSlider.find("div.podrobno-photos-slider-inner").css({"width":curSlider.find("div.podrobno-photos-item:first").width() * (curSlider.find("div.podrobno-photos-item").length + 1)});
            });

            $("a.podrobno-photos-slider-prev").click(
                function() {
                    var curSlider = $("div.podrobno-photos-slider-inner");
                    var curIndex = Number(curSlider.data("curIndex"));

                    var isFirst = false;
                    curIndex--;
                    if (curIndex == -1) {
                        isFirst = true;
                        curSlider.prepend(curSlider.find("div.podrobno-photos-item:last").clone());
                        curSlider.css({"left":-curSlider.find("div.podrobno-photos-item:first").width()});
                        curIndex = 0;
                    }
                    curSlider.animate({"left":-curIndex * curSlider.find("div.podrobno-photos-item:first").width()}, speedSlider, function() {
                        if (isFirst) {
                            curIndex = curSlider.find("div.podrobno-photos-item").length - 2;
                            curSlider.css({"left":-curIndex * curSlider.find("div.podrobno-photos-item:first").width()});
                            curSlider.find("div.podrobno-photos-item:first").remove();
                        }
                        curSlider.data("curIndex", curIndex);
                        // $("div.podrobno-photos-ctrl a.active").removeClass("active");
                        // $("div.podrobno-photos-ctrl a").eq(curIndex).addClass("active");
                    });
                    return false;
                }
            );

            $("a.podrobno-photos-slider-next").click(
                function() {
                    var curSlider = $("div.podrobno-photos-slider-inner");
                    var curIndex = Number(curSlider.data("curIndex"));

                    var isLast = false;
                    curIndex++;
                    if (curIndex == curSlider.find("div.podrobno-photos-item").length) {
                        isLast = true;
                        curSlider.append(curSlider.find("div.podrobno-photos-item:first").clone());
                    }
                    curSlider.animate({"left":-curIndex * curSlider.find("div.podrobno-photos-item:first").width()}, speedSlider, function() {
                        if (isLast) {
                            curIndex = 0;
                            curSlider.css({"left":-curIndex * curSlider.find("div.podrobno-photos-item:first").width()});
                            curSlider.find("div.podrobno-photos-item:last").remove();
                        }
                        curSlider.data("curIndex", curIndex);
                        // $("div.podrobno-photos-ctrl a.active").removeClass("active");
                        // $("div.podrobno-photos-ctrl a").eq(curIndex).addClass("active");
                    });
                    return false;
                }
            );

            $("div.podrobno-list-3-content table tr:odd").addClass("odd");

            $("div.podrobno-list-3-ctrl a").click(
                function() {
                    
                    var parent_box = $($(this).parents('.podrobno-list-3')[0]);
                    
                    
                    $("div.podrobno-list-3-content", parent_box).slideToggle();
                    
                    $("div.podrobno-list-3-ctrl a", parent_box).each(function()
                    {
                        $(this).toggleClass("active");

                        var curText = $(this).html();

                        $(this).html($(this).attr("rel"));
                        $(this).attr("rel", curText);
                    });
                    
                    return false;
                }
            );
//
//            $("div.podrobno-list-4-ctrl a").click(
//                function() {
//                    $("div.podrobno-list-4-content").slideToggle();
//                    $(this).toggleClass("active");
//                    var curText = $(this).html();
//                    $(this).html($(this).attr("rel"));
//                    $(this).attr("rel", curText);
//                    return false;
//                }
//            );

        }
    );

    function resizeSlider() {
        var curSlider = $("div.slider");
        var curIndex = Number(curSlider.data("curIndex"));
        var curWidth = curSlider.width();

        curSlider.find("div.slider-item").width(curWidth);

        curSlider.find("div.slider-inner").css({"width":curWidth * (curSlider.find("div.slider-item").length + 1), "left":-curIndex * curWidth});
    }

    function sliderNext() {
        window.clearTimeout(timerSlider);
        timerSlider = null;

        var curSlider = $("div.slider");
        var curIndex = Number(curSlider.data("curIndex"));
        var curWidth = curSlider.width();

        var isLast = false;
        curIndex++;
        if (curIndex == curSlider.find("div.slider-item").length) {
            isLast = true;
            curSlider.find("div.slider-inner").append(curSlider.find("div.slider-item:first").clone());
        }
        curSlider.find("div.slider-inner").animate({"left":-curIndex * curWidth}, speedSlider, function() {
            if (isLast) {
                curIndex = 0;
                curSlider.find("div.slider-inner").css({"left":-curIndex * curWidth});
                curSlider.find("div.slider-item:last").remove();
            }
            curSlider.data("curIndex", curIndex);
            timerSlider = window.setTimeout(sliderNext, periodSlider);
        });
    }

    if ($.browser.msie && $.browser.version == "6.0") {
        $(window).load(correctPageRightIE6);
        $(window).resize(correctPageRightIE6);
    }

    function correctPageRightIE6() {
        $("div.page-right").height($("div.wrapper").height());
    }

})(jQuery);

function showPerformanceProgramm(performance_id, lang)
{
    if (lang === undefined || lang === 'ru' ) { lang = ''; } else { lang = '/'+lang; };

    $.fancybox.showActivity();
    
    $.post(lang+'/do/shows/performances/performance-programm', {performance_id:performance_id}, function(data)
    {
        $("div.calendar-item-name").removeClass("active");
        
        $.fancybox(data, {
            transitionIn: 'elastic',
            padding: 0
        });
    });
}