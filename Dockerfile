# Etapa 1: Build da aplicação
FROM node:20-alpine AS builder
RUN apk add --no-cache vips
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile
COPY . .
RUN yarn build

# Etapa 2: Imagem final para produção
FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production

# Instale o vips na imagem final
RUN apk add --no-cache vips

# Copia apenas o necessário da build
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/yarn.lock ./yarn.lock

RUN yarn install --production --frozen-lockfile && yarn cache clean

EXPOSE 3000
CMD ["yarn", "start"] 