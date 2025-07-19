# STEP 1: Base image
FROM node:18-alpine

# STEP 2: Set working directory
WORKDIR /app

# STEP 3: Copy files
COPY package.json yarn.lock ./
COPY prisma ./prisma
COPY tsconfig.json ./
COPY src ./src

# STEP 4: Install dependencies
RUN yarn install

# STEP 5: Generate Prisma client
RUN yarn prisma generate

# STEP 6: Build TypeScript
RUN yarn build

# STEP 7: Expose port & start
EXPOSE 3000
CMD ["node", "dist/index.js"]
