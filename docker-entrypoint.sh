#!/bin/bash
set -e

# Pastikan hanya mpm_prefork yang aktif
a2dismod mpm_event mpm_worker 2>/dev/null || true
a2enmod mpm_prefork

# Jalankan Apache
exec apache2-foreground