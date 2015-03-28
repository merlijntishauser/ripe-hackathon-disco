var PageView = function (streamManager) {

    var paused = false;

    var map;
    var heatmap;

    var that = this;

    function createMap() {
        map = L.map('map').setView([0, 0], 2);
        var popup = L.popup();

        // add an OpenStreetMap tile layer
        L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);

        //custom size for this example, and autoresize because map style has a percentage width
        heatmap = new L.TileLayer.WebGLHeatMap({size: 10000, autoresize: true}); 
        map.addLayer(heatmap);
    }

    function pauseStream() {
        paused = !paused;
        document.getElementById("pause").innerHTML = paused ? "Start" : "Pause";
        document.getElementById("pause").active = paused;
    }

    this.onMessage = function (message) {
        if(message['event'] == "disconnect") {
            console.log(message);
            var probe_id = message['prb_id'];
            heatmap.addDataPoint(pr.locations[probe_id]['lat'], pr.locations[probe_id]['long'], 100);
            heatmap.update();
        }
    };

    this.init = function () {
        createMap();
    };
};
