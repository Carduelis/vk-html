// Показ упражнений

var eN = 1;
var pN = 1;
var aN = 1;
//var eNdouble = 1;
var isPositionsThereBoolean = true;

$('#go').one('click',function(){
	$('.header').append('<li class="btn"><a><i>Упражнение: </i>'+exercisesContainer[thisExId].nameOfExercise+'</a></li>');

	if (helloText[thisExId]) {
		alert(helloText[thisExId]);
	}
	$('#chooseExercise').hide();
	// Создаем переменные 
	for(var i in exercisesOptions[thisExId]) {
		numOfOptions = Object.keys(exercisesOptions[thisExId][i].options).length; // У нас всегда равно 2
		window[exercisesOptions[thisExId][i].typeName] = exercisesOptions[thisExId][i].options['option'+random(numOfOptions)].codeName
		console.info(exercisesOptions[thisExId][i].typeName+': '+window[exercisesOptions[thisExId][i].typeName]);
	}

		detectMultiply();
		console.info(choosenParam);
	// Пишем выбранные параметры
	$('#chooseExerciseBody .options a.active').each(function(){
		optionBlock = $(this).attr('data-type');
		window[exercisesOptions[thisExId][optionBlock].typeName] = $(this).attr('data-codename');
	})
	for(var i in exercisesOptions[thisExId]) {
		console.info(exercisesOptions[thisExId][i].typeName+': '+window[exercisesOptions[thisExId][i].typeName]);
	};
	// Фазоиндикатор
	if ((thisExId == 'ex1') || (thisExId == 'ex2')) {
		if (phases == 'phase_incorrect') {
			$('.element[view_special="phase"]').attr('phase','incorrect')
		}
		if (phases == 'phase_correct') {
			$('.element[view_special="phase"]').attr('phase','correct')
		}
	}
		
	$('#history').one('click', function(){
		exportAlgorythm(thisExId);
	})

	showFirstStepTrainingFeatures(eN,pN); // Показали первый элемент в первой позиции
	$('#chooseExerciseBody').hide(); // Скрыли ненужное
	$('#chooseExercise a').removeClass('active'); // И еще скрыли
	
	$('.element').not('[type="rotator"]').on('click',superFunction);
	$('.element[type="rotator"]').on('mouseup',superFunction);
	function superFunction() {
	////////
		detectMultiply();
		var thisType = $(this).attr('type');
		var thisNum = $(this).attr('num');
		var thisStatus = $(this).attr('status');
		var thisView = $(this).attr('view');
		var thisViewSpecial = $(this).attr('view_special');
		var thisSide = $(this).parent().attr('id');
		var thisBlock = $(this).parent().parent().attr('id');
		console.log('thisType: '+thisType+'thisNum: '+thisNum+'thisStatus: '+thisStatus+'thisView: '+thisView+'thisViewSpecial: '+thisViewSpecial+'thisSide: '+thisSide+'thisBlock: '+thisBlock)
		history(thisType,thisNum,thisStatus,thisSide,thisBlock);

		if (
			(thisNum == str_whatever(eN, 'num',choosenParam) )
			&&
			(thisType == str_whatever(eN, 'type',choosenParam) )
		) { // Примерное условие, чтобы подсказки для следующих элементах не появлялись при клике куда попало
			console.info('choosenParam: '+choosenParam+'; eN: '+eN+'; ');
			
			if (isShift(eN,choosenParam)) {
				console.info(eN);
				eN = +eN + +thisEx[thisExId]['el'+eN][choosenParam].shift;
				pN = 1;
				console.info(eN);
				showTrainingFeatures(eN,pN, choosenParam);
			} else {
				if ($(this).attr('status') == str_pos_whatever(eN, 'state',pN,choosenParam)) { // Когда текущий контрол в нужной позиции
					aN = 1; // Сбрасываем в дефолтное состояние, так как при новой позиции элемента эта переменная равна числу событий предыдущей позиции
					// Проверка: все ли позиции данного элемента учтены?
					if (isPositionsThere(eN,choosenParam))  { // Нет, еще есть позиции
						isPositionsThereBoolean = false;
						for (var i = 0; i < positionsObj(eN,pN,choosenParam)-2; i++) {
							showActions(eN,pN,aN,choosenParam);
							//console.info(posCount(thisEx[thisExId]['el'+eN].positions['position_'+pN])+'; if(choosenParam): '+positionsObj(eN,pN,choosenParam));
							aN++
						};
						pN++ // идем к следующей позиции
						showTrainingFeatures(eN,pN,choosenParam); // показываем информацию о следующей позиции текущего элемента
			
						
					} else { // все учтено, следующий элемент

						isPositionsThereBoolean = true;
						if (thisEx[thisExId]['el'+(eN+1)]) {
							console.info('multiply: '+thisEx[thisExId]['el'+eN].multiply+'; '+thisEx[thisExId]['el'+(eN+1)].multiply+': '+choosenParam);
						} else {
							console.info('multiply: '+thisEx[thisExId]['el'+eN].multiply+'; конец');
						}
						for (var i = 0; i < positionsObj(eN,pN,choosenParam)-2; i++) {
							showActions(eN,pN,aN,choosenParam);
							//console.info(posCount(thisEx[thisExId]['el'+eN].positions['position_'+pN])+'; if(choosenParam): '+positionsObj(eN,pN,choosenParam));
							aN++
						};

						pN = 1; // в предыдущем элементе накопился счетчик позиций, надо сбросить
						
						if (eN != posCount(thisEx[thisExId]) - 1)  { // Проверка: последний ли элемент?
							eN++;
							// Идем к следующему элементу
							detectMultiply();
							// Если следующий элемент содержит shift, то showTrainingFeatures(eN,pN,choosenParam) не может ничего показать

							if (isShift(eN,choosenParam)) {

								console.info(eN + ' shift');
								eN = +eN + +thisEx[thisExId]['el'+eN][choosenParam].shift;
								eN++;
								// Нам так же нужно еще раз проверить новое значение choosenParam
								detectMultiply();
								console.info('eN: '+eN+'; posCount: '+posCount(thisEx[thisExId]));
								if (eN == posCount(thisEx[thisExId]) - 1) {
									alert('Упражнение выполнено!');
									hideAndRemoveAllHints(); // Скрываем остаточную инфу от всех элементов
									$('#bx-pager, #history').show();
									$('#history + .btn').remove();
									$('#showBxPager').hide();
									$('#chooseExercise,#reloadPage').addClass('active');
								}
							}
							/*
							if (obj_element(eN, choosenParam).attr('status') == str_pos_whatever(eN, 'status', 1, choosenParam) ) {
								if(isPositionsThereBoolean) {
									//showTrainingFeatures(eN,(pN+1),choosenParam); // Показываем информацию о следующем элементе
								} else {
									//showTrainingFeatures((eN+1),pN,choosenParam); // Показываем информацию о следующем элементе
								}
							} else {

							}
							*/
							console.info('Статус текущего элемента: '+obj_element(eN, choosenParam).attr('status'));
							console.info('Необходимый статус элемента (pN): '+str_pos_whatever(eN, 'state',pN,choosenParam));
							if (obj_element(eN, choosenParam).attr('status') == str_pos_whatever(eN, 'state',pN,choosenParam)) {

								if (isPositionsThere(eN,choosenParam)) {

									aN = 1;
									detectMultiply();
									for (var i = 0; i < positionsObj(eN,pN,choosenParam)-2; i++) {
										showActions(eN,pN,aN,choosenParam);
										//console.info(posCount(thisEx[thisExId]['el'+eN].positions['position_'+pN])+'; if(choosenParam): '+positionsObj(eN,pN,choosenParam));
										aN++
									};
									scaleAlive(str_whatever(eN, 'onSide',choosenParam),str_whatever(eN, 'type',choosenParam),str_whatever(eN, 'num',choosenParam),str_pos_whatever(eN, 'state',pN,choosenParam));
									pN++;
								} else {
									eN++;
									detectMultiply();
								}
							}
							showTrainingFeatures(eN,pN,choosenParam); // Показываем информацию о следующем элементе

						} else {
							alert('Упражнение выполнено!');
							hideAndRemoveAllHints(); // Скрываем остаточную инфу от всех элементов
							$('#bx-pager, #history').show();
							$('#history + .btn').remove();
							$('#showBxPager').hide();
							$('#chooseExercise,#reloadPage').addClass('active');
						}
					}
				}
			}
		}
		//////////////////////////////////////////////////

		/*
		$('.element[type="scale"]').each(function(){
			var statusDeg = $(this).attr('status');
			$(this).find('.body').css('-webkit-transform','rotate('+(statusDeg-15)+'deg)');

		});
		setTimeout(function(){
			$('.element[type="scale"]').each(function(){
				var statusDeg = $(this).attr('status');
				$(this).find('.body').css('-webkit-transform','rotate('+statusDeg+'deg)');
			});
		},600);
		*/
	}

// Подсветка
$('#stack7_block1_front .element[type="toggler"][num="4"]').on('click', function(){
  if ($(this).attr('status') == '0') {
    $('#stack7_block1_front .element[type="scale"][num="1"]').addClass('light');
  } else {
    
    $('#stack7_block1_front .element[type="scale"][num="1"]').removeClass('light');
  }
})
});




