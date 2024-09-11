<?php
$servername = "localhost";
$username = "root";
$password = ""; 
$dbname = "motus";

// Créer une connexion
$conn = new mysqli($servername, $username, $password, $dbname);

// Vérifier la connexion
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$sql = "SELECT * FROM word ORDER BY id DESC";
$result = $conn->query($sql);

$scores = array();
while ($row = $result->fetch_assoc()) {
    $scores[] = $row;
}

echo json_encode($scores);

$conn->close();
?>
