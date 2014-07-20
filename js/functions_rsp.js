//fitText if needed
//jQuery(".phones b").fitText();

$(document).ready(function(){
// Главная страница
/*
var viewportWidth = $('#container').width();
$('#container, #container > ul > li').css('width',viewportWidth);

*/
slider = $('#container ul').bxSlider({
     adaptiveHeight: true,
    infiniteLoop : false,
    hideControlOnEnd : true,
    
    minSlides: 1,
    maxSlides: 1,
    slideWidth: 700,
    pagerCustom: '#bx-pager'
  });


 $('#showBxPager').click(function(){
  $('#bx-pager').show();
  $(this).removeClass('attention');
  $(this).hide()
 })

$('#bx-pager section').click(function(){
  var blockId = $(this).attr('id');
  blockId = blockId.substring(4, blockId.length)
 // alert(blockId);
  //$('.bx-viewport section div').not($('#'+blockId+'_front')).addClass('transparent');

  var offset = $('#'+blockId).offset();
  $('body').scrollTop(offset.top-100);
    $('#bx-pager').delay(800).hide();
     $('#showBxPager').delay(800).show();
});
$('#bx-pager section').each(function(){
  var block = $(this).attr('id');
  if(block) {
    block = block.substr(4);
  }
  var blockTitle;
  blockTitle = nameOfBlock(block);
  $(this).attr('alt',blockTitle);
});
 

$('.door').on('click', function(){
  $(this).toggleClass('opened');
});


/*
$('#container li').each(function(){
  var stackId = $(this).index();
  $(this).attr('id','stack'+stackId);

  $(this).find('section').each(function(){
    var blockId = $(this).index();
    $(this).attr('id','stack'+stackId+'_block'+blockId);

    $(this).children().each(function(){
      var side = $(this).attr('side');
      $(this).attr('id','stack'+stackId+'_block'+blockId+'_'+side);
    });

  });

});
*/
/*
$('section').each(function(){
  var numOfSides = $(this).children().length;
  if (numOfSides != 1) {
    $(this).children().each(function(){
      var side = $(this).attr('side');
      side = "to"+side;
      $(this).before('<span class="'+side+'">').append('<span class="back">').each(function(){
        $('[side] .back').on('click', function(){
          $(this).parent().hide();
          $(this).parents('section').children('div[size="front"]').show();
        })
        $('.toleft, .toright, .toinside').on('click', function(){
          $(this).next().show();
          $(this).parent('section').children('div[size="front"]').hide();
        });
      });

    })

  }
});

*/

$('div[side]:not([side="front"])').each(function(){
  var side = $(this).attr('side');
  var alt = $(this).attr('alt');
  var toside = "to"+side;
  $(this).before('<span alt="'+alt+'" class="'+toside+'" for="'+side+'">').append('<i class="back">');
});

$('section > span').on('click',function(){
  side = $(this).attr('for');
  $(this).parent().children('span').hide();
  $(this).parent().children('div[side]').hide();
  $(this).parent().children('div[side="'+side+'"]').fadeIn();
});

$('section i').on('click',function(){
  $(this).parent().parent().children('span').fadeIn();
  $(this).parent().hide();
  $(this).parent().parent().children('div[side="front"]').fadeIn();
});

//Запуск РСП
$('#stack4_block2_front').on('dblclick',function(){
  location.href="rsp://launch/";
});

});



// ----------------------------
// Показать верхнее меню
// ----------------------------

$('header .btn a').bind('click',function() {
  var thisLink = $(this);
  var openBlockId = thisLink.parent().attr('id');
  var openBlockId = openBlockId+'Body';
  var openBlock = $('.hidden-block#'+openBlockId);
  openBlock.toggle();
  thisLink.toggleClass('active');
  $('.hidden-block').not(openBlock).hide();
  $('header .btn a').not(thisLink).removeClass('active');
});

$('#hideDev').bind('click',function() {
  $('.dev').fadeToggle();
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


