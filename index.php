<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>Document</title>
  <link rel="stylesheet" href="./app.css">
</head>
<body>
  <div id="app">
    <div class="col col1"><span class="holder"></span></div>
    <div class="col col2"><span class="holder"></span></div>
    <div class="col col3"><span class="holder"></span></div>
    <div class="col col4"><span class="holder"></span></div>
  </div>
  <div class="loadmore">
    <button onclick="populate()">RELOAD</button>
  </div>
  <script src="./jq.slim.min.js"></script>
  <script src="./app.js"></script>
</body>
</html>