FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

RUN mkdir -p dist/proto && cp src/proto/*.proto dist/proto/
RUN npm run build

CMD ["node", "dist/index.js"]
