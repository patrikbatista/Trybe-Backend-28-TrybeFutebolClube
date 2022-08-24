FROM node:16.14-alpine
WORKDIR /app-backend
COPY package.json .
COPY package-lock.json .
RUN npm install -g npm@latest
RUN npm install
COPY . .
# CMD ["npm", "start"]
