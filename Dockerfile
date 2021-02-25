FROM node:lts-alpine

# Create app directory
WORKDIR /var/www/html/wirelessbackup-api

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY package*.json ./

RUN npm install

# Bundle app source
COPY . .

EXPOSE 3000
CMD [ "npm", "start" ]