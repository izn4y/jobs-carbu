# Job-Carbu
Job-Carbu est un cron qui permet de récupérer régulièrement les données de prix de carburant depuis le site data.gouv.fr.

Installation
Clonez le dépôt Job-Carbu en exécutant la commande suivante dans votre terminal :

`git clone https://github.com/votre_nom_utilisateur/job-carbu.git`

Installez les dépendances en exécutant la commande suivante :

Copy code
`npm install || yarn install`

Créez un fichier .env à la racine du projet avec les informations suivantes :

`DATA_GOUV_URL=url_du_fichier_de_données_de_carburant_sur_data_gouv`

Une fois l'installation et la configuration terminées, vous pouvez exécuter la tâche cron en exécutant la commande suivante :

`yarn start`

La tâche cron récupérera régulièrement les données de prix de carburant depuis le site data.gouv.fr selon la fréquence de la configuration de la tâche.
