FROM node:lts

WORKDIR /app

RUN chown -R node:node /app

USER node

COPY package*.json ./

RUN npm install

CMD ["npm", "run", "dev"]