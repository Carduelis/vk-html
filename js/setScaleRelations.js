$(document).ready(function(){
var scaleRelations = {/*
	'scaleRelationGroup1' : {
		'control' : {
			'block': 'stack0_block2_front',
			'type': 'knob',
			'num': '2',
		},
		'scale' : {
			'block': 'stack0_block2_front',
			'type': 'scale',
			'num': '22',
		},
		'relations' : {
			'relation1' : {
				'status' : '1',
				'degree' : '10'
			},
		},
		'exercises' : {
			'ex1' : {
				'on' : true,
				'element' : {
					'block': 'stack0_block2_front',
					'type': 'toggler',
					'num': '1',
					'status': '1'
				}
			},
			'ex2' : {
				'on' : false,
			},
		},
	},*/
}
var control = {}
var scale = {}
var relations = {}
var exercises = {}
var elementTrigger = {}
//Построение объекта
function newScaleRelationGroup(i) {


	scaleRelations['scaleRelationGroup'+i] ={
		control: {
			block: null,
			type: null,
			num: null,
		},
		scale: {
			block: null,
			type: null,
			num: null,
		},
		relations: {

		},
		exercises: {

		},
	};
}
// Построение объекта зависимости шкалы, элемента и их свойств
function newScaleRelation(i,relationCount) {
	scaleRelations['scaleRelationGroup'+i].relations['relation'+relationCount] = {
		status: null,
		degree: null,
	}
}
// Построение объекта упражнения и его свойства
function newScaleExercise(i,currentEx) {
	scaleRelations['scaleRelationGroup'+i].exercises[currentEx] = {
		on: null,
	}

	$('#exlog').text(' ');
	ObjOutput(scaleRelations,'');
}
// Построение объекта элемента, на котором будет осуществляться проверка: зависимость будет исполняться, если элемент в нужной позиции
function newScaleExerciseElement(i,currentEx) {
	scaleRelations['scaleRelationGroup'+i].exercises[currentEx] = {
		elementTrigger: {
			block: null,
			type: null,
			num: null,
			status: null,
		}
	}
	$('#exlog').text(' ');
	ObjOutput(scaleRelations,'');
}

function getRandomInt() {
	var min = 0
	var max = 9999999999;
	return Math.floor(Math.random() * (max - min + 1)) + min;
}


//Сохранение используемого элемента
function saveScaleControl(i) {
	scaleRelations['scaleRelationGroup'+i].control.block = thisEl.parents('div[side]').attr('id');
	scaleRelations['scaleRelationGroup'+i].control.type = thisEl.attr('type');
	scaleRelations['scaleRelationGroup'+i].control.num = thisEl.attr('num');
	$('#exlog').text(' ');
	ObjOutput(scaleRelations,'');
}

//Сохранение используемой шкалы
function saveScaleScale(i) {
	scaleRelations['scaleRelationGroup'+i].scale.block = thisEl.parents('div[side]').attr('id');
	scaleRelations['scaleRelationGroup'+i].scale.type = thisEl.attr('type');
	scaleRelations['scaleRelationGroup'+i].scale.num = thisEl.attr('num');
	$('#exlog').text(' ');
	ObjOutput(scaleRelations,'');
}

//Сохранение используемой шкалы
function saveRelationStatus(i,j) {
	scaleRelations['scaleRelationGroup'+i].relations['relation'+j].status = thisEl.attr('status');
	$('#exlog').text(' ');
	ObjOutput(scaleRelations,'');
}
function saveRelationDegree(i,j) {
	scaleRelations['scaleRelationGroup'+i].relations['relation'+j].degree = thisEl.attr('status');
	$('#exlog').text(' ');
	ObjOutput(scaleRelations,'');
}
function saveScaleExercise(i,currentEx,trueFalse) {
	scaleRelations['scaleRelationGroup'+i].exercises[currentEx].on = trueFalse;
	$('#exlog').text(' ');
	ObjOutput(scaleRelations,'');
}


//Сохранение ключевого элемента
function saveScaleTriggerElement(i,currentEx) {
	scaleRelations['scaleRelationGroup'+i].exercises[currentEx].elementTrigger.block = thisEl.parents('div[side]').attr('id');
	scaleRelations['scaleRelationGroup'+i].exercises[currentEx].elementTrigger.type = thisEl.attr('type');
	scaleRelations['scaleRelationGroup'+i].exercises[currentEx].elementTrigger.num = thisEl.attr('num');
	scaleRelations['scaleRelationGroup'+i].exercises[currentEx].elementTrigger.status = thisEl.attr('status');
	$('#exlog').text(' ');
	ObjOutput(scaleRelations,'');
}

var scaleRelationGroupId;
var relationsCount = 0;
var elementScale;
var elementControl;
// Выбираем шкалу
	$('#chooseScale').on('click', function(){
		scaleRelationGroupId = getRandomInt(); 
		newScaleRelationGroup(scaleRelationGroupId);
		$(this).parent().hide();
		$('.element[type="scale"]').addClass('hover');
		$('.element[type="scale"]').on('click', function() {
			$('.element[type="scale"]').removeClass('hover');
			elementScale = $(this);
			thisEl = elementScale;
			elementScale.on('click', saveScaleScale(scaleRelationGroupId)).addClass('hover');
			$('.element[type="scale"]').off();
		});

		$(this).parent().hide();
		$(this).parent().next().show();
	});

// Выбираем управляющий шкалой элемент
	$('#chooseControl').on('click', function(){
		$(this).parent().hide();
		$('.element').not('.element[type="scale"]').addClass('hover');
		$('.element').on('click', function() {
			$('.element').removeClass('hover');
			elementControl = $(this);
			thisEl = elementControl;
			elementControl.on('click', saveScaleControl(scaleRelationGroupId)).addClass('hover');
			$('.element').off();
		});

		$(this).parent().hide();
		$(this).parent().next().show();
	});

// Выбираем управляющий шкалой элемент
	$('#setControlPosition').on('click', function(){
		relationsCount++;
		newScaleRelation(scaleRelationGroupId,relationsCount);
		thisEl = elementControl;
		elementControl.on('click', saveRelationStatus(scaleRelationGroupId,relationsCount));
		$(this).parent().hide();
		$(this).parent().next().show();
	});

// Выбираем позицию шкале
	$('#setScalePosition').on('click', function(){
		//relationsCount++;
		//newScaleRelation(scaleRelationGroupId,relationsCount);
		thisEl = elementScale; // Для функции сохранения 
		elementScale.addClass('hover');

				var arrowStatus = 0;
				var zeroPosition = 0;
				if (elementScale.attr('zeroPosition')) {
					zeroPosition = 50;
				}
				if (elementScale.attr('status')) {
					arrowStatus == elementScale.attr('status')
				} else {
					arrowStatus == zeroPosition;
				}
		elementScale.slider({
	      value: arrowStatus,
	      min: 0,
	      max: 100,
	      step: 1,
	      animate: false,
	      slide: function( event, ui ) {
	      	degree = ui.value-50;
	        elementScale.find('.body').css('transform','rotate('+degree+'deg)');
	        elementScale.attr('status', degree);
	      },
	      stop: function( event, ui ) { 	
			saveRelationDegree(scaleRelationGroupId,relationsCount);
	      }
	  	});
		$(this).parent().hide();
		$(this).parent().next().show();
	});
	$('#setOneMoreRelation').on('click', function(){
		$(this).parent().hide();
		$('#settingControlPosition').show();
	});
	var trueFalse = true;
	var exId;
	$('#toSetingExerciseRelation').on('click', function(){

		$(this).parent().hide();
		$(this).parent().next().show();
		/*for(var i in exercisesContainer) {
			$('#settingExerciseRelation ol').append('<li><button class="ex" on="'+trueFalse+'" id="'+i+'">'+exercisesContainer[i].nameOfExercise+'</button><p>Выбрав элемент-триггер, нужно нажать <button class="setDefinedElement" exercise="'+i+'">Записать триггер</button>');
		};
		*/
	});
	// Активация упражнений
	$('#settingExerciseRelation .ex').on('click', function(){
		if ($(this).attr('on') == "true") {
			trueFalse = false;
		} else {
			trueFalse = true;
		}
		$(this).attr('on', trueFalse);
		exId = $(this).attr('id');
		newScaleExercise(scaleRelationGroupId,exId);
		newScaleExerciseElement(scaleRelationGroupId,exId);
		saveScaleExercise(scaleRelationGroupId,exId,trueFalse);
	});
	
	// Добавление элемента-триггера
	$('#settingExerciseRelation .setDefinedElement').on('click', function(){
		$('.element').addClass('hover');
		$('.element').on('click', function() {
			$('.element').removeClass('hover');
			thisEl = $(this);
			thisEl.on('click', saveScaleTriggerElement(scaleRelationGroupId,exId)).addClass('hover');
			$('.element').off();
		});
	});
	$('#setExerciseRelation').on('click', function(){
		$(this).parent().hide();
		$(this).parent().next().show();
	});

	$('.startAgain').on('click', function(){
		$(this).parent().hide();
		$('#chooseScale').show();
	});

});