var helloText = {
//	ex1 : 'Без лишних вступлений',
	ex10 : 'Подогрейте паяльником или мощной осветительной лампой реле температурное, расположенное на потолке аппаратной, над шкафом с аппаратурой. В момент срабатывания реле должна отключаться аппаратура радиомаяка и загораться индикатор ПЕРЕГРЕВ на ПИУ КД; При искусственном задымлении в аппаратной должен сработать датчик дыма, расположенный рядом с реле температурным. При этом должно произойти отключение основной и резервной сети.',
}
var exerciseText = {
	ex9 : {
		message1 : {
			eN : '2',
			//pN : '1',
			text : 'Ослабьте стопорящий винт с воротком на передающей антенне и с помощью регулировочного винта со штурвалом поверните антенну до появления сигнала «Авария» на ИКР.С задержкой времени 2 с должно произойти переключение на резервный комплект. На ПИУ КД должны загореться индикаторы АВАРИЯ ЗОНА КРМ отключившегося комплекта, НЕТ РЕЗЕРВА и включиться звуковой сигнал.',
		},
		message2 : {
			eN : '4',
			pN : '3',
			text : 'Сообщение выводится в 1 упражнении после 4 элемента после третьего Шага',
		},
	},
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

/*
Требуется установить зависимость между положениями тумблеров и лампами на  блоке stack0_block1_front
toggler 21:
0: lamp 100 on, lamp 115 off
1: lamp 100 off, lamp 115 on

toggler 5:
0: lamp 16 on, lamp 23 off
1: lamp 16 off, lamp 23 on

По-хорошему, этими зависимостями нужно переопределять экшены из упражнений либо игорировать экшены из упражнений для этих ламп

В ГРМ нужно сделать то же самое, с теми же номерами элементов
*/
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
			},
			position_2 : {
				state : '2',
				description : 'Установите переключатель контроля напряжения в положение СЕТЬ РЕЗ. Измерьте напряжение.',
			},
			position_3 : {
				state : '5',
				description : 'Установите переключатель контроля напряжения в положение +27В ДЕЖ. Измерьте напряжение.',
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
					status : '40',
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
					status : '40',
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
			num : '68',
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
					num : '76',
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
				state : '3',
				description : 'Установите переключатель контроля напряжений в положение СЕТЬ РЕЗ. Измерьте напряжение.',
				action_1 : {
					inStack : 'stack1',
					inBlock : 'stack1_block1',
					onSide : 'stack1_block1_front',
					type : 'scale',
					num : '1',
					status : '40',
				},
			},
			position_2 : {
				state : '2',
				description : 'Установите переключатель контроля напряжений в положение СЕТЬ РЕЗ. Измерьте напряжение.',
				action_1 : {
					inStack : 'stack1',
					inBlock : 'stack1_block1',
					onSide : 'stack1_block1_front',
					type : 'scale',
					num : '1',
					status : '40',
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
				action_2 : {
					inStack : 'stack0',
					inBlock : 'stack0_block1',
					onSide : 'stack0_block1_front',
					type : 'lamp',
					num : '100',
					status : 'off',
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
				action_1 : {
					inStack : 'stack0',
					inBlock : 'stack0_block6',
					onSide : 'stack0_block6_front',
					type : 'lamp',
					num : '3',
					status : 'on',
				},
				action_2 : {
					inStack : 'stack0',
					inBlock : 'stack0_block6',
					onSide : 'stack0_block6_front',
					type : 'lamp',
					num : '13',
					status : 'on',
				},
				action_3 : {
					inStack : 'stack0',
					inBlock : 'stack0_block6',
					onSide : 'stack0_block6_front',
					type : 'lamp',
					num : '22',
					status : 'on',
				},
				action_4 : {
					inStack : 'stack0',
					inBlock : 'stack0_block6',
					onSide : 'stack0_block6_front',
					type : 'lamp',
					num : '34',
					status : 'on',
				},
				action_5 : {
					inStack : 'stack0',
					inBlock : 'stack0_block6',
					onSide : 'stack0_block6_front',
					type : 'lamp',
					num : '48',
					status : 'on',
				},
				action_6 : {
					inStack : 'stack0',
					inBlock : 'stack0_block5',
					onSide : 'stack0_block5_front',
					type : 'lamp',
					num : '1',
					status : 'on',
				},
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
					num : '3',
					status : 'on',
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
	nameOfExercise : 'Порядок работы ДКРМ при местном управлении',
	el1 : {
		click : '1',
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
				description : 'Включите автомат СЕТЬ ОСН ',
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
	el2 : {
		click : '2',
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
				description : 'Включите автомат СЕТЬ РЕЗ',
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
	el3 : {
		click : '3',
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
				description : 'Установите переключатель контроля напряжений в положение СЕТЬ ОСН и проверьте напряжение по прибору',
			},
			position_2 : {
				state : '2',
				description : 'Установите переключатель контроля напряжений в положение СЕТЬ РЕЗ и проверьте напряжение по прибору',
			},
			position_3 : {
				state : '5',
				description : 'Установите переключатель контроля напряжений в положение +27В ДЕЖ и проверьте напряжение по прибору',
			},
		},
	},
	el4 : {
		click : '4',
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
				description : 'Включите автомат БП1',
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
	el5 : {
		click : '5',
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
				description : 'Включите автомат БП2',
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
	el6 : {
		click : '6',
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
				description : 'Включите автомат +27В БП1 /2/',
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
	},
	el7 : {
		click : '7',
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
				description : 'Установите переключатель контроля напряжения в положение +27В БП1(2)',
				action_1 : {
					inStack : 'stack1',
					inBlock : 'stack1_block1',
					onSide : 'stack1_block1_front',
					type : 'scale',
					num : '1',
					status : '39',
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
			num : '31',
			type : 'toggler',
		},
		positions : {
			position_1 : {
				state : '1',
				description : 'Включите автомат АККУМ',
			},
		},
	},
	el9 : {
		click : '9',
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
				description : 'Установите переключатель контроля напряжений в положение АККУМ и измерьте напряжение по прибору',
				action_1 : {
					inStack : 'stack1',
					inBlock : 'stack1_block1',
					onSide : 'stack1_block1_front',
					type : 'scale',
					num : '1',
					status : '35',
				},
				action_2 : {
					inStack : 'stack0',
					inBlock : 'stack0_block1',
					onSide : 'stack0_block1_front',
					type : 'lamp',
					num : '100',
					status : 'off',
				},
				action_3 : {
					inStack : 'stack0',
					inBlock : 'stack0_block1',
					onSide : 'stack0_block1_front',
					type : 'lamp',
					num : '23',
					status : 'off',
				},
				action_4 : {
					inStack : 'stack0',
					inBlock : 'stack0_block1',
					onSide : 'stack0_block1_front',
					type : 'lamp',
					num : '16',
					status : 'on',
				},
				action_5 : {
					inStack : 'stack0',
					inBlock : 'stack0_block1',
					onSide : 'stack0_block1_front',
					type : 'lamp',
					num : '115',
					status : 'on',
				},
			},
		},
	},
	el10 : {
		click : '10',
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
					num : '115',
					status : 'off',
				},
			},
		},
		defaultPosition : '1',
	},
	el11 : {
		click : '11',
		current : {
			inStack : 'stack0',
			inBlock : 'stack0_block1',
			onSide : 'stack0_block1_front',
			num : '5',
			type : 'toggler',
		},
		positions : {
			position_1 : {
				state : '1',
				description : 'Установите переключатель УПРАВЛЕНИЕ в положение МУ',

			action_1 : {
					inStack : 'stack0',
					inBlock : 'stack0_block1',
					onSide : 'stack0_block1_front',
					type : 'lamp',
					num : '16',
					status : 'off',
				},
				action_2 : {
					inStack : 'stack0',
					inBlock : 'stack0_block1',
					onSide : 'stack0_block1_front',
					type : 'lamp',
					num : '23',
					status : 'on',
				},
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
			num : '5',
			type : 'toggler',
		},
		positions : {
			position_1 : {
				state : '0',
				description : 'Установите переключатель М вкл – Д вкл на РЩ установить в положение М вкл.',
			},
		},
	},
	el13 : {
		click : '13',
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
				description : 'Включите ДКРМ нажатием соответствующей кнопки ВКЛ на ПИУ КД первого комплекта',
				action_1 : {
					inStack : 'stack0',
					inBlock : 'stack0_block1',
					onSide : 'stack0_block1_front',
					type : 'lamp',
					num : '291',
					status : 'on',
				},
				action_2 : {
					inStack : 'stack0',
					inBlock : 'stack0_block1',
					onSide : 'stack0_block1_front',
					type : 'lamp',
					num : '31',
					status : 'on',
				},
			},
		},
	},
	el14 : {
		click : '14',
		current : {
			inStack : 'stack1',
			inBlock : 'stack1_block1',
			onSide : 'stack1_block1_front',
			num : '20',
			type : 'button',
		},
		positions : {
			position_1 : {
				state : 'on',
				description : 'Перед уходом обслуживающего персонала необходимо в темное время суток включить светоограждение, нажав кнопку ВКЛ СВЕТООГРАЖДЕНИЕ на распределительном щите',
				action_1 : {
					inStack : 'stack1',
					inBlock : 'stack1_block1',
					onSide : 'stack1_block1_front',
					type : 'lamp',
					num : '182',
					status : 'on',
				},
			},
		},
	},
},

