<?php header("Content-Type: text/html; charset=utf-8")?>
<!doctype html>
<html id="dkrm">
  <head>
  <meta charset="utf-8">
  <title>ПРМГ ДКРМ</title>
  
  
  <!--realtime less compiler-->
 <link rel="stylesheet/less" type="text/css" href="css/style_prmg.less">
 <script src="js/libs/less-1.6.2.min.js" type="text/javascript"></script>
  
  <!--это для скопмилированного css
  <link rel="stylesheet" href="css/style_prmg.css">
  -->
  </head>
<body id="top_page">
<header>
  
  <ul class='header top-line'>
    <li id="prmg-trigger">
      <div class="link-wrapper">
        <a class="current" href="prmg_dkrm.php#!watch">ДКРМ</a>
        <a href="prmg_grm.php#!watch">ГРМ</a>
      </div>
    <li id='add' class="btn dev">
      <a href='javascript:void(0);' alt="Добавление элемента"></a>
    </li>
    <li id='edit' class="btn dev">
      <a href='javascript:void(0);' alt="Редактирование позиций"></a>
    </li>
    <li id='create' class="btn dev">
      <a href='javascript:void(0);' alt="Создать упражнение"></a>
    </li>
    <li id='addScale' class="btn dev">
      <a href='javascript:void(0);' alt="Добавить зависимости шкал"></a>
    </li>
    <li id='chooseExercise' class="btn">
      <a href='javascript:void(0);' alt="Прохождение алгоритмов">Выбрать упражнение</a>
    </li>
    <li id='hideDev' class="btn">
      <a href='javascript:void(0);'>dev</a>
    </li>
    <li id='showhint' class="btn" style="display: none;">
      <i>Помощник:</i>
      <span></span>
    </li>
  </ul>
  <div id="addBody" class="hidden-block">
    <ul id="addControl">
      <li><b>1.</b><span>Выберите блок для добавления</span> <b>2.</b><span>Выберите тип элемента:</span></li>
      <li><a href="javascript:void(0);" id="button">Кнопка</a></li>
      <li><a href="javascript:void(0);" id="toggler">Тумблер</a></li>
      <li><a href="javascript:void(0);" id="knob">Ручка</a></li>
      <li><a href="javascript:void(0);" id="rotator">Потенциометр</a></li>
      <li><a href="javascript:void(0);" id="scale">Шкала</a></li>
      <li><a href="javascript:void(0);" id="indicator">Цифровой индикатор</a></li>
      <li><a href="javascript:void(0);" id="lamp">Лампочка</a></li>
      <li><a href="javascript:void(0);" id="socket">Розетка</a></li>
      <li><a href="javascript:void(0);" id="fuse">Предохранитель</a></li>
      <li><a href="javascript:void(0);" id="next">Кнопка Далее</a></li>
    </ul>
  </div>
  <div id="createBody" class="hidden-block">
      <ul>
        <li id="creatingExercise" style="display:block;"><input id="nameOfExercise" type="text" placeholder="Название упражнения"><button id="createExercise">Создать</button></li>
        <li id="choosingNextElement"><p></p><button id="chooseNextElement">Нажать, чтобы выбрать элемент</button> или <button id="chooseNextElementAndSetDefaultPosition">Нажать, чтобы выбрать элемент и указать позицию по умолчанию</button></li>
        <li id="addingCountClick"><p>Действие имеет строгий порядок выполнения?</p><button id="addCountClick">Да</button><button id="noAddCountClick">Нет</button></li>
        <li id="settingPosition"><p>Установите элемент в нужное положение, затем нажмите</p><button id="setPosition">Готово</button></li>
        <li id="settingDescription"><p>Введите подсказку</p><input id="writeDescription" type="text" name="text" placeholder="Введите пояснительный текст" value=""><button id="setDescription" for="text">Готово</button><button class="back">на шаг назад</button></li>
        <li id="bindActionOnPos"><p>Привязать событие к данному положению?</p><button id="bindAction">Да</button><button id="noBindAction">Нет, новое положение</button><button class="back">на шаг назад</button></li>
        <li id="ActionSelectElem"><p>Выберите элемент и установите в нужное положение</p><button id="chooseActElement">Готово</button><button class="back">на шаг назад</button></li>
        <!--<li id="ActionSelectPos"><p>Установите в нужное положение</p><button id="chooseActPos">Готово</button></li>-->
        <li id="addActionOnPos"><p>Привязать еще одно событие?</p><button id="addAction">Да</button><button id="skipAddAction">Нет</button></li>
        <li id="addingPosition"><p>Добавить еще одну позицию?</p><button id="addPosition" class="retry">Да</button><button id="skipAddingPosition" class="next">К следующему элементу<button class="back">на шаг назад</button></button>
        <li id="oneMoreElement"><p>Добавить еще один элемент</p><button id="more"></button></li>



        <li id="settingDefaultPosition"><p>Установите элемент в положение по умолчанию, затем нажмите</p><button id="setDefaultPosition">Готово</button></li>
      </ul>
      <ul>
        <li id="makingDefaultPositions" style="display: block;"><button id="makeDefaultPositions">Обозначить позиции по умолчанию</button>
        <li id="choosingNextDefaultPositionOfElement"><p></p><button id="chooseNextDefaultPositionOfElement">Нажать, чтобы выбрать элемент</button></li>
        <li id="settingDefaultPositionOfElement"><p>Выберите элемент и установите в нужное положение</p><button id="setDefaultPositionOfElement">Готово</button>
  </div>
  <div id="editBody" class="hidden-block">
    <ul>
      <li><b>1.</b><span>Выберите определенный блок для вывода</span> <b>2.</b><span>Нажмите</span></li>
      <li><a href="javascript:void(0);">Записать</a></li>
    </ul>
  </div>
  <div id="addScaleBody" class="hidden-block">
    <ul>
      <li id="choosingScale" style="display:block;"><button id="chooseScale">Нажать</button><p>, чтобы выбрать ампер-/вольтметр для задания ему зависимости</p>
      <li id="choosingControl"><button id="chooseControl">Нажать</button><p>, чтобы выбрать управляющий элемент</p>
      <li id="settingControlPosition"><p>Установите управляющий элемент в одно из положений, нажмите </p><button id="setControlPosition">Готово</button>
      <li id="settingScalePosition"><button id="setScalePosition">Нажмите</button><p>Для установки стрелки в нужное положение</p>
      <li id="oneMoreRelation"><p>Установить еще одну зависимость?</p><button id="setOneMoreRelation">Да</button><button class="next" id="toSetingExerciseRelation">Нет, это все</button>
      <li id="settingExerciseRelation"><p>Выберите в каких упражнениях применять указанную выше зависимость</p><ol><li><button class="ex" on="false" id="ex1">Включение аппаратуры ПРЛ</button><p>Выбрав элемент-триггер, нужно нажать <button class="setDefinedElement" exercise="ex1">Записать триггер</button></p></li><li><button class="ex" on="false" id="ex2">Включение аппаратуры ДРЛ</button><p>Выбрав элемент-триггер, нужно нажать <button class="setDefinedElement" exercise="ex2">Записать триггер</button></p></li><li><button class="ex" on="false" id="ex3">Проверка передающего устройства ПРЛ (пустое)</button><p>Выбрав элемент-триггер, нужно нажать <button class="setDefinedElement" exercise="ex3">Записать триггер</button></p></li><li><button class="ex" on="false" id="ex4">Проверка приемного устройства ПРЛ</button><p>Выбрав элемент-триггер, нужно нажать <button class="setDefinedElement" exercise="ex4">Записать триггер</button></p></li><li><button class="ex" on="false" id="ex5">Проверка передающего устройства ДРЛ</button><p>Выбрав элемент-триггер, нужно нажать <button class="setDefinedElement" exercise="ex5">Записать триггер</button></p></li><li><button class="ex" on="false" id="ex6">Проверка передающего устройства ДРЛ</button><p>Выбрав элемент-триггер, нужно нажать <button class="setDefinedElement" exercise="ex6">Записать триггер</button></p></li><li><button class="ex" on="false" id="ex10">Упражнение для теста</button><p>Выбрав элемент-триггер, нужно нажать <button class="setDefinedElement" exercise="ex10">Записать триггер</button></p></li><li><button class="ex" on="false" id="ex11">Упражнение для тестирования 3</button><p>Выбрав элемент-триггер, нужно нажать <button class="setDefinedElement" exercise="ex11">Записать триггер</button></p></li></ol><button id="setExerciseRelation">Готово</button>
      <li id="startingAgain"><button class="startAgain">Начать заново новую зависимость</button>
    </ul>
  </div>
  <div id="chooseExerciseBody" class="hidden-block">
  <ul>
    <li class="listing">
      <ol>
      </ol>
      <li class="passing" style="display: none;">
        <ol>
          <li><header>Выбор режима</header>
            <ul>
            <li><a data-codename="training" class="checkbox">Тренировка</a></li>
            <li><a data-codename="passing" class="checkbox">Экзамен</a></li>
            </ul>
          </li>
        </ol>
      <li class="options" style="display:none">
        <ol>
        </ol>
      <li class="starting" style="display: none;">
        <ol>
          <li>
            <header>Старт</header>
              <button id="go" disabled="disabled">Приступить к выполнению!</button>
        </ol>
     </ul>
  </div>
