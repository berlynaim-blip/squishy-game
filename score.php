<?php
if(isset($_POST['score'])) {
    $score = intval($_POST['score']);
    $file = 'scores.txt';
    file_put_contents($file, "Score: $score\n", FILE_APPEND);
    echo json_encode(['status' => 'success', 'score' => $score]);
} else {
    echo json_encode(['status' => 'error', 'message' => 'No score provided']);
}
?>
