# Use Node image to build Angular
FROM node:18 AS builder

WORKDIR /app
COPY package*.json ./
COPY angular.json ./
COPY tailwind.config.js ./
COPY tsconfig.json ./
COPY .postcssrc.json ./

RUN npm install
RUN npm i lightningcss-linux-x64-gnu @tailwindcss/oxide-linux-x64-gnu sass-embedded-linux-x64

COPY projects/core ./projects/core
COPY projects/models ./projects/models
COPY projects/portal ./projects/portal
RUN dir
RUN npm run build portal

FROM nginx:1.28.0

# Remove current contents in NGINX resource folder
RUN rm -rf /usr/share/nginx/html/

# Copy build files from Builder Image
COPY --from=builder /app/dist/portal/browser /usr/share/nginx/html/

# Copy NGINX config to
COPY projects/portal/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80