var helloText = {
//	ex1 : 'Без лишних вступлений',
//	ex2 : 'Без лишних вступлений',
	ex3 : 'ПРЛ включен',
	ex4 : 'ПРЛ включен',
	ex5 : 'ДРЛ включен',
	ex6 : 'ДРЛ включен',
}

var exercisesOptions = {
	ex1 : {
		optionBlock1 : {
			name : 'Выбор фидера',
			typeName: 'fiders',
			options : {
				option1 : {
					viewName: 'Фидер I',
					codeName: 'fider1',
				},
				option2 : {
					viewName: 'Фидер II',
					codeName: 'fider2',
				},
			},
		},
		optionBlock2 : {
			name : 'Выбор Фазности',
			typeName : 'phases',
			options : {
				option1 : {
					viewName: 'Правильная',
					codeName: 'phase_correct',
				},
				option2 : {
					viewName: 'Неправильная',
					codeName: 'phase_incorrect',
				},
			},
		},
	},
	ex2 : {
		optionBlock1 : {
			name : 'Выбор фидера',
			typeName: 'fiders',
			options : {
				option1 : {
					viewName: 'Фидер I',
					codeName: 'fider1',
				},
				option2 : {
					viewName: 'Фидер II',
					codeName: 'fider2',
				},
			},
		},
		optionBlock2 : {
			name : 'Выбор Фазности',
			typeName: 'phases',
			options : {
				option1 : {
					viewName: 'Правильная',
					codeName: 'phase_correct',
				},
				option2 : {
					viewName: 'Неправильная',
					codeName: 'phase_incorrect',
				},
			},
		},
		optionBlock3 : {
			name : 'Ток кристалла',
			typeName: 'crystal_current',
			options : {
				option1 : {
					viewName: 'В зеленой зоне',
					codeName: 'current_ok',
				},
				option2 : {
					viewName: 'Не в зеленой зоне',
					codeName: 'current_bad',
				},
			},
		},
		optionBlock4 : {
			name : 'Шумы',
			typeName: 'noises',
			options : {
				option1 : {
					viewName: 'В красной зоне',
					codeName: 'in_red_zone',
				},
				option2 : {
					viewName: 'Не в красной зоне',
					codeName: 'out_red_zone',
				},
			},
		},
		optionBlock5 : {
			name : 'Фиксированная частота',
			typeName: 'frequency',
			options : {
				option1 : {
					viewName: '1',
					codeName: 'first',
				},
				option2 : {
					viewName: '2',
					codeName: 'second',
				},
				option3 : {
					viewName: '3',
					codeName: 'third',
				},
			},
		},
	},
	ex3 : {
		optionBlock1 : {
			name : 'Выбор волны',
			typeName : 'wave_select',
			options : {
				option1 : {
					viewName: 'I',
					codeName: 'wave_1',
				},
				option2 : {
					viewName: 'II',
					codeName: 'wave_2',
				},
			},
		},
		optionBlock2 : {
			name : 'Ток смещения',
			typeName : 'current_check',
			options : {
				option1 : {
					viewName: 'Нормальный',
					codeName: 'current_ok',
				},
				option2 : {
					viewName: 'Не нормальный',
					codeName: 'current_bad',
				},
			},
		},
	},
	ex10 : {
		optionBlock1 : {
			name : 'Выбор фидера',
			typeName: 'fiders',
			options : {
				option1 : {
					viewName: 'Фидер I',
					codeName: 'fider1',
				},
				option2 : {
					viewName: 'Фидер II',
					codeName: 'fider2',
				},
			},
		},
		optionBlock2 : {
			name : 'Выбор Фазности',
			typeName : 'phases',
			options : {
				option1 : {
					viewName: 'Правильная',
					codeName: 'phase_correct',
				},
				option2 : {
					viewName: 'Неправильная',
					codeName: 'phase_incorrect',
				},
			},
		},
	},
}
// Внутри элемента elN делаем новые объекты, содержащие в себе один или несколько позиций/элементов
// если элементов внутри одного элемента несколько, то нужно будет уменьшать каждый раз 
// пременную eN , Но увеличивать новую переменную eN->e2N
// если в elN есть какое-то раздвоение условий, то мы модфицируем все функции, что есть в showEx