ex4 : {
	nameOfExercise : 'Проверка работоспособности основной аппаратуры КРМ',
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
				description : 'Переведите переключатель РАБОТА-НАСТРОЙКА на ПИУ КД в положение НАСТРОЙКА',
				action_1 : {
					inStack : 'stack0',
					inBlock : 'stack0_block1',
					onSide : 'stack0_block1_front',
					type : 'lamp',
					num : '100',
					status : 'off',
				},
				action_2 : {
					inStack : 'stack0',
					inBlock : 'stack0_block1',
					onSide : 'stack0_block1_front',
					type : 'lamp',
					num : '115',
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
			num : '99',
			type : 'button',
		},
		positions : {
			position_1 : {
				state : 'on',
				description : 'Включите первый комплект аппаратуры КРМ на излучение, нажимая кнопку ВКЛ КРМ 1 КОМПЛ до включения индикаторов ВКЛ и ИЗЛУЧ КРМ',
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
				description : 'Кнопкой ПАРАМЕТР установите ЦСЧ в режим ЧК. На цифровом индикаторе должен высветиться номер частотного канала, установленного при заводской настройке.',
				action_1 : {
					inStack : 'stack0',
					inBlock : 'stack0_block5',
					onSide : 'stack0_block5_front',
					type : 'lamp',
					num : '6',
					status : 'on',
				},
				action_2 : {
					inStack : 'stack0',
					inBlock : 'stack0_block5',
					onSide : 'stack0_block5_front',
					type : 'lamp',
					num : '21',
					status : 'off',
				},
				action_3 : {
					inStack : 'stack0',
					inBlock : 'stack0_block5',
					onSide : 'stack0_block5_front',
					type : 'indicator',
					num : '9',
					status : '002',
				},
			},
			position_2 : {
				state : 'on',
				description : 'Кнопкой ПАРАМЕТР установите ЦСЧ в режим ЧК. На цифровом индикаторе должен высветиться номер частотного канала, установленного при заводской настройке.',
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
					num : '10',
					status : 'on',
				},
				action_3 : {
					inStack : 'stack0',
					inBlock : 'stack0_block5',
					onSide : 'stack0_block5_front',
					type : 'indicator',
					num : '9',
					status : '001',
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
			num : '19',
			type : 'toggler',
		},
		positions : {
			position_1 : {
				state : '1',
				description : 'Проверьте работу ИКР от БМК ИСП-75, для чего переключатель РАБОТА-КАЛИБРОВКА на передней панели ИКР установите в положение КАЛИБРОВКА.',
			},
		},
		defaultPosition : '0',
	},
	el5 : {
		click : '5',
		current : {
			inStack : 'stack0',
			inBlock : 'stack0_block14',
			onSide : 'stack0_block14_front',
			num : '36',
			type : 'socket',
		},
		positions : {
			position_1 : {
				state : 'on',
				description : 'Соедините гнездо 12,5 Гц на передней панели ИКР с гнездом 12,5 Гц на передней панели БМК.',
			},
		},
	},
	el6 : {
		click : '6',
		current : {
			inStack : 'stack1',
			inBlock : 'stack1_block3',
			onSide : 'stack1_block3_front',
			num : '11',
			type : 'socket',
		},
		positions : {
			position_1 : {
				state : 'on',
				description : 'Соедините гнездо 12,5 Гц на передней панели ИКР с гнездом 12,5 Гц на передней панели БМК.',
			},
		},
	},
	el7 : {
		click : '7',
		current : {
			inStack : 'stack1',
			inBlock : 'stack1_block3',
			onSide : 'stack1_block3_front',
			num : '5',
			type : 'socket',
		},
		positions : {
			position_1 : {
				state : 'on',
				description : 'Соедините гнездо ВЫХОД на передней панели ИКР с гнездом ВЫХОД на передней панели БМК.',
			},
		},
	},
	el8 : {
		click : '8',
		current : {
			inStack : 'stack0',
			inBlock : 'stack0_block14',
			onSide : 'stack0_block14_front',
			num : '11',
			type : 'socket',
		},
		positions : {
			position_1 : {
				state : 'on',
				description : 'Соедините гнездо 0 на передней панели ИКР с гнездом ВЫХОД на передней панели БМК.',
			},
		},
	},
	el9 : {
		click : '9',
		current : {
			inStack : 'stack0',
			inBlock : 'stack0_block14',
			onSide : 'stack0_block14_front',
			num : '23',
			type : 'socket',
		},
		positions : {
			position_1 : {
				state : 'on',
				description : 'Соедините гнездо S на передней панели ИКР с гнездом ВЫХОД на передней панели БМК.',
				action_1 : {
					inStack : 'stack0',
					inBlock : 'stack0_block14',
					onSide : 'stack0_block14_front',
					type : 'lamp',
					num : '3',
					status : 'on',
				},
				action_2 : {
					inStack : 'stack0',
					inBlock : 'stack0_block14',
					onSide : 'stack0_block14_front',
					type : 'lamp',
					num : '15',
					status : 'on',
				},
				action_3 : {
					inStack : 'stack0',
					inBlock : 'stack0_block14',
					onSide : 'stack0_block14_front',
					type : 'indicator',
					num : '15',
					status : '000.0',
				},
				action_4 : {
					inStack : 'stack0',
					inBlock : 'stack0_block14',
					onSide : 'stack0_block14_front',
					type : 'indicator',
					num : '31',
					status : '000.0',
				},
			},
		},
	},
el10 : {
		click : '10',
		current : {
			inStack : 'stack1',
			inBlock : 'stack1_block3',
			onSide : 'stack1_block3_front',
			num : '8',
			type : 'toggler',
		},
		positions : {
			position_1 : {
				state : '1',
				description : 'Включите БМК.',
				action_1 : {
					inStack : 'stack1',
					inBlock : 'stack1_block3',
					onSide : 'stack1_block3_front',
					type : 'lamp',
					num : '15',
					status : 'on',
				},
			},
		},
	},	
	el11 : {
		click : '11',
		current : {
			inStack : 'stack1',
			inBlock : 'stack1_block3',
			onSide : 'stack1_block3_front',
			num : '4',
			type : 'knob',
		},
		positions : {
			position_1 : {
				state : '1',
				description : 'Проверьте соответствие показаний ИКР установленным на БМК фиксированным значениям КРС %.',
				action_1 : {
					inStack : 'stack0',
					inBlock : 'stack0_block14',
					onSide : 'stack0_block14_front',
					type : 'indicator',
					num : '15',
					status : '005.0',
				},
			},
			position_2 : {
				state : '2',
				description : 'Проверьте соответствие показаний ИКР установленным на БМК фиксированным значениям КРС %.',
				action_1 : {
					inStack : 'stack0',
					inBlock : 'stack0_block14',
					onSide : 'stack0_block14_front',
					type : 'indicator',
					num : '15',
					status : '016.5',
				},
			},
			position_3 : {
				state : '3',
				description : 'Проверьте соответствие показаний ИКР установленным на БМК фиксированным значениям КРС %.',
				action_1 : {
					inStack : 'stack0',
					inBlock : 'stack0_block14',
					onSide : 'stack0_block14_front',
					type : 'indicator',
					num : '15',
					status : '033.3',
				},
			},
			position_4 : {
				state : '4',
				description : 'Проверьте соответствие показаний ИКР установленным на БМК фиксированным значениям КРС %.',
				action_1 : {
					inStack : 'stack0',
					inBlock : 'stack0_block14',
					onSide : 'stack0_block14_front',
					type : 'indicator',
					num : '15',
					status : '050.0',
				},
			},
			position_5 : {
				state : '5',
				description : 'Проверьте соответствие показаний ИКР установленным на БМК фиксированным значениям КРС %.',
				action_1 : {
					inStack : 'stack0',
					inBlock : 'stack0_block14',
					onSide : 'stack0_block14_front',
					type : 'indicator',
					num : '15',
					status : '100',
				},
			},
		},
	},
	el12 : {
		click : '12',
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
				description : 'Переключатель РАБОТА-КАЛИБРОВКА на передней панели ИКР установите в положение РАБОТА ',
			},
		},
		defaultPosition : '1'
	},
	el13 : {
		click : '13',
		current : {
			inStack : 'stack0',
			inBlock : 'stack0_block1',
			onSide : 'stack0_block1_front',
			num : '99',
			type : 'button',
		},
		positions : {
			position_1 : {
				state : 'off',
				description : 'Включите на излучение первый комплект аппаратуры',
			},
		},
	},
	el14 : {
		click : '14',
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
				description : 'Установите на блоках ИКР переключатели КРС-УРОВЕНЬ ВХОДА в положение УРОВЕНЬ ВХОДА.',
				action_1 : {
					inStack : 'stack0',
					inBlock : 'stack0_block14',
					onSide : 'stack0_block14_front',
					type : 'indicator',
					num : '31',
					status : '50',
				},
			},
		},
		defaultPosition : '0',
	},
	el15 : {
		click : '15',
		current : {
			inStack : 'stack0',
			inBlock : 'stack0_block14',
			onSide : 'stack0_block14_front',
			num : '9',
			type : 'toggler',
		},
		positions : {
			position_1 : {
				state : '0',
				description : 'Установите тумблер КРС-УРОВЕНЬ ВХОДА на ИКР в положение КРС и снимите показание КРС по цифровому индикатору по каналам контроля.',
			},
		},
	},
},

