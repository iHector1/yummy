# Yummy (Laravel base)

Esta es la base inicial para migrar el proyecto a Laravel 12.

## Próximos pasos

1. Instalar dependencias:
   ```bash
   composer install
   ```
2. Copiar variables de entorno:
   ```bash
   cp .env.example .env
   ```
3. Generar la clave de la app:
   ```bash
   php artisan key:generate
   ```
4. Instalar assets y compilar Tailwind:
   ```bash
   npm install
   npm run dev
   ```

> Nota: Este commit solo crea la base del proyecto; no incluye la migración completa.
