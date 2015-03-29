(function() {    
    var map = L.map('map').setView([0,0],2);
    L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    var updatetweets = function(loc) {        
        console.log(loc);
        $.ajax({
//            url: 'http://127.0.0.1:3000/trending?lat='+loc.lat+'&lng='+loc.lng,
            url: 'http://push.thepanicbutton.nl/trending?lat='+loc.lat+'&lng='+loc.lng,
            success : function(res) {
                console.log(res);
            }
        });
    }

    var update = function(event) {
        var newloc = map.getCenter(); 
        setTimeout(updatetweets,0,newloc);
        // weather etc.
    }

    map.on('viewreset', update);
    map.on('dragend', update);

    // zoom to current loc (html5 geoloc)
    map.locate({setView : true, maxZoom: 5});
})();
