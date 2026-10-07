<?php
require_once 'config.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['status' => 'error', 'message' => 'Method tidak diizinkan']);
    exit;
}

// Ambil data (support JSON & form-data)
$input = json_decode(file_get_contents('php://input'), true);

if (!$input) {
    $input = $_POST;
}

$name       = trim($input['name'] ?? '');
$attendance = trim($input['attendance'] ?? '');
$message    = trim($input['message'] ?? '');

// Validasi
if (empty($name) || empty($attendance)) {
    http_response_code(400);
    echo json_encode(['status' => 'error', 'message' => 'Nama dan kehadiran wajib diisi']);
    exit;
}

if (!in_array($attendance, ['hadir', 'tidak'])) {
    http_response_code(400);
    echo json_encode(['status' => 'error', 'message' => 'Kehadiran tidak valid']);
    exit;
}

// Batasi panjang
$name    = mb_substr($name, 0, 100);
$message = mb_substr($message, 0, 500);

// Simpan
$conn = getDB();
$stmt = $conn->prepare("INSERT INTO rsvp (name, attendance, message) VALUES (?, ?, ?)");
$stmt->bind_param("sss", $name, $attendance, $message);

if ($stmt->execute()) {
    echo json_encode([
        'status' => 'success',
        'message' => 'RSVP berhasil disimpan',
        'id' => $conn->insert_id
    ]);
} else {
    http_response_code(500);
    echo json_encode(['status' => 'error', 'message' => 'Gagal menyimpan: ' . $stmt->error]);
}

$stmt->close();
$conn->close();
?>