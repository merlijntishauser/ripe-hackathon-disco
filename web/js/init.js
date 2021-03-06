var streamManager = new StreamManager();
var view = new PageView(streamManager);
var pr = new ProbeLocation();
pr.getProbeLocation();
view.init();
var initialSnapshot;
$.getJSON("resources/snapshot.json", function(data) {
    initialSnapshot = data;
    view.importSnapshot(initialSnapshot);
});
// Historic - power outage on friday
//streamManager.setup({ stream_type: "probestatus", startTime: "1427445553", stopTime: "1427466600"}, false, view.onMessage);
streamManager.setup({stream_type: "probestatus"}, false, view.onMessage);

$(document).ready(function() {
	$('#locate_me').click(function(e) {
		map.locate({setView : true, maxZoom: 8});
	});
});