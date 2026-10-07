FROM php:8.2-apache

# Matikan MPM yang tidak dipakai
RUN a2dismod mpm_event || true
RUN a2dismod mpm_worker || true
RUN a2enmod mpm_prefork || true

# Install ekstensi mysqli
RUN docker-php-ext-install mysqli pdo pdo_mysql

# Copy semua file ke server
COPY . /var/www/html/

# Set permission
RUN chown -R www-data:www-data /var/www/html

EXPOSE 80