ex5 : {
	nameOfExercise : 'Установка и контроль положения зоны курса, установка порогов срабатывания выдачи сигналов аварии устройств допускового контроля, проверка аварийного переключения комплектов.',
	el1 : {
		click : '1',
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
				description : 'Включите первый комплект КРМ на излучение.',
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
	el2 : {
		click : '2',
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
				description : 'Вращением ручки КРУТИЗНА ЛФТ первого комплекта, установите индекс делителя мощности на отметку 50 делений',
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
				state : '8',
				description : 'Ручкой ФАЗА первого комплекта установите положение ползунка, при котором КРС-ЛЕВО имеет максимальное значение (80)',
				action_1 : {
					inStack : 'stack0',
					inBlock : 'stack0_block15',
					onSide : 'stack0_block15_front',
					type : 'indicator',
					num : '31',
					status : '-40',
				},
			},
		},
	},
	el4 : {
		click : '4',
		current : {
			inStack : 'stack0',
			inBlock : 'stack0_block1',
			onSide : 'stack0_block1_front',
			num : '169',
			type : 'button',
		},
		positions : {
			position_1 : {
				state : 'on',
				description : 'Включите второй комплект КРМ на излучение',
				action_1 : {
					inStack : 'stack0',
					inBlock : 'stack0_block1',
					onSide : 'stack0_block1_front',
					type : 'lamp',
					num : '636',
					status : 'on',
				},
				action_2 : {
					inStack : 'stack0',
					inBlock : 'stack0_block1',
					onSide : 'stack0_block1_front',
					type : 'lamp',
					num : '676',
					status : 'on',
				},
			},
		},
	},
	el4 : {
		click : '4',
		current : {
			inStack : 'stack0',
			inBlock : 'stack0_block3',
			onSide : 'stack0_block3_front',
			num : '4',
			type : 'rotator',
		},
		positions : {
			position_1 : {
				state : '5',
				description : 'Ручкой КРУТИЗНА второго комплекта установите ползунок в положение 50 делений',
			},
		},
	},
	el5 : {
		click : '5',
		current : {
			inStack : 'stack0',
			inBlock : 'stack0_block3',
			onSide : 'stack0_block3_front',
			num : '3',
			type : 'rotator',
		},
		positions : {
			position_1 : {
				state : '2',
				description : 'Ручкой ФАЗА второго комплекта установите ползунок в положение максимального значения КРС-ПРАВО (80)',
				action_1 : {
					inStack : 'stack0',
					inBlock : 'stack0_block15',
					onSide : 'stack0_block15_front',
					type : 'indicator',
					num : '31',
					status : '40',
				},
			},
		},
	},
	el6 : {
		click : '6',
		current : {
			inStack : 'stack0',
			inBlock : 'stack0_block2',
			onSide : 'stack0_block2_front',
			num : '2',
			type : 'rotator',
		},
		positions : {
			position_1 : {
				state : '6',
				description : 'Ручкой ФАЗА первого комплекта установите положение ползунка, при котором КРС-ЛЕВО имеет значение -30% (60)',
				action_1 : {
					inStack : 'stack0',
					inBlock : 'stack0_block15',
					onSide : 'stack0_block15_front',
					type : 'indicator',
					num : '31',
					status : '-40',
				},
			},
		},
	},
	el7 : {
		click : '7',
		current : {
			inStack : 'stack0',
			inBlock : 'stack0_block3',
			onSide : 'stack0_block3_front',
			num : '3',
			type : 'rotator',
		},
		positions : {
			position_1 : {
				state : '4',
				description : 'Ручкой ФАЗА второго комплекта установите ползунок в положение, при котором КРС-ПРАВО имеет значение 30% (60)',
				action_1 : {
					inStack : 'stack0',
					inBlock : 'stack0_block15',
					onSide : 'stack0_block15_front',
					type : 'indicator',
					num : '31',
					status : '40',
				},
			},
		},
	},
},

