<?php
// ✅ Database credentials
$host = "localhost"; // Change if not localhost
$user = "root";      // Default for XAMPP/WAMP
$pass = "";          // Default for XAMPP/WAMP is empty
$db   = "form_app";  // Your database name

// ✅ Create connection
$conn = new mysqli($host, $user, $pass, $db);

// ✅ Set character encoding to UTF-8
$conn->set_charset("utf8mb4");

// ✅ Check connection
if ($conn->connect_error) {
    error_log("Database connection failed: " . $conn->connect_error);
    die("<span style='color:red;'>❌ Could not connect to database.</span>");
}
?>
