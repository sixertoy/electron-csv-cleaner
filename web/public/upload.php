<?php
if (isset($_FILES['files'])) {
    // Example:
    move_uploaded_file(
      $_FILES['files']['tmp_name'],
      'uploads/'. $_FILES['myFile']['name']
    );
    exit;
}
?>
