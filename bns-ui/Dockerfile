# Use Node image to build Angular
FROM node:18 AS builder

WORKDIR /app
COPY package*.json ./
RUN npm install
RUN npm i lightningcss-linux-x64-gnu @tailwindcss/oxide-linux-x64-gnu sass-embedded-linux-x64

COPY . .
RUN npm run build bns-ui

FROM nginx:1.28.0

# Remove current contents in NGINX resource folder
RUN rm -rf /usr/share/nginx/html/

# Copy build files from Builder Image
COPY --from=builder /app/dist/bns-ui/browser /usr/share/nginx/html/

# Copy NGINX config to
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80