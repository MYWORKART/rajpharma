<?php

$host = "sql112.infinityfree.com";
$username = "if0_42889952";
$password = "raj393939";
$database = "if0_42889952_raj_pharma";

$conn = new mysqli($host, $username, $password, $database);

if ($conn->connect_error) {
    die("Database connection failed: " . $conn->connect_error);
}

$conn->set_charset("utf8mb4");

?>