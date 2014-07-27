function exercisePassedSuccesfully() {
	hideAll();
	alert('Упражнение выполнено верно!');
}

function exercisePassedUnSuccesfully() {
	hideAll();
	alert('Упражнение выполнено неверно');
}
function hideAll() {
	$('#tester').hide();
	$('#wrapper, .container-level1').hide();
	$('#training, #passing').hide();
	$('.sub-menu').prev().hide();
}

var trainingMode = false;
// Обращение к кнопке, возвращает jquery-конструкцию
	function ctrl(blockId,typeOfControl,dataNumber) {
		return $('#block'+blockId+' [type="'+typeOfControl+'"][data="num'+dataNumber+'"]')
	}
// Обращение к кнопке, возвращает jquery-конструкцию
	function ctrlStatus(blockId,typeOfControl,dataNumber,status) {
		return $('#block'+blockId+' [type="'+typeOfControl+'"][data="num'+dataNumber+'"][status="'+status+'"]')
	}
// Работа подсказочек-всплывашек
	function hint(blockId,typeOfControl,dataNumber,text){
		$('.hint').hide();
		$('.hint').parent().css('z-index','1');
		ctrl(blockId,typeOfControl,dataNumber).css('z-index','10').append('<span class="hint"><span style="display: block">'+text+'</span></span>');
	}		
// Условие проверки: находится ли определенный контрол в верной позиции
	function pass(progressId,passPosition,blockId,typeOfControl,dataNumber,text){
		if (trainingMode) {
			return true;
		} else {
			if (
					(ctrl(blockId,typeOfControl,dataNumber).attr('status') == passPosition) 
				&&	(ctrl(blockId,typeOfControl,dataNumber).attr('progress') == progressId)	
			) {
				return true;
			} else {
				return false
			}
		}
	}
// Функция подсказки. Базируется на функциях ctrl и hint
	function hinter(progressId,blockId,typeOfControl,dataNumber,status,destBlockId,destTypeOfControl,destDataNumber,text) {
				//ctrl(blockId,typeOfControl,dataNumber).removeClass('disabled');
				//ctrl(blockId,typeOfControl,dataNumber).children().removeClass('disabled');
				
				ctrl(blockId,typeOfControl,dataNumber).on('click',function() {
					if (ctrl(blockId,typeOfControl,dataNumber).attr('progress') == progressId) {// условие на защиту от появления старой подсказки на повторных кликах
						$(this).attr('hintered',status); // защита от появления старой подсказки на повторных кликах
						if (ctrl(blockId,typeOfControl,dataNumber).attr('status') == status) {
							hint(destBlockId,destTypeOfControl,destDataNumber,text);
							ctrl(destBlockId,destTypeOfControl,destDataNumber).addClass('highlighted');
							$('.control').not(ctrl(destBlockId,destTypeOfControl,destDataNumber)).addClass('disabled');
							//$('.control').on();
						};
					}
				});
				ctrl(blockId,typeOfControl,dataNumber).on('mouseover', function(){
					$(this).removeClass('disabled');
				});
	}
//	степанов
//	кирилов
//	кураев
//	савулей
// Функция подсказки2. Базируется на функциях ctrl и hint
	function hinterNextBlock(progressId,blockId,typeOfControl,dataNumber,status,nextBlock,destTypeOfControl,destDataNumber,destText) {  
		ctrl(blockId,typeOfControl,dataNumber).on('click',function() {
			if (ctrl(blockId,typeOfControl,dataNumber).attr('progress') == progressId) {// условие на защиту от появления старой подсказки на повторных кликах
				if (ctrl(blockId,typeOfControl,dataNumber).attr('status') == status) {
					$('.hint').hide();
					$('.hovered').removeClass('hovered');
					
					$('#close').text('Закрыть').addClass('hovered');
					hint(nextBlock,destTypeOfControl,destDataNumber,destText);
					ctrl(nextBlock,destTypeOfControl,destDataNumber).addClass('highlighted');
					$('.control').not(ctrl(nextBlock,destTypeOfControl,destDataNumber)).addClass('disabled');
					$('.zoom .block'+nextBlock).addClass('hovered');

					
					if (nextBlock == 200) {
						$('.zoom .block'+nextBlock).parent().append('<span class="hint"><span style="display: block">Откройте блок ИП2</span></span>');
					} else if (nextBlock == 999) {
						$('.zoom .block'+nextBlock).parent().append('<span class="hint"><span style="display: block">Откройте блок ДП</span>');
					} else {
						$('.zoom .block'+nextBlock).parent().append('<span class="hint"><span style="display: block">Откройте П'+nextBlock+'</span></span>');
					}
				};
			}
		});
		ctrl(blockId,typeOfControl,dataNumber).on('mouseover', function(){
			$(this).removeClass('disabled');
		});
	}	
// Функция подсказки3. Базируется на функциях ctrl и hint
	function hinterStart(blockId,destTypeOfControl,destDataNumber,destText) { 
		$('.hint').hide();
		$('.hovered').removeClass('hovered');
		hint(blockId,destTypeOfControl,destDataNumber,destText);
		ctrl(blockId,destTypeOfControl,destDataNumber).addClass('highlighted');
		$('.zoom .block'+blockId).addClass('hovered');
		if (blockId == 200) {
			$('.zoom .block'+blockId).parent().append('<span class="hint"><span style="display: block">Откройте блок ИП2</span></span>');
		} else if (blockId == 999) {
			$('.zoom .block'+blockId).parent().append('<span class="hint"><span style="display: block">Откройте блок ДП</span>');
		} else {
			$('.zoom .block'+blockId).parent().append('<span class="hint"><span style="display: block">Откройте блок П'+blockId+'</span></span>');
		}
		
	}
// Функция подсказки4. Конец упражнения

	function hinterEnd(progressId,blockId,typeOfControl,dataNumber,status) {  
		ctrl(blockId,typeOfControl,dataNumber).on('click',function() {
			if (ctrl(blockId,typeOfControl,dataNumber).attr('progress') == progressId) {// условие на защиту от появления старой подсказки на повторных кликах
				if (ctrl(blockId,typeOfControl,dataNumber).attr('status') == status) {
					$('.hint').hide();
					$('.hovered').removeClass('hovered');
					$('#close').text('Закройте этот блок').addClass('hovered');
					$('#tester').addClass('hovered');
					$('.userlog').fadeIn();
				};
			}
		});
		ctrl(blockId,typeOfControl,dataNumber).on('mouseover', function(){
			$(this).removeClass('disabled');
		});
	}	
// Функция является ли работа сдачей или тренировкой
	function isTrain() {
		if ($('a[data="coach-activator"]').attr('class') == 'mode current') {
			return true;
		} else {
			return false;
		}
	}
// Возвращаем контролы в положение после выполнения первого упражнение
	function defaultPositions(nothing,newPosition,blockId,typeOfControl,dataNumber) {
		ctrl(blockId,typeOfControl,dataNumber).attr('status',newPosition);
		$('.control[type="knob"]').each(function(){
			thisCtrl = $(this);
			status = thisCtrl.attr('status');
			numOfPositions = thisCtrl.attr('positions');

			var step = 15;
			var rotate = step*(1-numOfPositions+2*status);
			$(this).children('.body').css('transform','rotate('+rotate+'deg)');
		});
	}
// Возвращаем лампочки в положение после выполнения первого упражнение
	function lamp(blockId,dataNumber,status) {
		var lamp = "lamp";
		ctrl(blockId,lamp,dataNumber).removeClass();	
		ctrl(blockId,lamp,dataNumber).addClass(status);	
	}

