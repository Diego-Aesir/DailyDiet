FROM node:18

WORKDIR /app

COPY package*.json ./
COPY next.config.mjs ./
COPY .eslintrc.json ./
COPY jsconfig.json ./

RUN npm install

COPY . .

RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]