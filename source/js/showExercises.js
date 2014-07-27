var thisEx = {}
var thisExId;

// Вывод списка упражнений
for(var i in exercisesContainer) {
	$('#chooseExerciseBody .listing ol').append('<li><a id="'+i+'">'+exercisesContainer[i].nameOfExercise+'</a>');
};
var mode;


function random(maxNumber) {
	return Math.floor((Math.random() * maxNumber) + 1)
}

var choosenParam;
 
$('#chooseExerciseBody .listing a').on('click', function(){
	thisExId = $(this).attr('id');
	// Вывод списка дополнительных опций
	$('#chooseExerciseBody .options ol li').remove();
	for(var i in exercisesOptions[thisExId]) {
		$('#chooseExerciseBody .options ol').append('<li id="'+i+'"><header>'+exercisesOptions[thisExId][i].name+'</header><ul></ul>');
		numOfOptions = Object.keys(exercisesOptions[thisExId][i].options).length; // У нас всегда равно 2
		$('#'+i+' ul').append('<li><a data-ex="'+thisExId+'" data-type="'+i+'" data-codeName="'+exercisesOptions[thisExId][i].options['option'+random(numOfOptions)].codeName+'" class="active">Случайно</a>')
		for (var j in exercisesOptions[thisExId][i].options) {
			$('#'+i+' ul').append('<li><a data-ex="'+thisExId+'" data-type="'+i+'" data-codeName="'+exercisesOptions[thisExId][i].options[j].codeName+'"  class="checkbox">'+exercisesOptions[thisExId][i].options[j].viewName+'</a>');
		}
	}
	$('#chooseExerciseBody .options a').on('click', function(){
		$(this).parent().parent().find('a').not($(this)).removeClass('active');
		$(this).addClass('active');
	})
	$('#chooseExerciseBody .listing a').removeClass('active');
	$(this).addClass('active');
	thisEx = exercisesContainer;
	$('.dev').addClass('hidden');
	$('.passing, .options, .starting').hide();
	$('.passing a').removeClass('active');
	$('.passing').fadeIn();
});

	// Выбор экзамен/тренировка
$('#chooseExerciseBody .passing a').on('click', function(){
	mode = $(this).attr('data-codename');
	if (mode == 'training') {
		$('.options').fadeIn();
	}
	$('.starting').slideDown();
	$('#chooseExerciseBody .passing a').removeClass('active');
	$(this).addClass('active');
	console.info(mode);

	$('#go').removeAttr('disabled');
});

$('a[data-codename="passing"]').on('click', function(){
	$('.options').hide();
});



function detectMultiply() {
	if (thisEx[thisExId]['el'+eN]) {
		if (thisEx[thisExId]['el'+eN].multiply) {
			for(var i in exercisesOptions[thisExId]) {
				if (thisEx[thisExId]['el'+eN].multiply == exercisesOptions[thisExId][i].typeName) {
					choosenParam = window[exercisesOptions[thisExId][i].typeName];
				}
			}
		} else {
			choosenParam = null;
		}
	}
}

function detectMultiplyPrev() {
	if (eN > 2) {
		if (thisEx[thisExId]['el'+(eN-1)].multiply) {
			for(var i in exercisesOptions[thisExId]) {
				if (thisEx[thisExId]['el'+(eN-1)].multiply == exercisesOptions[thisExId][i].typeName) {
					choosenParamPrev = window[exercisesOptions[thisExId][i].typeName];
				}
			}
		} else {
			choosenParamPrev = null;
		}
	} else {
		choosenParamPrev = null
	}
}

function isShift(eN, choosenParam) {
	if (choosenParam) {
		return thisEx[thisExId]['el'+eN][choosenParam].shift
	} else {
		return false
	}
}

function isPositionsThere(eN,choosenParam) {
	if (choosenParam) {
		return (pN < posCount(thisEx[thisExId]['el'+eN][choosenParam].positions))
	} else {
		return (pN < posCount(thisEx[thisExId]['el'+eN].positions))
	}
}

