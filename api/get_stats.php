<?php
require_once 'config.php';

$conn = getDB();

$total = $conn->query("SELECT COUNT(*) as c FROM rsvp")->fetch_assoc()['c'];
$hadir = $conn->query("SELECT COUNT(*) as c FROM rsvp WHERE attendance = 'hadir'")->fetch_assoc()['c'];
$tidak = $conn->query("SELECT COUNT(*) as c FROM rsvp WHERE attendance = 'tidak'")->fetch_assoc()['c'];

echo json_encode([
    'status' => 'success',
    'total'  => (int)$total,
    'hadir'  => (int)$hadir,
    'tidak'  => (int)$tidak
]);

$conn->close();
?>