</header>

<div id="wrapper">
<div id="root">
  <div id="container" class="container">
    <ul>
      <li id="min_stack0">
        <div>
          <header>ПРМГ ДКРМ</header>
          <section class="size215" id="min_stack0_block1"><div side="front" id="min_stack0_block1_front"></div></section>
          <section class="ear left" id="min_stack0_block2"><div side="front" id="min_stack0_block2_front"></div></section>
          <section class="ear right" id="min_stack0_block3"><div side="front" id="min_stack0_block3_front"></div></section>
          <section class="ear left bottom" id="stack0_block27"><div side="front" id="stack0_block27_front"></div></section>
          <section class="ear right bottom" id="stack0_block28"><div side="front" id="stack0_block28_front"></div></section>
          <div class="separator outer"></div>
          <div class="card-block">
            <div class="separator inner"></div>
            <div class="card-holder">
              <section class="card size1 radiator" id="min_stack0_block4"><div side="front" id="min_stack0_block4_front"></div></section>
              <section class="card size3" id="min_stack0_block5"><div side="front" id="min_stack0_block5_front"></div></section>
              <section class="card size2" id="min_stack0_block6"><div side="front" id="min_stack0_block6_front"></div></section>
              <section class="card size2" id="min_stack0_block7"><div side="front" id="min_stack0_block7_front"></div></section>
              <section class="card size2" id="min_stack0_block8"><div side="front" id="min_stack0_block8_front"></div></section>
              <section class="card size3" id="min_stack0_block9"><div side="front" id="min_stack0_block9_front"></div></section>
              <section class="card size1 radiator" id="min_stack0_block10"><div side="front" id="min_stack0_block10_front"></div></section>
            </div>
            <div class="separator inner"></div>
            <div class="card-holder">
              <section class="card size3" id="min_stack0_block11"><div side="front" id="min_stack0_block11_front"></div></section>
              <section class="card size3" id="min_stack0_block12"><div side="front" id="min_stack0_block12_front"></div></section>
              <section class="card size2" id="min_stack0_block13"><div side="front" id="min_stack0_block13_front"></div></section>
              <section class="card size3" id="min_stack0_block14"><div side="front" id="min_stack0_block14_front"></div></section>
              <section class="card size3" id="min_stack0_block15"><div side="front" id="min_stack0_block15_front"></div></section>
              <section class="card size2" id="min_stack0_block16"><div side="front" id="min_stack0_block16_front"></div></section>
              <section class="card size3" id="min_stack0_block17"><div side="front" id="min_stack0_block17_front"></div></section>
              <section class="card size3" id="min_stack0_block18"><div side="front" id="min_stack0_block18_front"></div></section>
            </div>
            <div class="separator inner"></div>
            <div class="card-holder">
              <section class="card size4" id="min_stack0_block19"><div side="front" id="min_stack0_block19_front"></div></section>
              <section class="card size1" id="min_stack0_block20"><div side="front" id="min_stack0_block20_front"></div></section>
              <section class="card size3" id="min_stack0_block21"><div side="front" id="min_stack0_block21_front"></div></section>
              <section class="card size3" id="min_stack0_block22"><div side="front" id="min_stack0_block22_front"></div></section>
              <section class="card size3" id="min_stack0_block23"><div side="front" id="min_stack0_block23_front"></div></section>
              <section class="card size1" id="min_stack0_block24"><div side="front" id="min_stack0_block24_front"></div></section>
              <section class="card size4" id="min_stack0_block25"><div side="front" id="min_stack0_block25_front"></div></section>
            </div>
            <div class="separator inner"></div>
          </div>
          <div class="separator outer"></div>
          <div class="separator big">
          <section class="size215" id="min_stack0_block26"><div side="front" id="min_stack0_block26_front"></div></section>
        </div>
      </li>
      <li id="min_stack1">
        <div>
          <section class="size120" id="min_stack1_block3"><div side="front" id="min_stack1_block3_front"></div></section>    
          <section class="size240" id="min_stack1_block1"><div side="front" id="min_stack1_block1_front"></div></section>  
          <section class="size64" id="min_stack1_block2"><div side="front" id="min_stack1_block2_front"></div></section>      
        </div>
      </li>
    </ul>
  </div>