function positionsObj(eN,pN,choosenParam) {
	if (choosenParam) {
		return posCount(thisEx[thisExId]['el'+eN][choosenParam].positions['position_'+pN])
	} else {
		return posCount(thisEx[thisExId]['el'+eN].positions['position_'+pN])
	}
}


function showFirstStepTrainingFeatures(eN,pN) {
	if (mode == 'training') {
		showhint(eN, choosenParam);
		obj_element(eN, choosenParam).addClass('shadow');
		append_desc(eN,pN, choosenParam);
		focusOnElement();
	} 

}

function showTrainingFeatures(eN,pN, choosenParam) {
	if (mode == 'training') {
		hideAndRemoveAllHints();
		showSideHint(eN, choosenParam);
		showhint(eN, choosenParam);
		obj_element(eN,choosenParam).addClass('shadow');
		append_desc(eN,pN,choosenParam);
		focusOnElement();
	}
}

function showSideHint(eN,choosenParam) {
	detectMultiplyPrev();
	if (
		//(str_whatever((eN-1),'onSide',choosenParamPrev)) 
		// проверяет наличие значения stackN_blockM_side
		//&&
		(str_whatever(eN,'onSide',choosenParam) != str_whatever((eN-1),'onSide',choosenParamPrev))
		// проверяет отличается ли сторона в предыдущем действии
		//&&
		//(str_whatever(eN,'inBlock',choosenParam) == str_whatever((eN-1),'inBlock',choosenParamPrev))
		// текущее и предыдущие действия должны быть на одном блоке
	) {
		if (str_whatever(eN,'onSide',choosenParam)) {
			if (str_whatever(eN,'onSide',choosenParam).substr(14) != 'front') {
				// проверяет, что это не возврат на переднюю сторону
				var sideOpener = $('#'+str_whatever(eN,'inBlock',choosenParam)).find('span[for="'+str_whatever(eN,'onSide',choosenParam).substr(14)+'"]');
				sideOpener.addClass('active');
				if (sideOpener) {
					if (sideOpener.offset()) {
						focusOnElement(sideOpener.offset().top);
					}
				}
				sideOpener.click(function(){
					focusOnElement();
				});
				
			} else if (str_whatever(eN,'onSide',choosenParam).substr(14) == 'front') {
				// проверяет, что это возврат на переднюю сторону
				var sideCloser = $('#'+str_whatever(eN,'inBlock',choosenParam)).find('i.back');
				var sideOpener = $('#'+str_whatever(eN,'inBlock',choosenParam)).find('span');
				sideOpener.removeClass('active');
				sideCloser.addClass('active');
				console.info(str_whatever(eN,'onSide',choosenParam)+' '+str_whatever((eN-1),'onSide',choosenParamPrev));
				if (sideCloser) {
					if (sideCloser.offset()) {
						focusOnElement(sideCloser.offset().top);
					}
				}
				sideCloser.click(function(){
					focusOnElement();
				})
			}
		}
	}

}



function showActions(eN, pN, aN, choosenParam) {
		if (str_action_whatever(eN, 'type', pN, aN, choosenParam) == 'scale') {
			$('#'+str_action_whatever(eN, "onSide", pN, aN,choosenParam)+' .element[type="'+str_action_whatever(eN, "type", pN, aN,choosenParam)+'"][num="'+str_action_whatever(eN, "num", pN, aN,choosenParam)+'"]').attr('status',str_action_whatever(eN, 'status', pN, aN,choosenParam));
			console.info('Scale status is '+str_action_whatever(eN, 'status', pN, aN,choosenParam)+'deg');
			var shifted_deg = +str_action_whatever(eN, "status", pN, aN,choosenParam)-15;
			$('#'+str_action_whatever(eN, "onSide", pN, aN,choosenParam)+' .element[type="'+str_action_whatever(eN, "type", pN, aN,choosenParam)+'"][num="'+str_action_whatever(eN, "num", pN, aN,choosenParam)+'"] .body').css('-webkit-transform','rotate('+shifted_deg+'deg)');
			setTimeout(function() {
			$('#'+str_action_whatever(eN, "onSide", pN, aN,choosenParam)+' .element[type="'+str_action_whatever(eN, "type", pN, aN,choosenParam)+'"][num="'+str_action_whatever(eN, "num", pN, aN,choosenParam)+'"] .body').css('-webkit-transform','rotate('+str_action_whatever(eN, "status", pN, aN,choosenParam)+'deg)');
			}, 300);
		} else {
			$('#'+str_action_whatever(eN, 'onSide', pN, aN,choosenParam)+' .element[type="'+str_action_whatever(eN, 'type', pN, aN,choosenParam)+'"][num="'+str_action_whatever(eN, 'num', pN, aN,choosenParam)+'"]').attr('status',str_action_whatever(eN, 'status', pN, aN,choosenParam));
			console.info('no_Scale status is '+str_action_whatever(eN, 'status', pN, aN,choosenParam));
			//alert('lamp');
		}
}


