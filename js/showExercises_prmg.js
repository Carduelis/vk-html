// Показ упражнений

var eN = 1;
var pN = 1;
var aN = 1;
//var eNdouble = 1;
var isPositionsThereBoolean = true; 

$('#go').one('click',function(){
	set_default(thisExId);
	$('.header').append('<li id="nameOfExercise" class="btn"><a><i>Упражнение: </i>'+exercisesContainer[thisExId].nameOfExercise+'</a></li>');
	
	if (helloText[thisExId]) {
		alert(helloText[thisExId]);
		if (eN != posCount(thisEx[thisExId]) - 1)  {
			alert('Упражнение выполнено!');
			$('#reloadPage').addClass('active');
			$('#chooseExercise, #nameOfExercise, #chooseExerciseBody').hide();
			hideAndRemoveAllHints(); // Скрываем остаточную инфу от всех элементов
		}
	}

	$('#chooseExercise').hide();
	// Создаем переменные 
	for(var i in exercisesOptions[thisExId]) {
		numOfOptions = Object.keys(exercisesOptions[thisExId][i].options).length; // У нас всегда равно 2
		window[exercisesOptions[thisExId][i].typeName] = exercisesOptions[thisExId][i].options['option'+random(numOfOptions)].codeName
		console.info(exercisesOptions[thisExId][i].typeName+': '+window[exercisesOptions[thisExId][i].typeName]);
	}
	// Скопировано из _rsp.js
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
	$('#history').one('click', function(){
		exportAlgorythm(thisExId);
	})
	showText(thisExId,eN,pN);
	showFirstStepTrainingFeatures(eN,pN); // Показали первый элемент в первой позиции
	$('#chooseExerciseBody').hide(); // Скрыли ненужное
	$('#chooseExercise a').removeClass('active'); // И еще скрыли
	if ((eN == 1)
		&& ($('#'+str_whatever(eN,'inBlock',choosenParam)).parent().hasClass('card-holder'))
	) {
		$('#min_stack0 .card-block').addClass('opened');
	}
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
				showText(thisExId,eN,pN);
				showTrainingFeatures(eN,pN, choosenParam);
				next_eN=eN+1;
				if (mode == 'training') {
					focusOnElementInPopUp()
				}
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
						showText(thisExId,eN,pN);
						showTrainingFeatures(eN,pN,choosenParam); // показываем информацию о следующей позиции текущего элемента
						next_eN=eN+1;
						if (mode == 'training') {
							focusOnElementInPopUp()
						}
						
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

								console.info(eN);
								eN = +eN + +thisEx[thisExId]['el'+eN][choosenParam].shift;
								eN++;
								// Нам так же нужно еще раз проверить новое значение choosenParam
								detectMultiply();
								console.info(eN);
								if (eN == posCount(thisEx[thisExId]) - 1) {
									alert('Упражнение выполнено!');

									$('#reloadPage').addClass('active');
									$('#chooseExercise, #nameOfExercise, #chooseExerciseBody').hide();
									hideAndRemoveAllHints(); // Скрываем остаточную инфу от всех элементов
								}
							}
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
							showText(thisExId,eN,pN);
							showTrainingFeatures(eN,pN,choosenParam); // Показываем информацию о следующем элементе
							next_eN=eN+1;
							if (mode == 'training') {
								focusOnElementInPopUp()
							}
						} else {
							alert('Упражнение выполнено!');
							$('#reloadPage').addClass('active');
							$('#chooseExercise, #nameOfExercise, #chooseExerciseBody').hide();
							hideAndRemoveAllHints(); // Скрываем остаточную инфу от всех элементов
						}
					}
				}
			}
		}
		//////////////////////////////////////////////////

	};


	setTimeout(function(){
		$('#stack0_block1_front .element[type="toggler"][num="21"]').each(function(){
			stack0_block1_front__toggler__21($(this));
		});
		$('#stack0_block1_front .element[type="toggler"][num="5"]').each(function(){
			stack0_block1_front__toggler__5($(this));
		});
	}, 1000);
	$('#stack0_block1_front .element[type="toggler"][num="21"]').on('click', function(){
		stack0_block1_front__toggler__21($(this));
	});
	$('#stack0_block1_front .element[type="toggler"][num="5"]').on('click', function(){
		stack0_block1_front__toggler__5($(this));
	});

});

	// Зависимости между тумблерами и лампочками
	function stack0_block1_front__toggler__21(element) {
		if (element.attr('status') == '0') {
			$('#stack0_block1_front .element[type="lamp"][num="100"]').attr('status','on');
			$('#stack0_block1_front .element[type="lamp"][num="115"]').attr('status','off');
		} else {
			$('#stack0_block1_front .element[type="lamp"][num="100"]').attr('status','off');
			$('#stack0_block1_front .element[type="lamp"][num="115"]').attr('status','on'); 
		}
	}
	function stack0_block1_front__toggler__5(element) {
		if (element.attr('status') == '0') {
			$('#stack0_block1_front .element[type="lamp"][num="16"]').attr('status','on');
			$('#stack0_block1_front .element[type="lamp"][num="23"]').attr('status','off');
		} else {
			$('#stack0_block1_front .element[type="lamp"][num="16"]').attr('status','off');
			$('#stack0_block1_front .element[type="lamp"][num="23"]').attr('status','on'); 
		}
	}

