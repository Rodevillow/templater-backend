#FROM node:16-alpine as builder
#
#ENV NODE_ENV build
#
#USER node
#WORKDIR /home/node
#
#COPY package*.json ./
#RUN npm install
#
#COPY --chown=node:node . .
#RUN npm run build

# ---

#FROM node:16-alpine
#
#ENV NODE_ENV production
#
#USER node
#WORKDIR /home/node
#
#COPY --from=builder --chown=node:node /home/node/package*.json ./
#COPY --from=builder --chown=node:node /home/node/node_modules/ ./node_modules/
#COPY --from=builder --chown=node:node /home/node/dist/ ./dist/
#
#CMD ["node", "dist/main.js"]
#
# ---

FROM node:18-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

CMD [ "npm", "run", "start:dev" ]