var exercisesContainer = {


	ex1 : {
		nameOfExercise : 'Включение аппаратуры ПРЛ',
		el1 : {
			click : '1',
			current : {
					inStack : 'stack7',
					inBlock : 'stack7_block1',
					onSide : 'stack7_block1_front',
					num : '21',
					type : 'button',
			},
			positions : {
				position_1 : {
						state : 'on',
						description : 'Нажмите кнопку СИГНАЛ В СИЛОВУЮ на распределительном щите',
				},
			},
		},
		el2 : {
			click : '2',
			current : {
					inStack : 'stack7',
					inBlock : 'stack7_block1',
					onSide : 'stack7_block1_front',
					num : '3',
					type : 'socket',
			},
			positions : {
				position_1 : {
						state : 'on',
						description : 'Подключите гарнитуру к гнездам ЛАРИНГОФОН-ТЕЛЕФОН и подайте команду электормеханику "Выдать электропитание на ПРЛ"',
				},
			},
		},
		el3 : {
			click : '3',
			current : {
				inStack : 'stack7',
				inBlock : 'stack7_block1',
				onSide : 'stack7_block1_front',
				num : '4',
				type : 'toggler',
			},
			positions : {
				position_1 : {
						state : '0', // нужно 0
						description : 'Установите на распределительном щите в аппаратной машине тумблер включения подсвета вольтметра в положение ПОДСВЕТ',
				},
			},
		},
		el4 : {
			multiply: 'fiders',
			fider1: {
				click : '4',
				current : {
					inStack : 'stack7',
					inBlock : 'stack7_block1',
					onSide : 'stack7_block1_front',
					num : '11',
					type : 'knob',
				},
				positions : {
					position_1 : {
						state : '0', // Было undefined
						description : 'Установите переключатель фазоиндикатора в положение ФИДЕР I',
						action_1 : {
							inStack : 'stack7',
							inBlock : 'stack7_block1',
							onSide : 'stack7_block1_front',
							type : 'scale',
							num : '1',
							status : '34',
						},
						action_2 : {
							inStack : 'stack7',
							inBlock : 'stack7_block1',
							onSide : 'stack7_block1_front',
							type : 'lamp',
							num : '15',
							status : 'on',
						},
					},
				},
			},
			fider2: {
				click : '4',
				current : {
					inStack : 'stack7',
					inBlock : 'stack7_block1',
					onSide : 'stack7_block1_front',
					num : '11',
					type : 'knob',
				},
				positions : {
					position_1 : {
						state : '2', // Было undefined
						description : 'Установите переключатель фазоиндикатора в положение ФИДЕР II',
						action_1 : {
							inStack : 'stack7',
							inBlock : 'stack7_block1',
							onSide : 'stack7_block1_front',
							type : 'lamp',
							num : '15',
							status : 'on',
						},
					},
				},
			},
		},
		el5 : {
			multiply: 'fiders',
			fider1: {
				click : '5',
				current : {
					inStack : 'stack7',
					inBlock : 'stack7_block1',
					onSide : 'stack7_block1_front',
					num : '5',
					type : 'knob',
				},
				positions : {
					position_1 : {
						state : '0', // Было undefined
						description : 'Установите тумблер номиналов напряжения ФИДЕР I в положение А-В',
						/*
						action_1 : {
							inStack : 'stack7',
							inBlock : 'stack7_block1',
							onSide : 'stack7_block1_front',
							type : 'scale',
							num : '1',
							status : '34',
						},
						*/
					},
					position_2 : {
						state : '1', // Было undefined
						description : 'Установите тумблер номиналов напряжения ФИДЕР I в положение А-С',
						/*
						action_1 : {
							inStack : 'stack7',
							inBlock : 'stack7_block1',
							onSide : 'stack7_block1_front',
							type : 'scale',
							num : '1',
							status : '34',
						},
						*/
					},
					position_3 : {
						state : '2', // Было undefined
						description : 'Установите тумблер номиналов напряжения ФИДЕР I в положение В-С',
						/*
						action_1 : {
							inStack : 'stack7',
							inBlock : 'stack7_block1',
							onSide : 'stack7_block1_front',
							type : 'scale',
							num : '1',
							status : '34',
						},
						*/
					},
				},
			},
			fider2: {
				click : '5',
				current : {
					inStack : 'stack7',
					inBlock : 'stack7_block1',
					onSide : 'stack7_block1_front',
					num : '5',
					type : 'knob',
				},
				positions : {
					position_1 : {
						state : '3', // Было undefined
						description : 'Установите тумблер номиналов напряжения ФИДЕР II в положение А-В',
						/*
						action_1 : {
							inStack : 'stack7',
							inBlock : 'stack7_block1',
							onSide : 'stack7_block1_front',
							type : 'scale',
							num : '1',
							status : '34',
						},
						*/
					},
					position_2 : {
						state : '4', // Было undefined
						description : 'Установите тумблер номиналов напряжения ФИДЕР II в положение А-С',
						/*
						action_1 : {
							inStack : 'stack7',
							inBlock : 'stack7_block1',
							onSide : 'stack7_block1_front',
							type : 'scale',
							num : '1',
							status : '34',
						},
						*/
					},
					position_3 : {
						state : '5', // Было undefined
						description : 'Установите тумблер номиналов напряжения ФИДЕР II в положение В-С',
						/*
						action_1 : {
							inStack : 'stack7',
							inBlock : 'stack7_block1',
							onSide : 'stack7_block1_front',
							type : 'scale',
							num : '1',
							status : '34',
						},
						*/
					},
				},
			},
		},
		el6 : {
			multiply: 'phases',
			phase_correct : {
				shift : '2', // У нас одно действие "лишнее". Открыть/закрыть крышку в действие не входит.
			},
			phase_incorrect : {
				click: '5',
				current : {
					inStack : 'stack7',
					inBlock : 'stack7_block1',
					onSide : 'stack7_block1_front',
					num : '21',
					type : 'button',
				},
				positions : {
					position_1 : {
							state : 'on',
							description : 'Нажмите кнопку СИГНАЛ В СИЛОВУЮ на распределительном щите',
					},
				},
			}
		},
		el7 : {
			// Получается только для одного типа фазы 
				click: '6',
				current : {
					inStack : 'stack7',
					inBlock : 'stack7_block1',
					onSide : 'stack7_block1_front',
					num : '22',
					type : 'next',
				},
				positions : {
					position_1 : {
						state : 'on',
						description : 'Отдайте команду "ОТКЛЮЧИТЬ ПИТАНИЕ РСП" в ЛАРИНГОФОН',
					},
				},
		},
		el8 : {
			click: '6',
			current : {
				inStack : 'stack7',
				inBlock : 'stack7_block1',
				onSide : 'stack7_block1_left',
				num : '1',
				type : 'toggler',
			},
			positions : {
				position_1 : {
					state : '0',
					description : 'Установите клеммы в правильном порядке',
				},
			},
		},

		el9 : {
			click : '6',
			current : {
				inStack : 'stack7',
				inBlock : 'stack7_block1',
				onSide : 'stack7_block1_front',
				num : '23',
				type : 'toggler',
			},
			positions : {
				position_1 : {
					state : '3',
					description : 'Установите переключатель ПИТАНИЕ РАДИОЛОКАТОРОВ ПОСАДОЧНЫЙ в положение выбранного фидера',
				},
			},
		},
		el10 : {
			shift : '1', //проверить
		},
		el11 : {
			click : '9',
			current : {
				inStack : 'stack7',
				inBlock : 'stack7_block1',
				onSide : 'stack7_block1_front',
				num : '46',
				type : 'toggler',
			},
			positions : {
				position_1 : {
					state : '1',
					description : 'Установите переключатель ВЕНТИЛЯТОРЫ в положение ИНДИКАТОРЫ',
				},
			},
		},
		el12 : {
			click : '10',
			current : {
				inStack : 'stack7',
				inBlock : 'stack7_block1',
				onSide : 'stack7_block1_front',
				num : '59',
				type : 'toggler',
			},
			positions : {
				position_1 : {
					state : '1',
					description : 'Установите переключатель ВЕНТИЛЯТОРЫ в положение ПРЛ',
				},
			},
		},
		el13 : {
			click : '11',
			current : {
				inStack : 'stack7',
				inBlock : 'stack7_block1',
				onSide : 'stack7_block1_front',
				num : '88',
				type : 'toggler',
			},
			positions : {
				position_1 : {
					state : '1',
					description : 'Включите автомат ПОСАДОЧНЫЙ на распределительном щите',
				},
			},
		},
		el14 : {
			click : '12',
			current : {
				inStack : 'stack6',
				inBlock : 'stack6_block4',
				onSide : 'stack6_block4_front',
				num : '18',
				type : 'toggler',
			},
			positions : {
				position_1 : {
					state : '0',
					description : 'Установите переключатель включения питания индикаторов на передней панели блока ВИ-П в положение СЕТЬ',
				},
			},
		},
		el15 : {
			click : '13',
			current : {
				inStack : 'stack2',
				inBlock : 'stack2_block5',
				onSide : 'stack2_block5_front',
				num : '2',
				type : 'toggler',
			},
			positions : {
				position_1 : {
					state : '0',
					description : 'Установите переключатель на передней панели блока ВП-П в положение КОМПЕНСАТОР И ФАЗОВЫЙ БЛОК',
				},
			},
		},
		el16 : {
			click : '14',
			current : {
				inStack : 'stack2',
				inBlock : 'stack2_block5',
				onSide : 'stack2_block5_front',
				num : '3',
				type : 'toggler',
			},
			positions : {
				position_1 : {
					state : '1',
					description : 'Установите переключатель на передней панели блока ВП-П в положение ПРИЕМНИК',
				},
			},
		},
		el17 : {
			click : '15',
			current : {
				inStack : 'stack2',
				inBlock : 'stack2_block5',
				onSide : 'stack2_block5_front',
				num : '4',
				type : 'toggler',
			},
			positions : {
				position_1 : {
					state : '0',
					description : 'Установите переключатель на передней панели блока ВП-П в положение ГЕТЕРОДИН',
				},
			},
		},
		el18 : {
			click : '16',
			current : {
				inStack : 'stack3',
				inBlock : 'stack3_block2',
				onSide : 'stack3_block2_front',
				num : '1',
				type : 'toggler',
			},
			positions : {
				position_1 : {
					state : '1',
					description : 'Установите переключатель СЕТЬ в положение ВКЛ на блоке ПУ-П',
					action_1 : {
							inStack : 'stack3',
							inBlock : 'stack3_block2',
							onSide : 'stack3_block2_front',
							type : 'lamp',
							num : '1',
						status : 'on',
					},
				},
			},
		},
		el19 : {
			click : '17',
			current : {
				inStack : 'stack7',
				inBlock : 'stack7_block2',
				onSide : 'stack7_block2_front',
				num : '14',
				type : 'toggler',
			},
			positions : {
				position_1 : {
					state : '1', 
					description : 'Установите переключатель СЕТЬ-ОТКЛ в положение СЕТЬ на блоке БУА-П',
				},
			},
		},
		el20 : {
			click : '18',
			current : {
				inStack : 'stack6',
				inBlock : 'stack6_block4',
				onSide : 'stack6_block4_front',
				num : '17',
				type : 'knob',
			},
			positions : {
				position_1 : {
					state : '1', // Было undefined
					description : 'На блоке КОНТРОЛЬ НАПРЯЖЕНИЯ установить тумблер номинального напряжения в положение	-210В',
					action_1 : {
						inStack : 'stack6',
						inBlock : 'stack6_block4',
						onSide : 'stack6_block4_front',
						type : 'scale',
						num : '16',
					status : '30',
					},
				},
				position_2 : {
					state : '2', // Было undefined
					description : 'На блоке КОНТРОЛЬ НАПРЯЖЕНИЯ установить тумблер номинального напряжения в положение -200В',
					action_1 : {
						inStack : 'stack6',
						inBlock : 'stack6_block4',
						onSide : 'stack6_block4_front',
						type : 'scale',
						num : '16',
					status : '29',
					},
				},
				position_3 : {
					state : '3', // Было undefined
					description : 'На блоке КОНТРОЛЬ НАПРЯЖЕНИЯ установить тумблер номинального напряжения в положение +250В',
					action_1 : {
						inStack : 'stack6',
						inBlock : 'stack6_block4',
						onSide : 'stack6_block4_front',
						type : 'scale',
						num : '16',
					status : '33',
					},
				},
			},
		},
		el21 : {
			click : '19',
			current : {
				inStack : 'stack6',
				inBlock : 'stack6_block3',
				onSide : 'stack6_block3_front',
				num : '14',
				type : 'knob',
			},
			positions : {
				position_1 : {
					state : '0', // Было undefined
					description : 'На субпанели блока ИК-П установите тумблер в положение 5КВ /35-45/',
				},
			},
		},
		el22 : {
			click : '20',
			current : {
				inStack : 'stack2',
				inBlock : 'stack2_block1',
				onSide : 'stack2_block1_front',
				num : '3',
				type : 'knob',
			},
			positions : {
				position_1 : {
					state : '0', // Было undefined
					description : 'На блоке П-П установить тумблер номинального напряжения в положение КР.1',
					action_1 : {
						inStack : 'stack2',
						inBlock : 'stack2_block1',
						onSide : 'stack2_block1_front',
						type : 'scale',
						num : '6',
					status : 'undefined',
					},
				},
				position_2 : {
					state : '1', // Было undefined
					description : 'На блоке П-П установить тумблер номинального напряжения в положение КР.2',
					action_1 : {
						inStack : 'stack2',
						inBlock : 'stack2_block1',
						onSide : 'stack2_block1_front',
						type : 'scale',
						num : '6',
					status : 'undefined',
					},
				},
				position_3 : {
					state : '2', // Было undefined
					description : 'На блоке П-П установить тумблер номинального напряжения в положение КР.3',
					action_1 : {
						inStack : 'stack2',
						inBlock : 'stack2_block1',
						onSide : 'stack2_block1_front',
						type : 'scale',
						num : '6',
					status : 'undefined',
					},
				},
				position_4 : {
					state : '3', // Было undefined
					description : 'На блоке П-П установить тумблер номинального напряжения в положение КР.4',
					action_1 : {
						inStack : 'stack2',
						inBlock : 'stack2_block1',
						onSide : 'stack2_block1_front',
						type : 'scale',
						num : '6',
					status : 'undefined',
					},
				},
				position_5 : {
					state : '4', // Было undefined
					description : 'На блоке П-П установить тумблер номинального напряжения в положение 50; +250В',
					action_1 : {
						inStack : 'stack2',
						inBlock : 'stack2_block1',
						onSide : 'stack2_block1_front',
						type : 'scale',
						num : '6',
					status : 'undefined',
					},
				},
				position_6 : {
					state : '5', // Было undefined
					description : 'На блоке П-П установить тумблер номинального напряжения в положение 30; +150В',
					action_1 : {
						inStack : 'stack2',
						inBlock : 'stack2_block1',
						onSide : 'stack2_block1_front',
						type : 'scale',
						num : '6',
					status : 'undefined',
					},
				},
				position_7 : {
					state : '6', // Было undefined
					description : 'На блоке П-П установить тумблер номинального напряжения в положение 40+50; +27В',
					action_1 : {
						inStack : 'stack2',
						inBlock : 'stack2_block1',
						onSide : 'stack2_block1_front',
						type : 'scale',
						num : '6',
					status : 'undefined',
					},
				},
				position_8 : {
					state : '7', // Было undefined
					description : 'На блоке П-П установить тумблер номинального напряжения в положение КОНТР. ДИСКР.',
					action_1 : {
						inStack : 'stack2',
						inBlock : 'stack2_block1',
						onSide : 'stack2_block1_front',
						type : 'scale',
						num : '6',
					status : 'undefined',
					},
				},
				position_9 : {
					state : '8', // Было undefined
					description : 'На блоке П-П установить тумблер номинального напряжения в положение 42;	105В',
					action_1 : {
						inStack : 'stack2',
						inBlock : 'stack2_block1',
						onSide : 'stack2_block1_front',
						type : 'scale',
						num : '6',
					status : 'undefined',
					},
				},
				position_10 : {
					state : '9', // Было undefined
					description : 'На блоке П-П установить тумблер номинального напряжения в положение ВЫХ. ДЕТ.',
					action_1 : {
						inStack : 'stack2',
						inBlock : 'stack2_block1',
						onSide : 'stack2_block1_front',
						type : 'scale',
						num : '6',
					status : 'undefined',
					},
				},
				position_11 : {
					state : '10', // Было undefined
					description : 'На блоке П-П установить тумблер номинального напряжения в положение БАЛАНС МУ',
					action_1 : {
						inStack : 'stack2',
						inBlock : 'stack2_block1',
						onSide : 'stack2_block1_front',
						type : 'scale',
						num : '6',
					status : 'undefined',
					},
				},
			},
		},
		el23 : {
			click : '21',
			current : {
				inStack : 'stack1',
				inBlock : 'stack1_block1',
				onSide : 'stack1_block1_front',
				num : '1',
				type : 'knob',
			},
			positions : {
				position_1 : {
					state : '1', // Было undefined
					description : 'На блоке П-Д установить тумблер величины токов в положение КР.1',
					action_1 : {
						inStack : 'stack1',
						inBlock : 'stack1_block1',
						onSide : 'stack1_block1_front',
						type : 'scale',
						num : '15',
					status : 'undefined',
					},
				},
				position_2 : {
					state : '2', // Было undefined
					description : 'На блоке П-Д установить тумблер величины токов в положение КР.2',
					action_1 : {
						inStack : 'stack1',
						inBlock : 'stack1_block1',
						onSide : 'stack1_block1_front',
						type : 'scale',
						num : '15',
					status : 'undefined',
					},
				},
				position_3 : {
					state : '3', // Было undefined
					description : 'На блоке П-Д установить тумблер величины токов в положение ГЕТЕР.',
					action_1 : {
						inStack : 'stack1',
						inBlock : 'stack1_block1',
						onSide : 'stack1_block1_front',
						type : 'scale',
						num : '15',
					status : 'undefined',
					},
				},
				position_4 : {
					state : '4', // Было undefined
					description : 'На блоке П-Д установить тумблер величины токов в положение КР.3',
					action_1 : {
						inStack : 'stack1',
						inBlock : 'stack1_block1',
						onSide : 'stack1_block1_front',
						type : 'scale',
						num : '15',
					status : 'undefined',
					},
				},
				position_5 : {
					state : '5', // Было undefined
					description : 'На блоке П-Д установить тумблер величины токов в положение КР.4',
					action_1 : {
						inStack : 'stack1',
						inBlock : 'stack1_block1',
						onSide : 'stack1_block1_front',
						type : 'scale',
						num : '15',
					status : 'undefined',
					},
				},
			},
		},
		el24 : {
			click : '22',
			current : {
				inStack : 'stack3',
				inBlock : 'stack3_block2',
				onSide : 'stack3_block2_front',
				num : '2',
				type : 'toggler',
			},
			positions : {
				position_1 : {
					state : '0', // Было undefined
					description : 'На блоке ПУ-П установить тумблер включения высокого напряжения в положение ВЫСОКОЕ НАПРЯЖ',
					action_1 : {
						inStack : 'stack3',
						inBlock : 'stack3_block2',
						onSide : 'stack3_block2_front',
						type : 'lamp',
						num : '2',
					status : 'on',
					},
				},
			},
		},
		el25 : {
			click : '23',
			current : {
				inStack : 'stack3',
				inBlock : 'stack3_block2',
				onSide : 'stack3_block2_front',
				num : '1',
				type : 'rotator',
			},
			positions : {
				position_1 : {
					state : '8',
					description : 'Вращайте ручку вариака до установления тока в районе 0,8 мА',
					action_1 : {
						inStack : 'stack3',
						inBlock : 'stack3_block2',
						onSide : 'stack3_block2_front',
						type : 'scale',
						num : '37',
					status : '7',
					},
				},
			},
		},
		el26 : {
			click : '24',
			current : {
				inStack : 'stack3',
				inBlock : 'stack3_block3',
				onSide : 'stack3_block3_front',
				num : '1',
				type : 'toggler',
			},
			positions : {
				position_1 : {
					state : '0',
					description : 'Переключите тумблер СМЕНА ВОЛН на блоке ГМ-П в положение, соответствующее необходимой волне',
				},
			},
		},
		el27 : {
			click : '25',
			current : {
				inStack : 'stack6',
				inBlock : 'stack6_block6',
				onSide : 'stack6_block6_front',
				num : '2',
				type : 'toggler',
			},
			positions : {
				position_1 : {
					state : '0',
					description : 'Переключите тумблер ПРИВОД АНТЕНН на пульте управления индикаторов в положение ВКЛ',
				},
				position_2 : {
					state : '1',
					description : 'Переключите тумблер ПРИВОД АНТЕНН на пульте управления индикаторов в положение ВЫКЛ',
				},
			},
		},
		el28 : {
			click : '26',
			current : {
				inStack : 'stack6',
				inBlock : 'stack6_block6',
				onSide : 'stack6_block6_front',
				num : '1',
				type : 'button',
			},
			positions : {
				position_1 : {
					state : 'on',
					description : 'Нажмите кнопку БЛОКИРОВКА СИРЕНЫ',
				},
			},
		},
	},
	ex2 : {
		nameOfExercise : 'Включение аппаратуры ДРЛ',
		el1 : {
			click : '1',
			current : {
				inStack : 'stack7',
				inBlock : 'stack7_block1',
				onSide : 'stack7_block1_front',
				num : '21',
				type : 'button',
			},
			positions : {
				position_1 : {
					state : 'on',
					description : 'Нажмите кнопку СИГНАЛ В СИЛОВУЮ на распределительном щите',
				},
			},
		},
		el2 : {
			click : '2',
			current : {
				inStack : 'stack7',
				inBlock : 'stack7_block1',
				onSide : 'stack7_block1_front',
				num : '3',
				type : 'socket',
			},
			positions : {
				position_1 : {
					state : 'on',
					description : 'Подключите гарнитуру к разъему ЛАРИНГОФОН-ТЕЛЕФОН и подайте голосовую команду «Выдать электропитание на ПРЛ»',
				},
			},
		},
		el3 : {
			click : '3',
			current : {
				inStack : 'stack7',
				inBlock : 'stack7_block1',
				onSide : 'stack7_block1_front',
				num : '4',
				type : 'toggler',
			},
			positions : {
				position_1 : {
					state : '0',
					description : 'Включите тумблер ПОДСВЕТ',
				},
			},
		},
		el4 : {
			multiply: 'fiders',
			fider1: {
				click : '4',
				current : {
					inStack : 'stack7',
					inBlock : 'stack7_block1',
					onSide : 'stack7_block1_front',
					num : '11',
					type : 'knob',
				},
				positions : {
					position_1 : {
						state : '0', // Было undefined
						description : 'Установите переключатель фазоиндикатора в положение ФИДЕР I',
						action_1 : {
							inStack : 'stack7',
							inBlock : 'stack7_block1',
							onSide : 'stack7_block1_front',
							type : 'lamp',
							num : '15',
							status : 'on',
						},
					},
				},
			},
			fider2: {
				click : '4',
				current : {
					inStack : 'stack7',
					inBlock : 'stack7_block1',
					onSide : 'stack7_block1_front',
					num : '11',
					type : 'knob',
				},
				positions : {
					position_1 : {
						state : '2', // Было undefined
						description : 'Установите переключатель фазоиндикатора в положение ФИДЕР II',
						action_1 : {
							inStack : 'stack7',
							inBlock : 'stack7_block1',
							onSide : 'stack7_block1_front',
							type : 'lamp',
							num : '15',
							status : 'on',
						},
					},
				},
			},
		},
		el5 : {
			multiply: 'fiders',
			fider1: {
				click : '5',
				current : {
					inStack : 'stack7',
					inBlock : 'stack7_block1',
					onSide : 'stack7_block1_front',
					num : '5',
					type : 'knob',
				},
				positions : {
					position_1 : {
						state : '0', // Было undefined
						description : 'Установите тумблер номиналов напряжения ФИДЕР I в положение А-В',
					},
					position_2 : {
						state : '1', // Было undefined
						description : 'Установите тумблер номиналов напряжения ФИДЕР I в положение А-С',
					},
					position_3 : {
						state : '2', // Было undefined
						description : 'Установите тумблер номиналов напряжения ФИДЕР I в положение В-С',
					},
				},
			},
			fider2: {
				click : '5',
				current : {
					inStack : 'stack7',
					inBlock : 'stack7_block1',
					onSide : 'stack7_block1_front',
					num : '5',
					type : 'knob',
				},
				positions : {
					position_1 : {
						state : '3', // Было undefined
						description : 'Установите тумблер номиналов напряжения ФИДЕР II в положение А-В',
					},
					position_2 : {
						state : '4', // Было undefined
						description : 'Установите тумблер номиналов напряжения ФИДЕР II в положение А-С',
					},
					position_3 : {
						state : '5', // Было undefined
						description : 'Установите тумблер номиналов напряжения ФИДЕР II в положение В-С',
					},
				},
			},
		},
		el6 : {
			multiply: 'phases',
			phase_correct : {
				shift : '1', // У нас одно действие "лишнее". Открыть/закрыть крышку в действие не входит.
			},
			phase_incorrect : {
				click : '6',
				current : {
					inStack : 'stack7',
					inBlock : 'stack7_block1',
					onSide : 'stack7_block1_front',
					num : '21',
					type : 'button',
				},
				positions : {
					position_1 : {
						state : 'on',
						description : 'Нажать кнопку СИГНАЛ В СИЛОВУЮ',
					},
				},
			},
		},
		el7 : {
			multiply: 'phases',
			phase_correct : {
				shift : '1', // У нас одно действие "лишнее". Открыть/закрыть крышку в действие не входит.
			},
			phase_incorrect : {
				click : '7',
				current : {
					inStack : 'stack7',
					inBlock : 'stack7_block1',
					onSide : 'stack7_block1_left',
					num : '1',
					type : 'toggler',
				},
				positions : {
					position_1 : {
						state : '0',
						description : 'Переставьте клеммы в правильном порядке',
					},
				},
				defaultPosition : '1',
			},
		},
		el8 : {
			multiply: 'fiders',
			fider1: {
				click : '8',
				current : {
					inStack : 'stack7',
					inBlock : 'stack7_block1',
					onSide : 'stack7_block1_front',
					num : '13',
					type : 'toggler',
				},
				positions : {
					position_1 : {
						state : '3',
						description : 'Установите переключатель ПИТАНИЕ РАДИОЛОКАТОРОВ ДИСПЕТЧЕРСКИЙ в положение выбранного фидера',
					},
				},
			},
			fider2: {
				click : '8',
				current : {
					inStack : 'stack7',
					inBlock : 'stack7_block1',
					onSide : 'stack7_block1_front',
					num : '13',
					type : 'toggler',
				},
				positions : {
					position_1 : {
						state : '1',
						description : 'Установите переключатель ПИТАНИЕ РАДИОЛОКАТОРОВ ДИСПЕТЧЕРСКИЙ в положение выбранного фидера',
					},
				},
			},
		},
		el9 : {
			multiply: 'fiders',
			fider1: {
				click : '9',
				current : {
					inStack : 'stack7',
					inBlock : 'stack7_block1',
					onSide : 'stack7_block1_front',
					num : '23',
					type : 'toggler',
				},
				positions : {
					position_1 : {
						state : '3',
						description : 'Установите переключатель ПИТАНИЕ РАДИОЛОКАТОРОВ ПОСАДОЧНЫЙ в положение выбранного фидера',
					},
				},
			},
			fider2: {
				click : '9',
				current : {
					inStack : 'stack7',
					inBlock : 'stack7_block1',
					onSide : 'stack7_block1_front',
					num : '23',
					type : 'toggler',
				},
				positions : {
					position_1 : {
						state : '1',
						description : 'Установите переключатель ПИТАНИЕ РАДИОЛОКАТОРОВ ПОСАДОЧНЫЙ в положение выбранного фидера',
					},
				},
			},
		},
		el10 : {
			click : '9',
			current : {
				inStack : 'stack7',
				inBlock : 'stack7_block1',
				onSide : 'stack7_block1_front',
				num : '34',
				type : 'toggler',
			},
			positions : {
				position_1 : {
					state : '1',
					description : 'Установите переключатель ВЕНТИЛЯТОРЫ в положение ДРЛ',
				},
			},
		},
		el11 : {
			click : '10',
			current : {
				inStack : 'stack7',
				inBlock : 'stack7_block1',
				onSide : 'stack7_block1_front',
				num : '46',
				type : 'toggler',
			},
			positions : {
				position_1 : {
					state : '1',
					description : 'Установите переключатель ВЕНТИЛЯТОРЫ в положение ИНДИКАТОРЫ',
				},
			},
		},
		el12 : {
			click : '10',
			current : {
				inStack : 'stack7',
				inBlock : 'stack7_block1',
				onSide : 'stack7_block1_front',
				num : '59',
				type : 'toggler',
			},
			positions : {
				position_1 : {
					state : '1',
					description : 'Установите переключатель ВЕНТИЛЯТОРЫ в положение ПРЛ',
				},
			},
		},
		el13 : {
			click : '11',
			current : {
				inStack : 'stack7',
				inBlock : 'stack7_block1',
				onSide : 'stack7_block1_front',
				num : '73',
				type : 'toggler',
			},
			positions : {
				position_1 : {
					state : '1',
					description : 'Включите автомат ДИСПЕТЧЕРСКИЙ',
				},
			},
		},
		el14 : {
			click : '12',
			current : {
				inStack : 'stack4',
				inBlock : 'stack4_block3',
				onSide : 'stack4_block3_front',
				num : '5',
				type : 'toggler',
			},
			positions : {
				position_1 : {
					state : '0',
					description : 'Установите переключатель ИНДИКАТОР-ОТКЛ блока ВИ-Д в положение ИНДИКАТОР',
				},
			},
		},
		el15 : {
			click : '13',
			current : {
				inStack : 'stack1',
				inBlock : 'stack1_block2',
				onSide : 'stack1_block2_front',
				num : '4',
				type : 'toggler',
			},
			positions : {
				position_1 : {
					state : '0',
					description : 'Установите переключатель ПИТ. ФБ блока Ф-Д в положение ПИТ. ФБ.',
				},
			},
			defaultPosition : '1',
		},
		el16 : {
			click : '14',
			current : {
				inStack : 'stack1',
				inBlock : 'stack1_block6',
				onSide : 'stack1_block6_front',
				num : '1',
				type : 'toggler',
			},
			positions : {
				position_1 : {
					state : '1',
					description : 'Установите переключатель ЛБВ блока ВП-Д в положение ЛБВ',
				},
			},
		},
		el17 : {
			click : '15',
			current : {
				inStack : 'stack1',
				inBlock : 'stack1_block6',
				onSide : 'stack1_block6_front',
				num : '2',
				type : 'toggler',
			},
			positions : {
				position_1 : {
					state : '1',
					description : 'Установите переключатель ПРИЕМНИК блока ВП-Д в положение ПРИЕМНИК',
				},
			},
		},
		el18 : {
			click : '16',
			current : {
				inStack : 'stack1',
				inBlock : 'stack1_block5',
				onSide : 'stack1_block5_front',
				num : '4',
				type : 'toggler',
			},
			positions : {
				position_1 : {
					state : '1',
					description : 'Установите переключатель КОМПЕНСАТОР блока ВКПО-Д в положение КОМПЕНСАТОР',
				},
			},
		},
		el19 : {
			click : '17',
			current : {
				inStack : 'stack0',
				inBlock : 'stack0_block2',
				onSide : 'stack0_block2_front',
				num : '2',
				type : 'toggler',
			},
			positions : {
				position_1 : {
					state : '1',
					description : 'Установите переключатель ВЫКЛЮЧЕНИЕ ПЕРЕДАТЧИКА блока ПУ-Д в положение ВКЛ',
					action_1 : {
						inStack : 'stack0',
						inBlock : 'stack0_block2',
						onSide : 'stack0_block2_front',
						type : 'lamp',
						num : '1',
						status : 'on',
					},
				},
			},
		},
		el20 : {
			click : '18',
			current : {
				inStack : 'stack1',
				inBlock : 'stack1_block5',
				onSide : 'stack1_block5_front',
				num : '2',
				type : 'toggler',
			},
			positions : {
				position_1 : {
					state : '0',
					description : 'Включите тумблер ПРИЕМНИК ОТВ блока ВКПО-Д',
				},
			},
		},
		el21 : {
			click : '19',
			current : {
				inStack : 'stack4',
				inBlock : 'stack4_block3',
				onSide : 'stack4_block3_front',
				num : '8',
				type : 'knob',
			},
			positions : {
				position_1 : {
					state : '1',
					description : 'Установите переключатель КОНТРОЛЬ НАПРЯЖЕНИЯ на -210В',
					action_1 : {
						inStack : 'stack4',
						inBlock : 'stack4_block3',
						onSide : 'stack4_block3_front',
						type : 'scale',
						num : '2',
						status : '26',
					},
				},
				position_2 : {
					state : '2',
					description : 'Установите переключатель КОНТРОЛЬ НАПРЯЖЕНИЯ на +200В',
					action_1 : {
						inStack : 'stack4',
						inBlock : 'stack4_block3',
						onSide : 'stack4_block3_front',
						type : 'scale',
						num : '2',
						status : '19',
					},
				},
				position_3 : {
					state : '3',
					description : 'Установите переключатель КОНТРОЛЬ НАПРЯЖЕНИЯ на +250В',
					action_1 : {
						inStack : 'stack4',
						inBlock : 'stack4_block3',
						onSide : 'stack4_block3_front',
						type : 'scale',
						num : '2',
						status : '40',
					},
				},
			},
		},
		el22 : {
			click : '20',
			current : {
				inStack : 'stack1',
				inBlock : 'stack1_block1',
				onSide : 'stack1_block1_front',
				num : '1',
				type : 'knob',
			},
			positions : {
				position_1 : {
					state : '1',
					description : 'Установите переключатель КОНТРОЛЬ РЕЖИМОВ на КР1',
				},
				position_2 : {
					state : '2',
					description : 'Установите переключатель КОНТРОЛЬ РЕЖИМОВ на КР2',
				},
				position_3 : {
					state : '4',
					description : 'Установите переключатель КОНТРОЛЬ РЕЖИМОВ на КР3',
				},
				position_4 : {
					state : '5',
					description : 'Установите переключатель КОНТРОЛЬ РЕЖИМОВ на КР4',
				},
			},
		},	
		el23 : {
			click : '21',
			current : {
				inStack : 'stack1',
				inBlock : 'stack1_block2',
				onSide : 'stack1_block2_front',
				num : '3',
				type : 'knob',
			},
			positions : {
				position_1 : {
					state : '1',
					description : 'Установите переключатель величины токов блока Ф-Д в положение 0',
				},
				position_2 : {
					state : '2',
					description : 'Установите переключатель величины токов блока Ф-Д в положение +75В',
				},
				position_3 : {
					state : '3',
					description : 'Установите переключатель величины токов блока Ф-Д в положение 0',
				},
				position_4 : {
					state : '4',
					description : 'Установите переключатель величины токов блока Ф-Д в положение +27В',
				},
				position_5 : {
					state : '5',
					description : 'Установите переключатель величины токов блока Ф-Д в положение +250В',
				},
				position_6 : {
					state : '6',
					description : 'Установите переключатель величины токов блока Ф-Д в положение -105В',
				},
				position_7 : {
					state : '0',
					description : 'Установите переключатель величины токов блока Ф-Д в положение +150В',
				},
			},
		},
		el24 : {
			click : '22',
			current : {
				inStack : 'stack0',
				inBlock : 'stack0_block2',
				onSide : 'stack0_block2_front',
				num : '5',
				type : 'button',
			},
			positions : {
				position_1 : {
					state : 'on',
					description : 'Нажмите кнопку ПАСС на блоке ПУ-Д',
				},
			},
		},
		el25 : {
			click : '23',
			current : {
				inStack : 'stack0',
				inBlock : 'stack0_block2',
				onSide : 'stack0_block2_front',
				num : '3',
				type : 'button',
			},
			positions : {
				position_1 : {
					state : 'on',
					description : 'Нажмите кнопку ВКЛЮЧЕНИЕ ПЕРЕДАТЧИКА на блоке ПУ-Д',
				},
			},
		},
		el26 : {
			click : '24',
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
					description : 'Установите вращением ручки вариака средний ток магнетрона по прибору ТОК МАГЕТРОНА, не превышая 20 мА',
				},
			},
		},
		el27 : {
			click : '25',
			current : {
				inStack : 'stack4',
				inBlock : 'stack4_block2',
				onSide : 'stack4_block2_front',
				num : '5',
				type : 'toggler',
			},
			positions : {
				position_1 : {
					state : '0',
					description : 'Включите переключатель ПРИВОД АНТ блока ИКО-Д',
				},
			},
		},
		el28 : {
			click : '26',
			current : {
				inStack : 'stack1',
				inBlock : 'stack1_block4',
				onSide : 'stack1_block4_front',
				num : '1',
				type : 'toggler',
			},
			positions : {
				position_1 : {
					state : '0',
					description : 'Установите переключатель МЕСТНОЕ-ДИСТАНЦ блока НПО-Д в положение МЕСТНОЕ',
				},
			},
			defaultPosition : '1',
		},
		el29 : {
			multiply: 'frequency',
			first: {
				click : '27',
				current : {
					inStack : 'stack1',
					inBlock : 'stack1_block4',
					onSide : 'stack1_block4_front',
					num : '2',
					type : 'knob',
				},
				positions : {
					position_1 : {
						state : '0',
						description : 'Установите переключатель рабочей фиксированной частоты блока НПО-Д в положение 1',
					},
				},
			},
			second: {
				click : '27',
				current : {
					inStack : 'stack1',
					inBlock : 'stack1_block4',
					onSide : 'stack1_block4_front',
					num : '2',
					type : 'knob',
				},
				positions : {
					position_1 : {
						state : '1',
						description : 'Установите переключатель рабочей фиксированной частоты блока НПО-Д в положение 2',
					},
				},
			},
			third: {
				click : '27',
				current : {
					inStack : 'stack1',
					inBlock : 'stack1_block4',
					onSide : 'stack1_block4_front',
					num : '2',
					type : 'knob',
				},
				positions : {
					position_1 : {
						state : '2',
						description : 'Установите переключатель рабочей фиксированной частоты блока НПО-Д в положение 3',
					},
				},
			},
		},
		el30 : {
			click : '28',
			current : {
				inStack : 'stack0',
				inBlock : 'stack0_block2',
				onSide : 'stack0_block2_front',
				num : '6',
				type : 'button',
			},
			positions : {
				position_1 : {
					state : 'on',
					description : 'Нажмите кнопку АКТ блока ПУ-Д',
				},
			},
		},
		el31 : {
			multiply: 'crystal_current',
			current_ok : {
				click : '29',
				current : {
					inStack : 'stack1',
					inBlock : 'stack1_block4',
					onSide : 'stack1_block4_front',
					num : '1',
					type : 'knob',
				},
				positions : {
					position_1 : {
						state : '1',
						description : 'Установите переключатель прибора в положение КРИСТ.ОСНОВ на блоке НПО-Д',
						action_1 : {
							inStack : 'stack1',
							inBlock : 'stack1_block4',
							onSide : 'stack1_block4_front',
							type : 'scale',
							num : '13',
							status : '-7',
						},
					},
					position_2 : {
						state : '0',
						description : 'Установите переключатель прибора в положение КРИСТ.ПОД на блоке НПО-Д',
						action_1 : {
							inStack : 'stack1',
							inBlock : 'stack1_block4',
							onSide : 'stack1_block4_front',
							type : 'scale',
							num : '13',
							status : '0',
						},
					},
				},
			},
			current_bad : {
				click : '29',
				current : {
					inStack : 'stack1',
					inBlock : 'stack1_block4',
					onSide : 'stack1_block4_front',
					num : '1',
					type : 'knob',
				},
				positions : {
					position_1 : {
						state : '1',
						description : 'Установите переключатель прибора в положение КРИСТ.ОСНОВ на блоке НПО-Д',
							action_1 : {
							inStack : 'stack1',
							inBlock : 'stack1_block4',
							onSide : 'stack1_block4_front',
							type : 'scale',
							num : '13',
							status : '-7',
						},
					},
					position_2 : {
						state : '0',
						description : 'Установите переключатель прибора в положение КРИСТ.ПОД на блоке НПО-Д',
						action_1 : {
							inStack : 'stack1',
							inBlock : 'stack1_block4',
							onSide : 'stack1_block4_front',
							type : 'scale',
							num : '13',
							status : '25',
						},
					},
				},
			},
			defaultPosition : '4',
		},	
		el32 : {
			multiply: 'crystal_current',
			current_ok : {
				shift : '1', // У нас одно действие "лишнее". Открыть/закрыть крышку в действие не входит.
			},
			current_bad : {
				click : '30',
				current : {
					inStack : 'stack1',
					inBlock : 'stack1_block4',
					onSide : 'stack1_block4_front',
					num : '4',
					type : 'rotator',
				},
				positions : {
					position_1 : {
						state : '1',
						description : 'Отрегулируйте ток кристалла потенциометром так, чтобы ток был в зеленой зоне',
						action_1 : {
							inStack : 'stack1',
							inBlock : 'stack1_block4',
							onSide : 'stack1_block4_front',
							type : 'scale',
							num : '13',
							status : '1',
						},
					},
				},
				defaultPosition : '2',
			},
		},
		el33 : {
			multiply: 'noises',
			in_red_zone : {
				click : '31',
				current : {
					inStack : 'stack4',
					inBlock : 'stack4_block1',
					onSide : 'stack4_block1_front',
					num : '13',
					type : 'knob',
				},
				positions : {
					position_1 : {
						state : '2',
						description : 'Установите переключатель Напряжения шумов в положение Канал Подавл',
						action_1 : {
							inStack : 'stack4',
							inBlock : 'stack4_block1',
							onSide : 'stack4_block1_front',
							type : 'scale',
							num : '13',
							status : '0',
						},
					},
					position_2 : {
						state : '0',
						description : 'Установите переключатель  Напряжения шумов в положение Канал Основной',
						action_1 : {
							inStack : 'stack4',
							inBlock : 'stack4_block1',
							onSide : 'stack4_block1_front',
							type : 'scale',
							num : '13',
							status : '0',
						},
					},
				},
			},
			out_red_zone : {
				click : '31',
				current : {
					inStack : 'stack4',
					inBlock : 'stack4_block1',
					onSide : 'stack4_block1_front',
					num : '13',
					type : 'knob',
				},
				positions : {
					position_1 : {
						state : '2',
						description : 'Установите переключатель Напряжения шумов в положение Канал Подавл',
						action_1 : {
							inStack : 'stack4',
							inBlock : 'stack4_block1',
							onSide : 'stack4_block1_front',
							type : 'scale',
							num : '13',
							status : '0',
						},
					},
					position_2 : {
						state : '0',
						description : 'Установите переключатель  Напряжения шумов в положение Канал Основной',
						action_1 : {
							inStack : 'stack4',
							inBlock : 'stack4_block1',
							onSide : 'stack4_block1_front',
							type : 'scale',
							num : '13',
							status : '25',
						},
					},
				},
			},
		},
		el34 : {
			multiply: 'noises',
			in_red_zone : {
				shift : '1', // У нас одно действие "лишнее". Открыть/закрыть крышку в действие не входит.
			},
			out_red_zone :{
				click : '32',
				current : {
					inStack : 'stack1',
					inBlock : 'stack1_block4',
					onSide : 'stack1_block4_front',
					num : '1',
					type : 'rotator',
				},
				positions : {
					position_1 : {
						state : '1',
						description : 'Отрегулируйте уровень шумов потенциометром так, чтобы ток был в красной зоне',
						action_1 : {
							inStack : 'stack1',
							inBlock : 'stack1_block4',
							onSide : 'stack1_block4_front',
							type : 'scale',
							num : '13',
							status : '1',
						},
					},
				},
				defaultPosition : '2',
			},
		},
	},
	ex3 : {	
		nameOfExercise : 'Проверка передающего устройства ПРЛ',
		el1 : {
			multiply: 'current_check',
			current_ok : {
				click : '1',
				current : {
					inStack : 'stack3',
					inBlock : 'stack3_block2',
					onSide : 'stack3_block2_front',
					num : '1',
					type : 'knob',
				},
				positions : {
					position_1 : {
						state : '2',
						description : 'Установите тумблер контроля напряжения ламп подмодулятора на блоке ПУ-П в положение 35; -600В',
					},
					position_2 : {
						state : '3',
						description : 'Установите тумблер контроля напряжения ламп подмодулятора на блоке ПУ-П в положение 85; +250В',
					},
					position_3 : {
						state : '4',
						description : 'Установите тумблер контроля напряжения ламп подмодулятора на блоке ПУ-П в положение +600В; 35',					
					},
					position_4 : {
						state : '5',
						description : 'Установите тумблер контроля напряжения ламп подмодулятора на блоке ПУ-П в положение +1400В; 80',
					},
					position_5 : {
						state : '6',
						description : 'Установите тумблер контроля напряжения ламп подмодулятора на блоке ПУ-П в положение +250В; 70',
					},
					position_6 : {
						state : '7',
						description : 'Установите тумблер контроля напряжения ламп подмодулятора на блоке ПУ-П в положение ТОК.ПОДЖ; 5; +35',
					},
					position_7 : {
						state : '1',
						description : 'Установите тумблер контроля напряжения ламп подмодулятора на блоке ПУ-П в положение НАПР.СМЕШ. 35 65',
						action_1 : {
							inStack : 'stack3',
							inBlock : 'stack3_block2',
							onSide : 'stack3_block2_front',
							type : 'scale',
							num : '57',
							status : '-35',
						},
					},
				},
			},
			current_bad : {
				click : '1',
				current : {
					inStack : 'stack3',
					inBlock : 'stack3_block2',
					onSide : 'stack3_block2_front',
					num : '1',
					type : 'knob',
				},
				positions : {
					position_1 : {
						state : '2',
						description : 'Установите тумблер контроля напряжения ламп подмодулятора на блоке ПУ-П в положение 35; -600В',
					},
					position_2 : {
						state : '3',
						description : 'Установите тумблер контроля напряжения ламп подмодулятора на блоке ПУ-П в положение 85; +250В',
					},
					position_3 : {
						state : '4',
						description : 'Установите тумблер контроля напряжения ламп подмодулятора на блоке ПУ-П в положение +900В; 35',
					},
					position_4 : {
						state : '5',
						description : 'Установите тумблер контроля напряжения ламп подмодулятора на блоке ПУ-П в положение +1400В; 80',
					},
					position_5 : {
						state : '6',
						description : 'Установите тумблер контроля напряжения ламп подмодулятора на блоке ПУ-П в положение +1230В; 70',
					},
					position_6 : {
						state : '7',
						description : 'Установите тумблер контроля напряжения ламп подмодулятора на блоке ПУ-П в положение ТОК.ПОДЖ; 5; +35',
					},
					position_7 : {
						state : '1',
						description : 'Установите тумблер контроля напряжения ламп подмодулятора на блоке ПУ-П в положение НАПР.СМЕШ. 35 65',
						action_1 : {
							inStack : 'stack3',
							inBlock : 'stack3_block2',
							onSide : 'stack3_block2_front',
							type : 'scale',
							num : '57',
							status : '5',
						},
					},
				},
			},
		},
		el2 : {
			multiply: 'current_check',
			current_ok : {
				shift : '1',
			},
			current_bad : {
				click : '2',
				current : {
					inStack : 'stack3',
					inBlock : 'stack3_block2',
					onSide : 'stack3_block2_right',
					num : '1',
					type : 'rotator',
				},
				positions : {
					position_1 : {
						state : '1',
						description : 'Отрегулируйте напряжение смещения потенциометром',
					},
				},
			},
		},
		el3 : {
			multiply: 'wave_select',
			wave_1: {
				click : '3',
				current : {
					inStack : 'stack3',
					inBlock : 'stack3_block3',
					onSide : 'stack3_block3_front',
					num : '1',
					type : 'toggler',
				},
				positions : {
					position_1 : {
						state : '0',
						description : 'Переключите тумблер СМЕНА ВОЛН блока ГМ-П в положение I',
					},
				},
			},
			wave_2: {
				click : '3',
				current : {
					inStack : 'stack3',
					inBlock : 'stack3_block3',
					onSide : 'stack3_block3_front',
					num : '1',
					type : 'toggler',
				},
				positions : {
					position_1 : {
						state : '1',
						description : 'Переключите тумблер СМЕНА ВОЛН блока ГМ-П в положение II',
					},
				},
			},
		},
		el4 : {
			click : '4',
			current : {
				inStack : 'stack2',
				inBlock : 'stack2_block1',
				onSide : 'stack2_block1_front',
				num : '2',
				type : 'knob',
			},
			positions : {
				position_1 : {
					state : '0',
					description : 'Установите переключатель РОД РАБОТЫ блока П-П в положение АКТ',
				},
			},
		},
	},
	ex4 : {
		nameOfExercise : 'Проверка приемного устройства ПРЛ',
		el1 : {
			click : '1',
				current : {
					inStack : 'stack3',
					inBlock : 'stack3_block3',
					onSide : 'stack3_block3_front',
					num : '1',
					type : 'toggler',
				},
				positions : {
							position_1 : {
								state : '1',
								description : 'Переключите тумблер СМЕНА ВОЛН на магнетронном генераторе в выбранное положение',
							},
				},
		},
		el2 : {
			click : '2',
					current : {
							inStack : 'stack1',
							inBlock : 'stack1_block1',
							onSide : 'stack1_block1_front',
							num : '1',
							type : 'knob',
					},
					positions : {
								position_1 : {
										state : '1',
										description : 'На блоке П-Д установить тумблер величины токов смесителей в положение КР.1',
									action_1 : {
											inStack : 'stack1',
											inBlock : 'stack1_block1',
											onSide : 'stack1_block1_front',
											type : 'scale',
											num : '15',
										status : 'undefined',
									},
								},
								position_2 : {
									state : '2',
									description : 'На блоке П-Д установить тумблер величины токов смесителей в положение КР.2',
											action_1 : {
												inStack : 'stack1',
												inBlock : 'stack1_block1',
												onSide : 'stack1_block1_front',
												type : 'scale',
												num : '15',
											status : 'undefined',
											},
								},
								position_3 : {
									state : '4',
									description : 'На блоке П-Д установить тумблер величины токов смесителей в положение КР.3',
											action_1 : {
												inStack : 'stack1',
												inBlock : 'stack1_block1',
												onSide : 'stack1_block1_front',
												type : 'scale',
												num : '15',
											status : 'undefined',
											},
								},
								position_4 : {
									state : '5',
									description : 'На блоке П-Д установить тумблер величины токов смесителей в положение КР.4',
											action_1 : {
												inStack : 'stack1',
												inBlock : 'stack1_block1',
												onSide : 'stack1_block1_front',
												type : 'scale',
												num : '15',
											status : 'undefined',
											},
								},
					},
		},
		el3 : {
			click : '3',
					current : {
						inStack : 'stack2',
						inBlock : 'stack2_block2',
						onSide : 'stack2_block2_front',
						num : '2',
						type : 'knob',
					},
					positions : {
								position_1 : {
									state : '0',
									description : 'Проверьте наличие выхода по прибору блока СГ-П, для чего установите переключатель в положение КОНТРОЛЬ ВЫХОДА',
											action_1 : {
												inStack : 'stack2',
												inBlock : 'stack2_block2',
												onSide : 'stack2_block2_front',
												type : 'scale',
												num : '7',
											status : 'undefined',
											},
								},
					},
		},
		el4 : {
			click : '4',
					current : {
						inStack : 'stack2',
						inBlock : 'stack2_block1',
						onSide : 'stack2_block1_front',
						num : '2',
						type : 'knob',
					},
					positions : {
								position_1 : {
									state : '1',
									description : 'Установите переключатель РОД РАБОТЫ на блоке П-П в положение ПАСС',
								},
					},
		},
		el5 : {
			click : '5',
					current : {
						inStack : 'stack6',
						inBlock : 'stack6_block3',
						onSide : 'stack6_block3_front',
						num : '6',
						type : 'knob',
					},
					positions : {
								position_1 : {
									state : '0',
									description : 'Установите переключатель ВЫБОР ВИДЕО в блоке ИК-П в положение ПАСС.',
								},
					},
		},
		el6 : {
			click : '6',
					current : {
						inStack : 'stack1',
						inBlock : 'stack1_block1',
						onSide : 'stack1_block1_front',
						num : '2',
						type : 'toggler',
					},
					positions : {
								position_1 : {
									state : '0',
									description : 'Установите тумблер РРУ на блоке П-Д в положение МЕСТНОЕ',
								},
					},
		},
		el7 : {
			click : '7',
					current : {
						inStack : 'stack1',
						inBlock : 'stack1_block1',
						onSide : 'stack1_block1_front',
						num : '3',
						type : 'toggler',
					},
					positions : {
								position_1 : {
									state : '1',
									description : 'Установите тумблер ВАРУ на блоке П-Д в положение ВЫКЛ',
								},
					},
		},
		el8 : {
			click : '8',
					current : {
						inStack : 'stack6',
						inBlock : 'stack6_block3',
						onSide : 'stack6_block3_front',
						num : '15',
						type : 'rotator',
					},
					positions : {
								position_1 : {
									state : '10',
									description : 'Установите яркость индикатора ИК-П на 50%',
								},
					},
		},
		el9 : {
			click : '9',
					current : {
						inStack : 'stack2',
						inBlock : 'stack2_block1',
						onSide : 'stack2_block1_front',
						num : '2',
						type : 'knob',
					},
					positions : {
								position_1 : {
									state : '0',
									description : 'Установите переключатель РОД РАБОТЫ на блоке П-П в положение АКТ.',
								},
					},
		},
		el10 : {
			click : '10',
					current : {
						inStack : 'stack2',
						inBlock : 'stack2_block3',
						onSide : 'stack2_block3_front',
						num : '5',
						type : 'rotator',
					},
					positions : {
								position_1 : {
									state : '1',
									description : 'Установите минимальную величину усиления потенциометром РРУ, расположенным на передней панели фазового блока, для чего поверните ручку потенциометра против часовой стрелки до упора',
								},
					},
		},
		el11 : {
			click : '11',
					current : {
						inStack : 'stack2',
						inBlock : 'stack2_block4',
						onSide : 'stack2_block4_front',
						num : '2',
						type : 'toggler',
					},
					positions : {
								position_1 : {
									state : '1',
									description : 'Установите тумблер КОМПЕНСАЦИЯ-ВЫКЛ на передней панели блока компенсатора в положение ВЫКЛ',
								},
					},
		},
		el12 : {
			click : '12',
					current : {
						inStack : 'stack2',
						inBlock : 'stack2_block4',
						onSide : 'stack2_block4_front',
						num : '1',
						type : 'toggler',
					},
					positions : {
								position_1 : {
									state : '1',
									description : 'Установите тумблер АРУ-ВЫКЛ на передней панели блока компенсатора в положение ВЫКЛ',
								},
					},
		},
		el13 : {
			click : '13',
					current : {
						inStack : 'stack2',
						inBlock : 'stack2_block4',
						onSide : 'stack2_block4_front',
						num : '1',
						type : 'knob',
					},
					positions : {
								position_1 : {
									state : '0',
									description : 'Установите переключатель ЧАСТОТА ПОСЫЛОК на передней панели блока компенсатора в положение I',
								},
					},
		},
		el14 : {
			click : '14',
					current : {
						inStack : 'stack2',
						inBlock : 'stack2_block4',
						onSide : 'stack2_block4_front',
						num : '3',
						type : 'toggler',
					},
					positions : {
								position_1 : {
									state : '0',
									description : 'Установите переключатель КОНТР.СИГН.-ВЫКЛ на передней панели блока компенсатора в положение КОНТР.СИГН.',
								},
					},
		},
		el15 : {
			click : '15',
					current : {
						inStack : 'stack2',
						inBlock : 'stack2_block4',
						onSide : 'stack2_block4_front',
						num : '2',
						type : 'toggler',
					},
					positions : {
								position_1 : {
									state : '0',
									description : 'Установите переключатель КОМПЕНСАЦИЯ-ВЫКЛ на передней панели блока компенсатора в положение КОМПЕНСАЦИЯ',
								},
					},
		},
		el16 : {
			click : '16',
					current : {
						inStack : 'stack2',
						inBlock : 'stack2_block4',
						onSide : 'stack2_block4_front',
						num : '1',
						type : 'knob',
					},
					positions : {
								position_1 : {
									state : '2',
									description : 'Установите переключатель ЧАСТОТА ПОСЫЛОК на передней панели блока компенсатора в положение 2',
								},
								position_2 : {
									state : '1',
									description : 'Установите переключатель ЧАСТОТА ПОСЫЛОК на передней панели блока компенсатора в положение АВТОМАТ',
								},
					},
		},
		el17 : {
			click : '17',
					current : {
						inStack : 'stack2',
						inBlock : 'stack2_block3',
						onSide : 'stack2_block3_front',
						num : '2',
						type : 'knob',
					},
					positions : {
								position_1 : {
									state : '0',
									description : 'Установите переключатель ФАЗИРОВАНИЕ блока ФП в положение ВЫКЛ',
								},
								position_2 : {
									state : '2',
									description : 'Установите переключатель ФАЗИРОВАНИЕ блока ФП в положение ВНУТР',
								},
					},
		},
		el18 : {
			click : '17',
					current : {
						inStack : 'stack2',
						inBlock : 'stack2_block3',
						onSide : 'stack2_block3_front',
						num : '2',
						type : 'knob',
					},
					positions : {
								position_1 : {
									state : '1',
									description : 'Установите переключатель ФАЗИРОВАНИЕ блока ФП в положение ВНЕШН',
								},
					},
		},
		el19 : {
			click : '18',
					current : {
						inStack : 'stack2',
						inBlock : 'stack2_block1',
						onSide : 'stack2_block1_front',
						num : '2',
						type : 'knob',
					},
					positions : {
								position_1 : {
									state : '1',
									description : 'Установите переключатель РОД РАБОТЫ блока П-П в положение ПАСС',
								},
								position_2 : {
									state : '0',
									description : 'Установите переключатель РОД РАБОТЫ блока П-П в положение АКТ',
								},
					},
		},
		el20 : {
			click : '19',
					current : {
						inStack : 'stack6',
						inBlock : 'stack6_block3',
						onSide : 'stack6_block3_front',
						num : '6',
						type : 'knob',
					},
					positions : {
								position_1 : {
									state : '2',
									description : 'Установите переключатель ВЫБОР ВИДЕО блока ИК-П в положение АКТ',
								},
					},
		},
		el21 : {
			click : '20',
					current : {
						inStack : 'stack7',
						inBlock : 'stack7_block1',
						onSide : 'stack7_block1_front',
						num : '28',
						type : 'knob',
					},
					positions : {
								position_1 : {
									state : '0',
									description : 'Переключателем ЧАСТОТА на распределительном щите выберите рабочую частоту в соответствии с переключателем блока НПО-Д',
								},
					},
		},
	},
	ex5 : {
		nameOfExercise : 'Проверка передающего устройства ДРЛ',
		el1 : {
			click : '1',
			current : {
				inStack : 'stack0',
				inBlock : 'stack0_block2',
				onSide : 'stack0_block2_front',
				num : '2',
				type : 'knob',
			},
			positions : {
						position_1 : {
							state : '0',
							description : 'Установите тумблер КОНТРОЛЬ НАПР. блока ПУ-Д в положение 24КВ',
									action_1 : {
										inStack : 'stack0',
										inBlock : 'stack0_block2',
										onSide : 'stack0_block2_front',
										type : 'scale',
										num : '22',
									status : 'undefined',
									},
						},
						position_2 : {
							state : '2',
							description : 'Установите тумблер КОНТРОЛЬ НАПР. блока ПУ-Д в положение	+180В',
									action_1 : {
										inStack : 'stack0',
										inBlock : 'stack0_block2',
										onSide : 'stack0_block2_front',
										type : 'scale',
										num : '22',
									status : 'undefined',
									},
						},
						position_3 : {
							state : '3',
							description : 'Установите тумблер КОНТРОЛЬ НАПР. блока ПУ-Д в положение	+600В',
									action_1 : {
										inStack : 'stack0',
										inBlock : 'stack0_block2',
										onSide : 'stack0_block2_front',
										type : 'scale',
										num : '22',
									status : 'undefined',
									},
						},
						position_4 : {
							state : '4',
							description : 'Установите тумблер КОНТРОЛЬ НАПР. блока ПУ-Д в положение +300В',
									action_1 : {
										inStack : 'stack0',
										inBlock : 'stack0_block2',
										onSide : 'stack0_block2_front',
										type : 'scale',
										num : '22',
									status : 'undefined',
									},
						},
						position_5 : {
							state : '5',
							description : 'Установите тумблер КОНТРОЛЬ НАПР. блока ПУ-Д в положение +700В',
									action_1 : {
										inStack : 'stack0',
										inBlock : 'stack0_block2',
										onSide : 'stack0_block2_front',
										type : 'scale',
										num : '22',
									status : 'undefined',
									},
						},
						position_6 : {
							state : '6',
							description : 'Установите тумблер КОНТРОЛЬ НАПР. блока ПУ-Д в положение +1200В',
									action_1 : {
										inStack : 'stack0',
										inBlock : 'stack0_block2',
										onSide : 'stack0_block2_front',
										type : 'scale',
										num : '22',
									status : 'undefined',
									},
						},
						position_7 : {
							state : '7',
							description : 'Установите тумблер КОНТРОЛЬ НАПР. блока ПУ-Д в положение +1800В',
									action_1 : {
										inStack : 'stack0',
										inBlock : 'stack0_block2',
										onSide : 'stack0_block2_front',
										type : 'scale',
										num : '22',
									status : 'undefined',
									},
						},
						position_8 : {
							state : '1',
							description : 'Установите тумблер КОНТРОЛЬ НАПР. блока ПУ-Д в положение 0',
									action_1 : {
										inStack : 'stack0',
										inBlock : 'stack0_block2',
										onSide : 'stack0_block2_front',
										type : 'scale',
										num : '22',
									status : 'undefined',
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
				num : '4',
				type : 'button',
			},
			positions : {
						position_1 : {
							state : 'on',
							description : 'Нажмите кнопку СПЦ на блоке ПУ-Д',
						},
			},
		},
		el3 : {
			click : '3',
			current : {
				inStack : 'stack0',
				inBlock : 'stack0_block2',
				onSide : 'stack0_block2_front',
				num : '5',
				type : 'button',
			},
			positions : {
						position_1 : {
							state : 'on',
							description : 'Нажмите кнопку ПАСС на блоке ПУ-Д',
						},
			},
		},
	},
	ex6 : {
		nameOfExercise : 'Проверка приемного устройства ДРЛ',
		el1 : {
			click : '1',
			current : {
				inStack : 'stack0',
				inBlock : 'stack0_block2',
				onSide : 'stack0_block2_front',
				num : '2',
				type : 'knob',
			},
			positions : {
				position_1 : {
					state : '0',
					description : 'Установите тумблер КОНТРОЛЬ НАПР. блока ПУ-Д в положение 24КВ',
				},
				position_2 : {
					state : '2',
					description : 'Установите тумблер КОНТРОЛЬ НАПР. блока ПУ-Д в положение	+180В',
					action_1 : {
						inStack : 'stack0',
						inBlock : 'stack0_block2',
						onSide : 'stack0_block2_front',
						type : 'scale',
						num : '22',
					status : 'undefined',
					},
				},
				position_3 : {
					state : '3',
					description : 'Установите тумблер КОНТРОЛЬ НАПР. блока ПУ-Д в положение	+600В',
					action_1 : {
						inStack : 'stack0',
						inBlock : 'stack0_block2',
						onSide : 'stack0_block2_front',
						type : 'scale',
						num : '22',
					status : 'undefined',
					},
				},
				position_4 : {
					state : '4',
					description : 'Установите тумблер КОНТРОЛЬ НАПР. блока ПУ-Д в положение +300В',
					action_1 : {
						inStack : 'stack0',
						inBlock : 'stack0_block2',
						onSide : 'stack0_block2_front',
						type : 'scale',
						num : '22',
					status : 'undefined',
					},
				},
				position_5 : {
					state : '5',
					description : 'Установите тумблер КОНТРОЛЬ НАПР. блока ПУ-Д в положение +700В',
					action_1 : {
						inStack : 'stack0',
						inBlock : 'stack0_block2',
						onSide : 'stack0_block2_front',
						type : 'scale',
						num : '22',
					status : 'undefined',
					},
				},
				position_6 : {
					state : '6',
					description : 'Установите тумблер КОНТРОЛЬ НАПР. блока ПУ-Д в положение +1200В',
					action_1 : {
						inStack : 'stack0',
						inBlock : 'stack0_block2',
						onSide : 'stack0_block2_front',
						type : 'scale',
						num : '22',
					status : 'undefined',
					},
				},
				position_7 : {
					state : '7',
					description : 'Установите тумблер КОНТРОЛЬ НАПР. блока ПУ-Д в положение +1800В',
					action_1 : {
						inStack : 'stack0',
						inBlock : 'stack0_block2',
						onSide : 'stack0_block2_front',
						type : 'scale',
						num : '22',
					status : 'undefined',
					},
				},
				position_8 : {
					state : '1',
					description : 'Установите тумблер КОНТРОЛЬ НАПР. блока ПУ-Д в положение 0',
					action_1 : {
						inStack : 'stack0',
						inBlock : 'stack0_block2',
						onSide : 'stack0_block2_front',
						type : 'scale',
						num : '22',
					status : 'undefined',
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
				num : '4',
				type : 'button',
			},
			positions : {
				position_1 : {
					state : 'on',
					description : 'Нажмите кнопку СПЦ на блоке ПУ-Д',
				},
			},
		},
		el3 : {
			click : '3',
			current : {
				inStack : 'stack0',
				inBlock : 'stack0_block2',
				onSide : 'stack0_block2_front',
				num : '5',
				type : 'button',
			},
			positions : {
				position_1 : {
					state : 'on',
					description : 'Нажмите кнопку ПАСС на блоке ПУ-Д',
				},
			},
		},
		el4 : {
			click : '4',
			current : {
				inStack : 'stack1',
				inBlock : 'stack1_block1',
				onSide : 'stack1_block1_front',
				num : '4',
				type : 'toggler',
			},
			positions : {
				position_1 : {
					state : '0',
					description : 'Установите тумблер ВОЛНЫ блока П-Д в положение I',
					action_1 : {
						inStack : 'stack1',
						inBlock : 'stack1_block1',
						onSide : 'stack1_block1_front',
						type : 'lamp',
						num : '1',
					status : 'on',
					},
				},
				position_2 : {
					state : '1',
					description : 'Установите тумблер ВОЛНЫ блока П-Д в положение II',
					action_1 : {
						inStack : 'stack1',
						inBlock : 'stack1_block1',
						onSide : 'stack1_block1_front',
						type : 'lamp',
						num : '1',
					status : 'on',
					},
					action_2 : {
						inStack : 'stack1',
						inBlock : 'stack1_block1',
						onSide : 'stack1_block1_front',
						type : 'lamp',
						num : '2',
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
				num : '3',
				type : 'toggler',
			},
			positions : {
				position_1 : {
					state : '1',
					description : 'Установите тумблер ВАРУ блока П-Д в положение ВЫКЛ',
				},
			},
		},
		el6 : {
			click : '6',
			current : {
				inStack : 'stack1',
				inBlock : 'stack1_block1',
				onSide : 'stack1_block1_front',
				num : '2',
				type : 'toggler',
			},
			positions : {
				position_1 : {
					state : '0',
					description : 'Установите тумблер РРУ блока П-Д в положение МЕСТНОЕ',
				},
			},
		},
		el7 : {
			click : '7',
			current : {
				inStack : 'stack0',
				inBlock : 'stack0_block2',
				onSide : 'stack0_block2_front',
				num : '6',
				type : 'button',
			},
			positions : {
				position_1 : {
					state : 'on',
					description : 'Нажмите кнопку АКТ блока ПУ-Д',
				},
			},
		},
		el8 : {
			click : '8',
			current : {
				inStack : 'stack0',
				inBlock : 'stack0_block2',
				onSide : 'stack0_block2_front',
				num : '4',
				type : 'button',
			},
			positions : {
				position_1 : {
					state : 'on',
					description : 'Нажмите кнопку СПЦ блока ПУ-Д',
				},
			},
		},
		el9 : {
			click : '9',
			current : {
				inStack : 'stack1',
				inBlock : 'stack1_block2',
				onSide : 'stack1_block2_front',
				num : '3',
				type : 'toggler',
			},
			positions : {
				position_1 : {
					state : '1',
					description : 'Установите тумблер ФАЗИР-ВЫКЛ на блоке Ф-Д в положение ВЫКЛ.',
				},
				position_2 : {
					state : '0',
					description : 'Установите тумблер ФАЗИР-ВЫКЛ на блоке Ф-Д в положение ФАЗИР.',
				},
			},
		},
		el10 : {
			click : '10',
			current : {
				inStack : 'stack1',
				inBlock : 'stack1_block3',
				onSide : 'stack1_block3_front',
				num : '1',
				type : 'knob',
			},
			positions : {
				position_1 : {
					state : '0',
					description : 'Установите переключатель ЧАСТОТА ПОСЫЛОК блока К-Д в положение I',
				},
				position_2 : {
					state : '2',
					description : 'Установите переключатель ЧАСТОТА ПОСЫЛОК блока К-Д в положение 2',
				},
				position_3 : {
					state : '1',
					description : 'Установите переключатель ЧАСТОТА ПОСЫЛОК блока К-Д в положение АВТОМАТ',
				},
			},
		},
		el11 : {
			click : '11',
			current : {
				inStack : 'stack1',
				inBlock : 'stack1_block1',
				onSide : 'stack1_block1_front',
				num : '4',
				type : 'toggler',
			},
			positions : {
				position_1 : {
					state : '1',
					description : 'Установите тумблер ВОЛНЫ блока П-Д в положение 2',
				},
			},
		},
		el12 : {
			click : '12',
			current : {
				inStack : 'stack6',
				inBlock : 'stack6_block3',
				onSide : 'stack6_block3_front',
				num : '6',
				type : 'knob',
			},
			positions : {
				position_1 : {
					state : '2',
					description : 'Включите ДРЛ в активный род работы, переключатель ВЫБОР ВИДЕО установите в положение АКТ',
				},
			},
		},
		el13 : {
			click : '13',
			current : {
				inStack : 'stack4',
				inBlock : 'stack4_block2',
				onSide : 'stack4_block2_front',
				num : '2',
				type : 'button',
			},
			positions : {
				position_1 : {
					state : 'on',
					description : 'Одновременно нажмите кнопки ОПОЗНАВ. блока ИКО-Д и кнопку ОПОЗНАВАНИЕ на распределительном щите',
				},
			},
		},
		el14 : {
			click : '14',
			current : {
				inStack : 'stack7',
				inBlock : 'stack7_block1',
				onSide : 'stack7_block1_front',
				num : '23',
				type : 'button',
			},
			positions : {
				position_1 : {
					state : 'on',
					description : 'Одновременно нажмите кнопки ОПОЗНАВ. блока ИКО-Д и кнопку ОПОЗНАВАНИЕ на распределительном щите',
				},
			},
		},
	},
	ex10 : {
		nameOfExercise : 'Упражнение для теста',
	
		el1 : {
			multiply: 'fiders',
			fider1: {
				click : '1',
				current : {
					inStack : 'stack0',
					inBlock : 'stack0_block2',
					onSide : 'stack0_block2_front',
					num : '2',
					type : 'knob',
				},
				positions : {
					position_1 : {
						state : '1',
						description : 'Установите в положение 0',
						action_1 : {
							inStack : 'stack0',
							inBlock : 'stack0_block2',
							onSide : 'stack0_block2_front',
							type : 'lamp',
							num : '2',
							status : 'on',
						},
						action_2 : {
							inStack : 'stack0',
							inBlock : 'stack0_block2',
							onSide : 'stack0_block2_front',
							type : 'scale',
							num : '22',
							status : '-135',
						},
						action_3 : {
							inStack : 'stack0',
							inBlock : 'stack0_block2',
							onSide : 'stack0_block2_front',
							type : 'scale',
							num : '21',
							status : '10',
						}
					},
					position_2 : {
						state : '3',
						description : 'Установите в положение	600В',
						action_1 : {
							inStack : 'stack0',
							inBlock : 'stack0_block2',
							onSide : 'stack0_block2_front',
							type : 'scale',
							num : '22',
							status : '0',
						},
						 action_2 : {
							 inStack : 'stack0',
							 inBlock : 'stack0_block2',
							 onSide : 'stack0_block2_front',
							 type : 'lamp',
							 num : '1',
							 status : 'on',
						 },
						 action_3 : {
							 inStack : 'stack0',
							 inBlock : 'stack0_block2',
							 onSide : 'stack0_block2_front',
							 type : 'scale',
							 num : '21',
							 status : '0',
						 },
					},
					position_3 : {
						state : '7',
						description : 'Установите в положение +1800В',
						action_1 : {
							inStack : 'stack0',
							inBlock : 'stack0_block2',
							onSide : 'stack0_block2_front',
							type : 'scale',
							num : '22',
							status : '-50',
						},
						action_2 : {
							inStack : 'stack0',
							inBlock : 'stack0_block2',
							onSide : 'stack0_block2_front',
							type : 'scale',
							num : '21',
							status : '-50',
						},
					}
				},
			},
			fider2: {
				click : '1',
				current : {
					inStack : 'stack0',
					inBlock : 'stack0_block2',
					onSide : 'stack0_block2_front',
					num : '2',
					type : 'knob',
				},
				positions : {
					position_1 : {
						state : '7',
						description : 'Установите в положение +1800В',
						action_1 : {
							inStack : 'stack0',
							inBlock : 'stack0_block2',
							onSide : 'stack0_block2_front',
							type : 'scale',
							num : '22',
							status : '-50',
						},
						action_2 : {
							inStack : 'stack0',
							inBlock : 'stack0_block2',
							onSide : 'stack0_block2_front',
							type : 'scale',
							num : '21',
							status : '-50',
						},
					}
				},
			},
		},
		el2 : {
			click : '2',
			current : {
					inStack : 'stack0',
					inBlock : 'stack0_block2',
					onSide : 'stack0_block2_front',
					num : '2',
					type : 'toggler',
			},
			positions : {
				position_1 : {
						state : '1',
						description : 'Включите меня',
				}
			}
		}
	},
	ex11 : {
		nameOfExercise : 'Упражнение для тестирования 3',
		
		el1 : {
		 click : '1',
		 current : {
			 inStack : 'stack0',
			 inBlock : 'stack0_block2',
			 onSide : 'stack0_block2_front',
			 num : '2',
			 type : 'toggler',
		 },
		 positions : {
			 position_1 : {
				 state : '1',
				 description : 'Вертикально',

				 action_1 : {
					 inStack : 'stack0',
					 inBlock : 'stack0_block2',
					 onSide : 'stack0_block2_front',
					 type : 'lamp',
					 num : '2',
					 status : 'on',
				 },
				 action_2 : {
					 inStack : 'stack0',
					 inBlock : 'stack0_block2',
					 onSide : 'stack0_block2_front',
					 type : 'scale',
					 num : '21',
					 status : '7',
				 },
			 },
		 },
		},
		el2 : {
			click : '21',
			current : {
				inStack : 'stack1',
				inBlock : 'stack1_block2',
				onSide : 'stack1_block2_front',
				num : '3',
				type : 'knob',
			},
			positions : {
				position_1 : {
					state : '0',
					description : 'Установите переключатель величины токов блока Ф-Д в положение +150В',
				},
				position_2 : {
					state : '2',
					description : 'Установите переключатель величины токов блока Ф-Д в положение +75В',
				},
				position_3 : {
					state : '3',
					description : 'Установите переключатель величины токов блока Ф-Д в положение 0',
				},
				position_4 : {
					state : '4',
					description : 'Установите переключатель величины токов блока Ф-Д в положение +27В',
				},
				position_5 : {
					state : '5',
					description : 'Установите переключатель величины токов блока Ф-Д в положение +250В',
				},
				position_6 : {
					state : '6',
					description : 'Установите переключатель величины токов блока Ф-Д в положение -105В',
				},
				position_7 : {
					state : '0',
					description : 'Установите переключатель величины токов блока Ф-Д в положение +150В',
				},
			},
		},
		el3 : {
		 click : '2',
		 current : {
			 inStack : 'stack1',
			 inBlock : 'stack1_block2',
			 onSide : 'stack1_block2_front',
			 num : '2',
			 type : 'toggler',
		 },
		 positions : {
			 position_1 : {
				 state : '1',
				 description : 'АД',
				 action_1 : {
					 inStack : 'stack0',
					 inBlock : 'stack0_block2',
					 onSide : 'stack0_block2_front',
					 type : 'lamp',
					 num : '2',
					 status : 'on',
				 },
				 action_2 : {
					 inStack : 'stack1',
					 inBlock : 'stack1_block2',
					 onSide : 'stack1_block2_front',
					 type : 'scale',
					 num : '17',
					 status : '27',
				 },
			 },
		 },
		},
		el4 : {
		 click : '3',
		 current : {
			 inStack : 'stack0',
			 inBlock : 'stack0_block2',
			 onSide : 'stack0_block2_front',
			 num : '2',
			 type : 'toggler',
		 },
		 positions : {
			 position_1 : {
				 state : '0',
				 description : 'Горизонтально',
			 },
		 },
		},
	},


}