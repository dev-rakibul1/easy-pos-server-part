

FROM node:20-alpine
WORKDIR /app
COPY . .
RUN yarn install
COPY .env.example .env
# Generate Prisma client (before migration)
RUN npx prisma generate

# Run database migration
RUN npx prisma migrate dev --name init --skip-seed --preview-feature
RUN yarn build
EXPOSE 3000
RUN ["chmod", "+x", "./entrypoint.sh"]
ENTRYPOINT [ "sh", "./entrypoint.sh" ]





# # STEP 1: Base image
# FROM node:20-alpine

# # STEP 2: Set working directory
# WORKDIR /app

# # STEP 3: Copy files
# COPY package.json yarn.lock ./
# COPY prisma ./prisma
# COPY tsconfig.json ./
# COPY src ./src

# # STEP 4: Install dependencies
# RUN yarn install

# # STEP 5: Generate Prisma client
# RUN yarn prisma generate

# # STEP 6: Build TypeScript
# RUN yarn build

# # STEP 7: Expose port & start
# EXPOSE 3000
# CMD ["node", "dist/index.js"]
