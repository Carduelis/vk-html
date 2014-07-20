<?php header("Content-Type: text/html; charset=utf-8")?>
<!doctype html>
<html>
  <head>
  <meta charset="utf-8">
  <title>Симулятор ПРМГ</title>
  
  
  <!--realtime less compiler
  
 <link rel="stylesheet/less" type="text/css" href="css/style_prmg.less">
 <script src="js/libs/less-1.6.2.min.js" type="text/javascript"></script>
  -->
  <!--это для скопмилированного css
  -->
    <link rel="stylesheet" href="css/style_rsp.css">
  </head>
<body id="top_page">

<div id="prmg" class="welcome">
  <div class="header">
    <h2 class="mirea">Федеральное государственное бюджетное образовательное учреждение высшего профессионального образования <br> «Московский государственный технический университет радиотехники, электроники и автоматики» (МГТУ МИРЭА)</h2>
    <h2>Военная кафедра</h2>
    <h1>Симулятор ПРМГ</h1>
  </div>
  <div class="img" id="prmg">
  </div>
  <div class="authors">
    <ul>
      <li><b>Руководитель:</b><span>Полковник Каргапельцев Аркадий Аркадьевич</span>
      <li><b>Разработчики:</b><span>Щеголев Павел</span><span>Жур Богдан</span>
      <li><b>Тестировщики:</b><span>Кучерук Дмитрий</span><span>Назаров Павел</span>
    </ul>
  </div>
  <div class="btns">
    <a id="dkrm_start" href="prgm_dkrm.php">Приступить к ПРМГ (ДКРМ)</a>
    <a id="grm_start" href="prgm_grm.php">Приступить к ПРМГ (ГРМ)</a>
    <a href="index.php" id="back">На главную</a>
  </div>
</div>

</body>
</html>