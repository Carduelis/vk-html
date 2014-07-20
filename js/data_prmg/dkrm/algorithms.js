var helloText = {
//	ex1 : 'Без лишних вступлений',
	ex10 : 'Подогрейте паяльником или мощной осветительной лампой реле температурное, расположенное на потолке аппаратной, над шкафом с аппаратурой. В момент срабатывания реле должна отключаться аппаратура радиомаяка и загораться индикатор ПЕРЕГРЕВ на ПИУ КД; При искусственном задымлении в аппаратной должен сработать датчик дыма, расположенный рядом с реле температурным. При этом должно произойти отключение основной и резервной сети.',
}
var exercisesOptions = {
	/*
	ex1 : {
		optionBlock1 : {
			name : 'Выбор фидера',
			options : {
				option1 : 'Фидер I',
				option2 : 'Фидер II',
			},
		},
		optionBlock2 : {
			name : 'Выбор Фазности',
			options : {
				option1 : 'Правильная',
				option2 : 'Неправильная',
			},
		},
	},
	ex2 : {
		optionBlock1 : {
			name : 'Выбор фидера',
			options : {
				option1 : 'Фидер I',
				option2 : 'Фидер II',
			},
		},
		optionBlock2 : {
			name : 'Выбор Фазности',
			options : {
				option1 : 'Правильная',
				option2 : 'Неправильная',
			},
		},
		optionBlock3 : {
			name : 'Фиксированная частота',
			options : {
				option1 : 'Правильная',
				option2 : 'Неправильная',
			},
		},
		optionBlock4 : {
			name : 'Ток кристалла',
			options : {
				option1 : 'В зеленой зоне',
				option2 : 'Не в зеленой зоне',
			},
		},
		optionBlock5 : {
			name : 'Шумы',
			options : {
				option1 : 'В красной зоне',
				option2 : 'Не в красной зоне',
			},
		},
	},
	ex3 : {
		optionBlock1 : {
			name : 'Зависит от выбора волны',
			options : {
				option1 : 'Да',
				option2 : 'нет',
			},
		},
		optionBlock2 : {
			name : 'Зависит от выбора тока смешения',
			options : {
				option1 : 'Да',
				option2 : 'Нет',
			},
		},
	},
	*/
}

