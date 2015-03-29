<!doctype html>
<html>
    <head>
        <title>WebSockets Leaflet</title>
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
        <script src="js/webgl-heatmap-leaflet.js"></script>
    </head>

    <body>
        <div style="height:500px; width:800px;">
            <div id="map" style="height:100%;width:100%;"></div>
        </div>
    </body>

    <script src="js/init.js"></script>
</html>