ex6 : {
	nameOfExercise : 'Проверка порога срабатывания контроля уровня мощности на выходе УМ КГ',
	el1 : {
		click : '1',
		current : {
			inStack : 'stack0',
			inBlock : 'stack0_block5',
			onSide : 'stack0_block5_front',
			num : '9',
			type : 'socket',
		},
		positions : {
			position_1 : {
				state : 'on',
				description : 'Устанавливая в тракт между ЦСЧ и УМ КГ фиксированные аттенюаторы АИЦТ.467716.001 с ослаблением 1 дБ, 2 дБ, 3 дБ и 4 дБ из состава ЗИ, зафиксировать по цифровому индикатору ЦСЧ мощность, при которой на ПИУ КД загорается индикатор АВАРИЯ Мщ КРМ. (4±1 Вт)',
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
		},
	},
	el2 : {
		click : '2',
		current : {
			inStack : 'stack0',
			inBlock : 'stack0_block4',
			onSide : 'stack0_block4_front',
			num : '7',
			type : 'socket',
		},
		positions : {
			position_1 : {
				state : 'on',
				description : 'Устанавливая в тракт между ЦСЧ и УМ КГ фиксированные аттенюаторы АИЦТ.467716.001 с ослаблением 1 дБ, 2 дБ, 3 дБ и 4 дБ из состава ЗИ, зафиксировать по цифровому индикатору ЦСЧ мощность, при которой на ПИУ КД загорается индикатор АВАРИЯ Мщ КРМ. (4±1 Вт)',
				action_1 : {
					inStack : 'stack0',
					inBlock : 'stack0_block5',
					onSide : 'stack0_block5_front',
					type : 'indicator',
					num : '9',
					status : '004',
				},
				action_2 : {
					inStack : 'stack0',
					inBlock : 'stack0_block1',
					onSide : 'stack0_block1_front',
					type : 'lamp',
					num : '384',
					status : 'on',
				},
				action_3 : {
					inStack : 'stack0',
					inBlock : 'stack0_block1',
					onSide : 'stack0_block1_front',
					type : 'lamp',
					num : '238',
					status : 'on',
				},
				action_4 : {
					inStack : 'stack0',
					inBlock : 'stack0_block1',
					onSide : 'stack0_block1_front',
					type : 'lamp',
					num : '4',
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
			num : '5',
			type : 'button',
		},
		positions : {
			position_1 : {
				state : 'on',
				description : 'Включите выбранный комплект радиомаяка нажатием кнопки ВЫБОР КОМПЛЕКТА на ПИУ Г',
				action_1 : {
					inStack : 'stack0',
					inBlock : 'stack0_block1',
					onSide : 'stack0_block1_front',
					type : 'lamp',
					num : '4',
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
	el4 : {
		click : '4',
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
				description : 'Переключатель РЕЖИМ установите в положение РАБОТА.',
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
					num : '31',
					status : 'on',
				},
				action_3 : {
					inStack : 'stack0',
					inBlock : 'stack0_block1',
					onSide : 'stack0_block1_front',
					type : 'lamp',
					num : '144',
					status : 'on',
				},
			},
		},
		defaultPosition : '1',
	},
},

ex7 : {
	nameOfExercise : 'Проверка задержки переключения на резерв с момента появления сигнала АВАРИЯ',
	el1 : {
		click : '1',
		current : {
			inStack : 'stack0',
			inBlock : 'stack0_block5',
			onSide : 'stack0_block5_front',
			num : '9',
			type : 'socket',
		},
		positions : {
			position_1 : {
				state : 'on',
				description : 'Устанавливая в тракт между ЦСЧ и УМ КГ фиксированные аттенюаторы АИЦТ.467716.001 с ослаблением 1дБ,2дБ 3дБ и 4 дБ из состава ЗИ зафиксировать по цифровому индикатору ЦСЧ мощность, при которой на ПИУ КД загорается индикатор АВАРИЯ Мщ (4 Вт)',
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
		},
	},
	el2 : {
		click : '2',
		current : {
			inStack : 'stack0',
			inBlock : 'stack0_block4',
			onSide : 'stack0_block4_front',
			num : '7',
			type : 'socket',
		},
		positions : {
			position_1 : {
				state : 'on',
				description : 'Устанавливая в тракт между ЦСЧ и УМ КГ фиксированные аттенюаторы АИЦТ.467716.001 с ослаблением 1дБ,2дБ 3дБ и 4 дБ из состава ЗИ зафиксировать по цифровому индикатору ЦСЧ мощность, при которой на ПИУ КД загорается индикатор АВАРИЯ Мщ (4 Вт)',
				action_1 : {
					inStack : 'stack0',
					inBlock : 'stack0_block5',
					onSide : 'stack0_block5_front',
					type : 'indicator',
					num : '9',
					status : '004',
				},
				action_2 : {
					inStack : 'stack0',
					inBlock : 'stack0_block1',
					onSide : 'stack0_block1_front',
					type : 'lamp',
					num : '384',
					status : 'on',
				},
				action_3 : {
					inStack : 'stack0',
					inBlock : 'stack0_block1',
					onSide : 'stack0_block1_front',
					type : 'lamp',
					num : '40',
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
			num : '21',
			type : 'toggler',
		},
		positions : {
			position_1 : {
				state : '1',
				description : 'Разблокируйте ПИУ КД и подождите 10 секунд',
				action_1 : {
					inStack : 'stack0',
					inBlock : 'stack0_block1',
					onSide : 'stack0_block1_front',
					type : 'lamp',
					num : '100',
					status : 'off',
				},
				action_2 : {
					inStack : 'stack0',
					inBlock : 'stack0_block1',
					onSide : 'stack0_block1_front',
					type : 'lamp',
					num : '115',
					status : 'on',
				},
				action_3 : {
					inStack : 'stack0',
					inBlock : 'stack0_block1',
					onSide : 'stack0_block1_front',
					type : 'lamp',
					num : '384',
					status : 'off',
				},
				action_4 : {
					inStack : 'stack0',
					inBlock : 'stack0_block1',
					onSide : 'stack0_block1_front',
					type : 'lamp',
					num : '40',
					status : 'off',
				},
			},
			position_2 : {
				state : '0',
				description : 'Разблокируйте ПИУ КД и подождите 10 секунд',
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
					num : '115',
					status : 'off',
				},
			},
		},
	},
},

ex8 : {
	nameOfExercise : 'Проверка выдачи сигналов аварии для мгновенного переключения на резервный комплект',
	el1 : {
		click : '1',
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
				description : 'Снимите напряжение питания с УМ КГ работающего комплекта установкой тумблера СЕТЬ – ОТКЛ на ИПС ПРД в положение ОТКЛ. ',
				action_1 : {
					inStack : 'stack0',
					inBlock : 'stack0_block1',
					onSide : 'stack0_block1_front',
					type : 'lamp',
					num : '40',
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
			num : '71',
			type : 'button',
		},
		positions : {
			position_1 : {
				state : 'on',
				description : 'На ПИУ КД должен светиться индикатор НЕТ РЕЗЕРВА и включиться звуковой сигнал. Для отключения звукового сигнала нажмите кнопку ЗВУК – ОТКЛ.',
			},
		},
	},
	el3 : {
		click : '3',
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
				description : 'Включите тумблер СЕТЬ на ИПС ПРД первого комплекта',
				action_1 : {
					inStack : 'stack0',
					inBlock : 'stack0_block6',
					onSide : 'stack0_block6_front',
					type : 'lamp',
					num : '3',
					status : 'on',
				},
				action_2 : {
					inStack : 'stack0',
					inBlock : 'stack0_block6',
					onSide : 'stack0_block6_front',
					type : 'lamp',
					num : '13',
					status : 'on',
				},
				action_3 : {
					inStack : 'stack0',
					inBlock : 'stack0_block6',
					onSide : 'stack0_block6_front',
					type : 'lamp',
					num : '22',
					status : 'on',
				},
				action_4 : {
					inStack : 'stack0',
					inBlock : 'stack0_block6',
					onSide : 'stack0_block6_front',
					type : 'lamp',
					num : '34',
					status : 'on',
				},
				action_5 : {
					inStack : 'stack0',
					inBlock : 'stack0_block6',
					onSide : 'stack0_block6_front',
					type : 'lamp',
					num : '48',
					status : 'on',
				},
			},
		},
	},
	el4 : {
		click : '4',
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
				description : 'Разблокируйте КРМ, для чего переведите переключатель РЕЖИМ на ПИУ КД в положение НАСТР.',
				action_1 : {
					inStack : 'stack0',
					inBlock : 'stack0_block1',
					onSide : 'stack0_block1_front',
					type : 'lamp',
					num : '100',
					status : 'off',
				},
				action_2 : {
					inStack : 'stack0',
					inBlock : 'stack0_block1',
					onSide : 'stack0_block1_front',
					type : 'lamp',
					num : '115',
					status : 'on',
				},
			},
		},
	},
	el5 : {
		click : '5',
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
				description : 'Верните переключатель в положение РАБОТА',
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
					num : '115',
					status : 'off',
				},
				action_3 : {
					inStack : 'stack0',
					inBlock : 'stack0_block1',
					onSide : 'stack0_block1_front',
					type : 'lamp',
					num : '40',
					status : 'off',
				},
			},
		},
	},
},