function str_action_whatever(eN, subject, pN, aN, choosenParam) 	{
	 if (choosenParam) {
	 	if (thisEx[thisExId]) {
		 	if (thisEx[thisExId]['el'+eN]) {
				if (thisEx[thisExId]['el'+eN][choosenParam]) {
					if (thisEx[thisExId]['el'+eN][choosenParam].positions) {
						if (thisEx[thisExId]['el'+eN][choosenParam].positions['position_'+pN]) {
							if (thisEx[thisExId]['el'+eN][choosenParam].positions['position_'+pN]['action_'+aN]) {
								return thisEx[thisExId]['el'+eN][choosenParam].positions['position_'+pN]['action_'+aN][subject];
							}
						}
					}
				}
			}
		}
	 } else {
	 	if (thisEx[thisExId]) {
		 	if (thisEx[thisExId]['el'+eN]) {
			 	if (thisEx[thisExId]['el'+eN].positions) {
					if (thisEx[thisExId]['el'+eN].positions['position_'+pN]) {
						if (thisEx[thisExId]['el'+eN].positions['position_'+pN]['action_'+aN]) {
							return thisEx[thisExId]['el'+eN].positions['position_'+pN]['action_'+aN][subject];
						}
					}
			 	}
			}
		}
	}
}


function str_whatever(eN, subject, choosenParam) {
	if (choosenParam) {
		if (thisEx[thisExId]['el'+eN]) {
			if (thisEx[thisExId]['el'+eN][choosenParam]) {
				if (thisEx[thisExId]['el'+eN][choosenParam].current) {
					return thisEx[thisExId]['el'+eN][choosenParam].current[subject];
				}
			}
		}
	} 	else {
		if (thisEx[thisExId]['el'+eN]) {
			if (thisEx[thisExId]['el'+eN].current) {
				return thisEx[thisExId]['el'+eN].current[subject];
			}
		}
	}
}

function str_pos_whatever(eN, subject, pN, choosenParam) { 
	if (choosenParam) {
		if (thisEx[thisExId]['el'+eN]) {
			if (thisEx[thisExId]['el'+eN][choosenParam]) {
			 	if (thisEx[thisExId]['el'+eN][choosenParam].positions) {
					return thisEx[thisExId]['el'+eN][choosenParam].positions['position_'+pN][subject];
				}
			}
		}
	} 	else {
	 	if (thisEx[thisExId]['el'+eN].positions) {
	 		if (thisEx[thisExId]['el'+eN].positions['position_'+pN]) {
				return thisEx[thisExId]['el'+eN].positions['position_'+pN][subject];
			}
		}
	}
}

function obj_whatever(eN, subject, choosenParam) {
	if (choosenParam) {
		if (thisEx[thisExId]['el'+eN][choosenParam]) {
			if (thisEx[thisExId]['el'+eN][choosenParam].current) {
				return $('#'+thisEx[thisExId]['el'+eN][choosenParam].current[subject]);
			}
		}
	} 	else {
		if (thisEx[thisExId]['el'+eN].current) {
			return $('#'+thisEx[thisExId]['el'+eN].current[subject]);
		}
	}
}

