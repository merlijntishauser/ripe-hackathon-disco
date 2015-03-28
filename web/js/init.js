var streamManager = new StreamManager();
var view = new PageView(streamManager);
var pr = new ProbeLocation();
pr.getProbeLocation();
view.init();
// Historic
streamManager.setup({ stream_type: "probestatus", startTime: "1427445541", stopTime: "1427445630"}, false, view.onMessage);
//streamManager.setup({ stream_type: "probestatus"}, false, view.onMessage);