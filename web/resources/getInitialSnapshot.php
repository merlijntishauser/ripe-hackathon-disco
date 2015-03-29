<?php

	$interval = time()-1800;
	$raw = file_get_contents("https://atlas.ripe.net/api/v1/measurement/7000/result?start=".$interval."&stop=".time());
	$data = json_decode($raw, true);

	$probes = array();
	foreach ($data as $key => $value) {
		if($value['event'] == 'disconnect') {
			$probe = array();
			$probe['id'] = $value['prb_id'];
			$probe['intensity'] = 1-((time()-$value['timestamp'])*0.00055);
			array_push($probes, $probe);
		}
	}
	var_dump($probes);
	file_put_contents("snapshot.json", json_encode($probes));

?>