var exercisesContainer = {
ex1 : {
	nameOfExercise : 'Включение и проверка источников питания',
	el1 : {
		click : '1',
		current : {
			inStack : 'stack1',
			inBlock : 'stack1_block2',
			onSide : 'stack1_block2_front',
			num : '1',
			type : 'toggler',
		},
		positions : {
			position_1 : {
				state : '0',
				description : 'Установите переключатель СЕТЬ РЕЗЕРВН-ЭЛ.СТАНЦИЯ в положение СЕТЬ РЕЗЕРВН.',
			},
		},
	},
	el2 : {
		click : '2',
		current : {
			inStack : 'stack1',
			inBlock : 'stack1_block1',
			onSide : 'stack1_block1_front',
			num : '315',
			type : 'toggler',
		},
		positions : {
			position_1 : {
				state : '1',
				description : 'Включите выключатель СЕТЬ ОСН',
				action_1 : {
					inStack : 'stack1',
					inBlock : 'stack1_block1',
					onSide : 'stack1_block1_front',
					type : 'lamp',
					num : '6',
					status : 'on',
				},
			},
		},
	},
	el3 : {
		click : '3',
		current : {
			inStack : 'stack1',
			inBlock : 'stack1_block1',
			onSide : 'stack1_block1_front',
			num : '276',
			type : 'toggler',
		},
		positions : {
			position_1 : {
				state : '1',
				description : 'Включите выключатель СЕТЬ РЕЗ',
				action_1 : {
					inStack : 'stack1',
					inBlock : 'stack1_block1',
					onSide : 'stack1_block1_front',
					type : 'lamp',
					num : '13',
					status : 'on',
				},
			},
		},
	},
	el4 : {
		click : '4',
		current : {
			inStack : 'stack1',
			inBlock : 'stack1_block1',
			onSide : 'stack1_block1_front',
			num : '2',
			type : 'knob',
		},
		positions : {
			position_1 : {
				state : '1',
				description : 'Установите переключатель контроля напряжения в положение СЕТЬ ОСН. Измерьте напряжение.',
				action_1 : {
					inStack : 'stack1',
					inBlock : 'stack1_block1',
					onSide : 'stack1_block1_front',
					type : 'scale',
					num : '1',
					status : '26',
				},
			},
			position_2 : {
				state : '2',
				description : 'Установите переключатель контроля напряжения в положение СЕТЬ РЕЗ. Измерьте напряжение.',
				action_1 : {
					inStack : 'stack1',
					inBlock : 'stack1_block1',
					onSide : 'stack1_block1_front',
					type : 'scale',
					num : '1',
					status : '24',
				},
			},
			position_3 : {
				state : '5',
				description : 'Установите переключатель контроля напряжения в положение +27В ДЕЖ. Измерьте напряжение.',
				action_1 : {
					inStack : 'stack1',
					inBlock : 'stack1_block1',
					onSide : 'stack1_block1_front',
					type : 'scale',
					num : '1',
					status : '-38',
				},
			},
		},
	},
	el5 : {
		click : '5',
		current : {
			inStack : 'stack1',
			inBlock : 'stack1_block1',
			onSide : 'stack1_block1_front',
			num : '5',
			type : 'toggler',
		},
		positions : {
			position_1 : {
				state : '0',
				description : 'Установите переключатель М ВКЛ 	Д ВКЛ в положение М ВКЛ',
			},
		},
		defaultPosition : '1',
	},
	el6 : {
		click : '6',
		current : {
			inStack : 'stack0',
			inBlock : 'stack0_block14',
			onSide : 'stack0_block14_front',
			num : '19',
			type : 'toggler',
		},
		positions : {
			position_1 : {
				state : '0',
				description : 'Установите переключатель РАБОТА 	КАЛИБРОВКА на передней панели ИКР в положение РАБОТА',
				action_1 : {
					inStack : 'stack0',
					inBlock : 'stack0_block14',
					onSide : 'stack0_block14_front',
					type : 'lamp',
					num : '15',
					status : 'on',
				},
				action_2 : {
					inStack : 'stack0',
					inBlock : 'stack0_block14',
					onSide : 'stack0_block14_front',
					type : 'lamp',
					num : '3',
					status : 'on',
				},
				action_3 : {
					inStack : 'stack0',
					inBlock : 'stack0_block14',
					onSide : 'stack0_block14_front',
					type : 'indicator',
					num : '31',
					status : '0000',
				},
				action_4 : {
					inStack : 'stack0',
					inBlock : 'stack0_block14',
					onSide : 'stack0_block14_front',
					type : 'indicator',
					num : '15',
					status : '0000',
				},
			},
		},
	},
	el7 : {
		click : '7',
		current : {
			inStack : 'stack1',
			inBlock : 'stack1_block1',
			onSide : 'stack1_block1_front',
			num : '130',
			type : 'toggler',
		},
		positions : {
			position_1 : {
				state : '1',
				description : 'Включите переключатель БП1 ',
				action_1 : {
					inStack : 'stack1',
					inBlock : 'stack1_block1',
					onSide : 'stack1_block1_front',
					type : 'lamp',
					num : '21',
					status : 'on',
				},
			},
		},
	},
	el8 : {
		click : '8',
		current : {
			inStack : 'stack1',
			inBlock : 'stack1_block1',
			onSide : 'stack1_block1_front',
			num : '96',
			type : 'toggler',
		},
		positions : {
			position_1 : {
				state : '1',
				description : 'Включите переключатель БП2',
				action_1 : {
					inStack : 'stack1',
					inBlock : 'stack1_block1',
					onSide : 'stack1_block1_front',
					type : 'lamp',
					num : '30',
					status : 'on',
				},
			},
		},
		defaultPosition : '0',
	},
	el9 : {
		click : '9',
		current : {
			inStack : 'stack1',
			inBlock : 'stack1_block1',
			onSide : 'stack1_block1_front',
			num : '63',
			type : 'toggler',
		},
		positions : {
			position_1 : {
				state : '1',
				description : 'Включите переключатель 27В БП1 (2)',
				action_1 : {
					inStack : 'stack1',
					inBlock : 'stack1_block1',
					onSide : 'stack1_block1_front',
					type : 'lamp',
					num : '40',
					status : 'on',
				},
			},
		},
		defaultPosition : '0',
	},
	el10 : {
		click : '10',
		current : {
			inStack : 'stack1',
			inBlock : 'stack1_block1',
			onSide : 'stack1_block1_front',
			num : '2',
			type : 'knob',
		},
		positions : {
			position_1 : {
				state : '3',
				description : 'Установите переключатель контроля напряжений в положение 27В БП1 (2). Измерьте напряжение.',
				action_1 : {
					inStack : 'stack1',
					inBlock : 'stack1_block1',
					onSide : 'stack1_block1_front',
					type : 'scale',
					num : '1',
					status : '-35',
				},
			},
		},
	},
	el11 : {
		click : '11',
		current : {
			inStack : 'stack1',
			inBlock : 'stack1_block1',
			onSide : 'stack1_block1_front',
			num : '31',
			type : 'toggler',
		},
		positions : {
			position_1 : {
				state : '1',
				description : 'Включите переключатель АККУМ',
			},
		},
		defaultPosition : '0',
	},
	el12 : {
		click : '12',
		current : {
			inStack : 'stack1',
			inBlock : 'stack1_block1',
			onSide : 'stack1_block1_front',
			num : '2',
			type : 'knob',
		},
		positions : {
			position_1 : {
				state : '4',
				description : 'Установите переключатель контроля напряжения в положение АККУМ. Измерьте напряжение.',
				action_1 : {
					inStack : 'stack1',
					inBlock : 'stack1_block1',
					onSide : 'stack1_block1_front',
					type : 'scale',
					num : '1',
					status : '-42',
				},
			},
		},
	},
	el13 : {
		click : '13',
		current : {
			inStack : 'stack1',
			inBlock : 'stack1_block1',
			onSide : 'stack1_block1_front',
			num : '120',
			type : 'toggler',
		},
		positions : {
			position_1 : {
				state : '1',
				description : 'Включите переключатель ЗАРЯД АБ. Убедитесь, что прибор контроля тока батареи показывает заряд.',
				action_1 : {
					inStack : 'stack1',
					inBlock : 'stack1_block1',
					onSide : 'stack1_block1_front',
					type : 'scale',
					num : '5',
					status : '-27',
				},
			},
		},
		defaultPosition : '0',
	},
	el14 : {
		click : '14',
		current : {
			inStack : 'stack1',
			inBlock : 'stack1_block1',
			onSide : 'stack1_block1_front',
			num : '52',
			type : 'toggler',
		},
		positions : {
			position_1 : {
				state : '0',
				description : 'Включите переключатель ОСВЕЩЕНИЕ',
				action_1 : {
					inStack : 'stack1',
					inBlock : 'stack1_block1',
					onSide : 'stack1_block1_front',
					type : 'lamp',
					num : '52',
					status : 'on',
				},
			},
		},
		defaultPosition : '1',
	},
	el15 : {
		click : '15',
		current : {
			inStack : 'stack1',
			inBlock : 'stack1_block1',
			onSide : 'stack1_block1_front',
			num : '130',
			type : 'toggler',
		},
		positions : {
			position_1 : {
				state : '0',
				description : 'Выключите БП1',
				action_1 : {
					inStack : 'stack1',
					inBlock : 'stack1_block1',
					onSide : 'stack1_block1_front',
					type : 'lamp',
					num : '21',
					status : 'off',
				},
			},
		},
	},
	el16 : {
		click : '16',
		current : {
			inStack : 'stack1',
			inBlock : 'stack1_block1',
			onSide : 'stack1_block1_front',
			num : '96',
			type : 'toggler',
		},
		positions : {
			position_1 : {
				state : '0',
				description : 'Выключите БП2. Убедитесь, что прибор контроля тока АБ показывает разряд.',
				action_1 : {
					inStack : 'stack1',
					inBlock : 'stack1_block1',
					onSide : 'stack1_block1_front',
					type : 'lamp',
					num : '30',
					status : 'off',
				},
				action_2 : {
					inStack : 'stack1',
					inBlock : 'stack1_block1',
					onSide : 'stack1_block1_front',
					type : 'scale',
					num : '5',
					status : '15',
				},
			},
		},
	},
	el17 : {
		click : '17',
		current : {
			inStack : 'stack1',
			inBlock : 'stack1_block1',
			onSide : 'stack1_block1_front',
			num : '120',
			type : 'toggler',
		},
		positions : {
			position_1 : {
				state : '0',
				description : 'Выключите АБ',
				action_1 : {
					inStack : 'stack1',
					inBlock : 'stack1_block1',
					onSide : 'stack1_block1_front',
					type : 'scale',
					num : '5',
					status : '1',
				},
			},
		},
	},
	el18 : {
		click : '18',
		current : {
			inStack : 'stack1',
			inBlock : 'stack1_block1',
			onSide : 'stack1_block1_front',
			num : '130',
			type : 'toggler',
		},
		positions : {
			position_1 : {
				state : '1',
				description : 'Включите БП1',
				action_1 : {
					inStack : 'stack1',
					inBlock : 'stack1_block1',
					onSide : 'stack1_block1_front',
					type : 'lamp',
					num : '21',
					status : 'on',
				},
			},
		},
	},
	el19 : {
		click : '19',
		current : {
			inStack : 'stack1',
			inBlock : 'stack1_block1',
			onSide : 'stack1_block1_front',
			num : '96',
			type : 'toggler',
		},
		positions : {
			position_1 : {
				state : '1',
				description : 'Включите БП2',
				action_1 : {
					inStack : 'stack1',
					inBlock : 'stack1_block1',
					onSide : 'stack1_block1_front',
					type : 'lamp',
					num : '30',
					status : 'on',
				},
			},
		},
	},
	el20 : {
		click : '20',
		current : {
			inStack : 'stack1',
			inBlock : 'stack1_block1',
			onSide : 'stack1_block1_front',
			num : '130',
			type : 'toggler',
		},
		positions : {
			position_1 : {
				state : '0',
				description : 'Убедитесь в работоспособности БП1 и БП2, для чего кратковременно отключите БП1.',
				action_1 : {
					inStack : 'stack1',
					inBlock : 'stack1_block1',
					onSide : 'stack1_block1_front',
					type : 'lamp',
					num : '21',
					status : 'off',
				},
			},
			position_2 : {
				state : '1',
				description : 'Включите БП1',
				action_1 : {
					inStack : 'stack1',
					inBlock : 'stack1_block1',
					onSide : 'stack1_block1_front',
					type : 'lamp',
					num : '21',
					status : 'on',
				},
			},
		},
	},
	el21 : {
		click : '21',
		current : {
			inStack : 'stack1',
			inBlock : 'stack1_block2',
			onSide : 'stack1_block2_front',
			num : '1',
			type : 'toggler',
		},
		positions : {
			position_1 : {
				state : '1',
				description : 'Установите переключатель СЕТЬ РЕЗЕРВН 	ЭЛ СТАНЦИЯ в положение ЭЛ СТАНЦИЯ',
			},
		},
	},
	el22 : {
		click : '22',
		current : {
			inStack : 'stack1',
			inBlock : 'stack1_block1',
			onSide : 'stack1_block1_front',
			num : '2',
			type : 'knob',
		},
		positions : {
			position_1 : {
				state : '2',
				description : 'Установите переключательконтроля напряжений в положение СЕТЬ РЕЗ. Измерьте напряжение.',
				action_1 : {
					inStack : 'stack1',
					inBlock : 'stack1_block1',
					onSide : 'stack1_block1_front',
					type : 'scale',
					num : '1',
					status : '25',
				},
			},
		},
	},
	el23 : {
		click : '23',
		current : {
			inStack : 'stack1',
			inBlock : 'stack1_block1',
			onSide : 'stack1_block1_front',
			num : '315',
			type : 'toggler',
		},
		positions : {
			position_1 : {
				state : '0',
				description : 'Выключите СЕТЬ ОСН',
				action_1 : {
					inStack : 'stack1',
					inBlock : 'stack1_block1',
					onSide : 'stack1_block1_front',
					type : 'lamp',
					num : '6',
					status : 'off',
				},
			},
		},
	},
	el24 : {
		click : '24',
		current : {
			inStack : 'stack1',
			inBlock : 'stack1_block1',
			onSide : 'stack1_block1_front',
			num : '31',
			type : 'toggler',
		},
		positions : {
			position_1 : {
				state : '0',
				description : 'Выключите АККУМ',
			},
		},
	},
	el25 : {
		click : '25',
		current : {
			inStack : 'stack0',
			inBlock : 'stack0_block1',
			onSide : 'stack0_block1_front',
			num : '21',
			type : 'toggler',
		},
		positions : {
			position_1 : {
				state : '1',
				description : 'Установите переключатель настройки в положение НАСТРОЙКА',
				action_1 : {
					inStack : 'stack0',
					inBlock : 'stack0_block1',
					onSide : 'stack0_block1_front',
					type : 'lamp',
					num : '115',
					status : 'on',
				},
			},
		},
		defaultPosition : '0',
	},
	el26 : {
		click : '26',
		current : {
			inStack : 'stack0',
			inBlock : 'stack0_block1',
			onSide : 'stack0_block1_front',
			num : '99',
			type : 'button',
		},
		positions : {
			position_1 : {
				state : 'on',
				description : 'Нажмите кнопку ВКЛ КРМ1',
				action_1 : {
					inStack : 'stack0',
					inBlock : 'stack0_block1',
					onSide : 'stack0_block1_front',
					type : 'lamp',
					num : '264',
					status : 'on',
				},
			},
		},
	},
	el27 : {
		click : '27',
		current : {
			inStack : 'stack0',
			inBlock : 'stack0_block14',
			onSide : 'stack0_block14_front',
			num : '19',
			type : 'toggler',
		},
		positions : {
			position_1 : {
				state : '1',
				description : 'Установите переключатель КРС-УРОВЕНЬ в положение УРОВЕНЬ',
			},
		},
		defaultPosition : '1',
	},
},

ex2 : {

	nameOfExercise : 'Включение РД',
	el1 : {
		click : '1',
		current : {
			inStack : 'stack0',
			inBlock : 'stack0_block1',
			onSide : 'stack0_block1_front',
			num : '21',
			type : 'toggler',
		},
		positions : {
			position_1 : {
				state : '1',
				description : 'Переключатель РЕЖИМ на ПИУ КД установите в положение НАСТР.',
				action_1 : {
					inStack : 'stack0',
					inBlock : 'stack0_block1',
					onSide : 'stack0_block1_front',
					type : 'lamp',
					num : '115',
					status : 'on',
				},
			},
		},
		defaultPosition : '0',
	},
	el2 : {
		click : '2',
		current : {
			inStack : 'stack0',
			inBlock : 'stack0_block1',
			onSide : 'stack0_block1_front',
			num : '43',
			type : 'button',
		},
		positions : {
			position_1 : {
				state : 'on',
				description : 'Включите РД1',
				action_1 : {
					inStack : 'stack0',
					inBlock : 'stack0_block1',
					onSide : 'stack0_block1_front',
					type : 'lamp',
					num : '47',
					status : 'on',
				},
			},
		},
	},
	el3 : {
		click : '3',
		current : {
			inStack : 'stack0',
			inBlock : 'stack0_block1',
			onSide : 'stack0_block1_front',
			num : '132',
			type : 'button',
		},
		positions : {
			position_1 : {
				state : 'on',
				description : 'Включите РД2',
				action_1 : {
					inStack : 'stack0',
					inBlock : 'stack0_block1',
					onSide : 'stack0_block1_front',
					type : 'lamp',
					num : '95',
					status : 'on',
				},
			},
		},
	},
	el4 : {
		click : '4',
		current : {
			inStack : 'stack0',
			inBlock : 'stack0_block6',
			onSide : 'stack0_block6_front',
			num : '16',
			type : 'toggler',
		},
		positions : {
			position_1 : {
				state : '0',
				description : 'Включите ИПС ПРД 1-го комплекта',
			},
		},
	},
	el5 : {
		click : '5',
		current : {
			inStack : 'stack0',
			inBlock : 'stack0_block8',
			onSide : 'stack0_block8_front',
			num : '16',
			type : 'toggler',
		},
		positions : {
			position_1 : {
				state : '0',
				description : 'Включите ИПС ПРД 2-го комплекта',
				action_1 : {
					inStack : 'stack0',
					inBlock : 'stack0_block8',
					onSide : 'stack0_block8_front',
					type : 'lamp',
					num : '13',
					status : 'off',
				},
				action_2 : {
					inStack : 'stack0',
					inBlock : 'stack0_block8',
					onSide : 'stack0_block8_front',
					type : 'lamp',
					num : '13',
					status : 'on',
				},
				action_3 : {
					inStack : 'stack0',
					inBlock : 'stack0_block8',
					onSide : 'stack0_block8_front',
					type : 'lamp',
					num : '22',
					status : 'on',
				},
				action_4 : {
					inStack : 'stack0',
					inBlock : 'stack0_block8',
					onSide : 'stack0_block8_front',
					type : 'lamp',
					num : '34',
					status : 'on',
				},
				action_5 : {
					inStack : 'stack0',
					inBlock : 'stack0_block8',
					onSide : 'stack0_block8_front',
					type : 'lamp',
					num : '48',
					status : 'on',
				},
			},
		},
	},

},

ex3 : {
	nameOfExercise : 'Проверка работоспособности основной аппаратуры маяка',
	el1 : {
		click : '1',
		current : {
			inStack : 'stack0',
			inBlock : 'stack0_block1',
			onSide : 'stack0_block1_front',
			num : '21',
			type : 'toggler',
		},
		positions : {
			position_1 : {
				state : '1',
				description : 'Переключатель РАБОТА-НАСТР на ПИУ КД установите в положение НАСТР',
				action_1 : {
					inStack : 'stack0',
					inBlock : 'stack0_block1',
					onSide : 'stack0_block1_front',
					type : 'lamp',
					num : '115',
					status : 'on',
				},
			},
		},
		defaultPosition : '0',
	},
	el2 : {
		click : '2',
		current : {
			inStack : 'stack0',
			inBlock : 'stack0_block1',
			onSide : 'stack0_block1_front',
			num : '99',
			type : 'button',
		},
		positions : {
			position_1 : {
				state : 'on',
				description : 'Нажмите кнопку ВКЛ ГРМ1',
				action_1 : {
					inStack : 'stack0',
					inBlock : 'stack0_block1',
					onSide : 'stack0_block1_front',
					type : 'lamp',
					num : '264',
					status : 'on',
				},
				action_2 : {
					inStack : 'stack0',
					inBlock : 'stack0_block1',
					onSide : 'stack0_block1_front',
					type : 'lamp',
					num : '291',
					status : 'on',
				},
			},
		},
	},
	el3 : {
		click : '3',
		current : {
			inStack : 'stack0',
			inBlock : 'stack0_block5',
			onSide : 'stack0_block5_front',
			num : '7',
			type : 'button',
		},
		positions : {
			position_1 : {
				state : 'on',
				description : 'Нажмите кнопку ПАРАМЕТР. На цифровом индикаторе отобразится номер частотного канала, заданный заводской настройкой.',
				action_1 : {
					inStack : 'stack0',
					inBlock : 'stack0_block5',
					onSide : 'stack0_block5_front',
					type : 'lamp',
					num : '21',
					status : 'off',
				},
				action_2 : {
					inStack : 'stack0',
					inBlock : 'stack0_block5',
					onSide : 'stack0_block5_front',
					type : 'lamp',
					num : '10',
					status : 'on',
				},
				action_3 : {
					inStack : 'stack0',
					inBlock : 'stack0_block5',
					onSide : 'stack0_block5_front',
					type : 'indicator',
					num : '9',
					status : '000',
				},
			},
			position_2 : {
				state : 'off',
				description : 'Нажмите кнопку ПАРАМЕТР. На цифровом индикаторе отобразится значение мощности в ваттах.',
				action_1 : {
					inStack : 'stack0',
					inBlock : 'stack0_block5',
					onSide : 'stack0_block5_front',
					type : 'lamp',
					num : '10',
					status : 'off',
				},
				action_2 : {
					inStack : 'stack0',
					inBlock : 'stack0_block5',
					onSide : 'stack0_block5_front',
					type : 'lamp',
					num : '6',
					status : 'on',
				},
				action_3 : {
					inStack : 'stack0',
					inBlock : 'stack0_block5',
					onSide : 'stack0_block5_front',
					type : 'indicator',
					num : '9',
					status : '000',
				},
			},
			position_3 : {
				state : 'off',
				description : 'Нажмите кнопку ПАРАМЕТР. На цифровом индикаторе отобразится коэффициент стоячей волны.',
				action_1 : {
					inStack : 'stack0',
					inBlock : 'stack0_block5',
					onSide : 'stack0_block5_front',
					type : 'lamp',
					num : '6',
					status : 'off',
				},
				action_2 : {
					inStack : 'stack0',
					inBlock : 'stack0_block5',
					onSide : 'stack0_block5_front',
					type : 'lamp',
					num : '15',
					status : 'on',
				},
				action_3 : {
					inStack : 'stack0',
					inBlock : 'stack0_block5',
					onSide : 'stack0_block5_front',
					type : 'indicator',
					num : '9',
					status : '000',
				},
			},
			position_4 : {
				state : 'off',
				description : 'Нажмите кнопку ПАРАМЕТР. На цифровом индикаторе отобразится температура.',
				action_1 : {
					inStack : 'stack0',
					inBlock : 'stack0_block5',
					onSide : 'stack0_block5_front',
					type : 'lamp',
					num : '15',
					status : 'off',
				},
				action_2 : {
					inStack : 'stack0',
					inBlock : 'stack0_block5',
					onSide : 'stack0_block5_front',
					type : 'lamp',
					num : '21',
					status : 'on',
				},
				action_3 : {
					inStack : 'stack0',
					inBlock : 'stack0_block5',
					onSide : 'stack0_block5_front',
					type : 'indicator',
					num : '9',
					status : '000',
				},
			},
		},
	},
	el4 : {
		click : '4',
		current : {
			inStack : 'stack0',
			inBlock : 'stack0_block14',
			onSide : 'stack0_block14_front',
			num : '9',
			type : 'toggler',
		},
		positions : {
			position_1 : {
				state : '1',
				description : 'Установите переключатель КРС-УРОВЕНЬ в положение УРОВЕНЬ',
			},
			position_2 : {
				state : '0',
				description : 'Установите переключатель КРС-УРОВЕНЬ в положение КРС, снимите показание КРС по цифровым индикаторам по каналам контроля «0» и «S».',
			},
		},
		defaultPosition : '0',
	},	
},
ex4 : {

	nameOfExercise : 'Установка и контроль положения зоны глиссады, проверка установленных порогов выдачи сигналов аварии устройств допускового контроля, проверка аварийного переключения комплектов',
	el1 : {
		click : '1',
		current : {
			inStack : 'stack0',
			inBlock : 'stack0_block2',
			onSide : 'stack0_block2_front',
			num : '1',
			type : 'rotator',
		},
		positions : {
			position_1 : {
				state : '5',
				description : 'Установите ручку крутизны на 50 делений',
			},
		},
	},
	el2 : {
		click : '2',
		current : {
			inStack : 'stack0',
			inBlock : 'stack0_block1',
			onSide : 'stack0_block1_front',
			num : '99',
			type : 'button',
		},
		positions : {
			position_1 : {
				state : 'on',
				description : 'Включите первый комплект аппаратуры ГРМ',
				action_1 : {
					inStack : 'stack0',
					inBlock : 'stack0_block1',
					onSide : 'stack0_block1_front',
					type : 'lamp',
					num : '264',
					status : 'on',
				},
				action_2 : {
					inStack : 'stack0',
					inBlock : 'stack0_block1',
					onSide : 'stack0_block1_front',
					type : 'lamp',
					num : '291',
					status : 'on',
				},
				action_3 : {
					inStack : 'stack0',
					inBlock : 'stack0_block1',
					onSide : 'stack0_block1_front',
					type : 'lamp',
					num : '23',
					status : 'on',
				},
				action_4 : {
					inStack : 'stack0',
					inBlock : 'stack0_block1',
					onSide : 'stack0_block1_front',
					type : 'lamp',
					num : '31',
					status : 'on',
				},
				action_5 : {
					inStack : 'stack0',
					inBlock : 'stack0_block1',
					onSide : 'stack0_block1_front',
					type : 'lamp',
					num : '100',
					status : 'on',
				},
				action_6 : {
					inStack : 'stack0',
					inBlock : 'stack0_block1',
					onSide : 'stack0_block1_front',
					type : 'lamp',
					num : '213',
					status : 'on',
				},
			},
		},
	},
	el3 : {
		click : '3',
		current : {
			inStack : 'stack0',
			inBlock : 'stack0_block2',
			onSide : 'stack0_block2_front',
			num : '2',
			type : 'rotator',
		},
		positions : {
			position_1 : {
				state : '3',
				description : 'Ручкой ФАЗА добейтесь максимального отрицательного значения КРС по каналу контроля «0». Запомните положение фазовращателя и значение КРС',
			},
			position_2 : {
				state : '8',
				description : 'Ручкой ФАЗА добейтесь максимального положительного значения КРС по каналу контроля «0». Запомните положение фазовращателя и значение КРС',
			},
		},
	},
},
ex5 : {

	nameOfExercise : '5. Проверка выдачи сигнала АВАРИЯ от ухода нуля зоны и переключение с задержкой на резервный комплект',
	el1 : {
		click : '1',
		current : {
			inStack : 'stack0',
			inBlock : 'stack0_block4',
			onSide : 'stack0_block4_front',
			num : '1',
			type : 'next',
		},
		positions : {
			position_1 : {
				state : 'off',
				description : 'Устанавливая в тракт между ЦСЧ и УМ КГ фиксированные аттенюаторы с ослаблением 1 дБ, 2 дБ, 3 дБ и 4 дБ, зафиксировать по цифровому индикатору ЦСЧ мощность, при которой на ПИУ Г загорается индикатор АВАРИЯ Мщ ГРМ. Мощность в момент выдачи сигнала АВАРИЯ должна быть от 3 до 5 Вт. Задержка времени переключения — не более 2 с.',
				action_1 : {
					inStack : 'stack0',
					inBlock : 'stack0_block1',
					onSide : 'stack0_block1_front',
					type : 'lamp',
					num : '384',
					status : 'on',
				},
				action_2 : {
					inStack : 'stack0',
					inBlock : 'stack0_block1',
					onSide : 'stack0_block1_front',
					type : 'lamp',
					num : '23',
					status : 'on',
				},
				action_3 : {
					inStack : 'stack0',
					inBlock : 'stack0_block1',
					onSide : 'stack0_block1_front',
					type : 'lamp',
					num : '100',
					status : 'on',
				},
				action_4 : {
					inStack : 'stack0',
					inBlock : 'stack0_block1',
					onSide : 'stack0_block1_front',
					type : 'lamp',
					num : '31',
					status : 'on',
				},
				action_5 : {
					inStack : 'stack0',
					inBlock : 'stack0_block1',
					onSide : 'stack0_block1_front',
					type : 'lamp',
					num : '213',
					status : 'on',
				},
				action_6 : {
					inStack : 'stack0',
					inBlock : 'stack0_block1',
					onSide : 'stack0_block1_front',
					type : 'lamp',
					num : '264',
					status : 'on',
				},
				action_7 : {
					inStack : 'stack0',
					inBlock : 'stack0_block1',
					onSide : 'stack0_block1_front',
					type : 'lamp',
					num : '291',
					status : 'on',
				},
				action_8 : {
					inStack : 'stack0',
					inBlock : 'stack0_block1',
					onSide : 'stack0_block1_front',
					type : 'lamp',
					num : '50',
					status : 'on',
				},
			},
		},
	},
	el2 : {
		click : '2',
		current : {
			inStack : 'stack0',
			inBlock : 'stack0_block1',
			onSide : 'stack0_block1_front',
			num : '21',
			type : 'toggler',
		},
		positions : {
			position_1 : {
				state : '0',
				description : 'Установите переключатель РЕЖИМ в положение РАБОТА',
			},
		},
		defaultPosition : '1',
	},
	el3 : {
		click : '3',
		current : {
			inStack : 'stack0',
			inBlock : 'stack0_block1',
			onSide : 'stack0_block1_front',
			num : '5',
			type : 'button',
		},
		positions : {
			position_1 : {
				state : 'on',
				description : 'Включите выбранный комплект нажатием кнопки ВЫБОР КОМПЛЕКТА',
				action_1 : {
					inStack : 'stack0',
					inBlock : 'stack0_block1',
					onSide : 'stack0_block1_front',
					type : 'lamp',
					num : '31',
					status : 'off',
				},
				action_2 : {
					inStack : 'stack0',
					inBlock : 'stack0_block1',
					onSide : 'stack0_block1_front',
					type : 'lamp',
					num : '10',
					status : 'on',
				},
			},
		},
	},
},


ex7 : {

	nameOfExercise : 'Проверка задержки переключения на резерв с момента появления сигнала «Аваария»',
	el1 : {
		click : '1',
		current : {
			inStack : 'stack0',
			inBlock : 'stack0_block4',
			onSide : 'stack0_block4_front',
			num : '1',
			type : 'next',
		},
		positions : {
			position_1 : {
				state : 'off',
				description : 'Устанавливая в тракт между ЦСЧ и УМ КГ фиксированные аттенюаторы с ослаблением 1 дБ, 2 дБ, 3 дБ и 4 дБ, зафиксировать по цифровому индикатору ЦСЧ мощность, при которой на ПИУ Г загорается индикатор АВАРИЯ Мщ ГРМ. Мощность в момент выдачи сигнала АВАРИЯ должна быть от 3 до 5 Вт. Задержка времени переключения — не более 2 с.',
				action_1 : {
					inStack : 'stack0',
					inBlock : 'stack0_block1',
					onSide : 'stack0_block1_front',
					type : 'lamp',
					num : '384',
					status : 'on',
				},
				action_2 : {
					inStack : 'stack0',
					inBlock : 'stack0_block1',
					onSide : 'stack0_block1_front',
					type : 'lamp',
					num : '23',
					status : 'on',
				},
				action_3 : {
					inStack : 'stack0',
					inBlock : 'stack0_block1',
					onSide : 'stack0_block1_front',
					type : 'lamp',
					num : '100',
					status : 'on',
				},
				action_4 : {
					inStack : 'stack0',
					inBlock : 'stack0_block1',
					onSide : 'stack0_block1_front',
					type : 'lamp',
					num : '31',
					status : 'on',
				},
				action_5 : {
					inStack : 'stack0',
					inBlock : 'stack0_block1',
					onSide : 'stack0_block1_front',
					type : 'lamp',
					num : '213',
					status : 'on',
				},
				action_6 : {
					inStack : 'stack0',
					inBlock : 'stack0_block1',
					onSide : 'stack0_block1_front',
					type : 'lamp',
					num : '264',
					status : 'on',
				},
				action_7 : {
					inStack : 'stack0',
					inBlock : 'stack0_block1',
					onSide : 'stack0_block1_front',
					type : 'lamp',
					num : '291',
					status : 'on',
				},
				action_8 : {
					inStack : 'stack0',
					inBlock : 'stack0_block1',
					onSide : 'stack0_block1_front',
					type : 'lamp',
					num : '50',
					status : 'on',
				},
			},
		},
	},
	el2 : {
		click : '2',
		current : {
			inStack : 'stack0',
			inBlock : 'stack0_block1',
			onSide : 'stack0_block1_front',
			num : '21',
			type : 'toggler',
		},
		positions : {
			position_1 : {
				state : '0',
				description : 'Установите переключатель РЕЖИМ в положение РАБОТА',
			},
		},
		defaultPosition : '1',
	},
	el3 : {
		click : '3',
		current : {
			inStack : 'stack0',
			inBlock : 'stack0_block1',
			onSide : 'stack0_block1_front',
			num : '5',
			type : 'button',
		},
		positions : {
			position_1 : {
				state : 'on',
				description : 'Включите выбранный комплект нажатием кнопки ВЫБОР КОМПЛЕКТА',
				action_1 : {
					inStack : 'stack0',
					inBlock : 'stack0_block1',
					onSide : 'stack0_block1_front',
					type : 'lamp',
					num : '31',
					status : 'off',
				},
				action_2 : {
					inStack : 'stack0',
					inBlock : 'stack0_block1',
					onSide : 'stack0_block1_front',
					type : 'lamp',
					num : '10',
					status : 'on',
				},
			},
		},
	},
},
ex8 : {

	nameOfExercise : 'Проверка выдачи сигнала "авария" от ухода крутизны зоны и переключение с задержкой времени на резервный комплект',
	el1 : {
		click : '1',
		current : {
			inStack : 'stack0',
			inBlock : 'stack0_block1',
			onSide : 'stack0_block1_front',
			num : '21',
			type : 'toggler',
		},
		positions : {
			position_1 : {
				state : '0',
				description : 'Переключатель РЕЖИМ на ПИУ КД установите в положение РАБОТА',
				action_1 : {
					inStack : 'stack0',
					inBlock : 'stack0_block1',
					onSide : 'stack0_block1_front',
					type : 'lamp',
					num : '100',
					status : 'on',
				},
				action_2 : {
					inStack : 'stack0',
					inBlock : 'stack0_block1',
					onSide : 'stack0_block1_front',
					type : 'lamp',
					num : '264',
					status : 'on',
				},
				action_3 : {
					inStack : 'stack0',
					inBlock : 'stack0_block1',
					onSide : 'stack0_block1_front',
					type : 'lamp',
					num : '213',
					status : 'on',
				},
				action_4 : {
					inStack : 'stack0',
					inBlock : 'stack0_block1',
					onSide : 'stack0_block1_front',
					type : 'lamp',
					num : '31',
					status : 'on',
				},
				action_5 : {
					inStack : 'stack0',
					inBlock : 'stack0_block1',
					onSide : 'stack0_block1_front',
					type : 'lamp',
					num : '23',
					status : 'on',
				},
			},
		},
		defaultPosition : '1',
	},
	el2 : {
		click : '2',
		current : {
			inStack : 'stack0',
			inBlock : 'stack0_block14',
			onSide : 'stack0_block14_front',
			num : '15',
			type : 'button',
		},
		positions : {
			position_1 : {
				state : 'on',
				description : 'Убедитесь, что показания ИКР по каналу контроля "S" составляют 30 % КРС',
				action_1 : {
					inStack : 'stack0',
					inBlock : 'stack0_block14',
					onSide : 'stack0_block14_front',
					type : 'lamp',
					num : '15',
					status : 'on',
				},
				action_2 : {
					inStack : 'stack0',
					inBlock : 'stack0_block14',
					onSide : 'stack0_block14_front',
					type : 'indicator',
					num : '31',
					status : '30',
				},
			},
		},
	},
	el3 : {
		click : '3',
		current : {
			inStack : 'stack0',
			inBlock : 'stack0_block2',
			onSide : 'stack0_block2_front',
			num : '1',
			type : 'rotator',
		},
		positions : {
			position_1 : {
				state : '7',
				description : 'Вращая ручку КРУТИЗНА устройства фидерного тракта, увеличьте КРС по индикатору на ИКР до включения индикатора АВАРИЯ КРУТ на ПИУ Г',
				action_1 : {
					inStack : 'stack0',
					inBlock : 'stack0_block1',
					onSide : 'stack0_block1_front',
					type : 'lamp',
					num : '352',
					status : 'on',
				},
				action_2 : {
					inStack : 'stack0',
					inBlock : 'stack0_block1',
					onSide : 'stack0_block1_front',
					type : 'lamp',
					num : '40',
					status : 'on',
				},
				action_3 : {
					inStack : 'stack0',
					inBlock : 'stack0_block1',
					onSide : 'stack0_block1_front',
					type : 'lamp',
					num : '213',
					status : 'off',
				},
				action_4 : {
					inStack : 'stack0',
					inBlock : 'stack0_block1',
					onSide : 'stack0_block1_front',
					type : 'lamp',
					num : '238',
					status : 'on',
				},
				action_5 : {
					inStack : 'stack0',
					inBlock : 'stack0_block1',
					onSide : 'stack0_block1_front',
					type : 'lamp',
					num : '636',
					status : 'on',
				},
				action_6 : {
					inStack : 'stack0',
					inBlock : 'stack0_block1',
					onSide : 'stack0_block1_front',
					type : 'lamp',
					num : '264',
					status : 'off',
				},
			},
		},
	},
	el4 : {
		click : '4',
		current : {
			inStack : 'stack0',
			inBlock : 'stack0_block2',
			onSide : 'stack0_block2_front',
			num : '1',
			type : 'rotator',
		},
		positions : {
			position_1 : {
				state : '2',
				description : 'На ПИУ КД должны загореться индикаторы АВАРИЯ КРУТ отключив¬шегося комплекта, НЕТ РЕЗЕРВА ГРМ, КАТЕГОРИЯ I ГРМ и включиться звуковой сигнал. Верните ручку крутизны в исходное положение.',
			},
		},
	},
},
ex9 : {

	nameOfExercise : 'Проверка выдачи сигнала "авария" от ухода крутизны зоны и переключение с задержкой времени на резервный комплект',
	el1 : {
		click : '1',
		current : {
			inStack : 'stack0',
			inBlock : 'stack0_block1',
			onSide : 'stack0_block1_front',
			num : '21',
			type : 'toggler',
		},
		positions : {
			position_1 : {
				state : '0',
				description : 'Переключатель РЕЖИМ на ПИУ КД установите в положение РАБОТА',
				action_1 : {
					inStack : 'stack0',
					inBlock : 'stack0_block1',
					onSide : 'stack0_block1_front',
					type : 'lamp',
					num : '100',
					status : 'on',
				},
				action_2 : {
					inStack : 'stack0',
					inBlock : 'stack0_block1',
					onSide : 'stack0_block1_front',
					type : 'lamp',
					num : '264',
					status : 'on',
				},
				action_3 : {
					inStack : 'stack0',
					inBlock : 'stack0_block1',
					onSide : 'stack0_block1_front',
					type : 'lamp',
					num : '213',
					status : 'on',
				},
				action_4 : {
					inStack : 'stack0',
					inBlock : 'stack0_block1',
					onSide : 'stack0_block1_front',
					type : 'lamp',
					num : '31',
					status : 'on',
				},
				action_5 : {
					inStack : 'stack0',
					inBlock : 'stack0_block1',
					onSide : 'stack0_block1_front',
					type : 'lamp',
					num : '23',
					status : 'on',
				},
			},
		},
		defaultPosition : '1',
	},
	el2 : {
		click : '2',
		current : {
			inStack : 'stack0',
			inBlock : 'stack0_block14',
			onSide : 'stack0_block14_front',
			num : '15',
			type : 'button',
		},
		positions : {
			position_1 : {
				state : 'on',
				description : 'Убедитесь, что показания ИКР по каналу контроля "S" составляют 30 % КРС',
				action_1 : {
					inStack : 'stack0',
					inBlock : 'stack0_block14',
					onSide : 'stack0_block14_front',
					type : 'lamp',
					num : '15',
					status : 'on',
				},
				action_2 : {
					inStack : 'stack0',
					inBlock : 'stack0_block14',
					onSide : 'stack0_block14_front',
					type : 'indicator',
					num : '31',
					status : '30',
				},
			},
		},
	},
	el3 : {
		click : '3',
		current : {
			inStack : 'stack0',
			inBlock : 'stack0_block2',
			onSide : 'stack0_block2_front',
			num : '1',
			type : 'rotator',
		},
		positions : {
			position_1 : {
				state : '7',
				description : 'Вращая ручку КРУТИЗНА устройства фидерного тракта, увеличьте КРС по индикатору на ИКР до включения индикатора АВАРИЯ КРУТ на ПИУ Г',
				action_1 : {
					inStack : 'stack0',
					inBlock : 'stack0_block1',
					onSide : 'stack0_block1_front',
					type : 'lamp',
					num : '352',
					status : 'on',
				},
				action_2 : {
					inStack : 'stack0',
					inBlock : 'stack0_block1',
					onSide : 'stack0_block1_front',
					type : 'lamp',
					num : '40',
					status : 'on',
				},
				action_3 : {
					inStack : 'stack0',
					inBlock : 'stack0_block1',
					onSide : 'stack0_block1_front',
					type : 'lamp',
					num : '213',
					status : 'off',
				},
				action_4 : {
					inStack : 'stack0',
					inBlock : 'stack0_block1',
					onSide : 'stack0_block1_front',
					type : 'lamp',
					num : '238',
					status : 'on',
				},
				action_5 : {
					inStack : 'stack0',
					inBlock : 'stack0_block1',
					onSide : 'stack0_block1_front',
					type : 'lamp',
					num : '636',
					status : 'on',
				},
				action_6 : {
					inStack : 'stack0',
					inBlock : 'stack0_block1',
					onSide : 'stack0_block1_front',
					type : 'lamp',
					num : '264',
					status : 'off',
				},
			},
		},
	},
	el4 : {
		click : '4',
		current : {
			inStack : 'stack0',
			inBlock : 'stack0_block2',
			onSide : 'stack0_block2_front',
			num : '1',
			type : 'rotator',
		},
		positions : {
			position_1 : {
				state : '2',
				description : 'На ПИУ КД должны загореться индикаторы АВАРИЯ КРУТ отключив¬шегося комплекта, НЕТ РЕЗЕРВА ГРМ, КАТЕГОРИЯ I ГРМ и включиться звуковой сигнал. Верните ручку крутизны в исходное положение.',
			},
		},
	},
},
ex10 : {
	nameOfExercise : 'Проверка выдачи сигнала аварии при возникновении пожароопасной ситуации',
},

ex11 : {

	nameOfExercise : 'Проверка выдачи сигнала аварии и аварийного переключения с рабочего комплекта на резервный',
	el1 : {
		click : '1',
		current : {
			inStack : 'stack0',
			inBlock : 'stack0_block1',
			onSide : 'stack0_block1_front',
			num : '21',
			type : 'toggler',
		},
		positions : {
			position_1 : {
				state : '0',
				description : 'Переключатель РЕЖИМ на ПИУ КД установить в положение РАБОТА. Спустя 10 с после включения убедиться в отсутствии сигналов аварии',
				action_1 : {
					inStack : 'stack0',
					inBlock : 'stack0_block1',
					onSide : 'stack0_block1_front',
					type : 'lamp',
					num : '100',
					status : 'on',
				},
			},
		},
		defaultPosition : '1',
	},
	el2 : {
		click : '2',
		current : {
			inStack : 'stack0',
			inBlock : 'stack0_block6',
			onSide : 'stack0_block6_front',
			num : '16',
			type : 'toggler',
		},
		positions : {
			position_1 : {
				state : '1',
				description : 'Выключите ИПС РД',
				action_1 : {
					inStack : 'stack0',
					inBlock : 'stack0_block1',
					onSide : 'stack0_block1_front',
					type : 'lamp',
					num : '40',
					status : 'on',
				},
				action_2 : {
					inStack : 'stack0',
					inBlock : 'stack0_block1',
					onSide : 'stack0_block1_front',
					type : 'lamp',
					num : '50',
					status : 'on',
				},
			},
		},
		defaultPosition : '0',
	},
},

}