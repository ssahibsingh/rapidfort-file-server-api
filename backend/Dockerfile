FROM node:18

# Set the working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY package.json yarn.lock ./

# Install app dependencies
RUN npm install yarn
RUN yarn install

# Copy app source code
COPY . .

# Expose the port the app runs on
EXPOSE 8000

# Define the startup command
CMD [ "yarn", "start" ]
