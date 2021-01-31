FROM node:8.10.0

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY ./src/package.json ./

RUN npm install
# If you are building your code for production
# RUN npm install --only=production

# Bundle app source
COPY ./src .

EXPOSE 4000
CMD ["./wait_for.sh", "rabbit:5672"]
CMD [  "npm", "start"]