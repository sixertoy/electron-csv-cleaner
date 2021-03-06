<?php
$_SPLITTER = ';';
$_END_LINE = '\n';
$_ENCLOSURE = chr(0);
$_SEARCHES = array('\t', '\n', '"');

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

$outputfile = './uploads/'.$fileid.'-converted.csv';
$exists = file_exists($outputfile);
if (!$exists) {
  // si le fichier existe pas on le cree
  $outputcsv = fopen($outputfile, 'w');
  if (($handle = fopen($file, 'r')) !== FALSE) {
    while (($columns = fgetcsv($handle, 0, $_SPLITTER)) !== FALSE) {
      $lines = array();
      $length = count($columns);
      for ($i = 0; $i < $length; $i++) {
        $blob = $columns[$i];
        $value = str_replace($_SEARCHES, '', $blob);
        $value = trim($value);
        array_push($lines, $value);
      }
      fputcsv($outputcsv, $lines, $_SPLITTER);
    }
    fclose($handle);
  }
  fclose($outputcsv);
}

// on recupere le contenu du fichier on l'envoi au navigateur
header('Content-type: text/csv');
header('Content-Disposition: attachment; filename='.$outputfile.'.csv');
header('Pragma: no-cache');
header('Expires: 0');
$content = file_get_contents($outputfile);
echo $content;
exit;
