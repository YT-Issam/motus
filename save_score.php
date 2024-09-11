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

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $word = $_POST['word'];

    $sql = "INSERT INTO word (word) VALUES (?)";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("s", $word);

    if ($stmt->execute()) {
        echo "Score saved successfully.";
    } else {
        echo "Error: " . $stmt->error;
    }

    $stmt->close();
}

$conn->close();
?>
