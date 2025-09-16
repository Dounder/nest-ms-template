FROM node:24.4.1-alpine3.21 AS development


RUN mkdir -p /home/node/app/node_modules /home/node/app/src /home/node/app/dist && \
    chown -R node:node /home/node/app


ENV NODE_ENV=development


WORKDIR /home/node/app


COPY package*.json ./


RUN npm install -g pm2

RUN npm install

RUN npm install csv-parser

USER node
COPY --chown=node:node . .


RUN npm run build


EXPOSE 3000


STOPSIGNAL SIGINT

CMD ["pm2-runtime","dist/main.js"]
