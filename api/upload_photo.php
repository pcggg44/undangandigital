<?php
require_once 'config.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['status' => 'error', 'message' => 'Method tidak diizinkan']);
    exit;
}

$input = json_decode(file_get_contents('php://input'), true);

if (!$input) {
    http_response_code(400);
    echo json_encode(['status' => 'error', 'message' => 'Data tidak valid']);
    exit;
}

$guestName = trim($input['guest_name'] ?? '');
$imageData = trim($input['image_data'] ?? '');

if (empty($guestName) || empty($imageData)) {
    http_response_code(400);
    echo json_encode(['status' => 'error', 'message' => 'Nama dan foto wajib diisi']);
    exit;
}

$guestName = mb_substr($guestName, 0, 100);

if (!preg_match('/^data:image\/(png|jpeg|jpg);base64,/', $imageData)) {
    http_response_code(400);
    echo json_encode(['status' => 'error', 'message' => 'Format gambar tidak valid']);
    exit;
}

if (strlen($imageData) > 700000) {
    http_response_code(400);
    echo json_encode(['status' => 'error', 'message' => 'Ukuran foto terlalu besar']);
    exit;
}

$conn = getDB();

$stmt = $conn->prepare("SELECT COUNT(*) AS total FROM photobooth_photos WHERE guest_name = ?");
$stmt->bind_param("s", $guestName);
$stmt->execute();
$result = $stmt->get_result()->fetch_assoc();
$stmt->close();

if ($result['total'] >= 2) {
    echo json_encode([
        'status' => 'error',
        'message' => 'Kamu sudah upload 2 foto. Batas maksimal tercapai.'
    ]);
    $conn->close();
    exit;
}

$stmt = $conn->prepare("INSERT INTO photobooth_photos (guest_name, image_data) VALUES (?, ?)");
$stmt->bind_param("ss", $guestName, $imageData);

if ($stmt->execute()) {
    echo json_encode([
        'status' => 'success',
        'message' => 'Foto berhasil dibagikan',
        'id' => $conn->insert_id,
        'total_after' => $result['total'] + 1
    ]);
} else {
    http_response_code(500);
    echo json_encode(['status' => 'error', 'message' => 'Gagal menyimpan: ' . $stmt->error]);
}

$stmt->close();
$conn->close();
?>
