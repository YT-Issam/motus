document.addEventListener('DOMContentLoaded', () => {
    const mots = ["risque", "actuel", "cheval", "paquet", "examen", "buveur", "cabine"];
    const motMotus = mots[Math.floor(Math.random() * mots.length)];
    const longueurMot = motMotus.length;
    let chancesRestantes = 6;

    // Afficher les indices
    document.getElementById('indice').textContent = `Devinez le mot Motus. La première lettre du mot est : ${motMotus[0]}`;

    // Créer les cases pour le mot
    const grille = document.getElementById('grille');
    for (let i = 0; i < longueurMot; i++) {
        const caseGrille = document.createElement('div');
        caseGrille.classList.add('case');
        grille.appendChild(caseGrille);
    }

    // Gérer la soumission du formulaire
    document.getElementById('form').addEventListener('submit', function(e) {
        e.preventDefault();

        const proposition = document.getElementById('proposition').value.toLowerCase();

        if (proposition.length !== longueurMot) {
            document.getElementById('message').textContent = `La proposition doit avoir ${longueurMot} lettres.`;
            return;
        }

        if (proposition === motMotus) {
            document.getElementById('message').textContent = "Félicitations, vous avez trouvé le mot secret !";
            saveScore(motMotus); // Enregistre le score dans la base de données
            return;
        }

        chancesRestantes--;
        if (chancesRestantes <= 0) {
            document.getElementById('message').textContent = `Dommage, vous avez perdu. Le mot était : ${motMotus}`;
            document.getElementById('proposition').value = '';
            return;
        }

        // Mise à jour de la grille
        let reponse = "";
        for (let i = 0; i < longueurMot; i++) {
            if (proposition[i] === motMotus[i]) {
                grille.children[i].textContent = proposition[i];
                grille.children[i].style.backgroundColor = 'green';
                reponse += proposition[i];
            } else if (motMotus.includes(proposition[i])) {
                grille.children[i].textContent = proposition[i];
                grille.children[i].style.backgroundColor = 'yellow';
                reponse += '_';
            } else {
                grille.children[i].textContent = proposition[i];
                grille.children[i].style.backgroundColor = 'red';
                reponse += '_';
            }
        }

        document.getElementById('chances').textContent = `Chances restantes : ${chancesRestantes}`;
        document.getElementById('proposition').value = '';
    });

    // Fonction pour enregistrer le score dans la base de données
    function saveScore(word) {
        fetch('save_score.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: new URLSearchParams({ word })
        })
        .then(response => response.text())
        .then(data => console.log(data))
        .catch(error => console.error('Error:', error));
    }
});
