<!doctype html>
<html>
  <head>
    <?php
    require "./src/standard/head.html";
    ?>
    <link rel="stylesheet" type="text/css" href="./style/chat.css"/>
  </head>
  <body class="d-flex flex-row flex-nowrap justify-content-start">
  <?php
  //get the main page
  $html = file_get_contents("chat.html");

  //include the version
  $version = file_get_contents("src/version");
  if($version != null){
      $html = str_replace("@VERSION", $version, $html);
  }

  //print the entire page
  echo($html);

  //print the footer
  require "./src/standard/footer.html";
  ?>
  </body>
</html>
<?php
exit();