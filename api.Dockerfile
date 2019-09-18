FROM node:10-alpine

WORKDIR /app

ENV PORT=3000
EXPOSE 3000

COPY ["package.json", "./"]
COPY ["package-lock.json", "./"]

RUN npm install --production

COPY . .

CMD ["node", "./index.js"]