</div><!--end root-->
</div><!--end wrapper-->

<div id="blocks" class="mayAddElement container">

    <ul>
    <div id='hidePopUp' class="btn">
      <a href='javascript:void(0);'>Назад</a>
    </div>
      <li id="stack0">
        <div class="block-holder">
            <section class="size215" id="stack0_block1"><div alt="Перейти к боковой стороне блока" side="left" id="stack0_block1_left"></div><div side="front" id="stack0_block1_front"></div><div alt="Перейти к боковой стороне блока" side="right" id="stack0_block1_right"></div></section>
        </div>
        <div class="block-holder">
          <section class="ear left" id="stack0_block2"><div side="front" id="stack0_block2_front"></div></section>
        </div>
        <div class="block-holder">   
          <section class="ear right" id="stack0_block3"><div side="front" id="stack0_block3_front"></div></section>
        </div>
        <div class="card-holder">
          <section class="card size1 radiator" id="stack0_block4"><div side="front" id="stack0_block4_front"></div></section>
          <section class="card size3" id="stack0_block5"><div side="front" id="stack0_block5_front"></div></section>
          <section class="card size2" id="stack0_block6"><div side="front" id="stack0_block6_front"></div></section>
          <section class="card size2" id="stack0_block7"><div side="front" id="stack0_block7_front"></div></section>
          <section class="card size2" id="stack0_block8"><div side="front" id="stack0_block8_front"></div></section>
          <section class="card size3" id="stack0_block9"><div side="front" id="stack0_block9_front"></div></section>
          <section class="card size1 radiator" id="stack0_block10"><div side="front" id="stack0_block10_front"></div></section>
        </div>
        <div class="card-holder">
          <section class="card size3" id="stack0_block11"><div side="front" id="stack0_block11_front"></div></section>
          <section class="card size3" id="stack0_block12"><div side="front" id="stack0_block12_front"></div></section>
          <section class="card size2" id="stack0_block13"><div side="front" id="stack0_block13_front"></div></section>
          <section class="card size3" id="stack0_block14"><div side="front" id="stack0_block14_front"></div></section>
          <section class="card size3" id="stack0_block15"><div side="front" id="stack0_block15_front"></div></section>
          <section class="card size2" id="stack0_block16"><div side="front" id="stack0_block16_front"></div></section>
          <section class="card size3" id="stack0_block17"><div side="front" id="stack0_block17_front"></div></section>
          <section class="card size3" id="stack0_block18"><div side="front" id="stack0_block18_front"></div></section>
        </div>
        <div class="card-holder">
          <section class="card size4" id="stack0_block19"><div side="front" id="stack0_block19_front"></div></section>
          <section class="card size1" id="stack0_block20"><div side="front" id="stack0_block20_front"></div></section>
          <section class="card size3" id="stack0_block21"><div side="front" id="stack0_block21_front"></div></section>
          <section class="card size3" id="stack0_block22"><div side="front" id="stack0_block22_front"></div></section>
          <section class="card size3" id="stack0_block23"><div side="front" id="stack0_block23_front"></div></section>
          <section class="card size1" id="stack0_block24"><div side="front" id="stack0_block24_front"></div></section>
          <section class="card size4" id="stack0_block25"><div side="front" id="stack0_block25_front"></div></section>
        </div>
        <div class="block-holder">
          <section class="size215" id="stack0_block26"><div side="front" id="stack0_block26_front"></div></section>
        </div>
        <div class="block-holder">
          <section class="ear left bottom" id="stack0_block27"><div side="front" id="stack0_block27_front"></div></section>
        </div>
        <div class="block-holder">   
          <section class="ear right bottom" id="stack0_block28"><div side="front" id="stack0_block28_front"></div></section>
        </div>
      </li>
      <li id="stack1">
        <div class="block-holder">
          <section class="size120" id="stack1_block3"><div side="front" id="stack1_block3_front"></div></section>    
        </div>
        <div class="block-holder">
          <section class="size240" id="stack1_block1"><div side="front" id="stack1_block1_front"></div></section>    
          <section class="size64" id="stack1_block2"><div side="front" id="stack1_block2_front"></div></section>    
        </div>
      </li>
    </ul>
