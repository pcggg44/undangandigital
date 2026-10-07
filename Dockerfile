FROM php:8.2-apache

# Install ekstensi mysqli
RUN docker-php-ext-install mysqli pdo pdo_mysql

# Copy semua file
COPY . /var/www/html/

# Copy entrypoint script
COPY docker-entrypoint.sh /usr/local/bin/
RUN chmod +x /usr/local/bin/docker-entrypoint.sh

RUN chown -R www-data:www-data /var/www/html

EXPOSE 80

# Gunakan entrypoint script
CMD ["/usr/local/bin/docker-entrypoint.sh"]
