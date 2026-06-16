# FROM nginx:alpine

# COPY index.html /usr/share/nginx/html/index.html
# COPY nginx.conf /etc/nginx/nginx.conf

# EXPOSE 80

############################################################################################################################

FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY public/ public/
COPY server.js .
EXPOSE 80
CMD ["node", "server.js"]