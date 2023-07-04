FROM node:lts

WORKDIR /app

COPY package*.json ./

RUN chown -R node:node /app

USER node

RUN npm install

CMD ["npm", "run", "dev"]