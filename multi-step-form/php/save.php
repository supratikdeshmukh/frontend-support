<?php
require_once "../db/connection.php";

// ✅ Get form values
$name    = $_POST['name'] ?? '';
$age     = $_POST['age'] ?? '';
$gender  = $_POST['gender'] ?? '';
$phone   = $_POST['phone'] ?? '';
$email   = $_POST['email'] ?? '';
$address = $_POST['address'] ?? '';

// ✅ Prepared statement
$stmt = $conn->prepare("INSERT INTO users (name, age, gender, phone, email, address) VALUES (?, ?, ?, ?, ?, ?)");
$stmt->bind_param("sissss", $name, $age, $gender, $phone, $email, $address);

if ($stmt->execute()) {
    echo "<span style='color:green;'>✅ Data saved successfully!</span>";
} else {
    echo "<span style='color:red;'>❌ Error: " . $stmt->error . "</span>";
}

$stmt->close();
$conn->close();
?>
