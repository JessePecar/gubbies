# Base image
FROM node:20

# Create app directory
WORKDIR /app

# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY package*.json ./

COPY tsconfig.json ./
COPY nest-cli.json ./

# Copy the .env and .env.development files
COPY .env.development ./.env

# Copy the common library files (even if they aren't all used)
COPY libs ./libs

# Copy the application files 
COPY apps/bns-api ./apps/bns-api

# Copy the prisma files that are going to be needed for this project into the directory
COPY prisma-bns-db ./prisma-bns-db

# Install app dependencies
RUN npm install

RUN npm install -g @nestjs/cli

# Generate prisma client
RUN npx prisma generate --schema ./prisma-bns-db/schema

# Expose the application port
ENV PORT=3000
EXPOSE 3000

# Command to run the application
# CMD ["node", "dist/src/main"]
CMD ["nest", "start", "bns-api"]