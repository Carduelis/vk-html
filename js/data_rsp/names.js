function nameOfStack(stackId) {

	if (stackId == "stack0") return "ПРД-Д"
	if (stackId == "stack1") return "ПРМ-Д"
	if (stackId == "stack2") return "ПРМ-П"
	if (stackId == "stack3") return "ПРД-П"
	if (stackId == "stack4") return "ИКО-Д"
	if (stackId == "stack5") return "ПУР"
	if (stackId == "stack6") return "ИКО-П"
	if (stackId == "stack7") return "Распределительный щит"
}


function nameOfBlock(blockId) {
	if (blockId == "stack0_block1") return "ВУНПО-Д"
	if (blockId == "stack0_block2") return "ПУ-Д"
	if (blockId == "stack0_block3") return "МВ-Д"
	if (blockId == "stack0_block4") return "ГМ-Д"
	if (blockId == "stack1_block1") return "П-Д"
	if (blockId == "stack1_block2") return "Ф-Д"
	if (blockId == "stack1_block3") return "К-Д"
	if (blockId == "stack1_block4") return "НПО-Д"
	if (blockId == "stack1_block5") return "ВКПО-Д"
	if (blockId == "stack1_block6") return "ВП-Д"
	if (blockId == "stack2_block1") return "П-П"
	if (blockId == "stack2_block2") return "СГ-П"
	if (blockId == "stack2_block3") return "ФП"
	if (blockId == "stack2_block4") return "К-П"
	if (blockId == "stack2_block5") return "ВП-П"
	if (blockId == "stack3_block1") return "БПУ-П"
	if (blockId == "stack3_block2") return "ПУ-П"
	if (blockId == "stack3_block3") return "ГМ-П"
	if (blockId == "stack3_block4") return "МВ-П"
	if (blockId == "stack3_block5") return "НПО-П"
	if (blockId == "stack3_block6") return "БВК"
	if (blockId == "stack4_block1") return "ИКО-Д-0"
	if (blockId == "stack4_block2") return "ИКО-Д"
	if (blockId == "stack4_block3") return "ВИ-Д"
	if (blockId == "stack4_block4") return "ВРС-Д"
	if (blockId == "stack5_block1") return "ПУР"
	if (blockId == "stack6_block1") return "БИК"
	if (blockId == "stack6_block2") return "ИГ-П"
	if (blockId == "stack6_block3") return "ИК-П"
	if (blockId == "stack6_block4") return "ВИ-П"
	if (blockId == "stack6_block6") return "ПУМ"
	if (blockId == "stack6_block5") return "ВРС-П"
	if (blockId == "stack7_block1") return "РЩ"
	if (blockId == "stack7_block2") return "БУА-П"
}

function nameOfControl(type,view,view_special) {
	if (type == 'socket') {
		return 'разъем'
	}
	if (type == 'toggler') {
		return 'тумблер'
	}
	if (type == 'button') {
		return 'кнопка'
	}
	if (type == 'knob') {
		return 'ручка'
	}
	if (type == 'knob') {
		return 'ручка'
	}
	if (type == 'rotator') {
		return 'потенциометр'
	}
}