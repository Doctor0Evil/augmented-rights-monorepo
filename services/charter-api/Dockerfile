FROM node:20-alpine

WORKDIR /app

COPY package.json tsconfig.json ./
RUN npm install --omit=dev

COPY src ./src
RUN npm run build

EXPOSE 4001

CMD ["node", "dist/index.js"]
