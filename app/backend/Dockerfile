FROM node:16.14-alpine
WORKDIR /app-backend
COPY package.json .
# COPY package-lock.json .
RUN npm install -g npm@latest && npm install
COPY . .
# CMD ["npm", "start"]
