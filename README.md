<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

# Orders Microservice

## Development - Pasos

1. Clonar el repositorio
2. Instalar dependencias
3. Crear archivo `.env` basado en el `.env.template`
4. Levantar la Base de Datos Postgres:

```
docker compose up -d
```

5. Ejecutar migración de Prisma

```
npx prisma migrate dev
```

6. Ejecutar el proyecto

```
npm run start:dev
```