function hideAndRemoveAllHints() {
	$('section, #bx_pager a, .element').removeClass('shadow');
	$('.element').find('.hint').remove();
	$('#bx-pager *').removeClass('shadow');  // wtf ??????!??!??!?!?!?
}



var screenTop;
var screenBottom;
var elementOffsetTop; 
var screenHeight = $(window).height();
$(window).resize(function(){
	screenHeight = $(this).height();
	//console.info(screenHeight);
});
$(window).scroll(function(){
	screenTop = $(this).scrollTop();
	screenBottom = screenTop + screenHeight - 60;
	//console.info(screenTop);
});
function focusOnElement(parameter){
	//elementOffsetLeft = obj_element(eN, choosenParam).offset().left;
	if (parameter) {
		elementOffsetTop = parameter
	} else {
		if(obj_element(eN, choosenParam)) {
			if(obj_element(eN, choosenParam).offset()) {
				elementOffsetTop = obj_element(eN, choosenParam).offset().top;
			}
		}
	}
	if (elementOffsetTop < screenTop) {
		$('#look-up').addClass('show');
	} else if (elementOffsetTop > screenBottom) {
		$('#look-down').addClass('show');
	}
	$(window).scroll(function(){
		if (elementOffsetTop < screenTop) {
			$('#look-up').addClass('show');
		} else if (elementOffsetTop > screenBottom) {
			$('#look-down').addClass('show');
		}
		if (
			(elementOffsetTop > screenTop)
			&&
			(elementOffsetTop < screenBottom)
		) {
			$('#look-up').removeClass('show');
			$('#look-down').removeClass('show');
		}
	});

	$('#look-up, #look-down').on('click', function(){
		$('body').animate({
			scrollTop: elementOffsetTop-(screenHeight/2)
		}, 300);
		//

	});

//	console.info(isPositionsThereBoolean+' '+pN+' '+posCount(thisEx[thisExId]['el'+eN].positions));
	detectMultiplyPrev();
	if (
		(str_whatever((eN-1),'inStack',choosenParamPrev)) 
		// проверяет наличие значения stackN_blockM_side
		&&
		(str_whatever(eN,'inStack',choosenParam) != str_whatever((eN-1),'inStack',choosenParamPrev))
		&& 
		(isPositionsThereBoolean)
	)	{

		setTimeout(function(){
			$('#bx-pager').fadeIn();
			$('#showBxPager').removeClass('attention').hide();
		},500);
	}
}

