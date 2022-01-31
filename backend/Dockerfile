FROM node:17
WORKDIR /app 

COPY package*.json /app/  
RUN npm install 

COPY . /app  
RUN npx sequelize db:create

EXPOSE 3085

CMD ["npm", "run", "dev"]