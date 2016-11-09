<?php

$fb_graph = "https://graph.facebook.com/v2.8/";
$fb_video =  "10155482188709972";
$fb_query = "reactions.type(LOVE).limit(0).summary(total_count).as(reactions_love)%2Creactions.type(LIKE).limit(0).summary(total_count).as(reactions_like)";

$fb_token = "1807617999450148|e0035c4cda05dba317fad5442ccbd56a";

$result = file_get_contents($fb_graph . "?ids=" . $fb_video . "&fields=" . $fb_query . "&access_token=" . $fb_token);

$result = json_decode($result);

foreach ($result as $data) {
	$out = [
		'love' => $data->reactions_love->summary->total_count,
		'like' => $data->reactions_like->summary->total_count
	];
}

header('Content-Type: application/json');
echo json_encode($out);
die;
