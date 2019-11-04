FROM node:12.2.0-alpine as build
WORKDIR /usr/src/app
ENV PATH /usr/src/app/node_modules/.bin:$PATH
COPY package.json ./package.json
RUN npm install --silent
RUN npm install react-scripts@3.0.1 -g --silent
COPY . .
RUN npm run build

# production environment
FROM nginx:1.16.0-alpine
COPY --from=build /usr/src/app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
