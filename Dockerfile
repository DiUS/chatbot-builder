FROM node:latest

WORKDIR /usr/chatbot-builder

RUN npm i lerna -g --loglevel notice

COPY package.json .

RUN npm install

COPY packages/chatbot-builder-core ./packages/chatbot-builder-core
COPY packages/chatbot-builder-example ./packages/chatbot-builder-example

COPY lerna.json .
RUN lerna bootstrap

WORKDIR /usr/chatbot-builder/packages/chatbot-builder-core

RUN npm link

WORKDIR /usr/chatbot-builder/packages/chatbot-builder-example

CMD ["chatbot-builder"]
