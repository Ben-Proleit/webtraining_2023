<!doctype html>
<html>
  <head>
    <?php
    require "./src/standard/head.html";
    require "./src/basics.php";
    echo(getStylesheet());
    ?>
    <link rel="stylesheet" type="text/css" href="./style/login.css"/>
  </head>
  <body class="lang" data-file="login">
    <?php
    //print the login body
    require "login.html";
    //print footer
    require "./src/standard/footer.html";
    ?>
  </body>
</html>
<?php
exit();