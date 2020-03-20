FROM php:7.4-fpm

ARG TIMEZONE=Europe/Paris

# Set timezone
RUN ln -snf /usr/share/zoneinfo/${TIMEZONE} /etc/localtime && echo ${TIMEZONE} > /etc/timezone
RUN printf '[PHP]\ndate.timezone = "%s"\n', ${TIMEZONE} > /usr/local/etc/php/conf.d/tzone.ini

# Install useful software
RUN apt-get update && apt-get install -y libicu-dev libzip-dev unzip git nano wkhtmltopdf

# Install MySQL php extension
RUN docker-php-ext-install zip pdo pdo_mysql

#
# Il faut modifier l'adresse IP dans xdebug.remote_host si l'on veut activer le debug dans l'IDE
# en attendant que "host.docker.internal" marche sous linux...
#
# https://jean-pierre.lambelet.net/docker-utiliser-xdebug-docker-compose/
#
RUN pecl install xdebug && docker-php-ext-enable xdebug \
    && echo "xdebug.remote_port=9000" >> /usr/local/etc/php/php.ini \
    && echo "xdebug.remote_enable=1" >> /usr/local/etc/php/php.ini \
    && echo "xdebug.remote_connect_back=0" >> /usr/local/etc/php/php.ini \
    && echo "xdebug.remote_timeout=100" >> /usr/local/etc/php/php.ini \
    && echo "xdebug.idekey=IDEA_DEBUG" >> /usr/local/etc/php/php.ini \
    && echo "xdebug.remote_log=var/log/xdebug.log" >> /usr/local/etc/php/php.ini \
    && echo "xdebug.remote_host=host.docker.internal" >> /usr/local/etc/php/php.ini \
    && echo "upload_max_filesize = 20M;" >> /usr/local/etc/php/php.ini \
    && echo "post_max_size = 21M;" >> /usr/local/etc/php/php.ini


# Latest composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer