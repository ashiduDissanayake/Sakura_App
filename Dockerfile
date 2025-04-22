# Stage 1: Build the application
FROM node:20-slim AS build
WORKDIR /app
COPY package.json ./
RUN npm install
COPY . .
RUN npm run build

# Stage 2: Serve the static files using Nginx
FROM nginx:alpine

# Copy the built files
COPY --from=build /app/dist /usr/share/nginx/html/sakura

# Copy custom Nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy SSL certificate and key
COPY certs/selfsigned.crt /etc/ssl/certs/
COPY certs/selfsigned.key /etc/ssl/private/

EXPOSE 443
CMD ["nginx", "-g", "daemon off;"]