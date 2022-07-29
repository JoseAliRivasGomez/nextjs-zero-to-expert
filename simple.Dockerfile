FROM node:16-alpine

RUN mkdir -p /app

WORKDIR /app

COPY package.json /app

# RUN yarn install
RUN npm install

COPY . /app

# RUN yarn build
RUN npm run build

EXPOSE 3000

# CMD [ "yarn", "start" ]
CMD [ "npm", "start" ]

# Super pesada +1GB