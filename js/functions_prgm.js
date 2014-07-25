//fitText if needed
//jQuery(".phones b").fitText();

$(document).ready(function(){
// Главная страница
/*
var viewportWidth = $('#container').width();
$('#container, #container > ul > li').css('width',viewportWidth);

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

// ----------------------------
// Показываем блоки
// ----------------------------

$('#hidePopUp').on('click', function(){
  $('#hidePopUp').fadeOut();
  $('#blocks').removeClass('fixed').find('.block-holder, .card-holder').hide();
});



$('#container section').not('#min_stack0_block26').on('click', function(){
  $('#hidePopUp').fadeIn();
  var sectionId = $(this).attr('id').substr(4);
  console.info(sectionId);
  $('#'+sectionId).parent().show();
  $('#blocks').addClass('fixed');
}); 

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

$('.card-block').on('click', function(e){
  if (e.target !== this) return;
  $(this).toggleClass('opened');
})

});



// ----------------------------
// Показать верхнее меню
// ----------------------------

$('header .btn a').not($('#hidePopUp')).bind('click',function() {
  var thisLink = $(this);
  var openBlockId = thisLink.parent().attr('id');
  var openBlockId = openBlockId+'Body';
  var openBlock = $('.hidden-block#'+openBlockId);
  openBlock.slideToggle();
  thisLink.toggleClass('active');
  $('.hidden-block').not(openBlock).slideUp();
  $('header .btn a').not(thisLink).removeClass('active');
});

$('#hideDev').bind('click',function() {
  $('.dev').toggleClass('hidden');
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


