<?php
require_once 'config.php';

$conn = getDB();

// Ambil semua RSVP, urutkan dari terbaru
$result = $conn->query("SELECT id, name, attendance, message, created_at FROM rsvp ORDER BY created_at DESC");

$data = [];
while ($row = $result->fetch_assoc()) {
    $data[] = [
        'id'         => (int)$row['id'],
        'name'       => $row['name'],
        'attendance' => $row['attendance'],
        'message'    => $row['message'],
        'created_at' => $row['created_at']
    ];
}

echo json_encode([
    'status' => 'success',
    'total'  => count($data),
    'data'   => $data
]);

$conn->close();
?>