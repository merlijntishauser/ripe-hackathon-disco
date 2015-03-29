<?php

	$raw = file_get_contents("https://atlas.ripe.net/api/v1/probe-archive/?format=json");
	$data = json_decode($raw, true);

	$probes =[];
	foreach ($data['objects'] as $key => $value) {
		$probe = [];
		$probe['long']  = $value['longitude'];
		$probe['lat']   = $value['latitude'];
		$probes[(int)$value['id']] = $probe;
	}

    file_put_contents(realpath(dirname(__FILE__)) . "/locations.json", json_encode($probes));
