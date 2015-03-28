var ProbeLocation = function () {
    var locations = null;
};

ProbeLocation.prototype.getProbeLocation = function() {
    var that = this;
    if(this.locations == null) {
        $.getJSON("resources/locations.json", function(data) {
            that.locations = data;
        });
    }
}