# С помощью директивы AS можно дать образу имя
FROM node:21-alpine
WORKDIR /var/www/app
COPY package.json yarn.lock ./
# Устанавливаем зависимости
RUN yarn --immutable
# Копируем исходный код и собираем приложение
COPY . .
ENTRYPOINT [ "yarn", "start:dev" ]
