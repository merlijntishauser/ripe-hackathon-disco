<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Discomo</title>

    <link rel="stylesheet" href="http://cdn.leafletjs.com/leaflet-0.7.3/leaflet.css"/>
    <script src="http://cdn.leafletjs.com/leaflet-0.7.3/leaflet.js"></script>
    <script src="http://atlas-stream.ripe.net/stream/socket.io/socket.io.js"></script>
    <script src="http://code.jquery.com/jquery-1.10.2.js"></script>
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.2/css/bootstrap.min.css">
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.2/js/bootstrap.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.9.0/moment.min.js"></script>
    <script src="js/probeLocation.js"></script>
    <script src="js/streamConnection.js"></script>
    <script src="js/mainView.js"></script>
    <script src="js/webgl-heatmap.js"></script>
      <script src="js/jquery.ticker.js"></script>
      <script src="js/site.js"></script>
    <script src="js/webgl-heatmap-leaflet.js"></script>
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.4/css/bootstrap.min.css">
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.4/js/bootstrap.min.js"></script>

    <!-- HTML5 shim and Respond.js for IE8 support of HTML5 elements and media queries -->
    <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
    <!--[if lt IE 9]>
      <script src="https://oss.maxcdn.com/html5shiv/3.7.2/html5shiv.min.js"></script>
      <script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
    <![endif]-->
  </head>
  <body>
    <body>
        <div class="container">
            <div class="row">
                <div class="col-md-12 text-center">
                    <div class="page-header">
                        <h1>Discomo <small>Is it just my connection?</small></h1>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-md-8">
                    <div id="map" style="height:500px;width:100%;"></div>
                    <br />
                    <ul id="js-news" class="js-hidden">
                        <li class="news-item"><a href="#">This is the 1st latest news item.</a></li>
                        <li class="news-item"><a href="#">This is the 2nd latest news item.</a></li>
                        <li class="news-item"><a href="#">This is the 3rd latest news item.</a></li>
                        <li class="news-item"><a href="#">This is the 4th latest news item.</a></li>
                    </ul>
                </div>
                <div class="col-md-4">
                    <div class="panel panel-default">
                        <div class="panel-heading">
                            <h3 class="panel-title"><img src="img/twitter.png" /> Popular Twitter keywords in the area</h3>
                        </div>
                        <div class="panel-body" id="trending">

                        </div>
                    </div>
                    <div class="panel panel-default">
                        <div class="panel-heading">
                            <h3 class="panel-title"><img src="img/weather.png" /> Weather in the area</h3>
                        </div>
                        <div class="panel-body text-center" id="weather">
                            <div class="text-center">
                                <img id="weather_icon" src="" />
                            </div>
                            <br>
                            <div id="weather_description"></div>
                            <br>
                            <div id="weather_location"></div>
                            <br>
                            <table>
                                <thead>
                                    <tr>
                                        <th style="padding: 10px 10px 0 10px;font-size: 10px;text-transform: uppercase;">Humidity (%)</th>
                                        <th style="padding: 10px 10px 0 10px;font-size: 10px;text-transform: uppercase;">Temperature (C)</th>
                                        <th style="padding: 10px 10px 0 10px;font-size: 10px;text-transform: uppercase;">Wind speed (KMh)</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr style="font-size: 45px;font-weight: bold;">
                                        <td id="weather_humidity"></td>
                                        <td id="weather_temperature"></td>
                                        <td id="weather_windspeed"></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </body>

    <script src="js/init.js"></script>
  </body>
</html>
