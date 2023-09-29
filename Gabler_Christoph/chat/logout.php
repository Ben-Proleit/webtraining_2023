<!Doctype html>
<html>
	<head>
    <?php
      require "./src/standard/head.html";
      require "./src/basics.php";
      echo(getStylesheet());
    ?>
    <link rel="stylesheet" type="text/css" href="./style/login.css"/>
	</head>
	<body class="lang" data-file="logout">
    <?php
      require "logout.html";
      require "./src/standard/footer.html";
    ?>
	</body>
</html>