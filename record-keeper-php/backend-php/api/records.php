<?php
// ✅ Allow CORS and set content type to JSON
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

// ✅ Include database connection
include_once "../config/db.php";

// ✅ Parse JSON input from request body
$data = json_decode(file_get_contents("php://input"), true);
$action = $data['action'] ?? '';

// ✅ Handle Create Record
if ($action === 'create') {
    $stmt = $conn->prepare("INSERT INTO records (name, age, gender, bestPlace) VALUES (?, ?, ?, ?)");
    $stmt->bind_param("siss", $data["name"], $data["age"], $data["gender"], $data["bestPlace"]);

    if ($stmt->execute()) {
        $data["id"] = $conn->insert_id; // ✅ Add generated ID to response
        echo json_encode($data);
    } else {
        echo json_encode(["error" => "Insert failed"]);
    }
    exit;
}

// ✅ Handle Update Record
if ($action === 'update') {
    $stmt = $conn->prepare("UPDATE records SET name=?, age=?, gender=?, bestPlace=? WHERE id=?");
    $stmt->bind_param("sissi", $data["name"], $data["age"], $data["gender"], $data["bestPlace"], $data["id"]);

    if ($stmt->execute()) {
        echo json_encode($data);
    } else {
        echo json_encode(["error" => "Update failed"]);
    }
    exit;
}

// ✅ Handle Delete Record
if ($action === 'delete') {
    $stmt = $conn->prepare("DELETE FROM records WHERE id=?");
    $stmt->bind_param("i", $data["id"]);

    if ($stmt->execute()) {
        echo json_encode(["id" => $data["id"]]);
    } else {
        echo json_encode(["error" => "Delete failed"]);
    }
    exit;
}

// ✅ Handle GET request - fetch all records
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $result = $conn->query("SELECT * FROM records ORDER BY id DESC");
    $records = [];
    while ($row = $result->fetch_assoc()) {
        $records[] = $row;
    }
    echo json_encode($records);
    exit;
}
?>
