# Manga Maker

L'application fonctionne avec Docker. Le stack technique est le suivant:
  - FrontEnd: ReactJS
  - BackEnd: Symfony
  - BDD: MariaDB
  - WebServer: Nginx

Pour configurer son conteneur Docker effectuer les commandes suivantes:
  1) docker-compose build (Va créer les conteneurs pour l'application)
  2) docker-compose exec node yarn install (Installer les dépendances JS)  
  3) docker-compose exec php composer install (Installer les dépendances PHP)
  4) docker-compose exec php php bin/console doctrine:migrations:migrate (effectuer les migrations de la BDD)
  5) docker-compose exec php php bin/console doctrine:fixtures:load (charger les données)

 => Cela n'est à faire que la première fois 

Pour lancer l'application, faire:
  docker-compose up node
  

