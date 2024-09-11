<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "motus";

// Créer une connexion
$conn = new mysqli($servername, $username, $password, $dbname);

// Vérifier la connexion
if ($conn->connect_error) {
    die("Échec de la connexion: " . $conn->connect_error);
}

$sql = "SELECT word FROM word";
$result = $conn->query($sql);
?>

<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Scores</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <div class="container">
        <h1>Tableau des Scores</h1>
        <ul>
            <?php
            if ($result->num_rows > 0) {
                while($row = $result->fetch_assoc()) {
                    echo "<li>" . htmlspecialchars($row['word']) . "</li>";
                }
            } else {
                echo "<li>Aucun score enregistré</li>";
            }
            ?>
        </ul>
        <p><a href="index.html">Rejouer</a></p>
    </div>
</body>
</html>

<?php $conn->close(); ?>