function showhint(eN, choosenParam) {
	// TO DO 
	// Вбить значения в html, и цеплять их оттуда
	var block = nameOfBlock(str_whatever(eN, 'inBlock', choosenParam));	
	var stack = nameOfStack(str_whatever(eN, 'inStack'));

	$('#showhint span').html('Стойка: <b class="active" id="goToStack">'+stack+'</b>, Блок: <b id="goToBlock">'+block+'</b>');
	
		setTimeout(function(){
			if($('#stack6_block3_front .element[type="knob"][num="14"]').hasClass('shadow')) {
				$('#stack6_block3_front .door').addClass('opened');
			}
		}, 1000)

	if(choosenParam) {
		$('#bx-pager a').not($('.'+str_whatever(eN, 'inStack', choosenParam))).addClass('opacity'); // minimap-stack
		$('.'+str_whatever(eN, 'inStack',choosenParam)).addClass('shadow'); // minimap-stack
		$('#min_'+str_whatever(eN, 'inBlock',choosenParam)).addClass('shadow'); // minimap-block
		/*
		if (str_whatever(eN, 'inBlock', choosenParam) != str_whatever(eN, 'inBlock'+1, choosenParam)) {
			$('#showBxPager').addClass('attention');
			//$('#showhint span').html('Действия на данном блоке завершены. <b class="active" id="goToBlock">Кликните здесь для перехода к следующему блоку</b> или воспользуйтесь кнопкой перехода к общему виду: "Показать РСП-11 целиком"');
		}
		*/
	} else {
		$('#bx-pager a').not($('.'+str_whatever(eN, 'inStack'))).addClass('opacity'); // minimap-stack
		$('.'+str_whatever(eN, 'inStack')).addClass('shadow'); // minimap-stack
		$('#min_'+str_whatever(eN, 'inBlock')).addClass('shadow'); // minimap-block
		/*
		if (str_whatever(eN, 'inBlock') != str_whatever(eN, 'inBlock'+1)) {
			$('#showBxPager').addClass('attention');
			//$('#showhint span').html('Действия на данном блоке завершены. <b class="active" id="goToBlock">Кликните здесь для перехода к следующему блоку</b> или воспользуйтесь кнопкой перехода к общему виду: "Показать РСП-11 целиком"');
		}
		*/
	}


	$('#goToStack').on('click', function(){
		slider.goToSlide(str_whatever(eN, 'inStack',choosenParam).charAt(5));
		//$(this).removeClass('active');
		$('#goToBlock').addClass('active');
	});

	$('#goToBlock').on('click', function(){ 
		var offset = $('#'+str_whatever(eN, 'inBlock',choosenParam)).offset();
		slider.goToSlide(str_whatever(eN, 'inStack',choosenParam).charAt(5));
		$('body').scrollTop(offset.top);
	});
}
