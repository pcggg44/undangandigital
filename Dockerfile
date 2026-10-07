FROM php:8.2-apache

# Install ekstensi mysqli
RUN docker-php-ext-install mysqli pdo pdo_mysql

# Enable mod_rewrite (opsional)
RUN a2enmod rewrite

# Copy semua file ke server
COPY . /var/www/html/

# Set permission
RUN chown -R www-data:www-data /var/www/html

EXPOSE 80