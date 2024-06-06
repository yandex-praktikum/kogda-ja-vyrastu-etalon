# С помощью директивы AS можно дать образу имя
FROM node:16-alpine AS builder
WORKDIR /var/www/app
COPY package.json yarn.lock ./
# Устанавливаем зависимости
RUN yarn --frozen-lockfile --no-audit
# Копируем исходный код и собираем приложение
COPY . .
RUN yarn build


FROM node:16-alpine as production
ARG PORT=3000

WORKDIR /var/www/app
RUN apk add --no-cache wait4x

# С помощью параметера --from указываем, что копировать нужно из образа builder
# Копируем package.json и yarn.lock (потребуются для установки зависимостей)
COPY --from=builder /var/www/app/package.json /var/www/app/yarn.lock  ./
RUN yarn --prod --frozen-lockfile --no-audit
# Копируем директорию со сборкой приложения
COPY --from=builder /var/www/app/dist ./dist/
EXPOSE ${PORT}

# Указываем команду для запуска приложения
CMD ["node", "./dist/main.js"]

