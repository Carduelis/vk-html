//fitText if needed
//jQuery(".phones b").fitText();

var objName = "";
function ObjOutput(obj,step) {
	//alert(obj.toString());
	var log = $('#exlog');
	
    log.append(step+objName+" : {<br>");
    for(var i in obj) {
    	objName = i;
	    if(typeof obj[i] == "object") {
	        var nobj = obj[i];
	        ObjOutput(nobj,(step+"- "));
		} else {
	        log.append(step+'- '+i+" : <i>'"+obj[i]+"'</i>,<br>");
	    }
	}
	log.append(step+"},<br>");
}
$(document).ready(function(){

var myEx = {
	'nameOfExercise' : 'Упражнение по бла-бла',
	/*
	'el0': {
		'click': "1",
		'current': {
			inStack: 'stack0', 
			inBlock: 'stack0_block2', 
			onSide: 'stack0_block2_front', 
			type: 'toggler',
			'positions': {
				position_0: '1',
				description_0: 'Поставьте в позицию 1'
			}
		},
		'action0': {
			inStack: 'stack1', 
			inBlock: 'stack1_block1', 
			onSide: 'stack1_block1_front',
			type:  'toggler',
			num: '1',
			status: '0'
		},
		'action1': {
			inStack: 'stack1', 
			inBlock: 'stack1_block1', 
			onSide: 'stack1_block1_front',
			type:  'toggler',
			num: '1',
			status: '0'
		}
	}*/
}

	/*
	$('#exlog').on('click',function(){
		$(this).text(' ');
	});
	*/
var thisEl; // обращение к элементу
var countClick = 0; // Счетчик клика
var countAction = 0; // Счетчик для определения действий, которые можно выполнять в любом порядке (точнее тех, у кого этот параметр одинаков)
var positionsCount = 0; // Счетчик позиций элемента в рамках одного элемента
var actionsCount = 0; // Счетчик для событий в рамках одной позиции 

var current = {}; // Выбранный элемент
var positions = {}; // Позиции элемента
var descriptions = {}; // Описания элемента ????


//Построение объекта
function newEl(i) {
	myEx['el'+i] ={
		click: "0",
		current: {
			inStack: null, 
			inBlock: null, 
			onSide: null, 
			num: '0',
			type: null,
			
		},
		positions: {}	
	};
}
// УБРАТЬ. Построение нового объекта позиции по умолчанию
						function newDefEl(i) {
							myEx['defEl'+i] = {
								inStack: null, 
								inBlock: null, 
								onSide: null, 
								num: '0',
								type: null,
							};
						}
function newDefPos(i,posCnt) {
	myEx['el'+i].defaultPosition = {
		state: '0'
	}
}
function newPos(i,posCnt) {
	myEx['el'+i].positions['position_'+posCnt] ={
		state: '0',
		description: 'null'
	}
}

function newAction(i,posCnt, actionCnt) {
	myEx['el'+i].positions['position_'+posCnt]['action_'+actionCnt]={
		inStack : 'null',
		inBlock : 'null',
		onSide : 'null',
		type : 'null',
		num : '0',
		status : '0',	
	};
}

//Сохранение используемого элемента
function saveElement(i) {
	console.log(thisEl);
	myEx['el'+i].current.inStack = thisEl.parents('li').attr('id');
	myEx['el'+i].current.inBlock = thisEl.parents('section').attr('id');
	myEx['el'+i].current.onSide = thisEl.parents('div[side]').attr('id');
	myEx['el'+i].current.num = thisEl.attr('num');
	myEx['el'+i].current.type = thisEl.attr('type');
	$('#exlog').text(' ');
	ObjOutput(myEx,"");
}
						// Создаем дефолтные позиции элемента при СОЗДАННОМ упражнении
						function saveDefaultPositionOfElement(i) {
							console.log(thisEl);
							myEx['defEl'+i].inStack = thisEl.parents('li').attr('id');
							myEx['defEl'+i].inBlock = thisEl.parents('section').attr('id');
							myEx['defEl'+i].onSide = thisEl.parents('div[side]').attr('id');
							myEx['defEl'+i].num = thisEl.attr('num');
							myEx['defEl'+i].type = thisEl.attr('type');
							$('#exlog').text(' ');
							ObjOutput(myEx,"");
						}
function saveAction(i,posCnt, actionCnt) {
	console.log(thisEl);


	myEx['el'+i].positions['position_'+posCnt]['action_'+actionCnt].inStack = thisEl.parents('li').attr('id');
	myEx['el'+i].positions['position_'+posCnt]['action_'+actionCnt].inBlock = thisEl.parents('section').attr('id');
	myEx['el'+i].positions['position_'+posCnt]['action_'+actionCnt].onSide = thisEl.parents('div[side]').attr('id');
	myEx['el'+i].positions['position_'+posCnt]['action_'+actionCnt].num = thisEl.attr('num');
	myEx['el'+i].positions['position_'+posCnt]['action_'+actionCnt].type = thisEl.attr('type');
	myEx['el'+i].positions['position_'+posCnt]['action_'+actionCnt].status = thisEl.attr('status');
	thisEl = null;
	$('.element').on('click',function(){
		thisEl = $(this); // А то он записывает в state инфу из элемента, которое до этого было в событии
	});
	$('#exlog').text(' ');
	ObjOutput(myEx,"");
}

						function setDefaultPosition(i) {
							myEx['defEl'+i].inStack = thisEl.parents('li').attr('id');
							myEx['defEl'+i].inBlock = thisEl.parents('section').attr('id');
							myEx['defEl'+i].onSide = thisEl.parents('div[side]').attr('id');
							myEx['defEl'+i].num = thisEl.attr('num');
							myEx['defEl'+i].type = thisEl.attr('type');
							myEx['defEl'+i].status = thisEl.attr('status');
							$('#exlog').text(' ');
							ObjOutput(myEx,"");
						}

//Не используется
/*
function getId(i) {
	console.log(thisEl);
	myEx['el'+i] = current;
	myEx['el'+i] = positions;
	myEx['el'+i].current = {};
	myEx['el'+i].positions = {};
	
	myEx['el'+i].current.inStack = thisEl.parents('li').attr('id');
	myEx['el'+i].current.inBlock = thisEl.parents('section').attr('id');
	myEx['el'+i].current.onSide = thisEl.parents('div[side]').attr('id');
	myEx['el'+i].current.type = thisEl.attr('type');
	$('#exlog').text(' ');
	ObjOutput(myEx,"");

}
*/

//Сохранение позицции в объект
function getPos(i,posCnt) {
	//myEx['el'+i] = positions;
	//myEx['el'+countAction].positions = {};	
	myEx['el'+i].positions['position_'+posCnt].state = thisEl.attr('status');
	$('#exlog').text(' ');
	ObjOutput(myEx,'');	
}

//Сохранение позиции в объект
function getDefaultPos(i) {
	//myEx['el'+i] = positions;
	//myEx['el'+countAction].positions = {};	
	myEx['el'+i].defaultPosition = thisEl.attr('status');
	$('#exlog').text(' ');
	ObjOutput(myEx,'');	
}
// Нужно будет убрать из программы эту функцию
function getDefPos(i,posCnt) {
	//myEx['el'+i] = positions;
	//myEx['el'+countAction].positions = {};	
	myEx['defEl'+i].state = thisEl.attr('status');
	$('#exlog').text(' ');
	ObjOutput(myEx,'');	
}
function setDesc(i,posCnt) {
	myEx['el'+i].positions['position_'+posCnt].description = $("#writeDescription").val();
	$('#exlog').text(' ');
	ObjOutput(myEx,'');	
}

function addAction(i,posCnt) {
	myEx['el'+i].positions['position_'+posCnt].action = $("#writeDescription").val();
	$('#exlog').text(' ');
	ObjOutput(myEx,'');	
}

function setCount(i) {
    myEx['el'+i].click = countClick;
    $('#exlog').text(' ');
	ObjOutput(myEx,'');
}


$('#nameOfExercise').on('change', function(){
	myEx.nameOfExercise = $(this).val();
	$(this).parent().parent().next().hide(); // Скрываем дефолтные позиции
	$(this).parent().hide();
	$(this).parent().next().show();
});

						$('#makeDefaultPositions').on('click', function(){
							$(this).parent().parent().prev().hide(); // Скрываем  позиции
							$(this).parent().hide();
							$(this).parent().next().show();
						});


// Добавить первое действие
	$('#chooseNextElement').on('click', function(){
		positionsCount = 0;
	    countAction++;
		newEl(countAction);
		$(this).parent().hide();
		$('.element').addClass('hover');
		$('.element').on('click', function() {
			$('.element').removeClass('hover');
			thisEl = $(this);
			thisEl.on('click', saveElement(countAction)).addClass('hover');
			$('.element').off();
		});

		$(this).parent().hide();
		$(this).parent().next().show();
	});
// Добавить первое действие и задать позицию по умолчанию
	$('#chooseNextElementAndSetDefaultPosition').on('click', function(){
		positionsCount = 0;
	    countAction++;
		newEl(countAction);
		newDefPos(countAction);
		$(this).parent().hide();
		$('.element').addClass('hover');
		$('.element').on('click', function() {
			$('.element').removeClass('hover');
			thisEl = $(this);
			thisEl.on('click', saveElement(countAction));
			$('.element').off();
		});

		$(this).parent().hide();
		$('#settingDefaultPosition').show();
	});

						$('#chooseNextDefaultPositionOfElement').on('click', function(){
						    countAction++;
							newDefEl(countAction);
							$(this).parent().hide();
							$('.element').addClass('hover');
							$('.element').on('click', function() {
								$('.element').removeClass('hover');
								thisEl = $(this);
								thisEl.on('click', saveDefaultPositionOfElement(countAction)).addClass('hover');
								$('.element').off();
							});

							$(this).parent().hide();
							$(this).parent().next().show();
						})

// Прибавлять ли клик?
	$('#addCountClick').on('click', function(){
		countClick++;
		setCount(countAction);
		$(this).parent().hide();
		$(this).parent().next().show();
	});
	$('#noAddCountClick').on('click', function(){
	    setCount(countAction);
		$(this).parent().hide();
		$(this).parent().next().show();
	});

	
// Выбор позиции элемента

	$('#setPosition').on('click', function() {
		actionsCount = 0; // Сбрасываем, так как нам интересен кол-во action'ов только внутри одного положения
		positionsCount++;
		newPos(countAction,positionsCount);
		thisEl.on('click', getPos(countAction,positionsCount));
		$(this).parent().hide();
		$(this).parent().next().show();
	});
						// Выбор позиции по умолчанию при запуске отдельно от конструктора
						$('#setDefaultPositionOfElement').on('click', function() {
							thisEl.on('click', getDefPos(countAction));
							$(this).parent().hide();
							$('#choosingNextDefaultPositionOfElement').show();
						});
	// Выбор позиции по умолчанию у элемента
	$('#setDefaultPosition').on('click', function() {
		newDefPos(countAction);
		thisEl.on('click', getDefaultPos(countAction));
		$(this).parent().hide();
		$('#addingCountClick').show();
	});
	$('button.back').on('click', function() {
		$(this).parent().hide();
		$(this).parent().prev().show();
	});
	$('#settingPosition button.back').on('click', function(){
	    countAction--;
	});
	$('#settingDescription button.back').on('click', function(){
	    positionsCount--;
	});
	$('#addActionOnPos button.back').on('click', function(){
	    actionsCount--;
	});
// Выбор описания
	/*
	$('#writeDescription').on('keypress', function(){
		setDesc(countAction,positionsCount);
	});*/

	$('#setDescription').on('click',function () {
  		setDesc(countAction,positionsCount); // Записали в объект
  		$(this).parent().next().show(); // Добавление кнопки дополнительной позиции
  		$(this).parent().hide(); // Скрываем этот блок
  		$(this).parent().prev().hide(); // Скрываем блок с определением позиции
  	});
	
// Привязка действия
	$('#bindAction').on('click', function(){
		actionsCount++;
		newAction(countAction,positionsCount, actionsCount);
		thisEl = null;
		$('.element').removeClass('hover');
		$('.element[type="lamp"],.element[type="scale"],.element[type="indicator"]').addClass('hover');
		$('.element').on('click', function() {
			thisEl = $(this);
			if (thisEl.attr('type') == 'lamp') {
				//alert('f');
				if (thisEl.attr('status') == 'on') {
					thisEl.attr('status','off');
				} else {
					thisEl.attr('status','on');			
				}
			}
			if (thisEl.attr('type') == 'scale') {
				var zeroPosition = 0;
				if (thisEl.attr('zeroPosition')) {
					zeroPosition = 50;
				}
				var arrowStatus = 0;
				if (thisEl.attr('status')) {
					arrowStatus == thisEl.attr('status')
				} else {
					arrowStatus == zeroPosition;
				}
				thisEl.slider({
			      value: arrowStatus,
			      min: 0,
			      max: 100,
			      step: 1,
			      animate: false,
			      slide: function( event, ui ) {
			      	degree = ui.value-50;
			        thisEl.find('.body').css('transform','rotate('+degree+'deg)');
			        thisEl.attr('status', degree);
			      },
			      stop: function( event, ui ) { 	
					thisEl.slider('destroy');
			      }
				});
			}
			if (thisEl.attr('type') == 'indicator') {
				thisEl.append('<input id="indicatorInput">');
				$('#indicatorInput').change(function(){
					indicatorNumber = $(this).val();
					thisEl.attr('status',indicatorNumber);
					
				});

			}
			//thisEl.on('click', saveElement(countAction)).addClass('hover');
		});
		$(this).parent().hide();
		$(this).parent().next().show();
	});
	
	//Выбор действия и состояния
	$('#chooseActElement').on('click',function () {
		$('.element').off(); // иначе в действии $('#bindaction') действия для смены статуса накапливаются
		saveAction(countAction,positionsCount, actionsCount);
		$(this).parent().hide();
		$(this).parent().next().show();
	});

	//Выбор дополнительного действия
	$('#addAction').on('click',function () {
		$(this).parent().hide();
		$('#bindActionOnPos').show();
	});

// Дополнительные позиции

	$('#addPosition').on('click',function () {
		$(this).parent().hide();
		$('#settingPosition').show();
	});

// Переход к следующему элементу

	$('#skipAddingPosition').on('click',function () {
		$(this).parent().hide();
		$('#choosingNextElement').show();
	});
	$('#skipAddAction').on('click',function () {
		$(this).parent().hide();
		$('#addingPosition').show();
	});
	$('#noBindAction').on('click',function () {
		$(this).parent().hide();
		$('#addingPosition').show();
	});













});