function hideAndRemoveAllHints() {
	
	$('.element').removeClass('shadow');
	$('section').removeClass('active');
	$('#hidePopUp').removeClass('active');
	$('.element').find('.hint').remove();
}



var screenTop = 0;
var elementOffsetTop; 
var screenHeight = $(window).height();
var screenBottom = screenTop + screenHeight - 60;
$(window).resize(function(){
	screenHeight = $(this).height();
	//console.info(screenHeight);
});
$(window).scroll(function(){
	screenTop = $(this).scrollTop();
	screenBottom = screenTop + screenHeight - 60;
	//console.info(screenTop);
});

function set_default(thisExId) {
	var defaultPosition;
	var choosenParamForDP = null;
	for (var el in exercisesContainer[thisExId]) {
		if (exercisesContainer[thisExId][el].current) {
			sideForDP = exercisesContainer[thisExId][el].current.onSide;
			numForDP = exercisesContainer[thisExId][el].current.num;
			typeForDP = exercisesContainer[thisExId][el].current.type;
		} else {
			if (el == 'nameOfExercise')  {
				console.info('nameOfExercise')
			} else {
				console.info('multiply не реализован, он встретился на'+el);
			}
		}
		if (exercisesContainer[thisExId][el].defaultPosition) {
			defaultPosition = exercisesContainer[thisExId][el].defaultPosition;
			console.info(el+': '+defaultPosition);
			var eN = el.substr(2);
			obj_element(eN,choosenParamForDP).attr('status',defaultPosition)
		} else {
			console.info(thisExId+' '+el+' defaultPosition is false')
		}
	}
}
function showText(thisExId,eN,pN) {
	setTimeout(function(){
		for (var message in exerciseText[thisExId]) {
			console.info('exerciseText '+thisExId+' '+message);
				console.info('exerciseText'+thisExId+message);
				console.info(exerciseText[thisExId][message])
				if (exerciseText[thisExId][message].eN == eN) {
					if (exerciseText[thisExId][message].pN) {
						if (exerciseText[thisExId][message].pN == pN) {
								alert(exerciseText[thisExId][message].text)
						}
					} else {
						alert(exerciseText[thisExId][message].text)
					}
				}
			
		}
	},200)
	
}
function focusOnElement(parameter){
	detectMultiplyPrev();
	var isNotSameBlockInCardHolder = true;
	if ($('#'+str_whatever((eN-1),'inBlock', choosenParamPrev)).parent().hasClass('card-holder')) {
		if ($('#'+str_whatever((eN-1),'inBlock', choosenParamPrev)).parent().attr('id') == $('#'+str_whatever(eN,'inBlock', choosenParam)).parent().attr('id')) {
			isNotSameBlockInCardHolder = false;
		}
	}
	if (
		(str_whatever((eN-1),'inBlock',choosenParamPrev)) 
		// проверяет наличие значения stackN_blockM_side
		&&
		(str_whatever(eN,'inBlock',choosenParam) != str_whatever((eN-1),'inBlock',choosenParamPrev))
		&& 
		(isPositionsThereBoolean)
		&&
		(str_whatever((eN-1),'inBlock',choosenParamPrev) != 'stack1_block2')
		&&
		(isNotSameBlockInCardHolder)
		// (Нужно, чтобы было false при случае, если предыдущий и последующий элементы находятся на разных картах, но в одном кард-блоке)
		// (если у нас карты разных секциях)
	)	{
		console.info('Следующий блок');
		$('.card-block').addClass('opened');
		$('#hidePopUp').addClass('highlight');
		$('#blocks').animate({
			scrollTop: 0
		}, 600);
		setTimeout(function(){
			//$('#hidePopUp').removeClass('active');
			$('.card-block').addClass('opened');
		},1300);
	} else {
		console.info('В том же блоке')
		$('#hidePopUp').removeClass('active');
	}
}