</div>
<div id="exlog" class="dev"></div>
<div id="log" class="dev">
<div id="htmllog" class="dev"><textarea></textarea><xmp></xmp></div>
</div>



<script src="js/libs/jquery-2.0.1.min.js"></script>
<script src="js/functions_prgm.js" type="text/javascript"></script>

<!-- Наполнение контентом -->
<script src="js/data_prmg/dkrm/algorithms.js" type="text/javascript"></script>
<script src="js/data_prmg/dkrm/scales.js" type="text/javascript"></script>
<script src="js/data_prmg/dkrm/addcontrols.js" type="text/javascript"></script>
<script src="js/data_prmg/dkrm/names.js" type="text/javascript"></script>

<!-- Интерактив -->
<script src="js/elementsAlive.js" type="text/javascript"></script>
<script src="js/showExercises.js" type="text/javascript"></script>
<script src="js/showExercises_prmg.js" type="text/javascript"></script>

<!-- Конструкторы -->
<script src="js/setElements.js" type="text/javascript"></script>
<script src="js/setExercises.js" type="text/javascript"></script>
<script src="js/setScaleRelations.js" type="text/javascript"></script>
<!--<script src="js/setDevice.js" type="text/javascript"></script>-->



<link href="js/libs/jqueryui/css/ui-lightness/jquery-ui-1.10.3.custom.css" rel="stylesheet">
<script src="js/libs/jqueryui/js/jquery-ui-1.10.3.custom.js"></script>
</div>
</body>
</html>