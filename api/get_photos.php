<?php
require_once 'config.php';

$conn = getDB();

$result = $conn->query("
    SELECT id, guest_name, image_data, created_at
    FROM photobooth_photos
    ORDER BY created_at DESC
    LIMIT 100
");

$photos = [];
while ($row = $result->fetch_assoc()) {
    $photos[] = [
        'id'         => (int)$row['id'],
        'guest_name' => $row['guest_name'],
        'image_data' => $row['image_data'],
        'created_at' => $row['created_at']
    ];
}

echo json_encode([
    'status' => 'success',
    'total'  => count($photos),
    'data'   => $photos
]);

$conn->close();
?>
