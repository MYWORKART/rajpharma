<?php

header("Content-Type: application/json");

require_once "db.php";

if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    echo json_encode([
        "success" => false,
        "message" => "Invalid request method."
    ]);
    exit;
}

$name = trim($_POST["name"] ?? "");
$email = trim($_POST["email"] ?? "");
$company_name = trim($_POST["company_name"] ?? "");
$product = trim($_POST["product"] ?? "");
$message = trim($_POST["message"] ?? "");

if ($name === "" || $email === "" || $message === "") {
    echo json_encode([
        "success" => false,
        "message" => "Name, email and message are required."
    ]);
    exit;
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    echo json_encode([
        "success" => false,
        "message" => "Please enter a valid email address."
    ]);
    exit;
}

$sql = "INSERT INTO inquiries
        (name, email, company_name, product, message)
        VALUES (?, ?, ?, ?, ?)";

$stmt = $conn->prepare($sql);

if (!$stmt) {
    echo json_encode([
        "success" => false,
        "message" => "Database error."
    ]);
    exit;
}

$stmt->bind_param(
    "sssss",
    $name,
    $email,
    $company_name,
    $product,
    $message
);

if ($stmt->execute()) {

    echo json_encode([
        "success" => true,
        "message" => "Thank you! Your enquiry has been received."
    ]);

} else {

    echo json_encode([
        "success" => false,
        "message" => "Unable to save your enquiry."
    ]);
}

$stmt->close();
$conn->close();

?>
