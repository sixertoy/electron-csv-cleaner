<?php

function send_response ($id, $error) {
  $response = [ 'id' => $id, 'error' => $error ];
  $response = json_encode($response);
  echo $response;
}

if (isset($_FILES['file'])) {
    $id = time();
    $outputfile = './uploads/'.$id.'.csv';
    $postfilename = $_FILES['file']['tmp_name'];
    move_uploaded_file($postfilename, $outputfile);
    sleep(3);
    send_response($id, false);
    exit;
} else {
  send_response(false, 'Unable to upload file');
  exit;
}
?>