function obj_element(eN, choosenParam) {
	if (choosenParam) {
		return $('#'+str_whatever(eN, 'onSide',choosenParam)+' .element[type="'+str_whatever(eN, 'type',choosenParam)+'"][num="'+str_whatever(eN, 'num',choosenParam)+'"]')
	} else {
		return $('#'+str_whatever(eN, 'onSide')+' .element[type="'+str_whatever(eN, 'type')+'"][num="'+str_whatever(eN, 'num')+'"]')
	}
}

function append_desc(eN, pN, choosenParam) {
	$('section > div[side]').removeClass('z-index');
	if (choosenParam) {
		$('#'+str_whatever(eN,'onSide',choosenParam)).addClass('z-index');
		obj_element(eN, choosenParam).append('<div class="hint"><p>'+str_pos_whatever(eN, 'description', pN,choosenParam)+'</p></div>')
	} else {
		$('#'+str_whatever(eN,'onSide')).addClass('z-index');
		obj_element(eN).append('<div class="hint"><p>'+str_pos_whatever(eN, 'description', pN)+'</p></div>')
	}
}



function exportAlgorythm(thisExId) {
	$('#expectations').append('<table><tbody><tr><th>#</th><th>Блок</th><th>Тип элемента</th><th>Описание</th></tr></tbody></table>');
	for (var i = 1; i < Object.keys(exercisesContainer[thisExId]).length; i++) {
		var oneAction = Object.keys(exercisesContainer[thisExId])[i];
		//var eN = i; // detectMultiply внутри содержит переменную eN
		//detectMultiply();
		
		if (exercisesContainer[thisExId]['el'+i].multiply) {
			console.info('i'+i) // 1,2,3,4..
			for(var j in exercisesOptions[thisExId]) {
				console.info('j'+j) // optionBlock1 / optionBlock2
				if (exercisesContainer[thisExId]['el'+i].multiply == exercisesOptions[thisExId][j].typeName) {
					console.info(exercisesOptions[thisExId][j].typeName) // fiders / phases
					choosenParam = window[exercisesOptions[thisExId][j].typeName];
					console.info(choosenParam)
				}
			}
		} else {
			choosenParam = null;
		}
			var element = obj_element(i,choosenParam);
			var text = str_pos_whatever(i, 'description', 1, choosenParam);
			var block = nameOfBlock(str_whatever(i,'inBlock',choosenParam));
			if (isShift(i,choosenParam)) {
				console.info('shift'+i);
				i = +i + +thisEx[thisExId]['el'+i][choosenParam].shift;
				console.info('shift'+i);
			}
		
		
		
		$('#expectations tbody').append('<tr><td>'+i+'</td><td>'+block+'</td><td><div class="element-container"></div></td><td><p>'+text+'</p></td></tr>');
		$('#expectations tbody tr:eq('+i+') .element-container').append(element);
	};
}

function showDependentAction(eN,pN,aN) {
	var thisOnSide, thisNum, thisType, thisStatus;
	thisOnSide = thisEx[thisExId]['el'+eN].positions['position_'+pN]['action_'+aN].onSide;
	thisNum = thisEx[thisExId]['el'+eN].positions['position_'+pN]['action_'+aN].num;
	thisType = thisEx[thisExId]['el'+eN].positions['position_'+pN]['action_'+aN].type;
	thisStatus = thisEx[thisExId]['el'+eN].positions['position_'+pN]['action_'+aN].status;
	$('#'+thisOnSide+' .element[type="'+thisType+'"][num="'+thisNum+'"]').attr('status',thisStatus);
}

function posCount(obj) {
   var a = 0;
   for (var i in obj)
      a++
   return a
}

historyClick = 1;
function history(thisType,thisNum,thisStatus,thisSide,thisBlock) {
	$('#reality tbody').append('<tr><td>'+historyClick+'</td><td>'+nameOfBlock(thisBlock)+'</td><td>'+nameOfControl(thisType)+' №'+thisNum+'</td></tr>');
	historyClick++;
}
