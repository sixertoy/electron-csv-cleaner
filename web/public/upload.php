<?php

function send_response ($id, $error) {
  $response = [ 'id' => $id, 'error' => $error ];
  $response = json_encode($response);
  echo $response;
}

if (!isset($_FILES['file'])) {
  send_response(false, 'Unable to upload file');
  exit;
}

$id = time();
$outputfile = './uploads/'.$id.'.csv';
$postfilename = $_FILES['file']['tmp_name'];
move_uploaded_file($postfilename, $outputfile);
sleep(1.5);
send_response($id, false);
exit;