ex9 : {
	nameOfExercise : 'Проверка выдачи сигнала «Авария» от ухода нуля зоны и переключения с задержкой времени на резервный комплект',
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
				description : 'На ПИУ КД установите переключатели РЕЖИМ в положение РАБОТА',
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
					num : '194',
					status : 'on',
				},
				action_3 : {
					inStack : 'stack0',
					inBlock : 'stack0_block14',
					onSide : 'stack0_block14_front',
					type : 'lamp',
					num : '6',
					status : 'on',
				},
				action_4 : {
					inStack : 'stack0',
					inBlock : 'stack0_block14',
					onSide : 'stack0_block14_front',
					type : 'lamp',
					num : '21',
					status : 'on',
				},
				action_5 : {
					inStack : 'stack0',
					inBlock : 'stack0_block1',
					onSide : 'stack0_block1_front',
					type : 'lamp',
					num : '321',
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
			inBlock : 'stack0_block1',
			onSide : 'stack0_block1_front',
			num : '21',
			type : 'toggler',
		},
		positions : {
			position_1 : {
				state : '1',
				description : 'Разблокируйте оба комплекта, включите их в режиме НАСТР и восстановите параметры КРМ, вернув передающую антенну КРМ в исходное положение',
				action_1 : {
					inStack : 'stack0',
					inBlock : 'stack0_block1',
					onSide : 'stack0_block1_front',
					type : 'lamp',
					num : '115',
					status : 'on',
				},
				action_2 : {
					inStack : 'stack0',
					inBlock : 'stack0_block1',
					onSide : 'stack0_block1_front',
					type : 'lamp',
					num : '100',
					status : 'off',
				},
				action_3 : {
					inStack : 'stack0',
					inBlock : 'stack0_block1',
					onSide : 'stack0_block1_front',
					type : 'lamp',
					num : '40',
					status : 'off',
				},
				action_4 : {
					inStack : 'stack0',
					inBlock : 'stack0_block1',
					onSide : 'stack0_block1_front',
					type : 'lamp',
					num : '194',
					status : 'off',
				},
				action_5 : {
					inStack : 'stack0',
					inBlock : 'stack0_block1',
					onSide : 'stack0_block1_front',
					type : 'lamp',
					num : '321',
					status : 'off',
				},
				action_6 : {
					inStack : 'stack0',
					inBlock : 'stack0_block14',
					onSide : 'stack0_block14_front',
					type : 'lamp',
					num : '6',
					status : 'off',
				},
				action_7 : {
					inStack : 'stack0',
					inBlock : 'stack0_block14',
					onSide : 'stack0_block14_front',
					type : 'lamp',
					num : '21',
					status : 'off',
				},
			},
		},
	},
},

ex10 : {

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
ex11 : {
	nameOfExercise : 'Проверка выдачи сигнала аварии при возникновении пожароопасной ситуации',
},

ex12 : {

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