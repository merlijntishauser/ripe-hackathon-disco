var PageView = function (streamManager) {

    var paused = false;

    var map;
    var heatmap;

    var that = this;

    function createMap() {
        map = L.map('map').setView([0, 0], 2);
        var popup = L.popup();

        // add an OpenStreetMap tile layer
        L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}', {
            attribution: 'Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ',
            maxZoom: 16
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

    this.importSnapshot = function (locations) {
        var locs;
        while(locs === undefined) {
            var locs = pr.locations;
        }
        $.each(locations, function(key, val) {
            console.log(val);
            heatmap.addDataPoint(locs[val['id']]['lat'], locs[val['id']]['long'], val['intensity']*100);
        });
    };

    this.init = function () {
        createMap();
        this.initCooldown(1000);
    };

    this.initCooldown = function (delay) {
        setInterval(function() {
            heatmap.dissapate();
            heatmap.update();
        }, delay);
    }
};
