<?php

$query = $_GET['lat']."%2C".$_GET['lon'];
$url ="http://api.worldweatheronline.com/free/v2/weather.ashx?q=".$query."&format=json&num_of_days=0&fx=no&fx24=yes&includelocation=yes&show_comments=no&tp=3&key=SECRETKEY";

$data = file_get_contents($url);
$data = json_decode($data, true);
$data = $data['data'];

$result = array();
$result['wind_speed'] = $data['current_condition'][0]['windspeedKmph'];
$result['temperature'] = $data['current_condition'][0]['temp_C'];
$result['humidity'] = $data['current_condition'][0]['humidity'];
$result['description'] = $data['current_condition'][0]['weatherDesc'][0]['value'];
$result['icon'] = $data['current_condition'][0]['weatherIconUrl'][0]['value'];
$result['location'] = $data['nearest_area'][0]['areaName'][0]['value'] . ", " . $data['nearest_area'][0]['country'][0]['value'];

echo json_encode($result);
