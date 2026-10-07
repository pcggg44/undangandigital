FROM php:8.2-apache

# Hapus semua config MPM bawaan
RUN rm -f /etc/apache2/mods-enabled/mpm_*.load \
          /etc/apache2/mods-enabled/mpm_*.conf

# Aktifkan HANYA mpm_prefork
RUN a2enmod mpm_prefork

# Install ekstensi mysqli
RUN docker-php-ext-install mysqli pdo pdo_mysql

# Copy semua file
COPY . /var/www/html/

RUN chown -R www-data:www-data /var/www/html

EXPOSE 80

CMD ["apache2-foreground"]
