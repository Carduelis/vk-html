//fitText if needed
//jQuery(".phones b").fitText();

function initPresentationGallery() {
  return false;
}


$(document).ready(function(){
// Главная страница
document.addEventListener("touchstart", function(){}, true);


  /*var numSlides = $('.slider-wrapper > *').length;
  var lishki = '<li class="on" onclick="mySwipe.slide(0,400)"></li>'
  for (var i = 1; i < numSlides; i++) {
    lishki+= '<li class="" onclick="mySwipe.slide('+i+',400)"></li>'
  }
  $('#position').append(lishki);
  window.mySwipe = new Swipe(document.getElementById('slider'), {
    speed: 400,
    auto: 3000,
    continuous: true,
    callback: function(pos) {

        var i = bullets.length;
        while (i--) {
          bullets[i].className = 'off';
        }
        bullets[pos].className = 'on';

      }
  });
  var bullets = $('#position > li');*/
  $('.presentation').each(function(){
    $(this).addClass('flexslider');
    $(this).children('a').wrap('<li>')
    $(this).children('li').wrapAll('<ul class="slides">');
    $(this).wrap('<div class="slider-wrapper');
  });

  $('.person_name').removeAttr('style');


  $('.news').addClass('flexslider');
  $('.flexslider > ul').addClass('slides');
  $('.flexslider').wrap('<div class="slider-wrapper loading">');


  var photoActor = $('.podrobno-breadcrumbs-box-actor + .podrobno-photo-shedule .podrobno-photos');
  photoActor.removeAttr('style');
  photoActor.addClass('show');
  photoActor.insertBefore('.person_left_info_block');
  $('.podrobno-photos-item').wrap('li');
  $('.podrobno-photos-slider-inner > li').wrapAll('<ul class="slides">');
  $('.podrobno-photos-slider-inner').addClass('flexslider');
  $('.podrobno-photos-slider-content').addClass('slider-wrapper');
  $('.podrobno-photos-item-photo').removeAttr('style');
  /*
  $('#right_panel').each(function(){
    $(this).children('h1:eq(0)').wrap('<div class="js-menu-container">');
    $(this).find('.js-menu-container').prepend('<a class="left_panel-opener"></a>');

  });
*/
$('#right_panel > .bread_crumbs').after('<div id="top_menu">');
$('#left_panel > ul').clone().appendTo($('#top_menu'));
    $('#right_panel').append('<a class="left_panel-opener">Показать навигацию</a>')
  $('#left_panel > ul > li').prepend('<a class="left_panel-closer">');
  $('.left_panel-opener').click(function(){
    $('#left_panel').addClass('fixed');
  });
  $('.left_panel-closer').click(function(){
    $('#left_panel').removeClass('fixed');
  });

  $('.flexslider').flexslider({
    animation: "slide",
    slideshow: false,
    //smoothHeight: true,
    start: function(slider) {
      $('.slider-wrapper').removeClass('loading')
    }
  });
  // Афиша

  $('.calendar-item').each(function(){
    $(this).children().not('.calendar-item-date').wrapAll('<div class="popup"><div class="content"></div></div>');
  });

    $('.popup .content').each(function(){
      $(this).prepend('<a class="popup-closer">Закрыть</a>');
    });
  $('.calendar-item-date').click(function(){
      $(this).next().fadeIn();
  });
  $('.popup-closer').click(function(){
      $(this).parent().parent().fadeOut();
  });
  $('.multi .calendar-item-show-name').click(function(){
    $(this).toggleClass('active').next().slideToggle();
    return false
  })


  // Заказ билетов
  $('.places_map').wrap('<div class="places_map_wrapper">');
});

$('.anonces-content').before('<h2 class="x">Ближайшие спектакли</h2>');
$('.main-left').before('<h2 class="x">Новости</h2>');
$('.main-right').before('<h2 class="x">Анонсы</h2>');

// ----------------------------
// Показать верхнее меню
// ----------------------------

$('header .btn a').bind('click',function() {
  var thisLink = $(this);
  var openBlockId = thisLink.parent().attr('id');
  var openBlockId = openBlockId+'Body';
  var openBlock = $('.hidden-block#'+openBlockId);
  openBlock.slideToggle();
  thisLink.toggleClass('active');
  $('.hidden-block').not(openBlock).slideUp();
  $('header .btn a').not(thisLink).removeClass('active');
});


// ----------------------------
// Переключение видов
// ----------------------------
$('.btn-group > .inside > .btn').bind('click',function() {
  var t = $(this);
  var p = t.parents('.multi-view');
  p.find('.btn').removeClass('active');
  p.find('.view').hide();
  t.addClass('active');
  p.find('.view:eq('+ t.index() +')').fadeIn(300);
});
$('.btn-group > .inside > .btn:first-child').addClass('active');
$('.view-group > .view:first-child').show();


// ----------------------------
// Плавная прокрутка
// ----------------------------
 function filterPath(string) {
  return string
    .replace(/^\//,'')
    .replace(/(index|default).[a-zA-Z]{3,4}$/,'')
    .replace(/\/$/,'');
  }
  var locationPath = filterPath(location.pathname);
  var scrollElem = scrollableElement('html', 'body');
 
  $('a[href*=#]').each(function() {
    var thisPath = filterPath(this.pathname) || locationPath;
    if (  locationPath == thisPath
    && (location.hostname == this.hostname || !this.hostname)
    && this.hash.replace(/#/,'') ) {
      var $target = $(this.hash), target = this.hash;
      if (target) {
        var targetOffset = $target.offset().top;
        $(this).click(function(event) {
          event.preventDefault();
          $(scrollElem).animate({scrollTop: targetOffset}, 400, function() {
            location.hash = target;
          });
        });
      }
    }
  });
 
  // use the first element that is "scrollable"
  function scrollableElement(els) {
    for (var i = 0, argLength = arguments.length; i <argLength; i++) {
      var el = arguments[i],
          $scrollElement = $(el);
      if ($scrollElement.scrollTop()> 0) {
        return el;
      } else {
        $scrollElement.scrollTop(1);
        var isScrollable = $scrollElement.scrollTop()> 0;
        $scrollElement.scrollTop(0);
        if (isScrollable) {
          return el;
        }
      }
    }
    return [];
  }