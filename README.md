[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-24ddc0f5d75046c5622901739e7c5dd533143b0c8e959d652212380cedb1ea36.svg)](https://classroom.github.com/a/AizqZlJ-)

# Week 15 Dandi Rizky (Backend Extra)

---

For this week assignment, i'm trying to containerizing the apps from week 14 using docker and creating beautiful documentation using swagger.

## Docker Hub 🐳

---

My Docker Hub Images : https://hub.docker.com/r/dandirizkyy/w15-dandi-myapp

## Installation 🔨

---

In order to run this project locally, you need to clone this repository first using git clone

```bash
$ https://github.com/revou-fsse-1/w15-my-backend-extra-DandiRizkyy.git
```

then run `pnpm install` in your terminal to download all dependencies

```bash
$ pnpm install
```

create `docker-compose.yaml` on root folder (where the package.json installed) and fill with these commands to install postgresql database locally on your computer

```
version: '3.9'
services:
  database:
    image: postgres:alpine
    container_name: dandirizky-mydatabase
    hostname: database
    volumes:
    - postgres:/var/lib/postgresql/data
    ports:
    - 5432:5432
    env_file:
    - .env
    restart: always
  app:
    image: dandirizkyy/dandirizky-w15-myapp
    container_name: dandirizky-myapp
    build: .
    ports:
    - 4001:4001
    env_file:
    - .env
    depends_on:
    - database
    restart: always
volumes:
  postgres:
```

don't forget to create `.env` files on root folder same like before with these command:

```
DATABASE_URL="postgresql://revou:password@database:5432/revou?schema=public"
```

and run docker with these command:

```
docker-compose up -d
```

after that you can start the server using these following command :

```bash
# development
$ pnpm run start

# watch mode
$ pnpm run start:dev

# production mode
$ pnpm run start:prod
```

if you want to stop docker, you can use these command

```
docker-compose stop
```

## Documentation 📷

---

### Swagger Documentation

Here you can find my documentation using swagger : https://w15-webapp-dandi.onrender.com/docs

---

### Endpoint Documentation

1. First of all, all you need to do is registering your email and password first.

- `register`

  ```
  || Register Endpoint ||

  POST     /auth/register

  {
  "email": "example@gmail.com",
  "password": "example123"
  }
  ```

2. After that, you can login with email and password that you registered before

- `login`

  ```
  || Login Endpoint ||

  POST     /auth/login

  {
  "email": "example@gmail.com",
  "password": "example123"
  }
  ```

3. After you successfully login, you can access the resources endpoint such as `users` and `products`.

- `users`

  ```
  || Users Endpoint ||

  GET     /users
  ```

- `products`

  ```
  || Products Endpoint ||

  GET     /products
  --------------------
  GET     /products/1
  --------------------
  POST    /products

  {
  "title": "Example Title",
  "description": "Example Description",
  "category": "Example Category",
  "userId": 1
  }
  --------------------
  PUT     /products/1

  {
  "title": "Example Title",
  "description": "Example Description",
  "category": "Example Category",
  "userId": 1
  }
  --------------------
  PATCH   /products/1

  *Optional field, you can change either one value or multiple value at once

  {
  "title": "Example Title",
  "description": "Example Description",
  "category": "Example Category",
  "userId": 1
  }
  --------------------
  DELETE  /products/1

  ```

4. Anddd for the last step.. dont forget to logout :)

- `logout`

  ```
  || Logout Endpoint ||

  POST     /auth/logout
  ```

## Technologies 💻

---

- NestJS
- Swagger
- Typescript
- PrismaORM
- PostgreSQL
- Docker

## Support 🙌

---

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://kamilmysliwiec.com)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](LICENSE).
