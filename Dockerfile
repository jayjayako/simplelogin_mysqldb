FROM node:16

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

ENV PORT=3000

EXPOSE 3000

# RUN bash node.sh

CMD ["bash","node.sh"]

# CMD ["npm","run","start"]