function loadPage() {



$('.sub-menu a').on('click',function(){
	if ( $('.main-menu > li').eq(3).attr('id') == 'currentTest') {
		$(this).attr('href','');
		alert('Страница перезагружена. Выберите упражнение снова');
	}
});

$('#theory').on('click',function(){
	$('.theory').slideToggle();
	$('.about').slideUp();
});

$('#about').on('click',function(){
	$('.about').slideToggle();
	$('.theory').slideUp();
});
$('#closeAbout, #closeTheory').on('click',function(){
	$('.about').slideUp();
	$('.theory').slideUp();
});

$('#exercise2-1, #exercise2-2, #exercise2-3').on('click',function(){
	alert('Внимание! \n\r При выполнении данного упражнения подразумевается, что  упражнение #2 "Настройка и проверка работоспособности приводных передатчиков" было выполнено!')
});
$('#exercise2').on('click',function(){
	alert('Внимание! \n\r Выставлена частота в 600кГц')
});
$('#exercise1').on('click',function(){
	$('#tablewrapper').show();
});
var letters = 2;
$('#choosePrivod a').on('click',function(){
	$('#choosePrivod').hide();
	if ($(this).attr('rel') == 'near') {
		letters = 1;
	}
	$('#chooseFrequency').fadeIn();
});
$('#chooseFrequency a[rel="openTable"]').on('click',function(){
	$('#chooseFrequency').hide();
	$('#table').fadeIn();
});
$('#chooseFrequency a[rel="next"]').on('click',function(){
	$('#chooseFrequency, #tablewrapper').fadeOut();
});

var subBands1 = 7;
var subBands2 = 9;
var frequency = {
	x1000: 0,
	x100: 6,
	x10: 0,
	x1: 0,
	x01: 0
}
$('#table td:nth-of-type(5)').on('click',function(){
	var fr = $(this).text();
	alert('Значение '+fr+'кГц выбрано!');
	$('#tablewrapper').hide();

	subBands1 = $(this).next().next().text();
	subBands2 = $(this).next().text();

	frequency.x1000 = (fr/1000|0);
	frequency.x100 = ((fr-frequency.x1000*1000)/100|0);
	frequency.x10 = ((fr-frequency.x1000*1000-frequency.x100*100)/10|0);
	frequency.x1 = (fr-frequency.x1000*1000-frequency.x100*100-frequency.x10*10);
	//alert('x1000: '+frequency.x1000+'; x100: '+frequency.x100+'; x10: '+frequency.x10+'; x1: '+frequency.x1);
});



		//Добавляем кнопочки к кнопкам
		$('.control, .uncontrol').append('<a class="clicker" href="javascript:void(0)"></a>');		
		$('.control, .uncontrol').append('<div class="body" href="javascript:void(0)"></div>');		
		$('.control[type="knob"]').append('<a class="clockwise">&uarr;</a><a class="counterclockwise">&uarr;</a>');
		$('.control[type="rotator"]').append('<input type="range" min="1" max="720" value="1">');
		$('#block201 .control[type="rotator"][data="num3"] input').attr('max','180');

	   
		$('.control .clicker').on('click',function(){

			var thisCtrl = 0; var type = 0; var rel = 0; var id = 0; var status = 0; var thisSummary = 0; var numOfPositions = 0;
			$('.clockwise, .counterclockwise, input[type="range"]').hide();
			$('*').removeClass('highlighted');
			thisCtrl = $(this).parent();		
			parentId = thisCtrl.parent().attr('id');
			type = thisCtrl.attr('type');
			rel = thisCtrl.attr('rel');
			id = thisCtrl.attr('data');
			status = thisCtrl.attr('status');

			thisSummary = parentId+type+id;
			thisCtrl.attr('id',thisSummary);
			numOfPositions = thisCtrl.attr('positions');
			var step = 15;
			var rotate = step*(1-numOfPositions+2*status);
			$('#'+thisSummary+' .body').css('transform','rotate('+rotate+'deg)');
			if (type == 'toggler') {
				if (status == 0) 	{window[thisSummary] = 1;} 
				else 				{window[thisSummary] = 0;}							
				thisCtrl.attr('status',window[thisSummary]).toggleClass('on');
			}
			
			if (type == 'rotator') {
				thisCtrl.children('input[type="range"]').show();
			}

			  /* КОД ДЛЯ УПРАЖНЕНИй
					thisCtrl.append('<div class="datainput"><input type="text" class="rightPos" value="" count=""><button>Ок</button></div>');


					thisCtrl.find('button').on('click',function(){
						parentId = parentId.replace(/block/g,"");
						id = id.replace(/num/g,"");
						endPosition = $(this).parent().parent().attr('status');

						progressClick = $('#tester').attr('data-click');
						
						$('body>.log>.hinter .log:last-child i').text(parentId+',"'+type+'",'+id+',"'+$(this).prev().val()+'"');
						$('body>.log>.exercize').append('<span class="log">if(!pass('+progressClick+','+endPosition+','+parentId+',"'+type+'",'+id+')) break;</span>');
						$('body>.log>.hinter').append('<span class="log">hinter('+progressClick+','+parentId+',"'+type+'",'+id+','+endPosition+', <i></i>);</span>');
						progressClick++;
						$('#tester').attr('data-click',progressClick);
						$(this).parent().remove();
					});
						// Конец помощника создания теста


				// */

		 		// /* Ввод статистики для пользователя
				thisCtrl.on('click',function(){
					parentId = parentId.replace(/block/g,"");
					id = id.replace(/num/g,"");
					endPosition = $(this).attr('status');
					progress = $(this).attr('progress');
					$('body>.userlog').append('<span class="log"><u>Прогресс выполнения: <b>'+progress+'</b></u>; Блок №<b>'+parentId+'</b>; Тип элемента: "<b>'+type+'</b>"; Порядковый номер элемента: <b>'+id+'</b>; Положение: <b>'+endPosition+'</b>');
					console.info('if(!pass('+progress+','+endPosition+','+parentId+',"'+type+'",'+id+')) break;');
					//$('#tester').attr('data-click',progressClick);
				});
				// */
			  		/* КОД ДЛЯ ДЕФОЛТНЫХ ПОЗИЦИЙ
					thisCtrl.append('<div class="datainput"><button>Ок</button></div>');
					thisCtrl.find('button').on('click',function(){
						parentId = parentId.replace(/block/g,"");
						id = id.replace(/num/g,"");

						endPosition = $(this).parent().parent().attr('status');
						$('body>.log>.exercize').append('<span class="log">defaultPositions(000,'+endPosition+','+parentId+',"'+type+'",'+id+');</span>');
						$(this).parent().remove();
					});


						//	defaultPositions(000,1,203,'toggler',1);
						//	defaultPositions(000,0,203,'toggler',2);
						//	defaultPositions(000,0,203,'toggler',3);
						//	defaultPositions(000,1,203,'toggler',4);

						//	defaultPositions(000,0,205,'toggler',0);
						//	ctrl(205,'lamp',0);
				// */
		});
		
		$('.control .clicker').hover(function(){
			var thisCtrl = 0; var type = 0; var rel = 0; var id = 0; var status = 0; var thisSummary = 0; var numOfPositions = 0;
			$('.clockwise, .counterclockwise, input[type="range"]').hide();
			$('*').removeClass('highlighted');
			thisCtrl = $(this).parent();		
			parentId = thisCtrl.parent().attr('id');
			type = thisCtrl.attr('type');
			rel = thisCtrl.attr('rel');
			id = thisCtrl.attr('data');
			status = thisCtrl.attr('status');
			
			thisSummary = parentId+type+id;
			thisCtrl.attr('id',thisSummary);
			numOfPositions = thisCtrl.attr('positions');
			var step = 15;
			var rotate = step*(1-numOfPositions+2*status);
			$('#'+thisSummary+' .body').css('transform','rotate('+rotate+'deg)');
			
			if (type == 'knob') {
				thisCtrl.children('a').show();
				thisCtrl.children('.clockwise').on('click',function(){	
				if (status < numOfPositions-1) {
					status++;
					thisCtrl.attr('status',status);
					var rotate = step*(1-numOfPositions+2*status);
					$('#'+thisSummary+' .body').css('transform','rotate('+rotate+'deg)');
				}
				});
				thisCtrl.children('.counterclockwise').on('click',function(){	
				if (status > 0) {
					status=status-1;	
					thisCtrl.attr('status',status);
					var rotate = step*(1-numOfPositions+2*status);
					$('#'+thisSummary+' .body').css('transform','rotate('+rotate+'deg)');
					}
				});
			}
		}, function() {
			type = thisCtrl.attr('type');
			if (type) {
				if (type == 'knob') {
					thisCtrl.children('a').hide();
				}
			}
		});
				
		$("input[type='range']").each(function() {
			$(this).parent().append('<span class="status">0</span>');
		});
		$("input[type='range']").change(function() {
			$(this).next("output").text($(this).val());
			var degree = $(this).val();
			if 	($(this).attr('max') == 720) {
				var range = degree/36;
				range = range.toFixed();
				range = range*5;
			}
			var degree2 = degree/10;
			$(this).parent().children('.status').text(range);
			$(this).parent().children('.body').css('transform','rotate('+degree+'deg)');
			$(this).parent().attr('status',range);
/*
			if 	(degree < 40) {
				$(this).parent().attr('status','0')
				} else if ((degree > 280) && (degree < 420) ) {
					$(this).parent().attr('status','1')
				} else if (degree > 680) {
					$(this).parent().attr('status','2')
				} else {
					$(this).parent().attr('status',degree2)
				} 
*/
		});
		$("input[type='range']").on('mouseover', function(){
			$(this).next("output").text($(this).val());
			var degree = $(this).val();
			if 	($(this).attr('max') == 720) {
				var range = degree/36;
				range = range.toFixed();
				range = range*5;
			}
			var degree2 = degree/10;
			$(this).parent().children('.status').text(range);
			$(this).parent().children('.body').css('transform','rotate('+degree+'deg)');
			$(this).parent().attr('status',range);
		})



	$('.mode').click(
		function(){
			if ($('.sub-menu').attr('class') != 'sub-menu current') {
				alert('Выберите упражнение!');
			} else {
				$(this).toggleClass('current');
				$('.hint span').fadeOut();
				if ($('#passing').attr('class') == 'mode current') {
					alert('Режим сдачи');
					$('.header').slideUp(999);
				} 
				else {
					trainingMode = true;
				}
			}
		}
	);
	$('.mode[test="endTest"]').on('click',function(){
		$('body').addClass('endTest');
	});
	$('.sub-menu a').click(
		function(){
			var currentTest = $(this).attr('id');
			$('.sub-menu a, .sub-menu').removeClass('current');
			$(this).addClass('current');
			$('.sub-menu').addClass('current');
			nameOfTest = $('#'+currentTest).text();
		//	alert('Упражнение: "'+nameOfTest+'" выбрано!');
			$('title').text(nameOfTest);
			$('body').attr('id','test'+currentTest);
			$('.main-menu #currentTest').remove();
			$('.main-menu').append('<li id="currentTest"><span>'+nameOfTest+'</span>');
		}
	);


// Работа с всплывающими окнами

// Image-pop-upers

	$('.zoom > img').on('click',function(){
		
		$('#close').text('Закрыть').removeClass('hovered');
		// Начало скрипта по открытию поп-апа
		var imageUrl = $(this).attr('src');
		//alert(imageUrl);
		imageUrl = imageUrl.replace(new RegExp("images\/miniatures",'g'),"images");
		//imageUrl = imageUrl.replace(new RegExp("png",'g'),"jpg");
		//alert(imageUrl);
		exersizeNum = imageUrl[8]+imageUrl[9]+imageUrl[10];
		//alert(exersizeNum);
		$('#block'+exersizeNum+'> .image').append('<img>');
		$('#block'+exersizeNum+'> .image > img').attr('id','image'+exersizeNum).attr('src',imageUrl);
		
		//alert(imageUrl);	
		$('#wrapper').fadeIn();
		$('#block'+exersizeNum).fadeIn();
		// Убираем подсказки
		$(this).parent().children('.hint').remove();
		$(this).removeClass('hovered');
	});
// Выдвигаемый блок
	$('#block203 [type="eject"]').on('click',function(){
		$('#block2030').fadeIn();
	});
	$('#block2030 [type="uneject"]').on('click',function(){
		$('#block2030').slideUp();
	});
	$('#block205 [type="eject"]').on('click',function(){
		$('#block2050').fadeIn();
	});
	$('#block2050 [type="uneject"]').on('click',function(){
		$('#block2050').slideUp();
	});
// Кнопки закрытия, всплывающий третий уровень
	$('#close').on('click',function(){
		$('.block').slideUp();
		$('#wrapper').fadeOut();
		$('.container-level1').hide();
		$('.container-level1 > .image img').remove();
	});
	
	$('.openWindow').on('click',function(){
		var currentBlock = $(this).attr('id');
		currentBlock = currentBlock + 'Block';
		$('.container-level2#'+currentBlock).fadeIn();				
	});
	
	$('.close').on('click',function(){
		$('.container-level2').fadeOut();
	});
		
	$('.hint span').on('click',function(){
		$(this).parent().hide();
	});	 
// Определение порядка нажатия контрола
	var i = 0;
	$('.control').on('click',function() {
		$('.control').not($(this)).attr('clicked','false'); // разрешаем накручивание счетчика уже нажатым ранее кнопкам
		if ($(this).attr('clicked') == 'true') {
		} else {
			$(this).attr('progress',i++).attr('clicked','true');
		}
	});
//  --------------------------------------------------  \\
//  ------------------- ФУНКЦИИ ------------------------ ||
//  --------------------------------------------------  //
// Ставим контролы в дефолтные позиции

		
	$('.control[type="knob"]').each(function(){
		thisCtrl = $(this);
		status = thisCtrl.attr('status');
		numOfPositions = thisCtrl.attr('positions');

		var step = 15;
		var rotate = step*(1-numOfPositions+2*status);
		$(this).children('.body').css('transform','rotate('+rotate+'deg)');
	});

// Зависимость лампочек

	ctrl(501,'toggler',0).on('click',function() {
		ctrl(501,'lamp',6).toggleClass('on');
	});				
	/* ctrl(205,'knob',0).on('click',function() {
		ctrl(205,'lamp',3).toggleClass('on');
	}); */				
	ctrl(203,'toggler',3).on('click',function() {
		ctrl(203,'lamp',1).toggleClass('on');
	});			
	ctrl(301,'knob',1).on('click',function() {
		if (ctrl(301,'knob',1).attr('status') == 2) {
			//ctrl(301,'lamp',12).addClass('on');
			ctrl(301,'lamp',13).addClass('on');
		} else {
			ctrl(301,'lamp',12).removeClass('on');
			ctrl(301,'lamp',13).removeClass('on');
		}
	});		



// Настройка поддиапазонов в 200 блоке
	var slow_speed = 3;
	var fast_speed = 0.5;
	var k_speed = slow_speed;
	ctrl(201,'toggler',1).on('click',function(){
		k_speed = fast_speed;
	});
	$(function(){
	  var el_click = $('*[type="handler"][data="num2"]'),
	      time, 
	      interval;
	  el_click.mousedown(function(e){
	    time = ctrl(201,'rotator',3).attr('statusData');
	    interval = setInterval(function(){
	        time++;
	        timeData = (time+90)/10;
	        timeData = timeData.toFixed();
	        ctrl(201,'rotator',3).attr('status',timeData);
	        ctrl(201,'rotator',3).attr('statusData',time);
	        ctrl(201,'rotator',3).children('.body').css('transform','rotate('+time+'deg)');

	        mA = time/6 - 15;
			$('.scale203 .arrow').css('-webkit-transform','rotate('+mA+'deg)');
	        A = time/3 - 15;
			$('.scale201 .arrow').css('-webkit-transform','rotate('+A+'deg)');
	    },100*k_speed);
	  }).mouseup(function(e){
	    clearInterval(interval);
	    k_speed = slow_speed;
	    ctrl(201,'toggler',1).removeClass('on').attr('statusData',0);
	  }).mouseout(function(e){
	    clearInterval(interval);
	    k_speed = slow_speed;
	    ctrl(201,'toggler',1).removeClass('on').attr('statusData',0);
	  });
	});

	$(function(){
	  var el_click = $('*[type="handler"][data="num0"]'),
	      time, 
	      interval;
	  el_click.mousedown(function(e){
	    time = ctrl(201,'rotator',3).attr('statusData');
	    interval = setInterval(function(){
	        time = time-1;
	        timeData = (time+90)/10;
	        timeData = timeData.toFixed();
	        ctrl(201,'rotator',3).attr('status',timeData);
	        ctrl(201,'rotator',3).attr('statusData',time);
	        ctrl(201,'rotator',3).children('.body').css('-webkit-transform','rotate('+time+'deg)');


	        mA = time/6 - 15;
			$('.scale203 .arrow').css('-webkit-transform','rotate('+mA+'deg)');
	        A = time/3 - 15;
			$('.scale201 .arrow').css('-webkit-transform','rotate('+A+'deg)');
	    },100*k_speed);
	  }).mouseup(function(e){
	    clearInterval(interval);
	    k_speed = slow_speed;
	    ctrl(201,'toggler',1).removeClass('on').attr('statusData',0);
	  }).mouseout(function(e){
	    clearInterval(interval);
	    k_speed = slow_speed;
	    ctrl(201,'toggler',1).removeClass('on').attr('statusData',0);
	  });
	});

ctrl(202,'rotator',6).change(function(){
	var val = $(this).children('input').val();
	val = val/40;
	val = val.toFixed();
	$(this).attr('status',val).children('.status').text(val);
});
ctrl(202,'rotator',7).change(function(){
	var val = $(this).children('input').val();
	val = val/72;
	val = val.toFixed();
	$(this).attr('status',val).children('.status').text(val);
});
ctrl(205,'knob',0).on('click',function(){
	//if ($(this).attr('status') == 0) { $('.scale205 .arrow').css('-webkit-transform','rotate(-20deg)')}
	if ($(this).attr('status') == 1) { $('.scale205 .arrow').css('-webkit-transform','rotate(-23deg)')}
	if ($(this).attr('status') == 2) { $('.scale205 .arrow').css('-webkit-transform','rotate(-18deg)')}
	if ($(this).attr('status') == 3) { $('.scale205 .arrow').css('-webkit-transform','rotate(20deg)')}
	if ($(this).attr('status') == 4) { $('.scale205 .arrow').css('-webkit-transform','rotate(24deg)')}
	if ($(this).attr('status') == 5) { $('.scale205 .arrow').css('-webkit-transform','rotate(20deg)')}
	if ($(this).attr('status') == 6) { $('.scale205 .arrow').css('-webkit-transform','rotate(25deg)')}
	if ($(this).attr('status') == 7) { $('.scale205 .arrow').css('-webkit-transform','rotate(24deg)')}
	if ($(this).attr('status') == 8) { $('.scale205 .arrow').css('-webkit-transform','rotate(24deg)')}
	if ($(this).attr('status') == 9) { $('.scale205 .arrow').css('-webkit-transform','rotate(20deg)')}
});

ctrl(203,'knob',1).on('click',function(){
	if ($(this).attr('status') == 2) { 
		$('.scale203 .arrow').css('-webkit-transform','rotate(25deg)');
		$('.scale204-1.arrow').css('-webkit-transform','rotate(-28deg)');
		$('.scale204-2 .arrow').css('-webkit-transform','rotate(12deg)');
		$('.scale201 .arrow').css('-webkit-transform','rotate(-25deg)');
	}
});
ctrl(202,'knob',0).on('click',function(){
	if ($(this).attr('status') == 0) { $('.scale202 .arrow').css('-webkit-transform','rotate(-20deg)')}
	if ($(this).attr('status') == 1) { $('.scale202 .arrow').css('-webkit-transform','rotate(-23deg)')}
	if ($(this).attr('status') == 2) { $('.scale202 .arrow').css('-webkit-transform','rotate(10deg)')}
	if ($(this).attr('status') == 3) { $('.scale202 .arrow').css('-webkit-transform','rotate(-10deg)')}
	if ($(this).attr('status') == 4) { $('.scale202 .arrow').css('-webkit-transform','rotate(24deg)')}
});
ctrl(301,'knob',4).on('click',function(){
	if ($(this).attr('status') == 0) { $('.scale301 .arrow').css('-webkit-transform','rotate(4deg)')}
	if ($(this).attr('status') == 1) { $('.scale301 .arrow').css('-webkit-transform','rotate(-23deg)')}
	if ($(this).attr('status') == 2) { $('.scale301 .arrow').css('-webkit-transform','rotate(5deg)')}
	if ($(this).attr('status') == 3) { $('.scale301 .arrow').css('-webkit-transform','rotate(-22deg)')}
	if ($(this).attr('status') == 4) { $('.scale301 .arrow').css('-webkit-transform','rotate(5deg)')}
});

ctrl(301,'knob',0).on('click',function(){
	if ($(this).attr('status') == 0) {
		$('#block301 a[type="lamp"][data="num7"]').removeClass('on');
		$('#block301 a[type="lamp"][data="num13"]').removeClass('on');
	}
	if ($(this).attr('status') == 1) {
		$('#block301 a[type="lamp"][data="num13"]').addClass('on');
	}
});

ctrl(702,'toggler',0).on('click',function(){
	if ($(this).attr('status') == 0) {
		$('[type="lamp"]').removeClass('totaloff');
		$('.scale-holder').removeClass('totaloff');
	}
	if ($(this).attr('status') == 1) {
		$('[type="lamp"]').addClass('totaloff');
		$('.scale-holder').addClass('totaloff');
	}
});

ctrl(205,'toggler',0).on('click',function(){
	if ($(this).attr('status') == 0) {$('#block205 a[type="lamp"][data="num3"]').removeClass('on');}
	if ($(this).attr('status') == 1) {$('#block205 a[type="lamp"][data="num3"]').addClass('on');}
});
ctrl(301,'toggler',2).on('click',function(){
	if ($(this).attr('status') == 0) {$('#block301 a[type="lamp"][data="num10"]').removeClass('on');}
});
ctrl(501,'toggler',1).on('click',function(){
	if ($(this).attr('status') == 0) {$('#block501 a[type="lamp"][data="num6"]').removeClass('on');}
});
ctrl(200,'toggler',1).on('click',function(){
	if ($(this).attr('status') == 0) {$('#block200 a[type="lamp"][data="num0"]').addClass('on');}
	if ($(this).attr('status') == 0) {$('#block200 a[type="lamp"][data="num0"]').removeClass('on');}
});
ctrl(999,'toggler',1).on('click',function(){
	if ($(this).attr('status') == 0) {$('#block999 a[type="lamp"][data="num0"]').addClass('on');}
	if ($(this).attr('status') == 1) {$('#block999 a[type="lamp"][data="num0"]').removeClass('on');}
});
ctrl(200,'knob',12).on('click',function(){
	if ($(this).attr('status') == 0) {$('#block200 a[type="lamp"][data="num2"]').removeClass('on');}
	if ($(this).attr('status') == 1) {$('#block200 a[type="lamp"][data="num2"]').removeClass('on');}
	if ($(this).attr('status') == 2) {$('#block200 a[type="lamp"][data="num2"]').addClass('on');}
});
ctrl(200,'knob',13).on('click',function(){
	if ($(this).attr('status') == 0) {$('#block200 a[type="lamp"][data="num3"]').removeClass('on');}
	if ($(this).attr('status') == 1) {$('#block200 a[type="lamp"][data="num3"]').removeClass('on');}
	if ($(this).attr('status') == 2) {$('#block200 a[type="lamp"][data="num3"]').addClass('on');}
});
ctrl(200,'knob',14).on('click',function(){
	if ($(this).attr('status') == 0) {$('#block200 a[type="lamp"][data="num4"]').removeClass('on');}
	if ($(this).attr('status') == 1) {$('#block200 a[type="lamp"][data="num4"]').removeClass('on');}
	if ($(this).attr('status') == 2) {$('#block200 a[type="lamp"][data="num4"]').addClass('on');}
});
ctrl(200,'knob',15).on('click',function(){
	if ($(this).attr('status') == 0) {$('#block200 a[type="lamp"][data="num5"]').removeClass('on');}
	if ($(this).attr('status') == 1) {$('#block200 a[type="lamp"][data="num5"]').removeClass('on');}
	if ($(this).attr('status') == 2) {$('#block200 a[type="lamp"][data="num5"]').addClass('on');}
});
ctrl(200,'knob',16).on('click',function(){
	if ($(this).attr('status') == 0) {$('#block200 a[type="lamp"][data="num6"]').removeClass('on');}
	if ($(this).attr('status') == 1) {$('#block200 a[type="lamp"][data="num6"]').removeClass('on');}
	if ($(this).attr('status') == 2) {$('#block200 a[type="lamp"][data="num6"]').addClass('on');}
});

$('#block7020').on('click',function() {
	$(this).fadeOut();
		$('[type="lamp"]').addClass('totaloff');
		$('.scale-holder').addClass('totaloff');
});

// ПОШЛИ УПРАЖНЕНИЯ
	$('#exercise1').on('click',function() {
			$('#block7020').fadeIn();
			defaultPositions(1,50,203,'rotator',0); // Среднее
			defaultPositions(2,50,203,'rotator',1);// Среднее
			defaultPositions(3,50,203,'rotator',2); // Среднее
			defaultPositions(3,1,702,'toggler',0); // ВЫКЛ
			defaultPositions(3,1,702,'toggler',0); // ВЫКЛ

			defaultPositions(4,1,205,'knob',2);
			defaultPositions(4,0,205,'knob',3);
			defaultPositions(4,6,205,'knob',4);
			defaultPositions(4,3,205,'knob',5);

			//defaultPositions(4,50,203,'rotator',3); // Среднее
			ctrl(203,'rotator',0).each(function(){
				$(this).children('input').attr('value','360');
			});
			ctrl(203,'rotator',1).each(function(){
				$(this).children('input').attr('value','360');
			});
			ctrl(203,'rotator',2).each(function(){
				$(this).children('input').attr('value','360');
			});
			/*	ctrl(203,'rotator',3).each(function(){
				$(this).children('input').attr('value','360');
			});*/
	 // START EXERCIZE 1 ALGORITHM
		$('#tester').on('click',function() {
			var f = false;
			do {
			/* объяснение значений функции pass 
				// Первая цифра — порядковый номер клика по .control
				// Вторая цифра — верное положение контрола
				// Третье число — номер родительского блока нужной кнопки
				// Четвертый параметр — название типа контрола
				// Пятое число — порядковый номер конкретного типа контрола в конкретном блоке. Считается слева-направо вниз построчно
			*/
			if(!pass(0,1,702,"toggler",0)) break;
			if(!pass(1,2,501,"knob",1)) break;
			if(!pass(2,1,501,"knob",2)) break;
			if(!pass(3,1,501,"toggler",5)) break;
			if(!pass(4,3,501,"knob",0)) break;
			if(!pass(5,1,501,"toggler",4)) break;
			if(!pass(6,7,201,"knob",0)) break;
			if(!pass(7,1,201,"toggler",3)) break;
			if(!pass(8,5,202,"knob",1)) break;
			if(!pass(9,4,202,"knob",0)) break;
			if(!pass(10,9,202,"rotator",7)) break;
			if(!pass(11,0,203,"eject",0)) break;
			if(!pass(12,0,2030,"toggler",0)) break;
			if(!pass(13,1,203,"toggler",3)) break;
			if(!pass(14,0,203,"toggler",2)) break;
			if(!pass(15,1,203,"knob",0)) break;
			//if(!pass(16,1,203,"knob",1)) break;
			//if(!pass(17,0,203,"rotator",0)) break;
			//if(!pass(18,0,203,"rotator",1)) break;
			//if(!pass(19,0,203,"rotator",2)) break;
			//if(!pass(20,1,203,"toggler",1)) break;
			//if(!pass(21,1,203,"toggler",4)) break;
			//if(!pass(22,50,203,"rotator",3)) break;
			//if(!pass(23,1,205,"knob",1)) break;
			//if(!pass(24,0,205,"eject",0)) break;
			//if(!pass(25,5,2050,"knob",0)) break;
			//if(!pass(26,6,2050,"knob",5)) break;
			//if(!pass(27,1,2050,"knob",12)) break;
			//if(!pass(28,1,2050,"knob",13)) break;
			//if(!pass(29,0,205,"toggler",0)) break;

			f = true;
			}
			while(false);

			if ((f) || (isTrain)) {
				exercisePassedSuccesfully();
			} else {
				exercisePassedUnSuccesfully();
			}
			//f ? alert('Упражнение выполнено верно!') : alert('Экзамен не сдан!');
		}); // END EXERCIZE 1 ALGORITHM

		// START EXERCIZE 1 HINTS
		$('a[data="coach-activator"]').on('click',function() {if (isTrain) {
			/* объяснение значений функции hinter 
				// Первая цифра — порядковый номер клика по .control
				// Вторая цифра — номер родительского блока нужной кнопки
				// Третий параметр — название типа контрола
				// Четвертый параметр — верное положение контрола. При нем срабатывает следующая подсказка
			*/
			hinterStart(7020,"toggler",0,"Проверьте, что питание отключено");
			hinterNextBlock(0,7020,"toggler",0,1, 501,"knob",1,"Установите переключатель ВЕНТ.ОТОПЛ. в положение ВЫКЛ");
			hinter(1,501,"knob",1,2, 501,"knob",2,"Установите переключатель ЗАГРАД. ОГНИ в положение АВТ");
			hinter(2,501,"knob",2,1, 501,"toggler",5,"Переключите тумблер СИГНАЛ в положение ВЫКЛ");
			hinter(3,501,"toggler",5,1, 501,"knob",0,"Установите переключатель НАПРЯЖЕНИЕ в положение ВЫКЛ");
			hinter(4,501,"knob",0,3, 501,"toggler",4,"Переключите тумблер ЗАДЕРЖКА 80...100С в положение ОТКЛ");
			hinterNextBlock(5,501,"toggler",4,1, 201,"knob",0,"Установите переключатель ПОДДИАПАЗОНЫ I-X руководствуясь таблицей 12 приложения. В данном случае - "+subBands1);
			hinter(6,201,"knob",0,subBands1-1, 201,"toggler",3,"Переключите тумблер АПК в положение ВЫКЛ");
			hinterNextBlock(7,201,"toggler",3,1, 202,"knob",1,"Установите переключатель ПОДДИАПАЗОНЫ руководствуясь таблицей 12 приложения. В данном случае - "+subBands2);
			hinter(8,202,"knob",1,subBands2-1, 202,"knob",0,"Установите переключатель КОНТРОЛЬ в положение НАЧ. УСТ.");
			hinter(9,202,"knob",0,4, 202,"rotator",7,"Выставьте значение ~9 на ручке СВЯЗЬ"); //!F надо посмотреть реальные пределы шкал и отображать реальные значения в окошке на приборе
			hinterNextBlock(10,202,"rotator",7,9, 203,"eject",0,"Извлеките блок П203 из стоек П200");
			hinterNextBlock(11,203,"eject",0,0, 2030,"toggler",0,"Переключите тумблер частоты модуляции в положение 400Гц");
			hinterNextBlock(12,2030,"toggler",0,0, 203,"toggler",3,"Переключите тумблер ПИТАНИЕ в положение ОТКЛ");
			hinter(13,203,"toggler",3,1, 203,"toggler",2,"Переключите тумблер ВЫБОР НАГРУЗКИ в положение АНТЕННА");
			hinter(14,203,"toggler",2,0, 203,"knob",0,"Установите переключатель УПРАВЛЕНИЕ в положение МЕСТНОЕ");
			hinter(15,203,"knob",0,1, 203,"knob",1,"Установите переключатель ВИДЫ РАБОТЫ в положение ПРИВОД II");
			hinter(16,203,"knob",1,1, 203,"rotator",0,"Установите потенциометр ГЛУБИНА МОДУЛЯЦИИ в крайнее левое положение");
			hinter(17,203,"rotator",0,0, 203,"rotator",1,"Установите потенциометр УРОВЕНЬ ВОЗБУЖДЕНИЯ в крайнее левое положение");
			hinter(18,203,"rotator",1,0, 203,"rotator",2,"Установите ручку потенциометра РЕГ АРУ в крайнее левое положение");
			hinter(19,203,"rotator",2,0, 203,"toggler",1,"Переключите тумблер АРУ в положение ОТКЛ");
			hinter(20,203,"toggler",1,1, 203,"toggler",4,"Установите тумблер БЛОКИРОВКА КЛЮЧА в положение ОТКЛ");
			hinter(21,203,"toggler",4,1, 203,"rotator",3,"Установите потенциометр КОМПЕНСАЦИЯ в среднее положение <span class=what>50</span>");
			hinterNextBlock(22,203,"rotator",3,50, 205,"knob",1,"Установите переключатель МЕСТН-ОТКЛ-ДИСТ в положение ОТКЛ");
			hinter(23,205,"knob",1,1, 205,"eject",0,"Извлеките блок П205 из стоек П200");
		var x = 0;
		if (letters == 2) {
			hinterNextBlock(24,205,"eject",0,0, 2050,"knob",0,"Установите I переключатель ПЕРВОЙ БУКВЫ в положение Д");
			hinter(25,2050,"knob",0,5, 2050,"knob",5,"Установите II переключатель ВТОРОЙ БУКВЫ в положение О");
			hinter(26,2050,"knob",5,6, 2050,"knob",12,"Установите переключатель ЦИКЛ СЕК в положение 30 ");
			hinter(27,2050,"knob",12,1, 2050,"knob",13,"Установите переключатель КОЛ-ВО БУКВ в положение 2");
			hinterNextBlock(28,2050,"knob",13,1, 205,"toggler",0,"Установите тумблер ВЫХОД ФОС в положение ОТКЛ");
			x=2;
		} else {
			hinterNextBlock(24,205,"eject",0,0, 2050,"knob",0,"Установите I переключатель ПЕРВОЙ БУКВЫ в положение Д");
			hinter(25,2050,"knob",0,5, 2050,"knob",12,"Установите переключатель ЦИКЛ СЕК в положение 30 ");
			hinterNextBlock(26,2050,"knob",12,1, 205,"toggler",0,"Установите тумблер ВЫХОД ФОС в положение ОТКЛ");
		}

		hinter(27+x,205,"toggler",0,0,	205, "knob", 2, "Установите в положение "+frequency.x1000);
		hinter(28+x,205,"knob",2,frequency.x1000,	205, "knob", 3, "Установите в положение "+frequency.x100);
		hinter(29+x,205,"knob",3,frequency.x100,	205, "knob", 4, "Установите в положение "+frequency.x10);
		hinter(30+x,205,"knob",4,frequency.x10,	205, "knob", 5, "Установите в положение "+frequency.x1);
		hinterEnd(31+x,205,"knob",5,frequency.x1);

		}}); // END EXERCIZE 1 HINTS
	}); // END EXERCIZE 1
	$('#exercise2').on('click',function() {
		// START EXERCIZE 2 ALGORITHM
		// default pos
			defaultPositions(1,2,501,'knob',1); // ВЫКЛ
			defaultPositions(2,1,501,'knob',2);// АВТ
			defaultPositions(3,1,501,'toggler',0); // ВЫКЛ
			defaultPositions(4,3,501,'knob',0); // ВЫКЛ
			defaultPositions(5,1,501,'toggler',1); // ОТКЛ

			defaultPositions(6,7,201,'knob',0); // VIII
			defaultPositions(7,1,201,'toggler',3); // ОТКЛ АПК

			defaultPositions(8,5,202,'knob',1); // VI
			defaultPositions(9,4,202,'knob',0); // НАЧ. УСТ.
			defaultPositions(10,2,202,'rotator',7); // НАЧ. УСТ.

			defaultPositions(12,0,2030,'toggler',0); // Включить 400 Гц

			defaultPositions(14,1,203,'toggle',3); // ОТКЛ
			defaultPositions(15,0,203,'toggle',2); // АНТЕННА
			defaultPositions(16,1,203,'knob',0); // МЕСТНОЕ
			defaultPositions(17,0,203,'knob',1); // ПРИВОД-I
			defaultPositions(18,0,203,'rotator',0); // Крайнее левое
			defaultPositions(19,0,203,'rotator',1); // Крайнее левое
			defaultPositions(20,0,203,'rotator',2); // Крайнее левое
			defaultPositions(21,1,203,'toggler',0); // ОТКЛ
			defaultPositions(22,1,203,'toggler',4); // ОТКЛ
			defaultPositions(23,1,203,'rotator',3); // Среднее положение

			defaultPositions(24,1,205,'knob',1); // ОТКЛ
			defaultPositions(25,0,205,'eject',0); // ОТКЛ

			defaultPositions(26,4,2050,'knob',0); // буква Д
			defaultPositions(27,6,2050,'knob',9); // буква О
			defaultPositions(28,1,2050,'knob',10); // 30 сек
			defaultPositions(29,1,2050,'knob',11); // Положение 2

			// дополнительно вручную 

			defaultPositions(000,1,203,'toggler',1);
			defaultPositions(000,0,203,'toggler',2);
			defaultPositions(000,1,203,'toggler',3);
			defaultPositions(000,1,203,'toggler',4);

			defaultPositions(000,1,702,'toggler',0); // ВЫКЛ ПИТАНИЕ
			defaultPositions(000,0,205,'toggler',0);

			ctrl(205,'lamp',0).removeClass('on');
			ctrl(205,'lamp',2).removeClass('on');
			$('.scale203 .arrow').css('-webkit-transform','rotate(-48deg)');
			$('.scale501 .arrow').css('-webkit-transform','rotate(-48deg)');
			$('.scale204-1 .arrow').css('-webkit-transform','rotate(-48deg)');
			$('.scale204-2 .arrow').css('-webkit-transform','rotate(-48deg)');

			ctrl(203,'lamp',1).addClass('totaloff');

			$('#block205 .scale205 .arrow').css('-webkit-transform','rotate(0deg)');

			ctrl(203,'rotator',1).on('click',function(){
			  	$('.scale204InBlock203').remove();
				$('body').append('<div class="scale204InBlock203 blockScale"></div>');
				$('.scale204-1').clone().appendTo($('.scale204InBlock203'));
			});	
			ctrl(203,'rotator',1).change(function(){
				if ($(this).attr('progress') == 11) {
			
					if ($(this).attr('status') == 60) { 
						$('.scale204-1 .arrow').css('-webkit-transform','rotate(10deg)');
					} 
					if ($(this).attr('status') == 40) {
						$('.scale204-1 .arrow').css('-webkit-transform','rotate(-4deg)');
					} 
					if ($(this).attr('status') == 30) { // Нужное конечное
						$('.scale204-1 .arrow').css('-webkit-transform','rotate(-9deg)');
					} 
					if ($(this).attr('status') == 75) { // Типа перебор
						$('.scale204-1 .arrow').css('-webkit-transform','rotate(-34deg)');
					} 
				} else {
					if ($(this).attr('status') == 10) {
						$('.scale204-1 .arrow').css('-webkit-transform','rotate(-47deg)');
					} 
					if ($(this).attr('status') == 40) { 
						$('.scale204-1 .arrow').css('-webkit-transform','rotate(-46deg)');
					} 
					if ($(this).attr('status') == 70) { // Нужное конечное
						$('.scale204-1 .arrow').css('-webkit-transform','rotate(-44deg)');
					} 
					if ($(this).attr('status') == 75) { // Типа перебор
						$('.scale204-1 .arrow').css('-webkit-transform','rotate(-43deg)');
					} 
					if ($(this).attr('status') == 80) { // Типа перебор
						$('.scale204-1 .arrow').css('-webkit-transform','rotate(-39deg)');
					} 
				}

					
				if ($(this).attr('status') == 10) {$('.scale203 .arrow').css('-webkit-transform','rotate(-42deg)');} 
				if ($(this).attr('status') == 20) {$('.scale203 .arrow').css('-webkit-transform','rotate(-38deg)');}
				if ($(this).attr('status') == 30) {$('.scale203 .arrow').css('-webkit-transform','rotate(-34deg)');} 
				if ($(this).attr('status') == 40) {$('.scale203 .arrow').css('-webkit-transform','rotate(-38deg)');}
				if ($(this).attr('status') == 50) {$('.scale203 .arrow').css('-webkit-transform','rotate(-23deg)');} 
				if ($(this).attr('status') == 60) {$('.scale203 .arrow').css('-webkit-transform','rotate(-18deg)');}
				if ($(this).attr('status') == 70) {$('.scale203 .arrow').css('-webkit-transform','rotate(-12deg)');}
			});
			ctrl(202,'rotator',6).on('click',function(){
			  	$('.scale203InBlock201').remove();
				$('body').append('<div class="scale203InBlock201 blockScale"></div>');
				$('.scale203').clone().appendTo($('.scale203InBlock201'));
			  });
			ctrl(202,'rotator',6).change(function(){
				/*if ($(this).attr('status') == 15) { 
					$('.scale203 .arrow').css('-webkit-transform','rotate(-20deg)');
				} 
				if ($(this).attr('status') == 20) { 
					$('.scale203 .arrow').css('-webkit-transform','rotate(-15deg)');
				} 
				if ($(this).attr('status') == 25) {
					$('.scale203 .arrow').css('-webkit-transform','rotate(-10deg)');
				} */
				if ($(this).attr('status') == 5) { // Нужное конечное
					$('.scale203 .arrow').css('-webkit-transform','rotate(-2deg)');
				} 
				if ($(this).attr('status') == 6) { 
					$('.scale203 .arrow').css('-webkit-transform','rotate(-10deg)');
				} 
				if ($(this).attr('status') == 7) { 
					$('.scale203 .arrow').css('-webkit-transform','rotate(-15deg)');
				} 
				if ($(this).attr('status') == 8) { 
					$('.scale203 .arrow').css('-webkit-transform','rotate(-20deg)');
				} 
			});
/*
			$('.uncontrol').mouseup(function(){
				if (ctrl(201,'rotator',3).attr('status') == 9) { 
					$('.scale203 .arrow').css('-webkit-transform','rotate(-15deg)');
				} 
				if (ctrl(201,'rotator',3).attr('status') == 3) { 
					$('.scale203 .arrow').css('-webkit-transform','rotate(45deg)');
					$('.scale201 .arrow').css('-webkit-transform','rotate(-47deg)'); // Ток антенны
				} 
				if (ctrl(201,'rotator',3).attr('status') == 12) { 
					$('.scale203 .arrow').css('-webkit-transform','rotate(24deg)');
					$('.scale201 .arrow').css('-webkit-transform','rotate(0deg)'); // Ток антенны
				} 
				if (ctrl(201,'rotator',3).attr('status') == 11) { 
					$('.scale201 .arrow').css('-webkit-transform','rotate(-3deg)'); // Ток антенны
				} 
				if (ctrl(201,'rotator',3).attr('status') == 13) { 
					$('.scale201 .arrow').css('-webkit-transform','rotate(-3deg)'); // Ток антенны
				} 
			});
*/
			$('.uncontrol').on('click',function(){
			  	$('.scale203InBlock201').remove();
				$('body').append('<div class="scale203InBlock201 blockScale"></div>');
				$('.scale203').clone().appendTo($('.scale203InBlock201'));
			 });
			$('#block201 .control[type="toggler"][data="num3"][progress="18"]').on('click',function(){
				$('.scale201 .arrow').css('-webkit-transform','rotate(0deg)'); // Ток антенны
			});
			$('#block201 .control[type="toggler"][data="num3"][progress="20"]').on('click',function(){
				$('.scale201 .arrow').css('-webkit-transform','rotate(0deg)'); // Ток антенны
			}); 
			ctrl(203,"toggler",1).on('click',function(){
				$('.scale203 .arrow').css('-webkit-transform','rotate(9deg)'); // Режим усиления мощности
				$('.scale204-1 .arrow').css('-webkit-transform','rotate(-9deg)'); // Режим усиления мощности
			  	$('.scale204InBlock203').remove();
				$('body').append('<div class="scale204InBlock203 blockScale"></div>');
				$('.scale204-1').clone().appendTo($('.scale204InBlock203'));
			});

			ctrl(203,'rotator',2).change(function(){
				if ($(this).attr('status') == 70) { // Нужное конечное
					$('.scale203 .arrow').css('-webkit-transform','rotate(24deg)');
				} 
			});
			ctrl(203,'rotator',1).change(function(){
				if ($(this).attr('status') == 30) { // Нужное конечное
					ctrl(202,'lamp',1).addClass('on');
				} 
			});
			ctrl(203,'rotator',1).change(function(){
				if ($(this).attr('status') == 12) { // Нужное конечное
					$('.scale202 .arrow').css('-webkit-transform','rotate(-20deg)');
				} 
			});
			ctrl(202,'toggler',0).on('click',function(){
					ctrl(202,'lamp',1).removeClass('on');
			});

			ctrl(501,'knob',0).on('click',function(){
				if ($(this).attr('status') == 3) {
					$('.scale501 .arrow').css('-webkit-transform','rotate(-48deg)');
				}
				if ($(this).attr('status') == 4) {
					$('.scale501 .arrow').css('-webkit-transform','rotate(-28deg)');
				}
				if ($(this).attr('status') == 5) {
					$('.scale501 .arrow').css('-webkit-transform','rotate(-29deg)');
				}
				if ($(this).attr('status') == 6) {
					$('.scale501 .arrow').css('-webkit-transform','rotate(-27deg)');
				}
			});
			$('#close').on('click',function(){
			  	 $('.scale203InBlock201').remove();
			  	 $('.scale204InBlock203').remove();
			});

		// default pos end
		$('#tester').on('click',function() {
			var f = false;
			do {
			/* объяснение значений функции pass 
				// Первая цифра — порядковый номер клика по .control
				// Вторая цифра — верное положение контрола
				// Третье число — номер родительского блока нужной кнопки
				// Четвертый параметр — название типа контрола
				// Пятое число — порядковый номер конкретного типа контрола в конкретном блоке. Считается слева-направо вниз построчно
			*/
			if(!pass(0,1,501,"toggler",4)) break;
			//if(!pass(1,0,205,"knob",1)) break;
			//if(!pass(2,0,203,"toggler",3)) break;
			//if(!pass(3,0,702,"toggler",0)) break;
			if(!pass(4,0,501,"knob",3)) break;
			if(!pass(5,0,501,"toggler",0)) break;
			//if(!pass(6,1,205,"toggler",0)) break;
			if(!pass(7,9,205,"knob",0)) break;
			//if(!pass(8,70,203,"rotator",1)) break;
			if(!pass(9,5,202,"rotator",6)) break;
			//if(!pass(10,5,202,"rotator",7)) break;
			//if(!pass(11,9,201,"rotator",3)) break;
			//if(!pass(12,30,203,"rotator",1)) break;
			//if(!pass(13,9,201,"rotator",3)) break; /// промежуточное 4
			if(!pass(14,1,202,"toggler",0)) break;
			//if(!pass(15,12,201,"rotator",3)) break;
			if(!pass(16,50,202,"rotator",3)) break;
			if(!pass(17,50,202,"rotator",4)) break;
			//if(!pass(18,0,202,"knob",0)) break;//
			//if(!pass(19,1,201,"toggler",3)) break;//
			//if(!pass(20,11,201,"rotator",3)) break; //
			//if(!pass(21,1,201,"toggler",3)) break; //
			if(!pass(22,13,201,"rotator",3)) break;
			if(!pass(23,1,201,"toggler",3)) break;
			//if(!pass(24,0,203,"toggler",1)) break; //
			//if(!pass(25,70,203,"rotator",2)) break; //
			//if(!pass(26,0,203,"toggler",1)) break; //
			if(!pass(27,0,501,"toggler",1)) break;
			if(!pass(28,1,702,"toggler",0)) break;
			if(!pass(29,4,202,"knob",0)) break;
			if(!pass(30,9,202,"rotator",7)) break;
			if(!pass(31,1,203,"toggler",3)) break;
			if(!pass(32,0,203,"rotator",1)) break;
			if(!pass(33,0,203,"rotator",2)) break;
			if(!pass(34,1,203,"toggler",1)) break; //
			if(!pass(35,1,205,"knob",1)) break;
			if(!pass(36,0,205,"toggler",0)) break;

			f = true;
			}
			while(false);
			if ((f) || (isTrain)) {
				exercisePassedSuccesfully();
			} else {
				exercisePassedUnSuccesfully();
			}
			//f ? alert('Упражнение выполнено верно!') : alert('Экзамен не сдан!');
		}); // END EXERCIZE 2  ALGORITHM

		// START EXERCIZE 2 HINTS
		$('a[data="coach-activator"]').on('click',function() {if (isTrain) {
			/* объяснение значений функции hinter 
				// Первая цифра — порядковый номер клика по .control
				// Вторая цифра — номер родительского блока нужной кнопки
				// Третий параметр — название типа контрола
				// Четвертый параметр — верное положение контрола. При нем срабатывает следующая подсказка
			*/
			hinterStart(501,"toggler",4,'Переключите тумблер ЗАДРЕЖКА 80..100С в положение ВЫКЛ');
			hinterNextBlock(0,501,"toggler",4,1, 205,"knob",1,"Установите переключатель МЕСТН-ОТКЛ-ДИСТ в положение МЕСТН");
			hinterNextBlock(1,205,"knob",1,0, 203,"toggler",3,"Переключите тумблер ПИТАНИЕ в положение ВКЛ");
			hinterNextBlock(2,203,"toggler",3,0, 702,"toggler",0,"Включите сеть на блоке П702");
			hinterNextBlock(3,702,"toggler",0,0,	501,"knob",0,"Проверьте напряжение в сети, переключая ручку в положения <b>А-В</b>, <b>А-С</b>, <b>В-С</b> <b>[СТАБ]</b>. Напряжение должно быть в районе 220V. Затем необходимо вернуть ручку в положение <b>ВЫКЛ.</b>")
			hinter(4,501,"knob",0,3, 501,"toggler",0,"Нажмите кнопку ПЕРЕДАТЧИК-I ВКЛ");

			hinterNextBlock(5,501,"toggler",0,0, 205,"toggler",0,"Переключите тумблер ВЫХОД ФОС в положение ВКЛ");
			hinter(6,205,"toggler",0,1, 205,"knob",0,"Поочередно устанавливайте ручку КОНТРОЛЬ в каждое из положений от -12,6В до КОНТРОЛЬ ОГ, следя за показанием амперметра. Они должны быть в пределах -20-25 и +20+25");
			hinterNextBlock(7,205,"knob",0,9, 203,"rotator",1,"Медленно вращая потенциометр УРОВЕНЬ ВОЗБУЖДЕНИЯ добейтесь, чтобы ТОК НАГРУЗКИ по прибору на блоке П205 не превысил 2А <span class='what'>70</span>");
			hinterNextBlock(8,203,"rotator",1,70, 202,"rotator",6,"Медленным вращением ручки вариометра НАСТРОЙКА ПРОМЕЖУТОЧНОГО КОНТУРА добейстесь максимального отклонения стрелки прибора РЕЖИМ УСИЛ. МОЩН на блоке П203 <span class='what'>(5)</span>");
			hinter(9,202,"rotator",6,5, 202,"rotator",7,"Установите ручку СВЯЗЬ в положение <span class='what'>~5</span>");
			hinterNextBlock(10,202,"rotator",7,5, 201,"rotator",3,"Настройте антенный контур кнопками НАСТРОЙКА ПОДДИАПАЗОНОВ I-X по максимальному отклонению стрелки прибора РЕЖИМ УСИЛ. МОЩНОСТИ на блоке П203. <span class='what'>9</span> <b>После завершения настройки, пожалуйста, кликните по стрелке Шкалы настройки</b>");
			hinterNextBlock(11,201,"rotator",3,9, 203,"rotator",1,"Медленно вращая потенциометр УРОВЕНЬ ВОЗБУЖДЕНИЯ добейтесь, чтобы ТОК НАГРУЗКИ по прибору на блоке П205 не превысил 10А <span class='what'>30</span>");
			hinterNextBlock(12,203,"rotator",1,30, 201,"rotator",3,"Кратковременно нажимая кнопки НАСТРОЙКА ПОДДИАПАЗОНОВ I-X, установите режим усилителя мощности по прибору блока П203 в пределах 180-200 мкА <span class='what'>3</span>, а затем верните в первоначальное состояние <span class='what'>9</span>. <b>По завершении настройки нажмите на стрелку 'Шкалы настройки'");
			hinterNextBlock(13,201,"rotator",3,9, 202,"toggler",0,"Нажмите кнопку СБРОС");
			hinterNextBlock(14,202,"toggler",0,1, 201,"rotator",3,"С помощью кнопок НАСТРОЙКА ПОДДИАПАЗОНОВ I-X добейстесь показания 150 мкА на приборе РЕЖИМ УСИЛ. МОЩН. блока П203. Затем проверьте ток в антенне: он должен быть не менее указанного в таблице приложения 13. В данном случае — ~5А. <span class='what'>12</span>. <b>По завершении настройки, нажмите на стрелку 'Шкалы настройки'.");
			hinterNextBlock(15,201,"rotator",3,12, 202,"rotator",3,"Установите потенциометр УСТ. НУЛЯ в среднее положение <span class='what'>50</span>");
			hinter(16,202,"rotator",3,50, 202,"rotator",4,"Установите потенциометр БАЛАНС в среднее положение <span class='what'>50</span>");
			hinter(17,202,"rotator",4,50, 202,"knob",0,"Установите переключатель КОНТРОЛЬ в положение '0' АПК '+'");
			hinterNextBlock(18,202,"knob",0,0, 201,"toggler",3,"Переключите тумблер АПК в положение ВКЛ, при этом показания прибора ТОК АНТЕННЫ не должны измениться. Затем верните в положение ОТКЛ.");
			hinter(19,201,"toggler",3,1, 201,"rotator",3,"<b>Левой</b> кнопкой НАСТРОЙКА ПОДДИАПАЗОНОВ I-X расстройте антенный контур в направлении против часовой стрели так, чтобы ток в антенне уменьшился на величину не более 10% от первоначального уровня. <span class='what'>11</span>. <b>После установки в нужное положение, кликните на стрелку Шкалы настройки.</b>");
			hinter(20,201,"rotator",3,11, 201,"toggler",3,"Установите тумблер АПК в положение ВКЛ, при этом настройка антенного контура и ток в антенне по прибору ТОК АНТЕННЫ в блоке П201 должны установится до первоначального положения. Затем установите в положение ОТКЛ");
			hinter(21,201,"toggler",3,1, 201,"rotator",3,"<b>Правой</b> кнопкой НАСТРОЙКА ПОДДИАПАЗОНОВ I-X расстройте антенный контур в направлении по часовой стрелке до уменьшения тока в антенне на величину не более 10% от первоначального уровня и увеличения уровня возбуждения не более чем на 30мкА <span class='what'>13</span>. <b>После установки в нужное положение, кликните на стрелку Шкалы настройки.</b>");
			hinter(22,201,"rotator",3,13, 201,"toggler",3,"Включите тумблер АПК. Уровень возбуждения, настройка антенного контура и величина тока в антенне должны установиться до первоначального значения. Затем выключите тумблер");
			hinterNextBlock(23,201,"toggler",3,1, 203,"toggler",1,"Переключите тумблер АРУ в положение ВКЛ");
			hinter(24,203,"toggler",1,0, 203,"rotator",2,"Ручкой потенциометра РЕГ АРУ установите ТОК НАГРУЗКИ по прибору блока П204 и уровнь возбуждения по прибору блока П203 до первоначального значения <span class=what>70</span>");
			hinter(25,203,"rotator",2,70, 203,"toggler",1,"Выключите и включите тумблер АРУ и убедитесь, что показания приборов ТОК НАГРУЗКИ в блоке П204 и РЕЖИМ. УСИЛ. МОЩН. в блоке П203 не меняются");
			hinterNextBlock(26,203,"toggler",1,0, 501,"toggler",1,"Выключите П200 нажадием кнопки ПЕРЕДАТЧИК I ОТКЛ");
			hinterNextBlock(27,501,"toggler",1,0, 702,"toggler",0,"Отключите питание на блоке П702");
			hinterNextBlock(28,702,"toggler",0,1, 202,"knob",0,"Установите переключатель КОНТРОЛЬ в положение НАЧ. УСТ.");
			hinter(29,202,"knob",0,4, 202,"rotator",7,"Установите ручку СВЯЗЬ в положение 9");
			hinterNextBlock(30,202,"rotator",7,9, 203,"toggler",3,"Переключите тумблер ПИТАНИЕ в положение ОТКЛ");
			hinter(31,203,"toggler",3,1, 203,"rotator",1,"Установите потенциометр УРОВЕНЬ ВОЗБУЖДЕНИЯ в крайнее левое положение");
			hinter(32,203,"rotator",1,0, 203,"rotator",2,"Установите потенциометр РЕГ АРУ в крайнее левое положение");
			hinter(33,203,"rotator",2,0, 203,"toggler",1,"Переключите тумблер АРУ в положение ОТКЛ");
			hinterNextBlock(34,203,"toggler",1,1, 205,"knob",1,"Установите переключатель МЕСТН-ОТКЛ-ДИСТ в положение ОТКЛ");
			hinter(35,205,"knob",1,1, 205,"toggler",0,"Переключите тумблер ВЫХОД ФОС в положение ОТКЛ");
			hinterEnd(36,205,"toggler",0,0);
			
		}}); // END EXERCIZE 2 HINTS
	}); // END EXERCIZE 2
	$('#exercise2-1').on('click',function() {
		// START EXERCIZE 2-1 ALGORITHM
		// default pos
			defaultPositions(1,2,501,'knob',1); // ВЫКЛ
			defaultPositions(2,1,501,'knob',2);// АВТ
			defaultPositions(3,1,501,'toggler',0); // ВЫКЛ
			defaultPositions(4,3,501,'knob',0); // ВЫКЛ
			defaultPositions(5,1,501,'toggler',1); // ОТКЛ

			defaultPositions(6,7,201,'knob',0); // VIII
			defaultPositions(7,1,201,'toggler',0); // ОТКЛ АПК

			defaultPositions(8,5,202,'knob',1); // VI
			defaultPositions(9,4,202,'knob',0); // НАЧ. УСТ.
			defaultPositions(10,2,202,'rotator',7); // НАЧ. УСТ.

			defaultPositions(12,0,2030,'toggler',0); // Включить 400 Гц

			defaultPositions(14,1,203,'toggle',3); // ОТКЛ
			defaultPositions(15,0,203,'toggle',2); // АНТЕННА
			defaultPositions(16,1,203,'knob',0); // МЕСТНОЕ
			defaultPositions(17,0,203,'knob',1); // ПРИВОД-I
			defaultPositions(18,0,203,'rotator',0); // Крайнее левое
			defaultPositions(19,0,203,'rotator',1); // Крайнее левое
			defaultPositions(20,0,203,'rotator',2); // Крайнее левое
			defaultPositions(21,1,203,'toggler',0); // ОТКЛ
			//defaultPositions(22,0,203,'toggler',4); // ОТКЛ
			defaultPositions(23,1,203,'rotator',3); // Среднее положение

			defaultPositions(24,1,205,'knob',1); // ОТКЛ
			defaultPositions(25,0,205,'eject',0); // ОТКЛ

			defaultPositions(26,4,2050,'knob',0); // буква Д
			defaultPositions(27,6,2050,'knob',9); // буква О
			defaultPositions(28,1,2050,'knob',10); // 30 сек
			defaultPositions(29,1,2050,'knob',11); // Положение 2

			// дополнительно вручную 

			defaultPositions(000,1,203,'toggler',1);
			defaultPositions(000,0,203,'toggler',2);
			defaultPositions(000,0,203,'toggler',3);
			defaultPositions(000,0,203,'toggler',4); // т.к. просят проверить, то мы просто сделаем переключить 
			defaultPositions(000,0,205,'toggler',0);
			ctrl(205,'lamp',0).addClass('on');
			ctrl(205,'lamp',2).addClass('on');
			ctrl(203,'lamp',1).addClass('on');
			ctrl(301,'lamp',6).addClass('on');
			defaultPositions(000,1,203,"knob",0);
			defaultPositions(000,0,203,"knob",1);
			defaultPositions(000,0,203,"toggler",1);
			defaultPositions(000,1,501,"toggler",0);
			defaultPositions(000,3,501,"knob",0);
			defaultPositions(000,1,501,"toggler",4);
			defaultPositions(000,1,501,"toggler",5);
			defaultPositions(000,2,501,"knob",1);
			defaultPositions(000,1,501,"knob",2);
			defaultPositions(000,9,205,"knob",0);
			defaultPositions(000,1,205,"toggler",0);
			defaultPositions(000,1,301,"knob",1);
			defaultPositions(000,1,301,"knob",2);
			defaultPositions(000,1,301,"knob",3);
			defaultPositions(000,0,301,"toggler",0);
			defaultPositions(000,7,201,"knob",0);
			defaultPositions(000,9,205,"knob",0);
			defaultPositions(000,0,205,"knob",1);
			$('.scale201 .arrow').css('-webkit-transform','rotate(-48deg)');

			$('a[rel="telegraph"').mousedown(function(){
				$('.scale201 .arrow').css('-webkit-transform','rotate(-8deg)');
			});
			$('a[rel="telegraph"').mouseup(function(){
				$('.scale201 .arrow').css('-webkit-transform','rotate(-48deg)');
			});
		// default pos end
			$('#tester').on('click',function() {
				var f = false;
				do {
				/* объяснение значений функции pass 
					// Первая цифра — порядковый номер клика по .control
					// Вторая цифра — верное положение контрола
					// Третье число — номер родительского блока нужной кнопки
					// Четвертый параметр — название типа контрола
					// Пятое число — порядковый номер конкретного типа контрола в конкретном блоке. Считается слева-направо вниз построчно
				*/
				if(!pass(0,3,203,'knob',1)) break;
				if(!pass(1,1,203,'toggler',4)) break; // Проверим ОТКЛ
				if(!pass(2,1,203,'toggler',5)) break; // Вставляем КЛЮЧ
				if(!pass(3,1,201,'toggler',4)) break; // Телеграфируем
			

				f = true;
				}
				while(false);
				if ((f) || (isTrain)) {
					exercisePassedSuccesfully();
				} else {
					exercisePassedUnSuccesfully();
				}
				//f ? alert('Упражнение выполнено верно!') : alert('Экзамен не сдан!');
			}); // END EXERCIZE 2-1 ALGORITHM

			// START EXERCIZE 2-1 HINTS
			$('a[data="coach-activator"]').on('click',function() {if (isTrain) {
				/* объяснение значений функции hinter 
					// Первая цифра — порядковый номер клика по .control
					// Вторая цифра — номер родительского блока нужной кнопки
					// Третий параметр — название типа контрола
					// Четвертый параметр — верное положение контрола. При нем срабатывает следующая подсказка
				*/
				hinterStart(203,'knob',1,'Установите переключатель ВИДЫ РАБОТЫ в положение ТЛГ.');
				hinter(0,203,'knob',1,3,			203,'toggler',4,'Проверьте, что тумблер БЛОКИРОВКА КЛЮЧА находится в положении ОТКЛ, иначе — переключите его');
				hinter(1,203,'toggler',4,1,			203,'toggler',5,'Вставьте штекер телеграфного ключа в разъем КЛЮЧ');
				//
				hinterNextBlock(2,203,'toggler',5,1,201,'toggler',4,'Нажмите на телеграфный ключ. При нажатии телеграфного ключа ток нагрузки по прибору на П204 должен быть 20А, а ток в антенном контуре на П201 должен быть не менее значения, указанного в таблице прил. 13');
				hinterEnd(3,201,'toggler',4,1);
				
			}}); // END EXERCIZE 2-1 HINTS
	}); // END EXERCIZE 2-1

	

	$('#exercise2-2').on('click',function() {
		// START EXERCIZE 2-2 ALGORITHM
		// default pos
			defaultPositions(1,2,501,'knob',1); // ВЫКЛ
			defaultPositions(2,1,501,'knob',2);// АВТ
			defaultPositions(3,1,501,'toggler',0); // ВЫКЛ
			defaultPositions(4,3,501,'knob',0); // ВЫКЛ
			defaultPositions(5,1,501,'toggler',1); // ОТКЛ

			defaultPositions(6,7,201,'knob',0); // VIII
			defaultPositions(7,1,201,'toggler',0); // ОТКЛ АПК

			defaultPositions(8,5,202,'knob',1); // VI
			defaultPositions(9,4,202,'knob',0); // НАЧ. УСТ.
			defaultPositions(10,2,202,'rotator',7); // НАЧ. УСТ.

			defaultPositions(12,0,2030,'toggler',0); // Включить 400 Гц

			defaultPositions(14,1,203,'toggle',3); // ОТКЛ
			defaultPositions(15,0,203,'toggle',2); // АНТЕННА
			defaultPositions(16,1,203,'knob',0); // МЕСТНОЕ
			defaultPositions(17,0,203,'knob',1); // ПРИВОД-I
			defaultPositions(18,0,203,'rotator',0); // Крайнее левое
			defaultPositions(19,0,203,'rotator',1); // Крайнее левое
			defaultPositions(20,0,203,'rotator',2); // Крайнее левое
			defaultPositions(21,1,203,'toggler',0); // ОТКЛ
			defaultPositions(22,1,203,'toggler',4); // ОТКЛ
			defaultPositions(23,1,203,'rotator',3); // Среднее положение

			defaultPositions(24,1,205,'knob',1); // ОТКЛ
			defaultPositions(25,0,205,'eject',0); // ОТКЛ

			defaultPositions(26,4,2050,'knob',0); // буква Д
			defaultPositions(27,6,2050,'knob',9); // буква О
			defaultPositions(28,1,2050,'knob',10); // 30 сек
			defaultPositions(29,1,2050,'knob',11); // Положение 2

			// дополнительно вручную 

			defaultPositions(000,0,203,'toggler',1);
			defaultPositions(000,0,203,'toggler',2);
			defaultPositions(000,0,203,'toggler',3);
			defaultPositions(000,0,203,'toggler',4);

			lamp(205,0,'on');
			lamp(205,0,'on');
			lamp(205,2,'on');
			lamp(205,3,'on');

			lamp(203,1,'on');

			ctrl(202,'knob',0).on('click',function(){
				if ($(this).attr('status') == 0) { $('.scale202 .arrow').css('-webkit-transform','rotate(-20deg)')}
				if ($(this).attr('status') == 1) { $('.scale202 .arrow').css('-webkit-transform','rotate(-23deg)')}
				if ($(this).attr('status') == 2) { $('.scale202 .arrow').css('-webkit-transform','rotate(6deg)')}
				if ($(this).attr('status') == 3) { $('.scale202 .arrow').css('-webkit-transform','rotate(-24deg)')}
				if ($(this).attr('status') == 4) { $('.scale202 .arrow').css('-webkit-transform','rotate(41deg)')}
			});

			ctrl(203,'rotator',0).change(function(){
				if ($(this).attr('status') == 5) { $('.scale203 .arrow').css('-webkit-transform','rotate(32deg)')} // Промежуточные
				if ($(this).attr('status') == 20) { $('.scale203 .arrow').css('-webkit-transform','rotate(10deg)')} // Промежуточные
				if ($(this).attr('status') == 40) { $('.scale203 .arrow').css('-webkit-transform','rotate(2deg)')} // Промежуточные
				if ($(this).attr('status') == 60) { $('.scale203 .arrow').css('-webkit-transform','rotate(-8deg)')} // Промежуточные
				if ($(this).attr('status') == 80) { $('.scale203 .arrow').css('-webkit-transform','rotate(-21deg)')} // Нужное конечное
			});
			ctrl(202,'rotator',0).change(function(){
				if ($(this).attr('status') == 5) { $('.scale202 .arrow').css('-webkit-transform','rotate(29deg)')} // Нужное начальное
				if ($(this).attr('status') == 35) { $('.scale202 .arrow').css('-webkit-transform','rotate(-6deg)')} // Нужное конечное
			});
			ctrl(202,'rotator',1).change(function(){
				if ($(this).attr('status') == 20) { $('.scale202 .arrow').css('-webkit-transform','rotate(29deg)')} // Промежуточное
				if ($(this).attr('status') == 55) { $('.scale202 .arrow').css('-webkit-transform','rotate(41deg)')} // Нужное конечное
			});


			ctrl(203,'toggler',1).on('click',function(){
				if ($(this).attr('progress') == 6) {
					$('.scale203 .arrow').css('-webkit-transform','rotate(-24deg)'); // Ток антенны
				}
			});

			ctrl(203,'rotator',3).change(function(){
				if ($(this).attr('status') == 30) { $('.scale203 .arrow').css('-webkit-transform','rotate(-21deg)')} // Нужное конечное
			});
		// default pos end
			$('#tester').on('click',function() {
				var f = false;
				do {
				/* объяснение значений функции pass 
					// Первая цифра — порядковый номер клика по .control
					// Вторая цифра — верное положение контрола
					// Третье число — номер родительского блока нужной кнопки
					// Четвертый параметр — название типа контрола
					// Пятое число — порядковый номер конкретного типа контрола в конкретном блоке. Считается слева-направо вниз построчно
				*/
				if(!pass(0,1,201,"toggler",5)) break;
				if(!pass(1,80,203,"rotator",0)) break;
				if(!pass(2,35,202,"rotator",0)) break;
				if(!pass(3,55,202,"rotator",1)) break;
				//if(!pass(4,0,205,"toggler",0)) break;
			//	if(!pass(5,2,202,"knob",0)) break;
				//if(!pass(6,0,203,"toggler",1)) break;
				if(!pass(7,30,203,"rotator",3)) break;
				if(!pass(8,0,203,"toggler",1)) break;
				if(!pass(9,1,202,"toggler",1)) break;
				if(!pass(10,1,205,"toggler",0)) break;
			

				f = true;
				}
				while(false);
				if ((f) || (isTrain)) {
					exercisePassedSuccesfully();
				} else {
					exercisePassedUnSuccesfully();
				}
				//f ? alert('Упражнение выполнено верно!') : alert('Экзамен не сдан!');
			}); // END EXERCIZE 2-2 ALGORITHM

			// START EXERCIZE 2-2 HINTS
			$('a[data="coach-activator"]').on('click',function() {if (isTrain) {
				/* объяснение значений функции hinter 
					// Первая цифра — порядковый номер клика по .control
					// Вторая цифра — номер родительского блока нужной кнопки
					// Третий параметр — название типа контрола
					// Четвертый параметр — верное положение контрола. При нем срабатывает следующая подсказка
				*/
				hinterStart(201,"toggler",5,"Подключите осциллограф к гнезду КОНТРОЛЬ ТОКА АНТЕННЫ");
				hinterNextBlock(0,201,"toggler",5,1, 203,"rotator",0,"Установите ручку ГЛУБИНА МОДУЛЯЦИИ примерно на 80%. Произведите отсчет коэффициента глубины модуляции по прибору КОНТРОЛЬ на П202 согласно методике п. 6.3.1 и по осцилографу согласно методике п. 6.3.3");
				hinterNextBlock(1,203,"rotator",0,80, 202,"rotator",0,"В паузе между опознавательными сигналами, т.е. при отсутствии модуляции, с помощью потенциометров НАЧ. УСТ. и УСТ. УРОВНЯ установите стрелку прибора на отметку шкалы в соответствии с таблицей 5. В данном случае 92мА <span class=what>35</span>");
				hinter(2,202,"rotator",0,35, 202,"rotator",1,"В паузе между опознавательными сигналами, т.е. при отсутствии модуляции, с помощью потенциометров НАЧ. УСТ. и УСТ. УРОВНЯ установите стрелку прибора на отметку шкалы в соответствии с таблицей 5. В данном случае 92мА <span class=what>55</span>");
				hinterNextBlock(3,202,"rotator",1,55, 205,"toggler",0,"Переключите тумблер ВЫХОД ФОС в положение ОТКЛ");
				hinterNextBlock(4,205,"toggler",0,0, 202,"knob",0,"Произведите измерение коэффициента глубины модуляции, поочередно устанавливая переключатель КОНТРОЛЬ в положение М вниз и М вверх. Коэффициент глубины модуляции равен сумме этих значений.");
				hinterNextBlock(5,202,"knob",0,2, 203,"toggler",1,"Переключите тублер АРУ в положение ОТКЛ и замерьте показания прибора РЕЖИМ УСИЛ. МОЩН. Затем верните тумблер в положение ВКЛ, при этом показания прибора РЕЖИМ УСИЛ. МОЩН. могут измениться");
				hinter(6,203,"toggler",1,0, 203,"rotator",3,"Установите потенциометр КОМПЕНСАЦИЯ в то положение, в котором прибора РЕЖИМ. УСИЛ. МОЩН. показывал бы такое же значение, что и с выключенным АРУ <span class=what>30</span>");
				hinter(7,203,"rotator",3,30, 203,"toggler",1,"Включите и выключите тумблер АРУ. Показания прибора РЕЖИМ. УСИЛ. МОЩН. не должны измениться");
				hinterNextBlock(8,203,"toggler",1,0, 202,"toggler",1,"Подключите головной телефон к гнезду ТЕЛЕФОН");
				hinterNextBlock(9,202,"toggler",1,1, 205,"toggler",0,"Установите тумблер ВЫХОД ФОС в положение ВКЛ");
				hinterEnd(10,205,"toggler",0,1);
				
			}}); // END EXERCIZE 2-2 HINTS
	}); // END EXERCIZE 2-2 

	$('#exercise2-3').on('click',function() {
		// START EXERCIZE 2-3 ALGORITHM
		// default pos
			defaultPositions(1,2,501,'knob',1); // ВЫКЛ
			defaultPositions(2,1,501,'knob',2);// АВТ
			defaultPositions(3,1,501,'toggler',0); // ВЫКЛ
			defaultPositions(4,3,501,'knob',0); // ВЫКЛ
			defaultPositions(5,1,501,'toggler',1); // ОТКЛ

			defaultPositions(6,7,201,'knob',0); // VIII
			defaultPositions(7,1,201,'toggler',0); // ОТКЛ АПК

			defaultPositions(8,5,202,'knob',1); // VI
			defaultPositions(9,4,202,'knob',0); // НАЧ. УСТ.
			defaultPositions(10,2,202,'rotator',7); // НАЧ. УСТ.

			defaultPositions(12,0,2030,'toggler',0); // Включить 400 Гц

			defaultPositions(14,1,203,'toggle',3); // ОТКЛ
			defaultPositions(15,0,203,'toggle',2); // АНТЕННА
			defaultPositions(16,1,203,'knob',0); // МЕСТНОЕ
			defaultPositions(17,0,203,'knob',1); // ПРИВОД-I
			defaultPositions(18,0,203,'rotator',0); // Крайнее левое
			defaultPositions(19,0,203,'rotator',1); // Крайнее левое
			defaultPositions(20,0,203,'rotator',2); // Крайнее левое
			defaultPositions(21,1,203,'toggler',0); // ОТКЛ
			defaultPositions(22,1,203,'toggler',4); // ОТКЛ
			defaultPositions(23,1,203,'rotator',3); // Среднее положение

			defaultPositions(24,1,205,'knob',1); // ОТКЛ
			defaultPositions(25,0,205,'eject',0); // ОТКЛ

			defaultPositions(26,4,2050,'knob',0); // буква Д
			defaultPositions(27,6,2050,'knob',9); // буква О
			defaultPositions(28,1,2050,'knob',10); // 30 сек
			defaultPositions(29,1,2050,'knob',11); // Положение 2

			// дополнительно вручную 

			defaultPositions(000,0,203,'toggler',1);
			defaultPositions(000,0,203,'toggler',2);
			defaultPositions(000,0,203,'toggler',3);
			defaultPositions(000,0,203,'toggler',4);

			lamp(205,0,'on');
			lamp(205,0,'on');
			lamp(205,2,'on');
			lamp(205,3,'on');

			lamp(203,1,'on');

			ctrl(202,'knob',0).on('click',function(){
				if ($(this).attr('status') == 0) { $('.scale202 .arrow').css('-webkit-transform','rotate(-20deg)')}
				if ($(this).attr('status') == 1) { $('.scale202 .arrow').css('-webkit-transform','rotate(-23deg)')}
				if ($(this).attr('status') == 2) { $('.scale202 .arrow').css('-webkit-transform','rotate(10deg)')}
				if ($(this).attr('status') == 3) { $('.scale202 .arrow').css('-webkit-transform','rotate(29deg)')}
				if ($(this).attr('status') == 4) { $('.scale202 .arrow').css('-webkit-transform','rotate(41deg)')}
			});

			ctrl(203,'rotator',0).change(function(){
				if ($(this).attr('status') == 20) { $('#block203 .arrow').css('-webkit-transform','rotate(10deg)')} // Промежуточные
				if ($(this).attr('status') == 40) { $('#block203 .arrow').css('-webkit-transform','rotate(2deg)')} // Промежуточные
				if ($(this).attr('status') == 60) { $('#block203 .arrow').css('-webkit-transform','rotate(-8deg)')} // Промежуточные
				if ($(this).attr('status') == 80) { $('#block203 .arrow').css('-webkit-transform','rotate(-18deg)')} // Нужное конечное
			});
			ctrl(202,'rotator',0).change(function(){
				if ($(this).attr('status') == 0) { $('.scale202 .arrow').css('-webkit-transform','rotate(29deg)')} // Нужное начальное
				if ($(this).attr('status') == 35) { $('#block203 .arrow').css('-webkit-transform','rotate(-6deg)')} // Нужное конечное
			});
			ctrl(202,'rotator',1).change(function(){
				if ($(this).attr('status') == 20) { $('.scale202 .arrow').css('-webkit-transform','rotate(29deg)')} // Промежуточное
				if ($(this).attr('status') == 55) { $('#block203 .arrow').css('-webkit-transform','rotate(41deg)')} // Нужное конечное
			});
		// default pos end
			$('#tester').on('click',function() {
				var f = false;
				do {
				/* объяснение значений функции pass 
					// Первая цифра — порядковый номер клика по .control
					// Вторая цифра — верное положение контрола
					// Третье число — номер родительского блока нужной кнопки
					// Четвертый параметр — название типа контрола
					// Пятое число — порядковый номер конкретного типа контрола в конкретном блоке. Считается слева-направо вниз построчно
				*/
				
				if(!pass(0,1,203,"knob",1)) break;
				if(!pass(1,1,201,"toggler",5)) break;
				if(!pass(2,80,203,"rotator",0)) break;
				if(!pass(3,35,202,"rotator",0)) break;
				if(!pass(4,55,202,"rotator",1)) break;
				//if(!pass(5,0,205,"toggler",0)) break;
				if(!pass(6,3,202,"knob",0)) break;
				if(!pass(7,1,202,"toggler",1)) break;
				if(!pass(8,1,205,"toggler",0)) break;

				f = true;
				}
				while(false);
				if ((f) || (isTrain)) {
					exercisePassedSuccesfully();
				} else {
					exercisePassedUnSuccesfully();
				}
				//f ? alert('Упражнение выполнено верно!') : alert('Экзамен не сдан!');
			}); // END EXERCIZE 2-3 ALGORITHM

			// START EXERCIZE 2-3 HINTS
			$('a[data="coach-activator"]').on('click',function() {if (isTrain) {
				/* объяснение значений функции hinter 
					// Первая цифра — порядковый номер клика по .control
					// Вторая цифра — номер родительского блока нужной кнопки
					// Третий параметр — название типа контрола
					// Четвертый параметр — верное положение контрола. При нем срабатывает следующая подсказка
				*/
				hinterStart(203,"knob",1,"Установите переключатель ВИДЫ РАБОТЫ в положение ПРИВОД-II");
				hinterNextBlock(0,203,"knob",1,1, 201,"toggler",5,"Подключите осциллограф С1-73 к гнездам КОНТРОЛЬ ТОКА АНТЕННЫ");
				hinterNextBlock(1,201,"toggler",5,1, 203,"rotator",0,"Ручкой ГЛУБИНА МОДУЛЯЦИИ установите глубину модуляции в 80%. Произведите отсчет коэффициэнта глубины модуляции по прибору КОНТРОЛЬ на блоке П202, согласно методике п. 6.3.2 и по осцилографу согласно методичке п. 6.3.4.");
				hinterNextBlock(2,203,"rotator",0,80, 202,"rotator",0,"В паузе между опознавательными сигналами, т.е. при отсутствии модуляции, с помощью потенциометров НАЧ. УСТ. и УСТ. УРОВНЯ установите стрелку прибора на отметку шкалы в соответствии с таблицей 5. В данном случае 92мА <span class=what>35</span>)");
				hinter(3,202,"rotator",0,35, 202,"rotator",1,"В паузе между опознавательными сигналами, т.е. при отсутствии модуляции, с помощью потенциометров НАЧ. УСТ. и УСТ. УРОВНЯ установите стрелку прибора на отметку шкалы в соответствии с таблицей 5. В данном случае 92мА <span class=what>55</span>");
				hinterNextBlock(4,202,"rotator",1,55, 205,"toggler",0,"Переключите тумблер ВЫХОД ФОС в положение ОТКЛ");
				hinterNextBlock(5,205,"toggler",0,0, 202,"knob",0,"Произведите отсчет коэффициента глубины модуляции, установив переключатель КОНТРОЛЬ в положение М вниз");
				hinter(6,202,"knob",0,3, 202,"toggler",1,"Подключите к гнездам ТЕЛЕФОН головной телефон");
				hinterNextBlock(7,202,"toggler",1,1, 205,"toggler",0,"Переключите тумблер ВЫХОД ФОС в положение ВКЛ");
				hinterEnd(8,205,"toggler",0,1);
			}}); // END EXERCIZE 2-3 HINTS
	}); // END EXERCIZE 2-3
	$('#exercise3').on('click',function() {
		// START EXERCIZE 3 ALGORITHM
		// default pos
			defaultPositions(1,2,501,'knob',1); // ВЫКЛ
			defaultPositions(2,1,501,'knob',2);// АВТ
			defaultPositions(3,1,501,'toggler',0); // ВЫКЛ
			defaultPositions(4,3,501,'knob',0); // ВЫКЛ
			defaultPositions(5,1,501,'toggler',1); // ОТКЛ

			defaultPositions(6,7,201,'knob',0); // VIII
			defaultPositions(7,1,201,'toggler',0); // ОТКЛ АПК

			defaultPositions(8,5,202,'knob',1); // VI
			defaultPositions(9,4,202,'knob',0); // НАЧ. УСТ.
			defaultPositions(10,2,202,'rotator',7); // НАЧ. УСТ.

			defaultPositions(12,0,2030,'toggler',0); // Включить 400 Гц

			defaultPositions(14,1,203,'toggle',3); // ОТКЛ
			defaultPositions(15,0,203,'toggle',2); // АНТЕННА
			defaultPositions(16,1,203,'knob',0); // МЕСТНОЕ
			defaultPositions(17,0,203,'knob',1); // ПРИВОД-I
			defaultPositions(18,0,203,'rotator',0); // Крайнее левое
			defaultPositions(19,0,203,'rotator',1); // Крайнее левое
			defaultPositions(20,0,203,'rotator',2); // Крайнее левое
			defaultPositions(21,1,203,'toggler',0); // ОТКЛ
			defaultPositions(22,1,203,'toggler',4); // ОТКЛ
			defaultPositions(23,1,203,'rotator',3); // Среднее положение

			defaultPositions(24,1,205,'knob',1); // ОТКЛ
			defaultPositions(25,0,205,'eject',0); // ОТКЛ

			defaultPositions(26,4,2050,'knob',0); // буква Д
			defaultPositions(27,6,2050,'knob',9); // буква О
			defaultPositions(28,1,2050,'knob',10); // 30 сек
			defaultPositions(29,1,2050,'knob',11); // Положение 2

			// дополнительно вручную 

			defaultPositions(000,0,203,'toggler',1);
			defaultPositions(000,0,203,'toggler',2);
			defaultPositions(000,0,203,'toggler',3);
			defaultPositions(000,1,203,'toggler',4);

			defaultPositions(000,9,205,'knob',0);
			defaultPositions(000,1,301,'knob',1);

			lamp(205,0,'on');
			lamp(205,0,'on');
			lamp(205,2,'on');
			lamp(205,3,'on');

			lamp(203,1,'on');

			$('#close').on('click',function(){
			  	$('.scale4342InBlock201').remove();
			});

			ctrl(201,'rotator',1).change(function(){
				if ($(this).attr('progress') == 5) {
				  	$('.scale4342InBlock201').remove();
					$('body').append('<div class="scale4342InBlock201 blockScale"><div class="scale-holder black volt scale4243">				<div class="scale"> </div>				<div class="arrow"> </div>				<div class="body"> </div>			</div></div>');
				}
				if ($(this).attr('progress') == 12) {
				  	$('.scale4342InBlock201').remove();
					$('body').append('<div class="scale4342InBlock201 blockScale"><div class="scale-holder black volt scale4243">				<div class="scale"> </div>				<div class="arrow"> </div>				<div class="body"> </div>			</div></div>');
				}
			  });

			ctrl(201,'rotator',0).change(function(){
				/*if ($(this).attr('status') == 15) { 
					$('.scale203 .arrow').css('-webkit-transform','rotate(-20deg)');
				} 
				if ($(this).attr('status') == 20) { 
					$('.scale203 .arrow').css('-webkit-transform','rotate(-15deg)');
				} 
				if ($(this).attr('status') == 25) {
					$('.scale203 .arrow').css('-webkit-transform','rotate(-10deg)');
				} */
				if ($(this).attr('status') == 5) { // Нужное конечное
					$('.scale203 .arrow').css('-webkit-transform','rotate(-2deg)');
				} 
				if ($(this).attr('status') == 6) { 
					$('.scale203 .arrow').css('-webkit-transform','rotate(-10deg)');
				} 
				if ($(this).attr('status') == 7) { 
					$('.scale203 .arrow').css('-webkit-transform','rotate(-15deg)');
				} 
				if ($(this).attr('status') == 8) { 
					$('.scale203 .arrow').css('-webkit-transform','rotate(-20deg)');
				} 
			});

			
			ctrl(201,'rotator',1).change(function(){
				if ($(this).attr('status') == 25) { 
					$('#block201 .arrow').css('-webkit-transform','rotate(-10deg)');
				}
				
				if ($(this).attr('status') == 55) { 
					$('#block201 .arrow').css('-webkit-transform','rotate(-5deg)');
				}
				
				if ($(this).attr('status') == 70) { 
					$('#block201 .arrow').css('-webkit-transform','rotate(-3deg)');
					$('#block301 a[type="lamp"][data="num12"]').removeClass('on'); // Работа
				}
				if ($(this).attr('status') == 70) { // Нужное конечное
					$('.scale4243 .arrow').css('-webkit-transform','rotate(-24deg)');
				} 
				if ($(this).attr('status') == 50) { 
					$('.scale4243 .arrow').css('-webkit-transform','rotate(-22deg)');
				} 
				if ($(this).attr('status') == 30) { 
					$('.scale4243 .arrow').css('-webkit-transform','rotate(-20deg)');
				} 
				if ($(this).attr('status') == 10) { 
					$('.scale4243 .arrow').css('-webkit-transform','rotate(-19deg)');
				} 

				if ($(this).attr('progress') == 10) { 
					$('#block301 a[type="lamp"][data="num7"]').addClass('on'); // Неисправно
					$('#block301 a[type="lamp"][data="num10"]').addClass('on'); // Ток ниже нормы
					$('#block301 a[type="lamp"][data="num12"]').removeClass('on'); // Работа
				}

				if ($(this).attr('progress') == 12) {
					if ($(this).attr('status') == 70) { // Нужное конечное
						$('.scale4243 .arrow').css('-webkit-transform','rotate(-15deg)');
					} 
				}
				if ($(this).attr('progress') == 17) {
					if ($(this).attr('status') == 70) { // Нужное конечное
						$('.scale4243 .arrow').css('-webkit-transform','rotate(-15deg)');
					} 
				}


				if ($(this).attr('progress') == 20) {
					$('#block301 a[type="lamp"][data="num7"]').addClass('on'); // Неисправно
					$('#block301 a[type="lamp"][data="num10"]').addClass('on'); // Ток ниже нормы
					$('#block301 a[type="lamp"][data="num12"]').removeClass('on'); // Работа
				
					if ($(this).attr('status') == 70) { // Нужное конечное
						$('.scale4243 .arrow').css('-webkit-transform','rotate(-18deg)');
					} 
				}


			});
			
			ctrl(203,'rotator',0).change(function(){

				if ($(this).attr('progress') == 21) {
					if ($(this).attr('status') == 50) { 
						$('#block301 a[type="lamp"][data="num7"]').addClass('on'); // Неисправно
						$('#block301 a[type="lamp"][data="num11"]').addClass('on'); // Модуляция ниже нормы
						$('#block301 a[type="lamp"][data="num12"]').removeClass('on'); // Работа

					}
				}
			}); 

			ctrl(201,'toggler',2).on('click',function(){
				$('#block301 a[type="lamp"][data="num10"]').removeClass('on'); // Ток ниже нормы
				$('#block301 a[type="lamp"][data="num11"]').removeClass('on'); // Модуляция ниже нормы
			});

			ctrl(201,'knob',0).on('click',function(){
				if ($(this).attr('status') == 0) { 
					$('#block301 a[type="lamp"][data="num7"]').removeClass('on'); // Ток ниже нормы
					$('#block301 a[type="lamp"][data="num13"]').removeClass('on'); // Готовность
				}
				if ($(this).attr('status') == 1) { 
					$('#block301 a[type="lamp"][data="num13"]').addClass('on'); // Готовность
				}
			});
			$('#block203 .arrow').css('-webkit-transform','rotate(24deg)');
		// default pos end
			$('#tester').on('click',function() {
				var f = false;
				do {
				/* объяснение значений функции pass 
					// Первая цифра — порядковый номер клика по .control
					// Вторая цифра — верное положение контрола
					// Третье число — номер родительского блока нужной кнопки
					// Четвертый параметр — название типа контрола
					// Пятое число — порядковый номер конкретного типа контрола в конкретном блоке. Считается слева-направо вниз построчно
				*/
				if(!pass(0,1,203,"toggler",1)) break;
				//if(!pass(1,0,205,"toggler",0)) break;
				if(!pass(2,4,301,"knob",4)) break;
				if(!pass(3,1,301,"toggler",5)) break;
				if(!pass(4,1,301,"toggler",6)) break;
				
				//if(!pass(5,70,201,"rotator",1)) break;
				if(!pass(6,1,201,"toggler",5)) break;
				
				//if(!pass(7,80,203,"rotator",0)) break;
				if(!pass(8,1,205,"toggler",0)) break;
				if(!pass(9,2,301,"knob",1)) break;

				//if(!pass(10,55,201,"rotator",1)) break;
				//if(!pass(11,1,301,"toggler",2)) break;
				
				//if(!pass(12,70,201,"rotator",1)) break;
				//if(!pass(13,0,301,"toggler",2)) break;
				//if(!pass(14,1,301,"knob",0)) break;
				
				//if(!pass(15,25,201,"rotator",1)) break;
				//if(!pass(16,1,301,"toggler",2)) break;
				
				if(!pass(17,70,201,"rotator",1)) break;
				//if(!pass(18,0,301,"toggler",2)) break;
				//if(!pass(19,1,301,"knob",0)) break;
				if(!pass(20,1,205,"toggler",0)) break;
				
				//if(!pass(21,50,203,"rotator",0)) break;
				//if(!pass(22,1,301,"toggler",2)) break;
				
				//if(!pass(23,80,203,"rotator",0)) break;
				//if(!pass(24,0,301,"toggler",2)) break;
				//if(!pass(25,1,301,"knob",0)) break;
				
				//if(!pass(26,60,203,"rotator",0)) break;
				//if(!pass(27,1,301,"toggler",2)) break;
				
				if(!pass(28,80,203,"rotator",0)) break;
				if(!pass(29,0,301,"toggler",2)) break;
				if(!pass(30,1,301,"knob",0)) break;
			

				f = true;
				}
				while(false);
				if ((f) || (isTrain)) {
					exercisePassedSuccesfully();
				} else {
					exercisePassedUnSuccesfully();
				}
				//f ? alert('Упражнение выполнено верно!') : alert('Экзамен не сдан!');
			}); // END EXERCIZE 3 ALGORITHM

			// START EXERCIZE 3 HINTS
			$('a[data="coach-activator"]').on('click',function() {if (isTrain) {
				/* объяснение значений функции hinter 
					// Первая цифра — порядковый номер клика по .control
					// Вторая цифра — номер родительского блока нужной кнопки
					// Третий параметр — название типа контрола
					// Четвертый параметр — верное положение контрола. При нем срабатывает следующая подсказка
				*/
				hinterStart(203,"toggler",1,"Переключите тумблер АРУ в положение ОТКЛ");
				hinterNextBlock(0,203,"toggler",1,1, 205,"toggler",0,"Переключите тумблер ВЫХОД ФОС в положение ОТКЛ");
				hinterNextBlock(1,205,"toggler",0,0, 301,"knob",4,"Проверьте наличие напряжений в блоке П301 с помощью вольтметра, установленного на передней панели блока, устанавливая переключатель КОНТРОЛЬ НАПРЯЖЕНИЙ в положения от крайне-левого (+27В) до крайне-правого (+27В ДЕЖ). Вольтметр должен показывать величину напряжений согласно Таблице 1");
				hinter(2,301,"knob",4,4, 301,"toggler",5,"Подключите антенну к первому гнезду КОНТРОЛЬ");
				hinter(3,301,"toggler",5,1, 301,"toggler",6,"Подключите прибор Ц4353 к гнезду заземления КОНТРОЛЬ"); //!D
				hinterNextBlock(4,301,"toggler",6,1, 201,"rotator",1,"Установите потенциометром ПРИВОД I напряжение 8В +/-0,2В (70)");
				
				hinter(5,201,"rotator",1,70, 201,"toggler",5,"Подключите осциллограф С1-73 к гнезду КОНТРОЛЬ ТОКА АНТЕННЫ");
				hinterNextBlock(6,201,"toggler",5,1, 203,"rotator",0,"Установите потенциометр ГЛУБИНА МОДУЛЯЦИИ в положение, примерно равное 80%");

				hinterNextBlock(7,203,"rotator",0,80, 205,"toggler",0,"Переключите тумблер ВЫХОД ФОС в положение ВКЛ");
				hinterNextBlock(8,205,"toggler",0,1, 301,"knob",1,"Установите тумблер УПРАВЛЕНИЕ в положение МЕСТН");
				hinterNextBlock(9,301,"knob",1,2, 201,"rotator",1,"Произведите имитацию неисправности прибора П200 по току, для чего уменьшите напряжение, пропорциональное уровню несущей <span class=what>55</span>");

				hinterNextBlock(10,201,"rotator",1,55, 301,"toggler",2,"Нажмите кнопку СБРОС");
				hinterNextBlock(11,301,"toggler",2,1, 201,"rotator",1,"Потенциометром ПРИВОД I установите уровень автоконтроля по прибору Ц4353 на первоначальное значение (70)");

				hinterNextBlock(12,201,"rotator",1,70, 301,"toggler",2,"Нажмите кнопку СБРОС");
				hinter(13,301,"toggler",2,0, 301,"knob",0,"Установите переключатель РЕМОНТ в положение I, а затем обратно в положение 0");
				hinterNextBlock(14,301,"knob",0,1, 201,"rotator",1,"Аналогично проверьте работу автоконтроля при снижении уровня автоконтроля на 30%, для чего ручкой потенциометра ПРИВОД I уменьшите напряжение, пропорционально уровню несущей <span class=what>25</span>");
				
				hinterNextBlock(15,201,"rotator",1,25, 301,"toggler",2,"Нажмите кнопку СБРОС");
				hinterNextBlock(16,301,"toggler",2,1, 201,"rotator",1,"Установите уровень автоконтроля потенциометром ПРИВОД I по прибору Ц4353 до первоначального значения 8В <span class=what>70</span>");
				
				hinterNextBlock(17,201,"rotator",1,70, 301,"toggler",2,"Нажмите кнопку СБРОС");
				hinter(18,301,"toggler",2,0, 301,"knob",0,"Установите переключатель РЕМОНТ в положение I, а затем обратно в положение 0");
				hinterNextBlock(19,301,"knob",0,1, 205,"toggler",0,"Переведите тумблер ВЫХОД ФОС в положение ОТКЛ, а затем в положение ВКЛ");

				hinterNextBlock(20,205,"toggler",0,1, 203,"rotator",0,"Установите глубину модуляции 50% с помощью ручки ГЛУБИНА МОДУЛЯЦИИ");
				
				hinterNextBlock(21,203,"rotator",0,50, 301,"toggler",2,"Нажмите кнопку СБРОС");
				hinterNextBlock(22,301,"toggler",2,1, 203,"rotator",0,"Установите глубину модуляции в 80% с помощью ручки ГЛУБИНА МОДУЛЯЦИИ");
				
				hinterNextBlock(23,203,"rotator",0,80, 301,"toggler",2,"Нажмите кнопку СБРОС");
				hinter(24,301,"toggler",2,0, 301,"knob",0,"Установите переключатель РЕМОНТ в положение I, а затем обратно в положение 0");
				hinterNextBlock(25,301,"knob",0,1, 203,"rotator",0,"Установите глубину модуляции в 60% с помощью ручки ГЛУБИНА МОДУЛЯЦИИ");
				
				hinterNextBlock(26,203,"rotator",0,60, 301,"toggler",2,"Нажмите кнопку СБРОС");
				hinterNextBlock(27,301,"toggler",2,1, 203,"rotator",0,"Установите значение глубины модуляции в 80% с помощью ручки ГЛУБИНА МОДУЛЯЦИИ");
				
				hinterNextBlock(28,203,"rotator",0,80, 301,"toggler",2,"Нажмите кнопку СБРОС");
				hinter(29,301,"toggler",2,0, 301,"knob",0,"Установите переключатель РЕМОНТ в положение I, а затем обратно в положение 0");
				hinterEnd(30,301,"knob",0,1);
				
			}}); // END EXERCIZE 3 HINTS
	}); // END EXERCIZE 3

$('[rel="telegraph"]').on('click',function() {

});

	$('#exercise4').on('click',function() {
	 // START EXERCIZE TEST ALGORITHM
		// default pos Start
			defaultPositions(1,2,501,'knob',1); // ВЫКЛ
			defaultPositions(2,1,501,'knob',2);// АВТ
			defaultPositions(3,1,501,'toggler',0); // ВЫКЛ
			defaultPositions(4,3,501,'knob',0); // ВЫКЛ
			defaultPositions(5,1,501,'toggler',1); // ОТКЛ

			defaultPositions(6,7,201,'knob',0); // VIII
			defaultPositions(7,1,201,'toggler',0); // ОТКЛ АПК

			defaultPositions(8,5,202,'knob',1); // VI
			defaultPositions(9,4,202,'knob',0); // НАЧ. УСТ.
			defaultPositions(10,2,202,'rotator',7); // НАЧ. УСТ.

			defaultPositions(12,0,2030,'toggler',0); // Включить 400 Гц

			defaultPositions(14,1,203,'toggle',3); // ОТКЛ
			defaultPositions(15,0,203,'toggle',2); // АНТЕННА
			defaultPositions(16,1,203,'knob',0); // МЕСТНОЕ
			defaultPositions(17,0,203,'knob',1); // ПРИВОД-I
			defaultPositions(18,0,203,'rotator',0); // Крайнее левое
			defaultPositions(19,0,203,'rotator',1); // Крайнее левое
			defaultPositions(20,0,203,'rotator',2); // Крайнее левое
			defaultPositions(21,1,203,'toggler',0); // ОТКЛ
			defaultPositions(22,1,203,'toggler',4); // ОТКЛ
			defaultPositions(23,1,203,'rotator',3); // Среднее положение

			defaultPositions(24,1,205,'knob',1); // ОТКЛ
			defaultPositions(25,0,205,'eject',0); // ОТКЛ

			defaultPositions(26,4,2050,'knob',0); // буква Д
			defaultPositions(27,6,2050,'knob',9); // буква О
			defaultPositions(28,1,2050,'knob',10); // 30 сек
			defaultPositions(29,1,2050,'knob',11); // Положение 2

			// дополнительно вручную 

			defaultPositions(000,0,203,'toggler',1);
			defaultPositions(000,0,203,'toggler',2);
			defaultPositions(000,0,203,'toggler',3);
			defaultPositions(000,1,203,'toggler',4);

			defaultPositions(000,9,205,'knob',0);
			defaultPositions(000,1,301,'knob',1);

			lamp(205,0,'on');
			lamp(205,0,'on');
			lamp(205,2,'on');
			lamp(205,3,'on');

			lamp(203,1,'on');
		// default pos end
			
			$('#close').on('click',function(){
			  	$('.scale4342InBlock201').remove();
			});

			$('.scale301 .arrow').css('-webkit-transform','rotate(4deg)');
			ctrl(201,'rotator',0).change(function(){
				if (($(this).attr('progress') == 8) || ($(this).attr('progress') == 10) || ($(this).attr('progress') == 15)) {
					$('.scale4342InBlock201').remove();
					$('body').append('<div class="scale4342InBlock201 blockScale"><div class="scale-holder black volt scale4243">				<div class="scale"> </div>				<div class="arrow"> </div>				<div class="body"> </div>			</div></div>');
				}
			  });

			ctrl(203,'rotator',0).change(function() {
				if ($(this).attr('status') == 80) {
					$('.scale202 .arrow').css('-webkit-transform','rotate(-4deg)');
				}
			});
			ctrl(202,'rotator',1).change(function() {
				if ($(this).attr('status') == 55) {
					$('.scale202 .arrow').css('-webkit-transform','rotate(-41deg)');
				}
			});
			ctrl(201,'rotator',0).change(function(){
				
				if (($(this).attr('progress') == 8) || ($(this).attr('progress') == 10) || ($(this).attr('progress') == 15)) { 
					$('#block301 a[type="lamp"][data="num7"]').addClass('on'); // Неисправно
					$('#block301 a[type="lamp"][data="num10"]').addClass('on'); // Ток ниже нормы
					$('#block301 a[type="lamp"][data="num12"]').removeClass('on'); // Работа
				}

				if ($(this).attr('progress') == 8) {
					if ($(this).attr('status') == 20) { // Нужное конечное
						$('.scale4243 .arrow').css('-webkit-transform','rotate(-33deg)');
						$('#block201 .arrow').css('-webkit-transform','rotate(-24deg)');
					} 
				}
				if ($(this).attr('progress') == 10) {
					if ($(this).attr('status') == 70) { // Нужное конечное
						$('.scale4243 .arrow').css('-webkit-transform','rotate(-17deg)');
					} 
				}

				if ($(this).attr('progress') == 13) {
					$('.scale4243 .arrow').css('-webkit-transform','rotate(-33deg)');
				}
				if ($(this).attr('progress') == 15) {
					if ($(this).attr('status') == 70) { // Нужное конечное
						$('.scale4243 .arrow').css('-webkit-transform','rotate(-17deg)');
					} 
				}


				if ($(this).attr('progress') == 20) {
					$('#block301 a[type="lamp"][data="num7"]').addClass('on'); // Неисправно
					$('#block301 a[type="lamp"][data="num10"]').addClass('on'); // Ток ниже нормы
					$('#block301 a[type="lamp"][data="num12"]').removeClass('on'); // Работа
				
					if ($(this).attr('status') == 70) { // Нужное конечное
						$('.scale4243 .arrow').css('-webkit-transform','rotate(-18deg)');
					} 
				}


			});
			
			ctrl(203,'rotator',0).change(function(){

				if ($(this).attr('progress') == 19 ) {
					if ($(this).attr('status') == 50) { 
						$('#block301 a[type="lamp"][data="num7"]').addClass('on'); // Неисправно
						$('#block301 a[type="lamp"][data="num11"]').addClass('on'); // Модуляция ниже нормы
						$('#block301 a[type="lamp"][data="num12"]').removeClass('on'); // Работа
					}
				}
				if ($(this).attr('progress') == 21 ) {
					if ($(this).attr('status') == 80) { 
						$('#block301 a[type="lamp"][data="num7"]').addClass('on'); // Неисправно
						$('#block301 a[type="lamp"][data="num11"]').addClass('on'); // Модуляция ниже нормы
						$('#block301 a[type="lamp"][data="num12"]').removeClass('on'); // Работа
					}
				}
				if ($(this).attr('progress') == 24 ) {
					if ($(this).attr('status') == 60) { 
						$('#block301 a[type="lamp"][data="num7"]').addClass('on'); // Неисправно
						$('#block301 a[type="lamp"][data="num11"]').addClass('on'); // Модуляция ниже нормы
						$('#block301 a[type="lamp"][data="num12"]').removeClass('on'); // Работа
					}
				}
			}); 

			$('a.control[type="toggler"][data="num2"]').on('click',function(){
				$('#block301 a[type="lamp"][data="num10"]').removeClass('on'); // Ток ниже нормы
				$('#block301 a[type="lamp"][data="num11"]').removeClass('on'); // Модуляция ниже нормы
				if ($(this).attr('status') == 0) { 
					$('#block301 a[type="lamp"][data="num10"]').removeClass('on'); // Ток ниже нормы
					$('#block301 a[type="lamp"][data="num11"]').removeClass('on'); // Модуляция ниже нормы
				}
				if ($(this).attr('status') == 1) { 
					$('#block301 a[type="lamp"][data="num10"]').removeClass('on'); // Ток ниже нормы
					$('#block301 a[type="lamp"][data="num11"]').removeClass('on'); // Модуляция ниже нормы
				}
			});

			ctrl(201,'knob',0).on('click',function(){
				if ($(this).attr('status') == 0) { 
					$('#block301 a[type="lamp"][data="num7"]').removeClass('on'); // Ток ниже нормы
					$('#block301 a[type="lamp"][data="num13"]').removeClass('on'); // Готовность
				}
				if ($(this).attr('status') == 1) { 
					$('#block301 a[type="lamp"][data="num13"]').addClass('on'); // Готовность
					$('#block301 a[type="lamp"][data="num7"]').removeClass('on'); // Ток ниже нормы
					$('#block301 a[type="lamp"][data="num13"]').removeClass('on'); // Готовность
				}
			});
			$('#block201 .arrow').css('-webkit-transform','rotate(15deg)');
			$('#block203 .arrow').css('-webkit-transform','rotate(24deg)');
			$('.scale4243 .arrow').css('-webkit-transform','rotate(-17deg)');
		$('#tester').on('click',function() {
			var f = false;
			do {
			/* объяснение значений функции pass 
				// Первая цифра — порядковый номер клика по .control
				// Вторая цифра — верное положение контрола
				// Третье число — номер родительского блока нужной кнопки
				// Четвертый параметр — название типа контрола
				// Пятое число — порядковый номер конкретного типа контрола в конкретном блоке. Считается слева-направо вниз построчно
			*/
				//if(!pass(0,0,205,"toggler",0)) break;
				if(!pass(1,4,301,"knob",4)) break;
				if(!pass(2,1,201,"toggler",5)) break;
				//if(!pass(3,80,203,"rotator",0)) break;
				//if(!pass(4,1,301,"toggler",5)) break;
				//if(!pass(5,1,301,"toggler",6)) break;
				//if(!pass(6,1,205,"toggler",0)) break;
				if(!pass(7,2,301,"knob",1)) break;
				//if(!pass(8,20,201,"rotator",0)) break;
				//if(!pass(9,1,301,"toggler",2)) break;
				//if(!pass(10,70,201,"rotator",0)) break;
				//if(!pass(11,0,301,"toggler",2)) break;
				//if(!pass(12,0,301,"knob",0)) break;
				//if(!pass(13,25,201,"rotator",0)) break;
				//if(!pass(14,1,301,"toggler",2)) break;
				if(!pass(15,70,201,"rotator",0)) break;
				//if(!pass(16,0,301,"toggler",2)) break;
				//if(!pass(17,0,301,"knob",0)) break;
				if(!pass(18,1,205,"toggler",0)) break;
				//if(!pass(19,50,203,"rotator",0)) break;
				//if(!pass(20,1,301,"toggler",2)) break;
				//if(!pass(21,80,203,"rotator",0)) break;
				//if(!pass(22,0,301,"toggler",2)) break;
				//if(!pass(23,0,301,"knob",0)) break;
				//if(!pass(24,60,203,"rotator",0)) break;
				//if(!pass(25,1,301,"toggler",2)) break;
				if(!pass(26,80,203,"rotator",0)) break;
				//if(!pass(27,0,301,"toggler",2)) break;
				if(!pass(28,1,301,"knob",0)) break;

			f = true;
			}
			while(false);
			if ((f) || (isTrain)) {
				exercisePassedSuccesfully();
			} else {
				exercisePassedUnSuccesfully();
			}
			//f ? alert('Упражнение выполнено верно!') : alert('Экзамен не сдан!');
		}); // END EXERCIZE TEST  ALGORITHM

		// START EXERCIZE TEST HINTS
		$('a[data="coach-activator"]').on('click',function() {if (isTrain) {
			/* объяснение значений функции hinter 
				// Первая цифра — порядковый номер клика по .control
				// Вторая цифра — номер родительского блока нужной кнопки
				// Третий параметр — название типа контрола
				// Четвертый параметр — верное положение контрола. При нем срабатывает следующая подсказка
			*/
				hinterStart(205,"toggler",0,'Переключите тумблер ВЫХОД ФОС в положение выкл');
				hinterNextBlock(0,205,"toggler",0,0, 301,"knob",4,"Проверьте наличие напряжений в блоке П301 с помощью вольтметра, установленного на передней панели блока и переключателя КОНТРОЛЬ НАПРЯЖЕНИЯ, устанавливая его в каждое из положений, сверяя показателя вольтметра согласно таблице 1")
				hinterNextBlock(1,301,"knob",4,4, 201,"toggler",5,"Подключите осциллограф С1-73 к гнездам КОНТРОЛЬ ТОКА АНТЕННЫ");
				hinterNextBlock(2,201,"toggler",5,1, 203,"rotator",0,"Ручкой ГЛУБИНА МОДУЛЯЦИИ установите глубину на уровне 80%");
				hinterNextBlock(3,203,"rotator",0,80, 301,"toggler",5,"Подключите к первому гнезду КОНТРОЛЬ прибор Ц4353");
				hinter(4,301,"toggler",5,1, 301,"toggler",6,"Подключите к гнезду заземления КОНТРОЛЬ прибор Ц4353"); //!D
				hinterNextBlock(5,301,"toggler",6,1, 205,"toggler",0,"Переключите тумблер ВЫХОД ФОС в положение ВКЛ");
				hinterNextBlock(6,205,"toggler",0,1, 301,"knob",1,"Установите переключатель УПРАВЛЕНИЕ в положение МЕСТН");
				hinterNextBlock(7,301,"knob",1,2, 201,"rotator",0,"Ручкой ПРИВОД II уменьшите напряжение, пропорциональное уровню несущей до 4,8В, что соответствует снижению тока в антенне на 40% <span class=what>20</span>");
				hinterNextBlock(8,201,"rotator",0,20, 301,"toggler",2,"Нажмите кнопку СБРОС");
				hinterNextBlock(9,301,"toggler",2,1, 201,"rotator",0,"Ручкой ПРИВОД II установите уровень автоконтроля по прибору Ц4353 до первоначального значения в 8В <span class=what>70</span>");
				hinterNextBlock(10,201,"rotator",0,70, 301,"toggler",2,"Нажмите кнопку СБРОС");
				hinter(11,301,"toggler",2,0, 301,"knob",0,"Установите переключатель РЕМОНТ в положение I, а затем в положение 0");
				hinterNextBlock(12,301,"knob",0,0, 201,"rotator",0,"Аналогично проверьте работу автоконтроля при снижении уровня автоконтроля на 30%, для чего ручкой ПРИВОД II уменьшите напряжение, пропорциональное уровню несущей <span class=what>25</span>");
				hinterNextBlock(13,201,"rotator",0,25, 301,"toggler",2,"Нажмите кнопку СБРОС");
				hinterNextBlock(14,301,"toggler",2,1, 201,"rotator",0,"Ручкой ПРИВОД II установите уровень автоконтроля по прибору Ц4353 до первоначального значения 8В <span class=what>70</span>");
				hinterNextBlock(15,201,"rotator",0,70, 301,"toggler",2,"Нажмите кнопку СБРОС");
				hinter(16,301,"toggler",2,0, 301,"knob",0,"Установите переключатель РЕМОНТ в положение I, а затем опять в 0");
				hinterNextBlock(17,301,"knob",0,0, 205,"toggler",0,"Переключите тумблер ВЫХОД ФОС в положение ОТКЛ, а затем во ВКЛ");
				hinterNextBlock(18,205,"toggler",0,1, 203,"rotator",0,"Установите потенциометр ГЛУБИНА МОДУЛЯЦИИ в положение 50%");
				hinterNextBlock(19,203,"rotator",0,50, 301,"toggler",2,"Нажмите кнопку СБРОС");
				hinterNextBlock(20,301,"toggler",2,1, 203,"rotator",0,"Установите потенциометр ГЛУБИНА МОДУЛЯЦИИ в положение 80%");
				hinterNextBlock(21,203,"rotator",0,80, 301,"toggler",2,"Нажмите кнопку СБРОС");
				hinter(22,301,"toggler",2,0, 301,"knob",0,"Установите переключатель РЕМОНТ в положение I, а затем опять в 0");
				hinterNextBlock(23,301,"knob",0,0, 203,"rotator",0,"Установите потенциометр ГЛУБИНА МОДУЛЯЦИИ в положение 60");
				hinterNextBlock(24,203,"rotator",0,60, 301,"toggler",2,"Нажмите кнопку СБРОС");
				hinterNextBlock(25,301,"toggler",2,1, 203,"rotator",0,"Установите потенциометр ГЛУБИНА МОДУЛЯЦИИ в положение 80");
				hinterNextBlock(26,203,"rotator",0,80, 301,"toggler",2,"Нажмите кнопку СБРОС");
				hinter(27,301,"toggler",2,0, 301,"knob",0,"Установите переключатель РЕМОНТ в положение 1, а затем в 0");
				hinterEnd(28,301,"knob",0,1);
		}}); // END EXERCIZE TEST HINTS
	}); // END EXERCIZE TEST
	$('#exercise5').on('click',function() {
	 // START EXERCIZE TEST ALGORITHM
		// default pos
			defaultPositions(000,1,203,'toggler',1);
			defaultPositions(000,0,203,'toggler',2);
			defaultPositions(000,0,203,'toggler',3);
			defaultPositions(000,1,203,'toggler',4);
			defaultPositions(000,0,205,'toggler',0);
			ctrl(205,'lamp',0);
			ctrl(205,'lamp',2);
			ctrl(203,'lamp',1).addClass('on');
			ctrl(301,'lamp',6).addClass('on');
			ctrl(501,'lamp',6).addClass('on');
			defaultPositions(000,1,203,"knob",0);
			defaultPositions(000,0,203,"knob",1);
			defaultPositions(000,0,203,"toggler",1);
			defaultPositions(000,1,501,"toggler",0);
			defaultPositions(000,3,501,"knob",0);
			defaultPositions(000,1,501,"toggler",4);
			defaultPositions(000,1,501,"toggler",5);
			defaultPositions(000,2,501,"knob",1);
			defaultPositions(000,1,501,"knob",2);
			defaultPositions(000,9,205,"knob",0);
			defaultPositions(000,1,205,"toggler",0);
			defaultPositions(000,1,301,"knob",1);
			defaultPositions(000,1,301,"knob",2);
			defaultPositions(000,1,301,"knob",3);
			defaultPositions(000,0,301,"toggler",0);
			defaultPositions(000,7,201,"knob",0);
			ctrl(501,"toggler",1).on('click',function(){
			ctrl(501,'lamp',6).removeClass('on');

			});

			ctrl(301,'knob',1).on('click',function(){
				if ($(this).attr('status') == 0) { 
					$('#block301 a[type="lamp"][data="num12"]').removeClass('on'); // Работа
				}
				if ($(this).attr('status') == 1) { 
					$('#block301 a[type="lamp"][data="num12"]').removeClass('on'); // Работа
				}
				if ($(this).attr('status') == 2) { 
					$('#block301 a[type="lamp"][data="num12"]').addClass('on'); // Работа
				}
			});
			$('#close').on('click',function(){
			  	$('.scale4342InBlock201').remove();
			});

			ctrl(201,'rotator',1).change(function(){
				$('.scale4342InBlock201').remove();
				$('body').append('<div class="scale4342InBlock201 blockScale"><div class="scale-holder black volt scale4243">				<div class="scale"> </div>				<div class="arrow"> </div>				<div class="body"> </div>			</div></div>');
			  });
			ctrl(201,'rotator',1).change(function(){

				if ($(this).attr('status') == 5) {
					$('.scale4243 .arrow').css('-webkit-transform','rotate(-3deg)');
				} 
				if ($(this).attr('status') == 15) {
					$('.scale4243 .arrow').css('-webkit-transform','rotate(-7deg)');
				} 
				if ($(this).attr('status') == 25) {
					$('.scale4243 .arrow').css('-webkit-transform','rotate(-15deg)');
				} 
				if ($(this).attr('status') == 35) { 
					$('.scale4243 .arrow').css('-webkit-transform','rotate(-26deg)');
				} 
				if ($(this).attr('status') == 45) { // Нужное конечное
					$('.scale4243 .arrow').css('-webkit-transform','rotate(-33deg)');
					$('#block301 a[type="lamp"][data="num10"]').addClass('on'); // Ток ниже нормы
					$('#block301 a[type="lamp"][data="num11"]').addClass('on'); // Модуляция ниже нормы
					$('#block301 a[type="lamp"][data="num7"]').addClass('on'); // Неисправно
				} 

				
			});
			ctrl(301,'knob',0).on('click',function(){
				if ($(this).attr('status') == 1) { 
					$('#block301 a[type="lamp"][data="num10"]').removeClass('on'); // Ток ниже нормы
					$('#block301 a[type="lamp"][data="num11"]').removeClass('on'); // Модуляция ниже нормы
				}
			});
			$('.scale4243 .arrow').css('-webkit-transform','rotate(0deg)');


		// default pos end
		$('#tester').on('click',function() {
			var f = false;
			do {
			/* объяснение значений функции pass 
				// Первая цифра — порядковый номер клика по .control
				// Вторая цифра — верное положение контрола
				// Третье число — номер родительского блока нужной кнопки
				// Четвертый параметр — название типа контрола
				// Пятое число — порядковый номер конкретного типа контрола в конкретном блоке. Считается слева-направо вниз построчно
			*/
				if(!pass(0,1,203,"toggler",3)) break;
				if(!pass(1,1,501,"toggler",1)) break;
				//if(!pass(2,0,203,"knob",0)) break;
				if(!pass(3,2,205,"knob",1)) break;
				//if(!pass(4,2,301,"knob",1)) break;
				//if(!pass(5,45,203,"rotator",0)) break;
				if(!pass(6,45,201,"rotator",1)) break;
				if(!pass(7,1,301,"knob",0)) break;
				if(!pass(8,80,203,"rotator",0)) break;
				if(!pass(9,1,301,"knob",1)) break;
				if(!pass(10,1,301,"toggler",0)) break;
				if(!pass(11,1,203,"knob",0)) break;

			f = true;
			}
			while(false);
			if ((f) || (isTrain)) {
				exercisePassedSuccesfully();
			} else {
				exercisePassedUnSuccesfully();
			}
			//f ? alert('Упражнение выполнено верно!') : alert('Экзамен не сдан!');
		}); // END EXERCIZE TEST  ALGORITHM

		// START EXERCIZE TEST HINTS
		$('a[data="coach-activator"]').on('click',function() {if (isTrain) {
			/* объяснение значений функции hinter 
				// Первая цифра — порядковый номер клика по .control
				// Вторая цифра — номер родительского блока нужной кнопки
				// Третий параметр — название типа контрола
				// Четвертый параметр — верное положение контрола. При нем срабатывает следующая подсказка
			*/
				hinterStart(203,"toggler",3,"Переключите тумблер ПИТАНИЕ в ОТКЛ"); //!D
				hinterNextBlock(0,203,"toggler",3,1, 501,"toggler",1,"Выключите прибор П-200-I нажатием кнопки ПЕРЕДАТЧИК-I ОТКЛ"); //!D
				hinterNextBlock(1,501,"toggler",1,1, 203,"knob",0,"Установите переключатель в положение ДИСТ");
				hinterNextBlock(2,203,"knob",0,0, 205,"knob",1,"Установите переключатель УПРАВЛЕНИЕ в положение ДИСТ");
				hinterNextBlock(3,205,"knob",1,2, 301,"knob",1,"Установите переключатель МЕСТН-ОТКЛ-ДИСТ в положение МЕСТН");
				hinterNextBlock(4,301,"knob",1,2, 203,"rotator",0,"Ручкой ГЛУБИНА МОДУЛЯЦИИ установите глубину, примерно равную 45%");
				hinterNextBlock(5,203,"rotator",0,45, 201,"rotator",1,"Уменьшите уровень автоконтроля до 4,8В потенциометром ПРИВОД I <span class=what>45</span>");
				hinterNextBlock(6,201,"rotator",1,45, 301,"knob",0,"Установите переключатель РЕМОНТ в положение 1, а затем обратно в 0");
				hinterNextBlock(7,301,"knob",0,1, 203,"rotator",0,"Ручкой ГЛУБИНА МОДУЛЯЦИИ установите глубину в 80%");
				hinterNextBlock(8,203,"rotator",0,80, 301,"knob",1,"Установите переключатель УПРАВЛЕНИЕ в ОТКЛ");
				hinter(9,301,"knob",1,1, 301,"toggler",0,"Переключител тумблер ОСНОВНОЙ П200 в положение II");
				hinterNextBlock(10,301,"toggler",0,1, 203,"knob",0,"Установите переключатель УПРАВЛЕНИЕ в положение МЕСТНОЕ");
				hinterEnd(11,203,"knob",0,1);
		}}); // END EXERCIZE TEST HINTS
	}); // END EXERCIZE TEST


	$('#exercise6').on('click',function() {
	 // START EXERCIZE 6 TEST ALGORITHM
		// default pos
			defaultPositions(000,1,203,'toggler',1);
			defaultPositions(000,0,203,'toggler',2);
			defaultPositions(000,0,203,'toggler',3);
			defaultPositions(000,1,203,'toggler',4);
			defaultPositions(000,0,205,'toggler',0);
			ctrl(205,'lamp',0);
			ctrl(205,'lamp',2);
			ctrl(203,'lamp',1).addClass('on');
			ctrl(301,'lamp',6);
			defaultPositions(000,1,203,"knob",0);
			defaultPositions(000,0,203,"knob",1);
			defaultPositions(000,0,203,"toggler",1);
			defaultPositions(000,1,501,"toggler",0);
			defaultPositions(000,3,501,"knob",0);
			defaultPositions(000,1,501,"toggler",4);
			defaultPositions(000,1,501,"toggler",5);
			defaultPositions(000,2,501,"knob",1);
			defaultPositions(000,1,501,"knob",2);
			defaultPositions(000,9,205,"knob",0);
			defaultPositions(000,1,205,"toggler",0);
			defaultPositions(000,2,301,"knob",1);
			defaultPositions(000,1,301,"knob",2);
			defaultPositions(000,2,301,"knob",3);
			defaultPositions(000,0,301,"toggler",0);
			defaultPositions(000,7,201,"knob",0);

			ctrl(501,'lamp',6).addClass('on');
			ctrl(501,'lamp',10).addClass('on');

			defaultPositions(000,0,200,"knob",1);
			defaultPositions(000,2,200,"knob",2);
			defaultPositions(000,2,200,"knob",3);
			defaultPositions(000,4,200,"knob",6);
			defaultPositions(000,1,200,"knob",7);
			defaultPositions(000,1,200,"knob",9);
			defaultPositions(000,3,200,"knob",10);
			defaultPositions(000,3,200,"knob",11);

			ctrl(501,'toggler',1).on('click',function(){
				ctrl(501,'lamp',6).removeClass('on');
			});
			ctrl(501,'toggler',3).on('click',function(){
				ctrl(501,'lamp',10).removeClass('on');
			});

			ctrl(200,'knob',0).on('click',function(){
				if ($(this).attr('status') == 0) {
					$('.scale200 .arrow').css('-webkit-transform','rotate(0deg)');
				} 
				if ($(this).attr('status') == 1) { 
					$('.scale200 .arrow').css('-webkit-transform','rotate(-28deg)');
				} 
				if ($(this).attr('status') == 2) { 
					$('.scale200 .arrow').css('-webkit-transform','rotate(28deg)');
				} 
				if ($(this).attr('status') == 3) { 
					$('.scale200 .arrow').css('-webkit-transform','rotate(-30deg)');
				} 
				if ($(this).attr('status') == 4) { 
					$('.scale200 .arrow').css('-webkit-transform','rotate(-33deg)');
				} 
			});

			ctrl(200,'knob',15).on('click',function(){
				if (($(this).attr('status') == 1) && ($(this).attr('progress') == 24)) {
					$('#block200 a[type="lamp"][data="num5"]').removeClass('on'); // РМ
				}
			});
			ctrl(200,'knob',15).on('click',function(){
				if (($(this).attr('status') == 1) && ($(this).attr('progress') == 28)) {
					$('#block200 a[type="lamp"][data="num5"]').removeClass('on'); // РМ
				}
			});
			ctrl(200,'knob',16).on('click',function(){
				if (($(this).attr('status') == 1) && ($(this).attr('progress') == 34)) {
					$('#block200 a[type="lamp"][data="num6"]').removeClass('on'); // РМ
				}
			});
			ctrl(200,'knob',16).on('click',function(){
				if (($(this).attr('status') == 0) && ($(this).attr('progress') == 34)) {
					$('#block200 a[type="lamp"][data="num6"]').removeClass('on'); // П200
				}
			});
			ctrl(200,'knob',13).on('click',function(){
				if (($(this).attr('status') == 0) && ($(this).attr('progress') == 35)) {
					$('#block200 a[type="lamp"][data="num3"]').removeClass('on'); // Основной 1
				}
			});


			ctrl(200,'knob',13).on('click',function(){
				if (($(this).attr('status') == 1) && ($(this).attr('progress') == 37)) {
					$('#block200 a[type="lamp"][data="num3"]').removeClass('on'); //  Основной 1
				}
			});
			ctrl(200,'knob',14).on('click',function(){
				if (($(this).attr('status') == 1) && ($(this).attr('progress') == 38)) {
					$('#block200 a[type="lamp"][data="num4"]').removeClass('on'); // ЗОГ
				}
			});
			ctrl(200,'knob',16).on('click',function(){
				if (($(this).attr('status') == 1) && ($(this).attr('progress') == 40)) {
					$('#block200 a[type="lamp"][data="num6"]').removeClass('on'); // П200
				}
			});

		// default pos end
		$('#tester').on('click',function() {
			var f = false;
			do {
			/* объяснение значений функции pass 
				// Первая цифра — порядковый номер клика по .control
				// Вторая цифра — верное положение контрола
				// Третье число — номер родительского блока нужной кнопки
				// Четвертый параметр — название типа контрола
				// Пятое число — порядковый номер конкретного типа контрола в конкретном блоке. Считается слева-направо вниз построчно
			*/
			if(!pass(0,1,203,"toggler",3)) break;
			if(!pass(1,1,501,"toggler",1)) break;
			if(!pass(2,1,501,"toggler",3)) break;
			if(!pass(3,0,301,"knob",1)) break;
			if(!pass(4,0,203,"knob",0)) break;
			if(!pass(5,2,205,"knob",1)) break;
			if(!pass(6,2,501,"knob",2)) break;
			if(!pass(7,0,301,"knob",3)) break;
			if(!pass(8,0,501,"toggler",4)) break;
			if(!pass(9,0,200,"knob",2)) break;
			if(!pass(10,1,200,"knob",4)) break;
			if(!pass(11,1,999,"knob",18)) break;
			if(!pass(12,0,200,"knob",3)) break;
			if(!pass(13,4,200,"knob",5)) break;
			//if(!pass(14,1,200,"knob",12)) break;
			//if(!pass(15,1,200,"knob",13)) break;
			//if(!pass(16,1,200,"knob",14)) break;
			//if(!pass(17,1,200,"knob",15)) break;
			//if(!pass(18,1,200,"knob",16)) break;
			

		//if(!pass(19,1,200,"toggler",0)) break;
			if(!pass(20,4,200,"knob",0)) break;
			//if(!pass(21,1,200,"knob",12)) break;
			//if(!pass(22,1,200,"knob",16)) break;
		//	if(!pass(23,2,200,"knob",8)) break;
			//if(!pass(24,1,200,"knob",15)) break;
			//if(!pass(25,1,200,"knob",14)) break;
			//if(!pass(26,1,200,"knob",16)) break;
			if(!pass(27,0,200,"knob",12)) break;
			//if(!pass(28,1,200,"knob",15)) break;
			//if(!pass(29,1,200,"knob",13)) break;
			//if(!pass(30,2,200,"knob",16)) break;
			//if(!pass(31,1,200,"knob",15)) break;
			//if(!pass(32,2,200,"knob",14)) break;
			//if(!pass(33,0,200,"knob",15)) break;
		//	if(!pass(34,0,200,"knob",16)) break;
			//if(!pass(35,0,200,"knob",13)) break;
			if(!pass(36,0,200,"knob",8)) break;
			if(!pass(37,1,200,"knob",13)) break;
			if(!pass(38,1,200,"knob",14)) break;
			if(!pass(39,1,200,"knob",15)) break;
			if(!pass(40,1,200,"knob",16)) break;
			if(!pass(41,1,200,"toggler",1)) break;



			f = true;
			}
			while(false);
			if ((f) || (isTrain)) {
				exercisePassedSuccesfully();
			} else {
				exercisePassedUnSuccesfully();
			}
			//f ? alert('Упражнение выполнено верно!') : alert('Экзамен не сдан!');
		}); // END EXERCIZE TEST  ALGORITHM

		// START EXERCIZE TEST HINTS
		$('a[data="coach-activator"]').on('click',function() {if (isTrain) {
			/* объяснение значений функции hinter 
				// Первая цифра — порядковый номер клика по .control
				// Вторая цифра — номер родительского блока нужной кнопки
				// Третий параметр — название типа контрола
				// Четвертый параметр — верное положение контрола. При нем срабатывает следующая подсказка
			*/
			hinterStart(203,"toggler",3,"Переключите тумблер ПИТАНИЕ в ОТКЛ");
			hinterNextBlock(0,203,"toggler",3,1, 501,"toggler",1,"Нажмите кнопку ПЕРЕДАТЧИК-I ОТКЛ");
			hinter(1,501,"toggler",1,1, 501,"toggler",3,"Нажмите кнопку ПЕРЕДАТЧИК-II ОТКЛ"); //!D
			hinterNextBlock(2,501,"toggler",3,1, 301,"knob",1,"Установите переключатель УПРАВЛЕНИЕ в положение ДИСТ");
			hinterNextBlock(3,301,"knob",1,0, 203,"knob",0,"Установите переключатель УПРАВЛЕНИЕ в положение ДИСТ");
			hinterNextBlock(4,203,"knob",0,0, 205,"knob",1,"Установите переключатель МЕСТН-ОТКЛ-ДИСТ в положение ДИСТ");
			hinterNextBlock(5,205,"knob",1,2, 501,"knob",2,"Установите переключатель РУЧ-АВТ-ДИСТ в положение ДИСТ.");
			hinterNextBlock(6,501,"knob",2,2, 301,"knob",3,"Установите переключатель УПРАВЛЕНИЕ в положение ДИСТ");
			hinterNextBlock(7,301,"knob",3,0, 501,"toggler",4,"Включите тумблер ЗАДЕРЖКА 80..100с"); //!D
			hinterNextBlock(8,501,"toggler",4,0, 200,"knob",2,"Установите переключатель КАНАЛЫ в положение ТФ ВЫД");
			hinter(9,200,"knob",2,0, 200,"knob",4,"Установите переключатель РЕЖИМ в положение МЕСТНОЕ"); //!D
			hinterNextBlock(10,200,"knob",4,1, 999,"knob",18,"Установите переключатель УПРАВЛЕНИЕ в положение ПАНЕЛЬ ДП"); //!D
			hinterNextBlock(11,999,"knob",18,1, 200,"knob",3,"Установите переключатель ВИД СИГНАЛОВ в положение КОД ИНФ");
			hinter(12,200,"knob",3,0, 200,"knob",5,"Установите переключатель БОДЫ в положение 200");
			hinter(13,200,"knob",5,4, 200,"knob",12,"Установите переключатель ОСНОВНОЙ I в положение 0");
			hinter(14,200,"knob",12,1, 200,"knob",13,"Установите переключатель ОСНОВНОЙ II в положение 0");
			hinter(15,200,"knob",13,1, 200,"knob",14,"Установите переключатель ЗОГ в положение 0");
			hinter(16,200,"knob",14,1, 200,"knob",15,"Установите переключатель РМ в положение 0");
			hinter(17,200,"knob",15,1, 200,"knob",16,"Установите переключатель П200 в положение 0"); //!F после этого ещё надо включить тумблер СЕТЬ 
			

			hinter(18,200,"knob",16,1, 200,"toggler",1, "Включите тумблер СЕТЬ");
			hinter(19,200,"toggler",1,0, 200,"knob",0,"Проверьте напряжение с помощью индикатороного прибора, поочередно устанавливая переключатель КОНТРОЛЬ в положения: -4В, +4В, -12В, +27В");

			hinter(20,200,"knob",0,4, 200,"knob",12,"Установите переключатель ОСНОВНОЙ I в положение ВКЛ, а затем обратно в положение 0");
			hinter(21,200,"knob",12,1, 200,"knob",16,"Установите переключатель П200 в положение ВКЛ, а затем обратно в 0");
			hinter(22,200,"knob",16,1, 200,"knob",8,"Установите переключатель ВИД РАБОТЫ в положение ТРАНСЛЯЦИЯ, а затем в положенеие ПРИВОД");
			hinter(23,200,"knob",8,2, 200,"knob",15,"Установите переключатель РМ в положение ВКЛ, а затем обратно в 0");
			hinter(24,200,"knob",15,1, 200,"knob",14,"Установите переключатель ЗОГ в положение ВКЛ, а затем обратно в 0");
			hinter(25,200,"knob",14,1, 200,"knob",16,"Установите переключатель П200 в положение ВЫКЛ, а затем снова в 0");
			hinter(26,200,"knob",16,1, 200,"knob",12,"Установите переключатель ОСНОВНОЙ I в положение ВЫКЛ, а затем снова в 0");
			hinter(27,200,"knob",12,1, 200,"knob",15,"Установите переключатель РМ в положение ВЫКЛ, а затем снова в 0");
			hinter(28,200,"knob",15,1, 200,"knob",13,"Установите переключатель ОСНОВНОЙ II в положение ВКЛ, а затем обратно в 0");
			hinter(29,200,"knob",13,1, 200,"knob",16,"Установите переключатель П200 в положение ВКЛ");
			hinter(30,200,"knob",16,2, 200,"knob",15,"Установите переключатель РМ в положение ВКЛ, а затем в 0");
			hinter(31,200,"knob",15,1, 200,"knob",14,"Установите переключатель ЗОГ в положение ВЫКЛ, а затем в положение ВКЛ");
			hinter(32,200,"knob",14,2, 200,"knob",15,"Установите переключатель РМ в положение ВЫКЛ");
			hinter(33,200,"knob",15,0, 200,"knob",16,"Установите переключатель П200 в положение ВЫКЛ");
			hinter(34,200,"knob",16,0, 200,"knob",13,"Установите переключатель ОСНОВНОЙ II в положение ВЫКЛ");
			hinter(35,200,"knob",13,0, 200,"knob",8,"Установите переключатель ВИД РАБОТЫ в положение 0");
			hinter(36,200,"knob",8,0, 200,"knob",13,"Установите переключатель ОСНОВНОЙ II в положение 0");
			hinter(37,200,"knob",13,1, 200,"knob",14,"Установите переключатель ЗОГ в положение 0");
			hinter(38,200,"knob",14,1, 200,"knob",15,"Установите переключатель РМ в положение 0");
			hinter(39,200,"knob",15,1, 200,"knob",16,"Установите переключатель П200 в положение 0");
			hinter(40,200,"knob",16,1, 200,"toggler",1,"Выключите тумблер питания ИП-2");
			hinterEnd(41,200,"toggler",1,1);


		}}); // END EXERCIZE TEST HINTS
	}); // END EXERCIZE TEST



// Добавляем Disclaimer







}



 
