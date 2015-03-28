<?php

	$raw = file_get_contents("https://atlas.ripe.net/api/v1/probe-archive/?format=json");
	$data = json_decode($raw, true);

	$probes = array();
	foreach ($data['objects'] as $key => $value) {
		$probe = array();
		$probe['long'] = $value['longitude'];
		$probe['lat'] = $value['latitude'];
		$probes[(int)$value['id']] = $probe;
	}
	file_put_contents("locations.json", json_encode($probes));

?>