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

	showFirstStepTrainingFeatures(eN,pN); // Показали первый элемент в первой позиции
	$('#chooseExerciseBody').hide(); // Скрыли ненужное
	$('#chooseExercise a').removeClass('active'); // И еще скрыли

	$('.element').on('click',function() {

	////////
		detectMultiply();
		var thisType = $(this).attr('type');
		var thisNum = $(this).attr('num');
		var thisStatus = $(this).attr('status');
		var thisView = $(this).attr('view');
		var thisViewSpecial = $(this).attr('view_special');
		var thisSide = $(this).parent().attr('id');
		var thisBlock = $(this).parent().parent().attr('id');

		history(thisType,thisNum,thisStatus,thisSide,thisBlock);

	
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

							console.info(eN);
							eN = +eN + +thisEx[thisExId]['el'+eN][choosenParam].shift;
							eN++;
							// Нам так же нужно еще раз проверить новое значение choosenParam
							detectMultiply();
							console.info(eN);
						}
						showTrainingFeatures(eN,pN,choosenParam); // Показываем информацию о следующем элементе
					} else {
						alert('Упражнение выполнено!');
						hideAndRemoveAllHints(); // Скрываем остаточную инфу от всех элементов
					}
				}
			}
		}
		//////////////////////////////////////////////////


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

	});
});


function hideAndRemoveAllHints() {
	
	$('.element').removeClass('shadow');
	$('section').removeClass('active');
	$('#hidePopUp').removeClass('active');
	$('.element').find('.hint').remove();
	
}





function focusOnElement(parameter){
	detectMultiplyPrev();
	if (
		(str_whatever((eN-1),'inBlock',choosenParamPrev)) 
		// проверяет наличие значения stackN_blockM_side
		&&
		(str_whatever(eN,'inBlock',choosenParam) != str_whatever((eN-1),'inBlock',choosenParamPrev))
		&& 
		(isPositionsThereBoolean)
		// &&
		// (если у нас карты разных секциях)
	)	{
		console.info('Следующий блок');
		$('#hidePopUp').addClass('active');
		setTimeout(function(){
			$('#hidePopUp').removeClass('active');
		},1000);
	} else {
		console.info('В том же блоке')
		$('#hidePopUp').removeClass('active');
	}
}


function showhint(eN, choosenParam) {
	// TO DO 
	// Вбить значения в html, и цеплять их оттуда
	var block = nameOfStack(str_whatever(eN, 'inBlock', choosenParam));	
	var stack = nameOfStack(str_whatever(eN, 'inStack'));
	var minBlockId = "min_"+str_whatever(eN, 'inBlock', choosenParam);	
	console.info(minBlockId);
	$('#container section').removeClass('active');
	$('#'+minBlockId).addClass('active');
	$('#showhint span').html('Стойка: <b class="active" id="goToStack">'+stack+'</b>, Блок: <b id="goToBlock">'+block+'</b>');
}