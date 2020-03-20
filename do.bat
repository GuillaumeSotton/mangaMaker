@echo off

if %1==yarn_build docker-compose exec dev yarn run build
if %1==yarn_install docker-compose exec dev yarn install
if %1==yarn_lint docker-compose exec dev yarn run lint
if %1==composer_update docker-compose exec php composer update
if %1==composer_install docker-compose exec php composer install
if %1==migrate docker-compose exec php php bin/console doctrine:migrations:migrate -n
if %1==restore docker-compose exec php bash -c "php bin/console doctrine:database:drop --force && php bin/console doctrine:database:create && php bin/console doctrine:migrations:migrate && php bin/console doctrine:fixtures:load --group=seed"

