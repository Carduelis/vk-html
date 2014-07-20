// goldfinch.pro
// ============================================
// Здесь описываются действия с элементами
// ============================================
function scaleAlive(scaleAliveBlockId,scaleAliveElementType,scaleAliveElementNum,scaleAliveElementStatus) {
		
		for(var i in scaleRelations) {
			//controller = $('#'+scaleRelations[i].control.block+' .element[type="'+scaleRelations[i].control.type+'"][num="'+scaleRelations[i].control.num+'"]');
			//controllerClicker = controller.children('.control').children('a');
			scale = $('#'+scaleRelations[i].scale.block+' .element[type="'+scaleRelations[i].scale.type+'"][num="'+scaleRelations[i].scale.num+'"]');
			if 	((scaleAliveBlockId == scaleRelations[i].control.block) 
				&&	(scaleAliveElementType == scaleRelations[i].control.type) 
				&&	(scaleAliveElementNum == scaleRelations[i].control.num))  {
				for(var j in scaleRelations[i].relations) {
					if (scaleRelations[i].relations[j].multiply) {
						console.info('scaleRelations multiply is true')
						if (scaleAliveElementStatus == scaleRelations[i].relations[j].multiply[fiders].status) {
							scale.attr('status',scaleRelations[i].relations[j].multiply[fiders].degree);
							var current_degree = +scaleRelations[i].relations[j].multiply[fiders].degree;
							var shift_degree = +current_degree-15;
							var thisScale = scale.find('.body');
							if (current_degree != '-50') {
								thisScale.css('-webkit-transform','rotate('+shift_degree+'deg)');
							}
							
							setTimeout(function() {
								console.info(current_degree);
								thisScale.css('-webkit-transform','rotate('+current_degree+'deg)');
							}, 300)
						}

					} else {
						console.info('scaleRelations multiply is false')
						if (scaleAliveElementStatus == scaleRelations[i].relations[j].status) {

							scale.find('.body').css('-webkit-transform','rotate('+(scaleRelations[i].relations[j].degree)+'deg)');
							scale.attr('status',scaleRelations[i].relations[j].degree);
							
							
							//setTimeout(function(){
							//	scale.find('.body').css('-webkit-transform','rotate('+scaleRelations[i].relations[j].degree+'deg)');
							//}, 300)
							
						}
					}
				}
			}
		}

		return console.info('scaleAlive')
}
$(document).ready(function(){


$('.element').each(function(){
	var status = 0;
	var element = $(this);
	var sectionId = $(this).parent().attr('id');
	var clicker = element.find('.click');
	var body = element.children('.body')
	element.find('a').attr('href','javascript:void(0);');

	var positions = element.attr('positions');
	var defaultPosition = element.attr('defaultposition');
	//element.on('click', scaleAlive(element));
	if (defaultPosition) {
		status = defaultPosition;
		element.removeAttr('defaultposition');
		element.attr('status',status);
	} 

	if (element.attr('type') == 'knob') {
		clicker
			.before('<a href="javascript:void(0);" class="cw" style="display: none;">')
			.after('<a href="javascript:void(0);" class="ccw" style="display: none;">');
		element
			.hover(
				function(){
					clicker.prev().show();
					clicker.next().show();
				}, 
				function(){
					clicker.prev().hide();
					clicker.next().hide();
				}
			);
		//var status = element.attr('status');
		var step = 15;
		var rotate = step*(1-positions+2*status);
		body.css('transform','rotate('+rotate+'deg)');

		element.find('.cw').on('click', function(){	

			if (status < positions-1) {
				status++;
				element.attr('status',status);
				var rotate = step*(1-positions+2*status);
				body.css('transform','rotate('+rotate+'deg)');
				scaleAlive(sectionId,element.attr('type'),element.attr('num'),status);
			}
	        if (element.attr('view2') == "yes") {
	        	element.children('.overlay').html('<span class="counter">'+status+'</span>')
	        }
		});

		element.find('.ccw').on('click', function(){	
			if (status > 0) {
				status--;	
				element.attr('status',status);
				var rotate = step*(1-positions+2*status);
				body.css('transform','rotate('+rotate+'deg)');
				scaleAlive(sectionId,element.attr('type'),element.attr('num'),status);
			}
	        if (element.attr('view2') == "yes") {
	        	element.children('.overlay').html('<span class="counter">'+status+'</span>')
	        }
		});
        if (element.attr('view2') == "yes") {
        	element.children('.overlay').html('<span class="counter">'+status+'</span>')
        }
	}
	if (element.attr('type') == 'toggler') {
		if (element.attr('toggles') == '4') {

			clicker.on('click',function(){
				status++
				if (status == 4) {
					status = 0;
				}
				element.attr('status',status)
			});

		} else {
			clicker.on('click',function(){
				if (status) status = 0
				else status = 1
				element.attr('status',status)
			});
		}
		if (element.attr('view') == 'rotate') {
			var deg = +$(this).attr('status')*90;
			element.on('click',function(){
				deg += 90;
				body.css('-webkit-transform','rotate('+deg+'deg)');
			});
		}
	}
	if (element.attr('type') == 'fuse') {
		clicker.on('click',function(){
			alert('Я предохранитель');
		});
	}
	if (element.attr('type') == 'rotator') {
		clicker.after('<div class="slider" style="display: none;">');
		var value = 180;
		var min = 0;
		var max = 360;
		var step = 45;
		var status = element.attr('status');
		var num = element.attr('num');
		var scaleNum;
		var scaleBlockid;
		var scaleRatio = 1;
		var zeroPosition = 50;
		if (element.attr('range'))	 max = 45*element.attr('range')
		if (element.attr('step'))	 step = 45*element.attr('step')
		if (element.attr('defaultposition'))	 value = 45*element.attr('defaultposition')
		if (element.attr('relationScaleBlockid')) scaleBlockid = element.attr('relationScaleBlockid');
		if (element.attr('relationScaleNum')) scaleNum = element.attr('relationScaleNum');
		if (element.attr('relationScaleRatio')) scaleRatio = element.attr('relationScaleRatio');
		clicker.next('.slider').slider({
	      value: value,
	      min: min,
	      max: max,
	      step: step,
	      slide: function( event, ui ) {
	        body.css('transform','rotate('+ui.value+'deg)');
	        element.attr('status', ui.value/step);
	        if (element.attr('relationScaleBlockid')) {
	        	if ($('#'+scaleBlockid+' [type="scale"][num="'+scaleNum+'"]').attr('zeroposition') == 'center') {
	        		zeroPosition = 0;
	        	}
	        	$('#'+scaleBlockid+' [type="scale"][num="'+scaleNum+'"]').find('.body').css('transform','rotate('+((ui.value/(4*scaleRatio))-zeroPosition)+'deg)');
	        }
	        if (element.attr('view2') == "yes") {
	        	element.children('.overlay').html('<span class="counter">'+ui.value/step+'</span>')
	        }
	        if (element.attr('view_special') == "ears") {
	        	$('.element[type="runner"][num="'+num+'"]').attr('status', ui.value/step);
	        	$('.element[type="runner"][num="'+num+'"]').find('.body').css('left', ((ui.value/(step*1.2)*10)+12)+'%');
	        }
	      }
		});
		clicker.on('click',function(){
			clicker.next('.slider').fadeToggle();
		});
		$('.ui-slider-handle').mouseup(function(){
			clicker.next('.slider').fadeOut();
		});
	}
	if (
			(element.attr('type') == 'button') || 
			(element.attr('type') == 'next') 
	) {

		clicker
		.click(function() {
		    element.attr('status','on');
		})
		.mousedown(function() {
		    element.attr('status','on');
		})
		.mouseup(function() {
		    element.attr('status','off');
		})
		.mouseleave(function() {
		    element.attr('status','off');
		})
	}
	if (element.attr('type') == 'socket') {

		clicker.on('click',function(){
			if (element.attr('defaultposition')) {
				status = 'on';
				element.removeAttr('defaultposition');
			} 
			if (status == 'on') status = 'off'
			else status = 'on'
			element.attr('status',status)
		});
	}
	if (element.attr('type') == 'scale') {
		var degree = 0;
		if (element.attr('status')) {
			degree = element.attr('status');
			body.css('-webkit-transform','rotate('+(degree-15)+'deg)');
			setTimeout(function(){
				body.css('-webkit-transform','rotate('+degree+'deg)');
			}, 300)
		}
	}
});

});