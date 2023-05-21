FROM node:alpine

WORKDIR /app

COPY package.json ./
COPY pnpm-lock.yaml ./

RUN npm i -g pnpm
RUN pnpm fetch -prod
RUN pnpm install -r -offline -prod

COPY . ./
RUN pnpm add @nestjs/cli
RUN pnpm add @prisma/client
RUN npx prisma generate
RUN pnpm build

EXPOSE 4001

CMD ["pnpm", "start:prod"]