<?php

$fb_graph = "https://graph.facebook.com/v2.8/";
$fb_video =  "224527464627810";
$fb_query = "reactions.type(LOVE).limit(0).summary(total_count).as(reactions_love)%2Creactions.type(LIKE).limit(0).summary(total_count).as(reactions_like)";

$fb_token = "1780849518854846|392a4c723805dd56fb64deff170daa94";

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
