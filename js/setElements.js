//fitText if needed
//jQuery(".phones b").fitText();

$(document).ready(function(){
// Главная страница
/*
var viewportWidth = $('#container').width();
$('#container, #container > ul > li').css('width',viewportWidth);

*/



var viewportWidth = $('.mayAddElement').width();




var currentIdSideOfBlock;
var numOfElementsInBlockSide = 0;
$('#add a, #edit a').bind('click', function(){
    enableDraggable();
}) 

function enableDraggable() {
  
  $( ".element" ).draggable();
  $('.mayAddElement section > div').addClass('active');
  $('.mayAddElement section > div.active').bind('click', function() {
        currentIdSideOfBlock = $(this).attr('id');
        console.info(currentIdSideOfBlock);
        numOfElementsInBlockSide = $(this).children().length;
         $('.element').draggable({ revert: "invalid", containment: "parent" });
    });
    return
}


$('#addBody a')
  .data('counter', 0)
  .bind('click',function() {
    var counter = $(this).data('counter');
    counter += numOfElementsInBlockSide;
    $(this).data('counter', counter + 1);
    var typeOfControl = $(this).attr('id');  
    $('#'+currentIdSideOfBlock).append(element(typeOfControl, $(this).data('counter')));
  })
;

$('#editBody a').on('click', function(){
  var htmllog = $('#'+currentIdSideOfBlock).children().clone();

  htmllog.find('.overlay').children().remove();
  htmllog.removeClass('ui-draggable');
  htmllog.appendTo($('#htmllog').children('xmp'));
});

function element(typeOfControl, i) {
  return '<div class="element" type="'+typeOfControl+'" num="'+i+'">  <div class="overlay"></div><div class="body"></div>  <div class="control"><a href="javascript:;" class="click"></a></div></div>'
}

                                                  var attributes = '';
$( ".mayAddElement section>div" ).droppable({
 hoverClass: "hover",
 drop: function(event, ui) {
    var a=event.type; // возвращает название события ('drop')
    var element = ui.draggable;
    var currentIdSideOfBlock = $(this).attr('id');
    $(this).append(ui.draggable);
    // Делаем из пикселей проценты
    var sideViewportHeight = $(this).height();
    var sideViewportWidth = $(this).width();
    var l=ui.position.left;
    var t=ui.position.top;
    // Переводим значения 
    var lPercent = l*100/sideViewportWidth;
    var tPercent = t*100/sideViewportHeight;
    // Применяем значения
    element.css('left',lPercent+'%');
    element.css('top',tPercent+'%');
    //element.css('left',l+'px');
    //element.css('top',t+'px');
    var elementPublicId = '[type="'+element.attr('type')+'"][num="'+element.attr('num')+'"]';
    
    element.find('select').remove();
    element.find('.overlay').children().remove();

    element.find('.overlay').append(select(element.attr('type')));

    $('select').bind('change', function(){
      var nameAttr = ""; 
      nameAttr += $(this).attr('data');
      var val = ""; 
      val += $(this).children('option:selected').val();
    $(this).parents('.element').attr(nameAttr, val);

                                                  attributes = $('#exlog').html();
                                                  attributes += '<'+nameAttr+' class="'+nameAttr+'">'+nameAttr+':'+val+'</'+nameAttr+'>';
                                                  $('#exlog').html(attributes);
    });
    $('input').bind('change', function(){
      var nameAttr = ""; 
      nameAttr += $(this).attr('data');
      var val = ""; 
      val += $(this).val();
    $(this).parents('.element').attr(nameAttr, val);
      
                                                  attributes = $('#exlog').html();
                                                  attributes += '<'+nameAttr+' class="'+nameAttr+'">'+nameAttr+':'+val+'</'+nameAttr+'>';
                                                  $('#exlog').html(attributes);

    });
    var csslog = $('#csslog').html(); var htmllog = $('#htmllog').text();
    $('#delete').bind('click',function(){
        $(this).parents('.element').remove();
    });
    $('#sendToLog').bind('click',function(){ 
                                                  $('#exlog').html('');
      //csslog  += '#'+currentIdSideOfBlock+' '+elementPublicId+' { left: '+lPercent+'%; top: '+tPercent+'%; }<br>';
      //$('#csslog').html(csslog);

      /*var htmllog = $(this).parents('section').clone();
      htmllog.find('*')
        .removeAttr('id')
        .removeClass('ui-draggable')
        .not('.element, .element>div, section').removeAttr('class');
      htmllog.find('.overlay').children().remove();
      htmllog.appendTo($('#htmllog').children('xmp'));*/
      var htmllog = $(this).parents('.element').clone();
      htmllog.find('.overlay').children().remove();
      htmllog.removeClass('ui-draggable');
      htmllog.appendTo($('#htmllog').children('xmp'));
      //$('#htmllog').text($(this).parents('[side]').clone());
      $(this).parent().remove();
    });
  }
});



$('xmp').on('click', function(){
  var content = '';
  $('textarea').text('');
  content = $(this).html();
  $(this).text(content);
  $('textarea').text(content);
})




function select(typeOfElement) {
  // эквивалентны записи var options = {} и var options = new Object(); 
    var startHtmlTags = '<div class="box"><label>';
    var endHtmlTags = '</select></div>';
   var options = {}
   

  if (typeOfElement == 'knob'){
    options = {
        positions: startHtmlTags+'Количество позиций</label><select data="positions">',
        defaultPosition: startHtmlTags+'Позиция по умолчанию</label><select data="defaultPosition">',
        view_special: startHtmlTags+'введите особый тип отображения</label><input data="view_special" type="text" value="">'
    }
    var max = 12;
    for (var i = 0; i < max; i++) {
       options.positions += '<option value="'+i+'">'+i+'</option>';
       options.defaultPosition += '<option value="'+i+'">'+i+'</option>';
    }
  }
  if (typeOfElement == 'toggler'){
    options = {
        defaultPosition: startHtmlTags+'Позиция по умолчанию</label><select data="defaultPosition">',
        view: startHtmlTags+'Вид тумблера</label><select data="view">',
        view2: startHtmlTags+'Направление</label><select data="view2">',
        view_special: startHtmlTags+'или введите особый тип отображения</label><input data="view_special" type="text" value="">'
    }
    var max = 3;
    for (var i = 0; i < max; i++) {
       options.defaultPosition += '<option value="'+i+'">'+i+'</option>';
    }
       options.view += '<option value="false">Выбрать</option><option value="simple">Двухпозиционный</option><option value="rotate">Поворотный</option>';
       options.view2 += '<option value="false">Выбрать</option><option value="vert">Вертикально</option><option value="hor">Горизонтально</option>';
  }
  if (typeOfElement == 'lamp') {
    options = {
        color: startHtmlTags+'Цвет</label><select data="color">',
        defaultPosition: startHtmlTags+'Позиция по умолчанию</label><select data="defaultPosition">',
      size: startHtmlTags+'Тип</label><select data="size">'
    }
    var max = 2;  
    options.size += '<option value="false">Выбрать</option><option value="big">Обычная</option><option value="small">Небольшая</option>';
    options.defaultPosition += '<option value="false">Выбрать</option><option value="off">Не горит</option><option value="on">Горит</option>';
    options.color += '<option value="false">Выбрать</option><option value="yellow">Желтая</option><option value="green">Зеленая</option><option value="red">Красная</option>';
  }
  if (typeOfElement == 'rotator') {
    endHtmlTags = '';
    options = {
        range: startHtmlTags+'Количество позиций</label><input data="range" type="text" value=""></div>',
        step: startHtmlTags+'Шаг</label><input data="step" type="text" value=""></div>',
        defaultPosition: startHtmlTags+'Позиция по умолчанию</label><input data="defaultPosition" value=""></div>',
        //view: startHtmlTags+'Вид потенциометра</label><select type="view"><option value="cap">С ручкой</option><option value="nocap">Без ручки</option></select></div>',
        view2: startHtmlTags+'Отображать цифры</label><select data="view2">',
        view_special: startHtmlTags+'введите особый тип отображения</label><input data="view_special" type="text" value=""></div>'
    }
    var max = 2;
    for (var i = 0; i < max; i++) {
       options.defaultPosition += '<option value="'+i+'">'+i+'</option>';
    }
    options.view2 += '<option value="false">Выбрать</option><option value="yes">Да</option><option value="no">Нет</option>'
  }
  if (typeOfElement == 'socket'){
    options = {
        typeOfSocket: startHtmlTags+'Количество отверстий</label><select data="typeOfSocket">',
    }
    options.typeOfSocket += '<option value="false">Выбрать</option><option value="one">Одно</option><option value="two">Два</option><option value="four">Четыре</option>';
  }
  if (typeOfElement == 'scale') {
    endHtmlTags = '';
    options = {
        typeScale: startHtmlTags+'Ввести название файла шкалы</label><option value="false">Выбрать</option><input data="typeScale" type="text" value=""></div>',
        zeroPosition: startHtmlTags+'Позиция нуля</label><select data="zeroPosition"><option value="false">Выбрать</option><option value="left">Слева</option><option value="center">По центру</option></select></div>',
        size: startHtmlTags+'Размер</label><select data="size"><option value="false">Выбрать</option><option value="min">Небольшой</option><option value="mid">Средний</option><option value="max">Большой</option></select></div>',
    }
  }
  if (typeOfElement == 'indicator') {
    endHtmlTags = '';
    options = {
        digitCount: startHtmlTags+'Количество цифр</label><select data="digitCount"><option value="false">Выбрать</option><option value="2">2</option><option value="3">3</option><option value="4">4</option><option value="5">5</option></select></div>',
        size: startHtmlTags+'Размер</label><select data="size"><option value="false">Выбрать</option><option value="mid">Обычный</option><option value="big">Большой</option></select></div>',
    }
  }
  if (typeOfElement == 'next') {
    endHtmlTags = '';
    options = {
        text: startHtmlTags+'Текст кнопки</label><input data="text" type="text" value=""></div>',
    }
  }

  var result = '<div class="selectBox">';
  for (var i in options) {
    options[i] += endHtmlTags;
    result += options[i];
  }
  result += '<button id="sendToLog">Записать</button><button id="delete">Удалить</button></div>';
  return result
  //'<div class="selectBox">'+options.defaultPosition+'<button id="writeToLog">Записать</button></div>'
}







});

