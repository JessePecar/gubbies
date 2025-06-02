# Base image
FROM node:20

# Create app directory
WORKDIR /app

# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY package*.json ./

COPY tsconfig.json ./

# Copy the .env and .env.development files
# COPY .env.development ./.env

# Copy the prisma files into the directory
# COPY prisma ./prisma

# Install app dependencies
RUN npm install

# Generate prisma client
# RUN npx prisma generate

# Bundle app source
COPY src ./src

# Expose the application port

# ENV PORT=80
EXPOSE 3001

# Command to run the application
# CMD ["node", "dist/src/main"]
CMD ["nest", "start"]