function focusOnMinBlock(parameter){
	//elementOffsetLeft = obj_element(eN, choosenParam).offset().left;\
		if (parameter) {
			elementOffsetTop = parameter;

		} else {
			if(obj_element(eN, choosenParam)) {
				if(obj_element(eN, choosenParam).offset()) {
					choosenParam =null;
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
			/*
			$('body').animate({
				scrollTop: elementOffsetTop-(screenHeight/2)
			});
			*/

			$('body').scrollTop(elementOffsetTop-(screenHeight/2))
			$('#look-up').removeClass('show');
			$('#look-down').removeClass('show');
		});
	
	return
}

function focusOnElementInPopUp(){

		if(obj_element(eN, choosenParam)) {
			if(obj_element(eN, choosenParam).offset()) {
				elementOffsetTop = obj_element(eN, choosenParam).offset().top;
			}
		}
	/*
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
		$(this).hide();
		$('#blocks').animate({
			scrollTop: elementOffsetTop-(screenHeight/2)
		}, 300);
	});
	*/

	if ((elementOffsetTop < screenTop) || (elementOffsetTop > screenBottom)) {
		console.info(elementOffsetTop+ '; ' + screenTop + '; ' +screenBottom);
		$('#blocks').animate({
			scrollTop: elementOffsetTop-(screenHeight/2)
		}, 600);
	}

	console.info(isPositionsThereBoolean+' '+pN+' '+posCount(thisEx[thisExId]['el'+eN].positions));
}
/*
function focusOnMinBlock(){
	//elementOffsetLeft = obj_element(eN, choosenParam).offset().left;
		if(str_whatever(eN, 'inBlock', choosenParam)) {
			if($('#min_'+str_whatever((eN), 'inBlock', choosenParam)).offset()) {

				heightOfBlock = $('#min_'+str_whatever((eN), 'inBlock', choosenParam)).children().height();
				elementOffsetTop = $('#min_'+str_whatever((eN), 'inBlock', choosenParam)).offset().top;
				elementOffsetTop = elementOffsetTop + heightOfBlock/2;
				console.info('elementOffsetTop'+elementOffsetTop);
				
				//	choosenParam =null;
				//	elementOffsetTop = obj_element(eN, choosenParam).offset().top;
				
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
			$('body').scrollTop(elementOffsetTop-(screenHeight/2))
			$('#look-up').removeClass('show');
			$('#look-down').removeClass('show');
		});
	
	return
}
*/
function showhint(eN, choosenParam) {
	// TO DO 
	// Вбить значения в html, и цеплять их оттуда
	var block = nameOfStack(str_whatever(eN, 'inBlock', choosenParam));	
	var stack = nameOfStack(str_whatever(eN, 'inStack'));
	var minBlockId = "min_"+str_whatever(eN, 'inBlock', choosenParam);	
	console.info(minBlockId);
	/* 
	*/
	if ($('#'+minBlockId)) {
		if($('#'+minBlockId).offset()) {
			//focusOnMinBlock($('#'+minBlockId).offset().top);
		}
	}
	$('#container section').removeClass('active');
	$('#'+minBlockId).addClass('active');
	$('#showhint span').html('Стойка: <b class="active" id="goToStack">'+stack+'</b>, Блок: <b id="goToBlock">'+block+'</b>');
}

$('#container section > div').on('click', function(){
	$('body').css('overflow', 'hidden');
	setTimeout(function(){
		if (mode == 'training') {
			focusOnElementInPopUp()
		}
	},500)
})
$('#hidePopUp').on('click', function(){
	$(this).removeClass('highlight');
	$('body').removeAttr('style');
});
