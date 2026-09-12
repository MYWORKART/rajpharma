<?php

header("Content-Type: application/json");

require_once "db.php";

$result = $conn->query(
    "SELECT id, name, email, company_name, product, message, created_at
     FROM inquiries
     ORDER BY id DESC"
);

$inquiries = [];

if ($result) {
    while ($row = $result->fetch_assoc()) {
        $inquiries[] = $row;
    }
}

echo json_encode([
    "success" => true,
    "inquiries" => $inquiries
]);

$conn->close();

?>
