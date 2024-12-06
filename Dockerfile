FROM node:20-bookworm-slim

WORKDIR /app

RUN apt-get update -y && apt-get install -y openssl
COPY package*.json  ./
RUN npm ci
COPY . .
RUN npx prisma generate
RUN npm run build

CMD ["npm", "run", "start:prod"]

# TODO create multi-stage build
