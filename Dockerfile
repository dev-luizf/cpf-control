
FROM node:14-alpine AS builder
 
WORKDIR /app

COPY package*.json ./
COPY prisma ./prisma/
 
RUN npm install

COPY . . 
 
RUN npm run build

FROM node:14-alpine

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/prisma ./prisma
 
USER node

EXPOSE 3001
 
CMD ["npm", "run", "start:prod"]