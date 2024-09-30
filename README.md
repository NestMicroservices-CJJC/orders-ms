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

6. Si no está ejecutandose, Levanatar el servidor de Nats

```
docker run -d --name nats-main -p 4222:4222 -p 6222:6222 -p 8222:8222 nats
```

7. Verificar servidor corriendo:

```
http://localhost:8222/
```

8. Ejecutar el proyecto

```
npm run start:dev
```
