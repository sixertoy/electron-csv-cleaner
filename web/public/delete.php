<?php

function send_response ($id, $error) {
  header('Content-Type: application/json');
  $response = [ 'id' => $id, 'error' => $error ];
  $response = json_encode($response);
  echo $response;
}

if (!isset($_POST['fileid'])) {
  http_response_code(404);
  exit;
}

$fileid = $_POST['fileid'];
$file = './uploads/'.$fileid.'.csv';
$exists = file_exists($file);
if (!$exists) {
  http_response_code(204);
  exit;
}
unlink($file);
$file = './uploads/'.$fileid.'-converted.csv';
$exists = file_exists($file);
if ($exists) unlink($file);
sleep(1.5);
send_response($fileid, false);
exit;
